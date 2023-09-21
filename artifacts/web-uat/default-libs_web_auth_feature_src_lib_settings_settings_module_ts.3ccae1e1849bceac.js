"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_auth_feature_src_lib_settings_settings_module_ts"],{

/***/ 78858:
/*!************************************************************************!*\
  !*** ./libs/core/formly-setting/src/lib/core-formly-setting.module.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CoreFormlySettingModule": () => (/* binding */ CoreFormlySettingModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _formly_settings_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./formly-settings.store */ 146277);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);



class CoreFormlySettingModule {}
CoreFormlySettingModule.ɵfac = function CoreFormlySettingModule_Factory(t) {
  return new (t || CoreFormlySettingModule)();
};
CoreFormlySettingModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: CoreFormlySettingModule
});
CoreFormlySettingModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  providers: [_formly_settings_store__WEBPACK_IMPORTED_MODULE_1__.FormlySettingsStore],
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](CoreFormlySettingModule, {
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule]
  });
})();

/***/ }),

/***/ 146277:
/*!*******************************************************************!*\
  !*** ./libs/core/formly-setting/src/lib/formly-settings.store.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormlySettingsStore": () => (/* binding */ FormlySettingsStore)
/* harmony export */ });
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 318505);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 504523);
/* harmony import */ var _case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/ui/toast */ 971873);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _fuse_services_config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @fuse/services/config */ 712282);











class FormlySettingsStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(formService, toast, data, fuseConfigService) {
    super({
      query: "",
      loading: false,
      canGoNext: false
    });
    this.formService = formService;
    this.toast = toast;
    this.data = data;
    this.fuseConfigService = fuseConfigService;
    this.loading$ = this.select(s => s.loading);
    this.formlySetting$ = this.select(s => s.formlySetting);
    this.canGoNext$ = this.select(s => s.canGoNext, {
      debounce: true
    });
    this.vm$ = this.select(this.loading$, this.canGoNext$, this.formlySetting$, (loading, canGoNext, formlySetting) => ({
      loading,
      canGoNext,
      formlySetting
    }));
    this.loadFormlySettingsEffect = this.effect($ => $.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(() => {
      this.patchState({
        loading: true
      });
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(() => this.data.userSettings({
      input: {
        name: "formly_Page_Settings"
      }
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(response => {
      var _a, _b;
      const data = (_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.items) !== null && _b !== void 0 ? _b : [];
      if (data.length > 0) this.patchState({
        loading: false,
        formlySetting: {
          id: data[0].id,
          name: data[0].name,
          value: {
            selectLanguage: data[0].value ? JSON.parse(data[0].value).language : '',
            selectDateFormat: data[0].value ? JSON.parse(data[0].value).dateFormat : '',
            selectCurrency: data[0].value ? JSON.parse(data[0].value).currency : '',
            timeFormat: data[0].value ? JSON.parse(data[0].value).timeFormat : '',
            id: data[0].id
          }
        }
      });
    }, () => {
      this.patchState({
        loading: false
      });
    })))));
    this.createFormlySettingsEffect = this.effect(data$ => data$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(data => {
      this.patchState({
        loading: true
      });
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(data => {
      var _a, _b, _c, _d;
      const inputData = {
        name: "formly_Page_Settings",
        value: JSON.stringify({
          language: (_a = data === null || data === void 0 ? void 0 : data.selectLanguage) !== null && _a !== void 0 ? _a : "en",
          currency: (_b = data === null || data === void 0 ? void 0 : data.selectCurrency) !== null && _b !== void 0 ? _b : "$",
          timeFormat: (_c = data === null || data === void 0 ? void 0 : data.timeFormat) !== null && _c !== void 0 ? _c : '12',
          dateFormat: (_d = data === null || data === void 0 ? void 0 : data.selectDateFomat) !== null && _d !== void 0 ? _d : "MM/DD/YYYY"
        })
      };
      return this.data.userCreateSetting({
        input: inputData
      }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(response => {
        var _a, _b;
        const setting = (_a = response.data) === null || _a === void 0 ? void 0 : _a.created;
        const config = JSON.parse((_b = setting === null || setting === void 0 ? void 0 : setting.value) !== null && _b !== void 0 ? _b : '{}');
        this.fuseConfigService.setFormlyConfig(config.language, config.currency, config.dateFormat, config.timeFormat);
        this.toast.success('Successfully created PageSetting', {
          duration: 3000
        });
        this.patchState({
          loading: false,
          canGoNext: true
        });
      }, error => {
        if (error.graphQLErrors) {
          this.toast.error(error.message, {
            duration: 3000
          });
        } else {
          this.toast.error(error.Message, {
            duration: 3000
          });
          this.formService.setErrors(error.Data);
          this.patchState({
            loading: false
          });
        }
      }));
    })));
    this.updateFormlySettingsEffect = this.effect(data$ => data$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(data => {
      this.patchState({
        loading: true
      });
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(data => {
      var _a, _b;
      const updateData = JSON.stringify({
        language: data === null || data === void 0 ? void 0 : data.selectLanguage,
        currency: data === null || data === void 0 ? void 0 : data.selectCurrency,
        dateFormat: data === null || data === void 0 ? void 0 : data.selectDateFormat,
        timeFormat: data === null || data === void 0 ? void 0 : data.timeFormat
      });
      console.log({
        updateData
      });
      return this.data.userUpdateSetting({
        settingId: (_a = this.get().formlySetting) === null || _a === void 0 ? void 0 : _a.id,
        input: {
          value: updateData,
          name: (_b = this.get().formlySetting) === null || _b === void 0 ? void 0 : _b.name
        }
      }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(response => {
        var _a, _b, _c;
        const config = JSON.parse((_c = (_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.updated) === null || _b === void 0 ? void 0 : _b.value) !== null && _c !== void 0 ? _c : '{}');
        this.fuseConfigService.setFormlyConfig(config.language, config.currency, config.dateFormat, config.timeFormat);
        this.toast.success('Successfully updated pageSetting', {
          duration: 3000
        });
        this.patchState({
          loading: false,
          canGoNext: true
        });
      }, error => {
        if (error.graphQLErrors) {
          this.toast.error(error.message, {
            duration: 3000
          });
        } else {
          this.toast.error(error.Message, {
            duration: 3000
          });
          this.formService.setErrors(error.Data);
          this.patchState({
            loading: false
          });
        }
      }));
    })));
    this.patchState({
      formlySetting: {}
    });
  }
}
FormlySettingsStore.ɵfac = function FormlySettingsStore_Factory(t) {
  return new (t || FormlySettingsStore)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_4__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_5__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_6__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_fuse_services_config__WEBPACK_IMPORTED_MODULE_7__.FuseConfigService));
};
FormlySettingsStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
  token: FormlySettingsStore,
  factory: FormlySettingsStore.ɵfac
});

/***/ }),

/***/ 700903:
/*!**********************************************************!*\
  !*** ./libs/web/@fuse/components/card/card.component.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FuseCardComponent": () => (/* binding */ FuseCardComponent)
/* harmony export */ });
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/coercion */ 121281);
/* harmony import */ var _fuse_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fuse/animations */ 662235);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 836895);





function FuseCardComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](4, 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function FuseCardComponent_ng_container_1_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](1, 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("@expandCollapse", undefined);
  }
}
function FuseCardComponent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](1, 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, FuseCardComponent_ng_container_1_div_2_Template, 2, 1, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1.expanded);
  }
}
const _c0 = [[["", "fuseCardFront", ""]], [["", "fuseCardBack", ""]], "*", [["", "fuseCardExpansion", ""]]];
const _c1 = ["[fuseCardFront]", "[fuseCardBack]", "*", "[fuseCardExpansion]"];
class FuseCardComponent {
  /**
   * Constructor
   */
  constructor() {
    /* eslint-enable @typescript-eslint/naming-convention */
    this.expanded = false;
    this.face = 'front';
    this.flippable = false;
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------
  /**
   * Host binding for component classes
   */
  get classList() {
    return {
      'fuse-card-expanded': this.expanded,
      'fuse-card-face-back': this.flippable && this.face === 'back',
      'fuse-card-face-front': this.flippable && this.face === 'front',
      'fuse-card-flippable': this.flippable
    };
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On changes
   *
   * @param changes
   */
  ngOnChanges(changes) {
    // Expanded
    if ('expanded' in changes) {
      // Coerce the value to a boolean
      this.expanded = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__.coerceBooleanProperty)(changes.expanded.currentValue);
    }
    // Flippable
    if ('flippable' in changes) {
      // Coerce the value to a boolean
      this.flippable = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__.coerceBooleanProperty)(changes.flippable.currentValue);
    }
  }
}
FuseCardComponent.ɵfac = function FuseCardComponent_Factory(t) {
  return new (t || FuseCardComponent)();
};
FuseCardComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: FuseCardComponent,
  selectors: [["fuse-card"]],
  hostVars: 2,
  hostBindings: function FuseCardComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMap"](ctx.classList);
    }
  },
  inputs: {
    expanded: "expanded",
    face: "face",
    flippable: "flippable"
  },
  exportAs: ["fuseCard"],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]],
  ngContentSelectors: _c1,
  decls: 2,
  vars: 2,
  consts: [[4, "ngIf"], [1, "fuse-card-front"], [1, "fuse-card-back"], ["class", "fuse-card-expansion", 4, "ngIf"], [1, "fuse-card-expansion"]],
  template: function FuseCardComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"](_c0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, FuseCardComponent_ng_container_0_Template, 5, 0, "ng-container", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, FuseCardComponent_ng_container_1_Template, 3, 1, "ng-container", 0);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.flippable);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.flippable);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf],
  styles: ["fuse-card {\n  position: relative;\n  display: flex;\n  overflow: hidden;\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-bg-card-rgb), var(--tw-bg-opacity));\n  border-radius: 1rem;\n  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n  /* Flippable */\n}\nfuse-card.fuse-card-flippable {\n  border-radius: 0;\n  overflow: visible;\n  transform-style: preserve-3d;\n  transition: transform 1s;\n  perspective: 600px;\n  background: transparent;\n  --tw-shadow: 0 0 #0000;\n  --tw-shadow-colored: 0 0 #0000;\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\nfuse-card.fuse-card-flippable.fuse-card-face-back .fuse-card-front {\n  visibility: hidden;\n  opacity: 0;\n  transform: rotateY(180deg);\n}\nfuse-card.fuse-card-flippable.fuse-card-face-back .fuse-card-back {\n  visibility: visible;\n  opacity: 1;\n  transform: rotateY(360deg);\n}\nfuse-card.fuse-card-flippable .fuse-card-front,\nfuse-card.fuse-card-flippable .fuse-card-back {\n  display: flex;\n  flex-direction: column;\n  flex: 1 1 auto;\n  z-index: 10;\n  transition: transform 0.5s ease-out 0s, visibility 0s ease-in 0.2s, opacity 0s ease-in 0.2s;\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden;\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-bg-card-rgb), var(--tw-bg-opacity));\n  border-radius: 1rem;\n  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\nfuse-card.fuse-card-flippable .fuse-card-front {\n  position: relative;\n  opacity: 1;\n  visibility: visible;\n  transform: rotateY(0deg);\n  overflow: hidden;\n}\nfuse-card.fuse-card-flippable .fuse-card-back {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  opacity: 0;\n  visibility: hidden;\n  transform: rotateY(180deg);\n  overflow: hidden auto;\n}"],
  encapsulation: 2,
  data: {
    animation: _fuse_animations__WEBPACK_IMPORTED_MODULE_3__.fuseAnimations
  }
});

/***/ }),

/***/ 673141:
/*!*******************************************************!*\
  !*** ./libs/web/@fuse/components/card/card.module.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FuseCardModule": () => (/* binding */ FuseCardModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _fuse_components_card_card_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fuse/components/card/card.component */ 700903);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);



class FuseCardModule {}
FuseCardModule.ɵfac = function FuseCardModule_Factory(t) {
  return new (t || FuseCardModule)();
};
FuseCardModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: FuseCardModule
});
FuseCardModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](FuseCardModule, {
    declarations: [_fuse_components_card_card_component__WEBPACK_IMPORTED_MODULE_2__.FuseCardComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule],
    exports: [_fuse_components_card_card_component__WEBPACK_IMPORTED_MODULE_2__.FuseCardComponent]
  });
})();

/***/ }),

/***/ 49758:
/*!*****************************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/settings/account/account.component.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingsAccountComponent": () => (/* binding */ SettingsAccountComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _account_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./account.store */ 965115);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 504523);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);








function SettingsAccountComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 1)(1, "ui-formly-json-form", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function SettingsAccountComponent_div_0_Template_ui_formly_json_form_save_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r2.submit($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const vm_r1 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("model", vm_r1.profile)("formData", vm_r1.profile);
  }
}
class SettingsAccountComponent {
  constructor(formService, store) {
    this.formService = formService;
    this.store = store;
    this.isSignUpProcess = false;
    this.send = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.vm$ = this.store.vm$;
  }
  ngOnInit() {
    this.store.loadAccountProfileEffect();
  }
  submit(formData) {
    const location = formData['location'];
    alert(JSON.stringify(formData));
    this.store.updateAccountEffect({
      input: formData,
      resultEmitter: this.send
    });
  }
}
SettingsAccountComponent.ɵfac = function SettingsAccountComponent_Factory(t) {
  return new (t || SettingsAccountComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_account_store__WEBPACK_IMPORTED_MODULE_2__.AccountStore));
};
SettingsAccountComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: SettingsAccountComponent,
  selectors: [["settings-account"]],
  inputs: {
    isSignUpProcess: "isSignUpProcess"
  },
  outputs: {
    send: "send"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_account_store__WEBPACK_IMPORTED_MODULE_2__.AccountStore])],
  decls: 2,
  vars: 3,
  consts: [["class", "w-full max-w-3xl", 4, "ngIf"], [1, "w-full", "max-w-3xl"], ["formName", "user_create", 1, "w-full", "h-full", 3, "showSubmitButton", "model", "formData", "save"]],
  template: function SettingsAccountComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, SettingsAccountComponent_div_0_Template, 2, 3, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](1, "async");
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](1, 1, ctx.vm$));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_4__.WebUiFormlyJsonFormComponent, _angular_common__WEBPACK_IMPORTED_MODULE_3__.AsyncPipe],
  encapsulation: 2,
  changeDetection: 0
});

/***/ }),

/***/ 965115:
/*!*************************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/settings/account/account.store.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AccountStore": () => (/* binding */ AccountStore)
/* harmony export */ });
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 318505);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 504523);
/* harmony import */ var _fuse_services_loading_loading_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fuse/services/loading/loading.service */ 301463);
/* harmony import */ var _case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/ui/toast */ 971873);
/* harmony import */ var _business_logic_settings_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../business-logic/settings.service */ 730788);












class AccountStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(formService, loading, toast, service) {
    super({
      query: "",
      loading: false,
      canGoNext: false
    });
    this.formService = formService;
    this.loading = loading;
    this.toast = toast;
    this.service = service;
    this.profile$ = this.select(s => s.profile);
    this.loading$ = this.select(s => s.loading);
    this.canGoNext$ = this.select(s => s.canGoNext, {
      debounce: true
    });
    this.vm$ = this.select(this.loading$, this.canGoNext$, this.profile$, (loading, canGoNext, profile) => ({
      loading,
      canGoNext,
      profile
    }));
    this.loadAccountProfileEffect = this.effect($ => $.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(() => {
      this.patchState({
        loading: true
      });
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(() => this.service.accountProfile().pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(data => {
      this.patchState({
        loading: false,
        profile: data
      });
    }, error => {
      this.patchState({
        loading: false
      });
    })))));
    this.updateAccountEffect = this.effect(data$ => data$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(data => {
      this.patchState({
        loading: true
      });
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(data => this.service.updateAccount(data.input).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(result => {
      this.toast.success('Successfully updated account', {
        duration: 3000
      });
      data.resultEmitter.emit();
      this.patchState({
        loading: false,
        canGoNext: true
      });
    }, error => {
      if (error.graphQLErrors) {
        this.toast.error(error.message, {
          duration: 3000
        });
      } else {
        this.toast.error(error.Message, {
          duration: 3000
        });
        this.formService.setErrors(error.Data);
        this.patchState({
          loading: false
        });
      }
    })))));
  }
}
AccountStore.ɵfac = function AccountStore_Factory(t) {
  return new (t || AccountStore)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_4__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_fuse_services_loading_loading_service__WEBPACK_IMPORTED_MODULE_5__.FuseLoadingService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_6__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_business_logic_settings_service__WEBPACK_IMPORTED_MODULE_7__.SettingsService));
};
AccountStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
  token: AccountStore,
  factory: AccountStore.ɵfac
});

/***/ }),

/***/ 611416:
/*!************************************************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/settings/business-logic/actions/create-billing-action.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateBillingAction": () => (/* binding */ CreateBillingAction)
/* harmony export */ });
/* harmony import */ var _settings_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./settings.business-action-base */ 691790);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 670262);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 960515);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 439646);



class CreateBillingAction extends _settings_business_action_base__WEBPACK_IMPORTED_MODULE_1__.SettingsBusinessActionBase {
  constructor(input) {
    super('CreateBillingAction');
    this.input = input;
    this.inputData = {};
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange('cardHolder', 'cardHolder should be more than 2 characters', this.input.cardHolder, 2, 25, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange('cardNumber', 'cardNumber should be more than 2 characters', this.input.cardNumber, 2, 20, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsRegExMatch('cardNumber', 'cardNumber should be in \d{16} format', this.input.cardNumber, /\d{16}/, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange('cardExpiration', 'cardExpiration should be between 2 and 5', this.input.cardExpiration, 2, 4, true));
    if (this.input.cardExpiration) {
      this.inputData.expireMonth = Number(this.input.cardExpiration.substring(0, 2));
      this.inputData.expireYear = Number(this.input.cardExpiration.substring(2, 4));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.Min('cardExpiration', 'Expiration Month should be greater than 0', this.inputData.expireMonth, 1, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.Max('cardExpiration', 'Expiration Month should be smaller than 13', this.inputData.expireMonth, 12, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.Min('cardExpiration', 'Expiration year should be greater than 0', this.inputData.expireYear, 1, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.Max('cardExpiration', 'Expiration year should be smaller than 100', this.inputData.expireYear, 99, true));
    }
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange('cardCVC', 'cardCVC should be 3 characters', this.input.cardCVC, 3, 3, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsRegExMatch('cardCVC', 'cardCVC should be 3 digits', this.input.cardCVC, /\d\d\d/, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange('country', 'You have to country', this.input.country, 2, 2, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange('zip', 'zip should be more than 2 characters', this.input.zip, 2, 10, true));
  }
  postValidateAction() {
    super.postValidateAction();
    this.inputData.cardHolder = this.input.cardHolder;
    this.inputData.cardNumber = this.input.cardNumber;
    this.inputData.country = this.input.country;
    this.inputData.cvc = this.input.cardCVC;
    this.inputData.zip = this.input.zip;
  }
  performAction() {
    this.response = this.businessProvider.data.userCreateBillingInfo({
      input: this.inputData
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.catchError)(error => {
      console.log('catChError', error);
      this.response = this.createFailResponse();
      return rxjs__WEBPACK_IMPORTED_MODULE_3__.EMPTY;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(result => {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)(result.data.billingInfo);
    }));
  }
}

/***/ }),

/***/ 691790:
/*!********************************************************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/settings/business-logic/actions/settings.business-action-base.ts ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingsBusinessActionBase": () => (/* binding */ SettingsBusinessActionBase)
/* harmony export */ });
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);

/**
 * A helper class to provide the action with required dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
class SettingsBusinessActionBase extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_0__.ActionBase {
  // override loggingService!: ILoggingService;
  // override actionName: string;
  constructor(actionName) {
    super();
    this.showRuleMessages = true;
    this.hideRuleMessages = false;
    this.actionName = actionName;
  }
  /**
   * Use the [Do] method to perform the action. Also uses [inversion of control]
   * and provides the action the same instance of the [service context] and
   * [logging service].
   */
  Do(businessProvider) {
    this.businessProvider = businessProvider;
    this.serviceContext = businessProvider.serviceContext;
    this.loggingService = businessProvider.loggingService;
    this.execute();
    return this.response;
  }
}

/***/ }),

/***/ 687619:
/*!************************************************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/settings/business-logic/actions/update-account-action.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateAccountAction": () => (/* binding */ UpdateAccountAction)
/* harmony export */ });
/* harmony import */ var _settings_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./settings.business-action-base */ 691790);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);



// import { Account, UserUpdateAccountInput } from '@case-clinical/web/core/data-access'
class UpdateAccountAction extends _settings_business_action_base__WEBPACK_IMPORTED_MODULE_1__.SettingsBusinessActionBase {
  constructor(input) {
    super('UpdateAccountAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange('username', 'Username should be more than 2 characters', this.input.username, 2, 100, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange('firstName', 'FirstName should be more than 2 characters', this.input.firstName, 2, 100, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange('lastName', 'LastName should be more than 2 characters', this.input.lastName, 2, 100, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange('phone', 'Phone should be more than 2 characters', this.input.phone, 2, 100, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange('dateOfBirth', 'DateOfBirth should be more than 2 characters', this.input.dateOfBirth, 2, 100, true));
  }
  performAction() {
    // First Update Username
    this.response = this.businessProvider.data.accountUpdateUsername({
      username: this.input.username
    }).pipe(
    // If succeeds on username update, then update profile
    (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(result => this.businessProvider.data.accountUpdateProfile({
      input: {
        firstName: this.input.firstName,
        lastName: this.input.lastName,
        dateOfBirth: this.input.dateOfBirth,
        phone: this.input.phone,
        location: this.input.location,
        line1: this.input.line1,
        line2: this.input.line2,
        city: this.input.city,
        state: this.input.state,
        postalCode: this.input.postalCode
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.accountUpdateProfile)))));
  }
}

/***/ }),

