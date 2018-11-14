import { module, test } from 'qunit';
import expect from 'ember-macro-helpers/test-support/expect-imports';
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
  groupBy,
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
  rejectBy,
  reverse,
  slice,
  sort,
  uniqBy,
  uniq,
  without,
} from 'ember-awesome-macros/array';
import _any from 'ember-awesome-macros/array/any';
import _compact from 'ember-awesome-macros/array/compact';
import _concat from 'ember-awesome-macros/array/concat';
import _every from 'ember-awesome-macros/array/every';
import _filterBy from 'ember-awesome-macros/array/filter-by';
import _filter from 'ember-awesome-macros/array/filter';
import _findBy from 'ember-awesome-macros/array/find-by';
import _find from 'ember-awesome-macros/array/find';
import _first from 'ember-awesome-macros/array/first';
import _groupBy from 'ember-awesome-macros/array/group-by';
import _includes from 'ember-awesome-macros/array/includes';
import _indexOf from 'ember-awesome-macros/array/index-of';
import _invoke from 'ember-awesome-macros/array/invoke';
import _isAny from 'ember-awesome-macros/array/is-any';
import _isEvery from 'ember-awesome-macros/array/is-every';
import _join from 'ember-awesome-macros/array/join';
import _lastIndexOf from 'ember-awesome-macros/array/last-index-of';
import _last from 'ember-awesome-macros/array/last';
import _length from 'ember-awesome-macros/array/length';
import _mapBy from 'ember-awesome-macros/array/map-by';
import _map from 'ember-awesome-macros/array/map';
import _objectAt from 'ember-awesome-macros/array/object-at';
import _reduce from 'ember-awesome-macros/array/reduce';
import _rejectBy from 'ember-awesome-macros/array/reject-by';
import _reverse from 'ember-awesome-macros/array/reverse';
import _slice from 'ember-awesome-macros/array/slice';
import _sort from 'ember-awesome-macros/array/sort';
import _uniqBy from 'ember-awesome-macros/array/uniq-by';
import _uniq from 'ember-awesome-macros/array/uniq';
import _without from 'ember-awesome-macros/array/without';

module('Acceptance | array imports', function() {
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
    assert.ok(array.groupBy);
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
    assert.ok(array.rejectBy);
    assert.ok(array.reverse);
    assert.ok(array.slice);
    assert.ok(array.sort);
    assert.ok(array.uniqBy);
    assert.ok(array.uniq);
    assert.ok(array.without);
  });

  test('all array imports', function(assert) {
    expect(assert, array);

    assert.ok(any);
    assert.ok(compact);
    assert.ok(concat);
    assert.ok(every);
    assert.ok(filterBy);
    assert.ok(filter);
    assert.ok(findBy);
    assert.ok(find);
    assert.ok(first);
    assert.ok(groupBy);
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
    assert.ok(rejectBy);
    assert.ok(reverse);
    assert.ok(slice);
    assert.ok(sort);
    assert.ok(uniqBy);
    assert.ok(uniq);
    assert.ok(without);
  });

  test('all array default imports', function(assert) {
    expect(assert, array);

    assert.ok(_any);
    assert.ok(_compact);
    assert.ok(_concat);
    assert.ok(_every);
    assert.ok(_filterBy);
    assert.ok(_filter);
    assert.ok(_findBy);
    assert.ok(_find);
    assert.ok(_first);
    assert.ok(_groupBy);
    assert.ok(_includes);
    assert.ok(_indexOf);
    assert.ok(_invoke);
    assert.ok(_isAny);
    assert.ok(_isEvery);
    assert.ok(_join);
    assert.ok(_lastIndexOf);
    assert.ok(_last);
    assert.ok(_length);
    assert.ok(_mapBy);
    assert.ok(_map);
    assert.ok(_objectAt);
    assert.ok(_reduce);
    assert.ok(_rejectBy);
    assert.ok(_reverse);
    assert.ok(_slice);
    assert.ok(_sort);
    assert.ok(_uniqBy);
    assert.ok(_uniq);
    assert.ok(_without);
  });
});
