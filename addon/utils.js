import Ember from 'ember';
import RSVP from 'rsvp';
import get from 'ember-metal/get';
import { default as _computed } from 'ember-computed';
import { expandProperty } from 'ember-macro-helpers/utils';

const {
  ComputedProperty
} = Ember;

// consider making private
export function isComputed(key) {
  return key instanceof ComputedProperty;
}

// consider making private
export function wrapArray(key) {
  if (typeof key === 'string') {
    key += '.[]';
  }
  return key;
}

function flattenKey(key, flattenedKeys) {
  if (isComputed(key)) {
    let dependentKeys = key._dependentKeys;
    if (dependentKeys === undefined) {
      // when there are no keys (raw)
      return;
    }

    return _flattenKeys(dependentKeys, flattenedKeys);
  }

  if (typeof key !== 'string') {
    return key;
  }

  flattenedKeys.push(key);
}

function _flattenKeys(keys, flattenedKeys) {
  keys.forEach(key => {
    flattenKey(key, flattenedKeys);
  });
}

export function flattenKeys(keys) {
  let flattenedKeys = [];
  _flattenKeys(keys.slice(0, -1), flattenedKeys);
  let lastKey = keys[keys.length - 1];
  if (lastKey) {
    let lastValue = flattenKey(lastKey, flattenedKeys);
    if (lastValue) {
      if (lastValue.get) {
        flattenKey(lastValue.get, flattenedKeys);
      }
      if (lastValue.set) {
        flattenKey(lastValue.set, flattenedKeys);
      }
    }
  }
  return flattenedKeys;
}

function collapseKeys(keys) {
  return keys.reduce((newKeys, key) => {
    if (typeof key === 'string') {
      newKeys = newKeys.concat(expandProperty(key));
    } else {
      newKeys.push(key);
    }
    return newKeys;
  }, []);
}

function buildCallback(keys, incomingCallback) {
  let collapsedKeys = collapseKeys(keys);

  let newCallback;
  if (typeof incomingCallback === 'function') {
    newCallback = function() {
      let values = collapsedKeys.map(key => getValue(this, key));
      return incomingCallback.apply(this, values);
    };
  } else {
    newCallback = {};
    if (incomingCallback.get) {
      newCallback.get = function() {
        let values = collapsedKeys.map(key => getValue(this, key));
        return incomingCallback.get.apply(this, values);
      };
    }
    if (incomingCallback.set) {
      newCallback.set = incomingCallback.set;
    }
  }

  return newCallback;
}

export function computed(...args) {
  let keys = args.slice(0, -1);
  let incomingCallback = args[args.length - 1];

  let newCallback = buildCallback(keys, incomingCallback);

  return _computed(...flattenKeys(keys), newCallback);
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

export function getValue(context, key) {
  if (isComputed(key)) {
    return key._getter.call(context);
  }

  if (typeof key !== 'string') {
    return key;
  }

  return get(context, key);
}
