import { filter } from 'ember-awesome-macros/array';
import { raw } from 'ember-awesome-macros';
import EmberObject, { get, computed } from '@ember/object';
import { A as emberA } from '@ember/array';
import { module, test } from 'qunit';
import { compute } from 'ember-macro-test-helpers';
import sinon from 'sinon';

module('Integration | Macro | array | filter', function() {
  test('it returns empty array if not array type', function(assert) {
    compute({
      assert,
      computed: filter('array'),
      properties: {
        array: {}
      },
      deepEqual: []
    });
  });

  test('it returns empty array if not found', function(assert) {
    compute({
      assert,
      computed: filter('array', result => result === 3),
      properties: {
        array: emberA([1, 2])
      },
      deepEqual: []
    });
  });

  test('it filters array if found', function(assert) {
    compute({
      assert,
      computed: filter('array', result => result === 2),
      properties: {
        array: emberA([1, 2])
      },
      deepEqual: [2]
    });
  });

  test('it responds to array property value changes', function(assert) {
    let array = emberA([
      EmberObject.create({ prop: false }),
      EmberObject.create({ prop: true })
    ]);

    let { subject } = compute({
      computed: filter('array.@each.prop', item => {
        return get(item, 'prop');
      }),
      properties: {
        array
      }
    });

    assert.strictEqual(subject.get('computed.length'), 1);

    array.set('1.prop', false);

    assert.strictEqual(subject.get('computed.length'), 0);

    array.pushObject(EmberObject.create({ prop: true }));

    assert.strictEqual(subject.get('computed.length'), 1);
  });

  test('doesn\'t calculate when unnecessary', function(assert) {
    let callback = sinon.spy();

    compute({
      computed: filter(
        undefined,
        computed(callback)
      )
    });

    assert.notOk(callback.called);
  });

  test('composable: it filters array if found', function(assert) {
    compute({
      assert,
      computed: filter(
        raw(emberA([1, 2])),
        result => result === 2
      ),
      deepEqual: [2]
    });
  });

  test('it handles native arrays', function(assert) {
    compute({
      assert,
      computed: filter('array', result => result === 2),
      properties: {
        array: [1, 2]
      },
      deepEqual: [2]
    });
  });
});
