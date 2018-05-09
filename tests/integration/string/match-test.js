import { match } from 'ember-awesome-macros/string';
import { raw } from 'ember-awesome-macros';
import { computed } from '@ember/object';
import { module, test } from 'qunit';
import { compute } from 'ember-macro-test-helpers';
import sinon from 'sinon';

module('Integration | Macro | string | match', function() {
  test('it calls match on string', function(assert) {
    compute({
      assert,
      computed: match('string', 'regex'),
      properties: {
        string: 'abcxyz',
        regex: /abc/
      },
      deepEqual: ['abc']
    });
  });

  test('doesn\'t calculate when unnecessary', function(assert) {
    let callback = sinon.spy();

    compute({
      computed: match(
        undefined,
        computed(callback)
      )
    });

    assert.notOk(callback.called);
  });

  test('composable: it calls match on string', function(assert) {
    compute({
      assert,
      computed: match(
        raw('abcxyz'),
        raw(/abc/)
      ),
      deepEqual: ['abc']
    });
  });
});
