import { reverse } from 'ember-awesome-macros/array';
import { raw } from 'ember-awesome-macros';
import { A as emberA } from '@ember/array';
import { module, test } from 'qunit';
import { compute } from 'ember-macro-test-helpers';

let array;

module('Integration | Macro | array | reverse', function(hooks) {
  hooks.beforeEach(function() {
    array = emberA([1, 2]);
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

  test('it doesn\'t mutate original array', function(assert) {
    compute({
      computed: reverse('array'),
      properties: {
        array
      }
    });

    assert.deepEqual(array, [1, 2]);
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

  test('it handles native arrays', function(assert) {
    compute({
      assert,
      computed: reverse('array'),
      properties: {
        array: [1, 2]
      },
      deepEqual: [2, 1]
    });
  });
});
