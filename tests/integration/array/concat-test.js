import { concat } from 'ember-awesome-macros/array';
import { raw } from 'ember-awesome-macros';
import { A as emberA } from '@ember/array';
import { computed } from '@ember/object';
import { module, test } from 'qunit';
import { compute } from 'ember-macro-test-helpers';
import sinon from 'sinon';

const value1 = 'value 1 test';
const value2 = 'value 2 test';

let array;

module('Integration | Macro | array | concat', function(hooks) {
  hooks.beforeEach(function() {
    array = emberA([0]);
  });

  test('it returns undefined if not array type', function(assert) {
    compute({
      assert,
      computed: concat('array'),
      properties: {
        array: {}
      },
      strictEqual: undefined
    });
  });

  test('it calls concat on array', function(assert) {
    compute({
      assert,
      computed: concat('array', 'value1', 'value2'),
      properties: {
        array,
        value1,
        value2
      },
      deepEqual: [0, value1, value2]
    });
  });

  test('it responds to length changes', function(assert) {
    let { subject } = compute({
      computed: concat('array', 'value1', 'value2'),
      properties: {
        array,
        value1,
        value2
      }
    });

    array.pushObject(0);

    assert.deepEqual(subject.get('computed'), [0, 0, value1, value2]);
  });

  test('doesn\'t calculate when unnecessary', function(assert) {
    let callback = sinon.spy();

    compute({
      computed: concat(
        undefined,
        computed(callback)
      )
    });

    assert.notOk(callback.called);
  });

  test('composable: it calls concat on array', function(assert) {
    compute({
      assert,
      computed: concat(
        raw(array),
        raw(value1),
        raw(value2)
      ),
      deepEqual: [0, value1, value2]
    });
  });

  test('it handles native arrays', function(assert) {
    compute({
      assert,
      computed: concat('array', 'value1', 'value2'),
      properties: {
        array: [0],
        value1,
        value2
      },
      deepEqual: [0, value1, value2]
    });
  });
});
