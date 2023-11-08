
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

function in_tens(x) {
    return parseInt(parseInt(parseFloat(parseInt(x)) / 10)*10);
}

function add_elev(latint, lonint, arrx, arry, arrz) {

    console.log('in add elev',latint,lonint)
    tenslat = in_tens (lat);
    tenslon = in_tens (lon);

    url = `/static/elev/data/out-${tenslat}-${tenslon}.json`;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url = url, false ); 
    xmlHttp.send( null );
    result = xmlHttp.responseText;
    res = JSON.parse(result);

    W = 1/120
    for (var j=latint+1;j>latint+W;j-=W) {
	arry.push (j);
    }
    for (var i=lonint;i<lonint+1-W;i+=W) {
	arrx.push (i);
    }    
    var key = `${latint}-${lonint}`;
    res[key].forEach(function(z) {
	arrz.push(z);
    });
    console.log(arrx.length, arry.length, arrz.length);
}

function plot_elevation () {

    lat=40.5; lon=29.5;
    var radius = 50;
    
    var tmpx = []; var tmpy = []; var tmpz = [];
    add_elev(42,29,tmpx,tmpy,tmpz);
    add_elev(41,29,tmpx,tmpy,tmpz);
    add_elev(40,29,tmpx,tmpy,tmpz);
    
    var data = [ {
	x: tmpx,
	y: tmpy,
	z: tmpz,
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

    //var radius = parseInt(document.getElementById("radius").value);
    //console.log(radius);
    //console.log(lat);
    //console.log(lon);
    var S = 20;
    var xmin = lon - (radius / S);
    var xmax = lon + (radius / S);
    var ymin = lat - (radius / S);
    var ymax = lat + (radius / S);
    //console.log(xmin,xmax,ymin,ymax);
    
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
