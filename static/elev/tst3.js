
var dataFiles= [
    { name: 'a10g', latMin:    50, latMax:     90, lngMin:   -180, lngMax:    -90, elMin:      1, elMax:    6098, columns:    10800, rows:   4800 },
    { name: 'b10g', latMin:    50, latMax:     90, lngMin:    -90, lngMax:      0, elMin:      1, elMax:    3940, columns:    10800, rows:   4800 },
    { name: 'c10g', latMin:    50, latMax:     90, lngMin:      0, lngMax:     90, elMin:    -30, elMax:    4010, columns:    10800, rows:   4800 },
    { name: 'd10g', latMin:    50, latMax:     90, lngMin:     90, lngMax:    180, elMin:      1, elMax:    4588, columns:    10800, rows:   4800 },
    { name: 'e10g', latMin:     0, latMax:     50, lngMin:   -180, lngMax:    -90, elMin:    -84, elMax:    5443, columns:    10800, rows:   6000 },
    { name: 'f10g', latMin:     0, latMax:     50, lngMin:    -90, lngMax:      0, elMin:    -40, elMax:    6085, columns:    10800, rows:   6000 },
    { name: 'g10g', latMin:     0, latMax:     50, lngMin:      0, lngMax:     90, elMin:   -407, elMax:    8752, columns:    10800, rows:   6000 },
    { name: 'h10g', latMin:     0, latMax:     50, lngMin:     90, lngMax:    180, elMin:    -63, elMax:    7491, columns:    10800, rows:   6000 },
    { name: 'i10g', latMin:   -50, latMax:      0, lngMin:   -180, lngMax:    -90, elMin:      1, elMax:    2732, columns:    10800, rows:   6000 },
    { name: 'j10g', latMin:   -50, latMax:      0, lngMin:    -90, lngMax:      0, elMin:   -127, elMax:    6798, columns:    10800, rows:   6000 },
    { name: 'k10g', latMin:   -50, latMax:      0, lngMin:      0, lngMax:     90, elMin:      1, elMax:    5825, columns:    10800, rows:   6000 },
    { name: 'l10g', latMin:   -50, latMax:      0, lngMin:     90, lngMax:    180, elMin:      1, elMax:    5179, columns:    10800, rows:   6000 },
    { name: 'm10g', latMin:   -90, latMax:    -50, lngMin:   -180, lngMax:    -90, elMin:      1, elMax:    4009, columns:    10800, rows:   4800 },
    { name: 'n10g', latMin:   -90, latMax:    -50, lngMin:    -90, lngMax:      0, elMin:      1, elMax:    4743, columns:    10800, rows:   4800 },
    { name: 'o10g', latMin:   -90, latMax:    -50, lngMin:      0, lngMax:     90, elMin:      1, elMax:    4039, columns:    10800, rows:   4800 },
    { name: 'p10g', latMin:   -90, latMax:    -50, lngMin:     90, lngMax:    180, elMin:      1, elMax:    4363, columns:    10800, rows:   4800 },
];

function init() {
}    

var resolution= 120;

var byteArray = [undefined,undefined,undefined,undefined];

var indexLimits ;

function get_data(url,index) {
    fetch(url).then(res => res.arrayBuffer())
	.then(arrayBuffer => {
	    piece = new Uint8Array(arrayBuffer);
	})
	.then(function(done) {
	    byteArray[0] = piece;
	})
	.catch(error => {
	    console.log('error');	    
        });
}

function findFile( lng, lat ) {
    for ( var i in dataFiles ) {
        var df= dataFiles[i];
        if (df.latMin <= lat && df.latMax > lat && df.lngMin <= lng && df.lngMax > lng) {
            return df;
        }
    }
}

function fileIndex( lng, lat, fileEntry, resolution ) {
    var column= Math.floor(lng * resolution);
    var row= Math.floor(lat * resolution);
    var rowIndex= row - fileEntry.latMin * resolution;
    var columnIndex= column - fileEntry.lngMin * resolution;
    var index= ((fileEntry.rows - rowIndex - 1) * fileEntry.columns + columnIndex) * 2;
    return index;
};

function get_data(x,y) {

    for (var i=0;i<x.length;i++) {
	console.log(x[i],y[i]);
    }
        
}

function plot_elevation () {

    //var lat = 38.25;
    //var lon = 30;
    var fileEntry= findFile(lon, lat);
    //var radius = 10;
    var radius = parseInt(document.getElementById("radius").value);
    var S = 300;

    var xmin = lon - (radius / S);
    var xmax = lon + (radius / S);
    var ymin = lat - (radius / S);
    var ymax = lat + (radius / S);

    console.log(xmin,xmax,ymin,ymax);

    var M = 10;
    var LIM = 7000;
    var XWIN = (xmax-xmin) / M;
    var YWIN = (ymax-ymin) / M;

    var x = [];
    var y = [];
    
    for (var i=xmin; i<xmax; i+=XWIN) {
	for (var j=ymin; j<ymax; j+=YWIN) {
	    x.push(i);
	    y.push(j);
	}
    }

    var z = get_data(x,y);

    var data = [ {
	x: x,
	y: y,
	z: z,
	colorscale: "Earth",
	type: 'contour',
	showlabels: true,
	contours: {
	    coloring: 'lines',
	    showlabels: true
	} 
    } ];
    
    var layout = {
	xaxis: {
	    range: [xmin, xmax]  
	},
	yaxis: {
	    range: [ymin, ymax]  
	}	
    }

    Plotly.newPlot('myDiv', data, layout);    
}

function getLocation() {
    if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(showPosition);
    }
}

function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    document.getElementById("osmposition").innerHTML = lat + " " + lon;
}

