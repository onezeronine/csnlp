## CSNLP - the clumsy NLP JS library!

CSNLP is a javascript library that provides common NLP features such as tokenization, stemming, computing distance and many others.

### Usage

For node.js

<code>var csnlp = require('csnlp')</code>

### API Docs

1. <b>Whitespace Tokenizer</b> - tokenizes the string by whitespace

  <code>csnlp.tokenizeWS(string)</code>

2. <b>Treebank Tokenizer</b> - tokenizes the string using the set of rules found [here](https://www.cis.upenn.edu/~treebank/tokenization.html)

  <code>csnlp.tokenizeTB(string)</code>

3. <b>Minimum Edit Distance</b> - Uses Levenshtein by default. Use <code>'damlev'</code> for the third parameter to use Damerau-Levenshtein algorithm

  <code>csnlp.minEditDistance(a, b, algo)</code>
