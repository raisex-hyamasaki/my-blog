"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "components_Mermaid_tsx";
exports.ids = ["components_Mermaid_tsx"];
exports.modules = {

/***/ "./components/Mermaid.tsx":
/*!********************************!*\
  !*** ./components/Mermaid.tsx ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Mermaid)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \n\nfunction Mermaid({ chart }) {\n    const ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! mermaid */ \"mermaid\")).then((mermaid)=>{\n            mermaid.default.initialize({\n                startOnLoad: true\n            });\n            if (ref.current) {\n                ref.current.innerHTML = chart;\n                mermaid.default.contentLoaded();\n            }\n        });\n    }, [\n        chart\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        ref: ref,\n        className: \"mermaid my-6 bg-white rounded-md shadow p-4\"\n    }, void 0, false, {\n        fileName: \"C:\\\\dev\\\\strapi\\\\my-blog\\\\frontend\\\\components\\\\Mermaid.tsx\",\n        lineNumber: 22,\n        columnNumber: 10\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL01lcm1haWQudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUV5QztBQU0xQixTQUFTRSxRQUFRLEVBQUVDLEtBQUssRUFBZ0I7SUFDckQsTUFBTUMsTUFBTUgsNkNBQU1BLENBQWlCO0lBRW5DRCxnREFBU0EsQ0FBQztRQUNSLDhHQUFPLENBQVdLLElBQUksQ0FBQyxDQUFDQztZQUN0QkEsUUFBUUMsT0FBTyxDQUFDQyxVQUFVLENBQUM7Z0JBQUVDLGFBQWE7WUFBSztZQUMvQyxJQUFJTCxJQUFJTSxPQUFPLEVBQUU7Z0JBQ2ZOLElBQUlNLE9BQU8sQ0FBQ0MsU0FBUyxHQUFHUjtnQkFDeEJHLFFBQVFDLE9BQU8sQ0FBQ0ssYUFBYTtZQUMvQjtRQUNGO0lBQ0YsR0FBRztRQUFDVDtLQUFNO0lBRVYscUJBQU8sOERBQUNVO1FBQUlULEtBQUtBO1FBQUtVLFdBQVU7Ozs7OztBQUNsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2Zyb250ZW5kLWJsb2cvLi9jb21wb25lbnRzL01lcm1haWQudHN4PzNkYjEiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBjbGllbnQnXHJcblxyXG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gJ3JlYWN0J1xyXG5cclxuaW50ZXJmYWNlIE1lcm1haWRQcm9wcyB7XHJcbiAgY2hhcnQ6IHN0cmluZ1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBNZXJtYWlkKHsgY2hhcnQgfTogTWVybWFpZFByb3BzKSB7XHJcbiAgY29uc3QgcmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50PihudWxsKVxyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaW1wb3J0KCdtZXJtYWlkJykudGhlbigobWVybWFpZCkgPT4ge1xyXG4gICAgICBtZXJtYWlkLmRlZmF1bHQuaW5pdGlhbGl6ZSh7IHN0YXJ0T25Mb2FkOiB0cnVlIH0pXHJcbiAgICAgIGlmIChyZWYuY3VycmVudCkge1xyXG4gICAgICAgIHJlZi5jdXJyZW50LmlubmVySFRNTCA9IGNoYXJ0XHJcbiAgICAgICAgbWVybWFpZC5kZWZhdWx0LmNvbnRlbnRMb2FkZWQoKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH0sIFtjaGFydF0pXHJcblxyXG4gIHJldHVybiA8ZGl2IHJlZj17cmVmfSBjbGFzc05hbWU9XCJtZXJtYWlkIG15LTYgYmctd2hpdGUgcm91bmRlZC1tZCBzaGFkb3cgcC00XCIgLz5cclxufVxyXG4iXSwibmFtZXMiOlsidXNlRWZmZWN0IiwidXNlUmVmIiwiTWVybWFpZCIsImNoYXJ0IiwicmVmIiwidGhlbiIsIm1lcm1haWQiLCJkZWZhdWx0IiwiaW5pdGlhbGl6ZSIsInN0YXJ0T25Mb2FkIiwiY3VycmVudCIsImlubmVySFRNTCIsImNvbnRlbnRMb2FkZWQiLCJkaXYiLCJjbGFzc05hbWUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./components/Mermaid.tsx\n");

/***/ })

};
;