import Ember from 'ember';
import { mapBy, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/compute';

const {
  A: newArray
} = Ember;

module('Unit | Macro | map by');

test('it returns undefined if array undefined', function(assert) {
  compute({
    assert,
    computed: mapBy('array', 'key', 'value'),
    expected: undefined
  });
});

test('it returns original array if key undefined', function(assert) {
  compute({
    assert,
    computed: mapBy('array', 'key', 'value'),
    properties: {
      array: newArray([{ test: 1 }, { test: 2 }])
    },
    deepEqual: [{ test: 1 }, { test: 2 }]
  });
});

test('it maps array by key', function(assert) {
  compute({
    assert,
    computed: mapBy('array', 'key', 'value'),
    properties: {
      array: newArray([{ test: 1 }, { test: 2 }]),
      key: 'test'
    },
    deepEqual: [1, 2]
  });
});

test('composable: it maps array by key', function(assert) {
  compute({
    assert,
    computed: mapBy(
      raw(newArray([{ test: 1 }, { test: 2 }])),
      raw('test')
    ),
    deepEqual: [1, 2]
  });
});
