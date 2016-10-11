import Ember from 'ember';
import { join, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';

const {
  A: newArray,
  get, setProperties
} = Ember;

const Obj = Ember.Object.extend({
  test: join('array', 'separator'),
  testNested: join(raw(newArray(['test1', 'test2'])), raw(', '))
});

let array;
let obj;

module('Unit | Macro | join', {
  beforeEach() {
    array = newArray(['test1', 'test2']);

    obj = Obj.create({
      array,
      separator: ', '
    });

    // compute initial value
    // to test recomputes
    get(obj, 'test');
    get(obj, 'testNested');
  }
});

test('default', function(assert) {
  assert.expect(1);

  assert.strictEqual(get(obj, 'test'), 'test1, test2');
});

test('it handles property changes', function(assert) {
  assert.expect(1);

  array.pushObject('test3');

  assert.strictEqual(get(obj, 'test'), 'test1, test2, test3');
});

test('it handles array undefined', function(assert) {
  assert.expect(1);

  setProperties(obj, {
    array: undefined
  });

  assert.strictEqual(get(obj, 'test'), '');
});

test('it handles one element', function(assert) {
  assert.expect(1);

  array.popObject();

  assert.strictEqual(get(obj, 'test'), 'test1');
});

test('it handles nesting', function(assert) {
  assert.expect(1);

  assert.strictEqual(get(obj, 'testNested'), 'test1, test2');
});
