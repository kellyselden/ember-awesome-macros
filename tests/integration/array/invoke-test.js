import { invoke } from 'ember-awesome-macros/array';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

let array;

module('Integration | Macro | array | invoke', {
  beforeEach() {
    array = [{
      foo(arg = 'bar') {
        return arg + '-eval';
      }
    }];
  }
});

test('it returns undefined if not array type', function(assert) {
  compute({
    assert,
    computed: invoke('array'),
    properties: {
      array: {}
    },
    strictEqual: undefined
  });
});

test('it returns undefined if key not string', function(assert) {
  compute({
    assert,
    computed: invoke('array', 'key'),
    properties: {
      array,
      key: true
    },
    strictEqual: undefined
  });
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

test('it handles native arrays', function(assert) {
  array = [{
    foo(arg = 'bar') {
      return arg + '-eval';
    }
  }];

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
