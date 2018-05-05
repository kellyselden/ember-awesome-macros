import { parseInt, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

module('Integration | Macro | parse int', function() {
  test('it returns undefined if string undefined', function(assert) {
    let { result } = compute({
      computed: parseInt('string')
    });

    assert.strictEqual(result, undefined);
  });

  test('it calls parseInt on string without radix', function(assert) {
    let { result } = compute({
      computed: parseInt('string'),
      properties: {
        string: '123'
      }
    });

    assert.strictEqual(result, 123);
  });

  test('it returns undefined if string supplied but radix undefined', function(assert) {
    let { result } = compute({
      computed: parseInt('string', 'radix'),
      properties: {
        string: '123'
      }
    });

    assert.strictEqual(result, undefined);
  });

  test('it calls parseInt on string with radix', function(assert) {
    let { result } = compute({
      computed: parseInt('string', 'radix'),
      properties: {
        string: '111',
        radix: 2
      }
    });

    assert.strictEqual(result, 7);
  });

  test('composable: it calls parseInt on string', function(assert) {
    let { result } = compute({
      computed: parseInt(
        raw('111'),
        raw(2)
      )
    });

    assert.strictEqual(result, 7);
  });
});
