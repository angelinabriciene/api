const cityBackgrounds = {
    "Kaunas": "20160816_kaunas-castle_16-9.jpg",
    "Vilnius": "Vilnius_Cathedral_20.jpg",
    "Elektrėnai": "elikai.jpg"
  };

document.querySelector("#submit").addEventListener("click", searchCity);
document.querySelector("#submitCustom").addEventListener("click", searchCityCustom);
const searchInput = document.querySelector("#city");
searchInput.addEventListener("input", updateBackground);

function updateBackground() {
    const userInput = searchInput.value.trim().toLowerCase();
    const cityKeys = Object.keys(cityBackgrounds);
    for (const city of cityKeys) {
      if (city.toLowerCase() == userInput) {
        document.body.style.backgroundImage = `url('${cityBackgrounds[city]}')`;
        return;
      }
    }
    document.body.style.backgroundImage = `url('bbb.jpg')`;
  }

  updateBackground();

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
    // gauti elementus iš html
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
  
    // gauti paduotą datą
    const dateCustom = document.querySelector("#dateCustom").value;
    const dateCustomObj = new Date(dateCustom);
    const dateCustomYear = dateCustomObj.getFullYear();
    const dateCustomMonth = dateCustomObj.getMonth() + 1;
    const dateCustomDay = dateCustomObj.getDate();
  
    // sukurti lentelę
    const table = document.createElement("table");
    table.classList.add("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
  
    // lentelės headeris
    const headerRow = document.createElement("tr");
    const headers = ["Prognozės laikas", "Oro temperatūra", "Jutiminė temperatūra", "Vėjo greitis m/s", "Vėjo gūsiai", "Vėjo kryptis", "Debesuotumas %", "Oro slėgis", "Dregmė %", "Total Precipitation", "Prognozė"];
    headers.forEach(header => {
      const th = document.createElement("th");
      th.textContent = header;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);
  
    // gauti stampus per cikla
    data.forecastTimestamps.forEach(forecast => {
      const forecastTime = new Date(forecast.forecastTimeUtc);
      const forecastYear = forecastTime.getFullYear();
      const forecastMonth = forecastTime.getMonth() + 1;
      const forecastDay = forecastTime.getDate();
  
      // sulyginti datas pradėti eilę
      if (forecastYear == dateCustomYear && forecastMonth == dateCustomMonth && forecastDay == dateCustomDay) {
        cityNameElement.textContent = data.place.name;
        const row = document.createElement("tr");
  
        // sukurti vietas ir padėti gautus duomenis
        const forecastTimeCell = document.createElement("td");
        forecastTimeCell.textContent = forecast.forecastTimeUtc;
        row.appendChild(forecastTimeCell);
  
        const airTemperatureCell = document.createElement("td");
        airTemperatureCell.textContent = forecast.airTemperature;
        row.appendChild(airTemperatureCell);
  
        const feelsLikeTemperatureCell = document.createElement("td");
        feelsLikeTemperatureCell.textContent = forecast.feelsLikeTemperature;
        row.appendChild(feelsLikeTemperatureCell);
  
        const windSpeedCell = document.createElement("td");
        windSpeedCell.textContent = forecast.windSpeed;
        row.appendChild(windSpeedCell);
  
        const windGustCell = document.createElement("td");
        windGustCell.textContent = forecast.windGust;
        row.appendChild(windGustCell);
  
        const windDirectionCell = document.createElement("td");
        windDirectionCell.textContent = forecast.windDirection;
        row.appendChild(windDirectionCell);
  
        const cloudCoverCell = document.createElement("td");
        cloudCoverCell.textContent = forecast.cloudCover;
        row.appendChild(cloudCoverCell);
  
        const seaLevelPressureCell = document.createElement("td");
        seaLevelPressureCell.textContent = forecast.seaLevelPressure;
        row.appendChild(seaLevelPressureCell);
  
        const relativeHumidityCell = document.createElement("td");
        relativeHumidityCell.textContent = forecast.relativeHumidity;
        row.appendChild(relativeHumidityCell);
  
        const totalPrecipitationCell = document.createElement("td");
        totalPrecipitationCell.textContent = forecast.totalPrecipitation;
        row.appendChild(totalPrecipitationCell);
  
        const conditionCodeCell = document.createElement("td");
        conditionCodeCell.textContent = forecast.conditionCode;
        row.appendChild(conditionCodeCell);
  
        tbody.appendChild(row);
      }
      if (tbody.childElementCount == 0) {
        const noDataMessageElement = document.getElementById("no-data-message");
        noDataMessageElement.textContent = "Duomenų nėra, rinkitės kitą datą. Prognozė pateikiama nuo dabartinio laiko iki savaitės į priekį";
      } else {
        const noDataMessageElement = document.getElementById("no-data-message");
        noDataMessageElement.style.display = "none";
    }
    });

    table.appendChild(tbody);

    forecastContainer.innerHTML = "";
    forecastContainer.appendChild(table);
  }