"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["libs_web_concrete_template_feature_src_index_ts"],{

/***/ 850395:
/*!*********************************************************!*\
  !*** ./libs/web/concrete/template/feature/src/index.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebTemplateDetailStore": () => (/* reexport safe */ _lib_web_template_detail_web_template_detail_store__WEBPACK_IMPORTED_MODULE_1__.WebTemplateDetailStore),
/* harmony export */   "WebTemplateFeatureModule": () => (/* reexport safe */ _lib_web_template_feature_module__WEBPACK_IMPORTED_MODULE_0__.WebTemplateFeatureModule)
/* harmony export */ });
/* harmony import */ var _lib_web_template_feature_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/web-template-feature.module */ 183182);
/* harmony import */ var _lib_web_template_detail_web_template_detail_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/web-template-detail/web-template-detail.store */ 413019);



/***/ }),

/***/ 413019:
/*!*****************************************************************************************************!*\
  !*** ./libs/web/concrete/template/feature/src/lib/web-template-detail/web-template-detail.store.ts ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebTemplateDetailStore": () => (/* binding */ WebTemplateDetailStore)
/* harmony export */ });
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 318505);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 763900);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 654004);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 134793);







class WebTemplateDetailStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route) {
    var _a;
    super({
      loading: false
    });
    this.data = data;
    this.router = router;
    this.route = route;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.item$ = this.select(s => s.item);
    this.template$ = this.select(this.item$, item => item);
    this.displayItems$ = this.select(this.item$, item => [{
      label: 'Id',
      value: item === null || item === void 0 ? void 0 : item.id
    }, {
      label: 'Name',
      value: item === null || item === void 0 ? void 0 : item.name
    }, {
      label: 'Attachment',
      value: item === null || item === void 0 ? void 0 : item.attachment
    }, {
      label: 'Encoding',
      value: item === null || item === void 0 ? void 0 : item.encoding
    }, {
      label: 'Signature File Type',
      value: item === null || item === void 0 ? void 0 : item.signatureFileType
    }, {
      label: 'Assigned Documents',
      value: item === null || item === void 0 ? void 0 : item.assignedDocuments
    }]);
    this.tabs$ = this.select(this.item$, item => [{
      label: 'Details',
      path: 'details',
      data: item
    }, {
      label: 'Assigned Document',
      path: 'assigned-document',
      data: item === null || item === void 0 ? void 0 : item.assignedDocuments
    }]);
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.tabs$, (errors, loading, item, tabs) => ({
      errors,
      loading,
      item: Object.assign({}, item),
      tabs
    }), {
      debounce: true
    });
    this.loadTemplateEffect = this.effect(templateId$ => templateId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.setState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(templateId => {
      console.log('template id ', templateId);
      return this.data.userTemplate({
        templateId
      }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
        item: res.data.item,
        errors: res.errors,
        loading: false
      }), errors => this.patchState({
        loading: false,
        errors: errors.graphQLErrors ? errors.graphQLErrors : errors
      })));
    })));
    this.deleteTemplateEffect = this.effect(template$ => template$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(template => this.data.userDeleteTemplate({
      templateId: template.id
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.router.navigate(['/queues/templates']), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    if ((_a = this.route.snapshot.params) === null || _a === void 0 ? void 0 : _a.templateId) {
      this.loadTemplateEffect(route.params.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(param => param.templateId)));
    }
  }
}
WebTemplateDetailStore.ɵfac = function WebTemplateDetailStore_Factory(t) {
  return new (t || WebTemplateDetailStore)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_5__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.ActivatedRoute));
};
WebTemplateDetailStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
  token: WebTemplateDetailStore,
  factory: WebTemplateDetailStore.ɵfac
});

/***/ }),

/***/ 293181:
/*!**************************************************************************************!*\
  !*** ./libs/web/concrete/template/feature/src/lib/web-template-feature.component.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebTemplateFeatureComponent": () => (/* binding */ WebTemplateFeatureComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 134793);


class WebTemplateFeatureComponent {}
WebTemplateFeatureComponent.ɵfac = function WebTemplateFeatureComponent_Factory(t) {
  return new (t || WebTemplateFeatureComponent)();
};
WebTemplateFeatureComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebTemplateFeatureComponent,
  selectors: [["ng-component"]],
  decls: 1,
  vars: 0,
  template: function WebTemplateFeatureComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    }
  },
  dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterOutlet],
  encapsulation: 2
});

