import { filterBy } from 'ember-awesome-macros/array';
import { raw } from 'ember-awesome-macros';
import EmberObject from '@ember/object';
import { A as emberA } from '@ember/array';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

module('Integration | Macro | array | filter by');

test('it returns empty array if array undefined', function(assert) {
  compute({
    assert,
    computed: filterBy('array', 'key'),
    deepEqual: []
  });
});

test('it returns empty array if key undefined', function(assert) {
  compute({
    assert,
    computed: filterBy('array', 'key'),
    properties: {
      array: emberA([{ test: 'val1' }, { test: 'val2' }])
    },
    deepEqual: []
  });
});

test('it returns empty array if not found', function(assert) {
  compute({
    assert,
    computed: filterBy('array', 'key', 'value'),
    properties: {
      array: emberA([{ test: 'val1' }, { test: 'val2' }]),
      key: 'test',
      value: 'val3'
    },
    deepEqual: []
  });
});

test('it filters array if found', function(assert) {
  compute({
    assert,
    computed: filterBy('array', 'key', 'value'),
    properties: {
      array: emberA([{ test: 'val1' }, { test: 'val2' }]),
      key: 'test',
      value: 'val2'
    },
    deepEqual: [{ test: 'val2' }]
  });
});

test('it responds to array property value changes', function(assert) {
  let array = emberA([
    EmberObject.create({ test1: 'val1', test2: 'val1' }),
    EmberObject.create({ test1: 'val1', test2: 'val1' })
  ]);

  let { subject } = compute({
    computed: filterBy('array', 'key', 'value'),
    properties: {
      array,
      key: 'test1',
      value: 'val2'
    }
  });

  assert.equal(subject.get('computed.length'), 0);

  array.set('1.test1', 'val2');

  assert.equal(subject.get('computed.length'), 1);

  array.pushObject(EmberObject.create({ test1: 'val2', test2: 'val2' }));

  assert.equal(subject.get('computed.length'), 2);

  subject.set('key', 'test2');

  assert.equal(subject.get('computed.length'), 1);

  subject.set('value', 'val1');

  assert.equal(subject.get('computed.length'), 2);
});

test('it handles raw numbers', function(assert) {
  compute({
    assert,
    computed: filterBy('array', 'key', 3),
    properties: {
      array: emberA([{ test: 2 }, { test: 3 }]),
      key: 'test'
    },
    deepEqual: [{ test: 3 }]
  });
});

test('composable: it filters array if found', function(assert) {
  compute({
    assert,
    computed: filterBy(
      raw(emberA([{ test: 'val1' }, { test: 'val2' }])),
      raw('test'),
      raw('val2')
    ),
    deepEqual: [{ test: 'val2' }]
  });
});
