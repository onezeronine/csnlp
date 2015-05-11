var csnlp = require('./src/csnlp');
var text = "and he says\r" +
  "\"what are you doing here, boy?\" \"I'm here to cook a meal.\"\r" +
  "12,45&36\r" +
  "12...\r" +
  "'' abc def>sadas";

console.log(csnlp.tokenizeWS(text));
