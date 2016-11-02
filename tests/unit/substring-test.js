import { substring, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import sinon from 'sinon';
import compute from '../helpers/compute';

const start = 'start test';
const length = 'length test';
const returnValue = 'return value test';

let substringStub;
let string;

module('Unit | Macro | substring', {
  beforeEach() {
    substringStub = sinon.stub().returns(returnValue);
    string = { substring: substringStub };
  }
});

test('it returns undefined if string undefined', function(assert) {
  let { val } = compute({
    computed: substring('string')
  });

  assert.notOk(substringStub.called);
  assert.strictEqual(val, undefined);
});

test('it calls substring on string without args', function(assert) {
  let { val } = compute({
    computed: substring('string'),
    properties: {
      string
    }
  });

  assert.deepEqual(substringStub.args, [[]]);
  assert.strictEqual(val, returnValue);
});

test('it returns undefined if string supplied but start undefined', function(assert) {
  let { val } = compute({
    computed: substring('string', 'start'),
    properties: {
      string
    }
  });

  assert.notOk(substringStub.called);
  assert.strictEqual(val, undefined);
});

test('it calls substring on string without length', function(assert) {
  let { val } = compute({
    computed: substring('string', 'start'),
    properties: {
      string,
      start
    }
  });

  assert.deepEqual(substringStub.args, [[start]]);
  assert.strictEqual(val, returnValue);
});

test('it returns undefined if start supplied but length undefined', function(assert) {
  let { val } = compute({
    computed: substring('string', 'start', 'length'),
    properties: {
      string,
      start
    }
  });

  assert.notOk(substringStub.called);
  assert.strictEqual(val, undefined);
});

test('it calls substring on string with length', function(assert) {
  let { val } = compute({
    computed: substring('string', 'start', 'length'),
    properties: {
      string,
      start,
      length
    }
  });

  assert.deepEqual(substringStub.args, [[start, length]]);
  assert.strictEqual(val, returnValue);
});

test('composable: it calls substring on string', function(assert) {
  let { val } = compute({
    computed: substring(
      string,
      raw(start),
      raw(length)
    )
  });

  assert.deepEqual(substringStub.args, [[start, length]]);
  assert.strictEqual(val, returnValue);
});
