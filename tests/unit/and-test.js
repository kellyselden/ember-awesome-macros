import Ember from 'ember';
import { and } from 'ember-awesome-macros';
import { module, test } from 'qunit';

const {
  get, setProperties
} = Ember;

const Obj = Ember.Object.extend({
  test: and('source1', 'source2'),
  testNested: and(
    and('source1', 'source2'),
    and('source1', 'source2'),
    and('source1', 'source2')
  )
});

let obj;

module('Unit | Macro | and', {
  beforeEach() {
    obj = Obj.create();

    // compute initial value
    // to test recomputes
    get(obj, 'test');
    get(obj, 'testNested');
  }
});

test('false and false returns false', function(assert) {
  assert.expect(1);

  setProperties(obj, {
    source1: false,
    source2: false
  });

  assert.strictEqual(get(obj, 'test'), false);
});

test('true and false returns false', function(assert) {
  assert.expect(1);

  setProperties(obj, {
    source1: true,
    source2: false
  });

  assert.strictEqual(get(obj, 'test'), false);
});

test('false and true returns false', function(assert) {
  assert.expect(1);

  setProperties(obj, {
    source1: false,
    source2: true
  });

  assert.strictEqual(get(obj, 'test'), false);
});

test('true and true returns true', function(assert) {
  assert.expect(1);

  setProperties(obj, {
    source1: true,
    source2: true
  });

  assert.strictEqual(get(obj, 'test'), true);
});

test('nested: false and false returns false', function(assert) {
  assert.expect(1);

  setProperties(obj, {
    source1: false,
    source2: false
  });

  assert.strictEqual(get(obj, 'testNested'), false);
});

test('nested: true and false returns false', function(assert) {
  assert.expect(1);

  setProperties(obj, {
    source1: true,
    source2: false
  });

  assert.strictEqual(get(obj, 'testNested'), false);
});

test('nested: false and true returns false', function(assert) {
  assert.expect(1);

  setProperties(obj, {
    source1: false,
    source2: true
  });

  assert.strictEqual(get(obj, 'testNested'), false);
});

test('nested: true and true returns true', function(assert) {
  assert.expect(1);

  setProperties(obj, {
    source1: true,
    source2: true
  });

  assert.strictEqual(get(obj, 'testNested'), true);
});
