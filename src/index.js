import * as storage from './city';

const api = {
  key: "25e0086798dc59c52219880629e8f0c7",
  base: "https://api.openweathermap.org/data/2.5/",
};

//const GOOGLE_API_KEY = 'AIzaSyCcj9Wy9i2HGXAp1nSmJvAbvFHf8JippHg';

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);
window.onload = storage.localStorageCheck();  //callblack function to display localStorage



function setQuery(evt) {
  if (evt.keyCode == 13) {
    if (searchbox.value.length === 0) {
      alert("Enter city for searching");
    } 
    else {
      getResults(searchbox.value);
      storage.favouritesEvent(searchbox);
      storage.inputExistCheck(searchbox.value);
    }
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      //checking GET request status, >= 400, so display alert (client error) from server
      if (weather.status >= 400) {
        alert("City not found.");
      }
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  let city = document.querySelector(".location .city");
  let currentDate = new Date();
  let date = document.querySelector(".location .date");
  let temp = document.querySelector(".current .temp");
  let weather_el = document.querySelector(".current .weather");
  let highTemp = document.querySelector(".highTemp");
  let lowTemp = document.querySelector(".lowTemp");
  let narrows = document.getElementById('up-down-narrows');

  city.innerText = `${weather.name}, ${weather.sys.country}`;
  date.innerText = dateBuilder(currentDate);
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
  weather_el.innerText = weather.weather[0].main;
  highTemp.innerText = `${Math.round(weather.main.temp_max)}°c`;
  lowTemp.innerText = `${Math.round(weather.main.temp_min)}°c`;
  narrows.hidden = false;
}

function dateBuilder(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
}


export {getResults};