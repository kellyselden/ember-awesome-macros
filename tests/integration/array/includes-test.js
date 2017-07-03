import { includes } from 'ember-awesome-macros/array';
import { get, computed } from '@ember/object';
import { A as emberA } from '@ember/array';
import { raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';
import sinon from 'sinon';

let array;

module('Integration | Macro | array | includes', {
  beforeEach() {
    array = emberA(['my value']);
  }
});

test('it returns true if found', function(assert) {
  compute({
    assert,
    computed: includes('array', 'source'),
    properties: {
      array,
      source: 'my value'
    },
    strictEqual: true
  });
});

test('it returns false if not found', function(assert) {
  compute({
    assert,
    computed: includes('array', 'source'),
    properties: {
      array,
      source: 'my value 2'
    },
    strictEqual: false
  });
});

test('it returns false if popped', function(assert) {
  let { subject } = compute({
    computed: includes('array', 'source'),
    properties: {
      array,
      source: 'my value'
    }
  });

  array.popObject();

  assert.strictEqual(get(subject, 'computed'), false);
});

test('it returns false if not array', function(assert) {
  compute({
    assert,
    computed: includes('array', 'source'),
    strictEqual: false
  });
});

test('doesn\'t calculate when unnecessary', function(assert) {
  let callback = sinon.spy();

  compute({
    computed: find(
      undefined,
      computed(callback)
    )
  });

  assert.notOk(callback.called);
});

test('it handles nesting', function(assert) {
  compute({
    assert,
    computed: includes(array, raw('my value')),
    strictEqual: true
  });
});
