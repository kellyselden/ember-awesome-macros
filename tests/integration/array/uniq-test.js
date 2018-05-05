import { uniq } from 'ember-awesome-macros/array';
import { A as emberA } from '@ember/array';
import { computed } from '@ember/object';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';
import sinon from 'sinon';

module('Integration | Macro | array | uniq', function() {
  test('it returns identity if not array type', function(assert) {
    let array = {};

    compute({
      assert,
      computed: uniq('array'),
      properties: {
        array
      },
      strictEqual: array
    });
  });

  test('it calls uniq on array', function(assert) {
    compute({
      assert,
      computed: uniq('array'),
      properties: {
        array: emberA([1, 1])
      },
      deepEqual: [1]
    });
  });

  test('it responds to array changes', function(assert) {
    let { subject } = compute({
      computed: uniq('array'),
      properties: {
        array: emberA([1, 1])
      }
    });

    subject.set('array', emberA([1, 2]));

    assert.deepEqual(subject.get('computed'), [1, 2]);
  });

  test('it responds to array pushes', function(assert) {
    let array = emberA([1, 1]);

    let { subject } = compute({
      computed: uniq('array'),
      properties: {
        array
      }
    });

    array.pushObject(2);

    assert.deepEqual(subject.get('computed'), [1, 2]);
  });

  test('doesn\'t calculate when unnecessary', function(assert) {
    let callback = sinon.spy();

    compute({
      computed: uniq(
        undefined,
        computed(callback)
      )
    });

    assert.notOk(callback.called);
  });

  test('composable: it calls uniq on array', function(assert) {
    compute({
      assert,
      computed: uniq(
        emberA([1, 1])
      ),
      deepEqual: [1]
    });
  });

  test('it handles native arrays', function(assert) {
    compute({
      assert,
      computed: uniq('array'),
      properties: {
        array: [1, 1]
      },
      deepEqual: [1]
    });
  });
});
