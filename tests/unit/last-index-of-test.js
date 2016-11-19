import { lastIndexOf, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import sinon from 'sinon';
import compute from '../helpers/compute';

const value = 1;
const fromIndex = 2;
const retVal = 3;

let lastIndexOfStub;
let array;

module('Unit | Macro | last index of', {
  beforeEach() {
    lastIndexOfStub = sinon.stub().returns(retVal);
    array = { lastIndexOf: lastIndexOfStub };
  }
});

test('it returns -1 if array undefined', function(assert) {
  compute({
    assert,
    computed: lastIndexOf('array', 'value', 'fromIndex'),
    strictEqual: -1
  });
});

test('it calls lastIndexOf on array', function(assert) {
  let { val } = compute({
    computed: lastIndexOf('array', 'value', 'fromIndex'),
    properties: {
      array,
      value,
      fromIndex
    }
  });

  assert.deepEqual(lastIndexOfStub.args, [[value, fromIndex]]);
  assert.strictEqual(val, retVal);
});

test('composable: it calls lastIndexOf on array', function(assert) {
  let { val } = compute({
    computed: lastIndexOf(
      raw(array),
      value,
      fromIndex
    )
  });

  assert.deepEqual(lastIndexOfStub.args, [[value, fromIndex]]);
  assert.strictEqual(val, retVal);
});
