import { indexOf } from 'ember-awesome-macros/string';
import { raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../../helpers/compute';

module('Integration | Macro | string | index of');

test('it calls indexOf on string', function(assert) {
  compute({
    assert,
    computed: indexOf('string', 'value', 'fromIndex'),
    properties: {
      string: '121',
      value: '1',
      fromIndex: 1
    },
    strictEqual: 2
  });
});

test('composable: it calls indexOf on string', function(assert) {
  compute({
    assert,
    computed: indexOf(
      raw('121'),
      raw('1'),
      1
    ),
    strictEqual: 2
  });
});
