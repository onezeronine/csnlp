var expect = require('chai').expect;
var csnlp = require('../csnlp');

describe('csnlp', function() {
  describe('#stem', function() {
    it('empty word', function() {
      var word = [
        // 'beautiful', 'animadversion', 'sprinkled', 'eucharist', 'beauty', 'beau',
        // 'trap', 'ow', 'uproot', 'disturb', 'bestow', 'entrap', 'bead', 'shred', 'bed', 'shed', 'beds',
        // '\'ye', 'aye', 'prototype', 'bye', 'say', 'okay', 'yoyo',
        'gas', 'this', 'kiwis', 'gaps'
        ];

      word.forEach(function(i) {
        var res = csnlp.stem(i);
        // console.log(i + ' => ' + res);
      });

    });
  });
});
