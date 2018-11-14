import { get, setProperties, computed } from '@ember/object';
import { split } from 'ember-awesome-macros/string';
import { raw } from 'ember-awesome-macros';
import { module, test } from 'qunit';
import { compute } from 'ember-macro-helpers/test-support';
import sinon from 'sinon';

const source = 'val1,val2';
const key = ',';

module('Integration | Macro | string | split', function() {
  test('it splits', function(assert) {
    compute({
      assert,
      computed: split('source', 'key'),
      properties: {
        source,
        key
      },
      deepEqual: [
        'val1',
        'val2'
      ]
    });
  });

  test('it handles source modifying', function(assert) {
    let { subject } = compute({
      computed: split('source', 'key'),
      properties: {
        source,
        key
      }
    });

    setProperties(subject, {
      source: 'val1,val2,val3'
    });

    assert.deepEqual(get(subject, 'computed'), [
      'val1',
      'val2',
      'val3'
    ]);
  });

  test('it handles key modifying', function(assert) {
    let { subject } = compute({
      computed: split('source', 'key'),
      properties: {
        source,
        key
      }
    });

    setProperties(subject, {
      key: 'val'
    });

    assert.deepEqual(get(subject, 'computed'), [
      '',
      '1,',
      '2'
    ]);
  });

  test('it handles undefined source', function(assert) {
    compute({
      assert,
      computed: split('source', 'key'),
      deepEqual: []
    });
  });

  test('default value is a new copy every recalculation', function(assert) {
    let { subject } = compute({
      computed: split('source', 'key')
    });

    let result = subject.get('computed');

    subject.set('source', '');

    subject.get('computed');

    subject.set('source', undefined);

    assert.notEqual(subject.get('computed'), result);
  });

  test('doesn\'t calculate when unnecessary', function(assert) {
    let callback = sinon.spy();

    compute({
      computed: split(
        undefined,
        computed(callback)
      )
    });

    assert.notOk(callback.called);
  });

  test('it handles nesting', function(assert) {
    compute({
      assert,
      computed: split(raw(source), raw(key)),
      deepEqual: [
        'val1',
        'val2'
      ]
    });
  });
});
