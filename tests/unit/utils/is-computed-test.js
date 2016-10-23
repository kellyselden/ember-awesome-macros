import { isComputed } from 'ember-awesome-macros/utils';
import { module, test } from 'qunit';

module('Unit | Utility | is compute');

test('it returns true for object', function(assert) {
  let result = isComputed({});

  assert.strictEqual(result, true);
});

test('it returns false for string', function(assert) {
  let result = isComputed('');

  assert.strictEqual(result, false);
});

test('it returns false for literal', function(assert) {
  let result = isComputed(0);

  assert.strictEqual(result, false);
});
