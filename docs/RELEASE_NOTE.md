# Release Note

### 2017-01-15 Major release version 1.0.0

- No longer support primitive type state. Store state must be an object
- Add system level state with state key `sys`
  - state.sys.url: the current url, you can change this state to redirect to another app route
- Add a `middlewares` component between `store` and `view` component
- Replace `Router` component with a `router` middleware
- Add `app.setRootPath(root)` method in multiple route app to setup the root path of your app
- Add `app.redirect(url)` method to redirect to a page
- Add `app.use(name, middleware)` method to add a middleware
