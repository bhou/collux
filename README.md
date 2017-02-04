# Collux

[![Greenkeeper badge](https://badges.greenkeeper.io/bhou/collux.svg)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.org/bhou/collux.svg?branch=master)](https://travis-ci.org/bhou/collux)

Another Redux framework, with architecture, data flow visualization, and much more.

> Collar.js + Redux = Collux

Check out this 3 minutes video: [https://www.youtube.com/watch?v=Uy_RZL8jkzQ](https://www.youtube.com/watch?v=Uy_RZL8jkzQ)

------

## Why another framework?

High quality software requires every developer has the same understanding of not only the code but also the architecture. However, software is not easy to build, things goes complex when software becomes big, it is very hard to keep every one in the team to get the same level of understanding. That's why there are different architectures and corresponding frameworks to help the team to build the understanding.

Flux architecture builds a unidirectional data flow. Redux architecture manages the state of your application. But using them doesn't means that your software will definitely become easier to understand. The ultimate reason for that is your architecture, data flow, business logic are implicitly embedded into your code, (and related documents, which usually has a delay to become up-to-date). Developers need to read the code to reconstruct the architecture, the data flow, and the business logic.

[Collar.js](http://collarjs.com) (and collar dev tool) is a small javascript library to help you reconstruct your architecture, data flow and the business logic, so that your team will never get lost no matter how large your software goes. So why not implement Redux / Flux with collar.js? You use your usual way to develop your application with Redux- and Flux-like api, and keep the architecture, data flow, and business logic updated when you modify the code. You will never lost again in your code :D.

Besides, you can benefit a lot of cool debug / dev features from the cool collar dev tool. Time travel? You don't need a special Redux dev tool to do that. Collar dev tool supports it by nature, and you can do much more than just time travel, for example, the live testing.

Check out this video: how to build a counter application with collux

https://www.youtube.com/watch?v=U49308jICzY

-------

## Developer Guide

You can get the source code of collux from github repo: [collux](https://github.com/bhou/collux)

To build it

```
npm install
npm run build
```

To create a web module:

```
// for development
export NODE_ENV=dev && npm run build && npm run webpack
// for production
export NODE_ENV=production && npm run build && npm run webpack
```


## License

MIT


&nbsp;

&nbsp;

&nbsp;
