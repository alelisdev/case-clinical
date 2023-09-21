"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_ui_pagination_src_lib_web-ui-pagination_module_ts-libs_web_ui_stacked-list_s-f63a86"],{

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

/***/ 584309:
/*!***************************************************************************!*\
  !*** ./libs/web/ui/stacked-list/src/lib/web-ui-stacked-list.component.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebUiStackedListComponent": () => (/* binding */ WebUiStackedListComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _icon_src_lib_web_ui_icon_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../icon/src/lib/web-ui-icon.component */ 768164);




function WebUiStackedListComponent_li_2_p_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", item_r1.title, " ");
  }
}
function WebUiStackedListComponent_li_2_p_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", item_r1.subTitle, " ");
  }
}
function WebUiStackedListComponent_li_2_div_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "ui-icon", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
const _c0 = function (a1) {
  return ["./", a1];
};
function WebUiStackedListComponent_li_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li")(1, "a", 3)(2, "div", 4)(3, "div", 5)(4, "div", 6)(5, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, WebUiStackedListComponent_li_2_p_6_Template, 2, 1, "p", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, WebUiStackedListComponent_li_2_p_7_Template, 2, 1, "p", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 10)(9, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "ui-icon", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](13, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](14, WebUiStackedListComponent_li_2_div_14_Template, 2, 0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](8, _c0, item_r1.path));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", item_r1.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", item_r1.subTitle);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("icon", item_r1.leftMeta == null ? null : item_r1.leftMeta.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](13, 6, item_r1.leftMeta == null ? null : item_r1.leftMeta.text), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", item_r1.path);
  }
}
class WebUiStackedListComponent {}
WebUiStackedListComponent.ɵfac = function WebUiStackedListComponent_Factory(t) {
  return new (t || WebUiStackedListComponent)();
};
WebUiStackedListComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebUiStackedListComponent,
  selectors: [["ui-stacked-list"]],
  inputs: {
    items: "items"
  },
  decls: 3,
  vars: 1,
  consts: [[1, "bg-white", "dark:bg-gray-800", "shadow", "overflow-hidden"], [1, "divide-y", "divide-gray-200", "dark:divide-gray-700"], [4, "ngFor", "ngForOf"], [1, "block", "hover:bg-gray-50", "dark:hover:bg-gray-700", 3, "routerLink"], [1, "px-4", "py-4", "flex", "items-center", "sm:px-6"], [1, "min-w-0", "flex-1", "sm:flex", "sm:items-center", "sm:justify-between"], [1, "truncate"], [1, "flex", "text-sm"], ["class", "font-medium text-blue-600 dark:text-blue-200 truncate", 4, "ngIf"], ["class", "ml-1 flex-shrink-0 font-normal text-gray-500", 4, "ngIf"], [1, "mt-2", "flex"], [1, "flex", "items-center", "text-sm", "text-gray-500", "dark:text-gray-400"], [1, "mr-1.5", "h-5", "w-5", "text-gray-400", "dark:text-gray-500", 3, "icon"], ["class", "ml-5 h-5 w-5 flex-shrink-0", 4, "ngIf"], [1, "font-medium", "text-blue-600", "dark:text-blue-200", "truncate"], [1, "ml-1", "flex-shrink-0", "font-normal", "text-gray-500"], [1, "ml-5", "h-5", "w-5", "flex-shrink-0"], ["icon", "chevronRight", 1, "h-5", "w-5", "text-gray-400", "dark:text-gray-500"]],
  template: function WebUiStackedListComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ul", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, WebUiStackedListComponent_li_2_Template, 15, 10, "li", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.items);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterLink, _icon_src_lib_web_ui_icon_component__WEBPACK_IMPORTED_MODULE_3__.WebUiIconComponent, _angular_common__WEBPACK_IMPORTED_MODULE_1__.DatePipe],
  encapsulation: 2
});

/***/ }),

/***/ 221438:
/*!************************************************************************!*\
  !*** ./libs/web/ui/stacked-list/src/lib/web-ui-stacked-list.module.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebUiStackedListModule": () => (/* binding */ WebUiStackedListModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_ui_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @case-clinical/web/ui/icon */ 320558);
/* harmony import */ var _web_ui_stacked_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./web-ui-stacked-list.component */ 584309);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);





class WebUiStackedListModule {}
WebUiStackedListModule.ɵfac = function WebUiStackedListModule_Factory(t) {
  return new (t || WebUiStackedListModule)();
};
WebUiStackedListModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebUiStackedListModule
});
WebUiStackedListModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule, _case_clinical_web_ui_icon__WEBPACK_IMPORTED_MODULE_3__.WebUiIconModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebUiStackedListModule, {
    declarations: [_web_ui_stacked_list_component__WEBPACK_IMPORTED_MODULE_4__.WebUiStackedListComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule, _case_clinical_web_ui_icon__WEBPACK_IMPORTED_MODULE_3__.WebUiIconModule],
    exports: [_web_ui_stacked_list_component__WEBPACK_IMPORTED_MODULE_4__.WebUiStackedListComponent]
  });
})();

/***/ })

}]);