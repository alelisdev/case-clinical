"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["libs_web_modules_admin_form-builder-test_form-builder-example_module_ts"],{

/***/ 95967:
/*!*****************************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/address.picker.component.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AddressPickerComponent": () => (/* binding */ AddressPickerComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




class AddressPickerComponent {
  constructor(data) {
    this.data = data;
    this.formData = {};
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
AddressPickerComponent.ɵfac = function AddressPickerComponent_Factory(t) {
  return new (t || AddressPickerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.WebCoreDataAccessService));
};
AddressPickerComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: AddressPickerComponent,
  selectors: [["AddressPicker_example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "AddressPicker_example", 3, "showSubmitButton", "formData", "save"]],
  template: function AddressPickerComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function AddressPickerComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 628723:
/*!**********************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/ag-grid.component.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AgGridComponent": () => (/* binding */ AgGridComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




class AgGridComponent {
  constructor(data) {
    this.data = data;
    this.formData = {
      users: [{
        id: 1,
        name: 'John Doe',
        age: 34,
        hobby: 'Drinking',
        gender: 'Male'
      }, {
        id: 2,
        name: 'Alex Deberbil',
        age: 30,
        gender: 'Male',
        hobby: 'Running'
      }, {
        id: 3,
        name: 'Jane Eyre',
        age: 18,
        gender: 'Female',
        hobby: 'Running'
      }]
    };
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
AgGridComponent.ɵfac = function AgGridComponent_Factory(t) {
  return new (t || AgGridComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.WebCoreDataAccessService));
};
AgGridComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: AgGridComponent,
  selectors: [["AgGrid_example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "AgGrid_example", 3, "showSubmitButton", "formData", "save"]],
  template: function AgGridComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function AgGridComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 139280:
/*!*******************************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/anatomical-model.component.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AnatomicalModelComponent": () => (/* binding */ AnatomicalModelComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);





class AnatomicalModelComponent {
  constructor(data) {
    this.data = data;
    this.formData = {};
  }
  ngOnInit() {}
  bodyParts() {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.of)([{}]);
  }
  submit(data) {
    alert(JSON.stringify(data));
  }
}
AnatomicalModelComponent.ɵfac = function AnatomicalModelComponent_Factory(t) {
  return new (t || AnatomicalModelComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_2__.WebCoreDataAccessService));
};
AnatomicalModelComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: AnatomicalModelComponent,
  selectors: [["AnatomicModel_example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "AnatomicalModel_example", 3, "showSubmitButton", "formData", "save"]],
  template: function AnatomicalModelComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("save", function AnatomicalModelComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_3__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 586242:
/*!****************************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/angular.chart.component.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AngularChartComponent": () => (/* binding */ AngularChartComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




class AngularChartComponent {
  constructor(data) {
    this.data = data;
    this.formData = {
      summary: [{}]
    };
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
AngularChartComponent.ɵfac = function AngularChartComponent_Factory(t) {
  return new (t || AngularChartComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.WebCoreDataAccessService));
};
AngularChartComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: AngularChartComponent,
  selectors: [["AngularChart_example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "AngularChart_example", 3, "showSubmitButton", "formData", "save"]],
  template: function AngularChartComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function AngularChartComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 113459:
/*!************************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/bar-chart.component.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BarChartComponent": () => (/* binding */ BarChartComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




class BarChartComponent {
  constructor(data) {
    this.data = data;
    this.formData = {
      data: {
        labels: [1900, 1991, 1992, 1993, 1994, 1995, 1996],
        series: [{
          name: "Marine Sprite",
          data: [10, 34, 2, 2, 34, 12, 50]
        }]
      },
      data2: {
        labels: [1997, 1998, 1999, 2000, 2001, 2002, 2003],
        series: [{
          name: "Marine Sprite",
          data: [44, 5, 4, 37, 2, 43, 21]
        }]
      },
      data3: {
        labels: [2004, 2005, 2006, 2007, 2008, 2009, 2010],
        series: [{
          name: "React",
          data: [44, 5, 41, 3, 22, 3, 21]
        }, {
          name: "Angular",
          data: [4, 5, 4, 13, 12, 13, 11]
        }, {
          name: "Vue",
          data: [4, 5, 1, 3, 2, 3, 2]
        }]
      }
    };
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
BarChartComponent.ɵfac = function BarChartComponent_Factory(t) {
  return new (t || BarChartComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.WebCoreDataAccessService));
};
BarChartComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: BarChartComponent,
  selectors: [["BarChart_example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "BarChart_example", 3, "showSubmitButton", "formData", "save"]],
  template: function BarChartComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function BarChartComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 737155:
/*!****************************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/boolean.component.store.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BooleanComponentStore": () => (/* binding */ BooleanComponentStore)
/* harmony export */ });
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 504523);
/* harmony import */ var _fuse_services_loading_loading_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fuse/services/loading/loading.service */ 301463);
/* harmony import */ var _case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/ui/toast */ 971873);








class BooleanComponentStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(formService, loading, toast) {
    super({
      query: "",
      loading: false
    });
    this.formService = formService;
    this.loading = loading;
    this.toast = toast;
    this.loading$ = this.select(s => s.loading);
    this.vm$ = this.select(this.loading$, loading => ({
      loading
    }));
  }
  setModalCtrl(controller) {
    this.modalCtrl = controller;
  }
  openModal() {
    var _a;
    (_a = this.modalCtrl) === null || _a === void 0 ? void 0 : _a.open({}, {}, this);
  }
}
BooleanComponentStore.ɵfac = function BooleanComponentStore_Factory(t) {
  return new (t || BooleanComponentStore)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_2__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_fuse_services_loading_loading_service__WEBPACK_IMPORTED_MODULE_3__.FuseLoadingService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_4__.WebUiToastService));
};
BooleanComponentStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: BooleanComponentStore,
  factory: BooleanComponentStore.ɵfac
});

/***/ }),

/***/ 712415:
/*!**********************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/boolean.component.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BooleanComponent": () => (/* binding */ BooleanComponent)
/* harmony export */ });
/* harmony import */ var _boolean_component_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./boolean.component.store */ 737155);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);
/* harmony import */ var _ui_formly_form_switch_src_lib_child_form_select_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../ui/formly-form-switch/src/lib/child-form-select.component */ 155713);





class BooleanComponent {
  constructor(store) {
    this.store = store;
  }
}
BooleanComponent.ɵfac = function BooleanComponent_Factory(t) {
  return new (t || BooleanComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_boolean_component_store__WEBPACK_IMPORTED_MODULE_1__.BooleanComponentStore));
};
BooleanComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: BooleanComponent,
  selectors: [["Boolean_example"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_boolean_component_store__WEBPACK_IMPORTED_MODULE_1__.BooleanComponentStore])],
  decls: 3,
  vars: 3,
  consts: [[3, "formName"], [1, "w-full"], ["formName", "Boolean_example", 3, "showSubmitButton", "componentStore"]],
  template: function BooleanComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "ui-formly-form-select", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "ui-formly-json-form", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formName", "Boolean_example");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("componentStore", ctx.store);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent, _ui_formly_form_switch_src_lib_child_form_select_component__WEBPACK_IMPORTED_MODULE_3__.ChildFormSelectComponent],
  encapsulation: 2
});

/***/ }),

/***/ 451439:
/*!*******************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/card.component.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CardComponent": () => (/* binding */ CardComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




