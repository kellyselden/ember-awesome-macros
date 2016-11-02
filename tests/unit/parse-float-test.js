import { parseFloat, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import sinon from 'sinon';
import compute from '../helpers/compute';

const string = 'string test';
const returnValue = 'return value test';

let sandbox;
let parseFloatStub;

module('Unit | Macro | parse float', {
  beforeEach() {
    sandbox = sinon.sandbox.create();
    parseFloatStub = sandbox.stub(window, 'parseFloat').returns(returnValue);
  },
  afterEach() {
    sandbox.restore();
  }
});

test('it returns undefined if string undefined', function(assert) {
  let { val } = compute({
    computed: parseFloat('string')
  });

  assert.notOk(parseFloatStub.called);
  assert.strictEqual(val, undefined);
});

test('it calls parseFloat on string', function(assert) {
  let { val } = compute({
    computed: parseFloat('string'),
    properties: {
      string
    }
  });

  assert.deepEqual(parseFloatStub.args, [[string]]);
  assert.strictEqual(val, returnValue);
});

test('composable: it calls parseFloat on string', function(assert) {
  let { val } = compute({
    computed: parseFloat(
      raw(string)
    )
  });

  assert.deepEqual(parseFloatStub.args, [[string]]);
  assert.strictEqual(val, returnValue);
});
