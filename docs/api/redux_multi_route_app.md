# ReduxMultipleRoutesApp

ReduxMultipleRoutesApp class. The predefined architecture for multiple routes redux application.

In multipls routes redux application, there are four components:

- store component
- router component
- view component
- system component

![multiple routes application architecture](../assets/redux-multiple-routes-app-arch-1-a.png)

See the following diagram to understand the architecture and data flow of redux multiple routes application architecture. (This diagram is generated from [collar dev tool](http://collarjs.com))

![multiple routes application architecture](../assets/redux-multiple-routes-app-arch-2.png)

{% method %}
## ReduxMultipleRoutesApp(options)

constructor, create a redux multipl routes app. You don't need to call this constructor directly, you can use [*Collux.createApp('redux-multiple-routes-app', options)*](Collux.md) function to create a multiple routes redux application. Use the following options to fill the second argument.

#### Arguments
| Arguement | Type | Description |
| -- | -- | -- |
| options.getName | Function | a function to return app name, function(): string |
| options.initState | Function | storeStateInitiator function, function(): state |


{% sample lang="javascript" %}

create a redux single route application
```javascript
const app = Collux.createApp('redux-multiple-routes-app', {
  initState: () => {
    return 100;
  }
});
```

{% endmethod %}


{% method %}
## ReduxMultipleRoutesApp.route(path, page)

Create a route and a page object to handle it. Each page object must contain two functions:

- render() : void
- updateState(state) : void

#### Arguments
| Arguement | Type | Description |
| -- | -- | -- |
| path | String | express like url path |
| page.render | Function | render function, function(): void |
| page.updateState | Function | viewStateUpdater function, function(state): void |

{% sample lang="javascript" %}

Add a route to handle '/home' url
```javascript
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
```

{% endmethod %}


{% method %}
## ReduxMultipleRoutesApp.Link

The React Component to support client side routing. This Link component is different from [Collux.Link](Collux.md) React component, you don't need to specify the sensor property to it. It has already inherited the application view sensor from application object.

#### Properties
| Property | Type | Description |
| -- | -- | -- |
| to | String | the url path to link to |

{% sample lang="javascript" %}

A client side link to '/user'

```javascript
// get the Link component from multiple route application
const Link = app.Link;

// use it in JSX
<Link to="/user">This is a client side router link</Link>
```

{% endmethod %}

{% method %}
## ReduxMultipleRoutesApp.setDefaultRoute(route)

Set the default route of the application. By default, the default route is '/'

#### Arguments
| Arguement | Type | Description |
| -- | -- | -- |
| route | String | the default route path |

{% sample lang="javascript" %}

Create a reducer to handle 'INCREMENT' action
```javascript
// set the default route to '/counter'
app.setDefaultRoute('/counter');
```

{% endmethod %}


{% method %}
## ReduxMultipleRoutesApp.reduce(actionName, reducer)

Create a reducer to handle action

#### Arguments
| Arguement | Type | Description |
| -- | -- | -- |
| action | String | the action to handle |
| reducer | Function | function(prevState, action) : void |

{% sample lang="javascript" %}

Create a reducer to handle 'INCREMENT' action
```javascript
app.reduce('INCREMENT', (prevState, action) => {
  return prevState + 1;
})
```

{% endmethod %}

{% method %}
## ReduxMultipleRoutesApp.setStoreStateInitiator(initiator)

Set a store state initiator to initiate the store state.

#### Arguments
| Arguement | Type | Description |
| -- | -- | -- |
| initiator | Function | initiator function, function(): state |

{% sample lang="javascript" %}

render a counter view
```javascript
app.setStoreStateInitiator(() => {
  return 100; // the initial state
})
```

{% endmethod %}

{% method %}
## ReduxMultipleRoutesApp.store

Property: the store component
{% endmethod %}

{% method %}
## ReduxMultipleRoutesApp.view

Property: the view component
{% endmethod %}

{% method %}
## ReduxMultipleRoutesApp.getAppSensor()

Get the application sensor. Application sensor is used to listen to the system/application level events.

{% endmethod %}

{% method %}
## ReduxMultipleRoutesApp.getViewSensor()

Get the view sensor. View sensor is used to listen to the UI events.

{% endmethod %}

{% method %}
## ReduxMultipleRoutesApp.setStore(store)

Set a custom store component. Use this method to override the default store component

#### Arguments
| Arguement | Type | Description |
| -- | -- | -- |
| store | [Component](Component.md) | component object |

{% endmethod %}

{% method %}
## ReduxMultipleRoutesApp.setView(view)

Set a custom view component. Use this method to override the default view component

#### Arguments
| Arguement | Type | Description |
| -- | -- | -- |
| view | [Component](Component.md) | component object |

{% endmethod %}


&nbsp;

&nbsp;

&nbsp;
