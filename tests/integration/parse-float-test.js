import { parseFloat, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

module('Integration | Macro | parse float', function() {
  test('it returns undefined if string undefined', function(assert) {
    let { result } = compute({
      computed: parseFloat('string')
    });

    assert.strictEqual(result, undefined);
  });

  test('it calls parseFloat on string', function(assert) {
    let { result } = compute({
      computed: parseFloat('string'),
      properties: {
        string: '1.23'
      }
    });

    assert.strictEqual(result, 1.23);
  });

  test('composable: it calls parseFloat on string', function(assert) {
    let { result } = compute({
      computed: parseFloat(
        raw('1.23')
      )
    });

    assert.strictEqual(result, 1.23);
  });
});
