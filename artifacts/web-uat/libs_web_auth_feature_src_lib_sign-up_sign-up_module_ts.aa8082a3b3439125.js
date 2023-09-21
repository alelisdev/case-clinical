"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["libs_web_auth_feature_src_lib_sign-up_sign-up_module_ts"],{

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

/***/ 115768:
/*!********************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/sign-up/sign-up.component.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthSignUpComponent": () => (/* binding */ AuthSignUpComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 224006);
/* harmony import */ var _fuse_animations__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @fuse/animations */ 662235);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_core_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @case-clinical/core/auth */ 735483);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/checkbox */ 556709);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/form-field */ 759549);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/input */ 300284);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/progress-spinner */ 151572);
/* harmony import */ var _fuse_components_alert_alert_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @fuse/components/alert/alert.component */ 967884);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 836895);

















const _c0 = ["signUpNgForm"];
function AuthSignUpComponent_fuse_alert_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "fuse-alert", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("appearance", "outline")("showIcon", false)("type", ctx_r0.alert.type)("@shake", ctx_r0.alert.type === "error");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r0.alert.message, " ");
  }
}
function AuthSignUpComponent_mat_error_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Full name is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function AuthSignUpComponent_mat_error_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Email address is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function AuthSignUpComponent_mat_error_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Please enter a valid email address ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function AuthSignUpComponent_mat_icon_31_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-icon", 32);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:eye");
  }
}
function AuthSignUpComponent_mat_icon_32_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-icon", 32);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:eye-off");
  }
}
function AuthSignUpComponent_span_46_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Create your free account ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function AuthSignUpComponent_mat_progress_spinner_47_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-progress-spinner", 33);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("diameter", 24)("mode", "indeterminate");
  }
}
const _c1 = function () {
  return ["/sign-in"];
};
const _c2 = function () {
  return ["./"];
};
class AuthSignUpComponent {
  formControlValueChanged(event) {
    console.log('form control value', event);
    // if(event?.name) {
    //   this.document$ = of({name: event?.name, attachment: event.attachment})
    //   this.ref.markForCheck()
    // }
  }