/***/ 586190:
/*!************************************************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/settings/business-logic/actions/update-billing.action.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateBillingAction": () => (/* binding */ UpdateBillingAction)
/* harmony export */ });
/* harmony import */ var _settings_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./settings.business-action-base */ 691790);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 670262);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 960515);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 439646);



class UpdateBillingAction extends _settings_business_action_base__WEBPACK_IMPORTED_MODULE_1__.SettingsBusinessActionBase {
  constructor(input) {
    super('UpdateBillingAction');
    this.input = input;
    this.inputData = {};
    console.log(this.input);
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange('cardHolder', 'cardHolder should be more than 2 characters', this.input.cardHolder, 2, 25, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange('cardExpiration', 'cardExpiration should be between 2 and 5', this.input.cardExpiration, 2, 5, true));
    if (this.input.cardExpiration) {
      this.inputData.expireMonth = Number(this.input.cardExpiration.substring(0, 2));
      this.inputData.expireYear = Number(this.input.cardExpiration.substring(2, 4));
      this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.Min('cardExpiration', 'Expiration Month should be greater than 0', this.inputData.expireMonth, 1, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.Max('cardExpiration', 'Expiration Month should be smaller than 13', this.inputData.expireMonth, 12, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.Min('cardExpiration', 'Expiration year should be greater than 0', this.inputData.expireYear, 1, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.Max('cardExpiration', 'Expiration year should be smaller than 100', this.inputData.expireYear, 99, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange('country', 'You have to country', this.input.country, 2, 2, true));
    }
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange('zip', 'zip should be more than 2 characters', this.input.zip, 2, 10, true));
  }
  postValidateAction() {
    super.postValidateAction();
    this.inputData.cardHolder = this.input.cardHolder;
    this.inputData.zip = this.input.zip;
    this.inputData.country = this.input.country;
    console.log('inputData = ', this.inputData);
  }
  performAction() {
    this.response = this.businessProvider.data.userUpdateBillingInfo({
      input: this.inputData
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.catchError)(error => {
      console.log('catChError', error);
      this.response = this.createFailResponse();
      return rxjs__WEBPACK_IMPORTED_MODULE_3__.EMPTY;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(result => {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)(result.data.billingInfo);
    }));
  }
}

/***/ }),

/***/ 463333:
/*!*************************************************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/settings/business-logic/actions/update-password-action.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdatePasswordAction": () => (/* binding */ UpdatePasswordAction)
/* harmony export */ });
/* harmony import */ var _settings_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./settings.business-action-base */ 691790);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);



class UpdatePasswordAction extends _settings_business_action_base__WEBPACK_IMPORTED_MODULE_1__.SettingsBusinessActionBase {
  constructor(input) {
    super('UpdatePasswordAction');
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange('currentPassword', 'Current password should be more than 2 characters', this.input.currentPassword, 2, 100, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange('password', 'Password should be more than 2 characters', this.input.password, 2, 100, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.AreEqual('verified', 'PasswordConfirm should match with the password', this.input.verified, this.input.password, true));
  }
  performAction() {
    // First Update Username
    this.response = this.businessProvider.data.accountUpdatePassword({
      input: this.input
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.accountUpdatePassword)));
  }
}

/***/ }),

/***/ 963483:
/*!*********************************************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/settings/business-logic/actions/update-plan.action.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdatePlanAction": () => (/* binding */ UpdatePlanAction)
/* harmony export */ });
/* harmony import */ var _settings_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./settings.business-action-base */ 691790);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);


class UpdatePlanAction extends _settings_business_action_base__WEBPACK_IMPORTED_MODULE_1__.SettingsBusinessActionBase {
  constructor(planId) {
    super('UpdatePlanAction');
    this.planId = planId;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('planId', 'planId should not be null', this.planId, true));
  }
  performAction() {
    // this.response = this.businessProvider.data.userUpdateAcademyCategory({academyCategoryId: this.categoryId, input: this.input }).pipe
    // (
    //     catchError((error) => {
    //       console.log('catChError')
    //         this.response = this.createFailResponse();
    //         return EMPTY;
    //     }),
    //     switchMap((result) => {
    //         return of(result.data.updated)
    //     })
    // )
  }
}

/***/ }),

/***/ 693684:
/*!*****************************************************************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/settings/business-logic/actions/update-role-feature-permissions.action.ts ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateRoleFeaturePermissionsAction": () => (/* binding */ UpdateRoleFeaturePermissionsAction)
/* harmony export */ });
/* harmony import */ var _settings_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./settings.business-action-base */ 691790);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 670262);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 960515);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);



class UpdateRoleFeaturePermissionsAction extends _settings_business_action_base__WEBPACK_IMPORTED_MODULE_1__.SettingsBusinessActionBase {
  constructor(roleId, originalRoleFeaturePermissionIds, newRoleFeaturePermissionIds, featureIds) {
    super('UpdateRoleFeaturePermissionsAction');
    this.roleId = roleId;
    this.originalRoleFeaturePermissionIds = originalRoleFeaturePermissionIds;
    this.newRoleFeaturePermissionIds = newRoleFeaturePermissionIds;
    this.featureIds = featureIds;
    this.featurePermissionIdsToAdd = [];
    this.featurePermissionIdsToRemove = [];
  }
  preValidateAction() {
    console.log(this.roleId);
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('roleId', 'RoleId should not be null', this.roleId, true));
  }
  postValidateAction() {
    super.postValidateAction();
    this.featurePermissionIdsToAdd = this.newRoleFeaturePermissionIds.filter(el => !this.originalRoleFeaturePermissionIds.includes(el));
    this.featurePermissionIdsToRemove = this.originalRoleFeaturePermissionIds.filter(el => !this.newRoleFeaturePermissionIds.includes(el));
  }
  performAction() {
    this.response = this.businessProvider.data.adminRoleFeaturePermissionsUpdate({
      roleId: this.roleId,
      input: {
        featurePermissionIdsToAdd: this.featurePermissionIdsToAdd,
        featurePermissionIdsToRemove: this.featurePermissionIdsToRemove,
        featureIds: this.featureIds
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.catchError)(error => {
      console.log('catChError', error);
      this.response = this.createFailResponse();
      return rxjs__WEBPACK_IMPORTED_MODULE_3__.EMPTY;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(result => {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)(result.data.result);
    }));
  }
}

/***/ }),

/***/ 532939:
/*!***********************************************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/settings/business-logic/actions/update-tenant.action.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateTenantAction": () => (/* binding */ UpdateTenantAction)
/* harmony export */ });
/* harmony import */ var _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/rules-engine */ 266710);
/* harmony import */ var _settings_business_action_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./settings.business-action-base */ 691790);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 670262);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 960515);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 439646);




class UpdateTenantAction extends _settings_business_action_base__WEBPACK_IMPORTED_MODULE_1__.SettingsBusinessActionBase {
  constructor(tenantId, avatar, input) {
    super('UpdateTenantAction');
    this.tenantId = tenantId;
    this.avatar = avatar;
    this.input = input;
  }
  preValidateAction() {
    this.validationContext.addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.IsNotNullOrUndefined('tenantId', 'tenantId should not be null', this.tenantId, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange('name', 'Name should be more than 2 characters', this.input.name, 2, 20, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange('email', 'Email should be more than 2 characters', this.input.email, 2, 20, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange('phone', 'Phone should be more than 2 characters', this.input.phone, 2, 20, true)).addRule(new _schema_driven_rules_engine__WEBPACK_IMPORTED_MODULE_0__.StringIsNotNullEmptyRange('country', 'You have to select one of the countries', this.input.country, 2, 2, true));
  }
  performAction() {
    console.log(this.avatar);
    if (this.avatar && typeof this.avatar !== 'string') {
      const formData = new FormData();
      formData.append('operations', '{"query": "mutation UploadFile($file: Upload!) { uploaded: uploadFile(file: $file) { url }}"}');
      formData.append('map', '{"0": ["variables.file"]}');
      formData.append('0', this.avatar);
      const accessToken = localStorage.getItem('accessToken');
      console.log(accessToken);
      this.response = this.businessProvider.http.post('http://127.0.0.1:3000/graphql', formData, {
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.catchError)(error => {
        console.log(error);
        return rxjs__WEBPACK_IMPORTED_MODULE_3__.EMPTY;
      }), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(response => {
        console.log(response);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)(response.data.uploaded.url);
      })).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(logo_url => this.businessProvider.data.adminUpdateTenant({
        tenantId: this.tenantId,
        input: Object.assign(Object.assign({}, this.input), {
          logo_url
        })
      }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.catchError)(error => {
        this.response = this.createFailResponse();
        return rxjs__WEBPACK_IMPORTED_MODULE_3__.EMPTY;
      }), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(result => {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)(result.data.updated);
      }))));
    } else {
      this.response = this.businessProvider.data.adminUpdateTenant({
        tenantId: this.tenantId,
        input: this.input
      }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.catchError)(error => {
        this.response = this.createFailResponse();
        return rxjs__WEBPACK_IMPORTED_MODULE_3__.EMPTY;
      }), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(result => {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)(result.data.updated);
      }));
    }
  }
}

/***/ }),

/***/ 135477:
/*!*****************************************************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/settings/business-logic/settings.business-provider.service.ts ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingsBusinessProviderService": () => (/* binding */ SettingsBusinessProviderService)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 763900);
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _actions_update_plan_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/update-plan.action */ 963483);
/* harmony import */ var _actions_update_billing_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/update-billing.action */ 586190);
/* harmony import */ var _actions_create_billing_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/create-billing-action */ 611416);
/* harmony import */ var _actions_update_role_feature_permissions_action__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./actions/update-role-feature-permissions.action */ 693684);
/* harmony import */ var _actions_update_tenant_action__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./actions/update-tenant.action */ 532939);
/* harmony import */ var _actions_update_account_action__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./actions/update-account-action */ 687619);
/* harmony import */ var _actions_update_password_action__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./actions/update-password-action */ 463333);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common/http */ 80529);




















class SettingsBusinessProviderService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  constructor(logger, data, serviceContext, http) {
    super('NotificationService.SettingsBusinessProviderService', logger, serviceContext);
    this.data = data;
    this.http = http;
  }
  updatePlan(planId) {
    const action = new _actions_update_plan_action__WEBPACK_IMPORTED_MODULE_2__.UpdatePlanAction(planId);
    action.Do(this);
    return action.response;
  }
  updateBillingInfo(input) {
    const action = new _actions_update_billing_action__WEBPACK_IMPORTED_MODULE_3__.UpdateBillingAction(input);
    action.Do(this);
    return action.response;
  }
  createBillingInfo(input) {
    const action = new _actions_create_billing_action__WEBPACK_IMPORTED_MODULE_4__.CreateBillingAction(input);
    action.Do(this);
    return action.response;
  }
  loadBasicData() {
    return this.data.loadBasicData({
      roleInput: {},
      featureInput: {},
      permissionInput: {}
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)({
      roles: response.data.roles,
      features: response.data.features,
      permissions: response.data.permissions
    })));
  }
  loadRoleFeaturePermissions(roleId) {
    return this.data.adminRoleFeaturePermissions({
      input: {
        roleId: roleId
      }
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(response.data.items)));
  }
  updateRoleFeaturePermissions(roleId, originalRoleFeaturePermissionIds, newRoleFeaturePermissionIds, featureIds) {
    const action = new _actions_update_role_feature_permissions_action__WEBPACK_IMPORTED_MODULE_7__.UpdateRoleFeaturePermissionsAction(roleId, originalRoleFeaturePermissionIds, newRoleFeaturePermissionIds, featureIds);
    action.Do(this);
    return action.response;
  }
  fetchUsersAndRoles() {
    return this.data.fetchUsersAndRoles({
      userInput: {},
      roleInput: {}
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)({
      users: response.data.users,
      roles: response.data.roles
    })));
  }
  updateUserRoles(userId, roleIds) {
    return this.data.adminUpdateUserRoles({
      userId,
      input: {
        roleIds
      }
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(response.data.result)));
  }
  loadTenants() {
    this.data;
    return this.data.adminTenants({
      input: {}
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(response.data.items)));
  }
  updatePassword(input) {
    const action = new _actions_update_password_action__WEBPACK_IMPORTED_MODULE_8__.UpdatePasswordAction(input);
    action.Do(this);
    return action.response;
  }
  updateTenant(tenantId, avatar, input) {
    const action = new _actions_update_tenant_action__WEBPACK_IMPORTED_MODULE_9__.UpdateTenantAction(tenantId, avatar, input);
    action.Do(this);
    return action.response;
  }
  updateAccount(input) {
    const action = new _actions_update_account_action__WEBPACK_IMPORTED_MODULE_10__.UpdateAccountAction(input);
    action.Do(this);
    return action.response;
  }
  loadNovuNotifications() {
    return this.data.userNovuNotifications().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.switchMap)(resp => (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(resp.data.notifications)));
  }
  subscribeNotification(notificationId) {
    return this.data.subscribeNovuNotification({
      notificationId
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.switchMap)(resp => (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(true)));
  }
  unsubscribeNotification(notificationId) {
    return this.data.unsubscribeNovuNotification({
      notificationId
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.switchMap)(resp => (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(true)));
  }
  loadRoleNavigations(input) {
    return this.data.adminRoleNavigations({
      input
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(response.data.roleNavigations)));
  }
  updateRoleNavigation(roleNavigationId, input) {
    return this.data.adminUpdateRoleNavigation({
      id: roleNavigationId,
      input
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(response.data.updated)));
  }
}
SettingsBusinessProviderService.ɵfac = function SettingsBusinessProviderService_Factory(t) {
  return new (t || SettingsBusinessProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_12__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](_schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceContext), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_13__.HttpClient));
};
SettingsBusinessProviderService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineInjectable"]({
  token: SettingsBusinessProviderService,
  factory: SettingsBusinessProviderService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 730788:
/*!***********************************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/settings/business-logic/settings.service.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingsService": () => (/* binding */ SettingsService)
/* harmony export */ });
/* harmony import */ var _schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @schema-driven/logging */ 494391);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @schema-driven/foundation */ 933886);
/* harmony import */ var _settings_business_provider_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./settings.business-provider.service */ 135477);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 94650);









class SettingsService extends _schema_driven_foundation__WEBPACK_IMPORTED_MODULE_1__.ServiceBase {
  /**
   * Constructor
   */
  constructor(serviceContext, businessProvider, loggingService) {
    super("SettingsService", loggingService, serviceContext);
    this.businessProvider = businessProvider;
  }
  accountProfile() {
    return this.businessProvider.data.accountProfile().pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.accountProfile)));
  }
  loadPlans() {
    return this.businessProvider.data.userPlans({
      input: {}
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.plans)));
  }
  loadBillingInfo() {
    return this.businessProvider.data.userBillingInfo({
      userId: ""
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.billingInfo)));
  }
  updatePlan(planId) {
    return this.businessProvider.updatePlan(planId);
  }
  updateBillingInfo(input) {
    return this.businessProvider.updateBillingInfo(input);
  }
  createBillingInfo(input) {
    return this.businessProvider.createBillingInfo(input);
  }
  getPrices() {
    return this.businessProvider.data.listPrices({
      input: {}
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => {
      console.log(response);
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.prices);
    }));
  }
  getSubscriptions() {
    return this.businessProvider.data.listSubscriptions({
      input: {}
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.subscriptions)));
  }
  subscribePrice(priceId) {
    return this.businessProvider.data.subscribe({
      priceId
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.result.status)));
  }
  cancelSubscribe(subscriptionId) {
    return this.businessProvider.data.cancelSubcribe({
      subscriptionId
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(response => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(response.data.result.status)));
  }
  loadBasicData() {
    return this.businessProvider.loadBasicData();
  }
  loadRoleFeaturePermissions(roleId) {
    return this.businessProvider.loadRoleFeaturePermissions(roleId);
  }
  updateRoleFeaturePermissions(roleId, originalRoleFeaturePermissionIds, newRoleFeaturePermissionIds, featureIds) {
    return this.businessProvider.updateRoleFeaturePermissions(roleId, originalRoleFeaturePermissionIds, newRoleFeaturePermissionIds, featureIds);
  }
  fetchUsersAndRoles() {
    return this.businessProvider.fetchUsersAndRoles();
  }
  updateUserRoles(userId, roleIds) {
    return this.businessProvider.updateUserRoles(userId, roleIds);
  }
  loadTenants() {
    return this.businessProvider.loadTenants();
  }
  updateTenant(tenantId, avatar, input) {
    return this.businessProvider.updateTenant(tenantId, avatar, input);
  }
  updateAccount(input) {
    return this.businessProvider.updateAccount(input);
  }
  loadNovuNotifications() {
    return this.businessProvider.loadNovuNotifications();
  }
  subscribeNotification(notificationId) {
    return this.businessProvider.subscribeNotification(notificationId);
  }
  unsubscribeNotification(notificationId) {
    return this.businessProvider.unsubscribeNotification(notificationId);
  }
  loadRoleNaviations(input) {
    return this.businessProvider.loadRoleNavigations(input);
  }
  loadRoles() {
    return this.businessProvider.data.adminRoles({}).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(res => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(res.data.items)));
  }
  updateRoleNavigation(roleNavigationId, input) {
    return this.businessProvider.updateRoleNavigation(roleNavigationId, input);
  }
  updatePassword(input) {
    return this.businessProvider.updatePassword(input);
  }
}
SettingsService.ɵfac = function SettingsService_Factory(t) {
  return new (t || SettingsService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_settings_business_provider_service__WEBPACK_IMPORTED_MODULE_5__.SettingsBusinessProviderService, 8), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_settings_business_provider_service__WEBPACK_IMPORTED_MODULE_5__.SettingsBusinessProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_schema_driven_logging__WEBPACK_IMPORTED_MODULE_0__.LoggingService));
};
SettingsService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
  token: SettingsService,
  factory: SettingsService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 847449:
/*!*********************************************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/settings/formly-settings/formly-settings.component.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormlySettingsComponent": () => (/* binding */ FormlySettingsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 504523);
/* harmony import */ var _case_clinical_core_formly_setting__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @case-clinical/core/formly-setting */ 146277);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);







function FormlySettingsComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "ui-formly-json-form", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const formlySetting_r1 = ctx.ngIf;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("model", formlySetting_r1 == null ? null : formlySetting_r1.value)("componentStore", ctx_r0.store);
  }
}
class FormlySettingsComponent {
  constructor(formService, store) {
    this.formService = formService;
    this.store = store;
    this.vm$ = this.store.vm$;
    this.formlySetting$ = this.store.formlySetting$;
  }
  ngOnInit() {
    this.store.loadFormlySettingsEffect();
  }
}
FormlySettingsComponent.ɵfac = function FormlySettingsComponent_Factory(t) {
  return new (t || FormlySettingsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_core_formly_setting__WEBPACK_IMPORTED_MODULE_2__.FormlySettingsStore));
};
FormlySettingsComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: FormlySettingsComponent,
  selectors: [["formly-settings"]],
  decls: 2,
  vars: 3,
  consts: [["class", "w-full max-w-3xl", 4, "ngIf"], [1, "w-full", "max-w-3xl"], ["formName", "admin_formly_settings", 1, "w-full", "h-full", 3, "showSubmitButton", "model", "componentStore"]],
  template: function FormlySettingsComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, FormlySettingsComponent_div_0_Template, 2, 3, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](1, "async");
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](1, 1, ctx.formlySetting$));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_4__.WebUiFormlyJsonFormComponent, _angular_common__WEBPACK_IMPORTED_MODULE_3__.AsyncPipe],
  encapsulation: 2,
  changeDetection: 0
});

/***/ }),

/***/ 851806:
/*!*********************************************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/settings/normal-settings/normal-settings.component.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NormalSettingsComponent": () => (/* binding */ NormalSettingsComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 782722);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _fuse_services_media_watcher__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fuse/services/media-watcher */ 772327);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/sidenav */ 523267);
/* harmony import */ var _layout_feature_common_settings_settings_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../../layout/feature/common/settings/settings.component */ 131802);
/* harmony import */ var _formly_settings_formly_settings_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../formly-settings/formly-settings.component */ 847449);
/* harmony import */ var _account_account_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../account/account.component */ 49758);
/* harmony import */ var _settings_feature_settings_feature_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../settings-feature/settings-feature.component */ 51711);
/* harmony import */ var _notifications_notifications_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../notifications/notifications.component */ 878054);
/* harmony import */ var _plan_billing_plan_billing_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../plan-billing/plan-billing.component */ 483917);
/* harmony import */ var _settings_role_settings_role_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../settings-role/settings-role.component */ 711835);
/* harmony import */ var _security_security_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../security/security.component */ 258370);
/* harmony import */ var _team_team_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../team/team.component */ 926130);
/* harmony import */ var _settings_tenant_settings_tenant_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../settings-tenant/settings-tenant.component */ 610778);




















