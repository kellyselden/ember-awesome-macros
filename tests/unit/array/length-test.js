import { length } from 'ember-awesome-macros/array';
import { raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../../helpers/compute';

const returnValue = 'return value test';

let array;

module('Unit | Macro | array | length', {
  beforeEach() {
    array = { length: returnValue };
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
    expected: returnValue
  });
});

test('composable: it gets length on array', function(assert) {
  compute({
    assert,
    computed: length(raw(array)),
    expected: returnValue
  });
});
