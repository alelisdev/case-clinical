"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["libs_web_role-feature-permission_feature_src_index_ts"],{

/***/ 97807:
/*!***************************************************************!*\
  !*** ./libs/web/role-feature-permission/feature/src/index.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebRoleFeaturePermissionFeatureModule": () => (/* reexport safe */ _lib_web_role_feature_permission_feature_module__WEBPACK_IMPORTED_MODULE_0__.WebRoleFeaturePermissionFeatureModule)
/* harmony export */ });
/* harmony import */ var _lib_web_role_feature_permission_feature_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/web-role-feature-permission-feature.module */ 889610);


/***/ }),

/***/ 808748:
/*!***********************************************************************************************************!*\
  !*** ./libs/web/role-feature-permission/feature/src/lib/web-role-feature-permission-feature.component.ts ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebRoleFeaturePermissionFeatureComponent": () => (/* binding */ WebRoleFeaturePermissionFeatureComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 134793);


class WebRoleFeaturePermissionFeatureComponent {}
WebRoleFeaturePermissionFeatureComponent.ɵfac = function WebRoleFeaturePermissionFeatureComponent_Factory(t) {
  return new (t || WebRoleFeaturePermissionFeatureComponent)();
};
WebRoleFeaturePermissionFeatureComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebRoleFeaturePermissionFeatureComponent,
  selectors: [["ng-component"]],
  decls: 1,
  vars: 0,
  template: function WebRoleFeaturePermissionFeatureComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    }
  },
  dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterOutlet],
  encapsulation: 2
});

/***/ }),

/***/ 889610:
/*!********************************************************************************************************!*\
  !*** ./libs/web/role-feature-permission/feature/src/lib/web-role-feature-permission-feature.module.ts ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebRoleFeaturePermissionFeatureModule": () => (/* binding */ WebRoleFeaturePermissionFeatureModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_ui_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/ui/page */ 583747);
/* harmony import */ var _case_clinical_web_ui_sidebar_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/ui/sidebar-page */ 700241);
/* harmony import */ var _web_role_feature_permission_feature_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./web-role-feature-permission-feature.component */ 808748);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);







class WebRoleFeaturePermissionFeatureModule {}
WebRoleFeaturePermissionFeatureModule.ɵfac = function WebRoleFeaturePermissionFeatureModule_Factory(t) {
  return new (t || WebRoleFeaturePermissionFeatureModule)();
};
WebRoleFeaturePermissionFeatureModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebRoleFeaturePermissionFeatureModule
});
WebRoleFeaturePermissionFeatureModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild([{
    path: '',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-libs_web_ui_pagination_src_lib_web-ui-pagination_module_ts-libs_web_ui_stacked-list_s-f63a86"), __webpack_require__.e("default-libs_web_datatable_feature_src_lib_web-datatable-feature_module_ts"), __webpack_require__.e("default-libs_web_role-feature-permission_shared_role-feature-permission_store_ts"), __webpack_require__.e("libs_web_role-feature-permission_feature_src_lib_web-role-feature-permission-list_web-role-fe-2c2f18")]).then(__webpack_require__.bind(__webpack_require__, /*! ./web-role-feature-permission-list/web-role-feature-permission-list.module */ 505500)).then(m => m.WebRoleFeaturePermissionListModule)
  }, {
    path: 'create',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-libs_web_role-feature-permission_shared_role-feature-permission_store_ts"), __webpack_require__.e("libs_web_role-feature-permission_feature_src_lib_web-role-feature-permission-create_web-role--26b436")]).then(__webpack_require__.bind(__webpack_require__, /*! ./web-role-feature-permission-create/web-role-feature-permission-create.module */ 373019)).then(m => m.WebRoleFeaturePermissionCreateModule)
  }, {
    path: ':roleFeaturePermissionId',
    component: _web_role_feature_permission_feature_component__WEBPACK_IMPORTED_MODULE_3__.WebRoleFeaturePermissionFeatureComponent,
    children: [{
      path: 'details',
      loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-libs_web_role-feature-permission_shared_role-feature-permission_store_ts"), __webpack_require__.e("libs_web_role-feature-permission_feature_src_lib_web-role-feature-permission-detail_web-role--74c243")]).then(__webpack_require__.bind(__webpack_require__, /*! ./web-role-feature-permission-detail/web-role-feature-permission-detail.module */ 816258)).then(m => m.WebRoleFeaturePermissionDetailModule)
    }, {
      path: '',
      pathMatch: 'full',
      redirectTo: 'details'
    }]
  }]), _case_clinical_web_ui_page__WEBPACK_IMPORTED_MODULE_4__.WebUiPageModule, _case_clinical_web_ui_sidebar_page__WEBPACK_IMPORTED_MODULE_5__.WebUiSidebarPageModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebRoleFeaturePermissionFeatureModule, {
    declarations: [_web_role_feature_permission_feature_component__WEBPACK_IMPORTED_MODULE_3__.WebRoleFeaturePermissionFeatureComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule, _case_clinical_web_ui_page__WEBPACK_IMPORTED_MODULE_4__.WebUiPageModule, _case_clinical_web_ui_sidebar_page__WEBPACK_IMPORTED_MODULE_5__.WebUiSidebarPageModule]
  });
})();

/***/ })

}]);