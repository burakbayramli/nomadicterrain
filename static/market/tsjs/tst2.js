
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
    url = "https://api.allorigins.win/raw?url=https%3A%2F%2Fquery1.finance.yahoo.com%2Fv7%2Ffinance%2Fdownload%2F%5EIXIC%3Fperiod1%3D1710235049%26period2%3D1718011049%26interval%3D1d%26events%3Dhistory%26includeAdjustedClose%3Dtrue"
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url = url, false ); 
    xmlHttp.send( null );
    result = xmlHttp.responseText;    
    r = parse_fred(result);
    console.log(r)
}
