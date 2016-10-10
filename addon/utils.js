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

export function normalizeArray(arrayKey, defaultValue, func, ...keys) {
  let wrappedArray = wrapArray(arrayKey);
  return computed(...flattenKeys([wrappedArray, ...keys]), function() {
    let array = getValue(this, arrayKey);
    if (!array) {
      return defaultValue;
    }
    let keyValues = keys.map(key => getValue(this, key));
    return func(array, ...keyValues);
  });
}

export function getValue(context, key) {
  if (isComputed(key)) {
    return key._getter.call(context);
  } else {
    return get(context, key);
  }
}
