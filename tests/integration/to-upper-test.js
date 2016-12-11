import { toUpper, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

module('Integration | Macro | to upper');

test('returns undefined when doesn\'t exist', function(assert) {
  compute({
    assert,
    computed: toUpper('source'),
    strictEqual: undefined
  });
});

test('returns undefined when undefined', function(assert) {
  compute({
    assert,
    computed: toUpper('source'),
    properties: {
      source: undefined
    },
    strictEqual: undefined
  });
});

test('underscores string', function(assert) {
  compute({
    assert,
    computed: toUpper('source'),
    properties: {
      source: 'TestString'
    },
    strictEqual: 'TESTSTRING'
  });
});

test('returns undefined when composed undefined', function(assert) {
  compute({
    assert,
    computed: toUpper(raw(undefined)),
    strictEqual: undefined
  });
});

test('underscores composed string', function(assert) {
  compute({
    assert,
    computed: toUpper(raw('TestString')),
    strictEqual: 'TESTSTRING'
  });
});
