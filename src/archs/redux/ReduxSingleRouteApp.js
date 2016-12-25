import Constants from '../Constants';
import App from '../../App';
import MemoryStoreComponent from './MemoryStoreComponent';
import ViewComponent from './ViewComponent';

class ReduxSingleRouteApp extends App {
  constructor(appName, options = {}) {
    super();
    this.name = appName;

    this._sysComponent = this.createComponent('system');
    this._appSensor = this._sysComponent.ns().sensor('system sensor', function() {})
    
    this.view = new ViewComponent({
      getName: () => 'view',
      render: 
        options.renderer || function() {},
      updateState: 
        options.viewStateUpdater || function() {},
    });

    this.store = new MemoryStoreComponent({
      getName: () => 'store',
      initState: 
        options.storeStateInitiator || function() {},
    });

    this.addComponent(this.view);
    this.addComponent(this.store);
  }

  getAppSensor() {
    return this._appSensor;
  }

  getViewSensor() {
    return this.view.sensor();
  }

  setRenderer(renderer) {
    this.view.setRenderer(renderer);
  }

  setViewStateUpdater(updater) {
    this.view.setStateUpdater(updater);
  }

  setStoreStateInitiator(initiator) {
    this.store.setStateInitiator(initiator);
  }

  reduce(...args) {
    return this.store.reduce(...args);
  }

  // ---------------------
  // life cycle
  initComponents() {
    super.initComponents();
  }
  connectComponents() {
    this.store.output().to(this.view.input());
    
    this.view.sensor().to(this.store.input());
    this.getAppSensor().to(this.store.input());
  }
  startComponents() {
    super.startComponents();

    // send render action when app starts
    this.getAppSensor().send({
      actionType: Constants.ACTION_RENDER
    }, false);
  }

  run(...args) {
    super.run(...args);
  }
}

export default function buildReduxSingleRouteApp(appName, options) {
  return new ReduxSingleRouteApp(appName, options);
}
