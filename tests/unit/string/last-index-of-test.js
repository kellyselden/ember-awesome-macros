import { lastIndexOf } from 'ember-awesome-macros/string';
import { raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import sinon from 'sinon';
import compute from '../../helpers/compute';

const value = 'value test';
const fromIndex = 'from index test';
const returnValue = 'return value test';

let lastIndexOfStub;
let string;

module('Unit | Macro | string | last index of', {
  beforeEach() {
    lastIndexOfStub = sinon.stub().returns(returnValue);
    string = { lastIndexOf: lastIndexOfStub };
  }
});

test('it returns undefined if string undefined', function(assert) {
  let { val } = compute({
    computed: lastIndexOf('string')
  });

  assert.notOk(lastIndexOfStub.called);
  assert.strictEqual(val, undefined);
});

test('it calls lastIndexOf on string without args', function(assert) {
  let { val } = compute({
    computed: lastIndexOf('string'),
    properties: {
      string
    }
  });

  assert.deepEqual(lastIndexOfStub.args, [[]]);
  assert.strictEqual(val, returnValue);
});

test('it returns undefined if string supplied but value undefined', function(assert) {
  let { val } = compute({
    computed: lastIndexOf('string', 'value'),
    properties: {
      string
    }
  });

  assert.notOk(lastIndexOfStub.called);
  assert.strictEqual(val, undefined);
});

test('it calls lastIndexOf on string without fromIndex', function(assert) {
  let { val } = compute({
    computed: lastIndexOf('string', 'value'),
    properties: {
      string,
      value
    }
  });

  assert.deepEqual(lastIndexOfStub.args, [[value]]);
  assert.strictEqual(val, returnValue);
});

test('it returns undefined if value supplied but fromIndex undefined', function(assert) {
  let { val } = compute({
    computed: lastIndexOf('string', 'value', 'fromIndex'),
    properties: {
      string,
      value
    }
  });

  assert.notOk(lastIndexOfStub.called);
  assert.strictEqual(val, undefined);
});

test('it calls lastIndexOf on string with fromIndex', function(assert) {
  let { val } = compute({
    computed: lastIndexOf('string', 'value', 'fromIndex'),
    properties: {
      string,
      value,
      fromIndex
    }
  });

  assert.deepEqual(lastIndexOfStub.args, [[value, fromIndex]]);
  assert.strictEqual(val, returnValue);
});

test('composable: it calls lastIndexOf on string', function(assert) {
  let { val } = compute({
    computed: lastIndexOf(
      raw(string),
      raw(value),
      raw(fromIndex)
    )
  });

  assert.deepEqual(lastIndexOfStub.args, [[value, fromIndex]]);
  assert.strictEqual(val, returnValue);
});
