import createComponent from './createComponent';

var anonymousDispatcherCount = 0;

export default function createDispatcher(options = {}) {
  let getName = options.getName || function() { anonymousDispatcherCount++; return `dispatcher_${anonymousDispatcherCount}`};
  
  let component = createComponent(getName());
  
  return component;
}



