import Ember from 'ember';
import { filterBy, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/compute';

const {
  A: newArray
} = Ember;

module('Unit | Macro | filter by');

test('it returns empty array if array undefined', function(assert) {
  compute({
    assert,
    computed: filterBy('array', 'key', 'value'),
    deepEqual: []
  });
});

test('it returns empty array if key undefined', function(assert) {
  compute({
    assert,
    computed: filterBy('array', 'key', 'value'),
    properties: {
      array: newArray([{ test: 'val1' }, { test: 'val2' }])
    },
    deepEqual: []
  });
});

test('it returns empty array if not found', function(assert) {
  compute({
    assert,
    computed: filterBy('array', 'key', 'value'),
    properties: {
      array: newArray([{ test: 'val1' }, { test: 'val2' }]),
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
      array: newArray([{ test: 'val1' }, { test: 'val2' }]),
      key: 'test',
      value: 'val2'
    },
    deepEqual: [{ test: 'val2' }]
  });
});

test('it handles raw numbers', function(assert) {
  compute({
    assert,
    computed: filterBy('array', 'key', 3),
    properties: {
      array: newArray([{ test: 2 }, { test: 3 }]),
      key: 'test'
    },
    deepEqual: [{ test: 3 }]
  });
});

test('composable: it filters array if found', function(assert) {
  compute({
    assert,
    computed: filterBy(
      raw(newArray([{ test: 'val1' }, { test: 'val2' }])),
      raw('test'),
      raw('val2')
    ),
    deepEqual: [{ test: 'val2' }]
  });
});
