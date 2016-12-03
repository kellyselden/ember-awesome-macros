import { replace } from 'ember-awesome-macros/string';
import { raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../../helpers/compute';

module('Integration | Macro | string | replace');

test('it calls replace on string', function(assert) {
  compute({
    assert,
    computed: replace('string', 'substr', 'newSubstr'),
    properties: {
      string: 'abcxyz',
      substr: 'cx',
      newSubstr: 'xc'
    },
    strictEqual: 'abxcyz'
  });
});

test('composable: it calls replace on string', function(assert) {
  compute({
    assert,
    computed: replace(
      raw('abcxyz'),
      raw('cx'),
      raw('xc')
    ),
    strictEqual: 'abxcyz'
  });
});