/***/ }),

/***/ 183182:
/*!***********************************************************************************!*\
  !*** ./libs/web/concrete/template/feature/src/lib/web-template-feature.module.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebTemplateFeatureModule": () => (/* binding */ WebTemplateFeatureModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_ui_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/ui/page */ 583747);
/* harmony import */ var _case_clinical_web_ui_sidebar_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/ui/sidebar-page */ 700241);
/* harmony import */ var _txtextcontrol_tx_ng_document_viewer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @txtextcontrol/tx-ng-document-viewer */ 770383);
/* harmony import */ var _web_template_feature_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./web-template-feature.component */ 293181);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);








class WebTemplateFeatureModule {}
WebTemplateFeatureModule.ɵfac = function WebTemplateFeatureModule_Factory(t) {
  return new (t || WebTemplateFeatureModule)();
};
WebTemplateFeatureModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebTemplateFeatureModule
});
WebTemplateFeatureModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _txtextcontrol_tx_ng_document_viewer__WEBPACK_IMPORTED_MODULE_2__.DocumentViewerModule, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild([{
    path: '',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-libs_web_ui_button_src_lib_web-ui-button_module_ts"), __webpack_require__.e("default-node_modules_ngx-formly_core_fesm2015_ngx-formly-core_js"), __webpack_require__.e("default-node_modules_ag-grid-enterprise_menu_dist_es6_main_js-node_modules_ag-grid-enterprise-cdffd8"), __webpack_require__.e("default-libs_web_ui_formly-form-switch_src_lib_web-ui-formly-form-switch_module_ts"), __webpack_require__.e("default-libs_web_ui_form_src_lib_form_service_ts"), __webpack_require__.e("default-libs_web_ui_card-header_src_lib_web-ui-card-header_module_ts-libs_web_ui_panel_src_li-a3ecef"), __webpack_require__.e("default-libs_web_ui_pagination_src_lib_web-ui-pagination_module_ts-libs_web_ui_stacked-list_s-f63a86"), __webpack_require__.e("default-node_modules_ag-grid-community_client-side-row-model_dist_es6_main_js"), __webpack_require__.e("default-libs_web_ui_dropdown_src_lib_web-ui-dropdown_module_ts"), __webpack_require__.e("default-libs_web_ui_page-header_src_lib_web-ui-page-header_module_ts-node_modules_ag-grid-ang-5fca80"), __webpack_require__.e("libs_web_concrete_template_feature_src_lib_web-template-list_web-template-list_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./web-template-list/web-template-list.module */ 367591)).then(m => m.WebTemplateListModule)
  }, {
    path: 'create',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-libs_web_ui_button_src_lib_web-ui-button_module_ts"), __webpack_require__.e("default-node_modules_ngx-formly_core_fesm2015_ngx-formly-core_js"), __webpack_require__.e("default-node_modules_angular_material_fesm2020_checkbox_mjs"), __webpack_require__.e("default-node_modules_ag-grid-enterprise_menu_dist_es6_main_js-node_modules_ag-grid-enterprise-cdffd8"), __webpack_require__.e("default-libs_web_ui_formly-form-switch_src_lib_web-ui-formly-form-switch_module_ts"), __webpack_require__.e("default-node_modules_angular_material_fesm2020_select_mjs"), __webpack_require__.e("default-node_modules_angular_material_fesm2020_progress-spinner_mjs"), __webpack_require__.e("default-libs_web_ui_form_src_lib_form_service_ts"), __webpack_require__.e("default-node_modules_angular_material_fesm2020_expansion_mjs"), __webpack_require__.e("default-node_modules_ng-select_ng-select_fesm2015_ng-select-ng-select_js-libs_web_ui_form_src-48939d"), __webpack_require__.e("default-node_modules_angular_cdk_fesm2020_drag-drop_mjs"), __webpack_require__.e("default-libs_web_ui_weather-widget_src_lib_web-ui-weather-widget_module_ts-node_modules_ang-m-285e76"), __webpack_require__.e("default-node_modules_ng-click-outside_lib_esmodule_index_js-node_modules_angular_material_fes-d2041b"), __webpack_require__.e("default-node_modules_angular_material_fesm2020_paginator_mjs"), __webpack_require__.e("default-libs_web_ui_file-preview_web-ui-file-preview_module_ts"), __webpack_require__.e("default-libs_web_ui_form_src_lib_web-ui-form_module_ts"), __webpack_require__.e("default-libs_web_ui_card-header_src_lib_web-ui-card-header_module_ts-libs_web_ui_panel_src_li-a3ecef"), __webpack_require__.e("libs_web_concrete_template_feature_src_lib_web-template-create_web-template-create_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./web-template-create/web-template-create.module */ 671872)).then(m => m.WebTemplateCreateModule)
  }, {
    path: ':templateId',
    component: _web_template_feature_component__WEBPACK_IMPORTED_MODULE_4__.WebTemplateFeatureComponent,
    children: [{
      path: 'details',
      loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-libs_web_ui_button_src_lib_web-ui-button_module_ts"), __webpack_require__.e("default-node_modules_ngx-formly_core_fesm2015_ngx-formly-core_js"), __webpack_require__.e("default-node_modules_angular_material_fesm2020_checkbox_mjs"), __webpack_require__.e("default-node_modules_ag-grid-enterprise_menu_dist_es6_main_js-node_modules_ag-grid-enterprise-cdffd8"), __webpack_require__.e("default-libs_web_ui_formly-form-switch_src_lib_web-ui-formly-form-switch_module_ts"), __webpack_require__.e("default-node_modules_angular_material_fesm2020_select_mjs"), __webpack_require__.e("default-node_modules_angular_material_fesm2020_progress-spinner_mjs"), __webpack_require__.e("default-libs_web_ui_form_src_lib_form_service_ts"), __webpack_require__.e("default-node_modules_angular_material_fesm2020_expansion_mjs"), __webpack_require__.e("default-node_modules_ng-select_ng-select_fesm2015_ng-select-ng-select_js-libs_web_ui_form_src-48939d"), __webpack_require__.e("default-node_modules_angular_cdk_fesm2020_drag-drop_mjs"), __webpack_require__.e("default-libs_web_ui_weather-widget_src_lib_web-ui-weather-widget_module_ts-node_modules_ang-m-285e76"), __webpack_require__.e("default-node_modules_ng-click-outside_lib_esmodule_index_js-node_modules_angular_material_fes-d2041b"), __webpack_require__.e("default-node_modules_angular_material_fesm2020_paginator_mjs"), __webpack_require__.e("default-libs_web_ui_file-preview_web-ui-file-preview_module_ts"), __webpack_require__.e("default-libs_web_ui_form_src_lib_web-ui-form_module_ts"), __webpack_require__.e("default-libs_web_ui_card-header_src_lib_web-ui-card-header_module_ts-libs_web_ui_panel_src_li-a3ecef"), __webpack_require__.e("default-node_modules_angular_material_fesm2020_sidenav_mjs"), __webpack_require__.e("default-libs_web_fuse_components_alert_alert_module_ts"), __webpack_require__.e("default-node_modules_angular_material_fesm2020_tree_mjs"), __webpack_require__.e("default-libs_web_fuse_components_highlight_highlight_module_ts-libs_web_fuse_directives_scrol-d464ac"), __webpack_require__.e("libs_web_concrete_template_feature_src_lib_web-template-detail_web-template-detail_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./web-template-detail/web-template-detail.module */ 169715)).then(m => m.WebTemplateDetailModule)
    }, {
      path: '',
      pathMatch: 'full',
      redirectTo: 'details'
    }]
  }]), _case_clinical_web_ui_page__WEBPACK_IMPORTED_MODULE_5__.WebUiPageModule, _case_clinical_web_ui_sidebar_page__WEBPACK_IMPORTED_MODULE_6__.WebUiSidebarPageModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebTemplateFeatureModule, {
    declarations: [_web_template_feature_component__WEBPACK_IMPORTED_MODULE_4__.WebTemplateFeatureComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _txtextcontrol_tx_ng_document_viewer__WEBPACK_IMPORTED_MODULE_2__.DocumentViewerModule, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule, _case_clinical_web_ui_page__WEBPACK_IMPORTED_MODULE_5__.WebUiPageModule, _case_clinical_web_ui_sidebar_page__WEBPACK_IMPORTED_MODULE_6__.WebUiSidebarPageModule]
  });
})();

/***/ })

}]);