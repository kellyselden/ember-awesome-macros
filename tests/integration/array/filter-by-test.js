import { filterBy } from 'ember-awesome-macros/array';
import { raw } from 'ember-awesome-macros';
import { A as emberA } from '@ember/array';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

module('Integration | Macro | array | filter by', function() {
  test('it returns empty array if not array type', function(assert) {
    compute({
      assert,
      computed: filterBy('array'),
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
      computed: filterBy('array', 'key'),
      properties: {
        array,
        key: true
      },
      strictEqual: array
    });
  });

  test('it returns empty array if not found', function(assert) {
    compute({
      assert,
      computed: filterBy('array', 'key', 'value'),
      properties: {
        array: emberA([{ test: 'val1' }, { test: 'val2' }]),
        key: 'test',
        value: 'val3'
      },
      deepEqual: []
    });
  });

  test('it filters array if found', function(assert) {
    compute({
      assert,
      computed: filterBy('array', 'key', 'value'),
      properties: {
        array: emberA([{ test: 'val1' }, { test: 'val2' }]),
        key: 'test',
        value: 'val2'
      },
      deepEqual: [{ test: 'val2' }]
    });
  });

  test('it filters array by truthiness, if no third argument was given', function(assert) {
    compute({
      assert,
      computed: filterBy('array', 'key'),
      properties: {
        array: emberA([{ test: false }, { test: 'val2' }]),
        key: 'test'
      },
      deepEqual: [{ test: 'val2' }]
    });
  });

  test('it handles raw numbers', function(assert) {
    compute({
      assert,
      computed: filterBy('array', 'key', 3),
      properties: {
        array: emberA([{ test: 2 }, { test: 3 }]),
        key: 'test'
      },
      deepEqual: [{ test: 3 }]
    });
  });

  test('composable: it filters array if found', function(assert) {
    compute({
      assert,
      computed: filterBy(
        raw(emberA([{ test: 'val1' }, { test: 'val2' }])),
        raw('test'),
        raw('val2')
      ),
      deepEqual: [{ test: 'val2' }]
    });
  });

  test('it handles native arrays', function(assert) {
    compute({
      assert,
      computed: filterBy('array', 'key', 'value'),
      properties: {
        array: [{ test: 'val1' }, { test: 'val2' }],
        key: 'test',
        value: 'val2'
      },
      deepEqual: [{ test: 'val2' }]
    });
  });
});
