import EmberObject from 'ember-object';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import RSVP from 'rsvp';
import {
  object as promiseObject,
  resolve as promiseResolve
 } from 'ember-awesome-macros/promise';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

const { resolve } = RSVP;

let object;

module('Integration | Macro | promise | object', {
  beforeEach() {
    object = EmberObject.create({ test: 3 });
  }
});

test('it returns an empty object', function(assert) {
  let { result } = compute({
    computed: promiseObject('promise'),
    properties: {
      promise: resolve(object)
    }
  });

  assert.strictEqual(get(result, 'test'), undefined);
});

test('it resolves to a populated object', function(assert) {
  let { result } = compute({
    computed: promiseObject('promise'),
    properties: {
      promise: resolve(object)
    }
  });

  return result.then(() => {
    assert.strictEqual(get(result, 'test'), 3);
  });
});

test('resolved value is an object', function(assert) {
  let { result } = compute({
    computed: promiseObject('promise'),
    properties: {
      promise: resolve(object)
    }
  });

  return result.then(result => {
    assert.strictEqual(get(result, 'test'), 3);
  });
});

test('it responds to reassigns', function(assert) {
  let { subject } = compute({
    computed: promiseObject('promise'),
    properties: {
      promise: resolve(object)
    }
  });

  set(subject, 'promise', resolve(EmberObject.create({ test: 4 })));

  let result = get(subject, 'computed');

  return result.then(result => {
    assert.strictEqual(get(result, 'test'), 4);
  });
});

test('it responds to changes', function(assert) {
  let { subject } = compute({
    computed: promiseObject('promise'),
    properties: {
      promise: resolve(object)
    }
  });

  set(object, 'test', 4);

  let result = get(subject, 'computed');

  return result.then(result => {
    assert.strictEqual(get(result, 'test'), 4);
  });
});

test('value: resolved value is an object', function(assert) {
  let { result } = compute({
    computed: promiseObject(resolve(object))
  });

  return result.then(result => {
    assert.strictEqual(get(result, 'test'), 3);
  });
});

test('composing: resolved value is an object', function(assert) {
  let { result } = compute({
    computed: promiseObject(promiseResolve(object))
  });

  return result.then(result => {
    assert.strictEqual(get(result, 'test'), 3);
  });
});
