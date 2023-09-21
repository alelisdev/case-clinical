"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["libs_web_concrete_template_feature_src_lib_web-template-detail_web-template-detail_store_ts"],{

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

/***/ })

}]);