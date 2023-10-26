var math = require('../math.js');
const fs = require('fs')

var K = 3;

function replace_block(mat, block, new_val) {    
    console.log(block[0],block[1]);
    var k=0;
    var l=0;
    for (var i=block[0]*K; i<((block[0]+1)*K); i++) {
	for (var j=block[1]*K; j<((block[1]+1)*K); j++) {
	    mat[i][j] = new_val[k][l];
	    l = l + 1;
	}
	l = 0;
	k = k + 1;
    }
    
}

var m = math.zeros([K*3,K*2]);
var newm = [[1,2,3],[4,5,7],[8,9,10]];
replace_block(m, [0,1], newm);
console.log(m);

var latbeg = 40;
var latend = 42;
var lonbeg = 30;
var lonend = 31;

var k=0;
var l=0;

for (var i=latend;i>=latbeg;i--) {    
    for (var j=lonbeg;j<=lonend;j++) {
	console.log(i,j,k,l)
	l++;
    }
    l = 0;
    k++;
    console.log('------------');
}

var grid_tens_cache = {};

function in_tens(x) {
    return parseInt(parseInt(parseFloat(parseInt(x)) / 10)*10);
}

function get_tens_data(lat,lon) {
    var latd = in_tens(lat);
    var lond = in_tens(lon);
    d = [latd,lond];
    if (grid_tens_cache.hasOwnProperty(d) == false) {
	f = `/home/burak/Documents/repos/nomadicterrain/static/elev/data/out-${latd}-${lond}.json`;
	console.log('loading',d);
	console.log('loading',f);
	file = fs.readFileSync(f, 'utf8');
	tmp = JSON.parse(file);    
	grid_tens_cache[d] = tmp;
    }
    return grid_tens_cache[d];
}

res = get_tens_data(40.44,29.66);
console.log(res['40-29'].length);
res = get_tens_data(40.22,29.66);
console.log(res['40-29'].length);
res = get_tens_data(30.22,24.11);
console.log(res['30-24'].length);

