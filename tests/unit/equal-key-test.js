import Ember from 'ember';
import { equalKey } from 'ember-awesome-macros';
import { module, test } from 'qunit';

const {
  get, setProperties
} = Ember;

const Obj = Ember.Object.extend({
  test: equalKey('source1', 'source2')
});

let obj;

module('Unit | Macro | equal key', {
  beforeEach() {
    obj = Obj.create();

    // compute initial value
    // to test recomputes
    get(obj, 'test');
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
