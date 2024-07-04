
function plot_map() {
    map = L.map('map').setView([48,37], 6);
    
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png', {
	maxZoom: 19, attribution: 'OSM'
    }).addTo(map);

    var b = document.getElementById("before").value;
    var a = document.getElementById("after").value;
    console.log(a,b);
    plot(b,a);
}    

function plot(before,after) {

    console.log(before);
    console.log(after);
    
    url = `/static/flcomp/data/${before}`;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url = url, false ); 
    xmlHttp.send( null );
    result = xmlHttp.responseText;
    blocks = JSON.parse(result);
    blocks.forEach(function(res) {    
	bef = []
	res.forEach(function(x) {
	    bef.push([x[1],x[0]]);
	});    
	var linebef = new L.Polyline(bef, {
	    color: 'darkblue', weight: 2, opacity: 0.5, smoothFactor: 1
	});
	linebef.addTo(map);
    });
    
    url = `/static/flcomp/data/${after}`;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url = url, false ); 
    xmlHttp.send( null );
    result = xmlHttp.responseText;
    blocks = JSON.parse(result);
    blocks.forEach(function(res) {        
	aft = []
	res.forEach(function(x) {
	    aft.push([x[1],x[0]]);
	});    
	var lineaft = new L.Polyline(aft, {
	    color: 'red', weight: 2, opacity: 0.5, smoothFactor: 1
	});
	lineaft.addTo(map);
    });

       
}
