let time = new Date();
let h1 = document.querySelector("h1");
let hour = time.getHours();
let minutes = time.getMinutes();
if (hour < 10) {
  hour = "0" + hour;
}
if (minutes < 10) {
  minutes = "0" + minutes;
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
let day = days[time.getDay(4)];
h1.innerHTML = `${day} ${hour}:${minutes}`;

function search(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city");
  let cityInput = document.querySelector("#search-city-input");
  cityName.innerHTML = `${cityInput.value}`;
  let apiKey = "becb19409cb41e373fb4a611d804ed95";
  let city = cityInput.value;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(getTemperature);
}
function getTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityTemp = document.querySelector("#temp");
  cityTemp.innerHTML = `${temperature}`;
  let cityName = document.querySelector("#city");
  cityName.innerHTML = response.data.name;
  let description = document.querySelector("#temp-description");
  description.innerHTML = response.data.weather[0].description;
  let displayHumidity = document.querySelector("#humidity");
  displayHumidity.innerHTML = response.data.main.humidity;
  let displayWind = document.querySelector("#wind");
  displayWind.innerHTML = response.data.wind.speed;
  let realFeelTemp = Math.round(response.data.main.feels_like);
  let displayRealFeelTemp = document.querySelector("#real-feel");
  displayRealFeelTemp.innerHTML = `${realFeelTemp}`;
  let maxTemp = Math.round(response.data.main.temp_max);
  let displayMaxTemp = document.querySelector("#max-temp");
  displayMaxTemp.innerHTML = `${maxTemp}`;
  let minTemp = Math.round(response.data.main.temp_min);
  let displayMinTemp = document.querySelector("#min-temp");
  displayMinTemp.innerHTML = `${minTemp}`;
}

function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "becb19409cb41e373fb4a611d804ed95";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(getTemperature);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showLocation);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentPosition);
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
