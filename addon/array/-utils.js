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

function convertArray(array) {
  if (array instanceof ArrayProxy) {
    return array;
  }

  if (Array.isArray(array)) {
    // we use .slice() here so that plain arrays are
    // not internally mutated to Ember arrays
    return emberA(array.slice());
  }

  if (isEmberArray(array)) {
    // this is required by the current `concat()` implementation because
    // Ember.Array itself does not define `concat()` so it only works
    // for Ember.Array instances that are backed by a real array
    return emberA(array.toArray());
  }

  return null;
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
      let emberArrayVal = convertArray(arrayVal);
      if (emberArrayVal === null) {
        return getDefaultValue(defaultValue, arrayVal);
      }

      let values = args.map(get);
      return callback.call(this, emberArrayVal, ...values);
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

      let emberArrayVal = convertArray(arrayVal);
      if (emberArrayVal === null) {
        return getDefaultValue(defaultValue, arrayVal);
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

        let emberArrayVal = convertArray(arrayVal);
        if (emberArrayVal === null) {
          return getDefaultValue(firstDefault, arrayVal);
        }

        if (typeof key !== 'string') {
          return getDefaultValue(secondDefault, arrayVal);
        }

        let resolvedArgs = [key, ...args.map(get)];

        if (typeof func === 'function') {
          return func(emberArrayVal, ...resolvedArgs);
        }

        return emberArrayVal[func](...resolvedArgs);
      });
    }
  );
}
