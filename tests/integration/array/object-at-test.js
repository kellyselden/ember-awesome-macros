import { objectAt } from 'ember-awesome-macros/array';
import { get, computed } from '@ember/object';
import { A as emberA } from '@ember/array';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';
import sinon from 'sinon';

let array;

module('Integration | Macro | array | object at', {
  beforeEach() {
    array = emberA(['my value']);
  }
});

test('it returns identity if not array type', function(assert) {
  let array = {};

  compute({
    assert,
    computed: objectAt('array'),
    properties: {
      array
    },
    strictEqual: array
  });
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

test('it handles native arrays', function(assert) {
  compute({
    assert,
    computed: objectAt('array', 'source'),
    properties: {
      array: ['my value'],
      source: 0
    },
    strictEqual: 'my value'
  });
});
