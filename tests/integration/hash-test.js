import Ember from 'ember';
import { hash, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/compute';

const {
  Object: EmberObject
} = Ember;

const value1 = 12;
const value2 = 23;

let expected;

module('Integration | Macro | hash', {
  beforeEach() {
    expected = EmberObject.create({
      key1: value1,
      key2: value2
    });
  }
});

test('it returns an object', function(assert) {
  compute({
    assert,
    computed: hash({
      key1: 'key1',
      key2: 'key2'
    }),
    properties: {
      key1: value1,
      key2: value2
    },
    deepEqual: expected
  });
});

test('it responds to key changes', function(assert) {
  let { obj } = compute({
    computed: hash({
      key1: 'key1',
      key2: 'key2'
    }),
    properties: {
      key1: value1,
      key2: value2
    }
  });

  obj.set('key2', value1);
  expected.set('key2', value1);

  let val = obj.get('computed');

  assert.deepEqual(val, expected);
});

test('value: it returns an object', function(assert) {
  compute({
    assert,
    computed: hash({
      key1: value1,
      key2: value2
    }),
    deepEqual: expected
  });
});

test('composing: it returns an object', function(assert) {
  compute({
    assert,
    computed: hash({
      key1: raw(value1),
      key2: raw(value2)
    }),
    deepEqual: expected
  });
});
