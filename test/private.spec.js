var csnlp = require('../csnlp');

describe('csnlp - private methods', function() {

  /**
  describe('#_endsWith()', function() {
    it('ends with ion', function() {
      var result = csnlp._endsWith('transposition', 'ion');
      assert.equal(true, result);
    });
    it('not ends with ion', function() {
      var result = csnlp._endsWith('robots', 'bot');
      assert.equal(false, result);
    });
  });

  describe('#_isVowel()', function() {
    it('a == true', function() {
      var result = csnlp._isVowel('a');
      assert.equal(true, result);
    });

    it('b == false', function() {
      var result = csnlp._isVowel('b');
      assert.equal(false, result);
    });

    it('robot, 0 == false', function() {
      var result = csnlp._isVowel('robot', 0);
      assert.equal(false, result);
    });

    it('apple, 4 == true', function() {
      var result = csnlp._isVowel('apple', 4);
      assert.equal(true, result);
    });
  });

  describe('#_hasVowel()', function() {
    it('who = true', function() {
      var result = csnlp._hasVowel('who');
      assert.equal(true, result);
    });

    it('why = false', function() {
      var result = csnlp._hasVowel('why');
      assert.equal(false, result);
    });
  });

  describe('#_initDistance', function() {
    it('correct distance', function() {
      var x = 8;
      var y = 9;
      var distance = [];
      csnlp._initDistance(distance, x, y);
      for(var i = 0; i < x; ++i) {
        for(var j = 0; j < y; ++j) {
          if(i === 0) {
            assert.equal(distance[i][j], j);
          } else if(j === 0) {
            assert.equal(distance[i][j], i);
          } else {
            assert.equal(distance[i][j], 0);
          }
        }
      }
    });
  });

  **/
});
