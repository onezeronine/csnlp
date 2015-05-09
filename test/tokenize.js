var assert = require("assert"),
  csnlp = require('../src/csnlp');


describe('csnlp', function(){
  describe('#tokenizeWS()', function(){
    it('get empty tokens', function(){
      var tokens = csnlp.tokenizeWS("");
      assert.equal(0, tokens.length);
    });

    it('get the first word', function(){
      var tokens = csnlp.tokenizeWS("i");
      var expected = { word: "i", begin: 0, end: 0 };
      var actual = tokens[0];

      assert.equal(expected.word, actual.word);
      assert.equal(expected.begin, actual.begin);
      assert.equal(expected.end, actual.end);
    });

    it('get three words', function() {
      var tokens = csnlp.tokenizeWS("the quick brown fox jumps over the lazy dog");

      assert.equal(9, tokens.length);
      assert.equal("the", tokens[0].word);
      assert.equal(0, tokens[0].begin);
      assert.equal(2, tokens[0].end);
      assert.equal("dog", tokens[8].word);
      assert.equal(40, tokens[8].begin);
      assert.equal(42, tokens[8].end);
      assert.equal("jumps", tokens[4].word);
      assert.equal(20, tokens[4].begin);
      assert.equal(24, tokens[4].end);
    });
  })
});
