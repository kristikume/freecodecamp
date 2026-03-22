const getWeatherBtn = document.getElementById("get-weather-btn");
const selectValue = document.getElementById("location-selector");
const weatherIcon = document.getElementById("weather-icon");
const mainTemp = document.getElementById("main-temperature");
const feelsLike = document.getElementById("feels-like");
const humidityValue = document.getElementById("humidity");
const windValue = document.getElementById("wind");
const windGust = document.getElementById("wind-gust");
const weatherMain = document.getElementById("weather-main");
const locationVal = document.getElementById("location");

const getWeather = async (city) => {
  try {
    const respond = await fetch(
      `https://weather-proxy.freecodecamp.rocks/api/city/${city}`,
    );
    const data = await respond.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    alert("Something went wrong, please try again later");
  }
};

const showWeather = async (city) => {
  if (!city) return;

  const data = await getWeather(city);
  if (!data || data.error) {
    alert("Something went wrong, please try again later");
  }
  const {
    weather: [{ main, icon }],
    main: { temp, feels_like, humidity },
    wind: { speed, gust },
  } = data;

  const valOrNo = (val) => (val !== undefined ? val : "N/A");

  mainTemp.innerText = `${valOrNo(temp)}° C`;
  feelsLike.innerText = `Feels Like: ${valOrNo(feels_like)}° C`;
  humidityValue.innerText = `Humidity: ${valOrNo(humidity)}%`;
  windValue.innerText = `Wind: ${valOrNo(speed)} m/s`;
  windGust.innerText = `Gusts: ${valOrNo(gust)} m/s`;
  weatherMain.innerText = `${valOrNo(main)}`;
  weatherIcon.src = `${icon}`;
  locationVal.innerText = `${selectValue.value.toUpperCase()}`;
};

getWeatherBtn.addEventListener("click", () => {
  showWeather(selectValue.value);
});
