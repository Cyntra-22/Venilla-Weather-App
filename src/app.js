function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;

  let windElement = document.querySelector("#speed");
  windElement.innerHTML = Math.round(response.data.wind.speed);

}

let apiKey = "d01eb3ad3ceo6b4c8t9cf27d410a60cd";
let apiUrl =
  "https://api.shecodes.io/weather/v1/current?query=New York&key=d01eb3ad3ceo6b4c8t9cf27d410a60cd&units=metric";

axios.get(apiUrl).then(displayTemperature);
