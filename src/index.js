import App from './App';
import Component from './Component';

import Constants from './archs/Constants';
import createApp from './createApp';
import archs from './archs';

import collar from 'collar.js';

export default {
  App,
  Component,
  
  Constants: Constants,
  createApp: createApp,
  registerArch: archs.register,
  
  use: function(addon) {
    collar.use(addon);
  }
};

