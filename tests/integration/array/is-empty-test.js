import { isEmpty } from 'ember-awesome-macros/array';
import { raw } from 'ember-awesome-macros';
import { A as emberA } from '@ember/array';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

let emptyArray, notEmptyArray;

module('Integration | Macro | array | isEmpty', {
  beforeEach() {
    emptyArray = emberA([]);
    notEmptyArray = emberA([2]);
  }
});

test('it returns false if not array type', function(assert) {
  let array = {};

  compute({
    assert,
    computed: isEmpty('array'),
    properties: {
      array
    },
    strictEqual: false
  });
});

test('it calls isEmpty on empty array', function(assert) {
  compute({
    assert,
    computed: isEmpty('emptyArray'),
    properties: {
      emptyArray
    },
    strictEqual: true
  });
});

test('it calls isEmpty on not empty array', function(assert) {
  compute({
    assert,
    computed: isEmpty('notEmptyArray'),
    properties: {
      notEmptyArray
    },
    strictEqual: false
  });
});

test('it responds to length increase', function(assert) {
  let { subject } = compute({
    computed: isEmpty('emptyArray'),
    properties: {
      emptyArray
    }
  });

  emptyArray.pushObject(3);

  assert.strictEqual(subject.get('computed'), false);
});

test('it responds to length decrease', function(assert) {
  let { subject } = compute({
    computed: isEmpty('notEmptyArray'),
    properties: {
      notEmptyArray
    }
  });

  notEmptyArray.popObject();

  assert.strictEqual(subject.get('computed'), true);
});

test('composable: it calls isEmpty on array', function(assert) {
  compute({
    assert,
    computed: isEmpty(
      raw(emptyArray)
    ),
    strictEqual: true
  });
});

test('it handles native empty arrays', function(assert) {
  compute({
    assert,
    computed: isEmpty('array'),
    properties: {
      array: []
    },
    strictEqual: true
  });
});

test('it handles native not empty arrays', function(assert) {
  compute({
    assert,
    computed: isEmpty('array'),
    properties: {
      array: [2]
    },
    strictEqual: false
  });
});