class CardComponent {
  constructor(data) {
    this.data = data;
    this.formData = {
      dueTasks: 456
    };
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
CardComponent.ɵfac = function CardComponent_Factory(t) {
  return new (t || CardComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.WebCoreDataAccessService));
};
CardComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: CardComponent,
  selectors: [["Card_example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "Card_example", 3, "showSubmitButton", "formData", "save"]],
  template: function CardComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function CardComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 686113:
/*!***********************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/carousel.component.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CarouselComponent": () => (/* binding */ CarouselComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




class CarouselComponent {
  constructor(data) {
    this.data = data;
    this.formData = {
      users: [{
        url: 'https://www.kasandbox.org/programming-images/avatars/primosaur-tree.png'
      }, {
        url: 'https://www.kasandbox.org/programming-images/avatars/duskpin-sapling.png'
      }, {
        url: 'https://www.kasandbox.org/programming-images/avatars/duskpin-seed.png'
      }, {
        url: 'https://www.kasandbox.org/programming-images/avatars/duskpin-seedling.png'
      }, {
        url: 'https://www.kasandbox.org/programming-images/avatars/duskpin-tree.png'
      }, {
        url: 'https://www.kasandbox.org/programming-images/avatars/duskpin-ultimate.png'
      }]
    };
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
CarouselComponent.ɵfac = function CarouselComponent_Factory(t) {
  return new (t || CarouselComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.WebCoreDataAccessService));
};
CarouselComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: CarouselComponent,
  selectors: [["Carousel_example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "Carousel_example", 3, "showSubmitButton", "formData", "save"]],
  template: function CarouselComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function CarouselComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", false)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 846030:
/*!****************************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/class.builder.component.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClassBuilderComponent": () => (/* binding */ ClassBuilderComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




class ClassBuilderComponent {
  constructor(data) {
    this.data = data;
    this.formData = {};
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
ClassBuilderComponent.ɵfac = function ClassBuilderComponent_Factory(t) {
  return new (t || ClassBuilderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.WebCoreDataAccessService));
};
ClassBuilderComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: ClassBuilderComponent,
  selectors: [["ClassBuilder_example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "ClassBuilder_example", 3, "showSubmitButton", "formData", "save"]],
  template: function ClassBuilderComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function ClassBuilderComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 980940:
/*!***********************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/collapse.component.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CollapseComponent": () => (/* binding */ CollapseComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




class CollapseComponent {
  constructor(data) {
    this.data = data;
    this.formData = {};
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
CollapseComponent.ɵfac = function CollapseComponent_Factory(t) {
  return new (t || CollapseComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.WebCoreDataAccessService));
};
CollapseComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: CollapseComponent,
  selectors: [["Collapse_example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "Collapse_example", 3, "showSubmitButton", "formData", "save"]],
  template: function CollapseComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function CollapseComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 774184:
/*!***************************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/color.picker.component.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ColorPickerComponent": () => (/* binding */ ColorPickerComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);


class ColorPickerComponent {
  constructor() {
    this.formData = {};
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
ColorPickerComponent.ɵfac = function ColorPickerComponent_Factory(t) {
  return new (t || ColorPickerComponent)();
};
ColorPickerComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: ColorPickerComponent,
  selectors: [["color-picker-example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "color_picker_example", 3, "showSubmitButton", "formData", "save"]],
  template: function ColorPickerComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function ColorPickerComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_1__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 368545:
/*!***********************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/currency.component.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CurrencyComponent": () => (/* binding */ CurrencyComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




class CurrencyComponent {
  constructor(data) {
    this.data = data;
    this.formData = {};
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
CurrencyComponent.ɵfac = function CurrencyComponent_Factory(t) {
  return new (t || CurrencyComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.WebCoreDataAccessService));
};
CurrencyComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: CurrencyComponent,
  selectors: [["Currency_example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "Currency_example", 3, "showSubmitButton", "formData", "save"]],
  template: function CurrencyComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function CurrencyComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 811472:
/*!*********************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/data.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "products": () => (/* binding */ products)
/* harmony export */ });
const products = [{
  url: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-01.jpg',
  title: 'Focus Paper Refill',
  price: 13,
  desc: '3 sizes available'
}, {
  url: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-02.jpg',
  title: 'Focus Card Holder',
  price: 64,
  desc: 'walnut'
}, {
  url: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-03.jpg',
  title: 'Focus Carry Pouch',
  price: 32,
  desc: 'Heather Gray'
}, {
  url: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-04.jpg',
  title: 'Focus Multi-Pack',
  price: 39,
  desc: 'Heather Gray'
}, {
  url: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-05.jpg',
  title: 'Machined Mechanical Pencil',
  price: 35,
  desc: 'Black and brass'
}, {
  url: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-06.jpg',
  title: 'Brass Scissors',
  price: 50,
  desc: 'Includes brass stand'
}, {
  url: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-07.jpg',
  title: 'Electric Kettle',
  price: 149,
  desc: 'Black'
}, {
  url: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-08.jpg',
  title: 'Leather Workspace Pad',
  price: 165,
  desc: 'Black'
}, {
  url: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-09.jpg',
  title: 'Leather Long Wallet',
  price: 118,
  desc: 'Natural'
}, {
  url: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-10.jpg',
  title: 'Machined Spheare Puzzle',
  price: 95,
  desc: 'Includes brass stand'
}, {
  url: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-11.jpg',
  title: 'Minimalist Wristwatch',
  price: 149,
  desc: '2 wrist band options'
}, {
  url: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-12.jpg',
  title: 'Motto Leather Coster Set',
  price: 18,
  desc: 'Natural'
}];

/***/ }),

/***/ 628857:
/*!*******************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/date.component.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DateComponent": () => (/* binding */ DateComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




class DateComponent {
  constructor(data) {
    this.data = data;
    this.formData = {};
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
DateComponent.ɵfac = function DateComponent_Factory(t) {
  return new (t || DateComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.WebCoreDataAccessService));
};
DateComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: DateComponent,
  selectors: [["Date_example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "Date_example", 3, "showSubmitButton", "formData", "save"]],
  template: function DateComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function DateComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 194086:
/*!***********************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/datetime.component.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DateTimeComponent": () => (/* binding */ DateTimeComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




class DateTimeComponent {
  constructor(data) {
    this.data = data;
    this.formData = {
      users: [{
        name: 'John',
        age: 34,
        gender: 'Male'
      }, {
        name: 'Alex',
        age: 23,
        gender: 'Male'
      }, {
        name: 'Alec',
        age: 28,
        gender: 'Male'
      }, {
        name: 'A',
        age: 20,
        gender: 'Female'
      }, {
        name: 'B',
        age: 16,
        gender: 'Male'
      }, {
        name: 'C',
        age: 23,
        gender: 'Female'
      }, {
        name: 'D',
        age: 22,
        gender: 'Female'
      }]
    };
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
DateTimeComponent.ɵfac = function DateTimeComponent_Factory(t) {
  return new (t || DateTimeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.WebCoreDataAccessService));
};
DateTimeComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: DateTimeComponent,
  selectors: [["DateTime_example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "DateTime_example", 3, "showSubmitButton", "formData", "save"]],
  template: function DateTimeComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function DateTimeComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 834493:
/*!*******************************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/description.list.component.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DescriptionListComponent": () => (/* binding */ DescriptionListComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




class DescriptionListComponent {
  constructor(data) {
    this.data = data;
    this.formData = {
      gender: 'Male'
    };
    this.model = {
      name: 'John Doe',
      age: '45'
    };
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
DescriptionListComponent.ɵfac = function DescriptionListComponent_Factory(t) {
  return new (t || DescriptionListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.WebCoreDataAccessService));
};
DescriptionListComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: DescriptionListComponent,
  selectors: [["DescriptionList_example"]],
  decls: 2,
  vars: 3,
  consts: [[1, "w-full"], ["formName", "DescriptionList_example", 3, "showSubmitButton", "model", "formData", "save"]],
  template: function DescriptionListComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function DescriptionListComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("model", ctx.model)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 567841:
/*!********************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/divider.example.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DividerComponent": () => (/* binding */ DividerComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




class DividerComponent {
  constructor(data) {
    this.data = data;
    this.formData = {};
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
DividerComponent.ɵfac = function DividerComponent_Factory(t) {
  return new (t || DividerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.WebCoreDataAccessService));
};
DividerComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: DividerComponent,
  selectors: [["Divider_example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "Divider_example", 3, "showSubmitButton", "formData", "save"]],
  template: function DividerComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function DividerComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 207226:
/*!**********************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/drodown.component.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DropdownComponent": () => (/* binding */ DropdownComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




class DropdownComponent {
  constructor(data) {
    this.data = data;
    this.formData = {};
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
DropdownComponent.ɵfac = function DropdownComponent_Factory(t) {
  return new (t || DropdownComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.WebCoreDataAccessService));
};
DropdownComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: DropdownComponent,
  selectors: [["Dropdown_example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "Dropdown_example", 3, "showSubmitButton", "formData", "save"]],
  template: function DropdownComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function DropdownComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 976342:
/*!********************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/email.component.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EmailComponent": () => (/* binding */ EmailComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




class EmailComponent {
  constructor(data) {
    this.data = data;
    this.formData = {};
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
EmailComponent.ɵfac = function EmailComponent_Factory(t) {
  return new (t || EmailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.WebCoreDataAccessService));
};
EmailComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: EmailComponent,
  selectors: [["Email_example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "Email_example", 3, "showSubmitButton", "formData", "save"]],
  template: function EmailComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function EmailComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 13187:
/*!********************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/embed.component.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EmbedComponent": () => (/* binding */ EmbedComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




class EmbedComponent {
  constructor(data) {
    this.data = data;
    this.formData = {};
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
EmbedComponent.ɵfac = function EmbedComponent_Factory(t) {
  return new (t || EmbedComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.WebCoreDataAccessService));
};
EmbedComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: EmbedComponent,
  selectors: [["Embed_example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "Embed_example", 3, "showSubmitButton", "formData", "save"]],
  template: function EmbedComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function EmbedComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 315931:
/*!**************************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/enumeration.component.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EnumerationComponent": () => (/* binding */ EnumerationComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);


class EnumerationComponent {
  constructor() {
    this.formData = {
      title: "This is my title",
      genders: ['Male', 'Female'],
      days: ['Monday', 'Tuesday', 'Wednsday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      states: ['US', 'MX', 'CA', 'UK'],
      levels: ['beginner', 'intermediate', 'expert']
    };
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
EnumerationComponent.ɵfac = function EnumerationComponent_Factory(t) {
  return new (t || EnumerationComponent)();
};
EnumerationComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: EnumerationComponent,
  selectors: [["example-enumeration"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "enumeration_example", 3, "showSubmitButton", "formData", "save"]],
  template: function EnumerationComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function EnumerationComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_1__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 201556:
/*!*************************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/filter.bar.component.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FilterBarComponent": () => (/* binding */ FilterBarComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




class FilterBarComponent {
  constructor(data) {
    this.data = data;
    this.formData = {};
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
FilterBarComponent.ɵfac = function FilterBarComponent_Factory(t) {
  return new (t || FilterBarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.WebCoreDataAccessService));
};
FilterBarComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: FilterBarComponent,
  selectors: [["FilterBar_example"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([FilterBarComponent])],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "FilterBar_example", 3, "showSubmitButton", "formData", "save"]],
  template: function FilterBarComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function FilterBarComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 713372:
/*!************************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/googlemap.component.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GoogleMapComponent": () => (/* binding */ GoogleMapComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




class GoogleMapComponent {
  constructor(data) {
    this.data = data;
    this.formData = {
      locations: [{
        "id": "clfm38bvi0002ob01qvzhsm5z",
        "createdAt": "2023-03-24",
        "updatedAt": "2023-04-01",
        "name": "New York ",
        "locationName": null,
        "line1": null,
        "line2": null,
        "city": "New York",
        "state": "New Your",
        "postalCode": "335",
        "latitude": 37.98500309285596,
        "longitude": -80.189453125,
        "abbrev": null,
        "division": null,
        "country": "USA",
        "officePhone": null,
        "fax": null,
        "attentionTo": null,
        "providerLocations": null,
        "caseAccounts": null,
        "caseProcedures": null,
        "appointments": null
      }, {
        "id": "clfuxl1j50002v0rc8dgm33jb",
        "createdAt": "2023-03-30",
        "updatedAt": "2023-03-30",
        "name": "Cicago",
        "locationName": null,
        "line1": null,
        "line2": null,
        "city": "Cicago",
        "state": "Kansas",
        "postalCode": "335",
        "latitude": 38.985003092856,
        "longitude": -81.189453125,
        "abbrev": null,
        "division": null,
        "country": "USA",
        "officePhone": null,
        "fax": null,
        "attentionTo": null,
        "providerLocations": null,
        "caseAccounts": null,
        "caseProcedures": null,
        "appointments": null
      }, {
        "id": "clg0woxoc000yv0ywaemxje1d",
        "createdAt": "2023-04-03",
        "updatedAt": "2023-04-03",
        "name": "Texas",
        "locationName": null,
        "line1": null,
        "line2": null,
        "city": "Texas",
        "state": "Virginia",
        "postalCode": "223",
        "latitude": 35.985003092856,
        "longitude": -82.189453125,
        "abbrev": null,
        "division": null,
        "country": "USA",
        "officePhone": null,
        "fax": null,
        "attentionTo": null,
        "providerLocations": null,
        "caseAccounts": null,
        "caseProcedures": null,
        "appointments": null
      }, {
        "id": "clg0x25r30012v0ywj54joyx8",
        "createdAt": "2023-04-03",
        "updatedAt": "2023-04-03",
        "name": "Houston",
        "locationName": null,
        "line1": null,
        "line2": null,
        "city": "Houston",
        "state": "Texas",
        "postalCode": "675",
        "latitude": 33.985003092856,
        "longitude": -80.389453125,
        "abbrev": null,
        "division": null,
        "country": "USA",
        "officePhone": null,
        "fax": null,
        "attentionTo": null,
        "providerLocations": null,
        "caseAccounts": null,
        "caseProcedures": null,
        "appointments": null
      }, {
        "id": "clg29fpjl0000o6016gxv5q4e",
        "createdAt": "2023-04-04",
        "updatedAt": "2023-04-04",
        "name": "NewMexico",
        "locationName": null,
        "line1": null,
        "line2": null,
        "city": "NewMexico",
        "state": "NewMexico",
        "postalCode": "424",
        "latitude": 39.985003092856,
        "longitude": -83.189453125,
        "abbrev": null,
        "division": null,
        "country": "USA",
        "officePhone": null,
        "fax": null,
        "attentionTo": null,
        "providerLocations": null,
        "caseAccounts": null,
        "caseProcedures": null,
        "appointments": null
      }, {
        "id": "clg29gmoy0002o601rimfig24",
        "createdAt": "2023-04-04",
        "updatedAt": "2023-04-04",
        "name": "Wellington",
        "locationName": null,
        "line1": null,
        "line2": null,
        "city": "Wellington",
        "state": "Mashchusesu",
        "postalCode": "234",
        "latitude": 37.385003092856,
        "longitude": -80.189453125,
        "abbrev": null,
        "division": null,
        "country": "USA",
        "officePhone": null,
        "fax": null,
        "attentionTo": null,
        "providerLocations": null,
        "caseAccounts": null,
        "caseProcedures": null,
        "appointments": null
      }]
    };
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
GoogleMapComponent.ɵfac = function GoogleMapComponent_Factory(t) {
  return new (t || GoogleMapComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.WebCoreDataAccessService));
};
GoogleMapComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: GoogleMapComponent,
  selectors: [["GoogleMap_example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "GoogleMap_example", 3, "showSubmitButton", "formData", "save"]],
  template: function GoogleMapComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function GoogleMapComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 727446:
/*!*******************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/grid.component.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GridComponent": () => (/* binding */ GridComponent)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ 763900);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);






class GridComponent {
  constructor(data) {
    this.data = data;
    this.formData = {
      accidentTypes: this.filterAccidentTypes()
    };
  }
  filterAccidentTypes() {
    return this.data.userAccidentTypes({
      input: {}
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_0__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.of)(response.data.items)));
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
GridComponent.ɵfac = function GridComponent_Factory(t) {
  return new (t || GridComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_3__.WebCoreDataAccessService));
};
GridComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: GridComponent,
  selectors: [["Grid_example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "Grid_example", 3, "showSubmitButton", "formData", "save"]],
  template: function GridComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("save", function GridComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_4__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 263631:
/*!********************************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/grid.layout.component.store.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GridLayoutComponentStore": () => (/* binding */ GridLayoutComponentStore)
/* harmony export */ });
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data */ 811472);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 504523);
/* harmony import */ var _fuse_services_loading_loading_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fuse/services/loading/loading.service */ 301463);
/* harmony import */ var _case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/ui/toast */ 971873);










class GridLayoutComponentStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(formService, loading, toast) {
    super({
      query: "",
      loading: false
    });
    this.formService = formService;
    this.loading = loading;
    this.toast = toast;
    this.loading$ = this.select(s => s.loading);
    this.vm$ = this.select(this.loading$, loading => ({
      loading
    }));
  }
  loadProducts() {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.of)(_data__WEBPACK_IMPORTED_MODULE_2__.products);
  }
}
GridLayoutComponentStore.ɵfac = function GridLayoutComponentStore_Factory(t) {
  return new (t || GridLayoutComponentStore)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_4__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_fuse_services_loading_loading_service__WEBPACK_IMPORTED_MODULE_5__.FuseLoadingService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_6__.WebUiToastService));
};
GridLayoutComponentStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
  token: GridLayoutComponentStore,
  factory: GridLayoutComponentStore.ɵfac
});

/***/ }),

/***/ 349894:
/*!**************************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/grid.layout.component.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GridLayoutComponent": () => (/* binding */ GridLayoutComponent)
/* harmony export */ });
/* harmony import */ var _grid_layout_component_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./grid.layout.component.store */ 263631);
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ 811472);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);







class GridLayoutComponent {
  constructor(data, store) {
    this.data = data;
    this.store = store;
    this.formData = {
      products: _data__WEBPACK_IMPORTED_MODULE_0__.products
    };
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
GridLayoutComponent.ɵfac = function GridLayoutComponent_Factory(t) {
  return new (t || GridLayoutComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_2__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_grid_layout_component_store__WEBPACK_IMPORTED_MODULE_3__.GridLayoutComponentStore));
};
GridLayoutComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: GridLayoutComponent,
  selectors: [["GridLayout_example"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([_grid_layout_component_store__WEBPACK_IMPORTED_MODULE_3__.GridLayoutComponentStore])],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "GridLayout_example", 3, "showSubmitButton", "formData", "save"]],
  template: function GridLayoutComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("save", function GridLayoutComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_4__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 553673:
/*!********************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/group.component.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GroupComponent": () => (/* binding */ GroupComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




class GroupComponent {
  constructor(data) {
    this.data = data;
    this.formData = {};
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
GroupComponent.ɵfac = function GroupComponent_Factory(t) {
  return new (t || GroupComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.WebCoreDataAccessService));
};
GroupComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: GroupComponent,
  selectors: [["Group_example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "Group_example", 3, "showSubmitButton", "formData", "save"]],
  template: function GroupComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function GroupComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 611559:
/*!**********************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/heading.component.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HeadingComponent": () => (/* binding */ HeadingComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




class HeadingComponent {
  constructor(data) {
    this.data = data;
    this.formData = {};
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
HeadingComponent.ɵfac = function HeadingComponent_Factory(t) {
  return new (t || HeadingComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.WebCoreDataAccessService));
};
HeadingComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: HeadingComponent,
  selectors: [["Heading_example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "Heading_example", 3, "showSubmitButton", "formData", "save"]],
  template: function HeadingComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function HeadingComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 788059:
/*!*************************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/horizontal.component.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HorizontalComponent": () => (/* binding */ HorizontalComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




class HorizontalComponent {
  constructor(data) {
    this.data = data;
    this.formData = {
      tags: [{
        name: 'Angular'
      }, {
        name: 'React'
      }, {
        name: 'Vue'
      }, {
        name: 'Php'
      }, {
        name: 'Laravel'
      }, {
        name: 'Swift'
      }, {
        name: 'Android'
      }, {
        name: 'iPhone'
      }, {
        name: 'C++'
      }]
    };
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
HorizontalComponent.ɵfac = function HorizontalComponent_Factory(t) {
  return new (t || HorizontalComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.WebCoreDataAccessService));
};
HorizontalComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: HorizontalComponent,
  selectors: [["Horizontal_example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "Horizontal_example", 3, "showSubmitButton", "formData", "save"]],
  template: function HorizontalComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function HorizontalComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 965381:
/*!********************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/input.component.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InputComponent": () => (/* binding */ InputComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




class InputComponent {
  constructor(data) {
    this.data = data;
    this.formData = {};
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
InputComponent.ɵfac = function InputComponent_Factory(t) {
  return new (t || InputComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.WebCoreDataAccessService));
};
InputComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: InputComponent,
  selectors: [["Input_example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "Input_example", 3, "showSubmitButton", "formData", "save"]],
  template: function InputComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function InputComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 730904:
/*!**********************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/integer.component.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IntegerComponent": () => (/* binding */ IntegerComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




class IntegerComponent {
  constructor(data) {
    this.data = data;
    this.formData = {};
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
IntegerComponent.ɵfac = function IntegerComponent_Factory(t) {
  return new (t || IntegerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.WebCoreDataAccessService));
};
IntegerComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: IntegerComponent,
  selectors: [["Integer_example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "Integer_example", 3, "showSubmitButton", "formData", "save"]],
  template: function IntegerComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function IntegerComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 954402:
/*!**************************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/json.editor.component.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JsonEditorExampleComponent": () => (/* binding */ JsonEditorExampleComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




class JsonEditorExampleComponent {
  constructor(data) {
    this.data = data;
    this.formData = {};
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
JsonEditorExampleComponent.ɵfac = function JsonEditorExampleComponent_Factory(t) {
  return new (t || JsonEditorExampleComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.WebCoreDataAccessService));
};
JsonEditorExampleComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: JsonEditorExampleComponent,
  selectors: [["JsonEditor_example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "JsonEditor_example", 3, "showSubmitButton", "formData", "save"]],
  template: function JsonEditorExampleComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function JsonEditorExampleComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 718344:
/*!*********************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/kanban.component.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KanbanComponent": () => (/* binding */ KanbanComponent)
/* harmony export */ });
/* harmony import */ var _case_clinical_web_legal_case_shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/legal-case/shared */ 715922);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




class KanbanComponent {
  constructor(store) {
    this.store = store;
    this.formData = {
      legalCases: this.store.legalCases$
    };
  }
  ngOnInit() {
    this.store.setLimit(10);
    this.store.loadLegalCasesEffect();
  }
  submit(data) {
    alert(JSON.stringify(data));
  }
}
KanbanComponent.ɵfac = function KanbanComponent_Factory(t) {
  return new (t || KanbanComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_legal_case_shared__WEBPACK_IMPORTED_MODULE_1__.WebLegalCaseFeatureStore));
};
KanbanComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: KanbanComponent,
  selectors: [["Kanban_example"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_case_clinical_web_legal_case_shared__WEBPACK_IMPORTED_MODULE_1__.WebLegalCaseFeatureStore])],
  decls: 2,
  vars: 3,
  consts: [[1, "w-full"], ["formName", "Kanban_example", 3, "showSubmitButton", "formData", "componentStore", "save"]],
  template: function KanbanComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function KanbanComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", false)("formData", ctx.formData)("componentStore", ctx.store);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 633690:
/*!****************************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/la-icon.component.store.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LaIconStore": () => (/* binding */ LaIconStore)
/* harmony export */ });
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 318505);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 911365);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 504523);
/* harmony import */ var _fuse_services_loading_loading_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @fuse/services/loading/loading.service */ 301463);
/* harmony import */ var _case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @case-clinical/web/ui/toast */ 971873);
/* harmony import */ var _case_clinical_web_gender_shared__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @case-clinical/web/gender/shared */ 137373);











const initialUsers = [{
  "id": 1,
  "name": "User 1",
  "gender": "m",
  "status": "Online",
  "url": "https://images.unsplash.com/photo-1682685796766-0fddd3e480de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
}, {
  "id": 2,
  "name": "User 2",
  "gender": "m",
  "status": "Offline",
  "url": "https://images.unsplash.com/photo-1692653055277-acb45c75f1f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
}, {
  "id": 3,
  "name": "User 3",
  "gender": "m",
  "status": "Online",
  "url": "https://images.unsplash.com/photo-1686509595443-9d87f8733eb6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80"
}, {
  "id": 4,
  "name": "User 4",
  "gender": "m",
  "status": "Online",
  "url": "https://images.unsplash.com/photo-1693331238991-8c2faa576080?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
}, {
  "id": 5,
  "name": "User 5",
  "gender": "f",
  "status": "Offline",
  "url": "https://images.unsplash.com/photo-1682685797140-c17807f8f217?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
}];
class LaIconStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(formService, loading, toast, genderStore) {
    super({
      query: "",
      loading: false,
      users: initialUsers
    });
    this.formService = formService;
    this.loading = loading;
    this.toast = toast;
    this.genderStore = genderStore;
    this.loading$ = this.select(s => s.loading);
    this.users$ = this.select(s => s.users);
    this.genders$ = this.genderStore.genders$;
    this.vm$ = this.select(this.loading$, this.users$, (loading, users) => ({
      loading,
      users
    }));
    this.addNewUser = this.updater((state, newUser) => Object.assign(Object.assign({}, state), {
      users: [...state.users, newUser]
    }));
    this.updateNewUser = this.updater((state, newUser) => Object.assign(Object.assign({}, state), {
      users: state.users.map(user => user.id === newUser.id ? newUser : user)
    }));
    this.deleteUser = this.updater((state, id) => Object.assign(Object.assign({}, state), {
      users: state.users.filter(user => user.id !== id)
    }));
    this.addNewUserEffect = this.effect(userInput$ => userInput$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(userInput => {
      this.patchState({
        loading: true
      });
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.withLatestFrom)(this.users$), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([userInput, users]) => {
      const {
        name,
        gender,
        url,
        status
      } = userInput;
      const newId = users.length;
      this.addNewUser({
        id: newId,
        name,
        gender,
        url,
        status
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.of)(true);
    })));
    this.updateUserEffect = this.effect(userInput$ => userInput$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(userInput => {
      this.patchState({
        loading: true
      });
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.withLatestFrom)(this.users$), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([userInput, users]) => {
      const {
        id,
        name,
        gender,
        url,
        status
      } = userInput;
      this.updateNewUser({
        id: id,
        name,
        gender,
        url,
        status
      });
      this.closeUserUpdateModal();
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.of)(true);
    })));
    this.deleteUserEffect = this.effect(userInput$ => userInput$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(userInput => {
      this.patchState({
        loading: true
      });
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.withLatestFrom)(this.users$), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([userInput, users]) => {
      this.deleteUser(userInput.id);
      this.closeUserDeleteConfirmModal();
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.of)(true);
    })));
    this.cancelUserDeleteEffect = this.effect(userInput$ => userInput$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(userInput => {
      this.patchState({
        loading: true
      });
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.withLatestFrom)(this.users$), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([userInput, users]) => {
      this.closeUserDeleteConfirmModal();
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.of)(true);
    })));
    /** User Delete */
    /** User Update */
    this.updateUserStatus = this.effect(toggle$ => toggle$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(toggle => {
      this.patchState({
        loading: true
      });
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.withLatestFrom)(this.users$), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([toggle, users]) => {
      const {
        id,
        name,
        gender,
        url,
        status
      } = toggle;
      this.updateNewUser({
        id,
        name,
        gender,
        url,
        status
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.of)(true);
    })));
    this.genderStore.loadGendersEffect();
  }
  /** User Add */
  setUserAddModalCtrl(ctrl) {
    this.userAddModalCtrl = ctrl;
  }
  openUserAddModal(model = {}) {
    this.userAddModalCtrl.open(model, {
      genders: this.genders$
    }, this);
  }
  /** User Add */
  /** User Update */
  setUserUpdateModalCtrl(ctrl) {
    this.userUpdateModalCtrl = ctrl;
  }
  openUserUpdateModal(model = {}) {
    this.userUpdateModalCtrl.open(model, {
      genders: this.genders$
    }, this);
  }
  closeUserUpdateModal() {
    this.userUpdateModalCtrl.close();
  }
  /** User Update */
  /** User Delete */
  setUserDeleteConfirmModalCtrl(ctrl) {
    this.userDeleteConfirmModalCtrl = ctrl;
  }
  openUserDeleteConfirmModal(modal) {
    this.userDeleteConfirmModalCtrl.open(modal, {}, this);
  }
  closeUserDeleteConfirmModal() {
    this.userDeleteConfirmModalCtrl.close();
  }
}
LaIconStore.ɵfac = function LaIconStore_Factory(t) {
  return new (t || LaIconStore)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_6__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_fuse_services_loading_loading_service__WEBPACK_IMPORTED_MODULE_7__.FuseLoadingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_8__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_gender_shared__WEBPACK_IMPORTED_MODULE_9__.WebGenderFeatureStore));
};
LaIconStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: LaIconStore,
  factory: LaIconStore.ɵfac
});

/***/ }),

/***/ 714906:
/*!**********************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/la-icon.component.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LaIconComponent": () => (/* binding */ LaIconComponent)
/* harmony export */ });
/* harmony import */ var _la_icon_component_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./la-icon.component.store */ 633690);
/* harmony import */ var _case_clinical_web_gender_shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @case-clinical/web/gender/shared */ 137373);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);





class LaIconComponent {
  constructor(store) {
    this.store = store;
    this.vm$ = this.store.vm$;
    this.formData = {};
    this.model = {
      user: {
        name: 'John Doe'
      }
    };
  }
  ngOnInit() {
    this.subscriber = this.vm$.subscribe(vm => {
      console.log({
        vm
      });
      this.formData = this.getFormData(vm);
    });
  }
  getFormData(data) {
    return data;
  }
  ngOnDestroy() {
    var _a;
    (_a = this.subscriber) === null || _a === void 0 ? void 0 : _a.unsubscribe();
  }
  submit(data) {
    alert(JSON.stringify(data));
  }
}
LaIconComponent.ɵfac = function LaIconComponent_Factory(t) {
  return new (t || LaIconComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_la_icon_component_store__WEBPACK_IMPORTED_MODULE_1__.LaIconStore));
};
LaIconComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: LaIconComponent,
  selectors: [["LaIcon_example"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_la_icon_component_store__WEBPACK_IMPORTED_MODULE_1__.LaIconStore, _case_clinical_web_gender_shared__WEBPACK_IMPORTED_MODULE_2__.WebGenderFeatureStore])],
  decls: 2,
  vars: 4,
  consts: [[1, "w-full"], ["formName", "LaIcon_example", 3, "showSubmitButton", "formData", "componentStore", "model", "save"]],
  template: function LaIconComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function LaIconComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", false)("formData", ctx.formData)("componentStore", ctx.store)("model", ctx.model);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_3__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 446613:
