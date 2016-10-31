import { indexOf, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import sinon from 'sinon';
import compute from '../helpers/compute';

const value = 1;
const fromIndex = 2;
const retVal = 3;

let indexOfStub;
let array;

module('Unit | Macro | index of', {
  beforeEach() {
    indexOfStub = sinon.stub().returns(retVal);
    array = { indexOf: indexOfStub };
  }
});

test('it returns -1 if array undefined', function(assert) {
  compute({
    assert,
    computed: indexOf('array', 'value', 'fromIndex'),
    expected: -1
  });
});

test('it calls indexOf on array', function(assert) {
  let { val } = compute({
    computed: indexOf('array', 'value', 'fromIndex'),
    properties: {
      array,
      value,
      fromIndex
    }
  });

  assert.deepEqual(indexOfStub.args, [[value, fromIndex]]);
  assert.strictEqual(val, retVal);
});

test('composable: it calls indexOf on array', function(assert) {
  let { val } = compute({
    computed: indexOf(
      raw(array),
      value,
      fromIndex
    )
  });

  assert.deepEqual(indexOfStub.args, [[value, fromIndex]]);
  assert.strictEqual(val, retVal);
});
