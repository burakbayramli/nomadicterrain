
KM_DEG = 0.009;

function degToRad(deg) {
    return deg * (Math.PI / 180.0);
}

function goto(fr, a, d) {

    var N = 30;
    var D = d*KM_DEG;
    var res = [];
    var P  = D / N
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

function getLocation() {
    if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(showPosition);
    }
}

function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    document.getElementById("position").innerHTML = lat + " " + lon;    
}

function getLocationFromPicker() {
    coords = prefs['picker']['coord'].split(" ");
    lat = parseFloat(coords[0]);
    lon = parseFloat(coords[1]);
    document.getElementById("position").innerHTML = lat + " " + lon;    
}

function calc() {

    var type = document.getElementById("deg").value;
    console.log(deg);
}
