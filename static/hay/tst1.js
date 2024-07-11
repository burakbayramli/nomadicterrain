const fs = require('fs')

file = fs.readFileSync("hay.json", 'utf8');
const res = JSON.parse(file);

//var s = "Finger";
var s = "Arthritis";
s = s.toLowerCase();

//console.log(res['Aches']);

Object.keys(res).forEach(function(x) {
    if (x.toLowerCase().includes(s) || res[x].toLowerCase().includes(s) ) {
	console.log(x,res[x]);
	console.log('-----------------');
    }
});
