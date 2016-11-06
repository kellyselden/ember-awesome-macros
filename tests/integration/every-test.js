import Ember from 'ember';
import { every, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/compute';

const {
  A: newArray
} = Ember;

module('Integration | Macro | every');

test('it returns false if array undefined', function(assert) {
  compute({
    assert,
    computed: every('array'),
    expected: false
  });
});

test('it returns false if not all true', function(assert) {
  compute({
    assert,
    computed: every('array', val => val === 1),
    properties: {
      array: newArray([1, 2])
    },
    expected: false
  });
});

test('it returns true if all true', function(assert) {
  compute({
    assert,
    computed: every('array', val => val === 1),
    properties: {
      array: newArray([1, 1])
    },
    expected: true
  });
});

test('composable: it returns true if all true', function(assert) {
  compute({
    assert,
    computed: every(
      raw(newArray([1, 1])),
      val => val === 1
    ),
    expected: true
  });
});
