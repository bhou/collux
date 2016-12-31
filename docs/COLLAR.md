# Collar.js In 5 minutes

Collux is implemented with [collar.js](http://collarjs.com). Usually you don't need to understand collar.js to write your application with Collux.

But the understanding of collar.js can help you write your own architecture and benefit from the all the cool developement features of collar dev tool.

You can skip this chapter if you only want to use collux to write your application.

## Message (Signal) driven

Collar.js is a message driven library. Data flows in your system as message, and called a **Signal**. Signal is an immutable object, you can set its payload with `set` method, get the payload with `get` method, and get the whole payload by accessing `payload` property.

```javascript
const signal1 = new collar.Signal({value: 100});
console.log(signal1.get('value')) // --> 100

const signal2 = signal1.set('a.b', 100)
console.log(signal1.payload)   // --> immutable, still be {value: 100}
console.log(signal1.get('a'))  // --> null
console.log(signal1.get('a.b'))  // --> null
console.log(signal2.payload)   // --> {value: 100, a : { b: 100}}
console.log(signal2.get('a'))  // --> {b : 100}
console.log(signal2.get('a.b'))  // --> 100
```

## Basic element: node

In collar.js, the basic signal processing unit is `node`. Each node has a unique input to receive signal, and a unique output to emit signal. You can use `push(signal)` method to push a signal to a node's input (for processing), and use `send(signal)` method to emit a signal from a node.

## Node is organized with namespace

Each node belongs to a unique namespace, you can only create a node from a namespace. Use `collar.ns()` method to create one:

```javascript
const ns = collar.ns('com.yournamespace.anything')
```

You can specify several metadata to the namespace too:

```javascript
const nsWithMetadata = collar.ns('com.yournamespace.anything', {
  author: 'your name',
  company: 'your company',
  module: 'the module name'
})
```

## Create nodes

Namespace provide several node constructors to help you build your node. Here is the basic signature of the constructors:

> constructor(comment: string, inputs: object, outputs: object, handler: function)

The first argument is an optional comment string to help you understand what your node does.

The second and third argument are optional map objects, describing the input signal and output signal of your node.

The fourth argument is the signal handler to process the incoming signal. Handler always accepts a signal as the first argument, and returns a signal (for synchronous node): `handler(signal, ...args): signal`

There are 4 types of basic elements:

#### sensor

Sensor does not accept signal from its input, it listens to the external world and convert external event into your domain signal, and emit it via its output.

```javascript
const sensor = ns.sensor('jquery ui sensor', function() {
  $('#button').click(() => {  // listen to external world (UI event)
    this.send({actionType: 'button clicked'}) // send your domain signal
  })
})
```

#### filter

Filter controls the signal flow. If filter signal handler returns true, the signal pass to next connected node, otherwise blocked propagation. Use `filter` or `when` to construct a filter.

```javascript
const filter = ns.filter('only allow even value pass', s => {
  return s.get('value') % 2 === 0
})
```

#### actuator

Actuator is a node, who makes side effect, and it can interact with external world. For example, write to a log file or database. Actuator does not change the signal, it keep the incoming signal unchanged and emit it. The return value of actuator is set to a special field in signal to pass to next node. You can call `signal.getResult()` to get it. Use `do(signal)` to create an actuator or `actuator` to create an asynchronous one.

```javascript
const actuator = ns.do('log the signal', s => {
  console.log(signal.payload);
})
```

#### processor

Processor is a pure function, it does not make side effects. It processes based on the incoming signal, and emit a new signal. Use `map(signal)` to create a processor or `processor(signal, done)` for asynchronous one.

```javascript
const processor = ns.map('double the input value', s => {
  return s.new({    // use signal.new to create a new signal
    value: s.get('value') * 2
  });
})
```

## Connect nodes together

#### Direct connection

You can connect nodes together with `to` method. It connects the node A's output to the node B's input. Every signal emitted by node A will be received by the node B. `to` method returns the connected node B, so that you can chain multiple nodes all together.

> nodeA.to(comment: string, nodeB: Node)

```javascript
const filter = ns.when('only allow even value pass', s => {
  return s.get('value') % 2 === 0
});

const double = ns.map('double the input value', s => {
  return s.new({    // use signal.new to create a new signal
    value: s.get('value') * 2
  });
});

filter.to(double).to(anotherNode);
```
#### Delegation
Another way to connect nodes is `through` method:

> nodeA.through(comment: string, inputNode: Node, outputNode: Node, asActuator: boolean)

Different from `to` method, `through` accepts two nodes as arguments: one input node, and one output node. It returns the output node so that you can chain other nodes. `through` delegates the signal processing to another pipeline. You can build a signal processing pipeline somewhere else with an input node, and an output node. And later, you can integrate it to another pipeline.

```javascript
const filter = ns.when('only allow even value pass', s => {
  return s.get('value') % 2 === 0
});

const double = ns.map('double the input value', s => {
  return s.new({    // use signal.new to create a new signal
    value: s.get('value') * 2
  });
});

filter
  .through(double, double) // input and output could be the same node
  .to(anotherNode);
```

Run collar-dev-server, open [http://localhost:7500](http://localhost:7500), and rerun the following codepen to understand how "to" and "through" works

<p data-height="500" data-theme-id="dark" data-slug-hash="JbgprG" data-default-tab="js" data-user="bhou" data-embed-version="2" data-pen-title="collar.js - build pipeline" class="codepen">See the Pen <a href="http://codepen.io/bhou/pen/JbgprG/">collar.js - build pipeline</a> by Bo HOU (<a href="http://codepen.io/bhou">@bhou</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

## Install collar.js and collar.js-dev-client

You can install collar.js with npm
```
npm install collar.js --save
npm install collar.js-dev-client --save-dev
```

or directly use the prebuild one in your html

```html
<script src="js/collar.js"></script>
<!-- include collar.js-dev-client for dev only -->
<script src="js/collar.js-dev-client"></script>
```

## Enable collar dev Environment

Install and start collar dev server

```
sudo npm install collar-dev-server -g
collar-dev-server
```

Include collar dev client at the very beginning of your code

```javascript
import collar from 'collar.js';
import DevToolAddon from 'collar.js-dev-client';
collar.use(new DevToolAddon());
```

&nbsp;

&nbsp;

&nbsp;
