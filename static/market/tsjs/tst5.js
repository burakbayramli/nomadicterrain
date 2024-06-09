
var m = require("../../math.js");

const H = m.matrix([[5, 3.5], [2.3, 1]]);

const res = m.eigs(H);

E = res.values;

V = res.vectors;

console.log(E);

console.log(V);


