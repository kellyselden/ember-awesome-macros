import { not } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/compute';

module('Integration | Macro | not');

test('false returns true', function(assert) {
  compute({
    assert,
    computed: not('source'),
    properties: {
      source: false
    },
    expected: true
  });
});

test('true returns false', function(assert) {
  compute({
    assert,
    computed: not('source'),
    properties: {
      source: true
    },
    expected: false
  });
});

test('nested: false returns false', function(assert) {
  compute({
    assert,
    computed: not(not('source')),
    properties: {
      source: false
    },
    expected: false
  });
});

test('nested: true returns true', function(assert) {
  compute({
    assert,
    computed: not(not('source')),
    properties: {
      source: true
    },
    expected: true
  });
});
