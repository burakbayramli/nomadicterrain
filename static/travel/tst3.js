const fs = require('fs')

function get_paths(gpx) {
    const re = /<trkseg>[^\0]*?<\/trkseg>/gm;
    const segments = file.match(re);
    all_res = [];
    segments.forEach(function(segment) {
	const re2 = /trkpt lat="\d+\.\d+"\s+lon="\d+\.\d+"/mg;
	segment = segment.match(re2);
	res = []
	segment.forEach(function(x) {
	    xx = x.replace('trkpt lat=','');
	    xx = xx.replace('lon=','');
	    xx = xx.replace(/"/g, '');
	    xx = xx.split(' ');
	    res.push([parseFloat(xx[0]), parseFloat(xx[1])]);
	});
	all_res.push(res);
    });
    
    return all_res;
}

file = fs.readFileSync("/home/burak/Documents/repos/nomadicterrain/static/travdata/urla/hiking.gpx", 'utf8');

r = get_paths(file);

console.log(r.length);

console.log(r[0].length);
console.log(r[1].length);


