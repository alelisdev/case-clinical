"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["libs_web_ui_formly-designer-preview_src_index_ts"],{

/***/ 715037:
/*!**********************************************************!*\
  !*** ./libs/web/ui/formly-designer-preview/src/index.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JsonFormPreviewModule": () => (/* reexport safe */ _lib_json_form_preview_module__WEBPACK_IMPORTED_MODULE_0__.JsonFormPreviewModule)
/* harmony export */ });
/* harmony import */ var _lib_json_form_preview_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/json-form-preview.module */ 281891);


/***/ }),

/***/ 138612:
/*!************************************************************************************!*\
  !*** ./libs/web/ui/formly-designer-preview/src/lib/json-form-preview.component.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JsonFormPreviewComponent": () => (/* binding */ JsonFormPreviewComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 224006);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 178372);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @case-clinical/web/ui/formly-designer */ 879853);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _ngx_formly_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-formly/core */ 549821);
/* harmony import */ var _form_src_lib_context_provider_ui_form_context_provider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../form/src/lib/context-provider/ui-form-context-provider */ 11083);









function JsonFormPreviewComponent_form_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "form", 2, 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "formly-form", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx_r0.form);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("form", ctx_r0.form)("model", ctx_r0.modelData)("fields", ctx_r0.fields);
  }
}
class JsonFormPreviewComponent {
  constructor(formlyDesignerService) {
    this.formlyDesignerService = formlyDesignerService;
    this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormGroup({});
    this.formConfig = [];
    this.fields = [];
    this.contextData = {};
    this.modelData = {};
    this.customLayouts = {};
    this.schema = "";
  }
  onMessage(e) {
    if (e.origin != window.origin) {
      return false;
    }
    const {
      previewData,
      data
    } = e.data;
    console.log(data);
    if (previewData) {
      const {
        schema,
        customLayouts,
        testData,
        modelData
      } = data;
      if (testData) this.contextData = testData;
      if (modelData) {
        this.modelData = modelData;
        this.contextData = Object.assign(Object.assign({}, this.contextData), this.modelData);
      }
      if (customLayouts) this.customLayouts = customLayouts;
      if (schema) {
        this.formConfig = JSON.parse(schema);
        this.schema = schema;
      } else this.formConfig = JSON.parse(this.schema);
      if (this.formConfig) {
        const _fields = this.formlyDesignerService.initializeFieldConfigs(this.formConfig, this.customLayouts);
        this.fields = _fields;
      } else {
        this.fields = [];
      }
    }
  }
  ngOnInit() {
    window.parent.postMessage({
      from: "preview",
      status: "available"
    }, window.origin);
    this.subscriber = this.form.valueChanges.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.debounceTime)(500)).subscribe(value => {
      for (const key in value) {
        if (value[key] === null || value[key] === undefined) delete value[key];
      }
      window.parent.postMessage({
        from: 'preview',
        status: "modelChanged",
        model: value
      }, window.origin);
    });
  }
  ngOnDestroy() {
    var _a;
    (_a = this.subscriber) === null || _a === void 0 ? void 0 : _a.unsubscribe();
  }
}
JsonFormPreviewComponent.ɵfac = function JsonFormPreviewComponent_Factory(t) {
  return new (t || JsonFormPreviewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_3__.FormlyDesignerService));
};
JsonFormPreviewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: JsonFormPreviewComponent,
  selectors: [["ui-json-form-preview"]],
  hostBindings: function JsonFormPreviewComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("message", function JsonFormPreviewComponent_message_HostBindingHandler($event) {
        return ctx.onMessage($event);
      }, false, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresolveWindow"]);
    }
  },
  decls: 2,
  vars: 2,
  consts: [[1, "w-full", 3, "data"], ["class", "relative w-full", 3, "formGroup", 4, "ngIf"], [1, "relative", "w-full", 3, "formGroup"], ["ngForm", ""], [3, "form", "model", "fields"]],
  template: function JsonFormPreviewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ui-context-provider", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, JsonFormPreviewComponent_form_1_Template, 3, 4, "form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("data", ctx.contextData);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.fields);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _ngx_formly_core__WEBPACK_IMPORTED_MODULE_5__.FormlyForm, _form_src_lib_context_provider_ui_form_context_provider__WEBPACK_IMPORTED_MODULE_6__.UiFormConextProviderComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormGroupDirective],
  styles: ["formly-form {\r\n  width: 100%;\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n  formly-group {\r\n  width: 100%;\r\n  height: 100%;\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n  formly-field {\r\n  padding-left: 0px;\r\n  padding-right: 0px;\r\n}\r\n\r\n  formly-field > ng-component {\r\n  flex: 1;\r\n}\r\n\r\n  formly-group > ng-component {\r\n  flex: 1;\r\n}\r\n\r\n[_nghost-%COMP%] {\r\n  font-family: 'poppins';\r\n}"]
});

/***/ }),

/***/ 281891:
/*!*********************************************************************************!*\
  !*** ./libs/web/ui/formly-designer-preview/src/lib/json-form-preview.module.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JsonFormPreviewModule": () => (/* binding */ JsonFormPreviewModule)
/* harmony export */ });
/* harmony import */ var _ngx_formly_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-formly/core */ 549821);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _json_form_preview_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./json-form-preview.component */ 138612);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 595838);
/* harmony import */ var _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @case-clinical/web/ui/formly-designer */ 408916);
/* harmony import */ var libs_web_ui_form_src_lib_context_provider_ui_form_context_provider_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! libs/web/ui/form/src/lib/context-provider/ui-form-context-provider.module */ 682081);
/* harmony import */ var _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @case-clinical/web/shared/ui */ 271992);
/* harmony import */ var _txtextcontrol_tx_ng_document_viewer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @txtextcontrol/tx-ng-document-viewer */ 770383);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);











class JsonFormPreviewModule {}
JsonFormPreviewModule.ɵfac = function JsonFormPreviewModule_Factory(t) {
  return new (t || JsonFormPreviewModule)();
};
JsonFormPreviewModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: JsonFormPreviewModule
});
JsonFormPreviewModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyDesignerModule, _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_3__.WebUiFormModule, _txtextcontrol_tx_ng_document_viewer__WEBPACK_IMPORTED_MODULE_4__.DocumentViewerModule, _ngx_formly_core__WEBPACK_IMPORTED_MODULE_5__.FormlyModule, libs_web_ui_form_src_lib_context_provider_ui_form_context_provider_module__WEBPACK_IMPORTED_MODULE_6__.UiFormConextProviderModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_7__.UiFormsSharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterModule.forChild([{
    path: '',
    component: _json_form_preview_component__WEBPACK_IMPORTED_MODULE_9__.JsonFormPreviewComponent
  }])]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](JsonFormPreviewModule, {
    declarations: [_json_form_preview_component__WEBPACK_IMPORTED_MODULE_9__.JsonFormPreviewComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyDesignerModule, _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_3__.WebUiFormModule, _txtextcontrol_tx_ng_document_viewer__WEBPACK_IMPORTED_MODULE_4__.DocumentViewerModule, _ngx_formly_core__WEBPACK_IMPORTED_MODULE_5__.FormlyModule, libs_web_ui_form_src_lib_context_provider_ui_form_context_provider_module__WEBPACK_IMPORTED_MODULE_6__.UiFormConextProviderModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_7__.UiFormsSharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterModule]
  });
})();

/***/ })

}]);