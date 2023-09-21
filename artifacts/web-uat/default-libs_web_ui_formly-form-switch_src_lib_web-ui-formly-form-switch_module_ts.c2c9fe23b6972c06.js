"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_ui_formly-form-switch_src_lib_web-ui-formly-form-switch_module_ts"],{

/***/ 299921:
/*!***************************************************************************!*\
  !*** ./libs/web/ui/form/src/lib/context-provider/data-context.service.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataContextService": () => (/* binding */ DataContextService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 861135);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _form_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../form.service */ 504523);




class DataContextService {
  constructor(formService) {
    this.formService = formService;
    this.dataStream = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(null);
    this.dataStream$ = this.dataStream.asObservable();
  }
  next(data) {
    this.dataStream.next(data);
  }
  setData(data) {
    this.data = data;
  }
  getDataStream() {
    return this.dataStream$;
  }
  getData() {
    return this.data;
  }
  getValue(key, returnRawValue = false) {
    return this.formService.getValueForKey(key, this.data, returnRawValue);
  }
  parseStatement(statement, data = null) {
    if (!statement) return '';
    let index = statement.indexOf("{");
    while (index !== -1) {
      const endIndex = statement.indexOf('}');
      if (endIndex === -1) break;
      const key = statement.substring(index + 1, endIndex);
      const value = data ? this.formService.getValueForKey(key, data) : this.getValue(key);
      const dummyStr = statement.substring(index, endIndex + 1);
      statement = statement.replace(dummyStr, value);
      index = statement.indexOf('{');
    }
    return statement;
  }
  parseStatementStream(statement) {
    return this.dataStream$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.switchMap)(data => {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.of)(this.parseStatement(statement, data));
    }));
  }
}
DataContextService.ɵfac = function DataContextService_Factory(t) {
  return new (t || DataContextService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_form_service__WEBPACK_IMPORTED_MODULE_4__.FormService));
};
DataContextService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
  token: DataContextService,
  factory: DataContextService.ɵfac
});

/***/ }),

/***/ 682081:
/*!**************************************************************************************!*\
  !*** ./libs/web/ui/form/src/lib/context-provider/ui-form-context-provider.module.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UiFormConextProviderModule": () => (/* binding */ UiFormConextProviderModule)
/* harmony export */ });
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 224006);
/* harmony import */ var _ui_form_context_provider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ui-form-context-provider */ 11083);
/* harmony import */ var _ngx_formly_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-formly/core */ 549821);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);







class UiFormConextProviderModule {}
UiFormConextProviderModule.ɵfac = function UiFormConextProviderModule_Factory(t) {
  return new (t || UiFormConextProviderModule)();
};
UiFormConextProviderModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: UiFormConextProviderModule
});
UiFormConextProviderModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.ReactiveFormsModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_3__.MatButtonModule, _ngx_formly_core__WEBPACK_IMPORTED_MODULE_4__.FormlyModule.forChild({})]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](UiFormConextProviderModule, {
    declarations: [_ui_form_context_provider__WEBPACK_IMPORTED_MODULE_5__.UiFormConextProviderComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.ReactiveFormsModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_3__.MatButtonModule, _ngx_formly_core__WEBPACK_IMPORTED_MODULE_4__.FormlyModule],
    exports: [_ui_form_context_provider__WEBPACK_IMPORTED_MODULE_5__.UiFormConextProviderComponent]
  });
})();

/***/ }),

/***/ 11083:
/*!*******************************************************************************!*\
  !*** ./libs/web/ui/form/src/lib/context-provider/ui-form-context-provider.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UiFormConextProviderComponent": () => (/* binding */ UiFormConextProviderComponent)
/* harmony export */ });
/* harmony import */ var _data_context_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./data-context.service */ 299921);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 861135);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 178372);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);





const _c0 = ["*"];
class UiFormConextProviderComponent {
  constructor(service) {
    this.service = service;
    this.propsChanged = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(null);
  }
  ngOnDestroy() {
    var _a;
    this.propsChanged.complete();
    (_a = this.subscriber) === null || _a === void 0 ? void 0 : _a.unsubscribe();
  }
  ngOnInit() {
    this.service.setData(this.data);
    this.subscriber = this.propsChanged.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.debounceTime)(200)).subscribe(data => {
      if (data) {
        this.service.setData(data);
        this.service.next(data);
      }
    });
  }
  ngOnChanges(changes) {
    // if(changes.data && changes.data.currentValue !== changes.data.previousValue && changes.data.currentValue.name !== undefined) {
    if (changes.data && changes.data.currentValue !== changes.data.previousValue) {
      // this.propsChanged.next(this.data);
      this.service.setData(this.data);
      this.service.next(this.data);
    }
  }
}
UiFormConextProviderComponent.ɵfac = function UiFormConextProviderComponent_Factory(t) {
  return new (t || UiFormConextProviderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_data_context_service__WEBPACK_IMPORTED_MODULE_3__.DataContextService));
};
UiFormConextProviderComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: UiFormConextProviderComponent,
  selectors: [["ui-context-provider"]],
  inputs: {
    data: "data",
    formName: "formName"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵProvidersFeature"]([_data_context_service__WEBPACK_IMPORTED_MODULE_3__.DataContextService]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵNgOnChangesFeature"]],
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function UiFormConextProviderComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojectionDef"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojection"](0);
    }
  },
  encapsulation: 2
});

/***/ }),

/***/ 155713:
/*!*******************************************************************************!*\
  !*** ./libs/web/ui/formly-form-switch/src/lib/child-form-select.component.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChildFormSelectComponent": () => (/* binding */ ChildFormSelectComponent)
