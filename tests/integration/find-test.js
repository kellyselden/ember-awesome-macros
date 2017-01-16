import { find, raw } from 'ember-awesome-macros';
import { A as emberA } from 'ember-array/utils';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

module('Integration | Macro | find');

test('it returns undefined if array undefined', function(assert) {
  compute({
    assert,
    computed: find('array'),
    strictEqual: undefined
  });
});

test('it returns undefined if not found', function(assert) {
  compute({
    assert,
    computed: find('array', result => result === 3),
    properties: {
      array: emberA([1, 2])
    },
    strictEqual: undefined
  });
});

test('it returns item if found', function(assert) {
  compute({
    assert,
    computed: find('array', result => result === 2),
    properties: {
      array: emberA([1, 2])
    },
    strictEqual: 2
  });
});

test('composable: it returns item if found', function(assert) {
  compute({
    assert,
    computed: find(
      raw(emberA([1, 2])),
      result => result === 2
    ),
    strictEqual: 2
  });
});
