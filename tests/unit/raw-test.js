import Ember from 'ember';
import { raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';

const {
  get, setProperties
} = Ember;

const Obj = Ember.Object.extend({
  test: raw('source')
});

let obj;

module('Unit | Macro | raw', {
  beforeEach() {
    obj = Obj.create();

    // compute initial value
    // to test recomputes
    get(obj, 'test');
  }
});

test('it doesn\'t treat it as a key, but a raw value', function(assert) {
  assert.expect(1);

  setProperties(obj, {
    source: 'my value'
  });

  assert.strictEqual(get(obj, 'test'), 'source');
});
