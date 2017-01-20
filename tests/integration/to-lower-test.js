import { toLower, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

module('Integration | Macro | to lower');

test('returns undefined when doesn\'t exist', function(assert) {
  compute({
    assert,
    computed: toLower('source'),
    strictEqual: undefined
  });
});

test('returns undefined when undefined', function(assert) {
  compute({
    assert,
    computed: toLower('source'),
    properties: {
      source: undefined
    },
    strictEqual: undefined
  });
});

test('lower cases string', function(assert) {
  compute({
    assert,
    computed: toLower('source'),
    properties: {
      source: 'TestString'
    },
    strictEqual: 'teststring'
  });
});

test('returns undefined when composed undefined', function(assert) {
  compute({
    assert,
    computed: toLower(raw(undefined)),
    strictEqual: undefined
  });
});

test('lower cases composed string', function(assert) {
  compute({
    assert,
    computed: toLower(raw('TestString')),
    strictEqual: 'teststring'
  });
});
