import { map, raw } from 'ember-awesome-macros';
import EmberObject from 'ember-object';
import { A as emberA } from 'ember-array/utils';
import get from 'ember-metal/get';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

module('Integration | Macro | map');

test('it returns undefined if array undefined', function(assert) {
  compute({
    assert,
    computed: map('array'),
    strictEqual: undefined
  });
});

test('it maps array', function(assert) {
  compute({
    assert,
    computed: map('array', item => item.test),
    properties: {
      array: [{ test: 1 }, { test: 2 }]
    },
    deepEqual: [1, 2]
  });
});

test('it responds to array property value changes', function(assert) {
  let array = emberA([
    EmberObject.create({ prop: false }),
    EmberObject.create({ prop: true })
  ]);

  let { subject } = compute({
    computed: map('array.@each.prop', item => {
      return get(item, 'prop');
    }),
    properties: {
      array
    }
  });

  assert.deepEqual(subject.get('computed'), [false, true]);

  array.set('1.prop', false);

  assert.deepEqual(subject.get('computed'), [false, false]);

  array.pushObject(EmberObject.create({ prop: true }));

  assert.deepEqual(subject.get('computed'), [false, false, true]);
});

test('composable: it maps array', function(assert) {
  compute({
    assert,
    computed: map(
      raw([{ test: 1 }, { test: 2 }]),
      item => item.test
    ),
    deepEqual: [1, 2]
  });
});
