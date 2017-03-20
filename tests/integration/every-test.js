import { every, raw } from 'ember-awesome-macros';
import EmberObject from 'ember-object';
import { A as emberA } from 'ember-array/utils';
import get from 'ember-metal/get';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

module('Integration | Macro | every');

test('it returns false if array undefined', function(assert) {
  compute({
    assert,
    computed: every('array'),
    strictEqual: false
  });
});

test('it returns false if not all true', function(assert) {
  compute({
    assert,
    computed: every('array', result => result === 1),
    properties: {
      array: emberA([1, 2])
    },
    strictEqual: false
  });
});

test('it returns true if all true', function(assert) {
  compute({
    assert,
    computed: every('array', result => result === 1),
    properties: {
      array: emberA([1, 1])
    },
    strictEqual: true
  });
});

test('it responds to array property value changes', function(assert) {
  let array = emberA([
    EmberObject.create({ prop: false }),
    EmberObject.create({ prop: true })
  ]);

  let { subject } = compute({
    computed: every('array.@each.prop', item => {
      return get(item, 'prop');
    }),
    properties: {
      array
    }
  });

  assert.strictEqual(subject.get('computed'), false);

  array.set('0.prop', true);

  assert.strictEqual(subject.get('computed'), true);

  array.pushObject(EmberObject.create({ prop: false }));

  assert.strictEqual(subject.get('computed'), false);
});

test('composable: it returns true if all true', function(assert) {
  compute({
    assert,
    computed: every(
      raw(emberA([1, 1])),
      result => result === 1
    ),
    strictEqual: true
  });
});
