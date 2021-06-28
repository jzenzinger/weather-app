import * as server from "./index";

const LOCAL_STORAGE_KEY = "cities";
var inputButton = document.getElementById("inputStarBtn");
var inputButtonImg = document.getElementById("inputBtnImg");
var input = document.getElementById("searchInput");
var displayPlace = document.querySelector(".favouriteCities");


//array to store cities to localStorage saving
let cities = [];    
cities = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
if (cities === null) {
    cities = [];
}


function favouritesEvent() {
    inputButton.onclick = function () {
        if (cities !== null && inputButtonImg.src === "./Icons/star-fill.png") {
            if (cities.includes(input.value)) {
                deleteItem(findItemInArray(cities, input.value), cities);
                displayStorage(LOCAL_STORAGE_KEY, cities);
                //inputButtonImg.src = "../dist/Icons/star-transparent.png";
                inputButtonImg.src = "./Icons/star-transparent.png";
                return;
            }
        }
        if (checkValue(input)) {
            document.getElementById("favourites").style.display = "block";
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
        // inputButtonImg.src = "../dist/Icons/star-transparent.png";
        inputButtonImg.src = "./Icons/star-transparent.png";
        return false;
    }
    if (cities.includes(item.value)) {
        deleteItem(findItemInArray(cities, input.value), cities);
        displayStorage(LOCAL_STORAGE_KEY, cities);
        //inputButtonImg.src = "../dist/Icons/star-transparent.png";
        inputButtonImg.src = "./Icons/star-transparent.png";
        return false;
    }
    return true;
}

function inputExistCheck(input) {
    if (cities === null) {
        return;
    }
    if (cities.includes(input)) {
        // inputButtonImg.src = "../dist/Icons/star-fill.png";
        inputButtonImg.src = "./Icons/star-fill.png";
    } else {
        inputButtonImg.src = "./Icons/star-transparent.png";
        // inputButtonImg.src = "../dist/Icons/star-transparent.png";
    }
}

function styleBtn() {
    //inputButtonImg.src === "../dist/Icons/star-fill.png"
    if (inputButtonImg.src === "./Icons/star-fill.png") {
        //inputButtonImg.src = "../dist/Icons/star-transparent.png";
        inputButtonImg.src = "./Icons/star-transparent.png";
    } else {
        //inputButtonImg.src === "../dist/Icons/star-fill.png"
        inputButtonImg.src = "./Icons/star-fill.png";
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

function findItemInArray(array, value) {
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
    //console.log("displaying localStorage");
    //let items = "";
    displayPlace.innerHTML = "";

    for (let i = 0; i < array.length; i++) {
        // let items = `<button id="city${i}" 
        //                 class="favCityValue" 
        //                 value="${array[i]}">
        //                     ${array[i]}
        //         </button>`;
        const button = document.createElement("button");
        button.id = "city" + i;
        button.className = "favCityValue";
        button.innerHTML = array[i];
        button.setAttribute('index', i);
        button.addEventListener("click", handleCityClick(array[i]));
        displayPlace.appendChild(button);

        //displayPlace.innerHTML += items;
        //document.getElementById(`city${i}`).onclick = handleCityClick(array[i]);
        // handleCityClick(`city${i}`, array[i]);
    }
    //displayPlace.innerHTML = items;
    //onclick="${await server.getResults(array[i])}"    // line 123
}

function handleCityClick(/*id,*/ value) {
    return function() {
        server.getResults(value);
        styleBtn();
        input.value = value;
    }
    // document.getElementById(id).addEventListener("click", function() {
    //     server.getResults(value);
    //     styleBtn();
    //     input.value = value;
    // });
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
