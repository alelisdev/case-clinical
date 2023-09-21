"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["libs_web_fuse_directives_scroll-reset_scroll-reset_module_ts"],{

/***/ 932871:
/*!**************************************************************************!*\
  !*** ./libs/web/@fuse/directives/scroll-reset/scroll-reset.directive.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FuseScrollResetDirective": () => (/* binding */ FuseScrollResetDirective)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 439300);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 782722);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 94650);





class FuseScrollResetDirective {
  /**
   * Constructor
   */
  constructor(_elementRef, _router) {
    this._elementRef = _elementRef;
    this._router = _router;
    this._unsubscribeAll = new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subject();
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit() {
    // Subscribe to NavigationEnd event
    this._router.events.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.filter)(event => event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_2__.NavigationEnd), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.takeUntil)(this._unsubscribeAll)).subscribe(() => {
      // Reset the element's scroll position to the top
      this._elementRef.nativeElement.scrollTop = 0;
    });
  }
  /**
   * On destroy
   */
  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
FuseScrollResetDirective.ɵfac = function FuseScrollResetDirective_Factory(t) {
  return new (t || FuseScrollResetDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router));
};
FuseScrollResetDirective.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineDirective"]({
  type: FuseScrollResetDirective,
  selectors: [["", "fuseScrollReset", ""]],
  exportAs: ["fuseScrollReset"]
});

/***/ }),

/***/ 634697:
/*!***********************************************************************!*\
  !*** ./libs/web/@fuse/directives/scroll-reset/scroll-reset.module.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FuseScrollResetModule": () => (/* binding */ FuseScrollResetModule)
/* harmony export */ });
/* harmony import */ var _fuse_directives_scroll_reset_scroll_reset_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fuse/directives/scroll-reset/scroll-reset.directive */ 932871);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);


class FuseScrollResetModule {}
FuseScrollResetModule.ɵfac = function FuseScrollResetModule_Factory(t) {
  return new (t || FuseScrollResetModule)();
};
FuseScrollResetModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: FuseScrollResetModule
});
FuseScrollResetModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](FuseScrollResetModule, {
    declarations: [_fuse_directives_scroll_reset_scroll_reset_directive__WEBPACK_IMPORTED_MODULE_1__.FuseScrollResetDirective],
    exports: [_fuse_directives_scroll_reset_scroll_reset_directive__WEBPACK_IMPORTED_MODULE_1__.FuseScrollResetDirective]
  });
})();

/***/ })

}]);