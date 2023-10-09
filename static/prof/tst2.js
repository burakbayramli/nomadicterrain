const fs = require('fs')

file = fs.readFileSync("chinese.json", 'utf8');
const chinese = JSON.parse(file);

console.log(chinese[10])

file = fs.readFileSync("spiller.json", 'utf8');
const spiller = JSON.parse(file);

console.log(spiller[10])

