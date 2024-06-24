
function clicked_file(id) {

    console.log('clicked file', id);
}

function up() {
    var dir = document.getElementById("chosen_dir").value;
    var newdir = dir.substring(0,dir.lastIndexOf("/"));
    console.log(newdir);
    document.getElementById("chosen_dir").value = newdir;
    listdir(newdir);    
}

function clicked_dir(id) {

    console.log('clicked dir', id);
    url = "/listdir";
    var dir = document.getElementById("chosen_dir").value;
    var subdir = atob(id);
    var newdir = dir + "/" + subdir;
    console.log(newdir);
    document.getElementById("chosen_dir").value = newdir;
    listdir(newdir);
}

function main_page_string(response) {
    var out = "";
    for (var i=0;i<response['dirs'].length;i++) {
	var chbx = `<input type='checkbox' id='d-${i}'/>`;
	var item = response['dirs'][i];
	var encoded = btoa(response['dirs'][i]);
	var link = `<div onclick='clicked_dir("${encoded}");'>${chbx} 📁 ${item}</div>`;
	out += link;
    }	    
    for (var i=0;i<response['files'].length;i++) {
	var chbx = `<input type='checkbox' id='d-${i}'/>`;
	var item = response['files'][i];
	var encoded = btoa(response['files'][i]);
	var link = `<div onclick='clicked_file("${encoded}");'>${chbx} 📄 ${item}</div>`;
	out += link;
    }
    return out;
}

function listdir(dir) {

    url = "/listdir";
    dir = document.getElementById("chosen_dir").value;
    const xhr = new XMLHttpRequest()
    xhr.onload = () => {
	if (xhr.status >= 200 && xhr.status < 300) {
            const response = JSON.parse(xhr.responseText);
	    console.log(response);
	    var out = main_page_string(response);

	    document.getElementById("output").innerHTML = out;
	}
    }

    xhr.open('POST', url)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({"dir": dir}))
}

function init() {
    var res = atob("L2hvbWUvYnVyYWsvaWFzbGZhamxzZGtmYXNkLTM0Mg==\n");
    console.log(res);    
}
