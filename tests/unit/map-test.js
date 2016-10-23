import { map, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/compute';

module('Unit | Macro | map');

test('it returns undefined if array undefined', function(assert) {
  compute({
    assert,
    computed: map('array'),
    expected: undefined
  });
});

test('it maps array', function(assert) {
  compute({
    assert,
    computed: map('array', item => item.test),
    properties: {
      array: [{ test: 1 }, { test: 2 }]
    },
    deepEqual: [1, 2]
  });
});

test('composable: it maps array', function(assert) {
  compute({
    assert,
    computed: map(
      raw([{ test: 1 }, { test: 2 }]),
      item => item.test
    ),
    deepEqual: [1, 2]
  });
});
