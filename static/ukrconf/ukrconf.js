
function plot(before,after) {
    
    url = `https://raw.githubusercontent.com/muratk5n/thirdwave/master/en/mbl/${before}`;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url = url, false ); 
    xmlHttp.send( null );
    result = xmlHttp.responseText;
    res = JSON.parse(result);
    bef = []
    res.forEach(function(x) {
	bef.push([x[1],x[0]]);
    });    
    var linebef = new L.Polyline(bef, {
	color: 'darkblue', weight: 2, opacity: 0.5, smoothFactor: 1
    });
    linebef.addTo(map);
    
    url = `https://raw.githubusercontent.com/muratk5n/thirdwave/master/en/mbl/${after}`;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url = url, false ); 
    xmlHttp.send( null );
    result = xmlHttp.responseText;
    res = JSON.parse(result);
    aft = []
    res.forEach(function(x) {
	aft.push([x[1],x[0]]);
    });    
    var lineaft = new L.Polyline(aft, {
	color: 'red', weight: 2, opacity: 0.5, smoothFactor: 1
    });
    lineaft.addTo(map);
    
}

function init() {
    map = L.map('map').setView([51,44], 5);
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: 'OSM'
    }).addTo(map);

}
