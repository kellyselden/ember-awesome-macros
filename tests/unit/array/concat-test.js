import { concat } from 'ember-awesome-macros/array';
import { raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import sinon from 'sinon';
import compute from '../../helpers/compute';

const value1 = 'value 1 test';
const value2 = 'value 2 test';
const returnValue = 'return value test';

let concatStub;
let array;

module('Unit | Macro | array | concat', {
  beforeEach() {
    concatStub = sinon.stub().returns(returnValue);
    array = { concat: concatStub };
  }
});

test('it returns undefined if array undefined', function(assert) {
  compute({
    assert,
    computed: concat('array'),
    strictEqual: undefined
  });
});

test('it calls concat on array', function(assert) {
  let { val } = compute({
    computed: concat('array', 'value1', 'value2'),
    properties: {
      array,
      value1,
      value2
    }
  });

  assert.deepEqual(concatStub.args, [[value1, value2]]);
  assert.strictEqual(val, returnValue);
});

test('composable: it calls concat on array', function(assert) {
  let { val } = compute({
    computed: concat(
      raw(array),
      raw(value1),
      raw(value2)
    )
  });

  assert.deepEqual(concatStub.args, [[value1, value2]]);
  assert.strictEqual(val, returnValue);
});
