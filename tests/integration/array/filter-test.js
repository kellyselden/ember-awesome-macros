import { filter } from 'ember-awesome-macros/array';
import { raw } from 'ember-awesome-macros';
import EmberObject from 'ember-object';
import { A as emberA } from 'ember-array/utils';
import get from 'ember-metal/get';
import computed from 'ember-computed';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';
import sinon from 'sinon';

module('Integration | Macro | array | filter');

test('it returns empty array if array undefined', function(assert) {
  compute({
    assert,
    computed: filter('array'),
    deepEqual: []
  });
});

test('it returns empty array if not found', function(assert) {
  compute({
    assert,
    computed: filter('array', result => result === 3),
    properties: {
      array: emberA([1, 2])
    },
    deepEqual: []
  });
});

test('it filters array if found', function(assert) {
  compute({
    assert,
    computed: filter('array', result => result === 2),
    properties: {
      array: emberA([1, 2])
    },
    deepEqual: [2]
  });
});

test('it responds to array property value changes', function(assert) {
  let array = emberA([
    EmberObject.create({ prop: false }),
    EmberObject.create({ prop: true })
  ]);

  let { subject } = compute({
    computed: filter('array.@each.prop', item => {
      return get(item, 'prop');
    }),
    properties: {
      array
    }
  });

  assert.strictEqual(subject.get('computed.length'), 1);

  array.set('1.prop', false);

  assert.strictEqual(subject.get('computed.length'), 0);

  array.pushObject(EmberObject.create({ prop: true }));

  assert.strictEqual(subject.get('computed.length'), 1);
});

test('doesn\'t calculate when unnecessary', function(assert) {
  let callback = sinon.spy();

  compute({
    computed: filter(
      undefined,
      computed(callback)
    )
  });

  assert.notOk(callback.called);
});

test('composable: it filters array if found', function(assert) {
  compute({
    assert,
    computed: filter(
      raw(emberA([1, 2])),
      result => result === 2
    ),
    deepEqual: [2]
  });
});
