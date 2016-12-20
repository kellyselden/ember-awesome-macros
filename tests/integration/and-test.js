import { and } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

module('Integration | Macro | and');

test('true and undefined returns false', function(assert) {
  compute({
    assert,
    computed: and('source1', 'source2'),
    properties: {
      source1: true
    },
    strictEqual: undefined
  });
});

test('false and false returns false', function(assert) {
  compute({
    assert,
    computed: and('source1', 'source2'),
    properties: {
      source1: false,
      source2: false
    },
    strictEqual: false
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
    strictEqual: false
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
    strictEqual: false
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
    strictEqual: true
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
    strictEqual: false
  });
});

test('allows property expansion', function(assert) {
  let { subject } = compute({
    assert,
    computed: and('obj.{source1,source2}'),
    properties: {
      obj: {
        source1: true,
        source2: true
      }
    },
    strictEqual: true
  });

  subject.toggleProperty('obj.source2');

  assert.strictEqual(subject.get('computed'), false);
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
    strictEqual: false
  });
});
