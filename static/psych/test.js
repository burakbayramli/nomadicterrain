const fs = require('fs')

file = fs.readFileSync("test2.json", 'utf8');
const out = JSON.parse(file);

console.log(out);
console.log(out[1]);

