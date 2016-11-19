import get from 'ember-metal/get';
import { A as emberArray } from 'ember-array/utils';
import { first } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/compute';

let array;

module('Integration | Macro | first', {
  beforeEach() {
    array = emberArray(['test1', 'test2']);
  }
});

test('default', function(assert) {
  compute({
    assert,
    computed: first('array'),
    properties: {
      array
    },
    strictEqual: 'test1'
  });
});

test('handles array changes', function(assert) {
  let { obj } = compute({
    computed: first('array'),
    properties: {
      array
    }
  });

  array.removeAt(0);

  assert.strictEqual(get(obj, 'computed'), 'test2');
});
