import { reduce } from 'ember-awesome-macros/array';
import EmberObject, { computed } from '@ember/object';
import { A as emberA } from '@ember/array';
import { module, test } from 'qunit';
import { compute } from 'ember-macro-test-helpers';
import sinon from 'sinon';

module('Integration | Macro | array | reduce', function() {
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

  test('it responds to array property value changes', function(assert) {
    let array = emberA([
      EmberObject.create({ prop: 1 }),
      EmberObject.create({ prop: 2 })
    ]);

    let { subject } = compute({
      computed: reduce('array.@each.prop', 'callback', 'initialValue'),
      properties: {
        array,
        callback(accumulator, currentValue) {
          return accumulator + currentValue.get('prop');
        },
        initialValue: 3
      }
    });

    assert.strictEqual(subject.get('computed'), 6);

    array.set('1.prop', 1);

    assert.strictEqual(subject.get('computed'), 5);

    array.pushObject(EmberObject.create({ prop: 2 }));

    assert.strictEqual(subject.get('computed'), 7);

    subject.set('callback', (accumulator, currentValue) => {
      return accumulator - currentValue.get('prop');
    });

    assert.strictEqual(subject.get('computed'), -1);
  });

  test('it uses new initial values when factory', function(assert) {
    let { subject } = compute({
      computed: reduce('array', 'callback', 'initialValue'),
      properties: {
        array: emberA([1, 2]),
        callback(accumulator, currentValue) {
          accumulator.push(currentValue);
          return accumulator;
        },
        initialValue: () => []
      }
    });

    subject.set('array', emberA([1, 1]));

    assert.deepEqual(subject.get('computed'), [1, 1]);
  });

  test('doesn\'t calculate when unnecessary', function(assert) {
    let callback = sinon.spy();

    compute({
      computed: find(
        undefined,
        computed(callback)
      )
    });

    assert.notOk(callback.called);
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

  test('it handles native arrays', function(assert) {
    compute({
      assert,
      computed: reduce('array', 'callback', 'initialValue'),
      properties: {
        array: [1, 2],
        callback(accumulator, currentValue) {
          return accumulator + currentValue;
        },
        initialValue: 3
      },
      strictEqual: 6
    });
  });
});
