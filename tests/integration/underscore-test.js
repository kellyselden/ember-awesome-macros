import { underscore, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

module('Integration | Macro | underscore');

test('returns undefined when doesn\'t exist', function(assert) {
  compute({
    assert,
    computed: underscore('source'),
    strictEqual: undefined
  });
});

test('returns undefined when undefined', function(assert) {
  compute({
    assert,
    computed: underscore('source'),
    properties: {
      source: undefined
    },
    strictEqual: undefined
  });
});

test('underscores string', function(assert) {
  compute({
    assert,
    computed: underscore('source'),
    properties: {
      source: 'TestString'
    },
    strictEqual: 'test_string'
  });
});

test('returns undefined when composed undefined', function(assert) {
  compute({
    assert,
    computed: underscore(raw(undefined)),
    strictEqual: undefined
  });
});

test('underscores composed string', function(assert) {
  compute({
    assert,
    computed: underscore(raw('TestString')),
    strictEqual: 'test_string'
  });
});
