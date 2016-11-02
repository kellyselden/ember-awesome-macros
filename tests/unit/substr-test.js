import { substr, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import sinon from 'sinon';
import compute from '../helpers/compute';

const start = 'start test';
const end = 'end test';
const returnValue = 'return value test';

let substrStub;
let string;

module('Unit | Macro | substr', {
  beforeEach() {
    substrStub = sinon.stub().returns(returnValue);
    string = { substr: substrStub };
  }
});

test('it returns undefined if string undefined', function(assert) {
  let { val } = compute({
    computed: substr('string')
  });

  assert.notOk(substrStub.called);
  assert.strictEqual(val, undefined);
});

test('it calls substr on string without args', function(assert) {
  let { val } = compute({
    computed: substr('string'),
    properties: {
      string
    }
  });

  assert.deepEqual(substrStub.args, [[]]);
  assert.strictEqual(val, returnValue);
});

test('it returns undefined if string supplied but start undefined', function(assert) {
  let { val } = compute({
    computed: substr('string', 'start'),
    properties: {
      string
    }
  });

  assert.notOk(substrStub.called);
  assert.strictEqual(val, undefined);
});

test('it calls substr on string without end', function(assert) {
  let { val } = compute({
    computed: substr('string', 'start'),
    properties: {
      string,
      start
    }
  });

  assert.deepEqual(substrStub.args, [[start]]);
  assert.strictEqual(val, returnValue);
});

test('it returns undefined if start supplied but end undefined', function(assert) {
  let { val } = compute({
    computed: substr('string', 'start', 'end'),
    properties: {
      string,
      start
    }
  });

  assert.notOk(substrStub.called);
  assert.strictEqual(val, undefined);
});

test('it calls substr on string with end', function(assert) {
  let { val } = compute({
    computed: substr('string', 'start', 'end'),
    properties: {
      string,
      start,
      end
    }
  });

  assert.deepEqual(substrStub.args, [[start, end]]);
  assert.strictEqual(val, returnValue);
});

test('composable: it calls substr on string', function(assert) {
  let { val } = compute({
    computed: substr(
      string,
      raw(start),
      raw(end)
    )
  });

  assert.deepEqual(substrStub.args, [[start, end]]);
  assert.strictEqual(val, returnValue);
});
