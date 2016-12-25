import React from 'react';
import ReactDOM from 'react-dom';

import Collux from '../../../lib/index.js';

import DevToolAddon from 'collar.js-dev-client';
Collux.use(new DevToolAddon());

class CounterApp extends React.Component {
  constructor(props) {
    super(props);
    this.sensor = this.props.sensor;
    this.state = {
      value: 0
    }
  }

  onIncrement() {
    this.sensor.send({
      actionType: 'INCREMENT'
    })
  }

  onDecrement() {
    this.sensor.send({
      actionType: 'DECREMENT'
    })
  }

  onIncrementByTen() {
    this.sensor.send({
      actionType: 'INC_BY_TEN'
    })
  }

  render() {
    return (
      <div>
        <h1>{this.state.value}</h1>
        <button onClick={this.onIncrementByTen.bind(this)}>+10</button>
        <button onClick={this.onIncrement.bind(this)}>+</button>
        <button onClick={this.onDecrement.bind(this)}>-</button>
      </div>
    )
  }
}

let app = Collux.createApp('redux-single-route-app');
let viewComponent = null;

app.setRenderer(() => {
  viewComponent = ReactDOM.render(
    <CounterApp sensor={app.getViewSensor()}/>,
    document.getElementById('root')
  )
});

app.setViewStateUpdater((state) => {
  viewComponent.setState(state);
});

app.setStoreStateInitiator(() => {
  return {value: 100}
});

app.reduce('INCREMENT', (prevState, action) => {
  return {value: prevState.value + 1};
});

app.reduce('DECREMENT', (prevState, action) => {
  return {value: prevState.value - 1};
});

app.reduce('INC_BY_TEN', (prevState, action) => {
  return {value: prevState.value + 10};
})

app.run();



