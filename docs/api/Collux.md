# Collux

The top level object

{% method %}
## Collux.createApp(arch, options) : Application

Create an collux application with specified architecture.

Supported architectures:

- redux-single-route-app
- redux-multiple-routes-app

#### Arguments
| Arguement | Type | Description |
| -- | -- | -- |
| arch | string | the architecture of your application |
| options | object | the architecture options, see the doc of your architecture |

#### Return

| Return | Type | Description |
| -- | -- | -- |
| app | [Application](Application.md) | the application object |

{% sample lang="javascript" %}
create an application with specified architecture

```javascript
Collux.createApp('redux-single-route-app', {
  // options for redux single route app architecture, see doc.
});

Collux.createApp('redux-multiple-routes-app', {
  // options for redux multiple routes app architecture, see doc.
});
```
{% endmethod %}


{% method %}
## Collux.use(addon) : void

Use an addon

#### Arguments
| Arguement | Type | Description |
| -- | -- | -- |
| addon | Addon | the collux addon |

Now only supports collar.js dev client addon, see example code.

{% sample lang="javascript" %}
Enable collar dev tool

```javascript
import DevToolAddon from 'collar.js-dev-client';
Collux.use(new DevToolAddon());
```

{% endmethod %}

{% method %}

## Collux.Link

The React Component to support client side routing

#### Properties
| Property | Type | Description |
| -- | -- | -- |
| to | String | the url path to link to |
| sensor | Sensor | the sensor object |

{% sample lang="javascript" %}

A client side link to '/user'

```javascript
<Link to="/user" sensor={viewSensor}>This is a client side router link</Link>
```

{% endmethod %}

&nbsp;

&nbsp;

&nbsp;
