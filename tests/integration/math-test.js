import math, {
  ceil,
  floor,
  round
} from 'ember-awesome-macros/math';
import { raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

module('Integration | Macro | math', function() {
  test('does not expose math properties', function(assert) {
    assert.notOk(math.PI);
  });

  test('does not expose math functions with no arguments', function(assert) {
    assert.notOk(math.random);
  });

  test('lookup: calls math function', function(assert) {
    compute({
      assert,
      computed: round('key1'),
      properties: {
        key1: 2.3
      },
      strictEqual: 2
    });
  });

  test('value: calls math function', function(assert) {
    compute({
      assert,
      computed: floor(2.9),
      strictEqual: 2
    });
  });

  test('composing: calls math function', function(assert) {
    compute({
      assert,
      computed: ceil(raw(1.1)),
      strictEqual: 2
    });
  });
});
