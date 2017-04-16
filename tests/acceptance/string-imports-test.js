import { module, test } from 'qunit';
import expect from '../helpers/expect-imports';
import string, {
  camelize,
  capitalize,
  classify,
  dasherize,
  decamelize,
  htmlSafe,
  indexOf,
  isHtmlSafe,
  lastIndexOf,
  length,
  replace,
  split,
  substr,
  substring,
  toLower,
  toUpper,
  underscore
} from 'ember-awesome-macros/string';

module('Acceptance | string imports');

test('all string global imports', function(assert) {
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

test('all string imports', function(assert) {
  assert.ok(camelize);
  assert.ok(capitalize);
  assert.ok(classify);
  assert.ok(dasherize);
  assert.ok(decamelize);
  assert.ok(htmlSafe);
  assert.ok(indexOf);
  assert.ok(isHtmlSafe);
  assert.ok(lastIndexOf);
  assert.ok(length);
  assert.ok(replace);
  assert.ok(split);
  assert.ok(substr);
  assert.ok(substring);
  assert.ok(toLower);
  assert.ok(toUpper);
  assert.ok(underscore);
});
