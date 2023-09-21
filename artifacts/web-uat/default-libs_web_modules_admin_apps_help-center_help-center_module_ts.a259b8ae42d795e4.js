"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_modules_admin_apps_help-center_help-center_module_ts"],{

/***/ 794329:
/*!************************************************************************!*\
  !*** ./libs/web/modules/admin/apps/help-center/faqs/faqs.component.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HelpCenterFaqsComponent": () => (/* binding */ HelpCenterFaqsComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 782722);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var libs_web_modules_admin_apps_help_center_help_center_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! libs/web/modules/admin/apps/help-center/help-center.service */ 841271);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/expansion */ 49652);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 836895);









function HelpCenterFaqsComponent_ng_container_10_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-expansion-panel")(2, "mat-expansion-panel-header", 11)(3, "mat-panel-title", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const faq_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("collapsedHeight", "56px");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](faq_r3.question);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", faq_r3.answer, " ");
  }
}
function HelpCenterFaqsComponent_ng_container_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-accordion", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, HelpCenterFaqsComponent_ng_container_10_ng_container_4_Template, 6, 3, "ng-container", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const faqCategory_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](faqCategory_r1.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", faqCategory_r1.faqs)("ngForTrackBy", ctx_r0.trackByFn);
  }
}
const _c0 = function () {
  return ["../"];
};
class HelpCenterFaqsComponent {
  /**
   * Constructor
   */
  constructor(_helpCenterService) {
    this._helpCenterService = _helpCenterService;
    this._unsubscribeAll = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit() {
    // Get the FAQs
    this._helpCenterService.faqs$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(this._unsubscribeAll)).subscribe(faqCategories => {
      this.faqCategories = faqCategories;
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
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index, item) {
    return item.id || index;
  }
}
HelpCenterFaqsComponent.ɵfac = function HelpCenterFaqsComponent_Factory(t) {
  return new (t || HelpCenterFaqsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](libs_web_modules_admin_apps_help_center_help_center_service__WEBPACK_IMPORTED_MODULE_3__.HelpCenterService));
};
HelpCenterFaqsComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: HelpCenterFaqsComponent,
  selectors: [["help-center-faqs"]],
  decls: 11,
  vars: 6,
  consts: [[1, "flex", "flex-col", "flex-auto", "min-w-0"], [1, "flex", "flex-col", "items-center", "p-6", "sm:p-10"], [1, "flex", "flex-col", "w-full", "max-w-4xl"], [1, "-ml-4", "sm:mt-8"], ["mat-button", "", 3, "routerLink", "color"], [3, "svgIcon"], [1, "ml-2"], [1, "mt-2", "text-4xl", "sm:text-7xl", "font-extrabold", "tracking-tight", "leading-tight"], [4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "mt-12", "sm:mt-16", "text-3xl", "font-bold", "leading-tight", "tracking-tight"], [1, "max-w-4xl", "mt-8"], [3, "collapsedHeight"], [1, "font-medium", "leading-tight"]],
  template: function HelpCenterFaqsComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "a", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "mat-icon", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "span", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Back to Help Center");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, " Frequently Asked Questions ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, HelpCenterFaqsComponent_ng_container_10_Template, 5, 3, "ng-container", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](5, _c0))("color", "primary");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:arrow-narrow-left");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.faqCategories)("ngForTrackBy", ctx.trackByFn);
    }
  },
  dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLink, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatAnchor, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__.MatAccordion, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__.MatExpansionPanel, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__.MatExpansionPanelHeader, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__.MatExpansionPanelTitle, _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__.MatIcon, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgForOf],
  encapsulation: 2
});

/***/ }),

/***/ 269039:
/*!***************************************************************************************!*\
  !*** ./libs/web/modules/admin/apps/help-center/guides/category/category.component.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HelpCenterGuidesCategoryComponent": () => (/* binding */ HelpCenterGuidesCategoryComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 782722);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var libs_web_modules_admin_apps_help_center_help_center_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! libs/web/modules/admin/apps/help-center/help-center.service */ 841271);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 836895);









const _c0 = function (a0) {
  return [a0];
};
function HelpCenterGuidesCategoryComponent_ng_container_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const guide_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](2, _c0, guide_r1.slug));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", guide_r1.title, " ");
  }
}
const _c1 = function () {
  return ["../"];
};
class HelpCenterGuidesCategoryComponent {
  /**
   * Constructor
   */
  constructor(_activatedRoute, _helpCenterService, _router) {
    this._activatedRoute = _activatedRoute;
    this._helpCenterService = _helpCenterService;
    this._router = _router;
    this._unsubscribeAll = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit() {
    // Get the Guides
    this._helpCenterService.guides$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(this._unsubscribeAll)).subscribe(guideCategories => {
      this.guideCategory = guideCategories[0];
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
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index, item) {
    return item.id || index;
  }
}
HelpCenterGuidesCategoryComponent.ɵfac = function HelpCenterGuidesCategoryComponent_Factory(t) {
  return new (t || HelpCenterGuidesCategoryComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](libs_web_modules_admin_apps_help_center_help_center_service__WEBPACK_IMPORTED_MODULE_4__.HelpCenterService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router));
};
HelpCenterGuidesCategoryComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: HelpCenterGuidesCategoryComponent,
  selectors: [["help-center-guides-category"]],
  decls: 12,
  vars: 7,
  consts: [[1, "flex", "flex-col", "flex-auto", "min-w-0"], [1, "flex", "flex-col", "items-center", "p-6", "sm:p-10"], [1, "flex", "flex-col", "w-full", "max-w-4xl"], [1, "-ml-4", "sm:mt-8"], ["mat-button", "", 3, "routerLink", "color"], [3, "svgIcon"], [1, "ml-2"], [1, "mt-2", "text-4xl", "sm:text-7xl", "font-extrabold", "tracking-tight", "leading-tight"], [1, "flex", "flex-col", "items-start", "mt-8", "sm:mt-12", "space-y-2"], [4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "font-medium", "hover:underline", "text-primary-500", 3, "routerLink"]],
  template: function HelpCenterGuidesCategoryComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "a", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "mat-icon", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "span", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Back to Guides & Resources");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, HelpCenterGuidesCategoryComponent_ng_container_11_Template, 3, 4, "ng-container", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](6, _c1))("color", "primary");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:arrow-narrow-left");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.guideCategory.title, " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.guideCategory.guides)("ngForTrackBy", ctx.trackByFn);
    }
  },
  dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterLink, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatAnchor, _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__.MatIcon, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf],
  encapsulation: 2
});

