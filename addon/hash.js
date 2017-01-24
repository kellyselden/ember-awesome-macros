import EmberObject from 'ember-object';
import curriedComputed from 'ember-macro-helpers/curried-computed';

export function deconstructArgs(args) {
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

  return {
    hashKeys,
    hashValues
  };
}

export function reduceValues(hashKeys, newValues) {
  return newValues.reduce((newHash, val, i) => {
    newHash[hashKeys[i]] = val;
    return newHash;
  }, {});
}

export default function(...args) {
  let { hashKeys, hashValues } = deconstructArgs(args);
  return curriedComputed((...newValues) => {
    let newHash = reduceValues(hashKeys, newValues);
    return EmberObject.create(newHash);
  })(...hashValues);
}
