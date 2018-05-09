import { eq, raw } from 'ember-awesome-macros';
import { computed } from '@ember/object';
import { module, test } from 'qunit';
import { compute } from 'ember-macro-test-helpers';
import sinon from 'sinon';

module('Integration | Macro | eq', function() {
  test('not equal returns false', function(assert) {
    compute({
      assert,
      computed: eq('source1', 'source2'),
      properties: {
        source1: 1,
        source2: 2
      },
      strictEqual: false
    });
  });

  test('equal but different type returns false', function(assert) {
    compute({
      assert,
      computed: eq('source1', 'source2'),
      properties: {
        source1: '2',
        source2: 2
      },
      strictEqual: false
    });
  });

  test('equal and same type returns true', function(assert) {
    compute({
      assert,
      computed: eq('source1', 'source2'),
      properties: {
        source1: 2,
        source2: 2
      },
      strictEqual: true
    });
  });

  test('checks equality for N items', function(assert) {
    let { subject } = compute({
      assert,
      computed: eq('source1', 'source2', 'source3'),
      properties: {
        source1: 2,
        source2: 2,
        source3: 1
      },
      strictEqual: false
    });

    subject.set('source3', 2);

    assert.strictEqual(subject.get('computed'), true);
  });

  test('doesn\'t calculate when unnecessary', function(assert) {
    let callback = sinon.spy();

    compute({
      computed: eq(
        true,
        false,
        computed(callback)
      )
    });

    assert.notOk(callback.called);
  });

  test('it handles numbers', function(assert) {
    compute({
      assert,
      computed: eq(2, 2),
      strictEqual: true
    });
  });

  test('it handles nesting', function(assert) {
    compute({
      assert,
      computed: eq(raw(2), raw(2)),
      strictEqual: true
    });
  });
});
