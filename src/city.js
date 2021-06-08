var inputButton = document.getElementById('inputStarBtn');
var input = document.getElementById('searchInput').value;

const LOCAL_STORAGE_KEY = 'cities';

if(inputButton.onclick) {
    saveItem(input);
    displayStorage(LOCAL_STORAGE_KEY);
    displayItem();
}


function saveItem(item) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(item));
}

function displayStorage(storKey) {
    const stored = JSON.parse(localStorage.getItem(storKey));

    if(stored) {
        displayItem(stored);
    }
}

function displayItem() {
    console.log("displaying..");
}


export {saveItem, displayItem, displayStorage};