/***/ }),

/***/ 616506:
/*!*********************************************************************************!*\
  !*** ./libs/web/modules/admin/apps/help-center/guides/guide/guide.component.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HelpCenterGuidesGuideComponent": () => (/* binding */ HelpCenterGuidesGuideComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 782722);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var libs_web_modules_admin_apps_help_center_help_center_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! libs/web/modules/admin/apps/help-center/help-center.service */ 841271);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/icon */ 397392);







const _c0 = function () {
  return ["../"];
};
class HelpCenterGuidesGuideComponent {
  /**
   * Constructor
   */
  constructor(_helpCenterService) {
    this._helpCenterService = _helpCenterService;
    this._unsubscribeAll = new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subject();
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit() {
    // Get the Guides
    this._helpCenterService.guide$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.takeUntil)(this._unsubscribeAll)).subscribe(guideCategory => {
      this.guideCategory = guideCategory;
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
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index, item) {
    return item.id || index;
  }
}
HelpCenterGuidesGuideComponent.ɵfac = function HelpCenterGuidesGuideComponent_Factory(t) {
  return new (t || HelpCenterGuidesGuideComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](libs_web_modules_admin_apps_help_center_help_center_service__WEBPACK_IMPORTED_MODULE_3__.HelpCenterService));
};
HelpCenterGuidesGuideComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: HelpCenterGuidesGuideComponent,
  selectors: [["help-center-guides-guide"]],
  decls: 31,
  vars: 12,
  consts: [[1, "flex", "flex-col", "flex-auto", "min-w-0"], [1, "flex", "flex-col", "items-center", "p-6", "sm:p-10"], [1, "flex", "flex-col", "w-full", "max-w-4xl"], [1, "-ml-4", "sm:mt-8"], ["mat-button", "", 3, "routerLink", "color"], [3, "svgIcon"], [1, "ml-2"], [1, "mt-2", "text-4xl", "sm:text-7xl", "font-extrabold", "tracking-tight", "leading-tight"], [1, "mt-1", "sm:text-2xl", "tracking-tight", "text-secondary"], [1, "mt-8", "sm:mt-12", "max-w-none", "prose", "prose-sm", 3, "innerHTML"], [1, "flex", "flex-col", "sm:flex-row", "sm:items-center", "sm:justify-between", "mt-10", "pt-8", "border-t"], [1, "text-sm", "font-medium", "text-secondary"], [1, "flex", "items-center", "mt-2", "sm:mt-0"], [1, "font-medium", "text-secondary"], [1, "ml-4"], ["mat-icon-button", ""], [1, "mt-8", "flex", "items-center", "justify-between", "p-6", "sm:px-10", "rounded-2xl", "shadow", "hover:shadow-lg", "bg-card", "transition-shadow", "ease-in-out", "duration-150", 3, "routerLink"], [1, "text-secondary"], [1, "text-lg", "font-semibold"], [1, "ml-3", 3, "svgIcon"]],
  template: function HelpCenterGuidesGuideComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "a", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](5, "mat-icon", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "span", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](12, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "div", 10)(14, "div", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15, "Last updated 2 months ago");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "div", 12)(17, "div", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](18, "Was this page helpful?");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "div", 14)(20, "button", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](21, "mat-icon", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "button", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](23, "mat-icon", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](24, "a", 16)(25, "div")(26, "div", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](27, "Next");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](28, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](29, "Removing a media from a project");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](30, "mat-icon", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](11, _c0))("color", "primary");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("svgIcon", "heroicons_outline:arrow-narrow-left");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("Back to ", ctx.guideCategory.title, "");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.guideCategory.guides[0].title);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.guideCategory.guides[0].subtitle);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("innerHTML", ctx.guideCategory.guides[0].content, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeHtml"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("svgIcon", "heroicons_outline:thumb-up");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("svgIcon", "heroicons_outline:thumb-down");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", ".");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("svgIcon", "heroicons_outline:arrow-right");
    }
  },
  dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLink, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatAnchor, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatIconButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__.MatIcon],
  encapsulation: 2
});

/***/ }),

/***/ 851972:
/*!****************************************************************************!*\
  !*** ./libs/web/modules/admin/apps/help-center/guides/guides.component.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HelpCenterGuidesComponent": () => (/* binding */ HelpCenterGuidesComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 782722);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var libs_web_modules_admin_apps_help_center_help_center_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! libs/web/modules/admin/apps/help-center/help-center.service */ 841271);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 836895);








