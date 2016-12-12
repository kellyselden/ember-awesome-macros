import { slice, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import sinon from 'sinon';
import compute from 'ember-macro-test-helpers/compute';

const begin = 'begin test';
const end = 'end test';
const returnValue = 'return value test';

let sliceStub;
let array;

module('Unit | Macro | slice', {
  beforeEach() {
    sliceStub = sinon.stub().returns(returnValue);
    array = { slice: sliceStub };
  }
});

test('it returns undefined if array undefined', function(assert) {
  compute({
    assert,
    computed: slice('array', 'begin', 'end'),
    strictEqual: undefined
  });
});

test('it calls slice on array', function(assert) {
  let { result } = compute({
    computed: slice('array', 'begin', 'end'),
    properties: {
      array,
      begin,
      end
    }
  });

  assert.deepEqual(sliceStub.args, [[begin, end]]);
  assert.strictEqual(result, returnValue);
});

test('composable: it calls slice on array', function(assert) {
  let { result } = compute({
    computed: slice(
      array,
      raw(begin),
      raw(end)
    )
  });

  assert.deepEqual(sliceStub.args, [[begin, end]]);
  assert.strictEqual(result, returnValue);
});
