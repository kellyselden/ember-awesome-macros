import { isEvery } from 'ember-awesome-macros/array';
import { raw } from 'ember-awesome-macros';
import { A as emberA } from '@ember/array';
import { module, test } from 'qunit';
import { compute } from 'ember-macro-test-helpers';

module('Integration | Macro | array | is every', function() {
  test('it returns undefined if not array type', function(assert) {
    compute({
      assert,
      computed: isEvery('array'),
      properties: {
        array: {}
      },
      strictEqual: undefined
    });
  });

  test('it returns undefined if key not string', function(assert) {
    compute({
      assert,
      computed: isEvery('array', 'key'),
      properties: {
        array: [],
        key: true
      },
      strictEqual: undefined
    });
  });

  test('it calls isEvery on array', function(assert) {
    compute({
      assert,
      computed: isEvery('array', 'key', 'value'),
      properties: {
        array: emberA([{ test: 'val1' }, { test: 'val1' }]),
        key: 'test',
        value: 'val1'
      },
      strictEqual: true
    });
  });

  test('it filters array by truthiness, if no third argument was given', function(assert) {
    compute({
      assert,
      computed: isEvery('array', 'key'),
      properties: {
        array: emberA([{ test: 'val1' }, { test: 'val2' }]),
        key: 'test'
      },
      strictEqual: true
    });
    compute({
      assert,
      computed: isEvery('array', 'key'),
      properties: {
        array: emberA([{ test: false }, { test: 'val2' }]),
        key: 'test'
      },
      strictEqual: false
    });
  });

  test('composable: it calls isEvery on array', function(assert) {
    compute({
      assert,
      computed: isEvery(
        emberA([{ test: 'val1' }, { test: 'val1' }]),
        raw('test'),
        raw('val1')
      ),
      strictEqual: true
    });
  });

  test('it handles native arrays', function(assert) {
    compute({
      assert,
      computed: isEvery('array', 'key', 'value'),
      properties: {
        array: [{ test: 'val1' }, { test: 'val1' }],
        key: 'test',
        value: 'val1'
      },
      strictEqual: true
    });
  });
});
