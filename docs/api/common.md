# Common API for all architectures

{% method %}
## createApp(arch: string, options: object) : Application

{% sample lang="javascript" %}
create an application with specified architecture

```javascript
Collux.createApp('redux-single-route-app', {
  // options for redux single route app architecture, see doc.
});
```
{% endmethod %}
