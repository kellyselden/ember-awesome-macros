import Ember from 'ember';
import { toUpper } from 'ember-awesome-macros';
import { module, test } from 'qunit';

const {
  get, set
} = Ember;

const Obj = Ember.Object.extend({
  test: toUpper('source')
});

let obj;

module('Unit | Macro | to upper', {
  beforeEach() {
    obj = Obj.create({
      source: undefined
    });
  }
});

test('handles undefined', function(assert) {
  assert.expect(1);

  assert.strictEqual(get(obj, 'test'), undefined);
});

test('to upper', function(assert) {
  assert.expect(1);

  set(obj, 'source', 'abcZXY');

  assert.strictEqual(get(obj, 'test'), 'ABCZXY');
});
