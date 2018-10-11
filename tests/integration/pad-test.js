import { pad, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import { compute } from 'ember-macro-test-helpers';

module('Integration | Macro | pad', function() {
  test('pad returns 001', function(assert) {
    compute({
      assert,
      computed: pad('source1', 'source2'),
      properties: {
        source1: 1,
        source2: 3
      },
      strictEqual: '001'
    });
  });

  test('pad with string source returns 001', function(assert) {
    compute({
      assert,
      computed: pad('source1', 'source2'),
      properties: {
        source1: 1,
        source2: '3'
      },
      strictEqual: '001'
    });
  });

  test('it handles numbers', function(assert) {
    compute({
      assert,
      computed: pad(1, 2),
      strictEqual: '01'
    });
  });

  test('it handles nesting', function(assert) {
    compute({
      assert,
      computed: pad(raw(1), raw(2)),
      strictEqual: '01'
    });
  });
});
