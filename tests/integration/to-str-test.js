import raw from 'ember-macro-helpers/raw';
import { toStr } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

module('Integration | Macro | to str', function() {
  test('it returns undefined if obj undefined', function(assert) {
    compute({
      assert,
      computed: toStr('obj'),
      strictEqual: undefined
    });
  });

  test('it calls toString on obj', function(assert) {
    compute({
      assert,
      computed: toStr('obj', 'arg'),
      properties: {
        obj: 254,
        arg: 16
      },
      strictEqual: 'fe'
    });
  });

  test('value: it calls toString on obj', function(assert) {
    compute({
      assert,
      computed: toStr(254, 16),
      strictEqual: 'fe'
    });
  });

  test('composable: it calls toString on obj', function(assert) {
    compute({
      assert,
      computed: toStr(raw(254), raw(16)),
      strictEqual: 'fe'
    });
  });
});
