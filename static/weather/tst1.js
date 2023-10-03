fetchForecast = function () {
    var endpoint = "https://api.openweathermap.org/data/2.5/onecall?lat=38.7267&lon=-9.1403&exclude=current,hourly,minutely,alerts&units=metric&appid=";

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
		var fday = "";
		data.daily.forEach((value, index) => {
		    if (index > 0) {
			var dayname = new Date(value.dt * 1000).toLocaleDateString("en", {
			    weekday: "long",
			});
			var temp = value.temp.day.toFixed(0);
			var hum = value.humidity.toFixed(0);
			console.log(temp + " " + hum)
		    }
		});
	    });
	})
	.catch(function (err) {
	    console.log("Fetch Error :-S", err);
	});
};
