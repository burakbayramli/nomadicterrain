
var grid_tens = {};

function cache_tens(d) {
    const fs = require('fs')
    var latd = d[0]; var lond = d[1];
    if (grid_tens.hasOwnProperty(d) == false) {
	f = `/home/burak/Documents/repos/nomadicterrain/static/elev/data/out-${latd}-${lond}.json`;	
	console.log('loading',d);
	console.log('loading',f);
	file = fs.readFileSync(f, 'utf8');
	tmp = JSON.parse(file);    
	grid_tens[d] = tmp;
    }
}

function in_tens(x) {
    return parseInt(parseInt(parseFloat(parseInt(x)) / 10)*10);
}

function get_elev_grid_data(latmin,latmax,lonmin,lonmax) {

    d = [in_tens(latmin),in_tens(lonmin)];
    console.log(d);
    cache_tens(d);
    d = [in_tens(latmin),in_tens(lonmax)];
    console.log(d);
    cache_tens(d);
    d = [in_tens(latmax),in_tens(lonmin)];
    console.log(d);
    cache_tens(d);
    d = [in_tens(latmax),in_tens(lonmax)];
    console.log(d);
    cache_tens(d);
    
}

var lat=40.3;
var lon=29.1;
var S = 20.0;
var radius = 10.0;
var latmin = lat - (radius / S);
var latmax = lat + (radius / S);
var lonmin = lon - (radius / S);
var lonmax = lon + (radius / S);
console.log(latmin,latmax,lonmin,lonmax);
res =  get_elev_grid_data(latmin,latmax,lonmin,lonmax);
//console.log(res);

