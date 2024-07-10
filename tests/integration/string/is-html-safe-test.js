import { htmlSafe } from '@ember/template';
import { isHtmlSafe } from 'ember-awesome-macros/string';
import { raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import { compute } from 'ember-macro-helpers/test-support';

module('Integration | Macro | string | is html safe', function() {
  test('returns undefined when doesn\'t exist', function(assert) {
    compute({
      assert,
      computed: isHtmlSafe('source'),
      strictEqual: undefined
    });
  });

  test('returns undefined when undefined', function(assert) {
    compute({
      assert,
      computed: isHtmlSafe('source'),
      properties: {
        source: undefined
      },
      strictEqual: undefined
    });
  });

  test('returns false for not html safe', function(assert) {
    compute({
      assert,
      computed: isHtmlSafe('source'),
      properties: {
        source: '<input>'
      },
      strictEqual: false
    });
  });

  test('returns true for html safe', function(assert) {
    compute({
      assert,
      computed: isHtmlSafe('source'),
      properties: {
        source: htmlSafe('<input>')
      },
      strictEqual: true
    });
  });

  test('returns undefined when composed undefined', function(assert) {
    compute({
      assert,
      computed: isHtmlSafe(raw(undefined)),
      strictEqual: undefined
    });
  });

  test('returns false for composed not html safe', function(assert) {
    compute({
      assert,
      computed: isHtmlSafe(raw('<input>')),
      strictEqual: false
    });
  });

  test('returns true for composed html safe', function(assert) {
    compute({
      assert,
      computed: isHtmlSafe(raw(htmlSafe('<input>'))),
      strictEqual: true
    });
  });
});
