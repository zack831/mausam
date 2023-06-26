class Weather{
	constructor(val){
		var test= 0;
		const apikey = "9bb9485e113f7f8e07520d9f65878e19";
		this.fetchLocationValues(val,apikey);
	}

	fetchDaily(lat,lon,apikey){
		fetch("http://api.openweathermap.org/data/3.0/onecall?lat="
				+lat
				+"&lon="
				+lon
				+"&units=metric&appid="
				+apikey
			)
		.then((response) => response.json())
		//.then((data) => console.log(data))
		.then((data) => this.displayDaily(data))
		// .then((data) => this.major_cities_display(data));
	}

	displayDaily(data)
	{
		data.daily.forEach((value, index) => {
			if (index > 0) {
				const dayname = new Date(value.dt * 1000).toLocaleDateString("en", {weekday: "long",});
				const icon = value.weather[0].icon;
				const description = value.weather[0].description;
				const temp = value.temp.day;
				const humidity = value.humidity;
				const speed = value.wind_speed;
				//console.log(dayname,icon,temp,description,humidity);

				document.querySelector(`.day${index}`).innerText = dayname;
				//console.log(document.querySelector(`.d${index}_icon`).innerHTML = `<img src ="https://openweathermap.org/img/wn/${icon}.png";/>`);
				document.querySelector(`.d${index}_icon`).innerHTML = `<img src ="https://openweathermap.org/img/wn/${icon}.png";/>`
				document.querySelector(`.d${index}_description`).innerText = description;
				document.querySelector(`.d${index}_temperature`).innerText = temp + "°C";
				document.querySelector(`.d${index}_humidity`).innerText = "Humidity "+humidity+"%";
				document.querySelector(`.d${index}_speed`).innerText = "Wind Speed " + speed + " Km/h";
				// console.log(value);

			}
		});

		// console.log(data);
	}

	// major_cities(){
	// 	const arr = ["kolkata","Mumbai","Delhi","Chennai","Nagaland"];
	// 	for (var i = 0; i <= 5; i++) {
	// 		this.fetchLocationValues(arr[i],apikey);
	// 	}
	// }

	// major_cities_fetch(lat,lon,apikey){
	// 	test = test+1;
	// 		fetch("http://api.openweathermap.org/data/3.0/onecall?lat="
	// 			+lat
	// 			+"&lon="
	// 			+lon
	// 			+"&units=metric&appid="
	// 			+apikey
	// 		)
	// 	.then((response) => response.json())
	// 	.then((data) => this.major_cities_display(data,test));
	// 	console.log(test);
	// }

	// major_cities_display(data){
	// 	// console.log(arr);
	// 	// console.log(data);

	// 	const temp = data.daily[0].temp.day;
	// 	const icon = data.daily[0].weather[0].icon;
	// 	const summary = data.daily[0].summary;

	// 	document.querySelector(`.city${test}_temperature`).innerText = temp + "°C";
	// 	document.querySelector(`.city${test}_icon`).innerHTML = `<img src ="https://openweathermap.org/img/wn/${icon}.png";/>`
	// 	document.querySelector(`.city${test}_summary`).innerText = summary;

		// for (var i = 1; i <= 5; i++) {

		// 	const temp = data.daily[0].temp.day;
		// 	const icon = data.daily[0].weather[0].icon;
		// 	const summary = data.daily[0].summary;

		// 	document.querySelector(`.city${i}_temperature`).innerText = temp + "°C";
		// 	document.querySelector(`.city${i}_icon`).innerHTML = `<img src ="https://openweathermap.org/img/wn/${icon}.png";/>`
		// 	document.querySelector(`.city${i}_summary`).innerText = summary;
		// 	// console.log(temp);
		// }
	// }

	fetchLocationValues(location,apikey)
	{
		fetch(
			"http://api.openweathermap.org/geo/1.0/direct?q="
			+location
			+"&limit=1&appid="
			+apikey
			)
		.then((response) => response.json())
		.then((data) => this.getData(data,apikey))
		//.then((data) => console.log(data))
	}

	getData(data,apikey)
	{
		const {lat,lon} = data[0];
		this.fetchDaily(lat,lon,apikey);
		this.fetchWeather(lat,lon,apikey);
		// this.major_cities_fetch(lat,lon,apikey);
	}

	fetchWeather(lat,lon,apikey){
		fetch(
				"https://api.openweathermap.org/data/2.5/weather?lat="
				+lat
				+"&lon="
				+lon
				+"&appid="
				+apikey
				+"&units=metric"
			)
		.then((response) => response.json())
		.then((data) => this.displayWeather(data));
	}

	displayWeather(data){
		const {name} = data;
		const {icon,description} = data.weather[0];
		const {temp,humidity} = data.main;
		const {speed} = data.wind;
		//console.log(name,icon,description,temp,humidity,speed);
		document.querySelector('body').style.backgroundImage = "url(https://source.unsplash.com/1600x900/?"+description+")";
		document.querySelector(`.city`).innerText = "Weather in " + name;
		document.querySelector(".icon").innerHTML = `<img src ="https://openweathermap.org/img/wn/${icon}.png";/>`;
		document.querySelector(".description").innerText = description;
		document.querySelector(".temperature").innerText = temp + "°C";
		document.querySelector(".humidity").innerText = "Humidity "+humidity+"%";
		document.querySelector(".speed").innerText = "Wind Speed " + speed + " Km/h";
	}
}

const value = new Weather("Dimapur");

document.querySelector(".logo_search button").addEventListener("click",function()
	{
		const val = (document.querySelector(".search_bar").value);
		const value = new Weather(val);
	});