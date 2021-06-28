/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/city.js":
/*!*********************!*\
  !*** ./src/city.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"favouritesEvent\": () => (/* binding */ favouritesEvent),\n/* harmony export */   \"displayItem\": () => (/* binding */ displayItem),\n/* harmony export */   \"displayStorage\": () => (/* binding */ displayStorage),\n/* harmony export */   \"checkValue\": () => (/* binding */ checkValue),\n/* harmony export */   \"inputExistCheck\": () => (/* binding */ inputExistCheck),\n/* harmony export */   \"localStorageCheck\": () => (/* binding */ localStorageCheck)\n/* harmony export */ });\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ \"./src/index.js\");\n\n\nconst LOCAL_STORAGE_KEY = \"cities\";\nvar inputButton = document.getElementById(\"inputStarBtn\");\nvar inputButtonImg = document.getElementById(\"inputBtnImg\");\nvar input = document.getElementById(\"searchInput\");\nvar displayPlace = document.querySelector(\".favouriteCities\");\n\n\n//array to store cities to localStorage saving\nlet cities = [];    \ncities = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));\nif (cities === null) {\n    cities = [];\n}\n\n\nfunction favouritesEvent() {\n    inputButton.onclick = function () {\n        if (cities !== null && inputButtonImg.src === \"./Icons/star-fill.png\") {\n            if (cities.includes(input.value)) {\n                deleteItem(findItemInArray(cities, input.value), cities);\n                displayStorage(LOCAL_STORAGE_KEY, cities);\n                //inputButtonImg.src = \"../dist/Icons/star-transparent.png\";\n                inputButtonImg.src = \"./Icons/star-transparent.png\";\n                return;\n            }\n        }\n        if (checkValue(input)) {\n            document.getElementById(\"favourites\").style.display = \"block\";\n            saveItem(input, cities);\n            displayStorage(LOCAL_STORAGE_KEY, cities);\n            styleBtn();\n        }\n    };\n}\n\n\nfunction localStorageCheck() {\n    if (localStorage.length !== 0) {\n        document.getElementById(\"favourites\").style.display = \"block\";\n        displayStorage(LOCAL_STORAGE_KEY, cities);\n        return true;\n    } else {\n        document.getElementById(\"favourites\").style.display = \"none\";\n    }\n}\n\nfunction checkValue(item) {\n    if (item.value.length === 0 || item.value === \"\") {\n        alert(\"Enter city for searching\");\n        // inputButtonImg.src = \"../dist/Icons/star-transparent.png\";\n        inputButtonImg.src = \"./Icons/star-transparent.png\";\n        return false;\n    }\n    if (cities.includes(item.value)) {\n        deleteItem(findItemInArray(cities, input.value), cities);\n        displayStorage(LOCAL_STORAGE_KEY, cities);\n        //inputButtonImg.src = \"../dist/Icons/star-transparent.png\";\n        inputButtonImg.src = \"./Icons/star-transparent.png\";\n        return false;\n    }\n    return true;\n}\n\nfunction inputExistCheck(input) {\n    if (cities === null) {\n        return;\n    }\n    if (cities.includes(input)) {\n        // inputButtonImg.src = \"../dist/Icons/star-fill.png\";\n        inputButtonImg.src = \"./Icons/star-fill.png\";\n    } else {\n        inputButtonImg.src = \"./Icons/star-transparent.png\";\n        // inputButtonImg.src = \"../dist/Icons/star-transparent.png\";\n    }\n}\n\nfunction styleBtn() {\n    //inputButtonImg.src === \"../dist/Icons/star-fill.png\"\n    if (inputButtonImg.src === \"./Icons/star-fill.png\") {\n        //inputButtonImg.src = \"../dist/Icons/star-transparent.png\";\n        inputButtonImg.src = \"./Icons/star-transparent.png\";\n    } else {\n        //inputButtonImg.src === \"../dist/Icons/star-fill.png\"\n        inputButtonImg.src = \"./Icons/star-fill.png\";\n    }\n}\n\nfunction saveItem(item, array) {\n    //array = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));\n    if (item.value !== null || item.value !== '') {\n        array.push(item.value);\n        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(array));\n    }\n}\n\nfunction deleteItem(current, array) {\n    array.splice(current, 1);\n    let unique = [...new Set(array)];\n    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(unique));\n}\n\nfunction findItemInArray(array, value) {\n    if (array.length === 0 || array === null) {\n        return;\n    }\n    let tmp = 0;\n    for (var i = 0; i < array.length; i++) {\n        if (array[i] === value) {\n            return tmp;\n        }\n        tmp++;\n    }\n}\n\nfunction displayStorage(storKey, array) {\n    array = JSON.parse(localStorage.getItem(storKey));\n    let unique = [...new Set(array)];\n\n    if (unique.length !== 0) {\n        displayItem(unique);\n    } else {\n        document.getElementById(\"favourites\").style.display = \"none\";\n    }\n}\n\nfunction displayItem(array) {\n    //console.log(\"displaying localStorage\");\n    //let items = \"\";\n    displayPlace.innerHTML = \"\";\n\n    for (let i = 0; i < array.length; i++) {\n        // let items = `<button id=\"city${i}\" \n        //                 class=\"favCityValue\" \n        //                 value=\"${array[i]}\">\n        //                     ${array[i]}\n        //         </button>`;\n        const button = document.createElement(\"button\");\n        button.id = \"city\" + i;\n        button.className = \"favCityValue\";\n        button.innerHTML = array[i];\n        button.setAttribute('index', i);\n        button.addEventListener(\"click\", handleCityClick(array[i]));\n        displayPlace.appendChild(button);\n\n        //displayPlace.innerHTML += items;\n        //document.getElementById(`city${i}`).onclick = handleCityClick(array[i]);\n        // handleCityClick(`city${i}`, array[i]);\n    }\n    //displayPlace.innerHTML = items;\n    //onclick=\"${await server.getResults(array[i])}\"    // line 123\n}\n\nfunction handleCityClick(/*id,*/ value) {\n    return function() {\n        _index__WEBPACK_IMPORTED_MODULE_0__.getResults(value);\n        styleBtn();\n        input.value = value;\n    }\n    // document.getElementById(id).addEventListener(\"click\", function() {\n    //     server.getResults(value);\n    //     styleBtn();\n    //     input.value = value;\n    // });\n}\n\n\n\n\n//# sourceURL=webpack://weather-app/./src/city.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getResults\": () => (/* binding */ getResults)\n/* harmony export */ });\n/* harmony import */ var _city__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./city */ \"./src/city.js\");\n\n\nconst api = {\n  key: \"25e0086798dc59c52219880629e8f0c7\",\n  base: \"https://api.openweathermap.org/data/2.5/\",\n};\n\n//const GOOGLE_API_KEY = 'AIzaSyCcj9Wy9i2HGXAp1nSmJvAbvFHf8JippHg';\n\nconst searchbox = document.querySelector(\".search-box\");\nsearchbox.addEventListener(\"keypress\", setQuery);\nsearchbox.addEventListener(\"click\", setQuery);\nwindow.onload = _city__WEBPACK_IMPORTED_MODULE_0__.localStorageCheck();  //callblack function to display localStorage\n\n\n\nfunction setQuery(evt) {\n  if (evt.keyCode == 13) {\n    if (searchbox.value.length === 0) {\n      alert(\"Enter city for searching\");\n    } \n    else {\n      getResults(searchbox.value);\n        _city__WEBPACK_IMPORTED_MODULE_0__.favouritesEvent();\n        _city__WEBPACK_IMPORTED_MODULE_0__.inputExistCheck(searchbox.value);\n    }\n  }\n}\n\nfunction getResults(query) {\n  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)\n    .then((weather) => {\n      //checking GET request status, >= 400, so display alert (client error) from server\n      if (weather.status >= 400) {\n        alert(\"City not found.\");\n      }\n      return weather.json();\n    })\n    .then(displayResults);\n}\n\nfunction displayResults(weather) {\n  let city = document.querySelector(\".location .city\");\n  let currentDate = new Date();\n  let date = document.querySelector(\".location .date\");\n  let temp = document.querySelector(\".current .temp\");\n  let weather_el = document.querySelector(\".current .weather\");\n  let highTemp = document.querySelector(\".highTemp\");\n  let lowTemp = document.querySelector(\".lowTemp\");\n  let narrows = document.getElementById('up-down-narrows');\n\n  city.innerText = `${weather.name}, ${weather.sys.country}`;\n  date.innerText = dateBuilder(currentDate);\n  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;\n  weather_el.innerText = weather.weather[0].main;\n  highTemp.innerText = `${Math.round(weather.main.temp_max)}°c`;\n  lowTemp.innerText = `${Math.round(weather.main.temp_min)}°c`;\n  narrows.hidden = false;\n}\n\nfunction dateBuilder(d) {\n  let months = [\n    \"January\",\n    \"February\",\n    \"March\",\n    \"April\",\n    \"May\",\n    \"June\",\n    \"July\",\n    \"August\",\n    \"September\",\n    \"October\",\n    \"November\",\n    \"December\",\n  ];\n  let days = [\n    \"Sunday\",\n    \"Monday\",\n    \"Tuesday\",\n    \"Wednesday\",\n    \"Thursday\",\n    \"Friday\",\n    \"Saturday\",\n  ];\n\n  let day = days[d.getDay()];\n  let date = d.getDate();\n  let month = months[d.getMonth()];\n  let year = d.getFullYear();\n\n  return `${day}, ${date} ${month} ${year}`;\n}\n\n\n\n\n//# sourceURL=webpack://weather-app/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;