const _c0 = function (a0, a1) {
  return [a0, a1];
};
function HelpCenterGuidesComponent_ng_container_11_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const guide_r4 = ctx.$implicit;
    const guideCategory_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](2, _c0, guideCategory_r1.slug, guide_r4.slug));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", guide_r4.title, " ");
  }
}
function HelpCenterGuidesComponent_ng_container_11_a_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 14)(1, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "View All");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "mat-icon", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const guideCategory_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", guideCategory_r1.slug);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:arrow-narrow-right");
  }
}
const _c1 = function (a0) {
  return [a0];
};
function HelpCenterGuidesComponent_ng_container_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 10)(2, "a", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, HelpCenterGuidesComponent_ng_container_11_ng_container_4_Template, 3, 5, "ng-container", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, HelpCenterGuidesComponent_ng_container_11_a_5_Template, 4, 2, "a", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const guideCategory_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](5, _c1, guideCategory_r1.slug));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", guideCategory_r1.title, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", guideCategory_r1.guides)("ngForTrackBy", ctx_r0.trackByFn);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", guideCategory_r1.totalGuides > guideCategory_r1.visibleGuides);
  }
}
const _c2 = function () {
  return ["../"];
};
class HelpCenterGuidesComponent {
  /**
   * Constructor
   */
  constructor(_helpCenterService) {
    this._helpCenterService = _helpCenterService;
    this._unsubscribeAll = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit() {
    // Get the Guide categories
    this._helpCenterService.guides$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(this._unsubscribeAll)).subscribe(guideCategories => {
      this.guideCategories = guideCategories;
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
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index, item) {
    return item.id || index;
  }
}
HelpCenterGuidesComponent.ɵfac = function HelpCenterGuidesComponent_Factory(t) {
  return new (t || HelpCenterGuidesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](libs_web_modules_admin_apps_help_center_help_center_service__WEBPACK_IMPORTED_MODULE_3__.HelpCenterService));
};
HelpCenterGuidesComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: HelpCenterGuidesComponent,
  selectors: [["help-center-guides"]],
  decls: 12,
  vars: 6,
  consts: [[1, "flex", "flex-col", "flex-auto", "min-w-0"], [1, "flex", "flex-col", "items-center", "p-6", "sm:p-10"], [1, "flex", "flex-col", "w-full", "max-w-4xl"], [1, "-ml-4", "sm:mt-8"], ["mat-button", "", 3, "routerLink", "color"], [3, "svgIcon"], [1, "ml-2"], [1, "mt-2", "text-4xl", "sm:text-7xl", "font-extrabold", "tracking-tight", "leading-tight"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "grid-flow-row", "gap-y-12", "sm:gap-x-4", "mt-8", "sm:mt-12"], [4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "flex", "flex-col", "items-start"], [1, "flex", "items-center", "mb-1", "text-2xl", "font-semibold", 3, "routerLink"], ["class", "flex items-center mt-5 pl-4 pr-3 py-0.5 rounded-full cursor-pointer bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700", 3, "routerLink", 4, "ngIf"], [1, "mt-3", "font-medium", "hover:underline", "text-primary-500", 3, "routerLink"], [1, "flex", "items-center", "mt-5", "pl-4", "pr-3", "py-0.5", "rounded-full", "cursor-pointer", "bg-gray-200", "hover:bg-gray-300", "dark:bg-gray-800", "dark:hover:bg-gray-700", 3, "routerLink"], [1, "text-sm", "font-medium", "text-secondary"], [1, "ml-2", "icon-size-5", 3, "svgIcon"]],
  template: function HelpCenterGuidesComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "a", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "mat-icon", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "span", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Back to Help Center");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, " Guides & Resources ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, HelpCenterGuidesComponent_ng_container_11_Template, 6, 7, "ng-container", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](5, _c2))("color", "primary");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:arrow-narrow-left");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.guideCategories)("ngForTrackBy", ctx.trackByFn);
    }
  },
  dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLink, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatAnchor, _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__.MatIcon, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf],
  encapsulation: 2
});

/***/ }),

/***/ 921911:
/*!**************************************************************************!*\
  !*** ./libs/web/modules/admin/apps/help-center/help-center.component.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HelpCenterComponent": () => (/* binding */ HelpCenterComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 782722);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var libs_web_modules_admin_apps_help_center_help_center_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! libs/web/modules/admin/apps/help-center/help-center.service */ 841271);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/expansion */ 49652);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/form-field */ 759549);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/input */ 300284);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 836895);










