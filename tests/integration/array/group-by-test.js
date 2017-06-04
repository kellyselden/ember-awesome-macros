import { module, test } from 'qunit';
import EmberObject from 'ember-object';
import { raw } from 'ember-awesome-macros';
import { A as emberA } from 'ember-array/utils';
import { groupBy } from 'ember-awesome-macros/array';
import compute from 'ember-macro-test-helpers/compute';

module('Integration | Macros | group by');

test('it returns undefined if array undefined', function(assert) {
  compute({
    assert,
    computed: groupBy('array', 'key'),
    strictEqual: undefined
  });
});

test('it returns original array if key undefined', function(assert) {
  const item1 = { test: 1, name: 'foo' };
  const item2 = { test: 2, name: 'bar' };
  const item3 = { test: 3, name: 'foo' };

  compute({
    assert,
    computed: groupBy('array', 'key'),
    properties: {
      array: emberA([ item1, item2, item3 ])
    },
    deepEqual: [ item1, item2, item3 ]
  });
});

test('it groups array', function(assert) {
  const item1 = { test: 1, name: 'foo' };
  const item2 = { test: 2, name: 'bar' };
  const item3 = { test: 3, name: 'foo' };

  compute({
    assert,
    computed: groupBy('array', 'key'),
    properties: {
      array: emberA([ item1, item2, item3 ]),
      key: 'name'
    },
    deepEqual: [
      {
        key: 'name',
        value: 'foo',
        items: [ item1, item3 ]
      },
      {
        key: 'name',
        value: 'bar',
        items: [ item2 ]
      }
    ]
  });
});

test('it responds to array property value changes', function(assert) {
  const item1 = EmberObject.create({ id: 1, name: 'foo' });
  const item2 = EmberObject.create({ id: 2, name: 'bar' });
  const item3 = EmberObject.create({ id: 2, name: 'foo' });

  let array = emberA([ item1, item2 ]);

  let { subject } = compute({
    computed: groupBy('array', 'key'),
    properties: {
      array,
      key: 'id'
    }
  });

  assert.deepEqual(subject.get('computed'), [
    {
      key: 'id',
      value: 1,
      items: [ item1 ]
    },
    {
      key: 'id',
      value: 2,
      items: [ item2 ]
    }
  ]);

  array.set('1.test1', 'val2');

  assert.deepEqual(subject.get('computed'), [
    {
      key: 'id',
      value: 1,
      items: [ item1 ]
    },
    {
      key: 'id',
      value: 2,
      items: [ item2 ]
    }
  ]);

  array.pushObject(item3);

  assert.deepEqual(subject.get('computed'), [
    {
      key: 'id',
      value: 1,
      items: [ item1 ]
    },
    {
      key: 'id',
      value: 2,
      items: [ item2, item3 ]
    }
  ]);

  subject.set('key', 'name');

  assert.deepEqual(subject.get('computed'), [
    {
      key: 'name',
      value: 'foo',
      items: [ item1, item3 ]
    },
    {
      key: 'name',
      value: 'bar',
      items: [ item2 ]
    }
  ]);
});

test('composable: it groups array by key', function(assert) {
  const item1 = { test: 1, name: 'foo' };
  const item2 = { test: 2, name: 'bar' };
  const item3 = { test: 3, name: 'foo' };

  compute({
    assert,
    computed: groupBy(
      raw(emberA([ item1, item2, item3 ])),
      raw('name')
    ),
    deepEqual: [
      {
        key: 'name',
        value: 'foo',
        items: [ item1, item3 ]
      },
      {
        key: 'name',
        value: 'bar',
        items: [ item2 ]
      }
    ]
  });
});

test('it groups array by key and comparator', function(assert) {
  const today = new Date();
  today.setUTCHours(0,0,0,0);
  const today2 = new Date();
  today2.setUTCHours(0,0,0,0);
  const yesterday = new Date(today);
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);
  const yesterday2 = new Date(today);
  yesterday2.setUTCDate(yesterday2.getUTCDate() - 1);
  const twoDaysAgo = new Date(yesterday);
  twoDaysAgo.setUTCDate(twoDaysAgo.getUTCDate() - 1);

  const item1 = { name: 'Carrera', date: today };
  const item2 = { name: 'Veyron', date: today2 };
  const item3 = { name: 'Corvette', date: yesterday };
  const item4 = { name: 'Viper', date: yesterday2 };
  const item5 = { name: 'Cobra', date: twoDaysAgo };

  let { subject } = compute({
    computed: groupBy('array', raw('date'), (groupDate, date) => {
      return groupDate.getTime() === date.getTime();
    }),
    properties: {
      array: emberA([ item1, item2, item3, item4, item5 ])
    }
  });

  const todayGroup = { key: 'date', value: today, items: [item1, item2] };
  const yesterdayGroup = { key: 'date', value: yesterday, items: [item3, item4] };
  const twoDaysAgoGroup = { key: 'date', value: twoDaysAgo, items: [item5] };

  const expected = [todayGroup, yesterdayGroup, twoDaysAgoGroup];

  assert.deepEqual(subject.get('computed'), expected);
});
