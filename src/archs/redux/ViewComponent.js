import Constants from '../Constants';
import Component from '../../Component';

class ViewComponent extends Component {
  constructor(options = {}) {
    let name = options.getName ? options.getName() : ViewComponent.getNextDefaultViewName();
    super(name);
    this.options = options;


    this._renderer = options.render;
    this._stateUpdater = options.updateState;

    this._sensor = this.ns().sensor(this.name + ' sensor', function() {});
    this._sensor.dispatch = (msg) => {
      return this._sensor.send(msg, false);
    };
    
    this._errorhandler = this.ns().errors(s => {
      console.error(s.error);
    });
  }

  init() {
    this._errorhandler.to(this.output());

    // basic msg handling
    this.input()
      .when(Constants.MSG_RENDER, {
        msgType: 'must be [render]'
      }, s => s.get(Constants.MSG_TYPE) === Constants.MSG_RENDER)
      .to(this.getRendererActuator())
      .to(this.getUpdateStateActuator())
      .to(this._errorhandler);
      
    this.input()
      .when(Constants.MSG_STATE_CHANGED, {
        msgType: 'must be [state changed]',
        state: 'the new state object'
      }, s => s.get(Constants.MSG_TYPE) === Constants.MSG_STATE_CHANGED)
      .to(this.getUpdateStateActuator())
      .to(this._errorhandler);
  }

  start() {
  }

  sensor() {
    return this._sensor;
  }

  render(state) {
    if (!this._renderer) {
      console.error('No renderer specified in view:', this.name);
      return;
    }
    this._renderer.call(this, state);
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
    let actuator = this.ns().actuator('view state updator', (s, done) => {
      try {
        if (!this._stateUpdater) return done();
        this.updateState(s.get(Constants.KEY_STATE));
        done();
      } catch (e) {
        return done(e);
      }
    });

    if (!this._stateUpdater) actuator.removeFeature('impl').addFeature('todo');
    else actuator.removeFeature('todo').addFeature('impl');

    return actuator;
  }

  getRendererActuator() {
    let actuator = this.ns().actuator('renderer', (s, done) => {
      try {
        if (!this._renderer) return done();
        this.render(s.get(Constants.KEY_STATE));
        done();
      } catch (e) {
        return done(e);
      }
    });

    if (!this._renderer) actuator.removeFeature('impl').addFeature('todo');
    else actuator.removeFeature('todo').addFeature('impl');

    return actuator;
  }

  static getNextDefaultViewName() {
    ViewComponent.__COUNT__++;
    return `view_${ViewComponent.__COUNT__}`;
  }
}

ViewComponent.__COUNT__ = 0;


export default ViewComponent;
