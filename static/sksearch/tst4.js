
async function searchText() {

    var stoks = ["oturum","baglanti"];

    var stok_hits = {}
    
    for (var i=0; i<stoks.length; i++) {
	var tok = stoks[i];
	var letter_dict;
	var firstLetter = tok.substring(0,1);
	var url = `/static/skidx/invidx-${firstLetter}.json`;
	await fetch(url)
	    .then(response => response.json())
	    .then(data => letter_dict = data );
	
	if (letter_dict.hasOwnProperty(tok)) {
	    console.log('has',tok);
	    Object.keys(letter_dict[tok]).forEach(function(article) {
		if (stok_hits.hasOwnProperty(article)) {
		    stok_hits[article] = stok_hits[article] + letter_dict[tok][article];
		} else {
		    stok_hits[article] = letter_dict[tok][article];
		}
	    });	    
	}	
    }

    var keyValues = []

    for (var key in stok_hits) {
	keyValues.push([ key, stok_hits[key] ])
    }

    keyValues.sort(function compare(kv1, kv2) {
	return kv2[1] - kv1[1] 
    })

    for (var i=0;i<10;i++) {
	console.log(keyValues[i]);
    }
}
