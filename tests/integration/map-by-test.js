import { mapBy, raw } from 'ember-awesome-macros';
import { A as emberA } from 'ember-array/utils';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

module('Integration | Macro | map by');

test('it returns undefined if array undefined', function(assert) {
  compute({
    assert,
    computed: mapBy('array', 'key', 'value'),
    strictEqual: undefined
  });
});

test('it returns original array if key undefined', function(assert) {
  compute({
    assert,
    computed: mapBy('array', 'key', 'value'),
    properties: {
      array: emberA([{ test: 1 }, { test: 2 }])
    },
    deepEqual: [{ test: 1 }, { test: 2 }]
  });
});

test('it maps array by key', function(assert) {
  compute({
    assert,
    computed: mapBy('array', 'key', 'value'),
    properties: {
      array: emberA([{ test: 1 }, { test: 2 }]),
      key: 'test'
    },
    deepEqual: [1, 2]
  });
});

test('composable: it maps array by key', function(assert) {
  compute({
    assert,
    computed: mapBy(
      raw(emberA([{ test: 1 }, { test: 2 }])),
      raw('test')
    ),
    deepEqual: [1, 2]
  });
});
