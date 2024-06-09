
var pa = require("./portfolio_analytics.dist.js");

var m = require("../../math.js");

res = pa.sharpeRatio([100, 110, 105, 107.5, 115],
		     [100, 100, 100, 100, 100]);
console.log(res);

console.log(m.subtract([2, 3, 4], 5));

console.log(m.add([2, 3, 4], [4,5,4]));

console.log(m.divide([2, 3, 4], 2));

