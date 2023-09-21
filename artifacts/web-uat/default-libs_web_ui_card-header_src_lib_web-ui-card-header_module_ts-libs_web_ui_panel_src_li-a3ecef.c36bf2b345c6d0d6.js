"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_ui_card-header_src_lib_web-ui-card-header_module_ts-libs_web_ui_panel_src_li-a3ecef"],{

/***/ 80194:
/*!*************************************************************************!*\
  !*** ./libs/web/ui/card-header/src/lib/web-ui-card-header.component.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebUiCardHeaderComponent": () => (/* binding */ WebUiCardHeaderComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _button_src_lib_web_ui_button_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../button/src/lib/web-ui-button.component */ 797800);
/* harmony import */ var _formly_form_switch_src_lib_child_form_select_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../formly-form-switch/src/lib/child-form-select.component */ 155713);






const _c0 = function () {
  return ["./.."];
};
function WebUiCardHeaderComponent_ui_button_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "ui-button", 10);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](4, _c0))("label", "Back")("variant", "white")("icon", "arrowLeft");
  }
}
function WebUiCardHeaderComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx_r1.avatarSrc, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
  }
}
function WebUiCardHeaderComponent_h3_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h3", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r2.title);
  }
}
function WebUiCardHeaderComponent_p_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p", 14)(1, "a", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r3.subTitle, " ");
  }
}
function WebUiCardHeaderComponent_ui_formly_form_select_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "ui-formly-form-select", 16);
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formName", ctx_r4.formName);
  }
}
function WebUiCardHeaderComponent_div_10_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0);
  }
}
function WebUiCardHeaderComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebUiCardHeaderComponent_div_10_ng_container_1_Template, 1, 0, "ng-container", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r5.controlsTemplate);
  }
}
class WebUiCardHeaderComponent {}
WebUiCardHeaderComponent.ɵfac = function WebUiCardHeaderComponent_Factory(t) {
  return new (t || WebUiCardHeaderComponent)();
};
WebUiCardHeaderComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebUiCardHeaderComponent,
  selectors: [["ui-card-header"]],
  inputs: {
    avatarSrc: "avatarSrc",
    title: "title",
    formName: "formName",
    subTitle: "subTitle",
    controlsTemplate: "controlsTemplate",
    enableBackButton: "enableBackButton"
  },
  decls: 11,
  vars: 8,
  consts: [[1, "bg-white", "dark:bg-gray-800", "px-4", "py-5", "border-gray-200", "dark:border-gray-700", "sm:px-6"], [1, "-ml-4", "-mt-4", "flex", "justify-between", "items-center", "flex-wrap", "sm:flex-nowrap"], [1, "ml-4", "mt-4", "w-full", "md:w-max", "lg:w-max", "justify-center", "flex"], [1, "flex", "items-center"], ["class", "mr-4", 3, "routerLink", "label", "variant", "icon", 4, "ngIf"], ["class", "flex-shrink-0", 4, "ngIf"], ["class", "text-lg leading-6 font-medium text-gray-900 dark:text-gray-100", 4, "ngIf"], ["class", "text-sm text-gray-500 dark:text-gray-400", 4, "ngIf"], [3, "formName", 4, "ngIf"], ["class", "ml-4 mt-4 items-center flex", 4, "ngIf"], [1, "mr-4", 3, "routerLink", "label", "variant", "icon"], [1, "flex-shrink-0"], ["alt", "", 1, "h-12", "w-12", "rounded-full", 3, "src"], [1, "text-lg", "leading-6", "font-medium", "text-gray-900", "dark:text-gray-100"], [1, "text-sm", "text-gray-500", "dark:text-gray-400"], ["href", "#"], [3, "formName"], [1, "ml-4", "mt-4", "items-center", "flex"], [4, "ngTemplateOutlet"]],
  template: function WebUiCardHeaderComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, WebUiCardHeaderComponent_ui_button_4_Template, 1, 5, "ui-button", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, WebUiCardHeaderComponent_div_5_Template, 2, 1, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, WebUiCardHeaderComponent_h3_7_Template, 2, 1, "h3", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, WebUiCardHeaderComponent_p_8_Template, 3, 1, "p", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, WebUiCardHeaderComponent_ui_formly_form_select_9_Template, 1, 1, "ui-formly-form-select", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, WebUiCardHeaderComponent_div_10_Template, 2, 1, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.enableBackButton);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.avatarSrc);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("ml-4", ctx.avatarSrc);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.title);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.subTitle);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.formName);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.controlsTemplate);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgTemplateOutlet, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterLink, _button_src_lib_web_ui_button_component__WEBPACK_IMPORTED_MODULE_3__.WebUiButtonComponent, _formly_form_switch_src_lib_child_form_select_component__WEBPACK_IMPORTED_MODULE_4__.ChildFormSelectComponent],
  encapsulation: 2
});

/***/ }),

/***/ 726693:
/*!**********************************************************************!*\
  !*** ./libs/web/ui/card-header/src/lib/web-ui-card-header.module.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebUiCardHeaderModule": () => (/* binding */ WebUiCardHeaderModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @case-clinical/web/ui/button */ 510948);
/* harmony import */ var _web_ui_card_header_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./web-ui-card-header.component */ 80194);
/* harmony import */ var _case_clinical_web_ui_formly_form_switch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/ui/formly-form-switch */ 256158);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);






