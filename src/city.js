import * as server from "./index";

const LOCAL_STORAGE_KEY = "cities";
let cities = [];    //array to store cities to localStorage saving
cities = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

var inputButton = document.getElementById("inputStarBtn");
var inputButtonImg = document.getElementById("inputBtnImg");
var input = document.getElementById("searchInput");
var displayPlace = document.querySelector(".favouriteCities");

function favouritesEvent() {
    inputButton.onclick = function () {
        if (cities !== null) {
            if (cities.includes(input.value) || cities != null) {
                deleteItem(findItemArray(cities, input.value), cities);
                displayStorage(LOCAL_STORAGE_KEY, cities);
                inputButtonImg.src = "../dist/Icons/star-transparent.png";
                return;
            }
        }
        if (checkValue(input)) {
            document.getElementById("favourites").style.display = "block";
            console.log(input.value);
            console.log(Array.isArray(cities));
            saveItem(input, cities);
            displayStorage(LOCAL_STORAGE_KEY, cities);
            styleBtn();
        }
    };
}


function localStorageCheck() {
    if (localStorage.length !== 0) {
        document.getElementById("favourites").style.display = "block";
        displayStorage(LOCAL_STORAGE_KEY, cities);
        return true;
    } else {
        document.getElementById("favourites").style.display = "none";
    }
}

function checkValue(item) {
    if (item.value.length === 0 || item.value === "") {
        alert("Enter city for searching");
        inputButtonImg.src = "../dist/Icons/star-transparent.png";
        return false;
    }
    return true;
}

function inputExistCheck(input) {
    if (cities === null) {
        return;
    }
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
    if(item.value !== null || item.value !== '' || array !== null) {
        array.push(item.value);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(array));
    } 
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

function displayStorage(storKey, array) {
    array = JSON.parse(localStorage.getItem(storKey));

    if (array.length !==0) {
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
                        onClick="${server.getResults(this.value)}" 
                        value="${array[i]}">
                            ${array[i]}
                </button>`;
    }
    displayPlace.innerHTML = items;
}

export {
    favouritesEvent,
    //saveItem,
    displayItem,
    displayStorage,
    checkValue,
    inputExistCheck,
    localStorageCheck,
};
