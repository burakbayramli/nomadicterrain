
function fetch_data() {

    url = "/static/prof/data-19000101.json";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url = url, false ); 
    xmlHttp.send( null );
    return JSON.parse(xmlHttp.responseText);
}


function get_data(birth_date) {

    data = fetch_data();
    
    const dt1 = new Date("1900-01-01");

    diff = birth_date.getTime() - dt1.getTime();

    step = diff / (1000*60*60*24);

    return data[step];
}

function calculate_cycle(birth_date) {

    res = get_data(birth_date)

    var now_year = String(new Date().getFullYear());

    mon = String(birth_date.getMonth()+1);

    if (mon.length == 1) { mon = "0" + mon; }

    day = String(birth_date.getDate());

    if (day.length == 1) { day = "0" + day; }

    dt = new Date(now_year + "-" + mon + "-" + day)

    res = get_millman(dt);

    res = String(res[2][0]);
        
    total = 0;
    if (res.length == 2) {
	total = parseInt(res[0]) + parseInt(res[1]);
    } else {
	total = parseInt(res[0]);
    }
    if (total > 9) {
	res = String(total);
	total = parseInt(res[0]) + parseInt(res[1]) 
    }

    return total;
}

function init() {

    const birth_date = new Date("1945-10-05");
    res = get_data(birth_date);
    console.log(res); 
}
