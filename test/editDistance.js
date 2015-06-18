  var assert = require('assert'),
    csnlp = require('../csnlp');

describe('csnlp', function() {
  describe('#minEditDistance()', function(){
    it('empty strings = -1', function(){
      var distance = csnlp.getEditDistance1('', '');
      assert.equal(-1, distance);
    });

    it('kitten | sitting = 5', function() {
      var distance = csnlp.getEditDistance1('kitten', 'sitting');
      assert.equal(5, distance);
    });

    it('the | that', function() {
      var distance = csnlp.getEditDistance1('that', 'the');
      assert.equal(1, distance);
    });

    it('this | tihs using Damerau-Levenshtein', function(){
      var distance = csnlp.getEditDistance2('this', 'tihs');
      assert.equal(2, distance);
    });

    it('intention | execution', function(){
      var distance = csnlp.getEditDistance1('intention', 'execution');
      assert.equal(8, distance);
    });

    it('two arrays', function() {
      var ar1 = ['spokesman', 'confirms', 'senior', 'government', 'adviser', 'was', 'shot'],
          ar2 = ['spokesman', 'said', 'the', 'senior', 'adviser', 'was', 'shot', 'dead'];
      var distance = csnlp.getEditDistance1(ar1, ar2);
      assert.equal(5, distance);
    });

    it('two arrays using Damerau-Levenshtein', function() {
      var ar1 = ['spokesman', 'confirms', 'senior', 'government', 'adviser', 'was', 'shot'],
          ar2 = ['spokesman', 'said', 'the', 'senior', 'adviser', 'was', 'shot', 'dead'];
      var distance = csnlp.getEditDistance2(ar1, ar2);
      assert.equal(12, distance);
    });

  });
});
