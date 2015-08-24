(function() {
  var self = this;

  //Creating a safe reference to the csnlp object for use below
  var csnlp = function(obj) {
    if (obj instanceof csnlp) {
      return obj;
    }

    if (!(this instanceof csnlp)) {
      return new csnlp(obj);
    }

    this._wrapped = obj;
  };

  //Node.js support for backward compatibility
  if (typeof exports !== 'undefined') {
    if(typeof module !== 'undefined' && module.exports) {
      exports = module.exports = csnlp;
    }
    exports.csnlp = csnlp;
  } else {
    root.csnlp = csnlp;
  }

  //CSNLP version
  csnlp.VERSION = '0.0.3';

  //helper function to check if the character has a whitespace
  csnlp._isWhitespace = function(ch) {
    return '\t\n\r\v '.indexOf(ch) !== -1;
  };

  //endsWith function
  csnlp._endsWith = function(word, term) {
    if (typeof(word) === 'string') {
      if (term.length > word.length) {
        return false;
      }
      return word.substring(word.length - term.length) === term;
    }
    return false;
  };

  //Checks if the character is a vowel or not
  csnlp._isVowel = function(c, i) {
    c = c.length > 1 || i > 1 ? c[i] : c;
    return 'aeiouAEIOU'.indexOf(c) >= 0;
  };

  //Checks if there is at least one vowel in the word
  csnlp._hasVowel = function(word) {
    if (word && word.length > 0) {
      if (csnlp._isVowel(word[0])) {
        return true;
      } else {
        var term = word.substring(1, word.length);
        return csnlp._hasVowel(term);
      }
    }
    return false;
  };

  //Tokenization by whitespace
  csnlp.tokenizeWS = function(text) {
    var tokens = [];
    var current = 0;
    var getBegin = function() {
      var i = current;
      while (csnlp._isWhitespace(text[i]) && i < text.length) { ++i; }
      return i;
    };
    var getEnd = function(begin) {
      var i = begin;
      while(!csnlp._isWhitespace(text[i]) && i < text.length) { ++i; }
      return i - 1;
    };

    if(text && text.length > 0) {
      while(current < text.length) {
        var begin = getBegin();
        var end = getEnd(begin);
        var word = text.substr(begin, end - begin + 1);
        if(word) {
          tokens.push(word);
        }
        current = end + 1;
      }
    }
    return tokens;
  };

  //Standard Treebank tokenizer
  //http://www.cis.upenn.edu/~treebank/tokenization.html
  //Ported from NLTK's treebank tokenizer
  csnlp.tokenizeTB = function(text) {
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

    return this.tokenizeWS(text);
  };

  csnlp._initDistance = function(distance, x, y) {
    for(var i = 0; i < x; ++i) {
      distance.push([]);
      for(var j = 0; j < y; ++j) {
        distance[i].push(0);
      }
    }

    for(var k = 0; k < x; ++k) {
      distance[k][0] = k;
    }

    for(var l = 0; l < y; ++l) {
      distance[0][l] = l;
    }
  };

  //Damerau-Levenshtein Minimum Edit Distance
  //includes transposition in its operations
  csnlp.getEditDistance = function(first, second) {
    if (first.length === 1 || second.length === 0) {
      return -1;
    }
    var x = first.length + 1;
    var y = second.length + 1;
    var distance = [];

    this._initDistance(distance, x, y);

    var cost = 0;
    for(var i = 1; i < x; ++i) {
      for(var j = 1; j < y; ++j) {
        if(first[i] === second[j]) {
          cost = 0;
        } else {
          cost = 1;
        }
        var delCost = distance[i - 1][j] + 1;
        var insCost = distance[i][j - 1] + 1;
        var trpCost = distance[i - 1][j - 1] + (first[i - 1] !== second[j - 1] ? 2 : 0);

        distance[i][j] = Math.min(delCost, insCost, trpCost);

        if(i > 1 && j > 1 && first[i] === second[j - 1] && first[i - 1] === second[j]) {
          distance[i][j] = Math.min(distance[i][j], distance[i - 2][j - 2] + cost);
        }
      }
    }
    return distance[first.length - 1][second.length - 1];
  };

  //Porter's stemmer algorithm
  //returns a stem from a string
  csnlp.stem = function(word, options) {
    var vowel = 'aeiouy';
    var double = ['bb','dd','ff','gg','mm','nn','pp','rr','tt'];
    var validLiEnding = 'cdeghkmnrt';
  };

  csnlp.naiveBayes = function(data, options) {

  };

}.call(this));