/*!********************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/label.component.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LabelComponent": () => (/* binding */ LabelComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




class LabelComponent {
  constructor(data) {
    this.data = data;
    this.formData = {};
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
LabelComponent.ɵfac = function LabelComponent_Factory(t) {
  return new (t || LabelComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.WebCoreDataAccessService));
};
LabelComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: LabelComponent,
  selectors: [["Label_example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "Label_example", 3, "showSubmitButton", "formData", "save"]],
  template: function LabelComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function LabelComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 583:
/*!*******************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/link.component.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LinkComponent": () => (/* binding */ LinkComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




class LinkComponent {
  constructor(data) {
    this.data = data;
    this.formData = {};
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
LinkComponent.ɵfac = function LinkComponent_Factory(t) {
  return new (t || LinkComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.WebCoreDataAccessService));
};
LinkComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: LinkComponent,
  selectors: [["Link_example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "Link_example", 3, "showSubmitButton", "formData", "save"]],
  template: function LinkComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function LinkComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 548098:
/*!***********************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/markdown.component.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MarkdownComponent": () => (/* binding */ MarkdownComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




class MarkdownComponent {
  constructor(data) {
    this.data = data;
    this.formData = {};
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
MarkdownComponent.ɵfac = function MarkdownComponent_Factory(t) {
  return new (t || MarkdownComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.WebCoreDataAccessService));
};
MarkdownComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: MarkdownComponent,
  selectors: [["Markdown_example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "Markdown_example", 3, "showSubmitButton", "formData", "save"]],
  template: function MarkdownComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function MarkdownComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 350250:
/*!***************************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/masked.input.component.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MaskedInputComponent": () => (/* binding */ MaskedInputComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




class MaskedInputComponent {
  constructor(data) {
    this.data = data;
    this.formData = {};
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
MaskedInputComponent.ɵfac = function MaskedInputComponent_Factory(t) {
  return new (t || MaskedInputComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.WebCoreDataAccessService));
};
MaskedInputComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: MaskedInputComponent,
  selectors: [["MaskedInput_example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "MaskedInput_example", 3, "showSubmitButton", "formData", "save"]],
  template: function MaskedInputComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function MaskedInputComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 322668:
/*!*************************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/multiselect.componen.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MultiSelectComponent": () => (/* binding */ MultiSelectComponent)
/* harmony export */ });
/* harmony import */ var _case_clinical_web_diagnosis_code_shared__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @case-clinical/web/diagnosis-code/shared */ 634614);
/* harmony import */ var _multiselect_component_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./multiselect.component.store */ 923489);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);






class MultiSelectComponent {
  constructor(store) {
    this.store = store;
    this.formData = {
      codes: (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.of)([{
        id: '123',
        name: '123'
      }, {
        id: '456',
        name: '456'
      }, {
        id: '789',
        name: '789'
      }]),
      selectedCodes: this.store.selectedCodes$
    };
    this.model = {
      codes: ['aa']
    };
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
MultiSelectComponent.ɵfac = function MultiSelectComponent_Factory(t) {
  return new (t || MultiSelectComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_multiselect_component_store__WEBPACK_IMPORTED_MODULE_2__.MultiSelectComponentStore));
};
MultiSelectComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: MultiSelectComponent,
  selectors: [["MultiSelect_example"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([_case_clinical_web_diagnosis_code_shared__WEBPACK_IMPORTED_MODULE_3__.WebDiagnosisCodeFeatureStore, _multiselect_component_store__WEBPACK_IMPORTED_MODULE_2__.MultiSelectComponentStore])],
  decls: 2,
  vars: 4,
  consts: [[1, "w-full"], ["formName", "MultiSelect_example", 3, "showSubmitButton", "formData", "componentStore", "model", "save"]],
  template: function MultiSelectComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("save", function MultiSelectComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData)("componentStore", ctx.store)("model", ctx.model);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_4__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 923489:
/*!********************************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/multiselect.component.store.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MultiSelectComponentStore": () => (/* binding */ MultiSelectComponentStore)
/* harmony export */ });
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_diagnosis_code_shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @case-clinical/web/diagnosis-code/shared */ 634614);




class MultiSelectComponentStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(store) {
    super({
      loading: false,
      query: "",
      selectedCodes: []
    });
    this.store = store;
    this.diagnosisCodes$ = this.store.diagnosisCodes$;
    this.loading$ = this.select(s => s.loading);
    this.selectedCodes$ = this.select(s => s.selectedCodes);
    this.vm$ = this.select(this.loading$, loading => ({
      loading
    }));
    this.setSelectedCodes = this.updater((state, selectedCodes) => Object.assign(Object.assign({}, state), {
      selectedCodes
    }));
    this.store.loadDiagnosisCodesEffect();
  }
}
MultiSelectComponentStore.ɵfac = function MultiSelectComponentStore_Factory(t) {
  return new (t || MultiSelectComponentStore)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_case_clinical_web_diagnosis_code_shared__WEBPACK_IMPORTED_MODULE_2__.WebDiagnosisCodeFeatureStore));
};
MultiSelectComponentStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: MultiSelectComponentStore,
  factory: MultiSelectComponentStore.ɵfac
});

