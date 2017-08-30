import { findBy } from 'ember-awesome-macros/array';
import { raw } from 'ember-awesome-macros';
import EmberObject from '@ember/object';
import { A as emberA } from '@ember/array';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

module('Integration | Macro | array | find by');

test('it returns undefined if array undefined', function(assert) {
  compute({
    assert,
    computed: findBy('array', 'key', 'value'),
    strictEqual: undefined
  });
});

test('it returns undefined if key undefined', function(assert) {
  compute({
    assert,
    computed: findBy('array', 'key', 'value'),
    properties: {
      array: emberA([{ test: 'val1' }, { test: 'val2' }])
    },
    strictEqual: undefined
  });
});

test('it returns undefined if not found', function(assert) {
  compute({
    assert,
    computed: findBy('array', 'key', 'value'),
    properties: {
      array: emberA([{ test: 'val1' }, { test: 'val2' }]),
      key: 'test',
      value: 'val3'
    },
    strictEqual: undefined
  });
});

test('it returns item if found', function(assert) {
  let expected = { test: 'val2' };
  compute({
    assert,
    computed: findBy('array', 'key', 'value'),
    properties: {
      array: emberA([{ test: 'val1' }, expected]),
      key: 'test',
      value: 'val2'
    },
    strictEqual: expected
  });
});

test('it responds to array property value changes', function(assert) {
  let array = emberA([
    EmberObject.create({ test1: 'val1', test2: 'val1' }),
    EmberObject.create({ test1: 'val2', test2: 'val2' })
  ]);

  let { subject } = compute({
    computed: findBy('array', 'key', 'value'),
    properties: {
      array,
      key: 'test1',
      value: 'val2'
    }
  });

  assert.strictEqual(subject.get('computed'), array[1]);

  array.set('0.test1', 'val2');
  array.set('1.test1', 'val1');

  assert.strictEqual(subject.get('computed'), array[0]);

  array.set('0.test1', 'val1');
  array.pushObject(EmberObject.create({ test1: 'val2', test2: 'val1' }));

  assert.strictEqual(subject.get('computed'), array[2]);

  subject.set('key', 'test2');

  assert.strictEqual(subject.get('computed'), array[1]);

  array.set('0.test2', 'val2');
  subject.set('value', 'val1');

  assert.strictEqual(subject.get('computed'), array[2]);
});

test('it handles raw numbers', function(assert) {
  let expected = { test: 3 };
  compute({
    assert,
    computed: findBy('array', 'key', 3),
    properties: {
      array: emberA([{ test: 2 }, expected]),
      key: 'test'
    },
    strictEqual: expected
  });
});

test('composable: it returns item if found', function(assert) {
  let expected = { test: 'val2' };
  compute({
    assert,
    computed: findBy(
      raw(emberA([{ test: 'val1' }, expected])),
      raw('test'),
      raw('val2')
    ),
    strictEqual: expected
  });
});

test('it handles native arrays', function(assert) {
  let expected = { test: 'val2' };
  compute({
    assert,
    computed: findBy('array', 'key', 'value'),
    properties: {
      array: [{ test: 'val1' }, expected],
      key: 'test',
      value: 'val2'
    },
    strictEqual: expected
  });
});
