
var s = "oturum bağlantı web"
s = s.toLowerCase().replace("ç","c").replace("ö","o").replace("ğ","g");
s = s.replace("ı","i").replace("ü","u").replace("ş","s");
console.log(s);

var stok = s.split(" ");

base_url = "/home/burak/Documents/repos/nomadicterrain/static/skidx";

stok.forEach(function(tok) {
    url = base_url + '/invidx-%s.json' % tok[0];
});
