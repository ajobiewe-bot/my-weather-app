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
h1.innerHTML = `Last updated: ${day} ${hour}:${minutes}`;

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
  let cityTemp = document.querySelector("#temp");
  let cityName = document.querySelector("#city");
  let description = document.querySelector("#temp-description");
  let displayHumidity = document.querySelector("#humidity");
  let displayWind = document.querySelector("#wind");
  let displayRealFeelTemp = document.querySelector("#real-feel");
  let displayMaxTemp = document.querySelector("#max-temp");
  let displayMinTemp = document.querySelector("#min-temp");
  let iconElement = document.querySelector("#icon");
  celsiusTemperature = response.data.main.temp;
  cityTemp.innerHTML = Math.round(celsiusTemperature);
  cityName.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  displayHumidity.innerHTML = response.data.main.humidity;
  displayWind.innerHTML = response.data.wind.speed;
  displayRealFeelTemp.innerHTML = Math.round(response.data.main.feels_like);
  displayMaxTemp.innerHTML = Math.round(response.data.main.temp_max);
  displayMinTemp.innerHTML = Math.round(response.data.main.temp_min);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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
function showFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let cityTemp = document.querySelector("#temp");
  cityTemp.innerHTML = Math.round(fahrenheitTemperature);
}
function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let cityTemp = document.querySelector("#temp");
  cityTemp.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentPosition);
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);
