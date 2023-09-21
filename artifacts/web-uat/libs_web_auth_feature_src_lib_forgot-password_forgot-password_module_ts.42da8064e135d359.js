"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["libs_web_auth_feature_src_lib_forgot-password_forgot-password_module_ts"],{

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

/***/ 845779:
/*!************************************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/forgot-password/forgot-password.component.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthForgotPasswordComponent": () => (/* binding */ AuthForgotPasswordComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 224006);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 928746);
/* harmony import */ var _fuse_animations__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @fuse/animations */ 662235);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_core_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @case-clinical/core/auth */ 735483);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/form-field */ 759549);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/input */ 300284);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/progress-spinner */ 151572);
/* harmony import */ var _fuse_components_alert_alert_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @fuse/components/alert/alert.component */ 967884);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 836895);














const _c0 = ["forgotPasswordNgForm"];
function AuthForgotPasswordComponent_fuse_alert_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "fuse-alert", 36);
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
function AuthForgotPasswordComponent_mat_error_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Email address is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function AuthForgotPasswordComponent_mat_error_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Please enter a valid email address ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function AuthForgotPasswordComponent_span_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Send reset link ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function AuthForgotPasswordComponent_mat_progress_spinner_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-progress-spinner", 37);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("diameter", 24)("mode", "indeterminate");
  }
}
const _c1 = function () {
  return ["/sign-in"];
};
class AuthForgotPasswordComponent {
  /**
   * Constructor
   */
  constructor(_authService, _formBuilder) {
    this._authService = _authService;
    this._formBuilder = _formBuilder;
    this.alert = {
      type: 'success',
      message: ''
    };
    this.showAlert = false;
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit() {
    // Create the form
    this.forgotPasswordForm = this._formBuilder.group({
      email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.Validators.email]]
    });
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Send the reset link
   */
  sendResetLink() {
    // Return if the form is invalid
    if (this.forgotPasswordForm.invalid) {
      return;
    }
    // Disable the form
    this.forgotPasswordForm.disable();
    // Hide the alert
    this.showAlert = false;
    // Forgot password
    this._authService.forgotPassword(this.forgotPasswordForm.get('email').value).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.finalize)(() => {
      // Re-enable the form
      this.forgotPasswordForm.enable();
      // Reset the form
      this.forgotPasswordNgForm.resetForm();
      // Show the alert
      this.showAlert = true;
    })).subscribe(response => {
      // Set the alert
      this.alert = {
        type: 'success',
        message: "Password reset sent! You'll receive an email if you are registered on our system."
      };
    }, response => {
      // Set the alert
      this.alert = {
        type: 'error',
        message: 'Email does not found! Are you sure you are already a member?'
      };
    });
  }
}
AuthForgotPasswordComponent.ɵfac = function AuthForgotPasswordComponent_Factory(t) {
  return new (t || AuthForgotPasswordComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_core_auth__WEBPACK_IMPORTED_MODULE_3__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormBuilder));
};
AuthForgotPasswordComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: AuthForgotPasswordComponent,
  selectors: [["auth-forgot-password"]],
  viewQuery: function AuthForgotPasswordComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.forgotPasswordNgForm = _t.first);
    }
  },
  decls: 52,
  vars: 11,
  consts: [[1, "flex", "flex-col", "sm:flex-row", "items-center", "md:items-start", "sm:justify-center", "md:justify-start", "flex-auto", "min-w-0"], [1, "md:flex", "md:items-center", "md:justify-end", "w-full", "sm:w-auto", "md:h-full", "md:w-1/2", "py-8", "px-4", "sm:p-12", "md:p-16", "sm:rounded-2xl", "md:rounded-none", "sm:shadow", "md:shadow-none", "sm:bg-card"], [1, "w-full", "max-w-80", "sm:w-80", "mx-auto", "sm:mx-0"], [1, "w-12"], ["src", "assets/images/logo/logo.png"], [1, "mt-8", "text-4xl", "font-extrabold", "tracking-tight", "leading-tight"], [1, "mt-0.5", "font-medium"], ["class", "mt-8 -mb-4", 3, "appearance", "showIcon", "type", 4, "ngIf"], [1, "mt-8", 3, "formGroup"], ["forgotPasswordNgForm", "ngForm"], [1, "w-full"], ["id", "email", "matInput", "", 3, "formControlName"], [4, "ngIf"], ["mat-flat-button", "", 1, "fuse-mat-button-large", "w-full", "mt-3", 3, "color", "disabled", "click"], [3, "diameter", "mode", 4, "ngIf"], [1, "mt-8", "text-md", "font-medium", "text-secondary"], [1, "ml-1", "text-primary-500", "hover:underline", 3, "routerLink"], [1, "relative", "hidden", "md:flex", "flex-auto", "items-center", "justify-center", "w-1/2", "h-full", "p-16", "lg:px-28", "overflow-hidden", "bg-gray-800", "dark:border-l"], ["viewBox", "0 0 960 540", "width", "100%", "height", "100%", "preserveAspectRatio", "xMidYMax slice", "xmlns", "http://www.w3.org/2000/svg", 1, "absolute", "inset-0", "pointer-events-none"], ["fill", "none", "stroke", "currentColor", "stroke-width", "100", 1, "text-gray-700", "opacity-25"], ["r", "234", "cx", "196", "cy", "23"], ["r", "234", "cx", "790", "cy", "491"], ["viewBox", "0 0 220 192", "width", "220", "height", "192", "fill", "none", 1, "absolute", "-top-16", "-right-16", "text-gray-700"], ["id", "837c3e70-6c3a-44e6-8854-cc48c737b659", "x", "0", "y", "0", "width", "20", "height", "20", "patternUnits", "userSpaceOnUse"], ["x", "0", "y", "0", "width", "4", "height", "4", "fill", "currentColor"], ["width", "220", "height", "192", "fill", "url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"], [1, "z-10", "relative", "w-full", "max-w-2xl"], [1, "text-7xl", "font-bold", "leading-none", "text-gray-100"], [1, "mt-6", "text-lg", "tracking-tight", "leading-6", "text-gray-400"], [1, "flex", "items-center", "mt-8"], [1, "flex", "flex-0", "items-center", "-space-x-1.5"], ["src", "assets/images/avatars/female-18.jpg", 1, "flex-0", "w-10", "h-10", "rounded-full", "ring-4", "ring-offset-1", "ring-gray-800", "ring-offset-gray-800", "object-cover"], ["src", "assets/images/avatars/female-11.jpg", 1, "flex-0", "w-10", "h-10", "rounded-full", "ring-4", "ring-offset-1", "ring-gray-800", "ring-offset-gray-800", "object-cover"], ["src", "assets/images/avatars/male-09.jpg", 1, "flex-0", "w-10", "h-10", "rounded-full", "ring-4", "ring-offset-1", "ring-gray-800", "ring-offset-gray-800", "object-cover"], ["src", "assets/images/avatars/male-16.jpg", 1, "flex-0", "w-10", "h-10", "rounded-full", "ring-4", "ring-offset-1", "ring-gray-800", "ring-offset-gray-800", "object-cover"], [1, "ml-4", "font-medium", "tracking-tight", "text-gray-400"], [1, "mt-8", "-mb-4", 3, "appearance", "showIcon", "type"], [3, "diameter", "mode"]],
  template: function AuthForgotPasswordComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "img", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Forgot password?");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Fill the form to reset your password");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, AuthForgotPasswordComponent_fuse_alert_9_Template, 2, 5, "fuse-alert", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "form", 8, 9)(12, "mat-form-field", 10)(13, "mat-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Email address");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "input", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](16, AuthForgotPasswordComponent_mat_error_16_Template, 2, 0, "mat-error", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](17, AuthForgotPasswordComponent_mat_error_17_Template, 2, 0, "mat-error", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "button", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AuthForgotPasswordComponent_Template_button_click_18_listener() {
        return ctx.sendResetLink();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](19, AuthForgotPasswordComponent_span_19_Template, 2, 0, "span", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](20, AuthForgotPasswordComponent_mat_progress_spinner_20_Template, 1, 2, "mat-progress-spinner", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 15)(22, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "Return to");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "a", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, "sign in ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "svg", 18)(28, "g", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](29, "circle", 20)(30, "circle", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "svg", 22)(32, "defs")(33, "pattern", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](34, "rect", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](35, "rect", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "div", 26)(37, "div", 27)(38, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](39, "Welcome to");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](41, "our community");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "div", 28);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](43, " Fuse helps developers to build organized and well coded dashboards full of beautiful and rich modules. Join us and start building your application today. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "div", 29)(45, "div", 30);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](46, "img", 31)(47, "img", 32)(48, "img", 33)(49, "img", 34);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "div", 35);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](51, " More than 17k people joined us, it's your turn ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.showAlert);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx.forgotPasswordForm);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControlName", "email");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.forgotPasswordForm.get("email").hasError("required"));
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.forgotPasswordForm.get("email").hasError("email"));
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", "primary")("disabled", ctx.forgotPasswordForm.disabled);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.forgotPasswordForm.disabled);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.forgotPasswordForm.disabled);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](10, _c1));
    }
  },
  dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLink, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButton, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatError, _angular_material_input__WEBPACK_IMPORTED_MODULE_7__.MatInput, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_8__.MatProgressSpinner, _fuse_components_alert_alert_component__WEBPACK_IMPORTED_MODULE_9__.FuseAlertComponent, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormControlName],
  encapsulation: 2,
  data: {
    animation: _fuse_animations__WEBPACK_IMPORTED_MODULE_11__.fuseAnimations
  }
});

