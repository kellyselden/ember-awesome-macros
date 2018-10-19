import { collect, raw } from 'ember-awesome-macros';
import { notEmpty } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import { A as emberA } from '@ember/array';
import compute from 'ember-macro-test-helpers/compute';

module('Integration | Macro | notEmpty', function() {
  test('not empty without params', function(assert) {
    compute({
      assert,
      computed: notEmpty(),
      properties: {},
      strictEqual: false
    });
  });

  test('not empty with null', function(assert) {
    compute({
      assert,
      computed: notEmpty('source'),
      properties: {
        source: null
      },
      strictEqual: false
    });
  });

  test('not empty with undefined', function(assert) {
    compute({
      assert,
      computed: notEmpty('source'),
      properties: {
        source: undefined
      },
      strictEqual: false
    });
  });

  test('not empty with empty string', function(assert) {
    compute({
      assert,
      computed: notEmpty('source'),
      properties: {
        source: ''
      },
      strictEqual: false
    });
  });

  test('not empty with empty array', function(assert) {
    compute({
      assert,
      computed: notEmpty('source'),
      properties: {
        source: []
      },
      strictEqual: false
    });
  });

  test('not empty with native empty array', function(assert) {
    compute({
      assert,
      computed: notEmpty([]),
      strictEqual: false
    });
  });

  test('not empty with native array', function(assert) {
    compute({
      assert,
      computed: notEmpty([1, 2]),
      strictEqual: true
    });
  });

  test('composing: not empty with raw empty array', function(assert) {
    compute({
      assert,
      computed: notEmpty(raw([])),
      strictEqual: false
    });
  });

  test('composing: it check if macro result is not empty', function(assert) {
    compute({
      assert,
      computed: notEmpty(collect(1, 2)),
      strictEqual: true
    });
  });

  test('composing: it check if macro result is not empty', function(assert) {
    compute({
      assert,
      computed: notEmpty(collect()),
      strictEqual: false
    });
  });

  test('not empty with empty object', function(assert) {
    compute({
      assert,
      computed: notEmpty('source'),
      properties: {
        source: {}
      },
      strictEqual: true
    });
  });

  test('not empty with string', function(assert) {
    compute({
      assert,
      computed: notEmpty('source'),
      properties: {
        source: 'Adam Hawkins'
      },
      strictEqual: true
    });
  });

  test('not empty with array', function(assert) {
    compute({
      assert,
      computed: notEmpty('source'),
      properties: {
        source: [0, 1, 2]
      },
      strictEqual: true
    });
  });

  test('it responds to changes', function(assert) {
    let array = emberA([]);
    let { subject } = compute({
      computed: notEmpty('array'),
      properties: {
        array
      }
    });
    array.pushObject(2);
    assert.strictEqual(subject.get('computed'), true);
  });
});
