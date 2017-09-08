import { mapBy } from 'ember-awesome-macros/array';
import { raw } from 'ember-awesome-macros';
import EmberObject from '@ember/object';
import { A as emberA } from '@ember/array';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

module('Integration | Macro | array | map by');

test('it returns empty array if not array type', function(assert) {
  compute({
    assert,
    computed: mapBy('array'),
    properties: {
      array: {}
    },
    deepEqual: []
  });
});

test('default value is a new copy every recalculation', function(assert) {
  let { subject } = compute({
    computed: mapBy('array')
  });

  let result = subject.get('computed');

  subject.set('array', null);

  assert.notEqual(subject.get('computed'), result);
});

test('it returns array identity if key not string', function(assert) {
  let array = [];

  compute({
    assert,
    computed: mapBy('array', 'key'),
    properties: {
      array,
      key: true
    },
    strictEqual: array
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

test('it handles native arrays', function(assert) {
  compute({
    assert,
    computed: mapBy('array', 'key'),
    properties: {
      array: [{ test: 1 }, { test: 2 }],
      key: 'test'
    },
    deepEqual: [1, 2]
  });
});
