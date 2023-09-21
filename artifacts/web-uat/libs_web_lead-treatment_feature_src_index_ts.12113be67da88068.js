"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["libs_web_lead-treatment_feature_src_index_ts"],{

/***/ 820219:
/*!******************************************************!*\
  !*** ./libs/web/lead-treatment/feature/src/index.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebLeadTreatmentFeatureModule": () => (/* reexport safe */ _lib_web_lead_treatment_feature_module__WEBPACK_IMPORTED_MODULE_0__.WebLeadTreatmentFeatureModule)
/* harmony export */ });
/* harmony import */ var _lib_web_lead_treatment_feature_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/web-lead-treatment-feature.module */ 588693);


/***/ }),

/***/ 75213:
/*!*****************************************************************************************!*\
  !*** ./libs/web/lead-treatment/feature/src/lib/web-lead-treatment-feature.component.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebLeadTreatmentFeatureComponent": () => (/* binding */ WebLeadTreatmentFeatureComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 134793);


class WebLeadTreatmentFeatureComponent {}
WebLeadTreatmentFeatureComponent.ɵfac = function WebLeadTreatmentFeatureComponent_Factory(t) {
  return new (t || WebLeadTreatmentFeatureComponent)();
};
WebLeadTreatmentFeatureComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebLeadTreatmentFeatureComponent,
  selectors: [["ng-component"]],
  decls: 1,
  vars: 0,
  template: function WebLeadTreatmentFeatureComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    }
  },
  dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterOutlet],
  encapsulation: 2
});

/***/ }),

/***/ 588693:
/*!**************************************************************************************!*\
  !*** ./libs/web/lead-treatment/feature/src/lib/web-lead-treatment-feature.module.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebLeadTreatmentFeatureModule": () => (/* binding */ WebLeadTreatmentFeatureModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_ui_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/ui/page */ 583747);
/* harmony import */ var _case_clinical_web_ui_sidebar_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/ui/sidebar-page */ 700241);
/* harmony import */ var _web_lead_treatment_feature_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./web-lead-treatment-feature.component */ 75213);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);







class WebLeadTreatmentFeatureModule {}
WebLeadTreatmentFeatureModule.ɵfac = function WebLeadTreatmentFeatureModule_Factory(t) {
  return new (t || WebLeadTreatmentFeatureModule)();
};
WebLeadTreatmentFeatureModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebLeadTreatmentFeatureModule
});
WebLeadTreatmentFeatureModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild([{
    path: '',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-libs_web_ui_pagination_src_lib_web-ui-pagination_module_ts-libs_web_ui_stacked-list_s-f63a86"), __webpack_require__.e("default-libs_web_datatable_feature_src_lib_web-datatable-feature_module_ts"), __webpack_require__.e("default-libs_web_lead-treatment_shared_lead-treatment_store_ts"), __webpack_require__.e("libs_web_lead-treatment_feature_src_lib_web-lead-treatment-list_web-lead-treatment-list_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./web-lead-treatment-list/web-lead-treatment-list.module */ 837729)).then(m => m.WebLeadTreatmentListModule)
  }, {
    path: 'create',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-libs_web_lead-treatment_shared_lead-treatment_store_ts"), __webpack_require__.e("libs_web_lead-treatment_feature_src_lib_web-lead-treatment-create_web-lead-treatment-create_m-d47750")]).then(__webpack_require__.bind(__webpack_require__, /*! ./web-lead-treatment-create/web-lead-treatment-create.module */ 520492)).then(m => m.WebLeadTreatmentCreateModule)
  }, {
    path: ':leadTreatmentId',
    component: _web_lead_treatment_feature_component__WEBPACK_IMPORTED_MODULE_3__.WebLeadTreatmentFeatureComponent,
    children: [{
      path: 'details',
      loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-libs_web_lead-treatment_shared_lead-treatment_store_ts"), __webpack_require__.e("libs_web_lead-treatment_feature_src_lib_web-lead-treatment-detail_web-lead-treatment-detail_m-659eee")]).then(__webpack_require__.bind(__webpack_require__, /*! ./web-lead-treatment-detail/web-lead-treatment-detail.module */ 339174)).then(m => m.WebLeadTreatmentDetailModule)
    }, {
      path: '',
      pathMatch: 'full',
      redirectTo: 'details'
    }]
  }]), _case_clinical_web_ui_page__WEBPACK_IMPORTED_MODULE_4__.WebUiPageModule, _case_clinical_web_ui_sidebar_page__WEBPACK_IMPORTED_MODULE_5__.WebUiSidebarPageModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebLeadTreatmentFeatureModule, {
    declarations: [_web_lead_treatment_feature_component__WEBPACK_IMPORTED_MODULE_3__.WebLeadTreatmentFeatureComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule, _case_clinical_web_ui_page__WEBPACK_IMPORTED_MODULE_4__.WebUiPageModule, _case_clinical_web_ui_sidebar_page__WEBPACK_IMPORTED_MODULE_5__.WebUiSidebarPageModule]
  });
})();

/***/ })

}]);