class WebUiCardHeaderModule {}
WebUiCardHeaderModule.ɵfac = function WebUiCardHeaderModule_Factory(t) {
  return new (t || WebUiCardHeaderModule)();
};
WebUiCardHeaderModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebUiCardHeaderModule
});
WebUiCardHeaderModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_3__.WebUiButtonModule, _case_clinical_web_ui_formly_form_switch__WEBPACK_IMPORTED_MODULE_4__.WebUiFormlyFormSwitchModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebUiCardHeaderModule, {
    declarations: [_web_ui_card_header_component__WEBPACK_IMPORTED_MODULE_5__.WebUiCardHeaderComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_3__.WebUiButtonModule, _case_clinical_web_ui_formly_form_switch__WEBPACK_IMPORTED_MODULE_4__.WebUiFormlyFormSwitchModule],
    exports: [_web_ui_card_header_component__WEBPACK_IMPORTED_MODULE_5__.WebUiCardHeaderComponent]
  });
})();

/***/ }),

/***/ 619797:
/*!*************************************************************!*\
  !*** ./libs/web/ui/panel/src/lib/web-ui-panel.component.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebUiPanelComponent": () => (/* binding */ WebUiPanelComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);



const _c0 = ["panelBody"];
const _c1 = ["dataBody"];
function WebUiPanelComponent_ng_container_3_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0);
  }
}
function WebUiPanelComponent_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0, 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebUiPanelComponent_ng_container_3_ng_container_1_Template, 1, 0, "ng-container", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", !ctx_r1.disableHeaderPadding && "px-4 py-5 sm:px-6");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r1.headerTemplate);
  }
}
function WebUiPanelComponent_ng_container_7_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0);
  }
}
function WebUiPanelComponent_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0, 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebUiPanelComponent_ng_container_7_ng_container_1_Template, 1, 0, "ng-container", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", !ctx_r3.disableFooterPadding && "px-4 py-4 sm:px-6");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r3.footerTemplate);
  }
}
const _c2 = ["*"];
class WebUiPanelComponent {
  ngAfterViewInit() {
    this.panelBody.nativeElement.parentElement.classList.add('w-full');
    this.autoHeightFixer(this.panelBody.nativeElement, this.panelBody.nativeElement.querySelector('ag-grid-angular'), 500);
  }
  autoHeightFixer(layerInElement, targetElement, delay = 0) {
    if (targetElement) {
      setTimeout(() => {
        const layerOutElement = this.findTectonicPlate(layerInElement);
        if (layerOutElement) {
          Array(...layerOutElement.children).forEach(child => {
            if (child.name == 'ng-component') {
              child.style.height = '100%';
            }
          });
          const emptyFooterSpacePx = layerOutElement.clientHeight - layerInElement.clientHeight;
          const currentActiveGridHeightPx = targetElement.clientHeight;
          targetElement.style.height = (currentActiveGridHeightPx + emptyFooterSpacePx).toString() + 'px';
        }
      }, delay);
    }
  }
  findTectonicPlate(sourceElement, limit = 1000) {
    let upperTectonicPlate = sourceElement;
    let flag = true;
    while (flag && limit > 0) {
      limit--;
      if (sourceElement.clientHeight != upperTectonicPlate.clientHeight) {
        flag = false;
        return upperTectonicPlate;
      } else {
        upperTectonicPlate = upperTectonicPlate.parentElement;
        if (upperTectonicPlate) {
          flag = true;
        } else {
          flag = false;
          return false;
        }
      }
    }
  }
}
WebUiPanelComponent.ɵfac = function WebUiPanelComponent_Factory(t) {
  return new (t || WebUiPanelComponent)();
};
WebUiPanelComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebUiPanelComponent,
  selectors: [["ui-panel"]],
  viewQuery: function WebUiPanelComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c1, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.panelBody = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.dataBody = _t.first);
    }
  },
  inputs: {
    headerTemplate: "headerTemplate",
    footerTemplate: "footerTemplate",
    disableHeaderPadding: "disableHeaderPadding",
    disableBodyPadding: "disableBodyPadding",
    disableFooterPadding: "disableFooterPadding"
  },
  ngContentSelectors: _c2,
  decls: 8,
  vars: 3,
  consts: [[1, "h-full", "w-full"], ["panelBody", ""], [1, "bg-white", "dark:bg-gray-800", "overflow-hidden", "shadow", "md:rounded-lg", "w-full", "h-full", "flex", "flex-col"], [3, "ngClass", 4, "ngIf"], [1, "overflow-auto", "w-full", "h-full", 3, "ngClass"], ["dataBody", ""], [3, "ngClass"], [4, "ngTemplateOutlet"]],
  template: function WebUiPanelComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0, 1)(2, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, WebUiPanelComponent_ng_container_3_Template, 2, 2, "ng-container", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 4, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, WebUiPanelComponent_ng_container_7_Template, 2, 2, "ng-container", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.headerTemplate);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", !ctx.disableBodyPadding && "px-4 py-5 sm:p-6");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.footerTemplate);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgTemplateOutlet],
  encapsulation: 2
});

/***/ }),

/***/ 776301:
/*!**********************************************************!*\
  !*** ./libs/web/ui/panel/src/lib/web-ui-panel.module.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebUiPanelModule": () => (/* binding */ WebUiPanelModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _web_ui_panel_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./web-ui-panel.component */ 619797);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);




class WebUiPanelModule {}
WebUiPanelModule.ɵfac = function WebUiPanelModule_Factory(t) {
  return new (t || WebUiPanelModule)();
};
WebUiPanelModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebUiPanelModule
});
WebUiPanelModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebUiPanelModule, {
    declarations: [_web_ui_panel_component__WEBPACK_IMPORTED_MODULE_3__.WebUiPanelComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_web_ui_panel_component__WEBPACK_IMPORTED_MODULE_3__.WebUiPanelComponent]
  });
})();

/***/ })

}]);