/***/ }),

/***/ 554795:
/*!********************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/music.component.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MusicComponent": () => (/* binding */ MusicComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




class MusicComponent {
  constructor(data) {
    this.data = data;
    this.formData = {};
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
MusicComponent.ɵfac = function MusicComponent_Factory(t) {
  return new (t || MusicComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.WebCoreDataAccessService));
};
MusicComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: MusicComponent,
  selectors: [["MusicWidget_example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "Music_example", 3, "showSubmitButton", "formData", "save"]],
  template: function MusicComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function MusicComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 414020:
/*!*********************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/number.component.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NumberComponent": () => (/* binding */ NumberComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




class NumberComponent {
  constructor(data) {
    this.data = data;
    this.formData = {};
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
NumberComponent.ɵfac = function NumberComponent_Factory(t) {
  return new (t || NumberComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.WebCoreDataAccessService));
};
NumberComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: NumberComponent,
  selectors: [["Number_example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "Number_example", 3, "showSubmitButton", "formData", "save"]],
  template: function NumberComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function NumberComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 701619:
/*!***********************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/overview.component.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OverviewComponent": () => (/* binding */ OverviewComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);



class OverviewComponent {
  constructor() {
    this.formData = {
      "profits": (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.of)([{
        "year": '2012',
        "import": 234,
        "export": 12
      }, {
        "year": '2013',
        "import": 134,
        "export": 16
      }, {
        "year": '2014',
        "import": 500,
        "export": 120
      }])
    };
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
OverviewComponent.ɵfac = function OverviewComponent_Factory(t) {
  return new (t || OverviewComponent)();
};
OverviewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: OverviewComponent,
  selectors: [["Overview_example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "Overview_example", 3, "showSubmitButton", "formData", "save"]],
  template: function OverviewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("save", function OverviewComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 385815:
/*!************************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/paragraph.component.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ParagraphComponent": () => (/* binding */ ParagraphComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




class ParagraphComponent {
  constructor(data) {
    this.data = data;
    this.formData = {};
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
ParagraphComponent.ɵfac = function ParagraphComponent_Factory(t) {
  return new (t || ParagraphComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.WebCoreDataAccessService));
};
ParagraphComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: ParagraphComponent,
  selectors: [["Paragraph_example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "Paragraph_example", 3, "showSubmitButton", "formData", "save"]],
  template: function ParagraphComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function ParagraphComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 257978:
/*!***********************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/password.component.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PasswordComponent": () => (/* binding */ PasswordComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




class PasswordComponent {
  constructor(data) {
    this.data = data;
    this.formData = {};
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
PasswordComponent.ɵfac = function PasswordComponent_Factory(t) {
  return new (t || PasswordComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.WebCoreDataAccessService));
};
PasswordComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: PasswordComponent,
  selectors: [["Password_example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "Password_example", 3, "showSubmitButton", "formData", "save"]],
  template: function PasswordComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function PasswordComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 436172:
/*!**********************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/picture.component.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PictureComponent": () => (/* binding */ PictureComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




class PictureComponent {
  constructor(data) {
    this.data = data;
    this.formData = {};
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
PictureComponent.ɵfac = function PictureComponent_Factory(t) {
  return new (t || PictureComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.WebCoreDataAccessService));
};
PictureComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: PictureComponent,
  selectors: [["Picture_example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "Picture_example", 3, "showSubmitButton", "formData", "save"]],
  template: function PictureComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function PictureComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 887833:
/*!************************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/pie-chart.component.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PieChartComponent": () => (/* binding */ PieChartComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




class PieChartComponent {
  constructor(data) {
    this.data = data;
    this.formData = {
      languages: [{
        label: 'English',
        value: 33
      }, {
        label: 'French',
        value: 13
      }, {
        label: 'Chinese',
        value: 43
      }, {
        label: 'Spanish',
        value: 5
      }],
      stats: [{
        label: '2019',
        value: 23
      }, {
        label: '20120',
        value: 3
      }, {
        label: '2021',
        value: 10
      }, {
        label: '2022',
        value: 15
      }, {
        label: '2023',
        value: 9
      }, {
        label: '2014',
        value: 10
      }]
    };
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
PieChartComponent.ɵfac = function PieChartComponent_Factory(t) {
  return new (t || PieChartComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.WebCoreDataAccessService));
};
PieChartComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: PieChartComponent,
  selectors: [["PieChart_example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "PieChart_example", 3, "showSubmitButton", "formData", "save"]],
  template: function PieChartComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function PieChartComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 718162:
/*!*********************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/repeat.component.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RepeatComponent": () => (/* binding */ RepeatComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




class RepeatComponent {
  constructor(data) {
    this.data = data;
    this.formData = {};
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
RepeatComponent.ɵfac = function RepeatComponent_Factory(t) {
  return new (t || RepeatComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.WebCoreDataAccessService));
};
RepeatComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: RepeatComponent,
  selectors: [["Repeat_example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "Repeat_example", 3, "showSubmitButton", "formData", "save"]],
  template: function RepeatComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function RepeatComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 103205:
/*!***********************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/richtext.component.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RichTextComponent": () => (/* binding */ RichTextComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




class RichTextComponent {
  constructor(data) {
    this.data = data;
    this.formData = {};
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
RichTextComponent.ɵfac = function RichTextComponent_Factory(t) {
  return new (t || RichTextComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.WebCoreDataAccessService));
};
RichTextComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: RichTextComponent,
  selectors: [["RichText_example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "RichText_example", 3, "showSubmitButton", "formData", "save"]],
  template: function RichTextComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function RichTextComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 964222:
/*!*************************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/selectform.component.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SelectFormComponent": () => (/* binding */ SelectFormComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




class SelectFormComponent {
  constructor(data) {
    this.data = data;
    this.formData = {};
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
SelectFormComponent.ɵfac = function SelectFormComponent_Factory(t) {
  return new (t || SelectFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.WebCoreDataAccessService));
};
SelectFormComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: SelectFormComponent,
  selectors: [["SelectForm_example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "SelectForm_example", 3, "showSubmitButton", "formData", "save"]],
  template: function SelectFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function SelectFormComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 546932:
/*!**********************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/stepper.component.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StepperComponent": () => (/* binding */ StepperComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




class StepperComponent {
  constructor(data) {
    this.data = data;
    this.formData = {};
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
StepperComponent.ɵfac = function StepperComponent_Factory(t) {
  return new (t || StepperComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.WebCoreDataAccessService));
};
StepperComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: StepperComponent,
  selectors: [["Stepper_example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "Stepper_example", 3, "showSubmitButton", "formData", "save"]],
  template: function StepperComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function StepperComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 201149:
/*!***********************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/svg-view.component.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SvgViewComponent": () => (/* binding */ SvgViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




class SvgViewComponent {
  constructor(data) {
    this.data = data;
    this.model = {
      createdAt: '2023-04-05',
      firstName: 'John',
      lastName: "Doe",
      pharmacyControlNumber: 'PCHI',
      medicalRecordNumber: "ETEG344545",
      pchGroupNumber: "IHYMA",
      color: "#ff9e00"
    };
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
SvgViewComponent.ɵfac = function SvgViewComponent_Factory(t) {
  return new (t || SvgViewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.WebCoreDataAccessService));
};
SvgViewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: SvgViewComponent,
  selectors: [["SvgView_example"]],
  decls: 2,
  vars: 1,
  consts: [[1, "w-full"], ["formName", "SvgView_example", 3, "showSubmitButton", "save"]],
  template: function SvgViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function SvgViewComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 506709:
/*!********************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/table.component.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TableComponent": () => (/* binding */ TableComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);


class TableComponent {
  constructor() {
    this.formData = {
      users: [{
        id: 1,
        name: 'User 1',
        gender: 'Male',
        posts: [{
          id: 1,
          title: 'Post 1',
          year: 2023,
          price: 34.30
        }, {
          id: 1,
          title: 'Post 2',
          year: 2023,
          price: 50.00
        }]
      }, {
        id: 2,
        name: 'User 2',
        gender: 'Female',
        posts: [{
          id: 3,
          title: 'Post 3',
          year: 2018,
          price: 134.30
        }, {
          id: 4,
          title: 'Post 4',
          year: 2017,
          price: 150.00
        }, {
          id: 5,
          title: 'Post 5',
          year: 2019,
          price: 130.00
        }]
      }]
    };
  }
}
TableComponent.ɵfac = function TableComponent_Factory(t) {
  return new (t || TableComponent)();
};
TableComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: TableComponent,
  selectors: [["Table_example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "Table_example", 3, "showSubmitButton", "formData"]],
  template: function TableComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", false)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_1__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 80462:
/*!*******************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/tabs.component.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TabsComponent": () => (/* binding */ TabsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




class TabsComponent {
  constructor(data) {
    this.data = data;
    this.formData = {};
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
TabsComponent.ɵfac = function TabsComponent_Factory(t) {
  return new (t || TabsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.WebCoreDataAccessService));
};
TabsComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: TabsComponent,
  selectors: [["Tabs_example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "Tabs_example", 3, "showSubmitButton", "formData", "save"]],
  template: function TabsComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function TabsComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 940891:
/*!***********************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/textarea.component.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TextAreaComponent": () => (/* binding */ TextAreaComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




class TextAreaComponent {
  constructor(data) {
    this.data = data;
    this.formData = {};
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
TextAreaComponent.ɵfac = function TextAreaComponent_Factory(t) {
  return new (t || TextAreaComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.WebCoreDataAccessService));
};
TextAreaComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: TextAreaComponent,
  selectors: [["TextArea_example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "TextArea_example", 3, "showSubmitButton", "formData", "save"]],
  template: function TextAreaComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function TextAreaComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 66652:
/*!********************************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/time-line-stepper.component.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TimeLineStepperComponent": () => (/* binding */ TimeLineStepperComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




class TimeLineStepperComponent {
  constructor(data) {
    this.data = data;
    this.formData = {
      "milestones": [{
        "date": "2024-12-11",
        "sender": "John Doe"
      }, {
        "date": "2024-12-15",
        "sender": "Felix"
      }, {
        "date": "2024-12-19",
        "sender": "Michael"
      }],
      timelines: [{
        title: 'Action Attempt',
        value: '2022-08-02'
      }, {
        title: 'Action Taken',
        value: 'Fax'
      }, {
        title: 'Request Count',
        value: 5
      }, {
        title: 'Notes',
        value: ''
      }]
    };
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
TimeLineStepperComponent.ɵfac = function TimeLineStepperComponent_Factory(t) {
  return new (t || TimeLineStepperComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.WebCoreDataAccessService));
};
TimeLineStepperComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: TimeLineStepperComponent,
  selectors: [["TimeLineStepper_example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "TimeLineStepper_example", 3, "showSubmitButton", "formData", "save"]],
  template: function TimeLineStepperComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function TimeLineStepperComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 769336:
/*!********************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/title.component.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TitleComponent": () => (/* binding */ TitleComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




class TitleComponent {
  constructor(data) {
    this.data = data;
    this.formData = {};
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
TitleComponent.ɵfac = function TitleComponent_Factory(t) {
  return new (t || TitleComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.WebCoreDataAccessService));
};
TitleComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: TitleComponent,
  selectors: [["Title_example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "Title_example", 3, "showSubmitButton", "formData", "save"]],
  template: function TitleComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function TitleComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 274965:
/*!************************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/typeahead.component.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TypeaheadComponent": () => (/* binding */ TypeaheadComponent)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ 763900);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);






class TypeaheadComponent {
  constructor(data) {
    this.data = data;
    this.formData = {
      accidentTypes: this.filterAccidentTypes()
    };
  }
  filterAccidentTypes() {
    return this.data.userAccidentTypes({
      input: {}
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_0__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.of)(response.data.items)));
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
TypeaheadComponent.ɵfac = function TypeaheadComponent_Factory(t) {
  return new (t || TypeaheadComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_3__.WebCoreDataAccessService));
};
TypeaheadComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: TypeaheadComponent,
  selectors: [["typeahead_example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "typeahead_example", 3, "showSubmitButton", "formData", "save"]],
  template: function TypeaheadComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("save", function TypeaheadComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_4__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 635112:
/*!******************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/url.component.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UrlComponent": () => (/* binding */ UrlComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




class UrlComponent {
  constructor(data) {
    this.data = data;
    this.formData = {};
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
UrlComponent.ɵfac = function UrlComponent_Factory(t) {
  return new (t || UrlComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.WebCoreDataAccessService));
};
UrlComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: UrlComponent,
  selectors: [["Url_example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "Url_example", 3, "showSubmitButton", "formData", "save"]],
  template: function UrlComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function UrlComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 370535:
/*!***********************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/components/vertical.component.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VerticalComponent": () => (/* binding */ VerticalComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




class VerticalComponent {
  constructor(data) {
    this.data = data;
    this.formData = {
      users: [{
        name: 'Name A',
        show: true,
        status: 'Pending'
      }, {
        name: 'Name B',
        show: true,
        status: 'Cancelled'
      }, {
        name: 'Name C',
        show: false,
        status: 'Approved'
      }, {
        name: 'Name D',
        show: true,
        status: 'Pending'
      }]
    };
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
VerticalComponent.ɵfac = function VerticalComponent_Factory(t) {
  return new (t || VerticalComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.WebCoreDataAccessService));
};
VerticalComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: VerticalComponent,
  selectors: [["Vertical_example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "Vertical_example", 3, "showSubmitButton", "formData", "save"]],
  template: function VerticalComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function VerticalComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 589043:
/*!************************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/form-builder-example.component.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormBuilderExampleComponent": () => (/* binding */ FormBuilderExampleComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 782722);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _fuse_services_media_watcher__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fuse/services/media-watcher */ 772327);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/sidenav */ 523267);
/* harmony import */ var _components_ag_grid_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/ag-grid.component */ 628723);
/* harmony import */ var _components_table_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/table.component */ 506709);
/* harmony import */ var _components_la_icon_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/la-icon.component */ 714906);
/* harmony import */ var _components_pie_chart_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/pie-chart.component */ 887833);
/* harmony import */ var _components_time_line_stepper_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/time-line-stepper.component */ 66652);
/* harmony import */ var _components_kanban_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/kanban.component */ 718344);
/* harmony import */ var _components_address_picker_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/address.picker.component */ 95967);
/* harmony import */ var _components_class_builder_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/class.builder.component */ 846030);
/* harmony import */ var _components_angular_chart_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/angular.chart.component */ 586242);
/* harmony import */ var _components_svg_view_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components/svg-view.component */ 201149);
/* harmony import */ var _components_boolean_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components/boolean.component */ 712415);
/* harmony import */ var _components_card_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./components/card.component */ 451439);
/* harmony import */ var _components_music_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./components/music.component */ 554795);
/* harmony import */ var _components_anatomical_model_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./components/anatomical-model.component */ 139280);
/* harmony import */ var _components_horizontal_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./components/horizontal.component */ 788059);
/* harmony import */ var _components_bar_chart_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./components/bar-chart.component */ 113459);
/* harmony import */ var _components_collapse_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./components/collapse.component */ 980940);
/* harmony import */ var _components_color_picker_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./components/color.picker.component */ 774184);
/* harmony import */ var _components_currency_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./components/currency.component */ 368545);
/* harmony import */ var _components_date_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./components/date.component */ 628857);
/* harmony import */ var _components_carousel_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./components/carousel.component */ 686113);
/* harmony import */ var _components_datetime_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./components/datetime.component */ 194086);
/* harmony import */ var _components_description_list_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./components/description.list.component */ 834493);
/* harmony import */ var _components_divider_example__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./components/divider.example */ 567841);
/* harmony import */ var _components_drodown_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./components/drodown.component */ 207226);
/* harmony import */ var _components_email_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./components/email.component */ 976342);
/* harmony import */ var _components_embed_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./components/embed.component */ 13187);
/* harmony import */ var _components_enumeration_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./components/enumeration.component */ 315931);
/* harmony import */ var _toolbox_component__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./toolbox.component */ 248264);
/* harmony import */ var _components_filter_bar_component__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./components/filter.bar.component */ 201556);
/* harmony import */ var _components_grid_component__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./components/grid.component */ 727446);
/* harmony import */ var _components_googlemap_component__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./components/googlemap.component */ 713372);
/* harmony import */ var _components_grid_layout_component__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./components/grid.layout.component */ 349894);
/* harmony import */ var _components_group_component__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./components/group.component */ 553673);
/* harmony import */ var _components_heading_component__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./components/heading.component */ 611559);
/* harmony import */ var _components_input_component__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./components/input.component */ 965381);
/* harmony import */ var _components_integer_component__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./components/integer.component */ 730904);
/* harmony import */ var _components_json_editor_component__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./components/json.editor.component */ 954402);
/* harmony import */ var _components_label_component__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./components/label.component */ 446613);
/* harmony import */ var _components_link_component__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./components/link.component */ 583);
/* harmony import */ var _components_markdown_component__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./components/markdown.component */ 548098);
/* harmony import */ var _components_masked_input_component__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./components/masked.input.component */ 350250);
/* harmony import */ var _components_multiselect_componen__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./components/multiselect.componen */ 322668);
/* harmony import */ var _components_number_component__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./components/number.component */ 414020);
/* harmony import */ var _components_overview_component__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./components/overview.component */ 701619);
/* harmony import */ var _components_paragraph_component__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./components/paragraph.component */ 385815);
/* harmony import */ var _components_password_component__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./components/password.component */ 257978);
/* harmony import */ var _components_picture_component__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./components/picture.component */ 436172);
/* harmony import */ var _components_repeat_component__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./components/repeat.component */ 718162);
/* harmony import */ var _components_richtext_component__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./components/richtext.component */ 103205);
/* harmony import */ var _router_component__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./router.component */ 5362);
/* harmony import */ var _components_selectform_component__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./components/selectform.component */ 964222);
/* harmony import */ var _components_stepper_component__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./components/stepper.component */ 546932);
/* harmony import */ var _components_tabs_component__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./components/tabs.component */ 80462);
/* harmony import */ var _components_textarea_component__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./components/textarea.component */ 940891);
/* harmony import */ var _components_title_component__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./components/title.component */ 769336);
/* harmony import */ var _components_typeahead_component__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./components/typeahead.component */ 274965);
/* harmony import */ var _components_url_component__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ./components/url.component */ 635112);
/* harmony import */ var _components_vertical_component__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ./components/vertical.component */ 370535);




































































