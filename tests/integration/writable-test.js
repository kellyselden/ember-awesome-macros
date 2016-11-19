import { writable, raw, and } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import sinon from 'sinon';
import compute from '../helpers/compute';

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
  let { obj } = compute({
    computed: writable(raw(getReturnValue))
  });

  obj.set('computed', newValue);

  assert.strictEqual(obj.get('computed'), newValue);
});

test('without setter: is no longer a computed', function(assert) {
  let { obj } = compute({
    computed: writable(and('key')),
    properties: {
      key: false
    }
  });

  obj.set('computed', false);
  obj.set('key', true);

  assert.strictEqual(obj.get('computed'), false);
});

test('with function setter: passes through the getter', function(assert) {
  compute({
    assert,
    computed: writable(raw(getReturnValue), setCallback),
    strictEqual: getReturnValue
  });
});

test('with function setter: setter return value is new value', function(assert) {
  let { obj } = compute({
    computed: writable(raw(getReturnValue), setCallback)
  });

  obj.set('computed', newValue);

  assert.strictEqual(obj.get('computed'), setReturnValue);
});

test('with function setter: `this` is object context', function(assert) {
  let { obj } = compute({
    computed: writable(raw(getReturnValue), setCallback)
  });

  obj.set('computed', newValue);

  assert.strictEqual(setCallback.thisValues[0], obj);
});

test('with function setter: is still a computed', function(assert) {
  let { obj } = compute({
    computed: writable(and('key'), setCallback),
    properties: {
      key: false
    }
  });

  obj.set('computed', false);
  obj.set('key', true);

  assert.strictEqual(obj.get('computed'), true);
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
  let { obj } = compute({
    computed: writable(raw(getReturnValue), {
      set: setCallback
    })
  });

  obj.set('computed', newValue);

  assert.strictEqual(obj.get('computed'), setReturnValue);
});

test('with object setter: `this` is object context', function(assert) {
  let { obj } = compute({
    computed: writable(raw(getReturnValue), {
      set: setCallback
    })
  });

  obj.set('computed', newValue);

  assert.strictEqual(setCallback.thisValues[0], obj);
});

test('with object setter: is still a computed', function(assert) {
  let { obj } = compute({
    computed: writable(and('key'), {
      set: setCallback
    }),
    properties: {
      key: false
    }
  });

  obj.set('computed', false);
  obj.set('key', true);

  assert.strictEqual(obj.get('computed'), true);
});
