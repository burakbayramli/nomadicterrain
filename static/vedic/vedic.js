
function calculate() {

    var url = "/vedic";
    const xhr = new XMLHttpRequest()
    xhr.onload = () => {
      	if (xhr.status >= 200 && xhr.status < 300) {
            const response = JSON.parse(xhr.responseText);
	    console.log('received');
	    console.log(response);
         }
    } 
    xhr.open('POST', url)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({
	"day": document.getElementById("day").value,
	"mon": document.getElementById("mon").value,
	"year": document.getElementById("year").value,
	"hour": document.getElementById("hour").value,
	"lat": document.getElementById("lat").value,
	"lon": document.getElementById("lon").value
    }));
        
}
