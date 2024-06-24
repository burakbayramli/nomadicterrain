
function listdir(dir) {
    //sessionStorage.set("curr_dir",dir);
    url = "/listdir";
    dir = document.getElementById("chosen_dir").value;
    const xhr = new XMLHttpRequest()
    xhr.onload = () => {
	if (xhr.status >= 200 && xhr.status < 300) {
            const response = JSON.parse(xhr.responseText);
	    console.log(response);
	    var out = "";
	    //<input type='checkbox' id='subscribeNews'>
	    for (var i=0;i<response['files'].length;i++) {
		chbx = `<input type='checkbox' id='d-${i}'/>`
		out += "<p>" + chbx + "📁 " + response['files'][i] + "</p>";
	    }
	    for (var i=0;i<response['dirs'].length;i++) {
		chbx = `<input type='checkbox' id='f-${i}'/>`
		out += "<p>" + chbx + "📄 " + response['dirs'][i] + "</p>";
	    }
	    document.getElementById("output").innerHTML = out;
	}
    }

    xhr.open('POST', url)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({"dir": dir}))
}

function init() {
    //res = listdir("/tmp");
    //console.log(res);
}

