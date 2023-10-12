
function init2() {
    var map = L.map('map').setView([51.505, -0.09], 10);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: 'ddd'
    }).addTo(map);
    
}

function init()  {

    (async () => {
	const api = await fetch('https://www.overpass-api.de/api/interpreter?', {
	    method: 'POST',
	    headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	    },
	    body:"[out:json];node(48.865,2.25,48.9,2.27)[amenity=restaurant];out;"
	});
	const answer = await api.json();
	console.log(answer);

	out = "";

	answer.elements.forEach(function(elem) {
	    console.log(elem);
	})
	
	document.getElementById("output").textContent = out;
    })()

}

