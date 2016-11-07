import Ember from 'ember';
import { hash, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import sinon from 'sinon';
import compute from '../helpers/compute';

const {
  Object: EmberObject
} = Ember;

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
      key1: value1,
      key2: value2
    };
  },
  afterEach() {
    sandbox.restore();
  }
});

function doAssertions(assert, val, callNumber) {
  assert.deepEqual(createStub.thisValues[callNumber], EmberObject);
  assert.deepEqual(createStub.args[callNumber], [expected]);
  assert.strictEqual(val, returnValue);
}

test('it calls Ember.Object.create', function(assert) {
  let { val } = compute({
    computed: hash({
      key1: 'key1',
      key2: 'key2'
    }),
    properties: {
      key1: value1,
      key2: value2
    }
  });

  doAssertions(assert, val, 1);
});

test('it responds to key changes', function(assert) {
  let { obj } = compute({
    computed: hash({
      key1: 'key1',
      key2: 'key2'
    }),
    properties: {
      key1: value1,
      key2: value2
    }
  });

  obj.set('key2', value1);
  expected.key2 = value1;

  let val = obj.get('computed');

  doAssertions(assert, val, 2);
});

test('value: it calls Ember.Object.create', function(assert) {
  let { val } = compute({
    computed: hash({
      key1: value1,
      key2: value2
    })
  });

  doAssertions(assert, val, 0);
});

test('composing: it calls Ember.Object.create', function(assert) {
  let { val } = compute({
    computed: hash({
      key1: raw(value1),
      key2: raw(value2)
    })
  });

  doAssertions(assert, val, 0);
});
