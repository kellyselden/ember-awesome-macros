import Ember from 'ember';

const {
  get, setProperties
} = Ember;

export default function({
  assert,
  computed,
  properties,
  expected
}) {
  assert.expect(1);

  let obj = Ember.Object.extend({
    computed
  }).create();

  // compute initial value
  // to test recomputes
  get(obj, 'computed');

  setProperties(obj, properties);

  assert.strictEqual(get(obj, 'computed'), expected);
}
