import EmberObject from 'ember-object';
import { resolveKeys } from './utils';

export default function(...args) {
  let hashKeys = [];
  let hashValues = [];

  args.forEach(arg => {
    if (typeof arg === 'string') {
      hashKeys.push(arg);
      hashValues.push(arg);
    } else {
      let props = Object.getOwnPropertyNames(arg);
      hashKeys = hashKeys.concat(props);
      hashValues = hashValues.concat(props.map(prop => arg[prop]));
    }
  });

  return resolveKeys(hashValues, newValues => {
    return EmberObject.create(newValues.reduce((newHash, val, i) => {
      newHash[hashKeys[i]] = val;
      return newHash;
    }, {}));
  });
}
