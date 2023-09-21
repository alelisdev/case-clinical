"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["libs_web_invoice-detail_feature_src_index_ts"],{

/***/ 689525:
/*!******************************************************!*\
  !*** ./libs/web/invoice-detail/feature/src/index.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebInvoiceDetailFeatureModule": () => (/* reexport safe */ _lib_web_invoice_detail_feature_module__WEBPACK_IMPORTED_MODULE_0__.WebInvoiceDetailFeatureModule)
/* harmony export */ });
/* harmony import */ var _lib_web_invoice_detail_feature_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/web-invoice-detail-feature.module */ 981580);


/***/ }),

/***/ 766210:
/*!*****************************************************************************************!*\
  !*** ./libs/web/invoice-detail/feature/src/lib/web-invoice-detail-feature.component.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebInvoiceDetailFeatureComponent": () => (/* binding */ WebInvoiceDetailFeatureComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 134793);


class WebInvoiceDetailFeatureComponent {}
WebInvoiceDetailFeatureComponent.ɵfac = function WebInvoiceDetailFeatureComponent_Factory(t) {
  return new (t || WebInvoiceDetailFeatureComponent)();
};
WebInvoiceDetailFeatureComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebInvoiceDetailFeatureComponent,
  selectors: [["ng-component"]],
  decls: 1,
  vars: 0,
  template: function WebInvoiceDetailFeatureComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    }
  },
  dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterOutlet],
  encapsulation: 2
});

/***/ }),

/***/ 981580:
/*!**************************************************************************************!*\
  !*** ./libs/web/invoice-detail/feature/src/lib/web-invoice-detail-feature.module.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebInvoiceDetailFeatureModule": () => (/* binding */ WebInvoiceDetailFeatureModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_ui_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/ui/page */ 583747);
/* harmony import */ var _case_clinical_web_ui_sidebar_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/ui/sidebar-page */ 700241);
/* harmony import */ var _web_invoice_detail_feature_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./web-invoice-detail-feature.component */ 766210);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);







class WebInvoiceDetailFeatureModule {}
WebInvoiceDetailFeatureModule.ɵfac = function WebInvoiceDetailFeatureModule_Factory(t) {
  return new (t || WebInvoiceDetailFeatureModule)();
};
WebInvoiceDetailFeatureModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebInvoiceDetailFeatureModule
});
WebInvoiceDetailFeatureModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild([{
    path: '',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-libs_web_ui_pagination_src_lib_web-ui-pagination_module_ts-libs_web_ui_stacked-list_s-f63a86"), __webpack_require__.e("default-libs_web_datatable_feature_src_lib_web-datatable-feature_module_ts"), __webpack_require__.e("libs_web_invoice-detail_feature_src_lib_web-invoice-detail-list_web-invoice-detail-list_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./web-invoice-detail-list/web-invoice-detail-list.module */ 718723)).then(m => m.WebInvoiceDetailListModule)
  }, {
    path: 'create',
    loadChildren: () => __webpack_require__.e(/*! import() */ "libs_web_invoice-detail_feature_src_lib_web-invoice-detail-create_web-invoice-detail-create_m-a8f552").then(__webpack_require__.bind(__webpack_require__, /*! ./web-invoice-detail-create/web-invoice-detail-create.module */ 291001)).then(m => m.WebInvoiceDetailCreateModule)
  }, {
    path: ':invoiceDetailId',
    component: _web_invoice_detail_feature_component__WEBPACK_IMPORTED_MODULE_3__.WebInvoiceDetailFeatureComponent,
    children: [{
      path: 'details',
      loadChildren: () => __webpack_require__.e(/*! import() */ "libs_web_invoice-detail_feature_src_lib_web-invoice-detail-detail_web-invoice-detail-detail_m-c23055").then(__webpack_require__.bind(__webpack_require__, /*! ./web-invoice-detail-detail/web-invoice-detail-detail.module */ 581421)).then(m => m.WebInvoiceDetailDetailModule)
    }, {
      path: '',
      pathMatch: 'full',
      redirectTo: 'details'
    }]
  }]), _case_clinical_web_ui_page__WEBPACK_IMPORTED_MODULE_4__.WebUiPageModule, _case_clinical_web_ui_sidebar_page__WEBPACK_IMPORTED_MODULE_5__.WebUiSidebarPageModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebInvoiceDetailFeatureModule, {
    declarations: [_web_invoice_detail_feature_component__WEBPACK_IMPORTED_MODULE_3__.WebInvoiceDetailFeatureComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule, _case_clinical_web_ui_page__WEBPACK_IMPORTED_MODULE_4__.WebUiPageModule, _case_clinical_web_ui_sidebar_page__WEBPACK_IMPORTED_MODULE_5__.WebUiSidebarPageModule]
  });
})();

/***/ })

}]);