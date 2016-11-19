import get from 'ember-metal/get';
import { A as emberArray } from 'ember-array/utils';
import { last } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/compute';

let array;

module('Integration | Macro | last', {
  beforeEach() {
    array = emberArray(['test1', 'test2']);
  }
});

test('default', function(assert) {
  compute({
    assert,
    computed: last('array'),
    properties: {
      array
    },
    strictEqual: 'test2'
  });
});

test('handles array changes', function(assert) {
  let { obj } = compute({
    computed: last('array'),
    properties: {
      array
    }
  });

  array.removeAt(1);

  assert.strictEqual(get(obj, 'computed'), 'test1');
});
