import Ember from 'ember';

const {
  typeOf,
  get,
  computed
} = Ember;

// consider making private
export function isComputed(key) {
  return typeOf(key) === 'object';
}

// consider making private
export function wrapArray(key) {
  if (!isComputed(key)) {
    key += '.[]';
  }
  return key;
}

function _flattenKeys(keys, flattenedKeys) {
  keys.forEach(key => {
    if (isComputed(key)) {
      let dependentKeys = key._dependentKeys;
      if (dependentKeys === undefined) {
        // when there are no keys (raw)
        return;
      }
      _flattenKeys(dependentKeys, flattenedKeys);
    } else if (typeof key === 'number') {
      return;
    } else {
      flattenedKeys.push(key);
    }
  });
}

export function flattenKeys(keys) {
  let flattenedKeys = [];
  _flattenKeys(keys, flattenedKeys);
  return flattenedKeys;
}

export function resolveKeys(...args) {
  let keys = args.slice(0, -1);
  let isAlreadyArray;
  if (Array.isArray(keys[0])) {
    keys = keys[0];
    isAlreadyArray = true;
  }
  let func = args[args.length - 1];
  return computed(...flattenKeys(keys), function() {
    let values = keys.map(key => getValue(this, key));
    if (isAlreadyArray) {
      return func(values);
    } else {
      return func(...values);
    }
  });
}

const sentinelValue = {};

export function normalizeArray(array, {
  defaultValue = sentinelValue
}, callback, ...keys) {
  let wrappedArray = wrapArray(array);
  return computed(...flattenKeys([wrappedArray, ...keys]), function() {
    let arrayValue = getValue(this, array);
    if (!arrayValue) {
      return defaultValue === sentinelValue ? arrayValue : defaultValue;
    }
    let values = keys.map(key => getValue(this, key));
    return callback(arrayValue, ...values);
  });
}

export function normalizeArithmetic(keys, func) {
  return resolveKeys(keys, values => {
    values = values.filter(value => value !== undefined);
    if (!values.length) {
      return 0;
    }
    return values.reduce(func);
  });
}

export function normalizeString(key, func) {
  return resolveKeys(key, val => {
    if (!val) {
      return val;
    }

    return func(val);
  });
}

export function getValue(context, key) {
  if (isComputed(key)) {
    return key._getter.call(context);
  } else if (typeof key === 'number') {
    return key;
  } else {
    return get(context, key);
  }
}
