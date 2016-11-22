import { product } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/compute';

module('Integration | Macro | product');

test('multiplies two numbers', function(assert) {
  compute({
    assert,
    computed: product('source1', 'source2'),
    properties: {
      source1: 1,
      source2: 2
    },
    strictEqual: 2
  });
});

test('multiplies three numbers', function(assert) {
  compute({
    assert,
    computed: product('source1', 'source2', 'source3'),
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
    computed: product('source1', 'source2'),
    assertion(val) {
      return isNaN(val);
    }
  });
});

test('handles some undefined', function(assert) {
  compute({
    assert,
    computed: product('source1', 'source2'),
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
    computed: product(1, 2, 3),
    strictEqual: 6
  });
});

test('allows composing', function(assert) {
  compute({
    assert,
    computed: product(product('source1', 'source2'), 'source3'),
    properties: {
      source1: 1,
      source2: 2,
      source3: 3
    },
    strictEqual: 6
  });
});
