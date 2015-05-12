var assert = require('assert'),
    csnlp = require('../src/csnlp');

describe('csnlp', function(){
  describe('#tokenizeTB()', function() {
    it('null argument', function(){
      var tokens = csnlp.tokenizeTB(null);
      assert.equal(0, tokens.length);
    });
    it("empty string", function() {
      var tokens = csnlp.tokenizeTB("");
      assert.equal(0, tokens.length);
    });
  });
});