function HelpCenterComponent_ng_container_59_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-expansion-panel")(2, "mat-expansion-panel-header", 28)(3, "mat-panel-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const faq_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("collapsedHeight", "56px");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](faq_r1.question);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", faq_r1.answer, " ");
  }
}
const _c0 = function () {
  return ["faqs"];
};
const _c1 = function () {
  return ["guides"];
};
const _c2 = function () {
  return ["support"];
};
class HelpCenterComponent {
  /**
   * Constructor
   */
  constructor(_helpCenterService) {
    this._helpCenterService = _helpCenterService;
    this._unsubscribeAll = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit() {
    // Get the FAQs
    this._helpCenterService.faqs$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(this._unsubscribeAll)).subscribe(faqCategories => {
      this.faqCategory = faqCategories[0];
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
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index, item) {
    return item.id || index;
  }
}
HelpCenterComponent.ɵfac = function HelpCenterComponent_Factory(t) {
  return new (t || HelpCenterComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](libs_web_modules_admin_apps_help_center_help_center_service__WEBPACK_IMPORTED_MODULE_3__.HelpCenterService));
};
HelpCenterComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: HelpCenterComponent,
  selectors: [["help-center"]],
  decls: 60,
  vars: 13,
  consts: [[1, "flex", "flex-col", "flex-auto", "min-w-0"], [1, "relative", "pt-8", "pb-28", "px-4", "sm:pt-20", "sm:pb-48", "sm:px-16", "overflow-hidden", "bg-gray-800", "dark:bg-gray-900", "dark"], ["viewBox", "0 0 960 540", "width", "100%", "height", "100%", "preserveAspectRatio", "xMidYMax slice", "xmlns", "http://www.w3.org/2000/svg", 1, "absolute", "inset-0", "pointer-events-none"], ["fill", "none", "stroke", "currentColor", "stroke-width", "100", 1, "text-gray-700", "opacity-25"], ["r", "234", "cx", "196", "cy", "23"], ["r", "234", "cx", "790", "cy", "491"], [1, "z-10", "relative", "flex", "flex-col", "items-center"], [1, "text-xl", "font-semibold"], [1, "mt-1", "text-4xl", "sm:text-7xl", "font-extrabold", "tracking-tight", "leading-tight", "text-center"], [1, "mt-3", "sm:text-2xl", "text-center", "tracking-tight", "text-secondary"], [1, "fuse-mat-no-subscript", "fuse-mat-rounded", "fuse-mat-bold", "w-full", "max-w-80", "sm:max-w-120", "mt-10", "sm:mt-20"], ["matInput", "", 3, "placeholder"], ["matPrefix", "", 3, "svgIcon"], [1, "flex", "flex-col", "items-center", "pb-6", "px-6", "sm:pb-10", "sm:px-10"], [1, "grid", "grid-cols-1", "md:grid-cols-3", "gap-y-8", "md:gap-y-0", "md:gap-x-6", "w-full", "max-w-sm", "md:max-w-4xl", "-mt-16", "sm:-mt-24"], [1, "relative", "flex", "flex-col", "rounded-2xl", "shadow", "hover:shadow-lg", "overflow-hidden", "bg-card", "transition-shadow", "ease-in-out", "duration-150"], [1, "flex", "flex-col", "flex-auto", "items-center", "p-8", "text-center"], [1, "text-2xl", "font-semibold"], [1, "md:max-w-40", "mt-1", "text-secondary"], [1, "flex", "items-center", "justify-center", "py-4", "px-8", "text-primary-500", "dark:text-primary-400", "bg-gray-50", "dark:bg-transparent", "dark:border-t"], [1, "flex", "items-center", 3, "routerLink"], [1, "absolute", "inset-0"], [1, "font-medium"], [1, "ml-2", "icon-size-5", "text-current", 3, "svgIcon"], [1, "mt-24", "text-3xl", "sm:text-5xl", "font-extrabold", "leading-tight", "tracking-tight", "text-center"], [1, "mt-2", "text-xl", "text-center", "text-secondary"], [1, "max-w-4xl", "mt-12"], [4, "ngFor", "ngForOf", "ngForTrackBy"], [3, "collapsedHeight"]],
  template: function HelpCenterComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "svg", 2)(3, "g", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "circle", 4)(5, "circle", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 6)(7, "h2", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "HELP CENTER");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, " How can we help you today? ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, " Search for a topic or question, check out our FAQs and guides, contact us for detailed support ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "mat-form-field", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "input", 11)(15, "mat-icon", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 13)(17, "div", 14)(18, "div", 15)(19, "div", 16)(20, "div", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "FAQs");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "Frequently asked questions and answers");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 19)(25, "a", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](26, "span", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "span", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, "Go to FAQs");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](29, "mat-icon", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "div", 15)(31, "div", 16)(32, "div", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, "Guides");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35, "Articles and resources to guide you");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "div", 19)(37, "a", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](38, "span", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "span", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40, "Check guides");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](41, "mat-icon", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "div", 15)(43, "div", 16)(44, "div", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](45, "Support");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](47, "Contact us for more detailed support");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "div", 19)(49, "a", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](50, "span", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "span", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](52, "Contact us");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](53, "mat-icon", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "div", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](55, "Most frequently asked questions");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](57, "Here are the most frequently asked questions you may check before getting started");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "mat-accordion", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](59, HelpCenterComponent_ng_container_59_Template, 6, 3, "ng-container", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](14);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("placeholder", "Enter a question, topic or keyword");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:search");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](10, _c0));
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:arrow-narrow-right");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](11, _c1));
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:arrow-narrow-right");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](12, _c2));
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:arrow-narrow-right");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.faqCategory.faqs)("ngForTrackBy", ctx.trackByFn);
    }
  },
  dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLink, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_5__.MatAccordion, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_5__.MatExpansionPanel, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_5__.MatExpansionPanelHeader, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_5__.MatExpansionPanelTitle, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatPrefix, _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__.MatIcon, _angular_material_input__WEBPACK_IMPORTED_MODULE_8__.MatInput, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgForOf],
  encapsulation: 2
});

/***/ }),

