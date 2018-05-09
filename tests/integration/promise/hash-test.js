import { resolve } from 'rsvp';
import { hash } from 'ember-awesome-macros/promise';
import { module, test } from 'qunit';
import { compute } from 'ember-macro-test-helpers';

module('Integration | Macro | promise | hash', function() {
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
});
