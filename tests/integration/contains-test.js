import get from 'ember-metal/get';
import { A as emberArray } from 'ember-array/utils';
import { contains, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/compute';

let array;

module('Intergration | Macro | contains', {
  beforeEach() {
    array = emberArray(['my value']);
  }
});

test('it returns true if found', function(assert) {
  compute({
    assert,
    computed: contains('array', 'source'),
    properties: {
      array,
      source: 'my value'
    },
    expected: true
  });
});

test('it returns false if not found', function(assert) {
  compute({
    assert,
    computed: contains('array', 'source'),
    properties: {
      array,
      source: 'my value 2'
    },
    expected: false
  });
});

test('it returns false if popped', function(assert) {
  let { obj } = compute({
    computed: contains('array', 'source'),
    properties: {
      array,
      source: 'my value'
    }
  });

  array.popObject();

  assert.strictEqual(get(obj, 'computed'), false);
});

test('it returns false if not array', function(assert) {
  compute({
    assert,
    computed: contains('array', 'source'),
    expected: false
  });
});

test('it handles nesting', function(assert) {
  compute({
    assert,
    computed: contains(array, raw('my value')),
    expected: true
  });
});
