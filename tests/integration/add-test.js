import { add } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/compute';

module('Integration | Macro | add');

test('returns zero if no keys', function(assert) {
  compute({
    assert,
    computed: add(),
    strictEqual: 0
  });
});

test('returns identity if one number', function(assert) {
  compute({
    assert,
    computed: add('source1'),
    properties: {
      source1: 1
    },
    strictEqual: 1
  });
});

test('adds two numbers', function(assert) {
  compute({
    assert,
    computed: add('source1', 'source2'),
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
    computed: add('source1', 'source2', 'source3'),
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
    computed: add('source1', 'source2'),
    strictEqual: 0
  });
});

test('handles some undefined', function(assert) {
  compute({
    assert,
    computed: add('source1', 'source2'),
    properties: {
      source1: 1
    },
    strictEqual: 1
  });
});

test('allows raw numbers', function(assert) {
  compute({
    assert,
    computed: add(1, 2, 3),
    strictEqual: 6
  });
});

test('allows composing', function(assert) {
  compute({
    assert,
    computed: add(add('source1', 'source2'), 'source3'),
    properties: {
      source1: 1,
      source2: 2,
      source3: 3
    },
    strictEqual: 6
  });
});
