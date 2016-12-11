import { dasherize, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

module('Integration | Macro | dasherize');

test('returns undefined when doesn\'t exist', function(assert) {
  compute({
    assert,
    computed: dasherize('source'),
    strictEqual: undefined
  });
});

test('returns undefined when undefined', function(assert) {
  compute({
    assert,
    computed: dasherize('source'),
    properties: {
      source: undefined
    },
    strictEqual: undefined
  });
});

test('dasherizes string', function(assert) {
  compute({
    assert,
    computed: dasherize('source'),
    properties: {
      source: 'TestString'
    },
    strictEqual: 'test-string'
  });
});

test('returns undefined when composed undefined', function(assert) {
  compute({
    assert,
    computed: dasherize(raw(undefined)),
    strictEqual: undefined
  });
});

test('dasherizes composed string', function(assert) {
  compute({
    assert,
    computed: dasherize(raw('TestString')),
    strictEqual: 'test-string'
  });
});
