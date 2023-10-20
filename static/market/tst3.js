
var pa = require("./portfolio_analytics.dist.js");

res = pa.sharpeRatio([100, 110, 105, 107.5, 115], [100, 100, 100, 100, 100]);
console.log(res);

