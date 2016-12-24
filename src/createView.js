import Constants from './Constants';
import createComponent from './createComponent';

var anonymousViewCount = 0;

export default function createView(options = {}) {
  let getName = options.getName || function() { anonymousViewCount++; return `view_${anonymousViewCount}`};
  
  let component = createComponent(getName());
  // ui sensor
  let sensor = component.ns.sensor(name + ' sensor', function() {});
  
  // render method
  let render = options.render || function() {};
  
  // update view
  let updateState = options.updateState || function() {};
  updateState = updateState.bind(component);

  // update view actuator
  let updateActuator = function() {
    return component.ns.actuator('update view', (s, done) => {
      try {
        updateState(s.get(Constants.STATE));
        done();
      } catch (e) {
        return done(e);
      }
    });
  }

  // basic flow
  component.input
    .when('store changed', {
      msgType: 'must be [store changed]',
      state: 'the new state object'
    }, s => s.get(Constants.MSG_TYPE) === Constants.MSG_STORE_CHANGED)
    .to(updateActuator())
    .errors(s => {
      console.error(s.error);
    })
    .to(component.output);

  // export methods
  component.sensor = sensor;
  component.render = render;
  component.updateState = updateState;
  component.updateStateActuator = updateActuator;
  return component;
}


