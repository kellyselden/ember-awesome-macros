import { quotient } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

module('Integration | Macro | quotient');

test('divides two numbers', function(assert) {
  compute({
    assert,
    computed: quotient('source1', 'source2'),
    properties: {
      source1: 3,
      source2: 2
    },
    strictEqual: 1.5
  });
});

test('divides three numbers', function(assert) {
  compute({
    assert,
    computed: quotient('source1', 'source2', 'source3'),
    properties: {
      source1: 3,
      source2: 2,
      source3: 2
    },
    strictEqual: 0.75
  });
});

test('handles all undefined', function(assert) {
  compute({
    assert,
    computed: quotient('source1', 'source2'),
    assertion(result) {
      return isNaN(result);
    }
  });
});

test('handles some undefined', function(assert) {
  compute({
    assert,
    computed: quotient('source1', 'source2'),
    properties: {
      source1: 3
    },
    assertion(result) {
      return isNaN(result);
    }
  });
});

test('allows raw numbers', function(assert) {
  compute({
    assert,
    computed: quotient(3, 2, 2),
    strictEqual: 0.75
  });
});

test('allows composing', function(assert) {
  compute({
    assert,
    computed: quotient(quotient('source1', 'source2'), 'source3'),
    properties: {
      source1: 3,
      source2: 2,
      source3: 2
    },
    strictEqual: 0.75
  });
});
