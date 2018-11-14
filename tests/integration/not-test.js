import { not } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import { compute } from 'ember-macro-helpers/test-support';

module('Integration | Macro | not', function() {
  test('false returns true', function(assert) {
    compute({
      assert,
      computed: not('source'),
      properties: {
        source: false
      },
      strictEqual: true
    });
  });

  test('true returns false', function(assert) {
    compute({
      assert,
      computed: not('source'),
      properties: {
        source: true
      },
      strictEqual: false
    });
  });

  test('nested: false returns false', function(assert) {
    compute({
      assert,
      computed: not(not('source')),
      properties: {
        source: false
      },
      strictEqual: false
    });
  });

  test('nested: true returns true', function(assert) {
    compute({
      assert,
      computed: not(not('source')),
      properties: {
        source: true
      },
      strictEqual: true
    });
  });
});