const _c0 = ["drawer"];
const _c1 = function (a0, a1) {
  return {
    "hover:bg-gray-100 dark:hover:bg-hover": a0,
    "bg-primary-50 dark:bg-hover": a1
  };
};
const _c2 = function (a0, a1) {
  return {
    "text-hint": a0,
    "text-primary dark:text-primary-500": a1
  };
};
const _c3 = function (a0) {
  return {
    "text-primary dark:text-primary-500": a0
  };
};
function NormalSettingsComponent_ng_container_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NormalSettingsComponent_ng_container_11_Template_div_click_1_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r14);
      const panel_r12 = restoredCtx.$implicit;
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r13.goToPanel(panel_r12.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "mat-icon", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 21)(4, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const panel_r12 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](6, _c1, !ctx_r1.selectedPanel || ctx_r1.selectedPanel !== panel_r12.id, ctx_r1.selectedPanel && ctx_r1.selectedPanel === panel_r12.id));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](9, _c2, !ctx_r1.selectedPanel || ctx_r1.selectedPanel !== panel_r12.id, ctx_r1.selectedPanel && ctx_r1.selectedPanel === panel_r12.id))("svgIcon", panel_r12.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](12, _c3, ctx_r1.selectedPanel && ctx_r1.selectedPanel === panel_r12.id));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", panel_r12.title, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", panel_r12.description, " ");
  }
}
function NormalSettingsComponent_ng_container_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "settings-account");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function NormalSettingsComponent_ng_container_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "settings-security");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function NormalSettingsComponent_ng_container_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "settings-plan-billing");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function NormalSettingsComponent_ng_container_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "theme-settings");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function NormalSettingsComponent_ng_container_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "formly-settings");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function NormalSettingsComponent_ng_container_26_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "settings-notifications");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function NormalSettingsComponent_ng_container_27_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "settings-team");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function NormalSettingsComponent_ng_container_28_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "settings-feature");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function NormalSettingsComponent_ng_container_29_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "settings-role");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function NormalSettingsComponent_ng_container_30_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "settings-tenant");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
class NormalSettingsComponent {
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
    this.selectedPanel = 'account';
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
NormalSettingsComponent.ɵfac = function NormalSettingsComponent_Factory(t) {
  return new (t || NormalSettingsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_fuse_services_media_watcher__WEBPACK_IMPORTED_MODULE_3__.FuseMediaWatcherService));
};
NormalSettingsComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: NormalSettingsComponent,
  selectors: [["auth-normal-settings"]],
  viewQuery: function NormalSettingsComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.drawer = _t.first);
    }
  },
  inputs: {
    panels: "panels"
  },
  decls: 31,
  vars: 19,
  consts: [[1, "flex", "flex-col", "w-full", "min-w-0", "sm:absolute", "sm:inset-0", "sm:overflow-hidden"], [1, "flex-auto", "sm:h-full"], [1, "sm:w-96", "dark:bg-gray-900", 3, "autoFocus", "mode", "opened"], ["drawer", ""], [1, "flex", "items-center", "justify-between", "m-8", "mr-6", "sm:my-10"], [1, "text-4xl", "font-extrabold", "tracking-tight", "leading-none"], [1, "lg:hidden"], ["mat-icon-button", "", 3, "click"], [3, "svgIcon"], [1, "flex", "flex-col", "divide-y", "border-t", "border-b"], [4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "flex", "flex-col"], [1, "flex-auto", "px-6", "pt-9", "pb-12", "md:p-8", "md:pb-12", "lg:p-12"], [1, "flex", "items-center"], ["mat-icon-button", "", 1, "lg:hidden", "-ml-2", 3, "click"], [1, "ml-2", "lg:ml-0", "text-3xl", "font-bold", "tracking-tight", "leading-none"], [1, "h-full", "pt-8"], [3, "ngSwitch"], [4, "ngSwitchCase"], [1, "flex", "px-8", "py-5", "cursor-pointer", 3, "ngClass", "click"], [3, "ngClass", "svgIcon"], [1, "ml-3"], [1, "font-medium", "leading-6", 3, "ngClass"], [1, "mt-0.5", "text-secondary"]],
  template: function NormalSettingsComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "mat-drawer-container", 1)(2, "mat-drawer", 2, 3)(4, "div", 4)(5, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Settings");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 6)(8, "button", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NormalSettingsComponent_Template_button_click_8_listener() {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r15);
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](3);
        return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](_r0.close());
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "mat-icon", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, NormalSettingsComponent_ng_container_11_Template, 8, 14, "ng-container", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "mat-drawer-content", 11)(13, "div", 12)(14, "div", 13)(15, "button", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NormalSettingsComponent_Template_button_click_15_listener() {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r15);
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
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](21, NormalSettingsComponent_ng_container_21_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](22, NormalSettingsComponent_ng_container_22_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](23, NormalSettingsComponent_ng_container_23_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](24, NormalSettingsComponent_ng_container_24_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](25, NormalSettingsComponent_ng_container_25_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](26, NormalSettingsComponent_ng_container_26_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](27, NormalSettingsComponent_ng_container_27_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](28, NormalSettingsComponent_ng_container_28_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](29, NormalSettingsComponent_ng_container_29_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](30, NormalSettingsComponent_ng_container_30_Template, 2, 0, "ng-container", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autoFocus", false)("mode", ctx.drawerMode)("opened", ctx.drawerOpened);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:x");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.panels)("ngForTrackBy", ctx.trackByFn);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:menu");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.getPanelInfo(ctx.selectedPanel).title, " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitch", ctx.selectedPanel);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "account");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "security");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "plan-billing");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "theme");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "formly-settings");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "notifications");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "team");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "feature");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "role");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "tenant");
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgSwitch, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgSwitchCase, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatIconButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__.MatIcon, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_7__.MatDrawer, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_7__.MatDrawerContainer, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_7__.MatDrawerContent, _layout_feature_common_settings_settings_component__WEBPACK_IMPORTED_MODULE_8__.SettingsComponent, _formly_settings_formly_settings_component__WEBPACK_IMPORTED_MODULE_9__.FormlySettingsComponent, _account_account_component__WEBPACK_IMPORTED_MODULE_10__.SettingsAccountComponent, _settings_feature_settings_feature_component__WEBPACK_IMPORTED_MODULE_11__.SettingsFeatureComponent, _notifications_notifications_component__WEBPACK_IMPORTED_MODULE_12__.SettingsNotificationsComponent, _plan_billing_plan_billing_component__WEBPACK_IMPORTED_MODULE_13__.SettingsPlanBillingComponent, _settings_role_settings_role_component__WEBPACK_IMPORTED_MODULE_14__.SettingsRoleComponent, _security_security_component__WEBPACK_IMPORTED_MODULE_15__.SettingsSecurityComponent, _team_team_component__WEBPACK_IMPORTED_MODULE_16__.SettingsTeamComponent, _settings_tenant_settings_tenant_component__WEBPACK_IMPORTED_MODULE_17__.SettingsTenantComponent]
});

/***/ }),

/***/ 752922:
/*!************************************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/settings/notifications/notification.store.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NotificationStore": () => (/* binding */ NotificationStore)
/* harmony export */ });
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 318505);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 504523);
/* harmony import */ var _fuse_services_loading_loading_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fuse/services/loading/loading.service */ 301463);
/* harmony import */ var _case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/ui/toast */ 971873);
/* harmony import */ var _business_logic_settings_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../business-logic/settings.service */ 730788);











class NotificationStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(formService, loading, toast, service) {
    super({
      query: "",
      loading: false,
      notifications: []
    });
    this.formService = formService;
    this.loading = loading;
    this.toast = toast;
    this.service = service;
    this.loading$ = this.select(s => s.loading);
    this.notifications$ = this.select(s => s.notifications);
    this.adminNotifications$ = this.select(this.notifications$, notifications => {
      return notifications.filter(notification => notification.isAdmin);
    });
    this.userNotifications$ = this.select(this.notifications$, notifications => {
      return notifications.filter(notification => !notification.isAdmin);
    });
    this.vm$ = this.select(this.loading$, this.adminNotifications$, this.userNotifications$, (loading, adminNotifications, userNotifications) => ({
      loading,
      adminNotifications,
      userNotifications
    }));
    this.updateNotification = this.updater((state, data) => Object.assign(Object.assign({}, state), {
      notifications: state.notifications.map(el => {
        if (el.id === data.id) return Object.assign(Object.assign({}, el), {
          subscribed: data.subscribed
        });else return el;
      })
    }));
    this.loadNotificationsEffect = this.effect($ => $.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(() => {
      this.patchState({
        loading: true
      });
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(() => this.service.loadNovuNotifications().pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(notifications => {
      this.patchState({
        loading: false,
        notifications
      });
    }, error => {
      this.patchState({
        loading: false
      });
    })))));
    this.subscribeNotificationEffect = this.effect(notification$ => notification$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(() => {
      this.patchState({
        loading: true
      });
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(notification => this.service.subscribeNotification(notification.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(data => {
      this.toast.success('Successfully subscribed to ' + notification.name, {
        duration: 3000
      });
      this.patchState({
        loading: false
      });
      this.updateNotification({
        id: notification.id,
        subscribed: true
      });
    }, error => {
      this.toast.error("Failed to subscribe to " + notification.name, {
        duration: 3000,
        autoClose: true
      });
      this.patchState({
        loading: false
      });
    })))));
    this.unsubscribeNotificationEffect = this.effect(notification$ => notification$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(notification => {
      this.patchState({
        loading: true
      });
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(notification => this.service.unsubscribeNotification(notification.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(data => {
      this.toast.success('Successfully unsubscribed from ' + notification.name, {
        duration: 3
      });
      this.patchState({
        loading: false
      });
      this.updateNotification({
        id: notification.id,
        subscribed: false
      });
    }, error => {
      this.toast.error("Failed to unsubscribe from " + notification.name, {
        duration: 3000
      });
      this.patchState({
        loading: false
      });
    })))));
  }
}
NotificationStore.ɵfac = function NotificationStore_Factory(t) {
  return new (t || NotificationStore)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_4__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_fuse_services_loading_loading_service__WEBPACK_IMPORTED_MODULE_5__.FuseLoadingService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_6__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_business_logic_settings_service__WEBPACK_IMPORTED_MODULE_7__.SettingsService));
};
NotificationStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
  token: NotificationStore,
  factory: NotificationStore.ɵfac
});

/***/ }),

/***/ 878054:
/*!*****************************************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/settings/notifications/notifications.component.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingsNotificationsComponent": () => (/* binding */ SettingsNotificationsComponent)
/* harmony export */ });
/* harmony import */ var _notification_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./notification.store */ 752922);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/slide-toggle */ 690455);
/* harmony import */ var _angular_material_stepper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/stepper */ 958425);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 224006);










function SettingsNotificationsComponent_div_0_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 10)(1, "div", 11)(2, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-slide-toggle", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function SettingsNotificationsComponent_div_0_div_4_Template_mat_slide_toggle_ngModelChange_4_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8);
      const adminNotification_r6 = restoredCtx.$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](adminNotification_r6.subscribed = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SettingsNotificationsComponent_div_0_div_4_Template_div_click_5_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8);
      const adminNotification_r6 = restoredCtx.$implicit;
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r9.toggleSubscribe(adminNotification_r6));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const adminNotification_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](adminNotification_r6.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", "primary")("ngModel", adminNotification_r6.subscribed);
  }
}
function SettingsNotificationsComponent_div_0_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 15)(1, "div", 16)(2, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-slide-toggle", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function SettingsNotificationsComponent_div_0_div_8_Template_mat_slide_toggle_ngModelChange_4_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r12);
      const userNotification_r10 = restoredCtx.$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](userNotification_r10.subscribed = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SettingsNotificationsComponent_div_0_div_8_Template_div_click_5_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r12);
      const userNotification_r10 = restoredCtx.$implicit;
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r13.toggleSubscribe(userNotification_r10));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const userNotification_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", userNotification_r10.name, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", "primary")("ngModel", userNotification_r10.subscribed);
  }
}
function SettingsNotificationsComponent_div_0_button_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Back");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", "primary");
  }
}
function SettingsNotificationsComponent_div_0_button_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Done");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", "primary");
  }
}
function SettingsNotificationsComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 1)(1, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Admin Notifications");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, SettingsNotificationsComponent_div_0_div_4_Template, 6, 3, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "User Notifications");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, SettingsNotificationsComponent_div_0_div_8_Template, 6, 3, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, SettingsNotificationsComponent_div_0_button_11_Template, 2, 1, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, SettingsNotificationsComponent_div_0_button_12_Template, 2, 1, "button", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const vm_r1 = ctx.ngIf;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", vm_r1.adminNotifications);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", vm_r1.userNotifications);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.isSignUpProcess);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.isSignUpProcess);
  }
}
class SettingsNotificationsComponent {
  /**
   * Constructor
   */
  constructor(store) {
    this.store = store;
    this.isSignUpProcess = false;
    this.vm$ = this.store.vm$;
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit() {
    this.store.loadNotificationsEffect();
  }
  toggleSubscribe(novuNotification) {
    if (novuNotification) {
      this.store.unsubscribeNotificationEffect(novuNotification);
    } else {
      this.store.subscribeNotificationEffect(novuNotification);
    }
  }
}
SettingsNotificationsComponent.ɵfac = function SettingsNotificationsComponent_Factory(t) {
  return new (t || SettingsNotificationsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_notification_store__WEBPACK_IMPORTED_MODULE_1__.NotificationStore));
};
SettingsNotificationsComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: SettingsNotificationsComponent,
  selectors: [["settings-notifications"]],
  inputs: {
    isSignUpProcess: "isSignUpProcess"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_notification_store__WEBPACK_IMPORTED_MODULE_1__.NotificationStore])],
  decls: 2,
  vars: 3,
  consts: [["class", "w-full max-w-3xl", 4, "ngIf"], [1, "w-full", "max-w-3xl"], [1, "w-full", "text-xl"], [1, "grid", "grid-cols-1", "gap-2", "w-full", "mt-4"], ["class", "flex items-center justify-between text-white shadow-gray-400 border-2 rounded-lg p-2 relative", 4, "ngFor", "ngForOf"], [1, "my-10", "border-t"], ["class", "grid grid-cols-1 gap-4 w-full mt-4", 4, "ngFor", "ngForOf"], [1, "flex", "items-center", "justify-end", "gap-2"], ["mat-flat-button", "", "type", "button", "matStepperPrevious", "", 3, "color", 4, "ngIf"], ["mat-flat-button", "", "type", "button", "routerLink", "/dashboards/project", 3, "color", 4, "ngIf"], [1, "flex", "items-center", "justify-between", "text-white", "shadow-gray-400", "border-2", "rounded-lg", "p-2", "relative"], [1, "flex-auto", "cursor-pointer"], [1, "leading-6", "font-medium", "text-gray-900", "dark:text-gray-50"], [1, "ml-2", 3, "color", "ngModel", "ngModelChange"], [1, "absolute", "left-0", "right-0", "top-0", "bottom-0", "z-99999", "cursor-pointer", 3, "click"], [1, "grid", "grid-cols-1", "gap-4", "w-full", "mt-4"], [1, "flex", "items-center", "justify-between", "text-gray-900", "dark:text-gray-50", "relative", "shadow-gray-400", "border-2", "rounded-lg", "p-2"], [1, "flex-auto", "leading-6", "cursor-pointer"], ["mat-flat-button", "", "type", "button", "matStepperPrevious", "", 3, "color"], ["mat-flat-button", "", "type", "button", "routerLink", "/dashboards/project", 3, "color"]],
  template: function SettingsNotificationsComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, SettingsNotificationsComponent_div_0_Template, 13, 4, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](1, "async");
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](1, 1, ctx.vm$));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _angular_material_button__WEBPACK_IMPORTED_MODULE_3__.MatButton, _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_4__.MatSlideToggle, _angular_material_stepper__WEBPACK_IMPORTED_MODULE_5__.MatStepperPrevious, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterLink, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgModel, _angular_common__WEBPACK_IMPORTED_MODULE_2__.AsyncPipe],
  encapsulation: 2,
  changeDetection: 0
});

/***/ }),

/***/ 792281:
/*!*************************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/settings/pipes/server-url.pipe.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ServerUrlPipe": () => (/* binding */ ServerUrlPipe)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);

class ServerUrlPipe {
  transform(relativeUrl) {
    console.log('ServerUrlPipe', relativeUrl);
    const baseApiUrl = "http://localhost:3000";
    return `${baseApiUrl}${relativeUrl}`;
  }
}
ServerUrlPipe.ɵfac = function ServerUrlPipe_Factory(t) {
  return new (t || ServerUrlPipe)();
};
ServerUrlPipe.ɵpipe = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({
  name: "serverUrl",
  type: ServerUrlPipe,
  pure: true
});

/***/ }),

/***/ 91531:
/*!***********************************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/settings/plan-billing/plan-billing-store.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlanBillingStore": () => (/* binding */ PlanBillingStore)
/* harmony export */ });
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 318505);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 504523);
/* harmony import */ var _fuse_services_loading_loading_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fuse/services/loading/loading.service */ 301463);
/* harmony import */ var _case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/ui/toast */ 971873);
/* harmony import */ var _business_logic_settings_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../business-logic/settings.service */ 730788);












const countries = [{
  code: 'US',
  name: 'United States'
}, {
  code: 'CA',
  name: 'Canada'
}, {
  code: 'MX',
  name: 'Mexico'
}, {
  code: 'FR',
  name: 'France'
}, {
  code: 'DE',
  name: 'Germany'
}, {
  code: 'IT',
  name: 'Italy'
}];
class PlanBillingStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(formService, loading, toast, service) {
    super({
      plans: [],
      loading: false,
      countries: countries
    });
    this.formService = formService;
    this.loading = loading;
    this.toast = toast;
    this.service = service;
    this.loading$ = this.select(s => s.loading);
    this.plans$ = this.select(s => s.plans);
    this.selectedPlanId$ = this.select(s => s.selectedPlanId);
    this.billingInfo$ = this.select(s => s.billingInfo);
    this.countries$ = this.select(s => s.countries);
    this.vm$ = this.select(this.loading$, this.countries$, this.plans$, this.selectedPlanId$, this.billingInfo$, (loading, countries, plans, selectedPlanId, billingInfo) => ({
      loading,
      countries,
      plans,
      selectedPlanId,
      billingInfo
    }));
    this.selectPlan = this.updater((state, planId) => Object.assign(Object.assign({}, state), {
      selectedPlanId: planId
    }));
    this.updateCardInfoEffect = this.effect(input$ => input$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(input => {
      this.loading.show();
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(input => this.service.updateBillingInfo(input).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(billingInfo => {
      this.toast.success('Successfully updated billing information', {
        duration: 3000
      });
      this.loading.hide();
    }, error => {
      this.loading.hide();
      this.toast.error(error.Message, {
        duration: 3000
      });
    })))));
    this.createCardInfoEffect = this.effect(input$ => input$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(input => {
      this.loading.show();
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(input => this.service.createBillingInfo(input).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(billingInfo => {
      this.toast.success('Successfully created billing information', {
        duration: 3000
      });
      this.patchState({
        billingInfo
      });
      this.loading.hide();
    }, error => {
      this.loading.hide();
      // this.toast.error('Failed to create billing information', { duration: 3000 })
      this.toast.error(error.Message, {
        duration: 3000
      });
    })))));
    this.loadBillingInfo = this.effect($ => $.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(() => {
      this.patchState({
        loading: true
      });
      this.loading.show();
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(_ => this.service.loadBillingInfo().pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(billingInfo => {
      console.log(billingInfo);
      this.loading.hide();
      this.patchState({
        billingInfo: {
          cardHolder: billingInfo.cardHolder,
          country: billingInfo.country,
          id: billingInfo.id,
          zip: billingInfo.zip,
          cardCVC: '***',
          cardExpiration: `${billingInfo.expireMonth}${billingInfo.expireYear}`,
          cardNumber: `*************${billingInfo.last4}`
        },
        loading: false
      });
    }, error => {
      this.loading.hide();
      this.patchState({
        loading: false
      });
    })))));
    this.loadPlansEffect = this.effect($ => $.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(_ => this.service.loadPlans().pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(plans => {
      let selectedPlanId = null;
      const myPlan = plans.find(plan => plan.isMine);
      console.log(plans);
      if (myPlan) selectedPlanId = myPlan.id;
      this.patchState({
        selectedPlanId: selectedPlanId,
        plans: plans
      });
    }, error => {
      console.log(error);
    })))));
  }
}
PlanBillingStore.ɵfac = function PlanBillingStore_Factory(t) {
  return new (t || PlanBillingStore)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_4__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_fuse_services_loading_loading_service__WEBPACK_IMPORTED_MODULE_5__.FuseLoadingService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_6__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_business_logic_settings_service__WEBPACK_IMPORTED_MODULE_7__.SettingsService));
};
PlanBillingStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
  token: PlanBillingStore,
  factory: PlanBillingStore.ɵfac
});

/***/ }),

/***/ 483917:
/*!***************************************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/settings/plan-billing/plan-billing.component.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingsPlanBillingComponent": () => (/* binding */ SettingsPlanBillingComponent)
/* harmony export */ });
/* harmony import */ var _plan_billing_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./plan-billing-store */ 91531);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 504523);
/* harmony import */ var _fuse_services_confirmation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fuse/services/confirmation */ 50253);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _fuse_components_alert_alert_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fuse/components/alert/alert.component */ 967884);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/radio */ 971948);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 224006);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);













