import { difference } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/compute';

module('Unit | Macro | difference');

test('returns zero if no keys', function(assert) {
  compute({
    assert,
    computed: difference(),
    expected: 0
  });
});

test('returns identity if one number', function(assert) {
  compute({
    assert,
    computed: difference('source1'),
    properties: {
      source1: 3
    },
    expected: 3
  });
});

test('subtracts two numbers', function(assert) {
  compute({
    assert,
    computed: difference('source1', 'source2'),
    properties: {
      source1: 3,
      source2: 2
    },
    expected: 1
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
    expected: 0
  });
});

test('handles all undefined', function(assert) {
  compute({
    assert,
    computed: difference('source1', 'source2'),
    expected: 0
  });
});

test('handles some undefined', function(assert) {
  compute({
    assert,
    computed: difference('source1', 'source2'),
    properties: {
      source1: 3
    },
    expected: 3
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
    expected: 0
  });
});
