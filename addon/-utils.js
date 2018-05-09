import {
  curriedComputed,
  lazyCurriedComputed
} from 'ember-macro-helpers';

export function reduceKeys(func) {
  return curriedComputed((...values) => {
    if (values.length === 0) {
      return 0;
    }
    return values.reduce((total, next, i) => {
      if (Array.isArray(next)) {
        if (next.length === 0) {
          next = 0;
        } else {
          next = next.reduce(func);
        }
      }
      if (i === 0) {
        return next;
      }
      return func(total, next);
    }, null);
  });
}

export function reduceKeys2(callback) {
  return lazyCurriedComputed((get, ...keys) => {
    let last;
    for (let i = 0; i < keys.length; i++) {
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

import { deprecateFunc } from '@ember/application/deprecations';

const projectName = 'ember-awesome-macros';
const until = 'sometime before 1.0';

export function deprecate(newFunc, oldKey, newKey) {
  return deprecateFunc(`${oldKey} is deprecated, please use ${newKey}`, {
    id: `${projectName}.${oldKey}`,
    until
  }, newFunc);
}
