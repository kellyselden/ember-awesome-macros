import Ember from 'ember';
import { promiseObject } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import promise from 'ember-cpm/macros/promise';

const {
  get, set
} = Ember;

let funcTestKey;

const Obj = Ember.Object.extend({
  wrapperSource: promise('funcSource'),
  wrapperTest: promiseObject('wrapperSource'),

  funcTest: promiseObject('funcSource', function(key) {
    funcTestKey = key;

    return get(this, 'wrapperSource');
  })
});

let obj;

module('Unit | Macro | promise object', {
  beforeEach() {
    funcTestKey = undefined;

    obj = Obj.create({
      funcSource: Ember.Object.create({ test: 3 })
    });
  }
});

test('wrapper returns an empty object', function(assert) {
  assert.expect(1);

  let result = get(obj, 'wrapperTest');

  assert.strictEqual(get(result, 'test'), undefined);
});

test('wrapper resolves to a populated object', function(assert) {
  assert.expect(1);

  let result = get(obj, 'wrapperTest');

  return result.then(() => {
    assert.strictEqual(get(result, 'test'), 3);
  });
});

test('wrapper resolved value is an object', function(assert) {
  assert.expect(1);

  let result = get(obj, 'wrapperTest');

  return result.then(result => {
    assert.strictEqual(get(result, 'test'), 3);
  });
});

test('wrapper respondes to reassigns', function(assert) {
  assert.expect(1);

  // first, get to compute property
  get(obj, 'wrapperTest');

  set(obj, 'funcSource', Ember.Object.create({ test: 4 }));

  let result = get(obj, 'wrapperTest');

  return result.then(result => {
    assert.strictEqual(get(result, 'test'), 4);
  });
});

test('wrapper responds to changes', function(assert) {
  assert.expect(1);

  // first, get to compute property
  get(obj, 'wrapperTest');

  set(get(obj, 'funcSource'), 'test', 4);

  let result = get(obj, 'wrapperTest');

  return result.then(result => {
    assert.strictEqual(get(result, 'test'), 4);
  });
});

test('func returns an empty object', function(assert) {
  assert.expect(1);

  let result = get(obj, 'funcTest');

  assert.strictEqual(get(result, 'test'), undefined);
});

test('func resolves to a populated object', function(assert) {
  assert.expect(1);

  let result = get(obj, 'funcTest');

  return result.then(() => {
    assert.strictEqual(get(result, 'test'), 3);
  });
});

test('func resolved value is an object', function(assert) {
  assert.expect(1);

  let result = get(obj, 'funcTest');

  return result.then(result => {
    assert.strictEqual(get(result, 'test'), 3);
  });
});

test('func respondes to reassigns', function(assert) {
  assert.expect(1);

  // first, get to compute property
  get(obj, 'funcTest');

  set(obj, 'funcSource', Ember.Object.create({ test: 4 }));

  let result = get(obj, 'funcTest');

  return result.then(result => {
    assert.strictEqual(get(result, 'test'), 4);
  });
});

test('func responds to changes', function(assert) {
  assert.expect(1);

  // first, get to compute property
  get(obj, 'funcTest');

  set(get(obj, 'funcSource'), 'test', 4);

  let result = get(obj, 'funcTest');

  return result.then(result => {
    assert.strictEqual(get(result, 'test'), 4);
  });
});

test('func provides key param', function(assert) {
  assert.expect(1);

  get(obj, 'funcTest');

  assert.strictEqual(funcTestKey, 'funcTest');
});
