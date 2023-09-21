"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["libs_web_document_feature_src_lib_web-document-edit_web-document-edit_module_ts"],{

/***/ 590504:
/*!********************************************************************************************!*\
  !*** ./libs/web/document/feature/src/lib/web-document-edit/web-document-edit.component.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebDocumentEditComponent": () => (/* binding */ WebDocumentEditComponent)
/* harmony export */ });
/* harmony import */ var _web_document_edit_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./web-document-edit.store */ 688262);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 504523);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _ui_button_src_lib_web_ui_button_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../ui/button/src/lib/web-ui-button.component */ 797800);
/* harmony import */ var _ui_panel_src_lib_web_ui_panel_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../ui/panel/src/lib/web-ui-panel.component */ 619797);
/* harmony import */ var _ui_card_header_src_lib_web_ui_card_header_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../ui/card-header/src/lib/web-ui-card-header.component */ 80194);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);
/* harmony import */ var _ngneat_transloco__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngneat/transloco */ 846367);













function WebDocumentEditComponent_ng_container_0_ng_template_1_Template(rf, ctx) {}
function WebDocumentEditComponent_ng_container_0_ng_template_3_ui_card_header_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "ui-card-header", 9);
  }
  if (rf & 2) {
    const t_r9 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("title", t_r9("edit_new"))("controlsTemplate", _r2);
  }
}
function WebDocumentEditComponent_ng_container_0_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, WebDocumentEditComponent_ng_container_0_ng_template_3_ui_card_header_0_Template, 1, 2, "ui-card-header", 8);
  }
}
function WebDocumentEditComponent_ng_container_0_ng_template_5_ui_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ui-button", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WebDocumentEditComponent_ng_container_0_ng_template_5_ui_button_3_Template_ui_button_click_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r13);
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r12.handleDiscardClick($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const t_r11 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("label", t_r11("discard"));
  }
}
function WebDocumentEditComponent_ng_container_0_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, WebDocumentEditComponent_ng_container_0_ng_template_5_ui_button_3_Template, 1, 1, "ui-button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebDocumentEditComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0, 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebDocumentEditComponent_ng_container_0_ng_template_1_Template, 0, 0, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, WebDocumentEditComponent_ng_container_0_ng_template_3_Template, 1, 0, "ng-template", null, 3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, WebDocumentEditComponent_ng_container_0_ng_template_5_Template, 4, 0, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "ui-panel", 5)(8, "div", 6)(9, "ui-formly-json-form", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function WebDocumentEditComponent_ng_container_0_Template_ui_formly_json_form_save_9_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r15);
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r14.updateDocument($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const vm_r1 = ctx.ngIf;
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](4);
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](6);
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("headerTemplate", _r4)("footerTemplate", _r6)("disableHeaderPadding", true)("disableBodyPadding", true)("disableFooterPadding", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("formData", ctx_r0.formData)("model", vm_r1.item);
  }
}
class WebDocumentEditComponent {
  constructor(store, router, route, formService) {
    this.store = store;
    this.router = router;
    this.route = route;
    this.formService = formService;
    this.vm$ = this.store.vm$;
    this.formData = {
      contracts: this.store.filterContracts(''),
      patients: this.store.filterPatients(''),
      prescriptions: this.store.filterPrescriptions(''),
      users: this.store.filterUsers(''),
      patientStudies: this.store.filterPatientStudies(''),
      procedureVendors: this.store.filterProcedureVendors('')
    };
  }
  handleDiscardClick(evt) {
    evt === null || evt === void 0 ? void 0 : evt.preventDefault();
    this.router.navigate(['..'], {
      relativeTo: this.route
    });
  }
  updateRate($event) {
    var _a, _b, _c, _d, _e, _f;
    const data = Object.assign(Object.assign({}, $event), {
      contractId: (_a = $event.contract) === null || _a === void 0 ? void 0 : _a.id,
      patientId: (_b = $event.patient) === null || _b === void 0 ? void 0 : _b.id,
      prescriptionId: (_c = $event.prescription) === null || _c === void 0 ? void 0 : _c.id,
      providerId: (_d = $event.provider) === null || _d === void 0 ? void 0 : _d.id,
      patientStudyId: (_e = $event.patientStudies) === null || _e === void 0 ? void 0 : _e.id,
      procedureVendorId: (_f = $event.procedureVendor) === null || _f === void 0 ? void 0 : _f.id
    });
    delete data['contract'];
    delete data['patient'];
    delete data['prescription'];
    delete data['provider'];
    delete data['patientStudies'];
    delete data['procedureVendor'];
    this.store.updateDocumentEffect(data);
  }
}
WebDocumentEditComponent.ɵfac = function WebDocumentEditComponent_Factory(t) {
  return new (t || WebDocumentEditComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_web_document_edit_store__WEBPACK_IMPORTED_MODULE_1__.WebDocumentEditStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_3__.FormService));
};
WebDocumentEditComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebDocumentEditComponent,
  selectors: [["ng-component"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_web_document_edit_store__WEBPACK_IMPORTED_MODULE_1__.WebDocumentEditStore])],
  decls: 2,
  vars: 3,
  consts: [["class", "absolute inset-0 flex flex-col overflow-y-hidden", 4, "ngIf"], [1, "absolute", "inset-0", "flex", "flex-col", "overflow-y-hidden"], ["controlsTemplate", ""], ["headerTemplate", ""], ["footerTemplate", ""], [1, "absolute", "inset-0", "overflow-y-auto", "p-2", "md:p-4", 3, "headerTemplate", "footerTemplate", "disableHeaderPadding", "disableBodyPadding", "disableFooterPadding"], [1, "px-6", "py-4"], ["formName", "document_edit", 3, "showSubmitButton", "formData", "model", "save"], [3, "title", "controlsTemplate", 4, "transloco"], [3, "title", "controlsTemplate"], [1, "flex", "items-center", "justify-end", "pb-6", "pt-3", "dark:bg-transparent"], [1, "space-x-3", "px-6"], ["variant", "white", 3, "label", "click", 4, "transloco"], ["variant", "white", 3, "label", "click"]],
  template: function WebDocumentEditComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, WebDocumentEditComponent_ng_container_0_Template, 10, 8, "ng-container", 0);
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

