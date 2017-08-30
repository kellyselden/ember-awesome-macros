import { length } from 'ember-awesome-macros/array';
import { raw } from 'ember-awesome-macros';
import { A as emberA } from '@ember/array';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

let array;

module('Integration | Macro | array | length', {
  beforeEach() {
    array = emberA([0, 0, 0]);
  }
});

test('it returns undefined if array undefined', function(assert) {
  compute({
    assert,
    computed: length('array'),
    strictEqual: undefined
  });
});

test('it gets length on array', function(assert) {
  compute({
    assert,
    computed: length('array'),
    properties: {
      array
    },
    strictEqual: 3
  });
});

test('it responds to length changes', function(assert) {
  let { subject } = compute({
    computed: length('array'),
    properties: {
      array
    }
  });

  array.pushObject(0);

  assert.strictEqual(subject.get('computed'), 4);
});

test('composable: it gets length on array', function(assert) {
  compute({
    assert,
    computed: length(raw(array)),
    strictEqual: 3
  });
});

test('it handles native arrays', function(assert) {
  compute({
    assert,
    computed: length('array'),
    properties: {
      array: [0, 0, 0]
    },
    strictEqual: 3
  });
});
