import { subtract } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import { A as emberA } from '@ember/array';
import { compute } from 'ember-macro-helpers/test-support';

module('Integration | Macro | subtract', function() {
  test('subtracts two numbers', function(assert) {
    compute({
      assert,
      computed: subtract('source1', 'source2'),
      properties: {
        source1: 3,
        source2: 2
      },
      strictEqual: 1
    });
  });

  test('subtracts three numbers', function(assert) {
    compute({
      assert,
      computed: subtract('source1', 'source2', 'source3'),
      properties: {
        source1: 3,
        source2: 2,
        source3: 1
      },
      strictEqual: 0
    });
  });

  test('allows empty arrays', function(assert) {
    compute({
      assert,
      computed: subtract(emberA()),
      strictEqual: 0
    });
  });

  test('subtracts array members', function(assert) {
    compute({
      assert,
      computed: subtract(emberA([3, 2]), emberA([1])),
      strictEqual: 0
    });
  });

  test('handles all undefined', function(assert) {
    compute({
      assert,
      computed: subtract('source1', 'source2'),
      assertion(result) {
        return isNaN(result);
      }
    });
  });

  test('handles some undefined', function(assert) {
    compute({
      assert,
      computed: subtract('source1', 'source2'),
      properties: {
        source1: 3
      },
      assertion(result) {
        return isNaN(result);
      }
    });
  });

  test('allows raw numbers', function(assert) {
    compute({
      assert,
      computed: subtract(3, 2, 1),
      strictEqual: 0
    });
  });

  test('allows property expansion', function(assert) {
    compute({
      assert,
      computed: subtract('obj.{source1,source2}'),
      properties: {
        obj: {
          source1: 3,
          source2: 2
        }
      },
      strictEqual: 1
    });
  });

  test('allows composing', function(assert) {
    compute({
      assert,
      computed: subtract(subtract('source1', 'source2'), 'source3'),
      properties: {
        source1: 3,
        source2: 2,
        source3: 1
      },
      strictEqual: 0
    });
  });
});