  fileChanged(event) {
    console.log(event);
  }
  documentSubmit(wind) {
    console.log('document called', wind);
  }
  delete(file) {
    console.log(file);
  }
  /**
   * Constructor
   */
  constructor(_authService, _formBuilder, _router, _activatedRoute) {
    this._authService = _authService;
    this._formBuilder = _formBuilder;
    this._router = _router;
    this._activatedRoute = _activatedRoute;
    this.alert = {
      type: 'success',
      message: ''
    };
    this.showAlert = false;
    this.document$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.of)({
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
    this.signerInitials = '';
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit() {
    // Create the form
    this.signUpForm = this._formBuilder.group({
      name: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required],
      email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.email]],
      password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required],
      company: [''],
      agreements: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.requiredTrue]
    });
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Sign up
   */
  signUp() {
    // Do nothing if the form is invalid
    if (this.signUpForm.invalid) {
      return;
    }
    console.log('signUP', this.signUpForm.value);
    // Disable the form
    this.signUpForm.disable();
    // Hide the alert
    this.showAlert = false;
    const {
      name,
      email,
      password
    } = this.signUpForm.value;
    // Sign up
    this._authService.signUp({
      username: name,
      email,
      password
    }).then(response => {
      // Navigate to the confirmation required page
      console.log(response);
      const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';
      this._router.navigateByUrl(redirectURL);
      // localStorage.setItem('accessToken', response.data.register.token)
      // this._router.navigateByUrl('/sign-up-setting')
      // this._router.navigateByUrl('/signed-in-redirect')
    }, response => {
      // Re-enable the form
      this.signUpForm.enable();
      // Reset the form
      this.signUpNgForm.resetForm();
      // Set the alert
      this.alert = {
        type: 'error',
        message: 'Something went wrong, please try again.'
      };
      // Show the alert
      this.showAlert = true;
    });
  }
}
AuthSignUpComponent.ɵfac = function AuthSignUpComponent_Factory(t) {
  return new (t || AuthSignUpComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_core_auth__WEBPACK_IMPORTED_MODULE_3__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.ActivatedRoute));
};
AuthSignUpComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: AuthSignUpComponent,
  selectors: [["auth-sign-up"]],
  viewQuery: function AuthSignUpComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.signUpNgForm = _t.first);
    }
  },
  decls: 58,
  vars: 22,
  consts: [[1, "flex", "flex-col", "sm:flex-row", "items-center", "md:items-start", "sm:justify-center", "md:justify-start", "flex-auto", "min-w-0"], [1, "md:flex", "md:items-center", "md:justify-end", "w-full", "sm:w-auto", "md:h-full", "md:w-1/2", "py-8", "px-4", "sm:p-12", "md:p-16", "sm:rounded-2xl", "md:rounded-none", "sm:shadow", "md:shadow-none", "sm:bg-card"], [1, "w-full", "max-w-80", "sm:w-80", "mx-auto", "sm:mx-0"], [1, "w-full", "px-2"], ["src", "assets/images/logo/auth_logo.png"], [1, "mt-8", "text-4xl", "font-extrabold", "tracking-tight", "leading-tight"], [1, "flex", "items-baseline", "mt-0.5", "font-medium"], [1, "ml-1", "text-primary-500", "hover:underline", 3, "routerLink"], ["class", "mt-8 -mb-4", 3, "appearance", "showIcon", "type", 4, "ngIf"], [1, "mt-8", 3, "formGroup"], [1, "w-full"], ["id", "name", "matInput", "", 3, "formControlName"], [4, "ngIf"], ["id", "email", "matInput", "", 3, "formControlName"], ["id", "password", "matInput", "", "type", "password", 3, "formControlName"], ["passwordField", ""], ["mat-icon-button", "", "type", "button", "matSuffix", "", 3, "click"], ["class", "icon-size-5", 3, "svgIcon", 4, "ngIf"], [1, "inline-flex", "items-end", "w-full", "mt-1.5"], [3, "color", "formControlName"], ["mat-flat-button", "", 1, "fuse-mat-button-large", "w-full", "mt-6", 3, "color", "disabled", "click"], [3, "diameter", "mode", 4, "ngIf"], [1, "relative", "hidden", "md:flex", "flex-auto", "items-center", "justify-center", "w-1/2", "h-full", "p-16", "lg:px-28", "overflow-hidden", "bg-gray-800", "dark:border-l"], ["viewBox", "0 0 960 540", "width", "100%", "height", "100%", "preserveAspectRatio", "xMidYMax slice", "xmlns", "http://www.w3.org/2000/svg", 1, "absolute", "inset-0", "pointer-events-none"], ["fill", "none", "stroke", "currentColor", "stroke-width", "100", 1, "text-gray-700", "opacity-25"], ["r", "234", "cx", "196", "cy", "23"], ["r", "234", "cx", "790", "cy", "491"], ["viewBox", "0 0 220 192", "width", "220", "height", "192", "fill", "none", 1, "absolute", "-top-16", "-right-16", "text-gray-700"], ["id", "837c3e70-6c3a-44e6-8854-cc48c737b659", "x", "0", "y", "0", "width", "20", "height", "20", "patternUnits", "userSpaceOnUse"], ["x", "0", "y", "0", "width", "4", "height", "4", "fill", "currentColor"], ["width", "220", "height", "192", "fill", "url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"], [1, "mt-8", "-mb-4", 3, "appearance", "showIcon", "type"], [1, "icon-size-5", 3, "svgIcon"], [3, "diameter", "mode"]],
  template: function AuthSignUpComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "img", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Sign up");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 6)(8, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Already have an account?");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "a", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Sign in ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, AuthSignUpComponent_fuse_alert_12_Template, 2, 5, "fuse-alert", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "form", 9)(14, "mat-form-field", 10)(15, "mat-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "Full name");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "input", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](18, AuthSignUpComponent_mat_error_18_Template, 2, 0, "mat-error", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "mat-form-field", 10)(20, "mat-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "Email address");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](22, "input", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](23, AuthSignUpComponent_mat_error_23_Template, 2, 0, "mat-error", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](24, AuthSignUpComponent_mat_error_24_Template, 2, 0, "mat-error", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "mat-form-field", 10)(26, "mat-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "Password");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](28, "input", 14, 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "button", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AuthSignUpComponent_Template_button_click_30_listener() {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9);
        const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](29);
        return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](_r4.type === "password" ? _r4.type = "text" : _r4.type = "password");
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](31, AuthSignUpComponent_mat_icon_31_Template, 1, 1, "mat-icon", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](32, AuthSignUpComponent_mat_icon_32_Template, 1, 1, "mat-icon", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "mat-error");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](34, " Password is required ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "div", 18)(36, "mat-checkbox", 19)(37, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, "I agree to the");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "a", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40, "Terms of Service ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](42, "and");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "a", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](44, "Privacy Policy ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "button", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AuthSignUpComponent_Template_button_click_45_listener() {
        return ctx.signUp();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](46, AuthSignUpComponent_span_46_Template, 2, 0, "span", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](47, AuthSignUpComponent_mat_progress_spinner_47_Template, 1, 2, "mat-progress-spinner", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "div", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "svg", 23)(50, "g", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](51, "circle", 25)(52, "circle", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "svg", 27)(54, "defs")(55, "pattern", 28);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](56, "rect", 29);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](57, "rect", 30);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](29);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](19, _c1));
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.showAlert);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx.signUpForm);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControlName", "name");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.signUpForm.get("name").hasError("required"));
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControlName", "email");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.signUpForm.get("email").hasError("required"));
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.signUpForm.get("email").hasError("email"));
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControlName", "password");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _r4.type === "password");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _r4.type === "text");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", "primary")("formControlName", "agreements");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](20, _c2));
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](21, _c2));
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", "primary")("disabled", ctx.signUpForm.disabled);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.signUpForm.disabled);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.signUpForm.disabled);
    }
  },
  dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLink, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatIconButton, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_6__.MatCheckbox, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__.MatError, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__.MatSuffix, _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__.MatIcon, _angular_material_input__WEBPACK_IMPORTED_MODULE_9__.MatInput, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_10__.MatProgressSpinner, _fuse_components_alert_alert_component__WEBPACK_IMPORTED_MODULE_11__.FuseAlertComponent, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControlName],
  encapsulation: 2,
  data: {
    animation: _fuse_animations__WEBPACK_IMPORTED_MODULE_13__.fuseAnimations
  }
});

