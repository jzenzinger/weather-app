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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"favouritesEvent\": () => (/* binding */ favouritesEvent),\n/* harmony export */   \"saveItem\": () => (/* binding */ saveItem),\n/* harmony export */   \"displayItem\": () => (/* binding */ displayItem),\n/* harmony export */   \"displayStorage\": () => (/* binding */ displayStorage)\n/* harmony export */ });\nvar inputButton = document.getElementById(\"inputStarBtn\");\r\nvar input = document.getElementById(\"searchInput\").value;\r\nvar displayPlace = document.querySelector(\".favouriteCities\");\r\n\r\nconst LOCAL_STORAGE_KEY = \"cities\";\r\nlet cities = [];\r\n\r\nfunction favouritesEvent() {\r\n  inputButton.onclick = function () {\r\n    document.getElementById(\"favourites\").style.display = \"block\";\r\n    saveItem(input, cities);\r\n    displayStorage(LOCAL_STORAGE_KEY, cities);\r\n    displayItem(cities);\r\n    styleBtn();\r\n  };\r\n}\r\n\r\nfunction styleBtn() {\r\n  if (inputButton.src == \"../Icons/star-fill.png\") {\r\n    inputButton.src = \"../Icons/star-transparent.png\";\r\n  } else {\r\n    inputButton.src = \"../Icons/star-fill.png\";\r\n  }\r\n}\r\n\r\nfunction saveItem(item, array) {\r\n  array.push(item);\r\n  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(array));\r\n}\r\n\r\nfunction displayStorage(storKey, array) {\r\n  array = JSON.parse(localStorage.getItem(storKey));\r\n\r\n  if (array.length != 0) {\r\n    displayItem(array);\r\n  } else {\r\n    document.getElementById(\"favourites\").style.display = \"none\";\r\n  }\r\n\r\n  //Dořešit mazání prvků ze storage a pole, asi podle toho id city\r\n  // Dořešit zobrazování hvězdy u každého města\r\n  // hvezda se nezobrazuje a nemeni spravne\r\n}\r\n\r\nfunction displayItem(array) {\r\n  console.log(\"displaying..\");\r\n  let items = \"\";\r\n\r\n  for (var i = 0; i < array.length; i++) {\r\n    items += `<button id=\"star-five\" name=\"city${i}\"><img src=\"../Icons/star-fill.png\"></button>\r\n                    <input type=\"button\" id=city${i} onclick=\"favouritesEvent()\" value=\"${array[i]}\"></input><br>`;\r\n  }\r\n  displayPlace.innerHTML = items;\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://weather-app/./src/city.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _city__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./city */ \"./src/city.js\");\n\r\n\r\nconst api = {\r\n  key: \"25e0086798dc59c52219880629e8f0c7\",\r\n  base: \"https://api.openweathermap.org/data/2.5/\",\r\n};\r\n\r\n//const GOOGLE_API_KEY = 'AIzaSyCcj9Wy9i2HGXAp1nSmJvAbvFHf8JippHg';\r\n\r\nconst searchbox = document.querySelector(\".search-box\");\r\nsearchbox.addEventListener(\"keypress\", setQuery);\r\n\r\nfunction setQuery(evt) {\r\n  if (evt.keyCode == 13) {\r\n    if (searchbox.value.length === 0) {\r\n      alert(\"Enter city for searching\");\r\n    } \r\n    else {\r\n      getResults(searchbox.value);\r\n      _city__WEBPACK_IMPORTED_MODULE_0__.favouritesEvent();\r\n    }\r\n  }\r\n}\r\n\r\nfunction getResults(query) {\r\n  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)\r\n    .then((weather) => {\r\n      //checking GET request status, >= 400, so display alert (client error) from server\r\n      if (weather.status >= 400) {\r\n        alert(\"City not found.\");\r\n      }\r\n      return weather.json();\r\n    })\r\n    .then(displayResults);\r\n}\r\n\r\nfunction displayResults(weather) {\r\n  let city = document.querySelector(\".location .city\");\r\n  let currentDate = new Date();\r\n  let date = document.querySelector(\".location .date\");\r\n  let temp = document.querySelector(\".current .temp\");\r\n  let weather_el = document.querySelector(\".current .weather\");\r\n  let highTemp = document.querySelector(\".highTemp\");\r\n  let lowTemp = document.querySelector(\".lowTemp\");\r\n  let narrows = document.getElementById('up-down-narrows');\r\n\r\n  city.innerText = `${weather.name}, ${weather.sys.country}`;\r\n  date.innerText = dateBuilder(currentDate);\r\n  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;\r\n  weather_el.innerText = weather.weather[0].main;\r\n  highTemp.innerText = `${Math.round(weather.main.temp_max)}°c`;\r\n  lowTemp.innerText = `${Math.round(weather.main.temp_min)}°c`;\r\n  narrows.hidden = false;\r\n}\r\n\r\nfunction dateBuilder(d) {\r\n  let months = [\r\n    \"January\",\r\n    \"February\",\r\n    \"March\",\r\n    \"April\",\r\n    \"May\",\r\n    \"June\",\r\n    \"July\",\r\n    \"August\",\r\n    \"September\",\r\n    \"October\",\r\n    \"November\",\r\n    \"December\",\r\n  ];\r\n  let days = [\r\n    \"Sunday\",\r\n    \"Monday\",\r\n    \"Tuesday\",\r\n    \"Wednesday\",\r\n    \"Thursday\",\r\n    \"Friday\",\r\n    \"Saturday\",\r\n  ];\r\n\r\n  let day = days[d.getDay()];\r\n  let date = d.getDate();\r\n  let month = months[d.getMonth()];\r\n  let year = d.getFullYear();\r\n\r\n  return `${day}, ${date} ${month} ${year}`;\r\n}\r\n\n\n//# sourceURL=webpack://weather-app/./src/index.js?");

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
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;