import { every, raw } from 'ember-awesome-macros';
import { A as emberA } from 'ember-array/utils';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

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
      array: emberA([1, 2])
    },
    strictEqual: false
  });
});

test('it returns true if all true', function(assert) {
  compute({
    assert,
    computed: every('array', result => result === 1),
    properties: {
      array: emberA([1, 1])
    },
    strictEqual: true
  });
});

test('composable: it returns true if all true', function(assert) {
  compute({
    assert,
    computed: every(
      raw(emberA([1, 1])),
      result => result === 1
    ),
    strictEqual: true
  });
});
