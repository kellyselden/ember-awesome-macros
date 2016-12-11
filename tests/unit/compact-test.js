import { compact, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import sinon from 'sinon';
import compute from 'ember-macro-test-helpers/compute';

const retVal = 'return value';

let compactStub;
let array;

module('Unit | Macro | compact', {
  beforeEach() {
    compactStub = sinon.stub().returns(retVal);
    array = { compact: compactStub };
  }
});

test('it returns undefined if array undefined', function(assert) {
  compute({
    assert,
    computed: compact('array'),
    strictEqual: undefined
  });
});

test('it calls compact on array', function(assert) {
  let { val } = compute({
    computed: compact('array'),
    properties: {
      array
    }
  });

  assert.deepEqual(compactStub.args, [[]]);
  assert.strictEqual(val, retVal);
});

test('composable: it calls compact on array', function(assert) {
  let { val } = compute({
    computed: compact(
      raw(array)
    )
  });

  assert.deepEqual(compactStub.args, [[]]);
  assert.strictEqual(val, retVal);
});
