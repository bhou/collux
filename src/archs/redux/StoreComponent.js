import Constants from '../Constants';
import Component from '../../Component';

class StoreComponent extends Component {
  constructor(options = {}) {
    let name = options.getName ? options.getName() : StoreComponent.getNextDefaultStoreName();
    super(name);
    this._isGetStateAsync = !! options.getStateAsync;
    this._isSetStateAsync = !! options.setStateAsync;
    this._isInitStateAsync = !! options.initStateAsync;

    this._syncStateGetter = options.getState || function() {return {}};
    this._asyncStateGetter = options.getStateAsync;

    this._syncStateSetter = options.setState || function(state) {};
    this._asyncStateSetter = options.setStateAsync;

    this._syncStateInitiator = options.initState || function() {return {}};
    this._asyncStateInitiator = options.initStateAsync;

    this._prepareStateChanged = this.ns().map('prepare [state changed]', {
      __result__: 'the new store state object'
    }, {
      msgType: '[state changed]',
      state: 'the new store state object'
    }, s => {
        return s.new({
          msgType: Constants.MSG_STATE_CHANGED,
          state: s.getResult()
        })
      });
    this._prepareStateChanged
      .errors((s) => {
        console.error(s.error);
      })
      .to(this.output());


    this._saveStateAndNotify = this.setStateActuator();
    this._saveStateAndNotify.to(this._prepareStateChanged);
  }

  init() {
    // --------------------------
    // basic flow
    this.input()
      .when(Constants.ACTION_RENDER, s => {
        return s.get(Constants.ACTION_TYPE) === Constants.ACTION_RENDER;
      })
      .to(this.initStateActuator())
      .map('reduce', s => {
        let prevState = s.getResult();
        return s.new({
          state: prevState
        })
      })
      .to(this.setStateActuator())
      .map('prepare [render]', s => {
        return s.new({
          msgType: Constants.MSG_RENDER,
          state: s.getResult()
        })
      })
      .errors(s => {
        console.log(s.error);
      })
      .to(this.output());

    this.reduce(Constants.ACTION_GET_STATE, (prevState, action) => {
      return prevState;
    });

    this.reduce(Constants.ACTION_SET_STATE, (prevState, action) => {
      return action.state;
    });
  }

  setStateSetter(stateSetter, async) {
    this._isSetStateAsync = async;
    if (!!async) {
      this._asyncStateSetter = stateSetter;
    } else {
      this._syncStateSetter = stateSetter;
    }
  }

  setStateGetter(stateGetter, async) {
    this._isGetStateAsync = async;
    if (!!async) {
      this._asyncStateGetter = stateGetter;
    } else {
      this._syncStateGetter = stateGetter;
    }
  }

  setStateInitiator(stateInitiator, async) {
    this._isInitStateAsync = async;
    if (!!async) {
      this._asyncStateInitiator = stateInitiator;
    } else {
      this._syncStateInitiator = stateInitiator;
    }
  }

  initStateActuator() {
    return this.ns().actuator('state initiator', { 
      any: 'the initiatation parameter'
    }, {
      __result__: 'initialised state'
    }, (s, done) => {
      try {
        if (this._isInitStateAsync) {
          this._asyncStateInitiator.call(this, done);
        } else {
          let state = this._syncStateInitiator.call(this);
          return done(null, state);
        }
      } catch (e) {
        return done(e);
      }
    });

  }

  getStateActuator() {
    return this.ns().actuator('state getter', {}, {
      __result__: 'the current state object'
    }, (s, done) => {
      try {
        if (this._isGetStateAsync) {
          this._asyncStateGetter.call(this, done);
        } else {
          let state = this._syncStateGetter.call(this);
          return done(null, state);
        }
      } catch (e) {
        return done(e);
      }
    });
  }

  setStateActuator() {
    let actuator = this.ns().actuator('state setter', {
      state: 'the new state object'
    }, {
      __result__: 'the saved state object'
    }, (s, done) => {
      try {
        let state = s.get(Constants.STATE);
        if (state === null || state === undefined) {
          return done(new Error('state could NOT be null or undefined! Maybe use INITIATE action to init the state?'));
        }

        if (this._isSetStateAsync) {
          this._asyncStateSetter.call(this, state, done);
        } else {
          this._syncStateSetter.call(this, state);
          return done(null, state);
        }
      } catch (e) {
        return done(e);
      }
    });

    return actuator;
  }

  notifyStoreChangedActuator() {
    return this._prepareStoreChanged;
  }
  
  reduce(actionType, reducer) {
    this.input()
      .when(actionType, s => s.get(Constants.ACTION_TYPE) === actionType)
      .to('get previous state', this.getStateActuator())
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
      .to('save new state', this._saveStateAndNotify);
  }

  reduceAsync(actionType, reducer) {
    this.input()
      .when(actionType, s => s.get(Constants.ACTION_TYPE) === actionType)
      .to('get previous state', this.getStateActuator())
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
      .to('save new state', this._saveStateAndNotify);
  }

  static getNextDefaultStoreName() {
    StoreComponent.__COUNT__++;
    return `store_${StoreComponent.__COUNT__}`;
  }

}

StoreComponent.__COUNT__ = 0;

export default StoreComponent;
