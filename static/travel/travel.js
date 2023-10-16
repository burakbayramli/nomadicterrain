
function init()  {
    if(typeof lat === 'undefined') {
	document.getElementById("position").innerHTML = "<font color='red'>Position not set</font>";
    }
    
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
    map = L.map('map').setView([lat,lon], 12);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: 'ddd'
    }).addTo(map);
    markers = [];
}


function get_index(url) {
    //url = "https://raw.githubusercontent.com/burakbayramli/kod/master/travel/urla/index.json";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url = url, false ); 
    xmlHttp.send( null );
    result = xmlHttp.responseText;
    return JSON.parse(result);
}

function init() {
    //url = "https://raw.githubusercontent.com/burakbayramli/kod/master/travel/urla/index.json";
    url = "http://192.168.43.49:5000/static/travdata/urla/index.json";
    res = get_index(url);
    console.log(res['center']);
    console.log(res);
}

