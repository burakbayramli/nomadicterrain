const fs = require('fs')

const path1 = '/home/burak/Documents/repos/nomadicterrain/static/recom/cluster_members_3.json'

const path2 = '/home/burak/Documents/repos/nomadicterrain/static/recom/movie_id_int_rev.json'

const path3 = 'picks1.json'

file = fs.readFileSync(path3, 'utf8');
picks = JSON.parse(file);

file = fs.readFileSync(path1, 'utf8');
const cluster_ids = JSON.parse(file);

file = fs.readFileSync(path2, 'utf8');
const movie_id_int_rev = JSON.parse(file);

console.log(picks);

function cyrb128(str) {
    let h1 = 1779033703, h2 = 3144134277,
        h3 = 1013904242, h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
        k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    h1 ^= (h2 ^ h3 ^ h4), h2 ^= h1, h3 ^= h1, h4 ^= h1;
    return [h1>>>0, h2>>>0, h3>>>0, h4>>>0];
}

function sfc32(a, b, c, d) {
    return function() {
      a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0; 
      var t = (a + b) | 0;
      a = b ^ b >>> 9;
      b = c + (c << 3) | 0;
      c = (c << 21 | c >>> 11);
      d = d + 1 | 0;
      t = t + d | 0;
      c = c + t | 0;
      return (t >>> 0) / 4294967296;
    }
}

// Sample with replacement from list, N many items, seed can be
// any string
function sample_wr(sample_from, seed, N) {
    var bucket = [];
    for (var i=0;i<=sample_from.length;i++) {
	bucket.push(i);
    }
    var seed = cyrb128(seed);
    var rand = sfc32(seed[0], seed[1], seed[2], seed[3]);
    var res = [];
    for (var i=0;i<N;i++){
	var randomIndex = Math.floor(rand()*bucket.length);
	idx = bucket.splice(randomIndex, 1)[0];
	res.push(sample_from[idx]);
    }
    return res;
}

console.log(sample_wr(cluster_ids,"asdfasdf",10));
