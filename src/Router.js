import Constants from './Constants';
import createComponent from './createComponent';
import page from 'page';

var router = createComponent('router');

// route pattern - route object pair
var routes = new Map();

let route = function(pattern, view) {
  routes.set(pattern, new page.Route(pattern));
  
  router.input
    .when(pattern, s => {
      let route = routes.get(pattern);
      if (!route) return false;
      
      let state = s.get(Constants.STATE);
      if (!state || !state.hasOwnProperty(Constants.STATE_ROUTE)) return false;
      
      let path = state[Constants.STATE_ROUTE];
      return route.match(path, {});
    })
    .to(view.input);
}


router.route = route;

export default router;
