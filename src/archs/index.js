import ReduxSingleRouteApp from './ReduxSingleRouteApp';
import ReduxMultiRoutesApp from './ReduxMultipleRoutesApp';

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

archs.register('redux-single-route-app', function(appName, options) {
  return new ReduxSingleRouteApp(appName, options);
});
archs.register('redux-multiple-routes-app', function(appName, options) {
  return new ReduxMultiRoutesApp(appName, options);
});

export default archs;
