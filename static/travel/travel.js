
function get_index(url) {
    //url = "https://raw.githubusercontent.com/burakbayramli/kod/master/travel/urla/index.json";
    url = "http://192.168.43.49:5000/static/travdata/urla/index.json";    
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

