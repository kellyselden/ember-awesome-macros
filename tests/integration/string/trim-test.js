import { trim } from 'ember-awesome-macros/string';
import { raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

module('Integration | Macro | string | trim', function() {
  test('returns undefined when doesn\'t exist', function(assert) {
    compute({
      assert,
      computed: trim('source'),
      strictEqual: undefined
    });
  });

  test('returns undefined when undefined', function(assert) {
    compute({
      assert,
      computed: trim('source'),
      properties: {
        source: undefined
      },
      strictEqual: undefined
    });
  });

  test('trims string', function(assert) {
    compute({
      assert,
      computed: trim('source'),
      properties: {
        source: ' TestString '
      },
      strictEqual: 'TestString'
    });
  });

  test('returns undefined when composed undefined', function(assert) {
    compute({
      assert,
      computed: trim(raw(undefined)),
      strictEqual: undefined
    });
  });

  test('trims composed string', function(assert) {
    compute({
      assert,
      computed: trim(raw(' TestString ')),
      strictEqual: 'TestString'
    });
  });
});
