import { normalizeArray2 } from 'ember-awesome-macros/array/-utils';
import { raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import sinon from 'sinon';
import compute from 'ember-macro-test-helpers/compute';

const firstParam = 'first param test';
const secondParam = 'second param test';
const returnValue = 'return value test';

let funcStub;
let array;

module('Unit | Macro | utils | normalize array 2', {
  beforeEach() {
    funcStub = sinon.stub().returns(returnValue);
    array = { func: funcStub };
  }
});

function computed(...keys) {
  return normalizeArray2(keys, 'func');
}

test('it returns undefined if array undefined', function(assert) {
  compute({
    assert,
    computed: computed('array'),
    strictEqual: undefined
  });
});

test('it calls func on array', function(assert) {
  let { result } = compute({
    computed: computed('array', 'firstParam', 'secondParam'),
    properties: {
      array,
      firstParam,
      secondParam
    }
  });

  assert.deepEqual(funcStub.args, [[firstParam, secondParam]]);
  assert.strictEqual(result, returnValue);
});

test('composable: it calls func on array', function(assert) {
  let { result } = compute({
    computed: computed(
      raw(array),
      raw(firstParam),
      raw(secondParam)
    )
  });

  assert.deepEqual(funcStub.args, [[firstParam, secondParam]]);
  assert.strictEqual(result, returnValue);
});
