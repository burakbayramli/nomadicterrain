const fs = require('fs')

file = fs.readFileSync("out2.json", 'utf8');
const res = JSON.parse(file);
elems = res['elements'];
elems.forEach(function (x) {
    console.log(x);
});
    
