import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | application');

test('can babel transform expected imports', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(find('.math-test').text().trim(), '1');
  });
});
