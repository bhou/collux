import Constants from '../Constants';
import Component from '../../Component';

class StoreComponent extends Component {
  constructor(options = {}) {
    let name = options.getName ? options.getName() : StoreComponent.getNextDefaultStoreName();
    super(name);
    this.options = options;
    this._isGetStateAsync = !! options.getStateAsync;
    this._isSetStateAsync = !! options.setStateAsync;
    this._isInitStateAsync = !! options.initStateAsync;
    this._isSaveInitStateAsync = !! options.saveInitStateAsync;

    this._syncStateGetter = options.getState;
    this._asyncStateGetter = options.getStateAsync;

    this._syncStateSetter = options.setState;
    this._asyncStateSetter = options.setStateAsync;

    this._syncStateInitiator = options.initState;
    this._asyncStateInitiator = options.initStateAsync;

    this._syncInitStateSaver = options.saveInitState;
    this._asyncInitStateSaver = options.saveInitStateAsync;

    this._reduceCounter = 0;

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

    this._saveStatePipeline = null;

    this._errorhandler = this.ns().errors(s => {
        console.log(s.error);
      });
  }

  init() {
    this._errorhandler.to(this.output());
    
    // connect the nodes here

    // --------------------------
    // basic flow
    
    // render keeps all the properties in your signal
    this.input()
      .when(Constants.ACTION_INITIATE, s => {
        return s.get(Constants.ACTION_TYPE) === Constants.ACTION_INITIATE;
      })
      .to(this.initStateActuator())
      .map(`@reducer_${Constants.ACTION_INITIATE} reduce`, {
        __result__: 'the previous state object'
      }, {
        state: 'the new state obejct'
      }, s => {
        return s.set(Constants.KEY_STATE, s.getResult());
      })
      .to(this.initStateSaver())
      .errors(s => {
        console.error(s.error);
      });

    this.input()
      .when(Constants.ACTION_RENDER, s => {
        return s.get(Constants.ACTION_TYPE) === Constants.ACTION_RENDER;
      })
      .to(this.getStateActuator())
      .map('prepare [render]', s => {
        return s.set(Constants.MSG_TYPE, Constants.MSG_RENDER)
          .set(Constants.KEY_STATE, s.getResult())
          .del(Constants.ACTION_TYPE)
          .del('__result__');
      })
      .to(this._errorhandler);
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

  setInitStateSaver(initStateSaver, async) {
    this._isSaveInitStateAsync = async;
    if (!!async) {
      this._asyncInitStateSaver = initStateSaver;
    } else {
      this._syncInitStateSaver = initStateSaver;
    }
  }

  initStateSaver() {
    if (!this._asyncInitStateSaver && !this._syncInitStateSaver) {
      return this.setStateActuator();
    }

    return this.ns().actuator('init state saver', {
      __result__: 'the init state object'
    }, {
      __result__: 'the saved state object'
    }, (s, done) => {
      try {
        let state = s.get(Constants.KEY_STATE);
                
        if (this._isSaveInitStateAsync) {
          this._asyncInitStateSaver.call(this, state, done);
        } else {
          this._syncInitStateSaver.call(this, state);
          return done(null, state);
        }
      } catch (e) {
        return done(e);
      }
    });
  }

  initStateActuator() {
    let actuator = this.ns().actuator('state initiator', { 
      any: 'parameter'
    }, {
      __result__: 'initial state'
    }, (s, done) => {
      try {
        if (!this._asyncStateInitiator && !this._syncStateInitiator) {
          return done();
        }
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

    if ((!this._asyncStateInitiator && !this._syncStateInitiator)) {
      actuator.removeFeature('impl').addFeature('todo');
    } else {
      actuator.removeFeature('todo').addFeature('impl');
    }
    return actuator;
  }

  getStateActuator() {
    let actuator = this.ns().actuator('state getter', {}, {
      __result__: 'the current state object'
    }, (s, done) => {
      try {
        if (!this._asyncStateGetter && !this._syncStateGetter) {
          return done();
        }

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

    if (!this._asyncStateGetter && !this._syncStateGetter)  {
      actuator.removeFeature('impl').addFeature('todo');
    } else {
      actuator.removeFeature('todo').addFeature('impl');
    }
    return actuator;
  }

  setStateActuator() {
    let actuator = this.ns().actuator('state setter', {
      state: 'the new state object'
    }, {
      __result__: 'the saved state object'
    }, (s, done) => {
      try {
        let state = s.get(Constants.KEY_STATE);
        if (!this._asyncStateSetter && !this._syncStateSetter) {
          return done(null, state);
        }

        if (state === null || state === undefined) {
          return done(new Error('state could NOT be null or undefined! Maybe setup a state initiator before starting the app?'));
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

    if (!this._asyncStateSetter && !this._syncStateSetter) {
      actuator.removeFeature('impl').addFeature('todo');
    } else {
      actuator.removeFeature('todo').addFeature('impl');
    }
    return actuator;
  }

  notifyStoreChangedActuator() {
    return this._prepareStoreChanged;
  }
  
  reduce(actionType, reducer) {
    if (this._reduceCounter == 0) {
      this._prepareStateChanged.to(this._errorhandler);
      this._saveStatePipeline = this.setStateActuator();
      this._saveStatePipeline.to(this._prepareStateChanged);
    } 
    
    this._reduceCounter++;

    this.input()
      .when(actionType, s => s.get(Constants.ACTION_TYPE) === actionType)
      .to('state getter', this.getStateActuator())
      .map(`@reducer_${actionType} reduce`, {
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
      .to(this._saveStatePipeline);
  }

  reduceAsync(actionType, reducer) {
    if (this._reduceCounter == 0) {
      this._prepareStateChanged.to(this._errorhandler);
      this._saveStatePipeline = this.setStateActuator();
      this._saveStatePipeline.to(this._prepareStateChanged);
    }
    
    this._reduceCounter++;
    
    this.input()
      .when(actionType, s => s.get(Constants.ACTION_TYPE) === actionType)
      .to('state getter', this.getStateActuator())
      .map(`@reducer_${actionType} reduce`, {
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
      .to('state setter', this.setStateActuator())
      .to(this._prepareStateChanged);
  }

  static getNextDefaultStoreName() {
    StoreComponent.__COUNT__++;
    return `store_${StoreComponent.__COUNT__}`;
  }

}

StoreComponent.__COUNT__ = 0;

export default StoreComponent;
