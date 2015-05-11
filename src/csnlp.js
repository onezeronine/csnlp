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
      if(isWS(item) && token.word.length > 0) {
        token.end = i - 1;
        token.begin = token.begin > 0 ? token.begin : token.end;
        tokens.push(token);
        token = { word: "", begin: 0, end: 0 };
      }
      else if(!isWS(item)){
        if(token.begin == 0 && token.word.length == 0) {
          token.begin = i;
        }
        token.word += item;
      }
    }
    //push if there token is end
    if(token.word.length != 0)
    {
      token.end = text.length - 1;
      tokens.push(token);
    }

    return tokens;
  };

  //Standard Treebank tokenizer
  //Ported from NLTK's treebank tokenizer
  csnlp.tokenizeTB = function (text) {
    var tokens = [];

    //starting quotes
    text = text.replace(/^"/gm, " `` ");
    text = text.replace(/(``)/gm, " `` ");
    text = text.replace(/([ (\[{<])"/gm, function(item){return item[0]+' `` ';});

    //punctuations
    text = text.replace(/([:,])([^\d])/gm, function(item){return item[0]+' '+item[1];});
    text = text.replace(/\.\.\./gm, function(item){return ' ... ';})
    text = text.replace(/[;@#$%&]/gm, function(item){return ' '+item+' ';})
    text = text.replace(/([^\.])(\.)([\]\)}>"\']*)\s*$/gm, function(item){return item[0] + " " + item[1] + item[2];})
    text = text.replace(/[?!]/gm, function(item){return ' '+item+' '});
    text = text.replace(/([^'])' /gm, function(item){return item[0]+' '+item[1];});

    //parens, brackets, etc.
    text = text.replace(/[\]\[\(\)\{\}\>\<]/, function(item){return ' '+item+' '});
    text = text.replace(/--/, " -- ");

    //ending quotes
    text = text.replace(/"/, " '' ");
    text = text.replace(/(\S)(\'\')/, function(item){ return item[0] + " ''"; });

    //text = text.replace()

    tokens = this.tokenizeWS(text);

    return tokens;
  }


}.call(this));
