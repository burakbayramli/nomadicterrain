const fs = require('fs')

file = fs.readFileSync("data-19000101.json", 'utf8');
const data = JSON.parse(file);

function get_millman(birth_date) {
    const dt1 = new Date("1900-01-01");

    diff = birth_date.getTime() - dt1.getTime();

    step = diff / (1000*60*60*24);

    return data[step];
}


const birth_date = new Date("1973-04-24");

res = get_millman(birth_date)

console.log(res);

var now_year = new Date().getFullYear();

console.log(now_year);

mon = String(birth_date.getMonth()+1);

if (mon.length == 1) { mon = "0" + mon; }

console.log(mon);

console.log(birth_date.getDate());


