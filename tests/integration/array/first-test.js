import { first } from 'ember-awesome-macros/array';
import get from 'ember-metal/get';
import { A as emberA } from 'ember-array/utils';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

let array;

module('Integration | Macro | array | first', {
  beforeEach() {
    array = emberA(['test1', 'test2']);
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
