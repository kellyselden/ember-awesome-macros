import { module, test } from 'qunit';
import { raw } from 'ember-awesome-macros';
import { A as emberA } from '@ember/array';
import { groupBy } from 'ember-awesome-macros/array';
import compute from 'ember-macro-test-helpers/compute';

module('Integration | Macros | group by', function() {
  test('it returns empty array if not array type', function(assert) {
    compute({
      assert,
      computed: groupBy('array'),
      properties: {
        array: {}
      },
      deepEqual: []
    });
  });

  test('it returns array identity if key not string', function(assert) {
    let array = [];

    compute({
      assert,
      computed: groupBy('array', 'key'),
      properties: {
        array,
        key: true
      },
      strictEqual: array
    });
  });

  test('it groups array', function(assert) {
    let item1 = { test: 1, name: 'foo' };
    let item2 = { test: 2, name: 'bar' };
    let item3 = { test: 3, name: 'foo' };

    compute({
      assert,
      computed: groupBy('array', 'key'),
      properties: {
        array: emberA([item1, item2, item3]),
        key: 'name'
      },
      deepEqual: [
        {
          key: 'name',
          value: 'foo',
          items: [item1, item3]
        },
        {
          key: 'name',
          value: 'bar',
          items: [item2]
        }
      ]
    });
  });

  test('composable: it groups array by key', function(assert) {
    let item1 = { test: 1, name: 'foo' };
    let item2 = { test: 2, name: 'bar' };
    let item3 = { test: 3, name: 'foo' };

    compute({
      assert,
      computed: groupBy(raw(emberA([item1, item2, item3])), raw('name')),
      deepEqual: [
        {
          key: 'name',
          value: 'foo',
          items: [item1, item3]
        },
        {
          key: 'name',
          value: 'bar',
          items: [item2]
        }
      ]
    });
  });

  test('it groups array by key and comparator', function(assert) {
    let today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    let today2 = new Date();
    today2.setUTCHours(0, 0, 0, 0);
    let yesterday = new Date(today);
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);
    let yesterday2 = new Date(today);
    yesterday2.setUTCDate(yesterday2.getUTCDate() - 1);
    let twoDaysAgo = new Date(yesterday);
    twoDaysAgo.setUTCDate(twoDaysAgo.getUTCDate() - 1);

    let item1 = { name: 'Carrera', date: today };
    let item2 = { name: 'Veyron', date: today2 };
    let item3 = { name: 'Corvette', date: yesterday };
    let item4 = { name: 'Viper', date: yesterday2 };
    let item5 = { name: 'Cobra', date: twoDaysAgo };

    let { subject } = compute({
      computed: groupBy('array', raw('date'), (groupDate, date) => {
        return groupDate.getTime() === date.getTime();
      }),
      properties: {
        array: emberA([item1, item2, item3, item4, item5])
      }
    });

    let todayGroup = { key: 'date', value: today, items: [item1, item2] };
    let yesterdayGroup = {
      key: 'date',
      value: yesterday,
      items: [item3, item4]
    };
    let twoDaysAgoGroup = { key: 'date', value: twoDaysAgo, items: [item5] };

    let expected = [todayGroup, yesterdayGroup, twoDaysAgoGroup];

    assert.deepEqual(subject.get('computed'), expected);
  });

  test('it handles native arrays', function(assert) {
    let item1 = { test: 1, name: 'foo' };
    let item2 = { test: 2, name: 'bar' };
    let item3 = { test: 3, name: 'foo' };

    compute({
      assert,
      computed: groupBy('array', 'key'),
      properties: {
        array: [item1, item2, item3],
        key: 'name'
      },
      deepEqual: [
        {
          key: 'name',
          value: 'foo',
          items: [item1, item3]
        },
        {
          key: 'name',
          value: 'bar',
          items: [item2]
        }
      ]
    });
  });
});
