import { module, test } from 'qunit';
import expect from 'ember-macro-test-helpers/expect-imports';
import string, {
  camelize,
  capitalize,
  classify,
  dasherize,
  decamelize,
  escapeExpression,
  htmlSafe,
  indexOf,
  isHtmlSafe,
  lastIndexOf,
  length,
  match,
  replace,
  split,
  substr,
  substring,
  titleize,
  toLower,
  toUpper,
  trim,
  underscore,
} from 'ember-awesome-macros/string';
import _camelize from 'ember-awesome-macros/string/camelize';
import _capitalize from 'ember-awesome-macros/string/capitalize';
import _classify from 'ember-awesome-macros/string/classify';
import _dasherize from 'ember-awesome-macros/string/dasherize';
import _decamelize from 'ember-awesome-macros/string/decamelize';
import _escapeExpression from 'ember-awesome-macros/string/escape-expression';
import _htmlSafe from 'ember-awesome-macros/string/html-safe';
import _indexOf from 'ember-awesome-macros/string/index-of';
import _isHtmlSafe from 'ember-awesome-macros/string/is-html-safe';
import _lastIndexOf from 'ember-awesome-macros/string/last-index-of';
import _length from 'ember-awesome-macros/string/length';
import _match from 'ember-awesome-macros/string/match';
import _replace from 'ember-awesome-macros/string/replace';
import _split from 'ember-awesome-macros/string/split';
import _substr from 'ember-awesome-macros/string/substr';
import _substring from 'ember-awesome-macros/string/substring';
import _titleize from 'ember-awesome-macros/string/titleize';
import _toLower from 'ember-awesome-macros/string/to-lower';
import _toUpper from 'ember-awesome-macros/string/to-upper';
import _trim from 'ember-awesome-macros/string/trim';
import _underscore from 'ember-awesome-macros/string/underscore';

module('Acceptance | string imports', function() {
  test('all string global imports', function(assert) {
    expect(assert, string);

    assert.ok(string.camelize);
    assert.ok(string.capitalize);
    assert.ok(string.classify);
    assert.ok(string.dasherize);
    assert.ok(string.decamelize);
    assert.ok(string.escapeExpression);
    assert.ok(string.htmlSafe);
    assert.ok(string.indexOf);
    assert.ok(string.isHtmlSafe);
    assert.ok(string.lastIndexOf);
    assert.ok(string.length);
    assert.ok(string.match);
    assert.ok(string.replace);
    assert.ok(string.split);
    assert.ok(string.substr);
    assert.ok(string.substring);
    assert.ok(string.titleize);
    assert.ok(string.toLower);
    assert.ok(string.toUpper);
    assert.ok(string.trim);
    assert.ok(string.underscore);
  });

  test('all string imports', function(assert) {
    expect(assert, string);

    assert.ok(camelize);
    assert.ok(capitalize);
    assert.ok(classify);
    assert.ok(dasherize);
    assert.ok(decamelize);
    assert.ok(escapeExpression);
    assert.ok(htmlSafe);
    assert.ok(indexOf);
    assert.ok(isHtmlSafe);
    assert.ok(lastIndexOf);
    assert.ok(length);
    assert.ok(match);
    assert.ok(replace);
    assert.ok(split);
    assert.ok(substr);
    assert.ok(substring);
    assert.ok(titleize);
    assert.ok(toLower);
    assert.ok(toUpper);
    assert.ok(trim);
    assert.ok(underscore);
  });

  test('all string default imports', function(assert) {
    expect(assert, string);

    assert.ok(_camelize);
    assert.ok(_capitalize);
    assert.ok(_classify);
    assert.ok(_dasherize);
    assert.ok(_decamelize);
    assert.ok(_escapeExpression);
    assert.ok(_htmlSafe);
    assert.ok(_indexOf);
    assert.ok(_isHtmlSafe);
    assert.ok(_lastIndexOf);
    assert.ok(_length);
    assert.ok(_match);
    assert.ok(_replace);
    assert.ok(_split);
    assert.ok(_substr);
    assert.ok(_substring);
    assert.ok(_titleize);
    assert.ok(_toLower);
    assert.ok(_toUpper);
    assert.ok(_trim);
    assert.ok(_underscore);
  });
});
