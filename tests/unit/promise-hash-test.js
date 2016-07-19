import Ember from 'ember';
import { promiseHash } from 'ember-awesome-macros';
import { module, test } from 'qunit';

const {
  get,
  RSVP: { resolve }
} = Ember;

const Obj = Ember.Object.extend({
  hashTest: promiseHash('firstPromise', 'secondPromise')
});

let obj;

module('Unit | Macro | promise hash', {
  beforeEach() {
    obj = Obj.create({
      firstPromise: resolve('test1'),
      secondPromise: resolve('test2')
    });
  }
});

test('combines promises into hash promise', function(assert) {
  assert.expect(1);

  let hashTest = get(obj, 'hashTest');

  return hashTest.then(hash => {
    assert.deepEqual(hash, {
      firstPromise: 'test1',
      secondPromise: 'test2'
    });
  });
});
