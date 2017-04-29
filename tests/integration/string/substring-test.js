import { substring } from 'ember-awesome-macros/string';
import { raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

module('Integration | Macro | string | substring');

test('it calls substring on string', function(assert) {
  compute({
    assert,
    computed: substring('str', 'indexStart', 'indexEnd'),
    properties: {
      str: 'abcxyz',
      indexStart: 2,
      indexEnd: 4
    },
    strictEqual: 'cx'
  });
});

test('composable: it calls substring on string', function(assert) {
  compute({
    assert,
    computed: substring(
      raw('abcxyz'),
      2,
      4
    ),
    strictEqual: 'cx'
  });
});
