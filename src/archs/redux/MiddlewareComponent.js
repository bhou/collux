import Constants from '../Constants';
import Component from '../../Component';

class MiddlewareComponent extends Component {
  constructor() {
    super('middlewares');
  
    this._middlewares = [];
  }

  use(name, middleware, async) {
    this._middlewares.push({
      name,
      fn,
      async
    });
    return this;
  }

  init() {
    let currentNode = this.input();
    for (let middleware of this._middlewares) {
      if (middleware.async) {
        currentNode = currentNode.processor(middleware.name, (s, done) => {
          try {
            middleware.fn(s.payload, (newPayload) => {
              done(null, s.new(newPayload));
            });
          } catch (e) {
            done(e);
          }
        });
      } else {
        currentNode = currentNode.map(middleware.name, s => {
          let newPayload = middleware.fn(s.payload);
          return s.new(newPayload);
        });
      }
    }
    
    currentNode
      .errors(s => {
        console.error(s.error)
      })
      .to(this.output());
  }

  start() {}
}


export default MiddlewareComponent;
