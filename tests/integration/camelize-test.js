import { camelize, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/compute';

module('Integration | Macro | camelize');

test('returns undefined when doesn\'t exist', function(assert) {
  compute({
    assert,
    computed: camelize('source'),
    strictEqual: undefined
  });
});

test('returns undefined when undefined', function(assert) {
  compute({
    assert,
    computed: camelize('source'),
    properties: {
      source: undefined
    },
    strictEqual: undefined
  });
});

test('camelizes string', function(assert) {
  compute({
    assert,
    computed: camelize('source'),
    properties: {
      source: 'test-string'
    },
    strictEqual: 'testString'
  });
});

test('returns undefined when composed undefined', function(assert) {
  compute({
    assert,
    computed: camelize(raw(undefined)),
    strictEqual: undefined
  });
});

test('camelizes composed string', function(assert) {
  compute({
    assert,
    computed: camelize(raw('test-string')),
    strictEqual: 'testString'
  });
});
