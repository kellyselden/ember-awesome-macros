import { module, test } from 'qunit';
import expect from '../helpers/expect-imports';
import promise, {
  all,
  array,
  hash,
  object,
  resolve,
  then,
} from 'ember-awesome-macros/promise';
import _all from 'ember-awesome-macros/promise/all';
import _array from 'ember-awesome-macros/promise/array';
import _hash from 'ember-awesome-macros/promise/hash';
import _object from 'ember-awesome-macros/promise/object';
import _resolve from 'ember-awesome-macros/promise/resolve';
import _then from 'ember-awesome-macros/promise/then';

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

test('all promise default imports', function(assert) {
  expect(assert, promise);

  assert.ok(_all);
  assert.ok(_array);
  assert.ok(_hash);
  assert.ok(_object);
  assert.ok(_resolve);
  assert.ok(_then);
});