const _c0 = ["drawer"];
function FormBuilderExampleComponent_ng_container_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "example-enumeration");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "color-picker-example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "typeahead_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "AddressPicker_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "Group_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_26_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "Repeat_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_27_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "Card_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_28_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "Collapse_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_29_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "Tabs_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_30_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "Stepper_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_31_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "JsonEditor_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_32_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "FilterBar_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_33_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "GridLayout_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_34_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "Grid_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_35_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "Paragraph_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_36_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "Heading_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_37_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "Title_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_38_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "Link_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_39_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "Divider_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_40_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "DescriptionList_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_41_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "Embed_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_42_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "Label_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_43_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "Picture_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_44_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "Boolean_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_45_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "Date_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_46_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "DateTime_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_47_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "Dropdown_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_48_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "Input_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_49_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "Integer_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_50_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "MaskedInput_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_51_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "MultiSelect_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_52_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "Number_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_53_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "Password_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_54_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "TextArea_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_55_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "GoogleMap_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_56_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "Currency_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_57_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "Email_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_58_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "Markdown_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_59_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "RichText_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_60_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "SelectForm_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_61_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "Url_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_62_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "Carousel_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_63_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "Router_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_64_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "Vertical_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_65_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "Horizontal_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_66_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "Overview_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_67_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "AngularChart_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_68_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "ClassBuilder_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_69_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "PieChart_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_70_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "BarChart_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_71_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "LaIcon_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_72_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "AnatomicModel_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_73_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "SvgView_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_74_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "MusicWidget_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_75_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "Kanban_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_76_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "AgGrid_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_77_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "TimeLineStepper_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FormBuilderExampleComponent_ng_container_78_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "Table_example");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
class FormBuilderExampleComponent {
  /**
   * Constructor
   */
  constructor(_changeDetectorRef, _fuseMediaWatcherService) {
    this._changeDetectorRef = _changeDetectorRef;
    this._fuseMediaWatcherService = _fuseMediaWatcherService;
    this.panels = [];
    this.signupSetting = true;
    this.drawerMode = 'side';
    this.drawerOpened = true;
    this.selectedPanel = null;
    this._unsubscribeAll = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit() {
    // Setup available panels
    // Subscribe to media changes
    this._fuseMediaWatcherService.onMediaChange$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(this._unsubscribeAll)).subscribe(({
      matchingAliases
    }) => {
      // Set the drawerMode and drawerOpened
      if (matchingAliases.includes('lg')) {
        this.drawerMode = 'side';
        this.drawerOpened = true;
      } else {
        this.drawerMode = 'over';
        this.drawerOpened = false;
      }
      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
  }
  /**
   * On destroy
   */
  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Navigate to the panel
   *
   * @param panel
   */
  goToPanel(panel) {
    this.selectedPanel = panel;
    // Close the drawer on 'over' mode
    if (this.drawerMode === 'over') {
      this.drawer.close();
    }
  }
  formFieldSelected($event) {
    console.log($event);
    if ($event) {
      this.selectedPanel = $event.name;
      // Close the drawer on 'over' mode
      if (this.drawerMode === 'over') {
        this.drawer.close();
      }
    }
  }
  /**
   * Get the details of the panel
   *
   * @param id
   */
  getPanelInfo(id) {
    return this.panels.find(panel => panel.id === id);
  }
  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index, item) {
    return item.id || index;
  }
}
FormBuilderExampleComponent.ɵfac = function FormBuilderExampleComponent_Factory(t) {
  return new (t || FormBuilderExampleComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_fuse_services_media_watcher__WEBPACK_IMPORTED_MODULE_3__.FuseMediaWatcherService));
};
FormBuilderExampleComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: FormBuilderExampleComponent,
  selectors: [["ui-form-builder-example"]],
  viewQuery: function FormBuilderExampleComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.drawer = _t.first);
    }
  },
  decls: 79,
  vars: 65,
  consts: [[1, "flex", "flex-col", "w-full", "bg-gray-50", "dark:bg-gray-900", "min-w-0", "sm:absolute", "sm:inset-0", "sm:overflow-hidden"], [1, "flex-auto", "sm:h-full"], [1, "sm:w-64", "bg-gray-50", "dark:bg-gray-900", "flex", "flex-col", 3, "autoFocus", "mode", "opened"], ["drawer", ""], [1, "flex", "items-center", "justify-between", "m-8", "mr-6", "sm:my-10"], [1, "text-4xl", "text-gray-900", "dark:text-gray-50", "font-extrabold", "tracking-tight", "leading-none"], [1, "lg:hidden"], ["mat-icon-button", "", 3, "click"], [3, "svgIcon"], [1, "flex", "flex-col", "divide-y", "border-red-800", "border-b", "flex-1"], ["clas", "w-full h-full", 2, "height", "100%", 3, "selected"], [1, "flex", "flex-col", "bg-gray-100", "dark:bg-gray-900"], [1, "flex-auto", "px-6", "pt-9", "pb-12", "md:p-8", "md:pb-12", "lg:p-12"], [1, "flex", "items-center"], ["mat-icon-button", "", 1, "lg:hidden", "-ml-2", 3, "click"], [1, "ml-2", "lg:ml-0", "text-3xl", "font-bold", "tracking-tight", "leading-none", "text-gray-900", "dark:text-gray-50", "font-serif"], [1, "h-full", "pt-8"], [3, "ngSwitch"], [4, "ngSwitchCase"]],
  template: function FormBuilderExampleComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r59 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "mat-drawer-container", 1)(2, "mat-drawer", 2, 3)(4, "div", 4)(5, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Examples");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 6)(8, "button", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function FormBuilderExampleComponent_Template_button_click_8_listener() {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r59);
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](3);
        return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](_r0.close());
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "mat-icon", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 9)(11, "example-tool-box", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("selected", function FormBuilderExampleComponent_Template_example_tool_box_selected_11_listener($event) {
        return ctx.formFieldSelected($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "mat-drawer-content", 11)(13, "div", 12)(14, "div", 13)(15, "button", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function FormBuilderExampleComponent_Template_button_click_15_listener() {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r59);
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](3);
        return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](_r0.toggle());
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](16, "mat-icon", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](20, 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](21, FormBuilderExampleComponent_ng_container_21_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](22, FormBuilderExampleComponent_ng_container_22_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](23, FormBuilderExampleComponent_ng_container_23_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](24, FormBuilderExampleComponent_ng_container_24_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](25, FormBuilderExampleComponent_ng_container_25_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](26, FormBuilderExampleComponent_ng_container_26_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](27, FormBuilderExampleComponent_ng_container_27_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](28, FormBuilderExampleComponent_ng_container_28_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](29, FormBuilderExampleComponent_ng_container_29_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](30, FormBuilderExampleComponent_ng_container_30_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](31, FormBuilderExampleComponent_ng_container_31_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](32, FormBuilderExampleComponent_ng_container_32_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](33, FormBuilderExampleComponent_ng_container_33_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](34, FormBuilderExampleComponent_ng_container_34_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](35, FormBuilderExampleComponent_ng_container_35_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](36, FormBuilderExampleComponent_ng_container_36_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](37, FormBuilderExampleComponent_ng_container_37_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](38, FormBuilderExampleComponent_ng_container_38_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](39, FormBuilderExampleComponent_ng_container_39_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](40, FormBuilderExampleComponent_ng_container_40_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](41, FormBuilderExampleComponent_ng_container_41_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](42, FormBuilderExampleComponent_ng_container_42_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](43, FormBuilderExampleComponent_ng_container_43_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](44, FormBuilderExampleComponent_ng_container_44_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](45, FormBuilderExampleComponent_ng_container_45_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](46, FormBuilderExampleComponent_ng_container_46_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](47, FormBuilderExampleComponent_ng_container_47_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](48, FormBuilderExampleComponent_ng_container_48_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](49, FormBuilderExampleComponent_ng_container_49_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](50, FormBuilderExampleComponent_ng_container_50_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](51, FormBuilderExampleComponent_ng_container_51_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](52, FormBuilderExampleComponent_ng_container_52_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](53, FormBuilderExampleComponent_ng_container_53_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](54, FormBuilderExampleComponent_ng_container_54_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](55, FormBuilderExampleComponent_ng_container_55_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](56, FormBuilderExampleComponent_ng_container_56_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](57, FormBuilderExampleComponent_ng_container_57_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](58, FormBuilderExampleComponent_ng_container_58_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](59, FormBuilderExampleComponent_ng_container_59_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](60, FormBuilderExampleComponent_ng_container_60_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](61, FormBuilderExampleComponent_ng_container_61_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](62, FormBuilderExampleComponent_ng_container_62_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](63, FormBuilderExampleComponent_ng_container_63_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](64, FormBuilderExampleComponent_ng_container_64_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](65, FormBuilderExampleComponent_ng_container_65_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](66, FormBuilderExampleComponent_ng_container_66_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](67, FormBuilderExampleComponent_ng_container_67_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](68, FormBuilderExampleComponent_ng_container_68_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](69, FormBuilderExampleComponent_ng_container_69_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](70, FormBuilderExampleComponent_ng_container_70_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](71, FormBuilderExampleComponent_ng_container_71_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](72, FormBuilderExampleComponent_ng_container_72_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](73, FormBuilderExampleComponent_ng_container_73_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](74, FormBuilderExampleComponent_ng_container_74_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](75, FormBuilderExampleComponent_ng_container_75_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](76, FormBuilderExampleComponent_ng_container_76_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](77, FormBuilderExampleComponent_ng_container_77_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](78, FormBuilderExampleComponent_ng_container_78_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()();
    }
    if (rf & 2) {
      let tmp_5_0;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autoFocus", false)("mode", ctx.drawerMode)("opened", ctx.drawerOpened);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:x");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:menu");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", (tmp_5_0 = ctx.selectedPanel) !== null && tmp_5_0 !== undefined ? tmp_5_0 : "Select one element in the left grid", " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitch", ctx.selectedPanel);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "Enumeration");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "Color Picker");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "Typeahead");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "Address Picker");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "Group");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "Repeat");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "Card");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "Collapse");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "Tabs");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "Stepper");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "Json Editor");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "Filter Container");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "Grid Container");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "Grid");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "Paragraph");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "Heading");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "Title");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "Link");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "Divider");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "DescriptionList");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "Embed");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "Label");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "Picture");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "Boolean");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "Date");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "DateTime");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "Dropdown");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "Input");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "Integer");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "MaskedInput");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "MultiSelect");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "Number");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "Password");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "TextArea");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "Google Map");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "Currency");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "Email");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "MarkDown");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "RichText");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "SelectForm");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "Url");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "Carousel");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "Router");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "Vertical");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "Horizontal");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "Overview");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "Angular Chart");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "Style");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "Pie Chart");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "Bar Chart");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "LA Icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "Where Does It Hurt");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "Svg View");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "MusicWidget");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "Kanban");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "AgGrid");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "Timeline Stepper");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "Table");
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgSwitch, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgSwitchCase, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIcon, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_6__.MatDrawer, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_6__.MatDrawerContainer, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_6__.MatDrawerContent, _components_ag_grid_component__WEBPACK_IMPORTED_MODULE_7__.AgGridComponent, _components_table_component__WEBPACK_IMPORTED_MODULE_8__.TableComponent, _components_la_icon_component__WEBPACK_IMPORTED_MODULE_9__.LaIconComponent, _components_pie_chart_component__WEBPACK_IMPORTED_MODULE_10__.PieChartComponent, _components_time_line_stepper_component__WEBPACK_IMPORTED_MODULE_11__.TimeLineStepperComponent, _components_kanban_component__WEBPACK_IMPORTED_MODULE_12__.KanbanComponent, _components_address_picker_component__WEBPACK_IMPORTED_MODULE_13__.AddressPickerComponent, _components_class_builder_component__WEBPACK_IMPORTED_MODULE_14__.ClassBuilderComponent, _components_angular_chart_component__WEBPACK_IMPORTED_MODULE_15__.AngularChartComponent, _components_svg_view_component__WEBPACK_IMPORTED_MODULE_16__.SvgViewComponent, _components_boolean_component__WEBPACK_IMPORTED_MODULE_17__.BooleanComponent, _components_card_component__WEBPACK_IMPORTED_MODULE_18__.CardComponent, _components_music_component__WEBPACK_IMPORTED_MODULE_19__.MusicComponent, _components_anatomical_model_component__WEBPACK_IMPORTED_MODULE_20__.AnatomicalModelComponent, _components_horizontal_component__WEBPACK_IMPORTED_MODULE_21__.HorizontalComponent, _components_bar_chart_component__WEBPACK_IMPORTED_MODULE_22__.BarChartComponent, _components_collapse_component__WEBPACK_IMPORTED_MODULE_23__.CollapseComponent, _components_color_picker_component__WEBPACK_IMPORTED_MODULE_24__.ColorPickerComponent, _components_currency_component__WEBPACK_IMPORTED_MODULE_25__.CurrencyComponent, _components_date_component__WEBPACK_IMPORTED_MODULE_26__.DateComponent, _components_carousel_component__WEBPACK_IMPORTED_MODULE_27__.CarouselComponent, _components_datetime_component__WEBPACK_IMPORTED_MODULE_28__.DateTimeComponent, _components_description_list_component__WEBPACK_IMPORTED_MODULE_29__.DescriptionListComponent, _components_divider_example__WEBPACK_IMPORTED_MODULE_30__.DividerComponent, _components_drodown_component__WEBPACK_IMPORTED_MODULE_31__.DropdownComponent, _components_email_component__WEBPACK_IMPORTED_MODULE_32__.EmailComponent, _components_embed_component__WEBPACK_IMPORTED_MODULE_33__.EmbedComponent, _components_enumeration_component__WEBPACK_IMPORTED_MODULE_34__.EnumerationComponent, _toolbox_component__WEBPACK_IMPORTED_MODULE_35__.ExampleToolboxComponent, _components_filter_bar_component__WEBPACK_IMPORTED_MODULE_36__.FilterBarComponent, _components_grid_component__WEBPACK_IMPORTED_MODULE_37__.GridComponent, _components_googlemap_component__WEBPACK_IMPORTED_MODULE_38__.GoogleMapComponent, _components_grid_layout_component__WEBPACK_IMPORTED_MODULE_39__.GridLayoutComponent, _components_group_component__WEBPACK_IMPORTED_MODULE_40__.GroupComponent, _components_heading_component__WEBPACK_IMPORTED_MODULE_41__.HeadingComponent, _components_input_component__WEBPACK_IMPORTED_MODULE_42__.InputComponent, _components_integer_component__WEBPACK_IMPORTED_MODULE_43__.IntegerComponent, _components_json_editor_component__WEBPACK_IMPORTED_MODULE_44__.JsonEditorExampleComponent, _components_label_component__WEBPACK_IMPORTED_MODULE_45__.LabelComponent, _components_link_component__WEBPACK_IMPORTED_MODULE_46__.LinkComponent, _components_markdown_component__WEBPACK_IMPORTED_MODULE_47__.MarkdownComponent, _components_masked_input_component__WEBPACK_IMPORTED_MODULE_48__.MaskedInputComponent, _components_multiselect_componen__WEBPACK_IMPORTED_MODULE_49__.MultiSelectComponent, _components_number_component__WEBPACK_IMPORTED_MODULE_50__.NumberComponent, _components_overview_component__WEBPACK_IMPORTED_MODULE_51__.OverviewComponent, _components_paragraph_component__WEBPACK_IMPORTED_MODULE_52__.ParagraphComponent, _components_password_component__WEBPACK_IMPORTED_MODULE_53__.PasswordComponent, _components_picture_component__WEBPACK_IMPORTED_MODULE_54__.PictureComponent, _components_repeat_component__WEBPACK_IMPORTED_MODULE_55__.RepeatComponent, _components_richtext_component__WEBPACK_IMPORTED_MODULE_56__.RichTextComponent, _router_component__WEBPACK_IMPORTED_MODULE_57__.RouterComponent, _components_selectform_component__WEBPACK_IMPORTED_MODULE_58__.SelectFormComponent, _components_stepper_component__WEBPACK_IMPORTED_MODULE_59__.StepperComponent, _components_tabs_component__WEBPACK_IMPORTED_MODULE_60__.TabsComponent, _components_textarea_component__WEBPACK_IMPORTED_MODULE_61__.TextAreaComponent, _components_title_component__WEBPACK_IMPORTED_MODULE_62__.TitleComponent, _components_typeahead_component__WEBPACK_IMPORTED_MODULE_63__.TypeaheadComponent, _components_url_component__WEBPACK_IMPORTED_MODULE_64__.UrlComponent, _components_vertical_component__WEBPACK_IMPORTED_MODULE_65__.VerticalComponent],
  styles: [".mat-drawer-inner-container {\n  display: flex;\n  flex-direction: column;\n}"]
});

