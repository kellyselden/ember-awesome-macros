import { compact } from 'ember-awesome-macros/array';
import { raw } from 'ember-awesome-macros';
import { A as emberA } from '@ember/array';
import { module, test } from 'qunit';
import { compute } from 'ember-macro-test-helpers';

let array;

module('Integration | Macro | array | compact', function(hooks) {
  hooks.beforeEach(function() {
    array = emberA([undefined, 2]);
  });

  test('it returns identity if not array type', function(assert) {
    let array = {};

    compute({
      assert,
      computed: compact('array'),
      properties: {
        array
      },
      strictEqual: array
    });
  });

  test('it calls compact on array', function(assert) {
    compute({
      assert,
      computed: compact('array'),
      properties: {
        array
      },
      deepEqual: [2]
    });
  });

  test('it responds to length changes', function(assert) {
    let { subject } = compute({
      computed: compact('array'),
      properties: {
        array
      }
    });

    array.pushObject(3);

    assert.deepEqual(subject.get('computed'), [2, 3]);
  });

  test('composable: it calls compact on array', function(assert) {
    compute({
      assert,
      computed: compact(
        raw(array)
      ),
      deepEqual: [2]
    });
  });

  test('it handles native arrays', function(assert) {
    compute({
      assert,
      computed: compact('array'),
      properties: {
        array: [undefined, 2]
      },
      deepEqual: [2]
    });
  });
});
