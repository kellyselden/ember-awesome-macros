import { reverse } from 'ember-awesome-macros/array';
import { raw } from 'ember-awesome-macros';
import { A as emberA } from 'ember-array/utils';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

let array;

module('Integration | Macro | array | reverse', {
  beforeEach() {
    array = emberA([1, 2]);
  }
});

test('it returns undefined if array undefined', function(assert) {
  compute({
    assert,
    computed: reverse('array'),
    strictEqual: undefined
  });
});

test('it calls reverse on array', function(assert) {
  compute({
    assert,
    computed: reverse('array'),
    properties: {
      array
    },
    deepEqual: [2, 1]
  });
});

test('it responds to length changes', function(assert) {
  let { subject } = compute({
    computed: reverse('array'),
    properties: {
      array
    }
  });

  array.pushObject(3);

  assert.deepEqual(subject.get('computed'), [3, 2, 1]);
});

test('composable: it calls reverse on array', function(assert) {
  compute({
    assert,
    computed: reverse(
      raw(array)
    ),
    deepEqual: [2, 1]
  });
});
