# Component

Component class

{% method %}
## component.ns() : Namespace

Get the collar.js namespace of this component

#### Return

| Type | Description |
| -- | -- |
| Namespace | collarjs namespace |

{% sample lang="javascript" %}

Get the namespace object of store component

```javascript
let component = app.getComponentByName('store');
const ns = component.ns();

ns.map('double', s => {
  return s.new({
    value: s.get('value') * 2
  });
})
```

{% endmethod %}


{% method %}
## component.input() : Node

Get the input node of the component

#### Return

| Type | Description |
| -- | -- |
| Node | the input node of the component |

{% sample lang="javascript" %}

Double the value payload of all signals from input node.

```javascript
let component = app.getComponentByName('store');

component.input()
  .map('double', s => {
    return s.new({
      value: s.get('value') * 2
    });
  });
```

{% endmethod %}

{% method %}
## component.output() : Node

Get the output node of the component

#### Return

| Type | Description |
| -- | -- |
| Node | the output node of the component |

{% sample lang="javascript" %}

Double the value payload of all signals from input node and pipe it to output.

```javascript
let component = app.getComponentByName('store');

component.input()
  .map('double', s => {
    return s.new({
      value: s.get('value') * 2
    });
  })
  .to(component.output());
```

{% endmethod %}

{% method %}
## component.handleMsg(msg, done)

Send a message to the component input, and get its output from the output

#### Arguments
| Arguement | Type | Description |
| -- | -- | -- |
| msg | Object | input signal payload |
| done | Function | result handler |


{% sample lang="javascript" %}

Send an 'INCREMENT' action to the store component, and get the result

```javascript
let component = app.getComponentByName('store');

component.handleMsg({
  actionType: 'INCREMENT'
}, (error, result) => {
  if (error) {
    return console.error(error.message);
  }
  console.log(result);
})
```

{% endmethod %}

&nbsp;

&nbsp;

&nbsp;
