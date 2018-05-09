import { every } from 'ember-awesome-macros/array';
import { raw } from 'ember-awesome-macros';
import EmberObject, { get, computed } from '@ember/object';
import { A as emberA } from '@ember/array';
import { module, test } from 'qunit';
import { compute } from 'ember-macro-test-helpers';
import sinon from 'sinon';

module('Integration | Macro | array | every', function() {
  test('it returns false if not array type', function(assert) {
    compute({
      assert,
      computed: every('array'),
      properties: {
        array: {}
      },
      strictEqual: false
    });
  });

  test('it returns false if not all true', function(assert) {
    compute({
      assert,
      computed: every('array', result => result === 1),
      properties: {
        array: emberA([1, 2])
      },
      strictEqual: false
    });
  });

  test('it returns true if all true', function(assert) {
    compute({
      assert,
      computed: every('array', result => result === 1),
      properties: {
        array: emberA([1, 1])
      },
      strictEqual: true
    });
  });

  test('it responds to array property value changes', function(assert) {
    let array = emberA([
      EmberObject.create({ prop: false }),
      EmberObject.create({ prop: true })
    ]);

    let { subject } = compute({
      computed: every('array.@each.prop', item => {
        return get(item, 'prop');
      }),
      properties: {
        array
      }
    });

    assert.strictEqual(subject.get('computed'), false);

    array.set('0.prop', true);

    assert.strictEqual(subject.get('computed'), true);

    array.pushObject(EmberObject.create({ prop: false }));

    assert.strictEqual(subject.get('computed'), false);
  });

  test('doesn\'t calculate when unnecessary', function(assert) {
    let callback = sinon.spy();

    compute({
      computed: every(
        undefined,
        computed(callback)
      )
    });

    assert.notOk(callback.called);
  });

  test('composable: it returns true if all true', function(assert) {
    compute({
      assert,
      computed: every(
        raw(emberA([1, 1])),
        result => result === 1
      ),
      strictEqual: true
    });
  });

  test('it handles native arrays', function(assert) {
    compute({
      assert,
      computed: every('array', result => result === 1),
      properties: {
        array: [1, 2]
      },
      strictEqual: false
    });
  });
});
