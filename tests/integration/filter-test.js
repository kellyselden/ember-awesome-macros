import Ember from 'ember';
import { filter, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/compute';

const {
  A: newArray
} = Ember;

module('Integration | Macro | filter');

test('it returns empty array if array undefined', function(assert) {
  compute({
    assert,
    computed: filter('array'),
    deepEqual: []
  });
});

test('it returns empty array if not found', function(assert) {
  compute({
    assert,
    computed: filter('array', val => val === 3),
    properties: {
      array: newArray([1, 2])
    },
    deepEqual: []
  });
});

test('it filters array if found', function(assert) {
  compute({
    assert,
    computed: filter('array', val => val === 2),
    properties: {
      array: newArray([1, 2])
    },
    deepEqual: [2]
  });
});

test('composable: it filters array if found', function(assert) {
  compute({
    assert,
    computed: filter(
      raw(newArray([1, 2])),
      val => val === 2
    ),
    deepEqual: [2]
  });
});
