
var chosenAction = null;
var fromDir = null;
var checkedItems = [];

function getit() {
    console.log('sdfsdfsdf');
}

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
	var item = response['dirs'][i];
	var chbx = `<input class='dcheck' type='checkbox' id='${item}'/>`;
	var encoded = btoa(response['dirs'][i]);
	var link = `<div ondblclick='clicked_dir("${encoded}");'>${chbx} 📁 ${item}</div>`;
	out += link;
    }	    
    for (var i=0;i<response['files'].length;i++) {
	var item = response['files'][i];
	var chbx = `<input class='dcheck' type='checkbox' id='${item}'/>`;
	var encoded = btoa(response['files'][i]);
	var link = `<div ondblclick='clicked_file("${encoded}");'>${chbx} 📄 ${item}</div>`;
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

function done() {
    toDir = document.getElementById("chosen_dir").value;
    console.log(fromDir);
    console.log(toDir);
    console.log(checkedItems);
    console.log(chosenAction);
}

function enable_allchecks() {
    var coll = document.getElementsByClassName("dcheck");
    for (var i=0;i<coll.length;i++){
	coll[i].disabled = false;
    } 
}

function prep_post_multi() {
    // disable the checkboxes
    var coll = document.getElementsByClassName("dcheck");
    for (var i=0;i<coll.length;i++){
	coll[i].disabled = true;
    }
    // enable the done button
    document.getElementById("done").style.display = "block";

    // stash from dir, checked item in var
    var coll = document.getElementsByClassName("dcheck");
    for (var i=0;i<coll.length;i++){
	var x = coll[i];
	if (coll[i].checked) {
	    console.log('checked',x.id);
	    checkedItems.push(x.id);
	}
    }

    fromDir = document.getElementById("chosen_dir").value;
}

function init() {
    var rad = document.getElementById("browse");
    rad.addEventListener('change', function() {
        console.log(this.value)
	enable_allchecks();
    });
    rad = document.getElementById("copy");
    rad.addEventListener('change', function() {
	chosenAction = "copy";
        console.log(this.value);
	prep_post_multi();	
    });
    rad = document.getElementById("move");
    rad.addEventListener('change', function() {
	chosenAction = "move";
        console.log(this.value)
	prep_post_multi();
    });
    rad = document.getElementById("delete");
    rad.addEventListener('change', function() {
	chosenAction = "delete";
        console.log(this.value)
	prep_post_multi();
    });
    
}
