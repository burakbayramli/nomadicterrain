const fs = require('fs')

const path1 = '/home/burak/Documents/repos/nomadicterrain/static/recom/cluster_members_3.json'

const path2 = '/home/burak/Documents/repos/nomadicterrain/static/recom/movie_id_int_rev.json'

file = fs.readFileSync(path1, 'utf8');
const cluster_ids = JSON.parse(file);

file = fs.readFileSync(path2, 'utf8');
const movie_id_int_rev = JSON.parse(file);

cluster_ids.forEach(function(key) {
    console.log(movie_id_int_rev[key])
})
