"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["libs_web_concrete_template_feature_src_lib_web-template-detail_web-template-detail_store_ts-l-998c84"],{

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

/***/ 52082:
/*!*************************************************************************!*\
  !*** ./libs/web/modules/admin/web-templates/web-templates.component.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebTemplatesComponent": () => (/* binding */ WebTemplatesComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _web_templates_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./web-templates.store */ 64018);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




class WebTemplatesComponent {
  constructor(store) {
    this.store = store;
    this.formData = {
      "cases": [{
        "patientName": "Beyonce Knowles",
        "dateOfLoss": "2016-01-16",
        "dateSettled": "2019-12-12",
        "dateReceived": "2016-01-01",
        "billedCharge": 10000,
        "siteCost": 1000,
        "settledPayment": 100000,
        "discountedRate": 20,
        "siteCostReturn": 100000
      }, {
        "patientName": "Mark Hamill",
        "dateOfLoss": "2019-05-06",
        "dateSettled": "2019-11-15",
        "dateReceived": "2016-01-01",
        "billedCharge": 10000,
        "siteCost": 1000,
        "settledPayment": 100000,
        "discountedRate": 20,
        "siteCostReturn": 100000
      }, {
        "patientName": "Judy Garland",
        "dateOfLoss": "2019-05-06",
        "dateSettled": "2019-11-15",
        "dateReceived": "2016-01-01",
        "billedCharge": 10000,
        "siteCost": 1000,
        "settledPayment": 100000,
        "discountedRate": 20,
        "siteCostReturn": 100000
      }, {
        "patientName": "Taylor Swift",
        "dateOfLoss": "2019-05-06",
        "dateSettled": "2019-11-15",
        "dateReceived": "2016-01-01",
        "billedCharge": 10000,
        "siteCost": 1000,
        "settledPayment": 100000,
        "discountedRate": 20,
        "siteCostReturn": 100000
      }],
      "bills": [{
        "providerName": "David Eldringhoff",
        "billAmount": 500,
        "promiseToPay": 250,
        "percentOfBilledCharges": 50
      }, {
        "providerName": "Bay City Surgery Center",
        "billAmount": 500,
        "promiseToPay": 250,
        "percentOfBilledCharges": 50
      }, {
        "providerName": "Total Outside Meds",
        "billAmount": 500,
        "promiseToPay": 250,
        "percentOfBilledCharges": 50
      }, {
        "providerName": "Lien Total",
        "billAmount": 500,
        "promiseToPay": 250,
        "percentOfBilledCharges": 50
      }],
      "microDecompressions": [{
        "invoiceTotal": 200,
        "siteCost": 50,
        "offerAmount": 150,
        "percentOfBilledCharges": 75,
        "percentOfSiteCosts": 300,
        "roi": 100,
        "proRata": 208.33,
        "xOne": 50,
        "xTwo": 100,
        "xThree": 150,
        "xFour": 200,
        "offerDate": "2023-05-09",
        "mode": "Locked"
      }, {
        "invoiceTotal": 200,
        "siteCost": 50,
        "offerAmount": 150,
        "percentOfBilledCharges": 75,
        "percentOfSiteCosts": 300,
        "roi": 100,
        "proRata": 208.33,
        "xOne": 50,
        "xTwo": 100,
        "xThree": 150,
        "xFour": 200,
        "offerDate": "2023-05-09",
        "mode": "Locked"
      }],
      "visit": [{
        "invoiceTotal": 200,
        "siteCost": 50,
        "offerAmount": 150,
        "percentOfBilledCharges": 75,
        "percentOfSiteCosts": 300,
        "roi": 100,
        "proRata": 208.33,
        "xOne": 50,
        "xTwo": 100,
        "xThree": 150,
        "xFour": 200,
        "offerDate": "2023-05-09",
        "mode": "Locked"
      }, {
        "invoiceTotal": 200,
        "siteCost": 50,
        "offerAmount": 150,
        "percentOfBilledCharges": 75,
        "percentOfSiteCosts": 300,
        "roi": 100,
        "proRata": 208.33,
        "xOne": 50,
        "xTwo": 100,
        "xThree": 150,
        "xFour": 200,
        "offerDate": "2023-05-09",
        "mode": "Locked"
      }],
      "filterItems": [{
        "id": "Written Off",
        "title": "Written Off"
      }, {
        "id": "All",
        "title": "All"
      }],
      "settlementValues": {},
      "invoices": [{
        "name": "Overview.pdf",
        "size": 135
      }, {
        "name": "Details.pdf",
        "size": 165
      }, {
        "name": "Conclusion.pdf",
        "size": 535
      }]
    };
    this.defaultLatitude = 36.98500309285596;
    this.defaultLongitude = -79.189453125;
    this.data = [{
      lat: 37.985003092856,
      lng: -80.189453125
    }, {
      lat: 38.985003092856,
      lng: -81.189453125
    }, {
      lat: 35.985003092856,
      lng: -82.189453125
    }, {
      lat: 33.985003092856,
      lng: -80.389453125
    }];
  }
  ngOnInit() {}
  remove() {
    this.data.pop();
  }
  refresh() {
    this.data.at(0).lat = 0;
    // this.data = [
    //   {
    //     lat: 37.985003092856,
    //     lng: -80.189453125,
    //   },
    //   {
    //     lat: 38.985003092856,
    //     lng: -81.189453125,
    //   },
    // ]
  }
}

