import computed from 'ember-macro-helpers/computed';

export function resolveKeys(callback) {
  return function() {
    return computed(...arguments, callback).readOnly();
  };
}

export function reduceKeys(func) {
  return resolveKeys((...values) => {
    return values.reduce(func);
  });
}

export function checkArgs(values, callback) {
  for (let i = 0; i < values.length; i++) {
    if (values[i] === undefined) {
      return undefined;
    }
  }
  return callback();
}

export function safelyCreateComputed(keys, funcStr) {
  return resolveKeys((...values) => {
    return checkArgs(values, () => {
      return values[0][funcStr](...values.slice(1));
    });
  })(...keys);
}

import { deprecateFunc } from 'ember-deprecations';

const projectName = 'ember-awesome-macros';
const until = 'sometime before 1.0';

export function deprecate(newFunc, oldKey, newKey) {
  return deprecateFunc(`${oldKey} is deprecated, please use ${newKey}`, {
    id: `${projectName}.${oldKey}`,
    until
  }, newFunc);
}
