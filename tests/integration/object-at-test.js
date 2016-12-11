import get from 'ember-metal/get';
import { A as emberArray } from 'ember-array/utils';
import { objectAt } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

let array;

module('Integration | Macro | object at', {
  beforeEach() {
    array = emberArray(['my value']);
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
  let { obj } = compute({
    computed: objectAt('array', 'source'),
    properties: {
      array,
      source: 0
    }
  });

  array.popObject();

  assert.strictEqual(get(obj, 'computed'), undefined);
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
