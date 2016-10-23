import { equal, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/compute';

module('Unit | Macro | equal');

test('not equal returns false', function(assert) {
  compute({
    assert,
    computed: equal('source1', 'source2'),
    properties: {
      source1: 1,
      source2: 2
    },
    expected: false
  });
});

test('equal but different type returns false', function(assert) {
  compute({
    assert,
    computed: equal('source1', 'source2'),
    properties: {
      source1: '2',
      source2: 2
    },
    expected: false
  });
});

test('equal and same type returns true', function(assert) {
  compute({
    assert,
    computed: equal('source1', 'source2'),
    properties: {
      source1: 2,
      source2: 2
    },
    expected: true
  });
});

test('it handles numbers', function(assert) {
  compute({
    assert,
    computed: equal(2, 2),
    expected: true
  });
});

test('it handles nesting', function(assert) {
  compute({
    assert,
    computed: equal(raw(2), raw(2)),
    expected: true
  });
});
