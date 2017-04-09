import { uniq } from 'ember-awesome-macros';
import { A as emberA } from 'ember-array/utils';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';

module('Integration | Macro | uniq');

test('it returns undefined if array undefined', function(assert) {
  compute({
    assert,
    computed: uniq('array'),
    strictEqual: undefined
  });
});

test('it calls uniq on array', function(assert) {
  compute({
    assert,
    computed: uniq('array'),
    properties: {
      array: emberA([1, 1])
    },
    deepEqual: [1]
  });
});

test('it responds to array changes', function(assert) {
  let { subject } = compute({
    computed: uniq('array'),
    properties: {
      array: emberA([1, 1])
    }
  });

  subject.set('array', emberA([1, 2]));

  assert.deepEqual(subject.get('computed'), [1, 2]);
});

test('it responds to array pushes', function(assert) {
  let array = emberA([1, 1]);

  let { subject } = compute({
    computed: uniq('array'),
    properties: {
      array
    }
  });

  array.pushObject(2);

  assert.deepEqual(subject.get('computed'), [1, 2]);
});

test('composable: it calls uniq on array', function(assert) {
  compute({
    assert,
    computed: uniq(
      emberA([1, 1])
    ),
    deepEqual: [1]
  });
});
