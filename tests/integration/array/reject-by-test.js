import { rejectBy } from 'ember-awesome-macros/array';
import { raw } from 'ember-awesome-macros';
import { A as emberA } from '@ember/array';
import { module, test } from 'qunit';
import { compute } from 'ember-macro-helpers/test-support';

module('Integration | Macro | array | reject by', function() {
  test('it returns empty array if not array type', function(assert) {
    compute({
      assert,
      computed: rejectBy('array'),
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
      computed: rejectBy('array', 'key'),
      properties: {
        array,
        key: true
      },
      strictEqual: array
    });
  });

  test('it returns the original array if not found', function(assert) {
    compute({
      assert,
      computed: rejectBy('array', 'key', 'value'),
      properties: {
        array: emberA([{ test: 'val1' }, { test: 'val2' }]),
        key: 'test',
        value: 'val3'
      },
      deepEqual: [{ test: 'val1' }, { test: 'val2' }]
    });
  });

  test('it filters array if found', function(assert) {
    compute({
      assert,
      computed: rejectBy('array', 'key', 'value'),
      properties: {
        array: emberA([{ test: 'val1' }, { test: 'val2' }]),
        key: 'test',
        value: 'val2'
      },
      deepEqual: [{ test: 'val1' }]
    });
  });

  test('it filters array by truthiness, if no third argument was given', function(assert) {
    compute({
      assert,
      computed: rejectBy('array', 'key'),
      properties: {
        array: emberA([{ test: false }, { test: 'val2' }]),
        key: 'test'
      },
      deepEqual: [{ test: false }]
    });
  });

  test('it handles raw numbers', function(assert) {
    compute({
      assert,
      computed: rejectBy('array', 'key', 3),
      properties: {
        array: emberA([{ test: 2 }, { test: 3 }]),
        key: 'test'
      },
      deepEqual: [{ test: 2 }]
    });
  });

  test('composable: it filters array if found', function(assert) {
    compute({
      assert,
      computed: rejectBy(
        raw(emberA([{ test: 'val1' }, { test: 'val2' }])),
        raw('test'),
        raw('val2')
      ),
      deepEqual: [{ test: 'val1' }]
    });
  });

  test('it handles native arrays', function(assert) {
    compute({
      assert,
      computed: rejectBy('array', 'key', 'value'),
      properties: {
        array: [{ test: 'val1' }, { test: 'val2' }],
        key: 'test',
        value: 'val2'
      },
      deepEqual: [{ test: 'val1' }]
    });
  });
});
