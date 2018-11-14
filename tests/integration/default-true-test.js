import { defaultTrue } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import { compute } from 'ember-macro-helpers/test-support';

module('Integration | Macro | default true', function() {
  test('defaults true', function(assert) {
    compute({
      assert,
      computed: defaultTrue('source'),
      strictEqual: true
    });
  });

  test('false passes through', function(assert) {
    compute({
      assert,
      computed: defaultTrue('source'),
      properties: {
        source: false
      },
      strictEqual: false
    });
  });

  test('true passes through', function(assert) {
    compute({
      assert,
      computed: defaultTrue('source'),
      properties: {
        source: 1
      },
      strictEqual: 1
    });
  });
});
