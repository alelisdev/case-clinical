"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_ui_button_src_lib_web-ui-button_module_ts"],{

/***/ 797800:
/*!***************************************************************!*\
  !*** ./libs/web/ui/button/src/lib/web-ui-button.component.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Variant": () => (/* binding */ Variant),
/* harmony export */   "WebUiButtonComponent": () => (/* binding */ WebUiButtonComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 836895);





function WebUiButtonComponent__svg_svg_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiButtonComponent__svg_svg_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
var Variant;
(function (Variant) {
  Variant["Default"] = "default";
  Variant["White"] = "white";
  Variant["Danger"] = "danger";
})(Variant || (Variant = {}));
class WebUiButtonComponent {
  constructor(router, route) {
    this.router = router;
    this.route = route;
    this.type = 'button';
    this.handler = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
  }
  get classes() {
    let className = "";
    switch (this.variant) {
      case Variant.Danger:
        className = 'inline-flex items-center shadow px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500';
        break;
      case Variant.White:
        className = `inline-flex items-center px-4 py-2 border border-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 dark:text-gray-100 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`;
        break;
      default:
      case Variant.Default:
        className = 'inline-flex items-center shadow px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500';
        break;
    }
    if (this.fill) {
      className = `${className} w-full`;
    }
    return className;
  }
  handleClick(event) {
    if (this.link) {
      this.router.navigate([this.link], {
        relativeTo: this.route
      });
    } else {
      this.handler.emit(event);
    }
  }
}
WebUiButtonComponent.ɵfac = function WebUiButtonComponent_Factory(t) {
  return new (t || WebUiButtonComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__.ActivatedRoute));
};
WebUiButtonComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebUiButtonComponent,
  selectors: [["ui-button"]],
  inputs: {
    link: "link",
    disabled: "disabled",
    variant: "variant",
    showCreateIcon: "showCreateIcon",
    showLeftArrowIcon: "showLeftArrowIcon",
    label: "label",
    type: "type",
    fill: "fill"
  },
  outputs: {
    handler: "handler"
  },
  decls: 4,
  vars: 7,
  consts: [[3, "disabled", "type", "click"], ["xmlns", "http://www.w3.org/2000/svg", "class", "-ml-0.5 mr-2 h-4 w-4 bg-primary", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 4, "ngIf"], ["xmlns", "http://www.w3.org/2000/svg", "class", "-ml-0.5 mr-2 h-4 w-4", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 4, "ngIf"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "-ml-0.5", "mr-2", "h-4", "w-4", "bg-primary"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "-ml-0.5", "mr-2", "h-4", "w-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M10 19l-7-7m0 0l7-7m-7 7h18"]],
  template: function WebUiButtonComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WebUiButtonComponent_Template_button_click_0_listener($event) {
        return ctx.handleClick($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebUiButtonComponent__svg_svg_1_Template, 2, 0, "svg", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, WebUiButtonComponent__svg_svg_2_Template, 2, 0, "svg", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMap"](ctx.classes);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx.disabled)("type", ctx.type);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.showCreateIcon);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.showLeftArrowIcon);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.label, " ");
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf],
  encapsulation: 2
});

/***/ }),

/***/ 510948:
/*!************************************************************!*\
  !*** ./libs/web/ui/button/src/lib/web-ui-button.module.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebUiButtonModule": () => (/* binding */ WebUiButtonModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _web_ui_button_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./web-ui-button.component */ 797800);
/* harmony import */ var _case_clinical_web_ui_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @case-clinical/web/ui/icon */ 320558);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);





class WebUiButtonModule {}
WebUiButtonModule.ɵfac = function WebUiButtonModule_Factory(t) {
  return new (t || WebUiButtonModule)();
};
WebUiButtonModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebUiButtonModule
});
WebUiButtonModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule, _case_clinical_web_ui_icon__WEBPACK_IMPORTED_MODULE_3__.WebUiIconModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebUiButtonModule, {
    declarations: [_web_ui_button_component__WEBPACK_IMPORTED_MODULE_4__.WebUiButtonComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule, _case_clinical_web_ui_icon__WEBPACK_IMPORTED_MODULE_3__.WebUiIconModule],
    exports: [_web_ui_button_component__WEBPACK_IMPORTED_MODULE_4__.WebUiButtonComponent]
  });
})();

/***/ }),

/***/ 846152:
/*!********************************************************!*\
  !*** ./libs/web/ui/icon/src/lib/enums/ui-icon.enum.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UiIcon": () => (/* binding */ UiIcon)
