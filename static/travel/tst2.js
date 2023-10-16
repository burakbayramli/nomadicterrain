const fs = require('fs')

file = fs.readFileSync("/home/burak/Documents/repos/nomadicterrain/static/travdata/urla/hiking.gpx", 'utf8');

const re = /<trkseg>[^\0]*?<\/trkseg>/gm;
const segments = file.match(re);
console.log(segments.length);
segments.forEach(function(segment) {
    const re2 = /trkpt lat="\d+\.\d+"\s+lon="\d+\.\d+"/mg;
    segment = segment.match(re2);
    console.log(segment.length);
    res = []
    segment.forEach(function(x) {
	xx = x.replace('trkpt lat=','');
	xx = xx.replace('lon=','');
	xx = xx.replace(/"/g, '');
	xx = xx.split(' ');
	res.push([parseFloat(xx[0]), parseFloat(xx[1])]);
    })
    console.log(res.length);
})




