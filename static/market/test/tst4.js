
var pa = require("./portfolio_analytics.dist.js");

var m = require("../../math.js");

a = [100,110,110]; // 20%

b = [200,240,240]; // 40%

a  = m.divide(a,a[0]);

b  = m.divide(b,b[0]);

portfolio = m.divide(m.add(a,b),2);

console.log(a);

console.log(b);

console.log(portfolio);

res = pa.cumulativeReturn(portfolio);

console.log(res);

const e = m.matrix([[5, 6], [5, 6]]);

const f = m.matrix([[10, 20], [10, 20]]);

console.log(m.add(e,f));

const x = m.matrix([[11, 12], [13, 14]]);

console.log(m.eigs(x));

