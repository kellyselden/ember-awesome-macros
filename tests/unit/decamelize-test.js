import { decamelize, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/arithmetic';

module('Unit | Macro | decamelize');

test('returns undefined when doesn\'t exist', function(assert) {
  compute({
    assert,
    computed: decamelize('source'),
    expected: undefined
  });
});

test('returns undefined when undefined', function(assert) {
  compute({
    assert,
    computed: decamelize('source'),
    properties: {
      source: undefined
    },
    expected: undefined
  });
});

test('decamelizes string', function(assert) {
  compute({
    assert,
    computed: decamelize('source'),
    properties: {
      source: 'TestString'
    },
    expected: 'test_string'
  });
});

test('returns undefined when composed undefined', function(assert) {
  compute({
    assert,
    computed: decamelize(raw(undefined)),
    expected: undefined
  });
});

test('decamelizes composed string', function(assert) {
  compute({
    assert,
    computed: decamelize(raw('TestString')),
    expected: 'test_string'
  });
});
