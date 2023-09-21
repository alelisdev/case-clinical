"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_fuse_components_alert_alert_module_ts"],{

/***/ 967884:
/*!************************************************************!*\
  !*** ./libs/web/@fuse/components/alert/alert.component.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FuseAlertComponent": () => (/* binding */ FuseAlertComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 439300);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 782722);
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/coercion */ 121281);
/* harmony import */ var _fuse_animations__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @fuse/animations */ 662235);
/* harmony import */ var _fuse_components_alert_alert_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fuse/components/alert/alert.service */ 361285);
/* harmony import */ var _fuse_services_utils_utils_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fuse/services/utils/utils.service */ 89944);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/icon */ 397392);












function FuseAlertComponent_div_0_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 9);
  }
}
function FuseAlertComponent_div_0_div_2_mat_icon_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-icon", 8);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:check-circle");
  }
}
function FuseAlertComponent_div_0_div_2_mat_icon_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-icon", 8);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:check-circle");
  }
}
function FuseAlertComponent_div_0_div_2_mat_icon_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-icon", 8);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:x-circle");
  }
}
function FuseAlertComponent_div_0_div_2_mat_icon_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-icon", 8);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:check-circle");
  }
}
function FuseAlertComponent_div_0_div_2_mat_icon_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-icon", 8);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:information-circle");
  }
}
function FuseAlertComponent_div_0_div_2_mat_icon_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-icon", 8);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:check-circle");
  }
}
function FuseAlertComponent_div_0_div_2_mat_icon_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-icon", 8);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:exclamation");
  }
}
function FuseAlertComponent_div_0_div_2_mat_icon_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-icon", 8);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:x-circle");
  }
}
function FuseAlertComponent_div_0_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 10)(1, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](2, 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, FuseAlertComponent_div_0_div_2_mat_icon_4_Template, 1, 1, "mat-icon", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, FuseAlertComponent_div_0_div_2_mat_icon_5_Template, 1, 1, "mat-icon", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, FuseAlertComponent_div_0_div_2_mat_icon_6_Template, 1, 1, "mat-icon", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, FuseAlertComponent_div_0_div_2_mat_icon_7_Template, 1, 1, "mat-icon", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, FuseAlertComponent_div_0_div_2_mat_icon_8_Template, 1, 1, "mat-icon", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, FuseAlertComponent_div_0_div_2_mat_icon_9_Template, 1, 1, "mat-icon", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, FuseAlertComponent_div_0_div_2_mat_icon_10_Template, 1, 1, "mat-icon", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, FuseAlertComponent_div_0_div_2_mat_icon_11_Template, 1, 1, "mat-icon", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r2.type === "primary");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r2.type === "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r2.type === "warn");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r2.type === "basic");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r2.type === "info");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r2.type === "success");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r2.type === "warning");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r2.type === "error");
  }
}
function FuseAlertComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, FuseAlertComponent_div_0_div_1_Template, 1, 0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, FuseAlertComponent_div_0_div_2_Template, 12, 8, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 4)(4, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](7, 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "button", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function FuseAlertComponent_div_0_Template_button_click_8_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r12);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r11.dismiss());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "mat-icon", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("@fadeIn", !ctx_r0.dismissed)("@fadeOut", !ctx_r0.dismissed);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.appearance === "border");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.showIcon);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:x");
  }
}
const _c0 = [[["", "fuseAlertTitle", ""]], "*", [["", "fuseAlertIcon", ""]]];
const _c1 = ["[fuseAlertTitle]", "*", "[fuseAlertIcon]"];
class FuseAlertComponent {
  /**
   * Constructor
   */
  constructor(_changeDetectorRef, _fuseAlertService, _fuseUtilsService) {
    this._changeDetectorRef = _changeDetectorRef;
    this._fuseAlertService = _fuseAlertService;
    this._fuseUtilsService = _fuseUtilsService;
    /* eslint-enable @typescript-eslint/naming-convention */
    this.appearance = 'soft';
    this.dismissed = false;
    this.dismissible = false;
    this.name = this._fuseUtilsService.randomId();
    this.showIcon = true;
    this.type = 'primary';
    this.dismissedChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this._unsubscribeAll = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------
  /**
   * Host binding for component classes
   */
  get classList() {
    return {
      'fuse-alert-appearance-border': this.appearance === 'border',
      'fuse-alert-appearance-fill': this.appearance === 'fill',
      'fuse-alert-appearance-outline': this.appearance === 'outline',
      'fuse-alert-appearance-soft': this.appearance === 'soft',
      'fuse-alert-dismissed': this.dismissed,
      'fuse-alert-dismissible': this.dismissible,
      'fuse-alert-show-icon': this.showIcon,
      'fuse-alert-type-primary': this.type === 'primary',
      'fuse-alert-type-accent': this.type === 'accent',
      'fuse-alert-type-warn': this.type === 'warn',
      'fuse-alert-type-basic': this.type === 'basic',
      'fuse-alert-type-info': this.type === 'info',
      'fuse-alert-type-success': this.type === 'success',
      'fuse-alert-type-warning': this.type === 'warning',
      'fuse-alert-type-error': this.type === 'error'
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
    // Dismissed
    if ('dismissed' in changes) {
      // Coerce the value to a boolean
      this.dismissed = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceBooleanProperty)(changes.dismissed.currentValue);
      // Dismiss/show the alert
      this._toggleDismiss(this.dismissed);
    }
    // Dismissible
    if ('dismissible' in changes) {
      // Coerce the value to a boolean
      this.dismissible = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceBooleanProperty)(changes.dismissible.currentValue);
    }
    // Show icon
    if ('showIcon' in changes) {
      // Coerce the value to a boolean
      this.showIcon = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceBooleanProperty)(changes.showIcon.currentValue);
    }
  }
  /**
   * On init
   */
  ngOnInit() {
    // Subscribe to the dismiss calls
    this._fuseAlertService.onDismiss.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.filter)(name => this.name === name), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.takeUntil)(this._unsubscribeAll)).subscribe(() => {
      // Dismiss the alert
      this.dismiss();
    });
    // Subscribe to the show calls
    this._fuseAlertService.onShow.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.filter)(name => this.name === name), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.takeUntil)(this._unsubscribeAll)).subscribe(() => {
      // Show the alert
      this.show();
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
   * Dismiss the alert
   */
  dismiss() {
    // Return if the alert is already dismissed
    if (this.dismissed) {
      return;
    }
    // Dismiss the alert
    this._toggleDismiss(true);
  }
  /**
   * Show the dismissed alert
   */
  show() {
    // Return if the alert is already showing
    if (!this.dismissed) {
      return;
    }
    // Show the alert
    this._toggleDismiss(false);
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Dismiss/show the alert
   *
   * @param dismissed
   * @private
   */
  _toggleDismiss(dismissed) {
    // Return if the alert is not dismissible
    if (!this.dismissible) {
      return;
    }
    // Set the dismissed
    this.dismissed = dismissed;
    // Execute the observable
    this.dismissedChanged.next(this.dismissed);
    // Notify the change detector
    this._changeDetectorRef.markForCheck();
  }
}
FuseAlertComponent.ɵfac = function FuseAlertComponent_Factory(t) {
  return new (t || FuseAlertComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_fuse_components_alert_alert_service__WEBPACK_IMPORTED_MODULE_5__.FuseAlertService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_fuse_services_utils_utils_service__WEBPACK_IMPORTED_MODULE_6__.FuseUtilsService));
};
FuseAlertComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: FuseAlertComponent,
  selectors: [["fuse-alert"]],
  hostVars: 2,
  hostBindings: function FuseAlertComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMap"](ctx.classList);
    }
  },
  inputs: {
    appearance: "appearance",
    dismissed: "dismissed",
    dismissible: "dismissible",
    name: "name",
    showIcon: "showIcon",
    type: "type"
  },
  outputs: {
    dismissedChanged: "dismissedChanged"
  },
  exportAs: ["fuseAlert"],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]],
  ngContentSelectors: _c1,
  decls: 1,
  vars: 1,
  consts: [["class", "fuse-alert-container", 4, "ngIf"], [1, "fuse-alert-container"], ["class", "fuse-alert-border", 4, "ngIf"], ["class", "fuse-alert-icon", 4, "ngIf"], [1, "fuse-alert-content"], [1, "fuse-alert-title"], [1, "fuse-alert-message"], ["mat-icon-button", "", 1, "fuse-alert-dismiss-button", 3, "click"], [3, "svgIcon"], [1, "fuse-alert-border"], [1, "fuse-alert-icon"], [1, "fuse-alert-custom-icon"], [1, "fuse-alert-default-icon"], [3, "svgIcon", 4, "ngIf"]],
  template: function FuseAlertComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"](_c0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, FuseAlertComponent_div_0_Template, 10, 5, "div", 0);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.dismissible || ctx.dismissible && !ctx.dismissed);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_material_button__WEBPACK_IMPORTED_MODULE_8__.MatIconButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__.MatIcon],
  styles: ["fuse-alert {\n  display: block;\n  /* Common */\n  /* Dismissible */\n  /* Border */\n  /* Fill */\n  /* Outline */\n  /* Soft */\n}\nfuse-alert .fuse-alert-container {\n  position: relative;\n  display: flex;\n  padding: 16px;\n  font-size: 14px;\n  line-height: 1;\n  /* All icons */\n  /* Icon */\n  /* Content */\n  /* Dismiss button */\n}\nfuse-alert .fuse-alert-container .mat-icon {\n  color: currentColor !important;\n}\nfuse-alert .fuse-alert-container .fuse-alert-icon {\n  display: flex;\n  align-items: flex-start;\n}\nfuse-alert .fuse-alert-container .fuse-alert-icon .fuse-alert-custom-icon,\nfuse-alert .fuse-alert-container .fuse-alert-icon .fuse-alert-default-icon {\n  display: none;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n}\nfuse-alert .fuse-alert-container .fuse-alert-icon .fuse-alert-custom-icon:not(:empty),\nfuse-alert .fuse-alert-container .fuse-alert-icon .fuse-alert-default-icon:not(:empty) {\n  display: flex;\n  margin-right: 12px;\n}\nfuse-alert .fuse-alert-container .fuse-alert-icon .fuse-alert-default-icon .mat-icon {\n  width: 1.25rem;\n  height: 1.25rem;\n  min-width: 1.25rem;\n  min-height: 1.25rem;\n  font-size: 1.25rem;\n  line-height: 1.25rem;\n}\nfuse-alert .fuse-alert-container .fuse-alert-icon .fuse-alert-default-icon .mat-icon svg {\n  width: 1.25rem;\n  height: 1.25rem;\n}\nfuse-alert .fuse-alert-container .fuse-alert-icon .fuse-alert-custom-icon {\n  display: none;\n}\nfuse-alert .fuse-alert-container .fuse-alert-icon .fuse-alert-custom-icon:not(:empty) {\n  display: flex;\n}\nfuse-alert .fuse-alert-container .fuse-alert-icon .fuse-alert-custom-icon:not(:empty) + .fuse-alert-default-icon {\n  display: none;\n}\nfuse-alert .fuse-alert-container .fuse-alert-content {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  line-height: 1;\n  /* Title */\n  /* Alert */\n}\nfuse-alert .fuse-alert-container .fuse-alert-content .fuse-alert-title {\n  display: none;\n  font-weight: 600;\n  line-height: 20px;\n}\nfuse-alert .fuse-alert-container .fuse-alert-content .fuse-alert-title:not(:empty) {\n  display: block;\n  /* Alert that comes after the title */\n}\nfuse-alert .fuse-alert-container .fuse-alert-content .fuse-alert-title:not(:empty) + .fuse-alert-message:not(:empty) {\n  margin-top: 4px;\n}\nfuse-alert .fuse-alert-container .fuse-alert-content .fuse-alert-message {\n  display: none;\n  line-height: 20px;\n}\nfuse-alert .fuse-alert-container .fuse-alert-content .fuse-alert-message:not(:empty) {\n  display: block;\n}\nfuse-alert .fuse-alert-container .fuse-alert-dismiss-button {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  width: 32px !important;\n  min-width: 32px !important;\n  height: 32px !important;\n  min-height: 32px !important;\n  line-height: 32px !important;\n}\nfuse-alert .fuse-alert-container .fuse-alert-dismiss-button .mat-icon {\n  width: 1rem;\n  height: 1rem;\n  min-width: 1rem;\n  min-height: 1rem;\n  font-size: 1rem;\n  line-height: 1rem;\n}\nfuse-alert .fuse-alert-container .fuse-alert-dismiss-button .mat-icon svg {\n  width: 1rem;\n  height: 1rem;\n}\nfuse-alert.fuse-alert-dismissible .fuse-alert-container .fuse-alert-content {\n  margin-right: 32px;\n}\nfuse-alert:not(.fuse-alert-dismissible) .fuse-alert-container .fuse-alert-dismiss-button {\n  display: none !important;\n}\nfuse-alert.fuse-alert-appearance-border {\n  /* Primary */\n  /* Accent */\n  /* Warn */\n  /* Basic */\n  /* Info */\n  /* Success */\n  /* Warning */\n  /* Error */\n}\nfuse-alert.fuse-alert-appearance-border .fuse-alert-container {\n  position: relative;\n  overflow: hidden;\n  border-radius: 6px;\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-bg-card-rgb), var(--tw-bg-opacity));\n  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\nfuse-alert.fuse-alert-appearance-border .fuse-alert-container .fuse-alert-border {\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  width: 4px;\n}\nfuse-alert.fuse-alert-appearance-border .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(71 85 105 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-border.fuse-alert-type-primary .fuse-alert-container .fuse-alert-border {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-primary-rgb), var(--tw-bg-opacity));\n}\nfuse-alert.fuse-alert-appearance-border.fuse-alert-type-primary .fuse-alert-container .fuse-alert-title, fuse-alert.fuse-alert-appearance-border.fuse-alert-type-primary .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-primary-rgb), var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-primary .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(51 65 85 / var(--tw-bg-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-primary .fuse-alert-container .fuse-alert-border {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-primary-400-rgb), var(--tw-bg-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-primary .fuse-alert-container .fuse-alert-title, .dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-primary .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-primary-400-rgb), var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-primary .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(203 213 225 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-primary .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgb(148 163 184 / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: rgb(30 41 59 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-border.fuse-alert-type-accent .fuse-alert-container .fuse-alert-border {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-accent-rgb), var(--tw-bg-opacity));\n}\nfuse-alert.fuse-alert-appearance-border.fuse-alert-type-accent .fuse-alert-container .fuse-alert-title, fuse-alert.fuse-alert-appearance-border.fuse-alert-type-accent .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-accent-rgb), var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-accent .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(51 65 85 / var(--tw-bg-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-accent .fuse-alert-container .fuse-alert-border {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-accent-400-rgb), var(--tw-bg-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-accent .fuse-alert-container .fuse-alert-title, .dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-accent .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-accent-400-rgb), var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-accent .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(203 213 225 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-accent .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgb(148 163 184 / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: rgb(30 41 59 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-border.fuse-alert-type-warn .fuse-alert-container .fuse-alert-border {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-warn-rgb), var(--tw-bg-opacity));\n}\nfuse-alert.fuse-alert-appearance-border.fuse-alert-type-warn .fuse-alert-container .fuse-alert-title, fuse-alert.fuse-alert-appearance-border.fuse-alert-type-warn .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-warn-rgb), var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-warn .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(51 65 85 / var(--tw-bg-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-warn .fuse-alert-container .fuse-alert-border {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-warn-400-rgb), var(--tw-bg-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-warn .fuse-alert-container .fuse-alert-title, .dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-warn .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-warn-400-rgb), var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-warn .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(203 213 225 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-warn .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgb(148 163 184 / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: rgb(30 41 59 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-border.fuse-alert-type-basic .fuse-alert-container .fuse-alert-border {\n  --tw-bg-opacity: 1;\n  background-color: rgb(71 85 105 / var(--tw-bg-opacity));\n}\nfuse-alert.fuse-alert-appearance-border.fuse-alert-type-basic .fuse-alert-container .fuse-alert-title, fuse-alert.fuse-alert-appearance-border.fuse-alert-type-basic .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(71 85 105 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-basic .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(51 65 85 / var(--tw-bg-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-basic .fuse-alert-container .fuse-alert-border {\n  --tw-bg-opacity: 1;\n  background-color: rgb(148 163 184 / var(--tw-bg-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-basic .fuse-alert-container .fuse-alert-title, .dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-basic .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(148 163 184 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-basic .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(203 213 225 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-basic .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgb(148 163 184 / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: rgb(30 41 59 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-border.fuse-alert-type-info .fuse-alert-container .fuse-alert-border {\n  --tw-bg-opacity: 1;\n  background-color: rgb(37 99 235 / var(--tw-bg-opacity));\n}\nfuse-alert.fuse-alert-appearance-border.fuse-alert-type-info .fuse-alert-container .fuse-alert-title, fuse-alert.fuse-alert-appearance-border.fuse-alert-type-info .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(29 78 216 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-info .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(51 65 85 / var(--tw-bg-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-info .fuse-alert-container .fuse-alert-border {\n  --tw-bg-opacity: 1;\n  background-color: rgb(96 165 250 / var(--tw-bg-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-info .fuse-alert-container .fuse-alert-title, .dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-info .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(96 165 250 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-info .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(203 213 225 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-info .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgb(148 163 184 / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: rgb(30 41 59 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-border.fuse-alert-type-success .fuse-alert-container .fuse-alert-border {\n  --tw-bg-opacity: 1;\n  background-color: rgb(34 197 94 / var(--tw-bg-opacity));\n}\nfuse-alert.fuse-alert-appearance-border.fuse-alert-type-success .fuse-alert-container .fuse-alert-title, fuse-alert.fuse-alert-appearance-border.fuse-alert-type-success .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(34 197 94 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-success .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(51 65 85 / var(--tw-bg-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-success .fuse-alert-container .fuse-alert-border {\n  --tw-bg-opacity: 1;\n  background-color: rgb(74 222 128 / var(--tw-bg-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-success .fuse-alert-container .fuse-alert-title, .dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-success .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(74 222 128 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-success .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(203 213 225 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-success .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgb(148 163 184 / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: rgb(30 41 59 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-border.fuse-alert-type-warning .fuse-alert-container .fuse-alert-border {\n  --tw-bg-opacity: 1;\n  background-color: rgb(245 158 11 / var(--tw-bg-opacity));\n}\nfuse-alert.fuse-alert-appearance-border.fuse-alert-type-warning .fuse-alert-container .fuse-alert-title, fuse-alert.fuse-alert-appearance-border.fuse-alert-type-warning .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(245 158 11 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-warning .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(51 65 85 / var(--tw-bg-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-warning .fuse-alert-container .fuse-alert-border {\n  --tw-bg-opacity: 1;\n  background-color: rgb(251 191 36 / var(--tw-bg-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-warning .fuse-alert-container .fuse-alert-title, .dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-warning .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(251 191 36 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-warning .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(203 213 225 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-warning .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgb(148 163 184 / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: rgb(30 41 59 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-border.fuse-alert-type-error .fuse-alert-container .fuse-alert-border {\n  --tw-bg-opacity: 1;\n  background-color: rgb(220 38 38 / var(--tw-bg-opacity));\n}\nfuse-alert.fuse-alert-appearance-border.fuse-alert-type-error .fuse-alert-container .fuse-alert-title, fuse-alert.fuse-alert-appearance-border.fuse-alert-type-error .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(185 28 28 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-error .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(51 65 85 / var(--tw-bg-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-error .fuse-alert-container .fuse-alert-border {\n  --tw-bg-opacity: 1;\n  background-color: rgb(248 113 113 / var(--tw-bg-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-error .fuse-alert-container .fuse-alert-title, .dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-error .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(248 113 113 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-error .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(203 213 225 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-border.fuse-alert-type-error .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgb(148 163 184 / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: rgb(30 41 59 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-fill {\n  /* Primary */\n  /* Accent */\n  /* Warn */\n  /* Basic */\n  /* Info */\n  /* Success */\n  /* Warning */\n  /* Error */\n}\nfuse-alert.fuse-alert-appearance-fill .fuse-alert-container {\n  border-radius: 6px;\n}\nfuse-alert.fuse-alert-appearance-fill .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-primary .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-primary-600-rgb), var(--tw-bg-opacity));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-primary .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-primary .fuse-alert-container .fuse-alert-title {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-primary .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-primary-100-rgb), var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-primary .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-primary-200-rgb), var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-primary-800-rgb), var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-accent .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-accent-600-rgb), var(--tw-bg-opacity));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-accent .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-accent .fuse-alert-container .fuse-alert-title {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-accent .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-accent-100-rgb), var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-accent .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-accent-200-rgb), var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-accent-800-rgb), var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-warn .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-warn-600-rgb), var(--tw-bg-opacity));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-warn .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-warn .fuse-alert-container .fuse-alert-title {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-warn .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-warn-100-rgb), var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-warn .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-warn-200-rgb), var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-warn-800-rgb), var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-basic .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(71 85 105 / var(--tw-bg-opacity));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-basic .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-basic .fuse-alert-container .fuse-alert-title {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-basic .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(241 245 249 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-basic .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgb(226 232 240 / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: rgb(30 41 59 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-info .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(37 99 235 / var(--tw-bg-opacity));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-info .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-info .fuse-alert-container .fuse-alert-title {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-info .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(219 234 254 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-info .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgb(191 219 254 / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: rgb(30 64 175 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-success .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(22 163 74 / var(--tw-bg-opacity));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-success .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-success .fuse-alert-container .fuse-alert-title {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-success .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(220 252 231 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-success .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgb(187 247 208 / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: rgb(30 41 59 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-warning .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(245 158 11 / var(--tw-bg-opacity));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-warning .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-warning .fuse-alert-container .fuse-alert-title {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-warning .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(254 243 199 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-warning .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgb(253 230 138 / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: rgb(146 64 14 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-error .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(220 38 38 / var(--tw-bg-opacity));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-error .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-error .fuse-alert-container .fuse-alert-title {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-error .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(254 226 226 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-fill.fuse-alert-type-error .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgb(254 202 202 / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: rgb(153 27 27 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-outline {\n  /* Primary */\n  /* Accent */\n  /* Warn */\n  /* Basic */\n  /* Info */\n  /* Success */\n  /* Warning */\n  /* Error */\n}\nfuse-alert.fuse-alert-appearance-outline .fuse-alert-container {\n  border-radius: 6px;\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-primary .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-primary-50-rgb), var(--tw-bg-opacity));\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);\n  --tw-ring-inset: inset;\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgba(var(--fuse-primary-400-rgb), var(--tw-ring-opacity));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-primary .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-primary-600-rgb), var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-primary .fuse-alert-container .fuse-alert-title, fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-primary .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-primary-900-rgb), var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-primary .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-primary-700-rgb), var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-primary .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-primary-200-rgb), var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-primary-800-rgb), var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-primary .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-primary-600-rgb), var(--tw-bg-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-primary .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-primary .fuse-alert-container .fuse-alert-title, .dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-primary .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-primary .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-primary-200-rgb), var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-accent .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-accent-100-rgb), var(--tw-bg-opacity));\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);\n  --tw-ring-inset: inset;\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgba(var(--fuse-accent-400-rgb), var(--tw-ring-opacity));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-accent .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-accent-600-rgb), var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-accent .fuse-alert-container .fuse-alert-title, fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-accent .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-accent-900-rgb), var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-accent .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-accent-700-rgb), var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-accent .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-accent-200-rgb), var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-accent-800-rgb), var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-accent .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-accent-600-rgb), var(--tw-bg-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-accent .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-accent .fuse-alert-container .fuse-alert-title, .dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-accent .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-accent .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-accent-200-rgb), var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-warn .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-warn-50-rgb), var(--tw-bg-opacity));\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);\n  --tw-ring-inset: inset;\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgba(var(--fuse-warn-400-rgb), var(--tw-ring-opacity));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-warn .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-warn-600-rgb), var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-warn .fuse-alert-container .fuse-alert-title, fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-warn .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-warn-900-rgb), var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-warn .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-warn-700-rgb), var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-warn .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-warn-200-rgb), var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-warn-800-rgb), var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-warn .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-warn-600-rgb), var(--tw-bg-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-warn .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-warn .fuse-alert-container .fuse-alert-title, .dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-warn .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-warn .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-warn-200-rgb), var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-basic .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(241 245 249 / var(--tw-bg-opacity));\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);\n  --tw-ring-inset: inset;\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgb(148 163 184 / var(--tw-ring-opacity));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-basic .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(71 85 105 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-basic .fuse-alert-container .fuse-alert-title, fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-basic .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(15 23 42 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-basic .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(51 65 85 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-basic .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgb(226 232 240 / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: rgb(30 41 59 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-basic .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(71 85 105 / var(--tw-bg-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-basic .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-basic .fuse-alert-container .fuse-alert-title, .dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-basic .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-basic .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(226 232 240 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-info .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(239 246 255 / var(--tw-bg-opacity));\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);\n  --tw-ring-inset: inset;\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgb(96 165 250 / var(--tw-ring-opacity));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-info .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(37 99 235 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-info .fuse-alert-container .fuse-alert-title, fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-info .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(30 58 138 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-info .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(29 78 216 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-info .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgb(191 219 254 / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: rgb(30 64 175 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-info .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(37 99 235 / var(--tw-bg-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-info .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-info .fuse-alert-container .fuse-alert-title, .dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-info .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-info .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(191 219 254 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-success .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(240 253 244 / var(--tw-bg-opacity));\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);\n  --tw-ring-inset: inset;\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgb(74 222 128 / var(--tw-ring-opacity));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-success .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(22 163 74 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-success .fuse-alert-container .fuse-alert-title, fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-success .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(20 83 45 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-success .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(21 128 61 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-success .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgb(187 247 208 / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: rgb(22 101 52 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-success .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(22 163 74 / var(--tw-bg-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-success .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-success .fuse-alert-container .fuse-alert-title, .dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-success .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-success .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(187 247 208 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-warning .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(255 251 235 / var(--tw-bg-opacity));\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);\n  --tw-ring-inset: inset;\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgb(251 191 36 / var(--tw-ring-opacity));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-warning .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(217 119 6 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-warning .fuse-alert-container .fuse-alert-title, fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-warning .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(120 53 15 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-warning .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(180 83 9 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-warning .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgb(253 230 138 / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: rgb(146 64 14 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-warning .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(217 119 6 / var(--tw-bg-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-warning .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-warning .fuse-alert-container .fuse-alert-title, .dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-warning .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-warning .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(253 230 138 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-error .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(254 242 242 / var(--tw-bg-opacity));\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);\n  --tw-ring-inset: inset;\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgb(248 113 113 / var(--tw-ring-opacity));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-error .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(220 38 38 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-error .fuse-alert-container .fuse-alert-title, fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-error .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(127 29 29 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-error .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(185 28 28 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-outline.fuse-alert-type-error .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgb(254 202 202 / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: rgb(153 27 27 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-error .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(220 38 38 / var(--tw-bg-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-error .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-error .fuse-alert-container .fuse-alert-title, .dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-error .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-outline.fuse-alert-type-error .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(254 202 202 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-soft {\n  /* Primary */\n  /* Accent */\n  /* Warn */\n  /* Basic */\n  /* Info */\n  /* Success */\n  /* Warning */\n  /* Error */\n}\nfuse-alert.fuse-alert-appearance-soft .fuse-alert-container {\n  border-radius: 6px;\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-primary .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-primary-50-rgb), var(--tw-bg-opacity));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-primary .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-primary-600-rgb), var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-primary .fuse-alert-container .fuse-alert-title, fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-primary .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-primary-900-rgb), var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-primary .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-primary-700-rgb), var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-primary .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-primary-200-rgb), var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-primary-800-rgb), var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-primary .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-primary-600-rgb), var(--tw-bg-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-primary .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-primary .fuse-alert-container .fuse-alert-title, .dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-primary .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-primary .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-primary-200-rgb), var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-accent .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-accent-100-rgb), var(--tw-bg-opacity));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-accent .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-accent-600-rgb), var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-accent .fuse-alert-container .fuse-alert-title, fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-accent .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-accent-900-rgb), var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-accent .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-accent-700-rgb), var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-accent .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-accent-200-rgb), var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-accent-800-rgb), var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-accent .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-accent-600-rgb), var(--tw-bg-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-accent .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-accent .fuse-alert-container .fuse-alert-title, .dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-accent .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-accent .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-accent-200-rgb), var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-warn .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-warn-50-rgb), var(--tw-bg-opacity));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-warn .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-warn-600-rgb), var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-warn .fuse-alert-container .fuse-alert-title, fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-warn .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-warn-900-rgb), var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-warn .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-warn-700-rgb), var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-warn .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-warn-200-rgb), var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-warn-800-rgb), var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-warn .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--fuse-warn-600-rgb), var(--tw-bg-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-warn .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-warn .fuse-alert-container .fuse-alert-title, .dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-warn .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-warn .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgba(var(--fuse-warn-200-rgb), var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-basic .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(241 245 249 / var(--tw-bg-opacity));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-basic .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(71 85 105 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-basic .fuse-alert-container .fuse-alert-title, fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-basic .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(15 23 42 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-basic .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(51 65 85 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-basic .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgb(226 232 240 / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: rgb(30 41 59 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-basic .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(71 85 105 / var(--tw-bg-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-basic .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-basic .fuse-alert-container .fuse-alert-title, .dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-basic .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-basic .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(226 232 240 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-info .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(239 246 255 / var(--tw-bg-opacity));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-info .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(37 99 235 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-info .fuse-alert-container .fuse-alert-title, fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-info .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(30 58 138 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-info .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(29 78 216 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-info .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgb(191 219 254 / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: rgb(30 64 175 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-info .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(37 99 235 / var(--tw-bg-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-info .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-info .fuse-alert-container .fuse-alert-title, .dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-info .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-info .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(191 219 254 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-success .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(240 253 244 / var(--tw-bg-opacity));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-success .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(22 163 74 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-success .fuse-alert-container .fuse-alert-title, fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-success .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(20 83 45 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-success .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(21 128 61 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-success .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgb(187 247 208 / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: rgb(22 101 52 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-success .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(22 163 74 / var(--tw-bg-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-success .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-success .fuse-alert-container .fuse-alert-title, .dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-success .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-success .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(187 247 208 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-warning .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(255 251 235 / var(--tw-bg-opacity));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-warning .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(217 119 6 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-warning .fuse-alert-container .fuse-alert-title, fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-warning .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(120 53 15 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-warning .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(180 83 9 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-warning .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgb(253 230 138 / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: rgb(146 64 14 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-warning .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(217 119 6 / var(--tw-bg-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-warning .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-warning .fuse-alert-container .fuse-alert-title, .dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-warning .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-warning .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(253 230 138 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-error .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(254 242 242 / var(--tw-bg-opacity));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-error .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(220 38 38 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-error .fuse-alert-container .fuse-alert-title, fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-error .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(127 29 29 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-error .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(185 28 28 / var(--tw-text-opacity));\n}\nfuse-alert.fuse-alert-appearance-soft.fuse-alert-type-error .fuse-alert-container code {\n  --tw-bg-opacity: 1;\n  background-color: rgb(254 202 202 / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: rgb(153 27 27 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-error .fuse-alert-container {\n  --tw-bg-opacity: 1;\n  background-color: rgb(220 38 38 / var(--tw-bg-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-error .fuse-alert-container .fuse-alert-icon {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-error .fuse-alert-container .fuse-alert-title, .dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-error .fuse-alert-container .fuse-alert-dismiss-button {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\n.dark fuse-alert.fuse-alert-appearance-soft.fuse-alert-type-error .fuse-alert-container .fuse-alert-message {\n  --tw-text-opacity: 1;\n  color: rgb(254 202 202 / var(--tw-text-opacity));\n}"],
  encapsulation: 2,
  data: {
    animation: _fuse_animations__WEBPACK_IMPORTED_MODULE_10__.fuseAnimations
  },
  changeDetection: 0
});

