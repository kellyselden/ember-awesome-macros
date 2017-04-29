import { lastIndexOf } from 'ember-awesome-macros/array';
import { raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

module('Integration | Macro | array | last index of');

test('it returns -1 if array undefined', function(assert) {
  compute({
    assert,
    computed: lastIndexOf('array', 'value', 'fromIndex'),
    strictEqual: -1
  });
});

test('it calls lastIndexOf on array', function(assert) {
  compute({
    assert,
    computed: lastIndexOf('array', 'value', 'fromIndex'),
    properties: {
      array: [1, 2, 1],
      value: 1,
      fromIndex: 1
    },
    strictEqual: 0
  });
});

test('values: it calls lastIndexOf on array', function(assert) {
  compute({
    assert,
    computed: lastIndexOf(
      [1, 2, 1],
      1,
      1
    ),
    strictEqual: 0
  });
});

test('composable: it calls lastIndexOf on array', function(assert) {
  compute({
    assert,
    computed: lastIndexOf(
      raw([1, 2, 1]),
      raw(1),
      raw(1)
    ),
    strictEqual: 0
  });
});
