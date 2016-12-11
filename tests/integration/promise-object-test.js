import EmberObject from 'ember-object';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import RSVP from 'rsvp';
import { promiseObject, promiseResolve } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

const { resolve } = RSVP;

let object;

module('Integration | Macro | promise object', {
  beforeEach() {
    object = EmberObject.create({ test: 3 });
  }
});

test('it returns an empty object', function(assert) {
  let { val } = compute({
    computed: promiseObject('promise'),
    properties: {
      promise: resolve(object)
    }
  });

  assert.strictEqual(get(val, 'test'), undefined);
});

test('it resolves to a populated object', function(assert) {
  let { val } = compute({
    computed: promiseObject('promise'),
    properties: {
      promise: resolve(object)
    }
  });

  return val.then(() => {
    assert.strictEqual(get(val, 'test'), 3);
  });
});

test('resolved value is an object', function(assert) {
  let { val } = compute({
    computed: promiseObject('promise'),
    properties: {
      promise: resolve(object)
    }
  });

  return val.then(val => {
    assert.strictEqual(get(val, 'test'), 3);
  });
});

test('it responds to reassigns', function(assert) {
  let { obj } = compute({
    computed: promiseObject('promise'),
    properties: {
      promise: resolve(object)
    }
  });

  set(obj, 'promise', resolve(EmberObject.create({ test: 4 })));

  let val = get(obj, 'computed');

  return val.then(val => {
    assert.strictEqual(get(val, 'test'), 4);
  });
});

test('it responds to changes', function(assert) {
  let { obj } = compute({
    computed: promiseObject('promise'),
    properties: {
      promise: resolve(object)
    }
  });

  set(object, 'test', 4);

  let val = get(obj, 'computed');

  return val.then(val => {
    assert.strictEqual(get(val, 'test'), 4);
  });
});

test('value: resolved value is an object', function(assert) {
  let { val } = compute({
    computed: promiseObject(resolve(object))
  });

  return val.then(val => {
    assert.strictEqual(get(val, 'test'), 3);
  });
});

test('composing: resolved value is an object', function(assert) {
  let { val } = compute({
    computed: promiseObject(promiseResolve(object))
  });

  return val.then(val => {
    assert.strictEqual(get(val, 'test'), 3);
  });
});
