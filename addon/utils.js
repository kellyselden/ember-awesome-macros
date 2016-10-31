import Ember from 'ember';

const {
  ComputedProperty,
  get,
  computed: _computed
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

function resolveCallback(callbackComputed) {
  let callback = getValue(this, callbackComputed);
  if (callback) {
    return callback;
  }

  if (typeof callbackComputed === 'string') {
    return;
  }

  throw new Error('You must call computed with a last param of function');
}

function callCallback(args, callbackComputed, operation) {
  let callback = resolveCallback.call(this, callbackComputed);
  if (!callback) {
    return;
  }

  let operationCallback = callback[operation];
  if (operationCallback) {
    callback = resolveCallback.call(this, operationCallback);
    if (!callback) {
      return;
    }
  }

  return callback.apply(this, args);
}

export function computed(...args) {
  let callback = args[args.length - 1];

  return _computed(...flattenKeys(args), {
    get() {
      return callCallback.call(this, arguments, callback, 'get');
    },
    set() {
      return callCallback.call(this, arguments, callback, 'set');
    }
  });
}

export function resolveKeys(...args) {
  let keys = args.slice(0, -1);
  let isAlreadyArray;
  if (Array.isArray(keys[0])) {
    keys = keys[0];
    isAlreadyArray = true;
  }
  let func = args[args.length - 1];
  return computed(...keys, function() {
    let values = keys.map(key => getValue(this, key));
    if (isAlreadyArray) {
      return func.call(this, values);
    } else {
      return func.apply(this, values);
    }
  });
}

const sentinelValue = {};

export function normalizeArray(array, {
  defaultValue = sentinelValue
}, callback, ...keys) {
  let wrappedArray = wrapArray(array);
  return computed(wrappedArray, ...keys, function() {
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
  }

  if (typeof key !== 'string') {
    return key;
  }

  return get(context, key);
}
