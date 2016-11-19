import Ember from 'ember';
import { htmlSafe, raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../helpers/compute';

let {
  String: { isHTMLSafe }
} = Ember;

// remove once 2.4 is dropped
if (!isHTMLSafe) {
  isHTMLSafe = val => val instanceof Ember.Handlebars.SafeString;
}

module('Integration | Macro | html safe');

test('returns undefined when doesn\'t exist', function(assert) {
  compute({
    assert,
    computed: htmlSafe('source'),
    strictEqual: undefined
  });
});

test('returns undefined when undefined', function(assert) {
  compute({
    assert,
    computed: htmlSafe('source'),
    properties: {
      source: undefined
    },
    strictEqual: undefined
  });
});

test('marks string html safe', function(assert) {
  compute({
    assert,
    computed: htmlSafe('source'),
    properties: {
      source: '<input>'
    },
    assertion: isHTMLSafe
  });
});

test('string has not changed', function(assert) {
  compute({
    assert,
    computed: htmlSafe('source'),
    properties: {
      source: '<input>'
    },
    assertion(actual) {
      return actual.string === '<input>';
    }
  });
});

test('returns undefined when composed undefined', function(assert) {
  compute({
    assert,
    computed: htmlSafe(raw(undefined)),
    strictEqual: undefined
  });
});

test('marks composed string html safe', function(assert) {
  compute({
    assert,
    computed: htmlSafe(raw('<input>')),
    assertion: isHTMLSafe
  });
});

test('composed string has not changed', function(assert) {
  compute({
    assert,
    computed: htmlSafe(raw('<input>')),
    assertion(actual) {
      return actual.string === '<input>';
    }
  });
});
