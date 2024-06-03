
function resolve(data){
    console.log(data);
}

function init() {

    //var url = "http://192.168.43.49:5000/static/20240602.export.CSV.zip";
    //var url = "http://192.168.43.49:5000/static/in.zip";
    var url = "http://192.168.43.49:5000/static/in2.zip";

    new JSZip.external.Promise(function (resolve, reject) {
	JSZipUtils.getBinaryContent(url, function(err, data) {
            if (err) {

            } else {

            }
	});
    }).then(function (data) {
	return JSZip.loadAsync(data);
    })
    .then(function(zip) {
	//var res = zip.file(`20240602.export.CSV`).async('string');
	console.log(zip);
	var res = zip.file('in2.csv').async('string');
	console.log(res);
    });
}