/***/ 471585:
/*!*****************************************************************************************!*\
  !*** ./libs/web/document/feature/src/lib/web-document-edit/web-document-edit.module.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebDocumentEditModule": () => (/* binding */ WebDocumentEditModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @case-clinical/web/ui/button */ 510948);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 595838);
/* harmony import */ var _case_clinical_web_ui_panel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/ui/panel */ 776301);
/* harmony import */ var _case_clinical_web_ui_card_header__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/ui/card-header */ 726693);
/* harmony import */ var _case_clinical_web_ui_sidebar_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/ui/sidebar-page */ 700241);
/* harmony import */ var _web_document_edit_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./web-document-edit.component */ 590504);
/* harmony import */ var _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @case-clinical/web/shared/ui */ 362610);
/* harmony import */ var _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @case-clinical/web/shared/ui */ 271992);
/* harmony import */ var _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @case-clinical/web/ui/formly-designer */ 408916);
/* harmony import */ var _ngneat_transloco__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ngneat/transloco */ 846367);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);













class WebDocumentEditModule {}
WebDocumentEditModule.ɵfac = function WebDocumentEditModule_Factory(t) {
  return new (t || WebDocumentEditModule)();
};
WebDocumentEditModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebDocumentEditModule
});
WebDocumentEditModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_2__.WebUiButtonModule, _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_3__.WebUiFormModule, _case_clinical_web_ui_panel__WEBPACK_IMPORTED_MODULE_4__.WebUiPanelModule, _case_clinical_web_ui_card_header__WEBPACK_IMPORTED_MODULE_5__.WebUiCardHeaderModule, _case_clinical_web_ui_sidebar_page__WEBPACK_IMPORTED_MODULE_6__.WebUiSidebarPageModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_7__.UtilitySharedModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_8__.UiFormsSharedModule, _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_9__.WebUiFormlyDesignerModule, _ngneat_transloco__WEBPACK_IMPORTED_MODULE_10__.TranslocoModule, _angular_router__WEBPACK_IMPORTED_MODULE_11__.RouterModule.forChild([{
    path: '',
    component: _web_document_edit_component__WEBPACK_IMPORTED_MODULE_12__.WebDocumentEditComponent
  }])]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebDocumentEditModule, {
    declarations: [_web_document_edit_component__WEBPACK_IMPORTED_MODULE_12__.WebDocumentEditComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_2__.WebUiButtonModule, _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_3__.WebUiFormModule, _case_clinical_web_ui_panel__WEBPACK_IMPORTED_MODULE_4__.WebUiPanelModule, _case_clinical_web_ui_card_header__WEBPACK_IMPORTED_MODULE_5__.WebUiCardHeaderModule, _case_clinical_web_ui_sidebar_page__WEBPACK_IMPORTED_MODULE_6__.WebUiSidebarPageModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_7__.UtilitySharedModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_8__.UiFormsSharedModule, _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_9__.WebUiFormlyDesignerModule, _ngneat_transloco__WEBPACK_IMPORTED_MODULE_10__.TranslocoModule, _angular_router__WEBPACK_IMPORTED_MODULE_11__.RouterModule]
  });
})();

