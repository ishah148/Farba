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

/***/ "./scripts/hamburger.js":
/*!******************************!*\
  !*** ./scripts/hamburger.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addMenu\": () => (/* binding */ addMenu),\n/* harmony export */   \"blackout\": () => (/* binding */ blackout),\n/* harmony export */   \"burgerMenuLinks\": () => (/* binding */ burgerMenuLinks),\n/* harmony export */   \"burgerMenuListItems\": () => (/* binding */ burgerMenuListItems),\n/* harmony export */   \"closeMenu\": () => (/* binding */ closeMenu),\n/* harmony export */   \"hamburger\": () => (/* binding */ hamburger)\n/* harmony export */ });\n\r\nconst hamburger = document.querySelector('.hamburger');\r\nconst burgerMenuLinks = document.querySelectorAll('.burger-menu__link')\r\nconst blackout = document.querySelector('.blackout');\r\nconst burgerMenu = document.querySelector('.burger-menu');\r\nconst body = document.querySelector('body');\r\nconst burgerMenuListItems = document.querySelectorAll('.burger-menu__list-item');\r\n\r\n\r\nfunction addMenu() {\r\n    hamburger.classList.add('open-menu');\r\n    body.classList.add('stop-scrolling');\r\n    blackout.classList.add('visible');\r\n    burgerMenu.classList.add('visible');\r\n}\r\n\r\nfunction closeMenu() {\r\n    hamburger.classList.remove('open-menu');\r\n    body.classList.remove('stop-scrolling');\r\n    blackout.classList.remove('visible');\r\n    burgerMenu.classList.remove('visible');\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://farba/./scripts/hamburger.js?");

/***/ }),

/***/ "./scripts/main.js":
/*!*************************!*\
  !*** ./scripts/main.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _hamburger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hamburger.js */ \"./scripts/hamburger.js\");\n/* harmony import */ var _switch_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./switch_lang.js */ \"./scripts/switch_lang.js\");\n\r\n\r\n\r\n// price cards hover\r\nconst priceCards = document.querySelectorAll('.prices__card-wrapper');\r\n\r\n// burger menu\r\nconst laptopMinWidth = window.matchMedia('(min-width: 768px)');\r\n\r\n// price cards hover\r\npriceCards.forEach((card) => {\r\n  card.querySelector('.prices__button').addEventListener('mouseover', () => {\r\n    card.classList.add('hover');\r\n    card.querySelector('.prices__card-title').classList.add('hover');\r\n  });\r\n  card.querySelector('.prices__button').addEventListener('mouseout', () => {\r\n    card.classList.remove('hover');\r\n    card.querySelector('.prices__card-title').classList.remove('hover');\r\n  });\r\n});\r\nalert('111')\r\nconsole.log('222222222222222222222222');\r\n// burger-menu\r\n\r\nlaptopMinWidth.addEventListener('change', (laptopMinScreenSize) => {\r\n  if (laptopMinScreenSize.matches) {\r\n    (0,_hamburger_js__WEBPACK_IMPORTED_MODULE_0__.closeMenu)();\r\n  }\r\n});\r\ngoo\r\ndebu\r\n\r\n_hamburger_js__WEBPACK_IMPORTED_MODULE_0__.blackout.addEventListener('click', () => (0,_hamburger_js__WEBPACK_IMPORTED_MODULE_0__.closeMenu)());\r\n\r\n_hamburger_js__WEBPACK_IMPORTED_MODULE_0__.hamburger.addEventListener('click', (event) => {\r\n  if (event.currentTarget.classList.contains('open-menu')) {\r\n    (0,_hamburger_js__WEBPACK_IMPORTED_MODULE_0__.closeMenu)();\r\n  } else {\r\n    (0,_hamburger_js__WEBPACK_IMPORTED_MODULE_0__.addMenu)();\r\n  }\r\n});\r\nfoo()\r\n\r\n_hamburger_js__WEBPACK_IMPORTED_MODULE_0__.burgerMenuLinks.forEach((link) => {\r\n  link.addEventListener('click', () => (0,_hamburger_js__WEBPACK_IMPORTED_MODULE_0__.closeMenu)());\r\n});\r\n\r\n_hamburger_js__WEBPACK_IMPORTED_MODULE_0__.burgerMenuListItems.forEach((item) => {\r\n  item.addEventListener('mouseover', () => {\r\n    item.classList.add('list-item--active');\r\n  });\r\n});\r\n\r\n_hamburger_js__WEBPACK_IMPORTED_MODULE_0__.burgerMenuListItems.forEach((item) => {\r\n  item.addEventListener('mouseout', () => {\r\n    item.classList.remove('list-item--active');\r\n  });\r\n});\r\n\r\n\r\n// switch lang\r\n\r\n_switch_lang_js__WEBPACK_IMPORTED_MODULE_1__.switchLang.addEventListener('click', _switch_lang_js__WEBPACK_IMPORTED_MODULE_1__.chooseLangButton);\r\n\n\n//# sourceURL=webpack://farba/./scripts/main.js?");

/***/ }),

/***/ "./scripts/switch_lang.js":
/*!********************************!*\
  !*** ./scripts/switch_lang.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"chooseLangButton\": () => (/* binding */ chooseLangButton),\n/* harmony export */   \"switchLang\": () => (/* binding */ switchLang)\n/* harmony export */ });\n/* harmony import */ var _translate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./translate.js */ \"./scripts/translate.js\");\n\r\n\r\nconst switchLang = document.querySelector('.switch-lang');\r\n\r\nfunction translatePage(language) {\r\n    let data = document.querySelectorAll('[data-translate]');\r\n    for (let currentElement of data) {\r\n        currentElement.textContent = _translate_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"][language][currentElement.getAttribute('data-translate')];\r\n        if (currentElement.placeholder) {\r\n            currentElement.placeholder = _translate_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"][language][currentElement.getAttribute('data-translate')];\r\n            currentElement.textContent = '';\r\n        }\r\n\r\n    }\r\n\r\n    if (language === 'ru') {\r\n        document.querySelector('.en').classList.remove('active');\r\n        document.querySelector('.ru').classList.add('active');\r\n    } else {\r\n        document.querySelector('.ru').classList.remove('active');\r\n        document.querySelector('.en').classList.add('active');\r\n    }\r\n\r\n}\r\n\r\nfunction chooseLangButton(event) {\r\n    if (event.target.dataset.switch)\r\n        translatePage(event.target.dataset.switch);\r\n}\r\n\r\n\n\n//# sourceURL=webpack://farba/./scripts/switch_lang.js?");

/***/ }),

/***/ "./scripts/translate.js":
/*!******************************!*\
  !*** ./scripts/translate.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst translateObj = {\r\n    'en': {\r\n      'portfolio': 'Portfolio',\r\n      'prices': 'Price',\r\n      'contacts': 'Contacts',\r\n      'title': 'We create content for marketplaces',\r\n    },\r\n    'ru': {\r\n      'portfolio': 'Портфолио',\r\n      'prices': 'Цены',\r\n      'contacts': 'Контакты',\r\n      'title': 'Создаем контент для маркетплейсов',\r\n    }\r\n  }\r\n  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (translateObj);\n\n//# sourceURL=webpack://farba/./scripts/translate.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./scripts/main.js");
/******/ 	
/******/ })()
;