WebTemplatesComponent.ɵfac = function WebTemplatesComponent_Factory(t) {
  return new (t || WebTemplatesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_web_templates_store__WEBPACK_IMPORTED_MODULE_1__.WebTemplatesStore));
};
WebTemplatesComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebTemplatesComponent,
  selectors: [["app-web-templates"]],
  decls: 1,
  vars: 3,
  consts: [["formName", "ClassBuilder_example", 1, "w-full", "h-full", 3, "showSubmitButton", "formData", "componentStore"]],
  template: function WebTemplatesComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "ui-formly-json-form", 0);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", false)("formData", ctx.formData)("componentStore", ctx.store);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent]
});

/***/ }),

/***/ 302091:
/*!**********************************************************************!*\
  !*** ./libs/web/modules/admin/web-templates/web-templates.module.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebTemplatesModule": () => (/* binding */ WebTemplatesModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _web_templates_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./web-templates.component */ 52082);
/* harmony import */ var _ui_form_src_lib_web_ui_form_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../../ui/form/src/lib/web-ui-form.module */ 595838);
/* harmony import */ var _web_templates_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./web-templates.store */ 64018);
/* harmony import */ var _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/ui/formly-designer */ 408916);
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @agm/core */ 888728);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);










class WebTemplatesModule {}
WebTemplatesModule.ɵfac = function WebTemplatesModule_Factory(t) {
  return new (t || WebTemplatesModule)();
};
WebTemplatesModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebTemplatesModule
});
WebTemplatesModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  providers: [_web_templates_store__WEBPACK_IMPORTED_MODULE_1__.WebTemplatesStore],
  imports: [_agm_core__WEBPACK_IMPORTED_MODULE_2__.AgmCoreModule.forRoot({
    apiKey: 'AIzaSyC3cPFfcRGTdbgdFra8MaM5x2lXd7wHGeg',
    libraries: ['places']
  }), _angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_4__.WebUiFormlyDesignerModule, _ui_form_src_lib_web_ui_form_module__WEBPACK_IMPORTED_MODULE_5__.WebUiFormModule, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule.forChild([{
    path: '',
    component: _web_templates_component__WEBPACK_IMPORTED_MODULE_7__.WebTemplatesComponent
  }])]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebTemplatesModule, {
    declarations: [_web_templates_component__WEBPACK_IMPORTED_MODULE_7__.WebTemplatesComponent],
    imports: [_agm_core__WEBPACK_IMPORTED_MODULE_2__.AgmCoreModule, _angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_4__.WebUiFormlyDesignerModule, _ui_form_src_lib_web_ui_form_module__WEBPACK_IMPORTED_MODULE_5__.WebUiFormModule, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule]
  });
})();

/***/ }),

/***/ 64018:
/*!*********************************************************************!*\
  !*** ./libs/web/modules/admin/web-templates/web-templates.store.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebTemplatesStore": () => (/* binding */ WebTemplatesStore)
/* harmony export */ });
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 504523);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _fuse_services_loading_loading_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fuse/services/loading/loading.service */ 301463);
/* harmony import */ var _case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/ui/toast */ 971873);










class WebTemplatesStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(formService, data, loading, toast) {
    super({
      query: "",
      loading: false
    });
    this.formService = formService;
    this.data = data;
    this.loading = loading;
    this.toast = toast;
    this.loading$ = this.select(s => s.loading);
    this.vm$ = this.select(this.loading$, loading => ({
      loading
    }));
  }
}
WebTemplatesStore.ɵfac = function WebTemplatesStore_Factory(t) {
  return new (t || WebTemplatesStore)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_2__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_3__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_fuse_services_loading_loading_service__WEBPACK_IMPORTED_MODULE_4__.FuseLoadingService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_5__.WebUiToastService));
};
WebTemplatesStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: WebTemplatesStore,
  factory: WebTemplatesStore.ɵfac
});

/***/ })

}]);