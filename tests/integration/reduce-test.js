import { reduce } from 'ember-awesome-macros';
import { A as emberA } from 'ember-array/utils';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

module('Integration | Macro | reduce');

test('it returns undefined if array undefined', function(assert) {
  compute({
    assert,
    computed: reduce('array'),
    strictEqual: undefined
  });
});

test('it calls reduce on array', function(assert) {
  compute({
    assert,
    computed: reduce('array', 'callback', 'initialValue'),
    properties: {
      array: emberA([1, 2]),
      callback(accumulator, currentValue) {
        return accumulator + currentValue;
      },
      initialValue: 3
    },
    strictEqual: 6
  });
});

test('it watches changes to array', function(assert) {
  let { subject } = compute({
    computed: reduce('array', 'callback', 'initialValue'),
    properties: {
      array: emberA([1, 2]),
      callback(accumulator, currentValue) {
        return accumulator + currentValue;
      },
      initialValue: 3
    }
  });

  subject.set('array', emberA([1, 1]));

  assert.strictEqual(subject.get('computed'), 5);
});

test('it watches changes to callback', function(assert) {
  let { subject } = compute({
    computed: reduce('array', 'callback', 'initialValue'),
    properties: {
      array: emberA([1, 2]),
      callback(accumulator, currentValue) {
        return accumulator + currentValue;
      },
      initialValue: 3
    }
  });

  subject.set('callback', (accumulator, currentValue) => {
    return accumulator - currentValue;
  });

  assert.strictEqual(subject.get('computed'), 0);
});

test('it watches changes to initialValue', function(assert) {
  let { subject } = compute({
    computed: reduce('array', 'callback', 'initialValue'),
    properties: {
      array: emberA([1, 2]),
      callback(accumulator, currentValue) {
        return accumulator + currentValue;
      },
      initialValue: 3
    }
  });

  subject.set('initialValue', 0);

  assert.strictEqual(subject.get('computed'), 3);
});

test('it watches pushes to array', function(assert) {
  let array = emberA([1, 2]);

  let { subject } = compute({
    computed: reduce('array', 'callback', 'initialValue'),
    properties: {
      array,
      callback(accumulator, currentValue) {
        return accumulator + currentValue;
      },
      initialValue: 3
    }
  });

  array.pushObject(1);

  assert.strictEqual(subject.get('computed'), 7);
});

test('composable: it calls reduce on array', function(assert) {
  compute({
    assert,
    computed: reduce(emberA([1, 2]), (accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 3),
    strictEqual: 6
  });
});
