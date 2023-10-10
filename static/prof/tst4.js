const fs = require('fs')

file = fs.readFileSync("data-19000101.json", 'utf8');
const data = JSON.parse(file);

const dt1 = new Date("1900-01-01");

const dt2 = new Date("1900-01-03");
//const dt2 = new Date("1973-04-24");

diff = dt2.getTime() - dt1.getTime();

step = diff / (1000*60*60*24);

console.log(data[step]);

