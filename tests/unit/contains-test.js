import Ember from 'ember';
import { contains, collect, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';

const {
  A: newArray,
  get, setProperties
} = Ember;

const Obj = Ember.Object.extend({
  test: contains('array', 'source'),
  testNested: contains(collect(raw('my value')), raw('my value'))
});

let obj;
let array;

module('Unit | Macro | contains', {
  beforeEach() {
    array = newArray(['my value']);

    obj = Obj.create({
      source: 'my value',
      array
    });

    // compute initial value
    // to test recomputes
    get(obj, 'test');
    get(obj, 'testNested');
  }
});

test('it returns true if found', function(assert) {
  assert.expect(1);

  assert.strictEqual(get(obj, 'test'), true);
});

test('it returns false if not found', function(assert) {
  assert.expect(1);

  setProperties(obj, {
    source: 'my value 2'
  });

  assert.strictEqual(get(obj, 'test'), false);
});

test('it returns false if popped', function(assert) {
  assert.expect(1);

  array.popObject();

  assert.strictEqual(get(obj, 'test'), false);
});

test('it returns false if not array', function(assert) {
  assert.expect(1);

  setProperties(obj, {
    array: undefined
  });

  assert.strictEqual(get(obj, 'test'), false);
});

test('it handles nesting', function(assert) {
  assert.expect(1);

  assert.strictEqual(get(obj, 'testNested'), true);
});
