import { underscore, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/compute';

module('Unit | Macro | underscore');

test('returns undefined when doesn\'t exist', function(assert) {
  compute({
    assert,
    computed: underscore('source'),
    expected: undefined
  });
});

test('returns undefined when undefined', function(assert) {
  compute({
    assert,
    computed: underscore('source'),
    properties: {
      source: undefined
    },
    expected: undefined
  });
});

test('underscores string', function(assert) {
  compute({
    assert,
    computed: underscore('source'),
    properties: {
      source: 'TestString'
    },
    expected: 'test_string'
  });
});

test('returns undefined when composed undefined', function(assert) {
  compute({
    assert,
    computed: underscore(raw(undefined)),
    expected: undefined
  });
});

test('underscores composed string', function(assert) {
  compute({
    assert,
    computed: underscore(raw('TestString')),
    expected: 'test_string'
  });
});
