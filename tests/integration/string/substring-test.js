import { substring } from 'ember-awesome-macros/string';
import { raw } from 'ember-awesome-macros';
import { computed } from '@ember/object';
import { module, test } from 'qunit';
import compute from 'ember-macro-test-helpers/compute';
import sinon from 'sinon';

module('Integration | Macro | string | substring', function() {
  test('it calls substring on string', function(assert) {
    compute({
      assert,
      computed: substring('str', 'indexStart', 'indexEnd'),
      properties: {
        str: 'abcxyz',
        indexStart: 2,
        indexEnd: 4
      },
      strictEqual: 'cx'
    });
  });

  test('doesn\'t calculate when unnecessary', function(assert) {
    let callback = sinon.spy();

    compute({
      computed: substring(
        undefined,
        computed(callback)
      )
    });

    assert.notOk(callback.called);
  });

  test('composable: it calls substring on string', function(assert) {
    compute({
      assert,
      computed: substring(
        raw('abcxyz'),
        2,
        4
      ),
      strictEqual: 'cx'
    });
  });
});
