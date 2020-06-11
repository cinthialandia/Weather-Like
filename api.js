const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";
const ULTRAVIOLET_API_URL = "https://api.openweathermap.org/data/2.5/uvi";
const API_ID = "849b886201ff69a029a2a86bc89f394a";

//icons to render on the screen according to the weather
export const ICON_OBJECT = {
  "01d": "wi-day-sunny",
  "01n": "wi-night-clear",
  "02d": "wi-day-cloudy",
  "02n": "wi-night-alt-cloudy",
  "03d": "wi-night-alt-partly-cloudy",
  "03n": "wi-night-cloudy",
  "04d": "wi-cloudy",
  "04n": "wi-cloudy",
  "09d": "wi-day-rain-mix",
  "09n": "wi-night-alt-showers",
  "10d": "wi-day-rain",
  "10n": "wi-night-alt-rain-wind",
  "11d": "wi-day-storm-showers",
  "11n": "wi-night-alt-storm-showers",
  "13d": "wi-snowflake-cold",
  "13n": "wi-snowflake-cold",
  "50d": "wi-fog",
  "50n": "wi-fog",
};
//function that makes the request to the api with the weather information
export async function getCityWeather(country, city) {
  const requestURL = `${WEATHER_API_URL}?q=${city},${country}&appid=${API_ID}`;
  const response = await fetch(requestURL);
  const weather = await response.json();

  //temperature converted to C
  weather.main_c = {
    ...weather.main,
    temp: convertKelvinToCelsius(weather.main.temp),
    feels_like: convertKelvinToCelsius(weather.main.temp),
    temp_min: convertKelvinToCelsius(weather.main.temp_min),
    temp_max: convertKelvinToCelsius(weather.main.temp_max),
  };

  //temperature converted to F
  weather.main_f = {
    ...weather.main,
    temp: convertKelvinToFahrenheit(weather.main.temp),
    feels_like: convertKelvinToFahrenheit(weather.main.temp),
    temp_min: convertKelvinToFahrenheit(weather.main.temp_min),
    temp_max: convertKelvinToFahrenheit(weather.main.temp_max),
  };

  return weather;
}

function convertKelvinToCelsius(temperature) {
  // Save in a variable kelvin temperature
  const kelvin = temperature;
  //converting kelvin to Celsius
  const kelvinToCelsius = kelvin - 273;
  return Math.floor(kelvinToCelsius);
}

function convertKelvinToFahrenheit(temperature) {
  // Save in a variable kelvin temperature
  const kelvin = temperature;
  //Convert kelvin to Fahrenheit
  const kelvinTofahrenheit = (kelvin - 273.15) * 1.8 + 32;
  //Rounding down fahrenheit
  return Math.floor(kelvinTofahrenheit);
}
//function that requests the UV information to the api
export async function getUltravioletIndex(lat, lon) {
  const requestURL = `${ULTRAVIOLET_API_URL}?appid=${API_ID}&lat=${lat}&lon=${lon}`;
  const response = await fetch(requestURL);
  const ultravioletIndex = await response.json();
  return ultravioletIndex;
}
//function that requests the country to the api
export async function getCountries() {
  const requestURL =
    "https://us-central1-countries-and-cities-api.cloudfunctions.net/api/countries";
  const response = await fetch(requestURL);
  const countries = await response.json();
  return countries;
}
//function that requests the cities to the api
export async function getCities(country) {
  const requestURL = `https://us-central1-countries-and-cities-api.cloudfunctions.net/api/countries/${country}/cities`;
  const response = await fetch(requestURL);
  const cities = await response.json();
  return cities;
}
