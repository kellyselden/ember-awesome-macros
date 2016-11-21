# ember-awesome-macros

[![npm version](https://badge.fury.io/js/ember-awesome-macros.svg)](https://badge.fury.io/js/ember-awesome-macros)
[![Build Status](https://travis-ci.org/kellyselden/ember-awesome-macros.svg?branch=master)](https://travis-ci.org/kellyselden/ember-awesome-macros)
[![Dependency Status](https://david-dm.org/kellyselden/ember-awesome-macros.svg)](https://david-dm.org/kellyselden/ember-awesome-macros)
[![devDependency Status](https://david-dm.org/kellyselden/ember-awesome-macros/dev-status.svg)](https://david-dm.org/kellyselden/ember-awesome-macros#info=devDependencies)
[![Ember Observer Score](https://emberobserver.com/badges/ember-awesome-macros.svg)](https://emberobserver.com/addons/ember-awesome-macros)

A random collection of Ember computed macros. All the macros are composable, meaning you can nest them to your heart's content, like so:

```js
result: conditional(and(not('value1'), 'value2'), sum('value3', 1), collect('value4', toUpper('value5'))) // lisp much?
```

The API is not final until 1.0. I will be adding aliases as I think of better names for things, and possibly breaking or removing existing macros.

If you have any opinions or want a new macro added, just ask! Or feel free to submit a pull request.

#### Usage

```sh
ember install ember-awesome-macros
```

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
* [`filterBy`](#filterby)
* [`filter`](#filter)
* [`findBy`](#findby)
* [`find`](#find)
* [`first`](#first)
* [`array.includes`](#arrayincludes)
* [`array.indexOf`](#arrayindexof)
* [`isAny`](#isany)
* [`isEvery`](#isevery)
* [`join`](#join)
* [`array.lastIndexOf`](#arraylastindexof)
* [`last`](#last)
* [`array.length`](#arraylength)
* [`mapBy`](#mapby)
* [`map`](#map)
* [`objectAt`](#objectat)
* [`reduce`](#reduce)
* [`slice`](#slice)
* [`uniqBy`](#uniqby)
* [`uniq`](#uniq)
* [`without`](#without)

##### Boolean
* [`and`](#and)
* [`conditional`](#conditional)
* [`defaultTrue`](#defaulttrue)
* [`isHtmlSafe`](#ishtmlsafe)
* [`not`](#not)
* [`or`](#or)

##### Comparison
* [`eq`](#eq)
* [`equal`](#equal)
* [`gt`](#gt)
* [`gte`](#gte)
* [`instanceOf`](#instanceof)
* [`lt`](#lt)
* [`lte`](#lte)

##### Number
* [`add`](#add)
* [`difference`](#difference)
* [`divide`](#divide)
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
* [`typeOf`](#typeof)

##### Math
* [`math`](#math-1)

##### Primitives
* [`computed`](#computed)
* [`raw`](#raw)
* [`writable`](#writable)

##### Promise
* [`promise.all`](#promiseall)
* [`promise.array`](#promisearray)
* [`promise.hash`](#promisehash)
* [`promise.object`](#promiseobject)
* [`promise.resolve`](#promiseresolve)

##### String
* [`string.camelize`](#stringcamelize)
* [`string.capitalize`](#stringcapitalize)
* [`string.classify`](#stringclassify)
* [`string.dasherize`](#stringdasherize)
* [`string.decamelize`](#stringdecamelize)
* [`htmlSafe`](#htmlsafe)
* [`string.indexOf`](#stringindexof)
* [`string.lastIndexOf`](#stringlastindexof)
* [`string.length`](#stringlength)
* [`split`](#split)
* [`string.substr`](#stringsubstr)
* [`string.substring`](#stringsubstring)
* [`tag`](#tag)
* [`toLower`](#tolower)
* [`toUpper`](#toupper)
* [`underscore`](#underscore)

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

##### `array.lastIndexOf`
wraps [`Array.prototype.lastIndexOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf), allows composing

```js
array: [2, 5, 9, 2],
value1: array.lastIndexOf('array', 2), // 3
value2: array.lastIndexOf('array', 2, 2) // 0
```

##### `array.length`
wraps [`Array.prototype.length`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length), allows composing

```js
array: Ember.A([1, 2]),
string: '1,2',
example: array.length('array'), // 2
composingExample: array.length(split('string', raw(','))) // 2
```

##### `collect`
same as `Ember.computed.collect`, but allows composing

```js
source1: 'my value 1',
source2: 'my value 2',
value: collect('source1', collect('source2')) // ['my value 1', ['my value 2']]
```

##### `computed`
functions like [`Ember.computed`](http://emberjs.com/api/classes/Ember.computed.html), but is composing friendly

```js
key1: '1,2',

// your callback is passed the resolved values
computed1: computed('key1', value => {
  console.log(value); // '1,2'
  // do something else
}),

// you can compose your macros
computed2: computed(split('key1', raw(',')), value => {
  console.log(value); // [1, 2]
  // do something else
}),

// you can use enumerable helpers and property expansion
key2: [1, 2],
computed3: computed('key2.[]', value => {
  console.log(value); // [1, 2]
  // do something else
}),
key3: [{ key4: 1 }, { key4: 2 }],
computed4: computed('key3.@each.key4', value => {
  console.log(value); // [{ key4: 1 }, { key4: 2 }]
  // do something else
}),
key5: [{ key6: 1 }, { key7: 2 }],
computed5: computed('key5.{key6,key7}', (value1, value2) => {
  console.log(value1); // 1
  console.log(value2); // 2
  // do something else
})
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
value2: difference('source2', difference('source2', 'source3')) // 2
```

##### `divide`
alias for [`quotient`](#quotient)

##### `eq`
alias for [`equal`](#equal)

##### `equal`
like `Ember.computed.equal`, but uses dependent properties on both sides
and allows composing

```js
source1: 'my value',
source2: 'my other value',
source3: 'my value',
value1: equal('source1', 'source2'), // false
value2: equal('source1', 'source3') // true
```

##### `filterBy`
wraps [`Ember.Array.filterBy`](http://emberjs.com/api/classes/Ember.Array.html#method_filterBy), allows composing

```js
array: Ember.A([{ test: 1 }, { test: 2 }]),
key: 'test',
value: filterBy('array', 'key', 2) // [{ test: 2 }]
```

##### `filter`
wraps [`Ember.Array.filter`](http://emberjs.com/api/classes/Ember.Array.html#method_filter), allows composing

```js
array: Ember.A([{ test: 1 }, { test: 2 }]),
value: filter('array', item => item.test === 2) // [{ test: 2 }]
```

##### `findBy`
wraps [`Ember.Array.findBy`](http://emberjs.com/api/classes/Ember.Array.html#method_findBy), allows composing

```js
array: Ember.A([{ test: 1 }, { test: 2 }]),
key: 'test',
value: findBy('array', 'key', 2) // { test: 2 }
```

##### `find`
wraps [`Ember.Array.find`](http://emberjs.com/api/classes/Ember.Array.html#method_find), allows composing

```js
array: Ember.A([{ test: 1 }, { test: 2 }]),
value: find('array', item => item.test === 2) // { test: 2 }
```

##### `first`
get the first item of an array

```js
array: ['1', '2'],
string: '1, 2',
example: first('array'), // '1'
composingExample: first(split('string', raw(', '))) // '1'
```

##### `getBy`
get a variable property name from an object

```js
key: 'modelProperty',
model: {
  modelProperty: 'my value'
},
value: getBy('model', 'key') // 'my value'
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

##### `htmlSafe`
wraps [`Ember.String.htmlSafe`](http://emberjs.com/api/classes/Ember.String.html#method_htmlSafe), allows composing

```js
originalValue: '<input>',
newValue: htmlSafe('originalValue') // will not be escaped
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

##### `isAny`
wraps [`Ember.Enumerable.isAny`](http://emberjs.com/api/classes/Ember.Enumerable.html#method_isAny), allows composing

```js
array: Ember.A([{ test: 1 }, { test: 2 }]),
key: 'test',
value1: 2,
value2: 3,
result1: isAny('array', 'key', 'value1'), // true
result2: isAny('array', 'key', 'value2') // false
```

##### `isEvery`
wraps [`Ember.Enumerable.isEvery`](http://emberjs.com/api/classes/Ember.Enumerable.html#method_isEvery), allows composing

```js
array1: Ember.A([{ test: 1 }, { test: 1 }]),
key: 'test',
value1: 1,
value2: 2,
result1: isEvery('array', 'key', 'value1'), // true
result2: isEvery('array', 'key', 'value2') // false
```

##### `isHtmlSafe`
wraps [`Ember.String.isHTMLSafe`](http://emberjs.com/api/classes/Ember.String.html#method_isHTMLSafe), allows composing

```js
source1: '<input>',
source2: htmlSafe('<input>'),
value1: isHtmlSafe('source1'), // false
value2: isHtmlSafe('source2') // true
```

##### `join`
implements `Array.prototype.join()`, allows composing

```js
array: Ember.A(['1', '2']),
separator: ', ',
value1: join('values', 'separator'), // '1, 2'
value2: join(collect(raw('1'), raw('2')), raw(', ')) // '1, 2'
```

##### `last`
get the last item of an array

```js
array: ['1', '2'],
string: '1, 2',
example: last('array'), // '2'
composingExample: last(split('string', raw(', '))) // '2'
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

##### `mapBy`
wraps [`Ember.Array.mapBy`](http://emberjs.com/api/classes/Ember.Array.html#method_mapBy), allows composing

```js
array: Ember.A([{ test: 1 }, { test: 2 }]),
key: 'test',
value: mapBy('array', 'key') // [1, 2]
```

##### `map`
wraps [`Ember.Array.map`](http://emberjs.com/api/classes/Ember.Array.html#method_map), allows composing

```js
array: Ember.A([{ test: 1 }, { test: 2 }]),
value: map('array', item => item.test) // [1, 2]
```

##### `math`
exposes all [`Math`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math) functions

```js
source1: 2.2,
source2: 2.7,
value1: math.ceil('source1'), // 3
value2: math.floor(sum('source1', 'source2')) // 4
```

##### `multiply`
alias for [`product`](#product)

##### `not`
same as `Ember.computed.not`, but allows composing

```js
source1: true,
source2: false,
value1: not('source1'), // false
value2: not(and('source1', 'source2')) // true
```

##### `objectAt`
implements `http://emberjs.com/api/classes/Ember.Array.html#method_objectAt`, allows composing

```js
array: Ember.A(['my value']),
source1: 0,
source2: 1,
value1: objectAt('array', 'source1'), // 'my value'
value2: objectAt('array', 'source2'), // undefined
value3: objectAt(collect(raw('my value 1')), raw(0)) // 'my value'
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
value2: product('source2', product('source2', 'source3')) // 6
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

##### `quotient`
subtracts numbers

```js
source1: 3,
source2: 2,
source3: 1,
value1: quotient('source1', 'source2', 'source3'), // 1.5
value2: quotient('source2', quotient('source2', 'source3')) // 1.5
```

##### `raw`
a helper if you want to use "literals" in your macros

```js
value1: equal('key1', raw('my value 1')),
value2: indexOf('key2', raw('my value 2'))
```

or you want to get fancy with composing

```js
source: 'my computed value',
value: hash({
  prop1: 'source',
  prop2: raw('my raw value')
}) // { prop1: 'my computed value', prop2: 'my raw value' }
```

##### `reduce`
wraps [`Array.prototype.reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce), allows composing

```js
array: ['one', 'two'],
value1: reduce('array', (obj, cur, i) => {
  obj[cur] = i;
  return obj;
}, {}), // { one: 0, two: 1 }

string: 'one, two',
value2: reduce(split('string', raw(', ')), (obj, cur, i) => {
  obj[cur] = i;
  return obj;
}, {}) // { one: 0, two: 1 }
```

##### `slice`
wraps [`Array.prototype.slice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice), allows composing

```js
array: [1, 2, 3],
value1: slice('array', 1), // [2, 3]
value2: slice('array', difference('array.length', 1)) // [3]
```

##### `split`
implements `String.prototype.split()`, allows composing

```js
source: 'val1,val2',
key: ',',
value1: split('source', 'key'), // ['val1', 'val2']
value2: split('source', raw(',')) // ['val1', 'val2']
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

##### `string.indexOf`
wraps [`String.prototype.indexOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf), allows composing

```js
string: '121',
value: '1',
example: string.indexOf('string', 'value'), // 0
composingExample: string.indexOf(substr('string', 1), raw('1')) // 1
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

##### `subtract`
alias for [`difference`](#difference)

##### `sum`
adds numbers

```js
source1: 1,
source2: 2,
source3: 3,
value1: sum('source1', 'source2', 'source3'), // 6
value2: sum('source2', sum('source2', 'source3')) // 6
```

##### `tag`
use a [tagged template literal](http://odetocode.com/blogs/scott/archive/2014/09/30/features-of-es6-part-8-tagged-templates.aspx) as a computed macro, allows composing

```js
source: 'two',
value1: tag`one ${'source'} three`, // 'one two three'
value2: tag`one ${toUpper('source')} three` // 'one TWO three'
```

##### `toLower`
wraps [`String.prototype.toLowerCase()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase), allows composing

```js
originalValue: 'TestString',
newValue: toLower('originalValue') // 'teststring'
```

##### `toUpper`
wraps [`String.prototype.toUpperCase()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase), allows composing

```js
originalValue: 'TestString',
newValue: toUpper('originalValue') // 'TESTSTRING'
```

##### `typeOf`
wraps [`typeOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeOf) operator

```js
key1: {},
key2: false,
key3: '',
value1: typeOf('key1'), // 'object'
value2: typeOf(or('key2', 'key3')) // 'string'
```

##### `underscore`
wraps [`Ember.String.underscore`](http://emberjs.com/api/classes/Ember.String.html#method_underscore), allows composing

```js
originalValue: 'TestString',
newValue: underscore('originalValue') // 'test_string'
```

##### `uniqBy`
wraps [`Ember.Array.uniqBy`](http://emberjs.com/api/classes/Ember.Array.html#method_uniqBy), allows composing

```js
array: Ember.A([{ test: 1 }, { test: 2 }, { test: 2 }]),
key: 'test',
value: uniqBy('array', 'key') // [{ test: 1 }, { test: 2 }]
```

##### `uniq`
wraps [`Ember.Array.uniq`](http://emberjs.com/api/classes/Ember.Array.html#method_uniq), allows composing

```js
array: Ember.A([1, 2, 2]),
value: uniq('array') // [1, 2]
```

##### `without`
wraps [`Ember.Enumerable.without`](http://emberjs.com/api/classes/Ember.Enumerable.html#method_without), allows composing

```js
array: Ember.A([1, 2, 3]),
value1: without('array', 2), // [1, 3]
value2: without('array', objectAt(1)) // [1, 3]
```

##### `writable`
since all the macros are read-only, use this to bring back setting capability

```js
value1: writable(and('key1', 'key2')), // setting this replaces the macro with your value
value2: writable(and('key1', 'key2'), {
  set() {
    // do something
    return 'new value';
  }
}), // setting this will not overwrite your macro
value3: writable(and('key1', 'key2'), function() {
  // do something
  return 'new value';
}) // same as above, but shorthand
```