/***/ }),

/***/ 312194:
/*!*********************************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/forgot-password/forgot-password.module.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthForgotPasswordModule": () => (/* binding */ AuthForgotPasswordModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/form-field */ 759549);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/input */ 300284);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/progress-spinner */ 151572);
/* harmony import */ var _fuse_components_card__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @fuse/components/card */ 673141);
/* harmony import */ var _fuse_components_alert__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @fuse/components/alert */ 718413);
/* harmony import */ var libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! libs/shared/shared.module */ 423387);
/* harmony import */ var _forgot_password_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./forgot-password.component */ 845779);
/* harmony import */ var _forgot_password_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./forgot-password.routing */ 629655);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);













class AuthForgotPasswordModule {}
AuthForgotPasswordModule.ɵfac = function AuthForgotPasswordModule_Factory(t) {
  return new (t || AuthForgotPasswordModule)();
};
AuthForgotPasswordModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: AuthForgotPasswordModule
});
AuthForgotPasswordModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule.forChild(_forgot_password_routing__WEBPACK_IMPORTED_MODULE_2__.authForgotPasswordRoutes), _angular_material_button__WEBPACK_IMPORTED_MODULE_3__.MatButtonModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__.MatFormFieldModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIconModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_6__.MatInputModule, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_7__.MatProgressSpinnerModule, _fuse_components_card__WEBPACK_IMPORTED_MODULE_8__.FuseCardModule, _fuse_components_alert__WEBPACK_IMPORTED_MODULE_9__.FuseAlertModule, libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_10__.SharedModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AuthForgotPasswordModule, {
    declarations: [_forgot_password_component__WEBPACK_IMPORTED_MODULE_11__.AuthForgotPasswordComponent],
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_3__.MatButtonModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__.MatFormFieldModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIconModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_6__.MatInputModule, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_7__.MatProgressSpinnerModule, _fuse_components_card__WEBPACK_IMPORTED_MODULE_8__.FuseCardModule, _fuse_components_alert__WEBPACK_IMPORTED_MODULE_9__.FuseAlertModule, libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_10__.SharedModule]
  });
})();

/***/ }),

/***/ 629655:
/*!**********************************************************************************!*\
  !*** ./libs/web/auth/feature/src/lib/forgot-password/forgot-password.routing.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "authForgotPasswordRoutes": () => (/* binding */ authForgotPasswordRoutes)
/* harmony export */ });
/* harmony import */ var _forgot_password_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./forgot-password.component */ 845779);

const authForgotPasswordRoutes = [{
  path: '',
  component: _forgot_password_component__WEBPACK_IMPORTED_MODULE_0__.AuthForgotPasswordComponent
}];

/***/ })

}]);