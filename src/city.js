import * as server from "./index";

const LOCAL_STORAGE_KEY = "cities";
let cities = [];

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


const favCityStar = document.getElementById("star-five");
//not working cause element is null...fuck
//   favCityStar.addEventListener("click", () => {
//     deleteItem(findItemByID(cities, favCityStar.className), cities);
//     document.getElementsByClassName(favCityStar.className).remove();
//     displayStorage(LOCAL_STORAGE_KEY, cities);
//     // favCityStar.src = "../dist/Icons/star-transparent.png";
//   });



function localStorageCheck() {
  if (localStorage.length != 0) {
    document.getElementById("favourites").style.display = "block";
    displayStorage(LOCAL_STORAGE_KEY, cities);
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

function findItemByID(array, value) {
  let tmp = 0;
  for (var i = 0; i < array.length; i++) {
    if (`city${i}` === value) {
      return tmp;
    }
    tmp++;
  }
}

function removeItemByID(value) {
  document.getElementById(value).remove();
}

function displayStorage(storKey, array) {
  array = JSON.parse(localStorage.getItem(storKey));

  if (array.length != 0) {
    displayItem(array);
  } else {
    document.getElementById("favourites").style.display = "none";
  }

  //Dořešit mazání prvků ze storage a pole, asi podle toho id city
}

function displayItem(array) {
  console.log("displaying..");
  let items = "";

  for (var i = 0; i < array.length; i++) {
    items += `<button id="star-five" class="city${i}"><img src="./Icons/star-fill.png"></button>
                    <input type="button" id=city${i} value="${array[i]}" onclick="getResults(this.value)" class="favCityValue"></input><br>`;
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
