
function parse_fred(file) {
    lines = file.split('\n');
    res = [];
    for (var i=0;i<lines.length;i++) {
	tokens = lines[i].split(',');
	res.push([tokens[0],parseFloat(tokens[1])]);
    }
    return res;
}

function init() {
    //url = "https://corsproxy.io/?https://query1.finance.yahoo.com/v7/finance/download/^IXIC?period1=1689958220&period2=1697734220&interval=1d&events=history&includeAdjustedClose=true";
    url = "https://corsproxy.io/?https://fred.stlouisfed.org/graph/fredgraph.csv?id=WALCL";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url = url, false ); 
    xmlHttp.send( null );
    result = xmlHttp.responseText;    
    r = parse_fred(result);
    console.log(r[4]);
    console.log(r[10]);
}
