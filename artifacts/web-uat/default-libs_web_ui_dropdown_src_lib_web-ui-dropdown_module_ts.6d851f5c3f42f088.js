"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_ui_dropdown_src_lib_web-ui-dropdown_module_ts"],{

/***/ 77505:
/*!*******************************************************************!*\
  !*** ./libs/web/ui/dropdown/src/lib/web-ui-dropdown.component.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebUiDropdownComponent": () => (/* binding */ WebUiDropdownComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _icon_src_lib_web_ui_icon_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../icon/src/lib/web-ui-icon.component */ 768164);




function WebUiDropdownComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div")(1, "button", 3)(2, "span", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Open options");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "ui-icon", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("bg-transparent", ctx_r0.menuButton);
  }
}
function WebUiDropdownComponent_div_2_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WebUiDropdownComponent_div_2_button_1_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6);
      const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r5.closeMenu());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "svg", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "path", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r3.label, " ");
  }
}
function WebUiDropdownComponent_div_2_button_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WebUiDropdownComponent_div_2_button_2_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8);
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r7.closeMenu());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Open options");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "ui-icon", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("icon", ctx_r4.icon);
  }
}
function WebUiDropdownComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebUiDropdownComponent_div_2_button_1_Template, 4, 1, "button", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, WebUiDropdownComponent_div_2_button_2_Template, 4, 1, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r1.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1.icon);
  }
}
function WebUiDropdownComponent_div_3_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 18)(1, "p", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r9.to.heading);
  }
}
function WebUiDropdownComponent_div_3_a_3_ui_icon_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "ui-icon", 22);
  }
  if (rf & 2) {
    const item_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("icon", item_r11.icons);
  }
}
function WebUiDropdownComponent_div_3_a_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WebUiDropdownComponent_div_3_a_3_Template_a_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r15);
      const item_r11 = restoredCtx.$implicit;
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r14.onSelect(item_r11));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebUiDropdownComponent_div_3_a_3_ui_icon_1_Template, 1, 1, "ui-icon", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r11 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", item_r11.icons ? "group flex" : "block");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", item_r11.icons);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", item_r11.name, " ");
  }
}
function WebUiDropdownComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 14)(1, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, WebUiDropdownComponent_div_3_div_2_Template, 3, 1, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, WebUiDropdownComponent_div_3_a_3_Template, 3, 3, "a", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMapInterpolate2"]("origin-top-", ctx_r2.direction, " absolute ", ctx_r2.direction, "-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r2.heading);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r2.items);
  }
}
class WebUiDropdownComponent {
  constructor() {
    this.onSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.show = false;
  }
  ngOnInit() {
    if (!this.direction) {
      this.direction = 'left';
    }
  }
  closeMenu() {
    this.show = !this.show;
  }
}
WebUiDropdownComponent.ɵfac = function WebUiDropdownComponent_Factory(t) {
  return new (t || WebUiDropdownComponent)();
};
WebUiDropdownComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebUiDropdownComponent,
  selectors: [["ui-dropdown"]],
  inputs: {
    direction: "direction",
    enableMinimalMenuIcon: "enableMinimalMenuIcon",
    icon: "icon",
    heading: "heading",
    label: "label",
    items: "items"
  },
  outputs: {
    onSelect: "onSelect"
  },
  decls: 4,
  vars: 3,
  consts: [[1, "relative", "inline-block", "text-left"], [4, "ngIf"], ["role", "menu", "aria-orientation", "vertical", "aria-labelledby", "options-menu", 3, "class", 4, "ngIf"], ["type", "button", "id", "menu-button", "aria-expanded", "true", "aria-haspopup", "true", 1, "rounded-full", "dark:hover:bg-gray-700", "transition", "duration-100", "ease-linear", "display-flex", "items-center", "justify-center", "p-2", "flex", "focus:outline-none", "focus:ring-2", "focus:ring-offset-2", "focus:ring-offset-gray-100", "focus:ring-indigo-500"], [1, "sr-only"], [1, "h-5", "w-5"], ["icon", "dotsVertical", 1, "h-5", "w-5", "dark:text-gray-300"], ["type", "button", "class", "inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500", "id", "options-menu", "aria-expanded", "true", "aria-haspopup", "true", 3, "click", 4, "ngIf"], ["type", "button", "class", "bg-gray-100 rounded-full flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500", "id", "options-menu", "aria-expanded", "true", "aria-haspopup", "true", 3, "click", 4, "ngIf"], ["type", "button", "id", "options-menu", "aria-expanded", "true", "aria-haspopup", "true", 1, "inline-flex", "justify-center", "w-full", "rounded-md", "border", "border-gray-300", "shadow-sm", "px-4", "py-2", "bg-white", "text-sm", "font-medium", "text-gray-700", "hover:bg-gray-50", "focus:outline-none", "focus:ring-2", "focus:ring-offset-2", "focus:ring-offset-gray-100", "focus:ring-indigo-500", 3, "click"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 20 20", "fill", "currentColor", "aria-hidden", "true", 1, "-mr-1", "ml-2", "h-5", "w-5"], ["fill-rule", "evenodd", "d", "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z", "clip-rule", "evenodd"], ["type", "button", "id", "options-menu", "aria-expanded", "true", "aria-haspopup", "true", 1, "bg-gray-100", "rounded-full", "flex", "items-center", "text-gray-400", "hover:text-gray-600", "focus:outline-none", "focus:ring-2", "focus:ring-offset-2", "focus:ring-offset-gray-100", "focus:ring-indigo-500", 3, "click"], [3, "icon"], ["role", "menu", "aria-orientation", "vertical", "aria-labelledby", "options-menu"], ["role", "none", 1, "py-1"], ["class", "px-4 py-3", "role", "none", 4, "ngIf"], ["href", "#", "class", "items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ", "role", "menuitem", 3, "ngClass", "click", 4, "ngFor", "ngForOf"], ["role", "none", 1, "px-4", "py-3"], ["role", "none", 1, "text-sm"], ["href", "#", "role", "menuitem", 1, "items-center", "px-4", "py-2", "text-sm", "text-gray-700", "hover:bg-gray-100", "hover:text-gray-900", 3, "ngClass", "click"], ["class", "mr-3 h-7 w-7 text-gray-400 group-hover:text-gray-500", 3, "icon", 4, "ngIf"], [1, "mr-3", "h-7", "w-7", "text-gray-400", "group-hover:text-gray-500", 3, "icon"]],
  template: function WebUiDropdownComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebUiDropdownComponent_div_1_Template, 6, 2, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, WebUiDropdownComponent_div_2_Template, 3, 2, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, WebUiDropdownComponent_div_3_Template, 4, 6, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.enableMinimalMenuIcon);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.enableMinimalMenuIcon);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.show);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgIf, _icon_src_lib_web_ui_icon_component__WEBPACK_IMPORTED_MODULE_2__.WebUiIconComponent],
  encapsulation: 2
});

/***/ }),

/***/ 420910:
/*!****************************************************************!*\
  !*** ./libs/web/ui/dropdown/src/lib/web-ui-dropdown.module.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebUiDropdownModule": () => (/* binding */ WebUiDropdownModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_ui_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @case-clinical/web/ui/icon */ 320558);
/* harmony import */ var _web_ui_dropdown_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./web-ui-dropdown.component */ 77505);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);





class WebUiDropdownModule {}
WebUiDropdownModule.ɵfac = function WebUiDropdownModule_Factory(t) {
  return new (t || WebUiDropdownModule)();
};
WebUiDropdownModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebUiDropdownModule
});
WebUiDropdownModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule, _case_clinical_web_ui_icon__WEBPACK_IMPORTED_MODULE_3__.WebUiIconModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebUiDropdownModule, {
    declarations: [_web_ui_dropdown_component__WEBPACK_IMPORTED_MODULE_4__.WebUiDropdownComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule, _case_clinical_web_ui_icon__WEBPACK_IMPORTED_MODULE_3__.WebUiIconModule],
    exports: [_web_ui_dropdown_component__WEBPACK_IMPORTED_MODULE_4__.WebUiDropdownComponent]
  });
})();

/***/ })

}]);