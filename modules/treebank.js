//Standard Treebank tokenizer
//http://www.cis.upenn.edu/~treebank/tokenization.html
//Ported from NLTK's treebank tokenizer
module.exports = function(text) {
  var contractions2 = [
      /\b(can)(not)\b/gmi,
      /\b(d)('ye)\b/gmi,
      /\b(gim)(me)\b/gmi,
      /\b(gon)(na)\b/gmi,
      /\b(got)(ta)\b/gmi,
      /\b(lem)(me)\b/gmi,
      /\b(mor)('n)\b/gmi,
      /\b(wan)(na) /gmi
    ];
  var contractions3 = [
      / ('t)(is)\b/,
      / ('t)(was)\b/
    ];

  if(!text) {
    return [];
  }

  //starting quotes
  text = text.replace(/^'/gm, ' `` ');
  text = text.replace(/(``)/gm, ' `` ');
  text = text.replace(/([ (\[{<])'/gm,
    function(item) { return item[0] + ' `` '; });

  //punctuations
  text = text.replace(/([:,])([^\d])/gm,
    function(item) { return item[0] + ' ' + item[1]; });
  text = text.replace(/\.\.\./gm,
    function(item) { return ' ... '; });
  text = text.replace(/[;@#$%&]/gm,
    function(item) { return ' ' + item + ' '; });
  text = text.replace(/([^\.])(\.)([\]\)}>'\']*)\s*$/gm,
    function(item) { return item[0] + ' ' + item[1] + item[2]; });
  text = text.replace(/[?!]/gm,
    function(item) { return ' ' + item + ' '; });
  text = text.replace(/([^'])' /gm,
    function(item) { return item[0] + ' ' + item[1]; });

  //parens, brackets, etc.
  text = text.replace(/[\]\[\(\)\{\}><]/gm,
    function(item) { return ' ' + item + ' '; });
  text = text.replace(/--/gm, ' -- ');

  text = ' ' + text + ' ';

  //ending quotes
  text = text.replace(/'/gm, ' \'\' ');
  text = text.replace(/(\S)(\'\')/gm,
    function(item) { return item[0] + ' \'\''; });

  text = text.replace(/([^' ])('[sS]|'[mM]|'[dD]|') /gm,
    function(item) { return item[0] + ' ' + item.substr(1, item.length) + ' '; });
  text = text.replace(/([^' ])('ll|'LL|'re|'RE|'ve|'VE|n't|N'T) /gm,
    function(item) { return item[0] + ' ' + item.substr(1, item.length) + ' '; });

  contractions2.forEach(function(e, i, arr) {
    text = text.replace(e,
      function(item) { return ' ' + item[0] + ' ' + item.substr(1, item.length) + ' '; });
  });
  contractions3.forEach(function(e, i, arr) {
    text = text.replace(e,
      function(item) { return ' ' + item[0] + ' ' + item[1] + ' '; });
  });

  return text.split(' ');
};
