import { computed, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import sinon from 'sinon';
import compute from '../helpers/compute';

const returnValue = 'return value test';

let getCallback;
let setCallback;

module('Unit | Macro | computed', {
  beforeEach() {
    getCallback = sinon.stub().returns(returnValue);
    setCallback = sinon.stub();
  }
});

test('works with no key', function(assert) {
  compute({
    assert,
    computed: computed(getCallback),
    expected: returnValue
  });
});

test('works with undefined key', function(assert) {
  compute({
    assert,
    computed: computed('key1', getCallback),
    expected: returnValue
  });
});

test('throws without a func param', function(assert) {
  let func = () => compute({
    computed: computed()
  });

  assert.throws(func);
});

test('function syntax: uses the right context when getting', function(assert) {
  let { obj } = compute({
    computed: computed(getCallback)
  });

  assert.strictEqual(getCallback.thisValues[0], obj);
});

test('function syntax: passes the values when getting', function(assert) {
  compute({
    computed: computed('key1', raw('456'), getCallback),
    properties: {
      key1: '123'
    }
  });

  assert.deepEqual(getCallback.args[1], ['123', '456']);
});

test('function syntax: uses the right context when setting', function(assert) {
  let { obj } = compute({
    computed: computed(getCallback)
  });

  getCallback.reset();

  obj.set('computed', 'new value test');

  assert.strictEqual(getCallback.thisValues[0], obj);
});

test('function syntax: passes the key, value, and previous value when setting', function(assert) {
  let { obj } = compute({
    computed: computed(getCallback)
  });

  getCallback.reset();

  obj.set('computed', 'new value test');

  assert.deepEqual(getCallback.args, [['computed', 'new value test', returnValue]]);
});

test('function syntax: allows computed for the function', function(assert) {
  compute({
    computed: computed('test'),
    properties: {
      test: getCallback
    }
  });

  assert.ok(getCallback.called);
});

test('object syntax: uses the right context when getting', function(assert) {
  let { obj } = compute({
    computed: computed({
      get: getCallback
    })
  });

  assert.strictEqual(getCallback.thisValues[0], obj);
});

test('object syntax: passes the values when getting', function(assert) {
  compute({
    computed: computed('key1', raw('456'), {
      get: getCallback
    }),
    properties: {
      key1: '123'
    }
  });

  assert.deepEqual(getCallback.args[1], ['123', '456']);
});

test('object syntax: uses the right context when setting', function(assert) {
  let { obj } = compute({
    computed: computed({
      get: getCallback,
      set: setCallback
    })
  });

  obj.set('computed', 'new value test');

  assert.strictEqual(setCallback.thisValues[0], obj);
});

test('object syntax: passes the key, value, and previous value when setting', function(assert) {
  let { obj } = compute({
    computed: computed({
      get: getCallback,
      set: setCallback
    })
  });

  obj.set('computed', 'new value test');

  assert.deepEqual(setCallback.args, [['computed', 'new value test', returnValue]]);
});

test('object syntax: allows computed for the object', function(assert) {
  compute({
    computed: computed('test'),
    properties: {
      test: {
        get: getCallback
      }
    }
  });

  assert.ok(getCallback.called);
});

test('object syntax: allows computed for the get function', function(assert) {
  compute({
    computed: computed({
      get: 'test'
    }),
    properties: {
      test: getCallback
    }
  });

  assert.ok(getCallback.called);
});

test('object syntax: allows computed for the get function', function(assert) {
  let { obj } = compute({
    computed: computed({
      get: getCallback,
      set: 'test'
    }),
    properties: {
      test: setCallback
    }
  });

  obj.set('computed', 'new value test');

  assert.ok(setCallback.called);
});
