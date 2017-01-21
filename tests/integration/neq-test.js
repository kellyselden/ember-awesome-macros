import { neq, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

module('Integration | Macro | neq');

test('equal and same type returns false', function(assert) {
  compute({
    assert,
    computed: neq('source1', 'source2'),
    properties: {
      source1: 2,
      source2: 2
    },
    strictEqual: false
  });
});

test('equal but different type returns true', function(assert) {
  compute({
    assert,
    computed: neq('source1', 'source2'),
    properties: {
      source1: '2',
      source2: 2
    },
    strictEqual: true
  });
});

test('not equal returns true', function(assert) {
  compute({
    assert,
    computed: neq('source1', 'source2'),
    properties: {
      source1: 1,
      source2: 2
    },
    strictEqual: true
  });
});

test('checks equality for N items', function(assert) {
  let { subject } = compute({
    assert,
    computed: neq('source1', 'source2', 'source3'),
    properties: {
      source1: 2,
      source2: 2,
      source3: 1
    },
    strictEqual: true
  });

  subject.set('source3', 2);

  assert.strictEqual(subject.get('computed'), false);
});

test('it handles numbers', function(assert) {
  compute({
    assert,
    computed: neq(1, 2),
    strictEqual: true
  });
});

test('it handles nesting', function(assert) {
  compute({
    assert,
    computed: neq(raw(1), raw(2)),
    strictEqual: true
  });
});
