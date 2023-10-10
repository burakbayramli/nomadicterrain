const fs = require('fs')

file = fs.readFileSync("/tmp/out-19000101.json", 'utf8');
const data = JSON.parse(file);

console.log(data[1])

