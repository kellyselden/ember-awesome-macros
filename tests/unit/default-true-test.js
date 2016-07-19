import Ember from 'ember';
import { defaultTrue } from 'ember-awesome-macros';
import { module, test } from 'qunit';

const {
  get, set
} = Ember;

const Obj = Ember.Object.extend({
  test: defaultTrue('source')
});

let obj;

module('Unit | Macro | default true', {
  beforeEach() {
    obj = Obj.create({
      source: undefined
    });
  }
});

test('defaults true', function(assert) {
  assert.expect(1);

  assert.strictEqual(get(obj, 'test'), true);
});

test('false doesn\'t pass through', function(assert) {
  assert.expect(1);

  set(obj, 'source', false);

  assert.strictEqual(get(obj, 'test'), false);
});

test('true doesn\'t pass through', function(assert) {
  assert.expect(1);

  set(obj, 'source', 1);

  assert.strictEqual(get(obj, 'test'), 1);
});
