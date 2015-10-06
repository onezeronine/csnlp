## CSNLP - the clumsy NLP JS library!

CSNLP is a javascript library that provides common NLP features such as tokenization, stemming, computing distance among many others.

[![Build Status](https://travis-ci.org/onezeronine/csnlp.svg)](https://travis-ci.org/onezeronine/csnlp)

### Usage

```bash
npm install csnlp
```

Require using node.js

```js
var csnlp = require('csnlp')
```

### API Docs

* <b>Treebank Tokenizer</b> - Takes a string and tokenizes it using the set of rules found [here](https://www.cis.upenn.edu/~treebank/tokenization.html). Returns an array of strings.

```js
var tokens = csnlp.treebank(string);
```

* <b>Minimum Edit Distance</b> - Accepts two arrays or strings and measures the distance between the two. Returns an integer.

  The getEditDistance uses Damerau-Levenshtein Minimum Edit Distance algorithm by counting the number of the four operations: insertion, deletion, substitution and transposition.

```js
var distance = csnlp.minEditDistance('this', 'that');
```
