var expect = require('chai').expect;
var csnlp = require('../csnlp');

describe('csnlp', function() {
  describe('#stem', function() {
    it('empty word', function() {
      var word = ['beautiful', 'animadversion', 'sprinkled', 'eucharist', 'beauty', 'beau'];
      var word2 = ['trap', 'ow', 'uproot', 'disturb', 'bestow', 'entrap', 'bead', 'shred', 'bed', 'shed', 'beds'];

      word2.forEach(function(i) {
        csnlp.stem(i);
      });

    });
  });
});
