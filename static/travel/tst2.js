const fs = require('fs')

file = fs.readFileSync("/home/burak/Documents/repos/nomadicterrain/static/travdata/urla/hiking.gpx", 'utf8');

const re = /<trkseg>[^\0]*?<\/trkseg>/gm;
const arr = file.match(re);
console.log(arr.length);
//console.log(arr[0]);

const re2 = /trkpt lat="\d+\.\d+"\s+lon="\d+\.\d+"/mg;
const arr2 = arr[0].match(re2);
console.log(arr2.length);
//console.log(arr2);
res = []
arr2.forEach(function(x) {
    xx = x.replace('trkpt lat=','');
    xx = xx.replace('lon=','');
    xx = xx.replace(/"/g, '');
    xx = xx.split(' ');
    res.push([parseFloat(xx[0]), parseFloat(xx[1])]);
})
console.log(res);


