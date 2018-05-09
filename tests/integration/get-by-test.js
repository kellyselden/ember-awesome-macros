import EmberObject, { get, set } from '@ember/object';
import { getBy, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import { compute } from 'ember-macro-test-helpers';

let model;

module('Integration | Macro | get by', function(hooks) {
  hooks.beforeEach(function() {
    model = EmberObject.create({
      testProp1: 'test val 1',
      testProp2: 'test val 2'
    });
  });

  test('default', function(assert) {
    compute({
      assert,
      computed: getBy('model', 'source'),
      properties: {
        model,
        source: 'testProp1'
      },
      strictEqual: 'test val 1'
    });
  });

  test('handles property value changes', function(assert) {
    let { subject } = compute({
      computed: getBy('model', 'source'),
      properties: {
        model,
        source: 'testProp1'
      }
    });

    set(subject, 'model.testProp1', 'test val 3');

    assert.strictEqual(get(subject, 'computed'), 'test val 3');
  });

  test('handles property changes', function(assert) {
    let { subject } = compute({
      computed: getBy('model', 'source'),
      properties: {
        model,
        source: 'testProp1'
      }
    });

    set(subject, 'source', 'testProp2');

    assert.strictEqual(get(subject, 'computed'), 'test val 2');
  });

  test('composable', function(assert) {
    compute({
      assert,
      computed: getBy(
        raw(model),
        raw('testProp1')
      ),
      strictEqual: 'test val 1'
    });
  });
});
