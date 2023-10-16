
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
    index = JSON.parse(get_data(url));
    console.log(index['center']);
    map = L.map('map').setView([index['center'][0],index['center'][1]], 12);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: 'ddd'
    }).addTo(map);

    var m = L.marker([index['center'][0],index['center'][1]]).addTo(map);

    Object.keys(index['points']).forEach(function(key) {
	var m = L.marker([index['points'][key][0], index['points'][key][1]]).addTo(map);
	m.bindPopup(key).openPopup();
    });
        
    url = "http://localhost:5000/static/travdata/polonezkoy/cekmekoy-alemdag-orman-parkuru.gpx";

    index['maps'].forEach(function(map) {
	mapurl = url.substring(0,url.lastIndexOf("/")+1) + map;
	console.log(mapurl);
	paths = get_paths(get_data(mapurl));
	paths.forEach(function(path) {
	    try {
		var line = new L.Polyline(path, {
		    color: 'red',
		    weight: 1,
		    opacity: 0.5,
		    smoothFactor: 1
		});
		line.addTo(map);
	    } catch (Exception) {
		console.log("error");
	    }
	});
	
    });
    
}

