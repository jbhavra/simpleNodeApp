var assert = require('assert');
describe('test', function() {
  describe('simple test passing', function() {
    it('should pass the test', function() {
      assert.equal([1, 2, 3].indexOf(3), 2);
    });
  });
});