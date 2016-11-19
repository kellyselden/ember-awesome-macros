import { indexOf } from 'ember-awesome-macros/string';
import { raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import sinon from 'sinon';
import compute from '../../helpers/compute';

const value = 'value test';
const fromIndex = 'from index test';
const returnValue = 'return value test';

let indexOfStub;
let string;

module('Unit | Macro | string | index of', {
  beforeEach() {
    indexOfStub = sinon.stub().returns(returnValue);
    string = { indexOf: indexOfStub };
  }
});

test('it returns undefined if string undefined', function(assert) {
  let { val } = compute({
    computed: indexOf('string')
  });

  assert.notOk(indexOfStub.called);
  assert.strictEqual(val, undefined);
});

test('it calls indexOf on string without args', function(assert) {
  let { val } = compute({
    computed: indexOf('string'),
    properties: {
      string
    }
  });

  assert.deepEqual(indexOfStub.args, [[]]);
  assert.strictEqual(val, returnValue);
});

test('it returns undefined if string supplied but value undefined', function(assert) {
  let { val } = compute({
    computed: indexOf('string', 'value'),
    properties: {
      string
    }
  });

  assert.notOk(indexOfStub.called);
  assert.strictEqual(val, undefined);
});

test('it calls indexOf on string without fromIndex', function(assert) {
  let { val } = compute({
    computed: indexOf('string', 'value'),
    properties: {
      string,
      value
    }
  });

  assert.deepEqual(indexOfStub.args, [[value]]);
  assert.strictEqual(val, returnValue);
});

test('it returns undefined if value supplied but fromIndex undefined', function(assert) {
  let { val } = compute({
    computed: indexOf('string', 'value', 'fromIndex'),
    properties: {
      string,
      value
    }
  });

  assert.notOk(indexOfStub.called);
  assert.strictEqual(val, undefined);
});

test('it calls indexOf on string with fromIndex', function(assert) {
  let { val } = compute({
    computed: indexOf('string', 'value', 'fromIndex'),
    properties: {
      string,
      value,
      fromIndex
    }
  });

  assert.deepEqual(indexOfStub.args, [[value, fromIndex]]);
  assert.strictEqual(val, returnValue);
});

test('composable: it calls indexOf on string', function(assert) {
  let { val } = compute({
    computed: indexOf(
      raw(string),
      raw(value),
      raw(fromIndex)
    )
  });

  assert.deepEqual(indexOfStub.args, [[value, fromIndex]]);
  assert.strictEqual(val, returnValue);
});