/***/ }),

/***/ 33968:
/*!*********************************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/form-builder-example.module.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JsonFormBuilderExampleModule": () => (/* binding */ JsonFormBuilderExampleModule)
/* harmony export */ });
/* harmony import */ var _components_address_picker_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./components/address.picker.component */ 95967);
/* harmony import */ var _ag_grid_community_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ag-grid-community/angular */ 99377);
/* harmony import */ var _components_card_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./components/card.component */ 451439);
/* harmony import */ var _components_collapse_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./components/collapse.component */ 980940);
/* harmony import */ var _components_color_picker_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./components/color.picker.component */ 774184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _components_enumeration_component__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./components/enumeration.component */ 315931);
/* harmony import */ var _toolbox_component__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./toolbox.component */ 248264);
/* harmony import */ var _components_filter_bar_component__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./components/filter.bar.component */ 201556);
/* harmony import */ var _form_builder_example_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./form-builder-example.component */ 589043);
/* harmony import */ var _ngx_formly_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngx-formly/core */ 549821);
/* harmony import */ var _components_grid_component__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./components/grid.component */ 727446);
/* harmony import */ var _components_grid_layout_component__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./components/grid.layout.component */ 349894);
/* harmony import */ var _components_group_component__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./components/group.component */ 553673);
/* harmony import */ var _components_heading_component__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./components/heading.component */ 611559);
/* harmony import */ var _components_json_editor_component__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./components/json.editor.component */ 954402);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/sidenav */ 523267);
/* harmony import */ var _components_paragraph_component__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./components/paragraph.component */ 385815);
/* harmony import */ var _components_repeat_component__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./components/repeat.component */ 718162);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _components_stepper_component__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ./components/stepper.component */ 546932);
/* harmony import */ var _components_tabs_component__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ./components/tabs.component */ 80462);
/* harmony import */ var _components_typeahead_component__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! ./components/typeahead.component */ 274965);
/* harmony import */ var _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @case-clinical/web/ui/formly-designer */ 408916);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 595838);
/* harmony import */ var _components_title_component__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! ./components/title.component */ 769336);
/* harmony import */ var _components_link_component__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./components/link.component */ 583);
/* harmony import */ var _components_divider_example__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./components/divider.example */ 567841);
/* harmony import */ var _components_description_list_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./components/description.list.component */ 834493);
/* harmony import */ var _components_embed_component__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./components/embed.component */ 13187);
/* harmony import */ var _components_label_component__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./components/label.component */ 446613);
/* harmony import */ var _components_picture_component__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./components/picture.component */ 436172);
/* harmony import */ var _components_boolean_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./components/boolean.component */ 712415);
/* harmony import */ var _components_date_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./components/date.component */ 628857);
/* harmony import */ var _components_datetime_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./components/datetime.component */ 194086);
/* harmony import */ var _components_drodown_component__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./components/drodown.component */ 207226);
/* harmony import */ var _components_input_component__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./components/input.component */ 965381);
/* harmony import */ var _components_integer_component__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./components/integer.component */ 730904);
/* harmony import */ var _components_masked_input_component__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./components/masked.input.component */ 350250);
/* harmony import */ var _components_multiselect_componen__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./components/multiselect.componen */ 322668);
/* harmony import */ var _components_number_component__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./components/number.component */ 414020);
/* harmony import */ var _components_password_component__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./components/password.component */ 257978);
/* harmony import */ var _components_textarea_component__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! ./components/textarea.component */ 940891);
/* harmony import */ var _components_currency_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./components/currency.component */ 368545);
/* harmony import */ var _components_email_component__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./components/email.component */ 976342);
/* harmony import */ var _components_markdown_component__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./components/markdown.component */ 548098);
/* harmony import */ var _components_richtext_component__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./components/richtext.component */ 103205);
/* harmony import */ var _components_selectform_component__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./components/selectform.component */ 964222);
/* harmony import */ var _components_url_component__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! ./components/url.component */ 635112);
/* harmony import */ var _router_component__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./router.component */ 5362);
/* harmony import */ var _components_vertical_component__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! ./components/vertical.component */ 370535);
/* harmony import */ var _components_overview_component__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./components/overview.component */ 701619);
/* harmony import */ var _components_angular_chart_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./components/angular.chart.component */ 586242);
/* harmony import */ var _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @case-clinical/web/shared/ui */ 271992);
/* harmony import */ var _components_class_builder_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./components/class.builder.component */ 846030);
/* harmony import */ var _components_pie_chart_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/pie-chart.component */ 887833);
/* harmony import */ var _components_bar_chart_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./components/bar-chart.component */ 113459);
/* harmony import */ var _components_horizontal_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./components/horizontal.component */ 788059);
/* harmony import */ var _components_la_icon_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/la-icon.component */ 714906);
/* harmony import */ var _components_carousel_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./components/carousel.component */ 686113);
/* harmony import */ var _components_table_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/table.component */ 506709);
/* harmony import */ var _components_googlemap_component__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./components/googlemap.component */ 713372);
/* harmony import */ var _components_anatomical_model_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./components/anatomical-model.component */ 139280);
/* harmony import */ var _components_music_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./components/music.component */ 554795);
/* harmony import */ var _components_svg_view_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./components/svg-view.component */ 201149);
/* harmony import */ var _case_clinical_web_ui_formly_form_switch__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @case-clinical/web/ui/formly-form-switch */ 256158);
/* harmony import */ var _components_kanban_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components/kanban.component */ 718344);
/* harmony import */ var _components_ag_grid_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/ag-grid.component */ 628723);
/* harmony import */ var _components_time_line_stepper_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components/time-line-stepper.component */ 66652);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);









































































