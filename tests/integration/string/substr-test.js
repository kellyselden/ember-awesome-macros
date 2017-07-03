import { substr } from 'ember-awesome-macros/string';
import { raw } from 'ember-awesome-macros';
import { computed } from '@ember/object';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';
import sinon from 'sinon';

module('Integration | Macro | string | substr');

test('it calls substr on string', function(assert) {
  compute({
    assert,
    computed: substr('str', 'start', 'length'),
    properties: {
      str: 'abcxyz',
      start: 2,
      length: 2
    },
    strictEqual: 'cx'
  });
});

test('doesn\'t calculate when unnecessary', function(assert) {
  let callback = sinon.spy();

  compute({
    computed: substr(
      undefined,
      computed(callback)
    )
  });

  assert.notOk(callback.called);
});

test('composable: it calls substr on string', function(assert) {
  compute({
    assert,
    computed: substr(
      raw('abcxyz'),
      2,
      2
    ),
    strictEqual: 'cx'
  });
});
