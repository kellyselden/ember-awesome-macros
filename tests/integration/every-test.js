import Ember from 'ember';
import { every, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

const {
  A: newArray
} = Ember;

module('Integration | Macro | every');

test('it returns false if array undefined', function(assert) {
  compute({
    assert,
    computed: every('array'),
    strictEqual: false
  });
});

test('it returns false if not all true', function(assert) {
  compute({
    assert,
    computed: every('array', result => result === 1),
    properties: {
      array: newArray([1, 2])
    },
    strictEqual: false
  });
});

test('it returns true if all true', function(assert) {
  compute({
    assert,
    computed: every('array', result => result === 1),
    properties: {
      array: newArray([1, 1])
    },
    strictEqual: true
  });
});

test('composable: it returns true if all true', function(assert) {
  compute({
    assert,
    computed: every(
      raw(newArray([1, 1])),
      result => result === 1
    ),
    strictEqual: true
  });
});
