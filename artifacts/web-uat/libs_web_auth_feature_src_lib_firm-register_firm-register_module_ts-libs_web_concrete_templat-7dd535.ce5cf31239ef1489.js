"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["libs_web_auth_feature_src_lib_firm-register_firm-register_module_ts-libs_web_concrete_templat-7dd535"],{

/***/ 253640:
/*!*****************************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/firm-register/firm-register.module.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FirmRegisterModule": () => (/* binding */ FirmRegisterModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_auth_data_access__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @case-clinical/web/auth/data-access */ 735838);
/* harmony import */ var _case_clinical_web_auth_ui__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @case-clinical/web/auth/ui */ 757267);
/* harmony import */ var _web_firm_create_stepper_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./web-firm-create-stepper.component */ 819170);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 595838);
/* harmony import */ var _txtextcontrol_tx_ng_document_viewer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @txtextcontrol/tx-ng-document-viewer */ 770383);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 224006);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 94650);










const routes = [{
  path: '',
  component: _web_firm_create_stepper_component__WEBPACK_IMPORTED_MODULE_0__.WebFirmCreateStepperComponent
}];
class FirmRegisterModule {}
FirmRegisterModule.ɵfac = function FirmRegisterModule_Factory(t) {
  return new (t || FirmRegisterModule)();
};
FirmRegisterModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: FirmRegisterModule
});
FirmRegisterModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_3__.WebUiFormModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.ReactiveFormsModule, _txtextcontrol_tx_ng_document_viewer__WEBPACK_IMPORTED_MODULE_5__.DocumentViewerModule, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule.forChild(routes), _case_clinical_web_auth_ui__WEBPACK_IMPORTED_MODULE_7__.AuthPageModule, _case_clinical_web_auth_data_access__WEBPACK_IMPORTED_MODULE_8__.WebAuthDataAccessModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](FirmRegisterModule, {
    declarations: [_web_firm_create_stepper_component__WEBPACK_IMPORTED_MODULE_0__.WebFirmCreateStepperComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_3__.WebUiFormModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.ReactiveFormsModule, _txtextcontrol_tx_ng_document_viewer__WEBPACK_IMPORTED_MODULE_5__.DocumentViewerModule, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule, _case_clinical_web_auth_ui__WEBPACK_IMPORTED_MODULE_7__.AuthPageModule, _case_clinical_web_auth_data_access__WEBPACK_IMPORTED_MODULE_8__.WebAuthDataAccessModule]
  });
})();

/***/ }),

/***/ 819170:
/*!******************************************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/firm-register/web-firm-create-stepper.component.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebFirmCreateStepperComponent": () => (/* binding */ WebFirmCreateStepperComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 570655);
/* harmony import */ var _web_firm_create_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./web-firm-create.store */ 653363);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 318505);
/* harmony import */ var _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/cdk/stepper */ 112138);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 861135);
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ 80529);
/* harmony import */ var _case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @case-clinical/web/ui/toast */ 971873);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _ui_form_src_lib_web_ui_form_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../../ui/form/src/lib/web-ui-form.component */ 834077);


















