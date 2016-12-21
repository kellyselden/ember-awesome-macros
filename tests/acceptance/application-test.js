import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | application');

test('can babel transform expected imports', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(find('.math-specifier').text().trim(), '1');
    assert.equal(find('.math-default-specifier').text().trim(), '1');
  });
});
