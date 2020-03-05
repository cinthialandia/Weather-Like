import { getCityWeather, getUltravioletIndex, ICON_OBJECT } from "./api.js";

const getCityNameElm = document.querySelector(".cityName");
const getWeatherImgElm = document.querySelector(".wi");
const getTemperatureElm = document.querySelector(".temperature");
const getMaxAndMinTemperatureElm = document.querySelector(
  ".maxAndMinTemperature"
);
const getUvVIndexElm = document.querySelector(".UvVbIndex");

async function init() {
  const weather = await getCityWeather();
  const lat = weather.coord.lat;
  const lon = weather.coord.lon;
  const ultravioletIndex = await getUltravioletIndex(lat, lon);
  const ultravioletIndexMath = Math.floor(ultravioletIndex.value);
  const iconToShow = ICON_OBJECT[weather.weather[0].icon];
  console.log(iconToShow);

  //Inyectando el nombre de la ciudad
  getCityNameElm.innerHTML = weather.name;
  //inyectando la temperatura
  getTemperatureElm.innerHTML = `${weather.main_c.temp}°`;
  //inyectando la temperatura min y max
  getMaxAndMinTemperatureElm.innerHTML = `${weather.main_c.temp_min}° / ${weather.main_c.temp_max}°`;
  //inyectando el ultraviolet UV VB
  getUvVIndexElm.innerHTML = `${ultravioletIndexMath}`;
  //inyectando la imagen del coso
  getWeatherImgElm.innerHTML = `<i class="wi ${iconToShow}"></i>`;

  console.log(weather);
}

init();
