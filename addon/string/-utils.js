import curriedComputed from 'ember-macro-helpers/curried-computed';
import lazyCurriedComputed from 'ember-macro-helpers/lazy-curried-computed';

export function normalizeString(func) {
  return curriedComputed(val => {
    if (!val) {
      return val;
    }

    return func(val);
  });
}

export function normalizeString2(func, defaultValue = () => {}) {
  return lazyCurriedComputed((get, stringKey, ...keys) => {
    let stringVal = get(stringKey);
    if (stringVal === undefined) {
      return defaultValue();
    }

    return stringVal[func](...keys.map(get));
  });
}
