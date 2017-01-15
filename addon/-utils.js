import computed from 'ember-macro-helpers/computed';

export function resolveKeys(keys, callback) {
  return computed(...keys, callback).readOnly();
}

export function reduceKeys(keys, func) {
  return resolveKeys(keys, (...values) => {
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
  return resolveKeys(keys, (...values) => {
    return checkArgs(values, () => {
      return values[0][funcStr](...values.slice(1));
    });
  });
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
