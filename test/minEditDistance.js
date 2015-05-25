var assert = require('assert'),
    csnlp = require('../csnlp');

describe('csnlp', function() {
  describe('#minEditDistance()', function(){
    it('empty strings = -1', function(){
      var distance = csnlp.minEditDistance('', '');
      assert.equal(-1, distance);
    });

    it('kitten | sitting = 5', function() {
      var distance = csnlp.minEditDistance('kitten', 'sitting');
      assert.equal(5, distance);
    });

    it('the | that', function() {
      var distance = csnlp.minEditDistance('that', 'the');
      assert.equal(1, distance);
    });

    it('this | tihs using Damerau-Levenshtein', function(){
      var distance = csnlp.minEditDistance('this', 'tihs', 'damlev');
      assert.equal(2, distance);
    });

    it('intention | execution', function(){
      var distance = csnlp.minEditDistance('intention', 'execution');
      assert.equal(8, distance);
    });

    it('two arrays', function() {
      var ar1 = ['spokesman', 'confirms', 'senior', 'government', 'adviser', 'was', 'shot'],
          ar2 = ['spokesman', 'said', 'the', 'senior', 'adviser', 'was', 'shot', 'dead'];
      var distance = csnlp.minEditDistance(ar1, ar2);
      assert.equal(5, distance);
    });

    it('two arrays using Damerau-Levenshtein', function() {
      var ar1 = ['spokesman', 'confirms', 'senior', 'government', 'adviser', 'was', 'shot'],
          ar2 = ['spokesman', 'said', 'the', 'senior', 'adviser', 'was', 'shot', 'dead'];
      var distance = csnlp.minEditDistance(ar1, ar2, 'damlev');
      assert.equal(12, distance);
    });

  });
});
