import { wrapArray } from 'ember-awesome-macros/utils';
import { module, test } from 'qunit';

module('Unit | Utility | wrap array');

test('it wraps array if string', function(assert) {
  let result = wrapArray('array');

  assert.strictEqual(result, 'array.[]');
});

test('it does nothing for non-string', function(assert) {
  let obj = {};

  let result = wrapArray(obj);

  assert.strictEqual(result, obj);
});
