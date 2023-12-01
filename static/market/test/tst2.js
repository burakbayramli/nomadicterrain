
function parse_fred(file) {
    lines = file.split('\n');
    res = {};
    dates = [];
    vals = [];
    for (var i=1;i<lines.length;i++) {
	tokens = lines[i].split(',');
	dates.push(tokens[0]);
	vals.push(parseFloat(tokens[1]));
    }
    toks = lines[0].split(',');
    res[toks[0]] = dates;
    res[toks[1]] = vals;
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
    console.log(Object.keys(r));
}
