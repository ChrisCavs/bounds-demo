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
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../bounds.js/src/bounds.js":
/*!**********************************!*\
  !*** ../bounds.js/src/bounds.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst checkForObserver = () => {\n  if (!('IntersectionObserver' in window)) {\n    throw new Error(`\n      bounds.js requires IntersectionObserver on the global object.\n      IntersectionObserver is unavailable in IE and other older\n      versions of browsers.\n      See https://github.com/ChrisCavs/bounds.js/blob/master/README.md\n      for more compatibility information.\n    `)\n  }\n}\n\nconst getMargins = (margins = {}) => {\n  const {\n    top = 0,\n    right = 0,\n    bottom = 0,\n    left = 0\n  } = margins\n  return `${top}px ${right}px ${bottom}px ${left}px`\n}\n\nconst noOp = () => {}\n\nconst bounds = (options) => {\n  return new Boundary(options)\n}\n\nclass Boundary {\n  constructor({root, margins, threshold, onEmit}) {\n    checkForObserver()\n\n    const marginString = getMargins(margins)\n    const options = {\n      root: root || null,\n      rootMargin: marginString,\n      threshold: threshold || 0.0,\n    }\n\n    this.nodes = []\n    this.onEmit = onEmit || noOp\n    this.observer = new IntersectionObserver(\n      this._emit.bind(this),\n      options\n    )\n  }\n\n  // API\n  watch(el, onEnter=noOp, onLeave=noOp) {\n    const data = {\n      el,\n      onEnter,\n      onLeave,\n    }\n\n    this.nodes.push(data)\n    this.observer.observe(el)\n\n    return data\n  }\n\n  unWatch(el) {\n    const index = this._findByNode(el, true)\n\n    if (index !== -1) {\n      this.nodes.splice(index, 1)\n      this.observer.unobserve(el)\n    }\n\n    return this\n  }\n\n  check(el) {\n    const data = this._findByNode(el)\n    return data.history\n  }\n\n  clear() {\n    this.nodes = []\n    this.observer.disconnect()\n\n    return this\n  }\n\n  static checkCompatibility() {\n    checkForObserver()\n  }\n\n  // HELPERS\n  _emit(events) {\n    const actions = events.map(event => {\n      const data = this._findByNode(event.target)\n      const ratio = event.intersectionRatio\n\n      data.history = event.isIntersecting\n\n      event.isIntersecting\n        ? data.onEnter(ratio)\n        : data.onLeave(ratio)\n\n      return {\n        el: event.target,\n        inside: event.isIntersecting,\n        outside: !event.isIntersecting,\n        ratio: event.intersectionRatio\n      }\n    })\n\n    this.onEmit(actions)\n  }\n\n  _findByNode(el, returnIndex=false) {\n    const func = returnIndex ? 'findIndex' : 'find'\n\n    return this.nodes[func](node => {\n      return node.el.isEqualNode(el)\n    })\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (bounds);\n\n\n//# sourceURL=webpack:///../bounds.js/src/bounds.js?");

/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _bounds_js_src_bounds_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../bounds.js/src/bounds.js */ \"../bounds.js/src/bounds.js\");\n\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  const box = document.querySelector('.box')\n  const circles = document.querySelectorAll('.circle')\n  const onCircleEnter = (circle) => {\n    return () => {\n      console.log('circle entered')\n      circle.classList.add('red')\n    }\n  }\n  const onCircleLeave = (circle) => {\n    return () => {\n      console.log('circle left')\n      circle.classList.remove('red')\n    }\n  }\n\n  const windowBound = Object(_bounds_js_src_bounds_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n    margins: { bottom: 150},\n  })\n  const boxBound = Object(_bounds_js_src_bounds_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n    root: box,\n    threshold: 1.0,\n  })\n  console.log(boxBound)\n\n  circles.forEach(circle => {\n    boxBound.watch(\n      circle, onCircleEnter(circle), onCircleLeave(circle)\n    )\n    circle.addEventListener('transitionend', () => {\n      circle.classList.toggle('move')\n    })\n  })\n});\n\n//# sourceURL=webpack:///./js/main.js?");

/***/ })

/******/ });