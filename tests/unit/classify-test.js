import { classify, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/arithmetic';

module('Unit | Macro | classify');

test('returns undefined when doesn\'t exist', function(assert) {
  compute({
    assert,
    computed: classify('source'),
    expected: undefined
  });
});

test('returns undefined when undefined', function(assert) {
  compute({
    assert,
    computed: classify('source'),
    properties: {
      source: undefined
    },
    expected: undefined
  });
});

test('classifies string', function(assert) {
  compute({
    assert,
    computed: classify('source'),
    properties: {
      source: 'test string'
    },
    expected: 'TestString'
  });
});

test('returns undefined when composed undefined', function(assert) {
  compute({
    assert,
    computed: classify(raw(undefined)),
    expected: undefined
  });
});

test('classifies composed string', function(assert) {
  compute({
    assert,
    computed: classify(raw('test string')),
    expected: 'TestString'
  });
});
