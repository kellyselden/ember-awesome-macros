import RSVP from 'rsvp';
import { promiseAll } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/compute';

const { resolve } = RSVP;

module('Integration | Macro | promise all');

test('combines promises into array promise', function(assert) {
  return compute({
    assert,
    computed: promiseAll('firstPromise', 'secondPromise'),
    properties: {
      firstPromise: resolve('test1'),
      secondPromise: resolve('test2')
    },
    deepEqual: [
      'test1',
      'test2'
    ]
  }).promise;
});
