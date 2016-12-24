import Constants from './Constants';
import createStore from './createStore';

export default function createMemStore(options = {}) {
  
  let _state = null;

  let store = createStore({
    getName: options.getName,
    getState:function() {
      return _state;
    },
    saveState: function(state) {
      _state = state;
    },
    initState: options.initState,
    initStateAsync: options.initStateAsync
  });

  return store;
}
