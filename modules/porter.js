/* Porter's Stemmer Algorithm for English
 * http://snowball.tartarus.org/algorithms/english/stemmer.html
 */
var VOWELS = 'aeiouy';
var DOUBLES = ['bb','dd','ff','gg','mm','nn','pp','rr','tt'];
var LI_ENDINGS = 'cdeghkmnrt';

var regionOne = 0;
var regionTwo = 0;

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

//Search for the longest among the suffixes
// ' 's 's'
//and removed if found
function step0(word) {
  return word.replace(/\'s\'|\'s|\'$/, '');
}

function step1a(word) {
  return word.replace(/sses$/, 'ss')
    .replace(/(.*?)(ied$|ies$)/,
      function(w) {
        if(w[0].length > 1) { return w[0] + 'i'; }
        return w[0] + 'ie';
      })
    .replace(/(\w*[aeiouy]\w+[aeiou])(s)|(\w*[aeiouy]\w+)(s)/, function(w) { return w.replace(/s$/, ''); })
    .replace(/us|ss/, function(w) { return w; }); //do nothing
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

  return step1a(step0(word));
}

module.exports.stem = function(word) {
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
