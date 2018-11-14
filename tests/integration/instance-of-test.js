import { instanceOf, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import { compute } from 'ember-macro-helpers/test-support';

module('Integration | Macro | instance of', function() {
  test('lookup: object is instance of Object', function(assert) {
    compute({
      assert,
      computed: instanceOf('key1', 'key2'),
      properties: {
        key1: {},
        key2: Object
      },
      strictEqual: true
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
      strictEqual: false
    });
  });

  test('value: object is instance of Object', function(assert) {
    compute({
      assert,
      computed: instanceOf({}, Object),
      strictEqual: true
    });
  });

  test('composing: object is instance of Object', function(assert) {
    compute({
      assert,
      computed: instanceOf(raw({}), raw(Object)),
      strictEqual: true
    });
  });
});
