import { A as emberA } from '@ember/array';
import { get, set } from '@ember/object';
import { resolve } from 'rsvp';
import {
  array as promiseArray,
  resolve as promiseResolve
} from 'ember-awesome-macros/promise';
import { module, test } from 'qunit';
import { compute } from 'ember-macro-helpers/test-support';

let array;

module('Integration | Macro | promise | array', function(hooks) {
  hooks.beforeEach(function() {
    array = emberA([null]);
  });

  test('it returns an empty array', function(assert) {
    let { result } = compute({
      computed: promiseArray('promise'),
      properties: {
        promise: resolve(array)
      }
    });

    assert.strictEqual(get(result, 'length'), 0);
  });

  test('it resolves to a full array', function(assert) {
    let { result } = compute({
      computed: promiseArray('promise'),
      properties: {
        promise: resolve(array)
      }
    });

    return result.then(() => {
      assert.strictEqual(get(result, 'length'), 1);
    });
  });

  test('resolved value is an array', function(assert) {
    let { result } = compute({
      computed: promiseArray('promise'),
      properties: {
        promise: resolve(array)
      }
    });

    return result.then(result => {
      assert.strictEqual(get(result, 'length'), 1);
    });
  });

  test('it responds to reassigns', function(assert) {
    let { subject } = compute({
      computed: promiseArray('promise'),
      properties: {
        promise: resolve(array)
      }
    });

    set(subject, 'promise', resolve(emberA([null, null])));

    let result = get(subject, 'computed');

    return result.then(result => {
      assert.strictEqual(get(result, 'length'), 2);
    });
  });

  test('it responds to pushes', function(assert) {
    let { subject } = compute({
      computed: promiseArray('promise'),
      properties: {
        promise: resolve(array)
      }
    });

    array.pushObject(null);

    let result = get(subject, 'computed');

    return result.then(result => {
      assert.strictEqual(get(result, 'length'), 2);
    });
  });

  test('value: resolved value is an array', function(assert) {
    let { result } = compute({
      computed: promiseArray(resolve(array))
    });

    return result.then(result => {
      assert.strictEqual(get(result, 'length'), 1);
    });
  });

  test('composing: resolved value is an array', function(assert) {
    let { result } = compute({
      computed: promiseArray(promiseResolve(array))
    });

    return result.then(result => {
      assert.strictEqual(get(result, 'length'), 1);
    });
  });
});
