import { last } from 'ember-awesome-macros/array';
import { get } from '@ember/object';
import { A as emberA } from '@ember/array';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

let array;

module('Integration | Macro | array | last', function(hooks) {
  hooks.beforeEach(function() {
    array = emberA(['test1', 'test2']);
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
    let { subject } = compute({
      computed: last('array'),
      properties: {
        array
      }
    });

    array.removeAt(1);

    assert.strictEqual(get(subject, 'computed'), 'test1');
  });

  test('it handles native arrays', function(assert) {
    compute({
      assert,
      computed: last('array'),
      properties: {
        array: ['test1', 'test2']
      },
      strictEqual: 'test2'
    });
  });
});
