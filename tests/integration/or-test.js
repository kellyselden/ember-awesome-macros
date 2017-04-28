import { or } from 'ember-awesome-macros';
import computed from 'ember-computed';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';
import sinon from 'sinon';

module('Integration | Macro | or');

test('undefined or true returns true', function(assert) {
  compute({
    assert,
    computed: or('source1', 'source2'),
    properties: {
      source2: true
    },
    strictEqual: true
  });
});

test('false or false returns false', function(assert) {
  compute({
    assert,
    computed: or('source1', 'source2'),
    properties: {
      source1: false,
      source2: false
    },
    strictEqual: false
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
    strictEqual: true
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
    strictEqual: true
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
    strictEqual: true
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
    strictEqual: true
  });
});

test('allows object fallback, doesn\'t cast to bool', function(assert) {
  compute({
    assert,
    computed: or('source1', 'source2'),
    properties: {
      source2: { test: 1 }
    },
    deepEqual: { test: 1 }
  });
});

test('allows property expansion', function(assert) {
  let { subject } = compute({
    assert,
    computed: or('obj.{source1,source2}'),
    properties: {
      obj: {
        source1: false,
        source2: true
      }
    },
    strictEqual: true
  });

  subject.toggleProperty('obj.source2');

  assert.strictEqual(subject.get('computed'), false);
});

test('doesn\'t calculate when unnecessary', function(assert) {
  let callback = sinon.spy();

  compute({
    computed: or(
      true,
      computed(callback)
    )
  });

  assert.notOk(callback.called);
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
    strictEqual: true
  });
});
