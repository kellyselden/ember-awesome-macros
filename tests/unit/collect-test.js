import Ember from 'ember';
import { collect } from 'ember-awesome-macros';
import { module, test } from 'qunit';

const {
  get, setProperties
} = Ember;

const Obj = Ember.Object.extend({
  test: collect('source', collect('source'))
});

let obj;

module('Unit | Macro | collect', {
  beforeEach() {
    obj = Obj.create();

    // compute initial value
    // to test recomputes
    get(obj, 'test');
  }
});

test('it works', function(assert) {
  assert.expect(1);

  setProperties(obj, {
    source: 'test value'
  });

  assert.deepEqual(get(obj, 'test'), [
    'test value',
    ['test value']
  ]);
});

test('it returns an ember array', function(assert) {
  assert.expect(1);

  setProperties(obj, {
    source: 'test value'
  });

  assert.ok(get(obj, 'test').pushObject);
});
