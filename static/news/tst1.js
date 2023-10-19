
function init() {
    url = "https://corsproxy.io/?https://query1.finance.yahoo.com/v7/finance/download/^IXIC?period1=1689958220&period2=1697734220&interval=1d&events=history&includeAdjustedClose=true";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url = url, false ); 
    xmlHttp.send( null );
    result = xmlHttp.responseText;    
    console.log(result);
}
