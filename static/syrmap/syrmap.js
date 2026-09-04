
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
    // Helper function to plot multi-ring blocks safely
    function drawBlock(blockData, color) {
        if (!blockData) return;

        blockData.forEach(function(ring) {
            var points = ring.map(function(coord) {
                // Swap [longitude, latitude] to Leaflet's [latitude, longitude]
                return [coord[1], coord[0]];
            });

            var line = new L.Polyline(points, {
                color: color,
                weight: 2,
                dashArray: dashes,
                dashOffset: '0'
            });
            line.addTo(map);
        });
    }

    drawBlock(blocks["HTS"], 'green');
    drawBlock(blocks["TR"], 'lightgreen');
    drawBlock(blocks["ISR"], 'black');
    drawBlock(blocks["DRUZE"], 'magenta');
    drawBlock(blocks["SDF"], 'orange');
    drawBlock(blocks["ISIS"], 'brown');
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
