import { replace } from 'ember-awesome-macros/string';
import { raw } from 'ember-awesome-macros';
import { computed } from '@ember/object';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';
import sinon from 'sinon';

module('Integration | Macro | string | replace');

test('it calls replace on string', function(assert) {
  compute({
    assert,
    computed: replace('string', 'substr', 'newSubstr'),
    properties: {
      string: 'abcxyz',
      substr: 'cx',
      newSubstr: 'xc'
    },
    strictEqual: 'abxcyz'
  });
});

test('doesn\'t calculate when unnecessary', function(assert) {
  let callback = sinon.spy();

  compute({
    computed: replace(
      undefined,
      computed(callback)
    )
  });

  assert.notOk(callback.called);
});

test('composable: it calls replace on string', function(assert) {
  compute({
    assert,
    computed: replace(
      raw('abcxyz'),
      raw('cx'),
      raw('xc')
    ),
    strictEqual: 'abxcyz'
  });
});
