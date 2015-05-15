var csnlp = require('./src/csnlp');
var distance = csnlp.minEditDistance('abc', 'ac');
console.log(distance);
