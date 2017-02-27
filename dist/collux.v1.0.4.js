/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _index = __webpack_require__(1);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	window.Collux = _index2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _App = __webpack_require__(2);

	var _App2 = _interopRequireDefault(_App);

	var _Component = __webpack_require__(3);

	var _Component2 = _interopRequireDefault(_Component);

	var _Constants = __webpack_require__(21);

	var _Constants2 = _interopRequireDefault(_Constants);

	var _createApp = __webpack_require__(22);

	var _createApp2 = _interopRequireDefault(_createApp);

	var _archs = __webpack_require__(23);

	var _archs2 = _interopRequireDefault(_archs);

	var _StoreComponent = __webpack_require__(27);

	var _StoreComponent2 = _interopRequireDefault(_StoreComponent);

	var _ViewComponent = __webpack_require__(28);

	var _ViewComponent2 = _interopRequireDefault(_ViewComponent);

	var _Link = __webpack_require__(40);

	var _Link2 = _interopRequireDefault(_Link);

	var _collar = __webpack_require__(4);

	var _collar2 = _interopRequireDefault(_collar);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	exports.default = {
	  App: _App2.default,
	  Component: _Component2.default,

	  StoreComponent: _StoreComponent2.default,
	  ViewComponent: _ViewComponent2.default,

	  Link: _Link2.default,

	  Constants: _Constants2.default,
	  createApp: _createApp2.default,
	  registerArch: _archs2.default.register,

	  use: function use(addon) {
	    _collar2.default.use(addon);
	  }
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	var _Component = __webpack_require__(3);

	var _Component2 = _interopRequireDefault(_Component);

	var _collar = __webpack_require__(4);

	var _collar2 = _interopRequireDefault(_collar);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var App = function () {
	  function App() {
	    _classCallCheck(this, App);

	    this._components = new Map();
	  }

	  _createClass(App, [{
	    key: 'override',
	    value: function override(fullName, type, fn) {
	      if (['actuator.sync', 'actuator.async', 'processor.sync', 'processor.async', 'filter'].indexOf(type) < 0) {
	        console.warn('Unsupported registry type', type, 'for node', fullName);
	        return;
	      }
	      _collar2.default.registry.register(fullName, type, fn);
	    }
	  }, {
	    key: 'addComponent',
	    value: function addComponent(component) {
	      this._components.set(component.name, component);
	    }
	  }, {
	    key: 'createComponent',
	    value: function createComponent(name, namespace) {
	      var metadata = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	      if (!metadata.arch) metadata.arch = name;
	      if (!namespace) namespace = name;

	      var component = new _Component2.default(name, namespace, metadata);

	      this._components.set(name, component);

	      return component;
	    }
	  }, {
	    key: 'hasComponent',
	    value: function hasComponent(name) {
	      return this._components.has(name);
	    }
	  }, {
	    key: 'getComponentByName',
	    value: function getComponentByName(name) {
	      return this._components.get(name);
	    }
	  }, {
	    key: 'initComponents',
	    value: function initComponents() {
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = this._components.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var component = _step.value;

	          component.init();
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'connectCompnents',
	    value: function connectCompnents() {}
	  }, {
	    key: 'startComponents',
	    value: function startComponents() {
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = this._components.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var component = _step2.value;

	          component.start();
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'run',
	    value: function run() {
	      this.initComponents();
	      this.connectComponents();
	      this.startComponents();
	      // other stuffs here
	    }
	  }]);

	  return App;
	}();

	exports.default = App;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	var _collar = __webpack_require__(4);

	var _collar2 = _interopRequireDefault(_collar);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var Component = function () {
	  function Component(name, namespace) {
	    var metadata = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	    _classCallCheck(this, Component);

	    this.name = name || Component.getDefaultComponentName();
	    this.namespace = namespace || this.name;
	    this.metadata = metadata;

	    if (!this.metadata.arch) this.metadata.arch = name;

	    this._ns = _collar2.default.ns(this.namespace, this.metadata);
	    this._input = this._ns.input('@input ' + this.name + '.input');
	    this._output = this._ns.output('@output ' + this.name + '.output');
	    this._handleMsg = _collar2.default.toNode(this._input, this._output);
	  }

	  _createClass(Component, [{
	    key: 'ns',
	    value: function ns() {
	      return this._ns;
	    }
	  }, {
	    key: 'input',
	    value: function input() {
	      return this._input;
	    }
	  }, {
	    key: 'output',
	    value: function output() {
	      return this._output;
	    }
	  }, {
	    key: 'handleMsg',
	    value: function handleMsg(msg, done) {
	      return this._handleMsg(msg, done);
	    }

	    // ------------------
	    // life cycle related

	  }, {
	    key: 'init',
	    value: function init() {}
	  }, {
	    key: 'start',
	    value: function start() {}
	  }], [{
	    key: 'getDefaultComponentName',
	    value: function getDefaultComponentName() {
	      Component.__COUNT__++;
	      return 'component_' + Component.__COUNT__;
	    }
	  }]);

	  return Component;
	}();

	Component.__COUNT__ = 0;

	exports.default = Component;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(5);


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate) {!function(e,t){if(true)module.exports=t(__webpack_require__(9),__webpack_require__(14),__webpack_require__(20));else if("function"==typeof define&&define.amd)define(["uuid","freezer-js","object-path"],t);else{var n="object"==typeof exports?t(require("uuid"),require("freezer-js"),require("object-path")):t(e.uuid,e["freezer-js"],e["object-path"]);for(var o in n)("object"==typeof exports?exports:e)[o]=n[o]}}(this,function(e,t,n){return function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={exports:{},id:o,loaded:!1};return e[o].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r="function"==typeof Symbol&&"symbol"===o(Symbol.iterator)?function(e){return"undefined"==typeof e?"undefined":o(e)}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":"undefined"==typeof e?"undefined":o(e)},i=n(1),u=n(7),a=null,s=[];a||(a=i(u),a.use=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];var o=!0,r=!1,i=void 0;try{for(var u,c=t[Symbol.iterator]();!(o=(u=c.next()).done);o=!0){var f=u.value;s.push(f),a.extend({observers:f.observers()}),f.run()}}catch(e){r=!0,i=e}finally{try{!o&&c.return&&c.return()}finally{if(r)throw i}}return a},a.ns=function(e,t){t&&"object"===("undefined"==typeof t?"undefined":r(t))||(t={}),t.namespace=e;var n=i(u.new(t)),o=!0,a=!1,c=void 0;try{for(var f,l=s[Symbol.iterator]();!(o=(f=l.next()).done);o=!0){var p=f.value;n.extend({observers:p.observers()}),p.run()}}catch(e){a=!0,c=e}finally{try{!o&&l.return&&l.return()}finally{if(a)throw c}}return n},a.module=function(e,t,n){n&&"object"===("undefined"==typeof n?"undefined":r(n))||(n={}),n.module=e,t&&"string"==typeof t||(t=e);var o=a.ns(t,n),i=o.input(e+" input"),u=o.output(e+" output");return{ns:function(){return o},in:function(){return i},out:function(){return u},handleMsg:a.toNode(i,u)}}),e.exports=a},function(e,t,n){"use strict";var o=n(2),r=n(11),i=n(16),u=n(17),a=n(20),s=n(21),c=n(22),f=n(23),l=n(15),p=n(24),y=n(25),h=n(26),d=n(28),v=n(29),m=n(30),b=n(31),_=n(32),g=n(33),w=n(34),O=n(19),S=n(18),k={others:{Node:o,Signal:r,registry:O,toNode:S.toNode}},j=[i,u,a,s,f,c,l,p,y,h,d,v,m,b,_,g,w,k];e.exports=function(e){var t=e;return j.forEach(function(e){t=t.extend(e)}),t}},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":c(t))&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":c(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function u(e){if(e){var t=e.match(/@(\w+)/);if(null!=t)return t[1]}}function a(e){if(!e)return[];for(var t=/#(\w+)/g,n=[],o=null;null!==(o=t.exec(e));)n.push(o[1]);return n}function s(e){if(!e)return{};var t=u(e),n=a(e),o=e.replace(/@(\w+)/g,"").replace(/#(\w+)/g,"").replace(/^(\s+)/g,"");return{name:t,tags:n,comment:o}}var c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},f=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=function e(t,n,o){null===t&&(t=Function.prototype);var r=Object.getOwnPropertyDescriptor(t,n);if(void 0===r){var i=Object.getPrototypeOf(t);return null===i?void 0:e(i,n,o)}if("value"in r)return r.value;var u=r.get;if(void 0!==u)return u.call(o)},p=n(3),y=n(11),h=function(e){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments[1];o(this,t);var i=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));i._type="node";var u=s(e.comment);return i._name=u.name||i.id,i._comment=u.comment,i._inputs=e.inputs||{},i._outputs=e.outputs||{},i._features=e.features||[],i._tags=u.tags,e.todo&&i.addFeature("todo"),i}return i(t,e),f(t,[{key:"addFeature",value:function(e){return this._features.indexOf(e)<0&&this._features.push(e),this}},{key:"removeFeature",value:function(e){var t=this._features.indexOf(e);return t>=0&&this._features.splice(t,1),this}},{key:"getFeatures",value:function(){return this._features}},{key:"hasFeature",value:function(e){return this._features.indexOf(e)>=0}},{key:"getState",value:function(e,t){t()}},{key:"onSignal",value:function(e){var t=this;return this.accept(e)?(this.act(e,function(e,t){if(e)throw e}),this.process(e,function(e,n){if(e)throw e;t.send(n)}),this):(this.request(),this)}},{key:"send",value:function(e){var n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],o=e;return y.isSignal(e)||(o=new y(e)),n===!1&&(o=o.setTag("__non_interruptible__",!0)),l(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"send",this).call(this,o,n)}},{key:"push",value:function(e){var n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],o=e;return y.isSignal(e)||(o=new y(e)),n===!1&&(o=o.setTag("__non_interruptible__",!0)),l(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"push",this).call(this,o,n)}},{key:"watch",value:function(e){}},{key:"accept",value:function(e){return!0}},{key:"act",value:function(e,t){t()}},{key:"process",value:function(e,t){t(null,e)}},{key:"onRequest",value:function(e){return this.onNext(e),this}},{key:"onNext",value:function(e){this.request(e)}},{key:"isInterruptibleSignal",value:function(e){return!e.getTag("__non_interruptible__")}},{key:"isErrorSignal",value:function(e){return y.isSignal(e)&&y.hasError(e)}},{key:"isEndSignal",value:function(e){return y.isSignal(e)&&y.isEnd(e)}},{key:"throwError",value:function(e,t){return this.send(t.setError(e))}},{key:"through",value:function e(o,r,i){var u=this,a=arguments.length>3&&void 0!==arguments[3]&&arguments[3],s=null;"string"!=typeof o?(a=i,i=r,r=o,s=r._comment):(s=r._comment,r._comment=o),i||(i=r);var c=!0;if(Object.keys(this.meta).length===Object.keys(r.meta).length){var f=!0,p=!1,y=void 0;try{for(var h,d=Object.keys(this.meta)[Symbol.iterator]();!(f=(h=d.next()).done);f=!0){var v=h.value;if("namespace"!==v&&this.meta[v]!==r.meta[v]){c=!1;break}}}catch(e){p=!0,y=e}finally{try{!f&&d.return&&d.return()}finally{if(p)throw y}}if(r.id!==i.id&&Object.keys(this.meta).length===Object.keys(i.meta).length){var m=!0,b=!1,_=void 0;try{for(var g,w=Object.keys(this.meta)[Symbol.iterator]();!(m=(g=w.next()).done);m=!0){var O=g.value;if("namespace"!==O&&this.meta[O]!==i.meta[O]){c=!1;break}}}catch(e){b=!0,_=e}finally{try{!m&&w.return&&w.return()}finally{if(b)throw _}}}}else c=!1;if(c)return l(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"to",this).call(this,r),i?i:r;var e=n(15).through,S=e(r._comment,r,i,a);return r._comment=s,Object.keys(this.meta).forEach(function(e){Object.prototype.hasOwnProperty.call(u.meta,e)&&(Object.prototype.hasOwnProperty.call(r.meta,e)||r.preventMetaPropagation()||(r.meta[e]=u.meta[e]),S.meta[e]=u.meta[e])}),l(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"to",this).call(this,S)}},{key:"to",value:function(e,n){var o=this;if("string"==typeof e){if(n._comment=e,!n)return this}else if(n=e,!n)return this;return Object.keys(this.meta).forEach(function(e){Object.prototype.hasOwnProperty.call(o.meta,e)&&(Object.prototype.hasOwnProperty.call(n.meta,e)||n.preventMetaPropagation()||(n.meta[e]=o.meta[e]))}),l(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"to",this).call(this,n)}},{key:"preventMetaPropagation",value:function(){return!1}},{key:"getTags",value:function(){return this._tags}},{key:"hasTag",value:function(e){return this._tags.indexOf(e)>=0}},{key:"addTag",value:function(e){this._tags.push(e)}},{key:"delTag",value:function(e){var t=this._tags.indexOf(e);t>=0&&this._tags.splice(t,1)}},{key:"getMeta",value:function(){return this.meta}},{key:"getMetaByName",value:function(e){return this.meta[e]}},{key:"addMeta",value:function(e,t){this.meta[e]=t}},{key:"getNamespace",value:function(){return this.meta.namespace}},{key:"toJSON",value:function(){return{id:this.id,name:this.name,namespace:this.namespace,fullName:this.fullName,features:this.getFeatures(),meta:this.meta,tags:this.tags,comment:this.comment,inputs:this.inputs,outputs:this.outputs}}},{key:"name",get:function(){return this._name}},{key:"fullName",get:function(){return this.meta.namespace?this.meta.namespace+"."+this._name:this._name}},{key:"tags",get:function(){return this._tags}},{key:"namespace",get:function(){return this.getNamespace()}},{key:"comment",get:function(){return this._comment}},{key:"type",get:function(){return this._type}},{key:"inputs",get:function(){return this._inputs},set:function(e){var t=this;return Array.isArray(e)?e.forEach(function(e){t._inputs[e]=""}):this._inputs=e,this}},{key:"outputs",get:function(){return this._outputs},set:function(e){var t=this;return Array.isArray(e)?e.forEach(function(e){t._outputs[e]=""}):this._outputs=e,this}}]),t}(p);e.exports=h},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=n(4),u=i.uuid,a=i.EventEmitter,s=i.setImmediate,c=function(){function e(t,n){o(this,e),this.id=u.v1(),this.options=t,e.shareEE?this.ee=e.ee:this.ee=n||new a,this.obs=[],this.ups={},this.downs={},this.meta={}}return r(e,[{key:"push",value:function(e){var t=this,n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return n!==!1&&this.isInterruptibleSignal(e)?(s(function(){t.onReceive(e)}),this):(this.onReceive(e),this)}},{key:"onReceive",value:function(e){if(this.invokeObservers("onReceive",e),this.isErrorSignal(e))this.onError(e),this.request();else if(this.isEndSignal(e))try{this.onEnd(e)}catch(t){this.throwError(t,e)}else try{this.onSignal(e)}catch(t){this.throwError(t,e)}return this}},{key:"onSignal",value:function(e){return this.send(e),this}},{key:"onError",value:function(e){return this.send(e),this}},{key:"onEnd",value:function(e){return this.send(e),this}},{key:"send",value:function(e){var t=this,n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return this.invokeObservers("send",e),n!==!1&&this.isInterruptibleSignal(e)?(s(function(){t.ee.emit("outgoing-"+t.id,e)}),this):(Object.keys(this.downs).forEach(function(n){t.downs[n].onReceive(e)}),this)}},{key:"observe",value:function(e){return this.obs.push(e),this}},{key:"to",value:function(e){var t=this;return this.invokeObservers("to",e),this.downs[e.id]=e,this.ee.on("outgoing-"+this.id,function(t){e.push(t)}),e.ee.on("request-"+e.id,function(e){t.pull(e)}),e.from(this),e}},{key:"pull",value:function(e){var t=this;return s(function(){t.onRequest(e)}),this}},{key:"onRequest",value:function(e){return this.invokeObservers("onRequest",e),this.request(e),this}},{key:"request",value:function(e){var t=this;return this.invokeObservers("request",e),s(function(){t.ee.emit("request-"+t.id,e)}),this}},{key:"from",value:function(e){return this.ups[e.id]=e,this.invokeObservers("from",e),this}},{key:"isInterruptibleSignal",value:function(e){return!0}},{key:"isErrorSignal",value:function(e){return e instanceof Error}},{key:"isEndSignal",value:function(t){return t===e.END}},{key:"throwError",value:function(e,t){return e.signal=t,this.send(e)}},{key:"invokeObservers",value:function(e){for(var t=this,o=arguments.length,r=Array(o>1?o-1:0),i=1;i<o;i++)r[i-1]=arguments[i];r.unshift(e),r.unshift(this);try{!function(){var e=n(7).observers;Object.keys(e).forEach(function(n){e[n].apply(t,r)}),t.obs.forEach(function(e){e.apply(t,r)})}()}catch(e){console.error(e.message)}}}]),e}();c.shareEE=!1,c.ee=new a,c.END="__SIGNAL_END__",e.exports=c},function(e,t,n){"use strict";var o=n(5),r=n(6);e.exports={uuid:o,EventEmitter:r,setImmediate:setImmediate}},function(e,t){e.exports=__webpack_require__(9)},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),r=function(){function e(){n(this,e),this.listeners={}}return o(e,[{key:"on",value:function(e,t){Object.prototype.hasOwnProperty.call(this.listeners,e)||(this.listeners[e]=[]);var n=this.listeners[e];n.push(t)}},{key:"emit",value:function(e,t){if(Object.prototype.hasOwnProperty.call(this.listeners,e)){var n=this.listeners[e];n.forEach(function(e){return e(t)})}}}]),e}();e.exports=r},function(e,t,n){"use strict";function o(e,t){return Object.assign(t,e)}function r(){function e(e){var t=!0,n=!1,o=void 0;try{for(var r,i=d._indexers.values()[Symbol.iterator]();!(t=(r=i.next()).done);t=!0){var u=r.value;u(e)}}catch(e){n=!0,o=e}finally{try{!t&&i.return&&i.return()}finally{if(n)throw o}}}function t(t,n){function r(){var t=n.apply(void 0,arguments);return t.meta={},o(this.meta,t.meta),e(t),this.to(t)}return d.reserved.indexOf(t)>=0?(console.warn("can't add operator '"+t+"', name is reserved."),d):(i.prototype[t]=r,d[t]=function(){var t=n.apply(void 0,arguments);return t.meta={},o(d._meta,t.meta),e(t),t},d)}function r(e){Object.keys(e).forEach(function(t){d.addOperator(t,e[t])})}function u(t,n){return d.reserved.indexOf(t)>=0?(console.warn("can't add source '"+t+"', name is reserved. "),d):(d[t]=function(){var t=n.apply(void 0,arguments);return t.meta={},o(d._meta,t.meta),e(t),t},d)}function a(e){return Object.keys(e).forEach(function(t){d.addSource(t,e[t])}),d}function s(e,t){return d[e]=function(){for(var e=arguments.length,n=Array(e),o=0;o<e;o++)n[o]=arguments[o];return t.query.apply(t,[d].concat(n))},d}function c(e,t){return d._indexers.set(e,function(e){t.index(d,e)}),d}function f(e){var t=e;return"string"==typeof e&&(t=n(8)(e)),t.operators&&d.addOperators(t.operators),t.sources&&d.addSources(t.sources),t.observers&&Object.keys(t.observers).forEach(function(e){d.observers[e]=t.observers[e]}),t.indexers&&Object.keys(t.indexers).forEach(function(e){d.addIndexer(e,t.indexers[e])}),t.queriers&&Object.keys(t.queriers).forEach(function(e){d.addQuerier(e,t.queriers[e])}),t.others&&Object.keys(t.others).forEach(function(e){d[e]=t.others[e]}),d}function l(e){d._meta=e}function p(e,t){d._meta[e]=t}function y(e){d._meta.hasOwnProperty(e)&&delete d._meta[e]}var h=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},d={};return d._meta=h,d._indexers=new Map,d.Node=i,d.Bouton=i,d.END=i.END,d.reserved=["id","options","ee","observers","upstreams","downstreams","meta","push","onReceive","onSignal","onError","onEnd","send","observe","to","pull","onRequest","request","from","isErrorSignal","isEndSignal","throwError","invokeObservers"],d.addOperator=t,d.addOperators=r,d.addSource=u,d.addSources=a,d.addQuerier=s,d.addIndexer=c,d.observers={},d.extend=f,d.setMeta=l,d.addMeta=p,d.removeMeta=y,d}var i=n(3),u=r();u.new=r,e.exports=u},function(e,t,n){function o(e){return n(r(e))}function r(e){return i[e]||function(){throw new Error("Cannot find module '"+e+"'.")}()}var i={"./Bouton":3,"./Bouton.js":3,"./dep":4,"./dep.js":4,"./index":7,"./index.js":7,"./operators":9,"./operators.js":9,"./sources":10,"./sources.js":10};o.keys=function(){return Object.keys(i)},o.resolve=r,e.exports=o,o.id=8},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":d(t))&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":d(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function u(e){var t=function(e){function t(e,n){o(this,t);var i=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return i.fn=e,i}return i(t,e),v(t,[{key:"onSignal",value:function(e){var t=this.fn(e);this.send(t)}}]),t}(m);return new t(e)}function a(e){var t=function(t){function n(e,t){o(this,n);var i=r(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,e,t));return i.fn=e,i}return i(n,t),v(n,[{key:"onSignal",value:function(t){e(t)?this.send(t):this.request()}}]),n}(m);return new t(e)}function s(e,t){var n=function(e){function t(e,n){o(this,t);var i=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return i.memo=i.options.memo,i.iterator=i.options.iterator,i.END=!1,i}return i(t,e),v(t,[{key:"onSignal",value:function(e){this.memo=this.iterator.call(this,this.memo,e),this.request()}},{key:"onEnd",value:function(){this.send(this.memo),this.END=!0}},{key:"onRequest",value:function(e){this.END?this.send(m.END):this.request()}}]),t}(m);return new n({memo:e,iterator:t})}function c(e){var t=function(e){function t(e,n){o(this,t);var i=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return i.fn=e,i}return i(t,e),v(t,[{key:"onError",value:function(e){var t=this;this.fn(e,function(e){t.send(e)})}}]),t}(m);return new t(e)}function f(){var e=function(e){function t(){return o(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),v(t,[{key:"onSignal",value:function(e){this.request()}},{key:"from",value:function(e){this.request()}}]),t}(m);return new e}function l(e){var t=(new Date).getTime(),n=function(n){function u(){return o(this,u),r(this,(u.__proto__||Object.getPrototypeOf(u)).apply(this,arguments))}return i(u,n),v(u,[{key:"onSignal",value:function(n){var o=(new Date).getTime();o-e>=t&&(t=o,this.send(n))}}]),u}(m);return new n(e)}function p(e,t){var n=function(e){function t(e,n){o(this,t);var i=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return i.n=e.n,i.add=e.add,i}return i(t,e),v(t,[{key:"onSignal",value:function(e){this.n=this.add.call(this,this.n,e),this.send(this.n)}}]),t}(m);return new n({n:e,add:t})}function y(e){var t=function(e){function t(e,n){o(this,t);var i=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return i.fn=e,i}return i(t,e),v(t,[{key:"onSignal",value:function(e){this.fn(e),this.send(e)}}]),t}(m);return new t(e)}function h(e){var t=function(e){function t(e,n){o(this,t);var i=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return i.fn=e,i}return i(t,e),v(t,[{key:"onEnd",value:function(e){this.fn(e)}}]),t}(m);return new t(e)}var d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},v=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),m=n(3);e.exports={operators:{map:u,filter:a,reduce:s,errors:c,sink:f,throttle:l,scan:p,act:y,done:h}}},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":s(t))&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":s(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function u(e){return new l(e)}function a(e){return new p(e)}var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},c=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),f=n(3),l=function(e){function t(e,n){o(this,t);var i=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return i.source=i.options,i.index=0,i}return i(t,e),c(t,[{key:"onRequest",value:function(e){this.source.length===this.index?(this.send(f.END),this.index++):this.source.length>this.index&&(this.send(this.source[this.index]),this.index++)}}]),t}(f),p=function(e){function t(e,n){o(this,t);var i=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return i.value=i.options,i.visited=0,i}return i(t,e),c(t,[{key:"onRequest",value:function(e){0==this.visited?(this.send(this.value),this.visited++):1==this.visited&&(this.send(f.END),this.visited++)}}]),t}(f);e.exports={sources:{asList:u,just:a}}},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i="function"==typeof Symbol&&"symbol"===r(Symbol.iterator)?function(e){return"undefined"==typeof e?"undefined":r(e)}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":"undefined"==typeof e?"undefined":r(e)},u=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=n(4),s=n(12),c=a.uuid,f=s.Immutable,l=function(){function e(t,n){if(o(this,e),f.isImmutable(t))this._immu=t;else if(t instanceof Error)this._immu=f.fromJS({__type__:"Signal",_seq:c.v1(),_cmd:n,_error:t,_end:!1,_payload:{},_tags:{}});else{"number"!=typeof t&&"string"!=typeof t&&"boolean"!=typeof t&&"undefined"!=typeof t&&null!==t||(t={__anon__:t});var r=c.v1(),u={},a=null,s=!1,l=t,p=n||null;"object"===("undefined"==typeof t?"undefined":i(t))&&(t.hasOwnProperty("_seq")&&(r=t._seq),t.hasOwnProperty("_tags")&&(u=t._tags),t.hasOwnProperty("_error")&&(a=t._error),t.hasOwnProperty("_end")&&(s=t._end),t.hasOwnProperty("_payload")&&(l=t._payload),t.hasOwnProperty("_cmd")&&(p=t._cmd)),this._immu=f.fromJS({__type__:"Signal",_seq:r,_cmd:p,_error:a,_end:s,_payload:l,_tags:u})}}return u(e,[{key:"toJSON",value:function(){return this._immu.toJSON()}},{key:"setFrom",value:function(e){return this._from.push(e),this}},{key:"new",value:function(t){var n=this.seq;return new e(t).setSeq(n).setTags(this.tags)}},{key:"get",value:function(e){var t=e;"string"==typeof e&&(t=e.split(".")),t.unshift("_payload");var n=this._immu.getIn(t);return f.readyToJS(n)?n.toJS():n}},{key:"set",value:function(t,n){var o=t;return"string"==typeof t&&(o=t.split(".")),o.unshift("_payload"),new e(this._immu.setIn(o,n))}},{key:"getAnonPayload",value:function(){return this.get("__anon__")}},{key:"setPayload",value:function(t){return"number"!=typeof t&&"string"!=typeof t&&"boolean"!=typeof t&&"undefined"!=typeof t&&null!==t||(t={__anon__:t}),new e(this._immu.set("_payload",t))}},{key:"getResult",value:function(){return this.get("__result__")}},{key:"setResult",value:function(e){return this.set("__result__",e)}},{key:"del",value:function(t){var n=t;return"string"==typeof t&&(n=t.split(".")),n.unshift("_payload"),new e(this._immu.deleteIn(n))}},{key:"setTags",value:function(t){return new e(this._immu.set("_tags",t))}},{key:"getTag",value:function(e){var t=this._immu.getIn(["_tags",e]);return f.readyToJS(t)?t.toJS():t}},{key:"getCmd",value:function(e){var t=e;"string"==typeof e&&(t=e.split(".")),t.unshift("_cmd");var n=this._immu.getIn(t);return f.readyToJS(n)?n.toJS():n}},{key:"setCmd",value:function(t,n){var o=t;return"string"==typeof t&&(o=t.split(".")),o.unshift("_cmd"),new e(this._immu.setIn(o,n))}},{key:"delCmd",value:function(t){var n=t;return"string"==typeof t&&(n=t.split(".")),n.unshift("_cmd"),new e(this._immu.deleteIn(n))}},{key:"setTag",value:function(t,n){return new e(this._immu.setIn(["_tags",t],n))}},{key:"delTag",value:function(t){return new e(this._immu.deleteIn(["_tags",t]))}},{key:"setSeq",value:function(t){return new e(this._immu.set("_seq",t))}},{key:"setError",value:function(t){return new e(this._immu.set("_error",t))}},{key:"setEnd",value:function(t){return new e(this._immu.set("_end",t))}},{key:"hasError",value:function(){return this.error instanceof Error}},{key:"isEnd",value:function(){return this.end}},{key:"__type__",get:function(){return this._immu.get("__type__")}},{key:"seq",get:function(){return this._immu.get("_seq")}},{key:"id",get:function(){return this._immu.get("_seq")}},{key:"payload",get:function(){var e=this._immu.get("_payload");return f.readyToJS(e)?e.toJS():e}},{key:"anonPayload",get:function(){return this.get("__anon__")}},{key:"error",get:function(){return this._immu.get("_error")}},{key:"end",get:function(){return this._immu.get("_end")}},{key:"tags",get:function(){var e=this._immu.get("_tags");return f.readyToJS(e)?e.toJS():e}},{key:"from",get:function(){return this._from}}],[{key:"isSignal",value:function(e){return"object"===("undefined"==typeof e?"undefined":i(e))&&"Signal"===e.__type__}},{key:"hasError",value:function(e){return"object"===("undefined"==typeof e?"undefined":i(e))&&e.error instanceof Error}},{key:"isEnd",value:function(e){return"object"===("undefined"==typeof e?"undefined":i(e))&&e.end}},{key:"Error",value:function(e){function t(t){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(t){var n=t;return"string"==typeof t&&(n=new Error(t)),new e(t)})},{key:"End",value:function(){var t=new e;return t.setEnd(!0)}}]),e}();e.exports=l},function(e,t,n){"use strict";var o=n(13);e.exports={Immutable:o}},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i="function"==typeof Symbol&&"symbol"===r(Symbol.iterator)?function(e){return"undefined"==typeof e?"undefined":r(e)}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":"undefined"==typeof e?"undefined":r(e)},u=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=n(14),s=function(){function e(t){o(this,e),this.__type__="CollarImmutable",this.state=new a(t).get()}return u(e,[{key:"get",value:function(e){return this.state[e]}},{key:"getIn",value:function(e){for(var t="string"==typeof e?e.split("."):e,n=this.state,o=0;o<t.length;o++){if(!n.hasOwnProperty(t[o]))return null;n=n[t[o]]}return n}},{key:"set",value:function(t,n){var o=new a(this.state.toJS());return o.get().set(t,n),new e(o.get().toJS())}},{key:"setIn",value:function(t,n){for(var o="string"==typeof t?t.split("."):t,r=new a(this.state.toJS()),u=r.get(),s=0;s<o.length;s++){if(u.hasOwnProperty(o[s]))if(s===o.length-1)u=u.set(o[s],n);else{var c=u[o[s]];c&&"object"===("undefined"==typeof c?"undefined":i(c))||(u=u.set(o[s],{}))}else u=s===o.length-1?u.set(o[s],n):u.set(o[s],{});u=u[o[s]]}return new e(r.get().toJS())}},{key:"deleteIn",value:function(t){for(var n="string"==typeof t?t.split("."):t,o=new a(this.state.toJS()),r=o.get(),i=0;i<n.length;i++)if(i<n.length-1){if(r=r[n[i]],null===r)return new e(this.freezer.get())}else r.remove(n[i]);return new e(o.get().toJS())}},{key:"toJSON",value:function(){return this.state.toJS()}}],[{key:"fromJS",value:function(t){return new e(t)}},{key:"isImmutable",value:function(e){return null!==e&&"object"===("undefined"==typeof e?"undefined":i(e))&&"CollarImmutable"===e.__type__}},{key:"readyToJS",value:function(e){return null!==e&&"object"===("undefined"==typeof e?"undefined":i(e))&&"Object"===e.constructor.name&&e.toJS}}]),e}();s.Iterable=function(e){return null!==e&&"object"===("undefined"==typeof e?"undefined":i(e))&&"CollarImmutable"===e.__type__},e.exports=s},function(e,t){e.exports=__webpack_require__(14)},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":a(t))&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":a(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function u(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,o=arguments.length>3&&void 0!==arguments[3]&&arguments[3],r=null;return"string"==typeof e?r={comment:e,input:t,output:n,asActuator:o}:"string"!=typeof e&&(r={input:e,output:t,asActuator:n}),new p(r)}var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),c=n(2),f=100,l=1e4,p=function(e){function t(e,n){o(this,t);var i=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return i._type="delegator",i._inputDelegation=e.input,i._outputDelegation=e.output||e.input,i.addFeature("delegator"),e.asActuator?(i._asActuator=!0,i.addFeature("actuator")):(i._asActuator=!1,i.addFeature("processor")),i._receivedSignals=new Map,i._outputDelegation.observe(function(e,t,n){if("send"===t){if(i._receivedSignals.has(n.id)){var o=i._receivedSignals.get(n.id).signal;i._receivedSignals.delete(n.id),i._asActuator?n.error?i.send(o.setResult(n.payload).setError(n.error)):n.end?i.send(o.setResult(n.payload).setEnd(!0)):i.send(o.setResult(n.payload)):i.send(n)}i.checkExpiredSession()}}),i}return i(t,e),s(t,[{key:"onSignal",value:function(e){this._receivedSignals.set(e.id,{timestamp:(new Date).getTime(),signal:e}),this._inputDelegation.push(e)}},{key:"checkExpiredSession",value:function(){var e=this;this._receivedSignals.size>f&&!function(){var t=(new Date).getTime();Object.keys(e._receivedSignals).forEach(function(n){t<e._receivedSignals.get(n).timestamp+l&&e._receivedSignals.delete(n);
	})}()}}]),t}(c);e.exports={operators:{delegate:u},through:u}},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":a(t))&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":a(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function u(e,t){"function"==typeof e&&(t=e,e="sensor");var n={comment:e,fn:t};return n.fn||(n.todo=!0),new f(n)}var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),c=n(2),f=function(e){function t(e,n){o(this,t);var i=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return i._type="sensor",i.fn=e.fn||function(){},i.addFeature("sensor"),i.addFeature("active"),i.watch(i.options),i}return i(t,e),s(t,[{key:"watch",value:function(e){this.fn.call(this,e)}}]),t}(c);e.exports={sources:{sensor:u}}},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":a(t))&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":a(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function u(e,t,n,o){return new p(f.prepareNodeOptions(e,t,n,o,"filter"))}var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),c=n(2),f=n(18),l=n(19),p=function(e){function t(e,n){o(this,t);var i=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return i._type="filter",i._comment||(i._comment="filter"),i.fn=function(t){var n=Object.prototype.hasOwnProperty.call(this.meta,"namespace")?this.meta.namespace+".":"",o=l.getFn(""+n+this.name);return o?o.call(this,t):!e.fn||e.fn.call(this,t)},i.addFeature("filter"),i}return i(t,e),s(t,[{key:"accept",value:function(e){return this.fn(e)}},{key:"onSignal",value:function(e){this.accept(e)?this.send(e):this.request()}}]),t}(c);e.exports={operators:{filter:u,when:u}}},function(e,t,n){"use strict";function o(e,t){return t._node_callbacks||(t._node_callbacks={}),e._to_node_funcs||(e._to_node_funcs={}),t._to_node_observer||(t._to_node_observer=function(e,n,o){if("send"===n){var r=o.getTag("__to_node_dest__");if(!r||r!==t.id)return;var i=t._node_callbacks[o.id];if(!i)return;delete t._node_callbacks[o.id],o.error?i(o.error,o.payload):i(null,o.payload)}},t.observe(t._to_node_observer)),Object.prototype.hasOwnProperty.call(e._to_node_funcs,t.id)?e._to_node_funcs[t.id]:(e._to_node_funcs[t.id]=function(n,o){var i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],u=n;r.isSignal(u)||(u=new r(n)),u=u.setTag("__to_node_dest__",t.id),t._node_callbacks[u.id]=o,e.push(u,i)},e._to_node_funcs[t.id])}var r=n(11);e.exports={prepareNodeOptions:function(e,t,n,o,r){return"function"==typeof e?r?{comment:r,fn:e}:{fn:e}:"function"==typeof t?{comment:e,fn:t}:"function"==typeof n?{comment:e,inputs:t,fn:n}:"function"==typeof o?{comment:e,inputs:t,outputs:n,fn:o}:o?{}:{comment:e,inputs:t,outputs:n,fn:o,todo:!0}},toNode:o}},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),r=function(){function e(){n(this,e),this.registry={}}return o(e,[{key:"register",value:function(e,t,n){return this.registry[e]={type:t,fn:n},this}},{key:"registerActuatorSync",value:function(e,t){return this.register(e,"actuator.sync",t)}},{key:"registerActuatorAsync",value:function(e,t){return this.register(e,"actuator.async",t)}},{key:"registerProcessorSync",value:function(e,t){return this.register(e,"processor.sync",t)}},{key:"registerProcessorAsync",value:function(e,t){return this.register(e,"processor.async",t)}},{key:"registerFilter",value:function(e,t){return this.register(e,"filter",t)}},{key:"remove",value:function(e){Object.prototype.hasOwnProperty.call(this.registry,e)&&delete this.registry[e]}},{key:"clear",value:function(){this.registry={}}},{key:"get",value:function(e){return Object.prototype.hasOwnProperty.call(this.registry,e)?this.registry[e]:null}},{key:"getFn",value:function(e){return Object.prototype.hasOwnProperty.call(this.registry,e)?this.registry[e].fn:null}}]),e}(),i=null;e.exports=null==i?i=new r:i},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":s(t))&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":s(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function u(e,t,n,o){return new y(l.prepareNodeOptions(e,t,n,o,"actuator"))}function a(e,t,n,o){return new h(l.prepareNodeOptions(e,t,n,o,"actuator"))}var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},c=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),f=n(2),l=n(18),p=n(19),y=function(e){function t(e,n){o(this,t);var i=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return i._type="actuator",i.fn=function(t,n){var o=Object.prototype.hasOwnProperty.call(this.meta,"namespace")?this.meta.namespace+".":"",r=p.getFn(""+o+this.name);return r?r.call(this,t,n):e.fn?e.fn.call(this,t,n):void n()},i.addFeature("actuator"),i}return i(t,e),c(t,[{key:"act",value:function(e,t){this.fn.call(this,e,t)}},{key:"onSignal",value:function(e){var t=this;this.act(e,function(n,o){return n?void t.throwError(n,e):void(o||0===o||o===!1||""===o?t.send(e.set("__result__",o)):t.send(e))})}}]),t}(f),h=function(e){function t(e,n){o(this,t);var i=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return i._type="actuator.sync",i.fn=function(t){var n=Object.prototype.hasOwnProperty.call(this.meta,"namespace")?this.meta.namespace+".":"",o=p.getFn(""+n+this.name);return o?o.call(this,t):e.fn?e.fn.call(this,t):void 0},i.addFeature("actuator"),i}return i(t,e),c(t,[{key:"act",value:function(e,t){var n=this.fn.call(this,e);t(null,n)}},{key:"onSignal",value:function(e){var t=this;this.act(e,function(n,o){if(n)throw n;o||0===o||o===!1||""===o?t.send(e.set("__result__",o)):t.send(e)})}}]),t}(f);e.exports={operators:{actuator:u,actuatorSync:a,do:a},Actuator:y}},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":c(t))&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":c(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function u(e,t,n,o){return new h(p.prepareNodeOptions(e,t,n,o,"processor"))}function a(e,t,n,o){return new d(p.prepareNodeOptions(e,t,n,o,"processor"))}function s(e,t,n,o){return new d(p.prepareNodeOptions(e,t,n,o,"map"))}var c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},f=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=n(2),p=n(18),y=n(19),h=function(e){function t(e,n){o(this,t);var i=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return i._type="processor",i.fn=function(t,n){var o=Object.prototype.hasOwnProperty.call(this.meta,"namespace")?this.meta.namespace+".":"",r=y.getFn(""+o+this.name);return r?r.call(this,t,n):e.fn?e.fn.call(this,t,n):void n(null,t)},i.addFeature("processor"),i.addFeature("async"),i}return i(t,e),f(t,[{key:"process",value:function(e,t){this.fn.call(this,e,t)}},{key:"onSignal",value:function(e){var t=this;this.process(e,function(n,o){n?t.throwError(n,e):t.send(o)})}}]),t}(l),d=function(e){function t(e,n){o(this,t);var i=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return i._type="processor.sync",i.fn=function(t){var n=Object.prototype.hasOwnProperty.call(this.meta,"namespace")?this.meta.namespace+".":"",o=y.getFn(""+n+this.name);return o?o.call(this,t):e.fn?e.fn.call(this,t):t},i.addFeature("processor"),i.addFeature("sync"),i}return i(t,e),f(t,[{key:"process",value:function(e,t){var n=this.fn.call(this,e);t(null,n)}},{key:"onSignal",value:function(e){var t=this;this.process(e,function(e,n){if(e)throw e;t.send(n)})}}]),t}(l);e.exports={operators:{processor:u,processorSync:a,map:s}}},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":a(t))&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":a(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function u(e,t,n,o){return new l(f.prepareNodeOptions(e,t,n,o,"error handler"))}var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),c=n(2),f=n(18),l=function(e){function t(e,n){o(this,t);var i=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return i._type="errorhandler",i.fn=e.fn||function(e){},i.addFeature("errorhandler"),i}return i(t,e),s(t,[{key:"onError",value:function(e){var t=this;this.fn(e,function(e){t.send(e)})}}]),t}(c);e.exports={operators:{errors:u}}},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":c(t))&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":c(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function u(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return"string"!=typeof e&&console.error(new Error("endpoint must have a name")),t.mode="input",t.comment=e,new p(t)}function a(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return"string"!=typeof e&&console.error(new Error("endpoint must have a name")),t.mode="output",t.comment=e,new p(t)}function s(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return"string"!=typeof e&&console.error(new Error("endpoint must have a name")),t.comment=e,new p(t)}var c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},f=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=n(2),p=function(e){function t(e,n){o(this,t);var i=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return e.mode||(e.mode="input"),(!e.mode||"input"!==e.mode&&"output"!==e.mode)&&(console.warn("invalid endpoint mode [",e.mode,'], use "input" instead'),e.mode="input"),i._type="endpoint."+e.mode,i._name=i._comment,i.addFeature("endpoint"),i.addFeature(e.mode),i}return i(t,e),f(t,[{key:"accept",value:function(e){var t=this.options.filter||[];if(0===t.length)return!0;var n=!1,o=!0,r=!1,i=void 0;try{for(var u,a=t[Symbol.iterator]();!(o=(u=a.next()).done);o=!0){var s=u.value;n=!0;for(var c in s)if(e.get(c)!==s[c]){n=!1;break}if(n)break}}catch(e){r=!0,i=e}finally{try{!o&&a.return&&a.return()}finally{if(r)throw i}}return n&&this.invokeObservers("enter endpoint",e),n}},{key:"act",value:function(e,t){t(),this.invokeObservers("leave endpoint",e)}},{key:"preventMetaPropagation",value:function(){return"input"===this.options.mode}}]),t}(l);e.exports={sources:{endpoint:s,input:u,output:a}}},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":s(t))&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":s(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function u(e,t){var n={comment:e,source:t};return Array.isArray(e)&&(n.comment=null,n.source=e),new y(n)}function a(e,t){var n={comment:e,source:t};return t||(n.comment=null,n.source=e),new h(n)}var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},c=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),f=function e(t,n,o){null===t&&(t=Function.prototype);var r=Object.getOwnPropertyDescriptor(t,n);if(void 0===r){var i=Object.getPrototypeOf(t);return null===i?void 0:e(i,n,o)}if("value"in r)return r.value;var u=r.get;if(void 0!==u)return u.call(o)},l=n(2),p=n(11),y=function(e){function t(e,n){o(this,t);var i=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return i._type="passive",i.addFeature("passive"),i._comment=e.comment||"passive array source",i.source=e.source,i.index=0,i}return i(t,e),c(t,[{key:"onNext",value:function(){this.source.length===this.index?(this.send((new p).setEnd(!0)),this.index++):this.source.length>this.index&&(this.send(new p(this.source[this.index])),this.index++)}},{key:"send",value:function(e){p.isSignal(e)?f(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"send",this).call(this,e.setCmd("mode","passive")):f(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"send",this).call(this,new p(e,{mode:"passive"}))}}]),t}(l),h=function(e){function t(e,n){o(this,t);var i=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return i.addFeature("passive"),i._comment=e.comment||"passive array source",i.source=e.source,i.visited=0,i}return i(t,e),c(t,[{key:"onNext",value:function(){0===this.visited?(this.send(new p(this.source)),this.visited++):1===this.visited&&(this.send((new p).setEnd(!0)),this.visited++)}},{key:"send",value:function(e){p.isSignal(e)?f(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"send",this).call(this,e.setCmd("mode","passive")):f(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"send",this).call(this,new p(e,{mode:"passive"}))}}]),t}(l);e.exports={sources:{asList:u,just:a}}},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":a(t))&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":a(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function u(){return new f}var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),c=n(2),f=function(e){function t(e,n){o(this,t);var i=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return i._type="sink",i._comment="drive passive source",i}return i(t,e),s(t,[{key:"onSignal",value:function(){this.request()}},{key:"from",value:function(){this.request()}}]),t}(c);e.exports={operators:{sink:u}}},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":a(t))&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":a(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function u(e,t,n){return new l({comment:e,name:t,value:n})}var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),c=n(2),f=n(27),l=function(e){function t(e,n){o(this,t);var i=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return i._type="variable",i._value=i.options.value||0==i.options.value?i.options.value:{},i._name=i.options.name,i._comment=i.options.comment||"var '"+i._name+"'",i.addFeature("variable"),i.addFeature("active"),i.inputs={value:"the new value"},i.outputs={type:"always be 'variableChanged'",value:"new value of the variable",before:"old value"},i}return i(t,e),s(t,[{key:"get",value:function(e){return f.get(this._value,e)}},{key:"set",value:function(e,t){if(!e||""===e)return void(this.value=t);var n=f.get(this._value,e);f.set(this._value,e,t),this.send({type:"variableChanged",value:this._value,before:n})}},{key:"onSignal",value:function(e){var t=e.get("value");this.value=t}},{key:"value",get:function(){return this._value},set:function(e){var t=this._value;this._value=e,this.send({type:"variableChanged",value:this._value,before:t})}}]),t}(c);e.exports={Variable:l,operators:{variable:u}}},function(e,t){e.exports=__webpack_require__(20)},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":a(t))&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":a(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function u(e,t,n){return new l({comment:e,name:t,value:n})}var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),c=n(2),f=n(27),l=function(e){function t(e,n){o(this,t);var i=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return i._type="model",i._value=i.options.value||0==i.options.value?i.options.value:{},i._name=i.options.name,i._comment=i.options.comment||'model "'+i._name+'"',i.addFeature("model"),i.addFeature("active"),i.addFeature("stateful"),i.inputs={operation:'one of "set", "insert", "append", and "delete"',path:"the path to make de operation, empty for root",index:'optional, only need for "insert"',value:'optional, only need for "set", "insert", and "append"'},i.outputs={type:'always be "modelChanged"',operation:'the operation that causes the change, one of "set", "insert", "append", and "delete"',path:"where does the change happen",value:"the value of the model",appended:"the appended value",index:"the position of the newly inserted value",inserted:"the inserted value",before:"old value of the changed part",after:"new value of the changed part"},i}return i(t,e),s(t,[{key:"get",value:function(e){return f.get(this._value,e)}},{key:"set",value:function(e,t,n){if(!e||""===e){var o=this._value;return this._value=t,void(n?this.send(n.new({type:"modelChanged",operation:"set",path:null,value:this._value,before:o,after:this._value})):this.send({type:"modelChanged",operation:"set",path:null,value:this._value,before:o,after:this._value}))}var r=f.get(this._value,e);f.set(this._value,e,t),n?this.send(n.new({type:"modelChanged",operation:"set",path:e,value:this._value,before:r,after:t})):this.send({type:"modelChanged",operation:"set",path:e,value:this._value,before:r,after:t})}},{key:"insert",value:function(e,t,n,o){var r=f.get(this._value,e);f.insert(this._value,e,t,n),o?this.send(o.new({type:"modelChanged",operation:"insert",path:e,index:n,value:this._value,inserted:t,before:r,after:f.get(this._value,e)})):this.send({type:"modelChanged",operation:"insert",path:e,index:n,value:this._value,inserted:t,before:r,after:f.get(this._value,e)})}},{key:"append",value:function(e,t,n){var o=this,r=f.get(this._value,e);Array.isArray(t)?t.forEach(function(t){f.push(o._value,e,t)}):f.push(this._value,e,t),n?this.send(n.new({type:"modelChanged",operation:"append",path:e,value:this._value,appended:t,before:r,after:f.get(this._value,e)})):this.send({type:"modelChanged",operation:"append",path:e,value:this._value,appended:t,before:r,after:f.get(this._value,e)})}},{key:"del",value:function(e,t){var n=f.get(this._value,e);f.del(this._value,e),t?this.send(t.new({type:"modelChanged",operation:"delete",path:e,value:this._value,before:n,after:null})):this.send({type:"modelChanged",operation:"delete",path:e,value:this._value,before:n,after:null})}},{key:"onSignal",value:function(e){var t=e.get("operation")||"set";if("set"===t){var n=e.get("path");this.set(n,e.get("value"),e)}else if("insert"===t){var n=e.get("path"),o=e.get("index");n&&null!=o&&void 0!=o&&this.insert(n,e.get("value"),o,e)}else if("append"===t){var n=e.get("path");n&&this.append(n,e.get("value"),e)}else if("delete"===t){var n=e.get("path");n&&this.del(n,e)}}},{key:"getState",value:function(e,t){t(null,this._value)}},{key:"value",get:function(){return this._value},set:function(e){var t=this._value;this._value=e,this.send({type:"modelChanged",operation:"set",path:null,value:this._value,before:t,after:this._value})}}]),t}(c);e.exports={sources:{model:u}}},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":c(t))&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":c(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function u(e,t){var n={};return"string"!=typeof e?(n.comment="transport.outgoing",n.delegator=e):(n.comment=e,n.delegator=t),new v(n)}function a(e,t){var n={};return"string"!=typeof e?(n.comment="transport.incoming",n.delegator=e):(n.comment=e,n.delegator=t),new m(n)}function s(e,t){var n={};return"string"!=typeof e?(n.comment="transport.response",n.delegator=e):(n.comment=e,n.delegator=t),new b(n)}var c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},f=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=n(2),p=n(11),y=n(20),h=n(4).uuid,d=y.Actuator,v=function(e){function t(e,n){o(this,t);var i=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return i._type="transport.outgoing",i.delegator=e.delegator||{},i.addFeature("async"),i.addFeature("transport"),i}return i(t,e),f(t,[{key:"act",value:function(e,t){return this.delegator.handleOutgoingSignal?this.delegator.handleOutgoingSignal(e,function(e,n){return e?t(e):t(null,n)}):t()}},{key:"getTransportId",value:function(){return this.delegator.getId?this.delegator.getId():h.v1()}}]),t}(d),m=function(e){function t(e,n){o(this,t);var i=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return i._type="transport.incoming",i.delegator=e.delegator||{},i.addFeature("sensor"),i.addFeature("active"),i.addFeature("async"),i.addFeature("transport"),i.watch(i.options),i}return i(t,e),f(t,[{key:"getTransportId",value:function(){return this.delegator.getId?this.delegator.getId():null}},{key:"watch",value:function(){var e=this;this.delegator.listen&&this.delegator.listen(function(t,n){var o=n;p.isSignal(n)||(o=new p(n)),e.delegator.saveContext(t,o),e.send(o)})}}]),t}(l),b=function(e){function t(e,n){o(this,t);var i=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return i._type="transport.response",i._cacheSize=e.cacheSize||20,i._cacheTimeout=e.cacheTimeout||5e3,i.delegator=e.delegator||{},i.addFeature("actuator"),i.addFeature("async"),i.addFeature("transport"),i.cache=new Map,i}return i(t,e),f(t,[{key:"getTransportId",value:function(){return this.delegator.getId?this.delegator.getId():null}},{key:"act",value:function(e,t){if(!this.delegator.handleResponseSignal)return t();var n=null;return n=this.delegator.getContext?n=this.delegator.getContext(e):null,this.delegator.handleResponseSignal(n,e,function(e,n){return e?t(e):t(null,n)})}},{key:"onError",value:function(e){var t=this;if(!this.delegator.handleResponseSignal)return this.send(e);var n=null;return n=this.delegator.getContext?n=this.delegator.getContext(e):null,this.delegator.handleResponseSignal(n,e,function(n,o){return n?t.send(e.setError(n)):void(o?t.send(e.setResult(o)):t.send(e))})}}]),t}(d);e.exports={OutgoingTransport:v,IncomingTransport:m,ResponseTransport:b,operators:{req:u,listen:a,resp:s}}},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":a(t))&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":a(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function u(e,t){var n={};return n="number"==typeof e?{ms:t}:{comment:e,ms:t},new f(n)}var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),c=n(2),f=function(e){function t(e,n){o(this,t);var i=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return i._type="throttle",i.ms=e.ms,i._comment=e.comment||"throttle ("+i.ms+" ms)",i.last=(new Date).getTime(),i.addFeature("filter"),i}return i(t,e),s(t,[{key:"onSignal",value:function(e){var t=(new Date).getTime();t-this.ms>=this.last&&(this.last=t,this.send(e))}}]),t}(c);e.exports={operators:{throttle:u
	}}},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":a(t))&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":a(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function u(e,t){var n={};return n=t?{comment:e,ref:t}:{comment:"go to "+e._comment,ref:e},new f(n)}var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),c=n(2),f=function(e){function t(e,n){o(this,t);var i=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return i._ref=e.ref,i._type="reference",i.addFeature("reference"),i.addFeature("actuator"),i}return i(t,e),s(t,[{key:"act",value:function(e,t){this._ref&&this._ref.push(e),t()}}]),t}(c);e.exports={operators:{ref:u}}},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":a(t))&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":a(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function u(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return"string"==typeof e?t.comment=e:t=e,new l(t)}var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),c=function e(t,n,o){null===t&&(t=Function.prototype);var r=Object.getOwnPropertyDescriptor(t,n);if(void 0===r){var i=Object.getPrototypeOf(t);return null===i?void 0:e(i,n,o)}if("value"in r)return r.value;var u=r.get;if(void 0!==u)return u.call(o)},f=n(2),l=function(e){function t(e,n){o(this,t);var i=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return i._type="node",i.onSignalDelegate=i.options.onSignal,i.onErrorDelegate=i.options.onError,i.onEndDelegate=i.options.onEnd,i.watchDelegate=i.options.watch,i.acceptDelegate=i.options.accept,i.actDelegate=i.options.act,i.processDelegate=i.options.process,i.onNextDelegate=i.options.onNext,i.getStateDelegate=i.options.getState,i.getStateDelegate&&i.addFeature("stateful"),i.onErrorDelegate&&i.addFeature("errorhandler"),i.watchDelegate&&i.addFeature("sensor"),i.acceptDelegate&&i.addFeature("filter"),i.actDelegate&&i.addFeature("actuator"),i.processDelegate&&i.addFeature("processor"),i.addFeature("general"),i.addFeature("async"),i}return i(t,e),s(t,[{key:"onSignal",value:function(e){return this.onSignalDelegate?this.onSignalDelegate.call(this,e):c(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"onSignal",this).call(this,e)}},{key:"onError",value:function(e){return this.onErrorDelegate?this.onErrorDelegate.call(this,e):c(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"onError",this).call(this,e)}},{key:"onEnd",value:function(e){return this.onEndDelegate?this.onEndDelegate.call(this,e):c(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"onEnd",this).call(this,e)}},{key:"watch",value:function(e){return this.watchDelegate?this.watchDelegate.call(this,e):c(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"watch",this).call(this,e)}},{key:"accept",value:function(e){return this.acceptDelegate?this.acceptDelegate.call(this,e):c(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"accept",this).call(this,e)}},{key:"act",value:function(e,n){return this.actDelegate?this.actDelegate.call(this,e,n):c(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"act",this).call(this,e,n)}},{key:"process",value:function(e,n){return this.processDelegate?this.processDelegate.call(this,e,n):c(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"process",this).call(this,e,n)}},{key:"getState",value:function(e,n){return this.getStateDelegate?this.getStateDelegate.call(this,e,n):c(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"getState",this).call(this,e,n)}}]),t}(f);e.exports={operators:{node:u}}},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":a(t))&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":a(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function u(e,t){var n={};return"string"==typeof e?(n.comment=e,n.isEndAtom=t):void 0===e||e===!0?(n.comment="start atom process",n.isEndAtom=!1):(n.comment="end atom process",n.isEndAtom=!0),new f(n)}var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),c=n(2),f=function(e){function t(e,n){o(this,t);var i=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return i._type="processor.sync",i.isEndAtom=e.isEndAtom,i.addFeature("atom"),i.addFeature("sync"),i}return i(t,e),s(t,[{key:"process",value:function(e,t){var n=null;n=this.isEndAtom?e.delTag("__non_interruptible__"):e.setTag("__non_interruptible__",!0),t(null,n)}},{key:"onSignal",value:function(e){var t=this;this.process(e,function(e,n){if(e)throw e;t.send(n)})}}]),t}(c);e.exports={operators:{atom:u}}},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":a(t))&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":a(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function u(e,t){var n={};return"string"==typeof e?(n.comment=e,n.state=t):(n.comment="checkpoint",n.state=e),new l(n)}var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),c=n(2),f=n(19),l=function(e){function t(e,n){o(this,t);var i=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return i._type="checkpoint",i.addFeature("checkpoint"),i.addFeature("actuator"),i.addFeature("async"),i.addFeature("stateful"),i.stateFn=function(t,n){var o=Object.prototype.hasOwnProperty.call(i.meta,"namespace")?i.meta.namespace+".":"",r=f.getFn(""+o+i.name);return r?r.call(i,t,n):e.state?e.state.call(i,t,n):void n()},i}return i(t,e),s(t,[{key:"onSignal",value:function(e){this.send(e)}},{key:"getState",value:function(e,t){try{this.stateFn.call(this,e,t)}catch(e){console.error(e)}}}]),t}(c);e.exports={operators:{checkpoint:u}}}])});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6).setImmediate))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var apply = Function.prototype.apply;

	// DOM APIs, for completeness

	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) {
	  if (timeout) {
	    timeout.close();
	  }
	};

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};

	// setimmediate attaches itself to the global object
	__webpack_require__(7);
	exports.setImmediate = setImmediate;
	exports.clearImmediate = clearImmediate;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
	    "use strict";

	    if (global.setImmediate) {
	        return;
	    }

	    var nextHandle = 1; // Spec says greater than zero
	    var tasksByHandle = {};
	    var currentlyRunningATask = false;
	    var doc = global.document;
	    var registerImmediate;

	    function setImmediate(callback) {
	      // Callback can either be a function or a string
	      if (typeof callback !== "function") {
	        callback = new Function("" + callback);
	      }
	      // Copy function arguments
	      var args = new Array(arguments.length - 1);
	      for (var i = 0; i < args.length; i++) {
	          args[i] = arguments[i + 1];
	      }
	      // Store and register the task
	      var task = { callback: callback, args: args };
	      tasksByHandle[nextHandle] = task;
	      registerImmediate(nextHandle);
	      return nextHandle++;
	    }

	    function clearImmediate(handle) {
	        delete tasksByHandle[handle];
	    }

	    function run(task) {
	        var callback = task.callback;
	        var args = task.args;
	        switch (args.length) {
	        case 0:
	            callback();
	            break;
	        case 1:
	            callback(args[0]);
	            break;
	        case 2:
	            callback(args[0], args[1]);
	            break;
	        case 3:
	            callback(args[0], args[1], args[2]);
	            break;
	        default:
	            callback.apply(undefined, args);
	            break;
	        }
	    }

	    function runIfPresent(handle) {
	        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
	        // So if we're currently running a task, we'll need to delay this invocation.
	        if (currentlyRunningATask) {
	            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
	            // "too much recursion" error.
	            setTimeout(runIfPresent, 0, handle);
	        } else {
	            var task = tasksByHandle[handle];
	            if (task) {
	                currentlyRunningATask = true;
	                try {
	                    run(task);
	                } finally {
	                    clearImmediate(handle);
	                    currentlyRunningATask = false;
	                }
	            }
	        }
	    }

	    function installNextTickImplementation() {
	        registerImmediate = function(handle) {
	            process.nextTick(function () { runIfPresent(handle); });
	        };
	    }

	    function canUsePostMessage() {
	        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
	        // where `global.postMessage` means something completely different and can't be used for this purpose.
	        if (global.postMessage && !global.importScripts) {
	            var postMessageIsAsynchronous = true;
	            var oldOnMessage = global.onmessage;
	            global.onmessage = function() {
	                postMessageIsAsynchronous = false;
	            };
	            global.postMessage("", "*");
	            global.onmessage = oldOnMessage;
	            return postMessageIsAsynchronous;
	        }
	    }

	    function installPostMessageImplementation() {
	        // Installs an event handler on `global` for the `message` event: see
	        // * https://developer.mozilla.org/en/DOM/window.postMessage
	        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

	        var messagePrefix = "setImmediate$" + Math.random() + "$";
	        var onGlobalMessage = function(event) {
	            if (event.source === global &&
	                typeof event.data === "string" &&
	                event.data.indexOf(messagePrefix) === 0) {
	                runIfPresent(+event.data.slice(messagePrefix.length));
	            }
	        };

	        if (global.addEventListener) {
	            global.addEventListener("message", onGlobalMessage, false);
	        } else {
	            global.attachEvent("onmessage", onGlobalMessage);
	        }

	        registerImmediate = function(handle) {
	            global.postMessage(messagePrefix + handle, "*");
	        };
	    }

	    function installMessageChannelImplementation() {
	        var channel = new MessageChannel();
	        channel.port1.onmessage = function(event) {
	            var handle = event.data;
	            runIfPresent(handle);
	        };

	        registerImmediate = function(handle) {
	            channel.port2.postMessage(handle);
	        };
	    }

	    function installReadyStateChangeImplementation() {
	        var html = doc.documentElement;
	        registerImmediate = function(handle) {
	            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
	            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
	            var script = doc.createElement("script");
	            script.onreadystatechange = function () {
	                runIfPresent(handle);
	                script.onreadystatechange = null;
	                html.removeChild(script);
	                script = null;
	            };
	            html.appendChild(script);
	        };
	    }

	    function installSetTimeoutImplementation() {
	        registerImmediate = function(handle) {
	            setTimeout(runIfPresent, 0, handle);
	        };
	    }

	    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
	    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
	    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

	    // Don't get fooled by e.g. browserify environments.
	    if ({}.toString.call(global.process) === "[object process]") {
	        // For Node.js before 0.9
	        installNextTickImplementation();

	    } else if (canUsePostMessage()) {
	        // For non-IE10 modern browsers
	        installPostMessageImplementation();

	    } else if (global.MessageChannel) {
	        // For web workers, where supported
	        installMessageChannelImplementation();

	    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
	        // For IE 6–8
	        installReadyStateChangeImplementation();

	    } else {
	        // For older browsers
	        installSetTimeoutImplementation();
	    }

	    attachTo.setImmediate = setImmediate;
	    attachTo.clearImmediate = clearImmediate;
	}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(8)))

