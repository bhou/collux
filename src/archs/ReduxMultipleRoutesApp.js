import Constants from './Constants';
import App from '../App';
import MultiRouteViewComponent from './redux/MultiRouteViewComponent';
import RouterComponent from './redux/RouterComponent';
import MiddlewareComponent from './redux/MiddlewareComponent';
import ReduxSingleRouteApp from './ReduxSingleRouteApp';
import router from './redux/middlewares/Router';

class ReduxMultipleRoutesApp extends ReduxSingleRouteApp {
  constructor(options = {}) {
    super(options);
    this.view = new MultiRouteViewComponent({
      getName: () => 'view',
    });

    this.middleware = new MiddlewareComponent();

    /*this.router = new RouterComponent({
      getName: () => 'router'
    });*/
    
    this.use('router', router);
  }

  route(pattern, page) {
    this.view.addPage(pattern, page);
  }

  setDefaultRoute(route) {
    this.view.setDefaultRoute(route);
  }

  setRootPath(root) {
    this.view.setRootPath(root);
  }

  redirect(path) {
    this.view.redirect(path);
  }

  use(name, middleware) {
    this.middleware.use(name, middleware);
    return this;
  }

  // ---------------------
  // life cycle
  initComponents() {
    this.addComponent(this.view);
    this.addComponent(this.store);
    this.addComponent(this.middleware)
    //this.addComponent(this.router);

    super.initComponents();
  }
  connectComponents() {
    this.store.output().to(this.middleware.input());

    this.middleware.output().to(this.view.input());
    
    this.view.sensor().to(this.store.input());
    this.getAppSensor().to(this.store.input());
  }
  startComponents() {
    super.startComponents();
  }
}

export default ReduxMultipleRoutesApp;
