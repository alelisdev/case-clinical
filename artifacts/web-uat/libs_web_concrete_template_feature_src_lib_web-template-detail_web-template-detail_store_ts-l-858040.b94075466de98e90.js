"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["libs_web_concrete_template_feature_src_lib_web-template-detail_web-template-detail_store_ts-l-858040"],{

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

/***/ 393753:
/*!***********************************************************!*\
  !*** ./libs/web/modules/signature/signature.component.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SignatureComponent": () => (/* binding */ SignatureComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 570655);
/* harmony import */ var _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/cdk/stepper */ 112138);
/* harmony import */ var _case_clinical_web_legal_case_shared__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @case-clinical/web/legal-case/shared */ 715922);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 675886);
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 318505);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_auth_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/auth/data-access */ 368196);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common/http */ 80529);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _txtextcontrol_tx_ng_document_viewer__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @txtextcontrol/tx-ng-document-viewer */ 770383);

















const _c0 = function () {
  return {
    showSignatureBar: true,
    signatureBoxName: "txsign",
    redirectUrlAfterSignature: "/home",
    ownerName: "Paul",
    signerName: "John Doe"
  };
};
class SignatureComponent {
  constructor(store, legalCase, data, http, router) {
    this.store = store;
    this.legalCase = legalCase;
    this.data = data;
    this.http = http;
    this.router = router;
    this.pageTitle = 'Register';
    this.errors = null;
    this.canProgress = false;
    this.alert = {
      type: 'success',
      message: ''
    };
    this.showAlert = false;
    this.document$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.of)({
      name: 'SignatureDocument',
      attachment: '<div>Hello World</div>',
      encoding: 'WordprocessingML',
      extension: '.docx',
      patientId: this.router.snapshot.params.legalCaseId
    });
    this.fileName = '';
    this.url = '';
    this.signatureBoxName = '';
    this.redirectUrlAfterSignature = '';
    this.ownerName = '';
    this.signerName = '';
    this.signatureName = '';
    this.signerInitials = '';
    this.formData = {};
    this.vm$ = this.store.vm$;
    this.model = {};
    this.options = {
      formState: {
        mainModel: this.model
      }
    };
    this.signatureDoc = '';
    this.fields = [_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.email('email', {
      label: 'Email',
      required: true
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.password('password', {
      label: 'Password',
      required: true
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.input('username', {
      label: 'Username',
      required: false
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.input('firstName', {
      label: 'First name',
      required: false
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.input('lastName', {
      label: 'Last name',
      required: false
    })];
    this.formRowClasses = 'flex flex-auto';
    this.steps = [{
      type: 'stepper',
      templateOptions: {
        formClass: 'flex flex-auto',
        onComplete: () => this.submit()
        // getActiveStep: (activatedStep) => this.triggerActiveStepChange(activatedStep)
      },

      fieldGroup: [{
        templateOptions: {
          label: 'User Registration'
        },
        fieldGroup: [...this.fields]
      }, {
        key: 'registrantSignature',
        type: 'file-viewer',
        templateOptions: {
          label: 'Please Sign',
          document$: (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.of)(this.signatureDoc),
          signatureBoxName: '',
          redirectUrlAfterSignature: '/apps/dashboard',
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
              this.GetTemplate('clhoppwsg0022je01iixof03x');
            }, 100);
          },
          onDestroy: () => {
            if (document.getElementById('txViewer') !== null) {
              if (typeof TXDocumentViewer !== 'undefined') {
                console.log('in the destroy', TXDocumentViewer);
                TXDocumentViewer == undefined;
              }
            }
          }
        }
      }, {
        key: 'thankYou',
        templateOptions: {
          label: 'Thank You'
        },
        fieldGroupClassName: 'grid grid-cols-1',
        fieldGroup: [_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.template(`
            <div>
              <h2>
                Thank you for applying! 
                Ready to submit your application? 
                Click the green button below to finish the application process.
              </h2>
            </div>
            
            `)]
      }]
    }];
  }
  ngOnInit() {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function* () {
      const legalCaseId = this.router.snapshot.params.legalCaseId;
      yield this.legalCase.loadLegalCaseEffect(legalCaseId);
      yield this.GetTemplate('clhoppwsg0022je01iixof03x');
    });
  }
  ngOnDestroy() {
    if (document.getElementById('txViewer') !== null) {
      if (typeof TXDocumentViewer !== 'undefined') {
        console.log('in the destroy', TXDocumentViewer);
      }
    }
  }
  submit() {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function* () {
      yield this.register(this.model);
    });
  }
  register(input) {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function* () {
      var assignedName = '';
      const {
        name
      } = input;
      if (name === '' || name === undefined || name === null) {
        assignedName = 'HIPAA Agreement';
      } else {
        assignedName = name;
      }
      const {
        email,
        phoneNumber,
        firstName,
        lastName,
        username,
        password
      } = input.userRegistration;
      let registerInput = {
        email,
        phone: phoneNumber,
        firstName,
        lastName,
        username,
        password
      };
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      this.store.registerEffect(registerInput);
    });
  }
  checkDocumentViewer() {
    if (typeof TXDocumentViewer !== 'undefined') {
      console.log('initializing the document viewer', TXDocumentViewer);
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
      }).then(res => {
        TXDocumentViewer.setSubmitCallback(this.documentSubmit.bind(this));
      });
    }
    // if (document.getElementById("txViewer") === null) {
    //     if (typeof(TXDocumentViewer) !== "undefined") {
    //       TXDocumentViewer = undefined;
    //     }
    //   }
    //   else { // the DocumentViewer exists
    //     console.log('hit the else')
    //     // wait until object TXDocumentViewer is available (lazy loading)
    //     var checkExist = setInterval(function() {
    //       if (typeof TXDocumentViewer !== "undefined") {
    //         // call init to initialize the viewer
    //         TXDocumentViewer.init( {
    //           containerID: 'txViewer',
    //           viewerSettings: {
    //             toolbarDocked: true,
    //             documentData: "SGVsbG8gdGhlcmU=",
    //             dock: "Fill",
    //             isSelectionActivated: true,
    //             showThumbnailPane: true,
    //             basePath: 'https://backend.textcontrol.com',
    //           }
    //         });
    //         clearInterval(checkExist);
    //       }
    //     }, 100);
    //   }
  }

  documentSubmit(wind) {
    console.log('document submit', wind);
    this.store.user$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.tap)(user => {
      let mergeDocument = {
        document: wind.document
      };
      this.http.post('https://documentserver.caseclinical.com:443/MemberOnboarding/DownloadPdf', mergeDocument).subscribe(res => {
        this.legalCase.item$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.tap)(patient => {
          console.log('patient', patient);
          let document = {
            name: this.template.name,
            encoding: 'PDF',
            patientId: patient.id,
            attachment: res.document,
            extension: '.pdf'
          };
          this.legalCase.createPatientDocumentEffect(document);
        })).subscribe();
        return document;
      });
    })).subscribe();
  }
  GetSignatureSettingsForUser() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    var initials = '';
    if (!((_a = this.model) === null || _a === void 0 ? void 0 : _a.firstName) || !((_b = this.model) === null || _b === void 0 ? void 0 : _b.lastName)) {
      initials = 'PCH';
    } else {
      initials = ((_d = (_c = this.model) === null || _c === void 0 ? void 0 : _c.firstName) === null || _d === void 0 ? void 0 : _d.substring(0, 1)) + ((_f = (_e = this.model) === null || _e === void 0 ? void 0 : _e.lastName) === null || _f === void 0 ? void 0 : _f.substring(0, 1));
    }
    return {
      ownerName: 'PCH',
      signatureBoxName: 'txsign',
      signerName: ((_g = this.model) === null || _g === void 0 ? void 0 : _g.firstName) + ' ' + ((_h = this.model) === null || _h === void 0 ? void 0 : _h.lastName),
      signerInitials: initials,
      showSignatureBar: true
    };
  }
  GetTemplate(templateId) {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function* () {
      var tempreturn = yield this.data.userTemplate({
        templateId
      }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_4__.tapResponse)(res => {
        console.log(res.data);
        this.template = res.data.item;
        this.signatureDoc = res.data.item.attachment;
      }, errors => console.log(errors)), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.tap)(s => {
        return this.legalCase.item$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.tap)(legalCase => {
          if (legalCase) {
            this.model = legalCase.patient;
          }
        }), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.tap)(legalCase => {
          var merged = this.http.post('https://documentserver.caseclinical.com:443/MemberOnboarding/MergeRawStringDocument', {
            data: JSON.stringify(this.model),
            template: this.signatureDoc
          }).subscribe(res => {
            let pdf = res.document;
            this.signatureDoc = pdf;
            this.checkDocumentViewer();
            return pdf;
          });
          return merged;
        })).subscribe();
      })).subscribe();
      return tempreturn;
    });
  }
  toggleProgress(can) {
    this.canProgress = can;
  }
}
SignatureComponent.ɵfac = function SignatureComponent_Factory(t) {
  return new (t || SignatureComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_case_clinical_web_auth_data_access__WEBPACK_IMPORTED_MODULE_6__.WebAuthStore), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_case_clinical_web_legal_case_shared__WEBPACK_IMPORTED_MODULE_7__.WebLegalCaseFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_10__.ActivatedRoute));
};
SignatureComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
  type: SignatureComponent,
  selectors: [["esign-home"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵProvidersFeature"]([{
    provide: _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_11__.STEPPER_GLOBAL_OPTIONS,
    useValue: {
      showError: true
    }
  }, _case_clinical_web_legal_case_shared__WEBPACK_IMPORTED_MODULE_7__.WebLegalCaseFeatureStore])],
  decls: 1,
  vars: 5,
  consts: [["id", "txViewer", "width", "1400px", "height", "800px", "documentData", "SGVsbG8gdGhlcmU=", "dock", "Fill", "documentPath", "test.docx", "basePath", "https://documentserver.caseclinical.com:443/MemberOnboarding", 3, "toolbarDocked", "isSelectionActivated", "showThumbnailPane", "signatureSettings"]],
  template: function SignatureComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "tx-document-viewer", 0);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("toolbarDocked", true)("isSelectionActivated", true)("showThumbnailPane", true)("signatureSettings", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction0"](4, _c0));
    }
  },
  dependencies: [_txtextcontrol_tx_ng_document_viewer__WEBPACK_IMPORTED_MODULE_12__.DocumentViewerComponent],
  encapsulation: 2,
  changeDetection: 0
});

