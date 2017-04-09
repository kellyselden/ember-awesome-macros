import EmberObject from 'ember-object';
import { filter, raw } from 'ember-awesome-macros';
import { A as emberA } from 'ember-array/utils';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

module('Integration | Macro | filter');

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
    EmberObject.create({ test: 'val1' }),
    EmberObject.create({ test: 'val2' })
  ]);

  let { subject } = compute({
    computed: filter('array.@each.test', ({ test }) => test === 'val2'),
    properties: {
      array
    }
  });

  array.set('firstObject.test', 'val2');

  assert.equal(subject.get('computed.length'), 2);
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
