import { sum } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

module('Integration | Macro | sum');

test('adds two numbers', function(assert) {
  compute({
    assert,
    computed: sum('source1', 'source2'),
    properties: {
      source1: 1,
      source2: 2
    },
    strictEqual: 3
  });
});

test('adds three numbers', function(assert) {
  compute({
    assert,
    computed: sum('source1', 'source2', 'source3'),
    properties: {
      source1: 1,
      source2: 2,
      source3: 3
    },
    strictEqual: 6
  });
});

test('handles all undefined', function(assert) {
  compute({
    assert,
    computed: sum('source1', 'source2'),
    assertion(val) {
      return isNaN(val);
    }
  });
});

test('handles some undefined', function(assert) {
  compute({
    assert,
    computed: sum('source1', 'source2'),
    properties: {
      source1: 1
    },
    assertion(val) {
      return isNaN(val);
    }
  });
});

test('allows raw numbers', function(assert) {
  compute({
    assert,
    computed: sum(1, 2, 3),
    strictEqual: 6
  });
});

test('allows composing', function(assert) {
  compute({
    assert,
    computed: sum(sum('source1', 'source2'), 'source3'),
    properties: {
      source1: 1,
      source2: 2,
      source3: 3
    },
    strictEqual: 6
  });
});
