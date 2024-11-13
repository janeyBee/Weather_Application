function refreshWeather(response) {
  let temperatureElement = document.querySelector('#temperature');
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector('#city');
  let descriptionElement = document.querySelector('#description');
  let humidityElement = document.querySelector('#humidity');
  let windspeedElement = document.querySelector('#windspeed');
  let timeElement = document.querySelector('#time');
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector('#icon');

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  temperatureElement.innerHTML = Math.round(temperature);
  windspeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather_app_icon" />`;
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = '8c03b3b1a26568f726tbe9f7fo7f441d';
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector('#searchFormInput');

  searchCity(searchInput.value);
}

function displayForecast() {
  let days = ['Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let forecastHtml = '';

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="weather_forecast_day">
<div class="weather_forecast_date">${day}</div>
<div class="weather_forecast_icon">☀️</div>
<div class="weather_forecast_temperatures">
  <div class="weather_forecast_temperature"><strong>15°</strong></div>
  <div class="weather_forecast_temperature_low">9°</div>
</div>
</div>`;
  });

  let forecastElement = document.querySelector('#forecast');
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector('#search_form');
searchFormElement.addEventListener('submit', handleSearchSubmit);

searchCity('Amsterdam');
displayForecast();
