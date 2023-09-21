"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["libs_web_lead-injury_feature_src_index_ts"],{

/***/ 466893:
/*!***************************************************!*\
  !*** ./libs/web/lead-injury/feature/src/index.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebLeadInjuryFeatureModule": () => (/* reexport safe */ _lib_web_lead_injury_feature_module__WEBPACK_IMPORTED_MODULE_0__.WebLeadInjuryFeatureModule)
/* harmony export */ });
/* harmony import */ var _lib_web_lead_injury_feature_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/web-lead-injury-feature.module */ 161740);


/***/ }),

/***/ 343485:
/*!***********************************************************************************!*\
  !*** ./libs/web/lead-injury/feature/src/lib/web-lead-injury-feature.component.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebLeadInjuryFeatureComponent": () => (/* binding */ WebLeadInjuryFeatureComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 134793);


class WebLeadInjuryFeatureComponent {}
WebLeadInjuryFeatureComponent.ɵfac = function WebLeadInjuryFeatureComponent_Factory(t) {
  return new (t || WebLeadInjuryFeatureComponent)();
};
WebLeadInjuryFeatureComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebLeadInjuryFeatureComponent,
  selectors: [["ng-component"]],
  decls: 1,
  vars: 0,
  template: function WebLeadInjuryFeatureComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    }
  },
  dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterOutlet],
  encapsulation: 2
});

/***/ }),

/***/ 161740:
/*!********************************************************************************!*\
  !*** ./libs/web/lead-injury/feature/src/lib/web-lead-injury-feature.module.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebLeadInjuryFeatureModule": () => (/* binding */ WebLeadInjuryFeatureModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_ui_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/ui/page */ 583747);
/* harmony import */ var _case_clinical_web_ui_sidebar_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/ui/sidebar-page */ 700241);
/* harmony import */ var _web_lead_injury_feature_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./web-lead-injury-feature.component */ 343485);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);







class WebLeadInjuryFeatureModule {}
WebLeadInjuryFeatureModule.ɵfac = function WebLeadInjuryFeatureModule_Factory(t) {
  return new (t || WebLeadInjuryFeatureModule)();
};
WebLeadInjuryFeatureModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebLeadInjuryFeatureModule
});
WebLeadInjuryFeatureModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild([{
    path: '',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-libs_web_ui_pagination_src_lib_web-ui-pagination_module_ts-libs_web_ui_stacked-list_s-f63a86"), __webpack_require__.e("default-libs_web_datatable_feature_src_lib_web-datatable-feature_module_ts"), __webpack_require__.e("default-libs_web_lead-injury_shared_lead-injury_store_ts"), __webpack_require__.e("libs_web_lead-injury_feature_src_lib_web-lead-injury-list_web-lead-injury-list_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./web-lead-injury-list/web-lead-injury-list.module */ 658946)).then(m => m.WebLeadInjuryListModule)
  }, {
    path: 'create',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-libs_web_lead-injury_shared_lead-injury_store_ts"), __webpack_require__.e("libs_web_lead-injury_feature_src_lib_web-lead-injury-create_web-lead-injury-create_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./web-lead-injury-create/web-lead-injury-create.module */ 165519)).then(m => m.WebLeadInjuryCreateModule)
  }, {
    path: ':leadInjuryId',
    component: _web_lead_injury_feature_component__WEBPACK_IMPORTED_MODULE_3__.WebLeadInjuryFeatureComponent,
    children: [{
      path: 'details',
      loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-libs_web_lead-injury_shared_lead-injury_store_ts"), __webpack_require__.e("libs_web_lead-injury_feature_src_lib_web-lead-injury-detail_web-lead-injury-detail_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./web-lead-injury-detail/web-lead-injury-detail.module */ 843542)).then(m => m.WebLeadInjuryDetailModule)
    }, {
      path: '',
      pathMatch: 'full',
      redirectTo: 'details'
    }]
  }]), _case_clinical_web_ui_page__WEBPACK_IMPORTED_MODULE_4__.WebUiPageModule, _case_clinical_web_ui_sidebar_page__WEBPACK_IMPORTED_MODULE_5__.WebUiSidebarPageModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebLeadInjuryFeatureModule, {
    declarations: [_web_lead_injury_feature_component__WEBPACK_IMPORTED_MODULE_3__.WebLeadInjuryFeatureComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule, _case_clinical_web_ui_page__WEBPACK_IMPORTED_MODULE_4__.WebUiPageModule, _case_clinical_web_ui_sidebar_page__WEBPACK_IMPORTED_MODULE_5__.WebUiSidebarPageModule]
  });
})();

/***/ })

}]);