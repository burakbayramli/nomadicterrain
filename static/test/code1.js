
// cols = ['GlobalEventID', 'Day', 'MonthYear', 'Year', 'FractionDate','Actor1Code', 'Actor1Name', 'Actor1CountryCode','Actor1KnownGroupCode', 'Actor1EthnicCode' 'Actor1Religion1Code', 'Actor1Religion2Code', 'Actor1Type1Code', 'Actor1Type2Code', 'Actor1Type3Code', 'Actor2Code', 'Actor2Name', 'Actor2CountryCode', 'Actor2KnownGroupCode', 'Actor2EthnicCode', 'Actor2Religion1Code', 'Actor2Religion2Code', 'Actor2Type1Code', 'Actor2Type2Code', 'Actor2Type3Code', 'IsRootEvent','EventCode', 'EventBaseCode']

function init() {

    //var url = "http://192.168.43.49:5000/static/20240602.export.CSV.zip";
    //var url = "http://192.168.43.49:5000/static/in.zip";
    var url = "http://192.168.43.49:5000/static/in2.zip";

    fetch(url).then(res => res.arrayBuffer()).then(arrayBuffer => {
	var new_zip = new JSZip();
	new_zip.loadAsync(arrayBuffer)
	.then(function(zip) {
	    //var res = zip.file(`20240602.export.CSV`).async('string');
	    var res = zip.file('in2.csv').async('string');
	    return res;
	}).then(function(text) {
	    //console.log(text);
	    var lines = text.split('\n');
	    lines.forEach(function(line) {
		console.log('line', line);
		var tokens = line.split('\t');
		console.log(tokens.length); 
	    });
	});
    });
}
