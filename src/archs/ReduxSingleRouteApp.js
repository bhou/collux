import React from 'react';
import Constants from './Constants';
import App from '../App';
import MemoryStoreComponent from './redux/MemoryStoreComponent';
import ViewComponent from './redux/ViewComponent';
import page from 'page'; // TODO: remove it. this is not good, single route app do not need page module

class ReduxSingleRouteApp extends App {
  constructor(options = {}) {
    super();

    this._sysComponent = this.createComponent('system');
    this._appSensor = this._sysComponent.ns().sensor('app sensor', function() {})
    
    this.view = new ViewComponent({
      getName: () => 'view',
      render: 
        options.render,
      updateState: 
        options.updateState,
    });

    this.store = new MemoryStoreComponent({
      getName: () => 'store',
      initState:
        options.initState,
    });


    // nested Link class
    let _appSensor = this._appSensor;
    class Link extends React.Component {

      handleClick(event) {
        if (this.props.onClick) {
          this.props.onClick(event);
        }

        if (event.button !== 0 /* left click */) {
          return;
        }

        if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) {
          return;
        }

        if (event.defaultPrevented === true) {
          return;
        }

        event.preventDefault();

        if (this.props.to) {
          page.redirect(this.props.to);
          _appSensor.send({
            actionType: 'RENDER',
            url: this.props.to
          })
        } else {
          console.log(event.currentTarget.pathname, event.currentTarget.search)
        }
      };

      render() {
        const { props } = this.props; 
        return (
          <a href={this.props.to} {...props} onClick={this.handleClick.bind(this)}>
            {this.props.children}
          </a>
        );
      }
    } // END OF NESTED LINK CLASS

    this.Link = Link;
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
    if (typeof window === 'undefined') {
      console.warn('Window Object does not exist!')
      return null;
    }
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
