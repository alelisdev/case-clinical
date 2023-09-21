"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["libs_web_concrete_user-feature_feature_src_index_ts"],{

/***/ 27747:
/*!*************************************************************!*\
  !*** ./libs/web/concrete/user-feature/feature/src/index.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebUserFeatureFeatureModule": () => (/* reexport safe */ _lib_web_user_feature_feature_module__WEBPACK_IMPORTED_MODULE_0__.WebUserFeatureFeatureModule)
/* harmony export */ });
/* harmony import */ var _lib_web_user_feature_feature_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/web-user-feature-feature.module */ 545673);


/***/ }),

/***/ 786152:
/*!**********************************************************************************************!*\
  !*** ./libs/web/concrete/user-feature/feature/src/lib/web-user-feature-feature.component.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebUserFeatureFeatureComponent": () => (/* binding */ WebUserFeatureFeatureComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 134793);


class WebUserFeatureFeatureComponent {}
WebUserFeatureFeatureComponent.ɵfac = function WebUserFeatureFeatureComponent_Factory(t) {
  return new (t || WebUserFeatureFeatureComponent)();
};
WebUserFeatureFeatureComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebUserFeatureFeatureComponent,
  selectors: [["ng-component"]],
  decls: 1,
  vars: 0,
  template: function WebUserFeatureFeatureComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    }
  },
  dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterOutlet],
  encapsulation: 2
});

/***/ }),

/***/ 545673:
/*!*******************************************************************************************!*\
  !*** ./libs/web/concrete/user-feature/feature/src/lib/web-user-feature-feature.module.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebUserFeatureFeatureModule": () => (/* binding */ WebUserFeatureFeatureModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_ui_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/ui/page */ 583747);
/* harmony import */ var _case_clinical_web_ui_sidebar_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/ui/sidebar-page */ 700241);
/* harmony import */ var _web_user_feature_feature_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./web-user-feature-feature.component */ 786152);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);







class WebUserFeatureFeatureModule {}
WebUserFeatureFeatureModule.ɵfac = function WebUserFeatureFeatureModule_Factory(t) {
  return new (t || WebUserFeatureFeatureModule)();
};
WebUserFeatureFeatureModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebUserFeatureFeatureModule
});
WebUserFeatureFeatureModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild([{
    path: '',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-libs_web_ui_pagination_src_lib_web-ui-pagination_module_ts-libs_web_ui_stacked-list_s-f63a86"), __webpack_require__.e("default-node_modules_ag-grid-community_client-side-row-model_dist_es6_main_js"), __webpack_require__.e("default-libs_web_ui_dropdown_src_lib_web-ui-dropdown_module_ts"), __webpack_require__.e("libs_web_concrete_user-feature_feature_src_lib_web-user-feature-list_web-user-feature-list_mo-e6765a")]).then(__webpack_require__.bind(__webpack_require__, /*! ./web-user-feature-list/web-user-feature-list.module */ 79663)).then(m => m.WebUserFeatureListModule)
  }, {
    path: 'create',
    loadChildren: () => __webpack_require__.e(/*! import() */ "libs_web_concrete_user-feature_feature_src_lib_web-user-feature-create_web-user-feature-creat-4e9a1f").then(__webpack_require__.bind(__webpack_require__, /*! ./web-user-feature-create/web-user-feature-create.module */ 943306)).then(m => m.WebUserFeatureCreateModule)
  }, {
    path: ':userFeatureId',
    component: _web_user_feature_feature_component__WEBPACK_IMPORTED_MODULE_3__.WebUserFeatureFeatureComponent,
    children: [{
      path: 'details',
      loadChildren: () => __webpack_require__.e(/*! import() */ "libs_web_concrete_user-feature_feature_src_lib_web-user-feature-detail_web-user-feature-detai-412ba0").then(__webpack_require__.bind(__webpack_require__, /*! ./web-user-feature-detail/web-user-feature-detail.module */ 70035)).then(m => m.WebUserFeatureDetailModule)
    }, {
      path: '',
      redirectTo: 'details'
    }]
  }]), _case_clinical_web_ui_page__WEBPACK_IMPORTED_MODULE_4__.WebUiPageModule, _case_clinical_web_ui_sidebar_page__WEBPACK_IMPORTED_MODULE_5__.WebUiSidebarPageModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebUserFeatureFeatureModule, {
    declarations: [_web_user_feature_feature_component__WEBPACK_IMPORTED_MODULE_3__.WebUserFeatureFeatureComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule, _case_clinical_web_ui_page__WEBPACK_IMPORTED_MODULE_4__.WebUiPageModule, _case_clinical_web_ui_sidebar_page__WEBPACK_IMPORTED_MODULE_5__.WebUiSidebarPageModule]
  });
})();

/***/ })

}]);