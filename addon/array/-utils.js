import lazyComputed from 'ember-macro-helpers/lazy-computed';
import normalizeArrayKey from 'ember-macro-helpers/normalize-array-key';

const sentinelValue = {};

function normalizeArrayArgs(keys) {
  keys[0] = normalizeArrayKey(keys[0]);
}

export function normalizeArray({
  defaultValue = sentinelValue
}, callback) {
  return (...keys) => {
    normalizeArrayArgs(keys);

    return lazyComputed(...keys, function(get, array, ...args) {
      let arrayValue = get(array);
      if (!arrayValue) {
        return defaultValue === sentinelValue ? arrayValue : defaultValue;
      }
      let values = args.map(get);
      return callback.call(this, arrayValue, ...values);
    });
  };
}

export function normalizeArray2(funcStr) {
  return (...keys) => {
    normalizeArrayArgs(keys);
    return lazyComputed(...keys, (get, arrayKey, ...keys) => {
      let arrayVal = get(arrayKey);
      if (arrayVal === undefined) {
        return;
      }

      return arrayVal[funcStr](...keys.map(get));
    });
  };
}