function SettingsPlanBillingComponent_ng_container_1_ng_container_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "mat-radio-button", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const plan_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", plan_r5.id);
  }
}
function SettingsPlanBillingComponent_ng_container_1_ng_container_14_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "mat-icon", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:check-circle");
  }
}
const _c0 = function (a0) {
  return {
    "ring ring-inset ring-primary": a0
  };
};
function SettingsPlanBillingComponent_ng_container_1_ng_container_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SettingsPlanBillingComponent_ng_container_1_ng_container_14_Template_div_click_1_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9);
      const plan_r6 = restoredCtx.$implicit;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](12);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](_r2.value = plan_r6.id);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, SettingsPlanBillingComponent_ng_container_1_ng_container_14_ng_container_2_Template, 2, 1, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 19)(9, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](11, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, " / month");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const plan_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](10, _c0, _r2.value === plan_r6.id));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _r2.value === plan_r6.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](plan_r6.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](plan_r6.detail);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind4"](11, 5, plan_r6.price, "USD", "symbol", "1.0"));
  }
}
const _c1 = function (a0) {
  return {
    countries: a0
  };
};
const _c2 = function () {
  return {};
};
function SettingsPlanBillingComponent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "form", 2)(2, "div", 3)(3, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Change your plan");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Upgrade or downgrade your current plan.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 6)(8, "div", 7)(9, "fuse-alert", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, " Changing the plan will take effect immediately. You will be charged for the rest of the current month. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "mat-radio-group", 9, 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, SettingsPlanBillingComponent_ng_container_1_ng_container_13_Template, 2, 1, "ng-container", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](14, SettingsPlanBillingComponent_ng_container_1_ng_container_14_Template, 14, 12, "ng-container", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "ui-formly-json-form", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function SettingsPlanBillingComponent_ng_container_1_Template_ui_formly_json_form_save_16_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r11);
      const vm_r1 = restoredCtx.ngIf;
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](vm_r1.billingInfo ? ctx_r10.update($event) : ctx_r10.create($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const vm_r1 = ctx.ngIf;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    let tmp_10_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx_r0.planBillingForm);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("appearance", "outline")("type", "info");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControlName", "plan");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", vm_r1.plans)("ngForTrackBy", ctx_r0.trackByFn);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", vm_r1.plans)("ngForTrackBy", ctx_r0.trackByFn);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("formData", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](11, _c1, vm_r1.countries))("model", (tmp_10_0 = vm_r1.billingInfo) !== null && tmp_10_0 !== undefined ? tmp_10_0 : _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](13, _c2));
  }
}
class SettingsPlanBillingComponent {
  /**
   * Constructor
   */
  constructor(formService, store, confirmService) {
    this.formService = formService;
    this.store = store;
    this.confirmService = confirmService;
    this.isSignUpProcess = false;
    this.vm$ = this.store.vm$;
    this.formModel = {};
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit() {
    this.store.loadPlansEffect();
    this.store.loadBillingInfo();
  }
  updatePlan(newPlanId) {
    const dlg = this.confirmService.open({
      title: "Change your plan",
      message: "Are you sure you want to change your plan?"
    });
    dlg.afterClosed().subscribe(result => {
      if (result === 'confirmed') {
        this.store.selectPlan(newPlanId);
      }
    });
  }
  create(formData) {
    alert(JSON.stringify(formData));
    this.store.createCardInfoEffect(formData);
  }
  update(formData) {
    this.store.updateCardInfoEffect(formData);
    // alert(JSON.stringify(formData))
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
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
SettingsPlanBillingComponent.ɵfac = function SettingsPlanBillingComponent_Factory(t) {
  return new (t || SettingsPlanBillingComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_plan_billing_store__WEBPACK_IMPORTED_MODULE_2__.PlanBillingStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_fuse_services_confirmation__WEBPACK_IMPORTED_MODULE_3__.FuseConfirmationService));
};
SettingsPlanBillingComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: SettingsPlanBillingComponent,
  selectors: [["settings-plan-billing"]],
  inputs: {
    isSignUpProcess: "isSignUpProcess"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_plan_billing_store__WEBPACK_IMPORTED_MODULE_2__.PlanBillingStore])],
  decls: 3,
  vars: 3,
  consts: [[1, "w-full", "max-w-3xl"], [4, "ngIf"], [3, "formGroup"], [1, "w-full"], [1, "text-xl"], [1, "text-secondary"], [1, "grid", "sm:grid-cols-3", "gap-6", "w-full", "mt-8"], [1, "sm:col-span-3"], [3, "appearance", "type"], [1, "invisible", "absolute", "w-0", "h-0", "pointer-events-none", 3, "formControlName"], ["planRadioGroup", "matRadioGroup"], [4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "mt-12", "mb-10", "border-t", "border-primary/50"], ["formName", "settings_billing", 3, "showSubmitButton", "formData", "model", "save"], [3, "value"], [1, "relative", "flex", "flex-col", "items-start", "justify-start", "p-6", "rounded-md", "shadow", "cursor-pointer", "bg-card", 3, "ngClass", "click"], [1, "font-medium"], [1, "mt-1", "whitespace-normal", "text-secondary"], [1, "flex-auto"], [1, "mt-8", "text-lg"], [1, "absolute", "top-0", "right-0", "mt-3", "mr-3", "icon-size-7", "text-primary", 3, "svgIcon"]],
  template: function SettingsPlanBillingComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, SettingsPlanBillingComponent_ng_container_1_Template, 17, 14, "ng-container", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 1, ctx.vm$));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _fuse_components_alert_alert_component__WEBPACK_IMPORTED_MODULE_5__.FuseAlertComponent, _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__.MatIcon, _angular_material_radio__WEBPACK_IMPORTED_MODULE_7__.MatRadioGroup, _angular_material_radio__WEBPACK_IMPORTED_MODULE_7__.MatRadioButton, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControlName, _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_9__.WebUiFormlyJsonFormComponent, _angular_common__WEBPACK_IMPORTED_MODULE_4__.AsyncPipe, _angular_common__WEBPACK_IMPORTED_MODULE_4__.CurrencyPipe],
  encapsulation: 2,
  changeDetection: 0
});

/***/ }),

/***/ 956752:
/*!*************************************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/settings/security/security.component.store.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SecurityStore": () => (/* binding */ SecurityStore)
/* harmony export */ });
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 318505);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 504523);
/* harmony import */ var _fuse_services_loading_loading_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fuse/services/loading/loading.service */ 301463);
/* harmony import */ var _business_logic_settings_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../business-logic/settings.service */ 730788);
/* harmony import */ var _case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @case-clinical/web/ui/toast */ 971873);













class SecurityStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, formService, loading, service, toast) {
    super({
      query: '',
      loading: false
    });
    this.data = data;
    this.formService = formService;
    this.loading = loading;
    this.service = service;
    this.toast = toast;
    /********** Selectors Start ************/
    this.loading$ = this.select(s => s.loading);
    this.vm$ = this.select(this.loading$, loading => ({
      loading
    }));
    /********** Selectors End ************/
    /********** Updaters Start ************/
    this.updatePasswordEffect = this.effect(formData$ => formData$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(() => {
      this.patchState({
        loading: true
      });
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(formData => {
      const sendData = {
        currentPassword: formData === null || formData === void 0 ? void 0 : formData.oldPassword,
        password: formData === null || formData === void 0 ? void 0 : formData.newPassword,
        verified: formData === null || formData === void 0 ? void 0 : formData.passConfirm
      };
      console.log(sendData);
      return this.service.updatePassword(sendData).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(() => {
        this.toast.success('Successfully updated Password', {
          duration: 3000
        });
        this.patchState({
          loading: false
        });
      }, () => {
        this.toast.error('Failed to update Password', {
          duration: 3000
        });
        this.patchState({
          loading: false
        });
      }));
    })));
  }
}
SecurityStore.ɵfac = function SecurityStore_Factory(t) {
  return new (t || SecurityStore)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_4__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_5__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_fuse_services_loading_loading_service__WEBPACK_IMPORTED_MODULE_6__.FuseLoadingService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_business_logic_settings_service__WEBPACK_IMPORTED_MODULE_7__.SettingsService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_8__.WebUiToastService));
};
SecurityStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
  token: SecurityStore,
  factory: SecurityStore.ɵfac
});

/***/ }),

/***/ 258370:
/*!*******************************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/settings/security/security.component.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingsSecurityComponent": () => (/* binding */ SettingsSecurityComponent)
/* harmony export */ });
/* harmony import */ var _security_component_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./security.component.store */ 956752);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 224006);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);







function SettingsSecurityComponent_ui_formly_json_form_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ui-formly-json-form", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function SettingsSecurityComponent_ui_formly_json_form_1_Template_ui_formly_json_form_save_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r2.store.updatePasswordEffect($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const vm_r1 = ctx.ngIf;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("componentStore", ctx_r0.store)("showSubmitButton", false)("formData", vm_r1);
  }
}
class SettingsSecurityComponent {
  constructor(_formBuilder, store) {
    this._formBuilder = _formBuilder;
    this.store = store;
    this.isSignUpProcess = false;
    this.vm$ = this.store.vm$;
  }
}
SettingsSecurityComponent.ɵfac = function SettingsSecurityComponent_Factory(t) {
  return new (t || SettingsSecurityComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_security_component_store__WEBPACK_IMPORTED_MODULE_2__.SecurityStore));
};
SettingsSecurityComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: SettingsSecurityComponent,
  selectors: [["settings-security"]],
  inputs: {
    isSignUpProcess: "isSignUpProcess"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_security_component_store__WEBPACK_IMPORTED_MODULE_2__.SecurityStore])],
  decls: 3,
  vars: 3,
  consts: [[1, "w-full", "max-w-3xl"], ["formName", "settings_security", 3, "componentStore", "showSubmitButton", "formData", "save", 4, "ngIf"], ["formName", "settings_security", 3, "componentStore", "showSubmitButton", "formData", "save"]],
  template: function SettingsSecurityComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, SettingsSecurityComponent_ui_formly_json_form_1_Template, 1, 3, "ui-formly-json-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 1, ctx.vm$));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_4__.WebUiFormlyJsonFormComponent, _angular_common__WEBPACK_IMPORTED_MODULE_3__.AsyncPipe],
  encapsulation: 2,
  changeDetection: 0
});

/***/ }),

/***/ 668310:
/*!*******************************************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/settings/settings-feature/feature.item.component.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FeatureItemComponent": () => (/* binding */ FeatureItemComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/slide-toggle */ 690455);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);




function FeatureItemComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 6)(1, "ui-formly-json-form", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function FeatureItemComponent_div_6_Template_ui_formly_json_form_save_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r1.submit($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formName", ctx_r0.formName)("showSubmitButton", true)("formData", ctx_r0.formData);
  }
}
class FeatureItemComponent {
  constructor() {
    this.formName = "";
    this.open = false;
    this.formData = {};
  }
  ngOnInit() {
    this.formName = `${this.name}_setting`;
  }
  onChange($event) {
    console.log($event);
    this.open = $event.checked;
  }
  submit(formData) {
    alert(JSON.stringify(formData));
  }
}
FeatureItemComponent.ɵfac = function FeatureItemComponent_Factory(t) {
  return new (t || FeatureItemComponent)();
};
FeatureItemComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: FeatureItemComponent,
  selectors: [["feature-item"]],
  inputs: {
    name: "name",
    title: "title"
  },
  decls: 7,
  vars: 3,
  consts: [[1, "bg-white", "dark:bg-gray-800", "rounded-sm"], [1, "w-full", "border-b-2", "border-gray-200/50", "px-5", "py-4", "flex", "flex-row", "gap-4", "cursor-pointer"], [3, "color", "change"], [1, "pl-5", "text-base", "leading-6", "text-left", "border-l", "border-solid", "cursor-pointer", "border-zinc-300", "text-gray-900", "dark:text-gray-100"], [1, "flex-1"], ["class", "w-full px-5 py-4 min-h-16", 4, "ngIf"], [1, "w-full", "px-5", "py-4", "min-h-16"], [3, "formName", "showSubmitButton", "formData", "save"]],
  template: function FeatureItemComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "mat-slide-toggle", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function FeatureItemComponent_Template_mat_slide_toggle_change_2_listener($event) {
        return ctx.onChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "span", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, FeatureItemComponent_div_6_Template, 2, 3, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", "primary");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.title, " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.open);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.NgIf, _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_2__.MatSlideToggle, _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_3__.WebUiFormlyJsonFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 367506:
/*!***********************************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/settings/settings-feature/features-store.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FeaturesStore": () => (/* binding */ FeaturesStore)
/* harmony export */ });
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 318505);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 911365);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 504523);
/* harmony import */ var _fuse_services_loading_loading_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fuse/services/loading/loading.service */ 301463);
/* harmony import */ var _case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @case-clinical/web/ui/toast */ 971873);
/* harmony import */ var _business_logic_settings_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../business-logic/settings.service */ 730788);











class FeaturesStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(formService, loading, toast, service) {
    super({
      query: "",
      loading: false,
      prices: [],
      subscriptions: [],
      hideSubscribed: false
    });
    this.formService = formService;
    this.loading = loading;
    this.toast = toast;
    this.service = service;
    this.loading$ = this.select(s => s.loading);
    this.prices$ = this.select(s => s.prices);
    this.subscriptions$ = this.select(s => s.subscriptions);
    this.filteredPrices$ = this.select(s => {
      let fliteredPrices = s.prices.map(price => {
        const subscription = s.subscriptions.find(sub => sub.priceId === price.id);
        if (subscription && subscription.status === 'active') {
          price.subscribed = true;
        } else {
          price.subscribed = false;
        }
        return price;
      });
      if (s.query.length > 0) {
        fliteredPrices = fliteredPrices.filter(price => price.name.includes(s.query));
      }
      if (s.hideSubscribed) {
        fliteredPrices = fliteredPrices.filter(price => !price.subscribed);
      }
      return fliteredPrices;
    });
    this.vm$ = this.select(this.filteredPrices$, this.loading$, (filteredPrices, loading) => ({
      filteredPrices,
      loading
    }));
    this.setSearchQuery = this.updater((state, query) => Object.assign(Object.assign({}, state), {
      query: query
    }));
    this.setHideSubscribed = this.updater((state, hideSubsribed) => Object.assign(Object.assign({}, state), {
      hideSubscribed: hideSubsribed
    }));
    this.loadSubscriptionsEffect = this.effect($ => $.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(() => {
      this.patchState({
        loading: true
      });
      this.loading.show();
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(() => this.service.getSubscriptions().pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(subscriptions => {
      this.patchState({
        subscriptions: subscriptions,
        loading: false
      });
      this.loading.hide();
    }, error => {
      this.patchState({
        loading: false
      });
      this.loading.hide();
    })))));
    this.loadPricesEffect = this.effect(input$ => input$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(_ => this.service.getPrices().pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(data => {
      this.patchState({
        prices: data
      });
    }, error => {})))));
    this.cancelSubscriptionEffect = this.effect(priceId$ => priceId$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.subscriptions$), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([priceId, subscriptions]) => {
      const subscription = subscriptions.find(sub => sub.priceId === priceId);
      return this.service.cancelSubscribe(subscription.id).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(status => {
        const newSubscriptions = subscriptions.filter(sub => sub.priceId !== priceId);
        this.toast.success('Successfuly canceled from the feature', {
          duration: 3000
        });
        this.patchState({
          subscriptions: newSubscriptions,
          loading: false
        });
      }, error => {
        this.patchState({
          loading: false
        });
      }));
    })));
    this.subscribePriceEffect = this.effect(priceId$ => priceId$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(() => {
      this.patchState({
        loading: true
      });
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.subscriptions$), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([pId, subscriptions]) => this.service.subscribePrice(pId).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(subscriptionId => {
      this.toast.success('Successfuly subscribed to the feature', {
        duration: 3000
      });
      this.patchState({
        loading: false,
        subscriptions: [...subscriptions, {
          id: subscriptionId,
          priceId: pId,
          status: 'active'
        }]
      });
    }, error => {
      console.log(error);
      this.toast.error('Failed to subscribe', {
        duration: 3000
      });
      this.patchState({
        loading: false
      });
    })))));
  }
}
FeaturesStore.ɵfac = function FeaturesStore_Factory(t) {
  return new (t || FeaturesStore)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_5__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_fuse_services_loading_loading_service__WEBPACK_IMPORTED_MODULE_6__.FuseLoadingService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_7__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_business_logic_settings_service__WEBPACK_IMPORTED_MODULE_8__.SettingsService));
};
FeaturesStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
  token: FeaturesStore,
  factory: FeaturesStore.ɵfac
});

/***/ }),

/***/ 51711:
/*!***********************************************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/settings/settings-feature/settings-feature.component.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingsFeatureComponent": () => (/* binding */ SettingsFeatureComponent)
/* harmony export */ });
/* harmony import */ var _features_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./features-store */ 367506);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _fuse_services_confirmation_confirmation_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fuse/services/confirmation/confirmation.service */ 50253);
/* harmony import */ var _feature_item_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./feature.item.component */ 668310);






class SettingsFeatureComponent {
  constructor(store, confirm) {
    this.store = store;
    this.confirm = confirm;
    this.isSignUpProcess = false;
    this.vm$ = this.store.vm$;
    this.open = false;
    this.formData = {};
  }
  ngOnInit() {
    // this.store.loadPricesEffect()
    // this.store.loadSubscriptionsEffect()
  }
  onChange($event) {
    console.log($event);
    this.open = $event.checked;
  }
  submit(formData) {
    alert();
  }
}
SettingsFeatureComponent.ɵfac = function SettingsFeatureComponent_Factory(t) {
  return new (t || SettingsFeatureComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_features_store__WEBPACK_IMPORTED_MODULE_1__.FeaturesStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_fuse_services_confirmation_confirmation_service__WEBPACK_IMPORTED_MODULE_2__.FuseConfirmationService));
};
SettingsFeatureComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: SettingsFeatureComponent,
  selectors: [["settings-feature"]],
  inputs: {
    isSignUpProcess: "isSignUpProcess"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_features_store__WEBPACK_IMPORTED_MODULE_1__.FeaturesStore])],
  decls: 5,
  vars: 4,
  consts: [[1, "w-full", "flex", "flex-col", "gap-4"], ["title", "Email", 3, "name"], ["title", "Chat", 3, "name"], ["title", "Notification", 3, "name"], ["title", "File Storage", 3, "name"]],
  template: function SettingsFeatureComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "feature-item", 1)(2, "feature-item", 2)(3, "feature-item", 3)(4, "feature-item", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("name", "email");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("name", "chat");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("name", "notification");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("name", "file_storage");
    }
  },
  dependencies: [_feature_item_component__WEBPACK_IMPORTED_MODULE_3__.FeatureItemComponent],
  encapsulation: 2
});

/***/ }),

/***/ 40368:
/*!***************************************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/settings/settings-role/role-select.component.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RoleSelectComponent": () => (/* binding */ RoleSelectComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 675886);
/* harmony import */ var _settings_role_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./settings-role.store */ 698717);
/* harmony import */ var _ui_form_src_lib_web_ui_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../ui/form/src/lib/web-ui-form.component */ 834077);






class RoleSelectComponent {
  constructor(_store) {
    this._store = _store;
    this.roleDidSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.roles$ = this._store.loadRoles();
    this.fields = [];
    this.model = {};
    this.options = {
      formState: {
        mainModel: this.model
      }
    };
  }
  ngOnInit() {
    this.roles$.subscribe(roles => {
      this.fields = [_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_1__.WebUiFormField.dropdown('role', {
        label: '',
        labelProp: 'name',
        valueProp: 'id',
        items: roles
      }, {
        className: 'w-full',
        hooks: {
          onInit: field => {
            field.formControl.valueChanges.subscribe(value => {
              this.roleDidSelect.emit(value);
            });
          }
        },
        placeHolder: 'Select role'
      })];
    });
  }
}
RoleSelectComponent.ɵfac = function RoleSelectComponent_Factory(t) {
  return new (t || RoleSelectComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_settings_role_store__WEBPACK_IMPORTED_MODULE_2__.SettingsRoleStore));
};
RoleSelectComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: RoleSelectComponent,
  selectors: [["role-select"]],
  outputs: {
    roleDidSelect: "roleDidSelect"
  },
  decls: 1,
  vars: 3,
  consts: [[1, "w-full", 3, "fields", "model", "options"]],
  template: function RoleSelectComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "ui-form", 0);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("fields", ctx.fields)("model", ctx.model)("options", ctx.options);
    }
  },
  dependencies: [_ui_form_src_lib_web_ui_form_component__WEBPACK_IMPORTED_MODULE_3__.WebUiFormComponent],
  encapsulation: 2
});

/***/ }),

/***/ 711835:
/*!*****************************************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/settings/settings-role/settings-role.component.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingsRoleComponent": () => (/* binding */ SettingsRoleComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 782722);
/* harmony import */ var _tables_features_table__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tables/features-table */ 268358);
/* harmony import */ var _settings_role_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./settings-role.store */ 698717);
/* harmony import */ var _tables_routing_table_view_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tables/routing-table-view.component */ 772753);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _fuse_services_media_watcher__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fuse/services/media-watcher */ 772327);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/tabs */ 503848);
/* harmony import */ var _role_select_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./role-select.component */ 40368);















