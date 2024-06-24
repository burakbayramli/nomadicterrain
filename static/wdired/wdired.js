
function listdir(dir) {
    url = "/listdir";
    const xhr = new XMLHttpRequest()
    xhr.onload = () => {
	if (xhr.status >= 200 && xhr.status < 300) {
            const response = JSON.parse(xhr.responseText);
	    console.log(response);
	    var out = "";
	    response['dirs'].forEach(function(x) {
		out += "<p>" + "📁 " + x + "</p>";
	    });
	    response['files'].forEach(function(x) {
		out += "<p>" + "📄 " + x + "</p>";
	    });
	    document.getElementById("output").innerHTML = out;
	}
    }

    xhr.open('POST', url)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({"dir": dir}))
}

function init() {
    res = listdir("/tmp");
    console.log(res);
}
