import { length } from 'ember-awesome-macros/string';
import { raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from '../../helpers/compute';

const returnValue = 'return value test';

let string;

module('Unit | Macro | length', {
  beforeEach() {
    string = { length: returnValue };
  }
});

test('it returns undefined if string undefined', function(assert) {
  compute({
    assert,
    computed: length('string'),
    expected: undefined
  });
});

test('it gets length on string', function(assert) {
  compute({
    assert,
    computed: length('string'),
    properties: {
      string
    },
    expected: returnValue
  });
});

test('composable: it gets length on string', function(assert) {
  compute({
    assert,
    computed: length(raw(string)),
    expected: returnValue
  });
});