class JsonFormBuilderExampleModule {}
JsonFormBuilderExampleModule.ɵfac = function JsonFormBuilderExampleModule_Factory(t) {
  return new (t || JsonFormBuilderExampleModule)();
};
JsonFormBuilderExampleModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: JsonFormBuilderExampleModule
});
JsonFormBuilderExampleModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_ag_grid_community_angular__WEBPACK_IMPORTED_MODULE_1__.AgGridModule.withComponents({}), _angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _ngx_formly_core__WEBPACK_IMPORTED_MODULE_3__.FormlyModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_5__.MatSidenavModule, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule.forChild([{
    path: '',
    component: _form_builder_example_component__WEBPACK_IMPORTED_MODULE_7__.FormBuilderExampleComponent
  }]), _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_8__.WebUiFormlyDesignerModule, _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_9__.WebUiFormModule, _case_clinical_web_ui_formly_form_switch__WEBPACK_IMPORTED_MODULE_10__.WebUiFormlyFormSwitchModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_11__.UiFormsSharedModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](JsonFormBuilderExampleModule, {
    declarations: [_components_ag_grid_component__WEBPACK_IMPORTED_MODULE_12__.AgGridComponent, _components_table_component__WEBPACK_IMPORTED_MODULE_13__.TableComponent, _components_la_icon_component__WEBPACK_IMPORTED_MODULE_14__.LaIconComponent, _components_pie_chart_component__WEBPACK_IMPORTED_MODULE_15__.PieChartComponent, _components_time_line_stepper_component__WEBPACK_IMPORTED_MODULE_16__.TimeLineStepperComponent, _components_kanban_component__WEBPACK_IMPORTED_MODULE_17__.KanbanComponent, _components_address_picker_component__WEBPACK_IMPORTED_MODULE_18__.AddressPickerComponent, _components_class_builder_component__WEBPACK_IMPORTED_MODULE_19__.ClassBuilderComponent, _components_angular_chart_component__WEBPACK_IMPORTED_MODULE_20__.AngularChartComponent, _components_svg_view_component__WEBPACK_IMPORTED_MODULE_21__.SvgViewComponent, _components_boolean_component__WEBPACK_IMPORTED_MODULE_22__.BooleanComponent, _components_card_component__WEBPACK_IMPORTED_MODULE_23__.CardComponent, _components_music_component__WEBPACK_IMPORTED_MODULE_24__.MusicComponent, _components_anatomical_model_component__WEBPACK_IMPORTED_MODULE_25__.AnatomicalModelComponent, _components_horizontal_component__WEBPACK_IMPORTED_MODULE_26__.HorizontalComponent, _components_bar_chart_component__WEBPACK_IMPORTED_MODULE_27__.BarChartComponent, _components_collapse_component__WEBPACK_IMPORTED_MODULE_28__.CollapseComponent, _components_color_picker_component__WEBPACK_IMPORTED_MODULE_29__.ColorPickerComponent, _components_currency_component__WEBPACK_IMPORTED_MODULE_30__.CurrencyComponent, _components_date_component__WEBPACK_IMPORTED_MODULE_31__.DateComponent, _components_carousel_component__WEBPACK_IMPORTED_MODULE_32__.CarouselComponent, _components_datetime_component__WEBPACK_IMPORTED_MODULE_33__.DateTimeComponent, _components_description_list_component__WEBPACK_IMPORTED_MODULE_34__.DescriptionListComponent, _components_divider_example__WEBPACK_IMPORTED_MODULE_35__.DividerComponent, _components_drodown_component__WEBPACK_IMPORTED_MODULE_36__.DropdownComponent, _components_email_component__WEBPACK_IMPORTED_MODULE_37__.EmailComponent, _components_embed_component__WEBPACK_IMPORTED_MODULE_38__.EmbedComponent, _components_enumeration_component__WEBPACK_IMPORTED_MODULE_39__.EnumerationComponent, _toolbox_component__WEBPACK_IMPORTED_MODULE_40__.ExampleToolboxComponent, _components_filter_bar_component__WEBPACK_IMPORTED_MODULE_41__.FilterBarComponent, _form_builder_example_component__WEBPACK_IMPORTED_MODULE_7__.FormBuilderExampleComponent, _components_grid_component__WEBPACK_IMPORTED_MODULE_42__.GridComponent, _components_googlemap_component__WEBPACK_IMPORTED_MODULE_43__.GoogleMapComponent, _components_grid_layout_component__WEBPACK_IMPORTED_MODULE_44__.GridLayoutComponent, _components_group_component__WEBPACK_IMPORTED_MODULE_45__.GroupComponent, _components_heading_component__WEBPACK_IMPORTED_MODULE_46__.HeadingComponent, _components_input_component__WEBPACK_IMPORTED_MODULE_47__.InputComponent, _components_integer_component__WEBPACK_IMPORTED_MODULE_48__.IntegerComponent, _components_json_editor_component__WEBPACK_IMPORTED_MODULE_49__.JsonEditorExampleComponent, _components_label_component__WEBPACK_IMPORTED_MODULE_50__.LabelComponent, _components_link_component__WEBPACK_IMPORTED_MODULE_51__.LinkComponent, _components_markdown_component__WEBPACK_IMPORTED_MODULE_52__.MarkdownComponent, _components_masked_input_component__WEBPACK_IMPORTED_MODULE_53__.MaskedInputComponent, _components_multiselect_componen__WEBPACK_IMPORTED_MODULE_54__.MultiSelectComponent, _components_number_component__WEBPACK_IMPORTED_MODULE_55__.NumberComponent, _components_overview_component__WEBPACK_IMPORTED_MODULE_56__.OverviewComponent, _components_paragraph_component__WEBPACK_IMPORTED_MODULE_57__.ParagraphComponent, _components_password_component__WEBPACK_IMPORTED_MODULE_58__.PasswordComponent, _components_picture_component__WEBPACK_IMPORTED_MODULE_59__.PictureComponent, _components_repeat_component__WEBPACK_IMPORTED_MODULE_60__.RepeatComponent, _components_richtext_component__WEBPACK_IMPORTED_MODULE_61__.RichTextComponent, _router_component__WEBPACK_IMPORTED_MODULE_62__.RouterComponent, _components_selectform_component__WEBPACK_IMPORTED_MODULE_63__.SelectFormComponent, _components_stepper_component__WEBPACK_IMPORTED_MODULE_64__.StepperComponent, _components_tabs_component__WEBPACK_IMPORTED_MODULE_65__.TabsComponent, _components_textarea_component__WEBPACK_IMPORTED_MODULE_66__.TextAreaComponent, _components_title_component__WEBPACK_IMPORTED_MODULE_67__.TitleComponent, _components_typeahead_component__WEBPACK_IMPORTED_MODULE_68__.TypeaheadComponent, _components_url_component__WEBPACK_IMPORTED_MODULE_69__.UrlComponent, _components_vertical_component__WEBPACK_IMPORTED_MODULE_70__.VerticalComponent],
    imports: [_ag_grid_community_angular__WEBPACK_IMPORTED_MODULE_1__.AgGridModule, _angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _ngx_formly_core__WEBPACK_IMPORTED_MODULE_3__.FormlyModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_5__.MatSidenavModule, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule, _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_8__.WebUiFormlyDesignerModule, _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_9__.WebUiFormModule, _case_clinical_web_ui_formly_form_switch__WEBPACK_IMPORTED_MODULE_10__.WebUiFormlyFormSwitchModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_11__.UiFormsSharedModule]
  });
})();

