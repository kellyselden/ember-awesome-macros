import get from 'ember-metal/get';
import { A as emberArray } from 'ember-array/utils';
import { join, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/compute';

const separator = ', ';

let array;

module('Integration | Macro | join', {
  beforeEach() {
    array = emberArray(['test1', 'test2']);
  }
});

test('default', function(assert) {
  compute({
    assert,
    computed: join('array', 'separator'),
    properties: {
      array,
      separator
    },
    strictEqual: 'test1, test2'
  });
});

test('it handles property changes', function(assert) {
  let { obj } = compute({
    computed: join('array', 'separator'),
    properties: {
      array,
      separator
    }
  });

  array.pushObject('test3');

  assert.strictEqual(get(obj, 'computed'), 'test1, test2, test3');
});

test('it handles array undefined', function(assert) {
  compute({
    assert,
    computed: join('array', 'separator'),
    strictEqual: ''
  });
});

test('it handles one element', function(assert) {
  compute({
    assert,
    computed: join('array', 'separator'),
    properties: {
      array: emberArray(['test1'])
    },
    strictEqual: 'test1'
  });
});

test('it handles nesting', function(assert) {
  compute({
    assert,
    computed: join(array, raw(separator)),
    strictEqual: 'test1, test2'
  });
});
