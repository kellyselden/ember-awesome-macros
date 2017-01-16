import { any, raw } from 'ember-awesome-macros';
import { A as emberA } from 'ember-array/utils';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

module('Integration | Macro | any');

test('it returns false if array undefined', function(assert) {
  compute({
    assert,
    computed: any('array'),
    strictEqual: false
  });
});

test('it returns false if not any true', function(assert) {
  compute({
    assert,
    computed: any('array', result => result === 3),
    properties: {
      array: emberA([1, 2])
    },
    strictEqual: false
  });
});

test('it returns true if any true', function(assert) {
  compute({
    assert,
    computed: any('array', result => result === 2),
    properties: {
      array: emberA([1, 2])
    },
    strictEqual: true
  });
});

test('composable: it returns true if any true', function(assert) {
  compute({
    assert,
    computed: any(
      raw(emberA([1, 2])),
      result => result === 2
    ),
    strictEqual: true
  });
});
