import { indexOf, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import sinon from 'sinon';
import compute from 'ember-macro-test-helpers/compute';

const value = 'value test';
const fromIndex = 'from index test';
const returnValue = 'return value test';

let indexOfStub;
let array;

module('Unit | Macro | index of', {
  beforeEach() {
    indexOfStub = sinon.stub().returns(returnValue);
    array = { indexOf: indexOfStub };
  }
});

test('it returns -1 if array undefined', function(assert) {
  compute({
    assert,
    computed: indexOf('array', 'value', 'fromIndex'),
    strictEqual: -1
  });
});

test('it calls indexOf on array', function(assert) {
  let { result } = compute({
    computed: indexOf('array', 'value', 'fromIndex'),
    properties: {
      array,
      value,
      fromIndex
    }
  });

  assert.deepEqual(indexOfStub.args, [[value, fromIndex]]);
  assert.strictEqual(result, returnValue);
});

test('composable: it calls indexOf on array', function(assert) {
  let { result } = compute({
    computed: indexOf(
      raw(array),
      raw(value),
      raw(fromIndex)
    )
  });

  assert.deepEqual(indexOfStub.args, [[value, fromIndex]]);
  assert.strictEqual(result, returnValue);
});
