import { math, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import sinon from 'sinon';
import compute from 'ember-macro-test-helpers/compute';

const key = 123;
const returnValue = 'return value test';

let sandbox;
let mathStub;

module('Unit | Macro | math', {
  beforeEach() {
    sandbox = sinon.sandbox.create();
    mathStub = sandbox.stub(Math, 'round').returns(returnValue);
  },
  afterEach() {
    sandbox.restore();
  }
});

test('lookup: calls math function', function(assert) {
  let { result } = compute({
    computed: math.round('key'),
    properties: {
      key
    }
  });

  assert.deepEqual(mathStub.args[1], [key]);
  assert.strictEqual(result, returnValue);
});

test('value: calls math function', function(assert) {
  let { result } = compute({
    computed: math.round(key)
  });

  assert.deepEqual(mathStub.args[0], [key]);
  assert.strictEqual(result, returnValue);
});

test('composing: calls math function', function(assert) {
  let { result } = compute({
    computed: math.round(raw(key))
  });

  assert.deepEqual(mathStub.args[0], [key]);
  assert.strictEqual(result, returnValue);
});
