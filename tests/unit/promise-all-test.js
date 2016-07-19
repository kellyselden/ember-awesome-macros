import Ember from 'ember';
import { promiseAll } from 'ember-awesome-macros';
import { module, test } from 'qunit';

const {
  get,
  RSVP: { resolve }
} = Ember;

const Obj = Ember.Object.extend({
  allTest: promiseAll('firstPromise', 'secondPromise')
});

let obj;

module('Unit | Macro | promise all', {
  beforeEach() {
    obj = Obj.create({
      firstPromise: resolve('test1'),
      secondPromise: resolve('test2')
    });
  }
});

test('combines promises into array promise', function(assert) {
  assert.expect(1);

  let allTest = get(obj, 'allTest');

  return allTest.then(array => {
    assert.deepEqual(array, [
      'test1',
      'test2'
    ]);
  });
});
