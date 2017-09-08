import lazyComputed from 'ember-macro-helpers/lazy-computed';
import normalizeArrayKey from 'ember-macro-helpers/normalize-array-key';

const sentinelValue = {};

function normalizeArrayArgs(keys) {
  keys[0] = normalizeArrayKey(keys[0]);
}

export function normalizeArray({
  defaultValue = () => sentinelValue
}, callback) {
  return (...keys) => {
    normalizeArrayArgs(keys);

    return lazyComputed(...keys, function(get, arrayKey, ...args) {
      let arrayVal = get(arrayKey);
      if (!arrayVal) {
        let val = defaultValue();
        return val === sentinelValue ? arrayVal : val;
      }

      let values = args.map(get);
      return callback.call(this, arrayVal, ...values);
    });
  };
}

export function normalizeArray2(
  funcStr,
  defaultValue = () => sentinelValue
) {
  return (...keys) => {
    normalizeArrayArgs(keys);

    return lazyComputed(...keys, (get, arrayKey, ...args) => {
      let arrayVal = get(arrayKey);
      if (!Array.isArray(arrayVal)) {
        let val = defaultValue();
        return val === sentinelValue ? arrayVal : val;
      }

      let prop = arrayVal[funcStr];
      if (typeof prop === 'function') {
        return prop.apply(arrayVal, args.map(get));
      }

      return prop;
    });
  };
}