function WebFirmCreateStepperComponent_ng_container_0_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 8)(1, "ui-button", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WebFirmCreateStepperComponent_ng_container_0_ng_template_3_Template_ui_button_click_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9);
      const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r8.handleDiscardClick($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
}
function WebFirmCreateStepperComponent_ng_container_0_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "ui-card-header", 10);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("title", "Create New")("controlsTemplate", _r2);
  }
}
function WebFirmCreateStepperComponent_ng_container_0_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebFirmCreateStepperComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1)(2, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, WebFirmCreateStepperComponent_ng_container_0_ng_template_3_Template, 2, 0, "ng-template", null, 3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, WebFirmCreateStepperComponent_ng_container_0_ng_template_5_Template, 1, 2, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, WebFirmCreateStepperComponent_ng_container_0_ng_template_7_Template, 2, 0, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "ui-panel", 6)(10, "ui-form", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("submitForm", function WebFirmCreateStepperComponent_ng_container_0_Template_ui_form_submitForm_10_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r11);
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r10.createIntake($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](6);
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](8);
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("headerTemplate", _r4)("footerTemplate", _r6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("fields", ctx_r0.steps)("model", ctx_r0.model)("options", ctx_r0.options);
  }
}
class WebFirmCreateStepperComponent {
  constructor(store, data, router, route, http, toast) {
    this.store = store;
    this.data = data;
    this.router = router;
    this.route = route;
    this.http = http;
    this.toast = toast;
    this.vm$ = this.store.vm$;
    this.firmStatuses$ = this.store.firmStatuses$;
    this.pageTitle = 'Register';
    this.signatureDoc = '';
    this.signatureDoc$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject(this.signatureDoc);
    this.errors = null;
    this.canProgress = false;
    this.alert = {
      type: 'success',
      message: ''
    };
    this.showAlert = false;
    this.model = {};
    this.options = {
      formState: {
        mainModel: this.model
      }
    };
    this.fields = [{
      key: 'registrantSignature',
      type: 'file-viewer',
      templateOptions: {
        label: 'Please Sign',
        document$: this.signatureDoc$,
        signatureBoxName: 'txSign',
        ownerName: 'PCH',
        signerName: '',
        signerInitials: '',
        documentSubmit: d => {
          console.log('signature', d);
        }
      },
      hooks: {
        afterViewChecked: () => {
          setTimeout(() => {
            console.log('in the afterViewChecked', TXDocumentViewer);
            this.GetTemplate("EULA");
          }, 100);
        },
        onDestroy: () => {
          if (document.getElementById("txViewer") !== null) {
            if (typeof TXDocumentViewer !== "undefined") {
              console.log('in the destroy', TXDocumentViewer);
              TXDocumentViewer == undefined;
            }
          }
        }
      }
    }];
  }
  ngOnDestroy() {
    if (document.getElementById("txViewer") !== null) {
      if (typeof TXDocumentViewer !== "undefined") {
        console.log('in the destroy', TXDocumentViewer);
        TXDocumentViewer == undefined;
      }
    }
  }
  handleDiscardClick(evt) {
    evt === null || evt === void 0 ? void 0 : evt.preventDefault();
    this.router.navigate(['..'], {
      relativeTo: this.route
    });
  }
  createFirm(input) {
    if (this.parentFirmStatusId != '') {
      input = Object.assign(Object.assign({}, input), {
        firmStatusId: this.parentFirmStatusId
      });
    }
    this.store.createFirmEffect(input);
  }
  submit() {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function* () {
      yield this.register(this.model);
    });
  }
  register(input) {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function* () {
      const {
        name
      } = input;
      if (name === '' || name === undefined || name === null) {
        this.model.eula.name = 'Firm EULA';
      } else {
        this.model.eula.name = name + 'Firm EULA';
      }
      yield this.store.createFirmEffect(input);
    });
  }
  checkDocumentViewer() {
    if (TXDocumentViewer !== null) {
      console.log('hit the check');
      TXDocumentViewer.init({
        containerID: 'txViewer',
        viewerSettings: {
          signatureSettings: this.GetSignatureSettingsForUser(),
          userNames: [],
          dock: 1,
          documentData: this.signatureDoc,
          documentPath: 'test.docx',
          toolbarDocked: true,
          isSelectionActivated: true,
          showThumbnailPane: true,
          resources: null,
          basePath: 'https://documentserver.caseclinical.com:443/MemberOnboarding'
        }
      });
      TXDocumentViewer.setSubmitCallback(this.documentSubmit.bind(this));
    }
  }
  documentSubmit(wind) {
    console.log('hit the submit');
    let mergeDocument = {
      document: wind.document
    };
    this.http.post('https://documentserver.caseclinical.com:443/MemberOnboarding/DownloadPdf', mergeDocument).subscribe(res => {
      let document = {
        name: this.model.name,
        encoding: 'PDF',
        attachment: res.document,
        extension: '.pdf'
      };
      this.toast.success('Signature received, move to next step');
      this.toggleProgress(true);
      return this.model.eula = document;
    });
  }
  GetSignatureSettingsForUser() {
    var _a;
    return {
      ownerName: 'PCH',
      signatureBoxName: 'txSign',
      signerName: (_a = this.model) === null || _a === void 0 ? void 0 : _a.name,
      signerInitials: '',
      showSignatureBar: true
    };
  }
  GetTemplate(templateId) {
    return this.data.userTemplate({
      templateId
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_3__.tapResponse)(res => {
      console.log(res.data);
      this.signatureDoc = res.data.item.attachment;
    }, errors => console.log(errors)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.tap)(s => {
      //TODO: use the graphql resolver instead
      var merged = this.http.post('https://documentserver.caseclinical.com:443/MemberOnboarding/MergeRawStringDocument', {
        data: JSON.stringify(this.model),
        template: this.signatureDoc
      }).subscribe(res => {
        let pdf = res.document;
        this.signatureDoc = pdf;
        this.signatureDoc$.next(this.signatureDoc);
        this.checkDocumentViewer();
        this.toggleProgress(false);
        return pdf;
      });
      return merged;
    })).subscribe();
  }
  toggleProgress(can) {
    this.canProgress = can;
  }
}
WebFirmCreateStepperComponent.ɵfac = function WebFirmCreateStepperComponent_Factory(t) {
  return new (t || WebFirmCreateStepperComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_web_firm_create_store__WEBPACK_IMPORTED_MODULE_5__.WebFirmCreateStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_8__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_9__.WebUiToastService));
};
WebFirmCreateStepperComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebFirmCreateStepperComponent,
  selectors: [["ng-component"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_web_firm_create_store__WEBPACK_IMPORTED_MODULE_5__.WebFirmCreateStore, {
    provide: _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_10__.STEPPER_GLOBAL_OPTIONS,
    useValue: {
      showError: true
    }
  }])],
  decls: 2,
  vars: 3,
  consts: [[4, "ngIf"], [1, "inset-0", "absolute", "overflow-y-auto"], [1, "p-2", "md:p-4"], ["controlsTemplate", ""], ["headerTemplate", ""], ["footerTemplate", ""], [1, "", 3, "headerTemplate", "footerTemplate"], [3, "fields", "model", "options", "submitForm"], [1, "px-6", "space-x-3"], ["label", "Discard", "variant", "white", 3, "click"], [3, "title", "controlsTemplate"], [1, "flex", "items-center", "justify-end", "pt-3", "pb-6", "dark:bg-transparent"]],
  template: function WebFirmCreateStepperComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, WebFirmCreateStepperComponent_ng_container_0_Template, 11, 5, "ng-container", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](1, "async");
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](1, 1, ctx.vm$));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, _ui_form_src_lib_web_ui_form_component__WEBPACK_IMPORTED_MODULE_12__.WebUiFormComponent, _angular_common__WEBPACK_IMPORTED_MODULE_11__.AsyncPipe],
  encapsulation: 2
});

