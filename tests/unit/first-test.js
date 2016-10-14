import Ember from 'ember';
import { first } from 'ember-awesome-macros';
import { module, test } from 'qunit';

const {
  get,
  A: newArray
} = Ember;

const Obj = Ember.Object.extend({
  test: first('array')
});

let obj;

module('Unit | Macro | first', {
  beforeEach() {
    obj = Obj.create({
      array: newArray(['test1', 'test2'])
    });

    // compute initial value
    // to test recomputes
    get(obj, 'test');
  }
});

test('default', function(assert) {
  assert.expect(1);

  assert.strictEqual(get(obj, 'test'), 'test1');
});

test('handles array changes', function(assert) {
  assert.expect(1);

  get(obj, 'array').removeAt(0);

  assert.strictEqual(get(obj, 'test'), 'test2');
});
