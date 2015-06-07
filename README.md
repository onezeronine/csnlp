## CSNLP - the clumsy NLP JS library!

CSNLP is a javascript library that provides common NLP features such as tokenization, stemming, computing distance and many others.

### Usage

```bash
npm install csnlp
```

Require using node.js

```js
var csnlp = require('csnlp')
```

### API Docs

* <b>Whitespace Tokenizer</b> - Takes a string and tokenizes it by whitespace. Returns an array of strings.

```js
var tokens = csnlp.tokenizeWS(string);
```

* <b>Treebank Tokenizer</b> - Takes a string and tokenizes it using the set of rules found [here](https://www.cis.upenn.edu/~treebank/tokenization.html). Returns an array of strings.

```js
var tokens = csnlp.tokenizeTB(string);
```

* <b>Minimum Edit Distance</b> - Accepts two arrays or strings and measures teh distance betwee the two. Uses Levenshtein's algorithm by default. To override, use 'damlev' for Damerau-Levenshtein algorithm or 'lev' for Levenshtein algorithm. Returns an integer.

```js
var distance = csnlp.minEditDistance(a, b, algo);
```
