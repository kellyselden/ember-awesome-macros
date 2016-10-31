import Ember from 'ember';

const {
  get, setProperties
} = Ember;

export default function({
  assert,
  computed,
  properties,
  expected,
  deepEqual,
  assertion
}) {
  let obj = Ember.Object.extend({
    computed
  }).create();

  // compute initial value
  // to test recomputes
  get(obj, 'computed');

  setProperties(obj, properties);

  let val = get(obj, 'computed');

  if (assertion) {
    assert.ok(assertion(val));
  } else if (deepEqual) {
    assert.deepEqual(val, deepEqual);
  } else if (assert) {
    assert.strictEqual(val, expected);
  }

  return {
    obj,
    val
  };
}
