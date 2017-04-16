import { lastIndexOf } from 'ember-awesome-macros/array';
import { raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import sinon from 'sinon';
import compute from 'ember-macro-test-helpers/compute';

const value = 'value test';
const fromIndex = 'from index test';
const returnValue = 'return value test';

let lastIndexOfStub;
let array;

module('Unit | Macro | array | last index of', {
  beforeEach() {
    lastIndexOfStub = sinon.stub().returns(returnValue);
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
  let { result } = compute({
    computed: lastIndexOf('array', 'value', 'fromIndex'),
    properties: {
      array,
      value,
      fromIndex
    }
  });

  assert.deepEqual(lastIndexOfStub.args, [[value, fromIndex]]);
  assert.strictEqual(result, returnValue);
});

test('composable: it calls lastIndexOf on array', function(assert) {
  let { result } = compute({
    computed: lastIndexOf(
      raw(array),
      raw(value),
      raw(fromIndex)
    )
  });

  assert.deepEqual(lastIndexOfStub.args, [[value, fromIndex]]);
  assert.strictEqual(result, returnValue);
});
