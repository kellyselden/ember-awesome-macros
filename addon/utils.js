import Ember from 'ember';
import RSVP from 'rsvp';
import get from 'ember-metal/get';
import { default as _computed } from 'ember-computed';
import expandPropertyList from 'ember-macro-helpers/utils/expand-property-list';

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

function splitKeysAndCallback(args) {
  return {
    keys: args.slice(0, -1),
    callback: args[args.length - 1]
  };
}

function flattenedComputed(...args) {
  let { keys, callback } = splitKeysAndCallback(args);
  let newArgs = flattenKeys(keys);
  newArgs.push(callback);
  return _computed(...newArgs);
}

export function computed(...args) {
  let { keys, callback: incomingCallback } = splitKeysAndCallback(args);

  let collapsedKeys = keys.reduce((newKeys, key) => {
    if (typeof key === 'string') {
      newKeys = newKeys.concat(expandPropertyList([key]));
    } else {
      newKeys.push(key);
    }
    return newKeys;
  }, []);

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

  return flattenedComputed(...keys, newCallback);
}

export function resolveKeys(...args) {
  let { keys, callback } = splitKeysAndCallback(args);
  return computed(...keys, function(...values) {
    return callback.apply(this, values);
  }).readOnly();
}

const sentinelValue = {};

export function normalizeArray(keys, {
  defaultValue = sentinelValue
}, callback) {
  let [array] = keys;
  let wrappedArray = wrapArray(array);
  let args = keys.slice(1);

  return flattenedComputed(...[wrappedArray, ...args], function() {
    let arrayValue = getValue(this, array);
    if (!arrayValue) {
      return defaultValue === sentinelValue ? arrayValue : defaultValue;
    }
    let values = args.map(key => getValue(this, key));
    return callback(arrayValue, ...values);
  }).readOnly();
}

export function normalizeArithmetic(keys, func) {
  return resolveKeys(...keys, (...values) => {
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

const { resolve } = RSVP;

export function wrapPromiseProxy(key, PromiseProxy) {
  return resolveKeys(key, promise => {
    if (promise === undefined) {
      promise = resolve(undefined);
    }

    return PromiseProxy.create({
      promise
    });
  });
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
