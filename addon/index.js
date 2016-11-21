export { default as add } from './add';
export { default as and } from './and';
import array from './array';
export { array };
export { default as collect } from './collect';
export { default as computed } from './computed';
export { default as conditional } from './conditional';
export { default as defaultTrue } from './default-true';
export { default as difference } from './difference';
export { default as divide } from './divide';
export { default as eq } from './eq';
export { default as equal } from './equal';
export { default as getBy } from './get-by';
export { default as gt } from './gt';
export { default as gte } from './gte';
export { default as hash } from './hash';
export { default as htmlSafe } from './html-safe';
export { default as instanceOf } from './instance-of';
export { default as isAny } from './is-any';
export { default as isEvery } from './is-every';
export { default as isHtmlSafe } from './is-html-safe';
export { default as join } from './join';
export { default as lt } from './lt';
export { default as lte } from './lte';
export { default as mapBy } from './map-by';
export { default as map } from './map';
export { default as math } from './math';
export { default as multiply } from './multiply';
export { default as not } from './not';
export { default as objectAt } from './object-at';
export { default as or } from './or';
export { default as parseFloat } from './parse-float';
export { default as parseInt } from './parse-int';
export { default as product } from './product';
import promise from './promise';
export { promise };
export { default as quotient } from './quotient';
export { default as raw } from './raw';
export { default as reduce } from './reduce';
export { default as slice } from './slice';
export { default as split } from './split';
import string from './string';
export { string };
export { default as subtract } from './subtract';
export { default as sum } from './sum';
export { default as tag } from './tag';
export { default as toLower } from './to-lower';
export { default as toUpper } from './to-upper';
export { default as typeOf } from './type-of';
export { default as underscore } from './underscore';
export { default as uniqBy } from './uniq-by';
export { default as uniq } from './uniq';
export { default as without } from './without';
export { default as writable } from './writable';

import { deprecateFunc } from 'ember-deprecations';

const projectName = 'ember-awesome-macros';
const until = 'sometime before 1.0';

function deprecate(newFunc, oldKey, newKey) {
  return deprecateFunc(`${oldKey} is deprecated, please use ${newKey}`, {
    id: `${projectName}.${oldKey}`,
    until
  }, newFunc);
}

const any = deprecate(array.any, 'any', 'array.any');
const compact = deprecate(array.compact, 'compact', 'array.compact');
const contains = deprecate(array.includes, 'contains', 'array.includes');
const every = deprecate(array.every, 'every', 'array.every');
const filterBy = deprecate(array.filterBy, 'filterBy', 'array.filterBy');
const filter = deprecate(array.filter, 'filter', 'array.filter');
const findBy = deprecate(array.findBy, 'findBy', 'array.findBy');
const find = deprecate(array.find, 'find', 'array.find');
const first = deprecate(array.first, 'first', 'array.first');
const includes = deprecate(array.includes, 'includes', 'array.includes');
const indexOf = deprecate(array.indexOf, 'indexOf', 'array.indexOf');
const lastIndexOf = deprecate(array.lastIndexOf, 'lastIndexOf', 'array.lastIndexOf');
const last = deprecate(array.last, 'last', 'array.last');
const promiseAll = deprecate(promise.all, 'promiseAll', 'promise.all');
const promiseArray = deprecate(promise.array, 'promiseArray', 'promise.array');
const promiseHash = deprecate(promise.hash, 'promiseHash', 'promise.hash');
const promiseObject = deprecate(promise.object, 'promiseObject', 'promise.object');
const promiseResolve = deprecate(promise.resolve, 'promiseResolve', 'promise.resolve');
const camelize = deprecate(string.camelize, 'camelize', 'string.camelize');
const capitalize = deprecate(string.capitalize, 'capitalize', 'string.capitalize');
const classify = deprecate(string.classify, 'classify', 'string.classify');
const dasherize = deprecate(string.dasherize, 'dasherize', 'string.dasherize');
const decamelize = deprecate(string.decamelize, 'decamelize', 'string.decamelize');
const substr = deprecate(string.substr, 'substr', 'string.substr');
const substring = deprecate(string.substring, 'substring', 'string.substring');

export {
  any,
  compact,
  contains,
  every,
  filterBy,
  filter,
  findBy,
  find,
  first,
  includes,
  indexOf,
  lastIndexOf,
  last,
  promiseAll,
  promiseArray,
  promiseHash,
  promiseObject,
  promiseResolve,
  camelize,
  capitalize,
  classify,
  dasherize,
  decamelize,
  substr,
  substring
};