/***/ }),

/***/ 3358:
/*!********************************************************!*\
  !*** ./libs/web/modules/signature/signature.module.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SignatureModule": () => (/* binding */ SignatureModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! libs/shared/shared.module */ 423387);
/* harmony import */ var _signature_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./signature.routing */ 642208);
/* harmony import */ var _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @case-clinical/web/ui/formly-designer */ 408916);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 595838);
/* harmony import */ var _txtextcontrol_tx_ng_document_viewer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @txtextcontrol/tx-ng-document-viewer */ 770383);
/* harmony import */ var _signature_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./signature.component */ 393753);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);











class SignatureModule {}
SignatureModule.ɵfac = function SignatureModule_Factory(t) {
  return new (t || SignatureModule)();
};
SignatureModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: SignatureModule
});
SignatureModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule.forChild(_signature_routing__WEBPACK_IMPORTED_MODULE_2__.signatureRoutes), _angular_material_button__WEBPACK_IMPORTED_MODULE_3__.MatButtonModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconModule, libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_5__.SharedModule, _txtextcontrol_tx_ng_document_viewer__WEBPACK_IMPORTED_MODULE_6__.DocumentViewerModule, _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_7__.WebUiFormlyDesignerModule, _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_8__.WebUiFormModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](SignatureModule, {
    declarations: [_signature_component__WEBPACK_IMPORTED_MODULE_9__.SignatureComponent],
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_3__.MatButtonModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconModule, libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_5__.SharedModule, _txtextcontrol_tx_ng_document_viewer__WEBPACK_IMPORTED_MODULE_6__.DocumentViewerModule, _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_7__.WebUiFormlyDesignerModule, _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_8__.WebUiFormModule]
  });
})();

/***/ }),

/***/ 642208:
/*!*********************************************************!*\
  !*** ./libs/web/modules/signature/signature.routing.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "signatureRoutes": () => (/* binding */ signatureRoutes)
/* harmony export */ });
/* harmony import */ var _signature_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./signature.component */ 393753);

const signatureRoutes = [{
  path: ':legalCaseId',
  component: _signature_component__WEBPACK_IMPORTED_MODULE_0__.SignatureComponent
}];

/***/ })

}]);