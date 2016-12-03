import { normalizeString2 } from 'ember-awesome-macros/utils';
import { raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import sinon from 'sinon';
import compute from '../../helpers/compute';

const firstParam = 'first param test';
const secondParam = 'second param test';
const returnValue = 'return value test';

let funcStub;
let string;

module('Unit | Macro | utils | normalize string 2', {
  beforeEach() {
    funcStub = sinon.stub().returns(returnValue);
    string = { func: funcStub };
  }
});

function computed(...keys) {
  return normalizeString2(keys, 'func');
}

test('it returns undefined if string undefined', function(assert) {
  let { val } = compute({
    computed: computed('string')
  });

  assert.notOk(funcStub.called);
  assert.strictEqual(val, undefined);
});

test('it calls func on string without args', function(assert) {
  let { val } = compute({
    computed: computed('string'),
    properties: {
      string
    }
  });

  assert.deepEqual(funcStub.args, [[]]);
  assert.strictEqual(val, returnValue);
});

test('it returns undefined if string supplied but first param undefined', function(assert) {
  let { val } = compute({
    computed: computed('string', 'firstParam'),
    properties: {
      string
    }
  });

  assert.notOk(funcStub.called);
  assert.strictEqual(val, undefined);
});

test('it calls func on string without second param', function(assert) {
  let { val } = compute({
    computed: computed('string', 'firstParam'),
    properties: {
      string,
      firstParam
    }
  });

  assert.deepEqual(funcStub.args, [[firstParam]]);
  assert.strictEqual(val, returnValue);
});

test('it returns undefined if first param supplied but second param undefined', function(assert) {
  let { val } = compute({
    computed: computed('string', 'firstParam', 'secondParam'),
    properties: {
      string,
      firstParam
    }
  });

  assert.notOk(funcStub.called);
  assert.strictEqual(val, undefined);
});

test('it calls func on string with second param', function(assert) {
  let { val } = compute({
    computed: computed('string', 'firstParam', 'secondParam'),
    properties: {
      string,
      firstParam,
      secondParam
    }
  });

  assert.deepEqual(funcStub.args, [[firstParam, secondParam]]);
  assert.strictEqual(val, returnValue);
});

test('composable: it calls func on string', function(assert) {
  let { val } = compute({
    computed: computed(
      raw(string),
      raw(firstParam),
      raw(secondParam)
    )
  });

  assert.deepEqual(funcStub.args, [[firstParam, secondParam]]);
  assert.strictEqual(val, returnValue);
});
