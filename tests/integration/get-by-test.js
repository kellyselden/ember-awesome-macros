import EmberObject, { get, set } from '@ember/object';
import { A as emberA } from '@ember/array';
import { objectAt } from 'ember-awesome-macros/array';
import { getBy, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

let model;

module('Integration | Macro | get by', {
  beforeEach() {
    model = EmberObject.create({
      testProp1: 'test val 1',
      testProp2: 'test val 2'
    });
  }
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

test('double render failed test', function(assert) {
  let { subject } = compute({
    assert,
    computed: getBy(
      objectAt('model', 'index'),
      raw('testProp1')
    ),
    properties: {
      model: emberA([
        EmberObject.create({
          testProp1: 'test val 1',
          testProp2: 'test val 2'
        }),
        EmberObject.create({
          testProp1: 'test val 3',
          testProp2: 'test val 4'
        })
      ]),
      index: 0
    },
    strictEqual: 'test val 1'
  });

  set(subject, 'index', 1);

  assert.strictEqual(get(subject, 'computed'), 'test val 3');
});
