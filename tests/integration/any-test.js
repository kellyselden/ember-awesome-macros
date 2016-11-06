import Ember from 'ember';
import { any, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/compute';

const {
  A: newArray
} = Ember;

module('Integration | Macro | any');

test('it returns false if array undefined', function(assert) {
  compute({
    assert,
    computed: any('array'),
    expected: false
  });
});

test('it returns false if not any true', function(assert) {
  compute({
    assert,
    computed: any('array', val => val === 3),
    properties: {
      array: newArray([1, 2])
    },
    expected: false
  });
});

test('it returns true if any true', function(assert) {
  compute({
    assert,
    computed: any('array', val => val === 2),
    properties: {
      array: newArray([1, 2])
    },
    expected: true
  });
});

test('composable: it returns true if any true', function(assert) {
  compute({
    assert,
    computed: any(
      raw(newArray([1, 2])),
      val => val === 2
    ),
    expected: true
  });
});
