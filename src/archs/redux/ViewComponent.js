import Constants from '../Constants';
import Component from '../../Component';

class ViewComponent extends Component {
  constructor(options = {}) {
    let name = options.getName ? options.getName() : ViewComponent.getNextDefaultViewName();
    super(name);
    
    this._renderer = options.render || function() {};
    this._stateUpdater = options.updateState || function(state) {};

    this._sensor = this.ns().sensor(this.name + ' sensor', function() {});

    this._updateStatePipeline = this.getUpdateStateActuator();
    this._updateStatePipeline
      .errors(s => {
        console.error(s.error);
      })
      .to(this.output());
  }

  init() {
    // basic msg handling
    this.input()
      .when(Constants.MSG_RENDER, {
        msgType: 'must be [render]'
      }, s => s.get(Constants.MSG_TYPE) === Constants.MSG_RENDER)
      .do('renderer', s => {
        this.render();
      })
      .to(this._updateStatePipeline)
      
    this.input()
      .when(Constants.MSG_STATE_CHANGED, {
        msgType: 'must be [state changed]',
        state: 'the new state object'
      }, s => s.get(Constants.MSG_TYPE) === Constants.MSG_STATE_CHANGED)
      .to(this._updateStatePipeline)
  }

  start() {
  }

  sensor() {
    return this._sensor;
  }

  render() {
    if (!this._renderer) {
      console.error('No renderer specified in view:', this.name);
      return;
    }
    this._renderer.call(this);
  }

  updateState(state) {
    if (!this._stateUpdater) {
      console.error('No stateUpdater specified in view:', this.name);
      return;
    }
    this._stateUpdater.call(this, state);
  }

  setRenderer(renderer) {
    this._renderer = renderer;
  }

  setStateUpdater(updater) {
    this._stateUpdater = updater;
  }

  getUpdateStateActuator() {
    return this.ns().actuator('view state updator', (s, done) => {
      try {
        this.updateState(s.get(Constants.STATE));
        done();
      } catch (e) {
        return done(e);
      }
    });
  }

  static getNextDefaultViewName() {
    ViewComponent.__COUNT__++;
    return `view_${ViewComponent.__COUNT__}`;
  }
}

ViewComponent.__COUNT__ = 0;


export default ViewComponent;
