import { A as emberA, isArray as isEmberArray } from '@ember/array';
import ArrayProxy from '@ember/array/proxy';
import normalizeArrayKey from 'ember-macro-helpers/normalize-array-key';
import {
  lazyComputed,
  createClassComputed
} from 'ember-macro-helpers';

const sentinelValue = {};

function normalizeArrayArgs(keys) {
  keys[0] = normalizeArrayKey(keys[0]);
}

function normalizeFakeArray(maybeFakeArray) {
  if (
    isEmberArray(maybeFakeArray)
    && !Array.isArray(maybeFakeArray)
    && !(maybeFakeArray instanceof ArrayProxy)
  ) {
    return maybeFakeArray.toArray();
  }

  return maybeFakeArray;
}

function getDefaultValue(func, identityVal) {
  let val = func();
  return val === sentinelValue ? identityVal : val;
}

export function normalizeArray({
  defaultValue = () => sentinelValue
}, callback) {
  return (...keys) => {
    normalizeArrayArgs(keys);

    return lazyComputed(...keys, function(get, arrayKey, ...args) {
      let arrayVal = get(arrayKey);
      arrayVal = normalizeFakeArray(arrayVal);
      if (!arrayVal) {
        return getDefaultValue(defaultValue, arrayVal);
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
      arrayVal = normalizeFakeArray(arrayVal);
      let isArrayProxy = arrayVal instanceof ArrayProxy;
      if (!Array.isArray(arrayVal) && !isArrayProxy) {
        return getDefaultValue(defaultValue, arrayVal);
      }

      let emberArrayVal;
      if (isArrayProxy) {
        emberArrayVal = arrayVal;
      } else {
        emberArrayVal = emberA(arrayVal);
      }

      let prop = emberArrayVal[funcStr];
      if (typeof prop === 'function') {
        return prop.apply(emberArrayVal, args.map(get));
      }

      return prop;
    });
  };
}

export function normalizeArray3({
  firstDefault = () => sentinelValue,
  secondDefault = () => sentinelValue,
  func
}) {
  return createClassComputed(
    [false, true],
    (array, key, ...args) => {
      return lazyComputed(normalizeArrayKey(array, [key]), ...args, function(get, arrayKey, ...args) {
        let arrayVal = get(arrayKey);
        arrayVal = normalizeFakeArray(arrayVal);
        let isArrayProxy = arrayVal instanceof ArrayProxy;

        if (!Array.isArray(arrayVal) && !isArrayProxy) {
          return getDefaultValue(firstDefault, arrayVal);
        }

        if (typeof key !== 'string') {
          return getDefaultValue(secondDefault, arrayVal);
        }

        if (!isArrayProxy) {
          arrayVal = emberA(arrayVal);
        }

        let resolvedArgs = [key, ...args.map(get)];

        if (typeof func === 'function') {
          return func(arrayVal, ...resolvedArgs);
        }

        return arrayVal[func](...resolvedArgs);
      });
    }
  );
}