function SettingsRoleComponent_ng_container_0_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 10)(1, "div", 11)(2, "ui-table-view", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("permissionsSelected", function SettingsRoleComponent_ng_container_0_ng_template_10_Template_ui_table_view_permissionsSelected_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5);
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r4.permissionSelectionDidChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 13)(4, "button", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SettingsRoleComponent_ng_container_0_ng_template_10_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5);
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r6.savePermissions());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Save Changes ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "button", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SettingsRoleComponent_ng_container_0_ng_template_10_Template_button_click_6_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5);
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r7.setOriginalPermissions());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, " Cancel ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const vm_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("items", vm_r1.roleFeatures)("autoHeight", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", !vm_r1.canSave)("color", "primary");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", !vm_r1.canSave);
  }
}
function SettingsRoleComponent_ng_container_0_ng_template_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "ui-navigation-table-view", 16);
  }
  if (rf & 2) {
    const vm_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("data", vm_r1.roleNavigations);
  }
}
function SettingsRoleComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1)(2, "div", 2)(3, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Roles");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Please select role to change permissions and navigations");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "role-select", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("roleDidSelect", function SettingsRoleComponent_ng_container_0_Template_role_select_roleDidSelect_7_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r11);
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r10.onSubmit($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "mat-tab-group", 6)(9, "mat-tab", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, SettingsRoleComponent_ng_container_0_ng_template_10_Template, 8, 5, "ng-template", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "mat-tab", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, SettingsRoleComponent_ng_container_0_ng_template_12_Template, 1, 1, "ng-template", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", false)("formData", ctx_r0.formData)("model", ctx_r0.model);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", true);
  }
}
class SettingsRoleComponent {
  constructor(_fuseMediaWatcherService, _changeDetectorRef, _store) {
    this._fuseMediaWatcherService = _fuseMediaWatcherService;
    this._changeDetectorRef = _changeDetectorRef;
    this._store = _store;
    this.drawerMode = 'side';
    this.drawerOpened = true;
    this._unsubscribeAll = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
    this.vm$ = this._store.vm$;
  }
  ngOnInit() {
    this._store.loadRolesAndFeaturesEffect();
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
  savePermissions() {
    this._store.updateRoleFeaturePermissionsEffect();
  }
  onSubmit(roleId) {
    console.log('onSubmit, roleId = ', roleId, this.tableView);
    if (this.tableView) this._store.loadRoleFeaturePermissionsEffect(roleId);else if (this.navigationTableView) this._store.loadRoleNavigationsEffect(roleId);
  }
  setOriginalPermissions() {
    this._store.setOriginPermissions();
  }
  permissionSelectionDidChange(data) {
    this._store.setSelectedPermissions(data.selectedPermissionIds);
    this._store.setSelectedFeatureIds(data.featureIds);
  }
  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
SettingsRoleComponent.ɵfac = function SettingsRoleComponent_Factory(t) {
  return new (t || SettingsRoleComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_fuse_services_media_watcher__WEBPACK_IMPORTED_MODULE_3__.FuseMediaWatcherService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_settings_role_store__WEBPACK_IMPORTED_MODULE_4__.SettingsRoleStore));
};
SettingsRoleComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: SettingsRoleComponent,
  selectors: [["settings-role"]],
  viewQuery: function SettingsRoleComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_tables_features_table__WEBPACK_IMPORTED_MODULE_5__.WebFeaturesTableViewComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_tables_routing_table_view_component__WEBPACK_IMPORTED_MODULE_6__.WebNavigationTableViewComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.tableView = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.navigationTableView = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_settings_role_store__WEBPACK_IMPORTED_MODULE_4__.SettingsRoleStore])],
  decls: 2,
  vars: 3,
  consts: [[4, "ngIf"], [1, "flex", "flex-col", "dark:bg-gray-900", "gap-2", "h-full", "w-full"], [1, "w-full", "mb-5"], [1, "text-xl", "text-gray-900", "dark:text-gray-50"], [1, "text-secondary"], ["formName", "role_select", 3, "showSubmitButton", "formData", "model", "roleDidSelect"], [1, "w-full", "h-192", 3, "disabled"], ["label", "Permissions", 1, "h-full"], ["matTabContent", ""], ["label", "Routings"], [1, "w-full", "h-full", "flex", "flex-col"], [1, "flex-1", "flex", "flex-col"], [1, "w-full", "h-192", 3, "items", "autoHeight", "permissionsSelected"], [1, "flex", "items-center", "justify-start", "my-2", "mr-2"], ["mat-flat-button", "", "type", "button", 1, "ml-4", 3, "disabled", "color", "click"], ["mat-stroked-button", "", "type", "button", 3, "disabled", "click"], [3, "data"]],
  template: function SettingsRoleComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, SettingsRoleComponent_ng_container_0_Template, 13, 4, "ng-container", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](1, "async");
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](1, 1, ctx.vm$));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_material_button__WEBPACK_IMPORTED_MODULE_8__.MatButton, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_9__.MatTabContent, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_9__.MatTab, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_9__.MatTabGroup, _role_select_component__WEBPACK_IMPORTED_MODULE_10__.RoleSelectComponent, _tables_features_table__WEBPACK_IMPORTED_MODULE_5__.WebFeaturesTableViewComponent, _tables_routing_table_view_component__WEBPACK_IMPORTED_MODULE_6__.WebNavigationTableViewComponent, _angular_common__WEBPACK_IMPORTED_MODULE_7__.AsyncPipe],
  styles: [".mat-tab-body-wrapper {\n  height: 100% !important;\n}\n\n  .mat-tab-label-container {\n  padding-left: 0px !important;\n  padding-right: 0px !important;\n  margin-right: 24px !important;\n}\n\n  .mat-tab-body-content {\n  padding-left: 0 !important;\n  padding-right: 0 !important;\n}"]
});

/***/ }),

/***/ 698717:
/*!*************************************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/settings/settings-role/settings-role.store.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingsRoleStore": () => (/* binding */ SettingsRoleStore)
/* harmony export */ });
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 911365);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 318505);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 960515);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 504523);
/* harmony import */ var _fuse_services_loading_loading_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @fuse/services/loading/loading.service */ 301463);
/* harmony import */ var _case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @case-clinical/web/ui/toast */ 971873);
/* harmony import */ var _business_logic_settings_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../business-logic/settings.service */ 730788);











class SettingsRoleStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(formService, loading, toast, service) {
    super({
      query: "",
      loading: false,
      selectedRoleId: "",
      features: [],
      roles: [],
      featureIds: [],
      refreshTable: false,
      roleFeaturePermissionIds: [],
      selectedPermissionIds: [],
      roleNavigations: []
    });
    this.formService = formService;
    this.loading = loading;
    this.toast = toast;
    this.service = service;
    /** Feature permission table data **/
    this.feautres$ = this.select(s => s.features);
    this.roleFeatures$ = this.select(this.feautres$, features => {
      const data = [];
      console.log(features);
      features.map(feature => {
        feature.featurePermissions.map(fp => {
          data.push({
            featureId: feature.id,
            feature: feature.name,
            permission: fp.name.split('.')[1],
            id: fp.id
          });
        });
      }, {
        debounce: true
      });
      return data;
    });
    /** Feature permission table data **/
    this.roleNavigations$ = this.select(s => s.roleNavigations);
    /** Table Indexes to be selected */
    this.refreshTable$ = this.select(s => s.refreshTable);
    this.selectedPermissionIds$ = this.select(s => s.selectedPermissionIds);
    this.refreshTableData$ = this.select(this.refreshTable$, this.selectedPermissionIds$, (refreshTable, selectedPermissionIds) => ({
      refreshTable,
      selectedPermissionIds
    }), {
      debounce: true
    });
    /** Table Indexes to be selected */
    /** Data that shows whether the original permissions are changed or not **/
    this.roleFeaturePermissionIds$ = this.select(s => s.roleFeaturePermissionIds);
    this.canSave$ = this.select(this.refreshTable$, this.roleFeaturePermissionIds$, this.selectedPermissionIds$, (refreshTable, roleFeaturePermissionIds, selectedPermissionIds) => {
      let canSave = false;
      // If two lengths are different, then it tells that somethings has changed
      if (selectedPermissionIds.length !== roleFeaturePermissionIds.length) {
        return true;
      }
      const length = roleFeaturePermissionIds.length;
      const a = [...Array(length).keys()]; // roleFeaturePermissionIds
      const b = [...Array(length).keys()]; // selectedPermissionIds
      // Check whether there are some change
      while (a.length) {
        const srcIndex = a.shift();
        const targetIndex = selectedPermissionIds.findIndex(el => el === roleFeaturePermissionIds[srcIndex]);
        if (targetIndex === -1) {
          return true;
        } else {
          const realTargetIndex = b.findIndex(el => el === targetIndex);
          b.splice(realTargetIndex, 1);
        }
      }
      if (a.length !== b.length) {
        canSave = true;
      }
      return canSave;
    }, {
      debounce: true
    });
    /** Data that shows whether the original permissions are changed or not **/
    this.selectedFeatureIds$ = this.select(s => s.featureIds);
    this.roles$ = this.select(s => s.roles);
    this.loading$ = this.select(s => s.loading);
    this.selectedRoleId$ = this.select(s => s.selectedRoleId);
    this.vm$ = this.select(this.loading$, this.roleFeatures$, this.selectedRoleId$, this.roles$, this.canSave$, this.roleNavigations$, (loading, roleFeatures, selectedRoleId, roles, canSave, roleNavigations) => ({
      loading,
      roleFeatures,
      selectedRoleId,
      roles,
      canSave,
      roleNavigations
    }));
    this.setSelectedPermissions = this.updater((state, permissionIds) => Object.assign(Object.assign({}, state), {
      refreshTable: false,
      selectedPermissionIds: permissionIds
    }));
    this.setSelectedFeatureIds = this.updater((state, featureIds) => Object.assign(Object.assign({}, state), {
      refreshTable: false,
      featureIds: featureIds
    }));
    this.setOriginPermissions = this.updater(state => Object.assign(Object.assign({}, state), {
      refreshTable: true,
      selectedPermissionIds: state.roleFeaturePermissionIds
    }));
    this.updateRoleNavigation = this.updater((state, updated) => {
      return Object.assign(Object.assign({}, state), {
        roleNavigations: state.roleNavigations.map(roleNavigation => {
          return updated.id === roleNavigation.id ? Object.assign(Object.assign({}, roleNavigation), updated) : roleNavigation;
        })
      });
    });
    this.loadRoleFeaturePermissionsEffect = this.effect(roleId$ => roleId$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.withLatestFrom)(this.selectedRoleId$), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.tap)(([roleId, currentRoleId]) => {
      if (!roleId && !currentRoleId) {
        return rxjs__WEBPACK_IMPORTED_MODULE_3__.EMPTY;
      }
      this.patchState({
        loading: true
      });
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(([roleId, currentRoleId]) => this.service.loadRoleFeaturePermissions(roleId !== null && roleId !== void 0 ? roleId : currentRoleId).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(data => {
      console.log(data);
      this.patchState({
        selectedRoleId: roleId !== null && roleId !== void 0 ? roleId : currentRoleId,
        loading: false,
        refreshTable: true,
        roleFeaturePermissionIds: data.map(permission => permission.featurePermissionId),
        selectedPermissionIds: data.map(permission => permission.featurePermissionId)
      });
    }, error => {
      this.patchState({
        loading: false
      });
    })))));
    this.loadRolesAndFeaturesEffect = this.effect($ => $.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.tap)(() => {
      this.patchState({
        loading: true
      });
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(() => this.service.loadBasicData().pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(data => {
      // this.loadRoleFeaturePermissionsEffect(data.roles[0].id)
      this.patchState({
        loading: false,
        roles: data.roles,
        features: data.features
      });
    }, error => {
      this.patchState({
        loading: false
      });
    })))));
    this.updateRoleFeaturePermissionsEffect = this.effect($ => $.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.tap)(() => {
      this.patchState({
        loading: true
      });
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.withLatestFrom)(this.selectedRoleId$, this.roleFeaturePermissionIds$, this.selectedPermissionIds$, this.selectedFeatureIds$), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(([_, roleId, roleFeaturePermissionIds, selectedPermissionIds, featureIds]) => this.service.updateRoleFeaturePermissions(roleId, roleFeaturePermissionIds, selectedPermissionIds, featureIds).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(data => {
      this.toast.success('Successfuly updated role permissions', {
        duration: 3000
      });
      this.patchState({
        loading: false,
        roleFeaturePermissionIds: selectedPermissionIds
      });
    }, error => {
      this.patchState({
        loading: false
      });
    })))));
    this.loadRoleNavigationsEffect = this.effect(roleId$ => roleId$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.withLatestFrom)(this.selectedRoleId$), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.tap)(([roleId, currentRoleId]) => {
      console.error(roleId, currentRoleId);
      if (!roleId && !currentRoleId) return rxjs__WEBPACK_IMPORTED_MODULE_3__.EMPTY;
      this.patchState({
        loading: true
      });
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(([roleId, currentRoleId]) => this.service.loadRoleNaviations({
      roleId: roleId !== null && roleId !== void 0 ? roleId : currentRoleId
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(data => {
      this.patchState({
        loading: false,
        selectedRoleId: roleId !== null && roleId !== void 0 ? roleId : currentRoleId,
        roleNavigations: data
      });
    }, _ => {
      this.patchState({
        loading: false
      });
    })))));
    this.updateRoleNavigationEffect = this.effect(data$ => data$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.tap)(() => {
      this.patchState({
        loading: true
      });
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(data => this.service.updateRoleNavigation(data.roleNavigationId, data.input).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(updated => {
      var _a;
      this.toast.success('Successfully updated role navigation', {
        duration: 3000
      });
      this.updateRoleNavigation(updated);
      this.patchState({
        loading: false
      });
      (_a = data.dialogRef) === null || _a === void 0 ? void 0 : _a.close();
    }, error => {
      this.toast.error("Failed to update role navigation", {
        duration: 3000
      });
      this.patchState({
        loading: false
      });
    })))));
  }
  loadRoles() {
    return this.service.loadRoles();
  }
}
SettingsRoleStore.ɵfac = function SettingsRoleStore_Factory(t) {
  return new (t || SettingsRoleStore)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_6__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_fuse_services_loading_loading_service__WEBPACK_IMPORTED_MODULE_7__.FuseLoadingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_8__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_business_logic_settings_service__WEBPACK_IMPORTED_MODULE_9__.SettingsService));
};
SettingsRoleStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: SettingsRoleStore,
  factory: SettingsRoleStore.ɵfac
});

/***/ }),

/***/ 268358:
/*!***************************************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/settings/settings-role/tables/features-table.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebFeaturesTableViewComponent": () => (/* binding */ WebFeaturesTableViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../../datatable/ui/src/lib/table-view/table-view.component */ 598705);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 782722);
/* harmony import */ var _settings_role_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../settings-role.store */ 698717);







class WebFeaturesTableViewComponent {
  constructor(_store) {
    this._store = _store;
    this.items = [];
    this.itemDidSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.permissionsSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this._unsubscribeAll = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
    this.columnDefs = [{
      field: 'feature',
      rowGroup: true,
      hide: true
    }];
  }
  ngOnInit() {
    this._store.refreshTableData$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(this._unsubscribeAll)).subscribe(data => {
      if (data.refreshTable) {
        console.log(data);
        this.setSelected(data.selectedPermissionIds);
      }
    });
    this._store.loadRoleFeaturePermissionsEffect(null);
  }
  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
  selectionDidChange(selectedRows) {
    let featureIds = [];
    const selectedPermissionIds = selectedRows.map(rowData => {
      featureIds.push(rowData.featureId);
      return rowData.id;
    });
    const uniqueFeatureIds = new Set(featureIds);
    featureIds = [...uniqueFeatureIds];
    this.permissionsSelected.emit({
      selectedPermissionIds: selectedPermissionIds,
      featureIds: featureIds
    });
  }
  setSelected(ids) {
    this.tableView.gridApi.forEachNode(node => {
      var _a;
      if (ids.includes((_a = node.data) === null || _a === void 0 ? void 0 : _a.id)) {
        node.setSelected(true);
      } else {
        node.setSelected(false);
      }
    });
  }
  onSelected(selected) {
    this.itemDidSelect.emit(selected);
  }
}
WebFeaturesTableViewComponent.ɵfac = function WebFeaturesTableViewComponent_Factory(t) {
  return new (t || WebFeaturesTableViewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_settings_role_store__WEBPACK_IMPORTED_MODULE_3__.SettingsRoleStore));
};
WebFeaturesTableViewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebFeaturesTableViewComponent,
  selectors: [["ui-table-view"]],
  viewQuery: function WebFeaturesTableViewComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_4__.TableViewComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.tableView = _t.first);
    }
  },
  inputs: {
    items: "items"
  },
  outputs: {
    itemDidSelect: "itemDidSelect",
    permissionsSelected: "permissionsSelected"
  },
  decls: 1,
  vars: 5,
  consts: [["autogroupField", "feature", 1, "w-full", "h-full", 3, "treeMode", "floatingFilter", "data", "showSidebar", "columnDefs", "itemDidSelect", "selectionDidChange"]],
  template: function WebFeaturesTableViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table-view", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("itemDidSelect", function WebFeaturesTableViewComponent_Template_table_view_itemDidSelect_0_listener($event) {
        return ctx.onSelected($event);
      })("selectionDidChange", function WebFeaturesTableViewComponent_Template_table_view_selectionDidChange_0_listener($event) {
        return ctx.selectionDidChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("treeMode", true)("floatingFilter", false)("data", ctx.items)("showSidebar", false)("columnDefs", ctx.columnDefs);
    }
  },
  dependencies: [_case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_4__.TableViewComponent],
  encapsulation: 2
});

/***/ }),

/***/ 772753:
/*!*****************************************************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/settings/settings-role/tables/routing-table-view.component.ts ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebNavigationTableViewComponent": () => (/* binding */ WebNavigationTableViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 224006);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../../datatable/ui/src/lib/table-view/table-view.component */ 598705);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 675886);
/* harmony import */ var _settings_role_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../settings-role.store */ 698717);
/* harmony import */ var _ngneat_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngneat/dialog */ 357148);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _ui_button_src_lib_web_ui_button_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../../../ui/button/src/lib/web-ui-button.component */ 797800);
/* harmony import */ var _ui_form_src_lib_web_ui_form_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../../../ui/form/src/lib/web-ui-form.component */ 834077);













function WebNavigationTableViewComponent_table_view_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table-view", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("itemDidSelect", function WebNavigationTableViewComponent_table_view_0_Template_table_view_itemDidSelect_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5);
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](3);
      ctx_r4.model = $event;
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r4.openDialog(_r1, {
        roleNavigation: $event
      }));
    })("selectionDidChange", function WebNavigationTableViewComponent_table_view_0_Template_table_view_selectionDidChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5);
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r6.selectionDidChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const vm_r3 = ctx.ngIf;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("data", vm_r3.roleNavigations)("showSidebar", true)("columnDefs", ctx_r0.columnDefs);
  }
}
function WebNavigationTableViewComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 3)(1, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Edit Role Navigation");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "ui-form", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("submitForm", function WebNavigationTableViewComponent_ng_template_2_Template_ui_form_submitForm_3_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9);
      const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r8.submit($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "ui-button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "ui-button", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WebNavigationTableViewComponent_ng_template_2_Template_ui_button_click_5_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9);
      const ref_r7 = restoredCtx.$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ref_r7.close());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("form", ctx_r2.form)("fields", ctx_r2.fields)("model", ctx_r2.model)("options", ctx_r2.options);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("label", "Save");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("label", "Cancel");
  }
}
class WebNavigationTableViewComponent {
  constructor(store, dialog) {
    this.store = store;
    this.dialog = dialog;
    this.navigations = [];
    this.itemDidSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.vm$ = this.store.vm$;
    this.columnDefs = [{
      field: 'id',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      field: 'feature.name',
      headerName: 'Feature',
      sortable: false,
      filter: 'agTextColumnFilter'
    }, {
      field: 'title',
      sortable: false
    }, {
      field: 'icon',
      sortable: false
    }, {
      field: 'link',
      sortable: false
    }];
    this.dialogRef = null;
    this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormGroup({});
    this.model = {};
    this.options = {
      formState: {
        mainModel: this.model
      }
    };
    this.fields = [_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_2__.WebUiFormField.fieldRow([_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_2__.WebUiFormField.input('title', {
      label: 'Title',
      required: true
    }, {
      className: 'w-full'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_2__.WebUiFormField.input('icon', {
      label: 'Icon',
      required: true
    }, {
      className: 'w-full'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_2__.WebUiFormField.input('link', {
      label: 'Link',
      required: true
    }, {
      className: 'w-full'
    })])];
  }
  ngOnInit() {
    this.store.loadRoleNavigationsEffect(null);
  }
  submit({
    id,
    title,
    link,
    icon
  }) {
    if (this.form.valid) {
      this.store.updateRoleNavigationEffect({
        roleNavigationId: id,
        input: {
          title,
          link,
          icon
        },
        dialogRef: this.dialogRef
      });
    }
  }
  openDialog(tpl, {
    roleNavigation
  }) {
    this.dialogRef = this.dialog.open(tpl, {
      data: {
        roleNavigation
      },
      closeButton: false
    });
  }
}
WebNavigationTableViewComponent.ɵfac = function WebNavigationTableViewComponent_Factory(t) {
  return new (t || WebNavigationTableViewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_settings_role_store__WEBPACK_IMPORTED_MODULE_3__.SettingsRoleStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ngneat_dialog__WEBPACK_IMPORTED_MODULE_4__.DialogService));
};
WebNavigationTableViewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebNavigationTableViewComponent,
  selectors: [["ui-navigation-table-view"]],
  viewQuery: function WebNavigationTableViewComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_5__.TableViewComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.tableView = _t.first);
    }
  },
  inputs: {
    navigations: "navigations",
    data: "data"
  },
  outputs: {
    itemDidSelect: "itemDidSelect"
  },
  decls: 4,
  vars: 3,
  consts: [["class", "w-full h-192", 3, "data", "showSidebar", "columnDefs", "itemDidSelect", "selectionDidChange", 4, "ngIf"], ["editTpl", ""], [1, "w-full", "h-192", 3, "data", "showSidebar", "columnDefs", "itemDidSelect", "selectionDidChange"], [1, "dark:bg-gray-800", "overflow-hidden", "p-7", "flex", "flex-col", "gap-5"], [1, "font-bold", "text-lg", "px-2", "text-white"], [3, "form", "fields", "model", "options", "submitForm"], ["type", "submit", 1, "pl-2", 3, "label"], [1, "pl-2", 3, "label", "click"]],
  template: function WebNavigationTableViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, WebNavigationTableViewComponent_table_view_0_Template, 1, 3, "table-view", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](1, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, WebNavigationTableViewComponent_ng_template_2_Template, 6, 6, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](1, 1, ctx.vm$));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_5__.TableViewComponent, _ui_button_src_lib_web_ui_button_component__WEBPACK_IMPORTED_MODULE_7__.WebUiButtonComponent, _ui_form_src_lib_web_ui_form_component__WEBPACK_IMPORTED_MODULE_8__.WebUiFormComponent, _angular_common__WEBPACK_IMPORTED_MODULE_6__.AsyncPipe],
  encapsulation: 2
});

/***/ }),

/***/ 610778:
/*!*********************************************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/settings/settings-tenant/settings-tenant.component.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingsTenantComponent": () => (/* binding */ SettingsTenantComponent)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 782722);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 675886);
/* harmony import */ var _tenant_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tenant.store */ 956018);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 504523);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/form-field */ 759549);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/input */ 300284);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/select */ 584385);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/core */ 447873);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/forms */ 224006);
/* harmony import */ var _ui_button_src_lib_web_ui_button_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../../../ui/button/src/lib/web-ui-button.component */ 797800);
/* harmony import */ var _ui_form_src_lib_web_ui_form_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../../../ui/form/src/lib/web-ui-form.component */ 834077);
/* harmony import */ var _pipes_server_url_pipe__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../pipes/server-url.pipe */ 792281);


















