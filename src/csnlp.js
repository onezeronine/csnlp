(function () {

  var self = this;

  //Creating a safe reference to the csnlp object for use below
  var csnlp = function(obj) {
    if(obj instanceof csnlp) return obj;
    if(!(this instanceof csnlp)) return new csnlp(obj);
    this._wrapped = obj;
  };

  //Node.js support for backward compatibility
  if(typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = csnlp;
    }
    exports.csnlp = csnlp;
  }
  else {
    root.csnlp = csnlp;
  }

  //helper function to check if the character has a whitespace
  var isWhitespace = function(ch){
    return "\t\n\r\v ".indexOf(ch) != -1;
  };

  //CSNLP version
  csnlp.VERSION = '0.0.1 DEV';

  //Tokenization by whitespace
  csnlp.tokenizeWS = function (text) {
    var tokens = [],
        current = 0,
        getBegin = function(){
          var i = current;
          while(isWhitespace(text[i]) && i < text.length) ++i;
          return i;
        },
        getEnd = function(begin){
          var i = begin;
          while(!isWhitespace(text[i]) && i < text.length) ++i;
          return i - 1;
        };

    if(text && text.length > 0) {
      while(current < text.length) {
        var begin = getBegin(),
            end = getEnd(begin),
            word = text.substr(begin, end - begin + 1);

        if(word)
          tokens.push(word);

        current = end + 1;
      }
    }
    return tokens;
  }

  //Standard Treebank tokenizer
  //http://www.cis.upenn.edu/~treebank/tokenization.html
  //Ported from NLTK's treebank tokenizer
  csnlp.tokenizeTB = function (text) {
    var contractions2 = [
        /\b(can)(not)\b/gmi,
        /\b(d)('ye)\b/gmi,
        /\b(gim)(me)\b/gmi,
        /\b(gon)(na)\b/gmi,
        /\b(got)(ta)\b/gmi,
        /\b(lem)(me)\b/gmi,
        /\b(mor)('n)\b/gmi,
        /\b(wan)(na) /gmi
      ],
      contractions3 = [
        / ('t)(is)\b/,
        / ('t)(was)\b/
      ];

    if(!text) return [];
     
    //starting quotes
    text = text.replace(/^"/gm, " `` ");
    text = text.replace(/(``)/gm, " `` ");
    text = text.replace(/([ (\[{<])"/gm, function(item){return item[0]+' `` ';});

    //punctuations
    text = text.replace(/([:,])([^\d])/gm, function(item){return item[0]+' '+item[1];});
    text = text.replace(/\.\.\./gm, function(item){return ' ... ';})
    text = text.replace(/[;@#$%&]/gm, function(item){return ' '+item+' ';})
    text = text.replace(/([^\.])(\.)([\]\)}>"\']*)\s*$/gm,
      function(item){return item[0] + " " + item[1] + item[2];})
    text = text.replace(/[?!]/gm, function(item){return ' '+item+' '});
    text = text.replace(/([^'])' /gm, function(item){return item[0]+' '+item[1];});

    //parens, brackets, etc.
    text = text.replace(/[\]\[\(\)\{\}\>\<]/gm, function(item){return ' '+item+' '});
    text = text.replace(/--/gm, " -- ");

    text = ' ' + text + ' ';

    //ending quotes
    text = text.replace(/"/gm, " '' ");
    text = text.replace(/(\S)(\'\')/gm, function(item){ return item[0] + " ''"; });

    text = text.replace(/([^' ])('[sS]|'[mM]|'[dD]|') /gm,
      function(item){return item[0]+' '+item.substr(1, item.length)+' ';});
    text = text.replace(/([^' ])('ll|'LL|'re|'RE|'ve|'VE|n't|N'T) /gm,
      function(item){ return item[0]+' '+item.substr(1,item.length)+' '; });

    contractions2.forEach(function(e, i, arr){
      text = text.replace(e, function(item){return ' '+item[0]+' '+item.substr(1,item.length)+' ';});
    });
    contractions3.forEach(function(e, i, arr){
      text = text.replace(e, function(item){return ' '+item[0]+' '+item[1]+' ';});
    });

    return this.tokenizeWS(text);
  }


}.call(this));
