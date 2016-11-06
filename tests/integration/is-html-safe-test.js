import Ember from 'ember';
import { isHtmlSafe, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/compute';

const {
  String: { htmlSafe }
} = Ember;

module('Integration | Macro | is html safe');

test('returns undefined when doesn\'t exist', function(assert) {
  compute({
    assert,
    computed: isHtmlSafe('source'),
    expected: undefined
  });
});

test('returns undefined when undefined', function(assert) {
  compute({
    assert,
    computed: isHtmlSafe('source'),
    properties: {
      source: undefined
    },
    expected: undefined
  });
});

test('returns false for not html safe', function(assert) {
  compute({
    assert,
    computed: isHtmlSafe('source'),
    properties: {
      source: '<input>'
    },
    expected: false
  });
});

test('returns true for html safe', function(assert) {
  compute({
    assert,
    computed: isHtmlSafe('source'),
    properties: {
      source: htmlSafe('<input>')
    },
    expected: true
  });
});

test('returns undefined when composed undefined', function(assert) {
  compute({
    assert,
    computed: isHtmlSafe(raw(undefined)),
    expected: undefined
  });
});

test('returns false for composed not html safe', function(assert) {
  compute({
    assert,
    computed: isHtmlSafe(raw('<input>')),
    expected: false
  });
});

test('returns true for composed html safe', function(assert) {
  compute({
    assert,
    computed: isHtmlSafe(raw(htmlSafe('<input>'))),
    expected: true
  });
});
