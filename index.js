import {
  getCityWeather,
  getUltravioletIndex,
  ICON_OBJECT,
  getCountries,
  getCities
} from "./api.js";

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

// Agregando selector de pais
async function addCountriesToSelect() {
  //obtener la api
  const countries = await getCountries();
  //obtener el selector y ponerlo en blanco
  let dropdown = document.getElementById("locality-dropdown");
  dropdown.length = 0;
  //seleccionar los valores del selector y poner como default escoger el pais
  let defaultOption = document.createElement("option");
  defaultOption.text = "Choose country";

  dropdown.add(defaultOption);
  dropdown.selectedIndex = 0;

  countries.forEach(country => {
    let option = document.createElement("option");
    option.text = country.name;
    dropdown.add(option);
  });
}

addCountriesToSelect();

//agregando selector de ciudad
async function addCitiesToSelect() {
  //obtener la api
  const cities = await getCities();
  console.log(cities);
  //obtener el selector y ponerlo en blanco
  let dropdownCity = document.getElementById("locality-dropdown-city");
  dropdownCity.length = 0;
  //seleccionar los valores del selector y poner como default escoger el pais
  let defaultOption = document.createElement("option");
  defaultOption.text = "Choose city";

  dropdownCity.add(defaultOption);
  dropdownCity.selectedIndex = 0;

  cities.forEach(city => {
    let option = document.createElement("option");
    option.text = city.name;
    dropdownCity.add(option);
  });
}

addCitiesToSelect();
