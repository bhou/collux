import collar from 'collar.js';

class Component {
  constructor(name, namespace, metadata = {}) {
    this.name = name || Component.getDefaultComponentName();
    this.namespace = namespace || this.name;
    this.metadata = metadata;

    if (!this.metadata.arch) this.metadata.arch = name;
    
    this._ns = collar.ns(this.namespace, this.metadata);
    this._input = this._ns.input(this.name + '.input');
    this._output = this._ns.output(this.name + '.output');
    this._handleMsg = collar.toNode(this._input, this._output);
  }

  ns() {
    return this._ns;
  }

  input() {
    return this._input;
  }

  output() {
    return this._output;
  }

  handleMsg(msg, done) {
    return this._handleMsg(msg, done);
  }

  // ------------------
  // life cycle related
  init() {}
  start() {}

  static getDefaultComponentName() {
    Component.__COUNT__++;
    return `component_${Component.__COUNT__}`;
  }
}

Component.__COUNT__ = 0;

export default Component;
