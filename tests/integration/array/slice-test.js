import { slice } from 'ember-awesome-macros/array';
import { raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

module('Integration | Macro | array | slice');

test('it returns undefined if array undefined', function(assert) {
  compute({
    assert,
    computed: slice('array', 'begin', 'end'),
    strictEqual: undefined
  });
});

test('it calls slice on array', function(assert) {
  compute({
    assert,
    computed: slice('array', 'begin', 'end'),
    properties: {
      array: [1, 2, 1, 2],
      begin: 1,
      end: 3
    },
    deepEqual: [2, 1]
  });
});

test('values: it calls slice on array', function(assert) {
  compute({
    assert,
    computed: slice(
      [1, 2, 1, 2],
      1,
      3
    ),
    deepEqual: [2, 1]
  });
});

test('composable: it calls slice on array', function(assert) {
  compute({
    assert,
    computed: slice(
      raw([1, 2, 1, 2]),
      raw(1),
      raw(3)
    ),
    deepEqual: [2, 1]
  });
});
