document.querySelector("#submit").addEventListener("click", searchCity);
document.querySelector("#submitCustom").addEventListener("click", searchCityCustom);

// document.getElementById("dateCustom").min = new Date().getFullYear() + "-" +  parseInt(new Date().getMonth() + 1 ) + "-" + new Date().getDate()

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yyyy = today.getFullYear();
let hh = String(today.getHours()).padStart(2, '0');
today = yyyy + "-" + mm + "-" + dd + " " + hh + ":00:00";

function searchCity(e) {
    e.preventDefault();
    let city = document.querySelector("#city");
    callApi(city.value);
    city.value = "";
}

function searchCityCustom(e) {
    e.preventDefault();
    let cityCustom = document.querySelector("#cityCustom");
    callApiCustom(cityCustom.value);
    cityCustom.value = "";
}

function callApiCustom(cityCustom) {
    let url = "https://api.meteo.lt/v1/places/" + cityCustom + "/forecasts/long-term";
    fetch(url)
    .then(response => {return response.json(); })
    .then(data => {printToConsoleCustom(data)})
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
function printToConsoleCustom(data) {
    const forecastContainer = document.getElementById("forecast-container2");
    const cityNameElement = document.getElementById("city-name2");
    const forecastTimeElement = document.getElementById("forecast-time2");
    const airTemperatureElement = document.getElementById("air-temperature2");
    const feelsLikeTemperatureElement = document.getElementById("feels-like-temperature2");
    const windSpeedElement = document.getElementById("wind-speed2");
    const windGustElement = document.getElementById("wind-gust2");
    const windDirectionElement = document.getElementById("wind-direction2");
    const cloudCoverElement = document.getElementById("cloud-cover2");
    const seaLevelPressureElement = document.getElementById("sea-level-pressure2");
    const relativeHumidityElement = document.getElementById("relative-humidity2");
    const totalPrecipitationElement = document.getElementById("total-precipitation2");
    const conditionCodeElement = document.getElementById("condition-code2");

    for (let i = 0; i < data.forecastTimestamps.length; i++) {

        const formattedForecastTime = data.forecastTimestamps[i].forecastTimeUtc.slice(0, 10);
        console.log(formattedForecastTime);

        // document.addEventListener('DOMContentLoaded', (event) => {
        //     const dateInput = document.getElementById('myDate');
        //     const today = new Date().toISOString().split('T')[0];
        //     dateInput.setAttribute('min', today);
        // });
        
        let dd = new Date(document.querySelector("#dateCustom").value).getDate().toString().padStart(2, '0');
        let mm = (new Date(document.querySelector("#dateCustom").value).getMonth() + 1).toString().padStart(2, '0');
        let yyyy = new Date(document.querySelector("#dateCustom").value).getFullYear();

        d = yyyy + "-" + mm + "-" + dd;
        console.log(d);

        if (formattedForecastTime == d) {
            cityNameElement.textContent = data.place.name;
            forecastTimeElement.textContent = data.forecastTimestamps[i].forecastTimeUtc;
            airTemperatureElement.textContent = data.forecastTimestamps[i].airTemperature;
            feelsLikeTemperatureElement.textContent = data.forecastTimestamps[i].feelsLikeTemperature;
            windSpeedElement.textContent = data.forecastTimestamps[i].windSpeed;
            windGustElement.textContent = data.forecastTimestamps[i].windGust;
            windDirectionElement.textContent = data.forecastTimestamps[i].windDirection;
            cloudCoverElement.textContent = data.forecastTimestamps[i].cloudCover;
            seaLevelPressureElement.textContent = data.forecastTimestamps[i].seaLevelPressure;
            relativeHumidityElement.textContent = data.forecastTimestamps[i].relativeHumidity;
            totalPrecipitationElement.textContent = data.forecastTimestamps[i].totalPrecipitation;
            conditionCodeElement.textContent = data.forecastTimestamps[i].conditionCode;

            forecastContainer.style.display = "block";
            break;
        } 
    }
}