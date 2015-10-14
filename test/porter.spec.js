var expect = require('chai').expect;
var csnlp = require('../csnlp');

describe('csnlp', function() {
  describe('#stem', function() {
    it('empty word', function() {
      var actual = csnlp.stem('');
      var expected = null;

      expect(actual).to.be.equal(expected);
    });

    it('con+ words', function() {
      var list = [
        { original: 'consign', result: 'consign' },
        { original: 'consigned', result: 'consign' },
        { original: 'consigning', result: 'consign' },
        { original: 'consignment', result: 'consign' },
        { original: 'consist', result: 'consist' },
        { original: 'consisted', result: 'consist' },
        { original: 'consistency', result: 'consist' },
        { original: 'consistent', result: 'consist' },
        { original: 'consistently', result: 'consist' },
        { original: 'consisting', result: 'consist' },
        { original: 'consists', result: 'consist' },
        { original: 'consolation', result: 'consol' },
        { original: 'consolations', result: 'consol' },
        { original: 'consolatory', result: 'consolatori' },
        { original: 'console', result: 'consol' },
        { original: 'consoled', result: 'consol' },
        { original: 'consoles', result: 'consol' },
        { original: 'consolidate', result: 'consolid' },
        { original: 'consolidated', result: 'consolid' },
        { original: 'consolidating', result: 'consolid' },
        { original: 'consoling', result: 'consol' },
        { original: 'consolingly', result: 'consol' },
        { original: 'consols', result: 'consol' },
        { original: 'consonant', result: 'conson' },
        { original: 'consort', result: 'consort' },
        { original: 'consorted', result: 'consort' },
        { original: 'consorting', result: 'consort' },
        { original: 'conspicuous', result: 'conspicu' },
        { original: 'conspicuously', result: 'conspicu' },
        { original: 'conspiracy', result: 'conspiraci' },
        { original: 'conspirator', result: 'conspir' },
        { original: 'conspirators', result: 'conspir' },
        { original: 'conspire', result: 'conspir' },
        { original: 'conspired', result: 'conspir' },
        { original: 'conspiring', result: 'conspir' },
        { original: 'constable', result: 'constabl' },
        { original: 'constables', result: 'constabl' },
        { original: 'constance', result: 'constanc' },
        { original: 'constancy', result: 'constanc' },
        { original: 'constant', result: 'constant' }
      ];

      list.forEach(function(pair) {
        var actual = csnlp.stem(pair.original);
        var expected = pair.result;

        expect(actual).to.be.equal(expected);
      });
    });

    it('kn words', function() {
      var list = [
        { original: 'knack', result: 'knack' },
        { original: 'knackeries', result: 'knackeri' },
        { original: 'knacks', result: 'knack' },
        { original: 'knag', result: 'knag' },
        { original: 'knave', result: 'knave' },
        { original: 'knaves', result: 'knaves' },
        { original: 'knavish', result: 'knavish' },
        { original: 'kneaded', result: 'knead' },
        { original: 'kneading', result: 'knead' },
        { original: 'knee', result: 'knee' },
        { original: 'kneel', result: 'kneel' },
        { original: 'kneeled', result: 'kneel' },
        { original: 'kneeling', result: 'kneel' },
        { original: 'kneels', result: 'kneel' },
        { original: 'knees', result: 'knee' },
        { original: 'knell', result: 'knell' },
        { original: 'knelt', result: 'knelt' },
        { original: 'knew', result: 'knew' },
        { original: 'knick', result: 'knick' },
        { original: 'knif', result: 'knif' },
        { original: 'knife', result: 'knife' },
        { original: 'knight', result: 'knight' },
        { original: 'knightly', result: 'knight' },
        { original: 'knights', result: 'knight' },
        { original: 'knit', result: 'knit' },
        { original: 'knits', result: 'knit' },
        { original: 'knitted', result: 'knit' },
        { original: 'knitting', result: 'knit' },
        { original: 'knives', result: 'knive' },
        { original: 'knob', result: 'knob' },
        { original: 'knobs', result: 'knob' },
        { original: 'knock', result: 'knock' },
        { original: 'knocked', result: 'knock' },
        { original: 'knocker', result: 'knocker' },
        { original: 'knockers', result: 'knocker' },
        { original: 'knocking', result: 'knock' },
        { original: 'knocks', result: 'knock' },
        { original: 'knopp', result: 'knopp' },
        { original: 'knot', result: 'knot' },
        { original: 'knots', result: 'knot' }
      ];

      list.forEach(function(pair) {
        var actual = csnlp.stem(pair.original);
        var expected = pair.result;

        expect(actual).to.be.equal(expected);
      });
    });

  });
});
