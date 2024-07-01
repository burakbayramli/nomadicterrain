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
       "rotate": [50, 20, 150, 100]
    }));
}

function xy_click(event) {
    let x = event.clientX;
    let y = event.clientY;
    lastCoords.push([x,y]);
    elem = document.getElementById('img');
    let o1 = elem.getBoundingClientRect().left
    let o2 = elem.getBoundingClientRect().top;
    console.log(x + " " + y, o1, o2);
    var cs = "" + lastCoords[lastCoords.length-2] + " " +
                  lastCoords[lastCoords.length-1];
    document.getElementById("crop_text").value = cs;
}
