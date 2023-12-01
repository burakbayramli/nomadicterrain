
KM_DEG = 0.009;

function degToRad(deg) {
    return deg * (Math.PI / 180.0);
}

function goto(fr, a, d) {

    var N = 30;
    var D = d*KM_DEG;
    var res = [];
    var P  = D / N
    //console.log(Math.sin(degToRad(180)));
    //console.log(Math.sin(2*Math.PI / 4));
    for (var i=0;i<N; i++) {
	lat = fr[0] + (P*i)*Math.sin(a);
	lon = fr[1] + (P*i)*Math.cos(a);
	res.push([lat,lon]);
    }
    return res;
}

function init() {

    coords = [[30,20],[31,21]];
    pars = coords.join("|");
    
    url = `https://api.open-elevation.com/api/v1/lookup?locations=${pars}`;
    console.log(url);

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url = url, false ); 
    xmlHttp.send( null );
    result = JSON.parse(xmlHttp.responseText);
    console.log(result['results']);
}
