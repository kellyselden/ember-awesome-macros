import { nand } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import { compute } from 'ember-macro-helpers/test-support';

module('Integration | Macro | nand', function() {
  test('all false returns true', function(assert) {
    compute({
      assert,
      computed: nand('source1', 'source2', 'source3'),
      properties: {
        source1: false,
        source2: false,
        source3: false
      },
      strictEqual: true
    });
  });

  test('mixed values returns true', function(assert) {
    compute({
      assert,
      computed: nand('source1', 'source2', 'source3'),
      properties: {
        source1: false,
        source2: true,
        source3: false
      },
      strictEqual: true
    });
  });

  test('all true returns false', function(assert) {
    compute({
      assert,
      computed: nand('source1', 'source2', 'source3'),
      properties: {
        source1: true,
        source2: true,
        source3: true
      },
      strictEqual: false
    });
  });
});
