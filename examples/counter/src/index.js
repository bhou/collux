import collar from 'collar.js';
import DevToolAddon from 'collar.js-dev-client';
collar.use(new DevToolAddon());


import React from 'react';
import ReactDOM from 'react-dom';

import Collux from '../../../lib/index.js';

// 1. create components

// view

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

  render() {
    return (
      <div>
        <h1>{this.state.value}</h1>
        <button onClick={this.onIncrement.bind(this)}>+</button>
        <button onClick={this.onDecrement.bind(this)}>-</button>
      </div>
    )
  }
}

const counterView = Collux.createView({
  getName: () => 'counter view',
  render: function() {
    this.comp = ReactDOM.render(
      <CounterApp sensor={this.sensor}/>,
      document.getElementById('root')
    )
  },
  updateState: function(state){
    this.comp.setState({
      value: state
    });
  },
});

// store
var counter = 10;
const counterStore = Collux.createMemStore({
  getName: () => 'counter store',
  initState: () => {return 0},
});

counterStore.reduce('INCREMENT', (prevState, action) => {
  return prevState + 1;
});

counterStore.reduce('DECREMENT', (prevState, action) => {
  return prevState - 1;
});


// dispatcher
const dispatcher = Collux.Dispatcher.default();

// 2. connect components
counterStore.output
  .to(counterView.input);

dispatcher.output
  .to(counterStore.input);

counterView.sensor
  .to(dispatcher.input);
  
// 3. render UI
counterView.render();


