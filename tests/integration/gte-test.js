import { gte, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/compute';

module('Integration | Macro | gte');

test('less than returns false', function(assert) {
  compute({
    assert,
    computed: gte('source1', 'source2'),
    properties: {
      source1: 1,
      source2: 2
    },
    expected: false
  });
});

test('equal returns true', function(assert) {
  compute({
    assert,
    computed: gte('source1', 'source2'),
    properties: {
      source1: 2,
      source2: 2
    },
    expected: true
  });
});

test('greater than returns true', function(assert) {
  compute({
    assert,
    computed: gte('source1', 'source2'),
    properties: {
      source1: 2,
      source2: 1
    },
    expected: true
  });
});

test('it handles numbers', function(assert) {
  compute({
    assert,
    computed: gte(2, 1),
    expected: true
  });
});

test('it handles nesting', function(assert) {
  compute({
    assert,
    computed: gte(raw(2), raw(1)),
    expected: true
  });
});
