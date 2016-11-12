import get from 'ember-metal/get';
import { A as emberArray } from 'ember-array/utils';
import { objectAt } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/compute';

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
    expected: 'my value'
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
    expected: undefined
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
    expected: undefined
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
    expected: 'my value'
  });
});
