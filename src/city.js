var inputButton = document.getElementById('inputStarBtn');
var input = document.getElementById('searchInput').value;
var displayPlace = document.querySelector(".favouriteCities");

const LOCAL_STORAGE_KEY = 'cities';
let cities = [];

function favouritesEvent() {
    inputButton.onclick = function() {
        document.getElementById("favourites").style.display = "block";
        saveItem(input, cities);
        displayStorage(LOCAL_STORAGE_KEY, cities);
        displayItem(cities);
        styleBtn();
    }
}

function styleBtn() {
    inputButton.onclick = function() {
        if(inputButton.src === "../Icons/star-fill.png") {
            inputButton.src = "../Icons/star-transparent.png"
        }
        else {
            inputButton.src = "../Icons/star-fill.png"
        }
    }
}

function saveItem(item, array) {
    array.push(item);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(array));
}

function displayStorage(storKey, array) {
    array = JSON.parse(localStorage.getItem(storKey));

    if(array.length != 0) {
        displayItem(array);
    }
    else {
        document.getElementById("favourites").style.display = "none";
    }

    //Dořešit mazání prvků ze storage a pole, asi podle toho id city
    // Dořešit zobrazování hvězdy u každého města
}

function displayItem(array) {
    console.log("displaying..");
    let items = "";

    for (var i = 0; i < array.length; i++) {
        items += `<button id="star-five" name="city${i}"><img src="../Icons/star-fill.png"></button>
                    <input type="button" id=city${i} onclick="favouritesEvent()" value="${array[i]}"></input><br>`;
      }
      displayPlace.innerHTML = items;
}


export {favouritesEvent, saveItem, displayItem, displayStorage};