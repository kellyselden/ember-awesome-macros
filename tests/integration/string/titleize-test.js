import { titleize } from 'ember-awesome-macros/string';
import { raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

module('Integration | Macro | string | titleize', function() {
  test('returns undefined when doesn\'t exist', function(assert) {
    compute({
      assert,
      computed: titleize('source'),
      strictEqual: undefined
    });
  });

  test('returns undefined when undefined', function(assert) {
    compute({
      assert,
      computed: titleize('source'),
      properties: {
        source: undefined
      },
      strictEqual: undefined
    });
  });

  test('titleizes string', function(assert) {
    compute({
      assert,
      computed: titleize('source'),
      properties: {
        source: 'james mcAvoy'
      },
      strictEqual: 'James Mcavoy'
    });
  });

  test('returns undefined when composed undefined', function(assert) {
    compute({
      assert,
      computed: titleize(raw(undefined)),
      strictEqual: undefined
    });
  });

  test('classifies composed string', function(assert) {
    compute({
      assert,
      computed: titleize(raw('james mcAvoy')),
      strictEqual: 'James Mcavoy'
    });
  });
});
