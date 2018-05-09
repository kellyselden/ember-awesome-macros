import { tag, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import { compute } from 'ember-macro-test-helpers';

module('Integration | Macro | tag', function() {
  test('it handles undefined variables', function(assert) {
    compute({
      assert,
      computed: tag`test ${'test'} test`,
      strictEqual: 'test undefined test'
    });
  });

  test('it handles a string template', function(assert) {
    compute({
      assert,
      computed: tag`test ${'test'} test`,
      properties: {
        test: 'hello'
      },
      strictEqual: 'test hello test'
    });
  });

  test('it handles a variable at the beginning', function(assert) {
    compute({
      assert,
      computed: tag`${'test'} test`,
      properties: {
        test: 'hello'
      },
      strictEqual: 'hello test'
    });
  });

  test('it handles a variable at the end', function(assert) {
    compute({
      assert,
      computed: tag`test ${'test'}`,
      properties: {
        test: 'hello'
      },
      strictEqual: 'test hello'
    });
  });

  test('composable: it handles a string template', function(assert) {
    compute({
      assert,
      computed: tag`test ${raw('hello')} test`,
      strictEqual: 'test hello test'
    });
  });
});
