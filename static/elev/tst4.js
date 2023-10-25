var math = require('../math.js');

var K = 3;

function replace_block(mat, block, new_val) {    
    console.log(block[0],block[1]);
    var k=0
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

//var m = math.zeros([K*3,K*2]);
//var newm = [[1,2,3],[4,5,7],[8,9,10]];
//replace_block(m, [0,1], newm);
//console.log(m);

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
