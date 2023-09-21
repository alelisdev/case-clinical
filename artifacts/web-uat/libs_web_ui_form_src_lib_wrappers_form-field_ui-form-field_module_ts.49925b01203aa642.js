"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["libs_web_ui_form_src_lib_wrappers_form-field_ui-form-field_module_ts"],{

/***/ 669854:
/*!*********************************************************************************!*\
  !*** ./libs/web/ui/form/src/lib/wrappers/form-field/ui-form-field.component.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UiFormFieldComponent": () => (/* binding */ UiFormFieldComponent)
/* harmony export */ });
/* harmony import */ var _ngx_formly_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngx-formly/core */ 549821);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 836895);




function UiFormFieldComponent_label_1_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function UiFormFieldComponent_label_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "label", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, UiFormFieldComponent_label_1_span_2_Template, 2, 0, "span", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx_r0.className);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("for", ctx_r0.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r0.to.label, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.to.required && ctx_r0.to.hideRequiredMarker !== true);
  }
}
function UiFormFieldComponent_ng_template_3_Template(rf, ctx) {}
const _c0 = function (a0, a1) {
  return {
    "pr-6": a0,
    "pr-3": a1
  };
};
function UiFormFieldComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 8);
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](1, _c0, ctx_r3.to.date, !ctx_r3.to.date));
  }
}
function UiFormFieldComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "formly-validation-message", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("display", "block");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("field", ctx_r4.field);
  }
}
function UiFormFieldComponent_small_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "small", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r5.to.description);
  }
}
const _c1 = function (a0) {
  return {
    forSelectForm: a0
  };
};
class UiFormFieldComponent extends _ngx_formly_core__WEBPACK_IMPORTED_MODULE_1__.FieldWrapper {
  constructor() {
    super(...arguments);
    this.className = '';
    this.clicked = false;
  }
  ngOnInit() {
    if (this.to.labelStyle && this.to.labelStyle.trim().length > 0) {
      this.className = this.to.labelStyle;
    } else {
      this.className = 'block text-md text-gray-600 dark:text-white';
    }
  }
  onClick($event) {
    // this.clicked = true;
  }
  onFocusOutEvent($event) {
    this.clicked = true;
  }
}
UiFormFieldComponent.ɵfac = /*@__PURE__*/function () {
  let ɵUiFormFieldComponent_BaseFactory;
  return function UiFormFieldComponent_Factory(t) {
    return (ɵUiFormFieldComponent_BaseFactory || (ɵUiFormFieldComponent_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](UiFormFieldComponent)))(t || UiFormFieldComponent);
  };
}();
UiFormFieldComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: UiFormFieldComponent,
  selectors: [["ng-component"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]],
  decls: 8,
  vars: 10,
  consts: [[3, "ngClass"], [3, "ngClass", 4, "ngIf"], [1, "relative", 3, "ngClass", "focusout", "click"], ["fieldComponent", ""], ["class", "absolute inset-y-0 right-0 flex items-center pointer-events-none", 3, "ngClass", 4, "ngIf"], ["class", "mt-2 text-sm text-red-600", 3, "display", 4, "ngIf"], ["class", "mt-2 text-sm text-gray-500", 4, "ngIf"], [4, "ngIf"], [1, "absolute", "inset-y-0", "right-0", "flex", "items-center", "pointer-events-none", 3, "ngClass"], [1, "mt-2", "text-sm", "text-red-600"], [3, "field"], [1, "mt-2", "text-sm", "text-gray-500"]],
  template: function UiFormFieldComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, UiFormFieldComponent_label_1_Template, 3, 4, "label", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("focusout", function UiFormFieldComponent_Template_div_focusout_2_listener($event) {
        return ctx.onFocusOutEvent($event);
      })("click", function UiFormFieldComponent_Template_div_click_2_listener($event) {
        return ctx.onClick($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, UiFormFieldComponent_ng_template_3_Template, 0, 0, "ng-template", null, 3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, UiFormFieldComponent_div_5_Template, 1, 4, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, UiFormFieldComponent_div_6_Template, 2, 3, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, UiFormFieldComponent_small_7_Template, 2, 1, "small", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("has-error", ctx.showError);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx.to.compact ? "" : "mb-3");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.to.label && ctx.to.hideLabel !== true);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](8, _c1, ctx.showError || ctx.formControl.status === "INVALID" && ctx.field.formControl && (ctx.clicked || ctx.field.options.parentForm && ctx.field.options.parentForm.submitted)));
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", (ctx.showError || ctx.formControl.status === "INVALID" && ctx.field.formControl && (ctx.clicked || ctx.field.options.parentForm && ctx.field.options.parentForm.submitted)) && ctx.field.type !== "file-new");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.showError || ctx.formControl.status === "INVALID" && ctx.field.formControl && (ctx.clicked || ctx.field.options.parentForm && ctx.field.options.parentForm.submitted));
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.to.description);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _ngx_formly_core__WEBPACK_IMPORTED_MODULE_1__["ɵc"]],
  encapsulation: 2,
  changeDetection: 0
});

/***/ }),

/***/ 256623:
/*!******************************************************************************!*\
  !*** ./libs/web/ui/form/src/lib/wrappers/form-field/ui-form-field.module.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UiFormFieldModule": () => (/* binding */ UiFormFieldModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 224006);
/* harmony import */ var _ngx_formly_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngx-formly/core */ 549821);
/* harmony import */ var _ui_form_field_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ui-form-field.component */ 669854);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);






class UiFormFieldModule {}
UiFormFieldModule.ɵfac = function UiFormFieldModule_Factory(t) {
  return new (t || UiFormFieldModule)();
};
UiFormFieldModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: UiFormFieldModule
});
UiFormFieldModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.ReactiveFormsModule, _ngx_formly_core__WEBPACK_IMPORTED_MODULE_3__.FormlyModule.forChild({
    wrappers: [{
      name: 'form-field',
      component: _ui_form_field_component__WEBPACK_IMPORTED_MODULE_4__.UiFormFieldComponent
    }]
  })]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](UiFormFieldModule, {
    declarations: [_ui_form_field_component__WEBPACK_IMPORTED_MODULE_4__.UiFormFieldComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.ReactiveFormsModule, _ngx_formly_core__WEBPACK_IMPORTED_MODULE_3__.FormlyModule]
  });
})();

/***/ })

}]);