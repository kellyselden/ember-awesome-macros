import get from 'ember-metal/get';
import { A as emberArray } from 'ember-array/utils';
import { includes, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

let array;

module('Intergration | Macro | includes', {
  beforeEach() {
    array = emberArray(['my value']);
  }
});

test('it returns true if found', function(assert) {
  compute({
    assert,
    computed: includes('array', 'source'),
    properties: {
      array,
      source: 'my value'
    },
    strictEqual: true
  });
});

test('it returns false if not found', function(assert) {
  compute({
    assert,
    computed: includes('array', 'source'),
    properties: {
      array,
      source: 'my value 2'
    },
    strictEqual: false
  });
});

test('it returns false if popped', function(assert) {
  let { obj } = compute({
    computed: includes('array', 'source'),
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
    computed: includes('array', 'source'),
    strictEqual: false
  });
});

test('it handles nesting', function(assert) {
  compute({
    assert,
    computed: includes(array, raw('my value')),
    strictEqual: true
  });
});
