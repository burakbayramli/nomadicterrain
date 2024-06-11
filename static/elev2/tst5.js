
var lat = 37;
var lon = 20;
var radius = 10;
var S = 20;

var xmin = lon - (radius / S);
var xmax = lon + (radius / S);
var ymin = lat - (radius / S);
var ymax = lat + (radius / S);

console.log(xmin,xmax,ymin,ymax);

var M = 20;
var XWIN = (xmax-xmin) / M;
var YWIN = (ymax-ymin) / M;

for (var i=xmin; i<xmax; i+=XWIN) {
    for (var j=ymin; i<ymax; i+=XWIN) {
	console.log(i,j);
    }
}