function SettingsTenantComponent_ng_container_0_ng_container_3_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "serverUrl");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const user_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 1, user_r4.logo_url), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
  }
}
function SettingsTenantComponent_ng_container_0_ng_container_3_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "svg", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "path", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
const _c0 = function (a0, a1) {
  return {
    "hover:bg-gray-100 dark:hover:bg-hover": a0,
    "bg-primary-50 dark:bg-hover": a1
  };
};
function SettingsTenantComponent_ng_container_0_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SettingsTenantComponent_ng_container_0_ng_container_3_Template_div_click_1_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9);
      const user_r4 = restoredCtx.$implicit;
      const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r8.selectUser(user_r4));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 8)(3, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, SettingsTenantComponent_ng_container_0_ng_container_3_ng_container_4_Template, 3, 3, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, SettingsTenantComponent_ng_container_0_ng_container_3_ng_container_5_Template, 4, 0, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 10)(7, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const user_r4 = ctx.$implicit;
    const vm_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](5, _c0, user_r4.id !== (vm_r1.selectedTenant == null ? null : vm_r1.selectedTenant.id), user_r4.id === (vm_r1.selectedTenant == null ? null : vm_r1.selectedTenant.id)));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", user_r4.logo_url);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !user_r4.logo_url);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](user_r4.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](user_r4.email);
  }
}
function SettingsTenantComponent_ng_container_0_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "form", 17)(1, "div", 18)(2, "div", 19)(3, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, " BH ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div")(6, "mat-form-field", 21)(7, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Name");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "mat-icon", 22)(10, "input", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div")(12, "mat-form-field", 21)(13, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Email");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "mat-icon", 22)(16, "input", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div")(18, "mat-form-field", 21)(19, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "Phone");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](21, "mat-icon", 22)(22, "input", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div", 24)(24, "mat-form-field", 21)(25, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, "Country");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](27, "mat-icon", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "mat-select", 25)(29, "mat-option", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, "United States");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "mat-option", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32, "Canada");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "mat-option", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](34, "Mexico");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "mat-option", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](36, "France");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "mat-option", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, "Germany");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "mat-option", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40, "Italy");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](41, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "div", 28)(43, "button", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](44, " Cancel ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "button", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](46, "Save ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx_r3.accountForm);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:user");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControlName", "name");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:mail");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControlName", "email");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:phone");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControlName", "phone");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:location-marker");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControlName", "country");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", "usa");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", "canada");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", "mexico");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", "france");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", "germany");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", "italy");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", "primary");
  }
}
function SettingsTenantComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1)(2, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, SettingsTenantComponent_ng_container_0_ng_container_3_Template, 11, 8, "ng-container", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 4)(5, "ui-form", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("submitForm", function SettingsTenantComponent_ng_container_0_Template_ui_form_submitForm_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r12);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r11.submit($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "ui-button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, SettingsTenantComponent_ng_container_0_ng_template_7_Template, 47, 16, "ng-template");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const vm_r1 = ctx.ngIf;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", vm_r1.tenants)("ngForTrackBy", ctx_r0.trackByFn);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("form", ctx_r0.formService.form)("fields", ctx_r0.fields)("model", ctx_r0.model)("options", ctx_r0.options);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("label", "Save");
  }
}
const countries = [{
  id: 'US',
  title: 'United States'
}, {
  id: 'CA',
  title: 'Canada'
}, {
  id: 'MX',
  title: 'Mexico'
}, {
  id: 'FR',
  title: 'France'
}, {
  id: 'DE',
  title: 'Germany'
}, {
  id: 'IT',
  title: 'Italy'
}];
class SettingsTenantComponent {
  /**
  * Constructor
  */
  constructor(store, formService) {
    this.store = store;
    this.formService = formService;
    this.vm$ = this.store.vm$;
    this._unsubscribeAll = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    this.model = {};
    this.options = {
      formState: {
        mainModel: this.model
      }
    };
    this.fields = [_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_2__.WebUiFormField.fieldRow([_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_2__.WebUiFormField.image('logo', {
      label: ''
    }, {
      className: 'w-full mx-auto'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_2__.WebUiFormField.input('name', {
      label: 'Name'
    }, {
      className: 'w-full'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_2__.WebUiFormField.input('email', {
      label: 'Email'
    }, {
      className: 'w-full'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_2__.WebUiFormField.input('phone', {
      label: 'Phone'
    }, {
      className: 'w-full'
    }), _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_2__.WebUiFormField.dropdown('country', {
      label: 'Country',
      items: countries
    }, {
      className: 'w-full'
    })])];
  }
  ngOnDestroy() {
    var _a, _b;
    (_a = this._unsubscribeAll) === null || _a === void 0 ? void 0 : _a.next(null);
    (_b = this._unsubscribeAll) === null || _b === void 0 ? void 0 : _b.complete();
  }
  submit(formData) {
    console.log(formData);
    this.store.updateTenantEffect(formData);
  }
  /**
   * On init
   */
  ngOnInit() {
    this.store.loadTenantsEffect();
    this.store.selectedTenant$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.takeUntil)(this._unsubscribeAll)).subscribe(({
      name,
      email,
      phone,
      country,
      logo_url
    }) => {
      this.model = {
        name,
        email,
        phone,
        country,
        logo: logo_url ? 'http://localhost:3000' + logo_url : null
      };
    });
  }
  selectUser(user) {
    this.store.selectUser(user);
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
SettingsTenantComponent.ɵfac = function SettingsTenantComponent_Factory(t) {
  return new (t || SettingsTenantComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_tenant_store__WEBPACK_IMPORTED_MODULE_4__.TenantStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_5__.FormService));
};
SettingsTenantComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: SettingsTenantComponent,
  selectors: [["settings-tenant"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_tenant_store__WEBPACK_IMPORTED_MODULE_4__.TenantStore])],
  decls: 2,
  vars: 3,
  consts: [[4, "ngIf"], [1, "h-full", "w-full", "flex", "flex-row", "gap-2"], [1, "flex-1", "h-full"], [4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "flex-1", "h-full", "flex", "flex-row"], [3, "form", "fields", "model", "options", "submitForm"], ["type", "submit", 3, "label"], [1, "flex", "flex-col", "sm:flex-row", "border-t", "sm:items-center", "py-6", "px-2", "cursor-pointer", "hover:bg-gray-100", "dark:hover:bg-hover", 3, "ngClass", "click"], [1, "flex", "items-center"], [1, "flex", "flex-0", "items-center", "justify-center", "w-10", "h-10", "rounded-full", "overflow-hidden"], [1, "ml-4"], [1, "font-medium"], [1, "text-secondary"], ["alt", "Contact avatar", 1, "object-cover", "w-full", "h-full", 3, "src"], [1, "flex", "items-center", "justify-center", "w-full", "h-full", "rounded-full", "text-lg", "uppercase", "bg-gray-200", "text-gray-600", "dark:bg-gray-700", "dark:text-gray-200"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 24 24", "fill", "currentColor", 1, "w-full", "h-full", "p-1"], ["fill-rule", "evenodd", "d", "M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z", "clip-rule", "evenodd"], [1, "px-6", "flex-1", "h-full", "overflow-hidden", 3, "formGroup"], [1, "flex", "flex-col", "gap-6", "w-full"], [1, "relative", "w-40", "h-40", "cursor-pointer", "rounded-full", "mx-auto", "overflow-hidden"], [1, "flex", "items-center", "justify-center", "w-full", "h-full", "rounded-full", "text-4xl", "uppercase", "bg-gray-200", "text-gray-600", "dark:bg-gray-700", "dark:text-gray-200"], [1, "fuse-mat-no-subscript", "w-full"], ["matPrefix", "", 1, "icon-size-5", 3, "svgIcon"], ["matInput", "", 3, "formControlName"], [1, "sm:col-span-2"], [3, "formControlName"], [3, "value"], [1, "mt-11", "mb-10", "border-t"], [1, "flex", "items-center", "justify-end"], ["mat-stroked-button", "", "type", "button"], ["mat-flat-button", "", "type", "button", 1, "ml-4", 3, "color"]],
  template: function SettingsTenantComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, SettingsTenantComponent_ng_container_0_Template, 8, 7, "ng-container", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](1, "async");
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](1, 1, ctx.vm$));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_material_button__WEBPACK_IMPORTED_MODULE_7__.MatButton, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__.MatPrefix, _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__.MatIcon, _angular_material_input__WEBPACK_IMPORTED_MODULE_10__.MatInput, _angular_material_select__WEBPACK_IMPORTED_MODULE_11__.MatSelect, _angular_material_core__WEBPACK_IMPORTED_MODULE_12__.MatOption, _angular_forms__WEBPACK_IMPORTED_MODULE_13__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_13__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControlName, _ui_button_src_lib_web_ui_button_component__WEBPACK_IMPORTED_MODULE_14__.WebUiButtonComponent, _ui_form_src_lib_web_ui_form_component__WEBPACK_IMPORTED_MODULE_15__.WebUiFormComponent, _angular_common__WEBPACK_IMPORTED_MODULE_6__.AsyncPipe, _pipes_server_url_pipe__WEBPACK_IMPORTED_MODULE_16__.ServerUrlPipe]
});

/***/ }),

/***/ 956018:
/*!********************************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/settings/settings-tenant/tenant.store.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TenantStore": () => (/* binding */ TenantStore)
/* harmony export */ });
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 318505);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 911365);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 504523);
/* harmony import */ var _fuse_services_loading_loading_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fuse/services/loading/loading.service */ 301463);
/* harmony import */ var _case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @case-clinical/web/ui/toast */ 971873);
/* harmony import */ var _business_logic_settings_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../business-logic/settings.service */ 730788);












class TenantStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(formService, loading, toast, service) {
    super({
      query: "",
      loading: false,
      tenants: [],
      selectedTenant: {}
    });
    this.formService = formService;
    this.loading = loading;
    this.toast = toast;
    this.service = service;
    this.loading$ = this.select(s => s.loading);
    this.tenants$ = this.select(s => s.tenants);
    this.selectedTenant$ = this.select(s => s.selectedTenant);
    this.vm$ = this.select(this.loading$, this.selectedTenant$, this.tenants$, (loading, selectedTenant, tenants) => ({
      loading,
      selectedTenant,
      tenants
    }));
    this.selectUser = this.updater((state, tenant) => Object.assign(Object.assign({}, state), {
      selectedTenant: tenant
    }));
    this.loadTenantsEffect = this.effect($ => $.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(() => {
      this.patchState({
        loading: true
      });
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(() => this.service.loadTenants().pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(data => {
      console.log(data);
      this.patchState({
        loading: false,
        tenants: data,
        selectedTenant: data[0]
      });
    }, error => {
      this.patchState({
        loading: false
      });
    })))));
    this.updateTenantEffect = this.effect(input$ => input$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(() => {
      this.patchState({
        loading: true
      });
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.selectedTenant$, this.tenants$), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([{
      logo,
      name,
      email,
      phone,
      country
    }, selectedTenant, tenants]) => this.service.updateTenant(selectedTenant.id, logo, {
      name,
      email,
      phone,
      country
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(data => {
      this.toast.success('Successfully updated tenant', {
        duration: 3000
      });
      let updatedTenantIndex = tenants.findIndex(tenant => tenant.id === selectedTenant.id);
      tenants[updatedTenantIndex] = data;
      this.patchState({
        loading: false,
        tenants,
        selectedTenant: data
      });
    }, error => {
      this.formService.setErrors(error.Data);
      this.toast.error(error.Message, {
        duration: 3000
      });
      this.patchState({
        loading: false
      });
    })))));
  }
}
TenantStore.ɵfac = function TenantStore_Factory(t) {
  return new (t || TenantStore)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_5__.FormService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_fuse_services_loading_loading_service__WEBPACK_IMPORTED_MODULE_6__.FuseLoadingService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_7__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_business_logic_settings_service__WEBPACK_IMPORTED_MODULE_8__.SettingsService));
};
TenantStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
  token: TenantStore,
  factory: TenantStore.ɵfac
});

/***/ }),

/***/ 115215:
/*!**********************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/settings/settings.component.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingsComponent": () => (/* binding */ SettingsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _normal_settings_normal_settings_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./normal-settings/normal-settings.component */ 851806);
/* harmony import */ var _sign_up_settings_sign_up_settings_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sign-up-settings/sign-up-settings.component */ 279803);




function SettingsComponent_auth_normal_settings_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "auth-normal-settings", 2);
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("panels", ctx_r0.allPanels);
  }
}
function SettingsComponent_auth_sign_up_settings_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "auth-sign-up-settings", 3);
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("panels", ctx_r1.panels);
  }
}
class SettingsComponent {
  constructor() {
    this.signupSettings = false;
    this.adminPanels = [{
      id: 'role',
      icon: 'heroicons_outline:user-group',
      title: 'Role Designer',
      description: 'Manage user roles'
    }, {
      id: 'team',
      icon: 'heroicons_outline:user-group',
      title: 'Team',
      description: 'Manage your existing team and change roles/permissions'
    }, {
      id: 'tenant',
      icon: 'heroicons_outline:user-group',
      title: 'Tenant',
      description: 'Manage your tenants'
    }];
    this.panels = [{
      id: 'account',
      icon: 'heroicons_outline:user-circle',
      title: 'Account',
      description: 'Manage your public profile and private information'
    }, {
      id: 'security',
      icon: 'heroicons_outline:lock-closed',
      title: 'Security',
      description: 'Manage your password and 2-step verification preferences'
    }, {
      id: 'plan-billing',
      icon: 'heroicons_outline:credit-card',
      title: 'Plan & Billing',
      description: 'Manage your subscription plan, payment method and billing information'
    }, {
      id: 'feature',
      icon: 'heroicons_outline:user-group',
      title: 'Features',
      description: 'Manage your features'
    }, {
      id: 'notifications',
      icon: 'heroicons_outline:bell',
      title: 'Notifications',
      description: 'Manage when you\'ll be notified on which channels'
    }, {
      id: 'theme',
      icon: 'heroicons_outline:cog',
      title: 'Theme',
      description: 'Manage theme and layout settings'
    }, {
      id: 'formly-settings',
      icon: 'heroicons_outline:cog',
      title: 'Formly Setting',
      description: 'Manage Formly Setting'
    }];
  }
  get allPanels() {
    return [...this.panels, ...this.adminPanels];
  }
}
SettingsComponent.ɵfac = function SettingsComponent_Factory(t) {
  return new (t || SettingsComponent)();
};
SettingsComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: SettingsComponent,
  selectors: [["settings"]],
  decls: 2,
  vars: 2,
  consts: [[3, "panels", 4, "ngIf"], ["class", "w-full h-full flex", 3, "panels", 4, "ngIf"], [3, "panels"], [1, "w-full", "h-full", "flex", 3, "panels"]],
  template: function SettingsComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, SettingsComponent_auth_normal_settings_0_Template, 1, 1, "auth-normal-settings", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, SettingsComponent_auth_sign_up_settings_1_Template, 1, 1, "auth-sign-up-settings", 1);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.signupSettings);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.signupSettings);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.NgIf, _normal_settings_normal_settings_component__WEBPACK_IMPORTED_MODULE_2__.NormalSettingsComponent, _sign_up_settings_sign_up_settings_component__WEBPACK_IMPORTED_MODULE_3__.SignUpSettingsComponent],
  encapsulation: 2,
  changeDetection: 0
});

/***/ }),

/***/ 583876:
/*!*******************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/settings/settings.module.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingsModule": () => (/* binding */ SettingsModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _case_clinical_core_formly_setting__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @case-clinical/core/formly-setting */ 78858);
/* harmony import */ var _settings_feature_feature_item_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./settings-feature/feature.item.component */ 668310);
/* harmony import */ var _fuse_components_alert__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fuse/components/alert */ 718413);
/* harmony import */ var _fuse_components_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fuse/components/card */ 673141);
/* harmony import */ var _fuse_components_navigation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fuse/components/navigation */ 352221);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/checkbox */ 556709);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/form-field */ 759549);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/input */ 300284);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/progress-spinner */ 151572);
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/radio */ 971948);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/select */ 584385);
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/sidenav */ 523267);
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/slide-toggle */ 690455);
/* harmony import */ var _angular_material_stepper__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/stepper */ 958425);
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/tabs */ 503848);
/* harmony import */ var _normal_settings_normal_settings_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./normal-settings/normal-settings.component */ 851806);
/* harmony import */ var _formly_settings_formly_settings_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./formly-settings/formly-settings.component */ 847449);
/* harmony import */ var _settings_role_role_select_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./settings-role/role-select.component */ 40368);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _pipes_server_url_pipe__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./pipes/server-url.pipe */ 792281);
/* harmony import */ var _account_account_component__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./account/account.component */ 49758);
/* harmony import */ var _settings_component__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./settings.component */ 115215);
/* harmony import */ var _settings_feature_settings_feature_component__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./settings-feature/settings-feature.component */ 51711);
/* harmony import */ var _notifications_notifications_component__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./notifications/notifications.component */ 878054);
/* harmony import */ var _plan_billing_plan_billing_component__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./plan-billing/plan-billing.component */ 483917);
/* harmony import */ var _settings_role_settings_role_component__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./settings-role/settings-role.component */ 711835);
/* harmony import */ var _settings_routing__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./settings.routing */ 713716);
/* harmony import */ var _security_security_component__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./security/security.component */ 258370);
/* harmony import */ var _business_logic_settings_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./business-logic/settings.service */ 730788);
/* harmony import */ var _team_team_component__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./team/team.component */ 926130);
/* harmony import */ var _settings_tenant_settings_tenant_component__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./settings-tenant/settings-tenant.component */ 610778);
/* harmony import */ var libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! libs/shared/shared.module */ 423387);
/* harmony import */ var _sign_up_settings_sign_up_settings_component__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./sign-up-settings/sign-up-settings.component */ 279803);
/* harmony import */ var _fuse_services_settings__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @fuse/services/settings */ 59120);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 256623);
/* harmony import */ var _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @case-clinical/web/ui/form */ 595838);
/* harmony import */ var _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @case-clinical/web/datatable/ui */ 62106);
/* harmony import */ var _settings_role_tables_features_table__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./settings-role/tables/features-table */ 268358);
/* harmony import */ var _settings_role_tables_routing_table_view_component__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./settings-role/tables/routing-table-view.component */ 772753);
/* harmony import */ var _team_roles_table__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./team/roles-table */ 61734);
/* harmony import */ var _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @case-clinical/web/ui/button */ 510948);
/* harmony import */ var _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @case-clinical/web/ui/formly-designer */ 408916);
/* harmony import */ var _case_clinical_web_ui_pagination__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @case-clinical/web/ui/pagination */ 986409);
/* harmony import */ var _case_clinical_web_ui_tab__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @case-clinical/web/ui/tab */ 864771);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
















































