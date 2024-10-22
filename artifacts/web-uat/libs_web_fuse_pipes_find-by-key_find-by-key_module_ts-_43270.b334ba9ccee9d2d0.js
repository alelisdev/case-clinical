"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["libs_web_fuse_pipes_find-by-key_find-by-key_module_ts-_43270"],{

/***/ 747922:
/*!****************************************************************!*\
  !*** ./libs/web/@fuse/pipes/find-by-key/find-by-key.module.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FuseFindByKeyPipeModule": () => (/* binding */ FuseFindByKeyPipeModule)
/* harmony export */ });
/* harmony import */ var _fuse_pipes_find_by_key_find_by_key_pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fuse/pipes/find-by-key/find-by-key.pipe */ 437249);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);


class FuseFindByKeyPipeModule {}
FuseFindByKeyPipeModule.ɵfac = function FuseFindByKeyPipeModule_Factory(t) {
  return new (t || FuseFindByKeyPipeModule)();
};
FuseFindByKeyPipeModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: FuseFindByKeyPipeModule
});
FuseFindByKeyPipeModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](FuseFindByKeyPipeModule, {
    declarations: [_fuse_pipes_find_by_key_find_by_key_pipe__WEBPACK_IMPORTED_MODULE_1__.FuseFindByKeyPipe],
    exports: [_fuse_pipes_find_by_key_find_by_key_pipe__WEBPACK_IMPORTED_MODULE_1__.FuseFindByKeyPipe]
  });
})();

/***/ }),

/***/ 437249:
/*!**************************************************************!*\
  !*** ./libs/web/@fuse/pipes/find-by-key/find-by-key.pipe.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FuseFindByKeyPipe": () => (/* binding */ FuseFindByKeyPipe)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);

/**
 * Finds an object from given source using the given key - value pairs
 */
class FuseFindByKeyPipe {
  /**
   * Constructor
   */
  constructor() {}
  /**
   * Transform
   *
   * @param value A string or an array of strings to find from source
   * @param key Key of the object property to look for
   * @param source Array of objects to find from
   */
  transform(value, key, source) {
    // If the given value is an array of strings...
    if (Array.isArray(value)) {
      return value.map(item => source.find(sourceItem => sourceItem[key] === item));
    }
    // If the value is a string...
    return source.find(sourceItem => sourceItem[key] === value);
  }
}
FuseFindByKeyPipe.ɵfac = function FuseFindByKeyPipe_Factory(t) {
  return new (t || FuseFindByKeyPipe)();
};
FuseFindByKeyPipe.ɵpipe = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({
  name: "fuseFindByKey",
  type: FuseFindByKeyPipe,
  pure: false
});

/***/ })

}]);