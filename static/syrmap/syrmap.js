
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

function plot_blocks(block, dashes) {

    // ---------------------------------------------------
    hts = blocks["HTS"];
    bef = []
    hts.forEach(function(x) {
	bef.push([x[1],x[0]]);
    });
    var linebef = new L.Polyline(bef, {
	color: 'green', weight: 2, dashArray: dashes, dashOffset: '0'
    });
    linebef.addTo(map);
    
    // ---------------------------------------------------
    tr = blocks["TR"];
    bef = []
    tr[0].forEach(function(x) {
	bef.push([x[1],x[0]]);
    });
    var linebef = new L.Polyline(bef, {
	color: 'lightgreen', weight: 2, dashArray: dashes, dashOffset: '0'
    });
    linebef.addTo(map);
    
    tr = blocks["TR"];
    bef = []
    tr[1].forEach(function(x) {
	bef.push([x[1],x[0]]);
    });
    var linebef = new L.Polyline(bef, {
	color: 'lightgreen', weight: 2, dashArray: dashes, dashOffset: '0'
    });
    linebef.addTo(map);
    
    // ---------------------------------------------------
    saa = blocks["SAA"];
    bef = []
    saa.forEach(function(x) {
	bef.push([x[1],x[0]]);
    });
    var linebef = new L.Polyline(bef, {
	color: 'blue', weight: 2, dashArray: dashes, dashOffset: '0'
    });
    linebef.addTo(map);
    
    // ---------------------------------------------------
    idf = blocks["ISR"];
    bef = []
    idf.forEach(function(x) {
	bef.push([x[1],x[0]]);
    });
    var linebef = new L.Polyline(bef, {
	color: 'black', weight: 2, dashArray: dashes, dashOffset: '0'
    });
    linebef.addTo(map);
    
    // ---------------------------------------------------
    dr = blocks["DRUZE"];
    bef = []
    dr.forEach(function(x) {
	bef.push([x[1],x[0]]);
    });
    var linebef = new L.Polyline(bef, {
	color: 'magenta', weight: 2, dashArray: dashes, dashOffset: '0'
    });
    linebef.addTo(map);


    // ---------------------------------------------------
    sdf = blocks["SDF"];
    bef = []
    sdf.forEach(function(x) {
	bef.push([x[1],x[0]]);
    });
    var linebef = new L.Polyline(bef, {
	color: 'orange', weight: 2, dashArray: dashes, dashOffset: '0'
    });
    linebef.addTo(map);


    // ---------------------------------------------------
    isis = blocks["ISIS"];
    bef = []
    isis.forEach(function(x) {
	bef.push([x[1],x[0]]);
    });
    var linebef = new L.Polyline(bef, {
	color: 'brown', weight: 2, dashArray: dashes, dashOffset: '0'
    });
    linebef.addTo(map);
       
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

    plot_blocks(blocks, '3 3');
    
    url = `/static/syrmap/data/${after}`;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url = url, false ); 
    xmlHttp.send( null );
    result = xmlHttp.responseText;
    blocks = JSON.parse(result);

    plot_blocks(blocks, '0 0');
    
    // ---------------------------------------------------
    var legend = L.control({position: 'topright'});

    legend.onAdd = function (map) {
	var div = L.DomUtil.create('div', 'info legend'),
	    grades = [["Alewites","blue"],["Druze","magenta"],
		      ["TR","lightgreen"],["HTS","green"],
		      ["ISR","black"],["SDF","orange"],["ISIS","brown"]];

	// loop through our density intervals and generate a label with a colored square for each interval
	for (var i = 0; i < grades.length; i++) {
            div.innerHTML += "<span style='color:" + grades[i][1] + ";'>" + grades[i][0] + "</span>,&nbsp;";
	}
	return div;
    };

    legend.addTo(map);
    
       
}
