"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["libs_web_concrete_user-feature-permission_feature_src_index_ts"],{

/***/ 664871:
/*!************************************************************************!*\
  !*** ./libs/web/concrete/user-feature-permission/feature/src/index.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebUserFeaturePermissionFeatureModule": () => (/* reexport safe */ _lib_web_user_feature_permission_feature_module__WEBPACK_IMPORTED_MODULE_0__.WebUserFeaturePermissionFeatureModule)
/* harmony export */ });
/* harmony import */ var _lib_web_user_feature_permission_feature_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/web-user-feature-permission-feature.module */ 823217);


/***/ }),

/***/ 652266:
/*!********************************************************************************************************************!*\
  !*** ./libs/web/concrete/user-feature-permission/feature/src/lib/web-user-feature-permission-feature.component.ts ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebUserFeaturePermissionFeatureComponent": () => (/* binding */ WebUserFeaturePermissionFeatureComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 134793);


class WebUserFeaturePermissionFeatureComponent {}
WebUserFeaturePermissionFeatureComponent.ɵfac = function WebUserFeaturePermissionFeatureComponent_Factory(t) {
  return new (t || WebUserFeaturePermissionFeatureComponent)();
};
WebUserFeaturePermissionFeatureComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebUserFeaturePermissionFeatureComponent,
  selectors: [["ng-component"]],
  decls: 1,
  vars: 0,
  template: function WebUserFeaturePermissionFeatureComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    }
  },
  dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterOutlet],
  encapsulation: 2
});

/***/ }),

/***/ 823217:
/*!*****************************************************************************************************************!*\
  !*** ./libs/web/concrete/user-feature-permission/feature/src/lib/web-user-feature-permission-feature.module.ts ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebUserFeaturePermissionFeatureModule": () => (/* binding */ WebUserFeaturePermissionFeatureModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_ui_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/ui/page */ 583747);
/* harmony import */ var _case_clinical_web_ui_sidebar_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/ui/sidebar-page */ 700241);
/* harmony import */ var _web_user_feature_permission_feature_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./web-user-feature-permission-feature.component */ 652266);
/* harmony import */ var libs_web_ui_forms_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! libs/web/ui-forms-shared.module */ 271992);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);








class WebUserFeaturePermissionFeatureModule {}
WebUserFeaturePermissionFeatureModule.ɵfac = function WebUserFeaturePermissionFeatureModule_Factory(t) {
  return new (t || WebUserFeaturePermissionFeatureModule)();
};
WebUserFeaturePermissionFeatureModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebUserFeaturePermissionFeatureModule
});
WebUserFeaturePermissionFeatureModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, libs_web_ui_forms_shared_module__WEBPACK_IMPORTED_MODULE_2__.UiFormsSharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild([{
    path: '',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-libs_web_ui_pagination_src_lib_web-ui-pagination_module_ts-libs_web_ui_stacked-list_s-f63a86"), __webpack_require__.e("default-node_modules_ag-grid-community_client-side-row-model_dist_es6_main_js"), __webpack_require__.e("default-libs_web_ui_dropdown_src_lib_web-ui-dropdown_module_ts"), __webpack_require__.e("libs_web_concrete_user-feature-permission_feature_src_lib_web-user-feature-permission-list_we-6a6cf9")]).then(__webpack_require__.bind(__webpack_require__, /*! ./web-user-feature-permission-list/web-user-feature-permission-list.module */ 262560)).then(m => m.WebUserFeaturePermissionListModule)
  }, {
    path: 'create',
    loadChildren: () => __webpack_require__.e(/*! import() */ "libs_web_concrete_user-feature-permission_feature_src_lib_web-user-feature-permission-create_-8ddad1").then(__webpack_require__.bind(__webpack_require__, /*! ./web-user-feature-permission-create/web-user-feature-permission-create.module */ 347769)).then(m => m.WebUserFeaturePermissionCreateModule)
  }, {
    path: ':userFeaturePermissionId',
    component: _web_user_feature_permission_feature_component__WEBPACK_IMPORTED_MODULE_4__.WebUserFeaturePermissionFeatureComponent,
    children: [{
      path: 'details',
      loadChildren: () => __webpack_require__.e(/*! import() */ "libs_web_concrete_user-feature-permission_feature_src_lib_web-user-feature-permission-detail_-c422ec").then(__webpack_require__.bind(__webpack_require__, /*! ./web-user-feature-permission-detail/web-user-feature-permission-detail.module */ 567298)).then(m => m.WebUserFeaturePermissionDetailModule)
    }, {
      path: '',
      redirectTo: 'details'
    }]
  }]), _case_clinical_web_ui_page__WEBPACK_IMPORTED_MODULE_5__.WebUiPageModule, _case_clinical_web_ui_sidebar_page__WEBPACK_IMPORTED_MODULE_6__.WebUiSidebarPageModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebUserFeaturePermissionFeatureModule, {
    declarations: [_web_user_feature_permission_feature_component__WEBPACK_IMPORTED_MODULE_4__.WebUserFeaturePermissionFeatureComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, libs_web_ui_forms_shared_module__WEBPACK_IMPORTED_MODULE_2__.UiFormsSharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule, _case_clinical_web_ui_page__WEBPACK_IMPORTED_MODULE_5__.WebUiPageModule, _case_clinical_web_ui_sidebar_page__WEBPACK_IMPORTED_MODULE_6__.WebUiSidebarPageModule]
  });
})();

/***/ })

}]);