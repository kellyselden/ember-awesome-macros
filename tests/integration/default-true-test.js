import { defaultTrue } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/compute';

module('Integration | Macro | default true');

test('defaults true', function(assert) {
  compute({
    assert,
    computed: defaultTrue('source'),
    expected: true
  });
});

test('false passes through', function(assert) {
  compute({
    assert,
    computed: defaultTrue('source'),
    properties: {
      source: false
    },
    expected: false
  });
});

test('true passes through', function(assert) {
  compute({
    assert,
    computed: defaultTrue('source'),
    properties: {
      source: 1
    },
    expected: 1
  });
});
