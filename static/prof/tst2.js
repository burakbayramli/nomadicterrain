const fs = require('fs')

file = fs.readFileSync("chinese.json", 'utf8');
//file = fs.readFileSync("tst2.json", 'utf8');
const chinese = JSON.parse(file);

console.log(chinese[10])

