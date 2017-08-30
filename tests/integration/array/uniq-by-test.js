import { uniqBy } from 'ember-awesome-macros/array';
import { raw } from 'ember-awesome-macros';
import EmberObject from '@ember/object';
import { A as emberA } from '@ember/array';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

module('Integration | Macro | array | unique by');

test('it returns undefined if array undefined', function(assert) {
  compute({
    assert,
    computed: uniqBy('array', 'key'),
    strictEqual: undefined
  });
});

test('it returns original array if key undefined', function(assert) {
  compute({
    assert,
    computed: uniqBy('array', 'key'),
    properties: {
      array: emberA([{ test: 1 }, { test: 1 }])
    },
    deepEqual: [{ test: 1 }, { test: 1 }]
  });
});

test('it returns unique objects by key', function(assert) {
  compute({
    assert,
    computed: uniqBy('array', 'key'),
    properties: {
      array: emberA([{ test: 1 }, { test: 1 }]),
      key: 'test'
    },
    deepEqual: [{ test: 1 }]
  });
});

test('it responds to array property value changes', function(assert) {
  let array = emberA([
    EmberObject.create({ test1: 'val1', test2: 'val1' }),
    EmberObject.create({ test1: 'val2', test2: 'val1' })
  ]);

  let { subject } = compute({
    computed: uniqBy('array', 'key'),
    properties: {
      array,
      key: 'test1'
    }
  });

  assert.deepEqual(subject.get('computed.length'), 2);

  array.set('1.test1', 'val1');

  assert.deepEqual(subject.get('computed.length'), 1);

  array.pushObject(EmberObject.create({ test1: 'val2', test2: 'val1' }));

  assert.deepEqual(subject.get('computed.length'), 2);

  subject.set('key', 'test2');

  assert.deepEqual(subject.get('computed.length'), 1);
});

test('composable: it returns unique objects by key', function(assert) {
  compute({
    assert,
    computed: uniqBy(
      raw(emberA([{ test: 1 }, { test: 1 }])),
      raw('test')
    ),
    deepEqual: [{ test: 1 }]
  });
});

test('it handles native arrays', function(assert) {
  compute({
    assert,
    computed: uniqBy('array', 'key'),
    properties: {
      array: [{ test: 1 }, { test: 1 }],
      key: 'test'
    },
    deepEqual: [{ test: 1 }]
  });
});
