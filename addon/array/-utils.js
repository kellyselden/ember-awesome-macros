import { default as _computed } from 'ember-computed';
import flattenKeys from 'ember-macro-helpers/flatten-keys';
import getValue from 'ember-macro-helpers/get-value';
import { safelyCreateComputed } from '../-utils';

// consider making private
export function wrapArray(key) {
  if (typeof key === 'string') {
    key += '.[]';
  }
  return key;
}

const sentinelValue = {};

function normalizeArrayArgs(keys) {
  let [array] = keys;
  let wrappedArray = wrapArray(array);
  keys[0] = wrappedArray;
  return {
    array,
    wrappedArray
  };
}

export function normalizeArray(keys, {
  defaultValue = sentinelValue
}, callback) {
  let { array } = normalizeArrayArgs(keys);

  let args = keys.slice(1);

  return _computed(...flattenKeys(keys), function() {
    let arrayValue = getValue(this, array);
    if (!arrayValue) {
      return defaultValue === sentinelValue ? arrayValue : defaultValue;
    }
    let values = args.map(key => getValue(this, key));
    return callback.call(this, arrayValue, ...values);
  }).readOnly();
}

export function normalizeArray2(keys, funcStr) {
  normalizeArrayArgs(keys);
  return safelyCreateComputed(funcStr)(...keys);
}
