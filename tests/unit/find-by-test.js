import Ember from 'ember';
import { findBy, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/compute';

const {
  A: newArray
} = Ember;

module('Unit | Macro | find by');

test('it returns undefined if array undefined', function(assert) {
  compute({
    assert,
    computed: findBy('array', 'key', 'value'),
    expected: undefined
  });
});

test('it returns undefined if key undefined', function(assert) {
  compute({
    assert,
    computed: findBy('array', 'key', 'value'),
    properties: {
      array: newArray([{ test: 'val1' }, { test: 'val2' }])
    },
    expected: undefined
  });
});

test('it returns undefined if not found', function(assert) {
  compute({
    assert,
    computed: findBy('array', 'key', 'value'),
    properties: {
      array: newArray([{ test: 'val1' }, { test: 'val2' }]),
      key: 'test',
      value: 'val3'
    },
    expected: undefined
  });
});

test('it returns item if found', function(assert) {
  let expected = { test: 'val2' };
  compute({
    assert,
    computed: findBy('array', 'key', 'value'),
    properties: {
      array: newArray([{ test: 'val1' }, expected]),
      key: 'test',
      value: 'val2'
    },
    expected
  });
});

test('it handles raw numbers', function(assert) {
  let expected = { test: 3 };
  compute({
    assert,
    computed: findBy('array', 'key', 3),
    properties: {
      array: newArray([{ test: 2 }, expected]),
      key: 'test'
    },
    expected
  });
});

test('composable: it returns item if found', function(assert) {
  let expected = { test: 'val2' };
  compute({
    assert,
    computed: findBy(
      raw(newArray([{ test: 'val1' }, expected])),
      raw('test'),
      raw('val2')
    ),
    expected
  });
});
