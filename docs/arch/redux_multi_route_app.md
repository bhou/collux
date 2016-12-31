# ReduxMultipleRoutesApp

In multipls routes redux application, there are four components:

- store component
- router component
- view component
- system component

![multiple routes application architecture](../assets/redux-multiple-routes-app-arch-1-a.png)

See the following diagram to understand the architecture and data flow of redux multiple routes application architecture. (This diagram is generated from [collar dev tool](http://collarjs.com))

![multiple routes application architecture](../assets/redux-multiple-routes-app-arch-2.png)

Check [ReduxMultipleRoutesApp](../api/redux_multi_route_app.md) class

## Architecture Guide

The multiple routes application architecture can be customized in the following ways:

#### Setup the initial state

This could be done either by the constructor option *initState*, or through the *setStoreStateInitiator* function.

```javascript
const app = Collux.createApp('redux-single-route-app', {
  initState: () => {
    return 100;
  }
});
```

Or

```javascript
app.setStoreStateInitiator(() => {
  return 100;
})
```

#### Add a route

You need to specify two options (*render* and *updateState*) to add a page to the application.

```javascript
var counterView = null;
app.route('/counter', {
  render: () => {
    counterView = ReactDOM.render(
      <CounterView />,
      document.getElementById('counter')
    )
  },
  updateState: (state) => {
    counterView.setState({
      value: state
    })
  }
})
```

#### Set the default route

By default, the default route is '/'. You can change the default route with *setDefaultRoute* function

```javascript
app.setDefaultRoute('/counter');
```


#### Add reducer to handle actions

You can use *reduce* function to add a new action processing data flow, for example, the *INCREMENT* action data flow in the above diagram is created by the following code:

```javascript
app.reduce('INCREMENT', (prevState, action) => {
  return prevState + 1;
});
```


&nbsp;

&nbsp;

&nbsp;