/***/ },
/* 8 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var v1 = __webpack_require__(10);
	var v4 = __webpack_require__(13);

	var uuid = v4;
	uuid.v1 = v1;
	uuid.v4 = v4;

	module.exports = uuid;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// Unique ID creation requires a high quality random # generator.  We feature
	// detect to determine the best RNG source, normalizing to a function that
	// returns 128-bits of randomness, since that's what's usually required
	var rng = __webpack_require__(11);
	var bytesToUuid = __webpack_require__(12);

	// **`v1()` - Generate time-based UUID**
	//
	// Inspired by https://github.com/LiosK/UUID.js
	// and http://docs.python.org/library/uuid.html

	// random #'s we need to init node and clockseq
	var _seedBytes = rng();

	// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
	var _nodeId = [
	  _seedBytes[0] | 0x01,
	  _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
	];

	// Per 4.2.2, randomize (14 bit) clockseq
	var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

	// Previous uuid creation time
	var _lastMSecs = 0, _lastNSecs = 0;

	// See https://github.com/broofa/node-uuid for API details
	function v1(options, buf, offset) {
	  var i = buf && offset || 0;
	  var b = buf || [];

	  options = options || {};

	  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

	  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
	  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
	  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
	  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
	  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

	  // Per 4.2.1.2, use count of uuid's generated during the current clock
	  // cycle to simulate higher resolution clock
	  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

	  // Time since last uuid creation (in msecs)
	  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

	  // Per 4.2.1.2, Bump clockseq on clock regression
	  if (dt < 0 && options.clockseq === undefined) {
	    clockseq = clockseq + 1 & 0x3fff;
	  }

	  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
	  // time interval
	  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
	    nsecs = 0;
	  }

	  // Per 4.2.1.2 Throw error if too many uuids are requested
	  if (nsecs >= 10000) {
	    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
	  }

	  _lastMSecs = msecs;
	  _lastNSecs = nsecs;
	  _clockseq = clockseq;

	  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
	  msecs += 12219292800000;

	  // `time_low`
	  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
	  b[i++] = tl >>> 24 & 0xff;
	  b[i++] = tl >>> 16 & 0xff;
	  b[i++] = tl >>> 8 & 0xff;
	  b[i++] = tl & 0xff;

	  // `time_mid`
	  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
	  b[i++] = tmh >>> 8 & 0xff;
	  b[i++] = tmh & 0xff;

	  // `time_high_and_version`
	  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
	  b[i++] = tmh >>> 16 & 0xff;

	  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
	  b[i++] = clockseq >>> 8 | 0x80;

	  // `clock_seq_low`
	  b[i++] = clockseq & 0xff;

	  // `node`
	  var node = options.node || _nodeId;
	  for (var n = 0; n < 6; ++n) {
	    b[i + n] = node[n];
	  }

	  return buf ? buf : bytesToUuid(b);
	}

	module.exports = v1;


/***/ },
/* 11 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {// Unique ID creation requires a high quality random # generator.  In the
	// browser this is a little complicated due to unknown quality of Math.random()
	// and inconsistent support for the `crypto` API.  We do the best we can via
	// feature-detection
	var rng;

	var crypto = global.crypto || global.msCrypto; // for IE 11
	if (crypto && crypto.getRandomValues) {
	  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
	  var rnds8 = new Uint8Array(16);
	  rng = function whatwgRNG() {
	    crypto.getRandomValues(rnds8);
	    return rnds8;
	  };
	}

	if (!rng) {
	  // Math.random()-based (RNG)
	  //
	  // If all else fails, use Math.random().  It's fast, but is of unspecified
	  // quality.
	  var  rnds = new Array(16);
	  rng = function() {
	    for (var i = 0, r; i < 16; i++) {
	      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
	      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
	    }

	    return rnds;
	  };
	}

	module.exports = rng;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 * Convert array of 16 byte values to UUID string format of the form:
	 * XXXXXXXX-XXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
	 */
	var byteToHex = [];
	for (var i = 0; i < 256; ++i) {
	  byteToHex[i] = (i + 0x100).toString(16).substr(1);
	}

	function bytesToUuid(buf, offset) {
	  var i = offset || 0;
	  var bth = byteToHex;
	  return  bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]];
	}

	module.exports = bytesToUuid;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var rng = __webpack_require__(11);
	var bytesToUuid = __webpack_require__(12);

	function v4(options, buf, offset) {
	  var i = buf && offset || 0;

	  if (typeof(options) == 'string') {
	    buf = options == 'binary' ? new Array(16) : null;
	    options = null;
	  }
	  options = options || {};

	  var rnds = options.random || (options.rng || rng)();

	  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
	  rnds[6] = (rnds[6] & 0x0f) | 0x40;
	  rnds[8] = (rnds[8] & 0x3f) | 0x80;

	  // Copy bytes to buffer, if provided
	  if (buf) {
	    for (var ii = 0; ii < 16; ++ii) {
	      buf[i + ii] = rnds[ii];
	    }
	  }

	  return buf || bytesToUuid(rnds);
	}

	module.exports = v4;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var Freezer = __webpack_require__(15);
	module.exports = Freezer;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Utils = __webpack_require__( 16 ),
		Emitter = __webpack_require__( 17 ),
		Frozen = __webpack_require__( 18 )
	;

	//#build
	var Freezer = function( initialValue, options ) {
		var me = this,
			ops = options || {},
			store = {
				live: ops.live || false,
				freezeInstances: ops.freezeInstances || false
			}
		;

		// Immutable data
		var frozen;
		var pivotTriggers = [], pivotTicking = 0;
		var triggerNow = function( node ){
			var _ = node.__,
				i
			;

			if( _.listener ){
				var prevState = _.listener.prevState || node;
				_.listener.prevState = 0;
				Frozen.trigger( prevState, 'update', node, true );
			}

			for (i = 0; i < _.parents.length; i++) {
				_.store.notify( 'now', _.parents[i] );
			}
		};

		var addToPivotTriggers = function( node ){
			pivotTriggers.push( node );
			if( !pivotTicking ){
				pivotTicking = 1;
				Utils.nextTick( function(){
					pivotTriggers = [];
					pivotTicking = 0;
				});
			}
		};

		store.notify = function notify( eventName, node, options ){
			if( eventName == 'now' ){
				if( pivotTriggers.length ){
					while( pivotTriggers.length ){
						triggerNow( pivotTriggers.shift() );
					}
				}
				else {
					triggerNow( node );
				}

				return node;
			}

			var update = Frozen[eventName]( node, options );

			if( eventName != 'pivot' ){
				var pivot = Utils.findPivot( update );
				if( pivot ) {
					addToPivotTriggers( update );
		  		return pivot;
				}
			}

			return update;
		};

		store.freezeFn = ops.mutable === true ?
			function(){} :
			function( obj ){ Object.freeze( obj ); }
		;

		// Create the frozen object
		frozen = Frozen.freeze( initialValue, store );
		frozen.__.updateRoot = function( prevNode, updated ){
			if( prevNode === frozen ){
				frozen = updated;
			}
		}

		// Listen to its changes immediately
		var listener = frozen.getListener(),
			hub = {}
		;

		Utils.each(['on', 'off', 'once', 'trigger'], function( method ){
			var attrs = {};
			attrs[ method ] = listener[method].bind(listener);
			Utils.addNE( me, attrs );
			Utils.addNE( hub, attrs );
		});

		Utils.addNE( this, {
			get: function(){
				return frozen;
			},
			set: function( node ){
				frozen.reset( node );
			},
			getEventHub: function(){
				return hub;
			}
		});

		Utils.addNE( this, { getData: this.get, setData: this.set } );
	};

	//#build

	module.exports = Freezer;


