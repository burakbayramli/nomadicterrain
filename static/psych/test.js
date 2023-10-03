const fs = require('fs')

file = fs.readFileSync("lewi.json", 'utf8');
const out = JSON.parse(file);

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

const res = new Date(2022, 4-1, 30+1);
console.log(res);

dt = String(out['first']);
console.log(dt.substr(0,4));
console.log(dt.substr(4,2));
console.log(dt.substr(6,2));

const dt1 = new Date(parseInt(dt.substr(0,4)),
		    parseInt(dt.substr(4,2))-1,
		    parseInt(dt.substr(6,2))+1);

dt2 = dt1.addDays(20);

diff = dt2.getTime() - dt1.getTime();

step = diff / (1000*60*60*24);

console.log(step);

console.log(out['data'][step]);

const dt3 = new Date(1880,1-1,5+1);

diff = dt3.getTime() - dt1.getTime();

step = diff / (1000*60*60*24);

console.log(out['data'][step]);

