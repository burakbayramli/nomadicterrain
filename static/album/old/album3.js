
function fetch_album_json() {
    url = "/static/album/album.json";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url = url, false ); 
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
  
function show_images(imgs,offset) {
    album = JSON.parse(fetch_album_json());
    var BATCH = 12;
    var keys = Object.keys(album['photos']);
    var N = Math.min(BATCH,imgs.length);
    var i = 0;
    console.log("n",N);
    var out = "";
    out += "<table>";
    while (i<N) {
	out += "<tr>";
	for (var j=0;j<3;j++) {
	    out += "<td>";
	    out += "<a href='" + album['photos'][imgs[i]]['url'] + "'>";
	    out += "<img src='data:image/png;base64," + album['photos'][imgs[i]]['thumbnail']+"'></img>";
	    out += "</a>";
	    out += "</td>";
	    i++;
	    if (i>=N) break;
	}	
	out += "</tr>";
    }
    out += "</table>";
    document.getElementById('output').innerHTML = out;    
}

function doit() {
    var imgs = ['ikizoglu1.jpg','IMG-20200424-WA0000.jpg','IMG-20240508-WA0000.jpg',
		'sait_bayramli.jpg'];


    show_images(imgs,0);
    
}
