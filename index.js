import { getCityWeather, getUltravioletIndex, ICON_OBJECT } from "./api.js";

const getCityNameElm = document.querySelector(".cityName");
const getWeatherImgElm = document.querySelector(".wi");
const getTemperatureElm = document.querySelector(".temperature");
const getMaxAndMinTemperatureElm = document.querySelector(
  ".maxAndMinTemperature"
);
const getUvVIndexElm = document.querySelector(".UvVbIndex");
const getDescriptionElm = document.querySelector(".description");
const switchButtonElm = document.querySelector(".coso");

async function init() {
  const weather = await getCityWeather();
  const lat = weather.coord.lat;
  const lon = weather.coord.lon;
  const ultravioletIndex = await getUltravioletIndex(lat, lon);
  const ultravioletIndexMath = Math.floor(ultravioletIndex.value);
  const iconToShow = ICON_OBJECT[weather.weather[0].icon];
  const description = weather.weather[0].description;

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
  //Inyectando la descripcion del clima
  getDescriptionElm.innerHTML = description;

  //console.log(weather);
}

init();

switchButtonElm.addEventListener("input", handleSwitch);

async function handleSwitch(e) {
  console.log(e.target.checked);

  if (e.target.checked === true) {
    const weather = await getCityWeather();
    //inyectando la temperatura
    getTemperatureElm.innerHTML = `${weather.main_f.temp}°`;
    //inyectando la temperatura min y max
    getMaxAndMinTemperatureElm.innerHTML = `${weather.main_f.temp_min}° / ${weather.main_f.temp_max}°`;
  } else {
    const weather = await getCityWeather();
    //inyectando la temperatura
    getTemperatureElm.innerHTML = `${weather.main_c.temp}°`;
    //inyectando la temperatura min y max
    getMaxAndMinTemperatureElm.innerHTML = `${weather.main_c.temp_min}° / ${weather.main_c.temp_max}°`;
  }
}

// cosa de input