/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	//#build
	var global = (new Function("return this")());

	var Utils = {
		extend: function( ob, props ){
			for( var p in props ){
				ob[p] = props[p];
			}
			return ob;
		},

		createNonEnumerable: function( obj, proto ){
			var ne = {};
			for( var key in obj )
				ne[key] = {value: obj[key] };
			return Object.create( proto || {}, ne );
		},

		error: function( message ){
			var err = new Error( message );
			if( console )
				return console.error( err );
			else
				throw err;
		},

		each: function( o, clbk ){
			var i,l,keys;
			if( o && o.constructor == Array ){
				for (i = 0, l = o.length; i < l; i++)
					clbk( o[i], i );
			}
			else {
				keys = Object.keys( o );
				for( i = 0, l = keys.length; i < l; i++ )
					clbk( o[ keys[i] ], keys[i] );
			}
		},

		addNE: function( node, attrs ){
			for( var key in attrs ){
				Object.defineProperty( node, key, {
					enumerable: false,
					configurable: true,
					writable: true,
					value: attrs[ key ]
				});
			}
		},

		/**
		 * Creates non-enumerable property descriptors, to be used by Object.create.
		 * @param  {Object} attrs Properties to create descriptors
		 * @return {Object}       A hash with the descriptors.
		 */
		createNE: function( attrs ){
			var ne = {};

			for( var key in attrs ){
				ne[ key ] = {
					writable: true,
					configurable: true,
					enumerable: false,
					value: attrs[ key ]
				}
			}

			return ne;
		},

		// nextTick - by stagas / public domain
		nextTick: (function () {
	    var queue = [],
			dirty = false,
			fn,
			hasPostMessage = !!global.postMessage && (typeof Window != 'undefined') && (global instanceof Window),
			messageName = 'nexttick',
			trigger = (function () {
				return hasPostMessage
					? function trigger () {
					global.postMessage(messageName, '*');
				}
				: function trigger () {
					setTimeout(function () { processQueue() }, 0);
				};
			}()),
			processQueue = (function () {
				return hasPostMessage
					? function processQueue (event) {
						if (event.source === global && event.data === messageName) {
							event.stopPropagation();
							flushQueue();
						}
					}
					: flushQueue;
	    	})()
	    ;

	    function flushQueue () {
	        while (fn = queue.shift()) {
	            fn();
	        }
	        dirty = false;
	    }

	    function nextTick (fn) {
	        queue.push(fn);
	        if (dirty) return;
	        dirty = true;
	        trigger();
	    }

	    if (hasPostMessage) global.addEventListener('message', processQueue, true);

	    nextTick.removeListener = function () {
	        global.removeEventListener('message', processQueue, true);
	    }

	    return nextTick;
	  })(),

	  findPivot: function( node ){
	  		if( !node || !node.__ )
	  			return;

	  		if( node.__.pivot )
	  			return node;

	  		var found = 0,
	  			parents = node.__.parents,
	  			i = 0,
	  			parent
	  		;

	  		// Look up for the pivot in the parents
	  		while( !found && i < parents.length ){
	  			parent = parents[i];
	  			if( parent.__.pivot )
	  				found = parent;
	  			i++;
	  		}

	  		if( found ){
	  			return found;
	  		}

	  		// If not found, try with the parent's parents
	  		i=0;
	  		while( !found && i < parents.length ){
		  		found = this.findPivot( parents[i] );
		  		i++;
		  	}

	  		return found;
	  },

		isLeaf: function( node, freezeInstances ){
			var cons;
			return !node || !(cons = node.constructor) || (freezeInstances ?
				(cons === String || cons === Number || cons === Boolean) :
				(cons != Object && cons != Array)
			);
		}
	};
	//#build


	module.exports = Utils;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Utils = __webpack_require__( 16 );



	//#build


	var BEFOREALL = 'beforeAll',
		AFTERALL = 'afterAll'
	;
	var specialEvents = [BEFOREALL, AFTERALL];

	// The prototype methods are stored in a different object
	// and applied as non enumerable properties later
	var emitterProto = {
		on: function( eventName, listener, once ){
			var listeners = this._events[ eventName ] || [];

			listeners.push({ callback: listener, once: once});
			this._events[ eventName ] =  listeners;

			return this;
		},

		once: function( eventName, listener ){
			return this.on( eventName, listener, true );
		},

		off: function( eventName, listener ){
			if( typeof eventName == 'undefined' ){
				this._events = {};
			}
			else if( typeof listener == 'undefined' ) {
				this._events[ eventName ] = [];
			}
			else {
				var listeners = this._events[ eventName ] || [],
					i
				;

				for (i = listeners.length - 1; i >= 0; i--) {
					if( listeners[i].callback === listener )
						listeners.splice( i, 1 );
				}
			}

			return this;
		},

		trigger: function( eventName ){
			var args = [].slice.call( arguments, 1 ),
				listeners = this._events[ eventName ] || [],
				onceListeners = [],
				special = specialEvents.indexOf( eventName ) != -1,
				i, listener, returnValue, lastValue
			;

			special || this.trigger.apply( this, [BEFOREALL, eventName].concat( args ) );

			// Call listeners
			for (i = 0; i < listeners.length; i++) {
				listener = listeners[i];

				if( listener.callback )
					lastValue = listener.callback.apply( this, args );
				else {
					// If there is not a callback, remove!
					listener.once = true;
				}

				if( listener.once )
					onceListeners.push( i );

				if( lastValue !== undefined ){
					returnValue = lastValue;
				}
			}

			// Remove listeners marked as once
			for( i = onceListeners.length - 1; i >= 0; i-- ){
				listeners.splice( onceListeners[i], 1 );
			}

			special || this.trigger.apply( this, [AFTERALL, eventName].concat( args ) );

			return returnValue;
		}
	};

	// Methods are not enumerable so, when the stores are
	// extended with the emitter, they can be iterated as
	// hashmaps
	var Emitter = Utils.createNonEnumerable( emitterProto );
	//#build

	module.exports = Emitter;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Utils = __webpack_require__( 16 ),
		nodeCreator = __webpack_require__( 19),
		Emitter = __webpack_require__(17)
	;

	//#build
	var Frozen = {
		freeze: function( node, store ){
			if( node && node.__ ){
				return node;
			}

			var me = this,
				frozen = nodeCreator.clone(node)
			;

			Utils.addNE( frozen, { __: {
				listener: false,
				parents: [],
				store: store
			}});

			// Freeze children
			Utils.each( node, function( child, key ){
				if( !Utils.isLeaf( child, store.freezeInstances ) ){
					child = me.freeze( child, store );
				}

				if( child && child.__ ){
					me.addParent( child, frozen );
				}

				frozen[ key ] = child;
			});

			store.freezeFn( frozen );

			return frozen;
		},

		merge: function( node, attrs ){
			var _ = node.__,
				trans = _.trans,

				// Clone the attrs to not modify the argument
				attrs = Utils.extend( {}, attrs)
			;

			if( trans ){
				for( var attr in attrs )
					trans[ attr ] = attrs[ attr ];
				return node;
			}

			var me = this,
				frozen = this.copyMeta( node ),
				store = _.store,
				val, key, isFrozen
			;

			Utils.each( node, function( child, key ){
				isFrozen = child && child.__;

				if( isFrozen ){
					me.removeParent( child, node );
				}

				val = attrs[ key ];
				if( !val ){
					if( isFrozen )
						me.addParent( child, frozen );
					return frozen[ key ] = child;
				}

				if( !Utils.isLeaf( val, store.freezeInstances ) )
					val = me.freeze( val, store );

				if( val && val.__ )
					me.addParent( val, frozen );

				delete attrs[ key ];

				frozen[ key ] = val;
			});


			for( key in attrs ) {
				val = attrs[ key ];

				if( !Utils.isLeaf( val, store.freezeInstances ) )
					val = me.freeze( val, store );

				if( val && val.__ )
					me.addParent( val, frozen );

				frozen[ key ] = val;
			}

			_.store.freezeFn( frozen );

			this.refreshParents( node, frozen );

			return frozen;
		},

		replace: function( node, replacement ) {
			var me = this,
				_ = node.__,
				frozen = replacement
			;

			if( !Utils.isLeaf( replacement, _.store.freezeInstances ) ) {

				frozen = me.freeze( replacement, _.store );
				frozen.__.parents = _.parents;
				frozen.__.updateRoot = _.updateRoot;

				// Add the current listener if exists, replacing a
				// previous listener in the frozen if existed
				if( _.listener )
					frozen.__.listener = _.listener;
			}
			if( frozen ){
				this.fixChildren( frozen, node );
			}
			this.refreshParents( node, frozen );

			return frozen;
		},

		remove: function( node, attrs ){
			var trans = node.__.trans;
			if( trans ){
				for( var l = attrs.length - 1; l >= 0; l-- )
					delete trans[ attrs[l] ];
				return node;
			}

			var me = this,
				frozen = this.copyMeta( node ),
				isFrozen
			;

			Utils.each( node, function( child, key ){
				isFrozen = child && child.__;

				if( isFrozen ){
					me.removeParent( child, node );
				}

				if( attrs.indexOf( key ) != -1 ){
					return;
				}

				if( isFrozen )
					me.addParent( child, frozen );

				frozen[ key ] = child;
			});

			node.__.store.freezeFn( frozen );
			this.refreshParents( node, frozen );

			return frozen;
		},

		splice: function( node, args ){
			var _ = node.__,
				trans = _.trans
			;

			if( trans ){
				trans.splice.apply( trans, args );
				return node;
			}

			var me = this,
				frozen = this.copyMeta( node ),
				index = args[0],
				deleteIndex = index + args[1],
				child
			;

			// Clone the array
			Utils.each( node, function( child, i ){

				if( child && child.__ ){
					me.removeParent( child, node );

					// Skip the nodes to delete
					if( i < index || i>= deleteIndex )
						me.addParent( child, frozen );
				}

				frozen[i] = child;
			});

			// Prepare the new nodes
			if( args.length > 1 ){
				for (var i = args.length - 1; i >= 2; i--) {
					child = args[i];

					if( !Utils.isLeaf( child, _.store.freezeInstances ) )
						child = this.freeze( child, _.store );

					if( child && child.__ )
						this.addParent( child, frozen );

					args[i] = child;
				}
			}

			// splice
			Array.prototype.splice.apply( frozen, args );

			_.store.freezeFn( frozen );
			this.refreshParents( node, frozen );

			return frozen;
		},

		transact: function( node ) {
			var me = this,
				transacting = node.__.trans,
				trans
			;

			if( transacting )
				return transacting;

			trans = node.constructor == Array ? [] : {};

			Utils.each( node, function( child, key ){
				trans[ key ] = child;
			});

			node.__.trans = trans;

			// Call run automatically in case
			// the user forgot about it
			Utils.nextTick( function(){
				if( node.__.trans )
					me.run( node );
			});

			return trans;
		},

		run: function( node ) {
			var me = this,
				trans = node.__.trans
			;

			if( !trans )
				return node;

			// Remove the node as a parent
			Utils.each( trans, function( child, key ){
				if( child && child.__ ){
					me.removeParent( child, node );
				}
			});

			delete node.__.trans;

			var result = this.replace( node, trans );
			return result;
		},

		pivot: function( node ){
			node.__.pivot = 1;
			this.unpivot( node );
			return node;
		},

		unpivot: function( node ){
			Utils.nextTick( function(){
				node.__.pivot = 0;
			});
		},

		refresh: function( node, oldChild, newChild ){
			var me = this,
				trans = node.__.trans,
				found = 0
			;

			if( trans ){

				Utils.each( trans, function( child, key ){
					if( found ) return;

					if( child === oldChild ){

						trans[ key ] = newChild;
						found = 1;

						if( newChild && newChild.__ )
							me.addParent( newChild, node );
					}
				});

				return node;
			}

			var frozen = this.copyMeta( node ),
				replacement, __
			;

			Utils.each( node, function( child, key ){
				if( child === oldChild ){
					child = newChild;
				}

				if( child && (__ = child.__) ){
					me.removeParent( child, node );
					me.addParent( child, frozen );
				}

				frozen[ key ] = child;
			});

			node.__.store.freezeFn( frozen );

			this.refreshParents( node, frozen );
		},

		fixChildren: function( node, oldNode ){
			var me = this;
			Utils.each( node, function( child ){
				if( !child || !child.__ )
					return;

				// Update parents in all children no matter the child
				// is linked to the node or not.
				me.fixChildren( child );

				if( child.__.parents.length == 1 )
					return child.__.parents = [ node ];

				if( oldNode )
					me.removeParent( child, oldNode );

				me.addParent( child, node );
			});
		},

		copyMeta: function( node ){
			var me = this,
				frozen = nodeCreator.clone( node ),
				_ = node.__
			;

			Utils.addNE( frozen, {__: {
				store: _.store,
				updateRoot: _.updateRoot,
				listener: _.listener,
				parents: _.parents.slice( 0 ),
				trans: _.trans,
				pivot: _.pivot,
			}});

			if( _.pivot )
				this.unpivot( frozen );

			return frozen;
		},

		refreshParents: function( oldChild, newChild ){
			var _ = oldChild.__,
				parents = _.parents.length,
				i
			;

			if( oldChild.__.updateRoot ){
				oldChild.__.updateRoot( oldChild, newChild );
			}
			if( newChild ){
				this.trigger( oldChild, 'update', newChild, _.store.live );
			}
			if( parents ){
				for (i = parents - 1; i >= 0; i--) {
					this.refresh( _.parents[i], oldChild, newChild );
				}
			}
		},

		removeParent: function( node, parent ){
			var parents = node.__.parents,
				index = parents.indexOf( parent )
			;

			if( index != -1 ){
				parents.splice( index, 1 );
			}
		},

		addParent: function( node, parent ){
			var parents = node.__.parents,
				index = parents.indexOf( parent )
			;

			if( index == -1 ){
				parents[ parents.length ] = parent;
			}
		},

		trigger: function( node, eventName, param, now ){
			var listener = node.__.listener;
			if( !listener )
				return;

			var ticking = listener.ticking;

			if( now ){
				if( ticking || param ){
					listener.ticking = 0;
					listener.trigger( eventName, ticking || param, node );
				}
				return;
			}

			listener.ticking = param;
			if( !listener.prevState ){
				listener.prevState = node;
			}

			if( !ticking ){
				Utils.nextTick( function(){
					if( listener.ticking ){
						var updated = listener.ticking,
							prevState = listener.prevState
						;

						listener.ticking = 0;
						listener.prevState = 0;

						listener.trigger( eventName, updated, node );
					}
				});
			}
		},

		createListener: function( frozen ){
			var l = frozen.__.listener;

			if( !l ) {
				l = Object.create(Emitter, {
					_events: {
						value: {},
						writable: true
					}
				});

				frozen.__.listener = l;
			}

			return l;
		}
	};

	nodeCreator.init( Frozen );
	//#build

	module.exports = Frozen;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Utils = __webpack_require__( 16 );

	//#build
	var nodeCreator = {
		init: function( Frozen ){

			var commonMethods = {
				set: function( attr, value ){
					var attrs = attr,
						update = this.__.trans
					;

					if( typeof attr != 'object' ){
						attrs = {};
						attrs[ attr ] = value;
					}

					if( !update ){
						for( var key in attrs ){
							update = update || this[ key ] !== attrs[ key ];
						}

						// No changes, just return the node
						if( !update )
							return Utils.findPivot( this ) || this;
					}

					return this.__.store.notify( 'merge', this, attrs );
				},

				reset: function( attrs ) {
					return this.__.store.notify( 'replace', this, attrs );
				},

				getListener: function(){
					return Frozen.createListener( this );
				},

				toJS: function(){
					var js;
					if( this.constructor == Array ){
						js = new Array( this.length );
					}
					else {
						js = {};
					}

					Utils.each( this, function( child, i ){
						if( child && child.__ )
							js[ i ] = child.toJS();
						else
							js[ i ] = child;
					});

					return js;
				},

				transact: function(){
					return this.__.store.notify( 'transact', this );
				},

				run: function(){
					return this.__.store.notify( 'run', this );
				},

				now: function(){
					return this.__.store.notify( 'now', this );
				},

				pivot: function(){
					return this.__.store.notify( 'pivot', this );
				}
			};

			var arrayMethods = Utils.extend({
				push: function( el ){
					return this.append( [el] );
				},

				append: function( els ){
					if( els && els.length )
						return this.__.store.notify( 'splice', this, [this.length, 0].concat( els ) );
					return this;
				},

				pop: function(){
					if( !this.length )
						return this;

					return this.__.store.notify( 'splice', this, [this.length -1, 1] );
				},

				unshift: function( el ){
					return this.prepend( [el] );
				},

				prepend: function( els ){
					if( els && els.length )
						return this.__.store.notify( 'splice', this, [0, 0].concat( els ) );
					return this;
				},

				shift: function(){
					if( !this.length )
						return this;

					return this.__.store.notify( 'splice', this, [0, 1] );
				},

				splice: function( index, toRemove, toAdd ){
					return this.__.store.notify( 'splice', this, arguments );
				}
			}, commonMethods );

			var FrozenArray = Object.create( Array.prototype, Utils.createNE( arrayMethods ) );

			var objectMethods = Utils.createNE( Utils.extend({
				remove: function( keys ){
					var filtered = [],
						k = keys
					;

					if( keys.constructor != Array )
						k = [ keys ];

					for( var i = 0, l = k.length; i<l; i++ ){
						if( this.hasOwnProperty( k[i] ) )
							filtered.push( k[i] );
					}

					if( filtered.length )
						return this.__.store.notify( 'remove', this, filtered );
					return this;
				}
			}, commonMethods));

			var FrozenObject = Object.create( Object.prototype, objectMethods );

			var createArray = (function(){
				// fast version
				if( [].__proto__ )
					return function( length ){
						var arr = new Array( length );
						arr.__proto__ = FrozenArray;
						return arr;
					}

				// slow version for older browsers
				return function( length ){
					var arr = new Array( length );

					for( var m in arrayMethods ){
						arr[ m ] = arrayMethods[ m ];
					}

					return arr;
				}
			})();

			this.clone = function( node ){
				var cons = node.constructor;
				if( cons == Array ){
					return createArray( node.length );
				}
				else {
					if( cons === Object ){
						return Object.create( FrozenObject );
					}
					// Class instances
					else {
						return Object.create( cons.prototype, objectMethods );
					}
				}
			}
		}
	}
	//#build

	module.exports = nodeCreator;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory){
	  'use strict';

	  /*istanbul ignore next:cant test*/
	  if (typeof module === 'object' && typeof module.exports === 'object') {
	    module.exports = factory();
	  } else if (true) {
	    // AMD. Register as an anonymous module.
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else {
	    // Browser globals
	    root.objectPath = factory();
	  }
	})(this, function(){
	  'use strict';

	  var toStr = Object.prototype.toString;
	  function hasOwnProperty(obj, prop) {
	    if(obj == null) {
	      return false
	    }
	    //to handle objects with null prototypes (too edge case?)
	    return Object.prototype.hasOwnProperty.call(obj, prop)
	  }

	  function isEmpty(value){
	    if (!value) {
	      return true;
	    }
	    if (isArray(value) && value.length === 0) {
	        return true;
	    } else if (typeof value !== 'string') {
	        for (var i in value) {
	            if (hasOwnProperty(value, i)) {
	                return false;
	            }
	        }
	        return true;
	    }
	    return false;
	  }

	  function toString(type){
	    return toStr.call(type);
	  }

	  function isObject(obj){
	    return typeof obj === 'object' && toString(obj) === "[object Object]";
	  }

	  var isArray = Array.isArray || function(obj){
	    /*istanbul ignore next:cant test*/
	    return toStr.call(obj) === '[object Array]';
	  }

	  function isBoolean(obj){
	    return typeof obj === 'boolean' || toString(obj) === '[object Boolean]';
	  }

	  function getKey(key){
	    var intKey = parseInt(key);
	    if (intKey.toString() === key) {
	      return intKey;
	    }
	    return key;
	  }

	  function factory(options) {
	    options = options || {}

	    var objectPath = function(obj) {
	      return Object.keys(objectPath).reduce(function(proxy, prop) {
	        if(prop === 'create') {
	          return proxy;
	        }

	        /*istanbul ignore else*/
	        if (typeof objectPath[prop] === 'function') {
	          proxy[prop] = objectPath[prop].bind(objectPath, obj);
	        }

	        return proxy;
	      }, {});
	    };

	    function hasShallowProperty(obj, prop) {
	      return (options.includeInheritedProps || (typeof prop === 'number' && Array.isArray(obj)) || hasOwnProperty(obj, prop))
	    }

	    function getShallowProperty(obj, prop) {
	      if (hasShallowProperty(obj, prop)) {
	        return obj[prop];
	      }
	    }

	    function set(obj, path, value, doNotReplace){
	      if (typeof path === 'number') {
	        path = [path];
	      }
	      if (!path || path.length === 0) {
	        return obj;
	      }
	      if (typeof path === 'string') {
	        return set(obj, path.split('.').map(getKey), value, doNotReplace);
	      }
	      var currentPath = path[0];
	      var currentValue = getShallowProperty(obj, currentPath);
	      if (path.length === 1) {
	        if (currentValue === void 0 || !doNotReplace) {
	          obj[currentPath] = value;
	        }
	        return currentValue;
	      }

	      if (currentValue === void 0) {
	        //check if we assume an array
	        if(typeof path[1] === 'number') {
	          obj[currentPath] = [];
	        } else {
	          obj[currentPath] = {};
	        }
	      }

	      return set(obj[currentPath], path.slice(1), value, doNotReplace);
	    }

	    objectPath.has = function (obj, path) {
	      if (typeof path === 'number') {
	        path = [path];
	      } else if (typeof path === 'string') {
	        path = path.split('.');
	      }

	      if (!path || path.length === 0) {
	        return !!obj;
	      }

	      for (var i = 0; i < path.length; i++) {
	        var j = getKey(path[i]);

	        if((typeof j === 'number' && isArray(obj) && j < obj.length) ||
	          (options.includeInheritedProps ? (j in Object(obj)) : hasOwnProperty(obj, j))) {
	          obj = obj[j];
	        } else {
	          return false;
	        }
	      }

	      return true;
	    };

	    objectPath.ensureExists = function (obj, path, value){
	      return set(obj, path, value, true);
	    };

	    objectPath.set = function (obj, path, value, doNotReplace){
	      return set(obj, path, value, doNotReplace);
	    };

	    objectPath.insert = function (obj, path, value, at){
	      var arr = objectPath.get(obj, path);
	      at = ~~at;
	      if (!isArray(arr)) {
	        arr = [];
	        objectPath.set(obj, path, arr);
	      }
	      arr.splice(at, 0, value);
	    };

	    objectPath.empty = function(obj, path) {
	      if (isEmpty(path)) {
	        return void 0;
	      }
	      if (obj == null) {
	        return void 0;
	      }

	      var value, i;
	      if (!(value = objectPath.get(obj, path))) {
	        return void 0;
	      }

	      if (typeof value === 'string') {
	        return objectPath.set(obj, path, '');
	      } else if (isBoolean(value)) {
	        return objectPath.set(obj, path, false);
	      } else if (typeof value === 'number') {
	        return objectPath.set(obj, path, 0);
	      } else if (isArray(value)) {
	        value.length = 0;
	      } else if (isObject(value)) {
	        for (i in value) {
	          if (hasShallowProperty(value, i)) {
	            delete value[i];
	          }
	        }
	      } else {
	        return objectPath.set(obj, path, null);
	      }
	    };

	    objectPath.push = function (obj, path /*, values */){
	      var arr = objectPath.get(obj, path);
	      if (!isArray(arr)) {
	        arr = [];
	        objectPath.set(obj, path, arr);
	      }

	      arr.push.apply(arr, Array.prototype.slice.call(arguments, 2));
	    };

	    objectPath.coalesce = function (obj, paths, defaultValue) {
	      var value;

	      for (var i = 0, len = paths.length; i < len; i++) {
	        if ((value = objectPath.get(obj, paths[i])) !== void 0) {
	          return value;
	        }
	      }

	      return defaultValue;
	    };

	    objectPath.get = function (obj, path, defaultValue){
	      if (typeof path === 'number') {
	        path = [path];
	      }
	      if (!path || path.length === 0) {
	        return obj;
	      }
	      if (obj == null) {
	        return defaultValue;
	      }
	      if (typeof path === 'string') {
	        return objectPath.get(obj, path.split('.'), defaultValue);
	      }

	      var currentPath = getKey(path[0]);
	      var nextObj = getShallowProperty(obj, currentPath)
	      if (nextObj === void 0) {
	        return defaultValue;
	      }

	      if (path.length === 1) {
	        return nextObj;
	      }

	      return objectPath.get(obj[currentPath], path.slice(1), defaultValue);
	    };

	    objectPath.del = function del(obj, path) {
	      if (typeof path === 'number') {
	        path = [path];
	      }

	      if (obj == null) {
	        return obj;
	      }

	      if (isEmpty(path)) {
	        return obj;
	      }
	      if(typeof path === 'string') {
	        return objectPath.del(obj, path.split('.'));
	      }

	      var currentPath = getKey(path[0]);
	      if (!hasShallowProperty(obj, currentPath)) {
	        return obj;
	      }

	      if(path.length === 1) {
	        if (isArray(obj)) {
	          obj.splice(currentPath, 1);
	        } else {
	          delete obj[currentPath];
	        }
	      } else {
	        return objectPath.del(obj[currentPath], path.slice(1));
	      }

	      return obj;
	    }

	    return objectPath;
	  }

	  var mod = factory();
	  mod.create = factory;
	  mod.withInheritedProps = factory({includeInheritedProps: true})
	  return mod;
	});


