const fs = require('fs')

file = fs.readFileSync("data-19000101.json", 'utf8');
const data = JSON.parse(file);

function get_millman(birth_date) {
    const dt1 = new Date("1900-01-01");

    diff = birth_date.getTime() - dt1.getTime();

    step = diff / (1000*60*60*24);

    return data[step];
}

function calculate_cycle(birth_date) {

    res = get_millman(birth_date)
    console.log(res);
    var now_year = String(new Date().getFullYear());

    mon = String(birth_date.getMonth()+1);

    if (mon.length == 1) { mon = "0" + mon; }

    day = String(birth_date.getDate());

    if (day.length == 1) { day = "0" + day; }

    console.log(now_year + "-" + mon + "-" + day);

    dt = new Date(now_year + "-" + mon + "-" + day)

    console.log(dt);

    res = get_millman(dt);

    res = String(res[2][0]);
        
    total = 0;
    if (res.length == 2) {
	total = parseInt(res[0]) + parseInt(res[1]);
    } else {
	total = parseInt(res[0]);
    }

    console.log(total);
}
    
const birth_date = new Date("1973-04-24");
calculate_cycle(birth_date);

