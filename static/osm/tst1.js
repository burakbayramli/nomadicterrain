
function get_data() {

    (async () => {
	const api = await fetch('https://www.overpass-api.de/api/interpreter?', {
	    method: 'POST',
	    headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	    },
	    body:"[out:json];node['amenity'~'cafe'](around:3000,40.96519108206366,28.83733041103168);out center;"
	});
	const answer = await api.json();
	
	document.getElementById("output").innerText = JSON.stringify(answer);
    })()
}    

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


function test1() {
    get_data();
    map = L.map('map').setView([51.505, -0.09], 10);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: 'ddd'
    }).addTo(map);
        
    var marker = L.marker([51.5, -0.09]).addTo(map);

}
    

