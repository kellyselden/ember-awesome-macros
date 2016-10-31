import { flattenKeys } from 'ember-awesome-macros/utils';
import { module, test } from 'qunit';
import { computed } from 'ember-awesome-macros';

module('Unit | Utility | flatten keys');

test('it works', function(assert) {
  let key1 = 'test1';
  let key2 = computed('test2', computed('test3', 'test4'));

  let flattenedKeys = flattenKeys([key1, key2]);

  assert.deepEqual(flattenedKeys, [
    'test1',
    'test2',
    'test3',
    'test4'
  ]);
});

test('it handles undefined _dependentKeys (raw)', function(assert) {
  let key = computed(() => {});

  let flattenedKeys = flattenKeys([key]);

  assert.deepEqual(flattenedKeys, []);
});
