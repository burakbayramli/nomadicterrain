const fs = require('fs')

file = fs.readFileSync("/tmp/lewi.json", 'utf8');
const out = JSON.parse(file);

console.log(out['data'][1]);