/***/ 521829:
/*!***********************************************************************!*\
  !*** ./libs/web/modules/admin/apps/help-center/help-center.module.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HelpCenterModule": () => (/* binding */ HelpCenterModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/expansion */ 49652);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/form-field */ 759549);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/input */ 300284);
/* harmony import */ var _fuse_components_alert__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @fuse/components/alert */ 718413);
/* harmony import */ var libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! libs/shared/shared.module */ 423387);
/* harmony import */ var libs_web_modules_admin_apps_help_center_help_center_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! libs/web/modules/admin/apps/help-center/help-center.component */ 921911);
/* harmony import */ var libs_web_modules_admin_apps_help_center_faqs_faqs_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! libs/web/modules/admin/apps/help-center/faqs/faqs.component */ 794329);
/* harmony import */ var libs_web_modules_admin_apps_help_center_guides_guides_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! libs/web/modules/admin/apps/help-center/guides/guides.component */ 851972);
/* harmony import */ var libs_web_modules_admin_apps_help_center_guides_category_category_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! libs/web/modules/admin/apps/help-center/guides/category/category.component */ 269039);
/* harmony import */ var libs_web_modules_admin_apps_help_center_guides_guide_guide_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! libs/web/modules/admin/apps/help-center/guides/guide/guide.component */ 616506);
/* harmony import */ var libs_web_modules_admin_apps_help_center_support_support_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! libs/web/modules/admin/apps/help-center/support/support.component */ 407049);
/* harmony import */ var libs_web_modules_admin_apps_help_center_help_center_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! libs/web/modules/admin/apps/help-center/help-center.routing */ 285068);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);

















class HelpCenterModule {}
HelpCenterModule.ɵfac = function HelpCenterModule_Factory(t) {
  return new (t || HelpCenterModule)();
};
HelpCenterModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: HelpCenterModule
});
HelpCenterModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule.forChild(libs_web_modules_admin_apps_help_center_help_center_routing__WEBPACK_IMPORTED_MODULE_2__.helpCenterRoutes), _angular_material_button__WEBPACK_IMPORTED_MODULE_3__.MatButtonModule, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_4__.MatExpansionModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__.MatFormFieldModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__.MatIconModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_7__.MatInputModule, _fuse_components_alert__WEBPACK_IMPORTED_MODULE_8__.FuseAlertModule, libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_9__.SharedModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](HelpCenterModule, {
    declarations: [libs_web_modules_admin_apps_help_center_help_center_component__WEBPACK_IMPORTED_MODULE_10__.HelpCenterComponent, libs_web_modules_admin_apps_help_center_faqs_faqs_component__WEBPACK_IMPORTED_MODULE_11__.HelpCenterFaqsComponent, libs_web_modules_admin_apps_help_center_guides_guides_component__WEBPACK_IMPORTED_MODULE_12__.HelpCenterGuidesComponent, libs_web_modules_admin_apps_help_center_guides_category_category_component__WEBPACK_IMPORTED_MODULE_13__.HelpCenterGuidesCategoryComponent, libs_web_modules_admin_apps_help_center_guides_guide_guide_component__WEBPACK_IMPORTED_MODULE_14__.HelpCenterGuidesGuideComponent, libs_web_modules_admin_apps_help_center_support_support_component__WEBPACK_IMPORTED_MODULE_15__.HelpCenterSupportComponent],
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_3__.MatButtonModule, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_4__.MatExpansionModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__.MatFormFieldModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__.MatIconModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_7__.MatInputModule, _fuse_components_alert__WEBPACK_IMPORTED_MODULE_8__.FuseAlertModule, libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_9__.SharedModule]
  });
})();

/***/ }),

/***/ 565826:
/*!**************************************************************************!*\
  !*** ./libs/web/modules/admin/apps/help-center/help-center.resolvers.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HelpCenterFaqsResolver": () => (/* binding */ HelpCenterFaqsResolver),
/* harmony export */   "HelpCenterGuidesCategoryResolver": () => (/* binding */ HelpCenterGuidesCategoryResolver),
/* harmony export */   "HelpCenterGuidesGuideResolver": () => (/* binding */ HelpCenterGuidesGuideResolver),
/* harmony export */   "HelpCenterGuidesResolver": () => (/* binding */ HelpCenterGuidesResolver),
/* harmony export */   "HelpCenterMostAskedFaqsResolver": () => (/* binding */ HelpCenterMostAskedFaqsResolver)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var libs_web_modules_admin_apps_help_center_help_center_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! libs/web/modules/admin/apps/help-center/help-center.service */ 841271);




