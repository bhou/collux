# Common API for all architectures

{% method %}
## Collux.createApp(arch, options) : Application

Create an collux application with specified architecture.

#### Arguments
| Arguement | Type | Description |
| -- | -- | -- |
| arch | string | the architecture of your application |
| options | object | the architecture options, see the doc of your architecture |

#### Return

| Return | Type | Description |
| -- | -- | -- |
| app | Application | the application object |

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

Now only supports collar.js dev client, see example code.

{% sample lang="javascript" %}
Enable collar dev tool

```javascript
import DevToolAddon from 'collar.js-dev-client';
Collux.use(new DevToolAddon());
```

{% endmethod %}


{% method %}

## app.createComponent(name, namespace:, metadata = {}) : Component

Create a component in application

#### Arguments
| Arguement | Type | Description |
| -- | -- | -- |
| name | String | the component name |


{% endmethod %}
