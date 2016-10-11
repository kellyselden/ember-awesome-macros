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
* [`and`](#and)
* [`array`](#array)
* [`collect`](#collect)
* [`contains`](#contains)
* [`defaultTrue`](#defaulttrue)
* [`equalKey`](#equalkey)
* [`getBy`](#getby)
* [`gtKey`](#gtkey)
* [`gteKey`](#gtekey)
* [`hash`](#hash)
* [`includes`](#includes)
* [`indexOf`](#indexof)
* [`join`](#join)
* [`ltKey`](#ltkey)
* [`lteKey`](#ltekey)
* [`not`](#not)
* [`objectAt`](#objectat)
* [`or`](#or)
* [`peekQueue`](#peekqueue)
* [`peekStack`](#peekstack)
* [`promiseAll`](#promiseall)
* [`promiseArray`](#promisearray)
* [`promiseHash`](#promisehash)
* [`promiseObject`](#promiseobject)
* [`raw`](#raw)
* [`toLower`](#tolower)
* [`toUpper`](#toupper)

#### Details

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

##### `collect`
same as `Ember.computed.collect`, but allows composing

```js
source1: 'my value 1',
source2: 'my value 2',
value: collect('source1', collect('source2')), // ['my value 1', ['my value 2']]
```

##### `contains`
alias for [`includes`](#includes)

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

##### `equalKey`
like `Ember.computed.equal`, but uses dependent properties on both sides

```js
source1: 'my value',
source2: 'my other value',
source3: 'my value',
value1: equalKey('source1', 'source2') // false
value2: equalKey('source1', 'source3') // true
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

##### `gtKey`
like `Ember.computed.gt`, but uses dependent properties on both sides

```js
source1: 1,
source2: 2,
source3: 1,
value1: gtKey('source1', 'source2') // false
value2: gtKey('source1', 'source3') // false
value3: gtKey('source2', 'source3') // true
```

##### `gteKey`
like `Ember.computed.gte`, but uses dependent properties on both sides

```js
source1: 1,
source2: 2,
source3: 1,
value1: gteKey('source1', 'source2') // false
value2: gteKey('source1', 'source3') // true
value3: gteKey('source2', 'source3') // true
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

##### `ltKey`
like `Ember.computed.lt`, but uses dependent properties on both sides

```js
source1: 1,
source2: 2,
source3: 1,
value1: ltKey('source1', 'source2') // true
value2: ltKey('source1', 'source3') // false
value3: ltKey('source2', 'source3') // false
```

##### `lteKey`
like `Ember.computed.lte`, but uses dependent properties on both sides

```js
source1: 1,
source2: 2,
source3: 1,
value1: lteKey('source1', 'source2') // true
value2: lteKey('source1', 'source3') // true
value3: lteKey('source2', 'source3') // false
```

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

##### `raw`
a helper if you want to get fancy with composing

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

##### `toLower`
calls `toLowerCase` on your string

```js
originalValue: 'abcZXY',
newValue: toLower('originalValue') // 'abcxyz'
```

##### `toUpper`
calls `toUpperCase` on your string

```js
originalValue: 'abcZXY',
newValue: toUpper('originalValue') // 'ABCXYZ'
```
