import collar from 'collar.js';
import Constants from '../Constants';
import Component from '../../Component';
import page from 'page';

class MultiRouteViewComponent extends Component {
  constructor(options = {}) {
    let name = options.getName ? options.getName() : ViewComponent.getNextDefaultViewName();
    super(name);
    this.options = options;
    
    this._pages = new Map();
    this._routeList = [];

    this._defaultRoute = '/';

    this._sensor = this.ns().sensor(this.name + ' sensor', function() {});

    this._routeDispatcher = this.ns().do('match route', s => {
      let state = s.get(Constants.KEY_STATE);
      let url = state[Constants.STATE_SYS][Constants.STATE_URL];
      
      let redirectRoute = this._defaultRoute;
      if (url) {
        for (let routeObj of this._routeList) {
          if (routeObj.matcher.match(url, {})) {
            redirectRoute = routeObj.route;
            break;
          }
        }
      }
      
      if (s.get(Constants.MSG_TYPE) === Constants.MSG_RENDER) {
        // only redirect the view when 'render msg' is received
        page.redirect(redirectRoute);
      }
      return redirectRoute;
    });
  }

  init() {
    this.input().to(this._routeDispatcher);

    for (let route of this._pages.keys()) {
      let _page = this._pages.get(route);
      
      let pageName = `${this.name}.${route}`;
      let ns = collar.ns(pageName, {
        arch: pageName
      });
      let pageInput = ns.input('page input');
      let pageOutput = ns.output('page output');

      let updateStatePipeline = ns.actuator('page state updator', (s, done) => {
        try {
          this._pages.get(route).updateState(s.get(Constants.KEY_STATE));
          done();
        } catch (e) {
          return done(e);
        }
      });

      updateStatePipeline
        .errors(s => {
          console.error(s.error);
        })
        .to(pageOutput)
        .to(this.output());

      pageInput
        .when(Constants.MSG_RENDER, {
          msgType: 'must be [render]'
        }, s => s.get(Constants.MSG_TYPE) === Constants.MSG_RENDER)
        .do('renderer', s => {
          this._pages.get(route).render();
        })
        .to(updateStatePipeline);
        
      pageInput
        .when(Constants.MSG_STATE_CHANGED, {
          msgType: 'must be [state changed]',
          state: 'the new state object'
        }, s => s.get(Constants.MSG_TYPE) === Constants.MSG_STATE_CHANGED)
        .to(updateStatePipeline);

      this._routeDispatcher
        .when(route, s => s.getResult() === route)
        .to(pageInput);
    }
  }

  addPage(route, pageView) {
    this._pages.set(route, pageView);
    this._routeList.push({
      route: route,
      matcher: new page.Route(route)
    })
  }

  setDefaultRoute(route) {
    this._defaultRoute = route;
  }

  setRootPath(base) {
    page.base(base);
  }

  redirect(path) {
    this._sensor.send({
      actionType: Constants.ACTION_RENDER,
      url: path
    });
  }

  start() {
  }

  sensor() {
    return this._sensor;
  }

  static getNextDefaultViewName() {
    MultiRouteViewComponent.__COUNT__++;
    return `view_${ViewComponent.__COUNT__}`;
  }
}

MultiRouteViewComponent.__COUNT__ = 0;


export default MultiRouteViewComponent;

