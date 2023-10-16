
function get_data(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url = url, false ); 
    xmlHttp.send( null );
    result = xmlHttp.responseText;
    return result;
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
    mainurl = "http://localhost:5000/static/travdata/polonezkoy/index.json";
    main = JSON.parse(get_data(mainurl));

    map = L.map('map').setView([main['center'][0],main['center'][1]], 10);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: 'OSM'
    }).addTo(map);

    var m = L.marker([main['center'][0],main['center'][1]]).addTo(map);
    
    Object.keys(main['points']).forEach(function(key) {
	var m = L.marker([main['points'][key][0], main['points'][key][1]]).addTo(map);
	m.bindPopup(key).openPopup();
    });
            
    main['maps'].forEach(function(currurl) {
	url = mainurl.substring(0,mainurl.lastIndexOf("/")+1) + currurl;
	paths = get_paths(get_data(url));

	paths.forEach(function(path) {
	    var line = new L.Polyline(path, {
		color: 'red', weight: 1, opacity: 0.5, smoothFactor: 1
	    });
	    line.addTo(map);
	});
    });    
}
