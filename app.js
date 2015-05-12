var csnlp = require('./src/csnlp');
var text1 = "and he says\r" +
  "\"what are you doing here, boy?\" \"I'm here to cook a meal.\"\r" +
  "12,45&36\r" +
  "12...\r12:45 PM" +
  "'' abc def>sadas\rdon't do it's";

var text2 = "the quick brown fox jumps over the lazy dog";
var text3 = "i saw you there";
var tokens = csnlp.tokenizeTB("i");
console.log(tokens);
