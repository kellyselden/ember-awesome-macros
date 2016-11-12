import EmberObject from 'ember-object';
import get from 'ember-metal/get';
import { setProperties } from 'ember-metal/set';

export default function({
  assert,
  computed,
  properties,
  expected,
  deepEqual,
  assertion,
  assertReadOnly
}) {
  let obj = EmberObject.extend({
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
  } else if (assertReadOnly) {
    let func = () => setProperties(obj, { computed: 'assert read only' });
    assert.throws(func, /Cannot set read-only property/);
  } else if (assert) {
    assert.strictEqual(val, expected);
  }

  return {
    obj,
    val
  };
}
