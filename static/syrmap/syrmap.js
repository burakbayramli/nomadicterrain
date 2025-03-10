
function plot_map() {
    map = L.map('map').setView([35,38], 6);
    
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
    
    url = `/static/syrmap/data/${before}`;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url = url, false ); 
    xmlHttp.send( null );
    result = xmlHttp.responseText;
    blocks = JSON.parse(result);
    
    hts = blocks["HTS"];
    bef = []
    hts[0].forEach(function(x) {
	bef.push([x[1],x[0]]);
    });
    var linebef1 = new L.Polyline(bef, {
	color: 'green', weight: 2, dashArray: '3, 3', dashOffset: '0'
    });
    linebef1.addTo(map);
    bef = []
    hts[1].forEach(function(x) {
	bef.push([x[1],x[0]]);
    });
    var linebef1 = new L.Polyline(bef, {
	color: 'green', weight: 2, dashArray: '3, 3', dashOffset: '0'
    });
    linebef1.addTo(map);
    
    tr = blocks["TR"];
    bef = []
    tr[0].forEach(function(x) {
	bef.push([x[1],x[0]]);
    });
    var linebef2 = new L.Polyline(bef, {
	color: 'lightgreen', weight: 2, dashArray: '3, 3', dashOffset: '0'
    });
    linebef2.addTo(map);
    
    tr = blocks["TR"];
    bef = []
    tr[1].forEach(function(x) {
	bef.push([x[1],x[0]]);
    });
    var linebef2 = new L.Polyline(bef, {
	color: 'lightgreen', weight: 2, dashArray: '3, 3', dashOffset: '0'
    });
    linebef2.addTo(map);
    

       
}
