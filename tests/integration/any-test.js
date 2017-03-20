import { any, raw } from 'ember-awesome-macros';
import EmberObject from 'ember-object';
import { A as emberA } from 'ember-array/utils';
import get from 'ember-metal/get';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

module('Integration | Macro | any');

test('it returns false if array undefined', function(assert) {
  compute({
    assert,
    computed: any('array'),
    strictEqual: false
  });
});

test('it returns false if not any true', function(assert) {
  compute({
    assert,
    computed: any('array', result => result === 3),
    properties: {
      array: emberA([1, 2])
    },
    strictEqual: false
  });
});

test('it returns true if any true', function(assert) {
  compute({
    assert,
    computed: any('array', result => result === 2),
    properties: {
      array: emberA([1, 2])
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
    computed: any('array.@each.prop', item => {
      return get(item, 'prop');
    }),
    properties: {
      array
    }
  });

  assert.strictEqual(subject.get('computed'), true);

  array.set('1.prop', false);

  assert.strictEqual(subject.get('computed'), false);

  array.pushObject(EmberObject.create({ prop: true }));

  assert.strictEqual(subject.get('computed'), true);
});

test('composable: it returns true if any true', function(assert) {
  compute({
    assert,
    computed: any(
      raw(emberA([1, 2])),
      result => result === 2
    ),
    strictEqual: true
  });
});
