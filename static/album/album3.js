
function fetch_album_json() {

    url = "/static/album/album.json";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url = url, false ); 
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
  
function get_images() {
    album = JSON.parse(fetch_album_json());
    var BATCH = 12;
    var keys = Object.keys(album['photos']);
    var N = Math.min(BATCH,keys.length);
    var i = 0;
    console.log("n",N);
    while (i<N) {
	for (var j=0;j<3;j++) {
	    console.log(j,keys[i]);
	    i++;
	    if (i>=N) break;
	}	
    }

}
