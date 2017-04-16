import RSVP from 'rsvp';
import { hash } from 'ember-awesome-macros/promise';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

const { resolve } = RSVP;

module('Integration | Macro | promise | hash');

test('combines promises into hash promise', function(assert) {
  return compute({
    assert,
    computed: hash('firstPromise', 'secondPromise'),
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
