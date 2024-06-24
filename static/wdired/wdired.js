
function clicked_item(id) {

    console.log('clicked', id);
}

function listdir(dir) {

    url = "/listdir";
    dir = document.getElementById("chosen_dir").value;
    const xhr = new XMLHttpRequest()
    xhr.onload = () => {
	if (xhr.status >= 200 && xhr.status < 300) {
            const response = JSON.parse(xhr.responseText);
	    console.log(response);
	    var out = "";
	    for (var i=0;i<response['dirs'].length;i++) {
		var chbx = `<input type='checkbox' id='d-${i}'/>`;
		var item = response['dirs'][i];
		var encoded = btoa(response['dirs'][i]);
		var link = `<div onclick='clicked_item("${encoded}");'>${chbx} 📁 ${item}</div>`;
		out += link;
	    }	    
	    for (var i=0;i<response['files'].length;i++) {
		var chbx = `<input type='checkbox' id='d-${i}'/>`;
		var item = response['files'][i];
		var encoded = btoa(response['files'][i]);
		var link = `<div onclick='clicked_item("${encoded}");'>${chbx} 📄 ${item}</div>`;
		out += link;
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
    var res = atob("L2hvbWUvYnVyYWsvaWFzbGZhamxzZGtmYXNkLTM0Mg==\n");
    console.log(res);    
}

