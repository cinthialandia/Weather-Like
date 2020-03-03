const WEATHER_API_URL = "http://api.openweathermap.org/data/2.5/weather";
const ULTRAVIOLET_API_URL = "http://api.openweathermap.org/data/2.5/uvi?appid=";
const API_ID = "849b886201ff69a029a2a86bc89f394a";

export async function getCityWeather(city = "sydney", state = "nsw") {
  const requestURL = `${WEATHER_API_URL}?q=${city},${state}&appid=${API_ID}`;
  const response = await fetch(requestURL);
  const weather = await response.json();

  // pasar temperaturas a C
  weather.main_c = {
    ...weather.main,
    temp: convertKelvinToCelsius(weather.main.temp),
    feels_like: convertKelvinToCelsius(weather.main.temp),
    temp_min: convertKelvinToCelsius(weather.main.temp_min),
    temp_max: convertKelvinToCelsius(weather.main.temp_max)
  };

  // pasar temperaturas a F
  weather.main_f = {
    ...weather.main,
    temp: convertKelvinToFahrenheit(weather.main.temp),
    feels_like: convertKelvinToFahrenheit(weather.main.temp),
    temp_min: convertKelvinToFahrenheit(weather.main.temp_min),
    temp_max: convertKelvinToFahrenheit(weather.main.temp_max)
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

async function getUltravioletIndex(lat, lon) {
  async function getLatAndLon() {
    const weather = await getCityWeather();
    const lat = weather.coord.lat;
    const lon = weather.coord.lon;
  }
  getLatAndLon();
}

getUltravioletIndex();

//const requestURL = `${ULTRAVIOLET_API_URL}${API_ID}&lat=${lat}&lon=${lon}`;
