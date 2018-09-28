/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/dom_node_collection.js":
/*!************************************!*\
  !*** ./lib/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nclass DomNodeCollection {\n  constructor(array) {\n    this.elements = array;\n  }\n  \n  html(args){\n    if (arguments.length === 0){\n      return this.elements[0].innerHTML;\n    } else {\n      this.elements.forEach(e => e.innerHTML = args);\n    }\n  }\n  \n  empty() {\n    this.elements.forEach(e => e.innerHTML = \"\");\n  }\n  \n  append(arg) {\n    this.elements.forEach(el => {\n        el.append(arg.outerHTML);\n    });\n  }\n  \n  attr(name, val) {\n    this.elements.forEach(e => e.setAttribute(name, val));\n  }\n  \n  addClass(className) {\n    this.elements.forEach(e => e.classList.add(className));\n  }\n  \n  removeClass(className) {\n    this.elements.forEach(e => e.classList.remove(className));\n  }\n  \n  children(){\n    let result = [];\n    for (let i = 0; i < this.elements.length; i++){\n      if (this.elements[i].children.length === 0){\n        result.push(this.elements[i]);\n      } else {\n        result.concat(Array.from(this.elements[i].children));\n        // let currentNode = new DomNodeCollection(Array.from(this.elements[i].children));\n        result.push(this.elements[i]);\n      }\n    }\n    return new DomNodeCollection(result);\n  }\n  \n  parent(){\n    let result = [];\n    for(let i=0;i<this.elements.length;i++) {\n      if (this.elements[i].parentElement && result.indexOf(this.elements[i].parentElement) < 0) {\n        result.push(this.elements[i].parentElement);\n      }  \n    }\n    return new DomNodeCollection(result);\n  }\n  \n  find(string) {\n    let result = [];\n    for(let i=0;i<this.elements.length;i++) {\n      result.push(this.elements[i].querySelectorAll(string));\n    }\n    \n    return new DomNodeCollection(result);\n  }\n  \n  remove(){\n    // this.empty();\n    for (let i = 0; i < this.elements.length; i++){\n      this.elements[i].parentNode.removeChild(this.elements[i]);\n    }\n  }\n  \n  on(action, callback){\n    const handleAction = (e) => {\n      callback(e);\n    };\n    for (let i = 0; i < this.elements.length; i++){\n      this.elements[i].addEventListener(action, handleAction);\n      this.callback = handleAction;\n    }\n  }\n  \n  off(action, callback = this.callback){\n    console.log(`this is the callback: ${this.callback}`);\n    for (let i = 0; i < this.elements.length; i++){\n        this.elements[i].removeEventListener(action, callback);\n    }\n  }\n}\n\n\n\nmodule.exports = DomNodeCollection;\n\n//# sourceURL=webpack:///./lib/dom_node_collection.js?");

/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DomNodeCollection = __webpack_require__(/*! ./dom_node_collection.js */ \"./lib/dom_node_collection.js\");\n\n\nwindow.$l = function (selector) {\n  const arrayQueue = [];\n  if (selector.constructor.name === \"String\") {\n    const list = document.querySelectorAll(selector);\n    const listArr = Array.from(list);\n    return new DomNodeCollection(listArr);\n  }\n  if (selector instanceof HTMLElement){\n    return new DomNodeCollection([selector]);\n  }\n  if (selector instanceof Function){\n    console.log(\"We are hitting This!\");\n    arrayQueue.push(selector);\n  }\n  document.addEventListener(\"DOMContentLoaded\", function(event) {\n    console.log(\"DOM fully loaded and parsed\");\n    for (let i = 0; i < arrayQueue.length; i++){\n        console.log(\"Entered FOr Loop!\");\n      arrayQueue[i]();\n    }\n  });\n  \n};\n\n\n//# sourceURL=webpack:///./lib/main.js?");

/***/ })

/******/ });