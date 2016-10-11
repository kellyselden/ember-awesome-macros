import Ember from 'ember';
import { lt, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';

const {
  get, setProperties
} = Ember;

const Obj = Ember.Object.extend({
  test: lt('source1', 'source2'),
  testNested: lt(raw(1), raw(2))
});

let obj;

module('Unit | Macro | lt', {
  beforeEach() {
    obj = Obj.create();

    // compute initial value
    // to test recomputes
    get(obj, 'test');
    get(obj, 'testNested');
  }
});

test('less than returns true', function(assert) {
  assert.expect(1);

  setProperties(obj, {
    source1: 1,
    source2: 2
  });

  assert.strictEqual(get(obj, 'test'), true);
});

test('equal returns false', function(assert) {
  assert.expect(1);

  setProperties(obj, {
    source1: 2,
    source2: 2
  });

  assert.strictEqual(get(obj, 'test'), false);
});

test('greater than returns false', function(assert) {
  assert.expect(1);

  setProperties(obj, {
    source1: 2,
    source2: 1
  });

  assert.strictEqual(get(obj, 'test'), false);
});

test('it handles nesting', function(assert) {
  assert.expect(1);

  assert.strictEqual(get(obj, 'testNested'), true);
});
