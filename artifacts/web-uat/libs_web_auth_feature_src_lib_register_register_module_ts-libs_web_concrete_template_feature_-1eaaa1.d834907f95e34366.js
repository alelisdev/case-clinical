"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["libs_web_auth_feature_src_lib_register_register_module_ts-libs_web_concrete_template_feature_-1eaaa1"],{

/***/ 227119:
/*!***************************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/register/material-example.module.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MaterialExampleModule": () => (/* binding */ MaterialExampleModule)
/* harmony export */ });
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/a11y */ 212687);
/* harmony import */ var _angular_cdk_accordion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/accordion */ 248580);
/* harmony import */ var _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/clipboard */ 964425);
/* harmony import */ var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/drag-drop */ 573555);
/* harmony import */ var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! @angular/cdk/portal */ 984080);
/* harmony import */ var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! @angular/cdk/scrolling */ 867376);
/* harmony import */ var _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/stepper */ 112138);
/* harmony import */ var _angular_cdk_table__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/table */ 155013);
/* harmony import */ var _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/tree */ 657851);
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/autocomplete */ 647957);
/* harmony import */ var _angular_material_badge__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/badge */ 242673);
/* harmony import */ var _angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/bottom-sheet */ 848242);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/button-toggle */ 490811);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/card */ 373546);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/checkbox */ 556709);
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/chips */ 777331);
/* harmony import */ var _angular_material_stepper__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/stepper */ 958425);
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/datepicker */ 499602);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/dialog */ 665938);
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/divider */ 44850);
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/expansion */ 49652);
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/grid-list */ 190782);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/input */ 300284);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/list */ 696338);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/menu */ 228255);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/material/core */ 447873);
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/material/paginator */ 498739);
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/material/progress-bar */ 973162);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/material/progress-spinner */ 151572);
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/material/radio */ 971948);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @angular/material/select */ 584385);
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @angular/material/sidenav */ 523267);
/* harmony import */ var _angular_material_slider__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @angular/material/slider */ 687314);
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! @angular/material/slide-toggle */ 690455);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! @angular/material/snack-bar */ 17009);
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! @angular/material/sort */ 796308);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! @angular/material/table */ 853626);
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! @angular/material/tabs */ 503848);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! @angular/material/toolbar */ 583683);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! @angular/material/tooltip */ 810266);
/* harmony import */ var _angular_material_tree__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! @angular/material/tree */ 135423);
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! @angular/cdk/overlay */ 598184);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);













































class MaterialExampleModule {}
MaterialExampleModule.ɵfac = function MaterialExampleModule_Factory(t) {
  return new (t || MaterialExampleModule)();
};
MaterialExampleModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: MaterialExampleModule
});
MaterialExampleModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_1__.A11yModule, _angular_cdk_accordion__WEBPACK_IMPORTED_MODULE_2__.CdkAccordionModule, _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_3__.ClipboardModule, _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_4__.CdkStepperModule, _angular_cdk_table__WEBPACK_IMPORTED_MODULE_5__.CdkTableModule, _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_6__.CdkTreeModule, _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_7__.DragDropModule, _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_8__.MatAutocompleteModule, _angular_material_badge__WEBPACK_IMPORTED_MODULE_9__.MatBadgeModule, _angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_10__.MatBottomSheetModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_11__.MatButtonModule, _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_12__.MatButtonToggleModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_13__.MatCardModule, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_14__.MatCheckboxModule, _angular_material_chips__WEBPACK_IMPORTED_MODULE_15__.MatChipsModule, _angular_material_stepper__WEBPACK_IMPORTED_MODULE_16__.MatStepperModule, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_17__.MatDatepickerModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_18__.MatDialogModule, _angular_material_divider__WEBPACK_IMPORTED_MODULE_19__.MatDividerModule, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_20__.MatExpansionModule, _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_21__.MatGridListModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_22__.MatIconModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_23__.MatInputModule, _angular_material_list__WEBPACK_IMPORTED_MODULE_24__.MatListModule, _angular_material_menu__WEBPACK_IMPORTED_MODULE_25__.MatMenuModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_26__.MatNativeDateModule, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_27__.MatPaginatorModule, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_28__.MatProgressBarModule, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_29__.MatProgressSpinnerModule, _angular_material_radio__WEBPACK_IMPORTED_MODULE_30__.MatRadioModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_26__.MatRippleModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_31__.MatSelectModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_32__.MatSidenavModule, _angular_material_slider__WEBPACK_IMPORTED_MODULE_33__.MatSliderModule, _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_34__.MatSlideToggleModule, _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_35__.MatSnackBarModule, _angular_material_sort__WEBPACK_IMPORTED_MODULE_36__.MatSortModule, _angular_material_table__WEBPACK_IMPORTED_MODULE_37__.MatTableModule, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_38__.MatTabsModule, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_39__.MatToolbarModule, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_40__.MatTooltipModule, _angular_material_tree__WEBPACK_IMPORTED_MODULE_41__.MatTreeModule, _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_42__.OverlayModule, _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_43__.PortalModule, _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_44__.ScrollingModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](MaterialExampleModule, {
    exports: [_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_1__.A11yModule, _angular_cdk_accordion__WEBPACK_IMPORTED_MODULE_2__.CdkAccordionModule, _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_3__.ClipboardModule, _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_4__.CdkStepperModule, _angular_cdk_table__WEBPACK_IMPORTED_MODULE_5__.CdkTableModule, _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_6__.CdkTreeModule, _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_7__.DragDropModule, _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_8__.MatAutocompleteModule, _angular_material_badge__WEBPACK_IMPORTED_MODULE_9__.MatBadgeModule, _angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_10__.MatBottomSheetModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_11__.MatButtonModule, _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_12__.MatButtonToggleModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_13__.MatCardModule, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_14__.MatCheckboxModule, _angular_material_chips__WEBPACK_IMPORTED_MODULE_15__.MatChipsModule, _angular_material_stepper__WEBPACK_IMPORTED_MODULE_16__.MatStepperModule, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_17__.MatDatepickerModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_18__.MatDialogModule, _angular_material_divider__WEBPACK_IMPORTED_MODULE_19__.MatDividerModule, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_20__.MatExpansionModule, _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_21__.MatGridListModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_22__.MatIconModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_23__.MatInputModule, _angular_material_list__WEBPACK_IMPORTED_MODULE_24__.MatListModule, _angular_material_menu__WEBPACK_IMPORTED_MODULE_25__.MatMenuModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_26__.MatNativeDateModule, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_27__.MatPaginatorModule, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_28__.MatProgressBarModule, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_29__.MatProgressSpinnerModule, _angular_material_radio__WEBPACK_IMPORTED_MODULE_30__.MatRadioModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_26__.MatRippleModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_31__.MatSelectModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_32__.MatSidenavModule, _angular_material_slider__WEBPACK_IMPORTED_MODULE_33__.MatSliderModule, _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_34__.MatSlideToggleModule, _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_35__.MatSnackBarModule, _angular_material_sort__WEBPACK_IMPORTED_MODULE_36__.MatSortModule, _angular_material_table__WEBPACK_IMPORTED_MODULE_37__.MatTableModule, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_38__.MatTabsModule, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_39__.MatToolbarModule, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_40__.MatTooltipModule, _angular_material_tree__WEBPACK_IMPORTED_MODULE_41__.MatTreeModule, _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_42__.OverlayModule, _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_43__.PortalModule, _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_44__.ScrollingModule]
  });
})();

/***/ }),

/***/ 441993:
/*!**********************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/register/register.component.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RegisterComponent": () => (/* binding */ RegisterComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 570655);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 675886);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 318505);
/* harmony import */ var _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/cdk/stepper */ 112138);
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_auth_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/auth/data-access */ 368196);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ 80529);
/* harmony import */ var _ui_form_src_lib_web_ui_form_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../../ui/form/src/lib/web-ui-form.component */ 834077);













class RegisterComponent {
  constructor(store, data, http) {
    this.store = store;
    this.data = data;
    this.http = http;
    this.vm$ = this.store.vm$;
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
      extension: '.docx'
    });
    this.fileName = '';
    this.url = '';
    this.signatureBoxName = '';
    this.redirectUrlAfterSignature = '';
    this.ownerName = '';
    this.signerName = '';
    this.signatureName = '';
    this.signerInitials = '';
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
    this.model = {};
    this.options = {
      formState: {
        mainModel: this.model
      }
    };
    this.signatureDoc = '';
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
              this.GetTemplate("ckyuloscl0097y0veddmeuxwh");
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
  ngOnDestroy() {
    if (document.getElementById("txViewer") !== null) {
      if (typeof TXDocumentViewer !== "undefined") {
        console.log('in the destroy', TXDocumentViewer);
      }
    }
  }
  submit() {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function* () {
      console.log('submi data = ', this.model);
      yield this.register(this.model);
    });
  }
  register(input) {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function* () {
      let assignedName = '';
      const {
        name
      } = input;
      if (name === '' || name === undefined || name === null) {
        assignedName = 'Loan Application';
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
      const registerInput = {
        email,
        phone: phoneNumber,
        firstName,
        lastName,
        username,
        password
      };
      this.store.registerEffect(registerInput);
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
    this.store.user$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.tap)(() => {
      // this.http
      //   .post('https://documentserver.schemadriven.com:443/DownloadPdf', mergeDocument)
      //   .subscribe((res: any) => {
      //     let document: UserCreateDocumentInput = {
      //       name: assignedDocument.name,
      //       encoding: 'PDF',
      //       userId: user.id,
      //       attachment: res.document,
      //       extension: '.pdf',
      //     }
      //     return this.documentStore.createDocumentEffect(document)
      //   })
    })).subscribe();
  }
  GetSignatureSettingsForUser() {
    var _a, _b, _c, _d;
    return {
      ownerName: 'PCH',
      signatureBoxName: 'txsign',
      signerName: ((_a = this.model) === null || _a === void 0 ? void 0 : _a.firstName) + ' ' + ((_b = this.model) === null || _b === void 0 ? void 0 : _b.lastName),
      signerInitials: ((_c = this.model) === null || _c === void 0 ? void 0 : _c.firstName.substring(0, 1)) + ((_d = this.model) === null || _d === void 0 ? void 0 : _d.lastName.substring(0, 1)),
      showSignatureBar: true
    };
  }
  GetTemplate(templateId) {
    return this.data.userTemplate({
      templateId
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_4__.tapResponse)(res => {
      console.log(res.data);
      this.signatureDoc = res.data.item.attachment;
    }, errors => console.log(errors)), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.tap)(() => {
      const merged = this.http.post('https://documentserver.caseclinical.com:443/MemberOnboarding/MergeRawStringDocument', {
        data: JSON.stringify(this.model),
        template: this.signatureDoc
      }).subscribe(res => {
        const pdf = res.document;
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
}
RegisterComponent.ɵfac = function RegisterComponent_Factory(t) {
  return new (t || RegisterComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_case_clinical_web_auth_data_access__WEBPACK_IMPORTED_MODULE_6__.WebAuthStore), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_7__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_8__.HttpClient));
};
RegisterComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
  type: RegisterComponent,
  selectors: [["ng-component"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵProvidersFeature"]([{
    provide: _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_9__.STEPPER_GLOBAL_OPTIONS,
    useValue: {
      showError: true
    }
  }])],
  decls: 2,
  vars: 3,
  consts: [[1, "bg-white", "dark:bg-gray-800", "py-8", "px-4", "shadow"], [3, "fields", "model", "options"]],
  template: function RegisterComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "ui-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("fields", ctx.steps)("model", ctx.model)("options", ctx.options);
    }
  },
  dependencies: [_ui_form_src_lib_web_ui_form_component__WEBPACK_IMPORTED_MODULE_10__.WebUiFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 443315:
/*!*******************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/register/register.module.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RegisterModule": () => (/* binding */ RegisterModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_auth_data_access__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @case-clinical/web/auth/data-access */ 735838);
/* harmony import */ var _case_clinical_web_auth_ui__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @case-clinical/web/auth/ui */ 757267);
/* harmony import */ var _register_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./register.component */ 441993);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 595838);
/* harmony import */ var _txtextcontrol_tx_ng_document_viewer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @txtextcontrol/tx-ng-document-viewer */ 770383);
/* harmony import */ var _material_example_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./material-example.module */ 227119);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 224006);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 94650);











const routes = [{
  path: '',
  component: _register_component__WEBPACK_IMPORTED_MODULE_0__.RegisterComponent
}];
class RegisterModule {}
RegisterModule.ɵfac = function RegisterModule_Factory(t) {
  return new (t || RegisterModule)();
};
RegisterModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: RegisterModule
});
RegisterModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_3__.WebUiFormModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.ReactiveFormsModule, _material_example_module__WEBPACK_IMPORTED_MODULE_5__.MaterialExampleModule, _txtextcontrol_tx_ng_document_viewer__WEBPACK_IMPORTED_MODULE_6__.DocumentViewerModule, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule.forChild(routes), _case_clinical_web_auth_ui__WEBPACK_IMPORTED_MODULE_8__.AuthPageModule, _case_clinical_web_auth_data_access__WEBPACK_IMPORTED_MODULE_9__.WebAuthDataAccessModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](RegisterModule, {
    declarations: [_register_component__WEBPACK_IMPORTED_MODULE_0__.RegisterComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_3__.WebUiFormModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.ReactiveFormsModule, _material_example_module__WEBPACK_IMPORTED_MODULE_5__.MaterialExampleModule, _txtextcontrol_tx_ng_document_viewer__WEBPACK_IMPORTED_MODULE_6__.DocumentViewerModule, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule, _case_clinical_web_auth_ui__WEBPACK_IMPORTED_MODULE_8__.AuthPageModule, _case_clinical_web_auth_data_access__WEBPACK_IMPORTED_MODULE_9__.WebAuthDataAccessModule]
  });
})();

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

/***/ }),

/***/ 242673:
/*!***********************************************************!*\
  !*** ./node_modules/@angular/material/fesm2020/badge.mjs ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MatBadge": () => (/* binding */ MatBadge),
/* harmony export */   "MatBadgeModule": () => (/* binding */ MatBadgeModule)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser/animations */ 94650);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/material/core */ 447873);
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/a11y */ 212687);
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/coercion */ 121281);








/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
let nextId = 0;
// Boilerplate for applying mixins to MatBadge.
/** @docs-private */
const _MatBadgeBase = (0,_angular_material_core__WEBPACK_IMPORTED_MODULE_0__.mixinDisabled)(class {});
const BADGE_CONTENT_CLASS = 'mat-badge-content';
/** Directive to display a text badge. */
class MatBadge extends _MatBadgeBase {
  /** The color of the badge. Can be `primary`, `accent`, or `warn`. */
  get color() {
    return this._color;
  }
  set color(value) {
    this._setColor(value);
    this._color = value;
  }
  /** Whether the badge should overlap its contents or not */
  get overlap() {
    return this._overlap;
  }
  set overlap(val) {
    this._overlap = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__.coerceBooleanProperty)(val);
  }
  /** The content for the badge */
  get content() {
    return this._content;
  }
  set content(newContent) {
    this._updateRenderedContent(newContent);
  }
  /** Message used to describe the decorated element via aria-describedby */
  get description() {
    return this._description;
  }
  set description(newDescription) {
    this._updateHostAriaDescription(newDescription);
  }
  /** Whether the badge is hidden. */
  get hidden() {
    return this._hidden;
  }
  set hidden(val) {
    this._hidden = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__.coerceBooleanProperty)(val);
  }
  constructor(_ngZone, _elementRef, _ariaDescriber, _renderer, _animationMode) {
    super();
    this._ngZone = _ngZone;
    this._elementRef = _elementRef;
    this._ariaDescriber = _ariaDescriber;
    this._renderer = _renderer;
    this._animationMode = _animationMode;
    this._color = 'primary';
    this._overlap = true;
    /**
     * Position the badge should reside.
     * Accepts any combination of 'above'|'below' and 'before'|'after'
     */
    this.position = 'above after';
    /** Size of the badge. Can be 'small', 'medium', or 'large'. */
    this.size = 'medium';
    /** Unique id for the badge */
    this._id = nextId++;
    /** Whether the OnInit lifecycle hook has run yet */
    this._isInitialized = false;
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
      const nativeElement = _elementRef.nativeElement;
      if (nativeElement.nodeType !== nativeElement.ELEMENT_NODE) {
        throw Error('matBadge must be attached to an element node.');
      }
    }
  }
  /** Whether the badge is above the host or not */
  isAbove() {
    return this.position.indexOf('below') === -1;
  }
  /** Whether the badge is after the host or not */
  isAfter() {
    return this.position.indexOf('before') === -1;
  }
  /**
   * Gets the element into which the badge's content is being rendered. Undefined if the element
   * hasn't been created (e.g. if the badge doesn't have content).
   */
  getBadgeElement() {
    return this._badgeElement;
  }
  ngOnInit() {
    // We may have server-side rendered badge that we need to clear.
    // We need to do this in ngOnInit because the full content of the component
    // on which the badge is attached won't necessarily be in the DOM until this point.
    this._clearExistingBadges();
    if (this.content && !this._badgeElement) {
      this._badgeElement = this._createBadgeElement();
      this._updateRenderedContent(this.content);
    }
    this._isInitialized = true;
  }
  ngOnDestroy() {
    // ViewEngine only: when creating a badge through the Renderer, Angular remembers its index.
    // We have to destroy it ourselves, otherwise it'll be retained in memory.
    if (this._renderer.destroyNode) {
      this._renderer.destroyNode(this._badgeElement);
    }
    this._ariaDescriber.removeDescription(this._elementRef.nativeElement, this.description);
  }
  /** Creates the badge element */
  _createBadgeElement() {
    const badgeElement = this._renderer.createElement('span');
    const activeClass = 'mat-badge-active';
    badgeElement.setAttribute('id', `mat-badge-content-${this._id}`);
    // The badge is aria-hidden because we don't want it to appear in the page's navigation
    // flow. Instead, we use the badge to describe the decorated element with aria-describedby.
    badgeElement.setAttribute('aria-hidden', 'true');
    badgeElement.classList.add(BADGE_CONTENT_CLASS);
    if (this._animationMode === 'NoopAnimations') {
      badgeElement.classList.add('_mat-animation-noopable');
    }
    this._elementRef.nativeElement.appendChild(badgeElement);
    // animate in after insertion
    if (typeof requestAnimationFrame === 'function' && this._animationMode !== 'NoopAnimations') {
      this._ngZone.runOutsideAngular(() => {
        requestAnimationFrame(() => {
          badgeElement.classList.add(activeClass);
        });
      });
    } else {
      badgeElement.classList.add(activeClass);
    }
    return badgeElement;
  }
  /** Update the text content of the badge element in the DOM, creating the element if necessary. */
  _updateRenderedContent(newContent) {
    const newContentNormalized = `${newContent ?? ''}`.trim();
    // Don't create the badge element if the directive isn't initialized because we want to
    // append the badge element to the *end* of the host element's content for backwards
    // compatibility.
    if (this._isInitialized && newContentNormalized && !this._badgeElement) {
      this._badgeElement = this._createBadgeElement();
    }
    if (this._badgeElement) {
      this._badgeElement.textContent = newContentNormalized;
    }
    this._content = newContentNormalized;
  }
  /** Updates the host element's aria description via AriaDescriber. */
  _updateHostAriaDescription(newDescription) {
    this._ariaDescriber.removeDescription(this._elementRef.nativeElement, this.description);
    if (newDescription) {
      this._ariaDescriber.describe(this._elementRef.nativeElement, newDescription);
    }
    this._description = newDescription;
  }
  /** Adds css theme class given the color to the component host */
  _setColor(colorPalette) {
    const classList = this._elementRef.nativeElement.classList;
    classList.remove(`mat-badge-${this._color}`);
    if (colorPalette) {
      classList.add(`mat-badge-${colorPalette}`);
    }
  }
  /** Clears any existing badges that might be left over from server-side rendering. */
  _clearExistingBadges() {
    // Only check direct children of this host element in order to avoid deleting
    // any badges that might exist in descendant elements.
    const badges = this._elementRef.nativeElement.querySelectorAll(`:scope > .${BADGE_CONTENT_CLASS}`);
    for (const badgeElement of Array.from(badges)) {
      if (badgeElement !== this._badgeElement) {
        badgeElement.remove();
      }
    }
  }
}
MatBadge.ɵfac = function MatBadge_Factory(t) {
  return new (t || MatBadge)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_3__.AriaDescriber), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.Renderer2), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.ANIMATION_MODULE_TYPE, 8));
};
MatBadge.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineDirective"]({
  type: MatBadge,
  selectors: [["", "matBadge", ""]],
  hostAttrs: [1, "mat-badge"],
  hostVars: 20,
  hostBindings: function MatBadge_HostBindings(rf, ctx) {
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("mat-badge-overlap", ctx.overlap)("mat-badge-above", ctx.isAbove())("mat-badge-below", !ctx.isAbove())("mat-badge-before", !ctx.isAfter())("mat-badge-after", ctx.isAfter())("mat-badge-small", ctx.size === "small")("mat-badge-medium", ctx.size === "medium")("mat-badge-large", ctx.size === "large")("mat-badge-hidden", ctx.hidden || !ctx.content)("mat-badge-disabled", ctx.disabled);
    }
  },
  inputs: {
    disabled: ["matBadgeDisabled", "disabled"],
    color: ["matBadgeColor", "color"],
    overlap: ["matBadgeOverlap", "overlap"],
    position: ["matBadgePosition", "position"],
    content: ["matBadge", "content"],
    description: ["matBadgeDescription", "description"],
    size: ["matBadgeSize", "size"],
    hidden: ["matBadgeHidden", "hidden"]
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵInheritDefinitionFeature"]]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵsetClassMetadata"](MatBadge, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Directive,
    args: [{
      selector: '[matBadge]',
      inputs: ['disabled: matBadgeDisabled'],
      host: {
        'class': 'mat-badge',
        '[class.mat-badge-overlap]': 'overlap',
        '[class.mat-badge-above]': 'isAbove()',
        '[class.mat-badge-below]': '!isAbove()',
        '[class.mat-badge-before]': '!isAfter()',
        '[class.mat-badge-after]': 'isAfter()',
        '[class.mat-badge-small]': 'size === "small"',
        '[class.mat-badge-medium]': 'size === "medium"',
        '[class.mat-badge-large]': 'size === "large"',
        '[class.mat-badge-hidden]': 'hidden || !content',
        '[class.mat-badge-disabled]': 'disabled'
      }
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.NgZone
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.ElementRef
    }, {
      type: _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_3__.AriaDescriber
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Renderer2
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Inject,
        args: [_angular_core__WEBPACK_IMPORTED_MODULE_2__.ANIMATION_MODULE_TYPE]
      }]
    }];
  }, {
    color: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Input,
      args: ['matBadgeColor']
    }],
    overlap: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Input,
      args: ['matBadgeOverlap']
    }],
    position: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Input,
      args: ['matBadgePosition']
    }],
    content: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Input,
      args: ['matBadge']
    }],
    description: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Input,
      args: ['matBadgeDescription']
    }],
    size: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Input,
      args: ['matBadgeSize']
    }],
    hidden: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Input,
      args: ['matBadgeHidden']
    }]
  });
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class MatBadgeModule {}
MatBadgeModule.ɵfac = function MatBadgeModule_Factory(t) {
  return new (t || MatBadgeModule)();
};
MatBadgeModule.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: MatBadgeModule
});
MatBadgeModule.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  imports: [_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_3__.A11yModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_0__.MatCommonModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_0__.MatCommonModule]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵsetClassMetadata"](MatBadgeModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule,
    args: [{
      imports: [_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_3__.A11yModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_0__.MatCommonModule],
      exports: [MatBadge, _angular_material_core__WEBPACK_IMPORTED_MODULE_0__.MatCommonModule],
      declarations: [MatBadge]
    }]
  }], null, null);
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Generated bundle index. Do not edit.
 */


//# sourceMappingURL=badge.mjs.map

/***/ }),

/***/ 848242:
/*!******************************************************************!*\
  !*** ./node_modules/@angular/material/fesm2020/bottom-sheet.mjs ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MAT_BOTTOM_SHEET_DATA": () => (/* binding */ MAT_BOTTOM_SHEET_DATA),
/* harmony export */   "MAT_BOTTOM_SHEET_DEFAULT_OPTIONS": () => (/* binding */ MAT_BOTTOM_SHEET_DEFAULT_OPTIONS),
/* harmony export */   "MatBottomSheet": () => (/* binding */ MatBottomSheet),
/* harmony export */   "MatBottomSheetConfig": () => (/* binding */ MatBottomSheetConfig),
/* harmony export */   "MatBottomSheetContainer": () => (/* binding */ MatBottomSheetContainer),
/* harmony export */   "MatBottomSheetModule": () => (/* binding */ MatBottomSheetModule),
/* harmony export */   "MatBottomSheetRef": () => (/* binding */ MatBottomSheetRef),
/* harmony export */   "matBottomSheetAnimations": () => (/* binding */ matBottomSheetAnimations)
/* harmony export */ });
/* harmony import */ var _angular_cdk_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/dialog */ 997855);
/* harmony import */ var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/cdk/portal */ 984080);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/core */ 447873);
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/a11y */ 212687);
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/layout */ 662289);
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/overlay */ 598184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/animations */ 837340);
/* harmony import */ var _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/cdk/keycodes */ 329521);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ 56451);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ 439300);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ 895698);

















/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Animations used by the Material bottom sheet. */
function MatBottomSheetContainer_ng_template_0_Template(rf, ctx) {}
const matBottomSheetAnimations = {
  /** Animation that shows and hides a bottom sheet. */
  bottomSheetState: (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('state', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('void, hidden', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
    transform: 'translateY(100%)'
  })), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('visible', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
    transform: 'translateY(0%)'
  })), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('visible => void, visible => hidden', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.group)([(0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)(`${_angular_material_core__WEBPACK_IMPORTED_MODULE_1__.AnimationDurations.COMPLEX} ${_angular_material_core__WEBPACK_IMPORTED_MODULE_1__.AnimationCurves.ACCELERATION_CURVE}`), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.query)('@*', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animateChild)(), {
    optional: true
  })])), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('void => visible', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.group)([(0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)(`${_angular_material_core__WEBPACK_IMPORTED_MODULE_1__.AnimationDurations.EXITING} ${_angular_material_core__WEBPACK_IMPORTED_MODULE_1__.AnimationCurves.DECELERATION_CURVE}`), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.query)('@*', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animateChild)(), {
    optional: true
  })]))])
};

/**
 * Internal component that wraps user-provided bottom sheet content.
 * @docs-private
 */
class MatBottomSheetContainer extends _angular_cdk_dialog__WEBPACK_IMPORTED_MODULE_2__.CdkDialogContainer {
  constructor(elementRef, focusTrapFactory, document, config, checker, ngZone, overlayRef, breakpointObserver, _changeDetectorRef, focusMonitor) {
    super(elementRef, focusTrapFactory, document, config, checker, ngZone, overlayRef, focusMonitor);
    this._changeDetectorRef = _changeDetectorRef;
    /** The state of the bottom sheet animations. */
    this._animationState = 'void';
    /** Emits whenever the state of the animation changes. */
    this._animationStateChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_3__.EventEmitter();
    this._breakpointSubscription = breakpointObserver.observe([_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_4__.Breakpoints.Medium, _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_4__.Breakpoints.Large, _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_4__.Breakpoints.XLarge]).subscribe(() => {
      this._toggleClass('mat-bottom-sheet-container-medium', breakpointObserver.isMatched(_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_4__.Breakpoints.Medium));
      this._toggleClass('mat-bottom-sheet-container-large', breakpointObserver.isMatched(_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_4__.Breakpoints.Large));
      this._toggleClass('mat-bottom-sheet-container-xlarge', breakpointObserver.isMatched(_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_4__.Breakpoints.XLarge));
    });
  }
  /** Begin animation of bottom sheet entrance into view. */
  enter() {
    if (!this._destroyed) {
      this._animationState = 'visible';
      this._changeDetectorRef.detectChanges();
    }
  }
  /** Begin animation of the bottom sheet exiting from view. */
  exit() {
    if (!this._destroyed) {
      this._animationState = 'hidden';
      this._changeDetectorRef.markForCheck();
    }
  }
  ngOnDestroy() {
    super.ngOnDestroy();
    this._breakpointSubscription.unsubscribe();
    this._destroyed = true;
  }
  _onAnimationDone(event) {
    if (event.toState === 'visible') {
      this._trapFocus();
    }
    this._animationStateChanged.emit(event);
  }
  _onAnimationStart(event) {
    this._animationStateChanged.emit(event);
  }
  _captureInitialFocus() {}
  _toggleClass(cssClass, add) {
    this._elementRef.nativeElement.classList.toggle(cssClass, add);
  }
}
MatBottomSheetContainer.ɵfac = function MatBottomSheetContainer_Factory(t) {
  return new (t || MatBottomSheetContainer)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_5__.FocusTrapFactory), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_6__.DOCUMENT, 8), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_cdk_dialog__WEBPACK_IMPORTED_MODULE_2__.DialogConfig), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_5__.InteractivityChecker), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_7__.OverlayRef), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_4__.BreakpointObserver), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_5__.FocusMonitor));
};
MatBottomSheetContainer.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: MatBottomSheetContainer,
  selectors: [["mat-bottom-sheet-container"]],
  hostAttrs: ["tabindex", "-1", 1, "mat-bottom-sheet-container"],
  hostVars: 4,
  hostBindings: function MatBottomSheetContainer_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsyntheticHostListener"]("@state.start", function MatBottomSheetContainer_animation_state_start_HostBindingHandler($event) {
        return ctx._onAnimationStart($event);
      })("@state.done", function MatBottomSheetContainer_animation_state_done_HostBindingHandler($event) {
        return ctx._onAnimationDone($event);
      });
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵattribute"]("role", ctx._config.role)("aria-modal", ctx._config.ariaModal)("aria-label", ctx._config.ariaLabel);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsyntheticHostProperty"]("@state", ctx._animationState);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵInheritDefinitionFeature"]],
  decls: 1,
  vars: 0,
  consts: [["cdkPortalOutlet", ""]],
  template: function MatBottomSheetContainer_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, MatBottomSheetContainer_ng_template_0_Template, 0, 0, "ng-template", 0);
    }
  },
  dependencies: [_angular_cdk_portal__WEBPACK_IMPORTED_MODULE_8__.CdkPortalOutlet],
  styles: [".mat-bottom-sheet-container{padding:8px 16px;min-width:100vw;box-sizing:border-box;display:block;outline:0;max-height:80vh;overflow:auto}.cdk-high-contrast-active .mat-bottom-sheet-container{outline:1px solid}.mat-bottom-sheet-container-xlarge,.mat-bottom-sheet-container-large,.mat-bottom-sheet-container-medium{border-top-left-radius:4px;border-top-right-radius:4px}.mat-bottom-sheet-container-medium{min-width:384px;max-width:calc(100vw - 128px)}.mat-bottom-sheet-container-large{min-width:512px;max-width:calc(100vw - 256px)}.mat-bottom-sheet-container-xlarge{min-width:576px;max-width:calc(100vw - 384px)}"],
  encapsulation: 2,
  data: {
    animation: [matBottomSheetAnimations.bottomSheetState]
  }
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵsetClassMetadata"](MatBottomSheetContainer, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Component,
    args: [{
      selector: 'mat-bottom-sheet-container',
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_3__.ChangeDetectionStrategy.Default,
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_3__.ViewEncapsulation.None,
      animations: [matBottomSheetAnimations.bottomSheetState],
      host: {
        'class': 'mat-bottom-sheet-container',
        'tabindex': '-1',
        '[attr.role]': '_config.role',
        '[attr.aria-modal]': '_config.ariaModal',
        '[attr.aria-label]': '_config.ariaLabel',
        '[@state]': '_animationState',
        '(@state.start)': '_onAnimationStart($event)',
        '(@state.done)': '_onAnimationDone($event)'
      },
      template: "<ng-template cdkPortalOutlet></ng-template>\r\n",
      styles: [".mat-bottom-sheet-container{padding:8px 16px;min-width:100vw;box-sizing:border-box;display:block;outline:0;max-height:80vh;overflow:auto}.cdk-high-contrast-active .mat-bottom-sheet-container{outline:1px solid}.mat-bottom-sheet-container-xlarge,.mat-bottom-sheet-container-large,.mat-bottom-sheet-container-medium{border-top-left-radius:4px;border-top-right-radius:4px}.mat-bottom-sheet-container-medium{min-width:384px;max-width:calc(100vw - 128px)}.mat-bottom-sheet-container-large{min-width:512px;max-width:calc(100vw - 256px)}.mat-bottom-sheet-container-xlarge{min-width:576px;max-width:calc(100vw - 384px)}"]
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.ElementRef
    }, {
      type: _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_5__.FocusTrapFactory
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Inject,
        args: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.DOCUMENT]
      }]
    }, {
      type: _angular_cdk_dialog__WEBPACK_IMPORTED_MODULE_2__.DialogConfig
    }, {
      type: _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_5__.InteractivityChecker
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.NgZone
    }, {
      type: _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_7__.OverlayRef
    }, {
      type: _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_4__.BreakpointObserver
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.ChangeDetectorRef
    }, {
      type: _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_5__.FocusMonitor
    }];
  }, null);
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class MatBottomSheetModule {}
MatBottomSheetModule.ɵfac = function MatBottomSheetModule_Factory(t) {
  return new (t || MatBottomSheetModule)();
};
MatBottomSheetModule.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
  type: MatBottomSheetModule
});
MatBottomSheetModule.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
  imports: [_angular_cdk_dialog__WEBPACK_IMPORTED_MODULE_2__.DialogModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_1__.MatCommonModule, _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_8__.PortalModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_1__.MatCommonModule]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵsetClassMetadata"](MatBottomSheetModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule,
    args: [{
      imports: [_angular_cdk_dialog__WEBPACK_IMPORTED_MODULE_2__.DialogModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_1__.MatCommonModule, _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_8__.PortalModule],
      exports: [MatBottomSheetContainer, _angular_material_core__WEBPACK_IMPORTED_MODULE_1__.MatCommonModule],
      declarations: [MatBottomSheetContainer]
    }]
  }], null, null);
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Injection token that can be used to access the data that was passed in to a bottom sheet. */
const MAT_BOTTOM_SHEET_DATA = new _angular_core__WEBPACK_IMPORTED_MODULE_3__.InjectionToken('MatBottomSheetData');
/**
 * Configuration used when opening a bottom sheet.
 */
class MatBottomSheetConfig {
  constructor() {
    /** Data being injected into the child component. */
    this.data = null;
    /** Whether the bottom sheet has a backdrop. */
    this.hasBackdrop = true;
    /** Whether the user can use escape or clicking outside to close the bottom sheet. */
    this.disableClose = false;
    /** Aria label to assign to the bottom sheet element. */
    this.ariaLabel = null;
    /** Whether this is a modal bottom sheet. Used to set the `aria-modal` attribute. */
    this.ariaModal = true;
    /**
     * Whether the bottom sheet should close when the user goes backwards/forwards in history.
     * Note that this usually doesn't include clicking on links (unless the user is using
     * the `HashLocationStrategy`).
     */
    this.closeOnNavigation = true;
    // Note that this is set to 'dialog' by default, because while the a11y recommendations
    // are to focus the first focusable element, doing so prevents screen readers from reading out the
    // rest of the bottom sheet content.
    /**
     * Where the bottom sheet should focus on open.
     * @breaking-change 14.0.0 Remove boolean option from autoFocus. Use string or
     * AutoFocusTarget instead.
     */
    this.autoFocus = 'dialog';
    /**
     * Whether the bottom sheet should restore focus to the
     * previously-focused element, after it's closed.
     */
    this.restoreFocus = true;
  }
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Reference to a bottom sheet dispatched from the bottom sheet service.
 */
class MatBottomSheetRef {
  /** Instance of the component making up the content of the bottom sheet. */
  get instance() {
    return this._ref.componentInstance;
  }
  constructor(_ref, config, containerInstance) {
    this._ref = _ref;
    /** Subject for notifying the user that the bottom sheet has opened and appeared. */
    this._afterOpened = new rxjs__WEBPACK_IMPORTED_MODULE_9__.Subject();
    this.containerInstance = containerInstance;
    this.disableClose = config.disableClose;
    // Emit when opening animation completes
    containerInstance._animationStateChanged.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.filter)(event => event.phaseName === 'done' && event.toState === 'visible'), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.take)(1)).subscribe(() => {
      this._afterOpened.next();
      this._afterOpened.complete();
    });
    // Dispose overlay when closing animation is complete
    containerInstance._animationStateChanged.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.filter)(event => event.phaseName === 'done' && event.toState === 'hidden'), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.take)(1)).subscribe(() => {
      clearTimeout(this._closeFallbackTimeout);
      this._ref.close(this._result);
    });
    _ref.overlayRef.detachments().subscribe(() => {
      this._ref.close(this._result);
    });
    (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.merge)(this.backdropClick(), this.keydownEvents().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.filter)(event => event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_13__.ESCAPE))).subscribe(event => {
      if (!this.disableClose && (event.type !== 'keydown' || !(0,_angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_13__.hasModifierKey)(event))) {
        event.preventDefault();
        this.dismiss();
      }
    });
  }
  /**
   * Dismisses the bottom sheet.
   * @param result Data to be passed back to the bottom sheet opener.
   */
  dismiss(result) {
    if (!this.containerInstance) {
      return;
    }
    // Transition the backdrop in parallel to the bottom sheet.
    this.containerInstance._animationStateChanged.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.filter)(event => event.phaseName === 'start'), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.take)(1)).subscribe(event => {
      // The logic that disposes of the overlay depends on the exit animation completing, however
      // it isn't guaranteed if the parent view is destroyed while it's running. Add a fallback
      // timeout which will clean everything up if the animation hasn't fired within the specified
      // amount of time plus 100ms. We don't need to run this outside the NgZone, because for the
      // vast majority of cases the timeout will have been cleared before it has fired.
      this._closeFallbackTimeout = setTimeout(() => {
        this._ref.close(this._result);
      }, event.totalTime + 100);
      this._ref.overlayRef.detachBackdrop();
    });
    this._result = result;
    this.containerInstance.exit();
    this.containerInstance = null;
  }
  /** Gets an observable that is notified when the bottom sheet is finished closing. */
  afterDismissed() {
    return this._ref.closed;
  }
  /** Gets an observable that is notified when the bottom sheet has opened and appeared. */
  afterOpened() {
    return this._afterOpened;
  }
  /**
   * Gets an observable that emits when the overlay's backdrop has been clicked.
   */
  backdropClick() {
    return this._ref.backdropClick;
  }
  /**
   * Gets an observable that emits when keydown events are targeted on the overlay.
   */
  keydownEvents() {
    return this._ref.keydownEvents;
  }
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Injection token that can be used to specify default bottom sheet options. */
const MAT_BOTTOM_SHEET_DEFAULT_OPTIONS = new _angular_core__WEBPACK_IMPORTED_MODULE_3__.InjectionToken('mat-bottom-sheet-default-options');
/**
 * Service to trigger Material Design bottom sheets.
 */
class MatBottomSheet {
  /** Reference to the currently opened bottom sheet. */
  get _openedBottomSheetRef() {
    const parent = this._parentBottomSheet;
    return parent ? parent._openedBottomSheetRef : this._bottomSheetRefAtThisLevel;
  }
  set _openedBottomSheetRef(value) {
    if (this._parentBottomSheet) {
      this._parentBottomSheet._openedBottomSheetRef = value;
    } else {
      this._bottomSheetRefAtThisLevel = value;
    }
  }
  constructor(_overlay, injector, _parentBottomSheet, _defaultOptions) {
    this._overlay = _overlay;
    this._parentBottomSheet = _parentBottomSheet;
    this._defaultOptions = _defaultOptions;
    this._bottomSheetRefAtThisLevel = null;
    this._dialog = injector.get(_angular_cdk_dialog__WEBPACK_IMPORTED_MODULE_2__.Dialog);
  }
  open(componentOrTemplateRef, config) {
    const _config = {
      ...(this._defaultOptions || new MatBottomSheetConfig()),
      ...config
    };
    let ref;
    this._dialog.open(componentOrTemplateRef, {
      ..._config,
      // Disable closing since we need to sync it up to the animation ourselves.
      disableClose: true,
      // Disable closing on detachments so that we can sync up the animation.
      closeOnOverlayDetachments: false,
      maxWidth: '100%',
      container: MatBottomSheetContainer,
      scrollStrategy: _config.scrollStrategy || this._overlay.scrollStrategies.block(),
      positionStrategy: this._overlay.position().global().centerHorizontally().bottom('0'),
      templateContext: () => ({
        bottomSheetRef: ref
      }),
      providers: (cdkRef, _cdkConfig, container) => {
        ref = new MatBottomSheetRef(cdkRef, _config, container);
        return [{
          provide: MatBottomSheetRef,
          useValue: ref
        }, {
          provide: MAT_BOTTOM_SHEET_DATA,
          useValue: _config.data
        }];
      }
    });
    // When the bottom sheet is dismissed, clear the reference to it.
    ref.afterDismissed().subscribe(() => {
      // Clear the bottom sheet ref if it hasn't already been replaced by a newer one.
      if (this._openedBottomSheetRef === ref) {
        this._openedBottomSheetRef = null;
      }
    });
    if (this._openedBottomSheetRef) {
      // If a bottom sheet is already in view, dismiss it and enter the
      // new bottom sheet after exit animation is complete.
      this._openedBottomSheetRef.afterDismissed().subscribe(() => ref.containerInstance?.enter());
      this._openedBottomSheetRef.dismiss();
    } else {
      // If no bottom sheet is in view, enter the new bottom sheet.
      ref.containerInstance.enter();
    }
    this._openedBottomSheetRef = ref;
    return ref;
  }
  /**
   * Dismisses the currently-visible bottom sheet.
   * @param result Data to pass to the bottom sheet instance.
   */
  dismiss(result) {
    if (this._openedBottomSheetRef) {
      this._openedBottomSheetRef.dismiss(result);
    }
  }
  ngOnDestroy() {
    if (this._bottomSheetRefAtThisLevel) {
      this._bottomSheetRefAtThisLevel.dismiss();
    }
  }
}
MatBottomSheet.ɵfac = function MatBottomSheet_Factory(t) {
  return new (t || MatBottomSheet)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_7__.Overlay), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](MatBottomSheet, 12), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, 8));
};
MatBottomSheet.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
  token: MatBottomSheet,
  factory: MatBottomSheet.ɵfac,
  providedIn: MatBottomSheetModule
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵsetClassMetadata"](MatBottomSheet, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Injectable,
    args: [{
      providedIn: MatBottomSheetModule
    }]
  }], function () {
    return [{
      type: _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_7__.Overlay
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Injector
    }, {
      type: MatBottomSheet,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.SkipSelf
      }]
    }, {
      type: MatBottomSheetConfig,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Inject,
        args: [MAT_BOTTOM_SHEET_DEFAULT_OPTIONS]
      }]
    }];
  }, null);
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Generated bundle index. Do not edit.
 */


//# sourceMappingURL=bottom-sheet.mjs.map

/***/ }),

/***/ 777331:
/*!***********************************************************!*\
  !*** ./node_modules/@angular/material/fesm2020/chips.mjs ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MAT_CHIP": () => (/* binding */ MAT_CHIP),
/* harmony export */   "MAT_CHIPS_DEFAULT_OPTIONS": () => (/* binding */ MAT_CHIPS_DEFAULT_OPTIONS),
/* harmony export */   "MAT_CHIP_AVATAR": () => (/* binding */ MAT_CHIP_AVATAR),
/* harmony export */   "MAT_CHIP_LISTBOX_CONTROL_VALUE_ACCESSOR": () => (/* binding */ MAT_CHIP_LISTBOX_CONTROL_VALUE_ACCESSOR),
/* harmony export */   "MAT_CHIP_REMOVE": () => (/* binding */ MAT_CHIP_REMOVE),
/* harmony export */   "MAT_CHIP_TRAILING_ICON": () => (/* binding */ MAT_CHIP_TRAILING_ICON),
/* harmony export */   "MatChip": () => (/* binding */ MatChip),
/* harmony export */   "MatChipAvatar": () => (/* binding */ MatChipAvatar),
/* harmony export */   "MatChipEditInput": () => (/* binding */ MatChipEditInput),
/* harmony export */   "MatChipGrid": () => (/* binding */ MatChipGrid),
/* harmony export */   "MatChipGridChange": () => (/* binding */ MatChipGridChange),
/* harmony export */   "MatChipInput": () => (/* binding */ MatChipInput),
/* harmony export */   "MatChipListbox": () => (/* binding */ MatChipListbox),
/* harmony export */   "MatChipListboxChange": () => (/* binding */ MatChipListboxChange),
/* harmony export */   "MatChipOption": () => (/* binding */ MatChipOption),
/* harmony export */   "MatChipRemove": () => (/* binding */ MatChipRemove),
/* harmony export */   "MatChipRow": () => (/* binding */ MatChipRow),
/* harmony export */   "MatChipSelectionChange": () => (/* binding */ MatChipSelectionChange),
/* harmony export */   "MatChipSet": () => (/* binding */ MatChipSet),
/* harmony export */   "MatChipTrailingIcon": () => (/* binding */ MatChipTrailingIcon),
/* harmony export */   "MatChipsModule": () => (/* binding */ MatChipsModule)
/* harmony export */ });
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/coercion */ 121281);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/core */ 447873);
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/a11y */ 212687);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 56451);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 895698);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 782722);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ 468675);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ 763900);
/* harmony import */ var _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/keycodes */ 329521);
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/cdk/bidi */ 640445);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/forms */ 224006);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/form-field */ 759549);



















/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Injection token to be used to override the default options for the chips module. */
function MatChip_span_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](1, 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function MatChip_span_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](1, 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
const _c0 = ["*", [["mat-chip-avatar"], ["", "matChipAvatar", ""]], [["mat-chip-trailing-icon"], ["", "matChipRemove", ""], ["", "matChipTrailingIcon", ""]]];
const _c1 = ["*", "mat-chip-avatar, [matChipAvatar]", "mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]"];
function MatChipOption_span_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](1, 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "svg", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "path", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
  }
}
function MatChipOption_span_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](1, 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
const _c2 = ".mdc-evolution-chip,.mdc-evolution-chip__cell,.mdc-evolution-chip__action{display:inline-flex;align-items:center}.mdc-evolution-chip{position:relative;max-width:100%}.mdc-evolution-chip .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-evolution-chip__cell,.mdc-evolution-chip__action{height:100%}.mdc-evolution-chip__cell--primary{overflow-x:hidden}.mdc-evolution-chip__cell--trailing{flex:1 0 auto}.mdc-evolution-chip__action{align-items:center;background:none;border:none;box-sizing:content-box;cursor:pointer;display:inline-flex;justify-content:center;outline:none;padding:0;text-decoration:none;color:inherit}.mdc-evolution-chip__action--presentational{cursor:auto}.mdc-evolution-chip--disabled,.mdc-evolution-chip__action:disabled{pointer-events:none}.mdc-evolution-chip__action--primary{overflow-x:hidden}.mdc-evolution-chip__action--trailing{position:relative;overflow:visible}.mdc-evolution-chip__action--primary:before{box-sizing:border-box;content:\"\";height:100%;left:0;position:absolute;pointer-events:none;top:0;width:100%;z-index:1}.mdc-evolution-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-evolution-chip__action-touch{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}.mdc-evolution-chip__text-label{white-space:nowrap;user-select:none;text-overflow:ellipsis;overflow:hidden}.mdc-evolution-chip__graphic{align-items:center;display:inline-flex;justify-content:center;overflow:hidden;pointer-events:none;position:relative;flex:1 0 auto}.mdc-evolution-chip__checkmark{position:absolute;opacity:0;top:50%;left:50%}.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--selected):not(.mdc-evolution-chip--with-primary-icon) .mdc-evolution-chip__graphic{width:0}.mdc-evolution-chip__checkmark-background{opacity:0}.mdc-evolution-chip__checkmark-svg{display:block}.mdc-evolution-chip__checkmark-path{stroke-width:2px;stroke-dasharray:29.7833385;stroke-dashoffset:29.7833385;stroke:currentColor}.mdc-evolution-chip--selecting .mdc-evolution-chip__graphic{transition:width 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark{transition:transform 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);transform:translate(-75%, -50%)}.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark-path{transition:stroke-dashoffset 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting .mdc-evolution-chip__graphic{transition:width 100ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting .mdc-evolution-chip__checkmark{transition:opacity 50ms 0ms linear,transform 100ms 0ms cubic-bezier(0.4, 0, 0.2, 1);transform:translate(-75%, -50%)}.mdc-evolution-chip--deselecting .mdc-evolution-chip__checkmark-path{stroke-dashoffset:0}.mdc-evolution-chip--selecting-with-primary-icon .mdc-evolution-chip__icon--primary{transition:opacity 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--selecting-with-primary-icon .mdc-evolution-chip__checkmark-path{transition:stroke-dashoffset 150ms 75ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting-with-primary-icon .mdc-evolution-chip__icon--primary{transition:opacity 150ms 75ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting-with-primary-icon .mdc-evolution-chip__checkmark{transition:opacity 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);transform:translate(-50%, -50%)}.mdc-evolution-chip--deselecting-with-primary-icon .mdc-evolution-chip__checkmark-path{stroke-dashoffset:0}.mdc-evolution-chip--selected .mdc-evolution-chip__icon--primary{opacity:0}.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark{transform:translate(-50%, -50%);opacity:1}.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark-path{stroke-dashoffset:0}@keyframes mdc-evolution-chip-enter{from{transform:scale(0.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-evolution-chip--enter{animation:mdc-evolution-chip-enter 100ms 0ms cubic-bezier(0, 0, 0.2, 1)}@keyframes mdc-evolution-chip-exit{from{opacity:1}to{opacity:0}}.mdc-evolution-chip--exit{animation:mdc-evolution-chip-exit 75ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-evolution-chip--hidden{opacity:0;pointer-events:none;transition:width 150ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mat-mdc-standard-chip .mdc-evolution-chip__checkmark{height:20px;width:20px}.mat-mdc-standard-chip .mdc-evolution-chip__icon--trailing{height:18px;width:18px;font-size:18px}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary{padding-left:12px;padding-right:12px}[dir=rtl] .mat-mdc-standard-chip .mdc-evolution-chip__action--primary,.mat-mdc-standard-chip .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:12px;padding-right:12px}.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic{padding-left:6px;padding-right:6px}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic,.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic[dir=rtl]{padding-left:6px;padding-right:6px}.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary{padding-left:0;padding-right:12px}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary,.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:12px;padding-right:0}.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing{padding-left:8px;padding-right:8px}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing,.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing[dir=rtl]{padding-left:8px;padding-right:8px}.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing{left:8px;right:initial}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing,.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing[dir=rtl]{left:initial;right:8px}.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary{padding-left:12px;padding-right:0}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary,.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:0;padding-right:12px}.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic{padding-left:6px;padding-right:6px}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic,.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic[dir=rtl]{padding-left:6px;padding-right:6px}.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing{padding-left:8px;padding-right:8px}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing,.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing[dir=rtl]{padding-left:8px;padding-right:8px}.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing{left:8px;right:initial}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing,.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing[dir=rtl]{left:initial;right:8px}.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary{padding-left:0;padding-right:0}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary,.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:0;padding-right:0}.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__checkmark{color:var(--mdc-chip-with-icon-selected-icon-color, currentColor)}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic{padding-left:4px;padding-right:8px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic[dir=rtl]{padding-left:8px;padding-right:4px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary{padding-left:0;padding-right:12px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:12px;padding-right:0}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic{padding-left:4px;padding-right:8px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic[dir=rtl]{padding-left:8px;padding-right:4px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing{padding-left:8px;padding-right:8px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing[dir=rtl]{padding-left:8px;padding-right:8px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing{left:8px;right:initial}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing[dir=rtl]{left:initial;right:8px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary{padding-left:0;padding-right:0}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--with-primary-icon){--mdc-chip-graphic-selected-width:24px}.mdc-evolution-chip--with-avatar .mdc-evolution-chip__graphic{height:24px;width:24px;font-size:24px}.mdc-evolution-chip--with-avatar .mdc-evolution-chip__icon--primary{height:24px;width:24px;font-size:24px}.mat-mdc-standard-chip{-webkit-tap-highlight-color:rgba(0,0,0,0);border-radius:var(--mdc-chip-container-shape-radius, 16px 16px 16px 16px);height:var(--mdc-chip-container-height, 32px)}.mat-mdc-standard-chip .mdc-evolution-chip__ripple{border-radius:var(--mdc-chip-container-shape-radius, 16px 16px 16px 16px)}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary:before{border-radius:var(--mdc-chip-container-shape-radius, 16px 16px 16px 16px)}.mat-mdc-standard-chip .mdc-evolution-chip__icon--primary{border-radius:var(--mdc-chip-with-avatar-avatar-shape-radius, 14px 14px 14px 14px)}.mat-mdc-standard-chip.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--with-primary-icon){--mdc-chip-graphic-selected-width:var(--mdc-chip-with-avatar-avatar-size, 28px)}.mat-mdc-standard-chip .mdc-evolution-chip__graphic{height:var(--mdc-chip-with-avatar-avatar-size, 28px);width:var(--mdc-chip-with-avatar-avatar-size, 28px);font-size:var(--mdc-chip-with-avatar-avatar-size, 28px)}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary:before{border-width:var(--mdc-chip-outline-width, 1px)}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary:before{border-width:var(--mdc-chip-flat-outline-width, 1px)}.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__action--primary:before{border-width:var(--mdc-chip-flat-selected-outline-width, 0)}.mat-mdc-standard-chip:not(.mdc-evolution-chip--selected) .mdc-evolution-chip__action--primary:before{border-width:var(--mdc-chip-flat-unselected-outline-width, 1px)}.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled){background-color:var(--mdc-chip-elevated-container-color, transparent)}.mat-mdc-standard-chip.mdc-evolution-chip--disabled{background-color:var(--mdc-chip-elevated-disabled-container-color, transparent)}.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled{background-color:var(--mdc-chip-elevated-disabled-container-color, transparent)}.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__text-label{color:var(--mdc-chip-label-text-color, currentColor)}.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label{color:var(--mdc-chip-disabled-label-text-color, currentColor)}.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label{color:var(--mdc-chip-disabled-label-text-color, currentColor)}.mat-mdc-standard-chip .mdc-evolution-chip__icon--primary{height:var(--mdc-chip-with-icon-icon-size, 18px);width:var(--mdc-chip-with-icon-icon-size, 18px);font-size:var(--mdc-chip-with-icon-icon-size, 18px)}.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__icon--primary{color:var(--mdc-chip-with-icon-icon-color, currentColor)}.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--primary{color:var(--mdc-chip-with-icon-disabled-icon-color, currentColor)}.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__checkmark{color:var(--mdc-chip-with-icon-selected-icon-color, currentColor)}.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__checkmark{color:var(--mdc-chip-with-icon-disabled-icon-color, currentColor)}.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__icon--trailing{color:var(--mdc-chip-with-trailing-icon-trailing-icon-color, currentColor)}.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing{color:var(--mdc-chip-with-trailing-icon-disabled-trailing-icon-color, currentColor)}.cdk-high-contrast-active .mat-mdc-standard-chip{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-standard-chip .mdc-evolution-chip__checkmark-path{stroke:CanvasText !important}.mat-mdc-standard-chip.mdc-evolution-chip--disabled{opacity:.4}.mat-mdc-standard-chip .mdc-evolution-chip__cell--primary,.mat-mdc-standard-chip .mdc-evolution-chip__action--primary,.mat-mdc-standard-chip .mat-mdc-chip-action-label{overflow:visible}.mat-mdc-standard-chip .mdc-evolution-chip__cell--primary{width:100%}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary{font:inherit;letter-spacing:inherit;white-space:inherit}.mat-mdc-standard-chip .mat-mdc-chip-graphic,.mat-mdc-standard-chip .mat-mdc-chip-trailing-icon{box-sizing:content-box}.mat-mdc-standard-chip._mat-animation-noopable,.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__graphic,.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark,.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark-path{transition-duration:1ms;animation-duration:1ms}.mat-mdc-basic-chip .mdc-evolution-chip__action--primary{font:inherit}.mat-mdc-chip-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;opacity:0;border-radius:inherit;transition:opacity 150ms linear}._mat-animation-noopable .mat-mdc-chip-focus-overlay{transition:none}.mat-mdc-basic-chip .mat-mdc-chip-focus-overlay{display:none}.mat-mdc-chip:hover .mat-mdc-chip-focus-overlay{opacity:.04}.mat-mdc-chip.cdk-focused .mat-mdc-chip-focus-overlay{opacity:.12}.mat-mdc-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-chip-avatar{text-align:center;line-height:1;color:var(--mdc-chip-with-icon-icon-color, currentColor)}.mat-mdc-chip{position:relative;z-index:0}.mat-mdc-chip-action-label{text-align:left;z-index:1}[dir=rtl] .mat-mdc-chip-action-label{text-align:right}.mat-mdc-chip.mdc-evolution-chip--with-trailing-action .mat-mdc-chip-action-label{position:relative}.mat-mdc-chip-action-label .mat-mdc-chip-primary-focus-indicator{position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none}.mat-mdc-chip-action-label .mat-mdc-focus-indicator::before{margin:calc(calc(var(--mat-mdc-focus-indicator-border-width, 3px) + 2px) * -1)}.mat-mdc-chip-remove{opacity:.54}.mat-mdc-chip-remove:focus{opacity:1}.mat-mdc-chip-remove::before{margin:calc(var(--mat-mdc-focus-indicator-border-width, 3px) * -1);left:8px;right:8px}.mat-mdc-chip-remove .mat-icon{width:inherit;height:inherit;font-size:inherit;box-sizing:content-box}.mat-chip-edit-input{cursor:text;display:inline-block;color:inherit;outline:0}.cdk-high-contrast-active .mat-mdc-chip-selected:not(.mat-mdc-chip-multiple){outline-width:3px}.mat-mdc-chip-action:focus .mat-mdc-focus-indicator::before{content:\"\"}";
function MatChipRow_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "span", 9)(2, "span", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matRippleDisabled", ctx_r0._isRippleDisabled())("matRippleCentered", ctx_r0._isRippleCentered)("matRippleTrigger", ctx_r0._elementRef.nativeElement);
  }
}
function MatChipRow_span_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function MatChipRow_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](1, 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function MatChipRow_ng_container_6_ng_content_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](0, 2, ["*ngIf", "contentEditInput; else defaultMatChipEditInput"]);
  }
}
function MatChipRow_ng_container_6_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "span", 14);
  }
}
function MatChipRow_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, MatChipRow_ng_container_6_ng_content_1_Template, 1, 0, "ng-content", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, MatChipRow_ng_container_6_ng_template_2_Template, 1, 0, "ng-template", null, 13, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](3);
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r3.contentEditInput)("ngIfElse", _r6);
  }
}
function MatChipRow_span_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](1, 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
const _c3 = [[["mat-chip-avatar"], ["", "matChipAvatar", ""]], "*", [["", "matChipEditInput", ""]], [["mat-chip-trailing-icon"], ["", "matChipRemove", ""], ["", "matChipTrailingIcon", ""]]];
const _c4 = ["mat-chip-avatar, [matChipAvatar]", "*", "[matChipEditInput]", "mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]"];
const _c5 = ["*"];
const _c6 = ".mdc-evolution-chip-set{display:flex}.mdc-evolution-chip-set:focus{outline:none}.mdc-evolution-chip-set__chips{display:flex;flex-flow:wrap;min-width:0}.mdc-evolution-chip-set--overflow .mdc-evolution-chip-set__chips{flex-flow:nowrap}.mdc-evolution-chip-set .mdc-evolution-chip-set__chips{margin-left:-8px;margin-right:0}[dir=rtl] .mdc-evolution-chip-set .mdc-evolution-chip-set__chips,.mdc-evolution-chip-set .mdc-evolution-chip-set__chips[dir=rtl]{margin-left:0;margin-right:-8px}.mdc-evolution-chip-set .mdc-evolution-chip{margin-left:8px;margin-right:0}[dir=rtl] .mdc-evolution-chip-set .mdc-evolution-chip,.mdc-evolution-chip-set .mdc-evolution-chip[dir=rtl]{margin-left:0;margin-right:8px}.mdc-evolution-chip-set .mdc-evolution-chip{margin-top:4px;margin-bottom:4px}.mat-mdc-chip-set .mdc-evolution-chip-set__chips{min-width:100%}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px;margin-left:8px}[dir=rtl] input.mat-mdc-chip-input{margin-left:0;margin-right:8px}";
const MAT_CHIPS_DEFAULT_OPTIONS = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('mat-chips-default-options');
/**
 * Injection token that can be used to reference instances of `MatChipAvatar`. It serves as
 * alternative token to the actual `MatChipAvatar` class which could cause unnecessary
 * retention of the class and its directive metadata.
 */
const MAT_CHIP_AVATAR = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('MatChipAvatar');
/**
 * Injection token that can be used to reference instances of `MatChipTrailingIcon`. It serves as
 * alternative token to the actual `MatChipTrailingIcon` class which could cause unnecessary
 * retention of the class and its directive metadata.
 */
const MAT_CHIP_TRAILING_ICON = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('MatChipTrailingIcon');
/**
 * Injection token that can be used to reference instances of `MatChipRemove`. It serves as
 * alternative token to the actual `MatChipRemove` class which could cause unnecessary
 * retention of the class and its directive metadata.
 */
const MAT_CHIP_REMOVE = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('MatChipRemove');
/**
 * Injection token used to avoid a circular dependency between the `MatChip` and `MatChipAction`.
 */
const MAT_CHIP = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('MatChip');

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class _MatChipActionBase {}
const _MatChipActionMixinBase = (0,_angular_material_core__WEBPACK_IMPORTED_MODULE_1__.mixinTabIndex)(_MatChipActionBase, -1);
/**
 * Section within a chip.
 * @docs-private
 */
class MatChipAction extends _MatChipActionMixinBase {
  /** Whether the action is disabled. */
  get disabled() {
    return this._disabled || this._parentChip.disabled;
  }
  set disabled(value) {
    this._disabled = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceBooleanProperty)(value);
  }
  /**
   * Determine the value of the disabled attribute for this chip action.
   */
  _getDisabledAttribute() {
    // When this chip action is disabled and focusing disabled chips is not permitted, return empty
    // string to indicate that disabled attribute should be included.
    return this.disabled && !this._allowFocusWhenDisabled ? '' : null;
  }
  /**
   * Determine the value of the tabindex attribute for this chip action.
   */
  _getTabindex() {
    return this.disabled && !this._allowFocusWhenDisabled || !this.isInteractive ? null : this.tabIndex.toString();
  }
  constructor(_elementRef, _parentChip) {
    super();
    this._elementRef = _elementRef;
    this._parentChip = _parentChip;
    /** Whether the action is interactive. */
    this.isInteractive = true;
    /** Whether this is the primary action in the chip. */
    this._isPrimary = true;
    this._disabled = false;
    /**
     * Private API to allow focusing this chip when it is disabled.
     */
    this._allowFocusWhenDisabled = false;
    if (_elementRef.nativeElement.nodeName === 'BUTTON') {
      _elementRef.nativeElement.setAttribute('type', 'button');
    }
  }
  focus() {
    this._elementRef.nativeElement.focus();
  }
  _handleClick(event) {
    if (!this.disabled && this.isInteractive && this._isPrimary) {
      event.preventDefault();
      this._parentChip._handlePrimaryActionInteraction();
    }
  }
  _handleKeydown(event) {
    if ((event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_3__.ENTER || event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_3__.SPACE) && !this.disabled && this.isInteractive && this._isPrimary && !this._parentChip._isEditing) {
      event.preventDefault();
      this._parentChip._handlePrimaryActionInteraction();
    }
  }
}
MatChipAction.ɵfac = function MatChipAction_Factory(t) {
  return new (t || MatChipAction)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](MAT_CHIP));
};
MatChipAction.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: MatChipAction,
  selectors: [["", "matChipAction", ""]],
  hostAttrs: [1, "mdc-evolution-chip__action", "mat-mdc-chip-action"],
  hostVars: 9,
  hostBindings: function MatChipAction_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MatChipAction_click_HostBindingHandler($event) {
        return ctx._handleClick($event);
      })("keydown", function MatChipAction_keydown_HostBindingHandler($event) {
        return ctx._handleKeydown($event);
      });
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("tabindex", ctx._getTabindex())("disabled", ctx._getDisabledAttribute())("aria-disabled", ctx.disabled);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mdc-evolution-chip__action--primary", ctx._isPrimary)("mdc-evolution-chip__action--presentational", !ctx.isInteractive)("mdc-evolution-chip__action--trailing", !ctx._isPrimary);
    }
  },
  inputs: {
    disabled: "disabled",
    tabIndex: "tabIndex",
    isInteractive: "isInteractive",
    _allowFocusWhenDisabled: "_allowFocusWhenDisabled"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatChipAction, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: '[matChipAction]',
      inputs: ['disabled', 'tabIndex'],
      host: {
        'class': 'mdc-evolution-chip__action mat-mdc-chip-action',
        '[class.mdc-evolution-chip__action--primary]': '_isPrimary',
        '[class.mdc-evolution-chip__action--presentational]': '!isInteractive',
        '[class.mdc-evolution-chip__action--trailing]': '!_isPrimary',
        '[attr.tabindex]': '_getTabindex()',
        '[attr.disabled]': '_getDisabledAttribute()',
        '[attr.aria-disabled]': 'disabled',
        '(click)': '_handleClick($event)',
        '(keydown)': '_handleKeydown($event)'
      }
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [MAT_CHIP]
      }]
    }];
  }, {
    isInteractive: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    disabled: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    _allowFocusWhenDisabled: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }]
  });
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Avatar image within a chip. */
class MatChipAvatar {}
MatChipAvatar.ɵfac = function MatChipAvatar_Factory(t) {
  return new (t || MatChipAvatar)();
};
MatChipAvatar.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: MatChipAvatar,
  selectors: [["mat-chip-avatar"], ["", "matChipAvatar", ""]],
  hostAttrs: ["role", "img", 1, "mat-mdc-chip-avatar", "mdc-evolution-chip__icon", "mdc-evolution-chip__icon--primary"],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([{
    provide: MAT_CHIP_AVATAR,
    useExisting: MatChipAvatar
  }])]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatChipAvatar, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: 'mat-chip-avatar, [matChipAvatar]',
      host: {
        'class': 'mat-mdc-chip-avatar mdc-evolution-chip__icon mdc-evolution-chip__icon--primary',
        'role': 'img'
      },
      providers: [{
        provide: MAT_CHIP_AVATAR,
        useExisting: MatChipAvatar
      }]
    }]
  }], null, null);
})();
/** Non-interactive trailing icon in a chip. */
class MatChipTrailingIcon extends MatChipAction {
  constructor() {
    super(...arguments);
    /**
     * MDC considers all trailing actions as a remove icon,
     * but we support non-interactive trailing icons.
     */
    this.isInteractive = false;
    this._isPrimary = false;
  }
}
MatChipTrailingIcon.ɵfac = /* @__PURE__ */function () {
  let ɵMatChipTrailingIcon_BaseFactory;
  return function MatChipTrailingIcon_Factory(t) {
    return (ɵMatChipTrailingIcon_BaseFactory || (ɵMatChipTrailingIcon_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](MatChipTrailingIcon)))(t || MatChipTrailingIcon);
  };
}();
MatChipTrailingIcon.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: MatChipTrailingIcon,
  selectors: [["mat-chip-trailing-icon"], ["", "matChipTrailingIcon", ""]],
  hostAttrs: ["aria-hidden", "true", 1, "mat-mdc-chip-trailing-icon", "mdc-evolution-chip__icon", "mdc-evolution-chip__icon--trailing"],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([{
    provide: MAT_CHIP_TRAILING_ICON,
    useExisting: MatChipTrailingIcon
  }]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatChipTrailingIcon, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: 'mat-chip-trailing-icon, [matChipTrailingIcon]',
      host: {
        'class': 'mat-mdc-chip-trailing-icon mdc-evolution-chip__icon mdc-evolution-chip__icon--trailing',
        'aria-hidden': 'true'
      },
      providers: [{
        provide: MAT_CHIP_TRAILING_ICON,
        useExisting: MatChipTrailingIcon
      }]
    }]
  }], null, null);
})();
/**
 * Directive to remove the parent chip when the trailing icon is clicked or
 * when the ENTER key is pressed on it.
 *
 * Recommended for use with the Material Design "cancel" icon
 * available at https://material.io/icons/#ic_cancel.
 *
 * Example:
 *
 * ```
 * <mat-chip>
 *   <mat-icon matChipRemove>cancel</mat-icon>
 * </mat-chip>
 * ```
 */
class MatChipRemove extends MatChipAction {
  constructor() {
    super(...arguments);
    this._isPrimary = false;
  }
  _handleClick(event) {
    if (!this.disabled) {
      event.stopPropagation();
      event.preventDefault();
      this._parentChip.remove();
    }
  }
  _handleKeydown(event) {
    if ((event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_3__.ENTER || event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_3__.SPACE) && !this.disabled) {
      event.stopPropagation();
      event.preventDefault();
      this._parentChip.remove();
    }
  }
}
MatChipRemove.ɵfac = /* @__PURE__ */function () {
  let ɵMatChipRemove_BaseFactory;
  return function MatChipRemove_Factory(t) {
    return (ɵMatChipRemove_BaseFactory || (ɵMatChipRemove_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](MatChipRemove)))(t || MatChipRemove);
  };
}();
MatChipRemove.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: MatChipRemove,
  selectors: [["", "matChipRemove", ""]],
  hostAttrs: ["role", "button", 1, "mat-mdc-chip-remove", "mat-mdc-chip-trailing-icon", "mat-mdc-focus-indicator", "mdc-evolution-chip__icon", "mdc-evolution-chip__icon--trailing"],
  hostVars: 1,
  hostBindings: function MatChipRemove_HostBindings(rf, ctx) {
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("aria-hidden", null);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([{
    provide: MAT_CHIP_REMOVE,
    useExisting: MatChipRemove
  }]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatChipRemove, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: '[matChipRemove]',
      host: {
        'class': 'mat-mdc-chip-remove mat-mdc-chip-trailing-icon mat-mdc-focus-indicator ' + 'mdc-evolution-chip__icon mdc-evolution-chip__icon--trailing',
        'role': 'button',
        '[attr.aria-hidden]': 'null'
      },
      providers: [{
        provide: MAT_CHIP_REMOVE,
        useExisting: MatChipRemove
      }]
    }]
  }], null, null);
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
let uid = 0;
/**
 * Boilerplate for applying mixins to MatChip.
 * @docs-private
 */
const _MatChipMixinBase = (0,_angular_material_core__WEBPACK_IMPORTED_MODULE_1__.mixinTabIndex)((0,_angular_material_core__WEBPACK_IMPORTED_MODULE_1__.mixinColor)((0,_angular_material_core__WEBPACK_IMPORTED_MODULE_1__.mixinDisableRipple)((0,_angular_material_core__WEBPACK_IMPORTED_MODULE_1__.mixinDisabled)(class {
  constructor(_elementRef) {
    this._elementRef = _elementRef;
  }
})), 'primary'), -1);
/**
 * Material design styled Chip base component. Used inside the MatChipSet component.
 *
 * Extended by MatChipOption and MatChipRow for different interaction patterns.
 */
class MatChip extends _MatChipMixinBase {
  _hasFocus() {
    return this._hasFocusInternal;
  }
  /**
   * The value of the chip. Defaults to the content inside
   * the `mat-mdc-chip-action-label` element.
   */
  get value() {
    return this._value !== undefined ? this._value : this._textElement.textContent.trim();
  }
  set value(value) {
    this._value = value;
  }
  /**
   * Determines whether or not the chip displays the remove styling and emits (removed) events.
   */
  get removable() {
    return this._removable;
  }
  set removable(value) {
    this._removable = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceBooleanProperty)(value);
  }
  /**
   * Colors the chip for emphasis as if it were selected.
   */
  get highlighted() {
    return this._highlighted;
  }
  set highlighted(value) {
    this._highlighted = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceBooleanProperty)(value);
  }
  constructor(_changeDetectorRef, elementRef, _ngZone, _focusMonitor, _document, animationMode, _globalRippleOptions, tabIndex) {
    super(elementRef);
    this._changeDetectorRef = _changeDetectorRef;
    this._ngZone = _ngZone;
    this._focusMonitor = _focusMonitor;
    this._globalRippleOptions = _globalRippleOptions;
    /** Whether the ripple is centered on the chip. */
    this._isRippleCentered = false;
    /** Emits when the chip is focused. */
    this._onFocus = new rxjs__WEBPACK_IMPORTED_MODULE_4__.Subject();
    /** Emits when the chip is blurred. */
    this._onBlur = new rxjs__WEBPACK_IMPORTED_MODULE_4__.Subject();
    /** Role for the root of the chip. */
    this.role = null;
    /** Whether the chip has focus. */
    this._hasFocusInternal = false;
    /** A unique id for the chip. If none is supplied, it will be auto-generated. */
    this.id = `mat-mdc-chip-${uid++}`;
    // TODO(#26104): Consider deprecating and using `_computeAriaAccessibleName` instead.
    // `ariaLabel` may be unnecessary, and `_computeAriaAccessibleName` only supports
    // datepicker's use case.
    /** ARIA label for the content of the chip. */
    this.ariaLabel = null;
    // TODO(#26104): Consider deprecating and using `_computeAriaAccessibleName` instead.
    // `ariaDescription` may be unnecessary, and `_computeAriaAccessibleName` only supports
    // datepicker's use case.
    /** ARIA description for the content of the chip. */
    this.ariaDescription = null;
    /** Id of a span that contains this chip's aria description. */
    this._ariaDescriptionId = `${this.id}-aria-description`;
    this._removable = true;
    this._highlighted = false;
    /** Emitted when a chip is to be removed. */
    this.removed = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    /** Emitted when the chip is destroyed. */
    this.destroyed = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    /** The unstyled chip selector for this component. */
    this.basicChipAttrName = 'mat-basic-chip';
    this._document = _document;
    this._animationsDisabled = animationMode === 'NoopAnimations';
    if (tabIndex != null) {
      this.tabIndex = parseInt(tabIndex) ?? this.defaultTabIndex;
    }
    this._monitorFocus();
  }
  ngOnInit() {
    // This check needs to happen in `ngOnInit` so the overridden value of
    // `basicChipAttrName` coming from base classes can be picked up.
    const element = this._elementRef.nativeElement;
    this._isBasicChip = element.hasAttribute(this.basicChipAttrName) || element.tagName.toLowerCase() === this.basicChipAttrName;
  }
  ngAfterViewInit() {
    this._textElement = this._elementRef.nativeElement.querySelector('.mat-mdc-chip-action-label');
    if (this._pendingFocus) {
      this._pendingFocus = false;
      this.focus();
    }
  }
  ngAfterContentInit() {
    // Since the styling depends on the presence of some
    // actions, we have to mark for check on changes.
    this._actionChanges = (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.merge)(this._allLeadingIcons.changes, this._allTrailingIcons.changes, this._allRemoveIcons.changes).subscribe(() => this._changeDetectorRef.markForCheck());
  }
  ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this._elementRef);
    this._actionChanges?.unsubscribe();
    this.destroyed.emit({
      chip: this
    });
    this.destroyed.complete();
  }
  /**
   * Allows for programmatic removal of the chip.
   *
   * Informs any listeners of the removal request. Does not remove the chip from the DOM.
   */
  remove() {
    if (this.removable) {
      this.removed.emit({
        chip: this
      });
    }
  }
  /** Whether or not the ripple should be disabled. */
  _isRippleDisabled() {
    return this.disabled || this.disableRipple || this._animationsDisabled || this._isBasicChip || !!this._globalRippleOptions?.disabled;
  }
  /** Returns whether the chip has a trailing icon. */
  _hasTrailingIcon() {
    return !!(this.trailingIcon || this.removeIcon);
  }
  /** Handles keyboard events on the chip. */
  _handleKeydown(event) {
    if (event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_3__.BACKSPACE || event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_3__.DELETE) {
      event.preventDefault();
      this.remove();
    }
  }
  /** Allows for programmatic focusing of the chip. */
  focus() {
    if (!this.disabled) {
      // If `focus` is called before `ngAfterViewInit`, we won't have access to the primary action.
      // This can happen if the consumer tries to focus a chip immediately after it is added.
      // Queue the method to be called again on init.
      if (this.primaryAction) {
        this.primaryAction.focus();
      } else {
        this._pendingFocus = true;
      }
    }
  }
  /** Gets the action that contains a specific target node. */
  _getSourceAction(target) {
    return this._getActions().find(action => {
      const element = action._elementRef.nativeElement;
      return element === target || element.contains(target);
    });
  }
  /** Gets all of the actions within the chip. */
  _getActions() {
    const result = [];
    if (this.primaryAction) {
      result.push(this.primaryAction);
    }
    if (this.removeIcon) {
      result.push(this.removeIcon);
    }
    if (this.trailingIcon) {
      result.push(this.trailingIcon);
    }
    return result;
  }
  /** Handles interactions with the primary action of the chip. */
  _handlePrimaryActionInteraction() {
    // Empty here, but is overwritten in child classes.
  }
  /** Starts the focus monitoring process on the chip. */
  _monitorFocus() {
    this._focusMonitor.monitor(this._elementRef, true).subscribe(origin => {
      const hasFocus = origin !== null;
      if (hasFocus !== this._hasFocusInternal) {
        this._hasFocusInternal = hasFocus;
        if (hasFocus) {
          this._onFocus.next({
            chip: this
          });
        } else {
          // When animations are enabled, Angular may end up removing the chip from the DOM a little
          // earlier than usual, causing it to be blurred and throwing off the logic in the chip list
          // that moves focus not the next item. To work around the issue, we defer marking the chip
          // as not focused until the next time the zone stabilizes.
          this._ngZone.onStable.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.take)(1)).subscribe(() => this._ngZone.run(() => this._onBlur.next({
            chip: this
          })));
        }
      }
    });
  }
}
MatChip.ɵfac = function MatChip_Factory(t) {
  return new (t || MatChip)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_7__.FocusMonitor), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_8__.DOCUMENT), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_MODULE_TYPE, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_core__WEBPACK_IMPORTED_MODULE_1__.MAT_RIPPLE_GLOBAL_OPTIONS, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinjectAttribute"]('tabindex'));
};
MatChip.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: MatChip,
  selectors: [["mat-basic-chip"], ["", "mat-basic-chip", ""], ["mat-chip"], ["", "mat-chip", ""]],
  contentQueries: function MatChip_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, MAT_CHIP_AVATAR, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, MAT_CHIP_TRAILING_ICON, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, MAT_CHIP_REMOVE, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, MAT_CHIP_AVATAR, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, MAT_CHIP_TRAILING_ICON, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, MAT_CHIP_REMOVE, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.leadingIcon = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.trailingIcon = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.removeIcon = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._allLeadingIcons = _t);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._allTrailingIcons = _t);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._allRemoveIcons = _t);
    }
  },
  viewQuery: function MatChip_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_angular_material_core__WEBPACK_IMPORTED_MODULE_1__.MatRipple, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](MatChipAction, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.ripple = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.primaryAction = _t.first);
    }
  },
  hostAttrs: [1, "mat-mdc-chip"],
  hostVars: 30,
  hostBindings: function MatChip_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("keydown", function MatChip_keydown_HostBindingHandler($event) {
        return ctx._handleKeydown($event);
      });
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵhostProperty"]("id", ctx.id);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("role", ctx.role)("tabindex", ctx.role ? ctx.tabIndex : null)("aria-label", ctx.ariaLabel);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mdc-evolution-chip", !ctx._isBasicChip)("mdc-evolution-chip--disabled", ctx.disabled)("mdc-evolution-chip--with-trailing-action", ctx._hasTrailingIcon())("mdc-evolution-chip--with-primary-graphic", ctx.leadingIcon)("mdc-evolution-chip--with-primary-icon", ctx.leadingIcon)("mdc-evolution-chip--with-avatar", ctx.leadingIcon)("mat-mdc-chip-with-avatar", ctx.leadingIcon)("mat-mdc-chip-highlighted", ctx.highlighted)("mat-mdc-chip-disabled", ctx.disabled)("mat-mdc-basic-chip", ctx._isBasicChip)("mat-mdc-standard-chip", !ctx._isBasicChip)("mat-mdc-chip-with-trailing-icon", ctx._hasTrailingIcon())("_mat-animation-noopable", ctx._animationsDisabled);
    }
  },
  inputs: {
    color: "color",
    disabled: "disabled",
    disableRipple: "disableRipple",
    tabIndex: "tabIndex",
    role: "role",
    id: "id",
    ariaLabel: ["aria-label", "ariaLabel"],
    ariaDescription: ["aria-description", "ariaDescription"],
    value: "value",
    removable: "removable",
    highlighted: "highlighted"
  },
  outputs: {
    removed: "removed",
    destroyed: "destroyed"
  },
  exportAs: ["matChip"],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([{
    provide: MAT_CHIP,
    useExisting: MatChip
  }]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]],
  ngContentSelectors: _c1,
  decls: 9,
  vars: 6,
  consts: [["matRipple", "", 1, "mat-mdc-chip-ripple", 3, "matRippleDisabled", "matRippleCentered", "matRippleTrigger"], [1, "mat-mdc-chip-focus-overlay"], [1, "mdc-evolution-chip__cell", "mdc-evolution-chip__cell--primary"], ["matChipAction", "", 3, "isInteractive"], ["class", "mdc-evolution-chip__graphic mat-mdc-chip-graphic", 4, "ngIf"], [1, "mdc-evolution-chip__text-label", "mat-mdc-chip-action-label"], [1, "mat-mdc-chip-primary-focus-indicator", "mat-mdc-focus-indicator"], ["class", "mdc-evolution-chip__cell mdc-evolution-chip__cell--trailing", 4, "ngIf"], [1, "mdc-evolution-chip__graphic", "mat-mdc-chip-graphic"], [1, "mdc-evolution-chip__cell", "mdc-evolution-chip__cell--trailing"]],
  template: function MatChip_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"](_c0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "span", 0)(1, "span", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span", 2)(3, "span", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, MatChip_span_4_Template, 2, 0, "span", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "span", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "span", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, MatChip_span_8_Template, 2, 0, "span", 7);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matRippleDisabled", ctx._isRippleDisabled())("matRippleCentered", ctx._isRippleCentered)("matRippleTrigger", ctx._elementRef.nativeElement);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("isInteractive", false);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.leadingIcon);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._hasTrailingIcon());
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _angular_material_core__WEBPACK_IMPORTED_MODULE_1__.MatRipple, MatChipAction],
  styles: [".mdc-evolution-chip,.mdc-evolution-chip__cell,.mdc-evolution-chip__action{display:inline-flex;align-items:center}.mdc-evolution-chip{position:relative;max-width:100%}.mdc-evolution-chip .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-evolution-chip__cell,.mdc-evolution-chip__action{height:100%}.mdc-evolution-chip__cell--primary{overflow-x:hidden}.mdc-evolution-chip__cell--trailing{flex:1 0 auto}.mdc-evolution-chip__action{align-items:center;background:none;border:none;box-sizing:content-box;cursor:pointer;display:inline-flex;justify-content:center;outline:none;padding:0;text-decoration:none;color:inherit}.mdc-evolution-chip__action--presentational{cursor:auto}.mdc-evolution-chip--disabled,.mdc-evolution-chip__action:disabled{pointer-events:none}.mdc-evolution-chip__action--primary{overflow-x:hidden}.mdc-evolution-chip__action--trailing{position:relative;overflow:visible}.mdc-evolution-chip__action--primary:before{box-sizing:border-box;content:\"\";height:100%;left:0;position:absolute;pointer-events:none;top:0;width:100%;z-index:1}.mdc-evolution-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-evolution-chip__action-touch{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}.mdc-evolution-chip__text-label{white-space:nowrap;user-select:none;text-overflow:ellipsis;overflow:hidden}.mdc-evolution-chip__graphic{align-items:center;display:inline-flex;justify-content:center;overflow:hidden;pointer-events:none;position:relative;flex:1 0 auto}.mdc-evolution-chip__checkmark{position:absolute;opacity:0;top:50%;left:50%}.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--selected):not(.mdc-evolution-chip--with-primary-icon) .mdc-evolution-chip__graphic{width:0}.mdc-evolution-chip__checkmark-background{opacity:0}.mdc-evolution-chip__checkmark-svg{display:block}.mdc-evolution-chip__checkmark-path{stroke-width:2px;stroke-dasharray:29.7833385;stroke-dashoffset:29.7833385;stroke:currentColor}.mdc-evolution-chip--selecting .mdc-evolution-chip__graphic{transition:width 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark{transition:transform 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);transform:translate(-75%, -50%)}.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark-path{transition:stroke-dashoffset 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting .mdc-evolution-chip__graphic{transition:width 100ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting .mdc-evolution-chip__checkmark{transition:opacity 50ms 0ms linear,transform 100ms 0ms cubic-bezier(0.4, 0, 0.2, 1);transform:translate(-75%, -50%)}.mdc-evolution-chip--deselecting .mdc-evolution-chip__checkmark-path{stroke-dashoffset:0}.mdc-evolution-chip--selecting-with-primary-icon .mdc-evolution-chip__icon--primary{transition:opacity 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--selecting-with-primary-icon .mdc-evolution-chip__checkmark-path{transition:stroke-dashoffset 150ms 75ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting-with-primary-icon .mdc-evolution-chip__icon--primary{transition:opacity 150ms 75ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting-with-primary-icon .mdc-evolution-chip__checkmark{transition:opacity 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);transform:translate(-50%, -50%)}.mdc-evolution-chip--deselecting-with-primary-icon .mdc-evolution-chip__checkmark-path{stroke-dashoffset:0}.mdc-evolution-chip--selected .mdc-evolution-chip__icon--primary{opacity:0}.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark{transform:translate(-50%, -50%);opacity:1}.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark-path{stroke-dashoffset:0}@keyframes mdc-evolution-chip-enter{from{transform:scale(0.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-evolution-chip--enter{animation:mdc-evolution-chip-enter 100ms 0ms cubic-bezier(0, 0, 0.2, 1)}@keyframes mdc-evolution-chip-exit{from{opacity:1}to{opacity:0}}.mdc-evolution-chip--exit{animation:mdc-evolution-chip-exit 75ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-evolution-chip--hidden{opacity:0;pointer-events:none;transition:width 150ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mat-mdc-standard-chip .mdc-evolution-chip__checkmark{height:20px;width:20px}.mat-mdc-standard-chip .mdc-evolution-chip__icon--trailing{height:18px;width:18px;font-size:18px}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary{padding-left:12px;padding-right:12px}[dir=rtl] .mat-mdc-standard-chip .mdc-evolution-chip__action--primary,.mat-mdc-standard-chip .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:12px;padding-right:12px}.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic{padding-left:6px;padding-right:6px}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic,.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic[dir=rtl]{padding-left:6px;padding-right:6px}.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary{padding-left:0;padding-right:12px}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary,.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:12px;padding-right:0}.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing{padding-left:8px;padding-right:8px}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing,.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing[dir=rtl]{padding-left:8px;padding-right:8px}.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing{left:8px;right:initial}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing,.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing[dir=rtl]{left:initial;right:8px}.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary{padding-left:12px;padding-right:0}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary,.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:0;padding-right:12px}.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic{padding-left:6px;padding-right:6px}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic,.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic[dir=rtl]{padding-left:6px;padding-right:6px}.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing{padding-left:8px;padding-right:8px}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing,.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing[dir=rtl]{padding-left:8px;padding-right:8px}.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing{left:8px;right:initial}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing,.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing[dir=rtl]{left:initial;right:8px}.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary{padding-left:0;padding-right:0}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary,.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:0;padding-right:0}.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__checkmark{color:var(--mdc-chip-with-icon-selected-icon-color, currentColor)}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic{padding-left:4px;padding-right:8px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic[dir=rtl]{padding-left:8px;padding-right:4px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary{padding-left:0;padding-right:12px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:12px;padding-right:0}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic{padding-left:4px;padding-right:8px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic[dir=rtl]{padding-left:8px;padding-right:4px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing{padding-left:8px;padding-right:8px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing[dir=rtl]{padding-left:8px;padding-right:8px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing{left:8px;right:initial}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing[dir=rtl]{left:initial;right:8px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary{padding-left:0;padding-right:0}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--with-primary-icon){--mdc-chip-graphic-selected-width:24px}.mdc-evolution-chip--with-avatar .mdc-evolution-chip__graphic{height:24px;width:24px;font-size:24px}.mdc-evolution-chip--with-avatar .mdc-evolution-chip__icon--primary{height:24px;width:24px;font-size:24px}.mat-mdc-standard-chip{-webkit-tap-highlight-color:rgba(0,0,0,0);border-radius:var(--mdc-chip-container-shape-radius, 16px 16px 16px 16px);height:var(--mdc-chip-container-height, 32px)}.mat-mdc-standard-chip .mdc-evolution-chip__ripple{border-radius:var(--mdc-chip-container-shape-radius, 16px 16px 16px 16px)}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary:before{border-radius:var(--mdc-chip-container-shape-radius, 16px 16px 16px 16px)}.mat-mdc-standard-chip .mdc-evolution-chip__icon--primary{border-radius:var(--mdc-chip-with-avatar-avatar-shape-radius, 14px 14px 14px 14px)}.mat-mdc-standard-chip.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--with-primary-icon){--mdc-chip-graphic-selected-width:var(--mdc-chip-with-avatar-avatar-size, 28px)}.mat-mdc-standard-chip .mdc-evolution-chip__graphic{height:var(--mdc-chip-with-avatar-avatar-size, 28px);width:var(--mdc-chip-with-avatar-avatar-size, 28px);font-size:var(--mdc-chip-with-avatar-avatar-size, 28px)}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary:before{border-width:var(--mdc-chip-outline-width, 1px)}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary:before{border-width:var(--mdc-chip-flat-outline-width, 1px)}.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__action--primary:before{border-width:var(--mdc-chip-flat-selected-outline-width, 0)}.mat-mdc-standard-chip:not(.mdc-evolution-chip--selected) .mdc-evolution-chip__action--primary:before{border-width:var(--mdc-chip-flat-unselected-outline-width, 1px)}.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled){background-color:var(--mdc-chip-elevated-container-color, transparent)}.mat-mdc-standard-chip.mdc-evolution-chip--disabled{background-color:var(--mdc-chip-elevated-disabled-container-color, transparent)}.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled{background-color:var(--mdc-chip-elevated-disabled-container-color, transparent)}.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__text-label{color:var(--mdc-chip-label-text-color, currentColor)}.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label{color:var(--mdc-chip-disabled-label-text-color, currentColor)}.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label{color:var(--mdc-chip-disabled-label-text-color, currentColor)}.mat-mdc-standard-chip .mdc-evolution-chip__icon--primary{height:var(--mdc-chip-with-icon-icon-size, 18px);width:var(--mdc-chip-with-icon-icon-size, 18px);font-size:var(--mdc-chip-with-icon-icon-size, 18px)}.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__icon--primary{color:var(--mdc-chip-with-icon-icon-color, currentColor)}.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--primary{color:var(--mdc-chip-with-icon-disabled-icon-color, currentColor)}.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__checkmark{color:var(--mdc-chip-with-icon-selected-icon-color, currentColor)}.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__checkmark{color:var(--mdc-chip-with-icon-disabled-icon-color, currentColor)}.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__icon--trailing{color:var(--mdc-chip-with-trailing-icon-trailing-icon-color, currentColor)}.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing{color:var(--mdc-chip-with-trailing-icon-disabled-trailing-icon-color, currentColor)}.cdk-high-contrast-active .mat-mdc-standard-chip{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-standard-chip .mdc-evolution-chip__checkmark-path{stroke:CanvasText !important}.mat-mdc-standard-chip.mdc-evolution-chip--disabled{opacity:.4}.mat-mdc-standard-chip .mdc-evolution-chip__cell--primary,.mat-mdc-standard-chip .mdc-evolution-chip__action--primary,.mat-mdc-standard-chip .mat-mdc-chip-action-label{overflow:visible}.mat-mdc-standard-chip .mdc-evolution-chip__cell--primary{width:100%}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary{font:inherit;letter-spacing:inherit;white-space:inherit}.mat-mdc-standard-chip .mat-mdc-chip-graphic,.mat-mdc-standard-chip .mat-mdc-chip-trailing-icon{box-sizing:content-box}.mat-mdc-standard-chip._mat-animation-noopable,.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__graphic,.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark,.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark-path{transition-duration:1ms;animation-duration:1ms}.mat-mdc-basic-chip .mdc-evolution-chip__action--primary{font:inherit}.mat-mdc-chip-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;opacity:0;border-radius:inherit;transition:opacity 150ms linear}._mat-animation-noopable .mat-mdc-chip-focus-overlay{transition:none}.mat-mdc-basic-chip .mat-mdc-chip-focus-overlay{display:none}.mat-mdc-chip:hover .mat-mdc-chip-focus-overlay{opacity:.04}.mat-mdc-chip.cdk-focused .mat-mdc-chip-focus-overlay{opacity:.12}.mat-mdc-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-chip-avatar{text-align:center;line-height:1;color:var(--mdc-chip-with-icon-icon-color, currentColor)}.mat-mdc-chip{position:relative;z-index:0}.mat-mdc-chip-action-label{text-align:left;z-index:1}[dir=rtl] .mat-mdc-chip-action-label{text-align:right}.mat-mdc-chip.mdc-evolution-chip--with-trailing-action .mat-mdc-chip-action-label{position:relative}.mat-mdc-chip-action-label .mat-mdc-chip-primary-focus-indicator{position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none}.mat-mdc-chip-action-label .mat-mdc-focus-indicator::before{margin:calc(calc(var(--mat-mdc-focus-indicator-border-width, 3px) + 2px) * -1)}.mat-mdc-chip-remove{opacity:.54}.mat-mdc-chip-remove:focus{opacity:1}.mat-mdc-chip-remove::before{margin:calc(var(--mat-mdc-focus-indicator-border-width, 3px) * -1);left:8px;right:8px}.mat-mdc-chip-remove .mat-icon{width:inherit;height:inherit;font-size:inherit;box-sizing:content-box}.mat-chip-edit-input{cursor:text;display:inline-block;color:inherit;outline:0}.cdk-high-contrast-active .mat-mdc-chip-selected:not(.mat-mdc-chip-multiple){outline-width:3px}.mat-mdc-chip-action:focus .mat-mdc-focus-indicator::before{content:\"\"}"],
  encapsulation: 2,
  changeDetection: 0
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatChip, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'mat-basic-chip, [mat-basic-chip], mat-chip, [mat-chip]',
      inputs: ['color', 'disabled', 'disableRipple', 'tabIndex'],
      exportAs: 'matChip',
      host: {
        'class': 'mat-mdc-chip',
        '[class.mdc-evolution-chip]': '!_isBasicChip',
        '[class.mdc-evolution-chip--disabled]': 'disabled',
        '[class.mdc-evolution-chip--with-trailing-action]': '_hasTrailingIcon()',
        '[class.mdc-evolution-chip--with-primary-graphic]': 'leadingIcon',
        '[class.mdc-evolution-chip--with-primary-icon]': 'leadingIcon',
        '[class.mdc-evolution-chip--with-avatar]': 'leadingIcon',
        '[class.mat-mdc-chip-with-avatar]': 'leadingIcon',
        '[class.mat-mdc-chip-highlighted]': 'highlighted',
        '[class.mat-mdc-chip-disabled]': 'disabled',
        '[class.mat-mdc-basic-chip]': '_isBasicChip',
        '[class.mat-mdc-standard-chip]': '!_isBasicChip',
        '[class.mat-mdc-chip-with-trailing-icon]': '_hasTrailingIcon()',
        '[class._mat-animation-noopable]': '_animationsDisabled',
        '[id]': 'id',
        '[attr.role]': 'role',
        '[attr.tabindex]': 'role ? tabIndex : null',
        '[attr.aria-label]': 'ariaLabel',
        '(keydown)': '_handleKeydown($event)'
      },
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush,
      providers: [{
        provide: MAT_CHIP,
        useExisting: MatChip
      }],
      template: "<span matRipple class=\"mat-mdc-chip-ripple\"\n     [matRippleDisabled]=\"_isRippleDisabled()\"\n     [matRippleCentered]=\"_isRippleCentered\"\n     [matRippleTrigger]=\"_elementRef.nativeElement\"></span>\n<span class=\"mat-mdc-chip-focus-overlay\"></span>\n\n<span class=\"mdc-evolution-chip__cell mdc-evolution-chip__cell--primary\">\n  <span matChipAction [isInteractive]=\"false\">\n    <span class=\"mdc-evolution-chip__graphic mat-mdc-chip-graphic\" *ngIf=\"leadingIcon\">\n      <ng-content select=\"mat-chip-avatar, [matChipAvatar]\"></ng-content>\n    </span>\n    <span class=\"mdc-evolution-chip__text-label mat-mdc-chip-action-label\">\n      <ng-content></ng-content>\n      <span class=\"mat-mdc-chip-primary-focus-indicator mat-mdc-focus-indicator\"></span>\n    </span>\n  </span>\n</span>\n\n<span\n  class=\"mdc-evolution-chip__cell mdc-evolution-chip__cell--trailing\"\n  *ngIf=\"_hasTrailingIcon()\">\n  <ng-content select=\"mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]\"></ng-content>\n</span>\n",
      styles: [".mdc-evolution-chip,.mdc-evolution-chip__cell,.mdc-evolution-chip__action{display:inline-flex;align-items:center}.mdc-evolution-chip{position:relative;max-width:100%}.mdc-evolution-chip .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-evolution-chip__cell,.mdc-evolution-chip__action{height:100%}.mdc-evolution-chip__cell--primary{overflow-x:hidden}.mdc-evolution-chip__cell--trailing{flex:1 0 auto}.mdc-evolution-chip__action{align-items:center;background:none;border:none;box-sizing:content-box;cursor:pointer;display:inline-flex;justify-content:center;outline:none;padding:0;text-decoration:none;color:inherit}.mdc-evolution-chip__action--presentational{cursor:auto}.mdc-evolution-chip--disabled,.mdc-evolution-chip__action:disabled{pointer-events:none}.mdc-evolution-chip__action--primary{overflow-x:hidden}.mdc-evolution-chip__action--trailing{position:relative;overflow:visible}.mdc-evolution-chip__action--primary:before{box-sizing:border-box;content:\"\";height:100%;left:0;position:absolute;pointer-events:none;top:0;width:100%;z-index:1}.mdc-evolution-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-evolution-chip__action-touch{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}.mdc-evolution-chip__text-label{white-space:nowrap;user-select:none;text-overflow:ellipsis;overflow:hidden}.mdc-evolution-chip__graphic{align-items:center;display:inline-flex;justify-content:center;overflow:hidden;pointer-events:none;position:relative;flex:1 0 auto}.mdc-evolution-chip__checkmark{position:absolute;opacity:0;top:50%;left:50%}.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--selected):not(.mdc-evolution-chip--with-primary-icon) .mdc-evolution-chip__graphic{width:0}.mdc-evolution-chip__checkmark-background{opacity:0}.mdc-evolution-chip__checkmark-svg{display:block}.mdc-evolution-chip__checkmark-path{stroke-width:2px;stroke-dasharray:29.7833385;stroke-dashoffset:29.7833385;stroke:currentColor}.mdc-evolution-chip--selecting .mdc-evolution-chip__graphic{transition:width 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark{transition:transform 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);transform:translate(-75%, -50%)}.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark-path{transition:stroke-dashoffset 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting .mdc-evolution-chip__graphic{transition:width 100ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting .mdc-evolution-chip__checkmark{transition:opacity 50ms 0ms linear,transform 100ms 0ms cubic-bezier(0.4, 0, 0.2, 1);transform:translate(-75%, -50%)}.mdc-evolution-chip--deselecting .mdc-evolution-chip__checkmark-path{stroke-dashoffset:0}.mdc-evolution-chip--selecting-with-primary-icon .mdc-evolution-chip__icon--primary{transition:opacity 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--selecting-with-primary-icon .mdc-evolution-chip__checkmark-path{transition:stroke-dashoffset 150ms 75ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting-with-primary-icon .mdc-evolution-chip__icon--primary{transition:opacity 150ms 75ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting-with-primary-icon .mdc-evolution-chip__checkmark{transition:opacity 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);transform:translate(-50%, -50%)}.mdc-evolution-chip--deselecting-with-primary-icon .mdc-evolution-chip__checkmark-path{stroke-dashoffset:0}.mdc-evolution-chip--selected .mdc-evolution-chip__icon--primary{opacity:0}.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark{transform:translate(-50%, -50%);opacity:1}.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark-path{stroke-dashoffset:0}@keyframes mdc-evolution-chip-enter{from{transform:scale(0.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-evolution-chip--enter{animation:mdc-evolution-chip-enter 100ms 0ms cubic-bezier(0, 0, 0.2, 1)}@keyframes mdc-evolution-chip-exit{from{opacity:1}to{opacity:0}}.mdc-evolution-chip--exit{animation:mdc-evolution-chip-exit 75ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-evolution-chip--hidden{opacity:0;pointer-events:none;transition:width 150ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mat-mdc-standard-chip .mdc-evolution-chip__checkmark{height:20px;width:20px}.mat-mdc-standard-chip .mdc-evolution-chip__icon--trailing{height:18px;width:18px;font-size:18px}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary{padding-left:12px;padding-right:12px}[dir=rtl] .mat-mdc-standard-chip .mdc-evolution-chip__action--primary,.mat-mdc-standard-chip .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:12px;padding-right:12px}.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic{padding-left:6px;padding-right:6px}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic,.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic[dir=rtl]{padding-left:6px;padding-right:6px}.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary{padding-left:0;padding-right:12px}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary,.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:12px;padding-right:0}.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing{padding-left:8px;padding-right:8px}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing,.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing[dir=rtl]{padding-left:8px;padding-right:8px}.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing{left:8px;right:initial}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing,.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing[dir=rtl]{left:initial;right:8px}.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary{padding-left:12px;padding-right:0}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary,.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:0;padding-right:12px}.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic{padding-left:6px;padding-right:6px}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic,.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic[dir=rtl]{padding-left:6px;padding-right:6px}.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing{padding-left:8px;padding-right:8px}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing,.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing[dir=rtl]{padding-left:8px;padding-right:8px}.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing{left:8px;right:initial}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing,.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing[dir=rtl]{left:initial;right:8px}.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary{padding-left:0;padding-right:0}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary,.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:0;padding-right:0}.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__checkmark{color:var(--mdc-chip-with-icon-selected-icon-color, currentColor)}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic{padding-left:4px;padding-right:8px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic[dir=rtl]{padding-left:8px;padding-right:4px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary{padding-left:0;padding-right:12px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:12px;padding-right:0}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic{padding-left:4px;padding-right:8px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic[dir=rtl]{padding-left:8px;padding-right:4px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing{padding-left:8px;padding-right:8px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing[dir=rtl]{padding-left:8px;padding-right:8px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing{left:8px;right:initial}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing[dir=rtl]{left:initial;right:8px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary{padding-left:0;padding-right:0}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--with-primary-icon){--mdc-chip-graphic-selected-width:24px}.mdc-evolution-chip--with-avatar .mdc-evolution-chip__graphic{height:24px;width:24px;font-size:24px}.mdc-evolution-chip--with-avatar .mdc-evolution-chip__icon--primary{height:24px;width:24px;font-size:24px}.mat-mdc-standard-chip{-webkit-tap-highlight-color:rgba(0,0,0,0);border-radius:var(--mdc-chip-container-shape-radius, 16px 16px 16px 16px);height:var(--mdc-chip-container-height, 32px)}.mat-mdc-standard-chip .mdc-evolution-chip__ripple{border-radius:var(--mdc-chip-container-shape-radius, 16px 16px 16px 16px)}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary:before{border-radius:var(--mdc-chip-container-shape-radius, 16px 16px 16px 16px)}.mat-mdc-standard-chip .mdc-evolution-chip__icon--primary{border-radius:var(--mdc-chip-with-avatar-avatar-shape-radius, 14px 14px 14px 14px)}.mat-mdc-standard-chip.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--with-primary-icon){--mdc-chip-graphic-selected-width:var(--mdc-chip-with-avatar-avatar-size, 28px)}.mat-mdc-standard-chip .mdc-evolution-chip__graphic{height:var(--mdc-chip-with-avatar-avatar-size, 28px);width:var(--mdc-chip-with-avatar-avatar-size, 28px);font-size:var(--mdc-chip-with-avatar-avatar-size, 28px)}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary:before{border-width:var(--mdc-chip-outline-width, 1px)}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary:before{border-width:var(--mdc-chip-flat-outline-width, 1px)}.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__action--primary:before{border-width:var(--mdc-chip-flat-selected-outline-width, 0)}.mat-mdc-standard-chip:not(.mdc-evolution-chip--selected) .mdc-evolution-chip__action--primary:before{border-width:var(--mdc-chip-flat-unselected-outline-width, 1px)}.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled){background-color:var(--mdc-chip-elevated-container-color, transparent)}.mat-mdc-standard-chip.mdc-evolution-chip--disabled{background-color:var(--mdc-chip-elevated-disabled-container-color, transparent)}.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled{background-color:var(--mdc-chip-elevated-disabled-container-color, transparent)}.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__text-label{color:var(--mdc-chip-label-text-color, currentColor)}.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label{color:var(--mdc-chip-disabled-label-text-color, currentColor)}.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label{color:var(--mdc-chip-disabled-label-text-color, currentColor)}.mat-mdc-standard-chip .mdc-evolution-chip__icon--primary{height:var(--mdc-chip-with-icon-icon-size, 18px);width:var(--mdc-chip-with-icon-icon-size, 18px);font-size:var(--mdc-chip-with-icon-icon-size, 18px)}.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__icon--primary{color:var(--mdc-chip-with-icon-icon-color, currentColor)}.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--primary{color:var(--mdc-chip-with-icon-disabled-icon-color, currentColor)}.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__checkmark{color:var(--mdc-chip-with-icon-selected-icon-color, currentColor)}.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__checkmark{color:var(--mdc-chip-with-icon-disabled-icon-color, currentColor)}.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__icon--trailing{color:var(--mdc-chip-with-trailing-icon-trailing-icon-color, currentColor)}.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing{color:var(--mdc-chip-with-trailing-icon-disabled-trailing-icon-color, currentColor)}.cdk-high-contrast-active .mat-mdc-standard-chip{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-standard-chip .mdc-evolution-chip__checkmark-path{stroke:CanvasText !important}.mat-mdc-standard-chip.mdc-evolution-chip--disabled{opacity:.4}.mat-mdc-standard-chip .mdc-evolution-chip__cell--primary,.mat-mdc-standard-chip .mdc-evolution-chip__action--primary,.mat-mdc-standard-chip .mat-mdc-chip-action-label{overflow:visible}.mat-mdc-standard-chip .mdc-evolution-chip__cell--primary{width:100%}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary{font:inherit;letter-spacing:inherit;white-space:inherit}.mat-mdc-standard-chip .mat-mdc-chip-graphic,.mat-mdc-standard-chip .mat-mdc-chip-trailing-icon{box-sizing:content-box}.mat-mdc-standard-chip._mat-animation-noopable,.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__graphic,.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark,.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark-path{transition-duration:1ms;animation-duration:1ms}.mat-mdc-basic-chip .mdc-evolution-chip__action--primary{font:inherit}.mat-mdc-chip-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;opacity:0;border-radius:inherit;transition:opacity 150ms linear}._mat-animation-noopable .mat-mdc-chip-focus-overlay{transition:none}.mat-mdc-basic-chip .mat-mdc-chip-focus-overlay{display:none}.mat-mdc-chip:hover .mat-mdc-chip-focus-overlay{opacity:.04}.mat-mdc-chip.cdk-focused .mat-mdc-chip-focus-overlay{opacity:.12}.mat-mdc-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-chip-avatar{text-align:center;line-height:1;color:var(--mdc-chip-with-icon-icon-color, currentColor)}.mat-mdc-chip{position:relative;z-index:0}.mat-mdc-chip-action-label{text-align:left;z-index:1}[dir=rtl] .mat-mdc-chip-action-label{text-align:right}.mat-mdc-chip.mdc-evolution-chip--with-trailing-action .mat-mdc-chip-action-label{position:relative}.mat-mdc-chip-action-label .mat-mdc-chip-primary-focus-indicator{position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none}.mat-mdc-chip-action-label .mat-mdc-focus-indicator::before{margin:calc(calc(var(--mat-mdc-focus-indicator-border-width, 3px) + 2px) * -1)}.mat-mdc-chip-remove{opacity:.54}.mat-mdc-chip-remove:focus{opacity:1}.mat-mdc-chip-remove::before{margin:calc(var(--mat-mdc-focus-indicator-border-width, 3px) * -1);left:8px;right:8px}.mat-mdc-chip-remove .mat-icon{width:inherit;height:inherit;font-size:inherit;box-sizing:content-box}.mat-chip-edit-input{cursor:text;display:inline-block;color:inherit;outline:0}.cdk-high-contrast-active .mat-mdc-chip-selected:not(.mat-mdc-chip-multiple){outline-width:3px}.mat-mdc-chip-action:focus .mat-mdc-focus-indicator::before{content:\"\"}"]
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone
    }, {
      type: _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_7__.FocusMonitor
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.DOCUMENT]
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [_angular_core__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_MODULE_TYPE]
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [_angular_material_core__WEBPACK_IMPORTED_MODULE_1__.MAT_RIPPLE_GLOBAL_OPTIONS]
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Attribute,
        args: ['tabindex']
      }]
    }];
  }, {
    role: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    _allLeadingIcons: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChildren,
      args: [MAT_CHIP_AVATAR, {
        descendants: true
      }]
    }],
    _allTrailingIcons: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChildren,
      args: [MAT_CHIP_TRAILING_ICON, {
        descendants: true
      }]
    }],
    _allRemoveIcons: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChildren,
      args: [MAT_CHIP_REMOVE, {
        descendants: true
      }]
    }],
    id: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    ariaLabel: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: ['aria-label']
    }],
    ariaDescription: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: ['aria-description']
    }],
    value: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    removable: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    highlighted: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    removed: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    destroyed: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    leadingIcon: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChild,
      args: [MAT_CHIP_AVATAR]
    }],
    trailingIcon: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChild,
      args: [MAT_CHIP_TRAILING_ICON]
    }],
    removeIcon: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChild,
      args: [MAT_CHIP_REMOVE]
    }],
    ripple: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChild,
      args: [_angular_material_core__WEBPACK_IMPORTED_MODULE_1__.MatRipple]
    }],
    primaryAction: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChild,
      args: [MatChipAction]
    }]
  });
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Event object emitted by MatChipOption when selected or deselected. */
class MatChipSelectionChange {
  constructor( /** Reference to the chip that emitted the event. */
  source, /** Whether the chip that emitted the event is selected. */
  selected, /** Whether the selection change was a result of a user interaction. */
  isUserInput = false) {
    this.source = source;
    this.selected = selected;
    this.isUserInput = isUserInput;
  }
}
/**
 * An extension of the MatChip component that supports chip selection. Used with MatChipListbox.
 *
 * Unlike other chips, the user can focus on disabled chip options inside a MatChipListbox. The
 * user cannot click disabled chips.
 */
class MatChipOption extends MatChip {
  constructor() {
    super(...arguments);
    /** Default chip options. */
    this._defaultOptions = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(MAT_CHIPS_DEFAULT_OPTIONS, {
      optional: true
    });
    /** Whether the chip list is selectable. */
    this.chipListSelectable = true;
    /** Whether the chip list is in multi-selection mode. */
    this._chipListMultiple = false;
    /** Whether the chip list hides single-selection indicator. */
    this._chipListHideSingleSelectionIndicator = this._defaultOptions?.hideSingleSelectionIndicator ?? false;
    this._selectable = true;
    this._selected = false;
    /** The unstyled chip selector for this component. */
    this.basicChipAttrName = 'mat-basic-chip-option';
    /** Emitted when the chip is selected or deselected. */
    this.selectionChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
  }
  /**
   * Whether or not the chip is selectable.
   *
   * When a chip is not selectable, changes to its selected state are always
   * ignored. By default an option chip is selectable, and it becomes
   * non-selectable if its parent chip list is not selectable.
   */
  get selectable() {
    return this._selectable && this.chipListSelectable;
  }
  set selectable(value) {
    this._selectable = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceBooleanProperty)(value);
    this._changeDetectorRef.markForCheck();
  }
  /** Whether the chip is selected. */
  get selected() {
    return this._selected;
  }
  set selected(value) {
    this._setSelectedState((0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceBooleanProperty)(value), false, true);
  }
  /**
   * The ARIA selected applied to the chip. Conforms to WAI ARIA best practices for listbox
   * interaction patterns.
   *
   * From [WAI ARIA Listbox authoring practices guide](
   * https://www.w3.org/WAI/ARIA/apg/patterns/listbox/):
   *  "If any options are selected, each selected option has either aria-selected or aria-checked
   *  set to true. All options that are selectable but not selected have either aria-selected or
   *  aria-checked set to false."
   *
   * Set `aria-selected="false"` on not-selected listbox options that are selectable to fix
   * VoiceOver reading every option as "selected" (#25736).
   */
  get ariaSelected() {
    return this.selectable ? this.selected.toString() : null;
  }
  ngOnInit() {
    super.ngOnInit();
    this.role = 'presentation';
  }
  /** Selects the chip. */
  select() {
    this._setSelectedState(true, false, true);
  }
  /** Deselects the chip. */
  deselect() {
    this._setSelectedState(false, false, true);
  }
  /** Selects this chip and emits userInputSelection event */
  selectViaInteraction() {
    this._setSelectedState(true, true, true);
  }
  /** Toggles the current selected state of this chip. */
  toggleSelected(isUserInput = false) {
    this._setSelectedState(!this.selected, isUserInput, true);
    return this.selected;
  }
  _handlePrimaryActionInteraction() {
    if (this.selectable && !this.disabled) {
      this.toggleSelected(true);
    }
  }
  _hasLeadingGraphic() {
    if (this.leadingIcon) {
      return true;
    }
    // The checkmark graphic communicates selected state for both single-select and multi-select.
    // Include checkmark in single-select to fix a11y issue where selected state is communicated
    // visually only using color (#25886).
    return !this._chipListHideSingleSelectionIndicator || this._chipListMultiple;
  }
  _setSelectedState(isSelected, isUserInput, emitEvent) {
    if (isSelected !== this.selected) {
      this._selected = isSelected;
      if (emitEvent) {
        this.selectionChange.emit({
          source: this,
          isUserInput,
          selected: this.selected
        });
      }
      this._changeDetectorRef.markForCheck();
    }
  }
}
MatChipOption.ɵfac = /* @__PURE__ */function () {
  let ɵMatChipOption_BaseFactory;
  return function MatChipOption_Factory(t) {
    return (ɵMatChipOption_BaseFactory || (ɵMatChipOption_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](MatChipOption)))(t || MatChipOption);
  };
}();
MatChipOption.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: MatChipOption,
  selectors: [["mat-basic-chip-option"], ["", "mat-basic-chip-option", ""], ["mat-chip-option"], ["", "mat-chip-option", ""]],
  hostAttrs: [1, "mat-mdc-chip", "mat-mdc-chip-option"],
  hostVars: 37,
  hostBindings: function MatChipOption_HostBindings(rf, ctx) {
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵhostProperty"]("id", ctx.id);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("tabindex", null)("aria-label", null)("aria-description", null)("role", ctx.role);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mdc-evolution-chip", !ctx._isBasicChip)("mdc-evolution-chip--filter", !ctx._isBasicChip)("mdc-evolution-chip--selectable", !ctx._isBasicChip)("mat-mdc-chip-selected", ctx.selected)("mat-mdc-chip-multiple", ctx._chipListMultiple)("mat-mdc-chip-disabled", ctx.disabled)("mat-mdc-chip-with-avatar", ctx.leadingIcon)("mdc-evolution-chip--disabled", ctx.disabled)("mdc-evolution-chip--selected", ctx.selected)("mdc-evolution-chip--selecting", !ctx._animationsDisabled)("mdc-evolution-chip--with-trailing-action", ctx._hasTrailingIcon())("mdc-evolution-chip--with-primary-icon", ctx.leadingIcon)("mdc-evolution-chip--with-primary-graphic", ctx._hasLeadingGraphic())("mdc-evolution-chip--with-avatar", ctx.leadingIcon)("mat-mdc-chip-highlighted", ctx.highlighted)("mat-mdc-chip-with-trailing-icon", ctx._hasTrailingIcon());
    }
  },
  inputs: {
    color: "color",
    disabled: "disabled",
    disableRipple: "disableRipple",
    tabIndex: "tabIndex",
    selectable: "selectable",
    selected: "selected"
  },
  outputs: {
    selectionChange: "selectionChange"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([{
    provide: MatChip,
    useExisting: MatChipOption
  }, {
    provide: MAT_CHIP,
    useExisting: MatChipOption
  }]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]],
  ngContentSelectors: _c1,
  decls: 11,
  vars: 12,
  consts: [["matRipple", "", 1, "mat-mdc-chip-ripple", 3, "matRippleDisabled", "matRippleCentered", "matRippleTrigger"], [1, "mat-mdc-chip-focus-overlay"], [1, "mdc-evolution-chip__cell", "mdc-evolution-chip__cell--primary"], ["matChipAction", "", "role", "option", 3, "tabIndex", "_allowFocusWhenDisabled"], ["class", "mdc-evolution-chip__graphic mat-mdc-chip-graphic", 4, "ngIf"], [1, "mdc-evolution-chip__text-label", "mat-mdc-chip-action-label"], [1, "mat-mdc-chip-primary-focus-indicator", "mat-mdc-focus-indicator"], ["class", "mdc-evolution-chip__cell mdc-evolution-chip__cell--trailing", 4, "ngIf"], [1, "cdk-visually-hidden", 3, "id"], [1, "mdc-evolution-chip__graphic", "mat-mdc-chip-graphic"], [1, "mdc-evolution-chip__checkmark"], ["viewBox", "-2 -3 30 30", "focusable", "false", 1, "mdc-evolution-chip__checkmark-svg"], ["fill", "none", "stroke", "currentColor", "d", "M1.73,12.91 8.1,19.28 22.79,4.59", 1, "mdc-evolution-chip__checkmark-path"], [1, "mdc-evolution-chip__cell", "mdc-evolution-chip__cell--trailing"]],
  template: function MatChipOption_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"](_c0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "span", 0)(1, "span", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span", 2)(3, "button", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, MatChipOption_span_4_Template, 5, 0, "span", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "span", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "span", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, MatChipOption_span_8_Template, 2, 0, "span", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "span", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matRippleDisabled", ctx._isRippleDisabled())("matRippleCentered", ctx._isRippleCentered)("matRippleTrigger", ctx._elementRef.nativeElement);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("tabIndex", ctx.tabIndex)("_allowFocusWhenDisabled", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("aria-selected", ctx.ariaSelected)("aria-label", ctx.ariaLabel)("aria-describedby", ctx._ariaDescriptionId);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._hasLeadingGraphic());
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._hasTrailingIcon());
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("id", ctx._ariaDescriptionId);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.ariaDescription);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _angular_material_core__WEBPACK_IMPORTED_MODULE_1__.MatRipple, MatChipAction],
  styles: [_c2],
  encapsulation: 2,
  changeDetection: 0
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatChipOption, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'mat-basic-chip-option, [mat-basic-chip-option], mat-chip-option, [mat-chip-option]',
      inputs: ['color', 'disabled', 'disableRipple', 'tabIndex'],
      host: {
        'class': 'mat-mdc-chip mat-mdc-chip-option',
        '[class.mdc-evolution-chip]': '!_isBasicChip',
        '[class.mdc-evolution-chip--filter]': '!_isBasicChip',
        '[class.mdc-evolution-chip--selectable]': '!_isBasicChip',
        '[class.mat-mdc-chip-selected]': 'selected',
        '[class.mat-mdc-chip-multiple]': '_chipListMultiple',
        '[class.mat-mdc-chip-disabled]': 'disabled',
        '[class.mat-mdc-chip-with-avatar]': 'leadingIcon',
        '[class.mdc-evolution-chip--disabled]': 'disabled',
        '[class.mdc-evolution-chip--selected]': 'selected',
        // This class enables the transition on the checkmark. Usually MDC adds it when selection
        // starts and removes it once the animation is finished. We don't need to go through all
        // the trouble, because we only care about the selection animation. MDC needs to do it,
        // because they also have an exit animation that we don't care about.
        '[class.mdc-evolution-chip--selecting]': '!_animationsDisabled',
        '[class.mdc-evolution-chip--with-trailing-action]': '_hasTrailingIcon()',
        '[class.mdc-evolution-chip--with-primary-icon]': 'leadingIcon',
        '[class.mdc-evolution-chip--with-primary-graphic]': '_hasLeadingGraphic()',
        '[class.mdc-evolution-chip--with-avatar]': 'leadingIcon',
        '[class.mat-mdc-chip-highlighted]': 'highlighted',
        '[class.mat-mdc-chip-with-trailing-icon]': '_hasTrailingIcon()',
        '[attr.tabindex]': 'null',
        '[attr.aria-label]': 'null',
        '[attr.aria-description]': 'null',
        '[attr.role]': 'role',
        '[id]': 'id'
      },
      providers: [{
        provide: MatChip,
        useExisting: MatChipOption
      }, {
        provide: MAT_CHIP,
        useExisting: MatChipOption
      }],
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush,
      template: "<span matRipple class=\"mat-mdc-chip-ripple\"\n     [matRippleDisabled]=\"_isRippleDisabled()\"\n     [matRippleCentered]=\"_isRippleCentered\"\n     [matRippleTrigger]=\"_elementRef.nativeElement\"></span>\n<span class=\"mat-mdc-chip-focus-overlay\"></span>\n\n<span class=\"mdc-evolution-chip__cell mdc-evolution-chip__cell--primary\">\n  <button\n    matChipAction\n    [tabIndex]=\"tabIndex\"\n    [_allowFocusWhenDisabled]=\"true\"\n    [attr.aria-selected]=\"ariaSelected\"\n    [attr.aria-label]=\"ariaLabel\"\n    [attr.aria-describedby]=\"_ariaDescriptionId\"\n    role=\"option\">\n    <span class=\"mdc-evolution-chip__graphic mat-mdc-chip-graphic\" *ngIf=\"_hasLeadingGraphic()\">\n      <ng-content select=\"mat-chip-avatar, [matChipAvatar]\"></ng-content>\n      <span class=\"mdc-evolution-chip__checkmark\">\n        <svg class=\"mdc-evolution-chip__checkmark-svg\" viewBox=\"-2 -3 30 30\" focusable=\"false\">\n          <path class=\"mdc-evolution-chip__checkmark-path\"\n                fill=\"none\" stroke=\"currentColor\" d=\"M1.73,12.91 8.1,19.28 22.79,4.59\" />\n        </svg>\n      </span>\n    </span>\n    <span class=\"mdc-evolution-chip__text-label mat-mdc-chip-action-label\">\n      <ng-content></ng-content>\n      <span class=\"mat-mdc-chip-primary-focus-indicator mat-mdc-focus-indicator\"></span>\n    </span>\n  </button>\n</span>\n\n<span\n  class=\"mdc-evolution-chip__cell mdc-evolution-chip__cell--trailing\"\n  *ngIf=\"_hasTrailingIcon()\">\n  <ng-content select=\"mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]\"></ng-content>\n</span>\n\n<span class=\"cdk-visually-hidden\" [id]=\"_ariaDescriptionId\">{{ariaDescription}}</span>",
      styles: [".mdc-evolution-chip,.mdc-evolution-chip__cell,.mdc-evolution-chip__action{display:inline-flex;align-items:center}.mdc-evolution-chip{position:relative;max-width:100%}.mdc-evolution-chip .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-evolution-chip__cell,.mdc-evolution-chip__action{height:100%}.mdc-evolution-chip__cell--primary{overflow-x:hidden}.mdc-evolution-chip__cell--trailing{flex:1 0 auto}.mdc-evolution-chip__action{align-items:center;background:none;border:none;box-sizing:content-box;cursor:pointer;display:inline-flex;justify-content:center;outline:none;padding:0;text-decoration:none;color:inherit}.mdc-evolution-chip__action--presentational{cursor:auto}.mdc-evolution-chip--disabled,.mdc-evolution-chip__action:disabled{pointer-events:none}.mdc-evolution-chip__action--primary{overflow-x:hidden}.mdc-evolution-chip__action--trailing{position:relative;overflow:visible}.mdc-evolution-chip__action--primary:before{box-sizing:border-box;content:\"\";height:100%;left:0;position:absolute;pointer-events:none;top:0;width:100%;z-index:1}.mdc-evolution-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-evolution-chip__action-touch{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}.mdc-evolution-chip__text-label{white-space:nowrap;user-select:none;text-overflow:ellipsis;overflow:hidden}.mdc-evolution-chip__graphic{align-items:center;display:inline-flex;justify-content:center;overflow:hidden;pointer-events:none;position:relative;flex:1 0 auto}.mdc-evolution-chip__checkmark{position:absolute;opacity:0;top:50%;left:50%}.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--selected):not(.mdc-evolution-chip--with-primary-icon) .mdc-evolution-chip__graphic{width:0}.mdc-evolution-chip__checkmark-background{opacity:0}.mdc-evolution-chip__checkmark-svg{display:block}.mdc-evolution-chip__checkmark-path{stroke-width:2px;stroke-dasharray:29.7833385;stroke-dashoffset:29.7833385;stroke:currentColor}.mdc-evolution-chip--selecting .mdc-evolution-chip__graphic{transition:width 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark{transition:transform 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);transform:translate(-75%, -50%)}.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark-path{transition:stroke-dashoffset 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting .mdc-evolution-chip__graphic{transition:width 100ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting .mdc-evolution-chip__checkmark{transition:opacity 50ms 0ms linear,transform 100ms 0ms cubic-bezier(0.4, 0, 0.2, 1);transform:translate(-75%, -50%)}.mdc-evolution-chip--deselecting .mdc-evolution-chip__checkmark-path{stroke-dashoffset:0}.mdc-evolution-chip--selecting-with-primary-icon .mdc-evolution-chip__icon--primary{transition:opacity 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--selecting-with-primary-icon .mdc-evolution-chip__checkmark-path{transition:stroke-dashoffset 150ms 75ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting-with-primary-icon .mdc-evolution-chip__icon--primary{transition:opacity 150ms 75ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting-with-primary-icon .mdc-evolution-chip__checkmark{transition:opacity 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);transform:translate(-50%, -50%)}.mdc-evolution-chip--deselecting-with-primary-icon .mdc-evolution-chip__checkmark-path{stroke-dashoffset:0}.mdc-evolution-chip--selected .mdc-evolution-chip__icon--primary{opacity:0}.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark{transform:translate(-50%, -50%);opacity:1}.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark-path{stroke-dashoffset:0}@keyframes mdc-evolution-chip-enter{from{transform:scale(0.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-evolution-chip--enter{animation:mdc-evolution-chip-enter 100ms 0ms cubic-bezier(0, 0, 0.2, 1)}@keyframes mdc-evolution-chip-exit{from{opacity:1}to{opacity:0}}.mdc-evolution-chip--exit{animation:mdc-evolution-chip-exit 75ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-evolution-chip--hidden{opacity:0;pointer-events:none;transition:width 150ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mat-mdc-standard-chip .mdc-evolution-chip__checkmark{height:20px;width:20px}.mat-mdc-standard-chip .mdc-evolution-chip__icon--trailing{height:18px;width:18px;font-size:18px}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary{padding-left:12px;padding-right:12px}[dir=rtl] .mat-mdc-standard-chip .mdc-evolution-chip__action--primary,.mat-mdc-standard-chip .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:12px;padding-right:12px}.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic{padding-left:6px;padding-right:6px}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic,.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic[dir=rtl]{padding-left:6px;padding-right:6px}.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary{padding-left:0;padding-right:12px}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary,.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:12px;padding-right:0}.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing{padding-left:8px;padding-right:8px}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing,.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing[dir=rtl]{padding-left:8px;padding-right:8px}.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing{left:8px;right:initial}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing,.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing[dir=rtl]{left:initial;right:8px}.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary{padding-left:12px;padding-right:0}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary,.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:0;padding-right:12px}.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic{padding-left:6px;padding-right:6px}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic,.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic[dir=rtl]{padding-left:6px;padding-right:6px}.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing{padding-left:8px;padding-right:8px}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing,.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing[dir=rtl]{padding-left:8px;padding-right:8px}.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing{left:8px;right:initial}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing,.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing[dir=rtl]{left:initial;right:8px}.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary{padding-left:0;padding-right:0}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary,.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:0;padding-right:0}.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__checkmark{color:var(--mdc-chip-with-icon-selected-icon-color, currentColor)}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic{padding-left:4px;padding-right:8px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic[dir=rtl]{padding-left:8px;padding-right:4px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary{padding-left:0;padding-right:12px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:12px;padding-right:0}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic{padding-left:4px;padding-right:8px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic[dir=rtl]{padding-left:8px;padding-right:4px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing{padding-left:8px;padding-right:8px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing[dir=rtl]{padding-left:8px;padding-right:8px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing{left:8px;right:initial}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing[dir=rtl]{left:initial;right:8px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary{padding-left:0;padding-right:0}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--with-primary-icon){--mdc-chip-graphic-selected-width:24px}.mdc-evolution-chip--with-avatar .mdc-evolution-chip__graphic{height:24px;width:24px;font-size:24px}.mdc-evolution-chip--with-avatar .mdc-evolution-chip__icon--primary{height:24px;width:24px;font-size:24px}.mat-mdc-standard-chip{-webkit-tap-highlight-color:rgba(0,0,0,0);border-radius:var(--mdc-chip-container-shape-radius, 16px 16px 16px 16px);height:var(--mdc-chip-container-height, 32px)}.mat-mdc-standard-chip .mdc-evolution-chip__ripple{border-radius:var(--mdc-chip-container-shape-radius, 16px 16px 16px 16px)}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary:before{border-radius:var(--mdc-chip-container-shape-radius, 16px 16px 16px 16px)}.mat-mdc-standard-chip .mdc-evolution-chip__icon--primary{border-radius:var(--mdc-chip-with-avatar-avatar-shape-radius, 14px 14px 14px 14px)}.mat-mdc-standard-chip.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--with-primary-icon){--mdc-chip-graphic-selected-width:var(--mdc-chip-with-avatar-avatar-size, 28px)}.mat-mdc-standard-chip .mdc-evolution-chip__graphic{height:var(--mdc-chip-with-avatar-avatar-size, 28px);width:var(--mdc-chip-with-avatar-avatar-size, 28px);font-size:var(--mdc-chip-with-avatar-avatar-size, 28px)}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary:before{border-width:var(--mdc-chip-outline-width, 1px)}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary:before{border-width:var(--mdc-chip-flat-outline-width, 1px)}.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__action--primary:before{border-width:var(--mdc-chip-flat-selected-outline-width, 0)}.mat-mdc-standard-chip:not(.mdc-evolution-chip--selected) .mdc-evolution-chip__action--primary:before{border-width:var(--mdc-chip-flat-unselected-outline-width, 1px)}.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled){background-color:var(--mdc-chip-elevated-container-color, transparent)}.mat-mdc-standard-chip.mdc-evolution-chip--disabled{background-color:var(--mdc-chip-elevated-disabled-container-color, transparent)}.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled{background-color:var(--mdc-chip-elevated-disabled-container-color, transparent)}.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__text-label{color:var(--mdc-chip-label-text-color, currentColor)}.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label{color:var(--mdc-chip-disabled-label-text-color, currentColor)}.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label{color:var(--mdc-chip-disabled-label-text-color, currentColor)}.mat-mdc-standard-chip .mdc-evolution-chip__icon--primary{height:var(--mdc-chip-with-icon-icon-size, 18px);width:var(--mdc-chip-with-icon-icon-size, 18px);font-size:var(--mdc-chip-with-icon-icon-size, 18px)}.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__icon--primary{color:var(--mdc-chip-with-icon-icon-color, currentColor)}.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--primary{color:var(--mdc-chip-with-icon-disabled-icon-color, currentColor)}.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__checkmark{color:var(--mdc-chip-with-icon-selected-icon-color, currentColor)}.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__checkmark{color:var(--mdc-chip-with-icon-disabled-icon-color, currentColor)}.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__icon--trailing{color:var(--mdc-chip-with-trailing-icon-trailing-icon-color, currentColor)}.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing{color:var(--mdc-chip-with-trailing-icon-disabled-trailing-icon-color, currentColor)}.cdk-high-contrast-active .mat-mdc-standard-chip{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-standard-chip .mdc-evolution-chip__checkmark-path{stroke:CanvasText !important}.mat-mdc-standard-chip.mdc-evolution-chip--disabled{opacity:.4}.mat-mdc-standard-chip .mdc-evolution-chip__cell--primary,.mat-mdc-standard-chip .mdc-evolution-chip__action--primary,.mat-mdc-standard-chip .mat-mdc-chip-action-label{overflow:visible}.mat-mdc-standard-chip .mdc-evolution-chip__cell--primary{width:100%}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary{font:inherit;letter-spacing:inherit;white-space:inherit}.mat-mdc-standard-chip .mat-mdc-chip-graphic,.mat-mdc-standard-chip .mat-mdc-chip-trailing-icon{box-sizing:content-box}.mat-mdc-standard-chip._mat-animation-noopable,.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__graphic,.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark,.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark-path{transition-duration:1ms;animation-duration:1ms}.mat-mdc-basic-chip .mdc-evolution-chip__action--primary{font:inherit}.mat-mdc-chip-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;opacity:0;border-radius:inherit;transition:opacity 150ms linear}._mat-animation-noopable .mat-mdc-chip-focus-overlay{transition:none}.mat-mdc-basic-chip .mat-mdc-chip-focus-overlay{display:none}.mat-mdc-chip:hover .mat-mdc-chip-focus-overlay{opacity:.04}.mat-mdc-chip.cdk-focused .mat-mdc-chip-focus-overlay{opacity:.12}.mat-mdc-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-chip-avatar{text-align:center;line-height:1;color:var(--mdc-chip-with-icon-icon-color, currentColor)}.mat-mdc-chip{position:relative;z-index:0}.mat-mdc-chip-action-label{text-align:left;z-index:1}[dir=rtl] .mat-mdc-chip-action-label{text-align:right}.mat-mdc-chip.mdc-evolution-chip--with-trailing-action .mat-mdc-chip-action-label{position:relative}.mat-mdc-chip-action-label .mat-mdc-chip-primary-focus-indicator{position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none}.mat-mdc-chip-action-label .mat-mdc-focus-indicator::before{margin:calc(calc(var(--mat-mdc-focus-indicator-border-width, 3px) + 2px) * -1)}.mat-mdc-chip-remove{opacity:.54}.mat-mdc-chip-remove:focus{opacity:1}.mat-mdc-chip-remove::before{margin:calc(var(--mat-mdc-focus-indicator-border-width, 3px) * -1);left:8px;right:8px}.mat-mdc-chip-remove .mat-icon{width:inherit;height:inherit;font-size:inherit;box-sizing:content-box}.mat-chip-edit-input{cursor:text;display:inline-block;color:inherit;outline:0}.cdk-high-contrast-active .mat-mdc-chip-selected:not(.mat-mdc-chip-multiple){outline-width:3px}.mat-mdc-chip-action:focus .mat-mdc-focus-indicator::before{content:\"\"}"]
    }]
  }], null, {
    selectable: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    selected: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    selectionChange: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }]
  });
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * A directive that makes a span editable and exposes functions to modify and retrieve the
 * element's contents.
 */
class MatChipEditInput {
  constructor(_elementRef, _document) {
    this._elementRef = _elementRef;
    this._document = _document;
  }
  initialize(initialValue) {
    this.getNativeElement().focus();
    this.setValue(initialValue);
  }
  getNativeElement() {
    return this._elementRef.nativeElement;
  }
  setValue(value) {
    this.getNativeElement().textContent = value;
    this._moveCursorToEndOfInput();
  }
  getValue() {
    return this.getNativeElement().textContent || '';
  }
  _moveCursorToEndOfInput() {
    const range = this._document.createRange();
    range.selectNodeContents(this.getNativeElement());
    range.collapse(false);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
}
MatChipEditInput.ɵfac = function MatChipEditInput_Factory(t) {
  return new (t || MatChipEditInput)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_8__.DOCUMENT));
};
MatChipEditInput.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: MatChipEditInput,
  selectors: [["span", "matChipEditInput", ""]],
  hostAttrs: ["role", "textbox", "tabindex", "-1", "contenteditable", "true", 1, "mat-chip-edit-input"]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatChipEditInput, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: 'span[matChipEditInput]',
      host: {
        'class': 'mat-chip-edit-input',
        'role': 'textbox',
        'tabindex': '-1',
        'contenteditable': 'true'
      }
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.DOCUMENT]
      }]
    }];
  }, null);
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * An extension of the MatChip component used with MatChipGrid and
 * the matChipInputFor directive.
 */
class MatChipRow extends MatChip {
  constructor(changeDetectorRef, elementRef, ngZone, focusMonitor, _document, animationMode, globalRippleOptions, tabIndex) {
    super(changeDetectorRef, elementRef, ngZone, focusMonitor, _document, animationMode, globalRippleOptions, tabIndex);
    this.basicChipAttrName = 'mat-basic-chip-row';
    /**
     * The editing action has to be triggered in a timeout. While we're waiting on it, a blur
     * event might occur which will interrupt the editing. This flag is used to avoid interruptions
     * while the editing action is being initialized.
     */
    this._editStartPending = false;
    this.editable = false;
    /** Emitted when the chip is edited. */
    this.edited = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this._isEditing = false;
    this.role = 'row';
    this._onBlur.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.takeUntil)(this.destroyed)).subscribe(() => {
      if (this._isEditing && !this._editStartPending) {
        this._onEditFinish();
      }
    });
  }
  _hasTrailingIcon() {
    // The trailing icon is hidden while editing.
    return !this._isEditing && super._hasTrailingIcon();
  }
  /** Sends focus to the first gridcell when the user clicks anywhere inside the chip. */
  _handleFocus() {
    if (!this._isEditing && !this.disabled) {
      this.focus();
    }
  }
  _handleKeydown(event) {
    if (event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_3__.ENTER && !this.disabled) {
      if (this._isEditing) {
        event.preventDefault();
        this._onEditFinish();
      } else if (this.editable) {
        this._startEditing(event);
      }
    } else if (this._isEditing) {
      // Stop the event from reaching the chip set in order to avoid navigating.
      event.stopPropagation();
    } else {
      super._handleKeydown(event);
    }
  }
  _handleDoubleclick(event) {
    if (!this.disabled && this.editable) {
      this._startEditing(event);
    }
  }
  _startEditing(event) {
    if (!this.primaryAction || this.removeIcon && this._getSourceAction(event.target) === this.removeIcon) {
      return;
    }
    // The value depends on the DOM so we need to extract it before we flip the flag.
    const value = this.value;
    this._isEditing = true;
    this._editStartPending = true;
    // Defer initializing the input so it has time to be added to the DOM.
    setTimeout(() => {
      this._getEditInput().initialize(value);
      this._editStartPending = false;
    });
  }
  _onEditFinish() {
    this._isEditing = false;
    this._editStartPending = false;
    this.edited.emit({
      chip: this,
      value: this._getEditInput().getValue()
    });
    // If the edit input is still focused or focus was returned to the body after it was destroyed,
    // return focus to the chip contents.
    if (this._document.activeElement === this._getEditInput().getNativeElement() || this._document.activeElement === this._document.body) {
      this.primaryAction.focus();
    }
  }
  /**
   * Gets the projected chip edit input, or the default input if none is projected in. One of these
   * two values is guaranteed to be defined.
   */
  _getEditInput() {
    return this.contentEditInput || this.defaultEditInput;
  }
}
MatChipRow.ɵfac = function MatChipRow_Factory(t) {
  return new (t || MatChipRow)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_7__.FocusMonitor), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_8__.DOCUMENT), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_MODULE_TYPE, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_core__WEBPACK_IMPORTED_MODULE_1__.MAT_RIPPLE_GLOBAL_OPTIONS, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinjectAttribute"]('tabindex'));
};
MatChipRow.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: MatChipRow,
  selectors: [["mat-chip-row"], ["", "mat-chip-row", ""], ["mat-basic-chip-row"], ["", "mat-basic-chip-row", ""]],
  contentQueries: function MatChipRow_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, MatChipEditInput, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.contentEditInput = _t.first);
    }
  },
  viewQuery: function MatChipRow_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](MatChipEditInput, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.defaultEditInput = _t.first);
    }
  },
  hostAttrs: [1, "mat-mdc-chip", "mat-mdc-chip-row", "mdc-evolution-chip"],
  hostVars: 27,
  hostBindings: function MatChipRow_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("focus", function MatChipRow_focus_HostBindingHandler($event) {
        return ctx._handleFocus($event);
      })("dblclick", function MatChipRow_dblclick_HostBindingHandler($event) {
        return ctx._handleDoubleclick($event);
      });
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵhostProperty"]("id", ctx.id);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("tabindex", ctx.disabled ? null : -1)("aria-label", null)("aria-description", null)("role", ctx.role);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mat-mdc-chip-with-avatar", ctx.leadingIcon)("mat-mdc-chip-disabled", ctx.disabled)("mat-mdc-chip-editing", ctx._isEditing)("mat-mdc-chip-editable", ctx.editable)("mdc-evolution-chip--disabled", ctx.disabled)("mdc-evolution-chip--with-trailing-action", ctx._hasTrailingIcon())("mdc-evolution-chip--with-primary-graphic", ctx.leadingIcon)("mdc-evolution-chip--with-primary-icon", ctx.leadingIcon)("mdc-evolution-chip--with-avatar", ctx.leadingIcon)("mat-mdc-chip-highlighted", ctx.highlighted)("mat-mdc-chip-with-trailing-icon", ctx._hasTrailingIcon());
    }
  },
  inputs: {
    color: "color",
    disabled: "disabled",
    disableRipple: "disableRipple",
    tabIndex: "tabIndex",
    editable: "editable"
  },
  outputs: {
    edited: "edited"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([{
    provide: MatChip,
    useExisting: MatChipRow
  }, {
    provide: MAT_CHIP,
    useExisting: MatChipRow
  }]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]],
  ngContentSelectors: _c4,
  decls: 11,
  vars: 13,
  consts: [[4, "ngIf"], ["role", "gridcell", 1, "mdc-evolution-chip__cell", "mdc-evolution-chip__cell--primary"], ["matChipAction", "", 3, "tabIndex", "disabled"], ["class", "mdc-evolution-chip__graphic mat-mdc-chip-graphic", 4, "ngIf"], [1, "mdc-evolution-chip__text-label", "mat-mdc-chip-action-label", 3, "ngSwitch"], [4, "ngSwitchCase"], [1, "mat-mdc-chip-primary-focus-indicator", "mat-mdc-focus-indicator"], ["class", "mdc-evolution-chip__cell mdc-evolution-chip__cell--trailing", "role", "gridcell", 4, "ngIf"], [1, "cdk-visually-hidden", 3, "id"], ["matRipple", "", 1, "mat-mdc-chip-ripple", 3, "matRippleDisabled", "matRippleCentered", "matRippleTrigger"], [1, "mat-mdc-chip-focus-overlay"], [1, "mdc-evolution-chip__graphic", "mat-mdc-chip-graphic"], [4, "ngIf", "ngIfElse"], ["defaultMatChipEditInput", ""], ["matChipEditInput", ""], ["role", "gridcell", 1, "mdc-evolution-chip__cell", "mdc-evolution-chip__cell--trailing"]],
  template: function MatChipRow_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"](_c3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, MatChipRow_ng_container_0_Template, 3, 3, "ng-container", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 1)(2, "span", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, MatChipRow_span_3_Template, 2, 0, "span", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "span", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, MatChipRow_ng_container_5_Template, 2, 0, "ng-container", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, MatChipRow_ng_container_6_Template, 4, 2, "ng-container", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "span", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, MatChipRow_span_8_Template, 2, 0, "span", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "span", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx._isEditing);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("tabIndex", ctx.tabIndex)("disabled", ctx.disabled);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("role", ctx.editable ? "button" : null)("aria-label", ctx.ariaLabel)("aria-describedby", ctx._ariaDescriptionId);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.leadingIcon);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitch", ctx._isEditing);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", false);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._hasTrailingIcon());
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("id", ctx._ariaDescriptionId);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.ariaDescription);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgSwitch, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgSwitchCase, _angular_material_core__WEBPACK_IMPORTED_MODULE_1__.MatRipple, MatChipAction, MatChipEditInput],
  styles: [_c2],
  encapsulation: 2,
  changeDetection: 0
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatChipRow, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'mat-chip-row, [mat-chip-row], mat-basic-chip-row, [mat-basic-chip-row]',
      inputs: ['color', 'disabled', 'disableRipple', 'tabIndex'],
      host: {
        'class': 'mat-mdc-chip mat-mdc-chip-row mdc-evolution-chip',
        '[class.mat-mdc-chip-with-avatar]': 'leadingIcon',
        '[class.mat-mdc-chip-disabled]': 'disabled',
        '[class.mat-mdc-chip-editing]': '_isEditing',
        '[class.mat-mdc-chip-editable]': 'editable',
        '[class.mdc-evolution-chip--disabled]': 'disabled',
        '[class.mdc-evolution-chip--with-trailing-action]': '_hasTrailingIcon()',
        '[class.mdc-evolution-chip--with-primary-graphic]': 'leadingIcon',
        '[class.mdc-evolution-chip--with-primary-icon]': 'leadingIcon',
        '[class.mdc-evolution-chip--with-avatar]': 'leadingIcon',
        '[class.mat-mdc-chip-highlighted]': 'highlighted',
        '[class.mat-mdc-chip-with-trailing-icon]': '_hasTrailingIcon()',
        '[id]': 'id',
        // Has to have a negative tabindex in order to capture
        // focus and redirect it to the primary action.
        '[attr.tabindex]': 'disabled ? null : -1',
        '[attr.aria-label]': 'null',
        '[attr.aria-description]': 'null',
        '[attr.role]': 'role',
        '(focus)': '_handleFocus($event)',
        '(dblclick)': '_handleDoubleclick($event)'
      },
      providers: [{
        provide: MatChip,
        useExisting: MatChipRow
      }, {
        provide: MAT_CHIP,
        useExisting: MatChipRow
      }],
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush,
      template: "<ng-container *ngIf=\"!_isEditing\">\n  <span matRipple class=\"mat-mdc-chip-ripple\"\n       [matRippleDisabled]=\"_isRippleDisabled()\"\n       [matRippleCentered]=\"_isRippleCentered\"\n       [matRippleTrigger]=\"_elementRef.nativeElement\"></span>\n  <span class=\"mat-mdc-chip-focus-overlay\"></span>\n</ng-container>\n\n\n<span class=\"mdc-evolution-chip__cell mdc-evolution-chip__cell--primary\" role=\"gridcell\">\n  <span\n    matChipAction\n    [attr.role]=\"editable ? 'button' : null\"\n    [tabIndex]=\"tabIndex\"\n    [disabled]=\"disabled\"\n    [attr.aria-label]=\"ariaLabel\"\n    [attr.aria-describedby]=\"_ariaDescriptionId\">\n    <span class=\"mdc-evolution-chip__graphic mat-mdc-chip-graphic\" *ngIf=\"leadingIcon\">\n      <ng-content select=\"mat-chip-avatar, [matChipAvatar]\"></ng-content>\n    </span>\n    <span class=\"mdc-evolution-chip__text-label mat-mdc-chip-action-label\" [ngSwitch]=\"_isEditing\">\n      <ng-container *ngSwitchCase=\"false\"><ng-content></ng-content></ng-container>\n\n      <ng-container *ngSwitchCase=\"true\">\n        <ng-content *ngIf=\"contentEditInput; else defaultMatChipEditInput\"\n                    select=\"[matChipEditInput]\"></ng-content>\n        <ng-template #defaultMatChipEditInput><span matChipEditInput></span></ng-template>\n      </ng-container>\n\n      <span class=\"mat-mdc-chip-primary-focus-indicator mat-mdc-focus-indicator\"></span>\n    </span>\n  </span>\n</span>\n\n<span\n  class=\"mdc-evolution-chip__cell mdc-evolution-chip__cell--trailing\"\n  role=\"gridcell\"\n  *ngIf=\"_hasTrailingIcon()\">\n  <ng-content select=\"mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]\"></ng-content>\n</span>\n\n<span class=\"cdk-visually-hidden\" [id]=\"_ariaDescriptionId\">{{ariaDescription}}</span>\n",
      styles: [".mdc-evolution-chip,.mdc-evolution-chip__cell,.mdc-evolution-chip__action{display:inline-flex;align-items:center}.mdc-evolution-chip{position:relative;max-width:100%}.mdc-evolution-chip .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-evolution-chip__cell,.mdc-evolution-chip__action{height:100%}.mdc-evolution-chip__cell--primary{overflow-x:hidden}.mdc-evolution-chip__cell--trailing{flex:1 0 auto}.mdc-evolution-chip__action{align-items:center;background:none;border:none;box-sizing:content-box;cursor:pointer;display:inline-flex;justify-content:center;outline:none;padding:0;text-decoration:none;color:inherit}.mdc-evolution-chip__action--presentational{cursor:auto}.mdc-evolution-chip--disabled,.mdc-evolution-chip__action:disabled{pointer-events:none}.mdc-evolution-chip__action--primary{overflow-x:hidden}.mdc-evolution-chip__action--trailing{position:relative;overflow:visible}.mdc-evolution-chip__action--primary:before{box-sizing:border-box;content:\"\";height:100%;left:0;position:absolute;pointer-events:none;top:0;width:100%;z-index:1}.mdc-evolution-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-evolution-chip__action-touch{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}.mdc-evolution-chip__text-label{white-space:nowrap;user-select:none;text-overflow:ellipsis;overflow:hidden}.mdc-evolution-chip__graphic{align-items:center;display:inline-flex;justify-content:center;overflow:hidden;pointer-events:none;position:relative;flex:1 0 auto}.mdc-evolution-chip__checkmark{position:absolute;opacity:0;top:50%;left:50%}.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--selected):not(.mdc-evolution-chip--with-primary-icon) .mdc-evolution-chip__graphic{width:0}.mdc-evolution-chip__checkmark-background{opacity:0}.mdc-evolution-chip__checkmark-svg{display:block}.mdc-evolution-chip__checkmark-path{stroke-width:2px;stroke-dasharray:29.7833385;stroke-dashoffset:29.7833385;stroke:currentColor}.mdc-evolution-chip--selecting .mdc-evolution-chip__graphic{transition:width 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark{transition:transform 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);transform:translate(-75%, -50%)}.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark-path{transition:stroke-dashoffset 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting .mdc-evolution-chip__graphic{transition:width 100ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting .mdc-evolution-chip__checkmark{transition:opacity 50ms 0ms linear,transform 100ms 0ms cubic-bezier(0.4, 0, 0.2, 1);transform:translate(-75%, -50%)}.mdc-evolution-chip--deselecting .mdc-evolution-chip__checkmark-path{stroke-dashoffset:0}.mdc-evolution-chip--selecting-with-primary-icon .mdc-evolution-chip__icon--primary{transition:opacity 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--selecting-with-primary-icon .mdc-evolution-chip__checkmark-path{transition:stroke-dashoffset 150ms 75ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting-with-primary-icon .mdc-evolution-chip__icon--primary{transition:opacity 150ms 75ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting-with-primary-icon .mdc-evolution-chip__checkmark{transition:opacity 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);transform:translate(-50%, -50%)}.mdc-evolution-chip--deselecting-with-primary-icon .mdc-evolution-chip__checkmark-path{stroke-dashoffset:0}.mdc-evolution-chip--selected .mdc-evolution-chip__icon--primary{opacity:0}.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark{transform:translate(-50%, -50%);opacity:1}.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark-path{stroke-dashoffset:0}@keyframes mdc-evolution-chip-enter{from{transform:scale(0.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-evolution-chip--enter{animation:mdc-evolution-chip-enter 100ms 0ms cubic-bezier(0, 0, 0.2, 1)}@keyframes mdc-evolution-chip-exit{from{opacity:1}to{opacity:0}}.mdc-evolution-chip--exit{animation:mdc-evolution-chip-exit 75ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-evolution-chip--hidden{opacity:0;pointer-events:none;transition:width 150ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mat-mdc-standard-chip .mdc-evolution-chip__checkmark{height:20px;width:20px}.mat-mdc-standard-chip .mdc-evolution-chip__icon--trailing{height:18px;width:18px;font-size:18px}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary{padding-left:12px;padding-right:12px}[dir=rtl] .mat-mdc-standard-chip .mdc-evolution-chip__action--primary,.mat-mdc-standard-chip .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:12px;padding-right:12px}.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic{padding-left:6px;padding-right:6px}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic,.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic[dir=rtl]{padding-left:6px;padding-right:6px}.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary{padding-left:0;padding-right:12px}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary,.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:12px;padding-right:0}.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing{padding-left:8px;padding-right:8px}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing,.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing[dir=rtl]{padding-left:8px;padding-right:8px}.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing{left:8px;right:initial}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing,.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing[dir=rtl]{left:initial;right:8px}.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary{padding-left:12px;padding-right:0}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary,.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:0;padding-right:12px}.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic{padding-left:6px;padding-right:6px}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic,.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic[dir=rtl]{padding-left:6px;padding-right:6px}.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing{padding-left:8px;padding-right:8px}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing,.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing[dir=rtl]{padding-left:8px;padding-right:8px}.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing{left:8px;right:initial}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing,.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing[dir=rtl]{left:initial;right:8px}.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary{padding-left:0;padding-right:0}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary,.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:0;padding-right:0}.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__checkmark{color:var(--mdc-chip-with-icon-selected-icon-color, currentColor)}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic{padding-left:4px;padding-right:8px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic[dir=rtl]{padding-left:8px;padding-right:4px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary{padding-left:0;padding-right:12px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:12px;padding-right:0}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic{padding-left:4px;padding-right:8px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic[dir=rtl]{padding-left:8px;padding-right:4px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing{padding-left:8px;padding-right:8px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing[dir=rtl]{padding-left:8px;padding-right:8px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing{left:8px;right:initial}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing[dir=rtl]{left:initial;right:8px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary{padding-left:0;padding-right:0}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--with-primary-icon){--mdc-chip-graphic-selected-width:24px}.mdc-evolution-chip--with-avatar .mdc-evolution-chip__graphic{height:24px;width:24px;font-size:24px}.mdc-evolution-chip--with-avatar .mdc-evolution-chip__icon--primary{height:24px;width:24px;font-size:24px}.mat-mdc-standard-chip{-webkit-tap-highlight-color:rgba(0,0,0,0);border-radius:var(--mdc-chip-container-shape-radius, 16px 16px 16px 16px);height:var(--mdc-chip-container-height, 32px)}.mat-mdc-standard-chip .mdc-evolution-chip__ripple{border-radius:var(--mdc-chip-container-shape-radius, 16px 16px 16px 16px)}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary:before{border-radius:var(--mdc-chip-container-shape-radius, 16px 16px 16px 16px)}.mat-mdc-standard-chip .mdc-evolution-chip__icon--primary{border-radius:var(--mdc-chip-with-avatar-avatar-shape-radius, 14px 14px 14px 14px)}.mat-mdc-standard-chip.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--with-primary-icon){--mdc-chip-graphic-selected-width:var(--mdc-chip-with-avatar-avatar-size, 28px)}.mat-mdc-standard-chip .mdc-evolution-chip__graphic{height:var(--mdc-chip-with-avatar-avatar-size, 28px);width:var(--mdc-chip-with-avatar-avatar-size, 28px);font-size:var(--mdc-chip-with-avatar-avatar-size, 28px)}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary:before{border-width:var(--mdc-chip-outline-width, 1px)}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary:before{border-width:var(--mdc-chip-flat-outline-width, 1px)}.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__action--primary:before{border-width:var(--mdc-chip-flat-selected-outline-width, 0)}.mat-mdc-standard-chip:not(.mdc-evolution-chip--selected) .mdc-evolution-chip__action--primary:before{border-width:var(--mdc-chip-flat-unselected-outline-width, 1px)}.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled){background-color:var(--mdc-chip-elevated-container-color, transparent)}.mat-mdc-standard-chip.mdc-evolution-chip--disabled{background-color:var(--mdc-chip-elevated-disabled-container-color, transparent)}.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled{background-color:var(--mdc-chip-elevated-disabled-container-color, transparent)}.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__text-label{color:var(--mdc-chip-label-text-color, currentColor)}.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label{color:var(--mdc-chip-disabled-label-text-color, currentColor)}.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label{color:var(--mdc-chip-disabled-label-text-color, currentColor)}.mat-mdc-standard-chip .mdc-evolution-chip__icon--primary{height:var(--mdc-chip-with-icon-icon-size, 18px);width:var(--mdc-chip-with-icon-icon-size, 18px);font-size:var(--mdc-chip-with-icon-icon-size, 18px)}.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__icon--primary{color:var(--mdc-chip-with-icon-icon-color, currentColor)}.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--primary{color:var(--mdc-chip-with-icon-disabled-icon-color, currentColor)}.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__checkmark{color:var(--mdc-chip-with-icon-selected-icon-color, currentColor)}.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__checkmark{color:var(--mdc-chip-with-icon-disabled-icon-color, currentColor)}.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__icon--trailing{color:var(--mdc-chip-with-trailing-icon-trailing-icon-color, currentColor)}.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing{color:var(--mdc-chip-with-trailing-icon-disabled-trailing-icon-color, currentColor)}.cdk-high-contrast-active .mat-mdc-standard-chip{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-standard-chip .mdc-evolution-chip__checkmark-path{stroke:CanvasText !important}.mat-mdc-standard-chip.mdc-evolution-chip--disabled{opacity:.4}.mat-mdc-standard-chip .mdc-evolution-chip__cell--primary,.mat-mdc-standard-chip .mdc-evolution-chip__action--primary,.mat-mdc-standard-chip .mat-mdc-chip-action-label{overflow:visible}.mat-mdc-standard-chip .mdc-evolution-chip__cell--primary{width:100%}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary{font:inherit;letter-spacing:inherit;white-space:inherit}.mat-mdc-standard-chip .mat-mdc-chip-graphic,.mat-mdc-standard-chip .mat-mdc-chip-trailing-icon{box-sizing:content-box}.mat-mdc-standard-chip._mat-animation-noopable,.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__graphic,.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark,.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark-path{transition-duration:1ms;animation-duration:1ms}.mat-mdc-basic-chip .mdc-evolution-chip__action--primary{font:inherit}.mat-mdc-chip-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;opacity:0;border-radius:inherit;transition:opacity 150ms linear}._mat-animation-noopable .mat-mdc-chip-focus-overlay{transition:none}.mat-mdc-basic-chip .mat-mdc-chip-focus-overlay{display:none}.mat-mdc-chip:hover .mat-mdc-chip-focus-overlay{opacity:.04}.mat-mdc-chip.cdk-focused .mat-mdc-chip-focus-overlay{opacity:.12}.mat-mdc-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-chip-avatar{text-align:center;line-height:1;color:var(--mdc-chip-with-icon-icon-color, currentColor)}.mat-mdc-chip{position:relative;z-index:0}.mat-mdc-chip-action-label{text-align:left;z-index:1}[dir=rtl] .mat-mdc-chip-action-label{text-align:right}.mat-mdc-chip.mdc-evolution-chip--with-trailing-action .mat-mdc-chip-action-label{position:relative}.mat-mdc-chip-action-label .mat-mdc-chip-primary-focus-indicator{position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none}.mat-mdc-chip-action-label .mat-mdc-focus-indicator::before{margin:calc(calc(var(--mat-mdc-focus-indicator-border-width, 3px) + 2px) * -1)}.mat-mdc-chip-remove{opacity:.54}.mat-mdc-chip-remove:focus{opacity:1}.mat-mdc-chip-remove::before{margin:calc(var(--mat-mdc-focus-indicator-border-width, 3px) * -1);left:8px;right:8px}.mat-mdc-chip-remove .mat-icon{width:inherit;height:inherit;font-size:inherit;box-sizing:content-box}.mat-chip-edit-input{cursor:text;display:inline-block;color:inherit;outline:0}.cdk-high-contrast-active .mat-mdc-chip-selected:not(.mat-mdc-chip-multiple){outline-width:3px}.mat-mdc-chip-action:focus .mat-mdc-focus-indicator::before{content:\"\"}"]
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone
    }, {
      type: _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_7__.FocusMonitor
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.DOCUMENT]
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [_angular_core__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_MODULE_TYPE]
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [_angular_material_core__WEBPACK_IMPORTED_MODULE_1__.MAT_RIPPLE_GLOBAL_OPTIONS]
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Attribute,
        args: ['tabindex']
      }]
    }];
  }, {
    editable: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    edited: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    defaultEditInput: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChild,
      args: [MatChipEditInput]
    }],
    contentEditInput: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChild,
      args: [MatChipEditInput]
    }]
  });
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Boilerplate for applying mixins to MatChipSet.
 * @docs-private
 */
class MatChipSetBase {
  constructor(_elementRef) {}
}
const _MatChipSetMixinBase = (0,_angular_material_core__WEBPACK_IMPORTED_MODULE_1__.mixinTabIndex)(MatChipSetBase);
/**
 * Basic container component for the MatChip component.
 *
 * Extended by MatChipListbox and MatChipGrid for different interaction patterns.
 */
class MatChipSet extends _MatChipSetMixinBase {
  /** Combined stream of all of the child chips' focus events. */
  get chipFocusChanges() {
    return this._getChipStream(chip => chip._onFocus);
  }
  /** Combined stream of all of the child chips' remove events. */
  get chipDestroyedChanges() {
    return this._getChipStream(chip => chip.destroyed);
  }
  /** Whether the chip set is disabled. */
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    this._disabled = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceBooleanProperty)(value);
    this._syncChipsState();
  }
  /** Whether the chip list contains chips or not. */
  get empty() {
    return this._chips.length === 0;
  }
  /** The ARIA role applied to the chip set. */
  get role() {
    if (this._explicitRole) {
      return this._explicitRole;
    }
    return this.empty ? null : this._defaultRole;
  }
  set role(value) {
    this._explicitRole = value;
  }
  /** Whether any of the chips inside of this chip-set has focus. */
  get focused() {
    return this._hasFocusedChip();
  }
  constructor(_elementRef, _changeDetectorRef, _dir) {
    super(_elementRef);
    this._elementRef = _elementRef;
    this._changeDetectorRef = _changeDetectorRef;
    this._dir = _dir;
    /** Index of the last destroyed chip that had focus. */
    this._lastDestroyedFocusedChipIndex = null;
    /** Subject that emits when the component has been destroyed. */
    this._destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_4__.Subject();
    /** Role to use if it hasn't been overwritten by the user. */
    this._defaultRole = 'presentation';
    this._disabled = false;
    this._explicitRole = null;
    /** Flat list of all the actions contained within the chips. */
    this._chipActions = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.QueryList();
  }
  ngAfterViewInit() {
    this._setUpFocusManagement();
    this._trackChipSetChanges();
    this._trackDestroyedFocusedChip();
  }
  ngOnDestroy() {
    this._keyManager?.destroy();
    this._chipActions.destroy();
    this._destroyed.next();
    this._destroyed.complete();
  }
  /** Checks whether any of the chips is focused. */
  _hasFocusedChip() {
    return this._chips && this._chips.some(chip => chip._hasFocus());
  }
  /** Syncs the chip-set's state with the individual chips. */
  _syncChipsState() {
    if (this._chips) {
      this._chips.forEach(chip => {
        chip.disabled = this._disabled;
        chip._changeDetectorRef.markForCheck();
      });
    }
  }
  /** Dummy method for subclasses to override. Base chip set cannot be focused. */
  focus() {}
  /** Handles keyboard events on the chip set. */
  _handleKeydown(event) {
    if (this._originatesFromChip(event)) {
      this._keyManager.onKeydown(event);
    }
  }
  /**
   * Utility to ensure all indexes are valid.
   *
   * @param index The index to be checked.
   * @returns True if the index is valid for our list of chips.
   */
  _isValidIndex(index) {
    return index >= 0 && index < this._chips.length;
  }
  /**
   * Removes the `tabindex` from the chip set and resets it back afterwards, allowing the
   * user to tab out of it. This prevents the set from capturing focus and redirecting
   * it back to the first chip, creating a focus trap, if it user tries to tab away.
   */
  _allowFocusEscape() {
    if (this.tabIndex !== -1) {
      const previousTabIndex = this.tabIndex;
      this.tabIndex = -1;
      // Note that this needs to be a `setTimeout`, because a `Promise.resolve`
      // doesn't allow enough time for the focus to escape.
      setTimeout(() => this.tabIndex = previousTabIndex);
    }
  }
  /**
   * Gets a stream of events from all the chips within the set.
   * The stream will automatically incorporate any newly-added chips.
   */
  _getChipStream(mappingFunction) {
    return this._chips.changes.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.startWith)(null), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.switchMap)(() => (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.merge)(...this._chips.map(mappingFunction))));
  }
  /** Checks whether an event comes from inside a chip element. */
  _originatesFromChip(event) {
    let currentElement = event.target;
    while (currentElement && currentElement !== this._elementRef.nativeElement) {
      if (currentElement.classList.contains('mat-mdc-chip')) {
        return true;
      }
      currentElement = currentElement.parentElement;
    }
    return false;
  }
  /** Sets up the chip set's focus management logic. */
  _setUpFocusManagement() {
    // Create a flat `QueryList` containing the actions of all of the chips.
    // This allows us to navigate both within the chip and move to the next/previous
    // one using the existing `ListKeyManager`.
    this._chips.changes.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.startWith)(this._chips)).subscribe(chips => {
      const actions = [];
      chips.forEach(chip => chip._getActions().forEach(action => actions.push(action)));
      this._chipActions.reset(actions);
      this._chipActions.notifyOnChanges();
    });
    this._keyManager = new _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_7__.FocusKeyManager(this._chipActions).withVerticalOrientation().withHorizontalOrientation(this._dir ? this._dir.value : 'ltr').withHomeAndEnd().skipPredicate(action => this._skipPredicate(action));
    // Keep the manager active index in sync so that navigation picks
    // up from the current chip if the user clicks into the list directly.
    this.chipFocusChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.takeUntil)(this._destroyed)).subscribe(({
      chip
    }) => {
      const action = chip._getSourceAction(document.activeElement);
      if (action) {
        this._keyManager.updateActiveItem(action);
      }
    });
    this._dir?.change.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.takeUntil)(this._destroyed)).subscribe(direction => this._keyManager.withHorizontalOrientation(direction));
  }
  /**
   * Determines if key manager should avoid putting a given chip action in the tab index. Skip
   * non-interactive and disabled actions since the user can't do anything with them.
   */
  _skipPredicate(action) {
    // Skip chips that the user cannot interact with. `mat-chip-set` does not permit focusing disabled
    // chips.
    return !action.isInteractive || action.disabled;
  }
  /** Listens to changes in the chip set and syncs up the state of the individual chips. */
  _trackChipSetChanges() {
    this._chips.changes.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.startWith)(null), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.takeUntil)(this._destroyed)).subscribe(() => {
      if (this.disabled) {
        // Since this happens after the content has been
        // checked, we need to defer it to the next tick.
        Promise.resolve().then(() => this._syncChipsState());
      }
      this._redirectDestroyedChipFocus();
    });
  }
  /** Starts tracking the destroyed chips in order to capture the focused one. */
  _trackDestroyedFocusedChip() {
    this.chipDestroyedChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.takeUntil)(this._destroyed)).subscribe(event => {
      const chipArray = this._chips.toArray();
      const chipIndex = chipArray.indexOf(event.chip);
      // If the focused chip is destroyed, save its index so that we can move focus to the next
      // chip. We only save the index here, rather than move the focus immediately, because we want
      // to wait until the chip is removed from the chip list before focusing the next one. This
      // allows us to keep focus on the same index if the chip gets swapped out.
      if (this._isValidIndex(chipIndex) && event.chip._hasFocus()) {
        this._lastDestroyedFocusedChipIndex = chipIndex;
      }
    });
  }
  /**
   * Finds the next appropriate chip to move focus to,
   * if the currently-focused chip is destroyed.
   */
  _redirectDestroyedChipFocus() {
    if (this._lastDestroyedFocusedChipIndex == null) {
      return;
    }
    if (this._chips.length) {
      const newIndex = Math.min(this._lastDestroyedFocusedChipIndex, this._chips.length - 1);
      const chipToFocus = this._chips.toArray()[newIndex];
      if (chipToFocus.disabled) {
        // If we're down to one disabled chip, move focus back to the set.
        if (this._chips.length === 1) {
          this.focus();
        } else {
          this._keyManager.setPreviousItemActive();
        }
      } else {
        chipToFocus.focus();
      }
    } else {
      this.focus();
    }
    this._lastDestroyedFocusedChipIndex = null;
  }
}
MatChipSet.ɵfac = function MatChipSet_Factory(t) {
  return new (t || MatChipSet)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_12__.Directionality, 8));
};
MatChipSet.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: MatChipSet,
  selectors: [["mat-chip-set"]],
  contentQueries: function MatChipSet_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, MatChip, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._chips = _t);
    }
  },
  hostAttrs: [1, "mat-mdc-chip-set", "mdc-evolution-chip-set"],
  hostVars: 1,
  hostBindings: function MatChipSet_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("keydown", function MatChipSet_keydown_HostBindingHandler($event) {
        return ctx._handleKeydown($event);
      });
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("role", ctx.role);
    }
  },
  inputs: {
    disabled: "disabled",
    role: "role"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]],
  ngContentSelectors: _c5,
  decls: 2,
  vars: 0,
  consts: [["role", "presentation", 1, "mdc-evolution-chip-set__chips"]],
  template: function MatChipSet_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
  },
  styles: [".mdc-evolution-chip-set{display:flex}.mdc-evolution-chip-set:focus{outline:none}.mdc-evolution-chip-set__chips{display:flex;flex-flow:wrap;min-width:0}.mdc-evolution-chip-set--overflow .mdc-evolution-chip-set__chips{flex-flow:nowrap}.mdc-evolution-chip-set .mdc-evolution-chip-set__chips{margin-left:-8px;margin-right:0}[dir=rtl] .mdc-evolution-chip-set .mdc-evolution-chip-set__chips,.mdc-evolution-chip-set .mdc-evolution-chip-set__chips[dir=rtl]{margin-left:0;margin-right:-8px}.mdc-evolution-chip-set .mdc-evolution-chip{margin-left:8px;margin-right:0}[dir=rtl] .mdc-evolution-chip-set .mdc-evolution-chip,.mdc-evolution-chip-set .mdc-evolution-chip[dir=rtl]{margin-left:0;margin-right:8px}.mdc-evolution-chip-set .mdc-evolution-chip{margin-top:4px;margin-bottom:4px}.mat-mdc-chip-set .mdc-evolution-chip-set__chips{min-width:100%}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px;margin-left:8px}[dir=rtl] input.mat-mdc-chip-input{margin-left:0;margin-right:8px}"],
  encapsulation: 2,
  changeDetection: 0
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatChipSet, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'mat-chip-set',
      template: `
    <div class="mdc-evolution-chip-set__chips" role="presentation">
      <ng-content></ng-content>
    </div>
  `,
      host: {
        'class': 'mat-mdc-chip-set mdc-evolution-chip-set',
        '(keydown)': '_handleKeydown($event)',
        '[attr.role]': 'role'
      },
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush,
      styles: [".mdc-evolution-chip-set{display:flex}.mdc-evolution-chip-set:focus{outline:none}.mdc-evolution-chip-set__chips{display:flex;flex-flow:wrap;min-width:0}.mdc-evolution-chip-set--overflow .mdc-evolution-chip-set__chips{flex-flow:nowrap}.mdc-evolution-chip-set .mdc-evolution-chip-set__chips{margin-left:-8px;margin-right:0}[dir=rtl] .mdc-evolution-chip-set .mdc-evolution-chip-set__chips,.mdc-evolution-chip-set .mdc-evolution-chip-set__chips[dir=rtl]{margin-left:0;margin-right:-8px}.mdc-evolution-chip-set .mdc-evolution-chip{margin-left:8px;margin-right:0}[dir=rtl] .mdc-evolution-chip-set .mdc-evolution-chip,.mdc-evolution-chip-set .mdc-evolution-chip[dir=rtl]{margin-left:0;margin-right:8px}.mdc-evolution-chip-set .mdc-evolution-chip{margin-top:4px;margin-bottom:4px}.mat-mdc-chip-set .mdc-evolution-chip-set__chips{min-width:100%}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px;margin-left:8px}[dir=rtl] input.mat-mdc-chip-input{margin-left:0;margin-right:8px}"]
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef
    }, {
      type: _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_12__.Directionality,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }]
    }];
  }, {
    disabled: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    role: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    _chips: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChildren,
      args: [MatChip, {
        // We need to use `descendants: true`, because Ivy will no longer match
        // indirect descendants if it's left as false.
        descendants: true
      }]
    }]
  });
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Change event object that is emitted when the chip listbox value has changed. */
class MatChipListboxChange {
  constructor( /** Chip listbox that emitted the event. */
  source, /** Value of the chip listbox when the event was emitted. */
  value) {
    this.source = source;
    this.value = value;
  }
}
/**
 * Provider Expression that allows mat-chip-listbox to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
const MAT_CHIP_LISTBOX_CONTROL_VALUE_ACCESSOR = {
  provide: _angular_forms__WEBPACK_IMPORTED_MODULE_13__.NG_VALUE_ACCESSOR,
  useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => MatChipListbox),
  multi: true
};
/**
 * An extension of the MatChipSet component that supports chip selection.
 * Used with MatChipOption chips.
 */
class MatChipListbox extends MatChipSet {
  constructor() {
    super(...arguments);
    /**
     * Function when touched. Set as part of ControlValueAccessor implementation.
     * @docs-private
     */
    this._onTouched = () => {};
    /**
     * Function when changed. Set as part of ControlValueAccessor implementation.
     * @docs-private
     */
    this._onChange = () => {};
    // TODO: MDC uses `grid` here
    this._defaultRole = 'listbox';
    /** Default chip options. */
    this._defaultOptions = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(MAT_CHIPS_DEFAULT_OPTIONS, {
      optional: true
    });
    this._multiple = false;
    /** Orientation of the chip list. */
    this.ariaOrientation = 'horizontal';
    this._selectable = true;
    /**
     * A function to compare the option values with the selected values. The first argument
     * is a value from an option. The second is a value from the selection. A boolean
     * should be returned.
     */
    this.compareWith = (o1, o2) => o1 === o2;
    this._required = false;
    this._hideSingleSelectionIndicator = this._defaultOptions?.hideSingleSelectionIndicator ?? false;
    /** Event emitted when the selected chip listbox value has been changed by the user. */
    this.change = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
  }
  /** Whether the user should be allowed to select multiple chips. */
  get multiple() {
    return this._multiple;
  }
  set multiple(value) {
    this._multiple = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceBooleanProperty)(value);
    this._syncListboxProperties();
  }
  /** The array of selected chips inside the chip listbox. */
  get selected() {
    const selectedChips = this._chips.toArray().filter(chip => chip.selected);
    return this.multiple ? selectedChips : selectedChips[0];
  }
  /**
   * Whether or not this chip listbox is selectable.
   *
   * When a chip listbox is not selectable, the selected states for all
   * the chips inside the chip listbox are always ignored.
   */
  get selectable() {
    return this._selectable;
  }
  set selectable(value) {
    this._selectable = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceBooleanProperty)(value);
    this._syncListboxProperties();
  }
  /** Whether this chip listbox is required. */
  get required() {
    return this._required;
  }
  set required(value) {
    this._required = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceBooleanProperty)(value);
  }
  /** Whether checkmark indicator for single-selection options is hidden. */
  get hideSingleSelectionIndicator() {
    return this._hideSingleSelectionIndicator;
  }
  set hideSingleSelectionIndicator(value) {
    this._hideSingleSelectionIndicator = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceBooleanProperty)(value);
    this._syncListboxProperties();
  }
  /** Combined stream of all of the child chips' selection change events. */
  get chipSelectionChanges() {
    return this._getChipStream(chip => chip.selectionChange);
  }
  /** Combined stream of all of the child chips' blur events. */
  get chipBlurChanges() {
    return this._getChipStream(chip => chip._onBlur);
  }
  /** The value of the listbox, which is the combined value of the selected chips. */
  get value() {
    return this._value;
  }
  set value(value) {
    this.writeValue(value);
    this._value = value;
  }
  ngAfterContentInit() {
    if (this._pendingInitialValue !== undefined) {
      Promise.resolve().then(() => {
        this._setSelectionByValue(this._pendingInitialValue, false);
        this._pendingInitialValue = undefined;
      });
    }
    this._chips.changes.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.startWith)(null), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.takeUntil)(this._destroyed)).subscribe(() => {
      // Update listbox selectable/multiple properties on chips
      this._syncListboxProperties();
    });
    this.chipBlurChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.takeUntil)(this._destroyed)).subscribe(() => this._blur());
    this.chipSelectionChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.takeUntil)(this._destroyed)).subscribe(event => {
      if (!this.multiple) {
        this._chips.forEach(chip => {
          if (chip !== event.source) {
            chip._setSelectedState(false, false, false);
          }
        });
      }
      if (event.isUserInput) {
        this._propagateChanges();
      }
    });
  }
  /**
   * Focuses the first selected chip in this chip listbox, or the first non-disabled chip when there
   * are no selected chips.
   */
  focus() {
    if (this.disabled) {
      return;
    }
    const firstSelectedChip = this._getFirstSelectedChip();
    if (firstSelectedChip && !firstSelectedChip.disabled) {
      firstSelectedChip.focus();
    } else if (this._chips.length > 0) {
      this._keyManager.setFirstItemActive();
    } else {
      this._elementRef.nativeElement.focus();
    }
  }
  /**
   * Implemented as part of ControlValueAccessor.
   * @docs-private
   */
  writeValue(value) {
    if (this._chips) {
      this._setSelectionByValue(value, false);
    } else if (value != null) {
      this._pendingInitialValue = value;
    }
  }
  /**
   * Implemented as part of ControlValueAccessor.
   * @docs-private
   */
  registerOnChange(fn) {
    this._onChange = fn;
  }
  /**
   * Implemented as part of ControlValueAccessor.
   * @docs-private
   */
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  /**
   * Implemented as part of ControlValueAccessor.
   * @docs-private
   */
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
  }
  /** Selects all chips with value. */
  _setSelectionByValue(value, isUserInput = true) {
    this._clearSelection();
    if (Array.isArray(value)) {
      value.forEach(currentValue => this._selectValue(currentValue, isUserInput));
    } else {
      this._selectValue(value, isUserInput);
    }
  }
  /** When blurred, marks the field as touched when focus moved outside the chip listbox. */
  _blur() {
    if (!this.disabled) {
      // Wait to see if focus moves to an individual chip.
      setTimeout(() => {
        if (!this.focused) {
          this._propagateChanges();
          this._markAsTouched();
        }
      });
    }
  }
  _keydown(event) {
    if (event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_3__.TAB) {
      super._allowFocusEscape();
    }
  }
  /** Marks the field as touched */
  _markAsTouched() {
    this._onTouched();
    this._changeDetectorRef.markForCheck();
  }
  /** Emits change event to set the model value. */
  _propagateChanges() {
    let valueToEmit = null;
    if (Array.isArray(this.selected)) {
      valueToEmit = this.selected.map(chip => chip.value);
    } else {
      valueToEmit = this.selected ? this.selected.value : undefined;
    }
    this._value = valueToEmit;
    this.change.emit(new MatChipListboxChange(this, valueToEmit));
    this._onChange(valueToEmit);
    this._changeDetectorRef.markForCheck();
  }
  /**
   * Deselects every chip in the listbox.
   * @param skip Chip that should not be deselected.
   */
  _clearSelection(skip) {
    this._chips.forEach(chip => {
      if (chip !== skip) {
        chip.deselect();
      }
    });
  }
  /**
   * Finds and selects the chip based on its value.
   * @returns Chip that has the corresponding value.
   */
  _selectValue(value, isUserInput) {
    const correspondingChip = this._chips.find(chip => {
      return chip.value != null && this.compareWith(chip.value, value);
    });
    if (correspondingChip) {
      isUserInput ? correspondingChip.selectViaInteraction() : correspondingChip.select();
    }
    return correspondingChip;
  }
  /** Syncs the chip-listbox selection state with the individual chips. */
  _syncListboxProperties() {
    if (this._chips) {
      // Defer setting the value in order to avoid the "Expression
      // has changed after it was checked" errors from Angular.
      Promise.resolve().then(() => {
        this._chips.forEach(chip => {
          chip._chipListMultiple = this.multiple;
          chip.chipListSelectable = this._selectable;
          chip._chipListHideSingleSelectionIndicator = this.hideSingleSelectionIndicator;
          chip._changeDetectorRef.markForCheck();
        });
      });
    }
  }
  /** Returns the first selected chip in this listbox, or undefined if no chips are selected. */
  _getFirstSelectedChip() {
    if (Array.isArray(this.selected)) {
      return this.selected.length ? this.selected[0] : undefined;
    } else {
      return this.selected;
    }
  }
  /**
   * Determines if key manager should avoid putting a given chip action in the tab index. Skip
   * non-interactive actions since the user can't do anything with them.
   */
  _skipPredicate(action) {
    // Override the skip predicate in the base class to avoid skipping disabled chips. Allow
    // disabled chip options to receive focus to align with WAI ARIA recommendation. Normally WAI
    // ARIA's instructions are to exclude disabled items from the tab order, but it makes a few
    // exceptions for compound widgets.
    //
    // From [Developing a Keyboard Interface](
    // https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/):
    //   "For the following composite widget elements, keep them focusable when disabled: Options in a
    //   Listbox..."
    return !action.isInteractive;
  }
}
MatChipListbox.ɵfac = /* @__PURE__ */function () {
  let ɵMatChipListbox_BaseFactory;
  return function MatChipListbox_Factory(t) {
    return (ɵMatChipListbox_BaseFactory || (ɵMatChipListbox_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](MatChipListbox)))(t || MatChipListbox);
  };
}();
MatChipListbox.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: MatChipListbox,
  selectors: [["mat-chip-listbox"]],
  contentQueries: function MatChipListbox_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, MatChipOption, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._chips = _t);
    }
  },
  hostAttrs: [1, "mdc-evolution-chip-set", "mat-mdc-chip-listbox"],
  hostVars: 11,
  hostBindings: function MatChipListbox_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("focus", function MatChipListbox_focus_HostBindingHandler() {
        return ctx.focus();
      })("blur", function MatChipListbox_blur_HostBindingHandler() {
        return ctx._blur();
      })("keydown", function MatChipListbox_keydown_HostBindingHandler($event) {
        return ctx._keydown($event);
      });
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵhostProperty"]("tabIndex", ctx.empty ? -1 : ctx.tabIndex);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("role", ctx.role)("aria-describedby", ctx._ariaDescribedby || null)("aria-required", ctx.role ? ctx.required : null)("aria-disabled", ctx.disabled.toString())("aria-multiselectable", ctx.multiple)("aria-orientation", ctx.ariaOrientation);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mat-mdc-chip-list-disabled", ctx.disabled)("mat-mdc-chip-list-required", ctx.required);
    }
  },
  inputs: {
    tabIndex: "tabIndex",
    multiple: "multiple",
    ariaOrientation: ["aria-orientation", "ariaOrientation"],
    selectable: "selectable",
    compareWith: "compareWith",
    required: "required",
    hideSingleSelectionIndicator: "hideSingleSelectionIndicator",
    value: "value"
  },
  outputs: {
    change: "change"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([MAT_CHIP_LISTBOX_CONTROL_VALUE_ACCESSOR]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]],
  ngContentSelectors: _c5,
  decls: 2,
  vars: 0,
  consts: [["role", "presentation", 1, "mdc-evolution-chip-set__chips"]],
  template: function MatChipListbox_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
  },
  styles: [_c6],
  encapsulation: 2,
  changeDetection: 0
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatChipListbox, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'mat-chip-listbox',
      template: `
    <div class="mdc-evolution-chip-set__chips" role="presentation">
      <ng-content></ng-content>
    </div>
  `,
      inputs: ['tabIndex'],
      host: {
        'class': 'mdc-evolution-chip-set mat-mdc-chip-listbox',
        '[attr.role]': 'role',
        '[tabIndex]': 'empty ? -1 : tabIndex',
        // TODO: replace this binding with use of AriaDescriber
        '[attr.aria-describedby]': '_ariaDescribedby || null',
        '[attr.aria-required]': 'role ? required : null',
        '[attr.aria-disabled]': 'disabled.toString()',
        '[attr.aria-multiselectable]': 'multiple',
        '[attr.aria-orientation]': 'ariaOrientation',
        '[class.mat-mdc-chip-list-disabled]': 'disabled',
        '[class.mat-mdc-chip-list-required]': 'required',
        '(focus)': 'focus()',
        '(blur)': '_blur()',
        '(keydown)': '_keydown($event)'
      },
      providers: [MAT_CHIP_LISTBOX_CONTROL_VALUE_ACCESSOR],
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush,
      styles: [".mdc-evolution-chip-set{display:flex}.mdc-evolution-chip-set:focus{outline:none}.mdc-evolution-chip-set__chips{display:flex;flex-flow:wrap;min-width:0}.mdc-evolution-chip-set--overflow .mdc-evolution-chip-set__chips{flex-flow:nowrap}.mdc-evolution-chip-set .mdc-evolution-chip-set__chips{margin-left:-8px;margin-right:0}[dir=rtl] .mdc-evolution-chip-set .mdc-evolution-chip-set__chips,.mdc-evolution-chip-set .mdc-evolution-chip-set__chips[dir=rtl]{margin-left:0;margin-right:-8px}.mdc-evolution-chip-set .mdc-evolution-chip{margin-left:8px;margin-right:0}[dir=rtl] .mdc-evolution-chip-set .mdc-evolution-chip,.mdc-evolution-chip-set .mdc-evolution-chip[dir=rtl]{margin-left:0;margin-right:8px}.mdc-evolution-chip-set .mdc-evolution-chip{margin-top:4px;margin-bottom:4px}.mat-mdc-chip-set .mdc-evolution-chip-set__chips{min-width:100%}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px;margin-left:8px}[dir=rtl] input.mat-mdc-chip-input{margin-left:0;margin-right:8px}"]
    }]
  }], null, {
    multiple: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    ariaOrientation: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: ['aria-orientation']
    }],
    selectable: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    compareWith: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    required: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    hideSingleSelectionIndicator: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    value: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    change: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    _chips: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChildren,
      args: [MatChipOption, {
        // We need to use `descendants: true`, because Ivy will no longer match
        // indirect descendants if it's left as false.
        descendants: true
      }]
    }]
  });
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Change event object that is emitted when the chip grid value has changed. */
class MatChipGridChange {
  constructor( /** Chip grid that emitted the event. */
  source, /** Value of the chip grid when the event was emitted. */
  value) {
    this.source = source;
    this.value = value;
  }
}
/**
 * Boilerplate for applying mixins to MatChipGrid.
 * @docs-private
 */
class MatChipGridBase extends MatChipSet {
  constructor(elementRef, changeDetectorRef, dir, _defaultErrorStateMatcher, _parentForm, _parentFormGroup,
  /**
   * Form control bound to the component.
   * Implemented as part of `MatFormFieldControl`.
   * @docs-private
   */
  ngControl) {
    super(elementRef, changeDetectorRef, dir);
    this._defaultErrorStateMatcher = _defaultErrorStateMatcher;
    this._parentForm = _parentForm;
    this._parentFormGroup = _parentFormGroup;
    this.ngControl = ngControl;
    /**
     * Emits whenever the component state changes and should cause the parent
     * form-field to update. Implemented as part of `MatFormFieldControl`.
     * @docs-private
     */
    this.stateChanges = new rxjs__WEBPACK_IMPORTED_MODULE_4__.Subject();
  }
}
const _MatChipGridMixinBase = (0,_angular_material_core__WEBPACK_IMPORTED_MODULE_1__.mixinErrorState)(MatChipGridBase);
/**
 * An extension of the MatChipSet component used with MatChipRow chips and
 * the matChipInputFor directive.
 */
class MatChipGrid extends _MatChipGridMixinBase {
  /**
   * Implemented as part of MatFormFieldControl.
   * @docs-private
   */
  get disabled() {
    return this.ngControl ? !!this.ngControl.disabled : this._disabled;
  }
  set disabled(value) {
    this._disabled = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceBooleanProperty)(value);
    this._syncChipsState();
  }
  /**
   * Implemented as part of MatFormFieldControl.
   * @docs-private
   */
  get id() {
    return this._chipInput.id;
  }
  /**
   * Implemented as part of MatFormFieldControl.
   * @docs-private
   */
  get empty() {
    return (!this._chipInput || this._chipInput.empty) && (!this._chips || this._chips.length === 0);
  }
  /**
   * Implemented as part of MatFormFieldControl.
   * @docs-private
   */
  get placeholder() {
    return this._chipInput ? this._chipInput.placeholder : this._placeholder;
  }
  set placeholder(value) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  /** Whether any chips or the matChipInput inside of this chip-grid has focus. */
  get focused() {
    return this._chipInput.focused || this._hasFocusedChip();
  }
  /**
   * Implemented as part of MatFormFieldControl.
   * @docs-private
   */
  get required() {
    return this._required ?? this.ngControl?.control?.hasValidator(_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.required) ?? false;
  }
  set required(value) {
    this._required = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceBooleanProperty)(value);
    this.stateChanges.next();
  }
  /**
   * Implemented as part of MatFormFieldControl.
   * @docs-private
   */
  get shouldLabelFloat() {
    return !this.empty || this.focused;
  }
  /**
   * Implemented as part of MatFormFieldControl.
   * @docs-private
   */
  get value() {
    return this._value;
  }
  set value(value) {
    this._value = value;
  }
  /** Combined stream of all of the child chips' blur events. */
  get chipBlurChanges() {
    return this._getChipStream(chip => chip._onBlur);
  }
  constructor(elementRef, changeDetectorRef, dir, parentForm, parentFormGroup, defaultErrorStateMatcher, ngControl) {
    super(elementRef, changeDetectorRef, dir, defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl);
    /**
     * Implemented as part of MatFormFieldControl.
     * @docs-private
     */
    this.controlType = 'mat-chip-grid';
    this._defaultRole = 'grid';
    /**
     * List of element ids to propagate to the chipInput's aria-describedby attribute.
     */
    this._ariaDescribedbyIds = [];
    /**
     * Function when touched. Set as part of ControlValueAccessor implementation.
     * @docs-private
     */
    this._onTouched = () => {};
    /**
     * Function when changed. Set as part of ControlValueAccessor implementation.
     * @docs-private
     */
    this._onChange = () => {};
    this._value = [];
    /** Emits when the chip grid value has been changed by the user. */
    this.change = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    /**
     * Emits whenever the raw value of the chip-grid changes. This is here primarily
     * to facilitate the two-way binding for the `value` input.
     * @docs-private
     */
    this.valueChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }
  ngAfterContentInit() {
    this.chipBlurChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.takeUntil)(this._destroyed)).subscribe(() => {
      this._blur();
      this.stateChanges.next();
    });
    (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.merge)(this.chipFocusChanges, this._chips.changes).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.takeUntil)(this._destroyed)).subscribe(() => this.stateChanges.next());
  }
  ngAfterViewInit() {
    super.ngAfterViewInit();
    if (!this._chipInput && (typeof ngDevMode === 'undefined' || ngDevMode)) {
      throw Error('mat-chip-grid must be used in combination with matChipInputFor.');
    }
  }
  ngDoCheck() {
    if (this.ngControl) {
      // We need to re-evaluate this on every change detection cycle, because there are some
      // error triggers that we can't subscribe to (e.g. parent form submissions). This means
      // that whatever logic is in here has to be super lean or we risk destroying the performance.
      this.updateErrorState();
    }
  }
  ngOnDestroy() {
    super.ngOnDestroy();
    this.stateChanges.complete();
  }
  /** Associates an HTML input element with this chip grid. */
  registerInput(inputElement) {
    this._chipInput = inputElement;
    this._chipInput.setDescribedByIds(this._ariaDescribedbyIds);
  }
  /**
   * Implemented as part of MatFormFieldControl.
   * @docs-private
   */
  onContainerClick(event) {
    if (!this.disabled && !this._originatesFromChip(event)) {
      this.focus();
    }
  }
  /**
   * Focuses the first chip in this chip grid, or the associated input when there
   * are no eligible chips.
   */
  focus() {
    if (this.disabled || this._chipInput.focused) {
      return;
    }
    if (!this._chips.length || this._chips.first.disabled) {
      // Delay until the next tick, because this can cause a "changed after checked"
      // error if the input does something on focus (e.g. opens an autocomplete).
      Promise.resolve().then(() => this._chipInput.focus());
    } else if (this._chips.length) {
      this._keyManager.setFirstItemActive();
    }
    this.stateChanges.next();
  }
  /**
   * Implemented as part of MatFormFieldControl.
   * @docs-private
   */
  setDescribedByIds(ids) {
    // We must keep this up to date to handle the case where ids are set
    // before the chip input is registered.
    this._ariaDescribedbyIds = ids;
    this._chipInput?.setDescribedByIds(ids);
  }
  /**
   * Implemented as part of ControlValueAccessor.
   * @docs-private
   */
  writeValue(value) {
    // The user is responsible for creating the child chips, so we just store the value.
    this._value = value;
  }
  /**
   * Implemented as part of ControlValueAccessor.
   * @docs-private
   */
  registerOnChange(fn) {
    this._onChange = fn;
  }
  /**
   * Implemented as part of ControlValueAccessor.
   * @docs-private
   */
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  /**
   * Implemented as part of ControlValueAccessor.
   * @docs-private
   */
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
    this.stateChanges.next();
  }
  /** When blurred, mark the field as touched when focus moved outside the chip grid. */
  _blur() {
    if (!this.disabled) {
      // Check whether the focus moved to chip input.
      // If the focus is not moved to chip input, mark the field as touched. If the focus moved
      // to chip input, do nothing.
      // Timeout is needed to wait for the focus() event trigger on chip input.
      setTimeout(() => {
        if (!this.focused) {
          this._propagateChanges();
          this._markAsTouched();
        }
      });
    }
  }
  /**
   * Removes the `tabindex` from the chip grid and resets it back afterwards, allowing the
   * user to tab out of it. This prevents the grid from capturing focus and redirecting
   * it back to the first chip, creating a focus trap, if it user tries to tab away.
   */
  _allowFocusEscape() {
    if (!this._chipInput.focused) {
      super._allowFocusEscape();
    }
  }
  /** Handles custom keyboard events. */
  _handleKeydown(event) {
    if (event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_3__.TAB) {
      if (this._chipInput.focused && (0,_angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_3__.hasModifierKey)(event, 'shiftKey') && this._chips.length && !this._chips.last.disabled) {
        event.preventDefault();
        if (this._keyManager.activeItem) {
          this._keyManager.setActiveItem(this._keyManager.activeItem);
        } else {
          this._focusLastChip();
        }
      } else {
        // Use the super method here since it doesn't check for the input
        // focused state. This allows focus to escape if there's only one
        // disabled chip left in the list.
        super._allowFocusEscape();
      }
    } else if (!this._chipInput.focused) {
      super._handleKeydown(event);
    }
    this.stateChanges.next();
  }
  _focusLastChip() {
    if (this._chips.length) {
      this._chips.last.focus();
    }
  }
  /** Emits change event to set the model value. */
  _propagateChanges() {
    const valueToEmit = this._chips.length ? this._chips.toArray().map(chip => chip.value) : [];
    this._value = valueToEmit;
    this.change.emit(new MatChipGridChange(this, valueToEmit));
    this.valueChange.emit(valueToEmit);
    this._onChange(valueToEmit);
    this._changeDetectorRef.markForCheck();
  }
  /** Mark the field as touched */
  _markAsTouched() {
    this._onTouched();
    this._changeDetectorRef.markForCheck();
    this.stateChanges.next();
  }
}
MatChipGrid.ɵfac = function MatChipGrid_Factory(t) {
  return new (t || MatChipGrid)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_12__.Directionality, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgForm, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormGroupDirective, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_core__WEBPACK_IMPORTED_MODULE_1__.ErrorStateMatcher), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgControl, 10));
};
MatChipGrid.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: MatChipGrid,
  selectors: [["mat-chip-grid"]],
  contentQueries: function MatChipGrid_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, MatChipRow, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._chips = _t);
    }
  },
  hostAttrs: [1, "mat-mdc-chip-set", "mat-mdc-chip-grid", "mdc-evolution-chip-set"],
  hostVars: 10,
  hostBindings: function MatChipGrid_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("focus", function MatChipGrid_focus_HostBindingHandler() {
        return ctx.focus();
      })("blur", function MatChipGrid_blur_HostBindingHandler() {
        return ctx._blur();
      });
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵhostProperty"]("tabIndex", ctx._chips && ctx._chips.length === 0 ? -1 : ctx.tabIndex);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("role", ctx.role)("aria-disabled", ctx.disabled.toString())("aria-invalid", ctx.errorState);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mat-mdc-chip-list-disabled", ctx.disabled)("mat-mdc-chip-list-invalid", ctx.errorState)("mat-mdc-chip-list-required", ctx.required);
    }
  },
  inputs: {
    tabIndex: "tabIndex",
    disabled: "disabled",
    placeholder: "placeholder",
    required: "required",
    value: "value",
    errorStateMatcher: "errorStateMatcher"
  },
  outputs: {
    change: "change",
    valueChange: "valueChange"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([{
    provide: _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__.MatFormFieldControl,
    useExisting: MatChipGrid
  }]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]],
  ngContentSelectors: _c5,
  decls: 2,
  vars: 0,
  consts: [["role", "presentation", 1, "mdc-evolution-chip-set__chips"]],
  template: function MatChipGrid_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
  },
  styles: [_c6],
  encapsulation: 2,
  changeDetection: 0
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatChipGrid, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'mat-chip-grid',
      template: `
    <div class="mdc-evolution-chip-set__chips" role="presentation">
      <ng-content></ng-content>
    </div>
  `,
      inputs: ['tabIndex'],
      host: {
        'class': 'mat-mdc-chip-set mat-mdc-chip-grid mdc-evolution-chip-set',
        '[attr.role]': 'role',
        '[tabIndex]': '_chips && _chips.length === 0 ? -1 : tabIndex',
        '[attr.aria-disabled]': 'disabled.toString()',
        '[attr.aria-invalid]': 'errorState',
        '[class.mat-mdc-chip-list-disabled]': 'disabled',
        '[class.mat-mdc-chip-list-invalid]': 'errorState',
        '[class.mat-mdc-chip-list-required]': 'required',
        '(focus)': 'focus()',
        '(blur)': '_blur()'
      },
      providers: [{
        provide: _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__.MatFormFieldControl,
        useExisting: MatChipGrid
      }],
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush,
      styles: [".mdc-evolution-chip-set{display:flex}.mdc-evolution-chip-set:focus{outline:none}.mdc-evolution-chip-set__chips{display:flex;flex-flow:wrap;min-width:0}.mdc-evolution-chip-set--overflow .mdc-evolution-chip-set__chips{flex-flow:nowrap}.mdc-evolution-chip-set .mdc-evolution-chip-set__chips{margin-left:-8px;margin-right:0}[dir=rtl] .mdc-evolution-chip-set .mdc-evolution-chip-set__chips,.mdc-evolution-chip-set .mdc-evolution-chip-set__chips[dir=rtl]{margin-left:0;margin-right:-8px}.mdc-evolution-chip-set .mdc-evolution-chip{margin-left:8px;margin-right:0}[dir=rtl] .mdc-evolution-chip-set .mdc-evolution-chip,.mdc-evolution-chip-set .mdc-evolution-chip[dir=rtl]{margin-left:0;margin-right:8px}.mdc-evolution-chip-set .mdc-evolution-chip{margin-top:4px;margin-bottom:4px}.mat-mdc-chip-set .mdc-evolution-chip-set__chips{min-width:100%}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px;margin-left:8px}[dir=rtl] input.mat-mdc-chip-input{margin-left:0;margin-right:8px}"]
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef
    }, {
      type: _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_12__.Directionality,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }]
    }, {
      type: _angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgForm,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }]
    }, {
      type: _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormGroupDirective,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }]
    }, {
      type: _angular_material_core__WEBPACK_IMPORTED_MODULE_1__.ErrorStateMatcher
    }, {
      type: _angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgControl,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Self
      }]
    }];
  }, {
    disabled: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    placeholder: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    required: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    value: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    errorStateMatcher: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    change: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    valueChange: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    _chips: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChildren,
      args: [MatChipRow, {
        // We need to use `descendants: true`, because Ivy will no longer match
        // indirect descendants if it's left as false.
        descendants: true
      }]
    }]
  });
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// Increasing integer for generating unique ids.
let nextUniqueId = 0;
/**
 * Directive that adds chip-specific behaviors to an input element inside `<mat-form-field>`.
 * May be placed inside or outside of a `<mat-chip-grid>`.
 */
class MatChipInput {
  /** Register input for chip list */
  set chipGrid(value) {
    if (value) {
      this._chipGrid = value;
      this._chipGrid.registerInput(this);
    }
  }
  /**
   * Whether or not the chipEnd event will be emitted when the input is blurred.
   */
  get addOnBlur() {
    return this._addOnBlur;
  }
  set addOnBlur(value) {
    this._addOnBlur = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceBooleanProperty)(value);
  }
  /** Whether the input is disabled. */
  get disabled() {
    return this._disabled || this._chipGrid && this._chipGrid.disabled;
  }
  set disabled(value) {
    this._disabled = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceBooleanProperty)(value);
  }
  /** Whether the input is empty. */
  get empty() {
    return !this.inputElement.value;
  }
  constructor(_elementRef, _defaultOptions, formField) {
    this._elementRef = _elementRef;
    this._defaultOptions = _defaultOptions;
    /** Whether the control is focused. */
    this.focused = false;
    this._addOnBlur = false;
    /**
     * The list of key codes that will trigger a chipEnd event.
     *
     * Defaults to `[ENTER]`.
     */
    this.separatorKeyCodes = this._defaultOptions.separatorKeyCodes;
    /** Emitted when a chip is to be added. */
    this.chipEnd = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    /** The input's placeholder text. */
    this.placeholder = '';
    /** Unique id for the input. */
    this.id = `mat-mdc-chip-list-input-${nextUniqueId++}`;
    this._disabled = false;
    this.inputElement = this._elementRef.nativeElement;
    if (formField) {
      this.inputElement.classList.add('mat-mdc-form-field-input-control');
    }
  }
  ngOnChanges() {
    this._chipGrid.stateChanges.next();
  }
  ngOnDestroy() {
    this.chipEnd.complete();
  }
  ngAfterContentInit() {
    this._focusLastChipOnBackspace = this.empty;
  }
  /** Utility method to make host definition/tests more clear. */
  _keydown(event) {
    if (event) {
      // To prevent the user from accidentally deleting chips when pressing BACKSPACE continuously,
      // We focus the last chip on backspace only after the user has released the backspace button,
      // And the input is empty (see behaviour in _keyup)
      if (event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_3__.BACKSPACE && this._focusLastChipOnBackspace) {
        this._chipGrid._focusLastChip();
        event.preventDefault();
        return;
      } else {
        this._focusLastChipOnBackspace = false;
      }
    }
    this._emitChipEnd(event);
  }
  /**
   * Pass events to the keyboard manager. Available here for tests.
   */
  _keyup(event) {
    // Allow user to move focus to chips next time he presses backspace
    if (!this._focusLastChipOnBackspace && event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_3__.BACKSPACE && this.empty) {
      this._focusLastChipOnBackspace = true;
      event.preventDefault();
    }
  }
  /** Checks to see if the blur should emit the (chipEnd) event. */
  _blur() {
    if (this.addOnBlur) {
      this._emitChipEnd();
    }
    this.focused = false;
    // Blur the chip list if it is not focused
    if (!this._chipGrid.focused) {
      this._chipGrid._blur();
    }
    this._chipGrid.stateChanges.next();
  }
  _focus() {
    this.focused = true;
    this._focusLastChipOnBackspace = this.empty;
    this._chipGrid.stateChanges.next();
  }
  /** Checks to see if the (chipEnd) event needs to be emitted. */
  _emitChipEnd(event) {
    if (!event || this._isSeparatorKey(event)) {
      this.chipEnd.emit({
        input: this.inputElement,
        value: this.inputElement.value,
        chipInput: this
      });
      event?.preventDefault();
    }
  }
  _onInput() {
    // Let chip list know whenever the value changes.
    this._chipGrid.stateChanges.next();
  }
  /** Focuses the input. */
  focus() {
    this.inputElement.focus();
  }
  /** Clears the input */
  clear() {
    this.inputElement.value = '';
    this._focusLastChipOnBackspace = true;
  }
  setDescribedByIds(ids) {
    const element = this._elementRef.nativeElement;
    // Set the value directly in the DOM since this binding
    // is prone to "changed after checked" errors.
    if (ids.length) {
      element.setAttribute('aria-describedby', ids.join(' '));
    } else {
      element.removeAttribute('aria-describedby');
    }
  }
  /** Checks whether a keycode is one of the configured separators. */
  _isSeparatorKey(event) {
    return !(0,_angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_3__.hasModifierKey)(event) && new Set(this.separatorKeyCodes).has(event.keyCode);
  }
}
MatChipInput.ɵfac = function MatChipInput_Factory(t) {
  return new (t || MatChipInput)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](MAT_CHIPS_DEFAULT_OPTIONS), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__.MAT_FORM_FIELD, 8));
};
MatChipInput.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: MatChipInput,
  selectors: [["input", "matChipInputFor", ""]],
  hostAttrs: [1, "mat-mdc-chip-input", "mat-mdc-input-element", "mdc-text-field__input", "mat-input-element"],
  hostVars: 6,
  hostBindings: function MatChipInput_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("keydown", function MatChipInput_keydown_HostBindingHandler($event) {
        return ctx._keydown($event);
      })("keyup", function MatChipInput_keyup_HostBindingHandler($event) {
        return ctx._keyup($event);
      })("blur", function MatChipInput_blur_HostBindingHandler() {
        return ctx._blur();
      })("focus", function MatChipInput_focus_HostBindingHandler() {
        return ctx._focus();
      })("input", function MatChipInput_input_HostBindingHandler() {
        return ctx._onInput();
      });
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵhostProperty"]("id", ctx.id);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("disabled", ctx.disabled || null)("placeholder", ctx.placeholder || null)("aria-invalid", ctx._chipGrid && ctx._chipGrid.ngControl ? ctx._chipGrid.ngControl.invalid : null)("aria-required", ctx._chipGrid && ctx._chipGrid.required || null)("required", ctx._chipGrid && ctx._chipGrid.required || null);
    }
  },
  inputs: {
    chipGrid: ["matChipInputFor", "chipGrid"],
    addOnBlur: ["matChipInputAddOnBlur", "addOnBlur"],
    separatorKeyCodes: ["matChipInputSeparatorKeyCodes", "separatorKeyCodes"],
    placeholder: "placeholder",
    id: "id",
    disabled: "disabled"
  },
  outputs: {
    chipEnd: "matChipInputTokenEnd"
  },
  exportAs: ["matChipInput", "matChipInputFor"],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatChipInput, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: 'input[matChipInputFor]',
      exportAs: 'matChipInput, matChipInputFor',
      host: {
        // TODO: eventually we should remove `mat-input-element` from here since it comes from the
        // non-MDC version of the input. It's currently being kept for backwards compatibility, because
        // the MDC chips were landed initially with it.
        'class': 'mat-mdc-chip-input mat-mdc-input-element mdc-text-field__input mat-input-element',
        '(keydown)': '_keydown($event)',
        '(keyup)': '_keyup($event)',
        '(blur)': '_blur()',
        '(focus)': '_focus()',
        '(input)': '_onInput()',
        '[id]': 'id',
        '[attr.disabled]': 'disabled || null',
        '[attr.placeholder]': 'placeholder || null',
        '[attr.aria-invalid]': '_chipGrid && _chipGrid.ngControl ? _chipGrid.ngControl.invalid : null',
        '[attr.aria-required]': '_chipGrid && _chipGrid.required || null',
        '[attr.required]': '_chipGrid && _chipGrid.required || null'
      }
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [MAT_CHIPS_DEFAULT_OPTIONS]
      }]
    }, {
      type: _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__.MatFormField,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [_angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__.MAT_FORM_FIELD]
      }]
    }];
  }, {
    chipGrid: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: ['matChipInputFor']
    }],
    addOnBlur: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: ['matChipInputAddOnBlur']
    }],
    separatorKeyCodes: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: ['matChipInputSeparatorKeyCodes']
    }],
    chipEnd: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output,
      args: ['matChipInputTokenEnd']
    }],
    placeholder: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    id: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    disabled: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }]
  });
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const CHIP_DECLARATIONS = [MatChip, MatChipAvatar, MatChipEditInput, MatChipGrid, MatChipInput, MatChipListbox, MatChipOption, MatChipRemove, MatChipRow, MatChipSet, MatChipTrailingIcon];
class MatChipsModule {}
MatChipsModule.ɵfac = function MatChipsModule_Factory(t) {
  return new (t || MatChipsModule)();
};
MatChipsModule.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: MatChipsModule
});
MatChipsModule.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  providers: [_angular_material_core__WEBPACK_IMPORTED_MODULE_1__.ErrorStateMatcher, {
    provide: MAT_CHIPS_DEFAULT_OPTIONS,
    useValue: {
      separatorKeyCodes: [_angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_3__.ENTER]
    }
  }],
  imports: [_angular_material_core__WEBPACK_IMPORTED_MODULE_1__.MatCommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_8__.CommonModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_1__.MatRippleModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_1__.MatCommonModule]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatChipsModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgModule,
    args: [{
      imports: [_angular_material_core__WEBPACK_IMPORTED_MODULE_1__.MatCommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_8__.CommonModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_1__.MatRippleModule],
      exports: [_angular_material_core__WEBPACK_IMPORTED_MODULE_1__.MatCommonModule, CHIP_DECLARATIONS],
      declarations: [MatChipAction, CHIP_DECLARATIONS],
      providers: [_angular_material_core__WEBPACK_IMPORTED_MODULE_1__.ErrorStateMatcher, {
        provide: MAT_CHIPS_DEFAULT_OPTIONS,
        useValue: {
          separatorKeyCodes: [_angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_3__.ENTER]
        }
      }]
    }]
  }], null, null);
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Generated bundle index. Do not edit.
 */


//# sourceMappingURL=chips.mjs.map

/***/ }),

/***/ 696338:
/*!**********************************************************!*\
  !*** ./node_modules/@angular/material/fesm2020/list.mjs ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MAT_LIST": () => (/* binding */ MAT_LIST),
/* harmony export */   "MAT_LIST_CONFIG": () => (/* binding */ MAT_LIST_CONFIG),
/* harmony export */   "MAT_NAV_LIST": () => (/* binding */ MAT_NAV_LIST),
/* harmony export */   "MAT_SELECTION_LIST_VALUE_ACCESSOR": () => (/* binding */ MAT_SELECTION_LIST_VALUE_ACCESSOR),
/* harmony export */   "MatActionList": () => (/* binding */ MatActionList),
/* harmony export */   "MatList": () => (/* binding */ MatList),
/* harmony export */   "MatListItem": () => (/* binding */ MatListItem),
/* harmony export */   "MatListItemAvatar": () => (/* binding */ MatListItemAvatar),
/* harmony export */   "MatListItemIcon": () => (/* binding */ MatListItemIcon),
/* harmony export */   "MatListItemLine": () => (/* binding */ MatListItemLine),
/* harmony export */   "MatListItemMeta": () => (/* binding */ MatListItemMeta),
/* harmony export */   "MatListItemTitle": () => (/* binding */ MatListItemTitle),
/* harmony export */   "MatListModule": () => (/* binding */ MatListModule),
/* harmony export */   "MatListOption": () => (/* binding */ MatListOption),
/* harmony export */   "MatListSubheaderCssMatStyler": () => (/* binding */ MatListSubheaderCssMatStyler),
/* harmony export */   "MatNavList": () => (/* binding */ MatNavList),
/* harmony export */   "MatSelectionList": () => (/* binding */ MatSelectionList),
/* harmony export */   "MatSelectionListChange": () => (/* binding */ MatSelectionListChange),
/* harmony export */   "SELECTION_LIST": () => (/* binding */ SELECTION_LIST),
/* harmony export */   "_MatListItemGraphicBase": () => (/* binding */ _MatListItemGraphicBase)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser/animations */ 94650);
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/coercion */ 121281);
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/platform */ 383353);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/core */ 447873);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 596921);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 56451);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/observers */ 949643);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/divider */ 44850);
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/cdk/a11y */ 212687);
/* harmony import */ var _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/cdk/collections */ 795017);
/* harmony import */ var _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/cdk/keycodes */ 329521);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 224006);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ 782722);



















/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Injection token that can be used to reference instances of an `ListOption`. It serves
 * as alternative token to an actual implementation which could result in undesired
 * retention of the class or circular references breaking runtime execution.
 * @docs-private
 */
const _c0 = ["*"];
const _c1 = "@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-list-divider::after{content:\"\";display:block;border-bottom-width:1px;border-bottom-style:solid}}.mdc-list{margin:0;padding:8px 0;list-style-type:none}.mdc-list:focus{outline:none}.mdc-list-item__wrapper{display:block}.mdc-list-item{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;align-items:stretch;cursor:pointer}.mdc-list-item:focus{outline:none}.mdc-list-item.mdc-list-item--with-one-line{height:48px}.mdc-list-item.mdc-list-item--with-two-lines{height:64px}.mdc-list-item.mdc-list-item--with-three-lines{height:88px}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__start{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--disabled,.mdc-list-item.mdc-list-item--non-interactive{cursor:auto}.mdc-list-item:not(.mdc-list-item--selected):focus::before,.mdc-list-item.mdc-ripple-upgraded--background-focused::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-list-item:not(.mdc-list-item--selected):focus::before,.mdc-list-item.mdc-ripple-upgraded--background-focused::before{border-color:CanvasText}}.mdc-list-item.mdc-list-item--selected::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:3px double rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-list-item.mdc-list-item--selected::before{border-color:CanvasText}}.mdc-list-item.mdc-list-item--selected:focus::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:3px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-list-item.mdc-list-item--selected:focus::before{border-color:CanvasText}}a.mdc-list-item{color:inherit;text-decoration:none}.mdc-list-item__start{fill:currentColor;flex-shrink:0;pointer-events:none}.mdc-list-item__end{flex-shrink:0;pointer-events:none}.mdc-list-item__content{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;align-self:center;flex:1;pointer-events:none}.mdc-list-item--with-two-lines .mdc-list-item__content,.mdc-list-item--with-three-lines .mdc-list-item__content{align-self:stretch}.mdc-list-item__content[for]{pointer-events:none}.mdc-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-three-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item__secondary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal}.mdc-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list-item--with-three-lines .mdc-list-item__secondary-text{white-space:normal;line-height:20px}.mdc-list-item--with-overline .mdc-list-item__secondary-text{white-space:nowrap;line-height:auto}.mdc-list-item__overline-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-three-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-three-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-three-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-avatar.mdc-list-item,.mdc-list-item--with-leading-avatar.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-avatar .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-avatar .mdc-list-item__start,.mdc-list-item--with-leading-avatar .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-avatar .mdc-list-item__start{border-radius:50%}.mdc-list-item--with-leading-icon.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-icon.mdc-list-item,.mdc-list-item--with-leading-icon.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-icon .mdc-list-item__start{margin-left:16px;margin-right:32px}[dir=rtl] .mdc-list-item--with-leading-icon .mdc-list-item__start,.mdc-list-item--with-leading-icon .mdc-list-item__start[dir=rtl]{margin-left:32px;margin-right:16px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-thumbnail.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-thumbnail.mdc-list-item,.mdc-list-item--with-leading-thumbnail.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-thumbnail .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-thumbnail .mdc-list-item__start,.mdc-list-item--with-leading-thumbnail .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-image.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-image.mdc-list-item,.mdc-list-item--with-leading-image.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-image .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-image .mdc-list-item__start,.mdc-list-item--with-leading-image .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-one-line{height:72px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-video.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-video.mdc-list-item,.mdc-list-item--with-leading-video.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-video .mdc-list-item__start{margin-left:0;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-video .mdc-list-item__start,.mdc-list-item--with-leading-video .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-one-line{height:72px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-checkbox.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-checkbox.mdc-list-item,.mdc-list-item--with-leading-checkbox.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-checkbox .mdc-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-list-item--with-leading-checkbox .mdc-list-item__start,.mdc-list-item--with-leading-checkbox .mdc-list-item__start[dir=rtl]{margin-left:24px;margin-right:8px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-radio.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-radio.mdc-list-item,.mdc-list-item--with-leading-radio.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-radio .mdc-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-list-item--with-leading-radio .mdc-list-item__start,.mdc-list-item--with-leading-radio .mdc-list-item__start[dir=rtl]{margin-left:24px;margin-right:8px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-switch.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-switch.mdc-list-item,.mdc-list-item--with-leading-switch.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-switch .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-switch .mdc-list-item__start,.mdc-list-item--with-leading-switch .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-trailing-icon.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-icon.mdc-list-item,.mdc-list-item--with-trailing-icon.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-icon .mdc-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-icon .mdc-list-item__end,.mdc-list-item--with-trailing-icon .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end{align-self:flex-start;margin-top:0}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:0}.mdc-list-item--with-trailing-meta.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-meta.mdc-list-item,.mdc-list-item--with-trailing-meta.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-meta .mdc-list-item__end{margin-left:28px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-meta .mdc-list-item__end,.mdc-list-item--with-trailing-meta .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:28px}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-trailing-meta .mdc-list-item__end{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--mdc-typography-caption-font-family);font-size:var(--mdc-typography-caption-font-size);line-height:var(--mdc-typography-caption-line-height);font-weight:var(--mdc-typography-caption-font-weight);letter-spacing:var(--mdc-typography-caption-letter-spacing);text-decoration:var(--mdc-typography-caption-text-decoration);text-transform:var(--mdc-typography-caption-text-transform)}.mdc-list-item--with-trailing-checkbox.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item,.mdc-list-item--with-trailing-checkbox.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-checkbox .mdc-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-list-item--with-trailing-checkbox .mdc-list-item__end,.mdc-list-item--with-trailing-checkbox .mdc-list-item__end[dir=rtl]{margin-left:8px;margin-right:24px}.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:8px}.mdc-list-item--with-trailing-radio.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item,.mdc-list-item--with-trailing-radio.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-radio .mdc-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-list-item--with-trailing-radio .mdc-list-item__end,.mdc-list-item--with-trailing-radio .mdc-list-item__end[dir=rtl]{margin-left:8px;margin-right:24px}.mdc-list-item--with-trailing-radio.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:8px}.mdc-list-item--with-trailing-switch.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-switch.mdc-list-item,.mdc-list-item--with-trailing-switch.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-switch .mdc-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-switch .mdc-list-item__end,.mdc-list-item--with-trailing-switch .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-trailing-switch.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:16px}.mdc-list-item--with-overline.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-overline.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list-item--with-overline.mdc-list-item--with-three-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-overline.mdc-list-item--with-three-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list-item{padding-left:16px;padding-right:16px}[dir=rtl] .mdc-list-item,.mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list-group .mdc-deprecated-list{padding:0}.mdc-list-group__subheader{margin:calc((3rem - 1.5rem)/2) 16px}.mdc-list-divider{padding:0;background-clip:content-box}.mdc-list-divider.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset{padding-left:16px;padding-right:auto}[dir=rtl] .mdc-list-divider.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset,.mdc-list-divider.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset[dir=rtl]{padding-left:auto;padding-right:16px}.mdc-list-divider.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset{padding-left:auto;padding-right:16px}[dir=rtl] .mdc-list-divider.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset,.mdc-list-divider.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset[dir=rtl]{padding-left:16px;padding-right:auto}.mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset{padding-left:0px;padding-right:auto}[dir=rtl] .mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset[dir=rtl]{padding-left:auto;padding-right:0px}[dir=rtl] .mdc-list-divider,.mdc-list-divider[dir=rtl]{padding:0}.mdc-list-item{background-color:var(--mdc-list-list-item-container-color)}.mdc-list-item.mdc-list-item--selected{background-color:var(--mdc-list-list-item-selected-container-color)}.mdc-list-item--with-one-line{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-one-line.mdc-list-item--with-leading-avatar,.mdc-list-item--with-one-line.mdc-list-item--with-leading-icon,.mdc-list-item--with-one-line.mdc-list-item--with-leading-thumbnail,.mdc-list-item--with-one-line.mdc-list-item--with-leading-checkbox,.mdc-list-item--with-one-line.mdc-list-item--with-leading-radio,.mdc-list-item--with-one-line.mdc-list-item--with-leading-switch{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-one-line.mdc-list-item--with-leading-image,.mdc-list-item--with-one-line.mdc-list-item--with-leading-video{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-two-lines{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-two-lines.mdc-list-item--with-leading-avatar,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-icon,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-thumbnail,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-checkbox,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-radio,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-switch,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-image,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-video{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-three-lines{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item.mdc-list-item--with-one-line{height:var(--mdc-list-list-item-one-line-container-height)}.mdc-list-item.mdc-list-item--with-two-lines{height:var(--mdc-list-list-item-two-line-container-height)}.mdc-list-item.mdc-list-item--with-three-lines{height:var(--mdc-list-list-item-three-line-container-height)}.mdc-list-item__primary-text{color:var(--mdc-list-list-item-label-text-color)}.mdc-list-item__primary-text{font-family:var(--mdc-list-list-item-label-text-font);line-height:var(--mdc-list-list-item-label-text-line-height);font-size:var(--mdc-list-list-item-label-text-size);font-weight:var(--mdc-list-list-item-label-text-weight);letter-spacing:var(--mdc-list-list-item-label-text-tracking)}.mdc-list-item__secondary-text{color:var(--mdc-list-list-item-supporting-text-color)}.mdc-list-item__secondary-text{font-family:var(--mdc-list-list-item-supporting-text-font);line-height:var(--mdc-list-list-item-supporting-text-line-height);font-size:var(--mdc-list-list-item-supporting-text-size);font-weight:var(--mdc-list-list-item-supporting-text-weight);letter-spacing:var(--mdc-list-list-item-supporting-text-tracking)}.mdc-list-item--with-leading-icon .mdc-list-item__start{color:var(--mdc-list-list-item-leading-icon-color)}.mdc-list-item--with-leading-icon .mdc-list-item__start{width:var(--mdc-list-list-item-leading-icon-size);height:var(--mdc-list-list-item-leading-icon-size)}.mdc-list-item--with-leading-icon .mdc-list-item__start>i{font-size:var(--mdc-list-list-item-leading-icon-size)}.mdc-list-item--with-leading-icon .mdc-list-item__start .mdc-list-item__icon{font-size:var(--mdc-list-list-item-leading-icon-size);width:var(--mdc-list-list-item-leading-icon-size);height:var(--mdc-list-list-item-leading-icon-size)}.mdc-list-item--with-leading-avatar .mdc-list-item__start{width:var(--mdc-list-list-item-leading-avatar-size);height:var(--mdc-list-list-item-leading-avatar-size)}.mdc-list-item.mdc-list-item--with-trailing-meta .mdc-list-item__end{color:var(--mdc-list-list-item-trailing-supporting-text-color)}.mdc-list-item--with-trailing-meta .mdc-list-item__end{font-family:var(--mdc-list-list-item-trailing-supporting-text-font);line-height:var(--mdc-list-list-item-trailing-supporting-text-line-height);font-size:var(--mdc-list-list-item-trailing-supporting-text-size);font-weight:var(--mdc-list-list-item-trailing-supporting-text-weight);letter-spacing:var(--mdc-list-list-item-trailing-supporting-text-tracking)}.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-trailing-icon-color)}.mdc-list-item--with-trailing-icon .mdc-list-item__end{width:var(--mdc-list-list-item-trailing-icon-size);height:var(--mdc-list-list-item-trailing-icon-size)}.mdc-list-item--with-trailing-icon .mdc-list-item__end>i{font-size:var(--mdc-list-list-item-trailing-icon-size)}.mdc-list-item--with-trailing-icon .mdc-list-item__end .mdc-list-item__icon{font-size:var(--mdc-list-list-item-trailing-icon-size);width:var(--mdc-list-list-item-trailing-icon-size);height:var(--mdc-list-list-item-trailing-icon-size)}.mdc-list-item--selected.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-selected-trailing-icon-color)}.mdc-list-item--disabled .mdc-list-item__start,.mdc-list-item--disabled .mdc-list-item__content,.mdc-list-item--disabled .mdc-list-item__end{opacity:1}.mdc-list-item--disabled .mdc-list-item__primary-text,.mdc-list-item--disabled .mdc-list-item__secondary-text,.mdc-list-item--disabled .mdc-list-item__overline-text{opacity:var(--mdc-list-list-item-disabled-label-text-opacity)}.mdc-list-item--disabled.mdc-list-item--with-leading-icon .mdc-list-item__start{color:var(--mdc-list-list-item-disabled-leading-icon-color)}.mdc-list-item--disabled.mdc-list-item--with-leading-icon .mdc-list-item__start{opacity:var(--mdc-list-list-item-disabled-leading-icon-opacity)}.mdc-list-item--disabled.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-disabled-trailing-icon-color)}.mdc-list-item--disabled.mdc-list-item--with-trailing-icon .mdc-list-item__end{opacity:var(--mdc-list-list-item-disabled-trailing-icon-opacity)}.mdc-list-item:hover .mdc-list-item__primary-text{color:var(--mdc-list-list-item-hover-label-text-color)}.mdc-list-item--with-leading-icon:hover .mdc-list-item__start{color:var(--mdc-list-list-item-hover-leading-icon-color)}.mdc-list-item--with-trailing-icon:hover .mdc-list-item__end{color:var(--mdc-list-list-item-hover-trailing-icon-color)}.mdc-list-item:focus .mdc-list-item__primary-text{color:var(--mdc-list-list-item-focus-label-text-color)}.mdc-list-item.mdc-list-item--disabled .mdc-list-item__primary-text{color:var(--mdc-list-list-item-disabled-label-text-color)}.mdc-list-item:hover::before{background-color:var(--mdc-list-list-item-hover-state-layer-color);opacity:var(--mdc-list-list-item-hover-state-layer-opacity)}.mdc-list-item.mdc-list-item--disabled::before{background-color:var(--mdc-list-list-item-disabled-state-layer-color);opacity:var(--mdc-list-list-item-disabled-state-layer-opacity)}.mdc-list-item:focus::before{background-color:var(--mdc-list-list-item-focus-state-layer-color);opacity:var(--mdc-list-list-item-focus-state-layer-opacity)}.mdc-list-item--disabled .mdc-radio,.mdc-list-item--disabled .mdc-checkbox{opacity:var(--mdc-list-list-item-disabled-label-text-opacity)}.mdc-list-item--with-leading-avatar .mat-mdc-list-item-avatar{border-radius:var(--mdc-list-list-item-leading-avatar-shape);background-color:var(--mdc-list-list-item-leading-avatar-color)}.mat-mdc-list-base{--mdc-list-list-item-container-shape:0;--mdc-list-list-item-leading-avatar-shape:50%;--mdc-list-list-item-container-color:transparent;--mdc-list-list-item-selected-container-color:transparent;--mdc-list-list-item-leading-avatar-color:transparent;--mdc-list-list-item-leading-icon-size:24px;--mdc-list-list-item-leading-avatar-size:40px;--mdc-list-list-item-trailing-icon-size:24px;--mdc-list-list-item-disabled-state-layer-color:transparent;--mdc-list-list-item-disabled-state-layer-opacity:0;--mdc-list-list-item-disabled-label-text-opacity:0.38;--mdc-list-list-item-disabled-leading-icon-opacity:0.38;--mdc-list-list-item-disabled-trailing-icon-opacity:0.38}.cdk-high-contrast-active a.mdc-list-item--activated::after{content:\"\";position:absolute;top:50%;right:16px;transform:translateY(-50%);width:10px;height:0;border-bottom:solid 10px;border-radius:10px}.cdk-high-contrast-active a.mdc-list-item--activated [dir=rtl]::after{right:auto;left:16px}.mat-mdc-list-base{display:block}.mat-mdc-list-base .mdc-list-item__start,.mat-mdc-list-base .mdc-list-item__end,.mat-mdc-list-base .mdc-list-item__content{pointer-events:auto}.mat-mdc-list-item,.mat-mdc-list-option{width:100%;box-sizing:border-box;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-list-item:not(.mat-mdc-list-item-interactive),.mat-mdc-list-option:not(.mat-mdc-list-item-interactive){cursor:default}.mat-mdc-list-item .mat-divider-inset,.mat-mdc-list-option .mat-divider-inset{position:absolute;left:0;right:0;bottom:0}.mat-mdc-list-item .mat-mdc-list-item-avatar~.mat-divider-inset,.mat-mdc-list-option .mat-mdc-list-item-avatar~.mat-divider-inset{margin-left:72px}[dir=rtl] .mat-mdc-list-item .mat-mdc-list-item-avatar~.mat-divider-inset,[dir=rtl] .mat-mdc-list-option .mat-mdc-list-item-avatar~.mat-divider-inset{margin-right:72px}.mat-mdc-list-item-interactive::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";opacity:0;pointer-events:none}.mat-mdc-list-item>.mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-mdc-list-item:focus>.mat-mdc-focus-indicator::before{content:\"\"}.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-line.mdc-list-item__secondary-text{white-space:nowrap;line-height:normal}.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-unscoped-content.mdc-list-item__secondary-text{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}mat-action-list button{background:none;color:inherit;border:none;font:inherit;outline:inherit;-webkit-tap-highlight-color:rgba(0,0,0,0);text-align:left}[dir=rtl] mat-action-list button{text-align:right}mat-action-list button::-moz-focus-inner{border:0}";
const _c2 = ["unscopedContent"];
const _c3 = ["text"];
const _c4 = [[["", "matListItemAvatar", ""], ["", "matListItemIcon", ""]], [["", "matListItemTitle", ""]], [["", "matListItemLine", ""]], "*", [["", "matListItemMeta", ""]], [["mat-divider"]]];
const _c5 = ["[matListItemAvatar],[matListItemIcon]", "[matListItemTitle]", "[matListItemLine]", "*", "[matListItemMeta]", "mat-divider"];
function MatListOption_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](0, 4);
  }
}
function MatListOption_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "input", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "svg", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "path", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mdc-checkbox--disabled", ctx_r3.disabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("checked", ctx_r3.selected)("disabled", ctx_r3.disabled);
  }
}
function MatListOption_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "input", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "div", 20)(4, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mdc-radio--disabled", ctx_r5.disabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("checked", ctx_r5.selected)("disabled", ctx_r5.disabled);
  }
}
function MatListOption_span_6_ng_template_1_Template(rf, ctx) {}
function MatListOption_span_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, MatListOption_span_6_ng_template_1_Template, 0, 0, "ng-template", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", _r2);
  }
}
function MatListOption_span_7_ng_template_1_Template(rf, ctx) {}
function MatListOption_span_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, MatListOption_span_7_ng_template_1_Template, 0, 0, "ng-template", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", _r4);
  }
}
function MatListOption_ng_template_8_ng_template_0_Template(rf, ctx) {}
function MatListOption_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, MatListOption_ng_template_8_ng_template_0_Template, 0, 0, "ng-template", 23);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", _r0);
  }
}
function MatListOption_span_15_ng_template_1_Template(rf, ctx) {}
function MatListOption_span_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, MatListOption_span_15_ng_template_1_Template, 0, 0, "ng-template", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", _r2);
  }
}
function MatListOption_span_16_ng_template_1_Template(rf, ctx) {}
function MatListOption_span_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, MatListOption_span_16_ng_template_1_Template, 0, 0, "ng-template", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", _r4);
  }
}
function MatListOption_ng_template_17_ng_template_0_Template(rf, ctx) {}
function MatListOption_ng_template_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, MatListOption_ng_template_17_ng_template_0_Template, 0, 0, "ng-template", 23);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", _r0);
  }
}
const _c6 = [[["", "matListItemTitle", ""]], [["", "matListItemLine", ""]], "*", [["mat-divider"]], [["", "matListItemAvatar", ""], ["", "matListItemIcon", ""]]];
const _c7 = ["[matListItemTitle]", "[matListItemLine]", "*", "mat-divider", "[matListItemAvatar],[matListItemIcon]"];
const LIST_OPTION = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('ListOption');

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Directive capturing the title of a list item. A list item usually consists of a
 * title and optional secondary or tertiary lines.
 *
 * Text content for the title never wraps. There can only be a single title per list item.
 */
class MatListItemTitle {
  constructor(_elementRef) {
    this._elementRef = _elementRef;
  }
}
MatListItemTitle.ɵfac = function MatListItemTitle_Factory(t) {
  return new (t || MatListItemTitle)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef));
};
MatListItemTitle.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: MatListItemTitle,
  selectors: [["", "matListItemTitle", ""]],
  hostAttrs: [1, "mat-mdc-list-item-title", "mdc-list-item__primary-text"]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatListItemTitle, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: '[matListItemTitle]',
      host: {
        'class': 'mat-mdc-list-item-title mdc-list-item__primary-text'
      }
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }];
  }, null);
})();
/**
 * Directive capturing a line in a list item. A list item usually consists of a
 * title and optional secondary or tertiary lines.
 *
 * Text content inside a line never wraps. There can be at maximum two lines per list item.
 */
class MatListItemLine {
  constructor(_elementRef) {
    this._elementRef = _elementRef;
  }
}
MatListItemLine.ɵfac = function MatListItemLine_Factory(t) {
  return new (t || MatListItemLine)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef));
};
MatListItemLine.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: MatListItemLine,
  selectors: [["", "matListItemLine", ""]],
  hostAttrs: [1, "mat-mdc-list-item-line", "mdc-list-item__secondary-text"]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatListItemLine, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: '[matListItemLine]',
      host: {
        'class': 'mat-mdc-list-item-line mdc-list-item__secondary-text'
      }
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }];
  }, null);
})();
/**
 * Directive matching an optional meta section for list items.
 *
 * List items can reserve space at the end of an item to display a control,
 * button or additional text content.
 */
class MatListItemMeta {}
MatListItemMeta.ɵfac = function MatListItemMeta_Factory(t) {
  return new (t || MatListItemMeta)();
};
MatListItemMeta.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: MatListItemMeta,
  selectors: [["", "matListItemMeta", ""]],
  hostAttrs: [1, "mat-mdc-list-item-meta", "mdc-list-item__end"]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatListItemMeta, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: '[matListItemMeta]',
      host: {
        'class': 'mat-mdc-list-item-meta mdc-list-item__end'
      }
    }]
  }], null, null);
})();
/**
 * @docs-private
 *
 * MDC uses the very intuitively named classes `.mdc-list-item__start` and `.mat-list-item__end` to
 * position content such as icons or checkboxes/radios that comes either before or after the text
 * content respectively. This directive detects the placement of the checkbox/radio and applies the
 * correct MDC class to position the icon/avatar on the opposite side.
 */
class _MatListItemGraphicBase {
  constructor(_listOption) {
    this._listOption = _listOption;
  }
  _isAlignedAtStart() {
    // By default, in all list items the graphic is aligned at start. In list options,
    // the graphic is only aligned at start if the checkbox/radio is at the end.
    return !this._listOption || this._listOption?._getTogglePosition() === 'after';
  }
}
_MatListItemGraphicBase.ɵfac = function _MatListItemGraphicBase_Factory(t) {
  return new (t || _MatListItemGraphicBase)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](LIST_OPTION, 8));
};
_MatListItemGraphicBase.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: _MatListItemGraphicBase,
  hostVars: 4,
  hostBindings: function _MatListItemGraphicBase_HostBindings(rf, ctx) {
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mdc-list-item__start", ctx._isAlignedAtStart())("mdc-list-item__end", !ctx._isAlignedAtStart());
    }
  }
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](_MatListItemGraphicBase, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      host: {
        // MDC uses intuitively named classes `.mdc-list-item__start` and `.mat-list-item__end` to
        // position content such as icons or checkboxes/radios that comes either before or after the
        // text content respectively. This directive detects the placement of the checkbox/radio and
        // applies the correct MDC class to position the icon/avatar on the opposite side.
        '[class.mdc-list-item__start]': '_isAlignedAtStart()',
        '[class.mdc-list-item__end]': '!_isAlignedAtStart()'
      }
    }]
  }], function () {
    return [{
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [LIST_OPTION]
      }]
    }];
  }, null);
})();
/**
 * Directive matching an optional avatar within a list item.
 *
 * List items can reserve space at the beginning of an item to display an avatar.
 */
class MatListItemAvatar extends _MatListItemGraphicBase {}
MatListItemAvatar.ɵfac = /* @__PURE__ */function () {
  let ɵMatListItemAvatar_BaseFactory;
  return function MatListItemAvatar_Factory(t) {
    return (ɵMatListItemAvatar_BaseFactory || (ɵMatListItemAvatar_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](MatListItemAvatar)))(t || MatListItemAvatar);
  };
}();
MatListItemAvatar.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: MatListItemAvatar,
  selectors: [["", "matListItemAvatar", ""]],
  hostAttrs: [1, "mat-mdc-list-item-avatar"],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatListItemAvatar, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: '[matListItemAvatar]',
      host: {
        'class': 'mat-mdc-list-item-avatar'
      }
    }]
  }], null, null);
})();
/**
 * Directive matching an optional icon within a list item.
 *
 * List items can reserve space at the beginning of an item to display an icon.
 */
class MatListItemIcon extends _MatListItemGraphicBase {}
MatListItemIcon.ɵfac = /* @__PURE__ */function () {
  let ɵMatListItemIcon_BaseFactory;
  return function MatListItemIcon_Factory(t) {
    return (ɵMatListItemIcon_BaseFactory || (ɵMatListItemIcon_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](MatListItemIcon)))(t || MatListItemIcon);
  };
}();
MatListItemIcon.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: MatListItemIcon,
  selectors: [["", "matListItemIcon", ""]],
  hostAttrs: [1, "mat-mdc-list-item-icon"],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatListItemIcon, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: '[matListItemIcon]',
      host: {
        'class': 'mat-mdc-list-item-icon'
      }
    }]
  }], null, null);
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Injection token that can be used to provide the default options the list module. */
const MAT_LIST_CONFIG = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('MAT_LIST_CONFIG');

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** @docs-private */
class MatListBase {
  constructor() {
    this._isNonInteractive = true;
    this._disableRipple = false;
    this._disabled = false;
    this._defaultOptions = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(MAT_LIST_CONFIG, {
      optional: true
    });
  }
  /** Whether ripples for all list items is disabled. */
  get disableRipple() {
    return this._disableRipple;
  }
  set disableRipple(value) {
    this._disableRipple = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__.coerceBooleanProperty)(value);
  }
  /**
   * Whether the entire list is disabled. When disabled, the list itself and each of its list items
   * are disabled.
   */
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    this._disabled = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__.coerceBooleanProperty)(value);
  }
}
MatListBase.ɵfac = function MatListBase_Factory(t) {
  return new (t || MatListBase)();
};
MatListBase.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: MatListBase,
  hostVars: 1,
  hostBindings: function MatListBase_HostBindings(rf, ctx) {
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("aria-disabled", ctx.disabled);
    }
  },
  inputs: {
    disableRipple: "disableRipple",
    disabled: "disabled"
  }
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatListBase, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      host: {
        '[attr.aria-disabled]': 'disabled'
      }
    }]
  }], null, {
    disableRipple: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    disabled: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }]
  });
})();
/** @docs-private */
class MatListItemBase {
  /**
   * The number of lines this list item should reserve space for. If not specified,
   * lines are inferred based on the projected content.
   *
   * Explicitly specifying the number of lines is useful if you want to acquire additional
   * space and enable the wrapping of text. The unscoped text content of a list item will
   * always be able to take up the remaining space of the item, unless it represents the title.
   *
   * A maximum of three lines is supported as per the Material Design specification.
   */
  set lines(lines) {
    this._explicitLines = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__.coerceNumberProperty)(lines, null);
    this._updateItemLines(false);
  }
  get disableRipple() {
    return this.disabled || this._disableRipple || this._noopAnimations || !!this._listBase?.disableRipple;
  }
  set disableRipple(value) {
    this._disableRipple = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__.coerceBooleanProperty)(value);
  }
  /** Whether the list-item is disabled. */
  get disabled() {
    return this._disabled || !!this._listBase?.disabled;
  }
  set disabled(value) {
    this._disabled = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__.coerceBooleanProperty)(value);
  }
  /**
   * Implemented as part of `RippleTarget`.
   * @docs-private
   */
  get rippleDisabled() {
    return this.disableRipple || !!this.rippleConfig.disabled;
  }
  constructor(_elementRef, _ngZone, _listBase, _platform, globalRippleOptions, animationMode) {
    this._elementRef = _elementRef;
    this._ngZone = _ngZone;
    this._listBase = _listBase;
    this._platform = _platform;
    this._explicitLines = null;
    this._disableRipple = false;
    this._disabled = false;
    this._subscriptions = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subscription();
    this._rippleRenderer = null;
    /** Whether the list item has unscoped text content. */
    this._hasUnscopedTextContent = false;
    this.rippleConfig = globalRippleOptions || {};
    this._hostElement = this._elementRef.nativeElement;
    this._isButtonElement = this._hostElement.nodeName.toLowerCase() === 'button';
    this._noopAnimations = animationMode === 'NoopAnimations';
    if (_listBase && !_listBase._isNonInteractive) {
      this._initInteractiveListItem();
    }
    // If no type attribute is specified for a host `<button>` element, set it to `button`. If a
    // type attribute is already specified, we do nothing. We do this for backwards compatibility.
    // TODO: Determine if we intend to continue doing this for the MDC-based list.
    if (this._isButtonElement && !this._hostElement.hasAttribute('type')) {
      this._hostElement.setAttribute('type', 'button');
    }
  }
  ngAfterViewInit() {
    this._monitorProjectedLinesAndTitle();
    this._updateItemLines(true);
  }
  ngOnDestroy() {
    this._subscriptions.unsubscribe();
    if (this._rippleRenderer !== null) {
      this._rippleRenderer._removeTriggerEvents();
    }
  }
  /** Whether the list item has icons or avatars. */
  _hasIconOrAvatar() {
    return !!(this._avatars.length || this._icons.length);
  }
  _initInteractiveListItem() {
    this._hostElement.classList.add('mat-mdc-list-item-interactive');
    this._rippleRenderer = new _angular_material_core__WEBPACK_IMPORTED_MODULE_3__.RippleRenderer(this, this._ngZone, this._hostElement, this._platform);
    this._rippleRenderer.setupTriggerEvents(this._hostElement);
  }
  /**
   * Subscribes to changes in the projected title and lines. Triggers a
   * item lines update whenever a change occurs.
   */
  _monitorProjectedLinesAndTitle() {
    this._ngZone.runOutsideAngular(() => {
      this._subscriptions.add((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.merge)(this._lines.changes, this._titles.changes).subscribe(() => this._updateItemLines(false)));
    });
  }
  /**
   * Updates the lines of the list item. Based on the projected user content and optional
   * explicit lines setting, the visual appearance of the list item is determined.
   *
   * This method should be invoked whenever the projected user content changes, or
   * when the explicit lines have been updated.
   *
   * @param recheckUnscopedContent Whether the projected unscoped content should be re-checked.
   *   The unscoped content is not re-checked for every update as it is a rather expensive check
   *   for content that is expected to not change very often.
   */
  _updateItemLines(recheckUnscopedContent) {
    // If the updated is triggered too early before the view and content is initialized,
    // we just skip the update. After view initialization the update is triggered again.
    if (!this._lines || !this._titles || !this._unscopedContent) {
      return;
    }
    // Re-check the DOM for unscoped text content if requested. This needs to
    // happen before any computation or sanity checks run as these rely on the
    // result of whether there is unscoped text content or not.
    if (recheckUnscopedContent) {
      this._checkDomForUnscopedTextContent();
    }
    // Sanity check the list item lines and title in the content. This is a dev-mode only
    // check that can be dead-code eliminated by Terser in production.
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
      sanityCheckListItemContent(this);
    }
    const numberOfLines = this._explicitLines ?? this._inferLinesFromContent();
    const unscopedContentEl = this._unscopedContent.nativeElement;
    // Update the list item element to reflect the number of lines.
    this._hostElement.classList.toggle('mat-mdc-list-item-single-line', numberOfLines <= 1);
    this._hostElement.classList.toggle('mdc-list-item--with-one-line', numberOfLines <= 1);
    this._hostElement.classList.toggle('mdc-list-item--with-two-lines', numberOfLines === 2);
    this._hostElement.classList.toggle('mdc-list-item--with-three-lines', numberOfLines === 3);
    // If there is no title and the unscoped content is the is the only line, the
    // unscoped text content will be treated as the title of the list-item.
    if (this._hasUnscopedTextContent) {
      const treatAsTitle = this._titles.length === 0 && numberOfLines === 1;
      unscopedContentEl.classList.toggle('mdc-list-item__primary-text', treatAsTitle);
      unscopedContentEl.classList.toggle('mdc-list-item__secondary-text', !treatAsTitle);
    } else {
      unscopedContentEl.classList.remove('mdc-list-item__primary-text');
      unscopedContentEl.classList.remove('mdc-list-item__secondary-text');
    }
  }
  /**
   * Infers the number of lines based on the projected user content. This is useful
   * if no explicit number of lines has been specified on the list item.
   *
   * The number of lines is inferred based on whether there is a title, the number of
   * additional lines (secondary/tertiary). An additional line is acquired if there is
   * unscoped text content.
   */
  _inferLinesFromContent() {
    let numOfLines = this._titles.length + this._lines.length;
    if (this._hasUnscopedTextContent) {
      numOfLines += 1;
    }
    return numOfLines;
  }
  /** Checks whether the list item has unscoped text content. */
  _checkDomForUnscopedTextContent() {
    this._hasUnscopedTextContent = Array.from(this._unscopedContent.nativeElement.childNodes).filter(node => node.nodeType !== node.COMMENT_NODE).some(node => !!(node.textContent && node.textContent.trim()));
  }
}
MatListItemBase.ɵfac = function MatListItemBase_Factory(t) {
  return new (t || MatListItemBase)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](MatListBase, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_5__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_core__WEBPACK_IMPORTED_MODULE_3__.MAT_RIPPLE_GLOBAL_OPTIONS, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_MODULE_TYPE, 8));
};
MatListItemBase.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: MatListItemBase,
  contentQueries: function MatListItemBase_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, MatListItemAvatar, 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, MatListItemIcon, 4);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._avatars = _t);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._icons = _t);
    }
  },
  hostVars: 4,
  hostBindings: function MatListItemBase_HostBindings(rf, ctx) {
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("aria-disabled", ctx.disabled)("disabled", ctx._isButtonElement && ctx.disabled || null);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mdc-list-item--disabled", ctx.disabled);
    }
  },
  inputs: {
    lines: "lines",
    disableRipple: "disableRipple",
    disabled: "disabled"
  }
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatListItemBase, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      host: {
        '[class.mdc-list-item--disabled]': 'disabled',
        '[attr.aria-disabled]': 'disabled',
        '[attr.disabled]': '(_isButtonElement && disabled) || null'
      }
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone
    }, {
      type: MatListBase,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }]
    }, {
      type: _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_5__.Platform
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [_angular_material_core__WEBPACK_IMPORTED_MODULE_3__.MAT_RIPPLE_GLOBAL_OPTIONS]
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [_angular_core__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_MODULE_TYPE]
      }]
    }];
  }, {
    _avatars: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChildren,
      args: [MatListItemAvatar, {
        descendants: false
      }]
    }],
    _icons: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChildren,
      args: [MatListItemIcon, {
        descendants: false
      }]
    }],
    lines: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    disableRipple: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    disabled: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }]
  });
})();
/**
 * Sanity checks the configuration of the list item with respect to the amount
 * of lines, whether there is a title, or if there is unscoped text content.
 *
 * The checks are extracted into a top-level function that can be dead-code
 * eliminated by Terser or other optimizers in production mode.
 */
function sanityCheckListItemContent(item) {
  const numTitles = item._titles.length;
  const numLines = item._titles.length;
  if (numTitles > 1) {
    throw Error('A list item cannot have multiple titles.');
  }
  if (numTitles === 0 && numLines > 0) {
    throw Error('A list item line can only be used if there is a list item title.');
  }
  if (numTitles === 0 && item._hasUnscopedTextContent && item._explicitLines !== null && item._explicitLines > 1) {
    throw Error('A list item cannot have wrapping content without a title.');
  }
  if (numLines > 2 || numLines === 2 && item._hasUnscopedTextContent) {
    throw Error('A list item can have at maximum three lines.');
  }
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class MatActionList extends MatListBase {
  constructor() {
    super(...arguments);
    // An navigation list is considered interactive, but does not extend the interactive list
    // base class. We do this because as per MDC, items of interactive lists are only reachable
    // through keyboard shortcuts. We want all items for the navigation list to be reachable
    // through tab key as we do not intend to provide any special accessibility treatment. The
    // accessibility treatment depends on how the end-user will interact with it.
    this._isNonInteractive = false;
  }
}
MatActionList.ɵfac = /* @__PURE__ */function () {
  let ɵMatActionList_BaseFactory;
  return function MatActionList_Factory(t) {
    return (ɵMatActionList_BaseFactory || (ɵMatActionList_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](MatActionList)))(t || MatActionList);
  };
}();
MatActionList.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: MatActionList,
  selectors: [["mat-action-list"]],
  hostAttrs: ["role", "group", 1, "mat-mdc-action-list", "mat-mdc-list-base", "mdc-list"],
  exportAs: ["matActionList"],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([{
    provide: MatListBase,
    useExisting: MatActionList
  }]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]],
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function MatActionList_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](0);
    }
  },
  styles: ["@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-list-divider::after{content:\"\";display:block;border-bottom-width:1px;border-bottom-style:solid}}.mdc-list{margin:0;padding:8px 0;list-style-type:none}.mdc-list:focus{outline:none}.mdc-list-item__wrapper{display:block}.mdc-list-item{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;align-items:stretch;cursor:pointer}.mdc-list-item:focus{outline:none}.mdc-list-item.mdc-list-item--with-one-line{height:48px}.mdc-list-item.mdc-list-item--with-two-lines{height:64px}.mdc-list-item.mdc-list-item--with-three-lines{height:88px}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__start{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--disabled,.mdc-list-item.mdc-list-item--non-interactive{cursor:auto}.mdc-list-item:not(.mdc-list-item--selected):focus::before,.mdc-list-item.mdc-ripple-upgraded--background-focused::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-list-item:not(.mdc-list-item--selected):focus::before,.mdc-list-item.mdc-ripple-upgraded--background-focused::before{border-color:CanvasText}}.mdc-list-item.mdc-list-item--selected::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:3px double rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-list-item.mdc-list-item--selected::before{border-color:CanvasText}}.mdc-list-item.mdc-list-item--selected:focus::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:3px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-list-item.mdc-list-item--selected:focus::before{border-color:CanvasText}}a.mdc-list-item{color:inherit;text-decoration:none}.mdc-list-item__start{fill:currentColor;flex-shrink:0;pointer-events:none}.mdc-list-item__end{flex-shrink:0;pointer-events:none}.mdc-list-item__content{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;align-self:center;flex:1;pointer-events:none}.mdc-list-item--with-two-lines .mdc-list-item__content,.mdc-list-item--with-three-lines .mdc-list-item__content{align-self:stretch}.mdc-list-item__content[for]{pointer-events:none}.mdc-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-three-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item__secondary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal}.mdc-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list-item--with-three-lines .mdc-list-item__secondary-text{white-space:normal;line-height:20px}.mdc-list-item--with-overline .mdc-list-item__secondary-text{white-space:nowrap;line-height:auto}.mdc-list-item__overline-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-three-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-three-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-three-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-avatar.mdc-list-item,.mdc-list-item--with-leading-avatar.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-avatar .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-avatar .mdc-list-item__start,.mdc-list-item--with-leading-avatar .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-avatar .mdc-list-item__start{border-radius:50%}.mdc-list-item--with-leading-icon.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-icon.mdc-list-item,.mdc-list-item--with-leading-icon.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-icon .mdc-list-item__start{margin-left:16px;margin-right:32px}[dir=rtl] .mdc-list-item--with-leading-icon .mdc-list-item__start,.mdc-list-item--with-leading-icon .mdc-list-item__start[dir=rtl]{margin-left:32px;margin-right:16px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-thumbnail.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-thumbnail.mdc-list-item,.mdc-list-item--with-leading-thumbnail.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-thumbnail .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-thumbnail .mdc-list-item__start,.mdc-list-item--with-leading-thumbnail .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-image.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-image.mdc-list-item,.mdc-list-item--with-leading-image.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-image .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-image .mdc-list-item__start,.mdc-list-item--with-leading-image .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-one-line{height:72px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-video.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-video.mdc-list-item,.mdc-list-item--with-leading-video.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-video .mdc-list-item__start{margin-left:0;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-video .mdc-list-item__start,.mdc-list-item--with-leading-video .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-one-line{height:72px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-checkbox.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-checkbox.mdc-list-item,.mdc-list-item--with-leading-checkbox.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-checkbox .mdc-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-list-item--with-leading-checkbox .mdc-list-item__start,.mdc-list-item--with-leading-checkbox .mdc-list-item__start[dir=rtl]{margin-left:24px;margin-right:8px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-radio.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-radio.mdc-list-item,.mdc-list-item--with-leading-radio.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-radio .mdc-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-list-item--with-leading-radio .mdc-list-item__start,.mdc-list-item--with-leading-radio .mdc-list-item__start[dir=rtl]{margin-left:24px;margin-right:8px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-switch.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-switch.mdc-list-item,.mdc-list-item--with-leading-switch.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-switch .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-switch .mdc-list-item__start,.mdc-list-item--with-leading-switch .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-trailing-icon.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-icon.mdc-list-item,.mdc-list-item--with-trailing-icon.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-icon .mdc-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-icon .mdc-list-item__end,.mdc-list-item--with-trailing-icon .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end{align-self:flex-start;margin-top:0}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:0}.mdc-list-item--with-trailing-meta.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-meta.mdc-list-item,.mdc-list-item--with-trailing-meta.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-meta .mdc-list-item__end{margin-left:28px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-meta .mdc-list-item__end,.mdc-list-item--with-trailing-meta .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:28px}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-trailing-meta .mdc-list-item__end{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--mdc-typography-caption-font-family);font-size:var(--mdc-typography-caption-font-size);line-height:var(--mdc-typography-caption-line-height);font-weight:var(--mdc-typography-caption-font-weight);letter-spacing:var(--mdc-typography-caption-letter-spacing);text-decoration:var(--mdc-typography-caption-text-decoration);text-transform:var(--mdc-typography-caption-text-transform)}.mdc-list-item--with-trailing-checkbox.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item,.mdc-list-item--with-trailing-checkbox.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-checkbox .mdc-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-list-item--with-trailing-checkbox .mdc-list-item__end,.mdc-list-item--with-trailing-checkbox .mdc-list-item__end[dir=rtl]{margin-left:8px;margin-right:24px}.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:8px}.mdc-list-item--with-trailing-radio.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item,.mdc-list-item--with-trailing-radio.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-radio .mdc-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-list-item--with-trailing-radio .mdc-list-item__end,.mdc-list-item--with-trailing-radio .mdc-list-item__end[dir=rtl]{margin-left:8px;margin-right:24px}.mdc-list-item--with-trailing-radio.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:8px}.mdc-list-item--with-trailing-switch.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-switch.mdc-list-item,.mdc-list-item--with-trailing-switch.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-switch .mdc-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-switch .mdc-list-item__end,.mdc-list-item--with-trailing-switch .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-trailing-switch.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:16px}.mdc-list-item--with-overline.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-overline.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list-item--with-overline.mdc-list-item--with-three-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-overline.mdc-list-item--with-three-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list-item{padding-left:16px;padding-right:16px}[dir=rtl] .mdc-list-item,.mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list-group .mdc-deprecated-list{padding:0}.mdc-list-group__subheader{margin:calc((3rem - 1.5rem)/2) 16px}.mdc-list-divider{padding:0;background-clip:content-box}.mdc-list-divider.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset{padding-left:16px;padding-right:auto}[dir=rtl] .mdc-list-divider.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset,.mdc-list-divider.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset[dir=rtl]{padding-left:auto;padding-right:16px}.mdc-list-divider.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset{padding-left:auto;padding-right:16px}[dir=rtl] .mdc-list-divider.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset,.mdc-list-divider.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset[dir=rtl]{padding-left:16px;padding-right:auto}.mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset{padding-left:0px;padding-right:auto}[dir=rtl] .mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset[dir=rtl]{padding-left:auto;padding-right:0px}[dir=rtl] .mdc-list-divider,.mdc-list-divider[dir=rtl]{padding:0}.mdc-list-item{background-color:var(--mdc-list-list-item-container-color)}.mdc-list-item.mdc-list-item--selected{background-color:var(--mdc-list-list-item-selected-container-color)}.mdc-list-item--with-one-line{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-one-line.mdc-list-item--with-leading-avatar,.mdc-list-item--with-one-line.mdc-list-item--with-leading-icon,.mdc-list-item--with-one-line.mdc-list-item--with-leading-thumbnail,.mdc-list-item--with-one-line.mdc-list-item--with-leading-checkbox,.mdc-list-item--with-one-line.mdc-list-item--with-leading-radio,.mdc-list-item--with-one-line.mdc-list-item--with-leading-switch{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-one-line.mdc-list-item--with-leading-image,.mdc-list-item--with-one-line.mdc-list-item--with-leading-video{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-two-lines{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-two-lines.mdc-list-item--with-leading-avatar,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-icon,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-thumbnail,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-checkbox,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-radio,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-switch,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-image,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-video{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-three-lines{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item.mdc-list-item--with-one-line{height:var(--mdc-list-list-item-one-line-container-height)}.mdc-list-item.mdc-list-item--with-two-lines{height:var(--mdc-list-list-item-two-line-container-height)}.mdc-list-item.mdc-list-item--with-three-lines{height:var(--mdc-list-list-item-three-line-container-height)}.mdc-list-item__primary-text{color:var(--mdc-list-list-item-label-text-color)}.mdc-list-item__primary-text{font-family:var(--mdc-list-list-item-label-text-font);line-height:var(--mdc-list-list-item-label-text-line-height);font-size:var(--mdc-list-list-item-label-text-size);font-weight:var(--mdc-list-list-item-label-text-weight);letter-spacing:var(--mdc-list-list-item-label-text-tracking)}.mdc-list-item__secondary-text{color:var(--mdc-list-list-item-supporting-text-color)}.mdc-list-item__secondary-text{font-family:var(--mdc-list-list-item-supporting-text-font);line-height:var(--mdc-list-list-item-supporting-text-line-height);font-size:var(--mdc-list-list-item-supporting-text-size);font-weight:var(--mdc-list-list-item-supporting-text-weight);letter-spacing:var(--mdc-list-list-item-supporting-text-tracking)}.mdc-list-item--with-leading-icon .mdc-list-item__start{color:var(--mdc-list-list-item-leading-icon-color)}.mdc-list-item--with-leading-icon .mdc-list-item__start{width:var(--mdc-list-list-item-leading-icon-size);height:var(--mdc-list-list-item-leading-icon-size)}.mdc-list-item--with-leading-icon .mdc-list-item__start>i{font-size:var(--mdc-list-list-item-leading-icon-size)}.mdc-list-item--with-leading-icon .mdc-list-item__start .mdc-list-item__icon{font-size:var(--mdc-list-list-item-leading-icon-size);width:var(--mdc-list-list-item-leading-icon-size);height:var(--mdc-list-list-item-leading-icon-size)}.mdc-list-item--with-leading-avatar .mdc-list-item__start{width:var(--mdc-list-list-item-leading-avatar-size);height:var(--mdc-list-list-item-leading-avatar-size)}.mdc-list-item.mdc-list-item--with-trailing-meta .mdc-list-item__end{color:var(--mdc-list-list-item-trailing-supporting-text-color)}.mdc-list-item--with-trailing-meta .mdc-list-item__end{font-family:var(--mdc-list-list-item-trailing-supporting-text-font);line-height:var(--mdc-list-list-item-trailing-supporting-text-line-height);font-size:var(--mdc-list-list-item-trailing-supporting-text-size);font-weight:var(--mdc-list-list-item-trailing-supporting-text-weight);letter-spacing:var(--mdc-list-list-item-trailing-supporting-text-tracking)}.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-trailing-icon-color)}.mdc-list-item--with-trailing-icon .mdc-list-item__end{width:var(--mdc-list-list-item-trailing-icon-size);height:var(--mdc-list-list-item-trailing-icon-size)}.mdc-list-item--with-trailing-icon .mdc-list-item__end>i{font-size:var(--mdc-list-list-item-trailing-icon-size)}.mdc-list-item--with-trailing-icon .mdc-list-item__end .mdc-list-item__icon{font-size:var(--mdc-list-list-item-trailing-icon-size);width:var(--mdc-list-list-item-trailing-icon-size);height:var(--mdc-list-list-item-trailing-icon-size)}.mdc-list-item--selected.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-selected-trailing-icon-color)}.mdc-list-item--disabled .mdc-list-item__start,.mdc-list-item--disabled .mdc-list-item__content,.mdc-list-item--disabled .mdc-list-item__end{opacity:1}.mdc-list-item--disabled .mdc-list-item__primary-text,.mdc-list-item--disabled .mdc-list-item__secondary-text,.mdc-list-item--disabled .mdc-list-item__overline-text{opacity:var(--mdc-list-list-item-disabled-label-text-opacity)}.mdc-list-item--disabled.mdc-list-item--with-leading-icon .mdc-list-item__start{color:var(--mdc-list-list-item-disabled-leading-icon-color)}.mdc-list-item--disabled.mdc-list-item--with-leading-icon .mdc-list-item__start{opacity:var(--mdc-list-list-item-disabled-leading-icon-opacity)}.mdc-list-item--disabled.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-disabled-trailing-icon-color)}.mdc-list-item--disabled.mdc-list-item--with-trailing-icon .mdc-list-item__end{opacity:var(--mdc-list-list-item-disabled-trailing-icon-opacity)}.mdc-list-item:hover .mdc-list-item__primary-text{color:var(--mdc-list-list-item-hover-label-text-color)}.mdc-list-item--with-leading-icon:hover .mdc-list-item__start{color:var(--mdc-list-list-item-hover-leading-icon-color)}.mdc-list-item--with-trailing-icon:hover .mdc-list-item__end{color:var(--mdc-list-list-item-hover-trailing-icon-color)}.mdc-list-item:focus .mdc-list-item__primary-text{color:var(--mdc-list-list-item-focus-label-text-color)}.mdc-list-item.mdc-list-item--disabled .mdc-list-item__primary-text{color:var(--mdc-list-list-item-disabled-label-text-color)}.mdc-list-item:hover::before{background-color:var(--mdc-list-list-item-hover-state-layer-color);opacity:var(--mdc-list-list-item-hover-state-layer-opacity)}.mdc-list-item.mdc-list-item--disabled::before{background-color:var(--mdc-list-list-item-disabled-state-layer-color);opacity:var(--mdc-list-list-item-disabled-state-layer-opacity)}.mdc-list-item:focus::before{background-color:var(--mdc-list-list-item-focus-state-layer-color);opacity:var(--mdc-list-list-item-focus-state-layer-opacity)}.mdc-list-item--disabled .mdc-radio,.mdc-list-item--disabled .mdc-checkbox{opacity:var(--mdc-list-list-item-disabled-label-text-opacity)}.mdc-list-item--with-leading-avatar .mat-mdc-list-item-avatar{border-radius:var(--mdc-list-list-item-leading-avatar-shape);background-color:var(--mdc-list-list-item-leading-avatar-color)}.mat-mdc-list-base{--mdc-list-list-item-container-shape:0;--mdc-list-list-item-leading-avatar-shape:50%;--mdc-list-list-item-container-color:transparent;--mdc-list-list-item-selected-container-color:transparent;--mdc-list-list-item-leading-avatar-color:transparent;--mdc-list-list-item-leading-icon-size:24px;--mdc-list-list-item-leading-avatar-size:40px;--mdc-list-list-item-trailing-icon-size:24px;--mdc-list-list-item-disabled-state-layer-color:transparent;--mdc-list-list-item-disabled-state-layer-opacity:0;--mdc-list-list-item-disabled-label-text-opacity:0.38;--mdc-list-list-item-disabled-leading-icon-opacity:0.38;--mdc-list-list-item-disabled-trailing-icon-opacity:0.38}.cdk-high-contrast-active a.mdc-list-item--activated::after{content:\"\";position:absolute;top:50%;right:16px;transform:translateY(-50%);width:10px;height:0;border-bottom:solid 10px;border-radius:10px}.cdk-high-contrast-active a.mdc-list-item--activated [dir=rtl]::after{right:auto;left:16px}.mat-mdc-list-base{display:block}.mat-mdc-list-base .mdc-list-item__start,.mat-mdc-list-base .mdc-list-item__end,.mat-mdc-list-base .mdc-list-item__content{pointer-events:auto}.mat-mdc-list-item,.mat-mdc-list-option{width:100%;box-sizing:border-box;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-list-item:not(.mat-mdc-list-item-interactive),.mat-mdc-list-option:not(.mat-mdc-list-item-interactive){cursor:default}.mat-mdc-list-item .mat-divider-inset,.mat-mdc-list-option .mat-divider-inset{position:absolute;left:0;right:0;bottom:0}.mat-mdc-list-item .mat-mdc-list-item-avatar~.mat-divider-inset,.mat-mdc-list-option .mat-mdc-list-item-avatar~.mat-divider-inset{margin-left:72px}[dir=rtl] .mat-mdc-list-item .mat-mdc-list-item-avatar~.mat-divider-inset,[dir=rtl] .mat-mdc-list-option .mat-mdc-list-item-avatar~.mat-divider-inset{margin-right:72px}.mat-mdc-list-item-interactive::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";opacity:0;pointer-events:none}.mat-mdc-list-item>.mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-mdc-list-item:focus>.mat-mdc-focus-indicator::before{content:\"\"}.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-line.mdc-list-item__secondary-text{white-space:nowrap;line-height:normal}.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-unscoped-content.mdc-list-item__secondary-text{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}mat-action-list button{background:none;color:inherit;border:none;font:inherit;outline:inherit;-webkit-tap-highlight-color:rgba(0,0,0,0);text-align:left}[dir=rtl] mat-action-list button{text-align:right}mat-action-list button::-moz-focus-inner{border:0}"],
  encapsulation: 2,
  changeDetection: 0
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatActionList, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'mat-action-list',
      exportAs: 'matActionList',
      template: '<ng-content></ng-content>',
      host: {
        'class': 'mat-mdc-action-list mat-mdc-list-base mdc-list',
        'role': 'group'
      },
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush,
      providers: [{
        provide: MatListBase,
        useExisting: MatActionList
      }],
      styles: ["@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-list-divider::after{content:\"\";display:block;border-bottom-width:1px;border-bottom-style:solid}}.mdc-list{margin:0;padding:8px 0;list-style-type:none}.mdc-list:focus{outline:none}.mdc-list-item__wrapper{display:block}.mdc-list-item{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;align-items:stretch;cursor:pointer}.mdc-list-item:focus{outline:none}.mdc-list-item.mdc-list-item--with-one-line{height:48px}.mdc-list-item.mdc-list-item--with-two-lines{height:64px}.mdc-list-item.mdc-list-item--with-three-lines{height:88px}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__start{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--disabled,.mdc-list-item.mdc-list-item--non-interactive{cursor:auto}.mdc-list-item:not(.mdc-list-item--selected):focus::before,.mdc-list-item.mdc-ripple-upgraded--background-focused::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-list-item:not(.mdc-list-item--selected):focus::before,.mdc-list-item.mdc-ripple-upgraded--background-focused::before{border-color:CanvasText}}.mdc-list-item.mdc-list-item--selected::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:3px double rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-list-item.mdc-list-item--selected::before{border-color:CanvasText}}.mdc-list-item.mdc-list-item--selected:focus::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:3px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-list-item.mdc-list-item--selected:focus::before{border-color:CanvasText}}a.mdc-list-item{color:inherit;text-decoration:none}.mdc-list-item__start{fill:currentColor;flex-shrink:0;pointer-events:none}.mdc-list-item__end{flex-shrink:0;pointer-events:none}.mdc-list-item__content{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;align-self:center;flex:1;pointer-events:none}.mdc-list-item--with-two-lines .mdc-list-item__content,.mdc-list-item--with-three-lines .mdc-list-item__content{align-self:stretch}.mdc-list-item__content[for]{pointer-events:none}.mdc-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-three-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item__secondary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal}.mdc-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list-item--with-three-lines .mdc-list-item__secondary-text{white-space:normal;line-height:20px}.mdc-list-item--with-overline .mdc-list-item__secondary-text{white-space:nowrap;line-height:auto}.mdc-list-item__overline-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-three-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-three-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-three-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-avatar.mdc-list-item,.mdc-list-item--with-leading-avatar.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-avatar .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-avatar .mdc-list-item__start,.mdc-list-item--with-leading-avatar .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-avatar .mdc-list-item__start{border-radius:50%}.mdc-list-item--with-leading-icon.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-icon.mdc-list-item,.mdc-list-item--with-leading-icon.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-icon .mdc-list-item__start{margin-left:16px;margin-right:32px}[dir=rtl] .mdc-list-item--with-leading-icon .mdc-list-item__start,.mdc-list-item--with-leading-icon .mdc-list-item__start[dir=rtl]{margin-left:32px;margin-right:16px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-thumbnail.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-thumbnail.mdc-list-item,.mdc-list-item--with-leading-thumbnail.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-thumbnail .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-thumbnail .mdc-list-item__start,.mdc-list-item--with-leading-thumbnail .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-image.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-image.mdc-list-item,.mdc-list-item--with-leading-image.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-image .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-image .mdc-list-item__start,.mdc-list-item--with-leading-image .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-one-line{height:72px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-video.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-video.mdc-list-item,.mdc-list-item--with-leading-video.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-video .mdc-list-item__start{margin-left:0;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-video .mdc-list-item__start,.mdc-list-item--with-leading-video .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-one-line{height:72px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-checkbox.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-checkbox.mdc-list-item,.mdc-list-item--with-leading-checkbox.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-checkbox .mdc-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-list-item--with-leading-checkbox .mdc-list-item__start,.mdc-list-item--with-leading-checkbox .mdc-list-item__start[dir=rtl]{margin-left:24px;margin-right:8px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-radio.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-radio.mdc-list-item,.mdc-list-item--with-leading-radio.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-radio .mdc-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-list-item--with-leading-radio .mdc-list-item__start,.mdc-list-item--with-leading-radio .mdc-list-item__start[dir=rtl]{margin-left:24px;margin-right:8px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-switch.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-switch.mdc-list-item,.mdc-list-item--with-leading-switch.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-switch .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-switch .mdc-list-item__start,.mdc-list-item--with-leading-switch .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-trailing-icon.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-icon.mdc-list-item,.mdc-list-item--with-trailing-icon.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-icon .mdc-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-icon .mdc-list-item__end,.mdc-list-item--with-trailing-icon .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end{align-self:flex-start;margin-top:0}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:0}.mdc-list-item--with-trailing-meta.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-meta.mdc-list-item,.mdc-list-item--with-trailing-meta.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-meta .mdc-list-item__end{margin-left:28px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-meta .mdc-list-item__end,.mdc-list-item--with-trailing-meta .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:28px}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-trailing-meta .mdc-list-item__end{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--mdc-typography-caption-font-family);font-size:var(--mdc-typography-caption-font-size);line-height:var(--mdc-typography-caption-line-height);font-weight:var(--mdc-typography-caption-font-weight);letter-spacing:var(--mdc-typography-caption-letter-spacing);text-decoration:var(--mdc-typography-caption-text-decoration);text-transform:var(--mdc-typography-caption-text-transform)}.mdc-list-item--with-trailing-checkbox.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item,.mdc-list-item--with-trailing-checkbox.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-checkbox .mdc-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-list-item--with-trailing-checkbox .mdc-list-item__end,.mdc-list-item--with-trailing-checkbox .mdc-list-item__end[dir=rtl]{margin-left:8px;margin-right:24px}.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:8px}.mdc-list-item--with-trailing-radio.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item,.mdc-list-item--with-trailing-radio.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-radio .mdc-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-list-item--with-trailing-radio .mdc-list-item__end,.mdc-list-item--with-trailing-radio .mdc-list-item__end[dir=rtl]{margin-left:8px;margin-right:24px}.mdc-list-item--with-trailing-radio.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:8px}.mdc-list-item--with-trailing-switch.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-switch.mdc-list-item,.mdc-list-item--with-trailing-switch.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-switch .mdc-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-switch .mdc-list-item__end,.mdc-list-item--with-trailing-switch .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-trailing-switch.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:16px}.mdc-list-item--with-overline.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-overline.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list-item--with-overline.mdc-list-item--with-three-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-overline.mdc-list-item--with-three-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list-item{padding-left:16px;padding-right:16px}[dir=rtl] .mdc-list-item,.mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list-group .mdc-deprecated-list{padding:0}.mdc-list-group__subheader{margin:calc((3rem - 1.5rem)/2) 16px}.mdc-list-divider{padding:0;background-clip:content-box}.mdc-list-divider.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset{padding-left:16px;padding-right:auto}[dir=rtl] .mdc-list-divider.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset,.mdc-list-divider.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset[dir=rtl]{padding-left:auto;padding-right:16px}.mdc-list-divider.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset{padding-left:auto;padding-right:16px}[dir=rtl] .mdc-list-divider.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset,.mdc-list-divider.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset[dir=rtl]{padding-left:16px;padding-right:auto}.mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset{padding-left:0px;padding-right:auto}[dir=rtl] .mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset[dir=rtl]{padding-left:auto;padding-right:0px}[dir=rtl] .mdc-list-divider,.mdc-list-divider[dir=rtl]{padding:0}.mdc-list-item{background-color:var(--mdc-list-list-item-container-color)}.mdc-list-item.mdc-list-item--selected{background-color:var(--mdc-list-list-item-selected-container-color)}.mdc-list-item--with-one-line{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-one-line.mdc-list-item--with-leading-avatar,.mdc-list-item--with-one-line.mdc-list-item--with-leading-icon,.mdc-list-item--with-one-line.mdc-list-item--with-leading-thumbnail,.mdc-list-item--with-one-line.mdc-list-item--with-leading-checkbox,.mdc-list-item--with-one-line.mdc-list-item--with-leading-radio,.mdc-list-item--with-one-line.mdc-list-item--with-leading-switch{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-one-line.mdc-list-item--with-leading-image,.mdc-list-item--with-one-line.mdc-list-item--with-leading-video{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-two-lines{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-two-lines.mdc-list-item--with-leading-avatar,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-icon,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-thumbnail,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-checkbox,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-radio,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-switch,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-image,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-video{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-three-lines{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item.mdc-list-item--with-one-line{height:var(--mdc-list-list-item-one-line-container-height)}.mdc-list-item.mdc-list-item--with-two-lines{height:var(--mdc-list-list-item-two-line-container-height)}.mdc-list-item.mdc-list-item--with-three-lines{height:var(--mdc-list-list-item-three-line-container-height)}.mdc-list-item__primary-text{color:var(--mdc-list-list-item-label-text-color)}.mdc-list-item__primary-text{font-family:var(--mdc-list-list-item-label-text-font);line-height:var(--mdc-list-list-item-label-text-line-height);font-size:var(--mdc-list-list-item-label-text-size);font-weight:var(--mdc-list-list-item-label-text-weight);letter-spacing:var(--mdc-list-list-item-label-text-tracking)}.mdc-list-item__secondary-text{color:var(--mdc-list-list-item-supporting-text-color)}.mdc-list-item__secondary-text{font-family:var(--mdc-list-list-item-supporting-text-font);line-height:var(--mdc-list-list-item-supporting-text-line-height);font-size:var(--mdc-list-list-item-supporting-text-size);font-weight:var(--mdc-list-list-item-supporting-text-weight);letter-spacing:var(--mdc-list-list-item-supporting-text-tracking)}.mdc-list-item--with-leading-icon .mdc-list-item__start{color:var(--mdc-list-list-item-leading-icon-color)}.mdc-list-item--with-leading-icon .mdc-list-item__start{width:var(--mdc-list-list-item-leading-icon-size);height:var(--mdc-list-list-item-leading-icon-size)}.mdc-list-item--with-leading-icon .mdc-list-item__start>i{font-size:var(--mdc-list-list-item-leading-icon-size)}.mdc-list-item--with-leading-icon .mdc-list-item__start .mdc-list-item__icon{font-size:var(--mdc-list-list-item-leading-icon-size);width:var(--mdc-list-list-item-leading-icon-size);height:var(--mdc-list-list-item-leading-icon-size)}.mdc-list-item--with-leading-avatar .mdc-list-item__start{width:var(--mdc-list-list-item-leading-avatar-size);height:var(--mdc-list-list-item-leading-avatar-size)}.mdc-list-item.mdc-list-item--with-trailing-meta .mdc-list-item__end{color:var(--mdc-list-list-item-trailing-supporting-text-color)}.mdc-list-item--with-trailing-meta .mdc-list-item__end{font-family:var(--mdc-list-list-item-trailing-supporting-text-font);line-height:var(--mdc-list-list-item-trailing-supporting-text-line-height);font-size:var(--mdc-list-list-item-trailing-supporting-text-size);font-weight:var(--mdc-list-list-item-trailing-supporting-text-weight);letter-spacing:var(--mdc-list-list-item-trailing-supporting-text-tracking)}.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-trailing-icon-color)}.mdc-list-item--with-trailing-icon .mdc-list-item__end{width:var(--mdc-list-list-item-trailing-icon-size);height:var(--mdc-list-list-item-trailing-icon-size)}.mdc-list-item--with-trailing-icon .mdc-list-item__end>i{font-size:var(--mdc-list-list-item-trailing-icon-size)}.mdc-list-item--with-trailing-icon .mdc-list-item__end .mdc-list-item__icon{font-size:var(--mdc-list-list-item-trailing-icon-size);width:var(--mdc-list-list-item-trailing-icon-size);height:var(--mdc-list-list-item-trailing-icon-size)}.mdc-list-item--selected.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-selected-trailing-icon-color)}.mdc-list-item--disabled .mdc-list-item__start,.mdc-list-item--disabled .mdc-list-item__content,.mdc-list-item--disabled .mdc-list-item__end{opacity:1}.mdc-list-item--disabled .mdc-list-item__primary-text,.mdc-list-item--disabled .mdc-list-item__secondary-text,.mdc-list-item--disabled .mdc-list-item__overline-text{opacity:var(--mdc-list-list-item-disabled-label-text-opacity)}.mdc-list-item--disabled.mdc-list-item--with-leading-icon .mdc-list-item__start{color:var(--mdc-list-list-item-disabled-leading-icon-color)}.mdc-list-item--disabled.mdc-list-item--with-leading-icon .mdc-list-item__start{opacity:var(--mdc-list-list-item-disabled-leading-icon-opacity)}.mdc-list-item--disabled.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-disabled-trailing-icon-color)}.mdc-list-item--disabled.mdc-list-item--with-trailing-icon .mdc-list-item__end{opacity:var(--mdc-list-list-item-disabled-trailing-icon-opacity)}.mdc-list-item:hover .mdc-list-item__primary-text{color:var(--mdc-list-list-item-hover-label-text-color)}.mdc-list-item--with-leading-icon:hover .mdc-list-item__start{color:var(--mdc-list-list-item-hover-leading-icon-color)}.mdc-list-item--with-trailing-icon:hover .mdc-list-item__end{color:var(--mdc-list-list-item-hover-trailing-icon-color)}.mdc-list-item:focus .mdc-list-item__primary-text{color:var(--mdc-list-list-item-focus-label-text-color)}.mdc-list-item.mdc-list-item--disabled .mdc-list-item__primary-text{color:var(--mdc-list-list-item-disabled-label-text-color)}.mdc-list-item:hover::before{background-color:var(--mdc-list-list-item-hover-state-layer-color);opacity:var(--mdc-list-list-item-hover-state-layer-opacity)}.mdc-list-item.mdc-list-item--disabled::before{background-color:var(--mdc-list-list-item-disabled-state-layer-color);opacity:var(--mdc-list-list-item-disabled-state-layer-opacity)}.mdc-list-item:focus::before{background-color:var(--mdc-list-list-item-focus-state-layer-color);opacity:var(--mdc-list-list-item-focus-state-layer-opacity)}.mdc-list-item--disabled .mdc-radio,.mdc-list-item--disabled .mdc-checkbox{opacity:var(--mdc-list-list-item-disabled-label-text-opacity)}.mdc-list-item--with-leading-avatar .mat-mdc-list-item-avatar{border-radius:var(--mdc-list-list-item-leading-avatar-shape);background-color:var(--mdc-list-list-item-leading-avatar-color)}.mat-mdc-list-base{--mdc-list-list-item-container-shape:0;--mdc-list-list-item-leading-avatar-shape:50%;--mdc-list-list-item-container-color:transparent;--mdc-list-list-item-selected-container-color:transparent;--mdc-list-list-item-leading-avatar-color:transparent;--mdc-list-list-item-leading-icon-size:24px;--mdc-list-list-item-leading-avatar-size:40px;--mdc-list-list-item-trailing-icon-size:24px;--mdc-list-list-item-disabled-state-layer-color:transparent;--mdc-list-list-item-disabled-state-layer-opacity:0;--mdc-list-list-item-disabled-label-text-opacity:0.38;--mdc-list-list-item-disabled-leading-icon-opacity:0.38;--mdc-list-list-item-disabled-trailing-icon-opacity:0.38}.cdk-high-contrast-active a.mdc-list-item--activated::after{content:\"\";position:absolute;top:50%;right:16px;transform:translateY(-50%);width:10px;height:0;border-bottom:solid 10px;border-radius:10px}.cdk-high-contrast-active a.mdc-list-item--activated [dir=rtl]::after{right:auto;left:16px}.mat-mdc-list-base{display:block}.mat-mdc-list-base .mdc-list-item__start,.mat-mdc-list-base .mdc-list-item__end,.mat-mdc-list-base .mdc-list-item__content{pointer-events:auto}.mat-mdc-list-item,.mat-mdc-list-option{width:100%;box-sizing:border-box;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-list-item:not(.mat-mdc-list-item-interactive),.mat-mdc-list-option:not(.mat-mdc-list-item-interactive){cursor:default}.mat-mdc-list-item .mat-divider-inset,.mat-mdc-list-option .mat-divider-inset{position:absolute;left:0;right:0;bottom:0}.mat-mdc-list-item .mat-mdc-list-item-avatar~.mat-divider-inset,.mat-mdc-list-option .mat-mdc-list-item-avatar~.mat-divider-inset{margin-left:72px}[dir=rtl] .mat-mdc-list-item .mat-mdc-list-item-avatar~.mat-divider-inset,[dir=rtl] .mat-mdc-list-option .mat-mdc-list-item-avatar~.mat-divider-inset{margin-right:72px}.mat-mdc-list-item-interactive::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";opacity:0;pointer-events:none}.mat-mdc-list-item>.mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-mdc-list-item:focus>.mat-mdc-focus-indicator::before{content:\"\"}.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-line.mdc-list-item__secondary-text{white-space:nowrap;line-height:normal}.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-unscoped-content.mdc-list-item__secondary-text{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}mat-action-list button{background:none;color:inherit;border:none;font:inherit;outline:inherit;-webkit-tap-highlight-color:rgba(0,0,0,0);text-align:left}[dir=rtl] mat-action-list button{text-align:right}mat-action-list button::-moz-focus-inner{border:0}"]
    }]
  }], null, null);
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Injection token that can be used to inject instances of `MatList`. It serves as
 * alternative token to the actual `MatList` class which could cause unnecessary
 * retention of the class and its component metadata.
 */
const MAT_LIST = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('MatList');
class MatList extends MatListBase {}
MatList.ɵfac = /* @__PURE__ */function () {
  let ɵMatList_BaseFactory;
  return function MatList_Factory(t) {
    return (ɵMatList_BaseFactory || (ɵMatList_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](MatList)))(t || MatList);
  };
}();
MatList.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: MatList,
  selectors: [["mat-list"]],
  hostAttrs: [1, "mat-mdc-list", "mat-mdc-list-base", "mdc-list"],
  exportAs: ["matList"],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([{
    provide: MatListBase,
    useExisting: MatList
  }]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]],
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function MatList_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](0);
    }
  },
  styles: [_c1],
  encapsulation: 2,
  changeDetection: 0
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatList, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'mat-list',
      exportAs: 'matList',
      template: '<ng-content></ng-content>',
      host: {
        'class': 'mat-mdc-list mat-mdc-list-base mdc-list'
      },
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush,
      providers: [{
        provide: MatListBase,
        useExisting: MatList
      }],
      styles: ["@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-list-divider::after{content:\"\";display:block;border-bottom-width:1px;border-bottom-style:solid}}.mdc-list{margin:0;padding:8px 0;list-style-type:none}.mdc-list:focus{outline:none}.mdc-list-item__wrapper{display:block}.mdc-list-item{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;align-items:stretch;cursor:pointer}.mdc-list-item:focus{outline:none}.mdc-list-item.mdc-list-item--with-one-line{height:48px}.mdc-list-item.mdc-list-item--with-two-lines{height:64px}.mdc-list-item.mdc-list-item--with-three-lines{height:88px}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__start{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--disabled,.mdc-list-item.mdc-list-item--non-interactive{cursor:auto}.mdc-list-item:not(.mdc-list-item--selected):focus::before,.mdc-list-item.mdc-ripple-upgraded--background-focused::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-list-item:not(.mdc-list-item--selected):focus::before,.mdc-list-item.mdc-ripple-upgraded--background-focused::before{border-color:CanvasText}}.mdc-list-item.mdc-list-item--selected::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:3px double rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-list-item.mdc-list-item--selected::before{border-color:CanvasText}}.mdc-list-item.mdc-list-item--selected:focus::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:3px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-list-item.mdc-list-item--selected:focus::before{border-color:CanvasText}}a.mdc-list-item{color:inherit;text-decoration:none}.mdc-list-item__start{fill:currentColor;flex-shrink:0;pointer-events:none}.mdc-list-item__end{flex-shrink:0;pointer-events:none}.mdc-list-item__content{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;align-self:center;flex:1;pointer-events:none}.mdc-list-item--with-two-lines .mdc-list-item__content,.mdc-list-item--with-three-lines .mdc-list-item__content{align-self:stretch}.mdc-list-item__content[for]{pointer-events:none}.mdc-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-three-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item__secondary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal}.mdc-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list-item--with-three-lines .mdc-list-item__secondary-text{white-space:normal;line-height:20px}.mdc-list-item--with-overline .mdc-list-item__secondary-text{white-space:nowrap;line-height:auto}.mdc-list-item__overline-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-three-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-three-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-three-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-avatar.mdc-list-item,.mdc-list-item--with-leading-avatar.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-avatar .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-avatar .mdc-list-item__start,.mdc-list-item--with-leading-avatar .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-avatar .mdc-list-item__start{border-radius:50%}.mdc-list-item--with-leading-icon.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-icon.mdc-list-item,.mdc-list-item--with-leading-icon.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-icon .mdc-list-item__start{margin-left:16px;margin-right:32px}[dir=rtl] .mdc-list-item--with-leading-icon .mdc-list-item__start,.mdc-list-item--with-leading-icon .mdc-list-item__start[dir=rtl]{margin-left:32px;margin-right:16px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-thumbnail.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-thumbnail.mdc-list-item,.mdc-list-item--with-leading-thumbnail.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-thumbnail .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-thumbnail .mdc-list-item__start,.mdc-list-item--with-leading-thumbnail .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-image.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-image.mdc-list-item,.mdc-list-item--with-leading-image.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-image .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-image .mdc-list-item__start,.mdc-list-item--with-leading-image .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-one-line{height:72px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-video.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-video.mdc-list-item,.mdc-list-item--with-leading-video.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-video .mdc-list-item__start{margin-left:0;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-video .mdc-list-item__start,.mdc-list-item--with-leading-video .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-one-line{height:72px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-checkbox.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-checkbox.mdc-list-item,.mdc-list-item--with-leading-checkbox.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-checkbox .mdc-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-list-item--with-leading-checkbox .mdc-list-item__start,.mdc-list-item--with-leading-checkbox .mdc-list-item__start[dir=rtl]{margin-left:24px;margin-right:8px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-radio.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-radio.mdc-list-item,.mdc-list-item--with-leading-radio.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-radio .mdc-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-list-item--with-leading-radio .mdc-list-item__start,.mdc-list-item--with-leading-radio .mdc-list-item__start[dir=rtl]{margin-left:24px;margin-right:8px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-switch.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-switch.mdc-list-item,.mdc-list-item--with-leading-switch.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-switch .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-switch .mdc-list-item__start,.mdc-list-item--with-leading-switch .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-trailing-icon.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-icon.mdc-list-item,.mdc-list-item--with-trailing-icon.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-icon .mdc-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-icon .mdc-list-item__end,.mdc-list-item--with-trailing-icon .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end{align-self:flex-start;margin-top:0}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:0}.mdc-list-item--with-trailing-meta.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-meta.mdc-list-item,.mdc-list-item--with-trailing-meta.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-meta .mdc-list-item__end{margin-left:28px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-meta .mdc-list-item__end,.mdc-list-item--with-trailing-meta .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:28px}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-trailing-meta .mdc-list-item__end{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--mdc-typography-caption-font-family);font-size:var(--mdc-typography-caption-font-size);line-height:var(--mdc-typography-caption-line-height);font-weight:var(--mdc-typography-caption-font-weight);letter-spacing:var(--mdc-typography-caption-letter-spacing);text-decoration:var(--mdc-typography-caption-text-decoration);text-transform:var(--mdc-typography-caption-text-transform)}.mdc-list-item--with-trailing-checkbox.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item,.mdc-list-item--with-trailing-checkbox.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-checkbox .mdc-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-list-item--with-trailing-checkbox .mdc-list-item__end,.mdc-list-item--with-trailing-checkbox .mdc-list-item__end[dir=rtl]{margin-left:8px;margin-right:24px}.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:8px}.mdc-list-item--with-trailing-radio.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item,.mdc-list-item--with-trailing-radio.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-radio .mdc-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-list-item--with-trailing-radio .mdc-list-item__end,.mdc-list-item--with-trailing-radio .mdc-list-item__end[dir=rtl]{margin-left:8px;margin-right:24px}.mdc-list-item--with-trailing-radio.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:8px}.mdc-list-item--with-trailing-switch.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-switch.mdc-list-item,.mdc-list-item--with-trailing-switch.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-switch .mdc-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-switch .mdc-list-item__end,.mdc-list-item--with-trailing-switch .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-trailing-switch.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:16px}.mdc-list-item--with-overline.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-overline.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list-item--with-overline.mdc-list-item--with-three-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-overline.mdc-list-item--with-three-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list-item{padding-left:16px;padding-right:16px}[dir=rtl] .mdc-list-item,.mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list-group .mdc-deprecated-list{padding:0}.mdc-list-group__subheader{margin:calc((3rem - 1.5rem)/2) 16px}.mdc-list-divider{padding:0;background-clip:content-box}.mdc-list-divider.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset{padding-left:16px;padding-right:auto}[dir=rtl] .mdc-list-divider.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset,.mdc-list-divider.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset[dir=rtl]{padding-left:auto;padding-right:16px}.mdc-list-divider.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset{padding-left:auto;padding-right:16px}[dir=rtl] .mdc-list-divider.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset,.mdc-list-divider.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset[dir=rtl]{padding-left:16px;padding-right:auto}.mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset{padding-left:0px;padding-right:auto}[dir=rtl] .mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset[dir=rtl]{padding-left:auto;padding-right:0px}[dir=rtl] .mdc-list-divider,.mdc-list-divider[dir=rtl]{padding:0}.mdc-list-item{background-color:var(--mdc-list-list-item-container-color)}.mdc-list-item.mdc-list-item--selected{background-color:var(--mdc-list-list-item-selected-container-color)}.mdc-list-item--with-one-line{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-one-line.mdc-list-item--with-leading-avatar,.mdc-list-item--with-one-line.mdc-list-item--with-leading-icon,.mdc-list-item--with-one-line.mdc-list-item--with-leading-thumbnail,.mdc-list-item--with-one-line.mdc-list-item--with-leading-checkbox,.mdc-list-item--with-one-line.mdc-list-item--with-leading-radio,.mdc-list-item--with-one-line.mdc-list-item--with-leading-switch{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-one-line.mdc-list-item--with-leading-image,.mdc-list-item--with-one-line.mdc-list-item--with-leading-video{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-two-lines{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-two-lines.mdc-list-item--with-leading-avatar,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-icon,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-thumbnail,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-checkbox,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-radio,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-switch,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-image,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-video{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-three-lines{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item.mdc-list-item--with-one-line{height:var(--mdc-list-list-item-one-line-container-height)}.mdc-list-item.mdc-list-item--with-two-lines{height:var(--mdc-list-list-item-two-line-container-height)}.mdc-list-item.mdc-list-item--with-three-lines{height:var(--mdc-list-list-item-three-line-container-height)}.mdc-list-item__primary-text{color:var(--mdc-list-list-item-label-text-color)}.mdc-list-item__primary-text{font-family:var(--mdc-list-list-item-label-text-font);line-height:var(--mdc-list-list-item-label-text-line-height);font-size:var(--mdc-list-list-item-label-text-size);font-weight:var(--mdc-list-list-item-label-text-weight);letter-spacing:var(--mdc-list-list-item-label-text-tracking)}.mdc-list-item__secondary-text{color:var(--mdc-list-list-item-supporting-text-color)}.mdc-list-item__secondary-text{font-family:var(--mdc-list-list-item-supporting-text-font);line-height:var(--mdc-list-list-item-supporting-text-line-height);font-size:var(--mdc-list-list-item-supporting-text-size);font-weight:var(--mdc-list-list-item-supporting-text-weight);letter-spacing:var(--mdc-list-list-item-supporting-text-tracking)}.mdc-list-item--with-leading-icon .mdc-list-item__start{color:var(--mdc-list-list-item-leading-icon-color)}.mdc-list-item--with-leading-icon .mdc-list-item__start{width:var(--mdc-list-list-item-leading-icon-size);height:var(--mdc-list-list-item-leading-icon-size)}.mdc-list-item--with-leading-icon .mdc-list-item__start>i{font-size:var(--mdc-list-list-item-leading-icon-size)}.mdc-list-item--with-leading-icon .mdc-list-item__start .mdc-list-item__icon{font-size:var(--mdc-list-list-item-leading-icon-size);width:var(--mdc-list-list-item-leading-icon-size);height:var(--mdc-list-list-item-leading-icon-size)}.mdc-list-item--with-leading-avatar .mdc-list-item__start{width:var(--mdc-list-list-item-leading-avatar-size);height:var(--mdc-list-list-item-leading-avatar-size)}.mdc-list-item.mdc-list-item--with-trailing-meta .mdc-list-item__end{color:var(--mdc-list-list-item-trailing-supporting-text-color)}.mdc-list-item--with-trailing-meta .mdc-list-item__end{font-family:var(--mdc-list-list-item-trailing-supporting-text-font);line-height:var(--mdc-list-list-item-trailing-supporting-text-line-height);font-size:var(--mdc-list-list-item-trailing-supporting-text-size);font-weight:var(--mdc-list-list-item-trailing-supporting-text-weight);letter-spacing:var(--mdc-list-list-item-trailing-supporting-text-tracking)}.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-trailing-icon-color)}.mdc-list-item--with-trailing-icon .mdc-list-item__end{width:var(--mdc-list-list-item-trailing-icon-size);height:var(--mdc-list-list-item-trailing-icon-size)}.mdc-list-item--with-trailing-icon .mdc-list-item__end>i{font-size:var(--mdc-list-list-item-trailing-icon-size)}.mdc-list-item--with-trailing-icon .mdc-list-item__end .mdc-list-item__icon{font-size:var(--mdc-list-list-item-trailing-icon-size);width:var(--mdc-list-list-item-trailing-icon-size);height:var(--mdc-list-list-item-trailing-icon-size)}.mdc-list-item--selected.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-selected-trailing-icon-color)}.mdc-list-item--disabled .mdc-list-item__start,.mdc-list-item--disabled .mdc-list-item__content,.mdc-list-item--disabled .mdc-list-item__end{opacity:1}.mdc-list-item--disabled .mdc-list-item__primary-text,.mdc-list-item--disabled .mdc-list-item__secondary-text,.mdc-list-item--disabled .mdc-list-item__overline-text{opacity:var(--mdc-list-list-item-disabled-label-text-opacity)}.mdc-list-item--disabled.mdc-list-item--with-leading-icon .mdc-list-item__start{color:var(--mdc-list-list-item-disabled-leading-icon-color)}.mdc-list-item--disabled.mdc-list-item--with-leading-icon .mdc-list-item__start{opacity:var(--mdc-list-list-item-disabled-leading-icon-opacity)}.mdc-list-item--disabled.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-disabled-trailing-icon-color)}.mdc-list-item--disabled.mdc-list-item--with-trailing-icon .mdc-list-item__end{opacity:var(--mdc-list-list-item-disabled-trailing-icon-opacity)}.mdc-list-item:hover .mdc-list-item__primary-text{color:var(--mdc-list-list-item-hover-label-text-color)}.mdc-list-item--with-leading-icon:hover .mdc-list-item__start{color:var(--mdc-list-list-item-hover-leading-icon-color)}.mdc-list-item--with-trailing-icon:hover .mdc-list-item__end{color:var(--mdc-list-list-item-hover-trailing-icon-color)}.mdc-list-item:focus .mdc-list-item__primary-text{color:var(--mdc-list-list-item-focus-label-text-color)}.mdc-list-item.mdc-list-item--disabled .mdc-list-item__primary-text{color:var(--mdc-list-list-item-disabled-label-text-color)}.mdc-list-item:hover::before{background-color:var(--mdc-list-list-item-hover-state-layer-color);opacity:var(--mdc-list-list-item-hover-state-layer-opacity)}.mdc-list-item.mdc-list-item--disabled::before{background-color:var(--mdc-list-list-item-disabled-state-layer-color);opacity:var(--mdc-list-list-item-disabled-state-layer-opacity)}.mdc-list-item:focus::before{background-color:var(--mdc-list-list-item-focus-state-layer-color);opacity:var(--mdc-list-list-item-focus-state-layer-opacity)}.mdc-list-item--disabled .mdc-radio,.mdc-list-item--disabled .mdc-checkbox{opacity:var(--mdc-list-list-item-disabled-label-text-opacity)}.mdc-list-item--with-leading-avatar .mat-mdc-list-item-avatar{border-radius:var(--mdc-list-list-item-leading-avatar-shape);background-color:var(--mdc-list-list-item-leading-avatar-color)}.mat-mdc-list-base{--mdc-list-list-item-container-shape:0;--mdc-list-list-item-leading-avatar-shape:50%;--mdc-list-list-item-container-color:transparent;--mdc-list-list-item-selected-container-color:transparent;--mdc-list-list-item-leading-avatar-color:transparent;--mdc-list-list-item-leading-icon-size:24px;--mdc-list-list-item-leading-avatar-size:40px;--mdc-list-list-item-trailing-icon-size:24px;--mdc-list-list-item-disabled-state-layer-color:transparent;--mdc-list-list-item-disabled-state-layer-opacity:0;--mdc-list-list-item-disabled-label-text-opacity:0.38;--mdc-list-list-item-disabled-leading-icon-opacity:0.38;--mdc-list-list-item-disabled-trailing-icon-opacity:0.38}.cdk-high-contrast-active a.mdc-list-item--activated::after{content:\"\";position:absolute;top:50%;right:16px;transform:translateY(-50%);width:10px;height:0;border-bottom:solid 10px;border-radius:10px}.cdk-high-contrast-active a.mdc-list-item--activated [dir=rtl]::after{right:auto;left:16px}.mat-mdc-list-base{display:block}.mat-mdc-list-base .mdc-list-item__start,.mat-mdc-list-base .mdc-list-item__end,.mat-mdc-list-base .mdc-list-item__content{pointer-events:auto}.mat-mdc-list-item,.mat-mdc-list-option{width:100%;box-sizing:border-box;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-list-item:not(.mat-mdc-list-item-interactive),.mat-mdc-list-option:not(.mat-mdc-list-item-interactive){cursor:default}.mat-mdc-list-item .mat-divider-inset,.mat-mdc-list-option .mat-divider-inset{position:absolute;left:0;right:0;bottom:0}.mat-mdc-list-item .mat-mdc-list-item-avatar~.mat-divider-inset,.mat-mdc-list-option .mat-mdc-list-item-avatar~.mat-divider-inset{margin-left:72px}[dir=rtl] .mat-mdc-list-item .mat-mdc-list-item-avatar~.mat-divider-inset,[dir=rtl] .mat-mdc-list-option .mat-mdc-list-item-avatar~.mat-divider-inset{margin-right:72px}.mat-mdc-list-item-interactive::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";opacity:0;pointer-events:none}.mat-mdc-list-item>.mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-mdc-list-item:focus>.mat-mdc-focus-indicator::before{content:\"\"}.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-line.mdc-list-item__secondary-text{white-space:nowrap;line-height:normal}.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-unscoped-content.mdc-list-item__secondary-text{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}mat-action-list button{background:none;color:inherit;border:none;font:inherit;outline:inherit;-webkit-tap-highlight-color:rgba(0,0,0,0);text-align:left}[dir=rtl] mat-action-list button{text-align:right}mat-action-list button::-moz-focus-inner{border:0}"]
    }]
  }], null, null);
})();
class MatListItem extends MatListItemBase {
  /** Indicates whether an item in a `<mat-nav-list>` is the currently active page. */
  get activated() {
    return this._activated;
  }
  set activated(activated) {
    this._activated = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__.coerceBooleanProperty)(activated);
  }
  constructor(element, ngZone, listBase, platform, globalRippleOptions, animationMode) {
    super(element, ngZone, listBase, platform, globalRippleOptions, animationMode);
    this._activated = false;
  }
  /**
   * Determine the value of `aria-current`. Return 'page' if this item is an activated anchor tag.
   * Otherwise, return `null`. This method is safe to use with server-side rendering.
   */
  _getAriaCurrent() {
    return this._hostElement.nodeName === 'A' && this._activated ? 'page' : null;
  }
}
MatListItem.ɵfac = function MatListItem_Factory(t) {
  return new (t || MatListItem)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](MatListBase, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_5__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_core__WEBPACK_IMPORTED_MODULE_3__.MAT_RIPPLE_GLOBAL_OPTIONS, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_MODULE_TYPE, 8));
};
MatListItem.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: MatListItem,
  selectors: [["mat-list-item"], ["a", "mat-list-item", ""], ["button", "mat-list-item", ""]],
  contentQueries: function MatListItem_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, MatListItemLine, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, MatListItemTitle, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, MatListItemMeta, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._lines = _t);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._titles = _t);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._meta = _t);
    }
  },
  viewQuery: function MatListItem_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c2, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c3, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._unscopedContent = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._itemText = _t.first);
    }
  },
  hostAttrs: [1, "mat-mdc-list-item", "mdc-list-item"],
  hostVars: 11,
  hostBindings: function MatListItem_HostBindings(rf, ctx) {
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("aria-current", ctx._getAriaCurrent());
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mdc-list-item--activated", ctx.activated)("mdc-list-item--with-leading-avatar", ctx._avatars.length !== 0)("mdc-list-item--with-leading-icon", ctx._icons.length !== 0)("mdc-list-item--with-trailing-meta", ctx._meta.length !== 0)("_mat-animation-noopable", ctx._noopAnimations);
    }
  },
  inputs: {
    activated: "activated"
  },
  exportAs: ["matListItem"],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]],
  ngContentSelectors: _c5,
  decls: 10,
  vars: 0,
  consts: [[1, "mdc-list-item__content"], [1, "mat-mdc-list-item-unscoped-content", 3, "cdkObserveContent"], ["unscopedContent", ""], [1, "mat-mdc-focus-indicator"]],
  template: function MatListItem_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"](_c4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](2, 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](3, 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "span", 1, 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("cdkObserveContent", function MatListItem_Template_span_cdkObserveContent_4_listener() {
        return ctx._updateItemLines(true);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](6, 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](7, 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](8, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "div", 3);
    }
  },
  dependencies: [_angular_cdk_observers__WEBPACK_IMPORTED_MODULE_6__.CdkObserveContent],
  encapsulation: 2,
  changeDetection: 0
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatListItem, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'mat-list-item, a[mat-list-item], button[mat-list-item]',
      exportAs: 'matListItem',
      host: {
        'class': 'mat-mdc-list-item mdc-list-item',
        '[class.mdc-list-item--activated]': 'activated',
        '[class.mdc-list-item--with-leading-avatar]': '_avatars.length !== 0',
        '[class.mdc-list-item--with-leading-icon]': '_icons.length !== 0',
        '[class.mdc-list-item--with-trailing-meta]': '_meta.length !== 0',
        '[class._mat-animation-noopable]': '_noopAnimations',
        '[attr.aria-current]': '_getAriaCurrent()'
      },
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush,
      template: "<ng-content select=\"[matListItemAvatar],[matListItemIcon]\"></ng-content>\n\n<span class=\"mdc-list-item__content\">\n  <ng-content select=\"[matListItemTitle]\"></ng-content>\n  <ng-content select=\"[matListItemLine]\"></ng-content>\n  <span #unscopedContent class=\"mat-mdc-list-item-unscoped-content\"\n        (cdkObserveContent)=\"_updateItemLines(true)\">\n    <ng-content></ng-content>\n  </span>\n</span>\n\n<ng-content select=\"[matListItemMeta]\"></ng-content>\n\n<ng-content select=\"mat-divider\"></ng-content>\n\n<!--\n  Strong focus indicator element. MDC uses the `::before` pseudo element for the default\n  focus/hover/selected state, so we need a separate element.\n-->\n<div class=\"mat-mdc-focus-indicator\"></div>\n"
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone
    }, {
      type: MatListBase,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }]
    }, {
      type: _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_5__.Platform
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [_angular_material_core__WEBPACK_IMPORTED_MODULE_3__.MAT_RIPPLE_GLOBAL_OPTIONS]
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [_angular_core__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_MODULE_TYPE]
      }]
    }];
  }, {
    _lines: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChildren,
      args: [MatListItemLine, {
        descendants: true
      }]
    }],
    _titles: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChildren,
      args: [MatListItemTitle, {
        descendants: true
      }]
    }],
    _meta: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChildren,
      args: [MatListItemMeta, {
        descendants: true
      }]
    }],
    _unscopedContent: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChild,
      args: ['unscopedContent']
    }],
    _itemText: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChild,
      args: ['text']
    }],
    activated: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }]
  });
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Injection token that can be used to reference instances of an `SelectionList`. It serves
 * as alternative token to an actual implementation which would result in circular references.
 * @docs-private
 */
const SELECTION_LIST = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('SelectionList');
class MatListOption extends MatListItemBase {
  /**
   * Whether the label should appear before or after the checkbox/radio. Defaults to 'after'
   *
   * @deprecated Use `togglePosition` instead.
   * @breaking-change 17.0.0
   */
  get checkboxPosition() {
    return this.togglePosition;
  }
  set checkboxPosition(value) {
    this.togglePosition = value;
  }
  /** Theme color of the list option. This sets the color of the checkbox/radio. */
  get color() {
    return this._color || this._selectionList.color;
  }
  set color(newValue) {
    this._color = newValue;
  }
  /** Value of the option */
  get value() {
    return this._value;
  }
  set value(newValue) {
    if (this.selected && newValue !== this.value && this._inputsInitialized) {
      this.selected = false;
    }
    this._value = newValue;
  }
  /** Whether the option is selected. */
  get selected() {
    return this._selectionList.selectedOptions.isSelected(this);
  }
  set selected(value) {
    const isSelected = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__.coerceBooleanProperty)(value);
    if (isSelected !== this._selected) {
      this._setSelected(isSelected);
      if (isSelected || this._selectionList.multiple) {
        this._selectionList._reportValueChange();
      }
    }
  }
  constructor(elementRef, ngZone, _selectionList, platform, _changeDetectorRef, globalRippleOptions, animationMode) {
    super(elementRef, ngZone, _selectionList, platform, globalRippleOptions, animationMode);
    this._selectionList = _selectionList;
    this._changeDetectorRef = _changeDetectorRef;
    /**
     * Emits when the selected state of the option has changed.
     * Use to facilitate two-data binding to the `selected` property.
     * @docs-private
     */
    this.selectedChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    /** Whether the label should appear before or after the checkbox/radio. Defaults to 'after' */
    this.togglePosition = 'after';
    this._selected = false;
    /**
     * This is set to true after the first OnChanges cycle so we don't
     * clear the value of `selected` in the first cycle.
     */
    this._inputsInitialized = false;
  }
  ngOnInit() {
    const list = this._selectionList;
    if (list._value && list._value.some(value => list.compareWith(this._value, value))) {
      this._setSelected(true);
    }
    const wasSelected = this._selected;
    // List options that are selected at initialization can't be reported properly to the form
    // control. This is because it takes some time until the selection-list knows about all
    // available options. Also it can happen that the ControlValueAccessor has an initial value
    // that should be used instead. Deferring the value change report to the next tick ensures
    // that the form control value is not being overwritten.
    Promise.resolve().then(() => {
      if (this._selected || wasSelected) {
        this.selected = true;
        this._changeDetectorRef.markForCheck();
      }
    });
    this._inputsInitialized = true;
  }
  ngOnDestroy() {
    super.ngOnDestroy();
    if (this.selected) {
      // We have to delay this until the next tick in order
      // to avoid changed after checked errors.
      Promise.resolve().then(() => {
        this.selected = false;
      });
    }
  }
  /** Toggles the selection state of the option. */
  toggle() {
    this.selected = !this.selected;
  }
  /** Allows for programmatic focusing of the option. */
  focus() {
    this._hostElement.focus();
  }
  /** Gets the text label of the list option. Used for the typeahead functionality in the list. */
  getLabel() {
    const titleElement = this._titles?.get(0)?._elementRef.nativeElement;
    // If there is no explicit title element, the unscoped text content
    // is treated as the list item title.
    const labelEl = titleElement || this._unscopedContent?.nativeElement;
    return labelEl?.textContent || '';
  }
  /** Whether a checkbox is shown at the given position. */
  _hasCheckboxAt(position) {
    return this._selectionList.multiple && this._getTogglePosition() === position;
  }
  /** Where a radio indicator is shown at the given position. */
  _hasRadioAt(position) {
    return !this._selectionList.multiple && this._getTogglePosition() === position && !this._selectionList.hideSingleSelectionIndicator;
  }
  /** Whether icons or avatars are shown at the given position. */
  _hasIconsOrAvatarsAt(position) {
    return this._hasProjected('icons', position) || this._hasProjected('avatars', position);
  }
  /** Gets whether the given type of element is projected at the specified position. */
  _hasProjected(type, position) {
    // If the checkbox/radio is shown at the specified position, neither icons or
    // avatars can be shown at the position.
    return this._getTogglePosition() !== position && (type === 'avatars' ? this._avatars.length !== 0 : this._icons.length !== 0);
  }
  _handleBlur() {
    this._selectionList._onTouched();
  }
  /** Gets the current position of the checkbox/radio. */
  _getTogglePosition() {
    return this.togglePosition || 'after';
  }
  /**
   * Sets the selected state of the option.
   * @returns Whether the value has changed.
   */
  _setSelected(selected) {
    if (selected === this._selected) {
      return false;
    }
    this._selected = selected;
    if (selected) {
      this._selectionList.selectedOptions.select(this);
    } else {
      this._selectionList.selectedOptions.deselect(this);
    }
    this.selectedChange.emit(selected);
    this._changeDetectorRef.markForCheck();
    return true;
  }
  /**
   * Notifies Angular that the option needs to be checked in the next change detection run.
   * Mainly used to trigger an update of the list option if the disabled state of the selection
   * list changed.
   */
  _markForCheck() {
    this._changeDetectorRef.markForCheck();
  }
  /** Toggles the option's value based on a user interaction. */
  _toggleOnInteraction() {
    if (!this.disabled) {
      if (this._selectionList.multiple) {
        this.selected = !this.selected;
        this._selectionList._emitChangeEvent([this]);
      } else if (!this.selected) {
        this.selected = true;
        this._selectionList._emitChangeEvent([this]);
      }
    }
  }
  /** Sets the tabindex of the list option. */
  _setTabindex(value) {
    this._hostElement.setAttribute('tabindex', value + '');
  }
}
MatListOption.ɵfac = function MatListOption_Factory(t) {
  return new (t || MatListOption)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](SELECTION_LIST), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_5__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_core__WEBPACK_IMPORTED_MODULE_3__.MAT_RIPPLE_GLOBAL_OPTIONS, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_MODULE_TYPE, 8));
};
MatListOption.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: MatListOption,
  selectors: [["mat-list-option"]],
  contentQueries: function MatListOption_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, MatListItemLine, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, MatListItemTitle, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._lines = _t);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._titles = _t);
    }
  },
  viewQuery: function MatListOption_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c2, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._unscopedContent = _t.first);
    }
  },
  hostAttrs: ["role", "option", 1, "mat-mdc-list-item", "mat-mdc-list-option", "mdc-list-item"],
  hostVars: 25,
  hostBindings: function MatListOption_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("blur", function MatListOption_blur_HostBindingHandler() {
        return ctx._handleBlur();
      })("click", function MatListOption_click_HostBindingHandler() {
        return ctx._toggleOnInteraction();
      });
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("aria-selected", ctx.selected);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mdc-list-item--selected", ctx.selected && !ctx._selectionList.multiple && ctx._selectionList.hideSingleSelectionIndicator)("mdc-list-item--with-leading-avatar", ctx._hasProjected("avatars", "before"))("mdc-list-item--with-leading-icon", ctx._hasProjected("icons", "before"))("mdc-list-item--with-trailing-icon", ctx._hasProjected("icons", "after"))("mat-mdc-list-option-with-trailing-avatar", ctx._hasProjected("avatars", "after"))("mdc-list-item--with-leading-checkbox", ctx._hasCheckboxAt("before"))("mdc-list-item--with-trailing-checkbox", ctx._hasCheckboxAt("after"))("mdc-list-item--with-leading-radio", ctx._hasRadioAt("before"))("mdc-list-item--with-trailing-radio", ctx._hasRadioAt("after"))("mat-accent", ctx.color !== "primary" && ctx.color !== "warn")("mat-warn", ctx.color === "warn")("_mat-animation-noopable", ctx._noopAnimations);
    }
  },
  inputs: {
    togglePosition: "togglePosition",
    checkboxPosition: "checkboxPosition",
    color: "color",
    value: "value",
    selected: "selected"
  },
  outputs: {
    selectedChange: "selectedChange"
  },
  exportAs: ["matListOption"],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([{
    provide: MatListItemBase,
    useExisting: MatListOption
  }, {
    provide: LIST_OPTION,
    useExisting: MatListOption
  }]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]],
  ngContentSelectors: _c7,
  decls: 20,
  vars: 6,
  consts: [["icons", ""], ["checkbox", ""], ["radio", ""], ["class", "mdc-list-item__start mat-mdc-list-option-checkbox-before", 4, "ngIf"], ["class", "mdc-list-item__start mat-mdc-list-option-radio-before", 4, "ngIf"], [3, "ngIf"], [1, "mdc-list-item__content"], [1, "mat-mdc-list-item-unscoped-content", 3, "cdkObserveContent"], ["unscopedContent", ""], ["class", "mdc-list-item__end", 4, "ngIf"], [1, "mat-mdc-focus-indicator"], [1, "mdc-checkbox"], ["type", "checkbox", 1, "mdc-checkbox__native-control", 3, "checked", "disabled"], [1, "mdc-checkbox__background"], ["viewBox", "0 0 24 24", "aria-hidden", "true", 1, "mdc-checkbox__checkmark"], ["fill", "none", "d", "M1.73,12.91 8.1,19.28 22.79,4.59", 1, "mdc-checkbox__checkmark-path"], [1, "mdc-checkbox__mixedmark"], [1, "mdc-radio"], ["type", "radio", 1, "mdc-radio__native-control", 3, "checked", "disabled"], [1, "mdc-radio__background"], [1, "mdc-radio__outer-circle"], [1, "mdc-radio__inner-circle"], [1, "mdc-list-item__start", "mat-mdc-list-option-checkbox-before"], [3, "ngTemplateOutlet"], [1, "mdc-list-item__start", "mat-mdc-list-option-radio-before"], [1, "mdc-list-item__end"]],
  template: function MatListOption_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"](_c6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, MatListOption_ng_template_0_Template, 1, 0, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, MatListOption_ng_template_2_Template, 6, 4, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, MatListOption_ng_template_4_Template, 5, 4, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, MatListOption_span_6_Template, 2, 1, "span", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, MatListOption_span_7_Template, 2, 1, "span", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, MatListOption_ng_template_8_Template, 1, 1, "ng-template", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "span", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](11, 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "span", 7, 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("cdkObserveContent", function MatListOption_Template_span_cdkObserveContent_12_listener() {
        return ctx._updateItemLines(true);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](14, 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](15, MatListOption_span_15_Template, 2, 1, "span", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](16, MatListOption_span_16_Template, 2, 1, "span", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](17, MatListOption_ng_template_17_Template, 1, 1, "ng-template", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](18, 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "div", 10);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._hasCheckboxAt("before"));
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._hasRadioAt("before"));
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._hasIconsOrAvatarsAt("before"));
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._hasCheckboxAt("after"));
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._hasRadioAt("after"));
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._hasIconsOrAvatarsAt("after"));
    }
  },
  dependencies: [_angular_cdk_observers__WEBPACK_IMPORTED_MODULE_6__.CdkObserveContent, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgTemplateOutlet],
  styles: [".mat-mdc-list-option-with-trailing-avatar.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mat-mdc-list-option-with-trailing-avatar.mdc-list-item,.mat-mdc-list-option-with-trailing-avatar.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mat-mdc-list-option-with-trailing-avatar .mdc-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mat-mdc-list-option-with-trailing-avatar .mdc-list-item__end,.mat-mdc-list-option-with-trailing-avatar .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mat-mdc-list-option-with-trailing-avatar .mdc-list-item__end{width:40px;height:40px}.mat-mdc-list-option-with-trailing-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mat-mdc-list-option-with-trailing-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mat-mdc-list-option-with-trailing-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mat-mdc-list-option-with-trailing-avatar .mdc-list-item__end{border-radius:50%}.mat-mdc-list-option .mdc-touch-target-wrapper{display:inline}.mat-mdc-list-option .mdc-checkbox{display:inline-block;position:relative;flex:0 0 18px;box-sizing:content-box;width:18px;height:18px;line-height:0;white-space:nowrap;cursor:pointer;vertical-align:bottom}.mat-mdc-list-option .mdc-checkbox[hidden]{display:none}.mat-mdc-list-option .mdc-checkbox.mdc-ripple-upgraded--background-focused .mdc-checkbox__focus-ring,.mat-mdc-list-option .mdc-checkbox:not(.mdc-ripple-upgraded):focus .mdc-checkbox__focus-ring{pointer-events:none;border:2px solid rgba(0,0,0,0);border-radius:6px;box-sizing:content-box;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:100%;width:100%}@media screen and (forced-colors: active){.mat-mdc-list-option .mdc-checkbox.mdc-ripple-upgraded--background-focused .mdc-checkbox__focus-ring,.mat-mdc-list-option .mdc-checkbox:not(.mdc-ripple-upgraded):focus .mdc-checkbox__focus-ring{border-color:CanvasText}}.mat-mdc-list-option .mdc-checkbox.mdc-ripple-upgraded--background-focused .mdc-checkbox__focus-ring::after,.mat-mdc-list-option .mdc-checkbox:not(.mdc-ripple-upgraded):focus .mdc-checkbox__focus-ring::after{content:\"\";border:2px solid rgba(0,0,0,0);border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mat-mdc-list-option .mdc-checkbox.mdc-ripple-upgraded--background-focused .mdc-checkbox__focus-ring::after,.mat-mdc-list-option .mdc-checkbox:not(.mdc-ripple-upgraded):focus .mdc-checkbox__focus-ring::after{border-color:CanvasText}}@media all and (-ms-high-contrast: none){.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__focus-ring{display:none}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mat-mdc-list-option .mdc-checkbox__mixedmark{margin:0 1px}}.mat-mdc-list-option .mdc-checkbox--disabled{cursor:default;pointer-events:none}.mat-mdc-list-option .mdc-checkbox__background{display:inline-flex;position:absolute;align-items:center;justify-content:center;box-sizing:border-box;width:18px;height:18px;border:2px solid currentColor;border-radius:2px;background-color:rgba(0,0,0,0);pointer-events:none;will-change:background-color,border-color}.mat-mdc-list-option .mdc-checkbox__checkmark{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;opacity:0}.mdc-checkbox--upgraded .mat-mdc-list-option .mdc-checkbox__checkmark{opacity:1}.mat-mdc-list-option .mdc-checkbox__checkmark-path{stroke:currentColor;stroke-width:3.12px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mat-mdc-list-option .mdc-checkbox__mixedmark{width:100%;height:0;transform:scaleX(0) rotate(0deg);border-width:1px;border-style:solid;opacity:0}.mat-mdc-list-option .mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark-path,.mat-mdc-list-option .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark-path,.mat-mdc-list-option .mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__checkmark-path{stroke-dashoffset:0}.mat-mdc-list-option .mdc-checkbox__native-control{position:absolute;margin:0;padding:0;opacity:0;cursor:inherit}.mat-mdc-list-option .mdc-checkbox__native-control:disabled{cursor:default;pointer-events:none}.mat-mdc-list-option .mdc-checkbox--touch{margin:calc((var(--mdc-checkbox-state-layer-size, 48px) - var(--mdc-checkbox-state-layer-size, 40px)) / 2)}.mat-mdc-list-option .mdc-checkbox--touch .mdc-checkbox__native-control{top:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 48px)) / 2);right:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 48px)) / 2);left:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 48px)) / 2);width:var(--mdc-checkbox-state-layer-size, 48px);height:var(--mdc-checkbox-state-layer-size, 48px)}.mat-mdc-list-option .mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark{opacity:1}.mat-mdc-list-option .mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__mixedmark{transform:scaleX(1) rotate(-45deg)}.mat-mdc-list-option .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark,.mat-mdc-list-option .mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__checkmark{transform:rotate(45deg);opacity:0}.mat-mdc-list-option .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__mixedmark,.mat-mdc-list-option .mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__mixedmark{transform:scaleX(1) rotate(0deg);opacity:1}.mat-mdc-list-option .mdc-radio{display:inline-block;position:relative;flex:0 0 auto;box-sizing:content-box;width:20px;height:20px;cursor:pointer;will-change:opacity,transform,border-color,color}.mat-mdc-list-option .mdc-radio[hidden]{display:none}.mat-mdc-list-option .mdc-radio__background{display:inline-block;position:relative;box-sizing:border-box;width:20px;height:20px}.mat-mdc-list-option .mdc-radio__background::before{position:absolute;transform:scale(0, 0);border-radius:50%;opacity:0;pointer-events:none;content:\"\"}.mat-mdc-list-option .mdc-radio__outer-circle{position:absolute;top:0;left:0;box-sizing:border-box;width:100%;height:100%;border-width:2px;border-style:solid;border-radius:50%}.mat-mdc-list-option .mdc-radio__inner-circle{position:absolute;top:0;left:0;box-sizing:border-box;width:100%;height:100%;transform:scale(0, 0);border-width:10px;border-style:solid;border-radius:50%}.mat-mdc-list-option .mdc-radio__native-control{position:absolute;margin:0;padding:0;opacity:0;cursor:inherit;z-index:1}.mat-mdc-list-option .mdc-radio--touch{margin-top:4px;margin-bottom:4px;margin-right:4px;margin-left:4px}.mat-mdc-list-option .mdc-radio--touch .mdc-radio__native-control{top:calc((40px - 48px) / 2);right:calc((40px - 48px) / 2);left:calc((40px - 48px) / 2);width:48px;height:48px}.mat-mdc-list-option .mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__focus-ring,.mat-mdc-list-option .mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__focus-ring{pointer-events:none;border:2px solid rgba(0,0,0,0);border-radius:6px;box-sizing:content-box;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:100%;width:100%}@media screen and (forced-colors: active){.mat-mdc-list-option .mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__focus-ring,.mat-mdc-list-option .mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__focus-ring{border-color:CanvasText}}.mat-mdc-list-option .mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__focus-ring::after,.mat-mdc-list-option .mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__focus-ring::after{content:\"\";border:2px solid rgba(0,0,0,0);border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mat-mdc-list-option .mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__focus-ring::after,.mat-mdc-list-option .mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__focus-ring::after{border-color:CanvasText}}.mat-mdc-list-option .mdc-radio--disabled{cursor:default;pointer-events:none}.mat-mdc-list-option .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__inner-circle{transform:scale(0.5)}.mat-mdc-list-option .mdc-radio__native-control:disabled+.mdc-radio__background,.mat-mdc-list-option [aria-disabled=true] .mdc-radio__native-control+.mdc-radio__background{cursor:default}.mat-mdc-list-option .mdc-radio__native-control:focus+.mdc-radio__background::before{transform:scale(1);opacity:.12}@keyframes mdc-checkbox-unchecked-checked-checkmark-path{0%,50%{stroke-dashoffset:29.7833385}50%{animation-timing-function:cubic-bezier(0, 0, 0.2, 1)}100%{stroke-dashoffset:0}}@keyframes mdc-checkbox-unchecked-indeterminate-mixedmark{0%,68.2%{transform:scaleX(0)}68.2%{animation-timing-function:cubic-bezier(0, 0, 0, 1)}100%{transform:scaleX(1)}}@keyframes mdc-checkbox-checked-unchecked-checkmark-path{from{animation-timing-function:cubic-bezier(0.4, 0, 1, 1);opacity:1;stroke-dashoffset:0}to{opacity:0;stroke-dashoffset:-29.7833385}}@keyframes mdc-checkbox-checked-indeterminate-checkmark{from{animation-timing-function:cubic-bezier(0, 0, 0.2, 1);transform:rotate(0deg);opacity:1}to{transform:rotate(45deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-checked-checkmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);transform:rotate(45deg);opacity:0}to{transform:rotate(360deg);opacity:1}}@keyframes mdc-checkbox-checked-indeterminate-mixedmark{from{animation-timing-function:mdc-animation-deceleration-curve-timing-function;transform:rotate(-45deg);opacity:0}to{transform:rotate(0deg);opacity:1}}@keyframes mdc-checkbox-indeterminate-checked-mixedmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);transform:rotate(0deg);opacity:1}to{transform:rotate(315deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-unchecked-mixedmark{0%{animation-timing-function:linear;transform:scaleX(1);opacity:1}32.8%,100%{transform:scaleX(0);opacity:0}}@media all and (-ms-high-contrast: none){.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox .mdc-checkbox__focus-ring{display:none}}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__background{transition:background-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),border-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__checkmark{transition:opacity 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__checkmark-path{transition:stroke-dashoffset 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__mixedmark{transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-unchecked-checked .mdc-checkbox__background,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__background,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-checked-unchecked .mdc-checkbox__background,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__background{animation-duration:180ms;animation-timing-function:linear}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-unchecked-checked .mdc-checkbox__checkmark-path{animation:mdc-checkbox-unchecked-checked-checkmark-path 180ms linear 0s;transition:none}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__mixedmark{animation:mdc-checkbox-unchecked-indeterminate-mixedmark 90ms linear 0s;transition:none}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-checked-unchecked .mdc-checkbox__checkmark-path{animation:mdc-checkbox-checked-unchecked-checkmark-path 90ms linear 0s;transition:none}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__checkmark{animation:mdc-checkbox-checked-indeterminate-checkmark 90ms linear 0s;transition:none}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__mixedmark{animation:mdc-checkbox-checked-indeterminate-mixedmark 90ms linear 0s;transition:none}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__checkmark{animation:mdc-checkbox-indeterminate-checked-checkmark 500ms linear 0s;transition:none}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__mixedmark{animation:mdc-checkbox-indeterminate-checked-mixedmark 500ms linear 0s;transition:none}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__mixedmark{animation:mdc-checkbox-indeterminate-unchecked-mixedmark 300ms linear 0s;transition:none}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__native-control:checked~.mdc-checkbox__background,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background{transition:border-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1),background-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark{transition:opacity 180ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 180ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__checkmark{transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__background,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__checkmark,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__checkmark-path,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__mixedmark{transition:none}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-radio__background::before{transition:opacity 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-radio__outer-circle{transition:border-color 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-radio__inner-circle{transition:transform 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1),border-color 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-radio__native-control:checked+.mdc-radio__background,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-radio__native-control:disabled+.mdc-radio__background{transition:opacity 120ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__outer-circle{transition:border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__inner-circle,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__inner-circle{transition:transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1),border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__inner-circle{transition:transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1),border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-radio__native-control:focus+.mdc-radio__background::before{transition:opacity 120ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-list-option .mdc-checkbox{padding:calc((40px - 18px) / 2);padding:calc((var(--mdc-checkbox-state-layer-size, 40px) - 18px) / 2);margin:calc((40px - 40px) / 2);margin:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 40px)) / 2)}.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control[disabled]:not(:checked):not(:indeterminate):not([data-indeterminate=true])~.mdc-checkbox__background{border-color:rgba(0, 0, 0, 0.38);border-color:var(--mdc-checkbox-disabled-unselected-icon-color, rgba(0, 0, 0, 0.38));background-color:transparent}.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control[disabled]:checked~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control[disabled]:indeterminate~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control[data-indeterminate=true][disabled]~.mdc-checkbox__background{border-color:transparent;background-color:rgba(0, 0, 0, 0.38);background-color:var(--mdc-checkbox-disabled-selected-icon-color, rgba(0, 0, 0, 0.38))}.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control:enabled~.mdc-checkbox__background .mdc-checkbox__checkmark{color:#fff;color:var(--mdc-checkbox-selected-checkmark-color, #fff)}.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control:enabled~.mdc-checkbox__background .mdc-checkbox__mixedmark{border-color:#fff;border-color:var(--mdc-checkbox-selected-checkmark-color, #fff)}.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control:disabled~.mdc-checkbox__background .mdc-checkbox__checkmark{color:#fff;color:var(--mdc-checkbox-disabled-selected-checkmark-color, #fff)}.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control:disabled~.mdc-checkbox__background .mdc-checkbox__mixedmark{border-color:#fff;border-color:var(--mdc-checkbox-disabled-selected-checkmark-color, #fff)}.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control:enabled:not(:checked):not(:indeterminate):not([data-indeterminate=true])~.mdc-checkbox__background{border-color:rgba(0, 0, 0, 0.54);border-color:var(--mdc-checkbox-unselected-icon-color, rgba(0, 0, 0, 0.54));background-color:transparent}.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control:enabled:checked~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control:enabled:indeterminate~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control[data-indeterminate=true]:enabled~.mdc-checkbox__background{border-color:#018786;border-color:var(--mdc-checkbox-selected-icon-color, var(--mdc-theme-secondary, #018786));background-color:#018786;background-color:var(--mdc-checkbox-selected-icon-color, var(--mdc-theme-secondary, #018786))}@keyframes mdc-checkbox-fade-in-background-8A000000FF01878600000000FF018786{0%{border-color:rgba(0, 0, 0, 0.54);border-color:var(--mdc-checkbox-unselected-icon-color, rgba(0, 0, 0, 0.54));background-color:transparent}50%{border-color:#018786;border-color:var(--mdc-checkbox-selected-icon-color, var(--mdc-theme-secondary, #018786));background-color:#018786;background-color:var(--mdc-checkbox-selected-icon-color, var(--mdc-theme-secondary, #018786))}}@keyframes mdc-checkbox-fade-out-background-8A000000FF01878600000000FF018786{0%,80%{border-color:#018786;border-color:var(--mdc-checkbox-selected-icon-color, var(--mdc-theme-secondary, #018786));background-color:#018786;background-color:var(--mdc-checkbox-selected-icon-color, var(--mdc-theme-secondary, #018786))}100%{border-color:rgba(0, 0, 0, 0.54);border-color:var(--mdc-checkbox-unselected-icon-color, rgba(0, 0, 0, 0.54));background-color:transparent}}.mat-mdc-list-option .mdc-checkbox.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-in-background-8A000000FF01878600000000FF018786}.mat-mdc-list-option .mdc-checkbox.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-out-background-8A000000FF01878600000000FF018786}.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__background{top:calc((40px - 18px) / 2);top:calc((var(--mdc-checkbox-state-layer-size, 40px) - 18px) / 2);left:calc((40px - 18px) / 2);left:calc((var(--mdc-checkbox-state-layer-size, 40px) - 18px) / 2)}.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control{top:calc((40px - 40px) / 2);top:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 40px)) / 2);right:calc((40px - 40px) / 2);right:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 40px)) / 2);left:calc((40px - 40px) / 2);left:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 40px)) / 2);width:40px;width:var(--mdc-checkbox-state-layer-size, 40px);height:40px;height:var(--mdc-checkbox-state-layer-size, 40px)}.mat-mdc-list-option .mdc-radio{padding:calc((40px - 20px) / 2);padding:calc((var(--mdc-radio-state-layer-size, 40px) - 20px) / 2)}.mat-mdc-list-option .mdc-radio [aria-disabled=true] .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-list-option .mdc-radio .mdc-radio__native-control:disabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:#000;border-color:var(--mdc-radio-disabled-selected-icon-color, #000)}.mat-mdc-list-option .mdc-radio [aria-disabled=true] .mdc-radio__native-control+.mdc-radio__background .mdc-radio__inner-circle,.mat-mdc-list-option .mdc-radio .mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:#000;border-color:var(--mdc-radio-disabled-selected-icon-color, #000)}.mat-mdc-list-option .mdc-radio [aria-disabled=true] .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-list-option .mdc-radio .mdc-radio__native-control:disabled:checked+.mdc-radio__background .mdc-radio__outer-circle{opacity:0.38;opacity:var(--mdc-radio-disabled-selected-icon-opacity, 0.38)}.mat-mdc-list-option .mdc-radio [aria-disabled=true] .mdc-radio__native-control+.mdc-radio__background .mdc-radio__inner-circle,.mat-mdc-list-option .mdc-radio .mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__inner-circle{opacity:0.38;opacity:var(--mdc-radio-disabled-selected-icon-opacity, 0.38)}.mat-mdc-list-option .mdc-radio [aria-disabled=true] .mdc-radio__native-control:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-list-option .mdc-radio .mdc-radio__native-control:disabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:#000;border-color:var(--mdc-radio-disabled-unselected-icon-color, #000)}.mat-mdc-list-option .mdc-radio [aria-disabled=true] .mdc-radio__native-control:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-list-option .mdc-radio .mdc-radio__native-control:disabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{opacity:0.38;opacity:var(--mdc-radio-disabled-unselected-icon-opacity, 0.38)}.mat-mdc-list-option .mdc-radio .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:#6200ee;border-color:var(--mdc-radio-selected-icon-color, #6200ee)}.mat-mdc-list-option .mdc-radio .mdc-radio__native-control:enabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:#6200ee;border-color:var(--mdc-radio-selected-icon-color, #6200ee)}.mat-mdc-list-option .mdc-radio .mdc-radio__native-control:enabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:#000;border-color:var(--mdc-radio-unselected-icon-color, #000)}.mat-mdc-list-option .mdc-radio .mdc-radio__background::before{top:calc(-1 * (40px - 20px) / 2);top:calc(-1 * (var(--mdc-radio-state-layer-size, 40px) - 20px) / 2);left:calc(-1 * (40px - 20px) / 2);left:calc(-1 * (var(--mdc-radio-state-layer-size, 40px) - 20px) / 2);width:40px;width:var(--mdc-radio-state-layer-size, 40px);height:40px;height:var(--mdc-radio-state-layer-size, 40px)}.mat-mdc-list-option .mdc-radio .mdc-radio__native-control{top:calc((40px - 40px) / 2);top:calc((var(--mdc-radio-state-layer-size, 40px) - var(--mdc-radio-state-layer-size, 40px)) / 2);right:calc((40px - 40px) / 2);right:calc((var(--mdc-radio-state-layer-size, 40px) - var(--mdc-radio-state-layer-size, 40px)) / 2);left:calc((40px - 40px) / 2);left:calc((var(--mdc-radio-state-layer-size, 40px) - var(--mdc-radio-state-layer-size, 40px)) / 2);width:40px;width:var(--mdc-radio-state-layer-size, 40px);height:40px;height:var(--mdc-radio-state-layer-size, 40px)}.mat-mdc-list-option .mdc-checkbox__native-control,.mat-mdc-list-option .mdc-radio__native-control{display:none}.cdk-high-contrast-active .mat-mdc-list-option.mdc-list-item--selected::after{content:\"\";position:absolute;top:50%;right:16px;transform:translateY(-50%);width:10px;height:0;border-bottom:solid 10px;border-radius:10px}.cdk-high-contrast-active .mat-mdc-list-option.mdc-list-item--selected [dir=rtl]::after{right:auto;left:16px}"],
  encapsulation: 2,
  changeDetection: 0
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatListOption, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'mat-list-option',
      exportAs: 'matListOption',
      host: {
        'class': 'mat-mdc-list-item mat-mdc-list-option mdc-list-item',
        'role': 'option',
        // As per MDC, only list items without checkbox or radio indicator should receive the
        // `--selected` class.
        '[class.mdc-list-item--selected]': 'selected && !_selectionList.multiple && _selectionList.hideSingleSelectionIndicator',
        // Based on the checkbox/radio position and whether there are icons or avatars, we apply MDC's
        // list-item `--leading` and `--trailing` classes.
        '[class.mdc-list-item--with-leading-avatar]': '_hasProjected("avatars", "before")',
        '[class.mdc-list-item--with-leading-icon]': '_hasProjected("icons", "before")',
        '[class.mdc-list-item--with-trailing-icon]': '_hasProjected("icons", "after")',
        '[class.mat-mdc-list-option-with-trailing-avatar]': '_hasProjected("avatars", "after")',
        // Based on the checkbox/radio position, we apply the `--leading` or `--trailing` MDC classes
        // which ensure that the checkbox/radio is positioned correctly within the list item.
        '[class.mdc-list-item--with-leading-checkbox]': '_hasCheckboxAt("before")',
        '[class.mdc-list-item--with-trailing-checkbox]': '_hasCheckboxAt("after")',
        '[class.mdc-list-item--with-leading-radio]': '_hasRadioAt("before")',
        '[class.mdc-list-item--with-trailing-radio]': '_hasRadioAt("after")',
        '[class.mat-accent]': 'color !== "primary" && color !== "warn"',
        '[class.mat-warn]': 'color === "warn"',
        '[class._mat-animation-noopable]': '_noopAnimations',
        '[attr.aria-selected]': 'selected',
        '(blur)': '_handleBlur()',
        '(click)': '_toggleOnInteraction()'
      },
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush,
      providers: [{
        provide: MatListItemBase,
        useExisting: MatListOption
      }, {
        provide: LIST_OPTION,
        useExisting: MatListOption
      }],
      template: "<!--\n  Save icons and the pseudo checkbox/radio so that they can be re-used in the template without\n  duplication. Also content can only be injected once so we need to extract icons/avatars\n  into a template since we use it in multiple places.\n-->\n<ng-template #icons>\n  <ng-content select=\"[matListItemAvatar],[matListItemIcon]\">\n  </ng-content>\n</ng-template>\n\n<ng-template #checkbox>\n  <div class=\"mdc-checkbox\" [class.mdc-checkbox--disabled]=\"disabled\">\n    <input type=\"checkbox\" class=\"mdc-checkbox__native-control\"\n           [checked]=\"selected\" [disabled]=\"disabled\"/>\n    <div class=\"mdc-checkbox__background\">\n      <svg class=\"mdc-checkbox__checkmark\"\n           viewBox=\"0 0 24 24\"\n           aria-hidden=\"true\">\n        <path class=\"mdc-checkbox__checkmark-path\"\n              fill=\"none\"\n              d=\"M1.73,12.91 8.1,19.28 22.79,4.59\"/>\n      </svg>\n      <div class=\"mdc-checkbox__mixedmark\"></div>\n    </div>\n  </div>\n</ng-template>\n\n<ng-template #radio>\n  <div class=\"mdc-radio\" [class.mdc-radio--disabled]=\"disabled\">\n    <input type=\"radio\" class=\"mdc-radio__native-control\"\n           [checked]=\"selected\" [disabled]=\"disabled\"/>\n    <div class=\"mdc-radio__background\">\n      <div class=\"mdc-radio__outer-circle\"></div>\n      <div class=\"mdc-radio__inner-circle\"></div>\n    </div>\n  </div>\n</ng-template>\n\n<!-- Container for the checkbox at start. -->\n<span class=\"mdc-list-item__start mat-mdc-list-option-checkbox-before\"\n      *ngIf=\"_hasCheckboxAt('before')\">\n  <ng-template [ngTemplateOutlet]=\"checkbox\"></ng-template>\n</span>\n<!-- Container for the radio at the start. -->\n<span class=\"mdc-list-item__start mat-mdc-list-option-radio-before\"\n      *ngIf=\"_hasRadioAt('before')\">\n  <ng-template [ngTemplateOutlet]=\"radio\"></ng-template>\n</span>\n<!-- Conditionally renders icons/avatars before the list item text. -->\n<ng-template [ngIf]=\"_hasIconsOrAvatarsAt('before')\">\n  <ng-template [ngTemplateOutlet]=\"icons\"></ng-template>\n</ng-template>\n\n<!-- Text -->\n<span class=\"mdc-list-item__content\">\n  <ng-content select=\"[matListItemTitle]\"></ng-content>\n  <ng-content select=\"[matListItemLine]\"></ng-content>\n  <span #unscopedContent class=\"mat-mdc-list-item-unscoped-content\"\n        (cdkObserveContent)=\"_updateItemLines(true)\">\n    <ng-content></ng-content>\n  </span>\n</span>\n\n<!-- Container for the checkbox at the end. -->\n<span class=\"mdc-list-item__end\" *ngIf=\"_hasCheckboxAt('after')\">\n  <ng-template [ngTemplateOutlet]=\"checkbox\"></ng-template>\n</span>\n<!-- Container for the radio at the end. -->\n<span class=\"mdc-list-item__end\" *ngIf=\"_hasRadioAt('after')\">\n  <ng-template [ngTemplateOutlet]=\"radio\"></ng-template>\n</span>\n<!-- Conditionally renders icons/avatars after the list item text. -->\n<ng-template [ngIf]=\"_hasIconsOrAvatarsAt('after')\">\n  <ng-template [ngTemplateOutlet]=\"icons\"></ng-template>\n</ng-template>\n\n<!-- Divider -->\n<ng-content select=\"mat-divider\"></ng-content>\n\n<!--\n  Strong focus indicator element. MDC uses the `::before` pseudo element for the default\n  focus/hover/selected state, so we need a separate element.\n-->\n<div class=\"mat-mdc-focus-indicator\"></div>\n",
      styles: [".mat-mdc-list-option-with-trailing-avatar.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mat-mdc-list-option-with-trailing-avatar.mdc-list-item,.mat-mdc-list-option-with-trailing-avatar.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mat-mdc-list-option-with-trailing-avatar .mdc-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mat-mdc-list-option-with-trailing-avatar .mdc-list-item__end,.mat-mdc-list-option-with-trailing-avatar .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mat-mdc-list-option-with-trailing-avatar .mdc-list-item__end{width:40px;height:40px}.mat-mdc-list-option-with-trailing-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mat-mdc-list-option-with-trailing-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mat-mdc-list-option-with-trailing-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mat-mdc-list-option-with-trailing-avatar .mdc-list-item__end{border-radius:50%}.mat-mdc-list-option .mdc-touch-target-wrapper{display:inline}.mat-mdc-list-option .mdc-checkbox{display:inline-block;position:relative;flex:0 0 18px;box-sizing:content-box;width:18px;height:18px;line-height:0;white-space:nowrap;cursor:pointer;vertical-align:bottom}.mat-mdc-list-option .mdc-checkbox[hidden]{display:none}.mat-mdc-list-option .mdc-checkbox.mdc-ripple-upgraded--background-focused .mdc-checkbox__focus-ring,.mat-mdc-list-option .mdc-checkbox:not(.mdc-ripple-upgraded):focus .mdc-checkbox__focus-ring{pointer-events:none;border:2px solid rgba(0,0,0,0);border-radius:6px;box-sizing:content-box;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:100%;width:100%}@media screen and (forced-colors: active){.mat-mdc-list-option .mdc-checkbox.mdc-ripple-upgraded--background-focused .mdc-checkbox__focus-ring,.mat-mdc-list-option .mdc-checkbox:not(.mdc-ripple-upgraded):focus .mdc-checkbox__focus-ring{border-color:CanvasText}}.mat-mdc-list-option .mdc-checkbox.mdc-ripple-upgraded--background-focused .mdc-checkbox__focus-ring::after,.mat-mdc-list-option .mdc-checkbox:not(.mdc-ripple-upgraded):focus .mdc-checkbox__focus-ring::after{content:\"\";border:2px solid rgba(0,0,0,0);border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mat-mdc-list-option .mdc-checkbox.mdc-ripple-upgraded--background-focused .mdc-checkbox__focus-ring::after,.mat-mdc-list-option .mdc-checkbox:not(.mdc-ripple-upgraded):focus .mdc-checkbox__focus-ring::after{border-color:CanvasText}}@media all and (-ms-high-contrast: none){.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__focus-ring{display:none}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mat-mdc-list-option .mdc-checkbox__mixedmark{margin:0 1px}}.mat-mdc-list-option .mdc-checkbox--disabled{cursor:default;pointer-events:none}.mat-mdc-list-option .mdc-checkbox__background{display:inline-flex;position:absolute;align-items:center;justify-content:center;box-sizing:border-box;width:18px;height:18px;border:2px solid currentColor;border-radius:2px;background-color:rgba(0,0,0,0);pointer-events:none;will-change:background-color,border-color}.mat-mdc-list-option .mdc-checkbox__checkmark{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;opacity:0}.mdc-checkbox--upgraded .mat-mdc-list-option .mdc-checkbox__checkmark{opacity:1}.mat-mdc-list-option .mdc-checkbox__checkmark-path{stroke:currentColor;stroke-width:3.12px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mat-mdc-list-option .mdc-checkbox__mixedmark{width:100%;height:0;transform:scaleX(0) rotate(0deg);border-width:1px;border-style:solid;opacity:0}.mat-mdc-list-option .mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark-path,.mat-mdc-list-option .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark-path,.mat-mdc-list-option .mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__checkmark-path{stroke-dashoffset:0}.mat-mdc-list-option .mdc-checkbox__native-control{position:absolute;margin:0;padding:0;opacity:0;cursor:inherit}.mat-mdc-list-option .mdc-checkbox__native-control:disabled{cursor:default;pointer-events:none}.mat-mdc-list-option .mdc-checkbox--touch{margin:calc((var(--mdc-checkbox-state-layer-size, 48px) - var(--mdc-checkbox-state-layer-size, 40px)) / 2)}.mat-mdc-list-option .mdc-checkbox--touch .mdc-checkbox__native-control{top:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 48px)) / 2);right:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 48px)) / 2);left:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 48px)) / 2);width:var(--mdc-checkbox-state-layer-size, 48px);height:var(--mdc-checkbox-state-layer-size, 48px)}.mat-mdc-list-option .mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark{opacity:1}.mat-mdc-list-option .mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__mixedmark{transform:scaleX(1) rotate(-45deg)}.mat-mdc-list-option .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark,.mat-mdc-list-option .mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__checkmark{transform:rotate(45deg);opacity:0}.mat-mdc-list-option .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__mixedmark,.mat-mdc-list-option .mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__mixedmark{transform:scaleX(1) rotate(0deg);opacity:1}.mat-mdc-list-option .mdc-radio{display:inline-block;position:relative;flex:0 0 auto;box-sizing:content-box;width:20px;height:20px;cursor:pointer;will-change:opacity,transform,border-color,color}.mat-mdc-list-option .mdc-radio[hidden]{display:none}.mat-mdc-list-option .mdc-radio__background{display:inline-block;position:relative;box-sizing:border-box;width:20px;height:20px}.mat-mdc-list-option .mdc-radio__background::before{position:absolute;transform:scale(0, 0);border-radius:50%;opacity:0;pointer-events:none;content:\"\"}.mat-mdc-list-option .mdc-radio__outer-circle{position:absolute;top:0;left:0;box-sizing:border-box;width:100%;height:100%;border-width:2px;border-style:solid;border-radius:50%}.mat-mdc-list-option .mdc-radio__inner-circle{position:absolute;top:0;left:0;box-sizing:border-box;width:100%;height:100%;transform:scale(0, 0);border-width:10px;border-style:solid;border-radius:50%}.mat-mdc-list-option .mdc-radio__native-control{position:absolute;margin:0;padding:0;opacity:0;cursor:inherit;z-index:1}.mat-mdc-list-option .mdc-radio--touch{margin-top:4px;margin-bottom:4px;margin-right:4px;margin-left:4px}.mat-mdc-list-option .mdc-radio--touch .mdc-radio__native-control{top:calc((40px - 48px) / 2);right:calc((40px - 48px) / 2);left:calc((40px - 48px) / 2);width:48px;height:48px}.mat-mdc-list-option .mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__focus-ring,.mat-mdc-list-option .mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__focus-ring{pointer-events:none;border:2px solid rgba(0,0,0,0);border-radius:6px;box-sizing:content-box;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:100%;width:100%}@media screen and (forced-colors: active){.mat-mdc-list-option .mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__focus-ring,.mat-mdc-list-option .mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__focus-ring{border-color:CanvasText}}.mat-mdc-list-option .mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__focus-ring::after,.mat-mdc-list-option .mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__focus-ring::after{content:\"\";border:2px solid rgba(0,0,0,0);border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mat-mdc-list-option .mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__focus-ring::after,.mat-mdc-list-option .mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__focus-ring::after{border-color:CanvasText}}.mat-mdc-list-option .mdc-radio--disabled{cursor:default;pointer-events:none}.mat-mdc-list-option .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__inner-circle{transform:scale(0.5)}.mat-mdc-list-option .mdc-radio__native-control:disabled+.mdc-radio__background,.mat-mdc-list-option [aria-disabled=true] .mdc-radio__native-control+.mdc-radio__background{cursor:default}.mat-mdc-list-option .mdc-radio__native-control:focus+.mdc-radio__background::before{transform:scale(1);opacity:.12}@keyframes mdc-checkbox-unchecked-checked-checkmark-path{0%,50%{stroke-dashoffset:29.7833385}50%{animation-timing-function:cubic-bezier(0, 0, 0.2, 1)}100%{stroke-dashoffset:0}}@keyframes mdc-checkbox-unchecked-indeterminate-mixedmark{0%,68.2%{transform:scaleX(0)}68.2%{animation-timing-function:cubic-bezier(0, 0, 0, 1)}100%{transform:scaleX(1)}}@keyframes mdc-checkbox-checked-unchecked-checkmark-path{from{animation-timing-function:cubic-bezier(0.4, 0, 1, 1);opacity:1;stroke-dashoffset:0}to{opacity:0;stroke-dashoffset:-29.7833385}}@keyframes mdc-checkbox-checked-indeterminate-checkmark{from{animation-timing-function:cubic-bezier(0, 0, 0.2, 1);transform:rotate(0deg);opacity:1}to{transform:rotate(45deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-checked-checkmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);transform:rotate(45deg);opacity:0}to{transform:rotate(360deg);opacity:1}}@keyframes mdc-checkbox-checked-indeterminate-mixedmark{from{animation-timing-function:mdc-animation-deceleration-curve-timing-function;transform:rotate(-45deg);opacity:0}to{transform:rotate(0deg);opacity:1}}@keyframes mdc-checkbox-indeterminate-checked-mixedmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);transform:rotate(0deg);opacity:1}to{transform:rotate(315deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-unchecked-mixedmark{0%{animation-timing-function:linear;transform:scaleX(1);opacity:1}32.8%,100%{transform:scaleX(0);opacity:0}}@media all and (-ms-high-contrast: none){.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox .mdc-checkbox__focus-ring{display:none}}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__background{transition:background-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),border-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__checkmark{transition:opacity 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__checkmark-path{transition:stroke-dashoffset 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__mixedmark{transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-unchecked-checked .mdc-checkbox__background,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__background,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-checked-unchecked .mdc-checkbox__background,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__background{animation-duration:180ms;animation-timing-function:linear}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-unchecked-checked .mdc-checkbox__checkmark-path{animation:mdc-checkbox-unchecked-checked-checkmark-path 180ms linear 0s;transition:none}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__mixedmark{animation:mdc-checkbox-unchecked-indeterminate-mixedmark 90ms linear 0s;transition:none}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-checked-unchecked .mdc-checkbox__checkmark-path{animation:mdc-checkbox-checked-unchecked-checkmark-path 90ms linear 0s;transition:none}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__checkmark{animation:mdc-checkbox-checked-indeterminate-checkmark 90ms linear 0s;transition:none}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__mixedmark{animation:mdc-checkbox-checked-indeterminate-mixedmark 90ms linear 0s;transition:none}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__checkmark{animation:mdc-checkbox-indeterminate-checked-checkmark 500ms linear 0s;transition:none}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__mixedmark{animation:mdc-checkbox-indeterminate-checked-mixedmark 500ms linear 0s;transition:none}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__mixedmark{animation:mdc-checkbox-indeterminate-unchecked-mixedmark 300ms linear 0s;transition:none}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__native-control:checked~.mdc-checkbox__background,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background{transition:border-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1),background-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark{transition:opacity 180ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 180ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__checkmark{transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__background,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__checkmark,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__checkmark-path,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__mixedmark{transition:none}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-radio__background::before{transition:opacity 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-radio__outer-circle{transition:border-color 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-radio__inner-circle{transition:transform 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1),border-color 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-radio__native-control:checked+.mdc-radio__background,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-radio__native-control:disabled+.mdc-radio__background{transition:opacity 120ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__outer-circle{transition:border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__inner-circle,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__inner-circle{transition:transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1),border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__inner-circle{transition:transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1),border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-radio__native-control:focus+.mdc-radio__background::before{transition:opacity 120ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-list-option .mdc-checkbox{padding:calc((40px - 18px) / 2);padding:calc((var(--mdc-checkbox-state-layer-size, 40px) - 18px) / 2);margin:calc((40px - 40px) / 2);margin:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 40px)) / 2)}.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control[disabled]:not(:checked):not(:indeterminate):not([data-indeterminate=true])~.mdc-checkbox__background{border-color:rgba(0, 0, 0, 0.38);border-color:var(--mdc-checkbox-disabled-unselected-icon-color, rgba(0, 0, 0, 0.38));background-color:transparent}.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control[disabled]:checked~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control[disabled]:indeterminate~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control[data-indeterminate=true][disabled]~.mdc-checkbox__background{border-color:transparent;background-color:rgba(0, 0, 0, 0.38);background-color:var(--mdc-checkbox-disabled-selected-icon-color, rgba(0, 0, 0, 0.38))}.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control:enabled~.mdc-checkbox__background .mdc-checkbox__checkmark{color:#fff;color:var(--mdc-checkbox-selected-checkmark-color, #fff)}.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control:enabled~.mdc-checkbox__background .mdc-checkbox__mixedmark{border-color:#fff;border-color:var(--mdc-checkbox-selected-checkmark-color, #fff)}.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control:disabled~.mdc-checkbox__background .mdc-checkbox__checkmark{color:#fff;color:var(--mdc-checkbox-disabled-selected-checkmark-color, #fff)}.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control:disabled~.mdc-checkbox__background .mdc-checkbox__mixedmark{border-color:#fff;border-color:var(--mdc-checkbox-disabled-selected-checkmark-color, #fff)}.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control:enabled:not(:checked):not(:indeterminate):not([data-indeterminate=true])~.mdc-checkbox__background{border-color:rgba(0, 0, 0, 0.54);border-color:var(--mdc-checkbox-unselected-icon-color, rgba(0, 0, 0, 0.54));background-color:transparent}.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control:enabled:checked~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control:enabled:indeterminate~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control[data-indeterminate=true]:enabled~.mdc-checkbox__background{border-color:#018786;border-color:var(--mdc-checkbox-selected-icon-color, var(--mdc-theme-secondary, #018786));background-color:#018786;background-color:var(--mdc-checkbox-selected-icon-color, var(--mdc-theme-secondary, #018786))}@keyframes mdc-checkbox-fade-in-background-8A000000FF01878600000000FF018786{0%{border-color:rgba(0, 0, 0, 0.54);border-color:var(--mdc-checkbox-unselected-icon-color, rgba(0, 0, 0, 0.54));background-color:transparent}50%{border-color:#018786;border-color:var(--mdc-checkbox-selected-icon-color, var(--mdc-theme-secondary, #018786));background-color:#018786;background-color:var(--mdc-checkbox-selected-icon-color, var(--mdc-theme-secondary, #018786))}}@keyframes mdc-checkbox-fade-out-background-8A000000FF01878600000000FF018786{0%,80%{border-color:#018786;border-color:var(--mdc-checkbox-selected-icon-color, var(--mdc-theme-secondary, #018786));background-color:#018786;background-color:var(--mdc-checkbox-selected-icon-color, var(--mdc-theme-secondary, #018786))}100%{border-color:rgba(0, 0, 0, 0.54);border-color:var(--mdc-checkbox-unselected-icon-color, rgba(0, 0, 0, 0.54));background-color:transparent}}.mat-mdc-list-option .mdc-checkbox.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-in-background-8A000000FF01878600000000FF018786}.mat-mdc-list-option .mdc-checkbox.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mat-mdc-list-option .mdc-checkbox.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-out-background-8A000000FF01878600000000FF018786}.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__background{top:calc((40px - 18px) / 2);top:calc((var(--mdc-checkbox-state-layer-size, 40px) - 18px) / 2);left:calc((40px - 18px) / 2);left:calc((var(--mdc-checkbox-state-layer-size, 40px) - 18px) / 2)}.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control{top:calc((40px - 40px) / 2);top:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 40px)) / 2);right:calc((40px - 40px) / 2);right:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 40px)) / 2);left:calc((40px - 40px) / 2);left:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 40px)) / 2);width:40px;width:var(--mdc-checkbox-state-layer-size, 40px);height:40px;height:var(--mdc-checkbox-state-layer-size, 40px)}.mat-mdc-list-option .mdc-radio{padding:calc((40px - 20px) / 2);padding:calc((var(--mdc-radio-state-layer-size, 40px) - 20px) / 2)}.mat-mdc-list-option .mdc-radio [aria-disabled=true] .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-list-option .mdc-radio .mdc-radio__native-control:disabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:#000;border-color:var(--mdc-radio-disabled-selected-icon-color, #000)}.mat-mdc-list-option .mdc-radio [aria-disabled=true] .mdc-radio__native-control+.mdc-radio__background .mdc-radio__inner-circle,.mat-mdc-list-option .mdc-radio .mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:#000;border-color:var(--mdc-radio-disabled-selected-icon-color, #000)}.mat-mdc-list-option .mdc-radio [aria-disabled=true] .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-list-option .mdc-radio .mdc-radio__native-control:disabled:checked+.mdc-radio__background .mdc-radio__outer-circle{opacity:0.38;opacity:var(--mdc-radio-disabled-selected-icon-opacity, 0.38)}.mat-mdc-list-option .mdc-radio [aria-disabled=true] .mdc-radio__native-control+.mdc-radio__background .mdc-radio__inner-circle,.mat-mdc-list-option .mdc-radio .mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__inner-circle{opacity:0.38;opacity:var(--mdc-radio-disabled-selected-icon-opacity, 0.38)}.mat-mdc-list-option .mdc-radio [aria-disabled=true] .mdc-radio__native-control:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-list-option .mdc-radio .mdc-radio__native-control:disabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:#000;border-color:var(--mdc-radio-disabled-unselected-icon-color, #000)}.mat-mdc-list-option .mdc-radio [aria-disabled=true] .mdc-radio__native-control:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle,.mat-mdc-list-option .mdc-radio .mdc-radio__native-control:disabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{opacity:0.38;opacity:var(--mdc-radio-disabled-unselected-icon-opacity, 0.38)}.mat-mdc-list-option .mdc-radio .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:#6200ee;border-color:var(--mdc-radio-selected-icon-color, #6200ee)}.mat-mdc-list-option .mdc-radio .mdc-radio__native-control:enabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:#6200ee;border-color:var(--mdc-radio-selected-icon-color, #6200ee)}.mat-mdc-list-option .mdc-radio .mdc-radio__native-control:enabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:#000;border-color:var(--mdc-radio-unselected-icon-color, #000)}.mat-mdc-list-option .mdc-radio .mdc-radio__background::before{top:calc(-1 * (40px - 20px) / 2);top:calc(-1 * (var(--mdc-radio-state-layer-size, 40px) - 20px) / 2);left:calc(-1 * (40px - 20px) / 2);left:calc(-1 * (var(--mdc-radio-state-layer-size, 40px) - 20px) / 2);width:40px;width:var(--mdc-radio-state-layer-size, 40px);height:40px;height:var(--mdc-radio-state-layer-size, 40px)}.mat-mdc-list-option .mdc-radio .mdc-radio__native-control{top:calc((40px - 40px) / 2);top:calc((var(--mdc-radio-state-layer-size, 40px) - var(--mdc-radio-state-layer-size, 40px)) / 2);right:calc((40px - 40px) / 2);right:calc((var(--mdc-radio-state-layer-size, 40px) - var(--mdc-radio-state-layer-size, 40px)) / 2);left:calc((40px - 40px) / 2);left:calc((var(--mdc-radio-state-layer-size, 40px) - var(--mdc-radio-state-layer-size, 40px)) / 2);width:40px;width:var(--mdc-radio-state-layer-size, 40px);height:40px;height:var(--mdc-radio-state-layer-size, 40px)}.mat-mdc-list-option .mdc-checkbox__native-control,.mat-mdc-list-option .mdc-radio__native-control{display:none}.cdk-high-contrast-active .mat-mdc-list-option.mdc-list-item--selected::after{content:\"\";position:absolute;top:50%;right:16px;transform:translateY(-50%);width:10px;height:0;border-bottom:solid 10px;border-radius:10px}.cdk-high-contrast-active .mat-mdc-list-option.mdc-list-item--selected [dir=rtl]::after{right:auto;left:16px}"]
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [SELECTION_LIST]
      }]
    }, {
      type: _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_5__.Platform
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [_angular_material_core__WEBPACK_IMPORTED_MODULE_3__.MAT_RIPPLE_GLOBAL_OPTIONS]
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [_angular_core__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_MODULE_TYPE]
      }]
    }];
  }, {
    _lines: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChildren,
      args: [MatListItemLine, {
        descendants: true
      }]
    }],
    _titles: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChildren,
      args: [MatListItemTitle, {
        descendants: true
      }]
    }],
    _unscopedContent: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChild,
      args: ['unscopedContent']
    }],
    selectedChange: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    togglePosition: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    checkboxPosition: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    color: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    value: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    selected: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }]
  });
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * @docs-private
 */
class MatListSubheaderCssMatStyler {}
MatListSubheaderCssMatStyler.ɵfac = function MatListSubheaderCssMatStyler_Factory(t) {
  return new (t || MatListSubheaderCssMatStyler)();
};
MatListSubheaderCssMatStyler.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: MatListSubheaderCssMatStyler,
  selectors: [["", "mat-subheader", ""], ["", "matSubheader", ""]],
  hostAttrs: [1, "mat-mdc-subheader", "mdc-list-group__subheader"]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatListSubheaderCssMatStyler, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: '[mat-subheader], [matSubheader]',
      // TODO(mmalerba): MDC's subheader font looks identical to the list item font, figure out why and
      //  make a change in one of the repos to visually distinguish.
      host: {
        'class': 'mat-mdc-subheader mdc-list-group__subheader'
      }
    }]
  }], null, null);
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Injection token that can be used to inject instances of `MatNavList`. It serves as
 * alternative token to the actual `MatNavList` class which could cause unnecessary
 * retention of the class and its component metadata.
 */
const MAT_NAV_LIST = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('MatNavList');
class MatNavList extends MatListBase {
  constructor() {
    super(...arguments);
    // An navigation list is considered interactive, but does not extend the interactive list
    // base class. We do this because as per MDC, items of interactive lists are only reachable
    // through keyboard shortcuts. We want all items for the navigation list to be reachable
    // through tab key as we do not intend to provide any special accessibility treatment. The
    // accessibility treatment depends on how the end-user will interact with it.
    this._isNonInteractive = false;
  }
}
MatNavList.ɵfac = /* @__PURE__ */function () {
  let ɵMatNavList_BaseFactory;
  return function MatNavList_Factory(t) {
    return (ɵMatNavList_BaseFactory || (ɵMatNavList_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](MatNavList)))(t || MatNavList);
  };
}();
MatNavList.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: MatNavList,
  selectors: [["mat-nav-list"]],
  hostAttrs: ["role", "navigation", 1, "mat-mdc-nav-list", "mat-mdc-list-base", "mdc-list"],
  exportAs: ["matNavList"],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([{
    provide: MatListBase,
    useExisting: MatNavList
  }]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]],
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function MatNavList_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](0);
    }
  },
  styles: [_c1],
  encapsulation: 2,
  changeDetection: 0
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatNavList, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'mat-nav-list',
      exportAs: 'matNavList',
      template: '<ng-content></ng-content>',
      host: {
        'class': 'mat-mdc-nav-list mat-mdc-list-base mdc-list',
        'role': 'navigation'
      },
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush,
      providers: [{
        provide: MatListBase,
        useExisting: MatNavList
      }],
      styles: ["@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-list-divider::after{content:\"\";display:block;border-bottom-width:1px;border-bottom-style:solid}}.mdc-list{margin:0;padding:8px 0;list-style-type:none}.mdc-list:focus{outline:none}.mdc-list-item__wrapper{display:block}.mdc-list-item{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;align-items:stretch;cursor:pointer}.mdc-list-item:focus{outline:none}.mdc-list-item.mdc-list-item--with-one-line{height:48px}.mdc-list-item.mdc-list-item--with-two-lines{height:64px}.mdc-list-item.mdc-list-item--with-three-lines{height:88px}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__start{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--disabled,.mdc-list-item.mdc-list-item--non-interactive{cursor:auto}.mdc-list-item:not(.mdc-list-item--selected):focus::before,.mdc-list-item.mdc-ripple-upgraded--background-focused::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-list-item:not(.mdc-list-item--selected):focus::before,.mdc-list-item.mdc-ripple-upgraded--background-focused::before{border-color:CanvasText}}.mdc-list-item.mdc-list-item--selected::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:3px double rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-list-item.mdc-list-item--selected::before{border-color:CanvasText}}.mdc-list-item.mdc-list-item--selected:focus::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:3px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-list-item.mdc-list-item--selected:focus::before{border-color:CanvasText}}a.mdc-list-item{color:inherit;text-decoration:none}.mdc-list-item__start{fill:currentColor;flex-shrink:0;pointer-events:none}.mdc-list-item__end{flex-shrink:0;pointer-events:none}.mdc-list-item__content{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;align-self:center;flex:1;pointer-events:none}.mdc-list-item--with-two-lines .mdc-list-item__content,.mdc-list-item--with-three-lines .mdc-list-item__content{align-self:stretch}.mdc-list-item__content[for]{pointer-events:none}.mdc-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-three-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item__secondary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal}.mdc-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list-item--with-three-lines .mdc-list-item__secondary-text{white-space:normal;line-height:20px}.mdc-list-item--with-overline .mdc-list-item__secondary-text{white-space:nowrap;line-height:auto}.mdc-list-item__overline-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-three-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-three-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-three-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-avatar.mdc-list-item,.mdc-list-item--with-leading-avatar.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-avatar .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-avatar .mdc-list-item__start,.mdc-list-item--with-leading-avatar .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-avatar .mdc-list-item__start{border-radius:50%}.mdc-list-item--with-leading-icon.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-icon.mdc-list-item,.mdc-list-item--with-leading-icon.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-icon .mdc-list-item__start{margin-left:16px;margin-right:32px}[dir=rtl] .mdc-list-item--with-leading-icon .mdc-list-item__start,.mdc-list-item--with-leading-icon .mdc-list-item__start[dir=rtl]{margin-left:32px;margin-right:16px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-thumbnail.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-thumbnail.mdc-list-item,.mdc-list-item--with-leading-thumbnail.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-thumbnail .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-thumbnail .mdc-list-item__start,.mdc-list-item--with-leading-thumbnail .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-image.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-image.mdc-list-item,.mdc-list-item--with-leading-image.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-image .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-image .mdc-list-item__start,.mdc-list-item--with-leading-image .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-one-line{height:72px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-video.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-video.mdc-list-item,.mdc-list-item--with-leading-video.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-video .mdc-list-item__start{margin-left:0;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-video .mdc-list-item__start,.mdc-list-item--with-leading-video .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-one-line{height:72px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-checkbox.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-checkbox.mdc-list-item,.mdc-list-item--with-leading-checkbox.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-checkbox .mdc-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-list-item--with-leading-checkbox .mdc-list-item__start,.mdc-list-item--with-leading-checkbox .mdc-list-item__start[dir=rtl]{margin-left:24px;margin-right:8px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-radio.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-radio.mdc-list-item,.mdc-list-item--with-leading-radio.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-radio .mdc-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-list-item--with-leading-radio .mdc-list-item__start,.mdc-list-item--with-leading-radio .mdc-list-item__start[dir=rtl]{margin-left:24px;margin-right:8px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-switch.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-switch.mdc-list-item,.mdc-list-item--with-leading-switch.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-switch .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-switch .mdc-list-item__start,.mdc-list-item--with-leading-switch .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-trailing-icon.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-icon.mdc-list-item,.mdc-list-item--with-trailing-icon.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-icon .mdc-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-icon .mdc-list-item__end,.mdc-list-item--with-trailing-icon .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end{align-self:flex-start;margin-top:0}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:0}.mdc-list-item--with-trailing-meta.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-meta.mdc-list-item,.mdc-list-item--with-trailing-meta.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-meta .mdc-list-item__end{margin-left:28px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-meta .mdc-list-item__end,.mdc-list-item--with-trailing-meta .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:28px}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-trailing-meta .mdc-list-item__end{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--mdc-typography-caption-font-family);font-size:var(--mdc-typography-caption-font-size);line-height:var(--mdc-typography-caption-line-height);font-weight:var(--mdc-typography-caption-font-weight);letter-spacing:var(--mdc-typography-caption-letter-spacing);text-decoration:var(--mdc-typography-caption-text-decoration);text-transform:var(--mdc-typography-caption-text-transform)}.mdc-list-item--with-trailing-checkbox.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item,.mdc-list-item--with-trailing-checkbox.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-checkbox .mdc-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-list-item--with-trailing-checkbox .mdc-list-item__end,.mdc-list-item--with-trailing-checkbox .mdc-list-item__end[dir=rtl]{margin-left:8px;margin-right:24px}.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:8px}.mdc-list-item--with-trailing-radio.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item,.mdc-list-item--with-trailing-radio.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-radio .mdc-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-list-item--with-trailing-radio .mdc-list-item__end,.mdc-list-item--with-trailing-radio .mdc-list-item__end[dir=rtl]{margin-left:8px;margin-right:24px}.mdc-list-item--with-trailing-radio.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:8px}.mdc-list-item--with-trailing-switch.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-switch.mdc-list-item,.mdc-list-item--with-trailing-switch.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-switch .mdc-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-switch .mdc-list-item__end,.mdc-list-item--with-trailing-switch .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-trailing-switch.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:16px}.mdc-list-item--with-overline.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-overline.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list-item--with-overline.mdc-list-item--with-three-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-overline.mdc-list-item--with-three-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list-item{padding-left:16px;padding-right:16px}[dir=rtl] .mdc-list-item,.mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list-group .mdc-deprecated-list{padding:0}.mdc-list-group__subheader{margin:calc((3rem - 1.5rem)/2) 16px}.mdc-list-divider{padding:0;background-clip:content-box}.mdc-list-divider.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset{padding-left:16px;padding-right:auto}[dir=rtl] .mdc-list-divider.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset,.mdc-list-divider.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset[dir=rtl]{padding-left:auto;padding-right:16px}.mdc-list-divider.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset{padding-left:auto;padding-right:16px}[dir=rtl] .mdc-list-divider.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset,.mdc-list-divider.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset[dir=rtl]{padding-left:16px;padding-right:auto}.mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset{padding-left:0px;padding-right:auto}[dir=rtl] .mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset[dir=rtl]{padding-left:auto;padding-right:0px}[dir=rtl] .mdc-list-divider,.mdc-list-divider[dir=rtl]{padding:0}.mdc-list-item{background-color:var(--mdc-list-list-item-container-color)}.mdc-list-item.mdc-list-item--selected{background-color:var(--mdc-list-list-item-selected-container-color)}.mdc-list-item--with-one-line{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-one-line.mdc-list-item--with-leading-avatar,.mdc-list-item--with-one-line.mdc-list-item--with-leading-icon,.mdc-list-item--with-one-line.mdc-list-item--with-leading-thumbnail,.mdc-list-item--with-one-line.mdc-list-item--with-leading-checkbox,.mdc-list-item--with-one-line.mdc-list-item--with-leading-radio,.mdc-list-item--with-one-line.mdc-list-item--with-leading-switch{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-one-line.mdc-list-item--with-leading-image,.mdc-list-item--with-one-line.mdc-list-item--with-leading-video{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-two-lines{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-two-lines.mdc-list-item--with-leading-avatar,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-icon,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-thumbnail,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-checkbox,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-radio,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-switch,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-image,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-video{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-three-lines{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item.mdc-list-item--with-one-line{height:var(--mdc-list-list-item-one-line-container-height)}.mdc-list-item.mdc-list-item--with-two-lines{height:var(--mdc-list-list-item-two-line-container-height)}.mdc-list-item.mdc-list-item--with-three-lines{height:var(--mdc-list-list-item-three-line-container-height)}.mdc-list-item__primary-text{color:var(--mdc-list-list-item-label-text-color)}.mdc-list-item__primary-text{font-family:var(--mdc-list-list-item-label-text-font);line-height:var(--mdc-list-list-item-label-text-line-height);font-size:var(--mdc-list-list-item-label-text-size);font-weight:var(--mdc-list-list-item-label-text-weight);letter-spacing:var(--mdc-list-list-item-label-text-tracking)}.mdc-list-item__secondary-text{color:var(--mdc-list-list-item-supporting-text-color)}.mdc-list-item__secondary-text{font-family:var(--mdc-list-list-item-supporting-text-font);line-height:var(--mdc-list-list-item-supporting-text-line-height);font-size:var(--mdc-list-list-item-supporting-text-size);font-weight:var(--mdc-list-list-item-supporting-text-weight);letter-spacing:var(--mdc-list-list-item-supporting-text-tracking)}.mdc-list-item--with-leading-icon .mdc-list-item__start{color:var(--mdc-list-list-item-leading-icon-color)}.mdc-list-item--with-leading-icon .mdc-list-item__start{width:var(--mdc-list-list-item-leading-icon-size);height:var(--mdc-list-list-item-leading-icon-size)}.mdc-list-item--with-leading-icon .mdc-list-item__start>i{font-size:var(--mdc-list-list-item-leading-icon-size)}.mdc-list-item--with-leading-icon .mdc-list-item__start .mdc-list-item__icon{font-size:var(--mdc-list-list-item-leading-icon-size);width:var(--mdc-list-list-item-leading-icon-size);height:var(--mdc-list-list-item-leading-icon-size)}.mdc-list-item--with-leading-avatar .mdc-list-item__start{width:var(--mdc-list-list-item-leading-avatar-size);height:var(--mdc-list-list-item-leading-avatar-size)}.mdc-list-item.mdc-list-item--with-trailing-meta .mdc-list-item__end{color:var(--mdc-list-list-item-trailing-supporting-text-color)}.mdc-list-item--with-trailing-meta .mdc-list-item__end{font-family:var(--mdc-list-list-item-trailing-supporting-text-font);line-height:var(--mdc-list-list-item-trailing-supporting-text-line-height);font-size:var(--mdc-list-list-item-trailing-supporting-text-size);font-weight:var(--mdc-list-list-item-trailing-supporting-text-weight);letter-spacing:var(--mdc-list-list-item-trailing-supporting-text-tracking)}.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-trailing-icon-color)}.mdc-list-item--with-trailing-icon .mdc-list-item__end{width:var(--mdc-list-list-item-trailing-icon-size);height:var(--mdc-list-list-item-trailing-icon-size)}.mdc-list-item--with-trailing-icon .mdc-list-item__end>i{font-size:var(--mdc-list-list-item-trailing-icon-size)}.mdc-list-item--with-trailing-icon .mdc-list-item__end .mdc-list-item__icon{font-size:var(--mdc-list-list-item-trailing-icon-size);width:var(--mdc-list-list-item-trailing-icon-size);height:var(--mdc-list-list-item-trailing-icon-size)}.mdc-list-item--selected.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-selected-trailing-icon-color)}.mdc-list-item--disabled .mdc-list-item__start,.mdc-list-item--disabled .mdc-list-item__content,.mdc-list-item--disabled .mdc-list-item__end{opacity:1}.mdc-list-item--disabled .mdc-list-item__primary-text,.mdc-list-item--disabled .mdc-list-item__secondary-text,.mdc-list-item--disabled .mdc-list-item__overline-text{opacity:var(--mdc-list-list-item-disabled-label-text-opacity)}.mdc-list-item--disabled.mdc-list-item--with-leading-icon .mdc-list-item__start{color:var(--mdc-list-list-item-disabled-leading-icon-color)}.mdc-list-item--disabled.mdc-list-item--with-leading-icon .mdc-list-item__start{opacity:var(--mdc-list-list-item-disabled-leading-icon-opacity)}.mdc-list-item--disabled.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-disabled-trailing-icon-color)}.mdc-list-item--disabled.mdc-list-item--with-trailing-icon .mdc-list-item__end{opacity:var(--mdc-list-list-item-disabled-trailing-icon-opacity)}.mdc-list-item:hover .mdc-list-item__primary-text{color:var(--mdc-list-list-item-hover-label-text-color)}.mdc-list-item--with-leading-icon:hover .mdc-list-item__start{color:var(--mdc-list-list-item-hover-leading-icon-color)}.mdc-list-item--with-trailing-icon:hover .mdc-list-item__end{color:var(--mdc-list-list-item-hover-trailing-icon-color)}.mdc-list-item:focus .mdc-list-item__primary-text{color:var(--mdc-list-list-item-focus-label-text-color)}.mdc-list-item.mdc-list-item--disabled .mdc-list-item__primary-text{color:var(--mdc-list-list-item-disabled-label-text-color)}.mdc-list-item:hover::before{background-color:var(--mdc-list-list-item-hover-state-layer-color);opacity:var(--mdc-list-list-item-hover-state-layer-opacity)}.mdc-list-item.mdc-list-item--disabled::before{background-color:var(--mdc-list-list-item-disabled-state-layer-color);opacity:var(--mdc-list-list-item-disabled-state-layer-opacity)}.mdc-list-item:focus::before{background-color:var(--mdc-list-list-item-focus-state-layer-color);opacity:var(--mdc-list-list-item-focus-state-layer-opacity)}.mdc-list-item--disabled .mdc-radio,.mdc-list-item--disabled .mdc-checkbox{opacity:var(--mdc-list-list-item-disabled-label-text-opacity)}.mdc-list-item--with-leading-avatar .mat-mdc-list-item-avatar{border-radius:var(--mdc-list-list-item-leading-avatar-shape);background-color:var(--mdc-list-list-item-leading-avatar-color)}.mat-mdc-list-base{--mdc-list-list-item-container-shape:0;--mdc-list-list-item-leading-avatar-shape:50%;--mdc-list-list-item-container-color:transparent;--mdc-list-list-item-selected-container-color:transparent;--mdc-list-list-item-leading-avatar-color:transparent;--mdc-list-list-item-leading-icon-size:24px;--mdc-list-list-item-leading-avatar-size:40px;--mdc-list-list-item-trailing-icon-size:24px;--mdc-list-list-item-disabled-state-layer-color:transparent;--mdc-list-list-item-disabled-state-layer-opacity:0;--mdc-list-list-item-disabled-label-text-opacity:0.38;--mdc-list-list-item-disabled-leading-icon-opacity:0.38;--mdc-list-list-item-disabled-trailing-icon-opacity:0.38}.cdk-high-contrast-active a.mdc-list-item--activated::after{content:\"\";position:absolute;top:50%;right:16px;transform:translateY(-50%);width:10px;height:0;border-bottom:solid 10px;border-radius:10px}.cdk-high-contrast-active a.mdc-list-item--activated [dir=rtl]::after{right:auto;left:16px}.mat-mdc-list-base{display:block}.mat-mdc-list-base .mdc-list-item__start,.mat-mdc-list-base .mdc-list-item__end,.mat-mdc-list-base .mdc-list-item__content{pointer-events:auto}.mat-mdc-list-item,.mat-mdc-list-option{width:100%;box-sizing:border-box;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-list-item:not(.mat-mdc-list-item-interactive),.mat-mdc-list-option:not(.mat-mdc-list-item-interactive){cursor:default}.mat-mdc-list-item .mat-divider-inset,.mat-mdc-list-option .mat-divider-inset{position:absolute;left:0;right:0;bottom:0}.mat-mdc-list-item .mat-mdc-list-item-avatar~.mat-divider-inset,.mat-mdc-list-option .mat-mdc-list-item-avatar~.mat-divider-inset{margin-left:72px}[dir=rtl] .mat-mdc-list-item .mat-mdc-list-item-avatar~.mat-divider-inset,[dir=rtl] .mat-mdc-list-option .mat-mdc-list-item-avatar~.mat-divider-inset{margin-right:72px}.mat-mdc-list-item-interactive::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";opacity:0;pointer-events:none}.mat-mdc-list-item>.mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-mdc-list-item:focus>.mat-mdc-focus-indicator::before{content:\"\"}.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-line.mdc-list-item__secondary-text{white-space:nowrap;line-height:normal}.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-unscoped-content.mdc-list-item__secondary-text{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}mat-action-list button{background:none;color:inherit;border:none;font:inherit;outline:inherit;-webkit-tap-highlight-color:rgba(0,0,0,0);text-align:left}[dir=rtl] mat-action-list button{text-align:right}mat-action-list button::-moz-focus-inner{border:0}"]
    }]
  }], null, null);
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const MAT_SELECTION_LIST_VALUE_ACCESSOR = {
  provide: _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NG_VALUE_ACCESSOR,
  useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => MatSelectionList),
  multi: true
};
/** Change event that is being fired whenever the selected state of an option changes. */
class MatSelectionListChange {
  constructor( /** Reference to the selection list that emitted the event. */
  source, /** Reference to the options that have been changed. */
  options) {
    this.source = source;
    this.options = options;
  }
}
class MatSelectionList extends MatListBase {
  /** Whether selection is limited to one or multiple items (default multiple). */
  get multiple() {
    return this._multiple;
  }
  set multiple(value) {
    const newValue = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__.coerceBooleanProperty)(value);
    if (newValue !== this._multiple) {
      if ((typeof ngDevMode === 'undefined' || ngDevMode) && this._initialized) {
        throw new Error('Cannot change `multiple` mode of mat-selection-list after initialization.');
      }
      this._multiple = newValue;
      this.selectedOptions = new _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_9__.SelectionModel(this._multiple, this.selectedOptions.selected);
    }
  }
  /** Whether radio indicator for all list items is hidden. */
  get hideSingleSelectionIndicator() {
    return this._hideSingleSelectionIndicator;
  }
  set hideSingleSelectionIndicator(value) {
    this._hideSingleSelectionIndicator = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__.coerceBooleanProperty)(value);
  }
  constructor(_element, _ngZone) {
    super();
    this._element = _element;
    this._ngZone = _ngZone;
    this._initialized = false;
    /** Emits when the list has been destroyed. */
    this._destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_10__.Subject();
    /** View to model callback that should be called whenever the selected options change. */
    this._onChange = _ => {};
    /** Emits a change event whenever the selected state of an option changes. */
    this.selectionChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    /** Theme color of the selection list. This sets the checkbox color for all list options. */
    this.color = 'accent';
    /**
     * Function used for comparing an option against the selected value when determining which
     * options should appear as selected. The first argument is the value of an options. The second
     * one is a value from the selected value. A boolean must be returned.
     */
    this.compareWith = (a1, a2) => a1 === a2;
    this._multiple = true;
    this._hideSingleSelectionIndicator = this._defaultOptions?.hideSingleSelectionIndicator ?? false;
    /** The currently selected options. */
    this.selectedOptions = new _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_9__.SelectionModel(this._multiple);
    /** View to model callback that should be called if the list or its options lost focus. */
    this._onTouched = () => {};
    this._selectionListDisabled = false;
    /** Handles focusout events within the list. */
    this._handleFocusout = () => {
      // Focus takes a while to update so we have to wrap our call in a timeout.
      setTimeout(() => {
        if (!this._containsFocus()) {
          this._resetActiveOption();
        }
      });
    };
    /** Handles focusin events within the list. */
    this._handleFocusin = event => {
      if (this.disabled) {
        return;
      }
      const activeIndex = this._items.toArray().findIndex(item => item._elementRef.nativeElement.contains(event.target));
      if (activeIndex > -1) {
        this._setActiveOption(activeIndex);
      } else {
        this._resetActiveOption();
      }
    };
    this._isNonInteractive = false;
  }
  ngAfterViewInit() {
    // Mark the selection list as initialized so that the `multiple`
    // binding can no longer be changed.
    this._initialized = true;
    this._setupRovingTabindex();
    // These events are bound outside the zone, because they don't change
    // any change-detected properties and they can trigger timeouts.
    this._ngZone.runOutsideAngular(() => {
      this._element.nativeElement.addEventListener('focusin', this._handleFocusin);
      this._element.nativeElement.addEventListener('focusout', this._handleFocusout);
    });
    if (this._value) {
      this._setOptionsFromValues(this._value);
    }
    this._watchForSelectionChange();
  }
  ngOnChanges(changes) {
    const disabledChanges = changes['disabled'];
    const disableRippleChanges = changes['disableRipple'];
    const hideSingleSelectionIndicatorChanges = changes['hideSingleSelectionIndicator'];
    if (disableRippleChanges && !disableRippleChanges.firstChange || disabledChanges && !disabledChanges.firstChange || hideSingleSelectionIndicatorChanges && !hideSingleSelectionIndicatorChanges.firstChange) {
      this._markOptionsForCheck();
    }
  }
  ngOnDestroy() {
    this._keyManager?.destroy();
    this._element.nativeElement.removeEventListener('focusin', this._handleFocusin);
    this._element.nativeElement.removeEventListener('focusout', this._handleFocusout);
    this._destroyed.next();
    this._destroyed.complete();
    this._isDestroyed = true;
  }
  /** Focuses the selection list. */
  focus(options) {
    this._element.nativeElement.focus(options);
  }
  /** Selects all of the options. Returns the options that changed as a result. */
  selectAll() {
    return this._setAllOptionsSelected(true);
  }
  /** Deselects all of the options. Returns the options that changed as a result. */
  deselectAll() {
    return this._setAllOptionsSelected(false);
  }
  /** Reports a value change to the ControlValueAccessor */
  _reportValueChange() {
    // Stop reporting value changes after the list has been destroyed. This avoids
    // cases where the list might wrongly reset its value once it is removed, but
    // the form control is still live.
    if (this.options && !this._isDestroyed) {
      const value = this._getSelectedOptionValues();
      this._onChange(value);
      this._value = value;
    }
  }
  /** Emits a change event if the selected state of an option changed. */
  _emitChangeEvent(options) {
    this.selectionChange.emit(new MatSelectionListChange(this, options));
  }
  /** Implemented as part of ControlValueAccessor. */
  writeValue(values) {
    this._value = values;
    if (this.options) {
      this._setOptionsFromValues(values || []);
    }
  }
  /** Implemented as a part of ControlValueAccessor. */
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
  }
  /**
   * Whether the *entire* selection list is disabled. When true, each list item is also disabled
   * and each list item is removed from the tab order (has tabindex="-1").
   */
  get disabled() {
    return this._selectionListDisabled;
  }
  set disabled(value) {
    // Update the disabled state of this list. Write to `this._selectionListDisabled` instead of
    // `super.disabled`. That is to avoid closure compiler compatibility issues with assigning to
    // a super property.
    this._selectionListDisabled = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__.coerceBooleanProperty)(value);
    if (this._selectionListDisabled) {
      this._keyManager?.setActiveItem(-1);
    }
  }
  /** Implemented as part of ControlValueAccessor. */
  registerOnChange(fn) {
    this._onChange = fn;
  }
  /** Implemented as part of ControlValueAccessor. */
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  /** Watches for changes in the selected state of the options and updates the list accordingly. */
  _watchForSelectionChange() {
    this.selectedOptions.changed.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.takeUntil)(this._destroyed)).subscribe(event => {
      // Sync external changes to the model back to the options.
      for (let item of event.added) {
        item.selected = true;
      }
      for (let item of event.removed) {
        item.selected = false;
      }
      if (!this._containsFocus()) {
        this._resetActiveOption();
      }
    });
  }
  /** Sets the selected options based on the specified values. */
  _setOptionsFromValues(values) {
    this.options.forEach(option => option._setSelected(false));
    values.forEach(value => {
      const correspondingOption = this.options.find(option => {
        // Skip options that are already in the model. This allows us to handle cases
        // where the same primitive value is selected multiple times.
        return option.selected ? false : this.compareWith(option.value, value);
      });
      if (correspondingOption) {
        correspondingOption._setSelected(true);
      }
    });
  }
  /** Returns the values of the selected options. */
  _getSelectedOptionValues() {
    return this.options.filter(option => option.selected).map(option => option.value);
  }
  /** Marks all the options to be checked in the next change detection run. */
  _markOptionsForCheck() {
    if (this.options) {
      this.options.forEach(option => option._markForCheck());
    }
  }
  /**
   * Sets the selected state on all of the options
   * and emits an event if anything changed.
   */
  _setAllOptionsSelected(isSelected, skipDisabled) {
    // Keep track of whether anything changed, because we only want to
    // emit the changed event when something actually changed.
    const changedOptions = [];
    this.options.forEach(option => {
      if ((!skipDisabled || !option.disabled) && option._setSelected(isSelected)) {
        changedOptions.push(option);
      }
    });
    if (changedOptions.length) {
      this._reportValueChange();
    }
    return changedOptions;
  }
  // Note: This getter exists for backwards compatibility. The `_items` query list
  // cannot be named `options` as it will be picked up by the interactive list base.
  /** The option components contained within this selection-list. */
  get options() {
    return this._items;
  }
  /** Handles keydown events within the list. */
  _handleKeydown(event) {
    const activeItem = this._keyManager.activeItem;
    if ((event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_12__.ENTER || event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_12__.SPACE) && !this._keyManager.isTyping() && activeItem && !activeItem.disabled) {
      event.preventDefault();
      activeItem._toggleOnInteraction();
    } else if (event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_12__.A && this.multiple && !this._keyManager.isTyping() && (0,_angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_12__.hasModifierKey)(event, 'ctrlKey')) {
      const shouldSelect = this.options.some(option => !option.disabled && !option.selected);
      event.preventDefault();
      this._emitChangeEvent(this._setAllOptionsSelected(shouldSelect, true));
    } else {
      this._keyManager.onKeydown(event);
    }
  }
  /**
   * Sets up the logic for maintaining the roving tabindex.
   *
   * `skipPredicate` determines if key manager should avoid putting a given list item in the tab
   * index. Allow disabled list items to receive focus to align with WAI ARIA recommendation.
   * Normally WAI ARIA's instructions are to exclude disabled items from the tab order, but it
   * makes a few exceptions for compound widgets.
   *
   * From [Developing a Keyboard Interface](
   * https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/):
   *   "For the following composite widget elements, keep them focusable when disabled: Options in a
   *   Listbox..."
   */
  _setupRovingTabindex() {
    this._keyManager = new _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_13__.FocusKeyManager(this._items).withHomeAndEnd().withTypeAhead().withWrap().skipPredicate(() => this.disabled);
    // Set the initial focus.
    this._resetActiveOption();
    // Move the tabindex to the currently-focused list item.
    this._keyManager.change.subscribe(activeItemIndex => this._setActiveOption(activeItemIndex));
    // If the active item is removed from the list, reset back to the first one.
    this._items.changes.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.takeUntil)(this._destroyed)).subscribe(() => {
      const activeItem = this._keyManager.activeItem;
      if (!activeItem || !this._items.toArray().indexOf(activeItem)) {
        this._resetActiveOption();
      }
    });
  }
  /**
   * Sets an option as active.
   * @param index Index of the active option. If set to -1, no option will be active.
   */
  _setActiveOption(index) {
    this._items.forEach((item, itemIndex) => item._setTabindex(itemIndex === index ? 0 : -1));
    this._keyManager.updateActiveItem(index);
  }
  /**
   * Resets the active option. When the list is disabled, remove all options from to the tab order.
   * Otherwise, focus the first selected option.
   */
  _resetActiveOption() {
    if (this.disabled) {
      this._setActiveOption(-1);
      return;
    }
    const activeItem = this._items.find(item => item.selected && !item.disabled) || this._items.first;
    this._setActiveOption(activeItem ? this._items.toArray().indexOf(activeItem) : -1);
  }
  /** Returns whether the focus is currently within the list. */
  _containsFocus() {
    const activeElement = (0,_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_5__._getFocusedElementPierceShadowDom)();
    return activeElement && this._element.nativeElement.contains(activeElement);
  }
}
MatSelectionList.ɵfac = function MatSelectionList_Factory(t) {
  return new (t || MatSelectionList)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone));
};
MatSelectionList.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: MatSelectionList,
  selectors: [["mat-selection-list"]],
  contentQueries: function MatSelectionList_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, MatListOption, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._items = _t);
    }
  },
  hostAttrs: ["role", "listbox", 1, "mat-mdc-selection-list", "mat-mdc-list-base", "mdc-list"],
  hostVars: 1,
  hostBindings: function MatSelectionList_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("keydown", function MatSelectionList_keydown_HostBindingHandler($event) {
        return ctx._handleKeydown($event);
      });
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("aria-multiselectable", ctx.multiple);
    }
  },
  inputs: {
    color: "color",
    compareWith: "compareWith",
    multiple: "multiple",
    hideSingleSelectionIndicator: "hideSingleSelectionIndicator",
    disabled: "disabled"
  },
  outputs: {
    selectionChange: "selectionChange"
  },
  exportAs: ["matSelectionList"],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([MAT_SELECTION_LIST_VALUE_ACCESSOR, {
    provide: MatListBase,
    useExisting: MatSelectionList
  }, {
    provide: SELECTION_LIST,
    useExisting: MatSelectionList
  }]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]],
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function MatSelectionList_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](0);
    }
  },
  styles: [_c1],
  encapsulation: 2,
  changeDetection: 0
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatSelectionList, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'mat-selection-list',
      exportAs: 'matSelectionList',
      host: {
        'class': 'mat-mdc-selection-list mat-mdc-list-base mdc-list',
        'role': 'listbox',
        '[attr.aria-multiselectable]': 'multiple',
        '(keydown)': '_handleKeydown($event)'
      },
      template: '<ng-content></ng-content>',
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,
      providers: [MAT_SELECTION_LIST_VALUE_ACCESSOR, {
        provide: MatListBase,
        useExisting: MatSelectionList
      }, {
        provide: SELECTION_LIST,
        useExisting: MatSelectionList
      }],
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush,
      styles: ["@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-list-divider::after{content:\"\";display:block;border-bottom-width:1px;border-bottom-style:solid}}.mdc-list{margin:0;padding:8px 0;list-style-type:none}.mdc-list:focus{outline:none}.mdc-list-item__wrapper{display:block}.mdc-list-item{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;align-items:stretch;cursor:pointer}.mdc-list-item:focus{outline:none}.mdc-list-item.mdc-list-item--with-one-line{height:48px}.mdc-list-item.mdc-list-item--with-two-lines{height:64px}.mdc-list-item.mdc-list-item--with-three-lines{height:88px}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__start{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--disabled,.mdc-list-item.mdc-list-item--non-interactive{cursor:auto}.mdc-list-item:not(.mdc-list-item--selected):focus::before,.mdc-list-item.mdc-ripple-upgraded--background-focused::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-list-item:not(.mdc-list-item--selected):focus::before,.mdc-list-item.mdc-ripple-upgraded--background-focused::before{border-color:CanvasText}}.mdc-list-item.mdc-list-item--selected::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:3px double rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-list-item.mdc-list-item--selected::before{border-color:CanvasText}}.mdc-list-item.mdc-list-item--selected:focus::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:3px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-list-item.mdc-list-item--selected:focus::before{border-color:CanvasText}}a.mdc-list-item{color:inherit;text-decoration:none}.mdc-list-item__start{fill:currentColor;flex-shrink:0;pointer-events:none}.mdc-list-item__end{flex-shrink:0;pointer-events:none}.mdc-list-item__content{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;align-self:center;flex:1;pointer-events:none}.mdc-list-item--with-two-lines .mdc-list-item__content,.mdc-list-item--with-three-lines .mdc-list-item__content{align-self:stretch}.mdc-list-item__content[for]{pointer-events:none}.mdc-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-three-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item__secondary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal}.mdc-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list-item--with-three-lines .mdc-list-item__secondary-text{white-space:normal;line-height:20px}.mdc-list-item--with-overline .mdc-list-item__secondary-text{white-space:nowrap;line-height:auto}.mdc-list-item__overline-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-three-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-three-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-three-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-avatar.mdc-list-item,.mdc-list-item--with-leading-avatar.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-avatar .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-avatar .mdc-list-item__start,.mdc-list-item--with-leading-avatar .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-avatar .mdc-list-item__start{border-radius:50%}.mdc-list-item--with-leading-icon.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-icon.mdc-list-item,.mdc-list-item--with-leading-icon.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-icon .mdc-list-item__start{margin-left:16px;margin-right:32px}[dir=rtl] .mdc-list-item--with-leading-icon .mdc-list-item__start,.mdc-list-item--with-leading-icon .mdc-list-item__start[dir=rtl]{margin-left:32px;margin-right:16px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-thumbnail.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-thumbnail.mdc-list-item,.mdc-list-item--with-leading-thumbnail.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-thumbnail .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-thumbnail .mdc-list-item__start,.mdc-list-item--with-leading-thumbnail .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-image.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-image.mdc-list-item,.mdc-list-item--with-leading-image.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-image .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-image .mdc-list-item__start,.mdc-list-item--with-leading-image .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-one-line{height:72px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-video.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-video.mdc-list-item,.mdc-list-item--with-leading-video.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-video .mdc-list-item__start{margin-left:0;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-video .mdc-list-item__start,.mdc-list-item--with-leading-video .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-one-line{height:72px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-checkbox.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-checkbox.mdc-list-item,.mdc-list-item--with-leading-checkbox.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-checkbox .mdc-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-list-item--with-leading-checkbox .mdc-list-item__start,.mdc-list-item--with-leading-checkbox .mdc-list-item__start[dir=rtl]{margin-left:24px;margin-right:8px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-radio.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-radio.mdc-list-item,.mdc-list-item--with-leading-radio.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-radio .mdc-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-list-item--with-leading-radio .mdc-list-item__start,.mdc-list-item--with-leading-radio .mdc-list-item__start[dir=rtl]{margin-left:24px;margin-right:8px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-switch.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-switch.mdc-list-item,.mdc-list-item--with-leading-switch.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-switch .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-switch .mdc-list-item__start,.mdc-list-item--with-leading-switch .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-trailing-icon.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-icon.mdc-list-item,.mdc-list-item--with-trailing-icon.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-icon .mdc-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-icon .mdc-list-item__end,.mdc-list-item--with-trailing-icon .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end{align-self:flex-start;margin-top:0}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:0}.mdc-list-item--with-trailing-meta.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-meta.mdc-list-item,.mdc-list-item--with-trailing-meta.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-meta .mdc-list-item__end{margin-left:28px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-meta .mdc-list-item__end,.mdc-list-item--with-trailing-meta .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:28px}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-trailing-meta .mdc-list-item__end{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--mdc-typography-caption-font-family);font-size:var(--mdc-typography-caption-font-size);line-height:var(--mdc-typography-caption-line-height);font-weight:var(--mdc-typography-caption-font-weight);letter-spacing:var(--mdc-typography-caption-letter-spacing);text-decoration:var(--mdc-typography-caption-text-decoration);text-transform:var(--mdc-typography-caption-text-transform)}.mdc-list-item--with-trailing-checkbox.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item,.mdc-list-item--with-trailing-checkbox.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-checkbox .mdc-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-list-item--with-trailing-checkbox .mdc-list-item__end,.mdc-list-item--with-trailing-checkbox .mdc-list-item__end[dir=rtl]{margin-left:8px;margin-right:24px}.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:8px}.mdc-list-item--with-trailing-radio.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item,.mdc-list-item--with-trailing-radio.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-radio .mdc-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-list-item--with-trailing-radio .mdc-list-item__end,.mdc-list-item--with-trailing-radio .mdc-list-item__end[dir=rtl]{margin-left:8px;margin-right:24px}.mdc-list-item--with-trailing-radio.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:8px}.mdc-list-item--with-trailing-switch.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-switch.mdc-list-item,.mdc-list-item--with-trailing-switch.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-switch .mdc-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-switch .mdc-list-item__end,.mdc-list-item--with-trailing-switch .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-trailing-switch.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:16px}.mdc-list-item--with-overline.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-overline.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list-item--with-overline.mdc-list-item--with-three-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-overline.mdc-list-item--with-three-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list-item{padding-left:16px;padding-right:16px}[dir=rtl] .mdc-list-item,.mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list-group .mdc-deprecated-list{padding:0}.mdc-list-group__subheader{margin:calc((3rem - 1.5rem)/2) 16px}.mdc-list-divider{padding:0;background-clip:content-box}.mdc-list-divider.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset{padding-left:16px;padding-right:auto}[dir=rtl] .mdc-list-divider.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset,.mdc-list-divider.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset[dir=rtl]{padding-left:auto;padding-right:16px}.mdc-list-divider.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset{padding-left:auto;padding-right:16px}[dir=rtl] .mdc-list-divider.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset,.mdc-list-divider.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset[dir=rtl]{padding-left:16px;padding-right:auto}.mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset{padding-left:0px;padding-right:auto}[dir=rtl] .mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset[dir=rtl]{padding-left:auto;padding-right:0px}[dir=rtl] .mdc-list-divider,.mdc-list-divider[dir=rtl]{padding:0}.mdc-list-item{background-color:var(--mdc-list-list-item-container-color)}.mdc-list-item.mdc-list-item--selected{background-color:var(--mdc-list-list-item-selected-container-color)}.mdc-list-item--with-one-line{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-one-line.mdc-list-item--with-leading-avatar,.mdc-list-item--with-one-line.mdc-list-item--with-leading-icon,.mdc-list-item--with-one-line.mdc-list-item--with-leading-thumbnail,.mdc-list-item--with-one-line.mdc-list-item--with-leading-checkbox,.mdc-list-item--with-one-line.mdc-list-item--with-leading-radio,.mdc-list-item--with-one-line.mdc-list-item--with-leading-switch{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-one-line.mdc-list-item--with-leading-image,.mdc-list-item--with-one-line.mdc-list-item--with-leading-video{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-two-lines{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-two-lines.mdc-list-item--with-leading-avatar,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-icon,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-thumbnail,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-checkbox,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-radio,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-switch,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-image,.mdc-list-item--with-two-lines.mdc-list-item--with-leading-video{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item--with-three-lines{border-radius:var(--mdc-list-list-item-container-shape)}.mdc-list-item.mdc-list-item--with-one-line{height:var(--mdc-list-list-item-one-line-container-height)}.mdc-list-item.mdc-list-item--with-two-lines{height:var(--mdc-list-list-item-two-line-container-height)}.mdc-list-item.mdc-list-item--with-three-lines{height:var(--mdc-list-list-item-three-line-container-height)}.mdc-list-item__primary-text{color:var(--mdc-list-list-item-label-text-color)}.mdc-list-item__primary-text{font-family:var(--mdc-list-list-item-label-text-font);line-height:var(--mdc-list-list-item-label-text-line-height);font-size:var(--mdc-list-list-item-label-text-size);font-weight:var(--mdc-list-list-item-label-text-weight);letter-spacing:var(--mdc-list-list-item-label-text-tracking)}.mdc-list-item__secondary-text{color:var(--mdc-list-list-item-supporting-text-color)}.mdc-list-item__secondary-text{font-family:var(--mdc-list-list-item-supporting-text-font);line-height:var(--mdc-list-list-item-supporting-text-line-height);font-size:var(--mdc-list-list-item-supporting-text-size);font-weight:var(--mdc-list-list-item-supporting-text-weight);letter-spacing:var(--mdc-list-list-item-supporting-text-tracking)}.mdc-list-item--with-leading-icon .mdc-list-item__start{color:var(--mdc-list-list-item-leading-icon-color)}.mdc-list-item--with-leading-icon .mdc-list-item__start{width:var(--mdc-list-list-item-leading-icon-size);height:var(--mdc-list-list-item-leading-icon-size)}.mdc-list-item--with-leading-icon .mdc-list-item__start>i{font-size:var(--mdc-list-list-item-leading-icon-size)}.mdc-list-item--with-leading-icon .mdc-list-item__start .mdc-list-item__icon{font-size:var(--mdc-list-list-item-leading-icon-size);width:var(--mdc-list-list-item-leading-icon-size);height:var(--mdc-list-list-item-leading-icon-size)}.mdc-list-item--with-leading-avatar .mdc-list-item__start{width:var(--mdc-list-list-item-leading-avatar-size);height:var(--mdc-list-list-item-leading-avatar-size)}.mdc-list-item.mdc-list-item--with-trailing-meta .mdc-list-item__end{color:var(--mdc-list-list-item-trailing-supporting-text-color)}.mdc-list-item--with-trailing-meta .mdc-list-item__end{font-family:var(--mdc-list-list-item-trailing-supporting-text-font);line-height:var(--mdc-list-list-item-trailing-supporting-text-line-height);font-size:var(--mdc-list-list-item-trailing-supporting-text-size);font-weight:var(--mdc-list-list-item-trailing-supporting-text-weight);letter-spacing:var(--mdc-list-list-item-trailing-supporting-text-tracking)}.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-trailing-icon-color)}.mdc-list-item--with-trailing-icon .mdc-list-item__end{width:var(--mdc-list-list-item-trailing-icon-size);height:var(--mdc-list-list-item-trailing-icon-size)}.mdc-list-item--with-trailing-icon .mdc-list-item__end>i{font-size:var(--mdc-list-list-item-trailing-icon-size)}.mdc-list-item--with-trailing-icon .mdc-list-item__end .mdc-list-item__icon{font-size:var(--mdc-list-list-item-trailing-icon-size);width:var(--mdc-list-list-item-trailing-icon-size);height:var(--mdc-list-list-item-trailing-icon-size)}.mdc-list-item--selected.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-selected-trailing-icon-color)}.mdc-list-item--disabled .mdc-list-item__start,.mdc-list-item--disabled .mdc-list-item__content,.mdc-list-item--disabled .mdc-list-item__end{opacity:1}.mdc-list-item--disabled .mdc-list-item__primary-text,.mdc-list-item--disabled .mdc-list-item__secondary-text,.mdc-list-item--disabled .mdc-list-item__overline-text{opacity:var(--mdc-list-list-item-disabled-label-text-opacity)}.mdc-list-item--disabled.mdc-list-item--with-leading-icon .mdc-list-item__start{color:var(--mdc-list-list-item-disabled-leading-icon-color)}.mdc-list-item--disabled.mdc-list-item--with-leading-icon .mdc-list-item__start{opacity:var(--mdc-list-list-item-disabled-leading-icon-opacity)}.mdc-list-item--disabled.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mdc-list-list-item-disabled-trailing-icon-color)}.mdc-list-item--disabled.mdc-list-item--with-trailing-icon .mdc-list-item__end{opacity:var(--mdc-list-list-item-disabled-trailing-icon-opacity)}.mdc-list-item:hover .mdc-list-item__primary-text{color:var(--mdc-list-list-item-hover-label-text-color)}.mdc-list-item--with-leading-icon:hover .mdc-list-item__start{color:var(--mdc-list-list-item-hover-leading-icon-color)}.mdc-list-item--with-trailing-icon:hover .mdc-list-item__end{color:var(--mdc-list-list-item-hover-trailing-icon-color)}.mdc-list-item:focus .mdc-list-item__primary-text{color:var(--mdc-list-list-item-focus-label-text-color)}.mdc-list-item.mdc-list-item--disabled .mdc-list-item__primary-text{color:var(--mdc-list-list-item-disabled-label-text-color)}.mdc-list-item:hover::before{background-color:var(--mdc-list-list-item-hover-state-layer-color);opacity:var(--mdc-list-list-item-hover-state-layer-opacity)}.mdc-list-item.mdc-list-item--disabled::before{background-color:var(--mdc-list-list-item-disabled-state-layer-color);opacity:var(--mdc-list-list-item-disabled-state-layer-opacity)}.mdc-list-item:focus::before{background-color:var(--mdc-list-list-item-focus-state-layer-color);opacity:var(--mdc-list-list-item-focus-state-layer-opacity)}.mdc-list-item--disabled .mdc-radio,.mdc-list-item--disabled .mdc-checkbox{opacity:var(--mdc-list-list-item-disabled-label-text-opacity)}.mdc-list-item--with-leading-avatar .mat-mdc-list-item-avatar{border-radius:var(--mdc-list-list-item-leading-avatar-shape);background-color:var(--mdc-list-list-item-leading-avatar-color)}.mat-mdc-list-base{--mdc-list-list-item-container-shape:0;--mdc-list-list-item-leading-avatar-shape:50%;--mdc-list-list-item-container-color:transparent;--mdc-list-list-item-selected-container-color:transparent;--mdc-list-list-item-leading-avatar-color:transparent;--mdc-list-list-item-leading-icon-size:24px;--mdc-list-list-item-leading-avatar-size:40px;--mdc-list-list-item-trailing-icon-size:24px;--mdc-list-list-item-disabled-state-layer-color:transparent;--mdc-list-list-item-disabled-state-layer-opacity:0;--mdc-list-list-item-disabled-label-text-opacity:0.38;--mdc-list-list-item-disabled-leading-icon-opacity:0.38;--mdc-list-list-item-disabled-trailing-icon-opacity:0.38}.cdk-high-contrast-active a.mdc-list-item--activated::after{content:\"\";position:absolute;top:50%;right:16px;transform:translateY(-50%);width:10px;height:0;border-bottom:solid 10px;border-radius:10px}.cdk-high-contrast-active a.mdc-list-item--activated [dir=rtl]::after{right:auto;left:16px}.mat-mdc-list-base{display:block}.mat-mdc-list-base .mdc-list-item__start,.mat-mdc-list-base .mdc-list-item__end,.mat-mdc-list-base .mdc-list-item__content{pointer-events:auto}.mat-mdc-list-item,.mat-mdc-list-option{width:100%;box-sizing:border-box;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-list-item:not(.mat-mdc-list-item-interactive),.mat-mdc-list-option:not(.mat-mdc-list-item-interactive){cursor:default}.mat-mdc-list-item .mat-divider-inset,.mat-mdc-list-option .mat-divider-inset{position:absolute;left:0;right:0;bottom:0}.mat-mdc-list-item .mat-mdc-list-item-avatar~.mat-divider-inset,.mat-mdc-list-option .mat-mdc-list-item-avatar~.mat-divider-inset{margin-left:72px}[dir=rtl] .mat-mdc-list-item .mat-mdc-list-item-avatar~.mat-divider-inset,[dir=rtl] .mat-mdc-list-option .mat-mdc-list-item-avatar~.mat-divider-inset{margin-right:72px}.mat-mdc-list-item-interactive::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";opacity:0;pointer-events:none}.mat-mdc-list-item>.mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-mdc-list-item:focus>.mat-mdc-focus-indicator::before{content:\"\"}.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-line.mdc-list-item__secondary-text{white-space:nowrap;line-height:normal}.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-unscoped-content.mdc-list-item__secondary-text{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}mat-action-list button{background:none;color:inherit;border:none;font:inherit;outline:inherit;-webkit-tap-highlight-color:rgba(0,0,0,0);text-align:left}[dir=rtl] mat-action-list button{text-align:right}mat-action-list button::-moz-focus-inner{border:0}"]
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone
    }];
  }, {
    _items: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChildren,
      args: [MatListOption, {
        descendants: true
      }]
    }],
    selectionChange: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    color: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    compareWith: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    multiple: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    hideSingleSelectionIndicator: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    disabled: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }]
  });
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class MatListModule {}
MatListModule.ɵfac = function MatListModule_Factory(t) {
  return new (t || MatListModule)();
};
MatListModule.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: MatListModule
});
MatListModule.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_cdk_observers__WEBPACK_IMPORTED_MODULE_6__.ObserversModule, _angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_3__.MatCommonModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_3__.MatRippleModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_3__.MatPseudoCheckboxModule, _angular_material_divider__WEBPACK_IMPORTED_MODULE_14__.MatDividerModule]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatListModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgModule,
    args: [{
      imports: [_angular_cdk_observers__WEBPACK_IMPORTED_MODULE_6__.ObserversModule, _angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_3__.MatCommonModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_3__.MatRippleModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_3__.MatPseudoCheckboxModule],
      exports: [MatList, MatActionList, MatNavList, MatSelectionList, MatListItem, MatListOption, MatListItemAvatar, MatListItemIcon, MatListSubheaderCssMatStyler, _angular_material_divider__WEBPACK_IMPORTED_MODULE_14__.MatDividerModule, MatListItemLine, MatListItemTitle, MatListItemMeta],
      declarations: [MatList, MatActionList, MatNavList, MatSelectionList, MatListItem, MatListOption, MatListSubheaderCssMatStyler, MatListItemAvatar, MatListItemIcon, MatListItemLine, MatListItemTitle, MatListItemMeta]
    }]
  }], null, null);
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Generated bundle index. Do not edit.
 */


//# sourceMappingURL=list.mjs.map

/***/ }),

/***/ 17009:
/*!***************************************************************!*\
  !*** ./node_modules/@angular/material/fesm2020/snack-bar.mjs ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MAT_SNACK_BAR_DATA": () => (/* binding */ MAT_SNACK_BAR_DATA),
/* harmony export */   "MAT_SNACK_BAR_DEFAULT_OPTIONS": () => (/* binding */ MAT_SNACK_BAR_DEFAULT_OPTIONS),
/* harmony export */   "MAT_SNACK_BAR_DEFAULT_OPTIONS_FACTORY": () => (/* binding */ MAT_SNACK_BAR_DEFAULT_OPTIONS_FACTORY),
/* harmony export */   "MatSnackBar": () => (/* binding */ MatSnackBar),
/* harmony export */   "MatSnackBarAction": () => (/* binding */ MatSnackBarAction),
/* harmony export */   "MatSnackBarActions": () => (/* binding */ MatSnackBarActions),
/* harmony export */   "MatSnackBarConfig": () => (/* binding */ MatSnackBarConfig),
/* harmony export */   "MatSnackBarContainer": () => (/* binding */ MatSnackBarContainer),
/* harmony export */   "MatSnackBarLabel": () => (/* binding */ MatSnackBarLabel),
/* harmony export */   "MatSnackBarModule": () => (/* binding */ MatSnackBarModule),
/* harmony export */   "MatSnackBarRef": () => (/* binding */ MatSnackBarRef),
/* harmony export */   "SimpleSnackBar": () => (/* binding */ SimpleSnackBar),
/* harmony export */   "_MatSnackBarBase": () => (/* binding */ _MatSnackBarBase),
/* harmony export */   "_MatSnackBarContainerBase": () => (/* binding */ _MatSnackBarContainerBase),
/* harmony export */   "matSnackBarAnimations": () => (/* binding */ matSnackBarAnimations)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/animations */ 837340);
/* harmony import */ var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/portal */ 984080);
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/platform */ 383353);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 895698);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ 782722);
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/cdk/a11y */ 212687);
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/cdk/layout */ 662289);
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/cdk/overlay */ 598184);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/core */ 447873);



















/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Maximum amount of milliseconds that can be passed into setTimeout. */
function SimpleSnackBar_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 2)(1, "button", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SimpleSnackBar_div_2_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r1.action());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r0.data.action, " ");
  }
}
const _c0 = ["label"];
function MatSnackBarContainer_ng_template_4_Template(rf, ctx) {}
const MAX_TIMEOUT = Math.pow(2, 31) - 1;
/**
 * Reference to a snack bar dispatched from the snack bar service.
 */
class MatSnackBarRef {
  constructor(containerInstance, _overlayRef) {
    this._overlayRef = _overlayRef;
    /** Subject for notifying the user that the snack bar has been dismissed. */
    this._afterDismissed = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
    /** Subject for notifying the user that the snack bar has opened and appeared. */
    this._afterOpened = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
    /** Subject for notifying the user that the snack bar action was called. */
    this._onAction = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
    /** Whether the snack bar was dismissed using the action button. */
    this._dismissedByAction = false;
    this.containerInstance = containerInstance;
    containerInstance._onExit.subscribe(() => this._finishDismiss());
  }
  /** Dismisses the snack bar. */
  dismiss() {
    if (!this._afterDismissed.closed) {
      this.containerInstance.exit();
    }
    clearTimeout(this._durationTimeoutId);
  }
  /** Marks the snackbar action clicked. */
  dismissWithAction() {
    if (!this._onAction.closed) {
      this._dismissedByAction = true;
      this._onAction.next();
      this._onAction.complete();
      this.dismiss();
    }
    clearTimeout(this._durationTimeoutId);
  }
  /**
   * Marks the snackbar action clicked.
   * @deprecated Use `dismissWithAction` instead.
   * @breaking-change 8.0.0
   */
  closeWithAction() {
    this.dismissWithAction();
  }
  /** Dismisses the snack bar after some duration */
  _dismissAfter(duration) {
    // Note that we need to cap the duration to the maximum value for setTimeout, because
    // it'll revert to 1 if somebody passes in something greater (e.g. `Infinity`). See #17234.
    this._durationTimeoutId = setTimeout(() => this.dismiss(), Math.min(duration, MAX_TIMEOUT));
  }
  /** Marks the snackbar as opened */
  _open() {
    if (!this._afterOpened.closed) {
      this._afterOpened.next();
      this._afterOpened.complete();
    }
  }
  /** Cleans up the DOM after closing. */
  _finishDismiss() {
    this._overlayRef.dispose();
    if (!this._onAction.closed) {
      this._onAction.complete();
    }
    this._afterDismissed.next({
      dismissedByAction: this._dismissedByAction
    });
    this._afterDismissed.complete();
    this._dismissedByAction = false;
  }
  /** Gets an observable that is notified when the snack bar is finished closing. */
  afterDismissed() {
    return this._afterDismissed;
  }
  /** Gets an observable that is notified when the snack bar has opened and appeared. */
  afterOpened() {
    return this.containerInstance._onEnter;
  }
  /** Gets an observable that is notified when the snack bar action is called. */
  onAction() {
    return this._onAction;
  }
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Injection token that can be used to access the data that was passed in to a snack bar. */
const MAT_SNACK_BAR_DATA = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('MatSnackBarData');
/**
 * Configuration used when opening a snack-bar.
 */
class MatSnackBarConfig {
  constructor() {
    /** The politeness level for the MatAriaLiveAnnouncer announcement. */
    this.politeness = 'assertive';
    /**
     * Message to be announced by the LiveAnnouncer. When opening a snackbar without a custom
     * component or template, the announcement message will default to the specified message.
     */
    this.announcementMessage = '';
    /** The length of time in milliseconds to wait before automatically dismissing the snack bar. */
    this.duration = 0;
    /** Data being injected into the child component. */
    this.data = null;
    /** The horizontal position to place the snack bar. */
    this.horizontalPosition = 'center';
    /** The vertical position to place the snack bar. */
    this.verticalPosition = 'bottom';
  }
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Directive that should be applied to the text element to be rendered in the snack bar. */
class MatSnackBarLabel {}
MatSnackBarLabel.ɵfac = function MatSnackBarLabel_Factory(t) {
  return new (t || MatSnackBarLabel)();
};
MatSnackBarLabel.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: MatSnackBarLabel,
  selectors: [["", "matSnackBarLabel", ""]],
  hostAttrs: [1, "mat-mdc-snack-bar-label", "mdc-snackbar__label"]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatSnackBarLabel, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: `[matSnackBarLabel]`,
      host: {
        'class': 'mat-mdc-snack-bar-label mdc-snackbar__label'
      }
    }]
  }], null, null);
})();
/** Directive that should be applied to the element containing the snack bar's action buttons. */
class MatSnackBarActions {}
MatSnackBarActions.ɵfac = function MatSnackBarActions_Factory(t) {
  return new (t || MatSnackBarActions)();
};
MatSnackBarActions.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: MatSnackBarActions,
  selectors: [["", "matSnackBarActions", ""]],
  hostAttrs: [1, "mat-mdc-snack-bar-actions", "mdc-snackbar__actions"]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatSnackBarActions, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: `[matSnackBarActions]`,
      host: {
        'class': 'mat-mdc-snack-bar-actions mdc-snackbar__actions'
      }
    }]
  }], null, null);
})();
/** Directive that should be applied to each of the snack bar's action buttons. */
class MatSnackBarAction {}
MatSnackBarAction.ɵfac = function MatSnackBarAction_Factory(t) {
  return new (t || MatSnackBarAction)();
};
MatSnackBarAction.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: MatSnackBarAction,
  selectors: [["", "matSnackBarAction", ""]],
  hostAttrs: [1, "mat-mdc-snack-bar-action", "mdc-snackbar__action"]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatSnackBarAction, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: `[matSnackBarAction]`,
      host: {
        'class': 'mat-mdc-snack-bar-action mdc-snackbar__action'
      }
    }]
  }], null, null);
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class SimpleSnackBar {
  constructor(snackBarRef, data) {
    this.snackBarRef = snackBarRef;
    this.data = data;
  }
  /** Performs the action on the snack bar. */
  action() {
    this.snackBarRef.dismissWithAction();
  }
  /** If the action button should be shown. */
  get hasAction() {
    return !!this.data.action;
  }
}
SimpleSnackBar.ɵfac = function SimpleSnackBar_Factory(t) {
  return new (t || SimpleSnackBar)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](MatSnackBarRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](MAT_SNACK_BAR_DATA));
};
SimpleSnackBar.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: SimpleSnackBar,
  selectors: [["simple-snack-bar"]],
  hostAttrs: [1, "mat-mdc-simple-snack-bar"],
  exportAs: ["matSnackBar"],
  decls: 3,
  vars: 2,
  consts: [["matSnackBarLabel", ""], ["matSnackBarActions", "", 4, "ngIf"], ["matSnackBarActions", ""], ["mat-button", "", "matSnackBarAction", "", 3, "click"]],
  template: function SimpleSnackBar_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, SimpleSnackBar_div_2_Template, 3, 1, "div", 1);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.data.message, "\n");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.hasAction);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _angular_material_button__WEBPACK_IMPORTED_MODULE_3__.MatButton, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction],
  styles: [".mat-mdc-simple-snack-bar{display:flex}"],
  encapsulation: 2,
  changeDetection: 0
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SimpleSnackBar, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'simple-snack-bar',
      exportAs: 'matSnackBar',
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush,
      host: {
        'class': 'mat-mdc-simple-snack-bar'
      },
      template: "<div matSnackBarLabel>\n  {{data.message}}\n</div>\n\n<div matSnackBarActions *ngIf=\"hasAction\">\n  <button mat-button matSnackBarAction (click)=\"action()\">\n    {{data.action}}\n  </button>\n</div>\n",
      styles: [".mat-mdc-simple-snack-bar{display:flex}"]
    }]
  }], function () {
    return [{
      type: MatSnackBarRef
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [MAT_SNACK_BAR_DATA]
      }]
    }];
  }, null);
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Animations used by the Material snack bar.
 * @docs-private
 */
const matSnackBarAnimations = {
  /** Animation that shows and hides a snack bar. */
  snackBarState: (0,_angular_animations__WEBPACK_IMPORTED_MODULE_4__.trigger)('state', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_4__.state)('void, hidden', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_4__.style)({
    transform: 'scale(0.8)',
    opacity: 0
  })), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_4__.state)('visible', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_4__.style)({
    transform: 'scale(1)',
    opacity: 1
  })), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_4__.transition)('* => visible', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_4__.animate)('150ms cubic-bezier(0, 0, 0.2, 1)')), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_4__.transition)('* => void, * => hidden', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_4__.animate)('75ms cubic-bezier(0.4, 0.0, 1, 1)', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_4__.style)({
    opacity: 0
  })))])
};

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
let uniqueId = 0;
/**
 * Base class for snack bar containers.
 * @docs-private
 */
class _MatSnackBarContainerBase extends _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_5__.BasePortalOutlet {
  constructor(_ngZone, _elementRef, _changeDetectorRef, _platform, /** The snack bar configuration. */
  snackBarConfig) {
    super();
    this._ngZone = _ngZone;
    this._elementRef = _elementRef;
    this._changeDetectorRef = _changeDetectorRef;
    this._platform = _platform;
    this.snackBarConfig = snackBarConfig;
    this._document = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_common__WEBPACK_IMPORTED_MODULE_2__.DOCUMENT);
    this._trackedModals = new Set();
    /** The number of milliseconds to wait before announcing the snack bar's content. */
    this._announceDelay = 150;
    /** Whether the component has been destroyed. */
    this._destroyed = false;
    /** Subject for notifying that the snack bar has announced to screen readers. */
    this._onAnnounce = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
    /** Subject for notifying that the snack bar has exited from view. */
    this._onExit = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
    /** Subject for notifying that the snack bar has finished entering the view. */
    this._onEnter = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
    /** The state of the snack bar animations. */
    this._animationState = 'void';
    /** Unique ID of the aria-live element. */
    this._liveElementId = `mat-snack-bar-container-live-${uniqueId++}`;
    /**
     * Attaches a DOM portal to the snack bar container.
     * @deprecated To be turned into a method.
     * @breaking-change 10.0.0
     */
    this.attachDomPortal = portal => {
      this._assertNotAttached();
      const result = this._portalOutlet.attachDomPortal(portal);
      this._afterPortalAttached();
      return result;
    };
    // Use aria-live rather than a live role like 'alert' or 'status'
    // because NVDA and JAWS have show inconsistent behavior with live roles.
    if (snackBarConfig.politeness === 'assertive' && !snackBarConfig.announcementMessage) {
      this._live = 'assertive';
    } else if (snackBarConfig.politeness === 'off') {
      this._live = 'off';
    } else {
      this._live = 'polite';
    }
    // Only set role for Firefox. Set role based on aria-live because setting role="alert" implies
    // aria-live="assertive" which may cause issues if aria-live is set to "polite" above.
    if (this._platform.FIREFOX) {
      if (this._live === 'polite') {
        this._role = 'status';
      }
      if (this._live === 'assertive') {
        this._role = 'alert';
      }
    }
  }
  /** Attach a component portal as content to this snack bar container. */
  attachComponentPortal(portal) {
    this._assertNotAttached();
    const result = this._portalOutlet.attachComponentPortal(portal);
    this._afterPortalAttached();
    return result;
  }
  /** Attach a template portal as content to this snack bar container. */
  attachTemplatePortal(portal) {
    this._assertNotAttached();
    const result = this._portalOutlet.attachTemplatePortal(portal);
    this._afterPortalAttached();
    return result;
  }
  /** Handle end of animations, updating the state of the snackbar. */
  onAnimationEnd(event) {
    const {
      fromState,
      toState
    } = event;
    if (toState === 'void' && fromState !== 'void' || toState === 'hidden') {
      this._completeExit();
    }
    if (toState === 'visible') {
      // Note: we shouldn't use `this` inside the zone callback,
      // because it can cause a memory leak.
      const onEnter = this._onEnter;
      this._ngZone.run(() => {
        onEnter.next();
        onEnter.complete();
      });
    }
  }
  /** Begin animation of snack bar entrance into view. */
  enter() {
    if (!this._destroyed) {
      this._animationState = 'visible';
      this._changeDetectorRef.detectChanges();
      this._screenReaderAnnounce();
    }
  }
  /** Begin animation of the snack bar exiting from view. */
  exit() {
    // It's common for snack bars to be opened by random outside calls like HTTP requests or
    // errors. Run inside the NgZone to ensure that it functions correctly.
    this._ngZone.run(() => {
      // Note: this one transitions to `hidden`, rather than `void`, in order to handle the case
      // where multiple snack bars are opened in quick succession (e.g. two consecutive calls to
      // `MatSnackBar.open`).
      this._animationState = 'hidden';
      // Mark this element with an 'exit' attribute to indicate that the snackbar has
      // been dismissed and will soon be removed from the DOM. This is used by the snackbar
      // test harness.
      this._elementRef.nativeElement.setAttribute('mat-exit', '');
      // If the snack bar hasn't been announced by the time it exits it wouldn't have been open
      // long enough to visually read it either, so clear the timeout for announcing.
      clearTimeout(this._announceTimeoutId);
    });
    return this._onExit;
  }
  /** Makes sure the exit callbacks have been invoked when the element is destroyed. */
  ngOnDestroy() {
    this._destroyed = true;
    this._clearFromModals();
    this._completeExit();
  }
  /**
   * Waits for the zone to settle before removing the element. Helps prevent
   * errors where we end up removing an element which is in the middle of an animation.
   */
  _completeExit() {
    this._ngZone.onMicrotaskEmpty.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.take)(1)).subscribe(() => {
      this._ngZone.run(() => {
        this._onExit.next();
        this._onExit.complete();
      });
    });
  }
  /**
   * Called after the portal contents have been attached. Can be
   * used to modify the DOM once it's guaranteed to be in place.
   */
  _afterPortalAttached() {
    const element = this._elementRef.nativeElement;
    const panelClasses = this.snackBarConfig.panelClass;
    if (panelClasses) {
      if (Array.isArray(panelClasses)) {
        // Note that we can't use a spread here, because IE doesn't support multiple arguments.
        panelClasses.forEach(cssClass => element.classList.add(cssClass));
      } else {
        element.classList.add(panelClasses);
      }
    }
    this._exposeToModals();
  }
  /**
   * Some browsers won't expose the accessibility node of the live element if there is an
   * `aria-modal` and the live element is outside of it. This method works around the issue by
   * pointing the `aria-owns` of all modals to the live element.
   */
  _exposeToModals() {
    // TODO(crisbeto): consider de-duplicating this with the `LiveAnnouncer`.
    // Note that the selector here is limited to CDK overlays at the moment in order to reduce the
    // section of the DOM we need to look through. This should cover all the cases we support, but
    // the selector can be expanded if it turns out to be too narrow.
    const id = this._liveElementId;
    const modals = this._document.querySelectorAll('body > .cdk-overlay-container [aria-modal="true"]');
    for (let i = 0; i < modals.length; i++) {
      const modal = modals[i];
      const ariaOwns = modal.getAttribute('aria-owns');
      this._trackedModals.add(modal);
      if (!ariaOwns) {
        modal.setAttribute('aria-owns', id);
      } else if (ariaOwns.indexOf(id) === -1) {
        modal.setAttribute('aria-owns', ariaOwns + ' ' + id);
      }
    }
  }
  /** Clears the references to the live element from any modals it was added to. */
  _clearFromModals() {
    this._trackedModals.forEach(modal => {
      const ariaOwns = modal.getAttribute('aria-owns');
      if (ariaOwns) {
        const newValue = ariaOwns.replace(this._liveElementId, '').trim();
        if (newValue.length > 0) {
          modal.setAttribute('aria-owns', newValue);
        } else {
          modal.removeAttribute('aria-owns');
        }
      }
    });
    this._trackedModals.clear();
  }
  /** Asserts that no content is already attached to the container. */
  _assertNotAttached() {
    if (this._portalOutlet.hasAttached() && (typeof ngDevMode === 'undefined' || ngDevMode)) {
      throw Error('Attempting to attach snack bar content after content is already attached');
    }
  }
  /**
   * Starts a timeout to move the snack bar content to the live region so screen readers will
   * announce it.
   */
  _screenReaderAnnounce() {
    if (!this._announceTimeoutId) {
      this._ngZone.runOutsideAngular(() => {
        this._announceTimeoutId = setTimeout(() => {
          const inertElement = this._elementRef.nativeElement.querySelector('[aria-hidden]');
          const liveElement = this._elementRef.nativeElement.querySelector('[aria-live]');
          if (inertElement && liveElement) {
            // If an element in the snack bar content is focused before being moved
            // track it and restore focus after moving to the live region.
            let focusedElement = null;
            if (this._platform.isBrowser && document.activeElement instanceof HTMLElement && inertElement.contains(document.activeElement)) {
              focusedElement = document.activeElement;
            }
            inertElement.removeAttribute('aria-hidden');
            liveElement.appendChild(inertElement);
            focusedElement?.focus();
            this._onAnnounce.next();
            this._onAnnounce.complete();
          }
        }, this._announceDelay);
      });
    }
  }
}
_MatSnackBarContainerBase.ɵfac = function _MatSnackBarContainerBase_Factory(t) {
  return new (t || _MatSnackBarContainerBase)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_7__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](MatSnackBarConfig));
};
_MatSnackBarContainerBase.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: _MatSnackBarContainerBase,
  viewQuery: function _MatSnackBarContainerBase_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_angular_cdk_portal__WEBPACK_IMPORTED_MODULE_5__.CdkPortalOutlet, 7);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._portalOutlet = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](_MatSnackBarContainerBase, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef
    }, {
      type: _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_7__.Platform
    }, {
      type: MatSnackBarConfig
    }];
  }, {
    _portalOutlet: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChild,
      args: [_angular_cdk_portal__WEBPACK_IMPORTED_MODULE_5__.CdkPortalOutlet, {
        static: true
      }]
    }]
  });
})();
/**
 * Internal component that wraps user-provided snack bar content.
 * @docs-private
 */
class MatSnackBarContainer extends _MatSnackBarContainerBase {
  /** Applies the correct CSS class to the label based on its content. */
  _afterPortalAttached() {
    super._afterPortalAttached();
    // Check to see if the attached component or template uses the MDC template structure,
    // specifically the MDC label. If not, the container should apply the MDC label class to this
    // component's label container, which will apply MDC's label styles to the attached view.
    const label = this._label.nativeElement;
    const labelClass = 'mdc-snackbar__label';
    label.classList.toggle(labelClass, !label.querySelector(`.${labelClass}`));
  }
}
MatSnackBarContainer.ɵfac = /* @__PURE__ */function () {
  let ɵMatSnackBarContainer_BaseFactory;
  return function MatSnackBarContainer_Factory(t) {
    return (ɵMatSnackBarContainer_BaseFactory || (ɵMatSnackBarContainer_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](MatSnackBarContainer)))(t || MatSnackBarContainer);
  };
}();
MatSnackBarContainer.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: MatSnackBarContainer,
  selectors: [["mat-snack-bar-container"]],
  viewQuery: function MatSnackBarContainer_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 7);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._label = _t.first);
    }
  },
  hostAttrs: [1, "mdc-snackbar", "mat-mdc-snack-bar-container", "mdc-snackbar--open"],
  hostVars: 1,
  hostBindings: function MatSnackBarContainer_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsyntheticHostListener"]("@state.done", function MatSnackBarContainer_animation_state_done_HostBindingHandler($event) {
        return ctx.onAnimationEnd($event);
      });
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsyntheticHostProperty"]("@state", ctx._animationState);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]],
  decls: 6,
  vars: 3,
  consts: [[1, "mdc-snackbar__surface"], [1, "mat-mdc-snack-bar-label"], ["label", ""], ["aria-hidden", "true"], ["cdkPortalOutlet", ""]],
  template: function MatSnackBarContainer_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1, 2)(3, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, MatSnackBarContainer_ng_template_4_Template, 0, 0, "ng-template", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("aria-live", ctx._live)("role", ctx._role)("id", ctx._liveElementId);
    }
  },
  dependencies: [_angular_cdk_portal__WEBPACK_IMPORTED_MODULE_5__.CdkPortalOutlet],
  styles: [".mdc-snackbar{display:none;position:fixed;right:0;bottom:0;left:0;align-items:center;justify-content:center;box-sizing:border-box;pointer-events:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-snackbar--opening,.mdc-snackbar--open,.mdc-snackbar--closing{display:flex}.mdc-snackbar--open .mdc-snackbar__label,.mdc-snackbar--open .mdc-snackbar__actions{visibility:visible}.mdc-snackbar__surface{padding-left:0;padding-right:8px;display:flex;align-items:center;justify-content:flex-start;box-sizing:border-box;transform:scale(0.8);opacity:0}.mdc-snackbar__surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-snackbar__surface::before{border-color:CanvasText}}[dir=rtl] .mdc-snackbar__surface,.mdc-snackbar__surface[dir=rtl]{padding-left:8px;padding-right:0}.mdc-snackbar--open .mdc-snackbar__surface{transform:scale(1);opacity:1;pointer-events:auto}.mdc-snackbar--closing .mdc-snackbar__surface{transform:scale(1)}.mdc-snackbar__label{padding-left:16px;padding-right:8px;width:100%;flex-grow:1;box-sizing:border-box;margin:0;visibility:hidden;padding-top:14px;padding-bottom:14px}[dir=rtl] .mdc-snackbar__label,.mdc-snackbar__label[dir=rtl]{padding-left:8px;padding-right:16px}.mdc-snackbar__label::before{display:inline;content:attr(data-mdc-snackbar-label-text)}.mdc-snackbar__actions{display:flex;flex-shrink:0;align-items:center;box-sizing:border-box;visibility:hidden}.mdc-snackbar__action+.mdc-snackbar__dismiss{margin-left:8px;margin-right:0}[dir=rtl] .mdc-snackbar__action+.mdc-snackbar__dismiss,.mdc-snackbar__action+.mdc-snackbar__dismiss[dir=rtl]{margin-left:0;margin-right:8px}.mat-mdc-snack-bar-container{margin:8px;position:static}.mat-mdc-snack-bar-container .mdc-snackbar__surface{min-width:344px}@media(max-width: 480px),(max-width: 344px){.mat-mdc-snack-bar-container .mdc-snackbar__surface{min-width:100%}}@media(max-width: 480px),(max-width: 344px){.mat-mdc-snack-bar-container{width:100vw}}.mat-mdc-snack-bar-container .mdc-snackbar__surface{max-width:672px}.mat-mdc-snack-bar-container .mdc-snackbar__surface{box-shadow:0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)}.mat-mdc-snack-bar-container .mdc-snackbar__dismiss .mdc-button__icon{font-size:var(--mdc-icon-button-icon-size, var(--mdc-snackbar-icon-size, 24px))}.mat-mdc-snack-bar-container .mdc-snackbar__dismiss svg,.mat-mdc-snack-bar-container .mdc-snackbar__dismiss img{width:var(--mdc-icon-button-icon-size, var(--mdc-snackbar-icon-size, 24px));height:var(--mdc-icon-button-icon-size, var(--mdc-snackbar-icon-size, 24px))}.mat-mdc-snack-bar-container .mdc-snackbar__surface{background-color:var(--mdc-snackbar-container-color, inherit)}.mat-mdc-snack-bar-container .mdc-snackbar__surface{border-radius:var(--mdc-snackbar-container-shape, var(--mdc-shape-small, 4px))}.mat-mdc-snack-bar-container .mdc-snackbar__label{color:var(--mdc-snackbar-supporting-text-color, inherit)}.mat-mdc-snack-bar-container .mdc-snackbar__label{font-size:var(--mdc-snackbar-supporting-text-size, inherit);font-family:var(--mdc-snackbar-supporting-text-font, inherit);font-weight:var(--mdc-snackbar-supporting-text-weight, inherit);line-height:var(--mdc-snackbar-supporting-text-line-height, inherit)}.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled){color:var(--mat-mdc-snack-bar-button-color, transparent);--mat-mdc-button-persistent-ripple-color: currentColor}.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled) .mat-ripple-element{background-color:currentColor;opacity:.1}.mat-mdc-snack-bar-container .mdc-snackbar__label::before{display:none}.mat-mdc-snack-bar-handset,.mat-mdc-snack-bar-container,.mat-mdc-snack-bar-label{flex:1 1 auto}.mat-mdc-snack-bar-handset .mdc-snackbar__surface{width:100%}"],
  encapsulation: 2,
  data: {
    animation: [matSnackBarAnimations.snackBarState]
  }
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatSnackBarContainer, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'mat-snack-bar-container',
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.Default,
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,
      animations: [matSnackBarAnimations.snackBarState],
      host: {
        'class': 'mdc-snackbar mat-mdc-snack-bar-container mdc-snackbar--open',
        '[@state]': '_animationState',
        '(@state.done)': 'onAnimationEnd($event)'
      },
      template: "<div class=\"mdc-snackbar__surface\">\n  <!--\n    This outer label wrapper will have the class `mdc-snackbar__label` applied if\n    the attached template/component does not contain it.\n  -->\n  <div class=\"mat-mdc-snack-bar-label\" #label>\n    <!-- Initialy holds the snack bar content, will be empty after announcing to screen readers. -->\n    <div aria-hidden=\"true\">\n      <ng-template cdkPortalOutlet></ng-template>\n    </div>\n\n    <!-- Will receive the snack bar content from the non-live div, move will happen a short delay after opening -->\n    <div [attr.aria-live]=\"_live\" [attr.role]=\"_role\" [attr.id]=\"_liveElementId\"></div>\n  </div>\n</div>\n",
      styles: [".mdc-snackbar{display:none;position:fixed;right:0;bottom:0;left:0;align-items:center;justify-content:center;box-sizing:border-box;pointer-events:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-snackbar--opening,.mdc-snackbar--open,.mdc-snackbar--closing{display:flex}.mdc-snackbar--open .mdc-snackbar__label,.mdc-snackbar--open .mdc-snackbar__actions{visibility:visible}.mdc-snackbar__surface{padding-left:0;padding-right:8px;display:flex;align-items:center;justify-content:flex-start;box-sizing:border-box;transform:scale(0.8);opacity:0}.mdc-snackbar__surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-snackbar__surface::before{border-color:CanvasText}}[dir=rtl] .mdc-snackbar__surface,.mdc-snackbar__surface[dir=rtl]{padding-left:8px;padding-right:0}.mdc-snackbar--open .mdc-snackbar__surface{transform:scale(1);opacity:1;pointer-events:auto}.mdc-snackbar--closing .mdc-snackbar__surface{transform:scale(1)}.mdc-snackbar__label{padding-left:16px;padding-right:8px;width:100%;flex-grow:1;box-sizing:border-box;margin:0;visibility:hidden;padding-top:14px;padding-bottom:14px}[dir=rtl] .mdc-snackbar__label,.mdc-snackbar__label[dir=rtl]{padding-left:8px;padding-right:16px}.mdc-snackbar__label::before{display:inline;content:attr(data-mdc-snackbar-label-text)}.mdc-snackbar__actions{display:flex;flex-shrink:0;align-items:center;box-sizing:border-box;visibility:hidden}.mdc-snackbar__action+.mdc-snackbar__dismiss{margin-left:8px;margin-right:0}[dir=rtl] .mdc-snackbar__action+.mdc-snackbar__dismiss,.mdc-snackbar__action+.mdc-snackbar__dismiss[dir=rtl]{margin-left:0;margin-right:8px}.mat-mdc-snack-bar-container{margin:8px;position:static}.mat-mdc-snack-bar-container .mdc-snackbar__surface{min-width:344px}@media(max-width: 480px),(max-width: 344px){.mat-mdc-snack-bar-container .mdc-snackbar__surface{min-width:100%}}@media(max-width: 480px),(max-width: 344px){.mat-mdc-snack-bar-container{width:100vw}}.mat-mdc-snack-bar-container .mdc-snackbar__surface{max-width:672px}.mat-mdc-snack-bar-container .mdc-snackbar__surface{box-shadow:0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)}.mat-mdc-snack-bar-container .mdc-snackbar__dismiss .mdc-button__icon{font-size:var(--mdc-icon-button-icon-size, var(--mdc-snackbar-icon-size, 24px))}.mat-mdc-snack-bar-container .mdc-snackbar__dismiss svg,.mat-mdc-snack-bar-container .mdc-snackbar__dismiss img{width:var(--mdc-icon-button-icon-size, var(--mdc-snackbar-icon-size, 24px));height:var(--mdc-icon-button-icon-size, var(--mdc-snackbar-icon-size, 24px))}.mat-mdc-snack-bar-container .mdc-snackbar__surface{background-color:var(--mdc-snackbar-container-color, inherit)}.mat-mdc-snack-bar-container .mdc-snackbar__surface{border-radius:var(--mdc-snackbar-container-shape, var(--mdc-shape-small, 4px))}.mat-mdc-snack-bar-container .mdc-snackbar__label{color:var(--mdc-snackbar-supporting-text-color, inherit)}.mat-mdc-snack-bar-container .mdc-snackbar__label{font-size:var(--mdc-snackbar-supporting-text-size, inherit);font-family:var(--mdc-snackbar-supporting-text-font, inherit);font-weight:var(--mdc-snackbar-supporting-text-weight, inherit);line-height:var(--mdc-snackbar-supporting-text-line-height, inherit)}.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled){color:var(--mat-mdc-snack-bar-button-color, transparent);--mat-mdc-button-persistent-ripple-color: currentColor}.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled) .mat-ripple-element{background-color:currentColor;opacity:.1}.mat-mdc-snack-bar-container .mdc-snackbar__label::before{display:none}.mat-mdc-snack-bar-handset,.mat-mdc-snack-bar-container,.mat-mdc-snack-bar-label{flex:1 1 auto}.mat-mdc-snack-bar-handset .mdc-snackbar__surface{width:100%}"]
    }]
  }], null, {
    _label: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChild,
      args: ['label', {
        static: true
      }]
    }]
  });
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class MatSnackBarModule {}
MatSnackBarModule.ɵfac = function MatSnackBarModule_Factory(t) {
  return new (t || MatSnackBarModule)();
};
MatSnackBarModule.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: MatSnackBarModule
});
MatSnackBarModule.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_8__.OverlayModule, _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_5__.PortalModule, _angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_3__.MatButtonModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_9__.MatCommonModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_9__.MatCommonModule]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatSnackBarModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgModule,
    args: [{
      imports: [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_8__.OverlayModule, _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_5__.PortalModule, _angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_3__.MatButtonModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_9__.MatCommonModule],
      exports: [_angular_material_core__WEBPACK_IMPORTED_MODULE_9__.MatCommonModule, MatSnackBarContainer, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction],
      declarations: [SimpleSnackBar, MatSnackBarContainer, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction]
    }]
  }], null, null);
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** @docs-private */
function MAT_SNACK_BAR_DEFAULT_OPTIONS_FACTORY() {
  return new MatSnackBarConfig();
}
/** Injection token that can be used to specify default snack bar. */
const MAT_SNACK_BAR_DEFAULT_OPTIONS = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('mat-snack-bar-default-options', {
  providedIn: 'root',
  factory: MAT_SNACK_BAR_DEFAULT_OPTIONS_FACTORY
});
class _MatSnackBarBase {
  /** Reference to the currently opened snackbar at *any* level. */
  get _openedSnackBarRef() {
    const parent = this._parentSnackBar;
    return parent ? parent._openedSnackBarRef : this._snackBarRefAtThisLevel;
  }
  set _openedSnackBarRef(value) {
    if (this._parentSnackBar) {
      this._parentSnackBar._openedSnackBarRef = value;
    } else {
      this._snackBarRefAtThisLevel = value;
    }
  }
  constructor(_overlay, _live, _injector, _breakpointObserver, _parentSnackBar, _defaultConfig) {
    this._overlay = _overlay;
    this._live = _live;
    this._injector = _injector;
    this._breakpointObserver = _breakpointObserver;
    this._parentSnackBar = _parentSnackBar;
    this._defaultConfig = _defaultConfig;
    /**
     * Reference to the current snack bar in the view *at this level* (in the Angular injector tree).
     * If there is a parent snack-bar service, all operations should delegate to that parent
     * via `_openedSnackBarRef`.
     */
    this._snackBarRefAtThisLevel = null;
  }
  /**
   * Creates and dispatches a snack bar with a custom component for the content, removing any
   * currently opened snack bars.
   *
   * @param component Component to be instantiated.
   * @param config Extra configuration for the snack bar.
   */
  openFromComponent(component, config) {
    return this._attach(component, config);
  }
  /**
   * Creates and dispatches a snack bar with a custom template for the content, removing any
   * currently opened snack bars.
   *
   * @param template Template to be instantiated.
   * @param config Extra configuration for the snack bar.
   */
  openFromTemplate(template, config) {
    return this._attach(template, config);
  }
  /**
   * Opens a snackbar with a message and an optional action.
   * @param message The message to show in the snackbar.
   * @param action The label for the snackbar action.
   * @param config Additional configuration options for the snackbar.
   */
  open(message, action = '', config) {
    const _config = {
      ...this._defaultConfig,
      ...config
    };
    // Since the user doesn't have access to the component, we can
    // override the data to pass in our own message and action.
    _config.data = {
      message,
      action
    };
    // Since the snack bar has `role="alert"`, we don't
    // want to announce the same message twice.
    if (_config.announcementMessage === message) {
      _config.announcementMessage = undefined;
    }
    return this.openFromComponent(this.simpleSnackBarComponent, _config);
  }
  /**
   * Dismisses the currently-visible snack bar.
   */
  dismiss() {
    if (this._openedSnackBarRef) {
      this._openedSnackBarRef.dismiss();
    }
  }
  ngOnDestroy() {
    // Only dismiss the snack bar at the current level on destroy.
    if (this._snackBarRefAtThisLevel) {
      this._snackBarRefAtThisLevel.dismiss();
    }
  }
  /**
   * Attaches the snack bar container component to the overlay.
   */
  _attachSnackBarContainer(overlayRef, config) {
    const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
    const injector = _angular_core__WEBPACK_IMPORTED_MODULE_0__.Injector.create({
      parent: userInjector || this._injector,
      providers: [{
        provide: MatSnackBarConfig,
        useValue: config
      }]
    });
    const containerPortal = new _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_5__.ComponentPortal(this.snackBarContainerComponent, config.viewContainerRef, injector);
    const containerRef = overlayRef.attach(containerPortal);
    containerRef.instance.snackBarConfig = config;
    return containerRef.instance;
  }
  /**
   * Places a new component or a template as the content of the snack bar container.
   */
  _attach(content, userConfig) {
    const config = {
      ...new MatSnackBarConfig(),
      ...this._defaultConfig,
      ...userConfig
    };
    const overlayRef = this._createOverlay(config);
    const container = this._attachSnackBarContainer(overlayRef, config);
    const snackBarRef = new MatSnackBarRef(container, overlayRef);
    if (content instanceof _angular_core__WEBPACK_IMPORTED_MODULE_0__.TemplateRef) {
      const portal = new _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_5__.TemplatePortal(content, null, {
        $implicit: config.data,
        snackBarRef
      });
      snackBarRef.instance = container.attachTemplatePortal(portal);
    } else {
      const injector = this._createInjector(config, snackBarRef);
      const portal = new _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_5__.ComponentPortal(content, undefined, injector);
      const contentRef = container.attachComponentPortal(portal);
      // We can't pass this via the injector, because the injector is created earlier.
      snackBarRef.instance = contentRef.instance;
    }
    // Subscribe to the breakpoint observer and attach the mat-snack-bar-handset class as
    // appropriate. This class is applied to the overlay element because the overlay must expand to
    // fill the width of the screen for full width snackbars.
    this._breakpointObserver.observe(_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_10__.Breakpoints.HandsetPortrait).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.takeUntil)(overlayRef.detachments())).subscribe(state => {
      overlayRef.overlayElement.classList.toggle(this.handsetCssClass, state.matches);
    });
    if (config.announcementMessage) {
      // Wait until the snack bar contents have been announced then deliver this message.
      container._onAnnounce.subscribe(() => {
        this._live.announce(config.announcementMessage, config.politeness);
      });
    }
    this._animateSnackBar(snackBarRef, config);
    this._openedSnackBarRef = snackBarRef;
    return this._openedSnackBarRef;
  }
  /** Animates the old snack bar out and the new one in. */
  _animateSnackBar(snackBarRef, config) {
    // When the snackbar is dismissed, clear the reference to it.
    snackBarRef.afterDismissed().subscribe(() => {
      // Clear the snackbar ref if it hasn't already been replaced by a newer snackbar.
      if (this._openedSnackBarRef == snackBarRef) {
        this._openedSnackBarRef = null;
      }
      if (config.announcementMessage) {
        this._live.clear();
      }
    });
    if (this._openedSnackBarRef) {
      // If a snack bar is already in view, dismiss it and enter the
      // new snack bar after exit animation is complete.
      this._openedSnackBarRef.afterDismissed().subscribe(() => {
        snackBarRef.containerInstance.enter();
      });
      this._openedSnackBarRef.dismiss();
    } else {
      // If no snack bar is in view, enter the new snack bar.
      snackBarRef.containerInstance.enter();
    }
    // If a dismiss timeout is provided, set up dismiss based on after the snackbar is opened.
    if (config.duration && config.duration > 0) {
      snackBarRef.afterOpened().subscribe(() => snackBarRef._dismissAfter(config.duration));
    }
  }
  /**
   * Creates a new overlay and places it in the correct location.
   * @param config The user-specified snack bar config.
   */
  _createOverlay(config) {
    const overlayConfig = new _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_8__.OverlayConfig();
    overlayConfig.direction = config.direction;
    let positionStrategy = this._overlay.position().global();
    // Set horizontal position.
    const isRtl = config.direction === 'rtl';
    const isLeft = config.horizontalPosition === 'left' || config.horizontalPosition === 'start' && !isRtl || config.horizontalPosition === 'end' && isRtl;
    const isRight = !isLeft && config.horizontalPosition !== 'center';
    if (isLeft) {
      positionStrategy.left('0');
    } else if (isRight) {
      positionStrategy.right('0');
    } else {
      positionStrategy.centerHorizontally();
    }
    // Set horizontal position.
    if (config.verticalPosition === 'top') {
      positionStrategy.top('0');
    } else {
      positionStrategy.bottom('0');
    }
    overlayConfig.positionStrategy = positionStrategy;
    return this._overlay.create(overlayConfig);
  }
  /**
   * Creates an injector to be used inside of a snack bar component.
   * @param config Config that was used to create the snack bar.
   * @param snackBarRef Reference to the snack bar.
   */
  _createInjector(config, snackBarRef) {
    const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
    return _angular_core__WEBPACK_IMPORTED_MODULE_0__.Injector.create({
      parent: userInjector || this._injector,
      providers: [{
        provide: MatSnackBarRef,
        useValue: snackBarRef
      }, {
        provide: MAT_SNACK_BAR_DATA,
        useValue: config.data
      }]
    });
  }
}
_MatSnackBarBase.ɵfac = function _MatSnackBarBase_Factory(t) {
  return new (t || _MatSnackBarBase)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_8__.Overlay), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_12__.LiveAnnouncer), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_10__.BreakpointObserver), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_MatSnackBarBase, 12), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](MAT_SNACK_BAR_DEFAULT_OPTIONS));
};
_MatSnackBarBase.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: _MatSnackBarBase,
  factory: _MatSnackBarBase.ɵfac
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](_MatSnackBarBase, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Injectable
  }], function () {
    return [{
      type: _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_8__.Overlay
    }, {
      type: _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_12__.LiveAnnouncer
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Injector
    }, {
      type: _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_10__.BreakpointObserver
    }, {
      type: _MatSnackBarBase,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.SkipSelf
      }]
    }, {
      type: MatSnackBarConfig,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [MAT_SNACK_BAR_DEFAULT_OPTIONS]
      }]
    }];
  }, null);
})();
/**
 * Service to dispatch Material Design snack bar messages.
 */
class MatSnackBar extends _MatSnackBarBase {
  constructor(overlay, live, injector, breakpointObserver, parentSnackBar, defaultConfig) {
    super(overlay, live, injector, breakpointObserver, parentSnackBar, defaultConfig);
    this.simpleSnackBarComponent = SimpleSnackBar;
    this.snackBarContainerComponent = MatSnackBarContainer;
    this.handsetCssClass = 'mat-mdc-snack-bar-handset';
  }
}
MatSnackBar.ɵfac = function MatSnackBar_Factory(t) {
  return new (t || MatSnackBar)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_8__.Overlay), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_12__.LiveAnnouncer), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_10__.BreakpointObserver), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](MatSnackBar, 12), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](MAT_SNACK_BAR_DEFAULT_OPTIONS));
};
MatSnackBar.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: MatSnackBar,
  factory: MatSnackBar.ɵfac,
  providedIn: MatSnackBarModule
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatSnackBar, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Injectable,
    args: [{
      providedIn: MatSnackBarModule
    }]
  }], function () {
    return [{
      type: _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_8__.Overlay
    }, {
      type: _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_12__.LiveAnnouncer
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Injector
    }, {
      type: _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_10__.BreakpointObserver
    }, {
      type: MatSnackBar,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.SkipSelf
      }]
    }, {
      type: MatSnackBarConfig,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [MAT_SNACK_BAR_DEFAULT_OPTIONS]
      }]
    }];
  }, null);
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Generated bundle index. Do not edit.
 */


//# sourceMappingURL=snack-bar.mjs.map

/***/ }),

/***/ 583683:
/*!*************************************************************!*\
  !*** ./node_modules/@angular/material/fesm2020/toolbar.mjs ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MatToolbar": () => (/* binding */ MatToolbar),
/* harmony export */   "MatToolbarModule": () => (/* binding */ MatToolbarModule),
/* harmony export */   "MatToolbarRow": () => (/* binding */ MatToolbarRow),
/* harmony export */   "throwToolbarMixedModesError": () => (/* binding */ throwToolbarMixedModesError)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/material/core */ 447873);
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/platform */ 383353);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 836895);






/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// Boilerplate for applying mixins to MatToolbar.
/** @docs-private */
const _c0 = ["*", [["mat-toolbar-row"]]];
const _c1 = ["*", "mat-toolbar-row"];
const _MatToolbarBase = (0,_angular_material_core__WEBPACK_IMPORTED_MODULE_0__.mixinColor)(class {
  constructor(_elementRef) {
    this._elementRef = _elementRef;
  }
});
class MatToolbarRow {}
MatToolbarRow.ɵfac = function MatToolbarRow_Factory(t) {
  return new (t || MatToolbarRow)();
};
MatToolbarRow.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
  type: MatToolbarRow,
  selectors: [["mat-toolbar-row"]],
  hostAttrs: [1, "mat-toolbar-row"],
  exportAs: ["matToolbarRow"]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](MatToolbarRow, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Directive,
    args: [{
      selector: 'mat-toolbar-row',
      exportAs: 'matToolbarRow',
      host: {
        'class': 'mat-toolbar-row'
      }
    }]
  }], null, null);
})();
class MatToolbar extends _MatToolbarBase {
  constructor(elementRef, _platform, document) {
    super(elementRef);
    this._platform = _platform;
    // TODO: make the document a required param when doing breaking changes.
    this._document = document;
  }
  ngAfterViewInit() {
    if (this._platform.isBrowser) {
      this._checkToolbarMixedModes();
      this._toolbarRows.changes.subscribe(() => this._checkToolbarMixedModes());
    }
  }
  /**
   * Throws an exception when developers are attempting to combine the different toolbar row modes.
   */
  _checkToolbarMixedModes() {
    if (this._toolbarRows.length && (typeof ngDevMode === 'undefined' || ngDevMode)) {
      // Check if there are any other DOM nodes that can display content but aren't inside of
      // a <mat-toolbar-row> element.
      const isCombinedUsage = Array.from(this._elementRef.nativeElement.childNodes).filter(node => !(node.classList && node.classList.contains('mat-toolbar-row'))).filter(node => node.nodeType !== (this._document ? this._document.COMMENT_NODE : 8)).some(node => !!(node.textContent && node.textContent.trim()));
      if (isCombinedUsage) {
        throwToolbarMixedModesError();
      }
    }
  }
}
MatToolbar.ɵfac = function MatToolbar_Factory(t) {
  return new (t || MatToolbar)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_2__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_3__.DOCUMENT));
};
MatToolbar.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: MatToolbar,
  selectors: [["mat-toolbar"]],
  contentQueries: function MatToolbar_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵcontentQuery"](dirIndex, MatToolbarRow, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx._toolbarRows = _t);
    }
  },
  hostAttrs: [1, "mat-toolbar"],
  hostVars: 4,
  hostBindings: function MatToolbar_HostBindings(rf, ctx) {
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("mat-toolbar-multiple-rows", ctx._toolbarRows.length > 0)("mat-toolbar-single-row", ctx._toolbarRows.length === 0);
    }
  },
  inputs: {
    color: "color"
  },
  exportAs: ["matToolbar"],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]],
  ngContentSelectors: _c1,
  decls: 2,
  vars: 0,
  template: function MatToolbar_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojectionDef"](_c0);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](0);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](1, 1);
    }
  },
  styles: [".cdk-high-contrast-active .mat-toolbar{outline:solid 1px}.mat-toolbar .mat-mdc-button-base.mat-unthemed{--mdc-text-button-label-text-color: inherit;--mdc-outlined-button-label-text-color: inherit}.mat-toolbar-row,.mat-toolbar-single-row{display:flex;box-sizing:border-box;padding:0 16px;width:100%;flex-direction:row;align-items:center;white-space:nowrap}.mat-toolbar-multiple-rows{display:flex;box-sizing:border-box;flex-direction:column;width:100%}"],
  encapsulation: 2,
  changeDetection: 0
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](MatToolbar, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Component,
    args: [{
      selector: 'mat-toolbar',
      exportAs: 'matToolbar',
      inputs: ['color'],
      host: {
        'class': 'mat-toolbar',
        '[class.mat-toolbar-multiple-rows]': '_toolbarRows.length > 0',
        '[class.mat-toolbar-single-row]': '_toolbarRows.length === 0'
      },
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ChangeDetectionStrategy.OnPush,
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ViewEncapsulation.None,
      template: "<ng-content></ng-content>\n<ng-content select=\"mat-toolbar-row\"></ng-content>\n",
      styles: [".cdk-high-contrast-active .mat-toolbar{outline:solid 1px}.mat-toolbar .mat-mdc-button-base.mat-unthemed{--mdc-text-button-label-text-color: inherit;--mdc-outlined-button-label-text-color: inherit}.mat-toolbar-row,.mat-toolbar-single-row{display:flex;box-sizing:border-box;padding:0 16px;width:100%;flex-direction:row;align-items:center;white-space:nowrap}.mat-toolbar-multiple-rows{display:flex;box-sizing:border-box;flex-direction:column;width:100%}"]
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ElementRef
    }, {
      type: _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_2__.Platform
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Inject,
        args: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.DOCUMENT]
      }]
    }];
  }, {
    _toolbarRows: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ContentChildren,
      args: [MatToolbarRow, {
        descendants: true
      }]
    }]
  });
})();
/**
 * Throws an exception when attempting to combine the different toolbar row modes.
 * @docs-private
 */
function throwToolbarMixedModesError() {
  throw Error('MatToolbar: Attempting to combine different toolbar modes. ' + 'Either specify multiple `<mat-toolbar-row>` elements explicitly or just place content ' + 'inside of a `<mat-toolbar>` for a single row.');
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class MatToolbarModule {}
MatToolbarModule.ɵfac = function MatToolbarModule_Factory(t) {
  return new (t || MatToolbarModule)();
};
MatToolbarModule.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: MatToolbarModule
});
MatToolbarModule.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_material_core__WEBPACK_IMPORTED_MODULE_0__.MatCommonModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_0__.MatCommonModule]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](MatToolbarModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.NgModule,
    args: [{
      imports: [_angular_material_core__WEBPACK_IMPORTED_MODULE_0__.MatCommonModule],
      exports: [MatToolbar, MatToolbarRow, _angular_material_core__WEBPACK_IMPORTED_MODULE_0__.MatCommonModule],
      declarations: [MatToolbar, MatToolbarRow]
    }]
  }], null, null);
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Generated bundle index. Do not edit.
 */


//# sourceMappingURL=toolbar.mjs.map

/***/ })

}]);