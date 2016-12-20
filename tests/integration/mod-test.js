import { mod, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

module('Integration | Macro | mod');

test('not mod returns false', function(assert) {
  compute({
    assert,
    computed: mod('source1', 'source2'),
    properties: {
      source1: 123,
      source2: 45
    },
    strictEqual: 33
  });
});

test('it handles numbers', function(assert) {
  compute({
    assert,
    computed: mod(123, 45),
    strictEqual: 33
  });
});

test('it handles nesting', function(assert) {
  compute({
    assert,
    computed: mod(raw(123), raw(45)),
    strictEqual: 33
  });
});
