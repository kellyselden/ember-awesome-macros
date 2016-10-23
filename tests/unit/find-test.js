import Ember from 'ember';
import { find, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/compute';

const {
  A: newArray
} = Ember;

module('Unit | Macro | find');

test('it returns undefined if array undefined', function(assert) {
  compute({
    assert,
    computed: find('array'),
    expected: undefined
  });
});

test('it returns undefined if not found', function(assert) {
  compute({
    assert,
    computed: find('array', val => val === 3),
    properties: {
      array: newArray([1, 2])
    },
    expected: undefined
  });
});

test('it returns item if found', function(assert) {
  compute({
    assert,
    computed: find('array', val => val === 2),
    properties: {
      array: newArray([1, 2])
    },
    expected: 2
  });
});

test('composable: it returns item if found', function(assert) {
  compute({
    assert,
    computed: find(
      raw(newArray([1, 2])),
      val => val === 2
    ),
    expected: 2
  });
});
