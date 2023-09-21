"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["libs_web_procedure-vendor-status_feature_src_lib_web-procedure-vendor-status-create_web-proce-efb474"],{

/***/ 438610:
/*!*********************************************************************************************************************************************!*\
  !*** ./libs/web/procedure-vendor-status/feature/src/lib/web-procedure-vendor-status-create/web-procedure-vendor-status-create.component.ts ***!
  \*********************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebProcedureVendorStatusCreateComponent": () => (/* binding */ WebProcedureVendorStatusCreateComponent)
/* harmony export */ });
/* harmony import */ var _case_clinical_web_procedure_vendor_status_shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/procedure-vendor-status/shared */ 331126);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 504523);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _ui_button_src_lib_web_ui_button_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../ui/button/src/lib/web-ui-button.component */ 797800);
/* harmony import */ var _ui_panel_src_lib_web_ui_panel_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../ui/panel/src/lib/web-ui-panel.component */ 619797);
/* harmony import */ var _ui_card_header_src_lib_web_ui_card_header_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../ui/card-header/src/lib/web-ui-card-header.component */ 80194);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);
/* harmony import */ var _ngneat_transloco__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngneat/transloco */ 846367);













function WebProcedureVendorStatusCreateComponent_ng_container_0_ng_template_1_ui_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ui-button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WebProcedureVendorStatusCreateComponent_ng_container_0_ng_template_1_ui_button_1_Template_ui_button_click_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r11);
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r10.handleDiscardClick($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const t_r9 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("label", t_r9("discard"));
  }
}
function WebProcedureVendorStatusCreateComponent_ng_container_0_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebProcedureVendorStatusCreateComponent_ng_container_0_ng_template_1_ui_button_1_Template, 1, 1, "ui-button", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebProcedureVendorStatusCreateComponent_ng_container_0_ng_template_3_ui_card_header_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "ui-card-header", 12);
  }
  if (rf & 2) {
    const t_r13 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("title", t_r13("create_new_procedureVendorStatus"))("controlsTemplate", _r2);
  }
}
function WebProcedureVendorStatusCreateComponent_ng_container_0_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, WebProcedureVendorStatusCreateComponent_ng_container_0_ng_template_3_ui_card_header_0_Template, 1, 2, "ui-card-header", 11);
  }
}
function WebProcedureVendorStatusCreateComponent_ng_container_0_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebProcedureVendorStatusCreateComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0, 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebProcedureVendorStatusCreateComponent_ng_container_0_ng_template_1_Template, 2, 0, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, WebProcedureVendorStatusCreateComponent_ng_container_0_ng_template_3_Template, 1, 0, "ng-template", null, 3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, WebProcedureVendorStatusCreateComponent_ng_container_0_ng_template_5_Template, 2, 0, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "ui-panel", 5)(8, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "ui-formly-json-form", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](4);
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](6);
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("headerTemplate", _r4)("footerTemplate", _r6)("disableHeaderPadding", true)("disableBodyPadding", true)("disableFooterPadding", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formName", "procedureVendorStatus_create")("showSubmitButton", true)("formData", ctx_r0.formData)("componentStore", ctx_r0.store);
  }
}
class WebProcedureVendorStatusCreateComponent {
  constructor(store, router, route, formService) {
    this.store = store;
    this.router = router;
    this.route = route;
    this.formService = formService;
    this.vm$ = this.store.vm$;
    this.formData = {};
  }
  ngOnInit() {
    this.subscriber = this.store.actionResult$.subscribe(({
      done,
      item
    }) => {
      if (done) {
        this.router.navigate(['..', item === null || item === void 0 ? void 0 : item.id], {
          relativeTo: this.route
        });
      }
    });
  }
  ngOnDestroy() {
    var _a;
    (_a = this.subscriber) === null || _a === void 0 ? void 0 : _a.unsubscribe();
  }
  handleDiscardClick(evt) {
    evt === null || evt === void 0 ? void 0 : evt.preventDefault();
    this.router.navigate(['..'], {
      relativeTo: this.route
    });
  }
}
WebProcedureVendorStatusCreateComponent.ɵfac = function WebProcedureVendorStatusCreateComponent_Factory(t) {
  return new (t || WebProcedureVendorStatusCreateComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_procedure_vendor_status_shared__WEBPACK_IMPORTED_MODULE_1__.WebProcedureVendorStatusFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_3__.FormService));
};
WebProcedureVendorStatusCreateComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebProcedureVendorStatusCreateComponent,
  selectors: [["ng-component"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_case_clinical_web_procedure_vendor_status_shared__WEBPACK_IMPORTED_MODULE_1__.WebProcedureVendorStatusFeatureStore])],
  decls: 2,
  vars: 3,
  consts: [["class", "absolute inset-0 flex flex-col overflow-y-hidden", 4, "ngIf"], [1, "absolute", "inset-0", "flex", "flex-col", "overflow-y-hidden"], ["controlsTemplate", ""], ["headerTemplate", ""], ["footerTemplate", ""], [1, "absolute", "inset-0", "overflow-y-auto", "p-2", "md:p-4", 3, "headerTemplate", "footerTemplate", "disableHeaderPadding", "disableBodyPadding", "disableFooterPadding"], [1, "px-6", "py-4"], [3, "formName", "showSubmitButton", "formData", "componentStore"], [1, "space-x-3", "px-6"], ["variant", "white", 3, "label", "click", 4, "transloco"], ["variant", "white", 3, "label", "click"], [3, "title", "controlsTemplate", 4, "transloco"], [3, "title", "controlsTemplate"], [1, "flex", "items-center", "justify-end", "pb-6", "pt-3", "dark:bg-transparent"]],
  template: function WebProcedureVendorStatusCreateComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, WebProcedureVendorStatusCreateComponent_ng_container_0_Template, 10, 9, "ng-container", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](1, "async");
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](1, 1, ctx.vm$));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _ui_button_src_lib_web_ui_button_component__WEBPACK_IMPORTED_MODULE_5__.WebUiButtonComponent, _ui_panel_src_lib_web_ui_panel_component__WEBPACK_IMPORTED_MODULE_6__.WebUiPanelComponent, _ui_card_header_src_lib_web_ui_card_header_component__WEBPACK_IMPORTED_MODULE_7__.WebUiCardHeaderComponent, _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_8__.WebUiFormlyJsonFormComponent, _ngneat_transloco__WEBPACK_IMPORTED_MODULE_9__.TranslocoDirective, _angular_common__WEBPACK_IMPORTED_MODULE_4__.AsyncPipe],
  encapsulation: 2
});

