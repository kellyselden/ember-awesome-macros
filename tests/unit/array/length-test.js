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
    strictEqual: returnValue
  });
});

test('composable: it gets length on array', function(assert) {
  compute({
    assert,
    computed: length(raw(array)),
    strictEqual: returnValue
  });
});
