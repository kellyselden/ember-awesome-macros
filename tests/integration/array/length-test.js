import { length } from 'ember-awesome-macros/array';
import { raw } from 'ember-awesome-macros';
import { A as emberArray } from 'ember-array/utils';
import { module, test } from 'qunit';
import compute from '../../helpers/compute';

let array;

module('Integration | Macro | array.length', {
  beforeEach() {
    array = emberArray([0, 0, 0]);
  }
});

test('it returns undefined if array undefined', function(assert) {
  compute({
    assert,
    computed: length('array'),
    expected: undefined
  });
});

test('it gets length on array', function(assert) {
  compute({
    assert,
    computed: length('array'),
    properties: {
      array
    },
    expected: 3
  });
});

test('it responds to length changes', function(assert) {
  let { obj } = compute({
    computed: length('array'),
    properties: {
      array
    }
  });

  array.pushObject(0);

  assert.strictEqual(obj.get('computed'), 4);
});

test('composable: it gets length on array', function(assert) {
  compute({
    assert,
    computed: length(raw(array)),
    expected: 3
  });
});
