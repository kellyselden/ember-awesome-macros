import get from 'ember-metal/get';
import { setProperties } from 'ember-metal/set';
import { split } from 'ember-awesome-macros/string';
import { raw } from 'ember-awesome-macros';
import computed from 'ember-computed';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';
import sinon from 'sinon';

const source = 'val1,val2';
const key = ',';

module('Integration | Macro | string | split');

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
  let { subject } = compute({
    computed: split('source', 'key'),
    properties: {
      source,
      key
    }
  });

  setProperties(subject, {
    source: 'val1,val2,val3'
  });

  assert.deepEqual(get(subject, 'computed'), [
    'val1',
    'val2',
    'val3'
  ]);
});

test('it handles key modifying', function(assert) {
  let { subject } = compute({
    computed: split('source', 'key'),
    properties: {
      source,
      key
    }
  });

  setProperties(subject, {
    key: 'val'
  });

  assert.deepEqual(get(subject, 'computed'), [
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

test('doesn\'t calculate when unnecessary', function(assert) {
  let callback = sinon.spy();

  compute({
    computed: split(
      undefined,
      computed(callback)
    )
  });

  assert.notOk(callback.called);
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
