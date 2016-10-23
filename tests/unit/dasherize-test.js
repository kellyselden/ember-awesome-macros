import { dasherize, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/compute';

module('Unit | Macro | dasherize');

test('returns undefined when doesn\'t exist', function(assert) {
  compute({
    assert,
    computed: dasherize('source'),
    expected: undefined
  });
});

test('returns undefined when undefined', function(assert) {
  compute({
    assert,
    computed: dasherize('source'),
    properties: {
      source: undefined
    },
    expected: undefined
  });
});

test('dasherizes string', function(assert) {
  compute({
    assert,
    computed: dasherize('source'),
    properties: {
      source: 'TestString'
    },
    expected: 'test-string'
  });
});

test('returns undefined when composed undefined', function(assert) {
  compute({
    assert,
    computed: dasherize(raw(undefined)),
    expected: undefined
  });
});

test('dasherizes composed string', function(assert) {
  compute({
    assert,
    computed: dasherize(raw('TestString')),
    expected: 'test-string'
  });
});
