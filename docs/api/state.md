# System State

Collux uses a system state to support system level control flow, for example, the router.

System state is stored in `sys` property of the state. It has the following substate:

### url

The current page url.

If you change this url state in reducer, the page will redirect to the new url specified in it.

```javascript
app.store.reduce('REDIRECT_EXAMPLE', (prevState, action) => {
  prevState.sys.url = '/target';  // redirect to /target Page
  return prevState;
});
```

### parsedURL

The parsed URL object. This system state is injected by the router middleware. You can access it in your view state updater. But it is not accessible in reducer.

see npm module `url-parse`.
