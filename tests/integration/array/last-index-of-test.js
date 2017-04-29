import { lastIndexOf } from 'ember-awesome-macros/array';
import { raw } from 'ember-awesome-macros';
import computed from 'ember-computed';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';
import sinon from 'sinon';

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

test('doesn\'t calculate when unnecessary', function(assert) {
  let callback = sinon.spy();

  compute({
    computed: lastIndexOf(
      undefined,
      computed(callback)
    )
  });

  assert.notOk(callback.called);
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
