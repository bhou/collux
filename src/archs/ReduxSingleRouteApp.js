import Constants from './Constants';
import App from '../App';
import MemoryStoreComponent from './redux/MemoryStoreComponent';
import ViewComponent from './redux/ViewComponent';
import page from 'page'; // TODO; remove it. this is not good, single route app do not need page module

class ReduxSingleRouteApp extends App {
  constructor(appName, options = {}) {
    super();
    this.name = appName;

    this._sysComponent = this.createComponent('app');
    this._appSensor = this._sysComponent.ns().sensor('app sensor', function() {})
    
    this.view = new ViewComponent({
      getName: () => 'view',
      render: 
        options.renderer,
      updateState: 
        options.viewStateUpdater,
    });

    this.store = new MemoryStoreComponent({
      getName: () => 'store',
      initState: 
        options.storeStateInitiator,
    });
  }

  getAppSensor() {
    return this._appSensor;
  }

  getViewSensor() {
    return this.view.sensor();
  }

  setStore(store) {
    this.store = store;
  }

  setView(view) {
    this.view = view;
  }

  setRenderer(renderer) {
    this.view.setRenderer(renderer);
  }

  setViewStateUpdater(updater) {
    this.view.setStateUpdater(updater);
  }

  setStoreStateInitiator(initiator, async) {
    this.store.setStateInitiator(initiator, async);
  }

  reduce(...args) {
    return this.store.reduce(...args);
  }

  // ---------------------
  // utils
  getCurrentLocation() {
    const { pathname, search, hash } = window.location;
    let path = pathname + search + hash;
    let basename = page.base();

    if (basename) path = 
        path.indexOf(basename) === 0 ? path.substr(basename.length) : path
    return path;
  }

  // ---------------------
  // life cycle
  initComponents() {
    // first add view and store into the components
    this.addComponent(this.view);
    this.addComponent(this.store);
    
    super.initComponents();
  }
  connectComponents() {
    this.store.output().to(this.view.input());
    
    this.view.sensor().to(this.store.input());
    this.getAppSensor().to(this.store.input());
  }
  startComponents() {
    super.startComponents();
  
    // send init action when all components started
    this.getAppSensor().send({
      actionType: Constants.ACTION_INITIATE
    }, false);

    // send render action when store initiated
    this.getAppSensor().send({
      actionType: Constants.ACTION_RENDER,
      url: this.getCurrentLocation()
    }, false);
  }

  run(...args) {
    super.run(...args);
  }
}

export default ReduxSingleRouteApp;
