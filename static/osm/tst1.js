
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
    map = L.map('map').setView([lat,lon], 12);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: 'ddd'
    }).addTo(map);
    
}


function test1() {

    (async () => {
	const api = await fetch('https://www.overpass-api.de/api/interpreter?', {
	    method: 'POST',
	    headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	    },
	    body:`[out:json];node['amenity'~'cafe'](around:3000,${lat},${lon});out center;`
	});
	const answer = await api.json();
	elems = answer['elements'];
	elems.forEach(function(x) {
	    var m = L.marker([x['lat'],x['lon']]).addTo(map);
	    m.bindPopup(x['tags']['name']).openPopup();
	});
	
    })()    

}
    

