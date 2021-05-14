const api = {
  key: "25e0086798dc59c52219880629e8f0c7",
  base: "https://api.openweathermap.org/data/2.5/"
}
//if searching city is valid, then return true and get result
//if false, then return alert "City does not exist!"
//var searchIsValid = false;

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
  //searchIsValid = false;  //reset searchbox validing condition
}

function getResults(query) {
  //searchIsValid = false;  //reset searchbox validing condition
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      //searchIsValid = true;
      return weather.json();
    }).then(displayResults);

}


function displayResults(weather) {
  let city = document.querySelector('.location .city');
  let now = new Date();
  let date = document.querySelector('.location .date');
  let temp = document.querySelector('.current .temp');
  let weather_el = document.querySelector('.current .weather');
  let highTemp = document.querySelector('.highTemp');
  let lowTemp = document.querySelector('.lowTemp');

  if (city, now, date, temp, weather_el, highTemp, lowTemp != null) {
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    date.innerText = dateBuilder(now);
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
    weather_el.innerText = weather.weather[0].main;
    highTemp.innerText = `${Math.round(weather.main.temp_max)}°c`;
    lowTemp.innerText = `${Math.round(weather.main.temp_min)}°c`;
  }
  else {
    alert("We couldn't find your city. Please enter city again.");
  }
}

function dateBuilder(d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
}