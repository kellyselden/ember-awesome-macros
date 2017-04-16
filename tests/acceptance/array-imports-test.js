import { module, test } from 'qunit';
import expect from '../helpers/expect-imports';
import array, {
  any,
  compact,
  concat,
  every,
  filterBy,
  filter,
  findBy,
  find,
  first,
  includes,
  indexOf,
  invoke,
  isAny,
  isEvery,
  join,
  lastIndexOf,
  last,
  length,
  mapBy,
  map,
  objectAt,
  reduce,
  reverse,
  slice,
  sort,
  uniqBy,
  uniq,
  without
} from 'ember-awesome-macros/array';

module('Acceptance | array imports');

test('all array global imports', function(assert) {
  expect(assert, array);

  assert.ok(array.any);
  assert.ok(array.compact);
  assert.ok(array.concat);
  assert.ok(array.every);
  assert.ok(array.filterBy);
  assert.ok(array.filter);
  assert.ok(array.findBy);
  assert.ok(array.find);
  assert.ok(array.first);
  assert.ok(array.includes);
  assert.ok(array.indexOf);
  assert.ok(array.invoke);
  assert.ok(array.isAny);
  assert.ok(array.isEvery);
  assert.ok(array.join);
  assert.ok(array.lastIndexOf);
  assert.ok(array.last);
  assert.ok(array.length);
  assert.ok(array.mapBy);
  assert.ok(array.map);
  assert.ok(array.objectAt);
  assert.ok(array.reduce);
  assert.ok(array.reverse);
  assert.ok(array.slice);
  assert.ok(array.sort);
  assert.ok(array.uniqBy);
  assert.ok(array.uniq);
  assert.ok(array.without);
});

test('all array imports', function(assert) {
  assert.ok(any);
  assert.ok(compact);
  assert.ok(concat);
  assert.ok(every);
  assert.ok(filterBy);
  assert.ok(filter);
  assert.ok(findBy);
  assert.ok(find);
  assert.ok(first);
  assert.ok(includes);
  assert.ok(indexOf);
  assert.ok(invoke);
  assert.ok(isAny);
  assert.ok(isEvery);
  assert.ok(join);
  assert.ok(lastIndexOf);
  assert.ok(last);
  assert.ok(length);
  assert.ok(mapBy);
  assert.ok(map);
  assert.ok(objectAt);
  assert.ok(reduce);
  assert.ok(reverse);
  assert.ok(slice);
  assert.ok(sort);
  assert.ok(uniqBy);
  assert.ok(uniq);
  assert.ok(without);
});
