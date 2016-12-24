import createComponent from './createComponent';

var dispatcher = createComponent('dispatcher');
export default {
  default: function () {
    dispatcher.input.to(dispatcher.output);
    return dispatcher;
  }
};


