import { length } from 'ember-awesome-macros/array';
import { raw } from 'ember-awesome-macros';
import { A as emberA } from '@ember/array';
import { module, test } from 'qunit';
import { compute } from 'ember-macro-helpers/test-support';

let array;

module('Integration | Macro | array | length', function(hooks) {
  hooks.beforeEach(function() {
    array = emberA([0, 0, 0]);
  });

  test('it returns identity if not array type', function(assert) {
    let array = {};

    compute({
      assert,
      computed: length('array'),
      properties: {
        array
      },
      strictEqual: array
    });
  });

  test('it gets length on array', function(assert) {
    compute({
      assert,
      computed: length('array'),
      properties: {
        array
      },
      strictEqual: 3
    });
  });

  test('it responds to length changes', function(assert) {
    let { subject } = compute({
      computed: length('array'),
      properties: {
        array
      }
    });

    array.pushObject(0);

    assert.strictEqual(subject.get('computed'), 4);
  });

  test('composable: it gets length on array', function(assert) {
    compute({
      assert,
      computed: length(raw(array)),
      strictEqual: 3
    });
  });

  test('it handles native arrays', function(assert) {
    compute({
      assert,
      computed: length('array'),
      properties: {
        array: [0, 0, 0]
      },
      strictEqual: 3
    });
  });
});
