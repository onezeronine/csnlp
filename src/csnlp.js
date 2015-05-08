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

  csnlp.VERSION = '0.0.1';

  //Tokenization by whitespace
  csnlp.tokenizeWS = function (text) {
    var tokens = [],
        token = "";

    for(var i = 0; i < text.length; ++i){
      var item = text[i];
      if(isWS(item)){
        tokens.push(token);
        token = "";
      }
      else {
        token += item;
      }
    }
    return tokens;
  };

  csnlp.tokenizeEN = function (text) {
    var tokens = [],
        token = "";
    for(var i = 0; i < text.length; ++i){
      var item = text[i];
      if(isWs(item)){
        tokens.push(token);
        token = "";
      }
      //todo: add conditions
      else {

        token += item;
      }
    }
    return tokens;
  }


}.call(this));
