import RSVP from 'rsvp';
import { default as _computed } from 'ember-computed';
import flattenKeys from 'ember-macro-helpers/flatten-keys';
import getValue from 'ember-macro-helpers/get-value';
import computed from 'ember-macro-helpers/computed';

// consider making private
export function wrapArray(key) {
  if (typeof key === 'string') {
    key += '.[]';
  }
  return key;
}

export function resolveKeys(keys, callback) {
  return computed(...keys, function(...values) {
    return callback.apply(this, values);
  }).readOnly();
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
    return callback(arrayValue, ...values);
  }).readOnly();
}

export function reduceKeys(keys, func) {
  return resolveKeys(keys, (...values) => {
    return values.reduce(func);
  });
}

export function normalizeString(key, func) {
  return resolveKeys([key], val => {
    if (!val) {
      return val;
    }

    return func(val);
  });
}

const { resolve } = RSVP;

export function wrapPromiseProxy(key, PromiseProxy) {
  return resolveKeys([key], promise => {
    if (promise === undefined) {
      promise = resolve(undefined);
    }

    return PromiseProxy.create({
      promise
    });
  });
}

export function checkArgs(values, callback) {
  for (let i = 0; i < values.length; i++) {
    if (values[i] === undefined) {
      return undefined;
    }
  }
  return callback();
}

function safelyCreateComputed(keys, funcStr) {
  return resolveKeys(keys, (...values) => {
    return checkArgs(values, () => {
      return values[0][funcStr](...values.slice(1));
    });
  });
}

export { safelyCreateComputed as normalizeString2 };

export function normalizeArray2(keys, funcStr) {
  normalizeArrayArgs(keys);
  return safelyCreateComputed(keys, funcStr);
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
