import { indexOf } from 'ember-awesome-macros/array';
import { raw } from 'ember-awesome-macros';
import { computed } from '@ember/object';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';
import sinon from 'sinon';

module('Integration | Macro | array | index of');

test('it returns -1 if not array type', function(assert) {
  compute({
    assert,
    computed: indexOf('array'),
    properties: {
      array: {}
    },
    strictEqual: -1
  });
});

test('it calls indexOf on array', function(assert) {
  compute({
    assert,
    computed: indexOf('array', 'value', 'fromIndex'),
    properties: {
      array: [1, 2, 1],
      value: 1,
      fromIndex: 1
    },
    strictEqual: 2
  });
});

test('doesn\'t calculate when unnecessary', function(assert) {
  let callback = sinon.spy();

  compute({
    computed: indexOf(
      undefined,
      computed(callback)
    )
  });

  assert.notOk(callback.called);
});

test('values: it calls indexOf on array', function(assert) {
  compute({
    assert,
    computed: indexOf(
      [1, 2, 1],
      1,
      1
    ),
    strictEqual: 2
  });
});

test('composable: it calls indexOf on array', function(assert) {
  compute({
    assert,
    computed: indexOf(
      raw([1, 2, 1]),
      raw(1),
      raw(1)
    ),
    strictEqual: 2
  });
});

test('it handles native arrays', function(assert) {
  compute({
    assert,
    computed: indexOf('array', 'value', 'fromIndex'),
    properties: {
      array: [1, 2, 1],
      value: 1,
      fromIndex: 1
    },
    strictEqual: 2
  });
});
