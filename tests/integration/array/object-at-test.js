import { objectAt } from 'ember-awesome-macros/array';
import get from 'ember-metal/get';
import { A as emberA } from 'ember-array/utils';
import computed from 'ember-computed';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';
import sinon from 'sinon';

let array;

module('Integration | Macro | array | object at', {
  beforeEach() {
    array = emberA(['my value']);
  }
});

test('it returns object if found', function(assert) {
  compute({
    assert,
    computed: objectAt('array', 'source'),
    properties: {
      array,
      source: 0
    },
    strictEqual: 'my value'
  });
});

test('it returns undefined if not found', function(assert) {
  compute({
    assert,
    computed: objectAt('array', 'source'),
    properties: {
      array,
      source: 'my value 2'
    },
    strictEqual: undefined
  });
});

test('it returns undefined if popped', function(assert) {
  let { subject } = compute({
    computed: objectAt('array', 'source'),
    properties: {
      array,
      source: 0
    }
  });

  array.popObject();

  assert.strictEqual(get(subject, 'computed'), undefined);
});

test('it returns undefined if not array', function(assert) {
  compute({
    assert,
    computed: objectAt('array', 'source'),
    strictEqual: undefined
  });
});

test('it handles nesting', function(assert) {
  compute({
    assert,
    computed: objectAt(array, 0),
    properties: {
      array,
      source: 0
    },
    strictEqual: 'my value'
  });
});

test('doesn\'t calculate when unnecessary', function(assert) {
  let callback = sinon.spy();

  compute({
    computed: find(
      undefined,
      computed(callback)
    )
  });

  assert.notOk(callback.called);
});
