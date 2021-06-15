import * as server from "./index";

const LOCAL_STORAGE_KEY = "cities";
let cities = [];
cities = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

var inputButton = document.getElementById("inputStarBtn");
var inputButtonImg = document.getElementById("inputBtnImg");
var input = document.getElementById("searchInput");
var displayPlace = document.querySelector(".favouriteCities");

function favouritesEvent(value) {
  inputButton.onclick = function () {
    if (cities.includes(value.value)) {
      deleteItem(findItemArray(cities, value.value), cities);
      displayStorage(LOCAL_STORAGE_KEY, cities);
      inputButtonImg.src = "../dist/Icons/star-transparent.png";
      return;
    }
    if (checkValue(value)) {
      document.getElementById("favourites").style.display = "block";
      saveItem(value.value, cities);
      displayStorage(LOCAL_STORAGE_KEY, cities);
      styleBtn();
    }
  };
}

  //not working cause element is null... 
  const favCityValue = document.getElementsByClassName("favCityValue");
    favCityValue.onclick = function() {
      inputButtonImg.src = "../dist/Icons/star-fill.png";
      input.innerHTML = favCityValue.value;
      server.getResults(favCityValue.value);
    }
 

function localStorageCheck() {
  if (localStorage.length != 0) {
    document.getElementById("favourites").style.display = "block";
    displayStorage(LOCAL_STORAGE_KEY, cities);
    return true;
  } else {
    document.getElementById("favourites").style.display = "none";
  }
}

function checkValue(value) {
  if (value.value.length === 0 || value.value === "") {
    alert("Enter city for searching");
    inputButtonImg.src = "../dist/Icons/star-transparent.png";
    return false;
  }
  return true;
}

function inputExistCheck(input) {
  if (cities.includes(input)) {
    inputButtonImg.src = "../dist/Icons/star-fill.png";
  } else {
    inputButtonImg.src = "../dist/Icons/star-transparent.png";
  }
}

function styleBtn() {
  if (inputButtonImg.src === "../dist/Icons/star-fill.png") {
    inputButtonImg.src = "../dist/Icons/star-transparent.png";
  } else {
    inputButtonImg.src = "../dist/Icons/star-fill.png";
  }
}

function saveItem(item, array) {
  array.push(item);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(array));
}

function deleteItem(current, array) {
  array.splice(current, 1);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(array));
}

function findItemArray(array, value) {
  if (array.length === 0 || array === null) {
    return;
  }
  let tmp = 0;
  for (var i = 0; i < array.length; i++) {
    if (array[i] === value) {
      return tmp;
    }
    tmp++;
  }
}

// function findItemByID(array, value) {
//   let tmp = 0;
//   for (var i = 0; i < array.length; i++) {
//     if (`city${i}` === value) {
//       return tmp;
//     }
//     tmp++;
//   }
// }

function displayStorage(storKey, array) {
  array = JSON.parse(localStorage.getItem(storKey));

  if (array.length != 0) {
    displayItem(array);
  } else {
    document.getElementById("favourites").style.display = "none";
  }
}

function displayItem(array) {
  console.log("displaying localStorage");
  let items = "";

  for (var i = 0; i < array.length; i++) {
    items += `<button id="city${i}" 
                        class="favCityValue" 
                        onclick="server.seeCityInfo(this.value);" 
                        value="${array[i]}">
                            ${array[i]}
                        </button>`;
  }
  displayPlace.innerHTML = items;
}

export {
  favouritesEvent,
  saveItem,
  displayItem,
  displayStorage,
  checkValue,
  inputExistCheck,
  localStorageCheck,
};
