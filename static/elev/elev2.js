

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
        
    const contours = d3.contours()
	  .size([256,256])
	  //.thresholds([50000,100000,150000]);
	  .thresholds([100,200,300,500]);
    
    const polygons = contours(res['40-29'].flat());
    //const polygons = contours(values);

    console.log(polygons);

}
