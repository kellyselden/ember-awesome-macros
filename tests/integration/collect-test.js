import { collect, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

const value1 = 12;
const value2 = 23;

module('Integration | Macro | collect', function() {
  test('it returns an array', function(assert) {
    compute({
      assert,
      computed: collect('key1', 'key2'),
      properties: {
        key1: value1,
        key2: value2
      },
      deepEqual: [value1, value2]
    });
  });

  test('it returns an ember array', function(assert) {
    compute({
      assert,
      computed: collect('key1', 'key2'),
      properties: {
        key1: value1,
        key2: value2
      },
      assertion(result) {
        return result.pushObject;
      }
    });
  });

  test('value: it returns an array', function(assert) {
    compute({
      assert,
      computed: collect(value1, value2),
      deepEqual: [value1, value2]
    });
  });

  test('composing: it returns an array', function(assert) {
    compute({
      assert,
      computed: collect(raw(value1), raw(value2)),
      deepEqual: [value1, value2]
    });
  });
});
