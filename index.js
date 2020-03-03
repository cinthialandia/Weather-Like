import { getCityWeather } from "./api.js";

const getCityNameElm = document.querySelector(".cityName");
const getWeatherImgElm = document.querySelector(".weatherImg");
console.log(getCityNameElm);

async function init() {
  const weather = await getCityWeather();

  // render

  console.log(weather);
}

init();
