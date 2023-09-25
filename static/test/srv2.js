const fs = require('fs')

const path1 = '/home/burak/Documents/repos/nomadicterrain/static/recom/means.json'
const path2 = 'picks1.json'
const path3 = '/home/burak/Documents/repos/nomadicterrain/static/recom/movie_title_int.json'

fs.readFile(path1, 'utf8', (err, file) => {
    const means = JSON.parse(file)
    console.log(means['0'][10])
})

fs.readFile(path2, 'utf8', (err, file) => {
    const picks = JSON.parse(file)
    console.log(picks)
})

fs.readFile(path3, 'utf8', (err, file) => {
    const title_id = JSON.parse(file)
    console.log(title_id['Swordfish (2001)'])
})

K = 5
dist = [];
dist.push(33);
dist.push(11);
console.log(dist);
//for (let i = 0; i < l1.length; i++) {
//  text += l1[i] + "<br>";
//}

