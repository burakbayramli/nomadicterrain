
function calculate() {

    var url = "/vedic";
    var day = document.getElementById('day').value;
    const xhr = new XMLHttpRequest()
    xhr.onload = () => {
      	if (xhr.status >= 200 && xhr.status < 300) {
            const response = JSON.parse(xhr.responseText);

         }
    } 
    xhr.open('POST', url)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({
       "day": document.getElementById("day").value
    }));
    

    
    console.log('here');
}