class SettingsModule {}
SettingsModule.ɵfac = function SettingsModule_Factory(t) {
  return new (t || SettingsModule)();
};
SettingsModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: SettingsModule
});
SettingsModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  providers: [_business_logic_settings_service__WEBPACK_IMPORTED_MODULE_1__.SettingsService],
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _case_clinical_core_formly_setting__WEBPACK_IMPORTED_MODULE_3__.CoreFormlySettingModule, _fuse_components_alert__WEBPACK_IMPORTED_MODULE_4__.FuseAlertModule, _fuse_components_alert__WEBPACK_IMPORTED_MODULE_4__.FuseAlertModule, _fuse_components_card__WEBPACK_IMPORTED_MODULE_5__.FuseCardModule, _fuse_components_navigation__WEBPACK_IMPORTED_MODULE_6__.FuseNavigationModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_7__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_7__.MatButtonModule, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_8__.MatCheckboxModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatFormFieldModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatFormFieldModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__.MatIconModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__.MatIconModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_11__.MatInputModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_11__.MatInputModule, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_12__.MatProgressSpinnerModule, _angular_material_radio__WEBPACK_IMPORTED_MODULE_13__.MatRadioModule, _angular_material_radio__WEBPACK_IMPORTED_MODULE_13__.MatRadioModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_14__.MatSelectModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_14__.MatSelectModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_15__.MatSidenavModule, _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_16__.MatSlideToggleModule, _angular_material_stepper__WEBPACK_IMPORTED_MODULE_17__.MatStepperModule, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_18__.MatTabsModule, _angular_router__WEBPACK_IMPORTED_MODULE_19__.RouterModule.forChild(_settings_routing__WEBPACK_IMPORTED_MODULE_20__.settingsRoutes), libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_21__.SharedModule, _fuse_services_settings__WEBPACK_IMPORTED_MODULE_22__.ThemeSettingsModule, _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_23__.UiFormFieldModule, _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_24__.WebDatatableUiModule, _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_24__.WebDatatableUiModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_25__.WebUiButtonModule, _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_26__.WebUiFormlyDesignerModule, _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_26__.WebUiFormlyDesignerModule, _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_27__.WebUiFormModule, _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_27__.WebUiFormModule, _case_clinical_web_ui_pagination__WEBPACK_IMPORTED_MODULE_28__.WebUiPaginationModule, _case_clinical_web_ui_tab__WEBPACK_IMPORTED_MODULE_29__.WebUiTabModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](SettingsModule, {
    declarations: [_settings_feature_feature_item_component__WEBPACK_IMPORTED_MODULE_30__.FeatureItemComponent, _normal_settings_normal_settings_component__WEBPACK_IMPORTED_MODULE_31__.NormalSettingsComponent, _formly_settings_formly_settings_component__WEBPACK_IMPORTED_MODULE_32__.FormlySettingsComponent, _settings_role_role_select_component__WEBPACK_IMPORTED_MODULE_33__.RoleSelectComponent, _pipes_server_url_pipe__WEBPACK_IMPORTED_MODULE_34__.ServerUrlPipe, _account_account_component__WEBPACK_IMPORTED_MODULE_35__.SettingsAccountComponent, _settings_component__WEBPACK_IMPORTED_MODULE_36__.SettingsComponent, _settings_feature_settings_feature_component__WEBPACK_IMPORTED_MODULE_37__.SettingsFeatureComponent, _notifications_notifications_component__WEBPACK_IMPORTED_MODULE_38__.SettingsNotificationsComponent, _plan_billing_plan_billing_component__WEBPACK_IMPORTED_MODULE_39__.SettingsPlanBillingComponent, _settings_role_settings_role_component__WEBPACK_IMPORTED_MODULE_40__.SettingsRoleComponent, _security_security_component__WEBPACK_IMPORTED_MODULE_41__.SettingsSecurityComponent, _team_team_component__WEBPACK_IMPORTED_MODULE_42__.SettingsTeamComponent, _settings_tenant_settings_tenant_component__WEBPACK_IMPORTED_MODULE_43__.SettingsTenantComponent, _sign_up_settings_sign_up_settings_component__WEBPACK_IMPORTED_MODULE_44__.SignUpSettingsComponent, _settings_role_tables_features_table__WEBPACK_IMPORTED_MODULE_45__.WebFeaturesTableViewComponent, _settings_role_tables_routing_table_view_component__WEBPACK_IMPORTED_MODULE_46__.WebNavigationTableViewComponent, _team_roles_table__WEBPACK_IMPORTED_MODULE_47__.WebRoleTableViewComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _case_clinical_core_formly_setting__WEBPACK_IMPORTED_MODULE_3__.CoreFormlySettingModule, _fuse_components_alert__WEBPACK_IMPORTED_MODULE_4__.FuseAlertModule, _fuse_components_alert__WEBPACK_IMPORTED_MODULE_4__.FuseAlertModule, _fuse_components_card__WEBPACK_IMPORTED_MODULE_5__.FuseCardModule, _fuse_components_navigation__WEBPACK_IMPORTED_MODULE_6__.FuseNavigationModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_7__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_7__.MatButtonModule, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_8__.MatCheckboxModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatFormFieldModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatFormFieldModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__.MatIconModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__.MatIconModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_11__.MatInputModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_11__.MatInputModule, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_12__.MatProgressSpinnerModule, _angular_material_radio__WEBPACK_IMPORTED_MODULE_13__.MatRadioModule, _angular_material_radio__WEBPACK_IMPORTED_MODULE_13__.MatRadioModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_14__.MatSelectModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_14__.MatSelectModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_15__.MatSidenavModule, _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_16__.MatSlideToggleModule, _angular_material_stepper__WEBPACK_IMPORTED_MODULE_17__.MatStepperModule, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_18__.MatTabsModule, _angular_router__WEBPACK_IMPORTED_MODULE_19__.RouterModule, libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_21__.SharedModule, _fuse_services_settings__WEBPACK_IMPORTED_MODULE_22__.ThemeSettingsModule, _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_23__.UiFormFieldModule, _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_24__.WebDatatableUiModule, _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_24__.WebDatatableUiModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_25__.WebUiButtonModule, _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_26__.WebUiFormlyDesignerModule, _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_26__.WebUiFormlyDesignerModule, _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_27__.WebUiFormModule, _case_clinical_web_ui_form__WEBPACK_IMPORTED_MODULE_27__.WebUiFormModule, _case_clinical_web_ui_pagination__WEBPACK_IMPORTED_MODULE_28__.WebUiPaginationModule, _case_clinical_web_ui_tab__WEBPACK_IMPORTED_MODULE_29__.WebUiTabModule]
  });
})();

/***/ }),

/***/ 713716:
/*!********************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/settings/settings.routing.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "settingsRoutes": () => (/* binding */ settingsRoutes)
/* harmony export */ });
/* harmony import */ var _settings_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settings.component */ 115215);

const settingsRoutes = [{
  path: '',
  component: _settings_component__WEBPACK_IMPORTED_MODULE_0__.SettingsComponent
}];

/***/ }),

/***/ 279803:
/*!***********************************************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/settings/sign-up-settings/sign-up-settings.component.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SignUpSettingsComponent": () => (/* binding */ SignUpSettingsComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 224006);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_material_stepper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/stepper */ 958425);
/* harmony import */ var _account_account_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../account/account.component */ 49758);
/* harmony import */ var _settings_feature_settings_feature_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../settings-feature/settings-feature.component */ 51711);
/* harmony import */ var _notifications_notifications_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../notifications/notifications.component */ 878054);
/* harmony import */ var _plan_billing_plan_billing_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../plan-billing/plan-billing.component */ 483917);
/* harmony import */ var _settings_role_settings_role_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../settings-role/settings-role.component */ 711835);
/* harmony import */ var _security_security_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../security/security.component */ 258370);
/* harmony import */ var _team_team_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../team/team.component */ 926130);
/* harmony import */ var _settings_tenant_settings_tenant_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../settings-tenant/settings-tenant.component */ 610778);













function SignUpSettingsComponent_mat_step_7_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const panel_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](panel_r4.title);
  }
}
function SignUpSettingsComponent_mat_step_7_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "settings-account");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function SignUpSettingsComponent_mat_step_7_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "settings-security");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function SignUpSettingsComponent_mat_step_7_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "settings-plan-billing");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function SignUpSettingsComponent_mat_step_7_ng_container_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "settings-notifications");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function SignUpSettingsComponent_mat_step_7_ng_container_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "settings-feature");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function SignUpSettingsComponent_mat_step_7_ng_container_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "settings-team");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function SignUpSettingsComponent_mat_step_7_ng_container_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "settings-role");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function SignUpSettingsComponent_mat_step_7_ng_container_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "settings-tenant");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function SignUpSettingsComponent_mat_step_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-step", null, 9)(2, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, SignUpSettingsComponent_mat_step_7_ng_template_3_Template, 1, 1, "ng-template", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](4, 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, SignUpSettingsComponent_mat_step_7_ng_container_5_Template, 2, 0, "ng-container", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, SignUpSettingsComponent_mat_step_7_ng_container_6_Template, 2, 0, "ng-container", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, SignUpSettingsComponent_mat_step_7_ng_container_7_Template, 2, 0, "ng-container", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, SignUpSettingsComponent_mat_step_7_ng_container_8_Template, 2, 0, "ng-container", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, SignUpSettingsComponent_mat_step_7_ng_container_9_Template, 2, 0, "ng-container", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, SignUpSettingsComponent_mat_step_7_ng_container_10_Template, 2, 0, "ng-container", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, SignUpSettingsComponent_mat_step_7_ng_container_11_Template, 2, 0, "ng-container", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, SignUpSettingsComponent_mat_step_7_ng_container_12_Template, 2, 0, "ng-container", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const panel_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitch", panel_r4.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "account");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "security");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "plan-billing");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "notifications");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "feature");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "team");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "role");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "tenant");
  }
}
function SignUpSettingsComponent_mat_step_10_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const panel_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](panel_r16.title);
  }
}
function SignUpSettingsComponent_mat_step_10_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "settings-account");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function SignUpSettingsComponent_mat_step_10_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "settings-security");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function SignUpSettingsComponent_mat_step_10_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "settings-plan-billing");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function SignUpSettingsComponent_mat_step_10_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "settings-notifications");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function SignUpSettingsComponent_mat_step_10_ng_container_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "settings-feature");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function SignUpSettingsComponent_mat_step_10_ng_container_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "settings-team");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function SignUpSettingsComponent_mat_step_10_ng_container_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "settings-role");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function SignUpSettingsComponent_mat_step_10_ng_container_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "settings-tenant");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
}
function SignUpSettingsComponent_mat_step_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-step", null, 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, SignUpSettingsComponent_mat_step_10_ng_template_2_Template, 1, 1, "ng-template", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](3, 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, SignUpSettingsComponent_mat_step_10_ng_container_4_Template, 2, 0, "ng-container", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, SignUpSettingsComponent_mat_step_10_ng_container_5_Template, 2, 0, "ng-container", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, SignUpSettingsComponent_mat_step_10_ng_container_6_Template, 2, 0, "ng-container", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, SignUpSettingsComponent_mat_step_10_ng_container_7_Template, 2, 0, "ng-container", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, SignUpSettingsComponent_mat_step_10_ng_container_8_Template, 2, 0, "ng-container", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, SignUpSettingsComponent_mat_step_10_ng_container_9_Template, 2, 0, "ng-container", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, SignUpSettingsComponent_mat_step_10_ng_container_10_Template, 2, 0, "ng-container", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, SignUpSettingsComponent_mat_step_10_ng_container_11_Template, 2, 0, "ng-container", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const panel_r16 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitch", panel_r16.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "account");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "security");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "plan-billing");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "notifications");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "feature");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "team");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "role");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "tenant");
  }
}
class SignUpSettingsComponent {
  constructor(_formBuilder) {
    this._formBuilder = _formBuilder;
    this.panels = [];
    this.signInForm = this._formBuilder.group({
      email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.Validators.email]],
      password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__.Validators.required],
      rememberMe: ['']
    });
    this.horizontalStepperForm = this._formBuilder.group({
      step1: this._formBuilder.group({
        email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.Validators.email]],
        country: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__.Validators.required],
        language: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__.Validators.required]
      }),
      step2: this._formBuilder.group({
        firstName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__.Validators.required],
        lastName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__.Validators.required],
        userName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__.Validators.required],
        about: ['']
      }),
      step3: this._formBuilder.group({
        byEmail: this._formBuilder.group({
          companyNews: [true],
          featuredProducts: [false],
          messages: [true]
        }),
        pushNotifications: ['everything', _angular_forms__WEBPACK_IMPORTED_MODULE_1__.Validators.required]
      })
    });
    this.verticalStepperForm = this._formBuilder.group({
      step1: this._formBuilder.group({
        email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.Validators.email]],
        country: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__.Validators.required],
        language: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__.Validators.required]
      }),
      step2: this._formBuilder.group({
        firstName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__.Validators.required],
        lastName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__.Validators.required],
        userName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__.Validators.required],
        about: ['']
      }),
      step3: this._formBuilder.group({
        byEmail: this._formBuilder.group({
          companyNews: [true],
          featuredProducts: [false],
          messages: [true]
        }),
        pushNotifications: ['everything', _angular_forms__WEBPACK_IMPORTED_MODULE_1__.Validators.required]
      })
    });
  }
  signIn() {
    console.log('signIn');
  }
}
SignUpSettingsComponent.ɵfac = function SignUpSettingsComponent_Factory(t) {
  return new (t || SignUpSettingsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormBuilder));
};
SignUpSettingsComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: SignUpSettingsComponent,
  selectors: [["auth-sign-up-settings"]],
  inputs: {
    panels: "panels"
  },
  decls: 11,
  vars: 4,
  consts: [[1, "flex", "flex-col", "sm:flex-row", "items-center", "md:items-start", "sm:justify-center", "md:justify-start", "flex-auto", "min-w-0"], [1, "flex", "items-center", "justify-center", "w-full", "sm:w-auto", "md:h-full", "md:w-full", "py-8", "px-4", "sm:p-12", "md:p-16", "sm:rounded-2xl", "md:rounded-none", "sm:shadow", "md:shadow-none", "sm:bg-card"], [1, "sm:w-full", "mx-auto", "sm:mx-0"], [1, "mt-8", "mb-8", "px-4", "text-4xl", "text-center", "font-extrabold", "tracking-tight", "leading-tight"], [1, "hidden", "md:block", "dark:bg-gray-900", 3, "linear"], ["horizontalStepper", ""], [4, "ngFor", "ngForOf"], [1, "md:hidden", "rounded", "dark:bg-gray-900", 3, "linear"], ["verticalStepper", ""], ["horizontalStepperStep1", ""], [1, "flex", "flex-col", "items-center"], ["matStepLabel", ""], [3, "ngSwitch"], [4, "ngSwitchCase"], [1, "dark:bg-gray-900", 3, "ngSwitch"]],
  template: function SignUpSettingsComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Sign Up Settings");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "mat-horizontal-stepper", 4, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, SignUpSettingsComponent_mat_step_7_Template, 13, 9, "mat-step", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "mat-vertical-stepper", 7, 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, SignUpSettingsComponent_mat_step_10_Template, 12, 9, "mat-step", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("linear", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.panels);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("linear", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.panels);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgSwitch, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgSwitchCase, _angular_material_stepper__WEBPACK_IMPORTED_MODULE_3__.MatStep, _angular_material_stepper__WEBPACK_IMPORTED_MODULE_3__.MatStepLabel, _angular_material_stepper__WEBPACK_IMPORTED_MODULE_3__.MatStepper, _account_account_component__WEBPACK_IMPORTED_MODULE_4__.SettingsAccountComponent, _settings_feature_settings_feature_component__WEBPACK_IMPORTED_MODULE_5__.SettingsFeatureComponent, _notifications_notifications_component__WEBPACK_IMPORTED_MODULE_6__.SettingsNotificationsComponent, _plan_billing_plan_billing_component__WEBPACK_IMPORTED_MODULE_7__.SettingsPlanBillingComponent, _settings_role_settings_role_component__WEBPACK_IMPORTED_MODULE_8__.SettingsRoleComponent, _security_security_component__WEBPACK_IMPORTED_MODULE_9__.SettingsSecurityComponent, _team_team_component__WEBPACK_IMPORTED_MODULE_10__.SettingsTeamComponent, _settings_tenant_settings_tenant_component__WEBPACK_IMPORTED_MODULE_11__.SettingsTenantComponent],
  encapsulation: 2
});

/***/ }),

/***/ 61734:
/*!********************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/settings/team/roles-table.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebRoleTableViewComponent": () => (/* binding */ WebRoleTableViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../datatable/ui/src/lib/table-view/table-view.component */ 598705);




class WebRoleTableViewComponent {
  constructor() {
    this.roles = [];
    this.itemDidSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.rowItemsSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.columnDefs = [{
      field: 'id',
      filter: 'agTextColumnFilter',
      hide: true
    }, {
      headerName: 'Please select roles to assign',
      field: 'name',
      filter: 'agTextColumnFilter',
      headerCheckboxSelection: true,
      checkboxSelection: true
    }];
  }
  selectionDidChange(selectedRows) {
    this.rowItemsSelected.emit(selectedRows);
  }
  setSelected(ids) {
    this.tableView.gridApi.forEachNode(node => {
      var _a;
      if (ids.includes((_a = node.data) === null || _a === void 0 ? void 0 : _a.id)) {
        node.setSelected(true);
      } else {
        node.setSelected(false);
      }
    });
  }
  onSelected(selected) {
    this.itemDidSelect.emit(selected);
  }
}
WebRoleTableViewComponent.ɵfac = function WebRoleTableViewComponent_Factory(t) {
  return new (t || WebRoleTableViewComponent)();
};
WebRoleTableViewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebRoleTableViewComponent,
  selectors: [["ui-role-table-view"]],
  viewQuery: function WebRoleTableViewComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_1__.TableViewComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.tableView = _t.first);
    }
  },
  inputs: {
    roles: "roles"
  },
  outputs: {
    itemDidSelect: "itemDidSelect",
    rowItemsSelected: "rowItemsSelected"
  },
  decls: 1,
  vars: 5,
  consts: [[1, "w-full", "h-full", 3, "data", "showSidebar", "floatingFilter", "suppressRowClickSelection", "columnDefs", "itemDidSelect", "selectionDidChange"]],
  template: function WebRoleTableViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table-view", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("itemDidSelect", function WebRoleTableViewComponent_Template_table_view_itemDidSelect_0_listener($event) {
        return ctx.onSelected($event);
      })("selectionDidChange", function WebRoleTableViewComponent_Template_table_view_selectionDidChange_0_listener($event) {
        return ctx.selectionDidChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("data", ctx.roles)("showSidebar", false)("floatingFilter", false)("suppressRowClickSelection", true)("columnDefs", ctx.columnDefs);
    }
  },
  dependencies: [_case_clinical_web_datatable_ui__WEBPACK_IMPORTED_MODULE_1__.TableViewComponent],
  encapsulation: 2
});

/***/ }),

/***/ 926130:
/*!***********************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/settings/team/team.component.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingsTeamComponent": () => (/* binding */ SettingsTeamComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 782722);
/* harmony import */ var _roles_table__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./roles-table */ 61734);
/* harmony import */ var _team_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./team.store */ 273299);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 224006);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _ngneat_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngneat/dialog */ 357148);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/form-field */ 759549);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/input */ 300284);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);

















const _c0 = ["dlg"];
function SettingsTeamComponent_ng_container_0_ng_template_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 18)(1, "div", 19)(2, "ui-formly-json-form", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function SettingsTeamComponent_ng_container_0_ng_template_14_Template_ui_formly_json_form_save_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r7);
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r6.submit($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const vm_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().ngIf;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", true)("model", vm_r1.profile)("formData", vm_r1.profile)("componentStore", ctx_r3.store);
  }
}
function SettingsTeamComponent_ng_container_0_ng_container_16_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const user_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", user_r9.avatarUrl, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
  }
}
function SettingsTeamComponent_ng_container_0_ng_container_16_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const user_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", user_r9.username.charAt(0), " ");
  }
}
const _c1 = function (a0, a1) {
  return {
    "hover:bg-gray-100 dark:hover:bg-hover": a0,
    "bg-primary-50 dark:bg-hover": a1
  };
};
function SettingsTeamComponent_ng_container_0_ng_container_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SettingsTeamComponent_ng_container_0_ng_container_16_Template_div_click_1_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r15);
      const user_r9 = restoredCtx.$implicit;
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r14.selectUser(user_r9));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 22)(3, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, SettingsTeamComponent_ng_container_0_ng_container_16_ng_container_4_Template, 2, 1, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, SettingsTeamComponent_ng_container_0_ng_container_16_ng_container_5_Template, 3, 1, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 24)(7, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const user_r9 = ctx.$implicit;
    const vm_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](5, _c1, user_r9.id !== vm_r1.selectedUserId, user_r9.id === vm_r1.selectedUserId));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", user_r9.avatarUrl);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !user_r9.avatarUrl);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](user_r9.username);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"]((user_r9.emails[0] == null ? null : user_r9.emails[0].email) || "");
  }
}
function SettingsTeamComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "mat-form-field", 5)(6, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Add team members");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "mat-icon", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "input", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("keydown", function SettingsTeamComponent_ng_container_0_Template_input_keydown_9_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r18);
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r17.setSearchQuery($event.target.value));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "mat-icon", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SettingsTeamComponent_ng_container_0_Template_button_click_12_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r18);
      const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](15);
      const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r19.openDialog(_r2, {
        value: null
      }));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Add a member ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](14, SettingsTeamComponent_ng_container_0_ng_template_14_Template, 3, 4, "ng-template", null, 11, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](16, SettingsTeamComponent_ng_container_0_ng_container_16_Template, 11, 8, "ng-container", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 13)(18, "ui-role-table-view", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("rowItemsSelected", function SettingsTeamComponent_ng_container_0_Template_ui_role_table_view_rowItemsSelected_18_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r18);
      const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r20.rowItemsSelected($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 15)(20, "button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SettingsTeamComponent_ng_container_0_Template_button_click_20_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r18);
      const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r21.setOriginalRoleIds());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, " Cancel ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SettingsTeamComponent_ng_container_0_Template_button_click_22_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r18);
      const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r22.saveRoles());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "Save Changes ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const vm_r1 = ctx.ngIf;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("floatLabel", "always");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:user");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("placeholder", "Email address");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:plus-circle");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", "primary");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", vm_r1.users)("ngForTrackBy", ctx_r0.trackByFn);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("roles", vm_r1.roles);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", !vm_r1.canSave);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", !vm_r1.canSave)("color", "primary");
  }
}
class SettingsTeamComponent {
  /**
   * Constructor
   */
  constructor(store, dialog) {
    this.store = store;
    this.dialog = dialog;
    this.fields = [];
    this.dlgForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormGroup({});
    this.formModel = {};
    this.dlgOptions = {};
    this.vm$ = this.store.vm$;
    this._unsubscribeAll = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subject();
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit() {
    this.store.fetchUsersAndRolesEffect();
    this.store.selectedTableIds$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.takeUntil)(this._unsubscribeAll)).subscribe(data => {
      if (data.shouldRefreshTable) {
        this.tableView.setSelected(data.selectedRoleIds);
      }
    });
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
  rowItemsSelected(selectedData) {
    console.log(selectedData);
    this.store.setSelectedRoleIds(selectedData.map(data => data.id));
  }
  selectUser(user) {
    this.store.selectUser(user);
  }
  setOriginalRoleIds() {
    this.store.setOriginalRoleIds();
  }
  saveRoles() {
    this.store.saveRolesEffect();
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
  setSearchQuery(searchQuery) {
    this.store.setSearchQuery(searchQuery);
  }
  openDialog(tpl, {
    value,
    height,
    width
  }) {
    this.dlgForm.reset();
    this.ref = this.dialog.open(tpl, {
      data: {
        value: value
      },
      height: height || 'auto',
      width: width || '50%'
    });
    this.ref.afterClosed$.subscribe(result => {
      console.log('Dialog closed', result);
    });
  }
  open(directModel = undefined) {
    var _a;
    (_a = this.dlgForm) === null || _a === void 0 ? void 0 : _a.reset();
    this.ref = this.dialog.open(this.dlgTpl, {
      data: {
        value: {}
      },
      height: 'auto',
      width: 'auto'
    });
  }
  submit(formData) {
    console.log(formData);
    const location = formData['location'];
    alert(JSON.stringify(formData));
    const {
      name,
      developer,
      username,
      password,
      firstName,
      lastName,
      avatarUrl,
      line1,
      line2,
      city,
      state,
      postalCode,
      phone,
      bio,
      slug,
      status,
      signupStatus,
      verified,
      customerId,
      planId,
      dateOfBirth,
      cellPhone,
      education,
      officeName
    } = formData;
    this.store.createUserEffect({
      name,
      developer,
      username,
      password,
      firstName,
      lastName,
      avatarUrl,
      line1,
      line2,
      city,
      state,
      postalCode,
      phone,
      bio,
      slug,
      status,
      signupStatus,
      verified,
      customerId,
      planId,
      dateOfBirth,
      cellPhone,
      education,
      officeName
    });
    this.dlgForm.reset();
    this.dialog.closeAll();
  }
}
SettingsTeamComponent.ɵfac = function SettingsTeamComponent_Factory(t) {
  return new (t || SettingsTeamComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_team_store__WEBPACK_IMPORTED_MODULE_4__.TeamSetttingStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ngneat_dialog__WEBPACK_IMPORTED_MODULE_5__.DialogService));
};
SettingsTeamComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: SettingsTeamComponent,
  selectors: [["settings-team"]],
  viewQuery: function SettingsTeamComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_roles_table__WEBPACK_IMPORTED_MODULE_6__.WebRoleTableViewComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.tableView = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.dlgTpl = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_team_store__WEBPACK_IMPORTED_MODULE_4__.TeamSetttingStore])],
  decls: 2,
  vars: 3,
  consts: [[4, "ngIf"], [1, "flex", "flex-col", "h-full"], [1, "flex", "flex-row", "gap-2", "h-full"], [1, "flex-1", "flex", "flex-col", "divide-y", "h-auto"], [1, "w-full", "mb-8"], [1, "fuse-mat-no-subscript", "w-full", 3, "floatLabel"], ["matPrefix", "", 1, "icon-size-5", 3, "svgIcon"], ["matInput", "", 3, "placeholder", "keydown"], ["mat-icon-button", "", "matSuffix", ""], [1, "icon-size-5", 3, "svgIcon"], ["mat-flat-button", "", "type", "button", 1, "w-full", "py-5", "text-white", 3, "color", "click"], ["dlg", ""], [4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "flex-1", "h-full", "flex", "flex-col"], [1, "flex-1", "rounded-md", 3, "roles", "rowItemsSelected"], [1, "flex", "items-center", "justify-end", "my-2", "mr-2"], ["mat-stroked-button", "", "type", "button", 3, "disabled", "click"], ["mat-flat-button", "", "type", "button", 1, "ml-4", 3, "disabled", "color", "click"], [1, "flex", "flex-col", "p-4", "gap-2", "h-full", "bg-grey-light", "overflow-auto"], [1, "w-full", "h-full", "px-10", "py-6"], ["formName", "user_create", 1, "w-full", "h-full", 3, "showSubmitButton", "model", "formData", "componentStore", "save"], [1, "flex", "flex-col", "sm:flex-row", "border-t", "sm:items-center", "py-6", "px-2", "cursor-pointer", "hover:bg-gray-100", "dark:hover:bg-hover", 3, "ngClass", "click"], [1, "flex", "items-center"], [1, "flex", "flex-0", "items-center", "justify-center", "w-10", "h-10", "rounded-full", "overflow-hidden"], [1, "ml-4"], [1, "font-medium"], [1, "text-secondary"], ["alt", "Contact avatar", 1, "object-cover", "w-full", "h-full", 3, "src"], [1, "flex", "items-center", "justify-center", "w-full", "h-full", "rounded-full", "text-lg", "uppercase", "bg-gray-200", "text-gray-600", "dark:bg-gray-700", "dark:text-gray-200"]],
  template: function SettingsTeamComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, SettingsTeamComponent_ng_container_0_Template, 24, 11, "ng-container", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](1, "async");
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](1, 1, ctx.vm$));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_material_button__WEBPACK_IMPORTED_MODULE_8__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_8__.MatIconButton, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatPrefix, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatSuffix, _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__.MatIcon, _angular_material_input__WEBPACK_IMPORTED_MODULE_11__.MatInput, _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_12__.WebUiFormlyJsonFormComponent, _roles_table__WEBPACK_IMPORTED_MODULE_6__.WebRoleTableViewComponent, _angular_common__WEBPACK_IMPORTED_MODULE_7__.AsyncPipe],
  encapsulation: 2,
  changeDetection: 0
});

