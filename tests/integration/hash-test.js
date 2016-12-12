import EmberObject from 'ember-object';
import { hash, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

const value1 = 12;
const value2 = 23;

let expected;

module('Integration | Macro | hash', {
  beforeEach() {
    expected = EmberObject.create({
      prop1: value1,
      prop2: value2
    });
  }
});

test('it returns an object', function(assert) {
  compute({
    assert,
    computed: hash({
      prop1: 'key1',
      prop2: 'key2'
    }),
    properties: {
      key1: value1,
      key2: value2
    },
    deepEqual: expected
  });
});

test('it responds to key changes', function(assert) {
  let { subject } = compute({
    computed: hash({
      prop1: 'key1',
      prop2: 'key2'
    }),
    properties: {
      key1: value1,
      key2: value2
    }
  });

  subject.set('key2', value1);
  expected.set('prop2', value1);

  let result = subject.get('computed');

  assert.deepEqual(result, expected);
});

test('it wraps key values', function(assert) {
  compute({
    assert,
    computed: hash('prop1', 'prop2'),
    properties: {
      prop1: value1,
      prop2: value2
    },
    deepEqual: expected
  });
});

test('it merges keys and hashes', function(assert) {
  compute({
    assert,
    computed: hash('prop1', { prop2: 'key2' }),
    properties: {
      prop1: value1,
      key2: value2
    },
    deepEqual: expected
  });
});

test('value: it returns an object', function(assert) {
  compute({
    assert,
    computed: hash({
      prop1: value1,
      prop2: value2
    }),
    deepEqual: expected
  });
});

test('composing: it returns an object', function(assert) {
  compute({
    assert,
    computed: hash({
      prop1: raw(value1),
      prop2: raw(value2)
    }),
    deepEqual: expected
  });
});
