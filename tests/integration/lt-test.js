import { lt, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/compute';

module('Integration | Macro | lt');

test('less than returns true', function(assert) {
  compute({
    assert,
    computed: lt('source1', 'source2'),
    properties: {
      source1: 1,
      source2: 2
    },
    expected: true
  });
});

test('equal returns false', function(assert) {
  compute({
    assert,
    computed: lt('source1', 'source2'),
    properties: {
      source1: 2,
      source2: 2
    },
    expected: false
  });
});

test('greater than returns false', function(assert) {
  compute({
    assert,
    computed: lt('source1', 'source2'),
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
    computed: lt(1, 2),
    expected: true
  });
});

test('it handles nesting', function(assert) {
  compute({
    assert,
    computed: lt(raw(1), raw(2)),
    expected: true
  });
});
