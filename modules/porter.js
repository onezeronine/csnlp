/* Porter's Stemmer Algorithm for English
 * http://snowball.tartarus.org/algorithms/english/stemmer.html
 */
var VOWELS = 'aeiouy';
var DOUBLES = ['bb','dd','ff','gg','mm','nn','pp','rr','tt'];
var LI_ENDINGS = 'cdeghkmnrt';

var regionOne = 0;
var regionTwo = 0;
var debug = false;

/* jshint -W121 */
//Polyfill String.prototype.endsWith if not using ECMAScript 6 (2015)
if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(searchString, position) {
    var subjectString = this.toString();
    if (position === undefined || position > subjectString.length) {
      position = subjectString.length;
    }
    position -= searchString.length;
    var lastIndex = subjectString.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
  };
}

function isVowel(c) {
  return VOWELS.indexOf(c) >= 0;
}

/* R1 is the region after the first non-vowel following a vowel, or is the null
 * region at the end of the word if there is no such non-vowel.
 */
function r1(word) {
  var i = 0;
  if(word.length <= 0) { return 0; }
  while(!isVowel(word[i]) && i < word.length) { ++i; }
  while(isVowel(word[i]) && i < word.length) { ++i; }
  return i + 1;
}

/* R2 is the region after the first non-vowel following a vowel in R1, or is the
 * null region at the end of the word if there is no such non-vowel.
 */
function r2(word) {
  var i = r1(word);
  if(i >= word.length) { return i; }
  while(!isVowel(word[i]) && i < word.length) { ++i; }
  while(isVowel(word[i]) && i < word.length) { ++i; }
  return i + 1;
}

/* Define a short syllable in a word as either (a) a vowel followed by a non-vowel
 * other than w, x or Y and preceded by a non-vowel, or * (b) a vowel at the beginning
 * of the word followed by a non-vowel.

 * So rap, trap, entrap end with a short syllable, and ow, on, at are classed as
 * short syllables. But uproot, bestow, disturb do not end with a short syllable.
 *
 * A word is called short if it ends in a short syllable, and if R1 is null.
 *
 * So bed, shed and shred are short words, bead, embed, beds are not short words.
 */
function isShort(word) {
  var i = word.length;
  if(word.length <= 1) { return 0; }
  var cnda = i > 2 &&
    'bcdfghjklmnpqrstvz'.indexOf(word[i - 1]) >= 0 &&
    isVowel(word[i - 2]) &&
    !isVowel(word[i - 3]);
  var cndb = i === 2 &&
    isVowel(word[i - 2]) &&
    !isVowel(word[i - 1]);

  return (cnda || cndb) && r1(word) === word.length;
}

//Returns true if the last two letters of the word, ends with equal character
//otherwise false
function endsWithDouble(word) {
  var len = word.length;
  if(len >= 2) {
    return word[len - 1] === word[len - 2];
  }
  return false;
}

function takeLongestSuffix(conditions, word) {
  for(var i = 0; i < conditions.length; ++i) {
    if(conditions[i].pattern.test(word)) {
      return word.replace(conditions[i].pattern, conditions[i].action);
    }
  }
  return word;
}

function takeLongestSuffixAndR1(conditions, word) {
  for(var i = 0; i < conditions.length; ++i) {
    if(conditions[i].pattern.test(word)) {
      var region = word.substr(regionOne, word.length - regionOne);
      if(conditions[i].pattern.test(region)) {
        return word.replace(conditions[i].pattern, conditions[i].action);
      }
    }
  }
  return word;
}

function takeLongestSuffixAndR2(conditions, word) {
  for(var i = 0; i < conditions.length; ++i) {
    if(conditions[i].pattern.test(word)) {
      var region = word.substr(regionTwo, word.length - regionTwo);
      if(conditions[i].pattern.test(region)) {
        return word.replace(conditions[i].pattern, conditions[i].action);
      }
    }
  }
  return word;
}

