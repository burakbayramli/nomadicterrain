
function calculate() {

    var url = "/vedic";
    const xhr = new XMLHttpRequest()
    xhr.onload = () => {
      	if (xhr.status >= 200 && xhr.status < 300) {
          var res = xhr.responseText
          res = res.replaceAll("'",'"');
          console.log(res);
          res = JSON.parse(res);	    
          //console.log(res['Ascending']);
          //console.log(res['Sun']);
          //console.log(res['Moon']);
	  document.getElementById("results").innerHTML = JSON.stringify(res);
	  var asc = res['Ascending'][0].toLowerCase();
	  var links = `<a target="_blank" href="https://www.indastro.com/lagna/${asc}-ascendant.html">Asc 1</a>,`;
	  links += `<a target="_blank" href="https://astrobix.com/horoscope/lagnapredi/${asc}">Asc 2</a>&nbsp;`;
	  links += "<br>";
	    
	  document.getElementById("links").innerHTML = links;
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