/***/ }),

/***/ 816436:
/*!******************************************************************************************************************************************!*\
  !*** ./libs/web/procedure-vendor-status/feature/src/lib/web-procedure-vendor-status-create/web-procedure-vendor-status-create.module.ts ***!
  \******************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebProcedureVendorStatusCreateModule": () => (/* binding */ WebProcedureVendorStatusCreateModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @case-clinical/web/ui/button */ 510948);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 595838);
/* harmony import */ var _case_clinical_web_ui_panel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @case-clinical/web/ui/panel */ 776301);
/* harmony import */ var _case_clinical_web_ui_page_header__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/ui/page-header */ 752707);
/* harmony import */ var _case_clinical_web_ui_card_header__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/ui/card-header */ 726693);
/* harmony import */ var _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @case-clinical/web/shared/ui */ 362610);
/* harmony import */ var _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @case-clinical/web/shared/ui */ 271992);
/* harmony import */ var _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @case-clinical/web/ui/formly-designer */ 408916);
/* harmony import */ var _ngneat_transloco__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ngneat/transloco */ 846367);
/* harmony import */ var _web_procedure_vendor_status_create_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./web-procedure-vendor-status-create.component */ 438610);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);













class WebProcedureVendorStatusCreateModule {}
WebProcedureVendorStatusCreateModule.ɵfac = function WebProcedureVendorStatusCreateModule_Factory(t) {
  return new (t || WebProcedureVendorStatusCreateModule)();
};
WebProcedureVendorStatusCreateModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebProcedureVendorStatusCreateModule
});
WebProcedureVendorStatusCreateModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_2__.WebUiButtonModule, _case_clinical_web_ui_panel__WEBPACK_IMPORTED_MODULE_3__.WebUiPanelModule, _case_clinical_web_ui_card_header__WEBPACK_IMPORTED_MODULE_4__.WebUiCardHeaderModule, _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_5__.WebUiFormModule, _case_clinical_web_ui_page_header__WEBPACK_IMPORTED_MODULE_6__.WebUiPageHeaderModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_7__.UtilitySharedModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_8__.UiFormsSharedModule, _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_9__.WebUiFormlyDesignerModule, _ngneat_transloco__WEBPACK_IMPORTED_MODULE_10__.TranslocoModule, _angular_router__WEBPACK_IMPORTED_MODULE_11__.RouterModule.forChild([{
    path: '',
    component: _web_procedure_vendor_status_create_component__WEBPACK_IMPORTED_MODULE_12__.WebProcedureVendorStatusCreateComponent
  }])]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebProcedureVendorStatusCreateModule, {
    declarations: [_web_procedure_vendor_status_create_component__WEBPACK_IMPORTED_MODULE_12__.WebProcedureVendorStatusCreateComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_2__.WebUiButtonModule, _case_clinical_web_ui_panel__WEBPACK_IMPORTED_MODULE_3__.WebUiPanelModule, _case_clinical_web_ui_card_header__WEBPACK_IMPORTED_MODULE_4__.WebUiCardHeaderModule, _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_5__.WebUiFormModule, _case_clinical_web_ui_page_header__WEBPACK_IMPORTED_MODULE_6__.WebUiPageHeaderModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_7__.UtilitySharedModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_8__.UiFormsSharedModule, _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_9__.WebUiFormlyDesignerModule, _ngneat_transloco__WEBPACK_IMPORTED_MODULE_10__.TranslocoModule, _angular_router__WEBPACK_IMPORTED_MODULE_11__.RouterModule]
  });
})();

/***/ })

}]);