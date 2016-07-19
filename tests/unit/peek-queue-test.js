import Ember from 'ember';
import { peekQueue } from 'ember-awesome-macros';
import { module, test } from 'qunit';

const {
  get,
  A: newArray
} = Ember;

const Obj = Ember.Object.extend({
  test: peekQueue('array')
});

let obj;

module('Unit | Macro | join', {
  beforeEach() {
    obj = Obj.create({
      array: newArray(['test1', 'test2'])
    });
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
