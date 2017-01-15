import Constants from '../../Constants';
import urlParser from 'url-parse';

var currentUrl = null;

export default function router(msg) {
  let msgType = msg[Constants.MSG_TYPE];
  let state = msg[Constants.KEY_STATE];
  let stateUrl = state[Constants.STATE_SYS][Constants.STATE_URL];

  if (msgType === Constants.MSG_RENDER) {
    // change the current url when received render msg
    currentUrl = stateUrl ? stateUrl : currentUrl;
  }

  let redirect = false;
  if (stateUrl != currentUrl) {
    currentUrl = stateUrl;
    redirect = true;
  }

  let parsedUrl = urlParser(currentUrl, true);
  state[Constants.STATE_SYS][Constants.STATE_PARSED_URL] = parsedUrl;

  if (redirect) msg[Constants.MSG_TYPE] = Constants.MSG_RENDER;
  msg[Constants.KEY_STATE] = state;

  return msg;
}
