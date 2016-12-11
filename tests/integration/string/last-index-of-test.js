import { lastIndexOf } from 'ember-awesome-macros/string';
import { raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

module('Integration | Macro | string | last index of');

test('it calls lastIndexOf on string', function(assert) {
  compute({
    assert,
    computed: lastIndexOf('string', 'value', 'fromIndex'),
    properties: {
      string: '121',
      value: '1',
      fromIndex: 1
    },
    strictEqual: 0
  });
});

test('composable: it calls lastIndexOf on string', function(assert) {
  compute({
    assert,
    computed: lastIndexOf(
      raw('121'),
      raw('1'),
      1
    ),
    strictEqual: 0
  });
});
