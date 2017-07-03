import { divide } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import { A as emberA } from '@ember/array';
import compute from 'ember-macro-test-helpers/compute';

module('Integration | Macro | divide');

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
      source3: 2
    },
    strictEqual: 0.75
  });
});

test('allows empty arrays', function(assert) {
  compute({
    assert,
    computed: divide(emberA()),
    strictEqual: 0
  });
});

test('divides array members', function(assert) {
  compute({
    assert,
    computed: divide(emberA([3, 2]), emberA([1])),
    strictEqual: 1.5
  });
});

test('handles all undefined', function(assert) {
  compute({
    assert,
    computed: divide('source1', 'source2'),
    assertion(result) {
      return isNaN(result);
    }
  });
});

test('handles some undefined', function(assert) {
  compute({
    assert,
    computed: divide('source1', 'source2'),
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
    computed: divide(3, 2, 2),
    strictEqual: 0.75
  });
});

test('allows property expansion', function(assert) {
  compute({
    assert,
    computed: divide('obj.{source1,source2}'),
    properties: {
      obj: {
        source1: 3,
        source2: 2
      }
    },
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
      source3: 2
    },
    strictEqual: 0.75
  });
});
