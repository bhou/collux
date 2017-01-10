# StoreComponent

StoreComponent class inherits from [Component](Component.md)


{% method %}

## StoreComponent.setStateSetter(stateSetter, async)

#### Arguments
| Arguement | Type | Description |
| -- | -- | -- |
| stateSetter | Function | a function to set the state |
| async | boolean | is the state setter async |

if async is true, the stateSetter has the following signature

**function stateSetter(state, done)**

otherwise

**function stateSetter(state)**

{% sample lang="javascript" %}

Set the state setter for a todo list app with localStorage

```javascript
store.setStateSetter(function(state){
  localStorage.setItem('todos', JSON.stringify(state));
});
```

{% endmethod %}

{% method %}

## StoreComponent.setStateGetter(stateGetter, async)

#### Arguments
| Arguement | Type | Description |
| -- | -- | -- |
| stateGetter | Function | a function to get the state |
| async | boolean | is the state getter async |

if async is true, the stateGetter has the following signature

**function stateGetter(state, done)**

**done(error, newState)**

otherwise

**function stateGetter(state): newState**

{% sample lang="javascript" %}

Set the state getter for a todo list app with localStorage

```javascript
store.setStateGetter(function(){
  let todos = localStorage.getItem('todos');
  if (todos) return JSON.parse(todos);
  else return null;
});
```

{% endmethod %}

{% method %}

## StoreComponent.setStateInitiator(stateInitiator, async)

#### Arguments
| Arguement | Type | Description |
| -- | -- | -- |
| stateInitiator | Function | a function to init the state |
| async | boolean | is the state initiator async |

if async is true, the stateInitiator has the following signature

**function stateInitiator(done)**

**done(error, initState)**

otherwise

**function stateInitiator(): initState**

{% sample lang="javascript" %}

Set the state initiator for a todo list app

```javascript
store.setStateInitiator(function(){
  return {
    todos: []
  }
});
```

{% endmethod %}


{% method %}

## StoreComponent.setInitStateSaver(initStateSaver, async)

#### Arguments
| Arguement | Type | Description |
| -- | -- | -- |
| initStateSaver | Function | a function to save the initial state |
| async | boolean | is the initial state saver async |

if async is true, the stateInitiator has the following signature

**function initStateSaver(state, done)**

**done(error, newState)**

otherwise

**function initStateSaver(state): newState**

{% sample lang="javascript" %}

Set the state initiator for a todo list app

```javascript
store.setInitStateSaver(function(state){
  let todos = localStorage.getItem('todos');
  if (!todos) {
    localStorage.setItem('todos', JSON.stringify(state));
    return state;
  } else {
    return todos;
  }
});
```
{% endmethod %}

{% method %}
## StoreComponent.reduce(actionName, reducer)

Create a reducer to handle action

#### Arguments
| Arguement | Type | Description |
| -- | -- | -- |
| action | String | the action to handle |
| reducer | Function | function(prevState, action) : void |

{% sample lang="javascript" %}

Create a reducer to handle 'INCREMENT' action
```javascript
store.reduce('INCREMENT', (prevState, action) => {
  return prevState + 1;
})
```

{% endmethod %}

&nbsp;

&nbsp;

&nbsp;
