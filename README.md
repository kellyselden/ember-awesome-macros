# ember-awesome-macros

[![npm version](https://badge.fury.io/js/ember-awesome-macros.svg)](https://badge.fury.io/js/ember-awesome-macros)
[![Build Status](https://travis-ci.org/kellyselden/ember-awesome-macros.svg?branch=master)](https://travis-ci.org/kellyselden/ember-awesome-macros)
[![Dependency Status](https://david-dm.org/kellyselden/ember-awesome-macros.svg)](https://david-dm.org/kellyselden/ember-awesome-macros)
[![devDependency Status](https://david-dm.org/kellyselden/ember-awesome-macros/dev-status.svg)](https://david-dm.org/kellyselden/ember-awesome-macros#info=devDependencies)

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
* [`array`](#array)
* [`collect`](#collect)
* [`contains`](#contains)
* [`first`](#first)
* [`includes`](#includes)
* [`indexOf`](#indexof)
* [`join`](#join)
* [`last`](#last)
* [`objectAt`](#objectat)
* [`peekQueue`](#peekqueue)
* [`peekStack`](#peekstack)

##### Boolean
* [`and`](#and)
* [`defaultTrue`](#defaulttrue)
* [`not`](#not)
* [`or`](#or)

##### Equality
* [`equal`](#equal)
* [`gt`](#gt)
* [`gte`](#gte)
* [`lt`](#lt)
* [`lte`](#lte)

##### Number
* [`add`](#add)
* [`difference`](#difference)
* [`divide`](#divide)
* [`multiply`](#multiply)
* [`product`](#product)
* [`quotient`](#quotient)
* [`subtract`](#subtract)
* [`sum`](#sum)

##### Object
* [`getBy`](#getby)
* [`hash`](#hash)
* [`raw`](#raw)

##### Promise
* [`promiseAll`](#promiseall)
* [`promiseArray`](#promisearray)
* [`promiseHash`](#promisehash)
* [`promiseObject`](#promiseobject)

##### String
* [`camelize`](#camelize)
* [`capitalize`](#capitalize)
* [`classify`](#classify)
* [`dasherize`](#dasherize)
* [`decamelize`](#decamelize)
* [`split`](#split)
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

##### `array`
alias for [`collect`](#collect)

##### `camelize`
wraps [`Ember.String.camelize`](http://emberjs.com/api/classes/Ember.String.html#method_camelize), allows composing

```js
originalValue: 'test-string',
newValue: camelize('originalValue') // 'testString'
```

##### `capitalize`
wraps [`Ember.String.capitalize`](http://emberjs.com/api/classes/Ember.String.html#method_capitalize), allows composing

```js
originalValue: 'test string',
newValue: capitalize('originalValue') // 'Test string'
```

##### `classify`
wraps [`Ember.String.classify`](http://emberjs.com/api/classes/Ember.String.html#method_classify), allows composing

```js
originalValue: 'test string',
newValue: classify('originalValue') // 'TestString'
```

##### `collect`
same as `Ember.computed.collect`, but allows composing

```js
source1: 'my value 1',
source2: 'my value 2',
value: collect('source1', collect('source2')), // ['my value 1', ['my value 2']]
```

##### `contains`
alias for [`includes`](#includes)

##### `dasherize`
wraps [`Ember.String.dasherize`](http://emberjs.com/api/classes/Ember.String.html#method_dasherize), allows composing

```js
originalValue: 'TestString',
newValue: dasherize('originalValue') // 'test-string'
```

##### `decamelize`
wraps [`Ember.String.decamelize`](http://emberjs.com/api/classes/Ember.String.html#method_decamelize), allows composing

```js
originalValue: 'TestString',
newValue: decamelize('originalValue') // 'test_string'
```

##### `defaultTrue`
true if source is undefined

```js
source1: undefined,
source2: false,
source3: 'my value',
value1: defaultTrue('source1') // true
value2: defaultTrue('source2') // false
value3: defaultTrue('source3') // 'my value'
```

##### `difference`
subtracts numbers

```js
source1: 3,
source2: 2,
source3: 1,
value1: difference('source1', 'source2', 'source3') // 0
value2: difference('source2', difference('source2', 'source3')) // 2
```

##### `divide`
alias for [`quotient`](#quotient)

##### `equal`
like `Ember.computed.equal`, but uses dependent properties on both sides
and allows composing

```js
source1: 'my value',
source2: 'my other value',
source3: 'my value',
value1: equal('source1', 'source2') // false
value2: equal('source1', 'source3') // true
```

##### `first`
alias for [`peekQueue`](#peekqueue)

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
value1: gt('source1', 'source2') // false
value2: gt('source1', 'source3') // false
value3: gt('source2', 'source3') // true
```

##### `gte`
like `Ember.computed.gte`, but uses dependent properties on both sides
and allows composing

```js
source1: 1,
source2: 2,
source3: 1,
value1: gte('source1', 'source2') // false
value2: gte('source1', 'source3') // true
value3: gte('source2', 'source3') // true
```

##### `hash`
build a hash out of computed properties, allows composing

```js
source1: 'my value 1',
source2: 'my value 2',
value: hash({
  prop1: 'source1',
  prop2: hash({
    prop: 'source2'
  })
}), // { prop1: 'my value 1', prop2: { prop: 'my value 2' } }
```

##### `includes`
implements `Array.prototype.includes()`, allows composing

```js
array: Ember.A(['my value 1', 'my value 2']),
source1: 'my value 2',
source2: 'my value 3',
value1: includes('array', 'source1') // true
value2: includes('array', 'source2') // false
value3: includes(collect(raw('my value 1'), raw('my value 2')), raw('my value 1')) // true
```

##### `indexOf`
implements `Array.prototype.indexOf()`, allows composing

```js
array: Ember.A(['my value 1', 'my value 2']),
source1: 'my value 2',
source2: 'my value 3',
value1: indexOf('array', 'source1') // 0
value2: indexOf('array', 'source2') // -1
value3: indexOf(collect(raw('my value 1'), raw('my value 2')), raw('my value 1')) // 0
```

##### `join`
implements `Array.prototype.join()`, allows composing

```js
array: Ember.A(['1', '2']),
separator: ', ',
value1: join('values', 'separator') // '1, 2'
value2: join(collect(raw('1'), raw('2')), raw(', ')) // '1, 2'
```

##### `last`
alias for [`peekStack`](#peekstack)

##### `lt`
like `Ember.computed.lt`, but uses dependent properties on both sides
and allows composing

```js
source1: 1,
source2: 2,
source3: 1,
value1: lt('source1', 'source2') // true
value2: lt('source1', 'source3') // false
value3: lt('source2', 'source3') // false
```

##### `lte`
like `Ember.computed.lte`, but uses dependent properties on both sides
and allows composing

```js
source1: 1,
source2: 2,
source3: 1,
value1: lte('source1', 'source2') // true
value2: lte('source1', 'source3') // true
value3: lte('source2', 'source3') // false
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
implements `http://emberjs.com/api/classes/Ember.MutableArray.html#method_objectAt`, allows composing

```js
array: Ember.A(['my value']),
source1: 0,
source2: 1,
value1: objectAt('array', 'source1') // 'my value'
value2: objectAt('array', 'source2') // undefined
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

##### `peekQueue`
get the first item of an array

```js
values: Ember.A(['1', '2']),
firstValue: peekQueue('values') // '1'
```

##### `peekStack`
get the last item of an array

```js
values: Ember.A(['1', '2']),
firstValue: peekStack('values') // '2'
```

##### `product`
multiplies numbers

```js
source1: 1,
source2: 2,
source3: 3,
value1: product('source1', 'source2', 'source3') // 6
value2: product('source2', product('source2', 'source3')) // 6
```

##### `promiseAll`
combines promises using `RSVP.all`

```js
promise1: computed(function() {
  return RSVP.resolve('value1');
}),
promise2: computed(function() {
  return RSVP.resolve('value2');
}),
promise: promiseAll('promise1', 'promise2') // resolves to ['value1', 'value2']
```

##### `promiseArray`
wraps a promise in the equivalent of `DS.PromiseArray` (`ArrayProxy` and `PromiseProxyMixin`)

```js
products: promiseArray(function() {
  return this.store.findAll('product');
})
```

can also wrap an existing property

```js
productsPromise: computed(function() {
  return this.store.findAll('product');
}),
products: promiseArray('productsPromise')
```

##### `promiseHash`
combines promises using `RSVP.hash`

```js
promise1: computed(function() {
  return RSVP.resolve('value1');
}),
promise2: computed(function() {
  return RSVP.resolve('value2');
}),
promise: promiseHash('promise1', 'promise2') // resolves to { promise1: 'value1', promise2: 'value2' }
```

##### `promiseObject`
wraps a promise in the equivalent of `DS.PromiseObject` (`ObjectProxy` and `PromiseProxyMixin`)

```js
product: promiseObject(function() {
  return this.store.findRecord('product', 1);
})
```

can also wrap an existing property

```js
productPromise: computed(function() {
  return this.store.findRecord('product', 1);
}),
product: promiseObject('productPromise')
```

##### `quotient`
subtracts numbers

```js
source1: 3,
source2: 2,
source3: 1,
value1: quotient('source1', 'source2', 'source3') // 1.5
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

##### `split`
implements `String.prototype.split()`, allows composing

```js
source: 'val1,val2',
key: ',',
value: split('source', 'key') // ['val1', 'val2']
value: split('source', raw(',')) // ['val1', 'val2']
```

##### `subtract`
alias for [`difference`](#difference)

##### `sum`
adds numbers

```js
source1: 1,
source2: 2,
source3: 3,
value1: sum('source1', 'source2', 'source3') // 6
value2: sum('source2', sum('source2', 'source3')) // 6
```

##### `toLower`
wraps [`String.prototype.toLowerCase`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase), allows composing

```js
originalValue: 'TestString',
newValue: toLower('originalValue') // 'teststring'
```

##### `toUpper`
wraps [`String.prototype.toUpperCase`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase), allows composing

```js
originalValue: 'TestString',
newValue: toUpper('originalValue') // 'TESTSTRING'
```

##### `underscore`
wraps [`Ember.String.underscore`](http://emberjs.com/api/classes/Ember.String.html#method_underscore), allows composing

```js
originalValue: 'TestString',
newValue: underscore('originalValue') // 'test_string'
```
