import architectures from './archs';

export default function createApp(archName, ...args) {
  let appBuilder = architectures.get(archName);

  return appBuilder(...args);
}
