var reader1 = new FileReader();
var lastCoords = [];

reader1.addEventListener('load', e => {
  document.querySelector('#img').src = e.target.result;
});

document.addEventListener('DOMContentLoaded', e => {
  document.forms.pickfile.file.addEventListener('change', e => {
    reader1.readAsDataURL(e.target.files[0]);
  });
});

function rotate() {
    var url = "/rotate";
    var rval = document.getElementById('rotate_text').value;
    console.log(rval);
    const xhr = new XMLHttpRequest()
    xhr.onload = () => {
      	if (xhr.status >= 200 && xhr.status < 300) {
            const response = JSON.parse(xhr.responseText);
	          //console.log(response);
            document.getElementById("img").src = 'data:image/jpeg;base64,'+response['output'];
         }
    } 
    xhr.open('POST', url)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({
       "img": document.getElementById("img").src,
       "rotate": rval
    }));
}

function crop() {
    url = "/crop";
    var c1 = lastCoords[lastCoords.length-2];
    var c2 = lastCoords[lastCoords.length-1];
    console.log(c1,c2);
    const xhr = new XMLHttpRequest()
    xhr.onload = () => {
      	if (xhr.status >= 200 && xhr.status < 300) {
            const response = JSON.parse(xhr.responseText);
            document.getElementById("img").src = 'data:image/jpeg;base64,'+response['output'];
         }
    } 
    xhr.open('POST', url)
    xhr.setRequestHeader('Content-Type', 'application/json')    
    xhr.send(JSON.stringify({
       "img": document.getElementById("img").src,
       "crop": [[c1[0], c1[1]], [c2[0], c2[1]]]
    }));
}

function xy_click(event) {
    elem = document.getElementById('img');
    let x = event.clientX;
    let y = event.clientY;
    let o1 = elem.getBoundingClientRect().left
    let o2 = elem.getBoundingClientRect().top;    

    console.log(x + " " + y, "offset", o1, o2);

    let x2 = x - o1;
    let y2 = y - o2;
    
    lastCoords.push([x2,y2]);
    
    var cs = "" + lastCoords[lastCoords.length-2] + " " +
                  lastCoords[lastCoords.length-1];
    document.getElementById("crop_text").value = cs;
}
