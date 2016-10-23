import { toUpper, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/arithmetic';

module('Unit | Macro | to upper');

test('returns undefined when doesn\'t exist', function(assert) {
  compute({
    assert,
    computed: toUpper('source'),
    expected: undefined
  });
});

test('returns undefined when undefined', function(assert) {
  compute({
    assert,
    computed: toUpper('source'),
    properties: {
      source: undefined
    },
    expected: undefined
  });
});

test('underscores string', function(assert) {
  compute({
    assert,
    computed: toUpper('source'),
    properties: {
      source: 'TestString'
    },
    expected: 'TESTSTRING'
  });
});

test('returns undefined when composed undefined', function(assert) {
  compute({
    assert,
    computed: toUpper(raw(undefined)),
    expected: undefined
  });
});

test('underscores composed string', function(assert) {
  compute({
    assert,
    computed: toUpper(raw('TestString')),
    expected: 'TESTSTRING'
  });
});
