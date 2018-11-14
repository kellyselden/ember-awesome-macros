import { uniqBy } from 'ember-awesome-macros/array';
import { raw } from 'ember-awesome-macros';
import { A as emberA } from '@ember/array';
import { module, test } from 'qunit';
import { compute } from 'ember-macro-helpers/test-support';

module('Integration | Macro | array | unique by', function() {
  test('it returns empty array if not array type', function(assert) {
    compute({
      assert,
      computed: uniqBy('array'),
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
      computed: uniqBy('array', 'key'),
      properties: {
        array,
        key: true
      },
      strictEqual: array
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

  test('it handles native arrays', function(assert) {
    compute({
      assert,
      computed: uniqBy('array', 'key'),
      properties: {
        array: [{ test: 1 }, { test: 1 }],
        key: 'test'
      },
      deepEqual: [{ test: 1 }]
    });
  });
});
