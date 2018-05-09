import { number } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import { compute } from 'ember-macro-test-helpers';

module('Integration | Macro | number', function() {
  test('it returns NaN if prop is undefined', function(assert) {
    compute({
      assert,
      computed: number('prop'),
      assertion(result) {
        return isNaN(result);
      }
    });
  });

  test('it calls Number on property', function(assert) {
    let { result } = compute({
      computed: number('prop'),
      properties: {
        prop: 123.4
      }
    });

    assert.strictEqual(result, 123.4);
  });

  test('it converts boolean true to 1', function(assert) {
    let { result } = compute({
      computed: number('prop'),
      properties: {
        prop: true
      }
    });

    assert.strictEqual(result, 1);
  });

  test('it converts boolean false to 0', function(assert) {
    let { result } = compute({
      computed: number('prop'),
      properties: {
        prop: false
      }
    });

    assert.strictEqual(result, 0);
  });

  test('it converts strings into NaN', function(assert) {
    compute({
      assert,
      computed: number('prop'),
      properties: {
        prop: 'foo'
      },
      assertion(result) {
        return isNaN(result);
      }
    });
  });
});