/* harmony export */ });
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 675886);
/* harmony import */ var _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @case-clinical/web/ui/formly-designer */ 117815);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 318505);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _form_src_lib_context_provider_ui_form_context_provider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../form/src/lib/context-provider/ui-form-context-provider */ 11083);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 224006);
/* harmony import */ var _ngx_formly_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-formly/core */ 549821);









const _c0 = function (a0) {
  return {
    childFormLayoutId: a0
  };
};
function ChildFormSelectComponent_ng_container_0_ui_context_provider_1_form_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "form", 4, 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "formly-form", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const vid_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).ngIf;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("model", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](3, _c0, vid_r1))("fields", ctx_r3.fields)("options", ctx_r3.options);
  }
}
function ChildFormSelectComponent_ng_container_0_ui_context_provider_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ui-context-provider", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, ChildFormSelectComponent_ng_container_0_ui_context_provider_1_form_1_Template, 3, 5, "form", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("data", ctx_r2.formData);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r2.fields);
  }
}
function ChildFormSelectComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, ChildFormSelectComponent_ng_container_0_ui_context_provider_1_Template, 2, 2, "ui-context-provider", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.formlyJsonFormViewsStore && ctx_r0.formData);
  }
}
class ChildFormSelectComponent {
  constructor(injector) {
    this.injector = injector;
    this.hidden = false;
    this.model = {};
    this.fields = [_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.fieldRow([_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.dropdown('childFormLayoutId', {
      label: 'Select Child Form Layout',
      hideLabel: true,
      compact: true,
      dataKey: 'views',
      valueChanged: id => {
        this.viewIdDidChange(id);
      }
    }, {
      className: 'w-full'
    })], 'w-full p-1', {
      className: 'w-full p-1'
    })];
  }
  ngOnDestroy() {
    var _a;
    (_a = this.subscriber) === null || _a === void 0 ? void 0 : _a.unsubscribe();
  }
  ngOnInit() {
    this.formlyJsonFormViewsStore = this.injector.get(_case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_2__.FormlyJsonFormViewsStore);
    if (this.formlyJsonFormViewsStore) {
      this.views$ = this.formlyJsonFormViewsStore.getViews(this.formName).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(views => {
        if ((views === null || views === void 0 ? void 0 : views.length) < 2) {
          this.hidden = true;
        } else {
          this.hidden = false;
        }
      }));
      this.currentViewId$ = this.formlyJsonFormViewsStore.getCurrentViewId(this.formName);
      this.formData = {
        views: this.views$
      };
      this.options = {
        formState: this.formData
      };
    }
  }
  viewIdDidChange(viewId) {
    var _a;
    (_a = this.formlyJsonFormViewsStore) === null || _a === void 0 ? void 0 : _a.setCurrentViewId({
      formName: this.formName,
      currentViewId: viewId
    });
  }
}
ChildFormSelectComponent.ɵfac = function ChildFormSelectComponent_Factory(t) {
  return new (t || ChildFormSelectComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.Injector));
};
ChildFormSelectComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: ChildFormSelectComponent,
  selectors: [["ui-formly-form-select"]],
  inputs: {
    formName: "formName"
  },
  decls: 2,
  vars: 3,
  consts: [[4, "ngIf"], ["class", "flex", 3, "data", 4, "ngIf"], [1, "flex", 3, "data"], ["class", "relative w-full", 4, "ngIf"], [1, "relative", "w-full"], ["ngForm", ""], [1, "w-full", 3, "model", "fields", "options"]],
  template: function ChildFormSelectComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, ChildFormSelectComponent_ng_container_0_Template, 2, 1, "ng-container", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](1, "async");
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](1, 1, ctx.currentViewId$));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _form_src_lib_context_provider_ui_form_context_provider__WEBPACK_IMPORTED_MODULE_5__.UiFormConextProviderComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgForm, _ngx_formly_core__WEBPACK_IMPORTED_MODULE_7__.FormlyForm, _angular_common__WEBPACK_IMPORTED_MODULE_4__.AsyncPipe],
  styles: ["formly-field {\n  padding-left: 0px !important;\n  padding-right: 0px !important;\n}\n\n  formly-field > ng-component {\n  flex: 1;\n}"]
});

/***/ }),

/***/ 256158:
/*!************************************************************************************!*\
  !*** ./libs/web/ui/formly-form-switch/src/lib/web-ui-formly-form-switch.module.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebUiFormlyFormSwitchModule": () => (/* binding */ WebUiFormlyFormSwitchModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _child_form_select_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./child-form-select.component */ 155713);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 682081);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 224006);
/* harmony import */ var _ngx_formly_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-formly/core */ 549821);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);






class WebUiFormlyFormSwitchModule {}
WebUiFormlyFormSwitchModule.ɵfac = function WebUiFormlyFormSwitchModule_Factory(t) {
  return new (t || WebUiFormlyFormSwitchModule)();
};
WebUiFormlyFormSwitchModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebUiFormlyFormSwitchModule
});
WebUiFormlyFormSwitchModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_2__.UiFormConextProviderModule, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormsModule, _ngx_formly_core__WEBPACK_IMPORTED_MODULE_4__.FormlyModule, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.ReactiveFormsModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebUiFormlyFormSwitchModule, {
    declarations: [_child_form_select_component__WEBPACK_IMPORTED_MODULE_5__.ChildFormSelectComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_2__.UiFormConextProviderModule, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormsModule, _ngx_formly_core__WEBPACK_IMPORTED_MODULE_4__.FormlyModule, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.ReactiveFormsModule],
    exports: [_child_form_select_component__WEBPACK_IMPORTED_MODULE_5__.ChildFormSelectComponent]
  });
})();

/***/ })

}]);