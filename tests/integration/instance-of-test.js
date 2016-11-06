import { instanceOf, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/compute';

module('Integration | Macro | instance of');

test('lookup: object is instance of Object', function(assert) {
  compute({
    assert,
    computed: instanceOf('key1', 'key2'),
    properties: {
      key1: {},
      key2: Object
    },
    expected: true
  });
});

test('lookup: object is not instance of String', function(assert) {
  compute({
    assert,
    computed: instanceOf('key1', 'key2'),
    properties: {
      key1: {},
      key2: String
    },
    expected: false
  });
});

test('value: object is instance of Object', function(assert) {
  compute({
    assert,
    computed: instanceOf({}, Object),
    expected: true
  });
});

test('composing: object is instance of Object', function(assert) {
  compute({
    assert,
    computed: instanceOf(raw({}), raw(Object)),
    expected: true
  });
});
