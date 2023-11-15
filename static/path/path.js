
function init()  {
    init_cookies();
    shortest();
}

function shortest() {

    var [lat1, lon1] = [40.976010662280586, 29.081443051759983];
    var [lat2, lon2] = [37.377289145215066, 27.295607731239233];

    url = `http://router.project-osrm.org/route/v1/car/${lon1},${lat1};${lon2},${lat2}?alternatives=false`;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url = url, false ); 
    xmlHttp.send( null );
    result = JSON.parse(xmlHttp.responseText);
    encoded = result['routes'][0]['geometry'];
    var coordinates = polyline.decode(encoded);
    var c = coordinates[0];

    map = L.map('map').setView([c[0],c[1]], 10);
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: 'OSM'
    }).addTo(map);

    var line = new L.Polyline(coordinates, {
	color: 'red', weight: 2, opacity: 0.5, smoothFactor: 1
    });
    line.addTo(map);        
}
