import EmberObject from 'ember-object';
import { hash, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import sinon from 'sinon';
import compute from 'ember-macro-test-helpers/compute';

const value1 = 12;
const value2 = 23;
const returnValue = 'return value test';

let sandbox;
let createStub;
let expected;

module('Unit | Macro | hash', {
  beforeEach() {
    sandbox = sinon.sandbox.create();
    createStub = sandbox.stub(EmberObject, 'create').returns(returnValue);

    expected = {
      prop1: value1,
      prop2: value2
    };
  },
  afterEach() {
    sandbox.restore();
  }
});

function doAssertions(assert, result, callNumber) {
  assert.deepEqual(createStub.thisValues[callNumber], EmberObject);
  assert.deepEqual(createStub.args[callNumber], [expected]);
  assert.strictEqual(result, returnValue);
}

test('it calls Ember.Object.create', function(assert) {
  let { result } = compute({
    computed: hash({
      prop1: 'key1',
      prop2: 'key2'
    }),
    properties: {
      key1: value1,
      key2: value2
    }
  });

  doAssertions(assert, result, 1);
});

test('it responds to key changes', function(assert) {
  let { subject } = compute({
    computed: hash({
      prop1: 'key1',
      prop2: 'key2'
    }),
    properties: {
      key1: value1,
      key2: value2
    }
  });

  subject.set('key2', value1);
  expected.prop2 = value1;

  let result = subject.get('computed');

  doAssertions(assert, result, 2);
});

test('it wraps key values', function(assert) {
  let { result } = compute({
    computed: hash('prop1', 'prop2'),
    properties: {
      prop1: value1,
      prop2: value2
    }
  });

  doAssertions(assert, result, 1);
});

test('it merges keys and hashes', function(assert) {
  let { result } = compute({
    computed: hash('prop1', { prop2: 'key2' }),
    properties: {
      prop1: value1,
      key2: value2
    }
  });

  doAssertions(assert, result, 1);
});

test('value: it calls Ember.Object.create', function(assert) {
  let { result } = compute({
    computed: hash({
      prop1: value1,
      prop2: value2
    })
  });

  doAssertions(assert, result, 0);
});

test('composing: it calls Ember.Object.create', function(assert) {
  let { result } = compute({
    computed: hash({
      prop1: raw(value1),
      prop2: raw(value2)
    })
  });

  doAssertions(assert, result, 0);
});
