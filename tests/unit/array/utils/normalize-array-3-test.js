import Ember from 'ember';
import { resolve } from 'rsvp';
import ArrayProxy from '@ember/array/proxy';
import EmberObject, { computed } from '@ember/object';
import { A as emberA } from '@ember/array';
import { normalizeArray3 } from 'ember-awesome-macros/array/-utils';
import { raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import sinon from 'sinon';
import compute from 'ember-macro-test-helpers/compute';

const { PromiseProxyMixin } = Ember;
const ArrayPromiseProxy = ArrayProxy.extend(PromiseProxyMixin);

const firstParam = 'first-param-test';
const secondParam = 'second param test';
const returnValue = 'return value test';

let funcStub;
let array;
let macro;

module('Unit | Macro | array | utils | normalize array 3', {
  beforeEach() {
    array = emberA([]);
    let obj = EmberObject.create({});
    obj[firstParam] = 1;
    array.push(obj);
    funcStub = sinon.stub(array, 'pop').returns(returnValue);

    macro = normalizeArray3({
      func: 'pop'
    });
  }
});

test('it returns array identity if array not array type and no default value', function(assert) {
  array = {};

  compute({
    assert,
    computed: macro('array'),
    properties: {
      array
    },
    strictEqual: array
  });
});

test('it returns array identity if key not string type and no default value', function(assert) {
  compute({
    assert,
    computed: macro('array', 'key'),
    properties: {
      array,
      key: true
    },
    strictEqual: array
  });
});

test('it calls func on array', function(assert) {
  let { result } = compute({
    computed: macro('array', 'firstParam', 'secondParam'),
    properties: {
      array,
      firstParam,
      secondParam
    }
  });

  assert.strictEqual(funcStub.thisValues[0], array);
  assert.deepEqual(funcStub.args, [[firstParam, secondParam]]);
  assert.strictEqual(result, returnValue);
});

test('it calls ember funcs on array', function(assert) {
  macro = normalizeArray3({
    func: 'isEvery'
  });

  compute({
    assert,
    computed: macro('array', 'key', 'value'),
    properties: {
      array: [{ one: 1 }],
      key: 'one',
      value: 1
    },
    strictEqual: true
  });
});

test('it calls func on ember data arrays', function(assert) {
  let arrayPromise = ArrayPromiseProxy.create({
    promise: resolve(array)
  });

  funcStub = sinon.stub(arrayPromise, 'isEvery').returns(returnValue);

  macro = normalizeArray3({
    func: 'isEvery'
  });

  let { result } = compute({
    computed: macro('array', 'firstParam', 'secondParam'),
    properties: {
      array: arrayPromise,
      firstParam,
      secondParam
    }
  });

  assert.strictEqual(funcStub.thisValues[0], arrayPromise);
  assert.deepEqual(funcStub.args, [[firstParam, secondParam]]);
  assert.strictEqual(result, returnValue);
});

test('it allows custom func', function(assert) {
  let stub = sinon.stub().returns(returnValue);
  macro = normalizeArray3({
    func: stub
  });

  let { result } = compute({
    computed: macro('array', 'firstParam', 'secondParam'),
    properties: {
      array,
      firstParam,
      secondParam
    }
  });

  assert.deepEqual(stub.args, [[array, firstParam, secondParam]]);
  assert.strictEqual(result, returnValue);
});

test('it allows first default value override', function(assert) {
  macro = normalizeArray3({
    func: 'pop',
    firstDefault: () => true
  });

  compute({
    assert,
    computed: macro('array'),
    strictEqual: true
  });
});

test('it allows second default value override', function(assert) {
  macro = normalizeArray3({
    func: 'pop',
    secondDefault: () => 1
  });

  compute({
    assert,
    computed: macro('array'),
    properties: {
      array
    },
    strictEqual: 1
  });
});

test('first default value is a new copy every recalculation', function(assert) {
  macro = normalizeArray3({
    func: 'pop',
    firstDefault: () => []
  });

  let { subject } = compute({
    computed: macro('array')
  });

  let result = subject.get('computed');

  subject.set('array', null);

  assert.notEqual(subject.get('computed'), result);
});

test('second default value is a new copy every recalculation', function(assert) {
  macro = normalizeArray3({
    func: 'pop',
    secondDefault: () => []
  });

  let { subject } = compute({
    computed: macro('array', 'key'),
    properties: {
      array
    }
  });

  let result = subject.get('computed');

  subject.set('key', null);

  assert.notEqual(subject.get('computed'), result);
});

test('respects optional args', function(assert) {
  compute({
    computed: macro('array', 'firstParam'),
    properties: {
      array,
      firstParam
    }
  });

  assert.deepEqual(funcStub.args, [[firstParam]]);
});

test('respects a falsy optional arg', function(assert) {
  compute({
    computed: macro('array', 'firstParam', false),
    properties: {
      array,
      firstParam
    }
  });

  assert.deepEqual(funcStub.args, [[firstParam, false]]);
});

test('it lazily calculates keys', function(assert) {
  let spy = sinon.spy();

  compute({
    baseClass: EmberObject.extend({
      secondParam: computed(spy)
    }),
    computed: macro('array', 'firstParam', 'secondParam')
  });

  assert.notOk(spy.called);
});

test('it responds to array changes', function(assert) {
  let { subject } = compute({
    computed: macro('array', 'firstParam', 'secondParam'),
    properties: {
      array,
      firstParam,
      secondParam
    }
  });

  array = [];
  funcStub = sinon.stub(array, 'pop').returns(returnValue);

  subject.set('array', array);

  subject.get('computed');

  assert.ok(funcStub.calledOnce);
});

test('it responds to array pushes', function(assert) {
  let { subject } = compute({
    computed: macro('array', 'firstParam', 'secondParam'),
    properties: {
      array,
      firstParam,
      secondParam
    }
  });

  funcStub.reset();

  array.pushObject({});

  subject.get('computed');

  assert.ok(funcStub.calledOnce);
});

test('it responds to key changes', function(assert) {
  let { subject } = compute({
    computed: macro('array', 'firstParam', 'secondParam'),
    properties: {
      array,
      firstParam,
      secondParam
    }
  });

  funcStub.reset();

  subject.set('firstParam', 'test');

  subject.get('computed');

  assert.ok(funcStub.calledOnce);
});

test('it responds to value changes', function(assert) {
  let { subject } = compute({
    computed: macro('array', 'firstParam', 'secondParam'),
    properties: {
      array,
      firstParam,
      secondParam
    }
  });

  funcStub.reset();

  subject.set('secondParam', 'test');

  subject.get('computed');

  assert.ok(funcStub.calledOnce);
});

test('it responds to array property value changes', function(assert) {
  let { subject } = compute({
    computed: macro('array', 'firstParam', 'secondParam'),
    properties: {
      array,
      firstParam,
      secondParam
    }
  });

  funcStub.reset();

  array.set(`0.${firstParam}`, 2);

  subject.get('computed');

  assert.ok(funcStub.calledOnce);
});

test('it handles native arrays', function(assert) {
  array = [];
  funcStub = sinon.stub(array, 'pop').returns(returnValue);

  let { result } = compute({
    computed: macro('array', 'firstParam', 'secondParam'),
    properties: {
      array,
      firstParam,
      secondParam
    }
  });

  assert.strictEqual(funcStub.thisValues[0], array);
  assert.deepEqual(funcStub.args, [[firstParam, secondParam]]);
  assert.strictEqual(result, returnValue);
});

test('composable: it calls func on array', function(assert) {
  let { result } = compute({
    computed: macro(
      raw(array),
      raw(firstParam),
      raw(secondParam)
    )
  });

  assert.strictEqual(funcStub.thisValues[0], array);
  assert.deepEqual(funcStub.args, [[firstParam, secondParam]]);
  assert.strictEqual(result, returnValue);
});
