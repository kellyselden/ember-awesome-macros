import Ember from 'ember';
import { equal, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';

const {
  get, setProperties
} = Ember;

const Obj = Ember.Object.extend({
  test: equal('source1', 'source2'),
  testNested: equal(raw(2), raw(2))
});

let obj;

module('Unit | Macro | equal', {
  beforeEach() {
    obj = Obj.create();

    // compute initial value
    // to test recomputes
    get(obj, 'test');
    get(obj, 'testNested');
  }
});

test('not equal returns false', function(assert) {
  assert.expect(1);

  setProperties(obj, {
    source1: 1,
    source2: 2
  });

  assert.strictEqual(get(obj, 'test'), false);
});

test('equal but different type returns false', function(assert) {
  assert.expect(1);

  setProperties(obj, {
    source1: '2',
    source2: 2
  });

  assert.strictEqual(get(obj, 'test'), false);
});

test('equal and same type returns true', function(assert) {
  assert.expect(1);

  setProperties(obj, {
    source1: 2,
    source2: 2
  });

  assert.strictEqual(get(obj, 'test'), true);
});

test('it handles nesting', function(assert) {
  assert.expect(1);

  assert.strictEqual(get(obj, 'testNested'), true);
});