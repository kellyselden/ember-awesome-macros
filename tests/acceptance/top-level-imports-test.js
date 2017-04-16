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
  writable
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
  assert.ok(quotient);
  assert.ok(raw);
  assert.ok(subtract);
  assert.ok(sum);
  assert.ok(tag);
  assert.ok(toStr);
  assert.ok(toString);
  assert.ok(typeOf);
  assert.ok(unless);
  assert.ok(writable);
});

test('all top level array imports', function(assert) {
  expect(assert, array);

  assert.ok(array.any);
  assert.ok(array.compact);
  assert.ok(array.concat);
  assert.ok(array.every);
  assert.ok(array.filterBy);
  assert.ok(array.filter);
  assert.ok(array.findBy);
  assert.ok(array.find);
  assert.ok(array.first);
  assert.ok(array.includes);
  assert.ok(array.indexOf);
  assert.ok(array.invoke);
  assert.ok(array.isAny);
  assert.ok(array.isEvery);
  assert.ok(array.join);
  assert.ok(array.lastIndexOf);
  assert.ok(array.last);
  assert.ok(array.length);
  assert.ok(array.mapBy);
  assert.ok(array.map);
  assert.ok(array.objectAt);
  assert.ok(array.reduce);
  assert.ok(array.reverse);
  assert.ok(array.slice);
  assert.ok(array.sort);
  assert.ok(array.uniqBy);
  assert.ok(array.uniq);
  assert.ok(array.without);
});

test('all top level math imports', function(assert) {
  assert.ok(math.abs);
});

test('all top level promise imports', function(assert) {
  expect(assert, promise);

  assert.ok(promise.all);
  assert.ok(promise.array);
  assert.ok(promise.hash);
  assert.ok(promise.object);
  assert.ok(promise.resolve);
  assert.ok(promise.then);
});

test('all top level string imports', function(assert) {
  expect(assert, string);

  assert.ok(string.camelize);
  assert.ok(string.capitalize);
  assert.ok(string.classify);
  assert.ok(string.dasherize);
  assert.ok(string.decamelize);
  assert.ok(string.htmlSafe);
  assert.ok(string.indexOf);
  assert.ok(string.isHtmlSafe);
  assert.ok(string.lastIndexOf);
  assert.ok(string.length);
  assert.ok(string.replace);
  assert.ok(string.split);
  assert.ok(string.substr);
  assert.ok(string.substring);
  assert.ok(string.toLower);
  assert.ok(string.toUpper);
  assert.ok(string.underscore);
});
