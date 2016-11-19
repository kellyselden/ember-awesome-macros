import { length } from 'ember-awesome-macros/string';
import { raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../../helpers/compute';

const string = 'return value test';

module('Integration | Macro | string | length');

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
    strictEqual: 17
  });
});

test('composable: it gets length on string', function(assert) {
  compute({
    assert,
    computed: length(raw(string)),
    strictEqual: 17
  });
});
