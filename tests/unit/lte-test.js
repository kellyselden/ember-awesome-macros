import { lte, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/compute';

module('Unit | Macro | lte');

test('less than returns true', function(assert) {
  compute({
    assert,
    computed: lte('source1', 'source2'),
    properties: {
      source1: 1,
      source2: 2
    },
    expected: true
  });
});

test('equal returns true', function(assert) {
  compute({
    assert,
    computed: lte('source1', 'source2'),
    properties: {
      source1: 2,
      source2: 2
    },
    expected: true
  });
});

test('greater than returns false', function(assert) {
  compute({
    assert,
    computed: lte('source1', 'source2'),
    properties: {
      source1: 2,
      source2: 1
    },
    expected: false
  });
});

test('it handles numbers', function(assert) {
  compute({
    assert,
    computed: lte(1, 2),
    expected: true
  });
});

test('it handles nesting', function(assert) {
  compute({
    assert,
    computed: lte(raw(1), raw(2)),
    expected: true
  });
});
