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
const switchButtonElm = document.querySelector("#switchButton");
let dropdown = document.getElementById("locality-dropdown");
let dropdownCity = document.getElementById("locality-dropdown-city");

async function renderWeather() {
  const country = dropdown.value;
  const city = dropdownCity.value;

  if (!country || !city) {
    return;
  }

  const weather = await getCityWeather(country, city);
  const lat = weather.coord.lat;
  const lon = weather.coord.lon;
  const ultravioletIndex = await getUltravioletIndex(lat, lon);
  const ultravioletIndexMath = Math.floor(ultravioletIndex.value);
  const iconToShow = ICON_OBJECT[weather.weather[0].icon];
  const description = weather.weather[0].description;

  //Inyectando el nombre de la ciudad
  getCityNameElm.innerHTML = weather.name;
  //inyectando el ultraviolet UV VB
  getUvVIndexElm.innerHTML = `${ultravioletIndexMath}`;
  //inyectando la imagen del coso
  getWeatherImgElm.innerHTML = `<i class="wi ${iconToShow}"></i>`;
  //Inyectando la descripcion del clima
  getDescriptionElm.innerHTML = description;
  console.log(switchButtonElm);
  if (switchButtonElm.checked) {
    //inyectando la temperatura
    getTemperatureElm.innerHTML = `${weather.main_f.temp}°`;
    //inyectando la temperatura min y max
    getMaxAndMinTemperatureElm.innerHTML = `${weather.main_f.temp_min}° / ${weather.main_f.temp_max}°`;
  } else {
    //inyectando la temperatura
    getTemperatureElm.innerHTML = `${weather.main_c.temp}°`;
    //inyectando la temperatura min y max
    getMaxAndMinTemperatureElm.innerHTML = `${weather.main_c.temp_min}° / ${weather.main_c.temp_max}°`;
  }

  //console.log(weather);
}

switchButtonElm.addEventListener("input", renderWeather);

// Agregando selector de pais
async function addCountriesToSelect() {
  //obtener la api
  const countries = await getCountries();

  //obtener el selector y ponerlo en blanco
  dropdown.length = 0;
  //seleccionar los valores del selector y poner como default escoger el pais
  let defaultOption = document.createElement("option");
  defaultOption.text = "Choose country";
  defaultOption.value = "";

  dropdown.add(defaultOption);
  dropdown.selectedIndex = 0;

  countries.forEach(country => {
    let option = document.createElement("option");
    option.text = country.name;
    option.value = country.sortname;
    dropdown.add(option);
  });
}

addCountriesToSelect();

// escuchar el evento del primer selector de paises
dropdown.addEventListener("change", updateValueCountry);
//funcion de callback del evento escuchado
function updateValueCountry(e) {
  const countrySelected = e.target.value;
  addCitiesToSelect(countrySelected);
}

//agregando selector de ciudad
async function addCitiesToSelect(country) {
  const cities = await getCities(country);

  //obtener el selector y ponerlo en blanco
  dropdownCity.length = 0;
  //seleccionar los valores del selector y poner como default escoger el pais
  let defaultOption = document.createElement("option");
  defaultOption.text = "Choose city";
  defaultOption.value = "";

  dropdownCity.add(defaultOption);
  dropdownCity.selectedIndex = 0;

  cities.forEach(city => {
    let option = document.createElement("option");
    option.text = city.name;
    option.value = city.name;
    dropdownCity.add(option);
  });
}

dropdownCity.addEventListener("change", updateValueCity);

function updateValueCity(e) {
  renderWeather();
}
