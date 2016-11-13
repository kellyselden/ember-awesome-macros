import EmberObject from 'ember-object';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import RSVP from 'rsvp';
import { promiseObject } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/compute';

const { resolve } = RSVP;

let object;

module('Integration | Macro | promise object', {
  beforeEach() {
    object = EmberObject.create({ test: 3 });
  }
});

test('wrapper returns an empty object', function(assert) {
  let { val } = compute({
    computed: promiseObject('wrapperSource'),
    properties: {
      wrapperSource: resolve(object)
    }
  });

  assert.strictEqual(get(val, 'test'), undefined);
});

test('wrapper resolves to a populated object', function(assert) {
  let { val } = compute({
    computed: promiseObject('wrapperSource'),
    properties: {
      wrapperSource: resolve(object)
    }
  });

  return val.then(() => {
    assert.strictEqual(get(val, 'test'), 3);
  });
});

test('wrapper resolved value is an object', function(assert) {
  let { val } = compute({
    computed: promiseObject('wrapperSource'),
    properties: {
      wrapperSource: resolve(object)
    }
  });

  return val.then(val => {
    assert.strictEqual(get(val, 'test'), 3);
  });
});

test('wrapper responds to reassigns', function(assert) {
  let { obj } = compute({
    computed: promiseObject('wrapperSource'),
    properties: {
      wrapperSource: resolve(object)
    }
  });

  set(obj, 'wrapperSource', resolve(EmberObject.create({ test: 4 })));

  let val = get(obj, 'computed');

  return val.then(val => {
    assert.strictEqual(get(val, 'test'), 4);
  });
});

test('wrapper responds to changes', function(assert) {
  let { obj } = compute({
    computed: promiseObject('wrapperSource'),
    properties: {
      wrapperSource: resolve(object)
    }
  });

  set(object, 'test', 4);

  let val = get(obj, 'computed');

  return val.then(val => {
    assert.strictEqual(get(val, 'test'), 4);
  });
});

test('func returns an empty object', function(assert) {
  let { val } = compute({
    computed: promiseObject(function() {
      return resolve(object);
    })
  });

  assert.strictEqual(get(val, 'test'), undefined);
});

test('func resolves to a populated object', function(assert) {
  let { val } = compute({
    computed: promiseObject(function() {
      return resolve(object);
    })
  });

  return val.then(() => {
    assert.strictEqual(get(val, 'test'), 3);
  });
});

test('func resolved value is an object', function(assert) {
  let { val } = compute({
    computed: promiseObject(function() {
      return resolve(object);
    })
  });

  return val.then(val => {
    assert.strictEqual(get(val, 'test'), 3);
  });
});

test('func responds to changes', function(assert) {
  let { obj } = compute({
    computed: promiseObject(function() {
      return resolve(object);
    })
  });

  set(object, 'test', 4);

  let val = get(obj, 'computed');

  return val.then(val => {
    assert.strictEqual(get(val, 'test'), 4);
  });
});
