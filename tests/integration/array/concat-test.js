import { concat } from 'ember-awesome-macros/array';
import { raw } from 'ember-awesome-macros';
import { A as emberArray } from 'ember-array/utils';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

const value1 = 'value 1 test';
const value2 = 'value 2 test';

let array;

module('Integration | Macro | array | concat', {
  beforeEach() {
    array = emberArray([0]);
  }
});

test('it returns undefined if array undefined', function(assert) {
  compute({
    assert,
    computed: concat('array'),
    strictEqual: undefined
  });
});

test('it calls concat on array', function(assert) {
  compute({
    assert,
    computed: concat('array', 'value1', 'value2'),
    properties: {
      array,
      value1,
      value2
    },
    deepEqual: [0, value1, value2]
  });
});

test('it responds to length changes', function(assert) {
  let { subject } = compute({
    computed: concat('array', 'value1', 'value2'),
    properties: {
      array,
      value1,
      value2
    }
  });

  array.pushObject(0);

  assert.deepEqual(subject.get('computed'), [0, 0, value1, value2]);
});

test('composable: it calls concat on array', function(assert) {
  compute({
    assert,
    computed: concat(
      raw(array),
      raw(value1),
      raw(value2)
    ),
    deepEqual: [0, value1, value2]
  });
});
