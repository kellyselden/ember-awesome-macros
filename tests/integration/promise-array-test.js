import { A as emberArray } from 'ember-array/utils';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import RSVP from 'rsvp';
import { promiseArray, promiseResolve } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/compute';

const { resolve } = RSVP;

let array;

module('Integration | Macro | promise array', {
  beforeEach() {
    array = emberArray([null]);
  }
});

test('it returns an empty array', function(assert) {
  let { val } = compute({
    computed: promiseArray('promise'),
    properties: {
      promise: resolve(array)
    }
  });

  assert.strictEqual(get(val, 'length'), 0);
});

test('it resolves to a full array', function(assert) {
  let { val } = compute({
    computed: promiseArray('promise'),
    properties: {
      promise: resolve(array)
    }
  });

  return val.then(() => {
    assert.strictEqual(get(val, 'length'), 1);
  });
});

test('resolved value is an array', function(assert) {
  let { val } = compute({
    computed: promiseArray('promise'),
    properties: {
      promise: resolve(array)
    }
  });

  return val.then(val => {
    assert.strictEqual(get(val, 'length'), 1);
  });
});

test('it responds to reassigns', function(assert) {
  let { obj } = compute({
    computed: promiseArray('promise'),
    properties: {
      promise: resolve(array)
    }
  });

  set(obj, 'promise', resolve(emberArray([null, null])));

  let val = get(obj, 'computed');

  return val.then(val => {
    assert.strictEqual(get(val, 'length'), 2);
  });
});

test('it responds to pushes', function(assert) {
  let { obj } = compute({
    computed: promiseArray('promise'),
    properties: {
      promise: resolve(array)
    }
  });

  array.pushObject(null);

  let val = get(obj, 'computed');

  return val.then(val => {
    assert.strictEqual(get(val, 'length'), 2);
  });
});

test('value: resolved value is an array', function(assert) {
  let { val } = compute({
    computed: promiseArray(resolve(array))
  });

  return val.then(val => {
    assert.strictEqual(get(val, 'length'), 1);
  });
});

test('composing: resolved value is an array', function(assert) {
  let { val } = compute({
    computed: promiseArray(promiseResolve(array))
  });

  return val.then(val => {
    assert.strictEqual(get(val, 'length'), 1);
  });
});
