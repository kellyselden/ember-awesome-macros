import { bool, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import { compute } from 'ember-macro-helpers/test-support';

module('Integration | Macro | bool', function() {
  test('bool returns false', function(assert) {
    compute({
      assert,
      computed: bool('source'),
      strictEqual: false
    });
  });

  test('bool returns true', function(assert) {
    compute({
      assert,
      computed: bool('source'),
      properties: {
        source: 123
      },
      strictEqual: true
    });
  });

  test('it handles values', function(assert) {
    compute({
      assert,
      computed: bool(123),
      strictEqual: true
    });
  });

  test('it handles composing', function(assert) {
    compute({
      assert,
      computed: bool(raw(123)),
      strictEqual: true
    });
  });
});
