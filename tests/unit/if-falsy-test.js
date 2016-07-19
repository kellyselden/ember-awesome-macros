import Ember from 'ember';
import { ifFalsy } from 'ember-awesome-macros';
import { module, test } from 'qunit';

const {
  get, set
} = Ember;

const Obj = Ember.Object.extend({
  test: ifFalsy('source', 'fallback')
});

let obj;

module('Unit | Macro | if falsy', {
  beforeEach() {
    obj = Obj.create({
      fallback: 'test fallback'
    });
  }
});

test('undefined passes through', function(assert) {
  assert.expect(1);

  assert.strictEqual(get(obj, 'test'), 'test fallback');
});

test('false passes through', function(assert) {
  assert.expect(1);

  set(obj, 'source', false);

  assert.strictEqual(get(obj, 'test'), 'test fallback');
});

test('null passes through', function(assert) {
  assert.expect(1);

  set(obj, 'source', null);

  assert.strictEqual(get(obj, 'test'), 'test fallback');
});

test('0 passes through', function(assert) {
  assert.expect(1);

  set(obj, 'source', 0);

  assert.strictEqual(get(obj, 'test'), 'test fallback');
});

test('truthy is used', function(assert) {
  assert.expect(1);

  set(obj, 'source', 'test source');

  assert.strictEqual(get(obj, 'test'), 'test source');
});

test('watches changes to fallback', function(assert) {
  assert.expect(1);

  set(obj, 'fallback', 'new fallback');

  assert.strictEqual(get(obj, 'test'), 'new fallback');
});
