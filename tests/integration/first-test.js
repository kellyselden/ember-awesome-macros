import get from 'ember-metal/get';
import { A as emberArray } from 'ember-array/utils';
import { first } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

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
  let { subject } = compute({
    computed: first('array'),
    properties: {
      array
    }
  });

  array.removeAt(0);

  assert.strictEqual(get(subject, 'computed'), 'test2');
});
