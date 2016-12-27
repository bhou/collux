import App from './App';
import Component from './Component';

import Constants from './archs/Constants';
import createApp from './createApp';
import archs from './archs';
import StoreComponent from './archs/redux/StoreComponent';
import ViewComponent from './archs/redux/ViewComponent';
import Link from './archs/redux/Link';

import collar from 'collar.js';

export default {
  App,
  Component,
  
  StoreComponent,
  ViewComponent,

  Link,

  Constants: Constants,
  createApp: createApp,
  registerArch: archs.register,
  
  use: function(addon) {
    collar.use(addon);
  },
};

