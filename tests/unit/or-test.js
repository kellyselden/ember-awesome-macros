import { or } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/arithmetic';

module('Unit | Macro | or');

test('false or false returns false', function(assert) {
  compute({
    assert,
    computed: or('source1', 'source2'),
    properties: {
      source1: false,
      source2: false
    },
    expected: false
  });
});

test('true or false returns true', function(assert) {
  compute({
    assert,
    computed: or('source1', 'source2'),
    properties: {
      source1: true,
      source2: false
    },
    expected: true
  });
});

test('false or true returns true', function(assert) {
  compute({
    assert,
    computed: or('source1', 'source2'),
    properties: {
      source1: false,
      source2: true
    },
    expected: true
  });
});

test('true or true returns true', function(assert) {
  compute({
    assert,
    computed: or('source1', 'source2'),
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
    computed: or('source1', 'source2', 'source3'),
    properties: {
      source1: false,
      source2: false,
      source3: true
    },
    expected: true
  });
});

test('allows composing', function(assert) {
  compute({
    assert,
    computed: or(or('source1', 'source2'), or('source3', 'source4')),
    properties: {
      source1: false,
      source2: false,
      source3: false,
      source4: true
    },
    expected: true
  });
});
