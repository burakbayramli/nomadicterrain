const fs = require('fs')

const path1 = '/home/burak/Documents/repos/nomadicterrain/static/recom/means.json'
const path2 = 'picks1.json'
const path3 = '/home/burak/Documents/repos/nomadicterrain/static/recom/movie_title_int.json'


file = fs.readFileSync(path1, 'utf8');
const means = JSON.parse(file);

file = fs.readFileSync(path3, 'utf8');
const title_id = JSON.parse(file);

file = fs.readFileSync(path2, 'utf8');
picks = JSON.parse(file);
console.log(picks)

//title_id['Swordfish (2001)'];
//console.log(means['0'][10]);

function closest_cluster(picks, means) {
    K = Object.keys(means).length;
    dist = [];
    for (let i = 0; i < K; i++) {
	dist_k = 0;
	Object.keys(picks).forEach(function(key) {
	    dist_k += (picks[key] - means[i][title_id[key]])**2;
	})
	dist.push(Math.sqrt(dist_k));
    }

    const index = dist.indexOf(Math.min(...dist))
    //console.log(dist);
    return index;
}

res = closest_cluster(picks, means);
console.log(res);

