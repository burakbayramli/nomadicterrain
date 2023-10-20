
//var ts = require("./timeseries.js");

//input = [1.09,1.05,0.94,0.77,1.09,1.21,0.83];

//console.log(ts.cumprod(input));

const fs = require('fs')

file = fs.readFileSync("fredout.csv", 'utf8');

//console.log(file);

function parse_fred(file) {
    lines = file.split('\n');
    res = [];
    for (var i=0;i<lines.length;i++) {
	tokens = lines[i].split(',');
	res.push(tokens[0],parseFloat(tokens[1]));
    }

    return res;
}

r = parse_fred(file);
console.log(r);

