# ember-awesome-macros
==============================================================================

[![Greenkeeper badge](https://badges.greenkeeper.io/kellyselden/ember-awesome-macros.svg)](https://greenkeeper.io/)
[![npm version](https://badge.fury.io/js/ember-awesome-macros.svg)](https://badge.fury.io/js/ember-awesome-macros)
[![Build Status](https://travis-ci.org/kellyselden/ember-awesome-macros.svg?branch=master)](https://travis-ci.org/kellyselden/ember-awesome-macros)
[![dependencies Status](https://david-dm.org/kellyselden/ember-awesome-macros/status.svg)](https://david-dm.org/kellyselden/ember-awesome-macros)
[![devDependencies Status](https://david-dm.org/kellyselden/ember-awesome-macros/dev-status.svg)](https://david-dm.org/kellyselden/ember-awesome-macros?type=dev)
[![Ember Observer Score](https://emberobserver.com/badges/ember-awesome-macros.svg)](https://emberobserver.com/addons/ember-awesome-macros)
[![Ember Version](https://img.shields.io/badge/ember-2.12%2B-brightgreen.svg)](https://www.emberjs.com/)

A collection of Ember computed macros. All the macros are composable, meaning you can nest them to your heart's content, like so:

```js
result: conditional(and(not('value1'), 'value2'), sum('value3', 1), collect('value4', toUpper('value5'))) // lisp much?
```

Two essential primitive macros come from a different addon: [ember-macro-helpers](https://github.com/kellyselden/ember-macro-helpers)

* [raw](https://github.com/kellyselden/ember-macro-helpers#raw) makes composing macros easier
* [writable](https://github.com/kellyselden/ember-macro-helpers#writable) makes setting macros possible

The API is not final until 1.0. I will be adding aliases as I think of better names for things, and possibly breaking or removing existing macros.

If you have any opinions or want a new macro added, just ask! Or feel free to submit a pull request.

### Introduction Video

[![Ember Awesome Macros](http://img.youtube.com/vi/kIDIa1NBZZI/maxresdefault.jpg)](https://www.youtube.com/watch?v=kIDIa1NBZZI)

Installation
------------------------------------------------------------------------------

```
ember install ember-awesome-macros
```


Usage
------------------------------------------------------------------------------

```js
import nameOfMacro from 'ember-awesome-macros/name-of-macro';
// or
import { nameOfMacro } from 'ember-awesome-macros';
```

#### Macro list

##### Array
* [`array.any`](#arrayany)
* [`collect`](#collect)
* [`array.compact`](#arraycompact)
* [`array.concat`](#arrayconcat)
* [`array.every`](#arrayevery)
* [`array.filterBy`](#arrayfilterby)
* [`array.filter`](#arrayfilter)
* [`array.findBy`](#arrayfindby)
* [`array.find`](#arrayfind)
* [`array.first`](#arrayfirst)
* [`array.groupBy`](#arraygroupby)
* [`array.includes`](#arrayincludes)
* [`array.indexOf`](#arrayindexof)
* [`array.invoke`](#arrayinvoke)
* [`array.isAny`](#arrayisany)
* [`array.isEvery`](#arrayisevery)
* [`array.join`](#arrayjoin)
* [`array.lastIndexOf`](#arraylastindexof)
* [`array.last`](#arraylast)
* [`array.length`](#arraylength)
* [`array.mapBy`](#arraymapby)
* [`array.map`](#arraymap)
* [`array.objectAt`](#arrayobjectat)
* [`array.reduce`](#arrayreduce)
* [`array.reverse`](#arrayreverse)
* [`array.rejectBy`](#arrayrejectby)
* [`array.slice`](#arrayslice)
* [`array.sort`](#arraysort)
* [`array.uniqBy`](#arrayuniqby)
* [`array.uniq`](#arrayuniq)
* [`array.without`](#arraywithout)

##### Boolean
* [`and`](#and)
* [`conditional`](#conditional)
* [`defaultTrue`](#defaulttrue)
* [`not`](#not)
* [`or`](#or)
* [`unless`](#unless)

##### Comparison
* [`eq`](#eq)
* [`equal`](#equal)
* [`gt`](#gt)
* [`gte`](#gte)
* [`instanceOf`](#instanceof)
* [`lt`](#lt)
* [`lte`](#lte)
* [`neq`](#neq)
* [`notEqual`](#notequal)

##### Number
* [`add`](#add)
* [`difference`](#difference)
* [`divide`](#divide)
* [`mod`](#mod)
* [`multiply`](#multiply)
* [`parseFloat`](#parsefloat)
* [`parseInt`](#parseint)
* [`product`](#product)
* [`quotient`](#quotient)
* [`subtract`](#subtract)
* [`sum`](#sum)

##### Object
* [`getBy`](#getby)
* [`hash`](#hash)
* [`toStr`](#tostr)
* [`toString`](#tostring)
* [`typeOf`](#typeof)

##### Math
* [`math`](#math-1)

##### Promise
* [`promise.all`](#promiseall)
* [`promise.array`](#promisearray)
* [`promise.hash`](#promisehash)
* [`promise.object`](#promiseobject)
* [`promise.resolve`](#promiseresolve)
* [`promise.then`](#promisethen)

##### String
* [`string.camelize`](#stringcamelize)
* [`string.capitalize`](#stringcapitalize)
* [`string.classify`](#stringclassify)
* [`string.dasherize`](#stringdasherize)
* [`string.decamelize`](#stringdecamelize)
* [`string.escapeExpression`](#stringescapeexpression)
* [`string.htmlSafe`](#stringhtmlsafe)
* [`string.indexOf`](#stringindexof)
* [`string.isHtmlSafe`](#stringishtmlsafe)
* [`string.lastIndexOf`](#stringlastindexof)
* [`string.length`](#stringlength)
* [`string.replace`](#stringreplace)
* [`string.split`](#stringsplit)
* [`string.substr`](#stringsubstr)
* [`string.substring`](#stringsubstring)
* [`tag`](#tag)
* [`string.titleize`](#stringtitleize)
* [`string.toLower`](#stringtolower)
* [`string.toUpper`](#stringtoupper)
* [`string.trim`](#stringtrim)
* [`string.underscore`](#stringunderscore)

#### Custom macros
See [https://github.com/kellyselden/ember-macro-helpers#custom-macros].

#### Details

##### `add`
alias for [`sum`](#sum)

##### `and`
same as `Ember.computed.and`, but allows composing

```js
source1: false,
source2: true,
source3: false,
value1: and('source1', 'source2', 'source3'), // false
value2: and(not('source1'), 'source2', not('source3')) // true
```

##### `array.any`
wraps [`Ember.Array.any`](http://emberjs.com/api/classes/Ember.Array.html#method_any), allows composing

```js
array: Ember.A([1, 2]),
value1: array.any('array', val => val === 2), // true
value2: array.any('array', val => val === 3) // false
```

##### `array.compact`
wraps [`Ember.Array.compact`](http://emberjs.com/api/classes/Ember.Array.html#method_compact), allows composing

```js
array: Ember.A([1, 2, null]),
value: array.compact('array') // [1, 2]
```

##### `array.concat`
wraps [`Array.prototype.concat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat), allows composing

```js
array1: Ember.A([1, 2]),
array2: Ember.A([3, 4]),
string: '3,4',
example: array.concat('array1', 'array2'), // [1, 2, 3, 4]
composingExample: array.concat('array1', split('string', raw(','))) // [1, 2, 3, 4]
```

##### `array.every`
wraps [`Ember.Array.every`](http://emberjs.com/api/classes/Ember.Array.html#method_every), allows composing

```js
array: Ember.A([1, 1]),
value1: array.every('array', val => val === 1), // true
value2: array.every('array', val => val === 2) // false
```

##### `array.filterBy`
wraps [`Ember.Array.filterBy`](http://emberjs.com/api/classes/Ember.Array.html#method_filterBy), allows composing

```js
array: Ember.A([{ test: 1 }, { test: 2 }]),
key: 'test',
value: array.filterBy('array', 'key', 2) // [{ test: 2 }]
```

##### `array.filter`
wraps [`Ember.Array.filter`](http://emberjs.com/api/classes/Ember.Array.html#method_filter), allows composing

```js
array: Ember.A([{ test: 1 }, { test: 2 }]),
value: array.filter('array', item => item.test === 2) // [{ test: 2 }]
```

##### `array.findBy`
wraps [`Ember.Array.findBy`](http://emberjs.com/api/classes/Ember.Array.html#method_findBy), allows composing

```js
array: Ember.A([{ test: 1 }, { test: 2 }]),
key: 'test',
value: array.findBy('array', 'key', 2) // { test: 2 }
```

##### `array.find`
wraps [`Ember.Array.find`](http://emberjs.com/api/classes/Ember.Array.html#method_find), allows composing

```js
array: Ember.A([{ test: 1 }, { test: 2 }]),
value: array.find('array', item => item.test === 2) // { test: 2 }
```

##### `array.first`
get the first item of an array

```js
array: ['1', '2'],
string: '1, 2',
example: array.first('array'), // '1'
composingExample: array.first(split('string', raw(', '))) // '1'
```

##### `array.groupBy`
allows to group an array of objects by key with an optional comparator

```js
array: Ember.A([{ test: 1, name: 'foo'}, { test: 2, name: 'foo' }, { test: 1, name: 'bar' }]),
key: 'test',
value: array.groupBy('array', 'key')
/*
  [
    {
      key: 'test',
      value: 1,
      items: [{ test: 1 , name: 'foo' }, { test: 1 , name: 'bar' }]
    },
    {
      key: 'test',
      value: 2,
      items: [{ test: 2 , name: 'foo' }]
    }
  ]
*/
```

The comparator is required if grouping by a key representing a complex object like `Date`

```js
// Given two different objects that represent the same info
// today1 = new Date();
// today2 = new Date();
// randomDate = new Date(2017, 1, 1);
array: Ember.A([
  { test: 1 , date: today1 },
  { test: 2 , date: today2 },
  { test: 1 , date: randomDate }
]),
key: 'date'

// without comparator
value1: array.groupBy('array', 'key'),
/*
  [
    {
      key: 'date',
      value: today1,
      items: [{ test: 1 , date: today1 }]
    },
    {
      key: 'date',
      value: today2,
      items: [{ test: 2 , date: today2 }]
    },
    {
      key: 'date',
      value: randomDate,
      items: [{ test: 1 , date: randomDate }]
    }
  ]
*/

// with comparator
value2: array.groupBy('array', 'key', (groupValue, currentValue) => {
  return groupValue.getTime() === currentValue.getTime();
})
/*
  [
    {
      key: 'date',
      value: today1,
      items: [{ test: 1 , date: today1 }, { test: 2 , date: today2 }]
    },
    {
      key: 'date',
      value: randomDate,
      items: [{ test: 1 , date: randomDate }]
    }
  ]
*/
```

##### `array.includes`
implements `Array.prototype.includes()`, allows composing

```js
array: Ember.A(['my value 1', 'my value 2']),
source1: 'my value 2',
source2: 'my value 3',
value1: array.includes('array', 'source1'), // true
value2: array.includes('array', 'source2'), // false
value3: array.includes(collect(raw('my value 1'), raw('my value 2')), raw('my value 1')) // true
```

##### `array.indexOf`
wraps [`Array.prototype.indexOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf), allows composing

```js
array: [2, 5, 9, 2],
value1: array.indexOf('array', 2), // 0
value2: array.indexOf('array', 2, 2) // 3
```

##### `array.invoke`
wraps [`Ember.Array.invoke()`](http://emberjs.com/api/classes/Ember.Array.html#method_invoke), allows composing

```js
array: [{
  foo(arg) {
    return 'bar-' + arg;
  }
}],
value1: array.invoke('array', 'foo', raw('baz')), // ['bar-baz']
value2: array.invoke('array', 'foo', 'arg'), // ['bar-hello']
value3: array.invoke('array', 'foo'), // ['bar-']
arg: 'hello'
```

##### `array.isAny`
wraps [`Ember.Enumerable.isAny`](http://emberjs.com/api/classes/Ember.Enumerable.html#method_isAny), allows composing

```js
array: Ember.A([{ test: 1 }, { test: 2 }]),
key: 'test',
value1: 2,
value2: 3,
result1: array.isAny('array', 'key', 'value1'), // true
result2: array.isAny('array', 'key', 'value2') // false
```

##### `array.isEvery`
wraps [`Ember.Enumerable.isEvery`](http://emberjs.com/api/classes/Ember.Enumerable.html#method_isEvery), allows composing

```js
array1: Ember.A([{ test: 1 }, { test: 1 }]),
key: 'test',
value1: 1,
value2: 2,
result1: array.isEvery('array', 'key', 'value1'), // true
result2: array.isEvery('array', 'key', 'value2') // false
```

##### `array.join`
wraps [`Array.prototype.join()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join), allows composing

```js
array: Ember.A(['1', '2']),
separator: ', ',
value1: array.join('values', 'separator'), // '1, 2'
value2: array.join(collect(raw('1'), raw('2')), raw(', ')) // '1, 2'
```

##### `array.lastIndexOf`
wraps [`Array.prototype.lastIndexOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf), allows composing

```js
array: [2, 5, 9, 2],
value1: array.lastIndexOf('array', 2), // 3
value2: array.lastIndexOf('array', 2, 2) // 0
```

##### `array.last`
get the last item of an array

```js
array: ['1', '2'],
string: '1, 2',
example: array.last('array'), // '2'
composingExample: array.last(split('string', raw(', '))) // '2'
```

##### `array.length`
wraps [`Array.prototype.length`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length), allows composing

```js
array: Ember.A([1, 2]),
string: '1,2',
example: array.length('array'), // 2
composingExample: array.length(split('string', raw(','))) // 2
```

##### `array.mapBy`
wraps [`Ember.Array.mapBy`](http://emberjs.com/api/classes/Ember.Array.html#method_mapBy), allows composing

```js
array: Ember.A([{ test: 1 }, { test: 2 }]),
key: 'test',
value: array.mapBy('array', 'key') // [1, 2]
```

##### `array.map`
wraps [`Ember.Array.map`](http://emberjs.com/api/classes/Ember.Array.html#method_map), allows composing

```js
array: Ember.A([{ test: 1 }, { test: 2 }]),
value: array.map('array', item => item.test) // [1, 2]
```

##### `array.objectAt`
wraps [`Ember.Array.objectAt`](http://emberjs.com/api/classes/Ember.Array.html#method_objectAt), allows composing

```js
array: Ember.A(['my value']),
source1: 0,
source2: 1,
value1: array.objectAt('array', 'source1'), // 'my value'
value2: array.objectAt('array', 'source2'), // undefined
value3: array.objectAt(collect(raw('my value 1')), raw(0)) // 'my value'
```

##### `array.reduce`
wraps [`Array.prototype.reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce), allows composing

Your initial value must be a factory function if you plan to mutate it in the reduce, otherwise it would continually mutate the same object every recalculation. You can still pass an object, just be careful not to mutate it.

```js
array: ['one', 'two'],
value1: array.reduce(
  'array',
  (obj, cur, i) => {
    obj[cur] = i;
    return obj;
  },
  // initial value is a factory function because we mutate the object
  () => ({})
), // { one: 0, two: 1 }

string: 'one, two',
value2: array.reduce(
  split('string', raw(', ')),
  (arr, cur, i) => arr.concat(cur, i),
  //initial value is an array because it is not mutated
  []
) // ['one', 0, 'two', 1]
```

##### `array.rejectBy`
wraps [`Ember.Array.rejectBy`](http://emberjs.com/api/classes/Ember.Array.html#method_rejectBy), allows composing

```js
array: Ember.A([{ test: 1 }, { test: 2 }]),
key: 'test',
value: array.rejectBy('array', 'key', 2) // [{ test: 1 }]
```

##### `array.reverse`
wraps [`Array.prototype.reverse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse) (calls slice() first as to not mutate), allows composing

```js
array: [1, 2, 3],
value1: array.reverse('array'), // [3, 2, 1]
value2: array.reverse(array.reverse('array')) // [1, 2, 3]
```

##### `array.slice`
wraps [`Array.prototype.slice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice), allows composing

```js
array: [1, 2, 3],
value1: array.slice('array', 1), // [2, 3]
value2: array.slice('array', difference('array.length', 1)) // [3]
```

##### `array.sort`
combines the functionality of both [`Array.prototype.sort()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) and [`Ember.computed.sort`](http://emberjs.com/api/classes/Ember.computed.html#method_sort)

```js
array1: Ember.A(['xyz', 'abc']),
array2: Ember.A([{ key: 'abc' }, { key: 'xyz' }]),
value1: array.sort('array1'), // ['abc', 'xyz']
value2: array.sort('array2', ['key:desc']), // [{ key: 'xyz' }, { key: 'abc' }]
value3: array.sort('array2', (a, b) => a.key < b.key), // [{ key: 'xyz' }, { key: 'abc' }]
```

##### `array.uniqBy`
wraps [`Ember.Array.uniqBy`](http://emberjs.com/api/classes/Ember.Array.html#method_uniqBy), allows composing

```js
array: Ember.A([{ test: 1 }, { test: 2 }, { test: 2 }]),
key: 'test',
value: array.uniqBy('array', 'key') // [{ test: 1 }, { test: 2 }]
```

##### `array.uniq`
wraps [`Ember.Array.uniq`](http://emberjs.com/api/classes/Ember.Array.html#method_uniq), allows composing

```js
array: Ember.A([1, 2, 2]),
value: array.uniq('array') // [1, 2]
```

##### `array.without`
wraps [`Ember.Enumerable.without`](http://emberjs.com/api/classes/Ember.Enumerable.html#method_without), allows composing

```js
array: Ember.A([1, 2, 3]),
value1: array.without('array', 2), // [1, 3]
value2: array.without('array', array.objectAt(1)) // [1, 3]
```

##### `collect`
same as `Ember.computed.collect`, but allows composing

```js
source1: 'my value 1',
source2: 'my value 2',
value: collect('source1', collect('source2')) // ['my value 1', ['my value 2']]
```

##### `conditional`
implements the ternary operator, allows composing

```js
condition1: true,
condition2: false,
expr1: 'my value 1',
expr2: 'my value 2',
value1: conditional('condition1', 'expr1', 'expr2'), // 'my value 1'
value2: conditional('condition2', 'expr1', 'expr2'), // 'my value 2'
value3: conditional(or('condition1', 'condition2'), raw('my value 1'), raw('my value 2')) // 'my value 1'
```

##### `defaultTrue`
true if source is undefined

```js
source1: undefined,
source2: false,
source3: 'my value',
value1: defaultTrue('source1'), // true
value2: defaultTrue('source2'), // false
value3: defaultTrue('source3') // 'my value'
```

##### `difference`
subtracts numbers

```js
source1: 3,
source2: 2,
source3: 1,
value1: difference('source1', 'source2', 'source3'), // 0
value2: difference('source1', collect('source2', 'source3')) // 2
```

##### `divide`
alias for [`quotient`](#quotient)

##### `eq`
alias for [`equal`](#equal)

##### `equal`
like `Ember.computed.equal`, but uses dependent properties on both sides. allows N number of arguments.

```js
source1: 'my value',
source2: 'my other value',
source3: 'my value',
value1: equal('source1', 'source2'), // false
value2: equal('source1', 'source3'), // true
value3: equal('source1', 'source2', 'source3') // false
```

##### `getBy`
get a variable property name from an object

```js
key: 'modelProperty',
model: {
  modelProperty: 'my value'
},
value1: getBy('model', 'key'), // 'my value'
value2: getBy('model', raw('modelProperty')) // 'my value'
```

##### `gt`
like `Ember.computed.gt`, but uses dependent properties on both sides
and allows composing

```js
source1: 1,
source2: 2,
source3: 1,
value1: gt('source1', 'source2'), // false
value2: gt('source1', 'source3'), // false
value3: gt('source2', 'source3') // true
```

##### `gte`
like `Ember.computed.gte`, but uses dependent properties on both sides
and allows composing

```js
source1: 1,
source2: 2,
source3: 1,
value1: gte('source1', 'source2'), // false
value2: gte('source1', 'source3'), // true
value3: gte('source2', 'source3') // true
```

##### `hash`
build a hash out of computed properties, allows composing

```js
source1: 'my value 1',
source2: 'my value 2',

value1: hash({
  prop1: 'source1',
  prop2: hash({
    prop: 'source2'
  })
}), // { prop1: 'my value 1', prop2: { prop: 'my value 2' } }

// you can also build the hash using property key names
value2: hash('source1', 'source2'), // { source1: 'my value 1', source2: 'my value 2' }

// or you can mix and match, the result will be merged
value3: hash('source1', { prop2: 'source2' }) // { source1: 'my value 1', prop2: 'my value 2' }
```

##### `instanceOf`
wraps [`instanceof`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof) operator

```js
key1: {},
key2: false,
key3: '',
value1: instanceOf('key1', Object), // true
value2: instanceOf(or('key2', 'key3'), String) // true
```

##### `lt`
like `Ember.computed.lt`, but uses dependent properties on both sides
and allows composing

```js
source1: 1,
source2: 2,
source3: 1,
value1: lt('source1', 'source2'), // true
value2: lt('source1', 'source3'), // false
value3: lt('source2', 'source3') // false
```

##### `lte`
like `Ember.computed.lte`, but uses dependent properties on both sides
and allows composing

```js
source1: 1,
source2: 2,
source3: 1,
value1: lte('source1', 'source2'), // true
value2: lte('source1', 'source3'), // true
value3: lte('source2', 'source3') // false
```

##### `math`
exposes all [`Math`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math) functions

```js
source1: 2.2,
source2: 2.7,
value1: math.ceil('source1'), // 3
value2: math.floor(sum('source1', 'source2')) // 4
```

##### `mod`
the modulus operator

```js
number1: 123,
number2: 45,
example: mod('number1', 'number2'), // 33
composingExample: mod(sum('number1', 'number2'), 39) // 12
```

##### `multiply`
alias for [`product`](#product)

##### `neq`
alias for [`notEqual`](#notequal)

##### `not`
same as `Ember.computed.not`, but allows composing

```js
source1: true,
source2: false,
value1: not('source1'), // false
value2: not(and('source1', 'source2')) // true
```

##### `notEqual`
the inverse of [`equal`](#equal), allows composing

```js
source1: 'my value',
source2: 'my other value',
source3: 'my value',
value1: notEqual('source1', 'source2'), // true
value2: notEqual('source1', 'source3'), // false
value3: notEqual('source1', 'source2', 'source3') // true
```

##### `or`
same as `Ember.computed.or`, but allows composing

```js
source1: true,
source2: false,
source3: true,
value1: or('source1', 'source2', 'source3'), // true
value2: or(not('source1'), 'source2', not('source3')) // false
```

##### `parseFloat`
wraps [`parseFloat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat), allows composing

```js
string1: '12.34',
string2: '12',
string3: '34',
example: parseFloat('string1'), // 12.34
composingExample: parseFloat(tag`${'string2'}.${'string3'}`) // 12.34
```

##### `parseInt`
wraps [`parseInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt), allows composing

```js
string: '123',
example: parseInt('string'), // 123
composingExample: parseInt(substr('string', 1), 8) // 19
```

##### `product`
multiplies numbers

```js
source1: 1,
source2: 2,
source3: 3,
value1: product('source1', 'source2', 'source3'), // 6
value2: product('source1', collect('source2', 'source3')) // 6
```

##### `promise.all`
combines promises using `RSVP.all`

```js
promise1: computed(function() {
  return RSVP.resolve('value1');
}),
promise2: computed(function() {
  return RSVP.resolve('value2');
}),
promise: promise.all('promise1', 'promise2') // resolves to ['value1', 'value2']
```

##### `promise.array`
wraps a promise in the equivalent of `DS.PromiseArray` (`ArrayProxy` and `PromiseProxyMixin`)

```js
productsPromise: computed(function() {
  return this.store.findAll('product');
}),
products: promise.array('productsPromise')
```

can also wrap a computed property

```js
products: promise.array(computed(function() {
  return this.store.findAll('product');
}))
```

##### `promise.hash`
combines promises using `RSVP.hash`

```js
promise1: computed(function() {
  return RSVP.resolve('value1');
}),
promise2: computed(function() {
  return RSVP.resolve('value2');
}),
promise: promise.hash('promise1', 'promise2') // resolves to { promise1: 'value1', promise2: 'value2' }
```

##### `promise.object`
wraps a promise in the equivalent of `DS.PromiseObject` (`ObjectProxy` and `PromiseProxyMixin`)

```js
productPromise: computed(function() {
  return this.store.findRecord('product', 1);
}),
product: promise.object('productPromise')
```

can also wrap a computed property

```js
product: promise.object(computed(function() {
  return this.store.findRecord('product', 1);
}))
```

##### `promise.resolve`
wraps a value in an `RSVP.resolve`

```js
key1: 'my value',
promise1: promise.resolve('key1'), // a resolved promise if you need it

key2: computed(function() {
  return this.store.findRecord('user');
}),
promise2: promise.resolve(conditional('someBool', 'key1', 'key2')) // resolve an object if you don't know if it is a promise or not
```

##### `promise.then`
calls `.then()` on a promise and then `.get` on the result

```js
key: 'firstName',
userPromise: computed(function() {
  return this.store.findRecord('user'); // { firstName: 'Mary' }
}),

firstName: promise.then('userPromise', 'key') // 'Mary'
```

##### `quotient`
divides numbers

```js
source1: 3,
source2: 2,
source3: 1,
value1: quotient('source1', 'source2', 'source3'), // 1.5
value2: quotient('source1', collect('source2', 'source3')) // 1.5
```

##### `string.camelize`
wraps [`Ember.String.camelize`](http://emberjs.com/api/classes/Ember.String.html#method_camelize), allows composing

```js
originalValue: 'test-string',
newValue: string.camelize('originalValue') // 'testString'
```

##### `string.capitalize`
wraps [`Ember.String.capitalize`](http://emberjs.com/api/classes/Ember.String.html#method_capitalize), allows composing

```js
originalValue: 'test string',
newValue: string.capitalize('originalValue') // 'Test string'
```

##### `string.classify`
wraps [`Ember.String.classify`](http://emberjs.com/api/classes/Ember.String.html#method_classify), allows composing

```js
originalValue: 'test string',
newValue: string.classify('originalValue') // 'TestString'
```

##### `string.dasherize`
wraps [`Ember.String.dasherize`](http://emberjs.com/api/classes/Ember.String.html#method_dasherize), allows composing

```js
originalValue: 'TestString',
newValue: string.dasherize('originalValue') // 'test-string'
```

##### `string.decamelize`
wraps [`Ember.String.decamelize`](http://emberjs.com/api/classes/Ember.String.html#method_decamelize), allows composing

```js
originalValue: 'TestString',
newValue: string.decamelize('originalValue') // 'test_string'
```

##### `string.escapeExpression`
wraps `Ember.Handlebars.Utils.escapeExpression`, allows composing

```js
originalValue: '<input>',
newValue: string.escapeExpression('originalValue') // '&lt;input&gt;'
```

##### `string.htmlSafe`
wraps [`Ember.String.htmlSafe`](http://emberjs.com/api/classes/Ember.String.html#method_htmlSafe), allows composing

```js
originalValue: '<input>',
newValue: string.htmlSafe('originalValue') // will not be escaped
```

##### `string.indexOf`
wraps [`String.prototype.indexOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf), allows composing

```js
string: '121',
value: '1',
example: string.indexOf('string', 'value'), // 0
composingExample: string.indexOf(substr('string', 1), raw('1')) // 1
```

##### `string.isHtmlSafe`
wraps [`Ember.String.isHTMLSafe`](http://emberjs.com/api/classes/Ember.String.html#method_isHTMLSafe), allows composing

```js
source1: '<input>',
source2: string.htmlSafe('<input>'),
value1: string.isHtmlSafe('source1'), // false
value2: string.isHtmlSafe('source2') // true
```

##### `string.lastIndexOf`
wraps [`String.prototype.lastIndexOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/lastIndexOf), allows composing

```js
string: '121',
value: '1',
example: string.lastIndexOf('string', 'value'), // 2
composingExample: string.lastIndexOf(substr('string', 0, 2), raw('1')) // 0
```

##### `string.length`
wraps [`String.prototype.length`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length), allows composing

```js
string1: 'abc',
string2: 'xyz',
example: string.length('string1'), // 3
composingExample: string.length(tag`${'string1'}${'string2'}`) // 6
```

##### `string.replace`
wraps [`String.prototype.replace`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace), allows composing

```js
string: 'abc',
substr: 'bc',
newSubstr: 'cb',
value1: string.replace('string', 'substr', 'newSubstr'), // 'acb'
value2: string.replace('source', 'substr', string.toUpper('newSubstr')) // 'aCB'
```

##### `string.split`
wraps [`String.prototype.split`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split), allows composing

```js
source: 'val1,val2',
key: ',',
value1: string.split('source', 'key'), // ['val1', 'val2']
value2: string.split('source', raw(',')) // ['val1', 'val2']
```

##### `string.substr`
wraps [`String.prototype.substr()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substr), allows composing

```js
string1: 'abcxyz',
string2: 'abc',
string3: 'xyz',
example: string.substr('string1', 2, 2), // 'cx'
composingExample: string.substr(tag`${'string2'}${'string3'}`, 2, 2) // 'cx'
```

##### `string.substring`
wraps [`String.prototype.substring()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring), allows composing

```js
string1: 'abcxyz',
string2: 'abc',
string3: 'xyz',
example: string.substring('string1', 2, 4), // 'cx'
composingExample: string.substring(tag`${'string2'}${'string3'}`, 2, 4) // 'cx'
```

##### `string.titleize`
capitalizes words, allows composing

```js
originalValue: 'james mcAvoy',
newValue: string.titleize('originalValue') // 'James Mcavoy'
```

##### `string.toLower`
wraps [`String.prototype.toLowerCase()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase), allows composing

```js
originalValue: 'TestString',
newValue: string.toLower('originalValue') // 'teststring'
```

##### `string.toUpper`
wraps [`String.prototype.toUpperCase()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase), allows composing

```js
originalValue: 'TestString',
newValue: string.toUpper('originalValue') // 'TESTSTRING'
```

##### `string.trim`
wraps [`String.prototype.trim()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim), allows composing

```js
originalValue: ' TestString ',
newValue: string.trim('originalValue') // 'TestString'
```

##### `string.underscore`
wraps [`Ember.String.underscore`](http://emberjs.com/api/classes/Ember.String.html#method_underscore), allows composing

```js
originalValue: 'TestString',
newValue: string.underscore('originalValue') // 'test_string'
```

##### `subtract`
alias for [`difference`](#difference)

##### `sum`
adds numbers

```js
source1: 1,
source2: 2,
source3: 3,
value1: sum('source1', 'source2', 'source3'), // 6
value2: sum('source1', collect('source2', 'source3')) // 6
```

##### `tag`
use a [tagged template literal](http://odetocode.com/blogs/scott/archive/2014/09/30/features-of-es6-part-8-tagged-templates.aspx) as a computed macro, allows composing

```js
source: 'two',
value1: tag`one ${'source'} three`, // 'one two three'
value2: tag`one ${toUpper('source')} three` // 'one TWO three'
```

##### `toStr`
calls `toString` with args on whatever you provide

```js
key1: {},
key2: 253,
key3: 254,
value1: toStr('key1'), // '[object Object]'
value2: toStr(math.max('key2', 'key3'), 16) // 'fe'
```

##### `toString`
alias for [`toStr`](#tostr)

The `toString` name conflicts with `window.toString` and breaks Babel, which means you need to do something like this:

```js
import { toString as toStr } from 'ember-awesome-macros';
```

That's why we provide the [`toStr`](#tostr) alias.

##### `typeOf`
wraps [`typeOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeOf) operator

```js
key1: {},
key2: false,
key3: '',
value1: typeOf('key1'), // 'object'
value2: typeOf(or('key2', 'key3')) // 'string'
```

##### `unless`
macro version of `{{unless}}` and the inverse of [`conditional`](#conditional), allows composing

```js
condition1: false,
condition2: true,
expr1: 'my value 1',
expr2: 'my value 2',
value1: unless('condition1', 'expr1', 'expr2'), // 'my value 1'
value2: unless('condition2', 'expr1', 'expr2'), // 'my value 2'
value3: unless(and('condition1', 'condition2'), raw('my value 1'), raw('my value 2')) // 'my value 1'
```


Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd ember-awesome-macros`
* `npm install`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
