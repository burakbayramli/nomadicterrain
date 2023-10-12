const fs = require('fs')

file = fs.readFileSync("tst2.json", 'utf8');
const res = JSON.parse(file);
elems = res['elements'];
elems.forEach(function (x) {
    //console.log(x['tags']['name']);
    console.log(x['lat'],x['lon'],x['tags']['name']);
});
    
