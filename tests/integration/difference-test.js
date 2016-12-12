import { difference } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

module('Integration | Macro | difference');

test('subtracts two numbers', function(assert) {
  compute({
    assert,
    computed: difference('source1', 'source2'),
    properties: {
      source1: 3,
      source2: 2
    },
    strictEqual: 1
  });
});

test('subtracts three numbers', function(assert) {
  compute({
    assert,
    computed: difference('source1', 'source2', 'source3'),
    properties: {
      source1: 3,
      source2: 2,
      source3: 1
    },
    strictEqual: 0
  });
});

test('handles all undefined', function(assert) {
  compute({
    assert,
    computed: difference('source1', 'source2'),
    assertion(result) {
      return isNaN(result);
    }
  });
});

test('handles some undefined', function(assert) {
  compute({
    assert,
    computed: difference('source1', 'source2'),
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
    computed: difference(3, 2, 1),
    strictEqual: 0
  });
});

test('allows composing', function(assert) {
  compute({
    assert,
    computed: difference(difference('source1', 'source2'), 'source3'),
    properties: {
      source1: 3,
      source2: 2,
      source3: 1
    },
    strictEqual: 0
  });
});
