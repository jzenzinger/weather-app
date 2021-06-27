import * as server from "./index";

const LOCAL_STORAGE_KEY = "cities";
let cities = [];    //array to store cities to localStorage saving
cities = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

if (cities === null) {
    cities = [];
}

var inputButton = document.getElementById("inputStarBtn");
var inputButtonImg = document.getElementById("inputBtnImg");
var input = document.getElementById("searchInput");
var displayPlace = document.querySelector(".favouriteCities");

function favouritesEvent() {
    inputButton.onclick = function () {
        if (cities !== null && inputButtonImg.src === "../dist/Icons/star-fill.png") {
            if (cities.includes(input.value)) {
                deleteItem(findItemArray(cities, input.value), cities);
                displayStorage(LOCAL_STORAGE_KEY, cities);
                inputButtonImg.src = "../dist/Icons/star-transparent.png";
                return;
            }
        }
        if (checkValue(input)) {
            document.getElementById("favourites").style.display = "block";
            // console.log(input.value);
            // console.log(Array.isArray(cities));
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
    if (cities.includes(item.value)) {
        deleteItem(findItemArray(cities, input.value), cities);
        displayStorage(LOCAL_STORAGE_KEY, cities);
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
    //array = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (item.value !== null || item.value !== '') {
        array.push(item.value);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(array));
    }
}

function deleteItem(current, array) {
    array.splice(current, 1);
    let unique = [...new Set(array)];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(unique));
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
    let unique = [...new Set(array)];

    if (unique.length !== 0) {
        displayItem(unique);
    } else {
        document.getElementById("favourites").style.display = "none";
    }
}

function displayItem(array) {
    console.log("displaying localStorage");
    //let items = "";
    displayPlace.innerHTML = "";

    for (var i = 0; i < array.length; i++) {
        let items = `<button id="city${i}" 
                        class="favCityValue" 
                        value="${array[i]}">
                            ${array[i]}
                </button>`;

        displayPlace.innerHTML += items;
        document.getElementById(`city${i}`).onclick = addListener(array[i]);
        //addListener(`city${i}`, array[i]);
    }
    //displayPlace.innerHTML = items;
    //onclick="${await server.getResults(array[i])}"    // line 123
}

function addListener(/*id,*/ value) {
    return function() {
        server.getResults(value);
        styleBtn();
        input.value = value;
    }
    // document.getElementById(id).addEventListener("click", function() {
    //     server.getResults(value);
    //     styleBtn();
    //     input.value = value;
    // }
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
