import { module, test } from 'qunit';
import math, {
  abs,
} from 'ember-awesome-macros/math';
import _abs from 'ember-awesome-macros/math/abs';

module('Acceptance | math imports');

test('math global imports', function(assert) {
  assert.ok(math.abs);
});

test('math imports', function(assert) {
  assert.ok(abs);
});

test('math default imports', function(assert) {
  assert.ok(_abs);
});
