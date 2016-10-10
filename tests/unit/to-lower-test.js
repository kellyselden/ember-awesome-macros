import Ember from 'ember';
import { toLower } from 'ember-awesome-macros';
import { module, test } from 'qunit';

const {
  get, set
} = Ember;

const Obj = Ember.Object.extend({
  test: toLower('source')
});

let obj;

module('Unit | Macro | to lower', {
  beforeEach() {
    obj = Obj.create({
      source: undefined
    });

    // compute initial value
    // to test recomputes
    get(obj, 'test');
  }
});

test('handles undefined', function(assert) {
  assert.expect(1);

  assert.strictEqual(get(obj, 'test'), undefined);
});

test('to lower', function(assert) {
  assert.expect(1);

  set(obj, 'source', 'abcZXY');

  assert.strictEqual(get(obj, 'test'), 'abczxy');
});
