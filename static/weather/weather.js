

function fetchForecast() {
    var endpoint = "https://api.openweathermap.org/data/2.5/onecall?lat=38.7267&lon=-9.1403&exclude=minutely,alerts&units=metric&appid=";
    prefs = get_prefs();
    endpoint = endpoint + prefs['weather']['owm_key']
    
    fetch(endpoint)
	.then(function (response) {
	    if (200 !== response.status) {
		console.log(
		    "Looks like there was a problem. Status Code: " + response.status
		);
		return;
	    }
	    response.json().then(function (data) {
		console.log(data);
		var res = "";
		data.daily.forEach((value, index) => {
		    if (index > 0) {
			var dayname = new Date(value.dt * 1000).toLocaleDateString("en", {
			    weekday: "long",
			});
			var temp = value.temp.day.toFixed(0);
			var hum = value.humidity.toFixed(0);
			res += `<p>${temp},${hum}</p>`
		    }
		});
		document.getElementById('output').innerHTML = res;
	    });
	})
	.catch(function (err) {
	    console.log("Fetch Error :-S", err);
	});
}

function init() {
    init_cookies(); 
    prefs = get_prefs();
    console.log(prefs);
    if ('owm_key' in prefs['weather']) {
	document.getElementById("owm_key").value = prefs['weather']['owm_key'];
    }
    res = fetchForecast();
    document.getElementById('output').innerHTML = res;
}

function set_owm_key() {
    prefs = get_prefs();
    prefs['weather']['owm_key'] = document.getElementById("owm_key").value;
    save_cookie(prefs);
}

