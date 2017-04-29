import { without } from 'ember-awesome-macros/array';
import { raw } from 'ember-awesome-macros';
import { A as emberA } from 'ember-array/utils';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

module('Integration | Macro | array | without');

test('it returns undefined if array undefined', function(assert) {
  compute({
    assert,
    computed: without('array', 'item'),
    strictEqual: undefined
  });
});

test('it calls without on array', function(assert) {
  compute({
    assert,
    computed: without('array', 'item'),
    properties: {
      array: emberA([1, 2, 1, 2]),
      item: 1
    },
    deepEqual: [2, 2]
  });
});

test('values: it calls without on array', function(assert) {
  compute({
    assert,
    computed: without(
      emberA([1, 2, 1, 2]),
      1
    ),
    deepEqual: [2, 2]
  });
});

test('composable: it calls without on array', function(assert) {
  compute({
    assert,
    computed: without(
      raw(emberA([1, 2, 1, 2])),
      raw(1)
    ),
    deepEqual: [2, 2]
  });
});
