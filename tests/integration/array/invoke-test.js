import { invoke } from 'ember-awesome-macros/array';
import EmberObject from 'ember-object';
import { A as emberA } from 'ember-array/utils';
import get from 'ember-metal/get';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

let array;

module('Integration | Macro | array | invoke', {
  beforeEach() {
    array = [{
      foo(arg='bar') {
        return arg + '-eval';
      }
    }];
  }
});

test('it invokes the given method name on each item in array without args', function(assert) {
  compute({
    assert,
    computed: invoke('array', 'methodName'),
    properties: {
      array,
      methodName: 'foo'
    },
    deepEqual: ['bar-eval']
  });
});

test('it invokes the given method name on each item in array with args', function(assert) {
  compute({
    assert,
    computed: invoke('array', 'methodName', 'args'),
    properties: {
      array,
      methodName: 'foo',
      args: 'baz'
    },
    deepEqual: ['baz-eval']
  });
});

test('it responds to array property value changes', function(assert) {
  let ObjClass = EmberObject.extend({
    _foo(foo, arg) {
      let prop = get(this, 'prop');
      return `${foo}-${arg}-${prop}`;
    },
    foo1(arg) {
      return this._foo('foo1', arg);
    },
    foo2(arg) {
      return this._foo('foo2', arg);
    }
  });
  let array = emberA([
    ObjClass.create({ prop: 'val1' }),
    ObjClass.create({ prop: 'val2' })
  ]);

  let { subject } = compute({
    computed: invoke('array.@each.prop', 'methodName', 'args'),
    properties: {
      array,
      methodName: 'foo1',
      args: ['baz']
    }
  });

  assert.deepEqual(subject.get('computed'), [
    'foo1-baz-val1',
    'foo1-baz-val2'
  ]);

  array.set('1.prop', 'val1');

  assert.deepEqual(subject.get('computed'), [
    'foo1-baz-val1',
    'foo1-baz-val1'
  ]);

  array.pushObject(ObjClass.create({ prop: 'val2' }));

  assert.deepEqual(subject.get('computed'), [
    'foo1-baz-val1',
    'foo1-baz-val1',
    'foo1-baz-val2'
  ]);

  subject.set('methodName', 'foo2');

  assert.deepEqual(subject.get('computed'), [
    'foo2-baz-val1',
    'foo2-baz-val1',
    'foo2-baz-val2'
  ]);
});
