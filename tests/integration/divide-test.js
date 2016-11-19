import { divide } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/compute';

module('Integration | Macro | divide');

test('returns zero if no keys', function(assert) {
  compute({
    assert,
    computed: divide(),
    strictEqual: 0
  });
});

test('returns identity if one number', function(assert) {
  compute({
    assert,
    computed: divide('source1'),
    properties: {
      source1: 3
    },
    strictEqual: 3
  });
});

test('divides two numbers', function(assert) {
  compute({
    assert,
    computed: divide('source1', 'source2'),
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
    computed: divide('source1', 'source2', 'source3'),
    properties: {
      source1: 3,
      source2: 2,
      source3: 1
    },
    strictEqual: 1.5
  });
});

test('handles all undefined', function(assert) {
  compute({
    assert,
    computed: divide('source1', 'source2'),
    strictEqual: 0
  });
});

test('handles some undefined', function(assert) {
  compute({
    assert,
    computed: divide('source1', 'source2'),
    properties: {
      source1: 3
    },
    strictEqual: 3
  });
});

test('allows raw numbers', function(assert) {
  compute({
    assert,
    computed: divide(3, 2, 1),
    strictEqual: 1.5
  });
});

test('allows composing', function(assert) {
  compute({
    assert,
    computed: divide(divide('source1', 'source2'), 'source3'),
    properties: {
      source1: 3,
      source2: 2,
      source3: 1
    },
    strictEqual: 1.5
  });
});
