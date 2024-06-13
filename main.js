console.log("Hello world!");

document.querySelector("#submit").addEventListener("click", searchCity);

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yyyy = today.getFullYear();
let hh = today.getHours();
today = yyyy + "-" + mm + "-" + dd + " " + hh + ":00:00";
console.log(today);

function searchCity(e) {
    e.preventDefault();
    let city = document.querySelector("#city");
    callApi(city.value);
    city.value = "";
}

function callApi(city) {
    let url = "https://api.meteo.lt/v1/places/" + city + "/forecasts/long-term";
    fetch(url)
    .then(response => {return response.json(); })
    .then(data => {printToConsole(data)})
}

function printToConsole(data) {
    const forecastContainer = document.getElementById("forecast-container");
    const cityNameElement = document.getElementById("city-name");
    const forecastTimeElement = document.getElementById("forecast-time");
    const airTemperatureElement = document.getElementById("air-temperature");
    const feelsLikeTemperatureElement = document.getElementById("feels-like-temperature");
    const windSpeedElement = document.getElementById("wind-speed");
    const windGustElement = document.getElementById("wind-gust");
    const windDirectionElement = document.getElementById("wind-direction");
    const cloudCoverElement = document.getElementById("cloud-cover");
    const seaLevelPressureElement = document.getElementById("sea-level-pressure");
    const relativeHumidityElement = document.getElementById("relative-humidity");
    const totalPrecipitationElement = document.getElementById("total-precipitation");
    const conditionCodeElement = document.getElementById("condition-code");

    for (let i = 0; i < data.forecastTimestamps.length; i++) {
        const formattedForecastTime = data.forecastTimestamps[i].forecastTimeUtc;
        
        if (formattedForecastTime == today) {
            cityNameElement.textContent = data.place.name;
            forecastTimeElement.textContent = data.forecastTimestamps[i].forecastTimeUtc;
            airTemperatureElement.textContent = "Oro temperatūra: " + data.forecastTimestamps[i].airTemperature;
            feelsLikeTemperatureElement.textContent = "Jutiminė temperatūra: " + data.forecastTimestamps[i].feelsLikeTemperature;
            windSpeedElement.textContent = "Vėjo greitis m/s: " + data.forecastTimestamps[i].windSpeed;
            windGustElement.textContent = "Vėjo gūsiai: " + data.forecastTimestamps[i].windGust;
            windDirectionElement.textContent = "Vėjo kryptis: " + data.forecastTimestamps[i].windDirection;
            cloudCoverElement.textContent = "Debesuotumas %: " + data.forecastTimestamps[i].cloudCover;
            seaLevelPressureElement.textContent = "Oro slėgis: " + data.forecastTimestamps[i].seaLevelPressure;
            relativeHumidityElement.textContent = "Dregmė %: " + data.forecastTimestamps[i].relativeHumidity;
            totalPrecipitationElement.textContent = "Total Precipitation: " + data.forecastTimestamps[i].totalPrecipitation;
            conditionCodeElement.textContent = "Prognozė: " + data.forecastTimestamps[i].conditionCode;

            forecastContainer.style.display = "block";
            break;
        }
    }
}