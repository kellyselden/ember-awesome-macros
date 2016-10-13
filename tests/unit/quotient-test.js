import { quotient } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/arithmetic';

module('Unit | Macro | quotient');

test('returns zero if no keys', function(assert) {
  compute({
    assert,
    computed: quotient(),
    expected: 0
  });
});

test('returns identity if one number', function(assert) {
  compute({
    assert,
    computed: quotient('source1'),
    properties: {
      source1: 3
    },
    expected: 3
  });
});

test('divides two numbers', function(assert) {
  compute({
    assert,
    computed: quotient('source1', 'source2'),
    properties: {
      source1: 3,
      source2: 2
    },
    expected: 1.5
  });
});

test('divides three numbers', function(assert) {
  compute({
    assert,
    computed: quotient('source1', 'source2', 'source3'),
    properties: {
      source1: 3,
      source2: 2,
      source3: 1
    },
    expected: 1.5
  });
});

test('handles all undefined', function(assert) {
  compute({
    assert,
    computed: quotient('source1', 'source2'),
    expected: 0
  });
});

test('handles some undefined', function(assert) {
  compute({
    assert,
    computed: quotient('source1', 'source2'),
    properties: {
      source1: 3
    },
    expected: 3
  });
});

test('allows composing', function(assert) {
  compute({
    assert,
    computed: quotient(quotient('source1', 'source2'), 'source3'),
    properties: {
      source1: 3,
      source2: 2,
      source3: 1
    },
    expected: 1.5
  });
});
