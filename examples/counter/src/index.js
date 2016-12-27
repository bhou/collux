import React from 'react';
import ReactDOM from 'react-dom';

import Collux from '../../../lib/index.js';

import DevToolAddon from 'collar.js-dev-client';
Collux.use(new DevToolAddon());

const Link = Collux.Link;

class CounterApp extends React.Component {
  constructor(props) {
    super(props);
    this.sensor = this.props.sensor;
    this.state = {}
  }

  onIncrement() {
    this.sensor.send({
      actionType: 'INCREMENT'
    });
  }

  onDecrement() {
    this.sensor.send({
      actionType: 'DECREMENT'
    });
  }

  onIncrementByTen() {
    this.sensor.send({
      actionType: 'INC_BY_TEN'
    });
  }

  render() {
    return (
      <div>
        <Link to='/home' sensor={this.sensor}>back to home</Link>
        <h1>{this.state.value}</h1>
        <button onClick={this.onIncrementByTen.bind(this)}>+10</button>
        <button onClick={this.onIncrement.bind(this)}>+</button>
        <button onClick={this.onDecrement.bind(this)}>-</button>
      </div>
    )
  }
}

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Home</h1>
        <Link to="/counter" sensor={this.props.sensor}>go to counter</Link>
      </div>
    )
  }
}

let app = Collux.createApp('redux-single-route-app', {
  renderer: () => {
    viewComponent = ReactDOM.render(
      <CounterApp sensor={app.getViewSensor()}/>,
      document.getElementById('root')
    )
  },
  viewStateUpdater: (state) => {
    viewComponent.setState(state);
  },
  storeStateInitiator: () => {
    return {value: 101}
  }
});
//let app = Collux.createApp('redux-multiple-routes-app');
let viewComponent = null;

/*
app.setRenderer(() => {
  viewComponent = ReactDOM.render(
    <CounterApp sensor={app.getViewSensor()}/>,
    document.getElementById('root')
  )
});

app.setViewStateUpdater((state) => {
  viewComponent.setState(state);
});
*/

/*
app.setDefaultRoute('/home');

app.route('/counter', {
  render: () => {
    viewComponent = ReactDOM.render(
      <CounterApp sensor={app.getViewSensor()}/>,
      document.getElementById('root')
    )
  },

  updateState: (state) => {
    viewComponent.setState(state);
  }
});


app.route('/home', {
  render: () => {
    viewComponent = ReactDOM.render(
      <Home sensor={app.getViewSensor()}/>,
      document.getElementById('root')
    )
  },

  updateState: (state) => {
    viewComponent.setState(state);
  }
});
*/

/*
app.setStoreStateInitiator(() => {
  return {value: 100}
});
*/

/*
let myState = {value : 0};
let store = new Collux.StoreComponent({
  getName: () => 'custom view',
  //getState: () => { return myState },
  //setState: (state) => {myState.value = state.value},
  //initState: () => {return {value: 1000}}
});
app.setStore(store);
*/

app.reduce('INCREMENT', (prevState, action) => {
  return {value: prevState.value + 1};
});

/*
app.reduce('DECREMENT', (prevState, action) => {
  return {value: prevState.value - 1};
});

app.reduce('INC_BY_TEN', (prevState, action) => {
  return {value: prevState.value + 10};
});
*/

app.run();



