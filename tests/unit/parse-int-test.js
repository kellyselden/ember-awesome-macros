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
  let { val } = compute({
    computed: parseInt('string')
  });

  assert.notOk(parseIntStub.called);
  assert.strictEqual(val, undefined);
});

test('it calls parseInt on string without radix', function(assert) {
  let { val } = compute({
    computed: parseInt('string'),
    properties: {
      string
    }
  });

  assert.deepEqual(parseIntStub.args, [[string]]);
  assert.strictEqual(val, returnValue);
});

test('it returns undefined if string supplied but radix undefined', function(assert) {
  let { val } = compute({
    computed: parseInt('string', 'radix'),
    properties: {
      string
    }
  });

  assert.notOk(parseIntStub.called);
  assert.strictEqual(val, undefined);
});

test('it calls parseInt on string with radix', function(assert) {
  let { val } = compute({
    computed: parseInt('string', 'radix'),
    properties: {
      string,
      radix
    }
  });

  assert.deepEqual(parseIntStub.args, [[string, radix]]);
  assert.strictEqual(val, returnValue);
});

test('composable: it calls parseInt on string', function(assert) {
  let { val } = compute({
    computed: parseInt(
      raw(string),
      raw(radix)
    )
  });

  assert.deepEqual(parseIntStub.args, [[string, radix]]);
  assert.strictEqual(val, returnValue);
});
