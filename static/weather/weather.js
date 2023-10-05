
function getLocation() {
    if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(showPosition);
    }
}

function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    document.getElementById("position").innerHTML = lat + " " + lon;    
}

function fetchForecast() {
    prefs = get_prefs();
    var key = prefs['weather']['owm_key'];
    var endpoint = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${key}`;
    
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
		res += "<p class='hourrow'><span>Day</span><span>Temperature</span><span>Humidity</span><span>Date</span></p>";
		data.hourly.forEach((value, index) => {
		    if (index % 3 == 0) {
			var dayname = new Date(value.dt * 1000).toLocaleDateString("en", {
			    weekday: "long",
			});
			var temp = value.temp;
			var hum = value.humidity;
			var date = new Date(value.dt * 1000);
			var day = date.getDay();
			var mon = date.getMonth();
			var hours = date.getHours();
			var dt = mon + "/" + day + " " + hours + ":00";			
			res += `<p class='hourrow'><span>${dayname}</span><span>${temp}</span><span>${hum}</span><span>${dt}</span></p>`;
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

function init2() {
    init_cookies(); 
    prefs = get_prefs();
    console.log(prefs);
    if ('owm_key' in prefs['weather']) {
	document.getElementById("owm_key").value = prefs['weather']['owm_key'];
    }
    if(typeof lat === 'undefined') {
	document.getElementById("position").innerHTML = "<font color='red'>Position not set</font>";
    }
}

function getWeatherData() {

    if(typeof lat === 'undefined') {
	document.getElementById("position").innerHTML = "<font color='red'>Position not set</font>";
    }

    res = fetchForecast();
    document.getElementById('output').innerHTML = res;
    
}

function set_owm_key() {
    prefs = get_prefs();
    prefs['weather']['owm_key'] = document.getElementById("owm_key").value;
    save_cookie(prefs);
}

