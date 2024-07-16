
stations = [
    'https://somafm.com/groovesalad32.pls',
    'https://somafm.com/secretagent32.pls',
    'http://209.236.126.18:8004/listen.pls',
    'https://laradiofm.com/download/394-en-pls',
    'http://199.233.234.34:25373/listen.pls',
    'https://somafm.com/covers32.pls',
    'http://kcrw.streamguys1.com/kcrw_192k_mp3_news_internet_radio'];

function fetch_station() {
    url = stations[0];
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url = url, false ); 
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function init() {

    var res = fetch_station();
    console.log(res);
    
}
