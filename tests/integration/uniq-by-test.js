import { uniqBy, raw } from 'ember-awesome-macros';
import { A as emberA } from 'ember-array/utils';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

module('Integration | Macro | unique by');

test('it returns undefined if array undefined', function(assert) {
  compute({
    assert,
    computed: uniqBy('array', 'key'),
    strictEqual: undefined
  });
});

test('it returns original array if key undefined', function(assert) {
  compute({
    assert,
    computed: uniqBy('array', 'key'),
    properties: {
      array: emberA([{ test: 1 }, { test: 1 }])
    },
    deepEqual: [{ test: 1 }, { test: 1 }]
  });
});

test('it returns unique objects by key', function(assert) {
  compute({
    assert,
    computed: uniqBy('array', 'key'),
    properties: {
      array: emberA([{ test: 1 }, { test: 1 }]),
      key: 'test'
    },
    deepEqual: [{ test: 1 }]
  });
});

test('composable: it returns unique objects by key', function(assert) {
  compute({
    assert,
    computed: uniqBy(
      raw(emberA([{ test: 1 }, { test: 1 }])),
      raw('test')
    ),
    deepEqual: [{ test: 1 }]
  });
});
