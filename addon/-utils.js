import curriedComputed from 'ember-macro-helpers/curried-computed';
import lazyCurriedComputed from 'ember-macro-helpers/lazy-curried-computed';

export function reduceKeys(func) {
  return curriedComputed((...values) => {
    return values.reduce(func);
  });
}

export function reduceKeys2(callback) {
  return lazyCurriedComputed((get, ...keys) => {
    let last;
    for (let i in keys) {
      last = get(keys[i]);
      if (callback(last)) {
        return last;
      }
    }
    return last;
  });
}

export function checkArgs(callback) {
  return (...values) => {
    for (let i = 0; i < values.length; i++) {
      if (values[i] === undefined) {
        return;
      }
    }
    return callback(...values);
  };
}

export function safelyCreateComputed(funcStr) {
  return curriedComputed(checkArgs((source, ...args) => {
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
