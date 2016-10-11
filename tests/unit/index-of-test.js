import Ember from 'ember';
import { indexOf, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';

const {
  A: newArray,
  get, setProperties
} = Ember;

const Obj = Ember.Object.extend({
  test: indexOf('array', 'source'),
  testNested: indexOf(raw(newArray(['my value'])), raw('my value'))
});

let array;
let obj;

module('Unit | Macro | index of', {
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

test('it returns index if found', function(assert) {
  assert.expect(1);

  assert.strictEqual(get(obj, 'test'), 0);
});

test('it returns -1 if not found', function(assert) {
  assert.expect(1);

  setProperties(obj, {
    source: 'my value 2'
  });

  assert.strictEqual(get(obj, 'test'), -1);
});

test('it returns -1 if popped', function(assert) {
  assert.expect(1);

  array.popObject();

  assert.strictEqual(get(obj, 'test'), -1);
});

test('it returns -1 if not array', function(assert) {
  assert.expect(1);

  setProperties(obj, {
    array: undefined
  });

  assert.strictEqual(get(obj, 'test'), -1);
});

test('it handles nesting', function(assert) {
  assert.expect(1);

  assert.strictEqual(get(obj, 'testNested'), 0);
});
