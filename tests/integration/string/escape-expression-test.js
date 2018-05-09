import { escapeExpression } from 'ember-awesome-macros/string';
import { raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import { compute } from 'ember-macro-test-helpers';

module('Integration | Macro | string | escape expression', function() {
  test('returns empty string when doesn\'t exist', function(assert) {
    compute({
      assert,
      computed: escapeExpression('source'),
      strictEqual: ''
    });
  });

  test('returns empty string when undefined', function(assert) {
    compute({
      assert,
      computed: escapeExpression('source'),
      properties: {
        source: undefined
      },
      strictEqual: ''
    });
  });

  test('escapes html', function(assert) {
    compute({
      assert,
      computed: escapeExpression('source'),
      properties: {
        source: '<input>'
      },
      strictEqual: '&lt;input&gt;'
    });
  });

  test('returns empty string when value undefined', function(assert) {
    compute({
      assert,
      computed: escapeExpression(undefined),
      strictEqual: ''
    });
  });

  test('composed escapes html', function(assert) {
    compute({
      assert,
      computed: escapeExpression(raw('<input>')),
      strictEqual: '&lt;input&gt;'
    });
  });
});
