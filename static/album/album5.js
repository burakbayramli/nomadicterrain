
var imgs = [];
var offset = 0;
var BATCH = 4;

function fetch_album_json() {
    url = "/static/album/album.json";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url = url, false ); 
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
  
function show_thumb_list() {
    album = JSON.parse(fetch_album_json());
    var keys = Object.keys(album['photos']);
    var N = Math.min(BATCH,imgs.length);
    var out = "";
    out += "<table>";
    var i = offset;
    while (i<offset+N) {
	out += "<tr>";
	for (var j=0;j<3;j++) {
	    if (i<imgs.length) {
		out += "<td>";
		out += "<a target='_blank' href='/static/album/photo5.html?photo=" + imgs[i] + "'>";
		out += "<img src='data:image/png;base64," + album['photos'][imgs[i]]['thumbnail']+"'></img>";
		out += "</a>";
		out += "</td>";
	    }
	    i = i + 1;
	    if (i>=offset+N) break;
	}	
	out += "</tr>";
    }
    out += "</table>";
    document.getElementById('output').innerHTML = out;    
}

function showall() {
    album = JSON.parse(fetch_album_json());
    imgs = Object.keys(album['photos']);
    console.log(imgs);
    offset = 0;
    show_thumb_list();
    
}

function next() {    
    if ((offset - BATCH) > imgs.length) return;
    console.log('next');
    offset = offset + BATCH;
    show_thumb_list();
}

function previous() {
    if ((offset - BATCH) < 0) return;
    console.log('prev');
    offset = offset - BATCH;
    show_thumb_list();
}

function photo_details() {
    album = JSON.parse(fetch_album_json());
    var myParam = location.search.split('photo=')[1];
    console.log(myParam);
    var out = "";
    out += "<div><center>" + album['photos'][myParam]['desc'] + "</center></div>"; 
    out += "<img onclick='xy_click(event)' width='500' src='" + album['photos'][myParam]['url'] + "'></img>";
    out += "<div><center>Resimdekiler: " + Object.keys(album['photos'][myParam]['people']) + "</center></div>";
    document.getElementById('output').innerHTML = out;		  
    
}

function xy_click(event) {
    let x = event.clientX;
    let y = event.clientY;
    console.log(x + " " + y);
}
