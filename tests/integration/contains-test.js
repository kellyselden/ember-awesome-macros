import { get } from '@ember/object';
import { A as emberA } from '@ember/array';
import { contains, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import { compute } from 'ember-macro-helpers/test-support';

let array;

module('Integration | Macro | contains', function(hooks) {
  hooks.beforeEach(function() {
    array = emberA(['my value']);
  });

  test('it returns true if found', function(assert) {
    compute({
      assert,
      computed: contains('array', 'source'),
      properties: {
        array,
        source: 'my value'
      },
      strictEqual: true
    });
  });

  test('it returns false if not found', function(assert) {
    compute({
      assert,
      computed: contains('array', 'source'),
      properties: {
        array,
        source: 'my value 2'
      },
      strictEqual: false
    });
  });

  test('it returns false if popped', function(assert) {
    let { subject } = compute({
      computed: contains('array', 'source'),
      properties: {
        array,
        source: 'my value'
      }
    });

    array.popObject();

    assert.strictEqual(get(subject, 'computed'), false);
  });

  test('it returns false if not array', function(assert) {
    compute({
      assert,
      computed: contains('array', 'source'),
      strictEqual: false
    });
  });

  test('it handles nesting', function(assert) {
    compute({
      assert,
      computed: contains(array, raw('my value')),
      strictEqual: true
    });
  });
});
