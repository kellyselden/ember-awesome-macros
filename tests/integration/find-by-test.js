import { findBy, raw } from 'ember-awesome-macros';
import { A as emberA } from 'ember-array/utils';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

module('Integration | Macro | find by');

test('it returns undefined if array undefined', function(assert) {
  compute({
    assert,
    computed: findBy('array', 'key', 'value'),
    strictEqual: undefined
  });
});

test('it returns undefined if key undefined', function(assert) {
  compute({
    assert,
    computed: findBy('array', 'key', 'value'),
    properties: {
      array: emberA([{ test: 'val1' }, { test: 'val2' }])
    },
    strictEqual: undefined
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
