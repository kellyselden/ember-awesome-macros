import { toLower, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/compute';

module('Unit | Macro | to lower');

test('returns undefined when doesn\'t exist', function(assert) {
  compute({
    assert,
    computed: toLower('source'),
    expected: undefined
  });
});

test('returns undefined when undefined', function(assert) {
  compute({
    assert,
    computed: toLower('source'),
    properties: {
      source: undefined
    },
    expected: undefined
  });
});

test('underscores string', function(assert) {
  compute({
    assert,
    computed: toLower('source'),
    properties: {
      source: 'TestString'
    },
    expected: 'teststring'
  });
});

test('returns undefined when composed undefined', function(assert) {
  compute({
    assert,
    computed: toLower(raw(undefined)),
    expected: undefined
  });
});

test('underscores composed string', function(assert) {
  compute({
    assert,
    computed: toLower(raw('TestString')),
    expected: 'teststring'
  });
});
