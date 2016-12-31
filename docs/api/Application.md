# Application

Collux application

{% method %}
## app.createComponent(name, namespace:, metadata = {}) : Component

Create a component in application, and add this component to the application

#### Arguments
| Arguement | Type | Description |
| -- | -- | -- |
| name | String | the component name |
| namespace | String | optional, the namespace,  |
| metadata | Object | optional, metadata object |

{% sample lang="javascript" %}

Create a 'view' component

```javascript
const component = app.createComponent('view', 'com.collux.example', {
  author: 'John'
})
```

{% endmethod %}


{% method %}
## app.addComponent(component) : void

Add a component to the application

#### Arguments
| Arguement | Type | Description |
| -- | -- | -- |
| component | Component | the component object |

{% endmethod %}

{% method %}
## app.hasComponent(name) : boolean

Check if the application has a component with the specific name

#### Arguments
| Arguement | Type | Description |
| -- | -- | -- |
| name | String | the name of the component |

#### Return

| Type | Description |
| -- | -- |
| boolean | true, if has a component with specific name, otherwise false |


{% sample lang="javascript" %}

Check if the application has a component named 'store'

```javascript
if (app.hasComponent('store')) {
  console.log('has store component');
}
```

{% endmethod %}

{% method %}
## app.getComponentByName(name) : Component

Get the component by name

#### Arguments
| Arguement | Type | Description |
| -- | -- | -- |
| name | String | the name of the component |


#### Return

| Type | Description |
| -- | -- |
| Compnent | the component object, otherwise, null |


{% sample lang="javascript" %}

get the component named 'store'

```javascript
if (app.hasComponent('store')) {
  let component = app.getComponentByName('store');
}
```

{% endmethod %}

&nbsp;

&nbsp;

&nbsp;
