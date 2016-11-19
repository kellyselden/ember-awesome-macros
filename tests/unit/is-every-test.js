import { isEvery, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import sinon from 'sinon';
import compute from '../helpers/compute';

const key = 'key test';
const value = 'value test';
const retVal = 'return value test';

let isEveryStub;
let array;

module('Unit | Macro | is every', {
  beforeEach() {
    isEveryStub = sinon.stub().returns(retVal);
    array = { isEvery: isEveryStub };
  }
});

test('it returns undefined if array undefined', function(assert) {
  compute({
    assert,
    computed: isEvery('array', 'key', 'value'),
    strictEqual: undefined
  });
});

test('it calls isEvery on array', function(assert) {
  let { val } = compute({
    computed: isEvery('array', 'key', 'value'),
    properties: {
      array,
      key,
      value
    }
  });

  assert.deepEqual(isEveryStub.args, [[key, value]]);
  assert.strictEqual(val, retVal);
});

test('composable: it calls isEvery on array', function(assert) {
  let { val } = compute({
    computed: isEvery(
      array,
      raw(key),
      raw(value)
    )
  });

  assert.deepEqual(isEveryStub.args, [[key, value]]);
  assert.strictEqual(val, retVal);
});
