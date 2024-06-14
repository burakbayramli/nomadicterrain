const fs = require('fs')

var s = "oturum bağlantı"
s = s.toLowerCase().replace("ç","c").replace("ö","o").replace("ğ","g");
s = s.replace("ı","i").replace("ü","u").replace("ş","s");
console.log(s);

var stok = s.split(" ");

var base_url = "/home/burak/Documents/repos/nomadicterrain/static/skidx";

var stok_hits = {}

stok.forEach(function(tok) {
    firstLetter = tok.substring(0,1);
    url = base_url + `/invidx-${firstLetter}.json`;
    file = fs.readFileSync(url, 'utf8');
    var letter_dict = JSON.parse(file);
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
});

var keyValues = []

for (var key in stok_hits) {
  keyValues.push([ key, stok_hits[key] ])
}

keyValues.sort(function compare(kv1, kv2) {
  // This comparison function has 3 return cases:
  // - Negative number: kv1 should be placed BEFORE kv2
  // - Positive number: kv1 should be placed AFTER kv2
  // - Zero: they are equal, any order is ok between these 2 items
  return kv2[1] - kv1[1] 
})

console.log(keyValues);

