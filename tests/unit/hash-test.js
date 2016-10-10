import Ember from 'ember';
import { hash } from 'ember-awesome-macros';
import { module, test } from 'qunit';

const {
  get, setProperties
} = Ember;

const Obj = Ember.Object.extend({
  test: hash({
    source1: 'source',
    source2: hash({
      source: 'source'
    })
  })
});

let obj;

module('Unit | Macro | hash', {
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

  assert.deepEqual(get(obj, 'test'), Ember.Object.create({
    source1: 'test value',
    source2: Ember.Object.create({
      source: 'test value'
    })
  }));
});

test('it returns an ember object', function(assert) {
  assert.expect(1);

  setProperties(obj, {
    source: 'test value'
  });

  assert.ok(get(obj, 'test').get);
});
