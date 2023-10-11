
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

    res = get_data(dt);

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

    const birth_date = new Date("1973-04-24");
    res = get_data(birth_date);
    console.log(res);
    out = "";
    out += `<p>Spiller</p>`;
    out += `<p><a href="details/spiller/${res[0]}.html">${res[0]}</a></p>`;

    out += `<p>Chinese</p>`;
    out += `<p><a href="details/chinese/${res[1]}.html">${res[1]}</a></p>`;

    mil1 = String(res[2][0]) + String(res[2][1]);
    console.log(mil1);
    
    out += `<p>Lewi</p>`;
    for (var i=0;i<res[3].length;i++) {
	var lewi = res[3][i];
	out += `<a href="details/lewi/${lewi}.html">${lewi}</a>&nbsp;&nbsp;`;	
    }
    out += "</p>";

    out += `<p>Millman</p>`;
    out += `<p><a href="details/millman/${mil1}.html">${mil1}</a>&nbsp;&nbsp;`;

    for (var i=2;i<res[2].length;i++) {
	var mil2 = res[2][i];
	out += `<a href="details/millman/${mil2}.html">${mil2}</a>&nbsp;&nbsp;`;	
    }
    out += "</p>";

    out += "<p>Cycle</p>";
    var c = calculate_cycle(birth_date);
    out += `<p><a href="details/millman/nineyearcycle.html">${c}</a></p>`;
    
    document.getElementById("output").innerHTML = out;

    
}
