var expect = require('chai').expect;
var csnlp = require('../csnlp');

describe('csnlp', function() {
  describe('#minEditDistance()', function() {
    it('empty strings', function() {
      var distance = csnlp.minEditDistance('', '');
      var expected = -1;
      expect(distance).to.be.equal(expected);
    });

    it('kitten | sitting', function() {
      var distance = csnlp.minEditDistance('kitten', 'sitting');
      var expected = 5;
      expect(distance).to.be.equal(expected);
    });

    it('the | that', function() {
      var distance = csnlp.minEditDistance('that', 'the');
      var expected = 1;
      expect(distance).to.be.equal(expected);
    });

    it('this | tihs', function() {
      var distance = csnlp.minEditDistance('this', 'tihs');
      var expected = 2;
      expect(distance).to.be.equal(expected);
    });

    it('intention | execution', function() {
      var distance = csnlp.minEditDistance('intention', 'execution');
      var expected = 8;
      expect(distance).to.be.equal(expected);
    });

    it('two arrays', function() {
      var ar1 = ['spokesman', 'confirms', 'senior', 'government', 'adviser', 'was', 'shot'];
      var ar2 = ['spokesman', 'said', 'the', 'senior', 'adviser', 'was', 'shot', 'dead'];
      var distance = csnlp.minEditDistance(ar1, ar2);
      var expected = 5;
      expect(distance).to.be.equal(expected);
    });
  });
});
