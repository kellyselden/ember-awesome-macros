import EmberObject from 'ember-object';
import { filterBy, raw } from 'ember-awesome-macros';
import { A as emberA } from 'ember-array/utils';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

module('Integration | Macro | filter by');

test('it returns empty array if array undefined', function(assert) {
  compute({
    assert,
    computed: filterBy('array', 'test', 'value'),
    deepEqual: []
  });
});

test('it returns empty array if not found', function(assert) {
  compute({
    assert,
    computed: filterBy('array', 'test', 'value'),
    properties: {
      array: emberA([{ test: 'val1' }, { test: 'val2' }]),
      value: 'val3'
    },
    deepEqual: []
  });
});

test('it filters array if found', function(assert) {
  compute({
    assert,
    computed: filterBy('array', 'test', 'value'),
    properties: {
      array: emberA([{ test: 'val1' }, { test: 'val2' }]),
      value: 'val2'
    },
    deepEqual: [{ test: 'val2' }]
  });
});

test('it responds to array property value changes', function(assert) {
  let array = emberA([
    EmberObject.create({ test: 'val1' }),
    EmberObject.create({ test: 'val2' })
  ]);

  let { subject } = compute({
    computed: filterBy('array', 'test', 'value'),
    properties: {
      array,
      value: 'val2'
    }
  });

  array.set('firstObject.test', 'val2');

  assert.equal(subject.get('computed.length'), 2);
});

test('it handles raw numbers', function(assert) {
  compute({
    assert,
    computed: filterBy('array', 'test', 3),
    properties: {
      array: emberA([{ test: 2 }, { test: 3 }])
    },
    deepEqual: [{ test: 3 }]
  });
});

test('composable: it filters array if found', function(assert) {
  compute({
    assert,
    computed: filterBy(
      raw(emberA([{ test: 'val1' }, { test: 'val2' }])),
      'test',
      raw('val2')
    ),
    deepEqual: [{ test: 'val2' }]
  });
});
