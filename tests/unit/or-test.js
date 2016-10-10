import Ember from 'ember';
import { or } from 'ember-awesome-macros';
import { module, test } from 'qunit';

const {
  get, setProperties
} = Ember;

const Obj = Ember.Object.extend({
  test: or('source1', 'source2'),
  testNested: or(
    or('source1', 'source2'),
    or('source1', 'source2'),
    or('source1', 'source2')
  )
});

let obj;

module('Unit | Macro | or', {
  beforeEach() {
    obj = Obj.create();

    // compute initial value
    // to test recomputes
    get(obj, 'test');
    get(obj, 'testNested');
  }
});

test('false or false returns false', function(assert) {
  assert.expect(1);

  setProperties(obj, {
    source1: false,
    source2: false
  });

  assert.strictEqual(get(obj, 'test'), false);
});

test('true or false returns true', function(assert) {
  assert.expect(1);

  setProperties(obj, {
    source1: true,
    source2: false
  });

  assert.strictEqual(get(obj, 'test'), true);
});

test('false or true returns true', function(assert) {
  assert.expect(1);

  setProperties(obj, {
    source1: false,
    source2: true
  });

  assert.strictEqual(get(obj, 'test'), true);
});

test('true or true returns true', function(assert) {
  assert.expect(1);

  setProperties(obj, {
    source1: true,
    source2: true
  });

  assert.strictEqual(get(obj, 'test'), true);
});

test('nested: false or false returns false', function(assert) {
  assert.expect(1);

  setProperties(obj, {
    source1: false,
    source2: false
  });

  assert.strictEqual(get(obj, 'testNested'), false);
});

test('nested: true or false returns true', function(assert) {
  assert.expect(1);

  setProperties(obj, {
    source1: true,
    source2: false
  });

  assert.strictEqual(get(obj, 'testNested'), true);
});

test('nested: false or true returns true', function(assert) {
  assert.expect(1);

  setProperties(obj, {
    source1: false,
    source2: true
  });

  assert.strictEqual(get(obj, 'testNested'), true);
});

test('nested: true or true returns true', function(assert) {
  assert.expect(1);

  setProperties(obj, {
    source1: true,
    source2: true
  });

  assert.strictEqual(get(obj, 'testNested'), true);
});
