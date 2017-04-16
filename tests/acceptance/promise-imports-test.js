import { module, test } from 'qunit';
import expect from '../helpers/expect-imports';
import promise, {
  all,
  array,
  hash,
  object,
  resolve,
  then
} from 'ember-awesome-macros/promise';

module('Acceptance | promise imports');

test('all promise global imports', function(assert) {
  expect(assert, promise);

  assert.ok(promise.all);
  assert.ok(promise.array);
  assert.ok(promise.hash);
  assert.ok(promise.object);
  assert.ok(promise.resolve);
  assert.ok(promise.then);
});

test('all promise imports', function(assert) {
  expect(assert, promise);

  assert.ok(all);
  assert.ok(array);
  assert.ok(hash);
  assert.ok(object);
  assert.ok(resolve);
  assert.ok(then);
});
