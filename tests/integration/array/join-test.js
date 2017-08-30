import { join } from 'ember-awesome-macros/array';
import EmberObject, { get, computed } from '@ember/object';
import { A as emberA } from '@ember/array';
import { raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';
import sinon from 'sinon';

const separator = ', ';

let array;

module('Integration | Macro | array | join', {
  beforeEach() {
    array = emberA(['test1', 'test2']);
  }
});

test('default', function(assert) {
  compute({
    assert,
    computed: join('array', 'separator'),
    properties: {
      array,
      separator
    },
    strictEqual: 'test1, test2'
  });
});

test('it handles property changes', function(assert) {
  let { subject } = compute({
    computed: join('array', 'separator'),
    properties: {
      array,
      separator
    }
  });

  array.pushObject('test3');

  assert.strictEqual(get(subject, 'computed'), 'test1, test2, test3');
});

test('it handles array undefined', function(assert) {
  compute({
    assert,
    computed: join('array', 'separator'),
    strictEqual: ''
  });
});

test('it handles one element', function(assert) {
  compute({
    assert,
    computed: join('array', 'separator'),
    properties: {
      array: emberA(['test1'])
    },
    strictEqual: 'test1'
  });
});

test('it handles nesting', function(assert) {
  compute({
    assert,
    computed: join(array, raw(separator)),
    strictEqual: 'test1, test2'
  });
});

test('it responds to array property value changes', function(assert) {
  let ObjClass = EmberObject.extend({
    toString() {
      return get(this, 'prop');
    }
  });
  let array = emberA([
    ObjClass.create({ prop: 'val1' }),
    ObjClass.create({ prop: 'val2' })
  ]);

  let { subject } = compute({
    computed: join('array.@each.prop', 'separator'),
    properties: {
      array,
      separator: ','
    }
  });

  assert.deepEqual(subject.get('computed'), 'val1,val2');

  array.set('1.prop', 'val1');

  assert.deepEqual(subject.get('computed'), 'val1,val1');

  array.pushObject(ObjClass.create({ prop: 'val2' }));

  assert.deepEqual(subject.get('computed'), 'val1,val1,val2');
});

test('doesn\'t calculate when unnecessary', function(assert) {
  let callback = sinon.spy();

  compute({
    computed: find(
      undefined,
      computed(callback)
    )
  });

  assert.notOk(callback.called);
});

test('it handles native arrays', function(assert) {
  compute({
    assert,
    computed: join('array', 'separator'),
    properties: {
      array: ['test1', 'test2'],
      separator
    },
    strictEqual: 'test1, test2'
  });
});
