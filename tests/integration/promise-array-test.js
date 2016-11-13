import { A as emberArray } from 'ember-array/utils';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import RSVP from 'rsvp';
import { promiseArray } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/compute';

const { resolve } = RSVP;

let array;

module('Integration | Macro | promise array', {
  beforeEach() {
    array = emberArray([null]);
  }
});

test('wrapper returns an empty array', function(assert) {
  let { val } = compute({
    computed: promiseArray('wrapperSource'),
    properties: {
      wrapperSource: resolve(array)
    }
  });

  assert.strictEqual(get(val, 'length'), 0);
});

test('wrapper resolves to a full array', function(assert) {
  let { val } = compute({
    computed: promiseArray('wrapperSource'),
    properties: {
      wrapperSource: resolve(array)
    }
  });

  return val.then(() => {
    assert.strictEqual(get(val, 'length'), 1);
  });
});

test('wrapper resolved value is an array', function(assert) {
  let { val } = compute({
    computed: promiseArray('wrapperSource'),
    properties: {
      wrapperSource: resolve(array)
    }
  });

  return val.then(val => {
    assert.strictEqual(get(val, 'length'), 1);
  });
});

test('wrapper responds to reassigns', function(assert) {
  let { obj } = compute({
    computed: promiseArray('wrapperSource'),
    properties: {
      wrapperSource: resolve(array)
    }
  });

  set(obj, 'wrapperSource', resolve(emberArray([null, null])));

  let val = get(obj, 'computed');

  return val.then(val => {
    assert.strictEqual(get(val, 'length'), 2);
  });
});

test('wrapper responds to pushes', function(assert) {
  let { obj } = compute({
    computed: promiseArray('wrapperSource'),
    properties: {
      wrapperSource: resolve(array)
    }
  });

  array.pushObject(null);

  let val = get(obj, 'computed');

  return val.then(val => {
    assert.strictEqual(get(val, 'length'), 2);
  });
});

test('func returns an empty array', function(assert) {
  let { val } = compute({
    computed: promiseArray(function() {
      return resolve(array);
    })
  });

  assert.strictEqual(get(val, 'length'), 0);
});

test('func resolves to a full array', function(assert) {
  let { val } = compute({
    computed: promiseArray(function() {
      return resolve(array);
    })
  });

  return val.then(() => {
    assert.strictEqual(get(val, 'length'), 1);
  });
});

test('func resolved value is an array', function(assert) {
  let { val } = compute({
    computed: promiseArray(function() {
      return resolve(array);
    })
  });

  return val.then(val => {
    assert.strictEqual(get(val, 'length'), 1);
  });
});

test('func responds to pushes', function(assert) {
  let { obj } = compute({
    computed: promiseArray(function() {
      return resolve(array);
    })
  });

  array.pushObject(null);

  let val = get(obj, 'computed');

  return val.then(val => {
    assert.strictEqual(get(val, 'length'), 2);
  });
});
