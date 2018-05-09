import { first } from 'ember-awesome-macros/array';
import { get } from '@ember/object';
import { A as emberA } from '@ember/array';
import { module, test } from 'qunit';
import { compute } from 'ember-macro-test-helpers';

let array;

module('Integration | Macro | array | first', function(hooks) {
  hooks.beforeEach(function() {
    array = emberA(['test1', 'test2']);
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

  test('it handles native arrays', function(assert) {
    compute({
      assert,
      computed: first('array'),
      properties: {
        array: ['test1', 'test2']
      },
      strictEqual: 'test1'
    });
  });
});
