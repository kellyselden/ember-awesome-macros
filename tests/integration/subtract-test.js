import { subtract } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/compute';

module('Integration | Macro | subtract');

test('subtracts two numbers', function(assert) {
  compute({
    assert,
    computed: subtract('source1', 'source2'),
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
    computed: subtract('source1', 'source2', 'source3'),
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
    computed: subtract('source1', 'source2'),
    assertion(val) {
      return isNaN(val);
    }
  });
});

test('handles some undefined', function(assert) {
  compute({
    assert,
    computed: subtract('source1', 'source2'),
    properties: {
      source1: 3
    },
    assertion(val) {
      return isNaN(val);
    }
  });
});

test('allows raw numbers', function(assert) {
  compute({
    assert,
    computed: subtract(3, 2, 1),
    strictEqual: 0
  });
});

test('allows composing', function(assert) {
  compute({
    assert,
    computed: subtract(subtract('source1', 'source2'), 'source3'),
    properties: {
      source1: 3,
      source2: 2,
      source3: 1
    },
    strictEqual: 0
  });
});
