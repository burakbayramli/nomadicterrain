
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
	    //console.log(typeof(res));
	    //console.log(res);
	    return res;
	}).then(function(text) {
	    console.log(text)
	});
    }).then(function(done) {
	console.log('done');
    });    
}
