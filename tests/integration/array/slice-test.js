import { slice } from 'ember-awesome-macros/array';
import { raw } from 'ember-awesome-macros';
import { computed } from '@ember/object';
import { module, test } from 'qunit';
import { compute } from 'ember-macro-helpers/test-support';
import sinon from 'sinon';

module('Integration | Macro | array | slice', function() {
  test('it returns identity if not array type', function(assert) {
    let array = {};

    compute({
      assert,
      computed: slice('array'),
      properties: {
        array
      },
      strictEqual: array
    });
  });

  test('it calls slice on array', function(assert) {
    compute({
      assert,
      computed: slice('array', 'begin', 'end'),
      properties: {
        array: [1, 2, 1, 2],
        begin: 1,
        end: 3
      },
      deepEqual: [2, 1]
    });
  });

  test('doesn\'t calculate when unnecessary', function(assert) {
    let callback = sinon.spy();

    compute({
      computed: slice(
        undefined,
        computed(callback)
      )
    });

    assert.notOk(callback.called);
  });

  test('values: it calls slice on array', function(assert) {
    compute({
      assert,
      computed: slice(
        [1, 2, 1, 2],
        1,
        3
      ),
      deepEqual: [2, 1]
    });
  });

  test('composable: it calls slice on array', function(assert) {
    compute({
      assert,
      computed: slice(
        raw([1, 2, 1, 2]),
        raw(1),
        raw(3)
      ),
      deepEqual: [2, 1]
    });
  });

  test('it handles native arrays', function(assert) {
    compute({
      assert,
      computed: slice('array', 'begin', 'end'),
      properties: {
        array: [1, 2, 1, 2],
        begin: 1,
        end: 3
      },
      deepEqual: [2, 1]
    });
  });
});
