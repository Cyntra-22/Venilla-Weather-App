function formatDate(timestemp) {
  //calculate Date
  let date = new Date(timestemp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let index = date.getDay();
  let day = days[index];
  return `${day} ${hours}:${minutes}`;
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      ` 
              <div class="col-2">
                <div class="weather_forecast_date">${day}</div>
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAepJREFUaN7tmd2thCAQhSnBEijBEmjgJpZgCZZgCZZgCXZwLcFX3yiBDlhIhhvC5dcdFzeB5LzsTtjz4cwwZomUknyzSANoAA2gATQANICSdZ4nA/Wk0ioGUGY7pVVJKElLXGl6NIAySMGojGh9MsCRMG80Pw5AmRozzRvppzVoGNCk068mwFYI4JPArpMSgB0BwGj5doAVutnsdDNdYwwVAH5o8rTNqzoyGsKIAqAvKETjRkNGQxC5BR8EuMm8vJCO0cKPAXBs83DyXcF9YmvKBoDHfIf5/o2DESUAM7L5HU6eez4fraFwzEwvYQo9BLDfcPrM2dek02jd1vZnOfuyEMCKaH52OwqMGaF04vBdDsQaApgQT546Jy9g/1gtcHgSqUxYQgD0xrwvgR9gn5D6WBtdEC6s6e55KQbQWd3hijqECVakxoq33okzXj03pFpiNQCOT4zfSYCf35MprUpHaBMrhltzlKwOoAx1SkJJgnqPeR3DrRhmXYZY6q8CLJaxP3NOzOzEjOSDKwigT9sxtnvM01RMTYDdMUc9AG5M/wgAnQaOsdljfnBiFlJh/QPwFK4u0C5RuMKNqQngFu7wtMJNAYhUUebE1ATYYoULAFvNwk0BmFuVZty8lFRe7S+mBtAAGkADeFsvKpKWeAy6FowAAAAASUVORK5CYII="
                  alt=""
                  width="42"
                />
                <div class="weather_forecast_temperature">
                  <span class="weather_forecast_temperature_max">18°</span> 
                  <span class="weather_forecast_temperature_min">12°</span> 
                </div>
              </div>
            `;
  });

  forecastHtml = forecastHtml + `</div>`;

  forecastElement.innerHTML = forecastHtml;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "5ef4de8cd6b7fefcd7c42f98cf464ce8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  celciusTemperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(celciusTemperature);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;

  let windElement = document.querySelector("#speed");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.time * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", response.data.condition.icon_url);

  iconElement.setAttribute("alt", response.data.condition.description);
  console.log(response.data);

  getForecast(response.data.coordinates);
}

function search(city) {
  let apiKey = "d01eb3ad3ceo6b4c8t9cf27d410a60cd";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityinputElement = document.querySelector("#city-input");
  search(cityinputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  //remove the active class
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;

  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelciusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;


let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", showCelciusTemperature);

search("New York");
