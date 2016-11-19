import { classify, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/compute';

module('Integration | Macro | classify');

test('returns undefined when doesn\'t exist', function(assert) {
  compute({
    assert,
    computed: classify('source'),
    strictEqual: undefined
  });
});

test('returns undefined when undefined', function(assert) {
  compute({
    assert,
    computed: classify('source'),
    properties: {
      source: undefined
    },
    strictEqual: undefined
  });
});

test('classifies string', function(assert) {
  compute({
    assert,
    computed: classify('source'),
    properties: {
      source: 'test string'
    },
    strictEqual: 'TestString'
  });
});

test('returns undefined when composed undefined', function(assert) {
  compute({
    assert,
    computed: classify(raw(undefined)),
    strictEqual: undefined
  });
});

test('classifies composed string', function(assert) {
  compute({
    assert,
    computed: classify(raw('test string')),
    strictEqual: 'TestString'
  });
});
