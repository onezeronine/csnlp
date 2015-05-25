var assert = require('assert'),
    csnlp = require('../src/csnlp');

describe('csnlp', function() {
  describe('#minEditDistance2()', function(){
    it('empty strings = -1', function(){
      var distance = csnlp.minEditDistance2('', '');
      assert.equal(-1, distance);
    });

    it('kitten | sitting = 5', function() {
      var distance = csnlp.minEditDistance2('kitten', 'sitting');
      assert.equal(5, distance);
    });

    it('the | that', function() {
      var distance = csnlp.minEditDistance2('that', 'the');
      assert.equal(1, distance);
    });

    it('intention | execution', function(){
      var distance = csnlp.minEditDistance2('intention', 'execution');
      assert.equal(8, distance);
    });

    it('two arrays', function() {
      var ar1 = ['spokesman', 'confirms', 'senior', 'government', 'adviser', 'was', 'shot'],
          ar2 = ['spokesman', 'said', 'the', 'senior', 'adviser', 'was', 'shot', 'dead'];
      var distance = csnlp.minEditDistance2(ar1, ar2);
      assert.equal(12, distance);
    });
  });
});
