var assert = require('assert');
var csnlp = require('../csnlp');

describe('csnlp', function() {
  describe('#minEditDistance()', function(){
    it('empty strings = -1', function() {
      var distance = csnlp.getEditDistance('', '');
      assert.equal(-1, distance);
    });

    it('kitten | sitting = 5', function() {
      var distance = csnlp.getEditDistance('kitten', 'sitting');
      assert.equal(5, distance);
    });

    it('the | that', function() {
      var distance = csnlp.getEditDistance('that', 'the');
      assert.equal(1, distance);
    });

    it('this | tihs using Damerau-Levenshtein', function(){
      var distance = csnlp.getEditDistance('this', 'tihs');
      assert.equal(2, distance);
    });

    it('intention | execution', function(){
      var distance = csnlp.getEditDistance('intention', 'execution');
      assert.equal(8, distance);
    });

    it('two arrays', function() {
      var ar1 = ['spokesman', 'confirms', 'senior', 'government', 'adviser', 'was', 'shot'],
          ar2 = ['spokesman', 'said', 'the', 'senior', 'adviser', 'was', 'shot', 'dead'];
      var distance = csnlp.getEditDistance(ar1, ar2);
      assert.equal(5, distance);
    });
  });
});
