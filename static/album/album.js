
function fetch_album_json() {

    url = "/static/album/album.json";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url = url, false ); 
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
  
function addImage() {
     album = JSON.parse(fetch_album_json());
     console.log(album['photos']['ikizoglu1.jpg']['url']);
     const imageElement = new Image();
     imageElement.src = "data:image/png;base64," + album['photos']['ikizoglu1.jpg']['thumbnail'];
     imageElement.width = 80;
     var desc = album['photos']['ikizoglu1.jpg']['desc'];
     document.getElementById('img1link').href = album['photos']['ikizoglu1.jpg']['url'];
     document.getElementById('img1img').appendChild(imageElement);
     document.getElementById('img1img').insertAdjacentHTML('beforeend', `<div class="imgdesc">${desc}</div>`);
}

