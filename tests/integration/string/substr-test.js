import { substr } from 'ember-awesome-macros/string';
import { raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

module('Integration | Macro | string | substr');

test('it calls substr on string', function(assert) {
  compute({
    assert,
    computed: substr('str', 'start', 'length'),
    properties: {
      str: 'abcxyz',
      start: 2,
      length: 2
    },
    strictEqual: 'cx'
  });
});

test('composable: it calls substr on string', function(assert) {
  compute({
    assert,
    computed: substr(
      raw('abcxyz'),
      2,
      2
    ),
    strictEqual: 'cx'
  });
});
