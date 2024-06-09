var pa = require("./portfolio_analytics.dist.js");

a = [100,120,125,110,105,105,105,105,100,100,100,110,120,130,140]; 

var res = pa.maxDrawdown(a);

console.log(res);

var res = pa.topDrawdowns(a,2);

console.log(res);