/* harmony export */ });
var UiIcon;
(function (UiIcon) {
  UiIcon["about"] = "about";
  UiIcon["account"] = "account";
  UiIcon["arrowLeft"] = "arrowLeft";
  UiIcon["arrowRight"] = "arrowRight";
  UiIcon["at"] = "at";
  UiIcon["briefcase"] = "briefcase";
  UiIcon["calendar"] = "calendar";
  UiIcon["check"] = "check";
  UiIcon["check_circle"] = "check_circle";
  UiIcon["chevronDown"] = "chevronDown";
  UiIcon["chevronLeft"] = "chevronLeft";
  UiIcon["chevronRight"] = "chevronRight";
  UiIcon["clipboard"] = "clipboard";
  UiIcon["code"] = "code";
  UiIcon["credit"] = "credit";
  UiIcon["currencyDollar"] = "currencyDollar";
  UiIcon["dashboard"] = "dashboard";
  UiIcon["delete"] = "delete";
  UiIcon["development"] = "development";
  UiIcon["dismiss"] = "dismiss";
  UiIcon["document"] = "document";
  UiIcon["dollar"] = "dollar";
  UiIcon["dot"] = "dot";
  UiIcon["dotsVertical"] = "dotsVertical";
  UiIcon["email"] = "email";
  UiIcon["euro"] = "euro";
  UiIcon["exclamation"] = "exclamation";
  UiIcon["eye"] = "eye";
  UiIcon["folder"] = "folder";
  UiIcon["github"] = "github";
  UiIcon["heroicon"] = "heroicon";
  UiIcon["home"] = "home";
  UiIcon["information_circle"] = "information_circle";
  UiIcon["key"] = "key";
  UiIcon["link"] = "link";
  UiIcon["list"] = "list";
  UiIcon["locationMarker"] = "locationMarker";
  UiIcon["logout"] = "logout";
  UiIcon["menu"] = "menu";
  UiIcon["minusCircle"] = "minusCircle";
  UiIcon["moon"] = "moon";
  UiIcon["office"] = "office";
  UiIcon["pencil"] = "pencil";
  UiIcon["phone"] = "phone";
  UiIcon["plusCircle"] = "plusCircle";
  UiIcon["project"] = "project";
  UiIcon["remove"] = "remove";
  UiIcon["report"] = "report";
  UiIcon["search"] = "search";
  UiIcon["spinner"] = "spinner";
  UiIcon["sun"] = "sun";
  UiIcon["table"] = "table";
  UiIcon["team"] = "team";
  UiIcon["thumb_up"] = "thumb_up";
  UiIcon["trash"] = "trash";
  UiIcon["user"] = "user";
  UiIcon["users"] = "users";
  UiIcon["viewGrid"] = "viewGrid";
  UiIcon["x_circle"] = "x_circle";
})(UiIcon || (UiIcon = {}));

/***/ }),

/***/ 768164:
/*!***********************************************************!*\
  !*** ./libs/web/ui/icon/src/lib/web-ui-icon.component.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebUiIconComponent": () => (/* binding */ WebUiIconComponent)
/* harmony export */ });
/* harmony import */ var _enums_ui_icon_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enums/ui-icon.enum */ 846152);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 836895);



