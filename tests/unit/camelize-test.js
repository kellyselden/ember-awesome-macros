import { camelize, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/arithmetic';

module('Unit | Macro | camelize');

test('returns undefined when doesn\'t exist', function(assert) {
  compute({
    assert,
    computed: camelize('source'),
    expected: undefined
  });
});

test('returns undefined when undefined', function(assert) {
  compute({
    assert,
    computed: camelize('source'),
    properties: {
      source: undefined
    },
    expected: undefined
  });
});

test('camelizes string', function(assert) {
  compute({
    assert,
    computed: camelize('source'),
    properties: {
      source: 'test-string'
    },
    expected: 'testString'
  });
});

test('returns undefined when composed undefined', function(assert) {
  compute({
    assert,
    computed: camelize(raw(undefined)),
    expected: undefined
  });
});

test('camelizes composed string', function(assert) {
  compute({
    assert,
    computed: camelize(raw('test-string')),
    expected: 'testString'
  });
});
