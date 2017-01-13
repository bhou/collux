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
      .do('get and update url', s => {
        let msgType = s.get(Constants.MSG_TYPE);

        if (msgType === Constants.MSG_RENDER) {
          let route = s.get(Constants.KEY_URL);
          this._currentUrl = route ? route : this._currentUrl;
        }
        return this._currentUrl;
      })
      .map('inject url in msg and state', s => {
        let state = s.get(Constants.KEY_STATE);
        let parsedUrl = urlParser(s.getResult(), true);
        if (typeof state === 'object') {
          state[Constants.KEY_ROUTE] = parsedUrl;
        }

        return s
          .set(Constants.KEY_STATE, state)
          .set(Constants.KEY_URL, s.getResult())
          .del('__result__');
      })
      .to(this.output());
  }

  start() {}
}

RouterComponent.__COUNT__ = 0;

export default RouterComponent;
