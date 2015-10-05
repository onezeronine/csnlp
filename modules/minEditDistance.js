//Damerau-Levenshtein Minimum Edit Distance
//includes transposition in its operations
module.exports = function(first, second) {
  if (first.length === 1 || second.length === 0) {
    return -1;
  }
  var x = first.length + 1;
  var y = second.length + 1;
  var distance = [];

  initDistance(distance, x, y);

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

function initDistance(distance, x, y) {
  for(var i = 0; i < x; ++i) {
    distance.push([]);
    for(var j = 0; j < y; ++j) {
      if(j === 0) {
        distance[i].push(i);
      } else if(i === 0) {
        distance[i].push(j);
      } else {
        distance[i].push(0);
      }
    }
  }
}