/***/ }),

/***/ 718413:
/*!*********************************************************!*\
  !*** ./libs/web/@fuse/components/alert/alert.module.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FuseAlertModule": () => (/* binding */ FuseAlertModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _fuse_components_alert_alert_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fuse/components/alert/alert.component */ 967884);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);





class FuseAlertModule {}
FuseAlertModule.ɵfac = function FuseAlertModule_Factory(t) {
  return new (t || FuseAlertModule)();
};
FuseAlertModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: FuseAlertModule
});
FuseAlertModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_2__.MatButtonModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__.MatIconModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](FuseAlertModule, {
    declarations: [_fuse_components_alert_alert_component__WEBPACK_IMPORTED_MODULE_4__.FuseAlertComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_2__.MatButtonModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__.MatIconModule],
    exports: [_fuse_components_alert_alert_component__WEBPACK_IMPORTED_MODULE_4__.FuseAlertComponent]
  });
})();

/***/ }),

/***/ 361285:
/*!**********************************************************!*\
  !*** ./libs/web/@fuse/components/alert/alert.service.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FuseAlertService": () => (/* binding */ FuseAlertService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 604707);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 94650);


class FuseAlertService {
  /**
   * Constructor
   */
  constructor() {
    this._onDismiss = new rxjs__WEBPACK_IMPORTED_MODULE_0__.ReplaySubject(1);
    this._onShow = new rxjs__WEBPACK_IMPORTED_MODULE_0__.ReplaySubject(1);
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------
  /**
   * Getter for onDismiss
   */
  get onDismiss() {
    return this._onDismiss.asObservable();
  }
  /**
   * Getter for onShow
   */
  get onShow() {
    return this._onShow.asObservable();
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Dismiss the alert
   *
   * @param name
   */
  dismiss(name) {
    // Return if the name is not provided
    if (!name) {
      return;
    }
    // Execute the observable
    this._onDismiss.next(name);
  }
  /**
   * Show the dismissed alert
   *
   * @param name
   */
  show(name) {
    // Return if the name is not provided
    if (!name) {
      return;
    }
    // Execute the observable
    this._onShow.next(name);
  }
}
FuseAlertService.ɵfac = function FuseAlertService_Factory(t) {
  return new (t || FuseAlertService)();
};
FuseAlertService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: FuseAlertService,
  factory: FuseAlertService.ɵfac,
  providedIn: 'root'
});

/***/ })

}]);