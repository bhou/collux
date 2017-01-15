const collar = require('collar.js');
const CollarTestAddon = require('collar.js-test-addon');
const CollarDevToolAddon = require('collar.js-dev-client');
const Collux = require('../lib/index').default;

exports["test redux framework"] = {
  "test reducer pipeline": (test) => {
    const testAddon = new CollarTestAddon();
    collar
      .use(testAddon)
      //.use(new CollarDevToolAddon());

    const app = Collux.createApp('redux-single-route-app', {
      initState: () => {
        return {v: 100};
      }
    })
    
    app.reduce('INCREMENT', (prevState, action) => {
      return {
        v: prevState.v + 1
      };
    });
    
    app.run();

    
    const testSuite = testAddon.getTestSuite('store.store.input', 'store.store.output');
    testSuite.test({
      actionType: 'INCREMENT'
    }, (error, result) => {
      test.equal(result.msgType, 'state changed');
      test.equal(result.state.v, 101);
      test.done();
    });
  },

  "test state changed notification": (test) => {
    const testAddon = new CollarTestAddon();
    collar
      .use(testAddon)
      //.use(new CollarDevToolAddon());

    const app = Collux.createApp('redux-single-route-app', {
      initState: () => {
        return {v: 100};
      }
    })
    
    app.reduce('INCREMENT', (prevState, action) => {
      return {
        v: prevState.v + 1
      };
    });
    
    app.run();

    
    const testSuite = testAddon.getTestSuite('store.store.input', 'view.view.input');
    testSuite.test({
      actionType: 'INCREMENT'
    }, (error, result) => {
      test.equal(result.msgType, 'state changed');
      test.equal(result.state.v, 101);
      test.done();
    });
  },

  "test override": (test) => {
    const testAddon = new CollarTestAddon();
    collar
      .use(testAddon)
      //.use(new CollarDevToolAddon());

    const app = Collux.createApp('redux-single-route-app', {
      initState: () => {
        return {v: 100};
      }
    })
    
    app.reduce('INCREMENT', (prevState, action) => {
      return {
        v: prevState.v + 1
      };
    });

    app.override('store.reducer_INCREMENT', 'processor.sync', s => {
      let prevState = s.getResult();
      return s.set('state', {v: prevState.v + 2});
    })
    
    app.run();

    
    const testSuite = testAddon.getTestSuite('store.store.input', 'store.store.output');
    testSuite.test({
      actionType: 'INCREMENT'
    }, (error, result) => {
      test.equal(result.msgType, 'state changed');
      test.equal(result.state.v, 102);
      test.done();
    });
  }

}
