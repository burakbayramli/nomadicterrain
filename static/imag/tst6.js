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
    url = "/rotate";
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
       "rotate": 90
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

