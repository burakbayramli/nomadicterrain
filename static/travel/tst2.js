const fs = require('fs')

file = fs.readFileSync("/home/burak/Documents/repos/nomadicterrain/static/travdata/urla/hiking.gpx", 'utf8');

const re = /<trkseg>[^\0]*?<\/trkseg>/gm;
const arr = file.match(re);
console.log(arr.length);
console.log(arr[0]);
