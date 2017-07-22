import { isEvery } from 'ember-awesome-macros/array';
import { raw } from 'ember-awesome-macros';
import EmberObject from '@ember/object';
import { A as emberA } from '@ember/array';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

module('Integration | Macro | array | is every');

test('it returns undefined if array undefined', function(assert) {
  compute({
    assert,
    computed: isEvery('array'),
    strictEqual: undefined
  });
});

test('it calls isEvery on array', function(assert) {
  compute({
    assert,
    computed: isEvery('array', 'key', 'value'),
    properties: {
      array: emberA([{ test: 'val1' }, { test: 'val1' }]),
      key: 'test',
      value: 'val1'
    },
    strictEqual: true
  });
});

test('it filters array by truthiness, if no third argument was given', function(assert) {
  compute({
    assert,
    computed: isEvery('array', 'key'),
    properties: {
      array: emberA([{ test: 'val1' }, { test: 'val2' }]),
      key: 'test'
    },
    strictEqual: true
  });
  compute({
    assert,
    computed: isEvery('array', 'key'),
    properties: {
      array: emberA([{ test: false }, { test: 'val2' }]),
      key: 'test'
    },
    strictEqual: false
  });
});

test('respects a falsy optional arg', function(assert) {
  compute({
    assert,
    computed: isEvery('array', 'key', false),
    properties: {
      array: emberA([{ test: false }, { test: false }]),
      key: 'test'
    },
    strictEqual: true
  });
  compute({
    assert,
    computed: isEvery('array', 'key', false),
    properties: {
      array: emberA([{ test: false }, { test: 'val2' }]),
      key: 'test'
    },
    strictEqual: false
  });
});

test('it responds to array changes', function(assert) {
  let { subject } = compute({
    computed: isEvery('array', 'key', 'value'),
    properties: {
      array: emberA([{ test: 'val1' }, { test: 'val1' }]),
      key: 'test',
      value: 'val1'
    }
  });

  subject.set('array', emberA([{ test: 'val1' }, { test: 'val2' }]));

  assert.strictEqual(subject.get('computed'), false);
});

test('it responds to array pushes', function(assert) {
  let array = emberA([{ test: 'val1' }, { test: 'val1' }]);

  let { subject } = compute({
    computed: isEvery('array', 'key', 'value'),
    properties: {
      array,
      key: 'test',
      value: 'val1'
    }
  });

  array.pushObject({ test: 'val2' });

  assert.strictEqual(subject.get('computed'), false);
});

test('it responds to key changes', function(assert) {
  let { subject } = compute({
    computed: isEvery('array', 'key', 'value'),
    properties: {
      array: emberA([
        { test1: 'val1', test2: 'val1' },
        { test1: 'val1', test2: 'val2' }
      ]),
      key: 'test',
      value: 'val1'
    }
  });

  subject.set('key', 'test2');

  assert.strictEqual(subject.get('computed'), false);
});

test('it responds to value changes', function(assert) {
  let { subject } = compute({
    computed: isEvery('array', 'key', 'value'),
    properties: {
      array: emberA([{ test: 'val1' }, { test: 'val1' }]),
      key: 'test',
      value: 'val1'
    }
  });

  subject.set('value', 'val2');

  assert.strictEqual(subject.get('computed'), false);
});

test('it responds to array property value changes', function(assert) {
  let array = emberA([
    EmberObject.create({ test1: 'val1', test2: 'val2' }),
    EmberObject.create({ test1: 'val1', test2: 'val2' })
  ]);

  let { subject } = compute({
    computed: isEvery('array', 'key', 'value'),
    properties: {
      array,
      key: 'test1',
      value: 'val1'
    }
  });

  assert.strictEqual(subject.get('computed'), true);

  array.set('1.test1', 'val2');

  assert.strictEqual(subject.get('computed'), false);

  array.set('1.test1', 'val1');
  array.pushObject(EmberObject.create({ test1: 'val1', test2: 'val2' }));

  assert.strictEqual(subject.get('computed'), true);

  subject.set('key', 'test2');

  assert.strictEqual(subject.get('computed'), false);

  subject.set('value', 'val2');

  assert.strictEqual(subject.get('computed'), true);
});

test('composable: it calls isEvery on array', function(assert) {
  compute({
    assert,
    computed: isEvery(
      emberA([{ test: 'val1' }, { test: 'val1' }]),
      raw('test'),
      raw('val1')
    ),
    strictEqual: true
  });
});
