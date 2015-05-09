///For debugging purposes only
var csnlp = require('./src/csnlp')

var text =
  "the quick brown fox jumps over the lazy dog";
var tokens = csnlp.tokenizeWS(text);

console.log(tokens);
