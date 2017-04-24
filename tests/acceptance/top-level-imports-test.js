import { module, test } from 'qunit';
import expect from '../helpers/expect-imports';
import macros, {
  add,
  and,
  array,
  collect,
  computed,
  conditional,
  defaultTrue,
  difference,
  divide,
  eq,
  equal,
  getBy,
  gt,
  gte,
  hash,
  htmlSafe,
  instanceOf,
  isHtmlSafe,
  lt,
  lte,
  math,
  mod,
  multiply,
  neq,
  not,
  notEqual,
  or,
  parseFloat,
  parseInt,
  product,
  promise,
  quotient,
  raw,
  string,
  subtract,
  sum,
  tag,
  toStr,
  toString,
  typeOf,
  unless,
  writable,

  // deprecations

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
  isAny,
  isEvery,
  join,
  lastIndexOf,
  last,
  mapBy,
  map,
  objectAt,
  reduce,
  slice,
  uniqBy,
  uniq,
  without,

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
  split,
  substr,
  substring,
  toLower,
  toUpper,
  underscore,
} from 'ember-awesome-macros';

module('Acceptance | top level imports');

test('all top level global imports', function(assert) {
  expect(assert, macros);

  assert.ok(macros.add);
  assert.ok(macros.and);
  assert.ok(macros.array);
  assert.ok(macros.collect);
  assert.ok(macros.computed);
  assert.ok(macros.conditional);
  assert.ok(macros.defaultTrue);
  assert.ok(macros.difference);
  assert.ok(macros.divide);
  assert.ok(macros.eq);
  assert.ok(macros.equal);
  assert.ok(macros.getBy);
  assert.ok(macros.gt);
  assert.ok(macros.gte);
  assert.ok(macros.hash);
  assert.ok(macros.htmlSafe);
  assert.ok(macros.instanceOf);
  assert.ok(macros.isHtmlSafe);
  assert.ok(macros.lt);
  assert.ok(macros.lte);
  assert.ok(macros.math);
  assert.ok(macros.mod);
  assert.ok(macros.multiply);
  assert.ok(macros.neq);
  assert.ok(macros.not);
  assert.ok(macros.notEqual);
  assert.ok(macros.or);
  assert.ok(macros.parseFloat);
  assert.ok(macros.parseInt);
  assert.ok(macros.product);
  assert.ok(macros.promise);
  assert.ok(macros.quotient);
  assert.ok(macros.raw);
  assert.ok(macros.string);
  assert.ok(macros.subtract);
  assert.ok(macros.sum);
  assert.ok(macros.tag);
  assert.ok(macros.toStr);
  assert.ok(macros.toString);
  assert.ok(macros.typeOf);
  assert.ok(macros.unless);
  assert.ok(macros.writable);

  // deprecations

  assert.ok(macros.any);
  assert.ok(macros.compact);
  assert.ok(macros.contains);
  assert.ok(macros.every);
  assert.ok(macros.filterBy);
  assert.ok(macros.filter);
  assert.ok(macros.findBy);
  assert.ok(macros.find);
  assert.ok(macros.first);
  assert.ok(macros.includes);
  assert.ok(macros.indexOf);
  assert.ok(macros.isAny);
  assert.ok(macros.isEvery);
  assert.ok(macros.join);
  assert.ok(macros.lastIndexOf);
  assert.ok(macros.last);
  assert.ok(macros.mapBy);
  assert.ok(macros.map);
  assert.ok(macros.objectAt);
  assert.ok(macros.reduce);
  assert.ok(macros.slice);
  assert.ok(macros.uniqBy);
  assert.ok(macros.uniq);
  assert.ok(macros.without);

  assert.ok(macros.promiseAll);
  assert.ok(macros.promiseArray);
  assert.ok(macros.promiseHash);
  assert.ok(macros.promiseObject);
  assert.ok(macros.promiseResolve);

  assert.ok(macros.camelize);
  assert.ok(macros.capitalize);
  assert.ok(macros.classify);
  assert.ok(macros.dasherize);
  assert.ok(macros.decamelize);
  assert.ok(macros.split);
  assert.ok(macros.substr);
  assert.ok(macros.substring);
  assert.ok(macros.toLower);
  assert.ok(macros.toUpper);
  assert.ok(macros.underscore);
});

test('all top level imports', function(assert) {
  assert.ok(add);
  assert.ok(and);
  assert.ok(array);
  assert.ok(collect);
  assert.ok(computed);
  assert.ok(conditional);
  assert.ok(defaultTrue);
  assert.ok(difference);
  assert.ok(divide);
  assert.ok(eq);
  assert.ok(equal);
  assert.ok(getBy);
  assert.ok(gt);
  assert.ok(gte);
  assert.ok(hash);
  assert.ok(htmlSafe);
  assert.ok(instanceOf);
  assert.ok(isHtmlSafe);
  assert.ok(lt);
  assert.ok(lte);
  assert.ok(math);
  assert.ok(mod);
  assert.ok(multiply);
  assert.ok(neq);
  assert.ok(not);
  assert.ok(notEqual);
  assert.ok(or);
  assert.ok(parseFloat);
  assert.ok(parseInt);
  assert.ok(product);
  assert.ok(promise);
  assert.ok(quotient);
  assert.ok(raw);
  assert.ok(string);
  assert.ok(subtract);
  assert.ok(sum);
  assert.ok(tag);
  assert.ok(toStr);
  assert.ok(toString);
  assert.ok(typeOf);
  assert.ok(unless);
  assert.ok(writable);

  // deprecations

  assert.ok(any);
  assert.ok(compact);
  assert.ok(contains);
  assert.ok(every);
  assert.ok(filterBy);
  assert.ok(filter);
  assert.ok(findBy);
  assert.ok(find);
  assert.ok(first);
  assert.ok(includes);
  assert.ok(indexOf);
  assert.ok(isAny);
  assert.ok(isEvery);
  assert.ok(join);
  assert.ok(lastIndexOf);
  assert.ok(last);
  assert.ok(mapBy);
  assert.ok(map);
  assert.ok(objectAt);
  assert.ok(reduce);
  assert.ok(slice);
  assert.ok(uniqBy);
  assert.ok(uniq);
  assert.ok(without);

  assert.ok(promiseAll);
  assert.ok(promiseArray);
  assert.ok(promiseHash);
  assert.ok(promiseObject);
  assert.ok(promiseResolve);

  assert.ok(camelize);
  assert.ok(capitalize);
  assert.ok(classify);
  assert.ok(dasherize);
  assert.ok(decamelize);
  assert.ok(split);
  assert.ok(substr);
  assert.ok(substring);
  assert.ok(toLower);
  assert.ok(toUpper);
  assert.ok(underscore);
});
