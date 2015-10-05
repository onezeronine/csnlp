var expect = require('chai').expect;
var csnlp = require('../csnlp');

/*jshint -W030 */
describe('csnlp', function() {
  describe('#treebank()', function() {

    it('Tokenize null', function() {
      var tokens = csnlp.treebank(null);

      expect(tokens).to.exist;
      expect(tokens).to.be.a('array');
    });

    it('Tokenize empty string', function() {
      var tokens = csnlp.treebank('');

      expect(tokens).to.empty;
      expect(tokens).to.be.a('array');
      expect(tokens).to.have.length(0);
    });

    it('Tokenize complete sentence', function() {
      var tokens = csnlp.treebank('The quick brown fox jumps over the lazy dog.');
      var expected = ['The', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog', '.'];

      expect(tokens).to.exist;
      expect(tokens).to.be.a('array');
      expect(tokens).to.have.length(expected.length);

      for(var i = 0; i < tokens.length; ++i) {
        expect(tokens[i]).to.be.equal(expected[i]);
      }
    });

    it('Tokenize complete sentence with contractions', function() {
      var tokens = csnlp.treebank('Doesn\'t it bother you to hold one\'s man?');
      var expected = ['Does', 'n\'t', 'it', 'bother', 'you', 'to', 'hold',
        'one', '\'s', 'man', '?'];

      expect(tokens).to.exist;
      expect(tokens).to.be.a('array');
      expect(tokens).to.have.length(expected.length);

      for(var i = 0; i < tokens.length; ++i) {
        expect(tokens[i]).to.be.equal(expected[i]);
      }
    });

    it('Tokenize complete sentence with contractions 2', function() {
      var tokens = csnlp.treebank('I\'m not an animal.');
      var expected = ['I', '\'m', 'not', 'an', 'animal', '.'];

      expect(tokens).to.exist;
      expect(tokens).to.be.a('array');
      expect(tokens).to.have.length(expected.length);

      for(var i = 0; i < tokens.length; ++i) {
        expect(tokens[i]).to.be.equal(expected[i]);
      }
    });

    it('Tokenize sentence with quotes, colon and comma', function() {
      var tokens = csnlp.treebank('He said to me: "Who are you, young man?"');
      var expected = ['He', 'said', 'to', 'me', ':', '\'\'',
        'Who', 'are', 'you', ',', 'young', 'man', '?', '\'\''];
      expect(tokens).to.exist;
      expect(tokens).to.be.a('array');
      expect(tokens).to.have.length(expected.length);

      for(var i = 0; i < tokens.length; ++i) {
        expect(tokens[i]).to.be.equal(expected[i]);
      }
    });
  });
});
