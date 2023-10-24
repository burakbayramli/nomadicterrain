
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


function plot_elevation () {

    url = "/static/elev/data/out-40-20.json"
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url = url, false ); 
    xmlHttp.send( null );
    result = xmlHttp.responseText;

    res = JSON.parse(result);
    
    y = [];
    for (var i=40;i<41;i+=1/120) {
	y.push (i);
    }
    y = y.reverse();
    x = [];
    for (var i=29;i<30;i+=1/120) {
	x.push (i);
    }
    var data = [ {
	x: x,
	y: y,
	z: res['40-29'],
	colorscale: "Earth",
	type: 'contour',
	showlabels: true,
	contours: {
	    coloring: 'lines',
	    showlabels: true,
	    start: 0,
	    end: 600,
	    size: 100
	} 
    } ];

    var radius = parseInt(document.getElementById("radius").value);
    console.log(radius);
    console.log(lat);
    console.log(lon);
    var lat=40.5; var lon=29.5;
    var S = 100;
    var xmin = lon - (radius / S);
    var xmax = lon + (radius / S);
    var ymin = lat - (radius / S);
    var ymax = lat + (radius / S);
    console.log(xmin,xmax,ymin,ymax);
    
    var layout = {
	title: 'Basic Contour Plot',
	xaxis: {
	    //range: [29.0, 29.5]  
	    range: [xmin, xmax]  
	},
	yaxis: {
	    //range: [40.92, 40.98]  
	    range: [ymin, ymax]  
	}	
    }

    Plotly.newPlot('myDiv', data, layout);    
}
