"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["libs_web_patient_feature_src_lib_web-patient-create_web-patient-create_module_ts"],{

/***/ 613722:
/*!*****************************************************************************************************!*\
  !*** ./libs/web/patient/feature/src/lib/web-patient-create/web-patient-create-stepper.component.ts ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebPatientCreateComponent": () => (/* binding */ WebPatientCreateComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 570655);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 675886);
/* harmony import */ var _web_patient_create_store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./web-patient-create.store */ 440173);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 194813);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 318505);
/* harmony import */ var _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/cdk/stepper */ 112138);
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common/http */ 80529);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _ui_button_src_lib_web_ui_button_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../../ui/button/src/lib/web-ui-button.component */ 797800);
/* harmony import */ var _ui_panel_src_lib_web_ui_panel_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../../ui/panel/src/lib/web-ui-panel.component */ 619797);
/* harmony import */ var _ui_card_header_src_lib_web_ui_card_header_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../../ui/card-header/src/lib/web-ui-card-header.component */ 80194);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);
/* harmony import */ var _ngneat_transloco__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @ngneat/transloco */ 846367);





















function WebPatientCreateComponent_ng_container_0_ng_template_1_ui_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ui-button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WebPatientCreateComponent_ng_container_0_ng_template_1_ui_button_1_Template_ui_button_click_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r11);
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r10.handleDiscardClick($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const t_r9 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("label", t_r9("Discard"));
  }
}
function WebPatientCreateComponent_ng_container_0_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebPatientCreateComponent_ng_container_0_ng_template_1_ui_button_1_Template, 1, 1, "ui-button", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebPatientCreateComponent_ng_container_0_ng_template_3_ui_card_header_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "ui-card-header", 12);
  }
  if (rf & 2) {
    const t_r13 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("title", t_r13("create_new_patient"))("controlsTemplate", _r2);
  }
}
function WebPatientCreateComponent_ng_container_0_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, WebPatientCreateComponent_ng_container_0_ng_template_3_ui_card_header_0_Template, 1, 2, "ui-card-header", 11);
  }
}
function WebPatientCreateComponent_ng_container_0_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebPatientCreateComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0, 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebPatientCreateComponent_ng_container_0_ng_template_1_Template, 2, 0, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, WebPatientCreateComponent_ng_container_0_ng_template_3_Template, 1, 0, "ng-template", null, 3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, WebPatientCreateComponent_ng_container_0_ng_template_5_Template, 2, 0, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
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
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formName", "patient_create")("showSubmitButton", true)("formData", ctx_r0.formData)("componentStore", ctx_r0.store);
  }
}
class WebPatientCreateComponent {
  constructor(store, data, router, route, http) {
    var _a, _b;
    this.store = store;
    this.data = data;
    this.router = router;
    this.route = route;
    this.http = http;
    this.vm$ = this.store.vm$;
    this.ethnicities$ = this.store.ethnicities$;
    this.genders$ = this.store.genders$;
    this.languages$ = this.store.languages$;
    this.pageTitle = 'Register';
    this.errors = null;
    this.canProgress = false;
    this.alert = {
      type: 'success',
      message: ''
    };
    this.showAlert = false;
    this.model = {};
    this.signatureDoc = '';
    this.options = {
      formState: {
        mainModel: this.model
      }
    };
    this.fields = [_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.fieldRow([{
      key: 'registrantSignature',
      type: 'file-viewer',
      templateOptions: {
        label: 'Please Sign',
        document$: (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.of)(this.signatureDoc),
        signatureBoxName: 'txSign',
        redirectUrlAfterSignature: '/apps/dashboard',
        ownerName: 'PCH',
        signerName: this.model.firstName + ' ' + this.model.lastName,
        signerInitials: ((_a = this.model.firstName) === null || _a === void 0 ? void 0 : _a.charAt(0)) + ((_b = this.model.lastName) === null || _b === void 0 ? void 0 : _b.charAt(0)),
        documentSubmit: d => {
          console.log('signature', d);
        }
      },
      hooks: {
        afterViewChecked: () => {
          setTimeout(() => {
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
    }, _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.input('name', {
      label: 'Name'
    }, {
      className: 'w-full sm:w-1/2 md:w-1/4  px-1'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.input('firstName', {
      label: 'First Name'
    }, {
      className: 'w-full sm:w-1/2 md:w-1/4  px-1'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.input('middleName', {
      label: 'Middle Name'
    }, {
      className: 'w-full sm:w-1/2 md:w-1/4  px-1'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.input('lastName', {
      label: 'Last Name'
    }, {
      className: 'w-full sm:w-1/2 md:w-1/4  px-1'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.input('suffix', {
      label: 'Suffix'
    }, {
      className: 'w-full sm:w-1/2 md:w-1/4  px-1'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.input('nickname', {
      label: 'Nickname'
    }, {
      className: 'w-full sm:w-1/2 md:w-1/4  px-1'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.input('height', {
      label: 'Height'
    }, {
      className: 'w-full sm:w-1/2 md:w-1/4  px-1'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.input('weight', {
      label: 'Weight'
    }, {
      className: 'w-full sm:w-1/2 md:w-1/4  px-1'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.date('dateOfBirth', {
      label: 'Date of Birth'
    }, {
      className: 'w-full sm:w-1/2 md:w-1/4  px-1'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.input('primaryPhoneNumber', {
      label: 'Primary Phone Number'
    }, {
      className: 'w-full sm:w-1/2 md:w-1/4  px-1'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.checkbox('isPrimaryPhoneMobile', {
      label: 'Is Primary Phone Mobile'
    }, {
      className: 'w-full sm:w-1/2 md:w-1/4 px-1'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.input('secondaryPhoneNumber', {
      label: 'Secondary Phone Number'
    }, {
      className: 'w-full sm:w-1/2 md:w-1/4  px-1'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.checkbox('isSecondaryPhoneMobile', {
      label: 'Is Secondary Phone Mobile'
    }, {
      className: 'w-full sm:w-1/2 md:w-1/4 px-1'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.input('memberRegistrationNumber', {
      label: 'Member Registration Number'
    }, {
      className: 'w-full sm:w-1/2 md:w-1/4  px-1'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.checkbox('requiresTranslator', {
      label: 'Requires Translator'
    }, {
      className: 'w-full sm:w-1/2 md:w-1/4 px-1'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.input('socialSecurityNumber', {
      label: 'Social Security Number'
    }, {
      className: 'w-full sm:w-1/2 md:w-1/4  px-1'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.input('honorific', {
      label: 'Honorific'
    }, {
      className: 'w-full sm:w-1/2 md:w-1/4  px-1'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.input('primaryEmailAddress', {
      label: 'Primary Email Address'
    }, {
      className: 'w-full sm:w-1/2 md:w-1/4  px-1'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.input('primaryAddressLine1', {
      label: 'Primary Address Line 1'
    }, {
      className: 'w-full sm:w-1/2 md:w-1/4  px-1'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.input('primaryAddressLine2', {
      label: 'Primary Address Line 2'
    }, {
      className: 'w-full sm:w-1/2 md:w-1/4  px-1'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.input('primaryAddressCity', {
      label: 'Primary Address City'
    }, {
      className: 'w-full sm:w-1/2 md:w-1/4  px-1'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.input('primaryAddressStateOrProvince', {
      label: 'Primary Address State or Province'
    }, {
      className: 'w-full sm:w-1/2 md:w-1/4  px-1'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.input('primaryAddressPostalCode', {
      label: 'Primary Address Postal Code'
    }, {
      className: 'w-full sm:w-1/2 md:w-1/4  px-1'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.input('notes', {
      label: 'Notes'
    }, {
      className: 'w-full sm:w-1/2 md:w-1/4  px-1'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.number('latitude', {
      label: 'Latitude'
    }, {
      className: 'w-full sm:w-1/2 md:w-1/4  px-1'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.number('longitude', {
      label: 'Longitude'
    }, {
      className: 'w-full sm:w-1/2 md:w-1/4  px-1'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.input('emergencyContactId', {
      label: 'Emergency Contact Id'
    }, {
      className: 'w-full sm:w-1/2 md:w-1/4  px-1',
      hide: true
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.input('homePhoneNumber', {
      label: 'Home Phone Number'
    }, {
      className: 'w-full sm:w-1/2 md:w-1/4  px-1'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.input('mobileNumber', {
      label: 'Mobile Number'
    }, {
      className: 'w-full sm:w-1/2 md:w-1/4  px-1'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.input('bmi', {
      label: 'Bmi'
    }, {
      className: 'w-full sm:w-1/2 md:w-1/4  px-1'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.input('occupation', {
      label: 'Occupation'
    }, {
      className: 'w-full sm:w-1/2 md:w-1/4  px-1'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.input('debtorRemarks', {
      label: 'Debtor Remarks'
    }, {
      className: 'w-full sm:w-1/2 md:w-1/4  px-1'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.input('user', {
      label: 'User'
    }, {
      className: 'w-full sm:w-1/2 md:w-1/4  px-1'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.input('workAddressLine1', {
      label: 'Work Address Line 1'
    }, {
      className: 'w-full sm:w-1/2 md:w-1/4  px-1'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.input('workAddressLine2', {
      label: 'Work Address Line 2'
    }, {
      className: 'w-full sm:w-1/2 md:w-1/4  px-1'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.input('workAddressCity', {
      label: 'Work Address City'
    }, {
      className: 'w-full sm:w-1/2 md:w-1/4  px-1'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.input('workAddressStateOrProvince', {
      label: 'Work Address State or Province'
    }, {
      className: 'w-full sm:w-1/2 md:w-1/4  px-1'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.input('workAddressPostalCode', {
      label: 'Work Address Postal Code'
    }, {
      className: 'w-full sm:w-1/2 md:w-1/4  px-1'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.number('workLatitude', {
      label: 'Work Latitude'
    }, {
      className: 'w-full sm:w-1/2 md:w-1/4  px-1'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.number('workLongitude', {
      label: 'Work Longitude'
    }, {
      className: 'w-full sm:w-1/2 md:w-1/4  px-1'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.selectForm('ethnicity', 'ethnicityId', {
      defaultValues: {},
      debounceTime: 5
    }, {
      className: 'w-full md:w-1/2 xl:w-1/4 px-1',
      hooks: {
        onInit: field => (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
          this.route.params.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.pluck)('ethnicityId')).subscribe(s => {
            if (s != undefined || s != null) {
              this.parentEthnicityId = s;
              field.hide = true;
            }
          });
        })
      }
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.selectForm('gender', 'genderId', {
      defaultValues: {},
      debounceTime: 5
    }, {
      className: 'w-full md:w-1/2 xl:w-1/4 px-1',
      hooks: {
        onInit: field => (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
          this.route.params.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.pluck)('genderId')).subscribe(s => {
            if (s != undefined || s != null) {
              this.parentGenderId = s;
              field.hide = true;
            }
          });
        })
      }
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.selectForm('language', 'languageId', {
      defaultValues: {},
      debounceTime: 5
    }, {
      className: 'w-full md:w-1/2 xl:w-1/4 px-1',
      hooks: {
        onInit: field => (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
          this.route.params.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.pluck)('languageId')).subscribe(s => {
            if (s != undefined || s != null) {
              this.parentLanguageId = s;
              field.hide = true;
            }
          });
        })
      }
    })])];
    this.steps = [{
      type: 'stepper',
      templateOptions: {
        formClass: 'flex flex-auto',
        onComplete: () => this.submit()
        // getActiveStep: (activatedStep) => this.triggerActiveStepChange(activatedStep)
      },

      fieldGroup: [{
        templateOptions: {
          label: 'Firm Registration'
        },
        fieldGroup: [...this.fields]
      }, {
        key: 'registrantSignature',
        type: 'file-viewer',
        templateOptions: {
          label: 'Please Sign',
          document$: (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.of)(this.signatureDoc),
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
      }, {
        key: 'thankYou',
        templateOptions: {
          label: 'Thank You'
        },
        fieldGroupClassName: 'grid grid-cols-1',
        fieldGroup: [
        //TODO: Add the preview of the signature document and the final submit button
        _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.template(`
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
    if (document.getElementById("txViewer") === null) {
      if (typeof TXDocumentViewer !== "undefined") {
        TXDocumentViewer = undefined;
      }
    } else {
      // the DocumentViewer exists
      // wait until object TXDocumentViewer is available (lazy loading)
      var checkExist = setInterval(function () {
        if (typeof TXDocumentViewer !== "undefined") {
          // call init to initialize the viewer
          TXDocumentViewer.init({
            containerID: 'txViewer',
            viewerSettings: {
              toolbarDocked: true,
              documentData: "SGVsbG8gdGhlcmU=",
              dock: "Fill",
              isSelectionActivated: true,
              showThumbnailPane: true,
              basePath: 'https://documentserver.caseclinical.com:443/MemberOnboarding'
            }
          });
          clearInterval(checkExist);
        }
      }, 100);
    }
  }
  submit() {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
      yield this.register(this.model);
    });
  }
  register(input) {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
      var assignedName = '';
      const {
        name
      } = input;
      if (name === '' || name === undefined || name === null) {
        assignedName = 'Firm EULA';
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
      // let registerInput: RegisterInput = {
      //   email,
      //   phone: phoneNumber,
      //   firstName,
      //   lastName,
      //   username,
      //   password,
      // }
      // var today = new Date()
      // var dd = String(today.getDate()).padStart(2, '0')
      // var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
      // var yyyy = today.getFullYear()
      // this.store.registerEffect(registerInput)
    });
  }

  checkDocumentViewer() {
    if (TXDocumentViewer !== null) {
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
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_5__.tapResponse)(res => {
      console.log(res.data);
      this.signatureDoc = res.data.item.attachment;
    }, errors => console.log(errors)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.tap)(s => {
      //TODO: use the graphql resolver instead
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
  }
  toggleProgress(can) {
    this.canProgress = can;
  }
  handleDiscardClick(evt) {
    evt === null || evt === void 0 ? void 0 : evt.preventDefault();
    this.router.navigate(['..'], {
      relativeTo: this.route
    });
  }
  createPatient(input) {
    if (this.parentEthnicityId != '') {
      input = Object.assign(Object.assign({}, input), {
        ethnicityId: this.parentEthnicityId
      });
    }
    if (this.parentGenderId != '') {
      input = Object.assign(Object.assign({}, input), {
        genderId: this.parentGenderId
      });
    }
    if (this.parentLanguageId != '') {
      input = Object.assign(Object.assign({}, input), {
        languageId: this.parentLanguageId
      });
    }
    this.store.createPatientEffect(input);
  }
}
WebPatientCreateComponent.ɵfac = function WebPatientCreateComponent_Factory(t) {
  return new (t || WebPatientCreateComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_web_patient_create_store__WEBPACK_IMPORTED_MODULE_7__.WebPatientCreateStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_8__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_10__.HttpClient));
};
WebPatientCreateComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebPatientCreateComponent,
  selectors: [["ng-component"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_web_patient_create_store__WEBPACK_IMPORTED_MODULE_7__.WebPatientCreateStore, {
    provide: _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_11__.STEPPER_GLOBAL_OPTIONS,
    useValue: {
      showError: true
    }
  }])],
  decls: 2,
  vars: 3,
  consts: [["class", "absolute inset-0 flex flex-col overflow-y-hidden", 4, "ngIf"], [1, "absolute", "inset-0", "flex", "flex-col", "overflow-y-hidden"], ["controlsTemplate", ""], ["headerTemplate", ""], ["footerTemplate", ""], [1, "absolute", "inset-0", "overflow-y-auto", "p-2", "md:p-4", 3, "headerTemplate", "footerTemplate", "disableHeaderPadding", "disableBodyPadding", "disableFooterPadding"], [1, "px-6", "py-4"], [3, "formName", "showSubmitButton", "formData", "componentStore"], [1, "space-x-3", "px-6"], ["variant", "white", 3, "label", "click", 4, "transloco"], ["variant", "white", 3, "label", "click"], [3, "title", "controlsTemplate", 4, "transloco"], [3, "title", "controlsTemplate"], [1, "flex", "items-center", "justify-end", "pb-6", "pt-3", "dark:bg-transparent"]],
  template: function WebPatientCreateComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, WebPatientCreateComponent_ng_container_0_Template, 10, 9, "ng-container", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](1, "async");
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](1, 1, ctx.vm$));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, _ui_button_src_lib_web_ui_button_component__WEBPACK_IMPORTED_MODULE_13__.WebUiButtonComponent, _ui_panel_src_lib_web_ui_panel_component__WEBPACK_IMPORTED_MODULE_14__.WebUiPanelComponent, _ui_card_header_src_lib_web_ui_card_header_component__WEBPACK_IMPORTED_MODULE_15__.WebUiCardHeaderComponent, _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_16__.WebUiFormlyJsonFormComponent, _ngneat_transloco__WEBPACK_IMPORTED_MODULE_17__.TranslocoDirective, _angular_common__WEBPACK_IMPORTED_MODULE_12__.AsyncPipe],
  encapsulation: 2
});

/***/ }),

/***/ 693271:
/*!******************************************************************************************!*\
  !*** ./libs/web/patient/feature/src/lib/web-patient-create/web-patient-create.module.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebPatientCreateModule": () => (/* binding */ WebPatientCreateModule)
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
/* harmony import */ var _web_patient_create_stepper_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./web-patient-create-stepper.component */ 613722);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);













class WebPatientCreateModule {}
WebPatientCreateModule.ɵfac = function WebPatientCreateModule_Factory(t) {
  return new (t || WebPatientCreateModule)();
};
WebPatientCreateModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebPatientCreateModule
});
WebPatientCreateModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_2__.WebUiButtonModule, _case_clinical_web_ui_panel__WEBPACK_IMPORTED_MODULE_3__.WebUiPanelModule, _case_clinical_web_ui_card_header__WEBPACK_IMPORTED_MODULE_4__.WebUiCardHeaderModule, _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_5__.WebUiFormModule, _case_clinical_web_ui_page_header__WEBPACK_IMPORTED_MODULE_6__.WebUiPageHeaderModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_7__.UtilitySharedModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_8__.UiFormsSharedModule, _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_9__.WebUiFormlyDesignerModule, _ngneat_transloco__WEBPACK_IMPORTED_MODULE_10__.TranslocoModule, _angular_router__WEBPACK_IMPORTED_MODULE_11__.RouterModule.forChild([{
    path: '',
    component: _web_patient_create_stepper_component__WEBPACK_IMPORTED_MODULE_12__.WebPatientCreateComponent
  }])]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebPatientCreateModule, {
    declarations: [_web_patient_create_stepper_component__WEBPACK_IMPORTED_MODULE_12__.WebPatientCreateComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_2__.WebUiButtonModule, _case_clinical_web_ui_panel__WEBPACK_IMPORTED_MODULE_3__.WebUiPanelModule, _case_clinical_web_ui_card_header__WEBPACK_IMPORTED_MODULE_4__.WebUiCardHeaderModule, _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_5__.WebUiFormModule, _case_clinical_web_ui_page_header__WEBPACK_IMPORTED_MODULE_6__.WebUiPageHeaderModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_7__.UtilitySharedModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_8__.UiFormsSharedModule, _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_9__.WebUiFormlyDesignerModule, _ngneat_transloco__WEBPACK_IMPORTED_MODULE_10__.TranslocoModule, _angular_router__WEBPACK_IMPORTED_MODULE_11__.RouterModule]
  });
})();

/***/ }),

/***/ 440173:
/*!*****************************************************************************************!*\
  !*** ./libs/web/patient/feature/src/lib/web-patient-create/web-patient-create.store.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebPatientCreateStore": () => (/* binding */ WebPatientCreateStore)
/* harmony export */ });
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 654004);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 318505);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 763900);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @case-clinical/web/ui/toast */ 971873);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 504523);
/* harmony import */ var _case_clinical_web_patient_shared__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @case-clinical/web/patient/shared */ 840970);













class WebPatientCreateStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast, formService, patientService) {
    super({
      loading: false
    });
    this.data = data;
    this.router = router;
    this.route = route;
    this.toast = toast;
    this.formService = formService;
    this.patientService = patientService;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.item$ = this.select(s => s.item);
    this.ethnicities$ = this.select(s => s.ethnicities || []);
    this.genders$ = this.select(s => s.genders || []);
    this.languages$ = this.select(s => s.languages || []);
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.ethnicities$, this.genders$, this.languages$, (errors, loading, item, ethnicities, genders, languages) => ({
      errors,
      loading,
      item,
      ethnicities,
      genders,
      languages
    }), {
      debounce: true
    });
    this.filterEthnicities = term => this.data.userSelectEthnicities({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let ethnicities = res.data.items;
      this.patchState({
        ethnicities
      });
      return ethnicities;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterGenders = term => this.data.userSelectGenders({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let genders = res.data.items;
      this.patchState({
        genders
      });
      return genders;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.filterLanguages = term => this.data.userSelectLanguages({
      input: {
        name: term
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      let languages = res.data.items;
      this.patchState({
        languages
      });
      return languages;
    }, errors => this.patchState({
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      return result.data.items;
    }));
    this.addEthnicity = this.updater((state, ethnicity) => Object.assign(Object.assign({}, state), {
      ethnicities: state.ethnicities.concat(ethnicity)
    }));
    this.addGender = this.updater((state, gender) => Object.assign(Object.assign({}, state), {
      genders: state.genders.concat(gender)
    }));
    this.addLanguage = this.updater((state, language) => Object.assign(Object.assign({}, state), {
      languages: state.languages.concat(language)
    }));
    this.createPatientEffect = this.effect(input$ => input$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(input => this.patientService.createPatient(Object.assign({}, input)).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(patient => {
      this.patchState({
        item: patient,
        loading: false
      });
      return this.router.navigate(['..', patient === null || patient === void 0 ? void 0 : patient.id], {
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
  }
}
WebPatientCreateStore.ɵfac = function WebPatientCreateStore_Factory(t) {
  return new (t || WebPatientCreateStore)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_5__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_7__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_8__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_case_clinical_web_patient_shared__WEBPACK_IMPORTED_MODULE_9__.PatientService));
};
WebPatientCreateStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
  token: WebPatientCreateStore,
  factory: WebPatientCreateStore.ɵfac
});

/***/ })

}]);