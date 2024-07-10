import { isHTMLSafe } from '@ember/template';
import { htmlSafe } from 'ember-awesome-macros/string';
import { raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import { compute } from 'ember-macro-helpers/test-support';

module('Integration | Macro | string | html safe', function() {
  test('returns undefined when doesn\'t exist', function(assert) {
    compute({
      assert,
      computed: htmlSafe('source'),
      strictEqual: undefined
    });
  });

  test('returns undefined when undefined', function(assert) {
    compute({
      assert,
      computed: htmlSafe('source'),
      properties: {
        source: undefined
      },
      strictEqual: undefined
    });
  });

  test('marks string html safe', function(assert) {
    compute({
      assert,
      computed: htmlSafe('source'),
      properties: {
        source: '<input>'
      },
      assertion: isHTMLSafe
    });
  });

  test('string has not changed', function(assert) {
    compute({
      assert,
      computed: htmlSafe('source'),
      properties: {
        source: '<input>'
      },
      assertion(actual) {
        return actual.string === '<input>';
      }
    });
  });

  test('returns undefined when composed undefined', function(assert) {
    compute({
      assert,
      computed: htmlSafe(raw(undefined)),
      strictEqual: undefined
    });
  });

  test('marks composed string html safe', function(assert) {
    compute({
      assert,
      computed: htmlSafe(raw('<input>')),
      assertion: isHTMLSafe
    });
  });

  test('composed string has not changed', function(assert) {
    compute({
      assert,
      computed: htmlSafe(raw('<input>')),
      assertion(actual) {
        return actual.string === '<input>';
      }
    });
  });
});
