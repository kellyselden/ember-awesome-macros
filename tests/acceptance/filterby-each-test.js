import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | filterby each');

test('visiting /filterby-each', function(assert) {
  assert.expect(5);
  visit('/filterby-each');

  andThen(function() {
    assert.equal(currentURL(), '/filterby-each');
    assert.equal(find('.without').text().trim(), '2', 'should start at 2 without @each');
    assert.equal(find('.with').text().trim(), '2', 'should start at 2 with @each');

    click('button');

    andThen(function() {
      assert.equal(find('.without').text().trim(), '1', 'should turn to 1 without @each');
      assert.equal(find('.with').text().trim(), '1', 'should turn to 1 with @each');
    });
  });
});
