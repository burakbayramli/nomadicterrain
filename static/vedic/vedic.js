
function calculate() {

    var url = "/vedic";
    const xhr = new XMLHttpRequest()
    xhr.onload = () => {
      	if (xhr.status >= 200 && xhr.status < 300) {
            const response = JSON.parse(xhr.responseText);
	    console.log(xhr.responseText);
	    console.log(typeof(xhr.responseText));
	    console.log(Object.keys(response));
	    console.log('received');
	    console.log(response);
	    console.log(response['Ascending']);
	    console.log(response['Sun']);
	    console.log(response['Moon']);
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
