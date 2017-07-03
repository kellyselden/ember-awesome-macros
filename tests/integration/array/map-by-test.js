import { mapBy } from 'ember-awesome-macros/array';
import { raw } from 'ember-awesome-macros';
import EmberObject from '@ember/object';
import { A as emberA } from '@ember/array';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

module('Integration | Macro | array | map by');

test('it returns undefined if array undefined', function(assert) {
  compute({
    assert,
    computed: mapBy('array', 'key'),
    strictEqual: undefined
  });
});

test('it returns original array if key undefined', function(assert) {
  compute({
    assert,
    computed: mapBy('array', 'key'),
    properties: {
      array: emberA([{ test: 1 }, { test: 2 }])
    },
    deepEqual: [{ test: 1 }, { test: 2 }]
  });
});

test('it maps array by key', function(assert) {
  compute({
    assert,
    computed: mapBy('array', 'key'),
    properties: {
      array: emberA([{ test: 1 }, { test: 2 }]),
      key: 'test'
    },
    deepEqual: [1, 2]
  });
});

test('it responds to array property value changes', function(assert) {
  let array = emberA([
    EmberObject.create({ test1: 'val1', test2: 'val1' }),
    EmberObject.create({ test1: 'val1', test2: 'val1' })
  ]);

  let { subject } = compute({
    computed: mapBy('array', 'key'),
    properties: {
      array,
      key: 'test1'
    }
  });

  assert.deepEqual(subject.get('computed'), ['val1', 'val1']);

  array.set('1.test1', 'val2');

  assert.deepEqual(subject.get('computed'), ['val1', 'val2']);

  array.pushObject(EmberObject.create({ test1: 'val2', test2: 'val2' }));

  assert.deepEqual(subject.get('computed'), ['val1', 'val2', 'val2']);

  subject.set('key', 'test2');

  assert.deepEqual(subject.get('computed'), ['val1', 'val1', 'val2']);
});

test('composable: it maps array by key', function(assert) {
  compute({
    assert,
    computed: mapBy(
      raw(emberA([{ test: 1 }, { test: 2 }])),
      raw('test')
    ),
    deepEqual: [1, 2]
  });
});
