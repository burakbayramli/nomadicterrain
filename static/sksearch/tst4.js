
async function searchText() {

    var url = "/static/skidx/invidx-o.json";

    var stoks = ["oturum"];

    for (var i=0; i<stoks.length; i++) {
	var tok = stoks[i];
	console.log('-------------------',tok);
	var letter_dict;    
	await fetch(url)
	    .then(response => response.json())
	    .then(data => letter_dict = data );
	
	console.log(letter_dict['oturum']);
    }
}