/***/ }),

/***/ 653363:
/*!******************************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/firm-register/web-firm-create.store.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebFirmCreateStore": () => (/* binding */ WebFirmCreateStore)
/* harmony export */ });
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 654004);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 318505);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 763900);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 134793);







class WebFirmCreateStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route) {
    super({
      loading: false
    });
    this.data = data;
    this.router = router;
    this.route = route;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.item$ = this.select(s => s.item);
    this.firmStatuses$ = this.select(s => s.firmStatuses || []);
    this.documents$ = this.select(s => s.documents || []);
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.firmStatuses$, this.documents$, (errors, loading, item, firmStatuses, documents) => ({
      errors,
      loading,
      item,
      firmStatuses,
      documents
    }), {
      debounce: true
    });
    this.filterFirmStatuses = term => this.data.userFirmStatuses({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let firmStatuses = res.data.items;
      this.patchState({
        firmStatuses
      });
      return firmStatuses;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.addFirmStatus = this.updater((state, firmStatus) => Object.assign(Object.assign({}, state), {
      firmStatuses: state.firmStatuses.concat(firmStatus)
    }));
    this.addDocument = this.updater((state, document) => Object.assign(Object.assign({}, state), {
      documents: state.documents.concat(document)
    }));
    this.createFirmEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.data.userCreateFirm({
      input
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      var _a, _b;
      this.patchState({
        item: res.data.created,
        errors: res.errors,
        loading: false
      });
      return this.router.navigate(['..', (_b = (_a = res.data) === null || _a === void 0 ? void 0 : _a.created) === null || _b === void 0 ? void 0 : _b.id], {
        relativeTo: this.route
      });
    }, errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
  }
}
WebFirmCreateStore.ɵfac = function WebFirmCreateStore_Factory(t) {
  return new (t || WebFirmCreateStore)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_5__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.ActivatedRoute));
};
WebFirmCreateStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
  token: WebFirmCreateStore,
  factory: WebFirmCreateStore.ɵfac
});

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

/***/ })

}]);