import { invoke } from 'ember-awesome-macros/array';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

let array;

module('Integration | Macro | array | invoke', {
  beforeEach() {
    array = [{
      foo: function(arg='bar') {
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
