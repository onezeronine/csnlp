var treebank = require('./modules/treebank');
var minEditDistance = require('./modules/minEditDistance');

var Csnlp = function() {
  this.version = '0.0.3';
};

Csnlp.prototype = {
  treebank: function(text, options) {
    options = options || {};
    return treebank(text);
  },
  minEditDistance: function(first, second, options) {
    options = options || {};
    return minEditDistance(first, second);
  }
};

module.exports = new Csnlp();
