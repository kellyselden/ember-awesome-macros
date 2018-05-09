import { length } from 'ember-awesome-macros/string';
import { raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import { compute } from 'ember-macro-test-helpers';

const returnValue = 'return value test';

let string;

module('Unit | Macro | string | length', function(hooks) {
  hooks.beforeEach(function() {
    string = { length: returnValue };
  });

  test('it returns undefined if string undefined', function(assert) {
    compute({
      assert,
      computed: length('string'),
      strictEqual: undefined
    });
  });

  test('it gets length on string', function(assert) {
    compute({
      assert,
      computed: length('string'),
      properties: {
        string
      },
      strictEqual: returnValue
    });
  });

  test('composable: it gets length on string', function(assert) {
    compute({
      assert,
      computed: length(raw(string)),
      strictEqual: returnValue
    });
  });
});
