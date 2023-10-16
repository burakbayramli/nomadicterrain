
function init()  {
    if(typeof lat === 'undefined') {
	document.getElementById("position").innerHTML = "<font color='red'>Position not set</font>";
    }
    
}

function getLocation() {
    if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(showPosition);
    }
}

function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    document.getElementById("position").innerHTML = lat + " " + lon;
}


function get_data(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url = url, false ); 
    xmlHttp.send( null );
    result = xmlHttp.responseText;
    return result;
}

function get_paths(gpx) {
    const re = /<trkseg>[^\0]*?<\/trkseg>/gm;
    const segments = gpx.match(re);
    all_res = [];
    segments.forEach(function(segment) {
	const re2 = /trkpt lat="\d+\.\d+"\s+lon="\d+\.\d+"/mg;
	segment = segment.match(re2);
	res = []
	segment.forEach(function(x) {
	    xx = x.replace('trkpt lat=','');
	    xx = xx.replace('lon=','');
	    xx = xx.replace(/"/g, '');
	    xx = xx.split(' ');
	    res.push([parseFloat(xx[0]), parseFloat(xx[1])]);
	});
	all_res.push(res);
    });
    
    return all_res;
}

function test1() {
    //url = "https://raw.githubusercontent.com/burakbayramli/kod/master/travel/urla/index.json";
    url = "http://localhost:5000/static/travdata/polonezkoy/index.json";
    res = JSON.parse(get_data(url));
    console.log(res['center']);
    console.log(res);
    map = L.map('map').setView([res['center'][0],res['center'][1]], 12);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: 'ddd'
    }).addTo(map);

    var m = L.marker([res['center'][0],res['center'][1]]).addTo(map);

    url = "http://localhost:5000/static/travdata/polonezkoy/cekmekoy-alemdag-orman-parkuru.gpx";
    paths = get_paths(get_data(url));
    console.log(paths.length);

    paths.forEach(function(path) {
	var line = new L.Polyline(path, {
	    color: 'red',
	    weight: 1,
	    opacity: 0.5,
	    smoothFactor: 1
	});
	line.addTo(map);
    });

    
}