function WebUiIconComponent__svg_svg_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_26_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_27_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "circle", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_28_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_29_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_30_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_31_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_32_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_33_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_34_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_35_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_36_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_37_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_38_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_39_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_40_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_41_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_42_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_43_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 56)(2, "path", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_44_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 58)(2, "path", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_45_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_46_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_47_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_48_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_49_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_50_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_51_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_52_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_53_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 69)(2, "path", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_54_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_55_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 72)(2, "path", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_56_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_57_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 75)(2, "path", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_58_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WebUiIconComponent__svg_svg_59_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
class WebUiIconComponent {
  constructor() {
    this.UiIcon = _enums_ui_icon_enum__WEBPACK_IMPORTED_MODULE_1__.UiIcon;
  }
}
WebUiIconComponent.ɵfac = function WebUiIconComponent_Factory(t) {
  return new (t || WebUiIconComponent)();
};
WebUiIconComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebUiIconComponent,
  selectors: [["ui-icon"]],
  inputs: {
    icon: "icon"
  },
  decls: 60,
  vars: 60,
  consts: [[3, "ngSwitch"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 24 24", "fill", "currentColor", 4, "ngSwitchCase"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 512 512", "fill", "currentColor", 4, "ngSwitchCase"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 4, "ngSwitchCase"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 20 20", "fill", "currentColor", 4, "ngSwitchCase"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 20 20", "fill", "currentColor", "aria-hidden", "true", 4, "ngSwitchCase"], ["fill", "currentColor", "viewBox", "0 0 8 8", 4, "ngSwitchCase"], ["stroke", "currentColor", "fill", "none", "viewBox", "0 0 8 8", 4, "ngSwitchCase"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "aria-hidden", "true", 4, "ngSwitchCase"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 24 24", "fill", "currentColor"], ["d", "M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10c1.466 0 2.961-.371 4.442-1.104l-.885-1.793C14.353 19.698 13.156 20 12 20c-4.411 0-8-3.589-8-8s3.589-8 8-8s8 3.589 8 8v1c0 .692-.313 2-1.5 2c-1.396 0-1.494-1.819-1.5-2V8h-2v.025A4.954 4.954 0 0 0 12 7c-2.757 0-5 2.243-5 5s2.243 5 5 5c1.45 0 2.748-.631 3.662-1.621c.524.89 1.408 1.621 2.838 1.621c2.273 0 3.5-2.061 3.5-4v-1c0-5.514-4.486-10-10-10zm0 13c-1.654 0-3-1.346-3-3s1.346-3 3-3s3 1.346 3 3s-1.346 3-3 3z"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 512 512", "fill", "currentColor"], ["d", "M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"], ["d", "M15.999 8.5h2c0-2.837-2.755-4.131-5-4.429V2h-2v2.071c-2.245.298-5 1.592-5 4.429c0 2.706 2.666 4.113 5 4.43v4.97c-1.448-.251-3-1.024-3-2.4h-2c0 2.589 2.425 4.119 5 4.436V22h2v-2.07c2.245-.298 5-1.593 5-4.43s-2.755-4.131-5-4.429V6.1c1.33.239 3 .941 3 2.4zm-8 0c0-1.459 1.67-2.161 3-2.4v4.799c-1.371-.253-3-1.002-3-2.399zm8 7c0 1.459-1.67 2.161-3 2.4v-4.8c1.33.239 3 .941 3 2.4z"], ["d", "M13.464 6c1.43 0 2.779.613 3.799 1.726l1.475-1.352C17.334 4.843 15.461 4 13.464 4c-1.998 0-3.87.843-5.272 2.375A8.034 8.034 0 0 0 6.589 9H4v2h2.114c-.038.33-.064.663-.064 1s.026.67.064 1H4v2h2.589c.362.97.901 1.861 1.603 2.626C9.594 19.157 11.466 20 13.464 20c1.997 0 3.87-.843 5.273-2.374l-1.475-1.352C16.243 17.387 14.894 18 13.464 18s-2.778-.612-3.798-1.726A5.937 5.937 0 0 1 8.801 15H13v-2H8.139c-.05-.328-.089-.66-.089-1s.039-.672.089-1H13V9H8.801c.24-.457.516-.893.865-1.274C10.686 6.613 12.034 6 13.464 6z"], ["d", "M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"], ["d", "M7 17a5.007 5.007 0 0 0 4.898-4H14v2h2v-2h2v3h2v-3h1v-2h-9.102A5.007 5.007 0 0 0 7 7c-2.757 0-5 2.243-5 5s2.243 5 5 5zm0-8c1.654 0 3 1.346 3 3s-1.346 3-3 3s-3-1.346-3-3s1.346-3 3-3z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M4 6h16M4 12h16M4 18h16"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 20 20", "fill", "currentColor"], ["fill-rule", "evenodd", "d", "M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z", "clip-rule", "evenodd"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M10 19l-7-7m0 0l7-7m-7 7h18"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"], ["d", "M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"], ["fill-rule", "evenodd", "d", "M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z", "clip-rule", "evenodd"], ["d", "M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M4 6h16M4 10h16M4 14h16M4 18h16"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 20 20", "fill", "currentColor", "aria-hidden", "true"], ["fill-rule", "evenodd", "d", "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z", "clip-rule", "evenodd"], ["fill-rule", "evenodd", "d", "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z", "clip-rule", "evenodd"], ["fill-rule", "evenodd", "d", "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z", "clip-rule", "evenodd"], ["fill-rule", "evenodd", "d", "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", "clip-rule", "evenodd"], ["fill-rule", "evenodd", "d", "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z", "clip-rule", "evenodd"], ["fill-rule", "evenodd", "d", "M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z", "clip-rule", "evenodd"], ["d", "M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"], ["d", "M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"], ["fill", "currentColor", "viewBox", "0 0 8 8"], ["cx", "4", "cy", "4", "r", "3"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"], ["stroke", "currentColor", "fill", "none", "viewBox", "0 0 8 8"], ["stroke-linecap", "round", "stroke-width", "1.5", "d", "M1 1l6 6m0-6L1 7"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"], ["fill-rule", "evenodd", "d", "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z", "clip-rule", "evenodd"], ["fill-rule", "evenodd", "d", "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z", "clip-rule", "evenodd"], ["fill-rule", "evenodd", "d", "M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z", "clip-rule", "evenodd"], ["fill-rule", "evenodd", "d", "M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z", "clip-rule", "evenodd"], ["fill-rule", "evenodd", "d", "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z", "clip-rule", "evenodd"], ["fill-rule", "evenodd", "d", "M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z", "clip-rule", "evenodd"], ["fill-rule", "evenodd", "d", "M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z", "clip-rule", "evenodd"], ["fill-rule", "evenodd", "d", "M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z", "clip-rule", "evenodd"], ["fill-rule", "evenodd", "d", "M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z", "clip-rule", "evenodd"], ["d", "M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"], ["d", "M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"], ["fill-rule", "evenodd", "d", "M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z", "clip-rule", "evenodd"], ["fill-rule", "evenodd", "d", "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z", "clip-rule", "evenodd"], ["fill-rule", "evenodd", "d", "M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z", "clip-rule", "evenodd"], ["d", "M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "aria-hidden", "true"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"], ["fill-rule", "evenodd", "d", "M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z", "clip-rule", "evenodd"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"], ["fill-rule", "evenodd", "d", "M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z", "clip-rule", "evenodd"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"], ["d", "M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"], ["fill-rule", "evenodd", "d", "M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z", "clip-rule", "evenodd"], ["d", "M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"], ["d", "M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"], ["d", "M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"], ["d", "M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M15 12a3 3 0 11-6 0 3 3 0 016 0z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"], ["d", "M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"]],
  template: function WebUiIconComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0, 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebUiIconComponent__svg_svg_1_Template, 2, 0, "svg", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, WebUiIconComponent__svg_svg_2_Template, 2, 0, "svg", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, WebUiIconComponent__svg_svg_3_Template, 2, 0, "svg", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, WebUiIconComponent__svg_svg_4_Template, 2, 0, "svg", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, WebUiIconComponent__svg_svg_5_Template, 2, 0, "svg", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, WebUiIconComponent__svg_svg_6_Template, 2, 0, "svg", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, WebUiIconComponent__svg_svg_7_Template, 2, 0, "svg", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, WebUiIconComponent__svg_svg_8_Template, 2, 0, "svg", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, WebUiIconComponent__svg_svg_9_Template, 2, 0, "svg", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, WebUiIconComponent__svg_svg_10_Template, 2, 0, "svg", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, WebUiIconComponent__svg_svg_11_Template, 2, 0, "svg", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, WebUiIconComponent__svg_svg_12_Template, 2, 0, "svg", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, WebUiIconComponent__svg_svg_13_Template, 2, 0, "svg", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](14, WebUiIconComponent__svg_svg_14_Template, 2, 0, "svg", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](15, WebUiIconComponent__svg_svg_15_Template, 2, 0, "svg", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](16, WebUiIconComponent__svg_svg_16_Template, 2, 0, "svg", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](17, WebUiIconComponent__svg_svg_17_Template, 2, 0, "svg", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](18, WebUiIconComponent__svg_svg_18_Template, 2, 0, "svg", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](19, WebUiIconComponent__svg_svg_19_Template, 2, 0, "svg", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](20, WebUiIconComponent__svg_svg_20_Template, 2, 0, "svg", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](21, WebUiIconComponent__svg_svg_21_Template, 2, 0, "svg", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](22, WebUiIconComponent__svg_svg_22_Template, 2, 0, "svg", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](23, WebUiIconComponent__svg_svg_23_Template, 2, 0, "svg", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](24, WebUiIconComponent__svg_svg_24_Template, 2, 0, "svg", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](25, WebUiIconComponent__svg_svg_25_Template, 2, 0, "svg", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](26, WebUiIconComponent__svg_svg_26_Template, 2, 0, "svg", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](27, WebUiIconComponent__svg_svg_27_Template, 2, 0, "svg", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](28, WebUiIconComponent__svg_svg_28_Template, 2, 0, "svg", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](29, WebUiIconComponent__svg_svg_29_Template, 2, 0, "svg", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](30, WebUiIconComponent__svg_svg_30_Template, 2, 0, "svg", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](31, WebUiIconComponent__svg_svg_31_Template, 2, 0, "svg", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](32, WebUiIconComponent__svg_svg_32_Template, 2, 0, "svg", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](33, WebUiIconComponent__svg_svg_33_Template, 2, 0, "svg", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](34, WebUiIconComponent__svg_svg_34_Template, 2, 0, "svg", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](35, WebUiIconComponent__svg_svg_35_Template, 2, 0, "svg", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](36, WebUiIconComponent__svg_svg_36_Template, 2, 0, "svg", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](37, WebUiIconComponent__svg_svg_37_Template, 2, 0, "svg", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](38, WebUiIconComponent__svg_svg_38_Template, 2, 0, "svg", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](39, WebUiIconComponent__svg_svg_39_Template, 2, 0, "svg", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](40, WebUiIconComponent__svg_svg_40_Template, 2, 0, "svg", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](41, WebUiIconComponent__svg_svg_41_Template, 2, 0, "svg", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](42, WebUiIconComponent__svg_svg_42_Template, 2, 0, "svg", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](43, WebUiIconComponent__svg_svg_43_Template, 3, 0, "svg", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](44, WebUiIconComponent__svg_svg_44_Template, 3, 0, "svg", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](45, WebUiIconComponent__svg_svg_45_Template, 2, 0, "svg", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](46, WebUiIconComponent__svg_svg_46_Template, 2, 0, "svg", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](47, WebUiIconComponent__svg_svg_47_Template, 2, 0, "svg", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](48, WebUiIconComponent__svg_svg_48_Template, 2, 0, "svg", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](49, WebUiIconComponent__svg_svg_49_Template, 2, 0, "svg", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](50, WebUiIconComponent__svg_svg_50_Template, 2, 0, "svg", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](51, WebUiIconComponent__svg_svg_51_Template, 2, 0, "svg", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](52, WebUiIconComponent__svg_svg_52_Template, 2, 0, "svg", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](53, WebUiIconComponent__svg_svg_53_Template, 3, 0, "svg", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](54, WebUiIconComponent__svg_svg_54_Template, 2, 0, "svg", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](55, WebUiIconComponent__svg_svg_55_Template, 3, 0, "svg", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](56, WebUiIconComponent__svg_svg_56_Template, 2, 0, "svg", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](57, WebUiIconComponent__svg_svg_57_Template, 3, 0, "svg", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](58, WebUiIconComponent__svg_svg_58_Template, 2, 0, "svg", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](59, WebUiIconComponent__svg_svg_59_Template, 2, 0, "svg", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitch", ctx.icon);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.at);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.check);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.clipboard);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.dollar);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.euro);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.github);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.key);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.menu);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.minusCircle);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.arrowLeft);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.moon);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.pencil);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.plusCircle);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.spinner);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.sun);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.list);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.table);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.trash);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.dismiss);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.exclamation);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.x_circle);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.check_circle);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.information_circle);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.user);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.thumb_up);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.heroicon);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.dot);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.search);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.delete);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.viewGrid);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.remove);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.dotsVertical);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.chevronLeft);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.chevronRight);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.logout);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.dashboard);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.about);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.account);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.development);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.arrowRight);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.calendar);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.locationMarker);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.briefcase);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.currencyDollar);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.chevronDown);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.link);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.home);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.team);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.report);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.project);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.document);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.office);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.credit);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.phone);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.email);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.folder);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.eye);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.code);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.UiIcon.users);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgSwitch, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgSwitchCase],
  styles: ["ui-icon svg {\n  fill: transparent !important;\n  width: 100%;\n  height: 100%;\n}"]
});

/***/ }),

/***/ 320558:
/*!********************************************************!*\
  !*** ./libs/web/ui/icon/src/lib/web-ui-icon.module.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebUiIconModule": () => (/* binding */ WebUiIconModule)
/* harmony export */ });
/* harmony import */ var _web_ui_icon_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./web-ui-icon.component */ 768164);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);



class WebUiIconModule {}
WebUiIconModule.ɵfac = function WebUiIconModule_Factory(t) {
  return new (t || WebUiIconModule)();
};
WebUiIconModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebUiIconModule
});
WebUiIconModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebUiIconModule, {
    declarations: [_web_ui_icon_component__WEBPACK_IMPORTED_MODULE_2__.WebUiIconComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule],
    exports: [_web_ui_icon_component__WEBPACK_IMPORTED_MODULE_2__.WebUiIconComponent]
  });
})();

/***/ })

}]);