import { unless, raw } from 'ember-awesome-macros';
import computed from 'ember-computed';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';
import sinon from 'sinon';

module('Integration | Macro | unless');

test('returns undefined when doesn\'t exist', function(assert) {
  compute({
    assert,
    computed: unless('condition', 'expr1', 'expr2'),
    strictEqual: undefined
  });
});

test('returns first value when false', function(assert) {
  compute({
    assert,
    computed: unless('condition', 'expr1', 'expr2'),
    properties: {
      condition: false,
      expr1: 'val 1',
      expr2: 'val 2'
    },
    strictEqual: 'val 1'
  });
});

test('returns second value when true', function(assert) {
  compute({
    assert,
    computed: unless('condition', 'expr1', 'expr2'),
    properties: {
      condition: true,
      expr1: 'val 1',
      expr2: 'val 2'
    },
    strictEqual: 'val 2'
  });
});

test('doesn\'t calculate when unnecessary', function(assert) {
  let callback = sinon.spy();

  compute({
    computed: unless(
      'condition',
      'expr1',
      computed(callback)
    ),
    properties: {
      condition: false
    }
  });

  assert.notOk(callback.called);
});

test('doesn\'t break when missing third param', function(assert) {
  compute({
    assert,
    computed: unless('condition', 'expr1'),
    properties: {
      condition: false,
      expr1: 'val 1'
    },
    strictEqual: 'val 1'
  });
});

test('allows third param implicit false', function(assert) {
  compute({
    assert,
    computed: unless('condition', 'expr1'),
    properties: {
      condition: true,
      expr1: 'val 1'
    },
    strictEqual: undefined
  });
});

test('composable: returns first value when false', function(assert) {
  compute({
    assert,
    computed: unless(false, raw('val 1'), raw('val 2')),
    strictEqual: 'val 1'
  });
});
