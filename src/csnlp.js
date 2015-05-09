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
  var isWS = function(ch){
    return "\t\n\r\v ".indexOf(ch) != -1;
  };

  //CSNLP version
  csnlp.VERSION = '0.0.1';

  //Tokenization by whitespace
  csnlp.tokenizeWS = function (text) {
    var tokens = [],
        token = { word: "", begin: 0, end: 0 };

    for(var i = 0; i < text.length; ++i) {
      var item = text[i];
      if(isWS(item)) {
        token.end = i - 1;
        tokens.push(token);
        token = { word: "", begin: 0, end: 0 };
      }
      else {
        if(token.begin == 0 && token.word.length == 0) {
          token.begin = i;
        }
        token.word += item;
      }
    }

    if(token.word.length != 0)
    {
      token.end = text.length - 1;
      tokens.push(token);
    }

    return tokens;
  };

  //Standard Treebank tokenizer
  csnlp.tokenizeTB = function (text) {
    var tokens = [],
        token = { word: "", begin: 0, end: 0 };

    for(var i = 0; i < text.length; ++i) {
      var item = text[i];
      if(isWS(item)) {
        token.end = i - 1;
        tokens.push(token);
        token = { word: "", begin: 0, end: 0 };
      }
      else {
        if(token.begin == 0 && token.word.length == 0) {
          token.begin = i;
        }
        token.word += item;
      }
    }

    if(token.word.length != 0)
    {
      token.end = text.length - 1;
      tokens.push(token);
    }

    return tokens;
  }


}.call(this));
