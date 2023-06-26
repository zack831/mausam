class Weather_cities{
	constructor(){
		const apikey = "9bb9485e113f7f8e07520d9f65878e19";
		this.major_cities(apikey);
	}

	fetchLocationValues(location,apikey,i)
	{
		fetch(
			"http://api.openweathermap.org/geo/1.0/direct?q="
			+location
			+"&limit=1&appid="
			+apikey
			)
		.then((response) => response.json())
		.then((data) => this.getData(data,apikey,i))
		// .then((data) => console.log(data))
	}

	getData(data,apikey,i)
	{
		const {lat,lon} = data[0];
		this.major_cities_fetch(lat,lon,apikey,i);
	}

	major_cities(apikey){
		const arr = ["NULL","kolkata","Mumbai","Delhi","Chennai","Dimapur"];
		for (var i = 1; i <= 5; i++) {
			this.fetchLocationValues(arr[i],apikey,i);
		}
	}

	major_cities_fetch(lat,lon,apikey,i){
			fetch("http://api.openweathermap.org/data/3.0/onecall?lat="
				+lat
				+"&lon="
				+lon
				+"&units=metric&appid="
				+apikey
			)
		.then((response) => response.json())
		.then((data) => this.major_cities_display(data,i));
		// console.log(test);
	}

	major_cities_display(data,i){

		//console.log(data)
		const temp = data.current.temp;
		const icon = data.daily[0].weather[0].icon;
		const summary = data.daily[0].summary;

		document.querySelector(`.city${i}_temperature`).innerText = temp + "°C";
		document.querySelector(`.city${i}_icon`).innerHTML = `<img src ="https://openweathermap.org/img/wn/${icon}.png";/>`
		document.querySelector(`.city${i}_summary`).innerText = summary;

		// for (var i = 1; i <= 5; i++) {

		// 	const temp = data.daily[0].temp.day;
		// 	const icon = data.daily[0].weather[0].icon;
		// 	const summary = data.daily[0].summary;

		// 	document.querySelector(`.city${i}_temperature`).innerText = temp + "°C";
		// 	document.querySelector(`.city${i}_icon`).innerHTML = `<img src ="https://openweathermap.org/img/wn/${icon}.png";/>`
		// 	document.querySelector(`.city${i}_summary`).innerText = summary;
		// 	// console.log(temp);
		// }
	}
}

const city = new Weather_cities();
