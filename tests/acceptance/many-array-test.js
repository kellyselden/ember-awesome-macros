import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import compute from 'ember-macro-helpers/test-support/compute';
import { getBy } from 'ember-awesome-macros';
import array from 'ember-awesome-macros/array';
import raw from 'ember-macro-helpers/raw';
import { run } from '@ember/runloop';

module('Acceptance | DS.ManyArray', function(hooks) {
  let parent; let child1; let child2;

  setupTest(hooks);

  hooks.beforeEach(function() {
    run(() => {
      let store = this.owner.lookup('service:store');
      child1 = store.createRecord('child', { gender: true });
      child2 = store.createRecord('child', { gender: false });
      parent = store.createRecord('parent', { children: [child1, child2] });
    });
  });

  test('any', function(assert) {
    compute({
      assert,
      properties: { parent },
      computed: array.any('parent.children', child => child.get('gender') === true),
      strictEqual: true
    });
  });

  test('concat', function(assert) {
    compute({
      assert,
      properties: { parent },
      computed: getBy(
        array.concat('parent.children', ['apache']),
        raw('length')
      ),
      strictEqual: 3
    });
  });

  test('filterBy', function(assert) {
    compute({
      assert,
      properties: { parent },
      computed: getBy(
        array.filterBy('parent.children', raw('gender'), true),
        raw('length')
      ),
      strictEqual: 1
    });
  });

  test('filter', function(assert) {
    compute({
      assert,
      properties: { parent },
      computed: getBy(
        array.filter('parent.children', child => child.get('gender') === true),
        raw('length')
      ),
      strictEqual: 1
    });
  });

  test('findBy', function(assert) {
    compute({
      assert,
      properties: { parent },
      computed: array.findBy('parent.children', raw('gender'), true),
      assertion: value => value === child1
    });
  });

  test('find', function(assert) {
    compute({
      assert,
      properties: { parent },
      computed: array.find('parent.children', child => child.get('gender') === true),
      assertion: value => value === child1
    });
  });

  test('first', function(assert) {
    compute({
      assert,
      properties: { parent },
      computed: array.first('parent.children'),
      assertion: value => value === child1
    });
  });

  test('groupBy', function(assert) {
    compute({
      assert,
      properties: { parent },
      computed: array.groupBy('parent.children', raw('gender')),
      assertion(result) {
        return result
          && result.length === 2
          && result[0].items.length === 1
          && result[1].items.length === 1;
      }
    });
  });

  test('includes', function(assert) {
    compute({
      assert,
      properties: { parent },
      computed: array.includes('parent.children', child1),
      strictEqual: true
    });
  });

  test('indexOf', function(assert) {
    compute({
      assert,
      properties: { parent },
      computed: array.indexOf('parent.children', child2),
      strictEqual: 1
    });
  });

  test('invoke', function(assert) {
    compute({
      assert,
      properties: { parent },
      computed: array.invoke('parent.children', raw('serialize')),
      deepEqual: parent.get('children').invoke('serialize')
    });
  });

  test('isAny', function(assert) {
    compute({
      assert,
      properties: { parent },
      computed: array.isAny('parent.children', raw('gender'), true),
      strictEqual: true
    });
  });

  test('isEvery', function(assert) {
    compute({
      assert,
      properties: { parent },
      computed: array.isEvery('parent.children', raw('gender'), true),
      strictEqual: false
    });
  });

  test('lastIndexOf', function(assert) {
    compute({
      assert,
      properties: { parent },
      computed: array.lastIndexOf('parent.children', child2),
      strictEqual: 1
    });
  });

  test('last', function(assert) {
    compute({
      assert,
      properties: { parent },
      computed: array.last('parent.children'),
      strictEqual: child2
    });
  });

  test('length', function(assert) {
    compute({
      assert,
      properties: { parent },
      computed: array.length('parent.children'),
      strictEqual: 2
    });
  });

  test('mapBy', function(assert) {
    compute({
      assert,
      properties: { parent },
      computed: array.mapBy('parent.children', raw('gender')),
      deepEqual: [true, false]
    });
  });

  test('map', function(assert) {
    compute({
      assert,
      properties: { parent },
      computed: array.map('parent.children', child => child.get('gender') === true),
      deepEqual: [true, false]
    });
  });

  test('objectAt', function(assert) {
    compute({
      assert,
      properties: { parent },
      computed: array.objectAt('parent.children', 1),
      strictEqual: child2
    });
  });

  test('rejectBy', function(assert) {
    compute({
      assert,
      properties: { parent },
      computed: array.rejectBy('parent.children', raw('gender'), true),
      assertion(result) {
        return result
          && result.length === 1
          && result[0] === child2;
      }
    });
  });

  test('without', function(assert) {
    compute({
      assert,
      properties: { parent },
      computed: array.without('parent.children', child1),
      assertion(result) {
        return result
          && result.length === 1
          && result[0] === child2;
      }
    });
  });
});