/***/ }),

/***/ 438543:
/*!*****************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/sign-up/sign-up.module.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthSignUpModule": () => (/* binding */ AuthSignUpModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/checkbox */ 556709);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/form-field */ 759549);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/input */ 300284);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/progress-spinner */ 151572);
/* harmony import */ var _fuse_components_card__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @fuse/components/card */ 673141);
/* harmony import */ var _fuse_components_alert__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @fuse/components/alert */ 718413);
/* harmony import */ var libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! libs/shared/shared.module */ 423387);
/* harmony import */ var _sign_up_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./sign-up.component */ 115768);
/* harmony import */ var _sign_up_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sign-up.routing */ 14708);
/* harmony import */ var _txtextcontrol_tx_ng_document_viewer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @txtextcontrol/tx-ng-document-viewer */ 770383);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);















class AuthSignUpModule {}
AuthSignUpModule.ɵfac = function AuthSignUpModule_Factory(t) {
  return new (t || AuthSignUpModule)();
};
AuthSignUpModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: AuthSignUpModule
});
AuthSignUpModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule.forChild(_sign_up_routing__WEBPACK_IMPORTED_MODULE_2__.authSignupRoutes), _txtextcontrol_tx_ng_document_viewer__WEBPACK_IMPORTED_MODULE_3__.DocumentViewerModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_4__.MatButtonModule, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_5__.MatCheckboxModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatFormFieldModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__.MatIconModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_8__.MatInputModule, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_9__.MatProgressSpinnerModule, _fuse_components_card__WEBPACK_IMPORTED_MODULE_10__.FuseCardModule, _fuse_components_alert__WEBPACK_IMPORTED_MODULE_11__.FuseAlertModule, libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_12__.SharedModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AuthSignUpModule, {
    declarations: [_sign_up_component__WEBPACK_IMPORTED_MODULE_13__.AuthSignUpComponent],
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule, _txtextcontrol_tx_ng_document_viewer__WEBPACK_IMPORTED_MODULE_3__.DocumentViewerModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_4__.MatButtonModule, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_5__.MatCheckboxModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatFormFieldModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__.MatIconModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_8__.MatInputModule, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_9__.MatProgressSpinnerModule, _fuse_components_card__WEBPACK_IMPORTED_MODULE_10__.FuseCardModule, _fuse_components_alert__WEBPACK_IMPORTED_MODULE_11__.FuseAlertModule, libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_12__.SharedModule]
  });
})();

/***/ }),

/***/ 14708:
/*!******************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/sign-up/sign-up.routing.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "authSignupRoutes": () => (/* binding */ authSignupRoutes)
/* harmony export */ });
/* harmony import */ var _sign_up_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sign-up.component */ 115768);

const authSignupRoutes = [{
  path: '',
  component: _sign_up_component__WEBPACK_IMPORTED_MODULE_0__.AuthSignUpComponent
}];

/***/ })

}]);