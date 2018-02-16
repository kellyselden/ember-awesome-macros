import { collect, raw } from 'ember-awesome-macros';
import { isEmpty } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import { A as emberA } from '@ember/array';
import compute from 'ember-macro-test-helpers/compute';

module('Integration | Macro | isEmpty');

test('empty without params', function(assert) {
  compute({
    assert,
    computed: isEmpty(),
    properties: {},
    strictEqual: true
  });
});

test('empty with null', function(assert) {
  compute({
    assert,
    computed: isEmpty('source'),
    properties: {
      source: null
    },
    strictEqual: true
  });
});

test('empty with undefined', function(assert) {
  compute({
    assert,
    computed: isEmpty('source'),
    properties: {
      source: undefined
    },
    strictEqual: true
  });
});

test('empty with empty string', function(assert) {
  compute({
    assert,
    computed: isEmpty('source'),
    properties: {
      source: ''
    },
    strictEqual: true
  });
});

test('empty with empty array', function(assert) {
  compute({
    assert,
    computed: isEmpty('source'),
    properties: {
      source: []
    },
    strictEqual: true
  });
});

test('empty with native empty array', function(assert) {
  compute({
    assert,
    computed: isEmpty([]),
    strictEqual: true
  });
});

test('not empty with native array', function(assert) {
  compute({
    assert,
    computed: isEmpty([1, 2]),
    strictEqual: false
  });
});

test('composing: empty with raw empty array', function(assert) {
  compute({
    assert,
    computed: isEmpty(raw([])),
    strictEqual: true
  });
});

test('composing: it check if macro result is empty', function(assert) {
  compute({
    assert,
    computed: isEmpty(collect(1, 2)),
    strictEqual: false
  });
});

test('composing: it check if macro result is not empty', function(assert) {
  compute({
    assert,
    computed: isEmpty(collect()),
    strictEqual: true
  });
});

test('not empty with empty object', function(assert) {
  compute({
    assert,
    computed: isEmpty('source'),
    properties: {
      source: {}
    },
    strictEqual: false
  });
});

test('not empty with string', function(assert) {
  compute({
    assert,
    computed: isEmpty('source'),
    properties: {
      source: 'Adam Hawkins'
    },
    strictEqual: false
  });
});

test('not empty with array', function(assert) {
  compute({
    assert,
    computed: isEmpty('source'),
    properties: {
      source: [0, 1, 2]
    },
    strictEqual: false
  });
});

test('it responds to changes', function(assert) {
  let array = emberA([]);

  let { subject } = compute({
    computed: isEmpty('array'),
    properties: {
      array
    }
  });

  array.pushObject(2);

  assert.strictEqual(subject.get('computed'), false);
});