//Search for the longest among the suffixes
// ' 's 's'
//and removed if found
function step0(word) {
  return word.replace(/\'s\'|\'s|\'$/, '');
}

//Search for the longest among the following suffixes, and perform the action indicated.
//sses      => replace by ss
//ied+ ies* => replace by i if preceded by more than one letter,
//             otherwise by ie (so ties -> tie, cries -> cri)
//s         => delete if the preceding word part contains a vowel not immediately before
//             the s (so gas and this retain the s, gaps and kiwis lose it)
//us+   ss  => do nothing
function step1a(word) {
  var conditions = [
    { pattern: /sses$/, action: 'ss' },
    { pattern: /(.*?)(ied$|ies$)/,
      action: function(w) {
        if(w[0].length > 1) { return w[0] + 'i'; }
        return w[0] + 'ie';
      }},
    { pattern: /us|ss/, action: function(w) { return w; } },
    { pattern: /(\w*[aeiouy]\w+[aeiou])(s)$|(\w*[aeiouy]\w+)(s)$/,
      action: function(w) {
        return w.replace(/s$/, '');
      }}
  ];
  return takeLongestSuffix(conditions, word);
}

//Search for the longest among the following suffixes, and perform the action indicated.
//eed eedly+          => replace by ee if in R1
//ed edly+ ing ingly+ => delete if the preceding word part contains a vowel, and after the deletion:
//                      if the word ends at, bl or iz add e (so luxuriat -> luxuriate), or
//                      if the word ends with a double remove the last letter (so hopp -> hop), or
//                      if the word is short, add e (so hop -> hope)
function step1b(word) {
  var c1 = /eed$|eedly$/;
  var c2 = /ed$|edly$|ing$|ingly$/;
  if(c1.test(word)) {
    var region = word.substr(regionOne, word.length - regionOne);
    if(c1.test(region)) {
      return word.replace(c1, 'ee');
    }
  }
  if(c2.test(word)) {
    var after = word.replace(c2, '');
    if(/[aeiouy]/.test(after)) {
      word = after;
      if(/at$|bl$|iz$/.test(word)) {
        return word + 'e';
      }
      if(endsWithDouble(word)) {
        return word.substr(0, word.length - 1);
      }
      if(isShort(word)) {
        return word + 'e';
      }
    }
  }
  return word;
}

//replace suffix y or Y by i if preceded by a non-vowel which is not the first
// letter of the word (so cry -> cri, by -> by, say -> say)
function step1c(word) {
  return word.replace(/.+[bcdfghjklmnpqrstvz][yY]$/, function(w) {
    return w.substr(0, w.length - 1) + 'i';
  });
}

function step2(word) {
  var conditions = [
    { pattern: /ization$/, action: 'ize' },
    { pattern: /tional$/, action: 'tion' },
    { pattern: /lessli$/, action: 'less' },
    { pattern: /entli$/, action: 'ent' },
    { pattern: /ational$|ation$|ator$/, action: 'ate' },
    { pattern: /alism$|aliti$|alli$/, action: 'al' },
    { pattern: /fulness$/, action: 'ful' },
    { pattern: /ousli$|ousness$/, action: 'ous' },
    { pattern: /iveness$|iviti$/, action: 'ive' },
    { pattern: /biliti$|bli$/, action: 'ble' },
    { pattern: /logi$/, action: 'log' },
    { pattern: /fulli$/, action: 'ful' },
    { pattern: /enci$/, action: 'ence' },
    { pattern: /anci$/, action: 'ance' },
    { pattern: /abli$/, action: 'able' },
    { pattern: /izer$/, action: 'ize' },
    { pattern: /(.)(li)$/,
      action: function(w) {
        if(w[0].indexOf(LI_ENDINGS) >= 0) {
          return w[0];
        }
        return w[0] + w[1];
      }
    },
  ];
  return takeLongestSuffixAndR1(conditions, word);
}

//Search for the longest among the following suffixes, and, if found and in R1, perform the action indicated.
//tional+           => replace by tion
//ational+          => replace by ate
//alize             => replace by al
//icate iciti ical  => replace by ic
//ful ness:         => delete
//ative*:           => delete if in R2
function step3(word) {
  var conditions = [
    { pattern: /ational$/, action: 'ate' },
    { pattern: /tional$/, action: 'tion' },
    { pattern: /alize$/, action: 'al' },
    { pattern: /icate$|iciti$|ical$/, ation: 'ic' },
    { pattern: /ful$|ness$/, action: '' },
    { pattern: /ative$/, action: function(item) {
      var region = word.substr(regionTwo, word.length - regionTwo);
      if(/ative$/.test(region)) {
        return '';
      }
      return item;
    }},
  ];
  return takeLongestSuffixAndR1(conditions, word);
}

//Search for the longest among the following suffixes, and, if found and in R2, perform the action indicated.
//al ance ence er ic able ible ant
//ement ment ent ism ate iti ous ive ize  => delete
//ion                                     => delete if preceded by s or t
function step4(word) {
  var conditions = [
    { pattern: /ement$/, action: '' },
    { pattern: /ment$/, action: '' },
    { pattern: /ance$/, action: '' },
    { pattern: /ence$/, action: '' },
    { pattern: /able$/, action: '' },
    { pattern: /ible$/, action: '' },
    { pattern: /ant$/, action: '' },
    { pattern: /ent$/, action: '' },
    { pattern: /ism$/, action: '' },
    { pattern: /ate$/, action: '' },
    { pattern: /iti$/, action: '' },
    { pattern: /ous$/, action: '' },
    { pattern: /ive$/, action: '' },
    { pattern: /ize$/, action: '' },
    { pattern: /al$/, action: '' },
    { pattern: /er$/, action: '' },
    { pattern: /ic$/, action: '' },
    { pattern: /[ts]ion$/,
      action: function(item) {
        return item[0];
      }
    },
  ];
  return takeLongestSuffixAndR2(conditions, word);
}

//Search for the the following suffixes, and, if found, perform the action indicated.
//e => delete if in R2, or in R1 and not preceded by a short syllable
//l => delete if in R2 and preceded by l
function step5(word) {
  var r1 = word.substr(regionOne, word.length - regionOne);
  var r2 = word.substr(regionTwo, word.length - regionTwo);
  if(word.length > 1) {
    var end = word[0];
    if(end === 'e') {
      if(/e$/.test(r1) && /e$/.test(r2)) {
        if(isShort(word)) {
          return word.replace(/e$/, '');
        }
      }
    } else if(end === 'l') {
      if(/ll$/.test(r2)) {
        return word.replace(/l$/, '');
      }
    }
  }
  return word;
}

function afterProcess(word) {
  return word.replace(/Y/g, 'y');
}

function doSteps(word) {
  //Remove initial ', if present
  word = word.replace(/^\'/, '');

  //Set initial y, or y after a vowel, to Y
  word = word
    .replace(/^y/, 'Y')
    .replace(/[aeiouy]y/, function(item) { return item[0] + 'Y'; });

  //Establish regions
  regionOne = r1(word);
  regionTwo = r2(word);

  var result = step5(step4(step3(step2(
    step1c(step1b(step1a(step0(word))))
  ))));

  return afterProcess(result);
}

module.exports.stem = function(word, options) {
  options = options || {};
  debug = options.debug || false;
  if(!word) { return null; }
  if(typeof word === 'string' || word instanceof String) {
    //If the word has two letters or less, leave it as it is.
    if(word.length <= 2) {
      return word;
    }
    return doSteps(word);
  } else {
    return null;
  }
};