/***/ }),

/***/ 5362:
/*!**********************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/router.component.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RouterComponent": () => (/* binding */ RouterComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




class RouterComponent {
  constructor(data) {
    this.data = data;
    this.formData = {};
  }
  ngOnInit() {}
  submit(data) {
    alert(JSON.stringify(data));
  }
}
RouterComponent.ɵfac = function RouterComponent_Factory(t) {
  return new (t || RouterComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_1__.WebCoreDataAccessService));
};
RouterComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: RouterComponent,
  selectors: [["Router_example"]],
  decls: 2,
  vars: 2,
  consts: [[1, "w-full"], ["formName", "Router_example", 3, "showSubmitButton", "formData", "save"]],
  template: function RouterComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function RouterComponent_Template_ui_formly_json_form_save_1_listener($event) {
        return ctx.submit($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx.formData);
    }
  },
  dependencies: [_ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_2__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 248264:
/*!***********************************************************************!*\
  !*** ./libs/web/modules/admin/form-builder-test/toolbox.component.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExampleToolboxComponent": () => (/* binding */ ExampleToolboxComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _ag_grid_enterprise_all_modules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ag-grid-enterprise/all-modules */ 399193);
/* harmony import */ var _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @case-clinical/web/ui/formly-designer */ 106298);
/* harmony import */ var _fuse_services_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fuse/services/config */ 712282);
/* harmony import */ var _ag_grid_community_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ag-grid-community/angular */ 99377);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 836895);








function ExampleToolboxComponent_ag_grid_angular_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ag-grid-angular", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("selectionChanged", function ExampleToolboxComponent_ag_grid_angular_0_Template_ag_grid_angular_selectionChanged_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.selectionChanged());
    })("gridReady", function ExampleToolboxComponent_ag_grid_angular_0_Template_ag_grid_angular_gridReady_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r4.gridReady($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const agGridClassName_r1 = ctx.ngIf;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", agGridClassName_r1)("defaultColDef", ctx_r0.defaultColDef)("animateRows", true)("rowSelection", "single")("autoGroupColumnDef", ctx_r0.autoGroupColumnDef)("rowData", ctx_r0.leftRowData)("columnDefs", ctx_r0.columns)("modules", ctx_r0.modules);
  }
}
class ExampleToolboxComponent {
  constructor(configService) {
    this.configService = configService;
    this.selected = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
      sortable: true,
      filter: true,
      resizable: true
    };
    this.autoGroupColumnDef = {
      headerName: 'Form Fields',
      field: 'name',
      cellRenderer: 'agGroupCellRenderer'
    };
    this.modules = _ag_grid_enterprise_all_modules__WEBPACK_IMPORTED_MODULE_0__.AllModules;
    this.rawData = _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_2__.formFields.map(el => ({
      name: el.name,
      type: el.type
    }));
    this.agGridClassName = this.configService.agGridClassName$;
    this.columns = [{
      headerName: 'Type',
      field: 'type',
      rowGroup: true,
      hide: true
    }];
  }
  ngOnInit() {
    this.rawData.unshift({
      name: 'Style',
      type: 'Class Builder'
    });
    this.leftRowData = this.rawData.map(el => Object.assign({}, el));
  }
  selectionChanged() {
    console.log('selectionChanged');
    this.selected.emit(this.gridApi.getSelectedRows()[0]);
  }
  gridReady($event) {
    this.gridApi = $event.api;
  }
}
ExampleToolboxComponent.ɵfac = function ExampleToolboxComponent_Factory(t) {
  return new (t || ExampleToolboxComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_fuse_services_config__WEBPACK_IMPORTED_MODULE_3__.FuseConfigService));
};
ExampleToolboxComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: ExampleToolboxComponent,
  selectors: [["example-tool-box"]],
  outputs: {
    selected: "selected"
  },
  decls: 2,
  vars: 3,
  consts: [["class", "w-full h-full", 3, "ngClass", "defaultColDef", "animateRows", "rowSelection", "autoGroupColumnDef", "rowData", "columnDefs", "modules", "selectionChanged", "gridReady", 4, "ngIf"], [1, "w-full", "h-full", 3, "ngClass", "defaultColDef", "animateRows", "rowSelection", "autoGroupColumnDef", "rowData", "columnDefs", "modules", "selectionChanged", "gridReady"]],
  template: function ExampleToolboxComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, ExampleToolboxComponent_ag_grid_angular_0_Template, 1, 8, "ag-grid-angular", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](1, "async");
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](1, 1, ctx.agGridClassName));
    }
  },
  dependencies: [_ag_grid_community_angular__WEBPACK_IMPORTED_MODULE_4__.AgGridAngular, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_5__.AsyncPipe],
  encapsulation: 2
});

/***/ })

}]);