class HelpCenterMostAskedFaqsResolver {
  /**
   * Constructor
   */
  constructor(_helpCenterService) {
    this._helpCenterService = _helpCenterService;
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(route, state) {
    return this._helpCenterService.getFaqsByCategory('most-asked');
  }
}
HelpCenterMostAskedFaqsResolver.ɵfac = function HelpCenterMostAskedFaqsResolver_Factory(t) {
  return new (t || HelpCenterMostAskedFaqsResolver)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](libs_web_modules_admin_apps_help_center_help_center_service__WEBPACK_IMPORTED_MODULE_1__.HelpCenterService));
};
HelpCenterMostAskedFaqsResolver.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: HelpCenterMostAskedFaqsResolver,
  factory: HelpCenterMostAskedFaqsResolver.ɵfac,
  providedIn: 'root'
});
class HelpCenterFaqsResolver {
  /**
   * Constructor
   */
  constructor(_helpCenterService) {
    this._helpCenterService = _helpCenterService;
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(route, state) {
    return this._helpCenterService.getAllFaqs();
  }
}
HelpCenterFaqsResolver.ɵfac = function HelpCenterFaqsResolver_Factory(t) {
  return new (t || HelpCenterFaqsResolver)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](libs_web_modules_admin_apps_help_center_help_center_service__WEBPACK_IMPORTED_MODULE_1__.HelpCenterService));
};
HelpCenterFaqsResolver.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: HelpCenterFaqsResolver,
  factory: HelpCenterFaqsResolver.ɵfac,
  providedIn: 'root'
});
class HelpCenterGuidesResolver {
  /**
   * Constructor
   */
  constructor(_helpCenterService) {
    this._helpCenterService = _helpCenterService;
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(route, state) {
    return this._helpCenterService.getAllGuides();
  }
}
HelpCenterGuidesResolver.ɵfac = function HelpCenterGuidesResolver_Factory(t) {
  return new (t || HelpCenterGuidesResolver)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](libs_web_modules_admin_apps_help_center_help_center_service__WEBPACK_IMPORTED_MODULE_1__.HelpCenterService));
};
HelpCenterGuidesResolver.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: HelpCenterGuidesResolver,
  factory: HelpCenterGuidesResolver.ɵfac,
  providedIn: 'root'
});
class HelpCenterGuidesCategoryResolver {
  /**
   * Constructor
   */
  constructor(_helpCenterService) {
    this._helpCenterService = _helpCenterService;
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(route, state) {
    return this._helpCenterService.getGuidesByCategory(route.paramMap.get('categorySlug'));
  }
}
HelpCenterGuidesCategoryResolver.ɵfac = function HelpCenterGuidesCategoryResolver_Factory(t) {
  return new (t || HelpCenterGuidesCategoryResolver)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](libs_web_modules_admin_apps_help_center_help_center_service__WEBPACK_IMPORTED_MODULE_1__.HelpCenterService));
};
HelpCenterGuidesCategoryResolver.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: HelpCenterGuidesCategoryResolver,
  factory: HelpCenterGuidesCategoryResolver.ɵfac,
  providedIn: 'root'
});
class HelpCenterGuidesGuideResolver {
  /**
   * Constructor
   */
  constructor(_helpCenterService) {
    this._helpCenterService = _helpCenterService;
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(route, state) {
    return this._helpCenterService.getGuide(route.parent.paramMap.get('categorySlug'), route.paramMap.get('guideSlug'));
  }
}
HelpCenterGuidesGuideResolver.ɵfac = function HelpCenterGuidesGuideResolver_Factory(t) {
  return new (t || HelpCenterGuidesGuideResolver)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](libs_web_modules_admin_apps_help_center_help_center_service__WEBPACK_IMPORTED_MODULE_1__.HelpCenterService));
};
HelpCenterGuidesGuideResolver.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: HelpCenterGuidesGuideResolver,
  factory: HelpCenterGuidesGuideResolver.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 285068:
/*!************************************************************************!*\
  !*** ./libs/web/modules/admin/apps/help-center/help-center.routing.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "helpCenterRoutes": () => (/* binding */ helpCenterRoutes)
/* harmony export */ });
/* harmony import */ var libs_web_modules_admin_apps_help_center_help_center_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! libs/web/modules/admin/apps/help-center/help-center.component */ 921911);
/* harmony import */ var libs_web_modules_admin_apps_help_center_faqs_faqs_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! libs/web/modules/admin/apps/help-center/faqs/faqs.component */ 794329);
/* harmony import */ var libs_web_modules_admin_apps_help_center_guides_guides_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! libs/web/modules/admin/apps/help-center/guides/guides.component */ 851972);
/* harmony import */ var libs_web_modules_admin_apps_help_center_guides_category_category_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! libs/web/modules/admin/apps/help-center/guides/category/category.component */ 269039);
/* harmony import */ var libs_web_modules_admin_apps_help_center_guides_guide_guide_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! libs/web/modules/admin/apps/help-center/guides/guide/guide.component */ 616506);
/* harmony import */ var libs_web_modules_admin_apps_help_center_support_support_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! libs/web/modules/admin/apps/help-center/support/support.component */ 407049);
/* harmony import */ var libs_web_modules_admin_apps_help_center_help_center_resolvers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! libs/web/modules/admin/apps/help-center/help-center.resolvers */ 565826);







