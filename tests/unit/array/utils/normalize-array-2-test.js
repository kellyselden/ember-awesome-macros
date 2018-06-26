import PromiseProxyMixin from '@ember/object/promise-proxy-mixin';
import { resolve } from 'rsvp';
import ArrayProxy from '@ember/array/proxy';
import EmberObject, { computed } from '@ember/object';
import { A as emberA } from '@ember/array';
import { normalizeArray2 } from 'ember-awesome-macros/array/-utils';
import { raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import sinon from 'sinon';
import { compute } from 'ember-macro-test-helpers';

const ArrayPromiseProxy = ArrayProxy.extend(PromiseProxyMixin);

const firstParam = 'first param test';
const secondParam = 'second param test';
const returnValue = 'return value test';

let funcStub;
let originalArray;
let slicedArray;
let macro;

function initArray(array) {
  originalArray = array;
  sinon.stub(array, 'slice').returns(slicedArray);
}

module('Unit | Macro | array | utils | normalize array 2', function(hooks) {
  hooks.beforeEach(function() {
    slicedArray = emberA([]);
    initArray(emberA([]));

    funcStub = sinon.stub(slicedArray, 'pop').returns(returnValue);

    macro = normalizeArray2('pop');
  });

  test('it returns array identity if array not array type and no default value', function(assert) {
    originalArray = {};

    compute({
      assert,
      computed: macro('array'),
      properties: {
        array: originalArray
      },
      strictEqual: originalArray
    });
  });

  test('it calls func on array', function(assert) {
    let { result } = compute({
      computed: macro('array', 'firstParam', 'secondParam'),
      properties: {
        array: originalArray,
        firstParam,
        secondParam
      }
    });

    assert.strictEqual(funcStub.thisValues[0], slicedArray);
    assert.deepEqual(funcStub.args, [[firstParam, secondParam]]);
    assert.strictEqual(result, returnValue);
  });

  test('it calls prop on array', function(assert) {
    macro = normalizeArray2('length');

    compute({
      assert,
      computed: macro('array'),
      properties: {
        array: [1, 2, 3]
      },
      strictEqual: 3
    });
  });

  test('it calls ember funcs on array', function(assert) {
    macro = normalizeArray2('compact');

    compute({
      assert,
      computed: macro('array'),
      properties: {
        array: [1, null, undefined]
      },
      deepEqual: [1]
    });
  });

  test('it calls func on ember data arrays', function(assert) {
    let arrayPromise = ArrayPromiseProxy.create({
      promise: resolve(originalArray)
    });

    funcStub = sinon.stub(arrayPromise, 'isEvery').returns(returnValue);

    macro = normalizeArray2('isEvery');

    let { result } = compute({
      computed: macro('array', 'firstParam', 'secondParam'),
      properties: {
        array: arrayPromise,
        firstParam,
        secondParam
      }
    });

    assert.strictEqual(funcStub.thisValues[0], arrayPromise);
    assert.deepEqual(funcStub.args, [[firstParam, secondParam]]);
    assert.strictEqual(result, returnValue);
  });

  test('it allows default value override', function(assert) {
    macro = normalizeArray2('pop', () => true);

    compute({
      assert,
      computed: macro('array'),
      strictEqual: true
    });
  });

  test('default value is a new copy every recalculation', function(assert) {
    macro = normalizeArray2('pop', () => []);

    let { subject } = compute({
      computed: macro('array')
    });

    let result = subject.get('computed');

    subject.set('array', null);

    assert.notEqual(subject.get('computed'), result);
  });

  test('it lazily calculates keys', function(assert) {
    let spy = sinon.spy();

    compute({
      baseClass: EmberObject.extend({
        secondParam: computed(spy)
      }),
      computed: macro('array', 'firstParam', 'secondParam')
    });

    assert.notOk(spy.called);
  });

  test('it handles native arrays', function(assert) {
    initArray([]);

    let { result } = compute({
      computed: macro('array', 'firstParam', 'secondParam'),
      properties: {
        array: originalArray,
        firstParam,
        secondParam
      }
    });

    assert.strictEqual(funcStub.thisValues[0], slicedArray);
    assert.deepEqual(funcStub.args, [[firstParam, secondParam]]);
    assert.strictEqual(result, returnValue);
  });

  test('composable: it calls func on array', function(assert) {
    let { result } = compute({
      computed: macro(
        raw(originalArray),
        raw(firstParam),
        raw(secondParam)
      )
    });

    assert.strictEqual(funcStub.thisValues[0], slicedArray);
    assert.deepEqual(funcStub.args, [[firstParam, secondParam]]);
    assert.strictEqual(result, returnValue);
  });
});
