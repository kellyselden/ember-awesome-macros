import { findBy } from 'ember-awesome-macros/array';
import { raw } from 'ember-awesome-macros';
import { A as emberA } from '@ember/array';
import { module, test } from 'qunit';
import { compute } from 'ember-macro-test-helpers';

module('Integration | Macro | array | find by', function() {
  test('it returns undefined if not array type', function(assert) {
    compute({
      assert,
      computed: findBy('array'),
      properties: {
        array: {}
      },
      strictEqual: undefined
    });
  });

  test('it returns array identity if key not string', function(assert) {
    let array = [];

    compute({
      assert,
      computed: findBy('array', 'key'),
      properties: {
        array,
        key: true
      },
      strictEqual: array
    });
  });

  test('it returns undefined if not found', function(assert) {
    compute({
      assert,
      computed: findBy('array', 'key', 'value'),
      properties: {
        array: emberA([{ test: 'val1' }, { test: 'val2' }]),
        key: 'test',
        value: 'val3'
      },
      strictEqual: undefined
    });
  });

  test('it returns item if found', function(assert) {
    let expected = { test: 'val2' };
    compute({
      assert,
      computed: findBy('array', 'key', 'value'),
      properties: {
        array: emberA([{ test: 'val1' }, expected]),
        key: 'test',
        value: 'val2'
      },
      strictEqual: expected
    });
  });

  test('it handles raw numbers', function(assert) {
    let expected = { test: 3 };
    compute({
      assert,
      computed: findBy('array', 'key', 3),
      properties: {
        array: emberA([{ test: 2 }, expected]),
        key: 'test'
      },
      strictEqual: expected
    });
  });

  test('composable: it returns item if found', function(assert) {
    let expected = { test: 'val2' };
    compute({
      assert,
      computed: findBy(
        raw(emberA([{ test: 'val1' }, expected])),
        raw('test'),
        raw('val2')
      ),
      strictEqual: expected
    });
  });

  test('it handles native arrays', function(assert) {
    let expected = { test: 'val2' };
    compute({
      assert,
      computed: findBy('array', 'key', 'value'),
      properties: {
        array: [{ test: 'val1' }, expected],
        key: 'test',
        value: 'val2'
      },
      strictEqual: expected
    });
  });
});
