import Ember from 'ember';
import { objectAt, collect, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';

const {
  A: newArray,
  get, setProperties
} = Ember;

const Obj = Ember.Object.extend({
  test: objectAt('array', 'source'),
  testNested: objectAt(collect(raw('my value')), raw(0))
});

let obj;
let array;

module('Unit | Macro | object at', {
  beforeEach() {
    array = newArray(['my value']);

    obj = Obj.create({
      source: 0,
      array
    });

    // compute initial value
    // to test recomputes
    get(obj, 'test');
    get(obj, 'testNested');
  }
});

test('it returns object if found', function(assert) {
  assert.expect(1);

  assert.strictEqual(get(obj, 'test'), 'my value');
});

test('it returns undefined if not found', function(assert) {
  assert.expect(1);

  setProperties(obj, {
    source: 'my value 2'
  });

  assert.strictEqual(get(obj, 'test'), undefined);
});

test('it returns undefined if popped', function(assert) {
  assert.expect(1);

  array.popObject();

  assert.strictEqual(get(obj, 'test'), undefined);
});

test('it returns undefined if not array', function(assert) {
  assert.expect(1);

  setProperties(obj, {
    array: undefined
  });

  assert.strictEqual(get(obj, 'test'), undefined);
});

test('it handles nesting', function(assert) {
  assert.expect(1);

  assert.strictEqual(get(obj, 'testNested'), 'my value');
});
