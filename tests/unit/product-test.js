import { product } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/compute';

module('Unit | Macro | product');

test('returns zero if no keys', function(assert) {
  compute({
    assert,
    computed: product(),
    expected: 0
  });
});

test('returns identity if one number', function(assert) {
  compute({
    assert,
    computed: product('source1'),
    properties: {
      source1: 1
    },
    expected: 1
  });
});

test('multiplies two numbers', function(assert) {
  compute({
    assert,
    computed: product('source1', 'source2'),
    properties: {
      source1: 1,
      source2: 2
    },
    expected: 2
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
    expected: 6
  });
});

test('handles all undefined', function(assert) {
  compute({
    assert,
    computed: product('source1', 'source2'),
    expected: 0
  });
});

test('handles some undefined', function(assert) {
  compute({
    assert,
    computed: product('source1', 'source2'),
    properties: {
      source1: 1
    },
    expected: 1
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
    expected: 6
  });
});