const helpCenterRoutes = [{
  path: '',
  component: libs_web_modules_admin_apps_help_center_help_center_component__WEBPACK_IMPORTED_MODULE_0__.HelpCenterComponent,
  resolve: {
    faqs: libs_web_modules_admin_apps_help_center_help_center_resolvers__WEBPACK_IMPORTED_MODULE_1__.HelpCenterMostAskedFaqsResolver
  }
}, {
  path: 'faqs',
  component: libs_web_modules_admin_apps_help_center_faqs_faqs_component__WEBPACK_IMPORTED_MODULE_2__.HelpCenterFaqsComponent,
  resolve: {
    faqs: libs_web_modules_admin_apps_help_center_help_center_resolvers__WEBPACK_IMPORTED_MODULE_1__.HelpCenterFaqsResolver
  }
}, {
  path: 'guides',
  children: [{
    path: '',
    component: libs_web_modules_admin_apps_help_center_guides_guides_component__WEBPACK_IMPORTED_MODULE_3__.HelpCenterGuidesComponent,
    resolve: {
      guides: libs_web_modules_admin_apps_help_center_help_center_resolvers__WEBPACK_IMPORTED_MODULE_1__.HelpCenterGuidesResolver
    }
  }, {
    path: ':categorySlug',
    children: [{
      path: '',
      component: libs_web_modules_admin_apps_help_center_guides_category_category_component__WEBPACK_IMPORTED_MODULE_4__.HelpCenterGuidesCategoryComponent,
      resolve: {
        guides: libs_web_modules_admin_apps_help_center_help_center_resolvers__WEBPACK_IMPORTED_MODULE_1__.HelpCenterGuidesCategoryResolver
      }
    }, {
      path: ':guideSlug',
      component: libs_web_modules_admin_apps_help_center_guides_guide_guide_component__WEBPACK_IMPORTED_MODULE_5__.HelpCenterGuidesGuideComponent,
      resolve: {
        guide: libs_web_modules_admin_apps_help_center_help_center_resolvers__WEBPACK_IMPORTED_MODULE_1__.HelpCenterGuidesGuideResolver
      }
    }]
  }]
}, {
  path: 'support',
  component: libs_web_modules_admin_apps_help_center_support_support_component__WEBPACK_IMPORTED_MODULE_6__.HelpCenterSupportComponent
}];

/***/ }),

/***/ 841271:
/*!************************************************************************!*\
  !*** ./libs/web/modules/admin/apps/help-center/help-center.service.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HelpCenterService": () => (/* binding */ HelpCenterService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 604707);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 318505);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 80529);




