import { conditional, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/compute';

module('Unit | Macro | conditional');

test('returns undefined when doesn\'t exist', function(assert) {
  compute({
    assert,
    computed: conditional('condition', 'expr1', 'expr2'),
    expected: undefined
  });
});

test('returns first value when true', function(assert) {
  compute({
    assert,
    computed: conditional('condition', 'expr1', 'expr2'),
    properties: {
      condition: true,
      expr1: 'val 1',
      expr2: 'val 2'
    },
    expected: 'val 1'
  });
});

test('returns second value when false', function(assert) {
  compute({
    assert,
    computed: conditional('condition', 'expr1', 'expr2'),
    properties: {
      condition: false,
      expr1: 'val 1',
      expr2: 'val 2'
    },
    expected: 'val 2'
  });
});

test('composable: returns first value when true', function(assert) {
  compute({
    assert,
    computed: conditional(true, raw('val 1'), raw('val 2')),
    expected: 'val 1'
  });
});
