import { indexOf } from 'ember-awesome-macros/string';
import { raw } from 'ember-awesome-macros';
import { computed } from '@ember/object';
import { module, test } from 'qunit';
import { compute } from 'ember-macro-helpers/test-support';
import sinon from 'sinon';

module('Integration | Macro | string | index of', function() {
  test('it calls indexOf on string', function(assert) {
    compute({
      assert,
      computed: indexOf('string', 'value', 'fromIndex'),
      properties: {
        string: '121',
        value: '1',
        fromIndex: 1
      },
      strictEqual: 2
    });
  });

  test('doesn\'t calculate when unnecessary', function(assert) {
    let callback = sinon.spy();

    compute({
      computed: indexOf(
        undefined,
        computed(callback)
      )
    });

    assert.notOk(callback.called);
  });

  test('composable: it calls indexOf on string', function(assert) {
    compute({
      assert,
      computed: indexOf(
        raw('121'),
        raw('1'),
        1
      ),
      strictEqual: 2
    });
  });
});
