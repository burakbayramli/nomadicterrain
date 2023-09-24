const fs = require('fs')


const path = '/home/burak/Documents/repos/nomadicterrain/static/recom/means.json'

fs.readFile(path, 'utf8', (err, file) => {
    const data = JSON.parse(file)
    console.log(data['0'][10])
})

