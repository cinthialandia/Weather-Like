async function weatherApi() {
  const response = await fetch(
    "http://api.openweathermap.org/data/2.5/weather?q=london,uk&appid=849b886201ff69a029a2a86bc89f394a"
  );
  const data = await response.json();
  console.log(data);
  return data;
}

weatherApi();
