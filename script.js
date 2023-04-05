const errorLabel = document.querySelector("label[for='error-msg']")
const latInp = document.getElementById("latitude")
const lonInp = document.getElementById("longitude")
const airQuality = document.querySelector(".air-quality")
const airQualityStat = document.querySelector(".air-quality-status")
const srchBtn = document.querySelector(".search-btn")
const componentsEle = document.querySelectorAll(".component-val")


const appId = "9f4f7afc73e09022de56a6c34ea10469" // Get your own API Key from https://home.openweathermap.org/api_keys
const link = "https://api.openweathermap.org/data/2.5/air_pollution"	// API end point

/* function randomNumber(min, max) {
	return Math.random()*(max-min)
}

console.log(randomNumber(50,100)) */

const getUserLocation = () => {
	// Get user Location
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(onPositionGathered, onPositionGatherError)
	} else {
		onPositionGatherError({ message: "Can't Access your location. Please enter your co-ordinates" })
	}
}

const onPositionGathered = (pos) => {
	let lat = pos.coords.latitude.toFixed(4), lon = pos.coords.longitude.toFixed(4)
	// Set values of Input for user to know
	latInp.value = lat
	lonInp.value = lon

	// Get Air data from weather API
	getAirQuality(lat, lon)
}

const getAirQuality = async (lat, lon) => {
	// Get data from api
	const rawData = await fetch(`${link}?lat=${lat}&lon=${lon}&appid=${appId}`).catch(err => {
		onPositionGatherError({ message: "Something went wrong. Check your internet conection." })
		console.log(err)
	})
	const airData = await rawData.json()
	setValuesOfAir(airData)
	setComponentsOfAir(airData)
}

const setValuesOfAir = airData => {
	const aqi = airData.list[0].main.aqi
	let airStat = "", color = ""

	// Set Air Quality Index

	// Set status of air quality
	
	switch (aqi) {
			case 1:
				airQuality.innerText = "0-50"
				airStat = "Good"
				color = "rgb(19, 201, 28)"
				break
			case 2:
				airQuality.innerText = "50-100"
				airStat = "Fair"
				color = "rgb(15, 134, 25)"
				break
			case 3:
				airQuality.innerText = "100-200"
				airStat = "Moderate"
				color = "rgb(201, 204, 13)"
				break
			case 4:
				airQuality.innerText = "200-300"
				airStat = "Poor"
				color = "rgb(204, 83, 13)"
				break
			case 5:
			airQuality.innerText = ">300"
			airStat = "Very Poor"
			color = "rgb(204, 13, 13)"
			break
			
			default:
			airStat = "Unknown"
	}

	switch (aqi) {
		case 1:
			airQuality.innerText = "0-50"
			airStat = "Good"
			// airstat ="The air quality is cosidered satisfactory, and air pollution poses little or no threat."
			color = "rgb(19, 201, 28)"
			break
		case 2:
			airQuality.innerText = "50-100"
			airStat = "Fair"
			color = "rgb(15, 134, 25)"
			break
		case 3:
			airQuality.innerText = "100-200"
			airStat = "Moderate"
			color = "rgb(201, 204, 13)"
			break
		case 4:
			airQuality.innerText = "200-300"
			airStat = "Poor"
			color = "rgb(204, 83, 13)"
			break
		case 5:
		airQuality.innerText = ">300"
		airStat = "Very Poor"
		color = "rgb(204, 13, 13)"
		break
		
		default:
		airStat = "Unknown"
}

	airQualityStat.innerText = airStat
	airQualityStat.style.color = color
}

const setComponentsOfAir = airData => {
	let components = {...airData.list[0].components}
	componentsEle.forEach(ele => {
		const attr = ele.getAttribute('data-comp')
		ele.innerText = components[attr] += " μg/m³"
	})
}

const onPositionGatherError = e => {
	errorLabel.innerText = e.message
}

srchBtn.addEventListener("click", () => {
	getAirQuality(parseFloat(latInp.value).toFixed(4), parseFloat(lonInp.value).toFixed(4))
})

getUserLocation()
