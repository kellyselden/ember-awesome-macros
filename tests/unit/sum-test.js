import { sum } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/compute';

module('Unit | Macro | sum');

test('returns zero if no keys', function(assert) {
  compute({
    assert,
    computed: sum(),
    expected: 0
  });
});

test('returns identity if one number', function(assert) {
  compute({
    assert,
    computed: sum('source1'),
    properties: {
      source1: 1
    },
    expected: 1
  });
});

test('adds two numbers', function(assert) {
  compute({
    assert,
    computed: sum('source1', 'source2'),
    properties: {
      source1: 1,
      source2: 2
    },
    expected: 3
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
    expected: 6
  });
});

test('handles all undefined', function(assert) {
  compute({
    assert,
    computed: sum('source1', 'source2'),
    expected: 0
  });
});

test('handles some undefined', function(assert) {
  compute({
    assert,
    computed: sum('source1', 'source2'),
    properties: {
      source1: 1
    },
    expected: 1
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
    expected: 6
  });
});
