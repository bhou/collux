import Component from './Component';

class App {
  constructor() {
    this._components = new Map();
  }

  addComponent(component) {
    this._components.set(component.name, component);
  }

  createComponent(name, namespace, metadata = {}) {
    if (!metadata.arch) metadata.arch = name;
    if (!namespace) namespace = name;
    
    let component = new Component(name, namespace, metadata);

    this._components.set(name, component);

    return component;
  }

  hasComponent(name) {
    return this._components.has(name);
  }

  getComponentByName(name) {
    return this._components.get(name);
  }

  initComponents() {
    for (let component of this._components.values()) {
      component.init();
    }
  }

  connectCompnents() {}

  startComponents() {
    for (let component of this._components.values()) {
      component.start();
    }
  }

  run() {
    this.initComponents();
    this.connectComponents();
    this.startComponents();
    // other stuffs here
  }
}

export default App;
