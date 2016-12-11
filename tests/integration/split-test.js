import get from 'ember-metal/get';
import { setProperties } from 'ember-metal/set';
import { split, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

const source = 'val1,val2';
const key = ',';

module('Integration | Macro | split');

test('it splits', function(assert) {
  compute({
    assert,
    computed: split('source', 'key'),
    properties: {
      source,
      key
    },
    deepEqual: [
      'val1',
      'val2'
    ]
  });
});

test('it handles source modifying', function(assert) {
  let { obj } = compute({
    computed: split('source', 'key'),
    properties: {
      source,
      key
    }
  });

  setProperties(obj, {
    source: 'val1,val2,val3'
  });

  assert.deepEqual(get(obj, 'computed'), [
    'val1',
    'val2',
    'val3'
  ]);
});

test('it handles key modifying', function(assert) {
  let { obj } = compute({
    computed: split('source', 'key'),
    properties: {
      source,
      key
    }
  });

  setProperties(obj, {
    key: 'val'
  });

  assert.deepEqual(get(obj, 'computed'), [
    '',
    '1,',
    '2'
  ]);
});

test('it handles undefined source', function(assert) {
  compute({
    assert,
    computed: split('source', 'key'),
    deepEqual: []
  });
});

test('it handles nesting', function(assert) {
  compute({
    assert,
    computed: split(raw(source), raw(key)),
    deepEqual: [
      'val1',
      'val2'
    ]
  });
});
