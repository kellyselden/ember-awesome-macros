import computed from 'ember-computed';
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
  keys[0] = wrapArray(array);
  return array;
}

export function normalizeArray({
  defaultValue = sentinelValue
}, callback) {
  return (...keys) => {
    let array = normalizeArrayArgs(keys);

    let args = keys.slice(1);

    return computed(...flattenKeys(keys), function() {
      let arrayValue = getValue(this, array);
      if (!arrayValue) {
        return defaultValue === sentinelValue ? arrayValue : defaultValue;
      }
      let values = args.map(key => getValue(this, key));
      return callback.call(this, arrayValue, ...values);
    }).readOnly();
  };
}

export function normalizeArray2(funcStr) {
  return (...keys) => {
    normalizeArrayArgs(keys);
    return safelyCreateComputed(funcStr)(...keys);
  };
}