/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  MSG_TYPE: 'msgType',
	  ACTION_TYPE: 'actionType',

	  // msg type values
	  MSG_RENDER: 'render',
	  MSG_STATE_CHANGED: 'state changed',

	  // action type value
	  ACTION_GET_STATE: 'GET_STATE',
	  ACTION_SET_STATE: 'SET_STATE',
	  ACTION_INITIATE: 'INITIATE',
	  ACTION_RENDER: 'RENDER',

	  // action/msg keys
	  KEY_ROUTE: 'route',
	  KEY_URL: 'url',
	  KEY_STATE: 'state',

	  // predefined state keys
	  STATE_SYS: 'sys',
	  STATE_ROUTE: 'route',
	  STATE_PARSED_URL: 'parsedURL',
	  STATE_URL: 'url'
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = createApp;

	var _archs = __webpack_require__(23);

	var _archs2 = _interopRequireDefault(_archs);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function createApp(archName) {
	  var appBuilder = _archs2.default.get(archName);

	  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }

	  return appBuilder.apply(undefined, args);
	}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	var _ReduxSingleRouteApp = __webpack_require__(24);

	var _ReduxSingleRouteApp2 = _interopRequireDefault(_ReduxSingleRouteApp);

	var _ReduxMultipleRoutesApp = __webpack_require__(32);

	var _ReduxMultipleRoutesApp2 = _interopRequireDefault(_ReduxMultipleRoutesApp);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var ArchitectureRegistry = function () {
	  function ArchitectureRegistry() {
	    _classCallCheck(this, ArchitectureRegistry);

	    this._archs = new Map();
	  }

	  _createClass(ArchitectureRegistry, [{
	    key: 'register',
	    value: function register(name, appBuilder) {
	      this._archs.set(name, appBuilder);
	    }
	  }, {
	    key: 'get',
	    value: function get(name) {
	      return this._archs.get(name);
	    }
	  }]);

	  return ArchitectureRegistry;
	}();

	var archs = new ArchitectureRegistry();

	archs.register('redux-single-route-app', function (appName, options) {
	  return new _ReduxSingleRouteApp2.default(appName, options);
	});
	archs.register('redux-multiple-routes-app', function (appName, options) {
	  return new _ReduxMultipleRoutesApp2.default(appName, options);
	});

	exports.default = archs;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }return target;
	};

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	var _get = function get(object, property, receiver) {
	  if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
	    var parent = Object.getPrototypeOf(object);if (parent === null) {
	      return undefined;
	    } else {
	      return get(parent, property, receiver);
	    }
	  } else if ("value" in desc) {
	    return desc.value;
	  } else {
	    var getter = desc.get;if (getter === undefined) {
	      return undefined;
	    }return getter.call(receiver);
	  }
	};

	var _react = __webpack_require__(25);

	var _react2 = _interopRequireDefault(_react);

	var _Constants = __webpack_require__(21);

	var _Constants2 = _interopRequireDefault(_Constants);

	var _App2 = __webpack_require__(2);

	var _App3 = _interopRequireDefault(_App2);

	var _MemoryStoreComponent = __webpack_require__(26);

	var _MemoryStoreComponent2 = _interopRequireDefault(_MemoryStoreComponent);

	var _ViewComponent = __webpack_require__(28);

	var _ViewComponent2 = _interopRequireDefault(_ViewComponent);

	var _page = __webpack_require__(29);

	var _page2 = _interopRequireDefault(_page);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _possibleConstructorReturn(self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	// TODO: remove it. this is not good, single route app do not need page module

	var ReduxSingleRouteApp = function (_App) {
	  _inherits(ReduxSingleRouteApp, _App);

	  function ReduxSingleRouteApp() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _classCallCheck(this, ReduxSingleRouteApp);

	    var _this = _possibleConstructorReturn(this, (ReduxSingleRouteApp.__proto__ || Object.getPrototypeOf(ReduxSingleRouteApp)).call(this));

	    _this._sysComponent = _this.createComponent('system');
	    _this._appSensor = _this._sysComponent.ns().sensor('app sensor', function () {});

	    _this.view = new _ViewComponent2.default({
	      getName: function getName() {
	        return 'view';
	      },
	      render: options.render,
	      updateState: options.updateState
	    });

	    _this.store = new _MemoryStoreComponent2.default({
	      getName: function getName() {
	        return 'store';
	      },
	      initState: options.initState
	    });

	    // nested Link class
	    var _appSensor = _this._appSensor;

	    var Link = function (_React$Component) {
	      _inherits(Link, _React$Component);

	      function Link() {
	        _classCallCheck(this, Link);

	        return _possibleConstructorReturn(this, (Link.__proto__ || Object.getPrototypeOf(Link)).apply(this, arguments));
	      }

	      _createClass(Link, [{
	        key: 'handleClick',
	        value: function handleClick(event) {
	          if (this.props.onClick) {
	            this.props.onClick(event);
	          }

	          if (event.button !== 0 /* left click */) {
	              return;
	            }

	          if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) {
	            return;
	          }

	          if (event.defaultPrevented === true) {
	            return;
	          }

	          event.preventDefault();

	          if (this.props.to) {
	            _page2.default.redirect(this.props.to);
	            _appSensor.send({
	              actionType: 'RENDER',
	              url: this.props.to
	            });
	          } else {
	            console.log(event.currentTarget.pathname, event.currentTarget.search);
	          }
	        }
	      }, {
	        key: 'render',
	        value: function render() {
	          var props = this.props.props;

	          return _react2.default.createElement('a', _extends({ href: this.props.to }, props, { onClick: this.handleClick.bind(this) }), this.props.children);
	        }
	      }]);

	      return Link;
	    }(_react2.default.Component); // END OF NESTED LINK CLASS

	    _this.Link = Link;
	    return _this;
	  }

	  _createClass(ReduxSingleRouteApp, [{
	    key: 'getAppSensor',
	    value: function getAppSensor() {
	      return this._appSensor;
	    }
	  }, {
	    key: 'getViewSensor',
	    value: function getViewSensor() {
	      return this.view.sensor();
	    }
	  }, {
	    key: 'setStore',
	    value: function setStore(store) {
	      this.store = store;
	    }
	  }, {
	    key: 'setView',
	    value: function setView(view) {
	      this.view = view;
	    }
	  }, {
	    key: 'setRenderer',
	    value: function setRenderer(renderer) {
	      this.view.setRenderer(renderer);
	    }
	  }, {
	    key: 'setViewStateUpdater',
	    value: function setViewStateUpdater(updater) {
	      this.view.setStateUpdater(updater);
	    }
	  }, {
	    key: 'setStoreStateInitiator',
	    value: function setStoreStateInitiator(initiator, async) {
	      this.store.setStateInitiator(initiator, async);
	    }
	  }, {
	    key: 'reduce',
	    value: function reduce() {
	      var _store;

	      return (_store = this.store).reduce.apply(_store, arguments);
	    }

	    // ---------------------
	    // utils

	  }, {
	    key: 'getCurrentLocation',
	    value: function getCurrentLocation() {
	      if (typeof window === 'undefined') {
	        console.warn('Window Object does not exist!');
	        return null;
	      }
	      var _window$location = window.location,
	          pathname = _window$location.pathname,
	          search = _window$location.search,
	          hash = _window$location.hash;

	      var path = pathname + search + hash;
	      var basename = _page2.default.base();

	      if (basename) path = path.indexOf(basename) === 0 ? path.substr(basename.length) : path;
	      return path;
	    }

	    // ---------------------
	    // life cycle

	  }, {
	    key: 'initComponents',
	    value: function initComponents() {
	      // first add view and store into the components
	      this.addComponent(this.view);
	      this.addComponent(this.store);

	      _get(ReduxSingleRouteApp.prototype.__proto__ || Object.getPrototypeOf(ReduxSingleRouteApp.prototype), 'initComponents', this).call(this);
	    }
	  }, {
	    key: 'connectComponents',
	    value: function connectComponents() {
	      this.store.output().to(this.view.input());

	      this.view.sensor().to(this.store.input());
	      this.getAppSensor().to(this.store.input());
	    }
	  }, {
	    key: 'startComponents',
	    value: function startComponents() {
	      _get(ReduxSingleRouteApp.prototype.__proto__ || Object.getPrototypeOf(ReduxSingleRouteApp.prototype), 'startComponents', this).call(this);

	      // send init action when all components started
	      this.getAppSensor().send({
	        actionType: _Constants2.default.ACTION_INITIATE
	      }, false);

	      // send render action when store initiated
	      /*this.getAppSensor().send({
	        actionType: Constants.ACTION_RENDER,
	        url: this.getCurrentLocation()
	      }, false);*/
	    }
	  }, {
	    key: 'run',
	    value: function run() {
	      var _get2;

	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      (_get2 = _get(ReduxSingleRouteApp.prototype.__proto__ || Object.getPrototypeOf(ReduxSingleRouteApp.prototype), 'run', this)).call.apply(_get2, [this].concat(args));
	    }
	  }]);

	  return ReduxSingleRouteApp;
	}(_App3.default);

	exports.default = ReduxSingleRouteApp;

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _StoreComponent2 = __webpack_require__(27);

	var _StoreComponent3 = _interopRequireDefault(_StoreComponent2);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _possibleConstructorReturn(self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var MemoryStoreComponent = function (_StoreComponent) {
	  _inherits(MemoryStoreComponent, _StoreComponent);

	  function MemoryStoreComponent(options) {
	    _classCallCheck(this, MemoryStoreComponent);

	    var _this = _possibleConstructorReturn(this, (MemoryStoreComponent.__proto__ || Object.getPrototypeOf(MemoryStoreComponent)).call(this, options));

	    _this._state = null;

	    _this.setStateGetter(function () {
	      return this._state;
	    });

	    _this.setStateSetter(function (state) {
	      this._state = state;
	    });
	    return _this;
	  }

	  return MemoryStoreComponent;
	}(_StoreComponent3.default);

	exports.default = MemoryStoreComponent;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	var _Constants = __webpack_require__(21);

	var _Constants2 = _interopRequireDefault(_Constants);

	var _Component2 = __webpack_require__(3);

	var _Component3 = _interopRequireDefault(_Component2);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _possibleConstructorReturn(self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var StoreComponent = function (_Component) {
	  _inherits(StoreComponent, _Component);

	  function StoreComponent() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _classCallCheck(this, StoreComponent);

	    var name = options.getName ? options.getName() : StoreComponent.getNextDefaultStoreName();

	    var _this = _possibleConstructorReturn(this, (StoreComponent.__proto__ || Object.getPrototypeOf(StoreComponent)).call(this, name));

	    _this.options = options;
	    _this._isGetStateAsync = !!options.getStateAsync;
	    _this._isSetStateAsync = !!options.setStateAsync;
	    _this._isInitStateAsync = !!options.initStateAsync;
	    _this._isSaveInitStateAsync = !!options.saveInitStateAsync;

	    _this._syncStateGetter = options.getState;
	    _this._asyncStateGetter = options.getStateAsync;

	    _this._syncStateSetter = options.setState;
	    _this._asyncStateSetter = options.setStateAsync;

	    _this._syncStateInitiator = options.initState;
	    _this._asyncStateInitiator = options.initStateAsync;

	    _this._syncInitStateSaver = options.saveInitState;
	    _this._asyncInitStateSaver = options.saveInitStateAsync;

	    _this._reduceCounter = 0;
	    _this._unnamedNodeCounter = 0;

	    _this._prepareStateChanged = _this.ns().map('prepare [state changed]', {
	      __result__: 'the new store state object'
	    }, {
	      msgType: '[state changed]',
	      state: 'the new store state object'
	    }, function (s) {
	      return s.new({
	        msgType: _Constants2.default.MSG_STATE_CHANGED,
	        state: s.getResult()
	      });
	    });

	    _this._saveStatePipeline = null;

	    _this._errorhandler = _this.ns().errors(function (s) {
	      console.log(s.error);
	    });
	    return _this;
	  }

	  _createClass(StoreComponent, [{
	    key: 'init',
	    value: function init() {
	      this._errorhandler.to(this.output());

	      // connect the nodes here

	      // --------------------------
	      // basic flow

	      // render keeps all the properties in your signal
	      this.input().when(_Constants2.default.ACTION_INITIATE, function (s) {
	        return s.get(_Constants2.default.ACTION_TYPE) === _Constants2.default.ACTION_INITIATE;
	      }).to(this.initStateActuator()).map('@reducer_' + _Constants2.default.ACTION_INITIATE + ' reduce', {
	        __result__: 'the previous state object'
	      }, {
	        state: 'the new state obejct'
	      }, function (s) {
	        var state = s.getResult();
	        if (!state) state = {};
	        state[_Constants2.default.STATE_SYS] = {};
	        return s.set(_Constants2.default.KEY_STATE, state);
	      }).to(this.initStateSaver()).map('prepare [render]', function (s) {
	        return s.set(_Constants2.default.MSG_TYPE, _Constants2.default.MSG_RENDER).set(_Constants2.default.KEY_STATE, s.getResult()).del(_Constants2.default.KEY_URL).del(_Constants2.default.ACTION_TYPE).del('__result__');
	      }).to(this._errorhandler);
	      /*.errors(s => {
	        console.error(s.error);
	      });*/

	      this.input().when(_Constants2.default.ACTION_RENDER, function (s) {
	        return s.get(_Constants2.default.ACTION_TYPE) === _Constants2.default.ACTION_RENDER;
	      }).to(this.getStateActuator(_Constants2.default.ACTION_RENDER)).map('@reducer_' + _Constants2.default.ACTION_INITIATE + ' reduce', {
	        __result__: 'the previous state object'
	      }, {
	        state: 'the new state obejct'
	      }, function (s) {
	        var url = s.get(_Constants2.default.KEY_URL);
	        var state = s.getResult();
	        state[_Constants2.default.STATE_SYS][_Constants2.default.STATE_URL] = url;
	        return s.set(_Constants2.default.KEY_STATE, state);
	      }).to(this.setStateActuator(_Constants2.default.ACTION_RENDER)).map('prepare [render]', function (s) {
	        return s.set(_Constants2.default.MSG_TYPE, _Constants2.default.MSG_RENDER).set(_Constants2.default.KEY_STATE, s.getResult()).del(_Constants2.default.KEY_URL).del(_Constants2.default.ACTION_TYPE).del('__result__');
	      }).to(this._errorhandler);
	    }
	  }, {
	    key: 'setStateSetter',
	    value: function setStateSetter(stateSetter, async) {
	      this._isSetStateAsync = async;
	      if (!!async) {
	        this._asyncStateSetter = stateSetter;
	      } else {
	        this._syncStateSetter = stateSetter;
	      }
	    }
	  }, {
	    key: 'setStateGetter',
	    value: function setStateGetter(stateGetter, async) {
	      this._isGetStateAsync = async;
	      if (!!async) {
	        this._asyncStateGetter = stateGetter;
	      } else {
	        this._syncStateGetter = stateGetter;
	      }
	    }
	  }, {
	    key: 'setStateInitiator',
	    value: function setStateInitiator(stateInitiator, async) {
	      this._isInitStateAsync = async;
	      if (!!async) {
	        this._asyncStateInitiator = stateInitiator;
	      } else {
	        this._syncStateInitiator = stateInitiator;
	      }
	    }
	  }, {
	    key: 'setInitStateSaver',
	    value: function setInitStateSaver(initStateSaver, async) {
	      this._isSaveInitStateAsync = async;
	      if (!!async) {
	        this._asyncInitStateSaver = initStateSaver;
	      } else {
	        this._syncInitStateSaver = initStateSaver;
	      }
	    }
	  }, {
	    key: 'initStateSaver',
	    value: function initStateSaver() {
	      var _this2 = this;

	      if (!this._asyncInitStateSaver && !this._syncInitStateSaver) {
	        return this.setStateActuator(_Constants2.default.ACTION_INITIATE);
	      }

	      return this.ns().actuator('@initStateSaver init state save', {
	        __result__: 'the init state object'
	      }, {
	        __result__: 'the saved state object'
	      }, function (s, done) {
	        try {
	          var state = s.get(_Constants2.default.KEY_STATE);

	          if (_this2._isSaveInitStateAsync) {
	            _this2._asyncInitStateSaver.call(_this2, state, done);
	          } else {
	            _this2._syncInitStateSaver.call(_this2, state);
	            return done(null, state);
	          }
	        } catch (e) {
	          return done(e);
	        }
	      });
	    }
	  }, {
	    key: 'initStateActuator',
	    value: function initStateActuator(id) {
	      var _this3 = this;

	      var actuator = this.ns().actuator('@initState state initiator', {
	        any: 'parameter'
	      }, {
	        __result__: 'initial state'
	      }, function (s, done) {
	        try {
	          if (!_this3._asyncStateInitiator && !_this3._syncStateInitiator) {
	            return done();
	          }
	          if (_this3._isInitStateAsync) {
	            _this3._asyncStateInitiator.call(_this3, done);
	          } else {
	            var state = _this3._syncStateInitiator.call(_this3);
	            return done(null, state);
	          }
	        } catch (e) {
	          return done(e);
	        }
	      });

	      if (!this._asyncStateInitiator && !this._syncStateInitiator) {
	        actuator.removeFeature('impl').addFeature('todo');
	      } else {
	        actuator.removeFeature('todo').addFeature('impl');
	      }
	      return actuator;
	    }
	  }, {
	    key: 'getStateActuator',
	    value: function getStateActuator(id) {
	      var _this4 = this;

	      var name = id ? 'getState_' + id : 'getState_' + this._unnamedNodeCounter++;
	      var actuator = this.ns().actuator('@' + name + ' state getter', {}, {
	        __result__: 'the current state object'
	      }, function (s, done) {
	        try {
	          if (!_this4._asyncStateGetter && !_this4._syncStateGetter) {
	            return done();
	          }

	          if (_this4._isGetStateAsync) {
	            _this4._asyncStateGetter.call(_this4, done);
	          } else {
	            var state = _this4._syncStateGetter.call(_this4);
	            return done(null, state);
	          }
	        } catch (e) {
	          return done(e);
	        }
	      });

	      if (!this._asyncStateGetter && !this._syncStateGetter) {
	        actuator.removeFeature('impl').addFeature('todo');
	      } else {
	        actuator.removeFeature('todo').addFeature('impl');
	      }
	      return actuator;
	    }
	  }, {
	    key: 'setStateActuator',
	    value: function setStateActuator(id) {
	      var _this5 = this;

	      var name = id ? 'setState_' + id : 'setState_' + this._unnamedNodeCounter++;
	      var actuator = this.ns().actuator('@' + name + ' state setter', {
	        state: 'the new state object'
	      }, {
	        __result__: 'the saved state object'
	      }, function (s, done) {
	        try {
	          var state = s.get(_Constants2.default.KEY_STATE);
	          if (!_this5._asyncStateSetter && !_this5._syncStateSetter) {
	            return done(null, state);
	          }

	          if (state === null || state === undefined) {
	            return done(new Error('state could NOT be null or undefined! Maybe setup a state initiator before starting the app?'));
	          }

	          if (_this5._isSetStateAsync) {
	            _this5._asyncStateSetter.call(_this5, state, done);
	          } else {
	            _this5._syncStateSetter.call(_this5, state);
	            return done(null, state);
	          }
	        } catch (e) {
	          return done(e);
	        }
	      });

	      if (!this._asyncStateSetter && !this._syncStateSetter) {
	        actuator.removeFeature('impl').addFeature('todo');
	      } else {
	        actuator.removeFeature('todo').addFeature('impl');
	      }
	      return actuator;
	    }
	  }, {
	    key: 'notifyStoreChangedActuator',
	    value: function notifyStoreChangedActuator() {
	      return this._prepareStoreChanged;
	    }
	  }, {
	    key: 'reduce',
	    value: function reduce(actionType, reducer) {
	      if (this._reduceCounter == 0) {
	        this._prepareStateChanged.to(this._errorhandler);
	        this._saveStatePipeline = this.setStateActuator(actionType);
	        this._saveStatePipeline.to(this._prepareStateChanged);
	      }

	      this._reduceCounter++;

	      this.input().when(actionType, function (s) {
	        return s.get(_Constants2.default.ACTION_TYPE) === actionType;
	      }).to('state getter', this.getStateActuator(actionType)).map('@reducer_' + actionType + ' reduce', {
	        __result__: 'the previous state object'
	      }, {
	        state: 'the new state obejct'
	      }, function (s) {
	        var state = s.getResult();
	        var newState = reducer(state, s.payload);

	        return s.new({
	          state: newState
	        });
	      }).to(this._saveStatePipeline);
	    }
	  }, {
	    key: 'reduceAsync',
	    value: function reduceAsync(actionType, reducer) {
	      if (this._reduceCounter == 0) {
	        this._prepareStateChanged.to(this._errorhandler);
	        this._saveStatePipeline = this.setStateActuator(actionType);
	        this._saveStatePipeline.to(this._prepareStateChanged);
	      }

	      this._reduceCounter++;

	      this.input().when(actionType, function (s) {
	        return s.get(_Constants2.default.ACTION_TYPE) === actionType;
	      }).to('state getter', this.getStateActuator(actionType)).processor('@reducer_' + actionType + ' reduce', {
	        __result__: 'the previous state object'
	      }, {
	        state: 'the new state obejct'
	      }, function (s, done) {
	        var state = s.getResult();
	        reducer(state, s.payload, function (error, newState) {
	          if (error) {
	            return done(error);
	          }

	          done(null, s.new({
	            state: newState
	          }));
	        });
	      }).to('state setter', this.setStateActuator(actionType)).to(this._prepareStateChanged);
	    }
	  }], [{
	    key: 'getNextDefaultStoreName',
	    value: function getNextDefaultStoreName() {
	      StoreComponent.__COUNT__++;
	      return 'store_' + StoreComponent.__COUNT__;
	    }
	  }]);

	  return StoreComponent;
	}(_Component3.default);

	StoreComponent.__COUNT__ = 0;

	exports.default = StoreComponent;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	var _Constants = __webpack_require__(21);

	var _Constants2 = _interopRequireDefault(_Constants);

	var _Component2 = __webpack_require__(3);

	var _Component3 = _interopRequireDefault(_Component2);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _possibleConstructorReturn(self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var ViewComponent = function (_Component) {
	  _inherits(ViewComponent, _Component);

	  function ViewComponent() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _classCallCheck(this, ViewComponent);

	    var name = options.getName ? options.getName() : ViewComponent.getNextDefaultViewName();

	    var _this = _possibleConstructorReturn(this, (ViewComponent.__proto__ || Object.getPrototypeOf(ViewComponent)).call(this, name));

	    _this.options = options;

	    _this._renderer = options.render;
	    _this._stateUpdater = options.updateState;

	    _this._sensor = _this.ns().sensor(_this.name + ' sensor', function () {});
	    _this._sensor.dispatch = function (msg) {
	      return _this._sensor.send(msg, false);
	    };

	    _this._errorhandler = _this.ns().errors(function (s) {
	      console.error(s.error);
	    });
	    return _this;
	  }

	  _createClass(ViewComponent, [{
	    key: 'init',
	    value: function init() {
	      this._errorhandler.to(this.output());

	      // basic msg handling
	      this.input().when(_Constants2.default.MSG_RENDER, {
	        msgType: 'must be [render]'
	      }, function (s) {
	        return s.get(_Constants2.default.MSG_TYPE) === _Constants2.default.MSG_RENDER;
	      }).to(this.getRendererActuator()).to(this.getUpdateStateActuator()).to(this._errorhandler);

	      this.input().when(_Constants2.default.MSG_STATE_CHANGED, {
	        msgType: 'must be [state changed]',
	        state: 'the new state object'
	      }, function (s) {
	        return s.get(_Constants2.default.MSG_TYPE) === _Constants2.default.MSG_STATE_CHANGED;
	      }).to(this.getUpdateStateActuator()).to(this._errorhandler);
	    }
	  }, {
	    key: 'start',
	    value: function start() {}
	  }, {
	    key: 'sensor',
	    value: function sensor() {
	      return this._sensor;
	    }
	  }, {
	    key: 'render',
	    value: function render(state) {
	      if (!this._renderer) {
	        console.error('No renderer specified in view:', this.name);
	        return;
	      }
	      this._renderer.call(this, state);
	    }
	  }, {
	    key: 'updateState',
	    value: function updateState(state) {
	      if (!this._stateUpdater) {
	        console.error('No stateUpdater specified in view:', this.name);
	        return;
	      }
	      this._stateUpdater.call(this, state);
	    }
	  }, {
	    key: 'setRenderer',
	    value: function setRenderer(renderer) {
	      this._renderer = renderer;
	    }
	  }, {
	    key: 'setStateUpdater',
	    value: function setStateUpdater(updater) {
	      this._stateUpdater = updater;
	    }
	  }, {
	    key: 'getUpdateStateActuator',
	    value: function getUpdateStateActuator() {
	      var _this2 = this;

	      var actuator = this.ns().actuator('view state updator', function (s, done) {
	        try {
	          if (!_this2._stateUpdater) return done();
	          _this2.updateState(s.get(_Constants2.default.KEY_STATE));
	          done();
	        } catch (e) {
	          return done(e);
	        }
	      });

	      if (!this._stateUpdater) actuator.removeFeature('impl').addFeature('todo');else actuator.removeFeature('todo').addFeature('impl');

	      return actuator;
	    }
	  }, {
	    key: 'getRendererActuator',
	    value: function getRendererActuator() {
	      var _this3 = this;

	      var actuator = this.ns().actuator('renderer', function (s, done) {
	        try {
	          if (!_this3._renderer) return done();
	          _this3.render(s.get(_Constants2.default.KEY_STATE));
	          done();
	        } catch (e) {
	          return done(e);
	        }
	      });

	      if (!this._renderer) actuator.removeFeature('impl').addFeature('todo');else actuator.removeFeature('todo').addFeature('impl');

	      return actuator;
	    }
	  }], [{
	    key: 'getNextDefaultViewName',
	    value: function getNextDefaultViewName() {
	      ViewComponent.__COUNT__++;
	      return 'view_' + ViewComponent.__COUNT__;
	    }
	  }]);

	  return ViewComponent;
	}(_Component3.default);

	ViewComponent.__COUNT__ = 0;

	exports.default = ViewComponent;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {  /* globals require, module */

	  'use strict';

	  /**
	   * Module dependencies.
	   */

	  var pathtoRegexp = __webpack_require__(30);

	  /**
	   * Module exports.
	   */

	  module.exports = page;

	  /**
	   * Detect click event
	   */
	  var clickEvent = ('undefined' !== typeof document) && document.ontouchstart ? 'touchstart' : 'click';

	  /**
	   * To work properly with the URL
	   * history.location generated polyfill in https://github.com/devote/HTML5-History-API
	   */

	  var location = ('undefined' !== typeof window) && (window.history.location || window.location);

	  /**
	   * Perform initial dispatch.
	   */

	  var dispatch = true;


	  /**
	   * Decode URL components (query string, pathname, hash).
	   * Accommodates both regular percent encoding and x-www-form-urlencoded format.
	   */
	  var decodeURLComponents = true;

	  /**
	   * Base path.
	   */

	  var base = '';

	  /**
	   * Running flag.
	   */

	  var running;

	  /**
	   * HashBang option
	   */

	  var hashbang = false;

	  /**
	   * Previous context, for capturing
	   * page exit events.
	   */

	  var prevContext;

	  /**
	   * Register `path` with callback `fn()`,
	   * or route `path`, or redirection,
	   * or `page.start()`.
	   *
	   *   page(fn);
	   *   page('*', fn);
	   *   page('/user/:id', load, user);
	   *   page('/user/' + user.id, { some: 'thing' });
	   *   page('/user/' + user.id);
	   *   page('/from', '/to')
	   *   page();
	   *
	   * @param {string|!Function|!Object} path
	   * @param {Function=} fn
	   * @api public
	   */

	  function page(path, fn) {
	    // <callback>
	    if ('function' === typeof path) {
	      return page('*', path);
	    }

	    // route <path> to <callback ...>
	    if ('function' === typeof fn) {
	      var route = new Route(/** @type {string} */ (path));
	      for (var i = 1; i < arguments.length; ++i) {
	        page.callbacks.push(route.middleware(arguments[i]));
	      }
	      // show <path> with [state]
	    } else if ('string' === typeof path) {
	      page['string' === typeof fn ? 'redirect' : 'show'](path, fn);
	      // start [options]
	    } else {
	      page.start(path);
	    }
	  }

	  /**
	   * Callback functions.
	   */

	  page.callbacks = [];
	  page.exits = [];

	  /**
	   * Current path being processed
	   * @type {string}
	   */
	  page.current = '';

	  /**
	   * Number of pages navigated to.
	   * @type {number}
	   *
	   *     page.len == 0;
	   *     page('/login');
	   *     page.len == 1;
	   */

	  page.len = 0;

	  /**
	   * Get or set basepath to `path`.
	   *
	   * @param {string} path
	   * @api public
	   */

	  page.base = function(path) {
	    if (0 === arguments.length) return base;
	    base = path;
	  };

	  /**
	   * Bind with the given `options`.
	   *
	   * Options:
	   *
	   *    - `click` bind to click events [true]
	   *    - `popstate` bind to popstate [true]
	   *    - `dispatch` perform initial dispatch [true]
	   *
	   * @param {Object} options
	   * @api public
	   */

	  page.start = function(options) {
	    options = options || {};
	    if (running) return;
	    running = true;
	    if (false === options.dispatch) dispatch = false;
	    if (false === options.decodeURLComponents) decodeURLComponents = false;
	    if (false !== options.popstate) window.addEventListener('popstate', onpopstate, false);
	    if (false !== options.click) {
	      document.addEventListener(clickEvent, onclick, false);
	    }
	    if (true === options.hashbang) hashbang = true;
	    if (!dispatch) return;
	    var url = (hashbang && ~location.hash.indexOf('#!')) ? location.hash.substr(2) + location.search : location.pathname + location.search + location.hash;
	    page.replace(url, null, true, dispatch);
	  };

	  /**
	   * Unbind click and popstate event handlers.
	   *
	   * @api public
	   */

	  page.stop = function() {
	    if (!running) return;
	    page.current = '';
	    page.len = 0;
	    running = false;
	    document.removeEventListener(clickEvent, onclick, false);
	    window.removeEventListener('popstate', onpopstate, false);
	  };

	  /**
	   * Show `path` with optional `state` object.
	   *
	   * @param {string} path
	   * @param {Object=} state
	   * @param {boolean=} dispatch
	   * @param {boolean=} push
	   * @return {!Context}
	   * @api public
	   */

	  page.show = function(path, state, dispatch, push) {
	    var ctx = new Context(path, state);
	    page.current = ctx.path;
	    if (false !== dispatch) page.dispatch(ctx);
	    if (false !== ctx.handled && false !== push) ctx.pushState();
	    return ctx;
	  };

	  /**
	   * Goes back in the history
	   * Back should always let the current route push state and then go back.
	   *
	   * @param {string} path - fallback path to go back if no more history exists, if undefined defaults to page.base
	   * @param {Object=} state
	   * @api public
	   */

	  page.back = function(path, state) {
	    if (page.len > 0) {
	      // this may need more testing to see if all browsers
	      // wait for the next tick to go back in history
	      history.back();
	      page.len--;
	    } else if (path) {
	      setTimeout(function() {
	        page.show(path, state);
	      });
	    }else{
	      setTimeout(function() {
	        page.show(base, state);
	      });
	    }
	  };


	  /**
	   * Register route to redirect from one path to other
	   * or just redirect to another route
	   *
	   * @param {string} from - if param 'to' is undefined redirects to 'from'
	   * @param {string=} to
	   * @api public
	   */
	  page.redirect = function(from, to) {
	    // Define route from a path to another
	    if ('string' === typeof from && 'string' === typeof to) {
	      page(from, function(e) {
	        setTimeout(function() {
	          page.replace(/** @type {!string} */ (to));
	        }, 0);
	      });
	    }

	    // Wait for the push state and replace it with another
	    if ('string' === typeof from && 'undefined' === typeof to) {
	      setTimeout(function() {
	        page.replace(from);
	      }, 0);
	    }
	  };

	  /**
	   * Replace `path` with optional `state` object.
	   *
	   * @param {string} path
	   * @param {Object=} state
	   * @param {boolean=} init
	   * @param {boolean=} dispatch
	   * @return {!Context}
	   * @api public
	   */


	  page.replace = function(path, state, init, dispatch) {
	    var ctx = new Context(path, state);
	    page.current = ctx.path;
	    ctx.init = init;
	    ctx.save(); // save before dispatching, which may redirect
	    if (false !== dispatch) page.dispatch(ctx);
	    return ctx;
	  };

	  /**
	   * Dispatch the given `ctx`.
	   *
	   * @param {Context} ctx
	   * @api private
	   */
	  page.dispatch = function(ctx) {
	    var prev = prevContext,
	      i = 0,
	      j = 0;

	    prevContext = ctx;

	    function nextExit() {
	      var fn = page.exits[j++];
	      if (!fn) return nextEnter();
	      fn(prev, nextExit);
	    }

	    function nextEnter() {
	      var fn = page.callbacks[i++];

	      if (ctx.path !== page.current) {
	        ctx.handled = false;
	        return;
	      }
	      if (!fn) return unhandled(ctx);
	      fn(ctx, nextEnter);
	    }

	    if (prev) {
	      nextExit();
	    } else {
	      nextEnter();
	    }
	  };

	  /**
	   * Unhandled `ctx`. When it's not the initial
	   * popstate then redirect. If you wish to handle
	   * 404s on your own use `page('*', callback)`.
	   *
	   * @param {Context} ctx
	   * @api private
	   */
	  function unhandled(ctx) {
	    if (ctx.handled) return;
	    var current;

	    if (hashbang) {
	      current = base + location.hash.replace('#!', '');
	    } else {
	      current = location.pathname + location.search;
	    }

	    if (current === ctx.canonicalPath) return;
	    page.stop();
	    ctx.handled = false;
	    location.href = ctx.canonicalPath;
	  }

	  /**
	   * Register an exit route on `path` with
	   * callback `fn()`, which will be called
	   * on the previous context when a new
	   * page is visited.
	   */
	  page.exit = function(path, fn) {
	    if (typeof path === 'function') {
	      return page.exit('*', path);
	    }

	    var route = new Route(path);
	    for (var i = 1; i < arguments.length; ++i) {
	      page.exits.push(route.middleware(arguments[i]));
	    }
	  };

	  /**
	   * Remove URL encoding from the given `str`.
	   * Accommodates whitespace in both x-www-form-urlencoded
	   * and regular percent-encoded form.
	   *
	   * @param {string} val - URL component to decode
	   */
	  function decodeURLEncodedURIComponent(val) {
	    if (typeof val !== 'string') { return val; }
	    return decodeURLComponents ? decodeURIComponent(val.replace(/\+/g, ' ')) : val;
	  }

	  /**
	   * Initialize a new "request" `Context`
	   * with the given `path` and optional initial `state`.
	   *
	   * @constructor
	   * @param {string} path
	   * @param {Object=} state
	   * @api public
	   */

	  function Context(path, state) {
	    if ('/' === path[0] && 0 !== path.indexOf(base)) path = base + (hashbang ? '#!' : '') + path;
	    var i = path.indexOf('?');

	    this.canonicalPath = path;
	    this.path = path.replace(base, '') || '/';
	    if (hashbang) this.path = this.path.replace('#!', '') || '/';

	    this.title = document.title;
	    this.state = state || {};
	    this.state.path = path;
	    this.querystring = ~i ? decodeURLEncodedURIComponent(path.slice(i + 1)) : '';
	    this.pathname = decodeURLEncodedURIComponent(~i ? path.slice(0, i) : path);
	    this.params = {};

	    // fragment
	    this.hash = '';
	    if (!hashbang) {
	      if (!~this.path.indexOf('#')) return;
	      var parts = this.path.split('#');
	      this.path = parts[0];
	      this.hash = decodeURLEncodedURIComponent(parts[1]) || '';
	      this.querystring = this.querystring.split('#')[0];
	    }
	  }

	  /**
	   * Expose `Context`.
	   */

	  page.Context = Context;

	  /**
	   * Push state.
	   *
	   * @api private
	   */

	  Context.prototype.pushState = function() {
	    page.len++;
	    history.pushState(this.state, this.title, hashbang && this.path !== '/' ? '#!' + this.path : this.canonicalPath);
	  };

	  /**
	   * Save the context state.
	   *
	   * @api public
	   */

	  Context.prototype.save = function() {
	    history.replaceState(this.state, this.title, hashbang && this.path !== '/' ? '#!' + this.path : this.canonicalPath);
	  };

	  /**
	   * Initialize `Route` with the given HTTP `path`,
	   * and an array of `callbacks` and `options`.
	   *
	   * Options:
	   *
	   *   - `sensitive`    enable case-sensitive routes
	   *   - `strict`       enable strict matching for trailing slashes
	   *
	   * @constructor
	   * @param {string} path
	   * @param {Object=} options
	   * @api private
	   */

	  function Route(path, options) {
	    options = options || {};
	    this.path = (path === '*') ? '(.*)' : path;
	    this.method = 'GET';
	    this.regexp = pathtoRegexp(this.path,
	      this.keys = [],
	      options);
	  }

	  /**
	   * Expose `Route`.
	   */

	  page.Route = Route;

	  /**
	   * Return route middleware with
	   * the given callback `fn()`.
	   *
	   * @param {Function} fn
	   * @return {Function}
	   * @api public
	   */

	  Route.prototype.middleware = function(fn) {
	    var self = this;
	    return function(ctx, next) {
	      if (self.match(ctx.path, ctx.params)) return fn(ctx, next);
	      next();
	    };
	  };

	  /**
	   * Check if this route matches `path`, if so
	   * populate `params`.
	   *
	   * @param {string} path
	   * @param {Object} params
	   * @return {boolean}
	   * @api private
	   */

	  Route.prototype.match = function(path, params) {
	    var keys = this.keys,
	      qsIndex = path.indexOf('?'),
	      pathname = ~qsIndex ? path.slice(0, qsIndex) : path,
	      m = this.regexp.exec(decodeURIComponent(pathname));

	    if (!m) return false;

	    for (var i = 1, len = m.length; i < len; ++i) {
	      var key = keys[i - 1];
	      var val = decodeURLEncodedURIComponent(m[i]);
	      if (val !== undefined || !(hasOwnProperty.call(params, key.name))) {
	        params[key.name] = val;
	      }
	    }

	    return true;
	  };


	  /**
	   * Handle "populate" events.
	   */

	  var onpopstate = (function () {
	    var loaded = false;
	    if ('undefined' === typeof window) {
	      return;
	    }
	    if (document.readyState === 'complete') {
	      loaded = true;
	    } else {
	      window.addEventListener('load', function() {
	        setTimeout(function() {
	          loaded = true;
	        }, 0);
	      });
	    }
	    return function onpopstate(e) {
	      if (!loaded) return;
	      if (e.state) {
	        var path = e.state.path;
	        page.replace(path, e.state);
	      } else {
	        page.show(location.pathname + location.hash, undefined, undefined, false);
	      }
	    };
	  })();
	  /**
	   * Handle "click" events.
	   */

	  function onclick(e) {

	    if (1 !== which(e)) return;

	    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
	    if (e.defaultPrevented) return;



	    // ensure link
	    // use shadow dom when available
	    var el = e.path ? e.path[0] : e.target;
	    while (el && 'A' !== el.nodeName) el = el.parentNode;
	    if (!el || 'A' !== el.nodeName) return;



	    // Ignore if tag has
	    // 1. "download" attribute
	    // 2. rel="external" attribute
	    if (el.hasAttribute('download') || el.getAttribute('rel') === 'external') return;

	    // ensure non-hash for the same path
	    var link = el.getAttribute('href');
	    if (!hashbang && el.pathname === location.pathname && (el.hash || '#' === link)) return;



	    // Check for mailto: in the href
	    if (link && link.indexOf('mailto:') > -1) return;

	    // check target
	    if (el.target) return;

	    // x-origin
	    if (!sameOrigin(el.href)) return;



	    // rebuild path
	    var path = el.pathname + el.search + (el.hash || '');

	    // strip leading "/[drive letter]:" on NW.js on Windows
	    if (typeof process !== 'undefined' && path.match(/^\/[a-zA-Z]:\//)) {
	      path = path.replace(/^\/[a-zA-Z]:\//, '/');
	    }

	    // same page
	    var orig = path;

	    if (path.indexOf(base) === 0) {
	      path = path.substr(base.length);
	    }

	    if (hashbang) path = path.replace('#!', '');

	    if (base && orig === path) return;

	    e.preventDefault();
	    page.show(orig);
	  }

	  /**
	   * Event button.
	   */

	  function which(e) {
	    e = e || window.event;
	    return null === e.which ? e.button : e.which;
	  }

	  /**
	   * Check if `href` is the same origin.
	   */

	  function sameOrigin(href) {
	    var origin = location.protocol + '//' + location.hostname;
	    if (location.port) origin += ':' + location.port;
	    return (href && (0 === href.indexOf(origin)));
	  }

	  page.sameOrigin = sameOrigin;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var isarray = __webpack_require__(31)

	/**
	 * Expose `pathToRegexp`.
	 */
	module.exports = pathToRegexp
	module.exports.parse = parse
	module.exports.compile = compile
	module.exports.tokensToFunction = tokensToFunction
	module.exports.tokensToRegExp = tokensToRegExp

	/**
	 * The main path matching regexp utility.
	 *
	 * @type {RegExp}
	 */
	var PATH_REGEXP = new RegExp([
	  // Match escaped characters that would otherwise appear in future matches.
	  // This allows the user to escape special characters that won't transform.
	  '(\\\\.)',
	  // Match Express-style parameters and un-named parameters with a prefix
	  // and optional suffixes. Matches appear as:
	  //
	  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
	  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
	  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
	  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))'
	].join('|'), 'g')

	/**
	 * Parse a string for the raw tokens.
	 *
	 * @param  {String} str
	 * @return {Array}
	 */
	function parse (str) {
	  var tokens = []
	  var key = 0
	  var index = 0
	  var path = ''
	  var res

	  while ((res = PATH_REGEXP.exec(str)) != null) {
	    var m = res[0]
	    var escaped = res[1]
	    var offset = res.index
	    path += str.slice(index, offset)
	    index = offset + m.length

	    // Ignore already escaped sequences.
	    if (escaped) {
	      path += escaped[1]
	      continue
	    }

	    // Push the current path onto the tokens.
	    if (path) {
	      tokens.push(path)
	      path = ''
	    }

	    var prefix = res[2]
	    var name = res[3]
	    var capture = res[4]
	    var group = res[5]
	    var suffix = res[6]
	    var asterisk = res[7]

	    var repeat = suffix === '+' || suffix === '*'
	    var optional = suffix === '?' || suffix === '*'
	    var delimiter = prefix || '/'
	    var pattern = capture || group || (asterisk ? '.*' : '[^' + delimiter + ']+?')

	    tokens.push({
	      name: name || key++,
	      prefix: prefix || '',
	      delimiter: delimiter,
	      optional: optional,
	      repeat: repeat,
	      pattern: escapeGroup(pattern)
	    })
	  }

	  // Match any characters still remaining.
	  if (index < str.length) {
	    path += str.substr(index)
	  }

	  // If the path exists, push it onto the end.
	  if (path) {
	    tokens.push(path)
	  }

	  return tokens
	}

	/**
	 * Compile a string to a template function for the path.
	 *
	 * @param  {String}   str
	 * @return {Function}
	 */
	function compile (str) {
	  return tokensToFunction(parse(str))
	}

	/**
	 * Expose a method for transforming tokens into the path function.
	 */
	function tokensToFunction (tokens) {
	  // Compile all the tokens into regexps.
	  var matches = new Array(tokens.length)

	  // Compile all the patterns before compilation.
	  for (var i = 0; i < tokens.length; i++) {
	    if (typeof tokens[i] === 'object') {
	      matches[i] = new RegExp('^' + tokens[i].pattern + '$')
	    }
	  }

	  return function (obj) {
	    var path = ''
	    var data = obj || {}

	    for (var i = 0; i < tokens.length; i++) {
	      var token = tokens[i]

	      if (typeof token === 'string') {
	        path += token

	        continue
	      }

	      var value = data[token.name]
	      var segment

	      if (value == null) {
	        if (token.optional) {
	          continue
	        } else {
	          throw new TypeError('Expected "' + token.name + '" to be defined')
	        }
	      }

	      if (isarray(value)) {
	        if (!token.repeat) {
	          throw new TypeError('Expected "' + token.name + '" to not repeat, but received "' + value + '"')
	        }

	        if (value.length === 0) {
	          if (token.optional) {
	            continue
	          } else {
	            throw new TypeError('Expected "' + token.name + '" to not be empty')
	          }
	        }

	        for (var j = 0; j < value.length; j++) {
	          segment = encodeURIComponent(value[j])

	          if (!matches[i].test(segment)) {
	            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
	          }

	          path += (j === 0 ? token.prefix : token.delimiter) + segment
	        }

	        continue
	      }

	      segment = encodeURIComponent(value)

	      if (!matches[i].test(segment)) {
	        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
	      }

	      path += token.prefix + segment
	    }

	    return path
	  }
	}

	/**
	 * Escape a regular expression string.
	 *
	 * @param  {String} str
	 * @return {String}
	 */
	function escapeString (str) {
	  return str.replace(/([.+*?=^!:${}()[\]|\/])/g, '\\$1')
	}

	/**
	 * Escape the capturing group by escaping special characters and meaning.
	 *
	 * @param  {String} group
	 * @return {String}
	 */
	function escapeGroup (group) {
	  return group.replace(/([=!:$\/()])/g, '\\$1')
	}

	/**
	 * Attach the keys as a property of the regexp.
	 *
	 * @param  {RegExp} re
	 * @param  {Array}  keys
	 * @return {RegExp}
	 */
	function attachKeys (re, keys) {
	  re.keys = keys
	  return re
	}

	/**
	 * Get the flags for a regexp from the options.
	 *
	 * @param  {Object} options
	 * @return {String}
	 */
	function flags (options) {
	  return options.sensitive ? '' : 'i'
	}

	/**
	 * Pull out keys from a regexp.
	 *
	 * @param  {RegExp} path
	 * @param  {Array}  keys
	 * @return {RegExp}
	 */
	function regexpToRegexp (path, keys) {
	  // Use a negative lookahead to match only capturing groups.
	  var groups = path.source.match(/\((?!\?)/g)

	  if (groups) {
	    for (var i = 0; i < groups.length; i++) {
	      keys.push({
	        name: i,
	        prefix: null,
	        delimiter: null,
	        optional: false,
	        repeat: false,
	        pattern: null
	      })
	    }
	  }

	  return attachKeys(path, keys)
	}

	/**
	 * Transform an array into a regexp.
	 *
	 * @param  {Array}  path
	 * @param  {Array}  keys
	 * @param  {Object} options
	 * @return {RegExp}
	 */
	function arrayToRegexp (path, keys, options) {
	  var parts = []

	  for (var i = 0; i < path.length; i++) {
	    parts.push(pathToRegexp(path[i], keys, options).source)
	  }

	  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))

	  return attachKeys(regexp, keys)
	}

	/**
	 * Create a path regexp from string input.
	 *
	 * @param  {String} path
	 * @param  {Array}  keys
	 * @param  {Object} options
	 * @return {RegExp}
	 */
	function stringToRegexp (path, keys, options) {
	  var tokens = parse(path)
	  var re = tokensToRegExp(tokens, options)

	  // Attach keys back to the regexp.
	  for (var i = 0; i < tokens.length; i++) {
	    if (typeof tokens[i] !== 'string') {
	      keys.push(tokens[i])
	    }
	  }

	  return attachKeys(re, keys)
	}

	/**
	 * Expose a function for taking tokens and returning a RegExp.
	 *
	 * @param  {Array}  tokens
	 * @param  {Array}  keys
	 * @param  {Object} options
	 * @return {RegExp}
	 */
	function tokensToRegExp (tokens, options) {
	  options = options || {}

	  var strict = options.strict
	  var end = options.end !== false
	  var route = ''
	  var lastToken = tokens[tokens.length - 1]
	  var endsWithSlash = typeof lastToken === 'string' && /\/$/.test(lastToken)

	  // Iterate over the tokens and create our regexp string.
	  for (var i = 0; i < tokens.length; i++) {
	    var token = tokens[i]

	    if (typeof token === 'string') {
	      route += escapeString(token)
	    } else {
	      var prefix = escapeString(token.prefix)
	      var capture = token.pattern

	      if (token.repeat) {
	        capture += '(?:' + prefix + capture + ')*'
	      }

	      if (token.optional) {
	        if (prefix) {
	          capture = '(?:' + prefix + '(' + capture + '))?'
	        } else {
	          capture = '(' + capture + ')?'
	        }
	      } else {
	        capture = prefix + '(' + capture + ')'
	      }

	      route += capture
	    }
	  }

	  // In non-strict mode we allow a slash at the end of match. If the path to
	  // match already ends with a slash, we remove it for consistency. The slash
	  // is valid at the end of a path match, not in the middle. This is important
	  // in non-ending mode, where "/test/" shouldn't match "/test//route".
	  if (!strict) {
	    route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?'
	  }

	  if (end) {
	    route += '$'
	  } else {
	    // In non-ending mode, we need the capturing groups to match as much as
	    // possible by using a positive lookahead to the end or next path segment.
	    route += strict && endsWithSlash ? '' : '(?=\\/|$)'
	  }

	  return new RegExp('^' + route, flags(options))
	}

	/**
	 * Normalize the given path string, returning a regular expression.
	 *
	 * An empty array can be passed in for the keys, which will hold the
	 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
	 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
	 *
	 * @param  {(String|RegExp|Array)} path
	 * @param  {Array}                 [keys]
	 * @param  {Object}                [options]
	 * @return {RegExp}
	 */
	function pathToRegexp (path, keys, options) {
	  keys = keys || []

	  if (!isarray(keys)) {
	    options = keys
	    keys = []
	  } else if (!options) {
	    options = {}
	  }

	  if (path instanceof RegExp) {
	    return regexpToRegexp(path, keys, options)
	  }

	  if (isarray(path)) {
	    return arrayToRegexp(path, keys, options)
	  }

	  return stringToRegexp(path, keys, options)
	}


/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	var _get = function get(object, property, receiver) {
	  if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
	    var parent = Object.getPrototypeOf(object);if (parent === null) {
	      return undefined;
	    } else {
	      return get(parent, property, receiver);
	    }
	  } else if ("value" in desc) {
	    return desc.value;
	  } else {
	    var getter = desc.get;if (getter === undefined) {
	      return undefined;
	    }return getter.call(receiver);
	  }
	};

	var _Constants = __webpack_require__(21);

	var _Constants2 = _interopRequireDefault(_Constants);

	var _App = __webpack_require__(2);

	var _App2 = _interopRequireDefault(_App);

	var _MultiRouteViewComponent = __webpack_require__(33);

	var _MultiRouteViewComponent2 = _interopRequireDefault(_MultiRouteViewComponent);

	var _MiddlewareComponent = __webpack_require__(34);

	var _MiddlewareComponent2 = _interopRequireDefault(_MiddlewareComponent);

	var _ReduxSingleRouteApp2 = __webpack_require__(24);

	var _ReduxSingleRouteApp3 = _interopRequireDefault(_ReduxSingleRouteApp2);

	var _Router = __webpack_require__(35);

	var _Router2 = _interopRequireDefault(_Router);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _possibleConstructorReturn(self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var ReduxMultipleRoutesApp = function (_ReduxSingleRouteApp) {
	  _inherits(ReduxMultipleRoutesApp, _ReduxSingleRouteApp);

	  function ReduxMultipleRoutesApp() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _classCallCheck(this, ReduxMultipleRoutesApp);

	    var _this = _possibleConstructorReturn(this, (ReduxMultipleRoutesApp.__proto__ || Object.getPrototypeOf(ReduxMultipleRoutesApp)).call(this, options));

	    _this.view = new _MultiRouteViewComponent2.default({
	      getName: function getName() {
	        return 'view';
	      }
	    });

	    _this.middleware = new _MiddlewareComponent2.default();

	    _this.use('router', _Router2.default);
	    return _this;
	  }

	  _createClass(ReduxMultipleRoutesApp, [{
	    key: 'route',
	    value: function route(pattern, page) {
	      this.view.addPage(pattern, page);
	    }
	  }, {
	    key: 'setDefaultRoute',
	    value: function setDefaultRoute(route) {
	      this.view.setDefaultRoute(route);
	    }
	  }, {
	    key: 'setRootPath',
	    value: function setRootPath(root) {
	      this.view.setRootPath(root);
	    }
	  }, {
	    key: 'redirect',
	    value: function redirect(path) {
	      this.view.redirect(path);
	    }
	  }, {
	    key: 'use',
	    value: function use(name, middleware) {
	      this.middleware.use(name, middleware);
	      return this;
	    }

	    // ---------------------
	    // life cycle

	  }, {
	    key: 'initComponents',
	    value: function initComponents() {
	      this.addComponent(this.view);
	      this.addComponent(this.store);
	      this.addComponent(this.middleware);
	      //this.addComponent(this.router);

	      _get(ReduxMultipleRoutesApp.prototype.__proto__ || Object.getPrototypeOf(ReduxMultipleRoutesApp.prototype), 'initComponents', this).call(this);
	    }
	  }, {
	    key: 'connectComponents',
	    value: function connectComponents() {
	      this.store.output().to(this.middleware.input());

	      this.middleware.output().to(this.view.input());

	      this.view.sensor().to(this.store.input());
	      this.getAppSensor().to(this.store.input());
	    }
	  }, {
	    key: 'startComponents',
	    value: function startComponents() {
	      _get(ReduxMultipleRoutesApp.prototype.__proto__ || Object.getPrototypeOf(ReduxMultipleRoutesApp.prototype), 'startComponents', this).call(this);
	    }
	  }]);

	  return ReduxMultipleRoutesApp;
	}(_ReduxSingleRouteApp3.default);

	exports.default = ReduxMultipleRoutesApp;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	var _collar = __webpack_require__(4);

	var _collar2 = _interopRequireDefault(_collar);

	var _Constants = __webpack_require__(21);

	var _Constants2 = _interopRequireDefault(_Constants);

	var _Component2 = __webpack_require__(3);

	var _Component3 = _interopRequireDefault(_Component2);

	var _page2 = __webpack_require__(29);

	var _page3 = _interopRequireDefault(_page2);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _possibleConstructorReturn(self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var MultiRouteViewComponent = function (_Component) {
	  _inherits(MultiRouteViewComponent, _Component);

	  function MultiRouteViewComponent() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _classCallCheck(this, MultiRouteViewComponent);

	    var name = options.getName ? options.getName() : ViewComponent.getNextDefaultViewName();

	    var _this = _possibleConstructorReturn(this, (MultiRouteViewComponent.__proto__ || Object.getPrototypeOf(MultiRouteViewComponent)).call(this, name));

	    _this.options = options;

	    _this._pages = new Map();
	    _this._routeList = [];

	    _this._defaultRoute = '/';

	    _this._sensor = _this.ns().sensor(_this.name + ' sensor', function () {});

	    _this._routeDispatcher = _this.ns().do('match route', function (s) {
	      var state = s.get(_Constants2.default.KEY_STATE);
	      var url = state[_Constants2.default.STATE_SYS][_Constants2.default.STATE_URL];

	      var redirectRoute = _this._defaultRoute;
	      if (url) {
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	          for (var _iterator = _this._routeList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var routeObj = _step.value;

	            if (routeObj.matcher.match(url, {})) {
	              redirectRoute = routeObj.route;
	              break;
	            }
	          }
	        } catch (err) {
	          _didIteratorError = true;
	          _iteratorError = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	              _iterator.return();
	            }
	          } finally {
	            if (_didIteratorError) {
	              throw _iteratorError;
	            }
	          }
	        }
	      }

	      if (s.get(_Constants2.default.MSG_TYPE) === _Constants2.default.MSG_RENDER) {
	        // only redirect the view when 'render msg' is received
	        _page3.default.redirect(redirectRoute);
	      }
	      return redirectRoute;
	    });
	    return _this;
	  }

	  _createClass(MultiRouteViewComponent, [{
	    key: 'init',
	    value: function init() {
	      var _this2 = this;

	      this.input().to(this._routeDispatcher);

	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        var _loop = function _loop() {
	          var route = _step2.value;

	          var _page = _this2._pages.get(route);

	          var pageName = _this2.name + '.' + route;
	          var ns = _collar2.default.ns(pageName, {
	            arch: pageName
	          });
	          var pageInput = ns.input('page input');
	          var pageOutput = ns.output('page output');

	          var updateStatePipeline = ns.actuator('page state updator', function (s, done) {
	            try {
	              _this2._pages.get(route).updateState(s.get(_Constants2.default.KEY_STATE));
	              done();
	            } catch (e) {
	              return done(e);
	            }
	          });

	          updateStatePipeline.errors(function (s) {
	            console.error(s.error);
	          }).to(pageOutput).to(_this2.output());

	          pageInput.when(_Constants2.default.MSG_RENDER, {
	            msgType: 'must be [render]'
	          }, function (s) {
	            return s.get(_Constants2.default.MSG_TYPE) === _Constants2.default.MSG_RENDER;
	          }).do('renderer', function (s) {
	            var state = s.get(_Constants2.default.KEY_STATE);
	            _this2._pages.get(route).render(state);
	          }).to(updateStatePipeline);

	          pageInput.when(_Constants2.default.MSG_STATE_CHANGED, {
	            msgType: 'must be [state changed]',
	            state: 'the new state object'
	          }, function (s) {
	            return s.get(_Constants2.default.MSG_TYPE) === _Constants2.default.MSG_STATE_CHANGED;
	          }).to(updateStatePipeline);

	          _this2._routeDispatcher.when(route, function (s) {
	            return s.getResult() === route;
	          }).to(pageInput);
	        };

	        for (var _iterator2 = this._pages.keys()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          _loop();
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'addPage',
	    value: function addPage(route, pageView) {
	      this._pages.set(route, pageView);
	      this._routeList.push({
	        route: route,
	        matcher: new _page3.default.Route(route)
	      });
	    }
	  }, {
	    key: 'setDefaultRoute',
	    value: function setDefaultRoute(route) {
	      this._defaultRoute = route;
	    }
	  }, {
	    key: 'setRootPath',
	    value: function setRootPath(base) {
	      _page3.default.base(base);
	    }
	  }, {
	    key: 'redirect',
	    value: function redirect(path) {
	      this._sensor.send({
	        actionType: _Constants2.default.ACTION_RENDER,
	        url: path
	      }, false);
	    }
	  }, {
	    key: 'start',
	    value: function start() {}
	  }, {
	    key: 'sensor',
	    value: function sensor() {
	      return this._sensor;
	    }
	  }], [{
	    key: 'getNextDefaultViewName',
	    value: function getNextDefaultViewName() {
	      MultiRouteViewComponent.__COUNT__++;
	      return 'view_' + ViewComponent.__COUNT__;
	    }
	  }]);

	  return MultiRouteViewComponent;
	}(_Component3.default);

	MultiRouteViewComponent.__COUNT__ = 0;

	exports.default = MultiRouteViewComponent;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	var _Constants = __webpack_require__(21);

	var _Constants2 = _interopRequireDefault(_Constants);

	var _Component2 = __webpack_require__(3);

	var _Component3 = _interopRequireDefault(_Component2);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _possibleConstructorReturn(self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var MiddlewareComponent = function (_Component) {
	  _inherits(MiddlewareComponent, _Component);

	  function MiddlewareComponent() {
	    _classCallCheck(this, MiddlewareComponent);

	    var _this = _possibleConstructorReturn(this, (MiddlewareComponent.__proto__ || Object.getPrototypeOf(MiddlewareComponent)).call(this, 'middlewares'));

	    _this._middlewares = [];
	    return _this;
	  }

	  _createClass(MiddlewareComponent, [{
	    key: 'use',
	    value: function use(name, fn, async) {
	      this._middlewares.push({
	        name: name,
	        fn: fn,
	        async: async
	      });
	      return this;
	    }
	  }, {
	    key: 'init',
	    value: function init() {
	      var currentNode = this.input();
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        var _loop = function _loop() {
	          var middleware = _step.value;

	          if (middleware.async) {
	            currentNode = currentNode.processor(middleware.name, function (s, done) {
	              try {
	                middleware.fn(s.payload, function (newPayload) {
	                  done(null, s.new(newPayload));
	                });
	              } catch (e) {
	                done(e);
	              }
	            });
	          } else {
	            currentNode = currentNode.map(middleware.name, function (s) {
	              var newPayload = middleware.fn(s.payload);
	              return s.new(newPayload);
	            });
	          }
	        };

	        for (var _iterator = this._middlewares[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          _loop();
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      currentNode.errors(function (s) {
	        console.error(s.error);
	      }).to(this.output());
	    }
	  }, {
	    key: 'start',
	    value: function start() {}
	  }]);

	  return MiddlewareComponent;
	}(_Component3.default);

	exports.default = MiddlewareComponent;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = router;

	var _Constants = __webpack_require__(21);

	var _Constants2 = _interopRequireDefault(_Constants);

	var _urlParse = __webpack_require__(36);

	var _urlParse2 = _interopRequireDefault(_urlParse);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	var currentUrl = null;

	function router(msg) {
	  var msgType = msg[_Constants2.default.MSG_TYPE];
	  var state = msg[_Constants2.default.KEY_STATE];
	  var stateUrl = state[_Constants2.default.STATE_SYS][_Constants2.default.STATE_URL];

	  if (msgType === _Constants2.default.MSG_RENDER) {
	    // change the current url when received render msg
	    currentUrl = stateUrl ? stateUrl : currentUrl;
	  }

	  var redirect = false;
	  if (stateUrl != currentUrl) {
	    currentUrl = stateUrl;
	    redirect = true;
	  }

	  var parsedUrl = (0, _urlParse2.default)(currentUrl, true);
	  state[_Constants2.default.STATE_SYS][_Constants2.default.STATE_PARSED_URL] = parsedUrl;

	  if (redirect) msg[_Constants2.default.MSG_TYPE] = _Constants2.default.MSG_RENDER;
	  msg[_Constants2.default.KEY_STATE] = state;

	  return msg;
	}

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var required = __webpack_require__(37)
	  , lolcation = __webpack_require__(38)
	  , qs = __webpack_require__(39)
	  , protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i;

	/**
	 * These are the parse rules for the URL parser, it informs the parser
	 * about:
	 *
	 * 0. The char it Needs to parse, if it's a string it should be done using
	 *    indexOf, RegExp using exec and NaN means set as current value.
	 * 1. The property we should set when parsing this value.
	 * 2. Indication if it's backwards or forward parsing, when set as number it's
	 *    the value of extra chars that should be split off.
	 * 3. Inherit from location if non existing in the parser.
	 * 4. `toLowerCase` the resulting value.
	 */
	var rules = [
	  ['#', 'hash'],                        // Extract from the back.
	  ['?', 'query'],                       // Extract from the back.
	  ['/', 'pathname'],                    // Extract from the back.
	  ['@', 'auth', 1],                     // Extract from the front.
	  [NaN, 'host', undefined, 1, 1],       // Set left over value.
	  [/:(\d+)$/, 'port', undefined, 1],    // RegExp the back.
	  [NaN, 'hostname', undefined, 1, 1]    // Set left over.
	];

	/**
	 * @typedef ProtocolExtract
	 * @type Object
	 * @property {String} protocol Protocol matched in the URL, in lowercase.
	 * @property {Boolean} slashes `true` if protocol is followed by "//", else `false`.
	 * @property {String} rest Rest of the URL that is not part of the protocol.
	 */

	/**
	 * Extract protocol information from a URL with/without double slash ("//").
	 *
	 * @param {String} address URL we want to extract from.
	 * @return {ProtocolExtract} Extracted information.
	 * @api private
	 */
	function extractProtocol(address) {
	  var match = protocolre.exec(address);

	  return {
	    protocol: match[1] ? match[1].toLowerCase() : '',
	    slashes: !!match[2],
	    rest: match[3]
	  };
	}

	/**
	 * Resolve a relative URL pathname against a base URL pathname.
	 *
	 * @param {String} relative Pathname of the relative URL.
	 * @param {String} base Pathname of the base URL.
	 * @return {String} Resolved pathname.
	 * @api private
	 */
	function resolve(relative, base) {
	  var path = (base || '/').split('/').slice(0, -1).concat(relative.split('/'))
	    , i = path.length
	    , last = path[i - 1]
	    , unshift = false
	    , up = 0;

	  while (i--) {
	    if (path[i] === '.') {
	      path.splice(i, 1);
	    } else if (path[i] === '..') {
	      path.splice(i, 1);
	      up++;
	    } else if (up) {
	      if (i === 0) unshift = true;
	      path.splice(i, 1);
	      up--;
	    }
	  }

	  if (unshift) path.unshift('');
	  if (last === '.' || last === '..') path.push('');

	  return path.join('/');
	}

	/**
	 * The actual URL instance. Instead of returning an object we've opted-in to
	 * create an actual constructor as it's much more memory efficient and
	 * faster and it pleases my OCD.
	 *
	 * @constructor
	 * @param {String} address URL we want to parse.
	 * @param {Object|String} location Location defaults for relative paths.
	 * @param {Boolean|Function} parser Parser for the query string.
	 * @api public
	 */
	function URL(address, location, parser) {
	  if (!(this instanceof URL)) {
	    return new URL(address, location, parser);
	  }

	  var relative, extracted, parse, instruction, index, key
	    , instructions = rules.slice()
	    , type = typeof location
	    , url = this
	    , i = 0;

	  //
	  // The following if statements allows this module two have compatibility with
	  // 2 different API:
	  //
	  // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
	  //    where the boolean indicates that the query string should also be parsed.
	  //
	  // 2. The `URL` interface of the browser which accepts a URL, object as
	  //    arguments. The supplied object will be used as default values / fall-back
	  //    for relative paths.
	  //
	  if ('object' !== type && 'string' !== type) {
	    parser = location;
	    location = null;
	  }

	  if (parser && 'function' !== typeof parser) parser = qs.parse;

	  location = lolcation(location);

	  //
	  // Extract protocol information before running the instructions.
	  //
	  extracted = extractProtocol(address || '');
	  relative = !extracted.protocol && !extracted.slashes;
	  url.slashes = extracted.slashes || relative && location.slashes;
	  url.protocol = extracted.protocol || location.protocol || '';
	  address = extracted.rest;

	  //
	  // When the authority component is absent the URL starts with a path
	  // component.
	  //
	  if (!extracted.slashes) instructions[2] = [/(.*)/, 'pathname'];

	  for (; i < instructions.length; i++) {
	    instruction = instructions[i];
	    parse = instruction[0];
	    key = instruction[1];

	    if (parse !== parse) {
	      url[key] = address;
	    } else if ('string' === typeof parse) {
	      if (~(index = address.indexOf(parse))) {
	        if ('number' === typeof instruction[2]) {
	          url[key] = address.slice(0, index);
	          address = address.slice(index + instruction[2]);
	        } else {
	          url[key] = address.slice(index);
	          address = address.slice(0, index);
	        }
	      }
	    } else if (index = parse.exec(address)) {
	      url[key] = index[1];
	      address = address.slice(0, index.index);
	    }

	    url[key] = url[key] || (
	      relative && instruction[3] ? location[key] || '' : ''
	    );

	    //
	    // Hostname, host and protocol should be lowercased so they can be used to
	    // create a proper `origin`.
	    //
	    if (instruction[4]) url[key] = url[key].toLowerCase();
	  }

	  //
	  // Also parse the supplied query string in to an object. If we're supplied
	  // with a custom parser as function use that instead of the default build-in
	  // parser.
	  //
	  if (parser) url.query = parser(url.query);

	  //
	  // If the URL is relative, resolve the pathname against the base URL.
	  //
	  if (
	      relative
	    && location.slashes
	    && url.pathname.charAt(0) !== '/'
	    && (url.pathname !== '' || location.pathname !== '')
	  ) {
	    url.pathname = resolve(url.pathname, location.pathname);
	  }

	  //
	  // We should not add port numbers if they are already the default port number
	  // for a given protocol. As the host also contains the port number we're going
	  // override it with the hostname which contains no port number.
	  //
	  if (!required(url.port, url.protocol)) {
	    url.host = url.hostname;
	    url.port = '';
	  }

	  //
	  // Parse down the `auth` for the username and password.
	  //
	  url.username = url.password = '';
	  if (url.auth) {
	    instruction = url.auth.split(':');
	    url.username = instruction[0] || '';
	    url.password = instruction[1] || '';
	  }

	  url.origin = url.protocol && url.host && url.protocol !== 'file:'
	    ? url.protocol +'//'+ url.host
	    : 'null';

	  //
	  // The href is just the compiled result.
	  //
	  url.href = url.toString();
	}

	/**
	 * This is convenience method for changing properties in the URL instance to
	 * insure that they all propagate correctly.
	 *
	 * @param {String} part          Property we need to adjust.
	 * @param {Mixed} value          The newly assigned value.
	 * @param {Boolean|Function} fn  When setting the query, it will be the function
	 *                               used to parse the query.
	 *                               When setting the protocol, double slash will be
	 *                               removed from the final url if it is true.
	 * @returns {URL}
	 * @api public
	 */
	URL.prototype.set = function set(part, value, fn) {
	  var url = this;

	  switch (part) {
	    case 'query':
	      if ('string' === typeof value && value.length) {
	        value = (fn || qs.parse)(value);
	      }

	      url[part] = value;
	      break;

	    case 'port':
	      url[part] = value;

	      if (!required(value, url.protocol)) {
	        url.host = url.hostname;
	        url[part] = '';
	      } else if (value) {
	        url.host = url.hostname +':'+ value;
	      }

	      break;

	    case 'hostname':
	      url[part] = value;

	      if (url.port) value += ':'+ url.port;
	      url.host = value;
	      break;

	    case 'host':
	      url[part] = value;

	      if (/:\d+$/.test(value)) {
	        value = value.split(':');
	        url.port = value.pop();
	        url.hostname = value.join(':');
	      } else {
	        url.hostname = value;
	        url.port = '';
	      }

	      break;

	    case 'protocol':
	      url.protocol = value.toLowerCase();
	      url.slashes = !fn;
	      break;

	    case 'pathname':
	      url.pathname = value.length && value.charAt(0) !== '/' ? '/' + value : value;

	      break;

	    default:
	      url[part] = value;
	  }

	  for (var i = 0; i < rules.length; i++) {
	    var ins = rules[i];

	    if (ins[4]) url[ins[1]] = url[ins[1]].toLowerCase();
	  }

	  url.origin = url.protocol && url.host && url.protocol !== 'file:'
	    ? url.protocol +'//'+ url.host
	    : 'null';

	  url.href = url.toString();

	  return url;
	};

	/**
	 * Transform the properties back in to a valid and full URL string.
	 *
	 * @param {Function} stringify Optional query stringify function.
	 * @returns {String}
	 * @api public
	 */
	URL.prototype.toString = function toString(stringify) {
	  if (!stringify || 'function' !== typeof stringify) stringify = qs.stringify;

	  var query
	    , url = this
	    , protocol = url.protocol;

	  if (protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';

	  var result = protocol + (url.slashes ? '//' : '');

	  if (url.username) {
	    result += url.username;
	    if (url.password) result += ':'+ url.password;
	    result += '@';
	  }

	  result += url.host + url.pathname;

	  query = 'object' === typeof url.query ? stringify(url.query) : url.query;
	  if (query) result += '?' !== query.charAt(0) ? '?'+ query : query;

	  if (url.hash) result += url.hash;

	  return result;
	};

	//
	// Expose the URL parser and some additional properties that might be useful for
	// others or testing.
	//
	URL.extractProtocol = extractProtocol;
	URL.location = lolcation;
	URL.qs = qs;

	module.exports = URL;


/***/ },
/* 37 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Check if we're required to add a port number.
	 *
	 * @see https://url.spec.whatwg.org/#default-port
	 * @param {Number|String} port Port number we need to check
	 * @param {String} protocol Protocol we need to check against.
	 * @returns {Boolean} Is it a default port for the given protocol
	 * @api private
	 */
	module.exports = function required(port, protocol) {
	  protocol = protocol.split(':')[0];
	  port = +port;

	  if (!port) return false;

	  switch (protocol) {
	    case 'http':
	    case 'ws':
	    return port !== 80;

	    case 'https':
	    case 'wss':
	    return port !== 443;

	    case 'ftp':
	    return port !== 21;

	    case 'gopher':
	    return port !== 70;

	    case 'file':
	    return false;
	  }

	  return port !== 0;
	};


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;

	/**
	 * These properties should not be copied or inherited from. This is only needed
	 * for all non blob URL's as a blob URL does not include a hash, only the
	 * origin.
	 *
	 * @type {Object}
	 * @private
	 */
	var ignore = { hash: 1, query: 1 }
	  , URL;

	/**
	 * The location object differs when your code is loaded through a normal page,
	 * Worker or through a worker using a blob. And with the blobble begins the
	 * trouble as the location object will contain the URL of the blob, not the
	 * location of the page where our code is loaded in. The actual origin is
	 * encoded in the `pathname` so we can thankfully generate a good "default"
	 * location from it so we can generate proper relative URL's again.
	 *
	 * @param {Object|String} loc Optional default location object.
	 * @returns {Object} lolcation object.
	 * @api public
	 */
	module.exports = function lolcation(loc) {
	  loc = loc || global.location || {};
	  URL = URL || __webpack_require__(36);

	  var finaldestination = {}
	    , type = typeof loc
	    , key;

	  if ('blob:' === loc.protocol) {
	    finaldestination = new URL(unescape(loc.pathname), {});
	  } else if ('string' === type) {
	    finaldestination = new URL(loc, {});
	    for (key in ignore) delete finaldestination[key];
	  } else if ('object' === type) {
	    for (key in loc) {
	      if (key in ignore) continue;
	      finaldestination[key] = loc[key];
	    }

	    if (finaldestination.slashes === undefined) {
	      finaldestination.slashes = slashes.test(loc.href);
	    }
	  }

	  return finaldestination;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 39 */
/***/ function(module, exports) {

	'use strict';

	var has = Object.prototype.hasOwnProperty;

	/**
	 * Simple query string parser.
	 *
	 * @param {String} query The query string that needs to be parsed.
	 * @returns {Object}
	 * @api public
	 */
	function querystring(query) {
	  var parser = /([^=?&]+)=?([^&]*)/g
	    , result = {}
	    , part;

	  //
	  // Little nifty parsing hack, leverage the fact that RegExp.exec increments
	  // the lastIndex property so we can continue executing this loop until we've
	  // parsed all results.
	  //
	  for (;
	    part = parser.exec(query);
	    result[decodeURIComponent(part[1])] = decodeURIComponent(part[2])
	  );

	  return result;
	}

	/**
	 * Transform a query string to an object.
	 *
	 * @param {Object} obj Object that should be transformed.
	 * @param {String} prefix Optional prefix.
	 * @returns {String}
	 * @api public
	 */
	function querystringify(obj, prefix) {
	  prefix = prefix || '';

	  var pairs = [];

	  //
	  // Optionally prefix with a '?' if needed
	  //
	  if ('string' !== typeof prefix) prefix = '?';

	  for (var key in obj) {
	    if (has.call(obj, key)) {
	      pairs.push(encodeURIComponent(key) +'='+ encodeURIComponent(obj[key]));
	    }
	  }

	  return pairs.length ? prefix + pairs.join('&') : '';
	}

	//
	// Expose the module.
	//
	exports.stringify = querystringify;
	exports.parse = querystring;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }return target;
	};

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	var _react = __webpack_require__(25);

	var _react2 = _interopRequireDefault(_react);

	var _page = __webpack_require__(29);

	var _page2 = _interopRequireDefault(_page);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _possibleConstructorReturn(self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var Link = function (_React$Component) {
	  _inherits(Link, _React$Component);

	  function Link() {
	    _classCallCheck(this, Link);

	    return _possibleConstructorReturn(this, (Link.__proto__ || Object.getPrototypeOf(Link)).apply(this, arguments));
	  }

	  _createClass(Link, [{
	    key: 'handleClick',
	    value: function handleClick(event) {
	      if (this.props.onClick) {
	        this.props.onClick(event);
	      }

	      if (event.button !== 0 /* left click */) {
	          return;
	        }

	      if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) {
	        return;
	      }

	      if (event.defaultPrevented === true) {
	        return;
	      }

	      event.preventDefault();

	      if (this.props.to) {
	        _page2.default.redirect(this.props.to);
	        this.props.sensor.send({
	          actionType: 'RENDER',
	          url: this.props.to
	        });
	      } else {
	        console.log(event.currentTarget.pathname, event.currentTarget.search);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var props = this.props.props;

	      return _react2.default.createElement('a', _extends({ href: this.props.to }, props, { onClick: this.handleClick.bind(this) }), this.props.children);
	    }
	  }]);

	  return Link;
	}(_react2.default.Component);

	exports.default = Link;

/***/ }
/******/ ]);