import Ember from 'ember';
import { peekStack } from 'ember-awesome-macros';
import { module, test } from 'qunit';

const {
  get,
  A: newArray
} = Ember;

const Obj = Ember.Object.extend({
  test: peekStack('array')
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

  assert.strictEqual(get(obj, 'test'), 'test2');
});

test('handles array changes', function(assert) {
  assert.expect(1);

  get(obj, 'array').removeAt(1);

  assert.strictEqual(get(obj, 'test'), 'test1');
});