class HelpCenterService {
  /**
   * Constructor
   */
  constructor(_httpClient) {
    this._httpClient = _httpClient;
    this._faqs = new rxjs__WEBPACK_IMPORTED_MODULE_0__.ReplaySubject(1);
    this._guides = new rxjs__WEBPACK_IMPORTED_MODULE_0__.ReplaySubject(1);
    this._guide = new rxjs__WEBPACK_IMPORTED_MODULE_0__.ReplaySubject(1);
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------
  /**
   * Getter for FAQs
   */
  get faqs$() {
    return this._faqs.asObservable();
  }
  /**
   * Getter for guides
   */
  get guides$() {
    return this._guides.asObservable();
  }
  /**
   * Getter for guide
   */
  get guide$() {
    return this._guide.asObservable();
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Get all FAQs
   */
  getAllFaqs() {
    return this._httpClient.get('api/apps/help-center/faqs').pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(response => {
      this._faqs.next(response);
    }));
  }
  /**
   * Get FAQs by category using category slug
   *
   * @param slug
   */
  getFaqsByCategory(slug) {
    return this._httpClient.get('api/apps/help-center/faqs', {
      params: {
        slug
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(response => {
      this._faqs.next(response);
    }));
  }
  /**
   * Get all guides limited per category by the given number
   *
   * @param limit
   */
  getAllGuides(limit = '4') {
    return this._httpClient.get('api/apps/help-center/guides', {
      params: {
        limit
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(response => {
      this._guides.next(response);
    }));
  }
  /**
   * Get guides by category using category slug
   *
   * @param slug
   */
  getGuidesByCategory(slug) {
    return this._httpClient.get('api/apps/help-center/guides', {
      params: {
        slug
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(response => {
      this._guides.next(response);
    }));
  }
  /**
   * Get guide by category and guide slug
   *
   * @param categorySlug
   * @param guideSlug
   */
  getGuide(categorySlug, guideSlug) {
    return this._httpClient.get('api/apps/help-center/guide', {
      params: {
        categorySlug,
        guideSlug
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(response => {
      this._guide.next(response);
    }));
  }
}
HelpCenterService.ɵfac = function HelpCenterService_Factory(t) {
  return new (t || HelpCenterService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient));
};
HelpCenterService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: HelpCenterService,
  factory: HelpCenterService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 407049:
/*!******************************************************************************!*\
  !*** ./libs/web/modules/admin/apps/help-center/support/support.component.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HelpCenterSupportComponent": () => (/* binding */ HelpCenterSupportComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 224006);
/* harmony import */ var _fuse_animations__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @fuse/animations */ 662235);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var libs_web_modules_admin_apps_help_center_help_center_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! libs/web/modules/admin/apps/help-center/help-center.service */ 841271);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/form-field */ 759549);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/input */ 300284);
/* harmony import */ var _fuse_components_alert_alert_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @fuse/components/alert/alert.component */ 967884);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 836895);













const _c0 = ["supportNgForm"];
function HelpCenterSupportComponent_fuse_alert_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "fuse-alert", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("type", ctx_r0.alert.type)("showIcon", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r0.alert.message, " ");
  }
}
function HelpCenterSupportComponent_mat_error_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function HelpCenterSupportComponent_mat_error_28_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function HelpCenterSupportComponent_mat_error_29_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Enter a valid email address ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function HelpCenterSupportComponent_mat_error_34_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function HelpCenterSupportComponent_mat_error_39_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
const _c1 = function () {
  return ["../"];
};
class HelpCenterSupportComponent {
  /**
   * Constructor
   */
  constructor(_formBuilder, _helpCenterService) {
    this._formBuilder = _formBuilder;
    this._helpCenterService = _helpCenterService;
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit() {
    // Create the support form
    this.supportForm = this._formBuilder.group({
      name: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__.Validators.required],
      email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.Validators.email]],
      subject: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__.Validators.required],
      message: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__.Validators.required]
    });
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Clear the form
   */
  clearForm() {
    // Reset the form
    this.supportNgForm.resetForm();
  }
  /**
   * Send the form
   */
  sendForm() {
    // Send your form here using an http request
    console.log('Your message has been sent!');
    // Show a success message (it can also be an error message)
    // and remove it after 5 seconds
    this.alert = {
      type: 'success',
      message: 'Your request has been delivered! A member of our support staff will respond as soon as possible.'
    };
    setTimeout(() => {
      this.alert = null;
    }, 7000);
    // Clear the form
    this.clearForm();
  }
}
HelpCenterSupportComponent.ɵfac = function HelpCenterSupportComponent_Factory(t) {
  return new (t || HelpCenterSupportComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](libs_web_modules_admin_apps_help_center_help_center_service__WEBPACK_IMPORTED_MODULE_2__.HelpCenterService));
};
HelpCenterSupportComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: HelpCenterSupportComponent,
  selectors: [["help-center-support"]],
  viewQuery: function HelpCenterSupportComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.supportNgForm = _t.first);
    }
  },
  decls: 45,
  vars: 24,
  consts: [[1, "flex", "flex-col", "flex-auto", "min-w-0"], [1, "flex", "flex-col", "flex-auto", "items-center", "p-6", "sm:p-10"], [1, "flex", "flex-col", "w-full", "max-w-4xl"], [1, "-ml-4", "sm:mt-8"], ["mat-button", "", 3, "routerLink", "color"], [3, "svgIcon"], [1, "ml-2"], [1, "mt-2", "text-4xl", "sm:text-7xl", "font-extrabold", "tracking-tight", "leading-tight"], [1, "mt-8", "sm:mt-12", "p-6", "pb-7", "sm:p-10", "sm:pb-7", "shadow", "rounded-2xl", "bg-card"], ["class", "mb-8", 3, "type", "showIcon", 4, "ngIf"], [1, "space-y-3", 3, "formGroup"], ["supportNgForm", "ngForm"], [1, "mb-6"], [1, "text-2xl", "font-bold", "tracking-tight"], [1, "text-secondary"], [1, "w-full"], ["matInput", "", 3, "formControlName", "required"], [4, "ngIf"], ["type", "email", "matInput", "", 3, "formControlName", "required"], [1, "fuse-mat-textarea", "w-full"], ["matInput", "", "matTextareaAutosize", "", 3, "formControlName", "required", "rows"], [1, "flex", "items-center", "justify-end"], ["mat-button", "", 3, "color", "disabled", "click"], ["mat-flat-button", "", 1, "ml-2", 3, "color", "disabled", "click"], [1, "mb-8", 3, "type", "showIcon"]],
  template: function HelpCenterSupportComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "a", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "mat-icon", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "span", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Back to Help Center");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, " Contact support ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, HelpCenterSupportComponent_fuse_alert_11_Template, 2, 3, "fuse-alert", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "form", 10, 11)(14, "div", 12)(15, "div", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "Submit your request");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "Your request will be processed and our support staff will get back to you in 24 hours.");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "mat-form-field", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "input", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "mat-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "Name");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](23, HelpCenterSupportComponent_mat_error_23_Template, 2, 0, "mat-error", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "mat-form-field", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](25, "input", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "mat-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "Email");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](28, HelpCenterSupportComponent_mat_error_28_Template, 2, 0, "mat-error", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](29, HelpCenterSupportComponent_mat_error_29_Template, 2, 0, "mat-error", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "mat-form-field", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](31, "input", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "mat-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, "Subject");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](34, HelpCenterSupportComponent_mat_error_34_Template, 2, 0, "mat-error", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "mat-form-field", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](36, "textarea", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "mat-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, "Message");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](39, HelpCenterSupportComponent_mat_error_39_Template, 2, 0, "mat-error", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "div", 21)(41, "button", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HelpCenterSupportComponent_Template_button_click_41_listener() {
        return ctx.clearForm();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](42, " Clear ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "button", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HelpCenterSupportComponent_Template_button_click_43_listener() {
        return ctx.sendForm();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](44, " Submit ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](23, _c1))("color", "primary");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:arrow-narrow-left");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.alert);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx.supportForm);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControlName", "name")("required", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.supportForm.get("name").hasError("required"));
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControlName", "email")("required", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.supportForm.get("email").hasError("required"));
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.supportForm.get("email").hasError("email"));
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControlName", "subject")("required", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.supportForm.get("subject").hasError("required"));
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControlName", "message")("required", true)("rows", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.supportForm.get("message").hasError("required"));
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", "accent")("disabled", ctx.supportForm.pristine || ctx.supportForm.untouched);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", "primary")("disabled", ctx.supportForm.pristine || ctx.supportForm.invalid);
    }
  },
  dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterLink, _angular_material_button__WEBPACK_IMPORTED_MODULE_4__.MatAnchor, _angular_material_button__WEBPACK_IMPORTED_MODULE_4__.MatButton, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__.MatError, _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__.MatIcon, _angular_material_input__WEBPACK_IMPORTED_MODULE_7__.MatInput, _fuse_components_alert_alert_component__WEBPACK_IMPORTED_MODULE_8__.FuseAlertComponent, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormControlName],
  encapsulation: 2,
  data: {
    animation: _fuse_animations__WEBPACK_IMPORTED_MODULE_10__.fuseAnimations
  }
});

/***/ })

}]);