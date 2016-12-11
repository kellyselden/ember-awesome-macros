import { raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

module('Intergration | Macro | raw');

test('it returns value verbatim', function(assert) {
  compute({
    assert,
    computed: raw('source'),
    strictEqual: 'source'
  });
});

test('it doesn\'t treat it as a key, but a raw value', function(assert) {
  compute({
    assert,
    computed: raw('source'),
    properties: {
      source: 'new source'
    },
    strictEqual: 'source'
  });
});

test('it is readOnly', function(assert) {
  compute({
    assert,
    computed: raw('source'),
    assertReadOnly: true
  });
});
