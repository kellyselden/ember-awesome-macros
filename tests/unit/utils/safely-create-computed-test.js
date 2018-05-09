import { safelyCreateComputed } from 'ember-awesome-macros/-utils';
import { raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import sinon from 'sinon';
import { compute } from 'ember-macro-test-helpers';

const firstParam = 'first param test';
const secondParam = 'second param test';
const returnValue = 'return value test';

let funcStub;
let string;

const computed = safelyCreateComputed('func');

module('Unit | Macro | utils | safely create computed', function(hooks) {
  hooks.beforeEach(function() {
    funcStub = sinon.stub().returns(returnValue);
    string = { func: funcStub };
  });

  test('it returns undefined if string undefined', function(assert) {
    let { result } = compute({
      computed: computed('string')
    });

    assert.notOk(funcStub.called);
    assert.strictEqual(result, undefined);
  });

  test('it calls func on string without args', function(assert) {
    let { result } = compute({
      computed: computed('string'),
      properties: {
        string
      }
    });

    assert.deepEqual(funcStub.args, [[]]);
    assert.strictEqual(result, returnValue);
  });

  test('it returns undefined if string supplied but first param undefined', function(assert) {
    let { result } = compute({
      computed: computed('string', 'firstParam'),
      properties: {
        string
      }
    });

    assert.notOk(funcStub.called);
    assert.strictEqual(result, undefined);
  });

  test('it calls func on string without second param', function(assert) {
    let { result } = compute({
      computed: computed('string', 'firstParam'),
      properties: {
        string,
        firstParam
      }
    });

    assert.deepEqual(funcStub.args, [[firstParam]]);
    assert.strictEqual(result, returnValue);
  });

  test('it returns undefined if first param supplied but second param undefined', function(assert) {
    let { result } = compute({
      computed: computed('string', 'firstParam', 'secondParam'),
      properties: {
        string,
        firstParam
      }
    });

    assert.notOk(funcStub.called);
    assert.strictEqual(result, undefined);
  });

  test('it calls func on string with second param', function(assert) {
    let { result } = compute({
      computed: computed('string', 'firstParam', 'secondParam'),
      properties: {
        string,
        firstParam,
        secondParam
      }
    });

    assert.deepEqual(funcStub.args, [[firstParam, secondParam]]);
    assert.strictEqual(result, returnValue);
  });

  test('composable: it calls func on string', function(assert) {
    let { result } = compute({
      computed: computed(
        raw(string),
        raw(firstParam),
        raw(secondParam)
      )
    });

    assert.deepEqual(funcStub.args, [[firstParam, secondParam]]);
    assert.strictEqual(result, returnValue);
  });
});
