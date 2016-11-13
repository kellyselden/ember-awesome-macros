import RSVP from 'rsvp';
import { promiseHash } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/compute';

const { resolve } = RSVP;

module('Integration | Macro | promise hash');

test('combines promises into hash promise', function(assert) {
  return compute({
    assert,
    computed: promiseHash('firstPromise', 'secondPromise'),
    properties: {
      firstPromise: resolve('test1'),
      secondPromise: resolve('test2')
    },
    deepEqual: {
      firstPromise: 'test1',
      secondPromise: 'test2'
    }
  }).promise;
});
