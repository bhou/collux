import collar from 'collar.js';

export default function createComponent(name, namespace, metadata = {}) {
  metadata.arch = name;
  if (!namespace) namespace = name;
  let ns = collar.ns(namespace, metadata);
  let input = ns.input(name + ' input');
  let output = ns.output(name + ' output');
  return {
    ns,
    input,
    output,
    handleMsg: collar.toNode(input, output)
  }
}
