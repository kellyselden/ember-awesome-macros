import { normalizeArray2 } from 'ember-awesome-macros/array/-utils';
import { raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import sinon from 'sinon';
import compute from 'ember-macro-test-helpers/compute';

const firstParam = 'first param test';
const secondParam = 'second param test';
const returnValue = 'return value test';

let funcStub;
let array;
let computed;

module('Unit | Macro | array | utils | normalize array 2', {
  beforeEach() {
    array = [];
    funcStub = sinon.stub(array, 'pop').returns(returnValue);

    computed = normalizeArray2('pop');
  }
});

test('it returns identity if not array type and no default value', function(assert) {
  let array = {};

  compute({
    assert,
    computed: computed('array'),
    properties: {
      array
    },
    strictEqual: array
  });
});

test('it calls func on array', function(assert) {
  let { result } = compute({
    computed: computed('array', 'firstParam', 'secondParam'),
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

test('it calls prop on array', function(assert) {
  let computed = normalizeArray2('length');

  compute({
    assert,
    computed: computed('array'),
    properties: {
      array: [1, 2, 3]
    },
    strictEqual: 3
  });
});

test('it calls ember funcs on array', function(assert) {
  let computed = normalizeArray2('compact');

  compute({
    assert,
    computed: computed('array'),
    properties: {
      array: [1, null, undefined]
    },
    deepEqual: [1]
  });
});

test('it allows default value override', function(assert) {
  let computed = normalizeArray2('pop', () => true);

  compute({
    assert,
    computed: computed('array'),
    strictEqual: true
  });
});

test('default value is a new copy every recalculation', function(assert) {
  let computed = normalizeArray2('pop', () => []);

  let { subject } = compute({
    computed: computed('array')
  });

  let result = subject.get('computed');

  subject.set('array', null);

  assert.notEqual(subject.get('computed'), result);
});

test('composable: it calls func on array', function(assert) {
  let { result } = compute({
    computed: computed(
      raw(array),
      raw(firstParam),
      raw(secondParam)
    )
  });

  assert.strictEqual(funcStub.thisValues[0], array);
  assert.deepEqual(funcStub.args, [[firstParam, secondParam]]);
  assert.strictEqual(result, returnValue);
});
