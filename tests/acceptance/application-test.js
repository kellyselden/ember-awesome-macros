import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | application');

test('double render failing test', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(find('.computed').text(), 'test val 1');
  });

  click('button');

  andThen(function() {
    assert.equal(find('.computed').text(), 'test val 2');
  });
});
