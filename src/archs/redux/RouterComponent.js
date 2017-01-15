import Constants from '../Constants';
import Component from '../../Component';

import urlParser from 'url-parse';

class RouterComponent extends Component {
  constructor(options = {}) {
    let name = options.getName ? options.getName() : RouterComponent.getNextDefaultViewName();
    super(name);
    this.options = options;
    this._currentUrl = null;
  }

  init() {
    this.input()
      .do('check url change', s => {
        let msgType = s.get(Constants.MSG_TYPE);

        if (msgType === Constants.MSG_RENDER) {
          // change the current url when received render msg
          let route = s.get(Constants.KEY_URL);
          this._currentUrl = route ? route : this._currentUrl;
        }

        // redirect according to 'url' state value
        let state = s.get(Constants.KEY_STATE);
        let stateUrl = state[Constants.STATE_SYS][Constants.STATE_URL];
        
        let redirect = false;
        if (stateUrl != this._currentUrl) {
          this._currentUrl = stateUrl;
          redirect = true;
        }
        
        return {
          url: this._currentUrl,
          redirect
        };
      })
      .map('inject url in msg and state', s => {
        let destination = s.getResult();

        let state = s.get(Constants.KEY_STATE);
        // inject parsed url object into state
        let parsedUrl = urlParser(destination.url, true);
        if (typeof state === 'object') {  // to compatible with primitive type state
          state[Constants.STATE_SYS][Constants.STATE_PARSED_URL] = parsedUrl;
        }

        // change msg type to 'render' if redirect url is set
        let newSignal = destination.redirect ? s.set(Constants.MSG_TYPE, Constants.MSG_RENDER) : s;
        return newSignal
          .set(Constants.KEY_STATE, state)
          .del('__result__');
      })
      .to(this.output());
  }

  start() {}
}

RouterComponent.__COUNT__ = 0;

export default RouterComponent;
