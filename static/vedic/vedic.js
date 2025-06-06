
function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

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
	    
	  var links = "<p>Ascending</p>";
	  var asc = res['Ascending'][0].toLowerCase();
	  links += `<a target="_blank" href="https://www.indastro.com/lagna/${asc}-ascendant.html">Asc 1</a>,`;
	  links += `<a target="_blank" href="https://astrobix.com/horoscope/lagnapredi/${asc}">Asc 2</a>,`;
	  links += `<a target="_blank" href="https://vedkund.com/2022/06/${asc}-ascendant-astrology-love-relationships-career-marriage-prediction/">Asc 3</a>,`;

	  links += "<p>Sun</p>";
	  var sun = res['Sun'][0].toLowerCase();
	  links += `<a target="_blank" href="https://www.vinaybajrangi.com/planets/sun/sun-in-${sun}.php">Sun 1</a>,`;

	  links += "<p>Moon</p>";
	  var moon = res['Moon'][0].toLowerCase();
	  links += `<a target="_blank" href="https://www.indastro.com/planet-sign/moon-${moon}.html">Moon 1</a>,`;
	  links += `<a target="_blank" href="https://www.astroved.com/astropedia/en/moonsign/${moon}-moon-sign">Moon 2</a>`;

	  links += "<p>Mars</p>";
	  var mars = res['Mars'][0].toLowerCase();
	  links += `<a target="_blank" href="https://www.indastro.com/planet-sign/mars-${mars}.html">Mars 1</a>`;

	  links += "<p>Mercury</p>";
	  var mercury = res['Mercury'][0].toLowerCase();
	  links += `<a target="_blank" href="https://www.indastro.com/planet-sign/mercury-${mercury}.html">Mercury 1</a>`; 
	    
	  links += "<p>Venus</p>";
	  var venus = res['Venus'][0].toLowerCase();
	  links += `<a target="_blank" href="https://www.indastro.com/planet-sign/venus-${venus}.html">Venus 1</a>,`; 
	  links += `<a target="_blank" href="https://www.vinaybajrangi.com/planets/venus/venus-in-${venus}.php">Venus 2</a>,`; 
	  links += `<a target="_blank" href="https://planets.powerfortunes.com/venusin${venus}.php">Venus 3</a>`; 

	  links += "<p>Saturn</p>";
	  var saturn = res['Saturn'][0].toLowerCase();
	  links += `<a target="_blank" href="https://advanced-astrology.com/saturn-in-${saturn}">Saturn 1</a>,`; 
	    
	  links += "<p>North Node</p>";
	  var north = res['true Node'][0].toLowerCase();
	  var north2 = capitalizeFirstLetter(north);
	  var south = res['Ketu (true)'][0].toLowerCase();
	  links += `<a target="_blank" href="https://vedicsiddhanta.in/2023/09/north-node-in-astrology.html#North_Node_or_Rahu_in_${north2}">NN 1</a>,`;
	  links += `<a target="_blank" href="https://advanced-astrology.com/north-node-in-${north}/">NN 2</a>,`;
	  links += `<a target="_blank" href="https://astrostyle.com/astrology/${south}-north-node-${north}-north-node/">NN 3</a>`;
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
