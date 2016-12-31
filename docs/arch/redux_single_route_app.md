# Redux Single Route Application architecture

In single route redux application, there are three components:

- store component
- view component
- system component

![single route application architecture](../assets/redux-single-route-app-arch-1.png)

See the following diagram to understand the architecture and data flow of redux single route application architecture. (This diagram is generated from [collar dev tool](http://collarjs.com))

![single route application architecture](../assets/redux-single-route-app-arch-3.png)

Check [ReduxSingleRouteApp](../api/redux_single_route_app.md) class

## Architecture Guide

The single route application architecture can be customized in the following ways:

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

#### Render the view

This could be done either by the constructor option *render*, or through the *setRenderer* function.

```javascript
const app = Collux.createApp('redux-single-route-app', {
  render: () => {
    ReactDOM.render(
      <CounterView />,
      document.getElementById('counter')
    )
  }
});
```

Or

```javascript
app.setRenderer(() => {
  ReactDOM.render(
    <CounterView />,
    document.getElementById('counter')
  )
})
```

#### Setup the view state updater

When store state changes, the new state will be pushed to the view, you need to setup a view state updater to update your view with the new state. This could be done either by the constructor option *updateState*, or through the *setViewStateUpdater* function.

```javascript
const app = Collux.createApp('redux-single-route-app', {
  updateState: (state) => {
    counterView.setState({
      value: state
    })
  }
});
```

Or

```javascript
app.setViewStateUpdater((state) => {
  counterView.setState({
    value: state
  })
})
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
