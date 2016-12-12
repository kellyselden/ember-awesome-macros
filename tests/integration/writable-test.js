import { writable, raw, and } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import sinon from 'sinon';
import compute from 'ember-macro-test-helpers/compute';

const getReturnValue = 'get return value test';
const setReturnValue = 'set return value test';
const newValue = 'new value test';

let setCallback;

module('Integration | Macro | writable', {
  beforeEach() {
    setCallback = sinon.stub().returns(setReturnValue);
  }
});

test('without setter: passes through the getter', function(assert) {
  compute({
    assert,
    computed: writable(raw(getReturnValue)),
    strictEqual: getReturnValue
  });
});

test('without setter: allows setting', function(assert) {
  let { subject } = compute({
    computed: writable(raw(getReturnValue))
  });

  subject.set('computed', newValue);

  assert.strictEqual(subject.get('computed'), newValue);
});

test('without setter: is no longer a computed', function(assert) {
  let { subject } = compute({
    computed: writable(and('key')),
    properties: {
      key: false
    }
  });

  subject.set('computed', false);
  subject.set('key', true);

  assert.strictEqual(subject.get('computed'), false);
});

test('with function setter: passes through the getter', function(assert) {
  compute({
    assert,
    computed: writable(raw(getReturnValue), setCallback),
    strictEqual: getReturnValue
  });
});

test('with function setter: setter return value is new value', function(assert) {
  let { subject } = compute({
    computed: writable(raw(getReturnValue), setCallback)
  });

  subject.set('computed', newValue);

  assert.strictEqual(subject.get('computed'), setReturnValue);
});

test('with function setter: `this` is object context', function(assert) {
  let { subject } = compute({
    computed: writable(raw(getReturnValue), setCallback)
  });

  subject.set('computed', newValue);

  assert.strictEqual(setCallback.thisValues[0], subject);
});

test('with function setter: is still a computed', function(assert) {
  let { subject } = compute({
    computed: writable(and('key'), setCallback),
    properties: {
      key: false
    }
  });

  subject.set('computed', false);
  subject.set('key', true);

  assert.strictEqual(subject.get('computed'), true);
});

test('with object setter: passes through the getter', function(assert) {
  compute({
    assert,
    computed: writable(raw(getReturnValue), {
      set: setCallback
    }),
    strictEqual: getReturnValue
  });
});

test('with object setter: setter return value is new value', function(assert) {
  let { subject } = compute({
    computed: writable(raw(getReturnValue), {
      set: setCallback
    })
  });

  subject.set('computed', newValue);

  assert.strictEqual(subject.get('computed'), setReturnValue);
});

test('with object setter: `this` is object context', function(assert) {
  let { subject } = compute({
    computed: writable(raw(getReturnValue), {
      set: setCallback
    })
  });

  subject.set('computed', newValue);

  assert.strictEqual(setCallback.thisValues[0], subject);
});

test('with object setter: is still a computed', function(assert) {
  let { subject } = compute({
    computed: writable(and('key'), {
      set: setCallback
    }),
    properties: {
      key: false
    }
  });

  subject.set('computed', false);
  subject.set('key', true);

  assert.strictEqual(subject.get('computed'), true);
});