/***/ }),

/***/ 688262:
/*!****************************************************************************************!*\
  !*** ./libs/web/document/feature/src/lib/web-document-edit/web-document-edit.store.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebDocumentEditStore": () => (/* binding */ WebDocumentEditStore)
/* harmony export */ });
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 654004);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 318505);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 763900);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 911365);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @case-clinical/web/ui/toast */ 971873);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 504523);
/* harmony import */ var _document_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../document.service */ 624263);













class WebDocumentEditStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, documentService) {
    super({
      loading: false
    });
    this.data = data;
    this.router = router;
    this.route = route;
    this.toast = toast;
    this.formService = formService;
    this.documentService = documentService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.item$ = this.select(s => s.item);
    this.contracts$ = this.select(s => s.contracts || []);
    this.patients$ = this.select(s => s.patients || []);
    this.prescriptions$ = this.select(s => s.prescriptions || []);
    this.users$ = this.select(s => s.users || []);
    this.patientStudies$ = this.select(s => s.patientStudies || []);
    this.procedureVendors$ = this.select(s => s.procedureVendors || []);
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.contracts$, this.patients$, this.prescriptions$, this.users$, this.patientStudies$, this.procedureVendors$, (errors, loading, item, contracts, patients, prescriptions, users, patientStudies, procedureVendors) => ({
      errors,
      loading,
      item,
      contracts,
      patients,
      prescriptions,
      users,
      patientStudies,
      procedureVendors
    }), {
      debounce: true
    });
    this.filterContracts = term => this.data.userSelectContracts({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let contracts = res.data.items;
      this.patchState({
        contracts
      });
      return contracts;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterPatients = term => this.data.userSelectPatients({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let patients = res.data.items;
      this.patchState({
        patients
      });
      return patients;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterPrescriptions = term => this.data.userSelectPrescriptions({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let prescriptions = res.data.items;
      this.patchState({
        prescriptions
      });
      return prescriptions;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterUsers = term => this.data.userSelectUsers({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let users = res.data.items;
      this.patchState({
        users
      });
      return users;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterPatientStudies = term => this.data.userSelectPatientStudies({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let patientStudies = res.data.items;
      this.patchState({
        patientStudies
      });
      return patientStudies;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterProcedureVendors = term => this.data.userSelectProcedureVendors({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let procedureVendors = res.data.items;
      this.patchState({
        procedureVendors
      });
      return procedureVendors;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.addContract = this.updater((state, contract) => Object.assign(Object.assign({}, state), {
      contracts: state.contracts.concat(contract)
    }));
    this.addPatient = this.updater((state, patient) => Object.assign(Object.assign({}, state), {
      patients: state.patients.concat(patient)
    }));
    this.addPrescription = this.updater((state, prescription) => Object.assign(Object.assign({}, state), {
      prescriptions: state.prescriptions.concat(prescription)
    }));
    this.addUser = this.updater((state, user) => Object.assign(Object.assign({}, state), {
      users: state.users.concat(user)
    }));
    this.addPatientStudy = this.updater((state, patientStudy) => Object.assign(Object.assign({}, state), {
      patientStudies: state.patientStudies.concat(patientStudy)
    }));
    this.addProcedureVendor = this.updater((state, procedureVendor) => Object.assign(Object.assign({}, state), {
      procedureVendors: state.procedureVendors.concat(procedureVendor)
    }));
    this.loadDocumentEffect = this.effect(documentId$ => documentId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.setState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(documentId => this.data.userDocument({
      documentId
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      this.patchState({
        item: res.data.item,
        errors: res.errors,
        loading: false
      });
    }, errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.updateDocumentEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.item$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(([input, item]) => this.documentService.updateDocument(input, item === null || item === void 0 ? void 0 : item.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(document => {
      this.patchState({
        item: document,
        loading: false
      });
      return this.router.navigate(['..', document === null || document === void 0 ? void 0 : document.id], {
        relativeTo: this.route
      });
    }, errors => {
      this.toast.error(errors.Message);
      this.formService.setErrors(errors.Data);
      this.patchState({
        loading: false,
        errors: errors.graphQLErrors ? errors.graphQLErrors : errors
      });
    })))));
    this.loadDocumentEffect(route.params.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(route => route === null || route === void 0 ? void 0 : route.documentId)));
  }
}
WebDocumentEditStore.ɵfac = function WebDocumentEditStore_Factory(t) {
  return new (t || WebDocumentEditStore)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_8__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_9__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_document_service__WEBPACK_IMPORTED_MODULE_10__.DocumentService));
};
WebDocumentEditStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: WebDocumentEditStore,
  factory: WebDocumentEditStore.ɵfac
});

/***/ })

}]);