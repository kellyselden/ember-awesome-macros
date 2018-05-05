import raw from 'ember-macro-helpers/raw';
import { toStr } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import sinon from 'sinon';
import compute from 'ember-macro-test-helpers/compute';

const arg = 123;
const returnValue = 'return value test';

let toStringStub;
let obj;

module('Unit | Macro | to str', function(hooks) {
  hooks.beforeEach(function() {
    toStringStub = sinon.stub().returns(returnValue);
    obj = { toString: toStringStub };
  });

  function getLatestToStringCall() {
    return toStringStub.args[toStringStub.callCount - 1];
  }

  test('it returns undefined if obj undefined', function(assert) {
    compute({
      assert,
      computed: toStr('obj'),
      strictEqual: undefined
    });
  });

  test('it calls toString on obj', function(assert) {
    let { result } = compute({
      computed: toStr('obj', 'arg'),
      properties: {
        obj,
        arg
      }
    });

    assert.deepEqual(getLatestToStringCall(), [arg]);
    assert.strictEqual(result, returnValue);
  });

  test('value: it calls toString on obj', function(assert) {
    let { result } = compute({
      computed: toStr(
        obj,
        arg
      )
    });

    assert.deepEqual(getLatestToStringCall(), [arg]);
    assert.strictEqual(result, returnValue);
  });

  test('composable: it calls toString on obj', function(assert) {
    let { result } = compute({
      computed: toStr(
        raw(obj),
        raw(arg)
      )
    });

    assert.deepEqual(getLatestToStringCall(), [arg]);
    assert.strictEqual(result, returnValue);
  });
});
