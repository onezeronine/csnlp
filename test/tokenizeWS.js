var assert = require("assert"),
  csnlp = require('../csnlp');


describe('csnlp', function(){
  describe('#tokenizeWS()', function(){
    it('null argument', function(){
      var tokens = csnlp.tokenizeWS(null);
      assert.equal(0, tokens.length);
    });

    it('empty string', function(){
      var tokens = csnlp.tokenizeWS("");
      assert.equal(0, tokens.length);
    });

    it('get the first token from "i"', function(){
      var tokens = csnlp.tokenizeWS("i");
      var expected = "i";
      var actual = tokens[0];

      assert.equal(expected, actual);
    });

    it('get nine tokens', function() {
      var tokens = csnlp.tokenizeWS("the quick brown fox jumps over the lazy dog");
      assert.equal(9, tokens.length);
      assert.equal("the", tokens[0]);
      assert.equal("dog", tokens[8]);
      assert.equal("jumps", tokens[4]);
    });

    it('get tokens with //r and //n', function() {
      var tokens = csnlp.tokenizeWS("i don't think\rthat you are good\nthere in the\r\nwoods");
      assert.equal(11, tokens.length);
      assert.equal("think", tokens[2]);
      assert.equal("that", tokens[3]);
      assert.equal("good", tokens[6]);
      assert.equal("there", tokens[7]);
      assert.equal("the", tokens[9]);
      assert.equal("woods", tokens[10]);
    });
  })
});
