import Ember from 'ember';

const {
  get, setProperties
} = Ember;

export default function({
  assert,
  computed,
  properties,
  expected,
  assertion
}) {
  assert.expect(1);

  let obj = Ember.Object.extend({
    computed
  }).create();

  // compute initial value
  // to test recomputes
  get(obj, 'computed');

  setProperties(obj, properties);

  if (assertion) {
    assert.ok(assertion(get(obj, 'computed')));
  } else {
    assert.strictEqual(get(obj, 'computed'), expected);
  }
}
