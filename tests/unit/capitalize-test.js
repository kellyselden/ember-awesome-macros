import { capitalize, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/arithmetic';

module('Unit | Macro | capitalize');

test('returns undefined when doesn\'t exist', function(assert) {
  compute({
    assert,
    computed: capitalize('source'),
    expected: undefined
  });
});

test('returns undefined when undefined', function(assert) {
  compute({
    assert,
    computed: capitalize('source'),
    properties: {
      source: undefined
    },
    expected: undefined
  });
});

test('capitalizes string', function(assert) {
  compute({
    assert,
    computed: capitalize('source'),
    properties: {
      source: 'test string'
    },
    expected: 'Test string'
  });
});

test('returns undefined when composed undefined', function(assert) {
  compute({
    assert,
    computed: capitalize(raw(undefined)),
    expected: undefined
  });
});

test('capitalizes composed string', function(assert) {
  compute({
    assert,
    computed: capitalize(raw('test string')),
    expected: 'Test string'
  });
});
