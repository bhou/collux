import Constants from './Constants';
import createComponent from './createComponent';

var anonymousStoreCount = 0;
export default function createStore(options = {}) {
  let getName = options.getName 
    || function() {anonymousStoreCount++; return `store_${anonymousStoreCount}`};

  let component = createComponent(getName());

  let isGetStateAsync = !!options.getStateAsync;
  let isSaveStateAsync = !!options.saveStateAsync;
  let isInitStateAsync = !!options.initStateAsync;
  
  let getState = null;
  let saveState = null;
  let initState = null;
    
  // get current state
  if (isGetStateAsync)
    getState = options.getStateAsync;
  else 
    getState = options.getState;
  getState = getState.bind(component);
  
  // save state
  if (isSaveStateAsync)
    saveState = options.saveStateAsync;
  else
    saveState = options.saveState;
  saveState = saveState.bind(component);

  // init state
  if (isInitStateAsync)
    initState = options.initStateAsync;
  else
    initState = options.initState;
  initState = initState.bind(component);


  // get state actuator
  let getStateActuator = function() {
    return component.ns.actuator('get state', {
    }, {
      __result__: 'the current state object'
    }, (s, done) => {
      try {
        if (isGetStateAsync) {
          getState(done);
        } else {
          let state = getState();
          return done(null, state);
        }
      } catch (e) {
        return done(e);
      }
    });
  }

  // init state actuator
  let initStateActuator = function() {
    return component.ns.actuator('init state', {
      any: 'the initiatation parameter'
    }, {
      __result__: 'initialised state'
    }, (s, done) => {
      try {
        if (isInitStateAsync) {
          initState(done);
        } else {
          let state = initState();
          return done(null, state);
        }
      } catch (e) {
        return done(e);
      }
    });
  }

  // notify store changed actuator
  let prepareStoreChanged = component.ns.map('prepare [store changed]', {
    __result__: 'the new store state object'
  }, {
    msgType: '[store changed]',
    state: 'the new store state object'
  }, s => {
      return s.new({
        msgType: Constants.MSG_STORE_CHANGED,
        state: s.getResult()
      })
    });
  prepareStoreChanged
    .errors((s) => {
      console.error(s.error);
    })
    .to(component.output);
  let notifyStoreChangedActuator = function() {
    return prepareStoreChanged;
  }
  
  // save state actuator
  let saveStateActuator = function() {
    let actuator = component.ns.actuator('save state', {
      state: 'the new state object'
    }, {
      __result__: 'the saved state object'
    }, (s, done) => {
      try {
        let state = s.get(Constants.STATE);
        if (state === null || state === undefined || isNaN(state)) {
          return done(new Error('state could NOT be null or undefined! Maybe use INITIATE action to init the state?'));
        }

        if (isSaveStateAsync) {
          saveState(done);
        } else {
          saveState(state);
          return done(null, state);
        }
      } catch (e) {
        return done(e);
      }
    });

    return actuator;
  }

  // save state and notify tail
  let saveStateAndNotify = saveStateActuator();
  saveStateAndNotify.to(prepareStoreChanged);
  

  // reducer
  let reduce = (actionType, reducer) => {
    component.input
      .when(actionType, s => s.get(Constants.ACTION_TYPE) === actionType)
      .to('get previous state', component.getStateActuator())
      .map('reduce', {
        __result__: 'the previous state object'
      }, {
        state: 'the new state obejct'
      }, s => {
        let state = s.getResult();
        let newState = reducer(state, s.payload);

        return s.new({
          state: newState
        });
      })
      .to('save new state', saveStateAndNotify);
  }

  let reduceAsync = (actionType, reducer) => {
    component.input
      .when(actionType, s => s.get(Constants.ACTION_TYPE) === actionType)
      .to('get previous state', component.getStateActuator())
      .map('reduce', {
        __result__: 'the previous state object'
      }, {
        state: 'the new state obejct'
      }, (s, done) => {
        let state = s.getResult();
        reducer(state, s.payload, (error, newState) => {
          if (error) {
            return done(error);
          }

          done(null, newState);
        });
      })
      .to('save new state', saveStateAndNotify);
  }
  
  // export methods
  component.getState = !isGetStateAsync ? getState : null;
  component.getStateAsync = isGetStateAsync ? getState : null;
  component.saveState = !isSaveStateAsync ? saveState : null;
  component.saveStateAsync = isSaveStateAsync ? saveState : null;
  
  component.initState = function() {
    component.input.push({
      actionType: 'INITIATE'
    });
  }

  component.reduce = reduce;
  component.reduceAsync = reduceAsync;

  component.getStateActuator = getStateActuator;
  component.saveStateActuator = saveStateActuator;
  component.notifyStoreChangedActuator = notifyStoreChangedActuator;

  // basic flow
  component.input
  .when(Constants.ACTION_INITIATE, s => {
      return s.get(Constants.ACTION_TYPE) === Constants.ACTION_INITIATE
        && initState; // only pass the action when initState is defined
    })
    .to(initStateActuator())
    .map('reduce', s => {
      return s.new({
        state: s.getResult()
      })
    })
    .to(saveStateAndNotify);

  reduce(Constants.ACTION_GET_STATE, (prevState, action) => {
    return prevState;
  });

  reduce(Constants.ACTION_SET_STATE, (prevState, action) => {
    return action.state;
  });

  // initiate the state
  component.initState();
  return component;
}