/***/ }),

/***/ 273299:
/*!*******************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/settings/team/team.store.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TeamSetttingStore": () => (/* binding */ TeamSetttingStore)
/* harmony export */ });
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 318505);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 911365);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _fuse_services_loading_loading_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fuse/services/loading/loading.service */ 301463);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @case-clinical/web/ui/toast */ 971873);
/* harmony import */ var _business_logic_settings_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../business-logic/settings.service */ 730788);













class TeamSetttingStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(router, loading, route, data, toast, service) {
    super({
      loading: false,
      originalRoleIds: [],
      query: '',
      roles: [],
      searchQuery: '',
      selectedRoleIds: [],
      selectedUserId: '',
      shouldRefreshTable: false,
      users: []
    });
    this.router = router;
    this.loading = loading;
    this.route = route;
    this.data = data;
    this.toast = toast;
    this.service = service;
    this.selectedUserId$ = this.select(s => s.selectedUserId);
    this.shouldRefreshTable$ = this.select(s => s.shouldRefreshTable);
    this.originalRoleIds$ = this.select(s => s.originalRoleIds);
    this.selectedRoleIds$ = this.select(s => s.selectedRoleIds);
    this.searchQuery$ = this.select(s => s.searchQuery);
    this.users$ = this.select(s => s.users);
    this.roles$ = this.select(s => s.roles);
    this.loading$ = this.select(s => s.loading);
    this.canSave$ = this.select(this.selectedRoleIds$, this.originalRoleIds$, (selectedRoleIds, originalRoleIds) => {
      console.log(selectedRoleIds, originalRoleIds);
      if (selectedRoleIds.length !== originalRoleIds.length) return true;
      const diff1 = selectedRoleIds.filter(a => !originalRoleIds.includes(a));
      const diff2 = originalRoleIds.filter(a => !selectedRoleIds.includes(a));
      if (diff1.length === 0 && diff2.length === 0) return false;else return true;
    });
    this.selectedTableIds$ = this.select(this.shouldRefreshTable$, this.selectedRoleIds$, (shouldRefreshTable, selectedRoleIds) => ({
      shouldRefreshTable,
      selectedRoleIds
    }));
    this.vm$ = this.select(this.selectedUserId$, this.loading$, this.users$, this.roles$, this.canSave$, this.searchQuery$, (selectedUserId, loading, users, roles, canSave, searchQuery) => {
      const searchUsers = [];
      users.forEach(user => {
        var _a, _b, _c;
        const userEmail = (_c = (_b = (_a = user === null || user === void 0 ? void 0 : user.emails) === null || _a === void 0 ? void 0 : _a.at(0)) === null || _b === void 0 ? void 0 : _b.email) === null || _c === void 0 ? void 0 : _c.toLowerCase();
        if (userEmail === null || userEmail === void 0 ? void 0 : userEmail.includes(searchQuery === null || searchQuery === void 0 ? void 0 : searchQuery.toLowerCase())) searchUsers.push(user);
      });
      return {
        selectedUserId,
        loading,
        users: searchUsers,
        roles,
        canSave,
        searchQuery
      };
    });
    this.setSelectedRoleIds = this.updater((state, selectedRoleIds) => Object.assign(Object.assign({}, state), {
      selectedRoleIds,
      shouldRefreshTable: false
    }));
    this.setOriginalRoleIds = this.updater(state => Object.assign(Object.assign({}, state), {
      selectedRoleIds: state.originalRoleIds,
      shouldRefreshTable: true
    }));
    this.selectUser = this.updater((state, user) => {
      const roleIds = user.userRoles.map(userRole => userRole.roleId);
      return Object.assign(Object.assign({}, state), {
        selectedUserId: user.id,
        shouldRefreshTable: true,
        selectedRoleIds: roleIds,
        originalRoleIds: roleIds
      });
    });
    this.setSearchQuery = this.updater((state, searchQuery) => {
      return Object.assign(Object.assign({}, state), {
        searchQuery: searchQuery
      });
    });
    this.fetchUsersAndRolesEffect = this.effect($ => $.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(() => {
      this.patchState({
        loading: true
      });
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(() => this.service.fetchUsersAndRoles().pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(data => {
      this.patchState({
        loading: false,
        users: data.users,
        roles: data.roles
      });
      setTimeout(() => {
        this.selectUser(data.users[0]);
      }, 200);
    }, error => {
      this.patchState({
        loading: false
      });
    })))));
    this.saveRolesEffect = this.effect($ => $.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(() => {
      this.patchState({
        loading: true
      });
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.selectedUserId$, this.selectedRoleIds$, this.users$), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(([_, selectedUserId, selectedRoleIds, users]) => this.service.updateUserRoles(selectedUserId, selectedRoleIds).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(data => {
      this.toast.success('Successfully updated roles', {
        duration: 3000
      });
      const selectedUser = users.find(user => user.id === selectedUserId);
      selectedUser.userRoles = selectedRoleIds.map(roleId => ({
        id: '',
        roleId: roleId
      }));
      this.patchState({
        loading: false,
        originalRoleIds: selectedRoleIds
      });
    }, error => {
      this.toast.error('Failed to update roles', {
        duration: 3000
      });
      this.patchState({
        loading: false
      });
    })))));
    this.createUserEffect = this.effect(input$ => input$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.patchState({
      loading: true
    })), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.switchMap)(input => {
      console.log("+++++++", input);
      return this.data.userCreateUser({
        input
      }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
        this.patchState({
          item: res.data.created,
          errors: res.errors,
          loading: false
        });
        return this.router.navigate(['..'], {
          relativeTo: this.route
        });
      }, errors => this.patchState({
        loading: false,
        errors: errors.graphQLErrors ? errors.graphQLErrors : errors
      })));
    })));
  }
}
TeamSetttingStore.ɵfac = function TeamSetttingStore_Factory(t) {
  return new (t || TeamSetttingStore)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_fuse_services_loading_loading_service__WEBPACK_IMPORTED_MODULE_6__.FuseLoadingService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_7__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_8__.WebUiToastService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_business_logic_settings_service__WEBPACK_IMPORTED_MODULE_9__.SettingsService));
};
TeamSetttingStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
  token: TeamSetttingStore,
  factory: TeamSetttingStore.ɵfac
});

/***/ }),

/***/ 632485:
/*!***********************************************************************!*\
  !*** ./libs/web/ui/pagination/src/lib/web-ui-pagination.component.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebUiPaginationComponent": () => (/* binding */ WebUiPaginationComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _la_icon_src_lib_web_ui_la_icon_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../la-icon/src/lib/web-ui-la-icon.component */ 631797);




function WebUiPaginationComponent_ng_container_25_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WebUiPaginationComponent_ng_container_25_ng_container_1_Template_a_click_1_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4);
      const page_r2 = restoredCtx.$implicit;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r3.onGoToPageClick(page_r2));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const page_r2 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx_r1.computeButtonClasses(page_r2) + " cursor-pointer relative inline-flex items-center px-4 py-2 border text-sm font-medium");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", page_r2, " ");
  }
}
function WebUiPaginationComponent_ng_container_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebUiPaginationComponent_ng_container_25_ng_container_1_Template, 3, 2, "ng-container", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r0.pages);
  }
}
class WebUiPaginationComponent {
  constructor() {
    this.skipChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.pageChangedEmitter = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
  }
  get pages() {
    if (!this.total || !this.limit) return [];
    return new Array(this.maxPageCount).fill('').map((_, index) => index + 1);
  }
  get maxPageCount() {
    return Math.ceil(this.total / this.limit);
  }
  get hasPrevPage() {
    return this.skip >= 1 && this.limit != 0;
  }
  get hasNextPage() {
    return this.skip + this.limit < this.total;
    //return this.skip <= this.total && this.limit != 0
  }

  get rangeToLabel() {
    return !this.hasNextPage ? this.total : this.skip + this.limit;
  }
  onDecrementClick() {
    if (this.hasPrevPage) {
      this.skipChange.emit(this.skip - this.limit);
    }
  }
  onIncrementClick() {
    if (this.hasNextPage) {
      this.skipChange.emit(this.skip + this.limit);
    }
  }
  onGoToPageClick(page) {
    const pageIndex = page - 1;
    this.pageChangedEmitter.emit(pageIndex);
    if (pageIndex <= this.maxPageCount) {
      this.skipChange.emit(pageIndex);
    }
  }
  computeButtonClasses(page) {
    const activeStyles = 'z-10 bg-blue-50 dark:bg-blue-900 border-blue-500 dark:border-blue-500 text-blue-600 dark:text-blue-100';
    const defaultStyles = 'bg-transparent border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600';
    return page === this.skip + 1 ? activeStyles : defaultStyles;
  }
}
WebUiPaginationComponent.ɵfac = function WebUiPaginationComponent_Factory(t) {
  return new (t || WebUiPaginationComponent)();
};
WebUiPaginationComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebUiPaginationComponent,
  selectors: [["ui-pagination"]],
  inputs: {
    limit: "limit",
    skip: "skip",
    total: "total",
    showPages: "showPages"
  },
  outputs: {
    skipChange: "skipChange",
    pageChangedEmitter: "pageChangedEmitter"
  },
  decls: 30,
  vars: 20,
  consts: [[1, "bg-transparent", "px-4", "py-3", "flex", "items-center", "justify-between", "border-t", "border-gray-200", "dark:border-gray-700", "sm:px-6"], [1, "flex-1", "flex", "justify-between", "sm:hidden"], [1, "relative", "inline-flex", "items-center", "px-4", "py-2", "border", "border-gray-300", "dark:border-gray-700", "text-sm", "font-medium", "rounded-md", "text-gray-700", "bg-white", "hover:bg-gray-50", 3, "click"], [1, "ml-3", "relative", "inline-flex", "items-center", "px-4", "py-2", "border", "border-gray-300", "text-sm", "font-medium", "rounded-md", "text-gray-700", "bg-white", "hover:bg-gray-50", 3, "click"], [1, "hidden", "sm:flex-1", "sm:flex", "sm:items-center", "sm:justify-between"], [1, "text-sm", "text-gray-700", "dark:text-gray-200"], [1, "font-medium"], ["aria-label", "Pagination", 1, "relative", "z-0", "inline-flex", "rounded-md", "shadow-sm", "-space-x-px"], [1, "relative", "cursor-pointer", "inline-flex", "disabled:cursor-default", "disabled:opacity-75", "disabled:hover:bg-transparent", "items-center", "px-3", "py-2", "pt-2.5", "rounded-l-md", "border", "border-gray-300", "dark:border-gray-700", "text-sm", "font-medium", "text-gray-500", "dark:text-gray-400", 3, "click"], [1, "sr-only"], [3, "icon", "size"], [4, "ngIf"], [1, "relative", "cursor-pointer", "inline-flex", "disabled:cursor-default", "disabled:opacity-75", "disabled:hover:bg-transparent", "items-center", "px-3", "py-2", "pt-2.5", "rounded-r-md", "border", "border-gray-300", "dark:border-gray-700", "text-sm", "font-medium", "text-gray-500", "dark:text-gray-400", 3, "click"], [4, "ngFor", "ngForOf"], [3, "ngClass", "click"]],
  template: function WebUiPaginationComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "a", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WebUiPaginationComponent_Template_a_click_2_listener() {
        return ctx.onDecrementClick();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, " Previous ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "a", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WebUiPaginationComponent_Template_a_click_4_listener() {
        return ctx.onIncrementClick();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, " Next ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 4)(7, "div")(8, "p", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, " Showing ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "span", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, " to ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "span", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, " of ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "span", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, " results ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div")(20, "nav", 7)(21, "button", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WebUiPaginationComponent_Template_button_click_21_listener() {
        return ctx.onDecrementClick();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "span", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "Previous");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](24, "ui-la-icon", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](25, WebUiPaginationComponent_ng_container_25_Template, 2, 1, "ng-container", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "button", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WebUiPaginationComponent_Template_button_click_26_listener() {
        return ctx.onIncrementClick();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "span", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, "Next");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](29, "ui-la-icon", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](11);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.skip + 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.rangeToLabel);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.total);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("dark:hover:bg-gray-700", ctx.hasPrevPage)("hover:bg-gray-50", ctx.hasPrevPage);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("disabled", !ctx.hasPrevPage ? true : null)("readonly", !ctx.hasPrevPage ? true : null);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("icon", "chevron-left")("size", "lg");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.showPages);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("dark:hover:bg-gray-700", ctx.hasNextPage)("hover:bg-gray-50", ctx.hasNextPage);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("disabled", !ctx.hasNextPage ? true : null)("readonly", !ctx.hasNextPage ? true : null);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("icon", "chevron-right")("size", "lg");
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgIf, _la_icon_src_lib_web_ui_la_icon_component__WEBPACK_IMPORTED_MODULE_2__.WebUiLaIconComponent],
  encapsulation: 2
});

/***/ }),

/***/ 986409:
/*!********************************************************************!*\
  !*** ./libs/web/ui/pagination/src/lib/web-ui-pagination.module.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebUiPaginationModule": () => (/* binding */ WebUiPaginationModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_ui_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @case-clinical/web/ui/icon */ 320558);
/* harmony import */ var _web_ui_pagination_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./web-ui-pagination.component */ 632485);
/* harmony import */ var _la_icon_src_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../la-icon/src/index */ 928356);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);






class WebUiPaginationModule {}
WebUiPaginationModule.ɵfac = function WebUiPaginationModule_Factory(t) {
  return new (t || WebUiPaginationModule)();
};
WebUiPaginationModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebUiPaginationModule
});
WebUiPaginationModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule, _case_clinical_web_ui_icon__WEBPACK_IMPORTED_MODULE_3__.WebUiIconModule, _la_icon_src_index__WEBPACK_IMPORTED_MODULE_4__.WebUiLaIconModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebUiPaginationModule, {
    declarations: [_web_ui_pagination_component__WEBPACK_IMPORTED_MODULE_5__.WebUiPaginationComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule, _case_clinical_web_ui_icon__WEBPACK_IMPORTED_MODULE_3__.WebUiIconModule, _la_icon_src_index__WEBPACK_IMPORTED_MODULE_4__.WebUiLaIconModule],
    exports: [_web_ui_pagination_component__WEBPACK_IMPORTED_MODULE_5__.WebUiPaginationComponent]
  });
})();

/***/ }),

/***/ 116310:
/*!*********************************************************!*\
  !*** ./libs/web/ui/tab/src/lib/web-ui-tab.component.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebUiTabComponent": () => (/* binding */ WebUiTabComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/tabs */ 503848);




function WebUiTabComponent_mat_tab_1_ng_template_1_ng_content_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](0, 0, ["*ngTemplateOutlet", "tab.content"]);
  }
}
function WebUiTabComponent_mat_tab_1_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, WebUiTabComponent_mat_tab_1_ng_template_1_ng_content_0_Template, 1, 0, "ng-content", 4);
  }
  if (rf & 2) {
    const tab_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", tab_r1.content);
  }
}
function WebUiTabComponent_mat_tab_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-tab", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebUiTabComponent_mat_tab_1_ng_template_1_Template, 1, 1, "ng-template", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const tab_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("label", tab_r1.label);
  }
}
const _c0 = ["*"];
class WebUiTabComponent {
  constructor() {
    this.tabSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
  }
  clickHandler(tab) {
    this.active = 9999;
    // if (this.tabSelected) {
    //   this.tabSelected.emit([tab, this.options])
    // }
  }
}

WebUiTabComponent.ɵfac = function WebUiTabComponent_Factory(t) {
  return new (t || WebUiTabComponent)();
};
WebUiTabComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebUiTabComponent,
  selectors: [["ui-tabs"]],
  inputs: {
    tabs: "tabs",
    active: "active",
    styleType: "styleType"
  },
  outputs: {
    tabSelected: "tabSelected"
  },
  ngContentSelectors: _c0,
  decls: 2,
  vars: 1,
  consts: [[1, "h-100"], [3, "label", 4, "ngFor", "ngForOf"], [3, "label"], ["matTabContent", ""], [4, "ngTemplateOutlet"]],
  template: function WebUiTabComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-tab-group", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebUiTabComponent_mat_tab_1_Template, 2, 1, "mat-tab", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.tabs);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgTemplateOutlet, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_2__.MatTabContent, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_2__.MatTab, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_2__.MatTabGroup],
  styles: [".mat-tab-label-container {\n  padding-left: 0px !important;\n  padding-right: 0px !important;\n  margin-right: 24px !important;\n}\n\n  .mat-tab-body-content {\n  padding-left: 0 !important;\n  padding-right: 0 !important;\n}"]
});

/***/ }),

/***/ 864771:
/*!******************************************************!*\
  !*** ./libs/web/ui/tab/src/lib/web-ui-tab.module.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebUiTabModule": () => (/* binding */ WebUiTabModule)
/* harmony export */ });
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/tabs */ 503848);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _web_ui_tab_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./web-ui-tab.component */ 116310);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);





class WebUiTabModule {}
WebUiTabModule.ɵfac = function WebUiTabModule_Factory(t) {
  return new (t || WebUiTabModule)();
};
WebUiTabModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebUiTabModule
});
WebUiTabModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_3__.MatTabsModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebUiTabModule, {
    declarations: [_web_ui_tab_component__WEBPACK_IMPORTED_MODULE_4__.WebUiTabComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_3__.MatTabsModule],
    exports: [_web_ui_tab_component__WEBPACK_IMPORTED_MODULE_4__.WebUiTabComponent]
  });
})();

/***/ })

}]);