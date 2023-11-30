

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
