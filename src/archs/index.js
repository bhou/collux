import buildReduxSingleRouteApp from './redux/ReduxSingleRouteApp';

class ArchitectureRegistry {
  constructor() {
    this._archs = new Map();
  }
  
  register(name, appBuilder) {
    this._archs.set(name, appBuilder);
  }

  get(name) {
    return this._archs.get(name);
  }
}

let archs = new ArchitectureRegistry();

archs.register('redux-single-route-app', buildReduxSingleRouteApp);

export default archs;
