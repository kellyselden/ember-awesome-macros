import { mapBy } from 'ember-awesome-macros/array';
import { raw } from 'ember-awesome-macros';
import { A as emberA } from '@ember/array';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

module('Integration | Macro | array | map by', function() {
  test('it returns empty array if not array type', function(assert) {
    compute({
      assert,
      computed: mapBy('array'),
      properties: {
        array: {}
      },
      deepEqual: []
    });
  });

  test('it returns array identity if key not string', function(assert) {
    let array = [];

    compute({
      assert,
      computed: mapBy('array', 'key'),
      properties: {
        array,
        key: true
      },
      strictEqual: array
    });
  });

  test('it maps array by key', function(assert) {
    compute({
      assert,
      computed: mapBy('array', 'key'),
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

  test('it handles native arrays', function(assert) {
    compute({
      assert,
      computed: mapBy('array', 'key'),
      properties: {
        array: [{ test: 1 }, { test: 2 }],
        key: 'test'
      },
      deepEqual: [1, 2]
    });
  });
});
