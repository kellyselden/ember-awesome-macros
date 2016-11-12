import { computed, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import sinon from 'sinon';
import compute from '../helpers/compute';

const returnValue = 'return value test';
const newValue = 'new value test';

let getCallback;
let setCallback;

module('Integration | Macro | computed', {
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

test('function syntax: doesn\'t call when setting', function(assert) {
  let { obj } = compute({
    computed: computed(getCallback)
  });

  getCallback.reset();

  obj.set('computed', newValue);

  assert.notOk(getCallback.called);
});

test('function syntax: preserves set value', function(assert) {
  let { obj } = compute({
    computed: computed(getCallback)
  });

  getCallback.reset();

  obj.set('computed', newValue);

  assert.strictEqual(obj.get('computed'), newValue);
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

  obj.set('computed', newValue);

  assert.strictEqual(setCallback.thisValues[0], obj);
});

test('object syntax: passes the key, value, and previous value when setting', function(assert) {
  let { obj } = compute({
    computed: computed({
      get: getCallback,
      set: setCallback
    })
  });

  obj.set('computed', newValue);

  assert.deepEqual(setCallback.args, [['computed', newValue, returnValue]]);
});
