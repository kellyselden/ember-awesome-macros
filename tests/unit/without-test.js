import { without, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import sinon from 'sinon';
import compute from 'ember-macro-test-helpers/compute';

const item = 'test item';
const retVal = 'return value';

let withoutStub;
let array;

module('Unit | Macro | without', {
  beforeEach() {
    withoutStub = sinon.stub().returns(retVal);
    array = { without: withoutStub };
  }
});

test('it returns undefined if array undefined', function(assert) {
  compute({
    assert,
    computed: without('array', 'item'),
    strictEqual: undefined
  });
});

test('it calls without on array', function(assert) {
  let { result } = compute({
    computed: without('array', 'item'),
    properties: {
      array,
      item
    }
  });

  assert.deepEqual(withoutStub.args, [[item]]);
  assert.strictEqual(result, retVal);
});

test('composable: it calls without on array', function(assert) {
  let { result } = compute({
    computed: without(
      array,
      raw(item)
    )
  });

  assert.deepEqual(withoutStub.args, [[item]]);
  assert.strictEqual(result, retVal);
});
