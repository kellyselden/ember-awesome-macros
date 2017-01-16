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

export function checkArgs(callback) {
  return (...values) => {
    for (let i = 0; i < values.length; i++) {
      if (values[i] === undefined) {
        return undefined;
      }
    }
    return callback(...values);
  };
}

export function safelyCreateComputed(funcStr) {
  return resolveKeys(checkArgs((source, ...args) => {
    return source[funcStr](...args);
  }));
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
