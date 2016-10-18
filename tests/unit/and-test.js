import { and } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/arithmetic';

module('Unit | Macro | and');

test('false and false returns false', function(assert) {
  compute({
    assert,
    computed: and('source1', 'source2'),
    properties: {
      source1: false,
      source2: false
    },
    expected: false
  });
});

test('true and false returns false', function(assert) {
  compute({
    assert,
    computed: and('source1', 'source2'),
    properties: {
      source1: true,
      source2: false
    },
    expected: false
  });
});

test('false and true returns false', function(assert) {
  compute({
    assert,
    computed: and('source1', 'source2'),
    properties: {
      source1: false,
      source2: true
    },
    expected: false
  });
});

test('true and true returns true', function(assert) {
  compute({
    assert,
    computed: and('source1', 'source2'),
    properties: {
      source1: true,
      source2: true
    },
    expected: true
  });
});

test('accepts N number of keys', function(assert) {
  compute({
    assert,
    computed: and('source1', 'source2', 'source3'),
    properties: {
      source1: true,
      source2: true,
      source3: false
    },
    expected: false
  });
});

test('allows composing', function(assert) {
  compute({
    assert,
    computed: and(and('source1', 'source2'), and('source3', 'source4')),
    properties: {
      source1: true,
      source2: true,
      source3: true,
      source4: false
    },
    expected: false
  });
});
