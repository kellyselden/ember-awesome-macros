import { tag, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/compute';

module('Integration | Macro | tag');

test('it handles undefined variables', function(assert) {
  compute({
    assert,
    computed: tag`test ${'test'} test`,
    expected: 'test undefined test'
  });
});

test('it handles a string template', function(assert) {
  compute({
    assert,
    computed: tag`test ${'test'} test`,
    properties: {
      test: 'hello'
    },
    expected: 'test hello test'
  });
});

test('it handles a variable at the beginning', function(assert) {
  compute({
    assert,
    computed: tag`${'test'} test`,
    properties: {
      test: 'hello'
    },
    expected: 'hello test'
  });
});

test('it handles a variable at the end', function(assert) {
  compute({
    assert,
    computed: tag`test ${'test'}`,
    properties: {
      test: 'hello'
    },
    expected: 'test hello'
  });
});

test('composable: it handles a string template', function(assert) {
  compute({
    assert,
    computed: tag`test ${raw('hello')} test`,
    expected: 'test hello test'
  });
});
