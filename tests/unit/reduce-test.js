import { reduce, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import sinon from 'sinon';
import compute from 'ember-macro-test-helpers/compute';

const callback = () => {};
const initialValue = {};
const returnValue = 'return value test';

let reduceStub;
let array;

module('Unit | Macro | reduce', {
  beforeEach() {
    reduceStub = sinon.stub().returns(returnValue);
    array = { reduce: reduceStub };
  }
});

test('it returns undefined if array undefined', function(assert) {
  compute({
    assert,
    computed: reduce('array'),
    strictEqual: undefined
  });
});

test('it calls reduce on array', function(assert) {
  let { val } = compute({
    computed: reduce('array', callback, initialValue),
    properties: {
      array
    }
  });

  assert.deepEqual(reduceStub.args, [[callback, initialValue]]);
  assert.strictEqual(val, returnValue);
});

test('composable: it calls reduce on array', function(assert) {
  let { val } = compute({
    computed: reduce(raw(array), callback, initialValue)
  });

  assert.deepEqual(reduceStub.args, [[callback, initialValue]]);
  assert.strictEqual(val, returnValue);
});
