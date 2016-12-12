import { parseInt, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import sinon from 'sinon';
import compute from 'ember-macro-test-helpers/compute';

const string = 'string test';
const radix = 'radix test';
const returnValue = 'return value test';

let sandbox;
let parseIntStub;

module('Unit | Macro | parse int', {
  beforeEach() {
    sandbox = sinon.sandbox.create();
    parseIntStub = sandbox.stub(window, 'parseInt').returns(returnValue);
  },
  afterEach() {
    sandbox.restore();
  }
});

test('it returns undefined if string undefined', function(assert) {
  let { result } = compute({
    computed: parseInt('string')
  });

  assert.notOk(parseIntStub.called);
  assert.strictEqual(result, undefined);
});

test('it calls parseInt on string without radix', function(assert) {
  let { result } = compute({
    computed: parseInt('string'),
    properties: {
      string
    }
  });

  assert.deepEqual(parseIntStub.args, [[string]]);
  assert.strictEqual(result, returnValue);
});

test('it returns undefined if string supplied but radix undefined', function(assert) {
  let { result } = compute({
    computed: parseInt('string', 'radix'),
    properties: {
      string
    }
  });

  assert.notOk(parseIntStub.called);
  assert.strictEqual(result, undefined);
});

test('it calls parseInt on string with radix', function(assert) {
  let { result } = compute({
    computed: parseInt('string', 'radix'),
    properties: {
      string,
      radix
    }
  });

  assert.deepEqual(parseIntStub.args, [[string, radix]]);
  assert.strictEqual(result, returnValue);
});

test('composable: it calls parseInt on string', function(assert) {
  let { result } = compute({
    computed: parseInt(
      raw(string),
      raw(radix)
    )
  });

  assert.deepEqual(parseIntStub.args, [[string, radix]]);
  assert.strictEqual(result, returnValue);
});
