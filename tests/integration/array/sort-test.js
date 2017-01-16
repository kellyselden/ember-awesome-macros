import { sort } from 'ember-awesome-macros/array';
import { A as emberA } from 'ember-array/utils';
import { module, test } from 'qunit';
import sinon from 'sinon';
import compute from 'ember-macro-test-helpers/compute';

module('Integration | Macro | array | sort');

test('it returns undefined if array undefined', function(assert) {
  compute({
    assert,
    computed: sort('array'),
    strictEqual: undefined
  });
});

test('it calls sort on array without a parameter', function(assert) {
  compute({
    assert,
    computed: sort('array'),
    properties: {
      array: emberA(['xyz', 'abc'])
    },
    deepEqual: ['abc', 'xyz']
  });
});

test('it calls sort on array with an array parameter', function(assert) {
  compute({
    assert,
    computed: sort('array', 'sortDefinition'),
    properties: {
      array: emberA([
        {
          key1: 'abc',
          key2: 'abc'
        },
        {
          key1: 'abc',
          key2: 'xyz'
        }
      ]),
      sortDefinition: [
        'key1',
        'key2:desc'
      ]
    },
    deepEqual: [
      {
        key1: 'abc',
        key2: 'xyz'
      },
      {
        key1: 'abc',
        key2: 'abc'
      }
    ]
  });
});

test('it calls sort on array with function parameter', function(assert) {
  let sortDefinition = sinon.stub().returns(1);

  compute({
    assert,
    computed: sort('array', 'sortDefinition'),
    properties: {
      array: emberA([
        {
          key1: 'abc',
          key2: 'abc'
        },
        {
          key1: 'abc',
          key2: 'xyz'
        }
      ]),
      sortDefinition
    },
    deepEqual: [
      {
        key1: 'abc',
        key2: 'xyz'
      },
      {
        key1: 'abc',
        key2: 'abc'
      }
    ]
  });
});

test('the callback has object context', function(assert) {
  let sortDefinition = sinon.stub().returns(1);

  let { subject } = compute({
    computed: sort('array', 'sortDefinition'),
    properties: {
      array: emberA([
        {
          key1: 'abc',
          key2: 'abc'
        },
        {
          key1: 'abc',
          key2: 'xyz'
        }
      ]),
      sortDefinition
    }
  });

  assert.strictEqual(sortDefinition.thisValues[0], subject);
});

test('the callback is passed the correct args', function(assert) {
  let sortDefinition = sinon.stub().returns(1);

  compute({
    computed: sort('array', 'sortDefinition'),
    properties: {
      array: emberA([
        {
          key1: 'abc',
          key2: 'abc'
        },
        {
          key1: 'abc',
          key2: 'xyz'
        }
      ]),
      sortDefinition
    }
  });

  assert.deepEqual(sortDefinition.args, [[
    {
      key1: 'abc',
      key2: 'abc'
    },
    {
      key1: 'abc',
      key2: 'xyz'
    }
  ]]);
});
