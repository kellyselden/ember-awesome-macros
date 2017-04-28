import RSVP from 'rsvp';
import { then } from 'ember-awesome-macros/promise';
import computed from 'ember-computed';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';
import sinon from 'sinon';

const { resolve } = RSVP;

module('Integration | Macro | promise | then');

test('still returns a promise when promise is undefined', function(assert) {
  return compute({
    computed: then()
  }).promise.then(result => {
    assert.strictEqual(result, undefined);
  });
});

test('resolves to undefined if property undefined', function(assert) {
  return compute({
    assert,
    computed: then('promise'),
    properties: {
      promise: resolve()
    },
    strictEqual: undefined
  }).promise;
});

test('returns promise.then result', function(assert) {
  return compute({
    assert,
    computed: then('promise', 'propertyKey'),
    properties: {
      promise: resolve({ property: 'test value' }),
      propertyKey: 'property'
    },
    strictEqual: 'test value'
  }).promise;
});

test('doesn\'t calculate when unnecessary', function(assert) {
  let callback = sinon.spy();

  compute({
    computed: then(
      undefined,
      computed(callback)
    )
  });

  assert.notOk(callback.called);
});
