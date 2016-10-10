import Ember from 'ember';
import { split, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';

const {
  get, setProperties
} = Ember;

const Obj = Ember.Object.extend({
  test: split('source', 'key'),
  testNested: split(raw('val1,val2'), raw(','))
});

let obj;
let source;

module('Unit | Macro | split', {
  beforeEach() {
    source = 'val1,val2';

    obj = Obj.create({
      source,
      key: ','
    });

    // compute initial value
    // to test recomputes
    get(obj, 'test');
    get(obj, 'testNested');
  }
});

test('it splits', function(assert) {
  assert.expect(1);

  assert.deepEqual(get(obj, 'test'), [
    'val1',
    'val2'
  ]);
});

test('it handles source modifying', function(assert) {
  assert.expect(1);

  setProperties(obj, {
    source: 'val1,val2,val3'
  });

  assert.deepEqual(get(obj, 'test'), [
    'val1',
    'val2',
    'val3'
  ]);
});

test('it handles key modifying', function(assert) {
  assert.expect(1);

  setProperties(obj, {
    key: 'val'
  });

  assert.deepEqual(get(obj, 'test'), [
    '',
    '1,',
    '2'
  ]);
});

test('it handles undefined source', function(assert) {
  assert.expect(1);

  setProperties(obj, {
    source: undefined
  });

  assert.deepEqual(get(obj, 'test'), []);
});

test('it handles nesting', function(assert) {
  assert.expect(1);

  assert.deepEqual(get(obj, 'testNested'), [
    'val1',
    'val2'
  ]);
});
