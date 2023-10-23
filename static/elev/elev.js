

function init () {

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
	autocontour: false,
	contours: {
	    start: 0,
	    end: 600,
	    size: 100
	} 
    } ];

    var layout = {
	title: 'Basic Contour Plot',
	xaxis: {
	    range: [29.0, 29.5]  
	},
	yaxis: {
	    range: [40.92, 40.98]  
	}	
    }

    //var layout = { title: 'Basic Contour Plot' }

    Plotly.newPlot('myDiv', data, layout);
    
    //console.log(res['40-29'])
}
