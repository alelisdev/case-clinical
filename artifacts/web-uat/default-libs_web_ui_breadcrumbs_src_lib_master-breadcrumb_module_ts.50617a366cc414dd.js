"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_ui_breadcrumbs_src_lib_master-breadcrumb_module_ts"],{

/***/ 482367:
/*!************************************************************************!*\
  !*** ./libs/web/ui/breadcrumbs/src/lib/master-breadcrumb.component.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ng7DynamicBreadcrumbComponent": () => (/* binding */ Ng7DynamicBreadcrumbComponent),
/* harmony export */   "ViewMode": () => (/* binding */ ViewMode)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 439300);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 654004);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _master_breadcrumb_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./master-breadcrumb.service */ 890347);
/* harmony import */ var _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/ui/formly-designer */ 117815);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 836895);









function Ng7DynamicBreadcrumbComponent_ng_container_1_ng_container_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "li", 4)(2, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "svg", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "path", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "a", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const crumb_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](crumb_r4.name);
  }
}
function Ng7DynamicBreadcrumbComponent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "nav", 2)(2, "ol", 3)(3, "li", 4)(4, "div", 5)(5, "a", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "svg", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "path", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "span", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Home");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, Ng7DynamicBreadcrumbComponent_ng_container_1_ng_container_10_Template, 7, 1, "ng-container", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r0.crumbs);
  }
}
function Ng7DynamicBreadcrumbComponent_ng_container_2_ng_container_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "li")(2, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "svg", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "path", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "a", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const crumb_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](crumb_r6.name);
  }
}
function Ng7DynamicBreadcrumbComponent_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 14)(2, "nav", 15)(3, "ol", 16)(4, "li")(5, "div")(6, "a", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "svg", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "path", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "span", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Home");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, Ng7DynamicBreadcrumbComponent_ng_container_2_ng_container_11_Template, 7, 1, "ng-container", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r1.crumbs);
  }
}
function Ng7DynamicBreadcrumbComponent_ng_container_3_ng_container_10_li_7_ul_9_li_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li")(1, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const item_r13 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](item_r13.title);
  }
}
function Ng7DynamicBreadcrumbComponent_ng_container_3_ng_container_10_li_7_ul_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ul", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, Ng7DynamicBreadcrumbComponent_ng_container_3_ng_container_10_li_7_ul_9_li_1_Template, 3, 1, "li", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const views_r11 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", views_r11);
  }
}
function Ng7DynamicBreadcrumbComponent_ng_container_3_ng_container_10_li_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 4)(1, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "svg", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "path", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 25)(5, "span", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Geysers del Tatio (Standard)");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, Ng7DynamicBreadcrumbComponent_ng_container_3_ng_container_10_li_7_ul_9_Template, 2, 1, "ul", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](10, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](10, 1, ctx_r9.views$));
  }
}
const _c0 = function (a0) {
  return [a0];
};
function Ng7DynamicBreadcrumbComponent_ng_container_3_ng_container_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "li", 4)(2, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "svg", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "path", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "a", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, Ng7DynamicBreadcrumbComponent_ng_container_3_ng_container_10_li_7_Template, 11, 3, "li", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const crumb_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](3, _c0, crumb_r8.path));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](crumb_r8.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", crumb_r8.formName);
  }
}
function Ng7DynamicBreadcrumbComponent_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "nav", 2)(2, "ol", 21)(3, "li", 4)(4, "div", 5)(5, "a", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "svg", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "path", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "span", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Home");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, Ng7DynamicBreadcrumbComponent_ng_container_3_ng_container_10_Template, 8, 5, "ng-container", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", ctx_r2.homePath);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r2.breadcrumb);
  }
}
var ViewMode;
(function (ViewMode) {
  ViewMode[ViewMode["FullWidthBar"] = 0] = "FullWidthBar";
  ViewMode[ViewMode["SimpleChevron"] = 1] = "SimpleChevron";
  ViewMode[ViewMode["StandardTop"] = 2] = "StandardTop";
})(ViewMode || (ViewMode = {}));
class Ng7DynamicBreadcrumbComponent {
  getCurrentViewId(formName) {
    return this.formlyJsonFormViewsStore.getCurrentViewId(formName);
  }
  constructor(activatedRoute, router, ng7DynamicBreadcrumbService, formlyJsonFormViewsStore) {
    this.activatedRoute = activatedRoute;
    this.router = router;
    this.ng7DynamicBreadcrumbService = ng7DynamicBreadcrumbService;
    this.formlyJsonFormViewsStore = formlyJsonFormViewsStore;
    this.breadcrumb = [];
    this.bgColor = '#eee';
    this.fontSize = '18px';
    this.fontColor = '#0275d8';
    this.lastLinkColor = '#000';
    this.symbol = ' / ';
    this.VIEW_MODE = ViewMode;
    this.viewMode = ViewMode.StandardTop;
    this.views$ = this.formlyJsonFormViewsStore.getViews('legalCase_overview_test_2');
    this.formlyJsonFormViewsStore.views$.subscribe(views => console.log({
      views
    }));
    this.breadCrumbData();
  }
  ngOnInit() {
    this.ng7DynamicBreadcrumbService.breadcrumbLabels.subscribe(labelData => {
      for (const label in labelData) {
        if (labelData.hasOwnProperty(label)) {
          this.breadcrumb.map(crumb => {
            const labelParams = crumb.name.match(/[^{{]+(?=\}})/g);
            if (labelParams) {
              for (const labelParam of labelParams) {
                const dynamicData = labelData[label];
                if (labelParam === label) {
                  crumb.name = crumb.name.replace('{{' + labelParam + '}}', dynamicData);
                }
              }
            }
          });
        }
      }
    });
    this.ng7DynamicBreadcrumbService.newBreadcrumb.subscribe(breadcrumb => {
      if (breadcrumb.length > 0) {
        this.updateData(this.activatedRoute, breadcrumb);
      }
    });
    this.params = this.activatedRoute.snapshot.params;
    this.updateData(this.activatedRoute, null);
  }
  breadCrumbData() {
    this.router.events.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.filter)(event => event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_2__.NavigationEnd)).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(() => this.activatedRoute)).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(route => {
      while (route.firstChild) {
        route = route.firstChild;
      }
      return route;
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.filter)(route => route.outlet === _angular_router__WEBPACK_IMPORTED_MODULE_2__.PRIMARY_OUTLET)).subscribe(route => {
      this.params = route.snapshot.params;
      console.log("2 ", route.snapshot.params);
      this.updateData(route, null);
    });
  }
  updateData(route, newBreadcrumb) {
    if (route.snapshot.data.breadcrumb || newBreadcrumb) {
      const data = route.snapshot.data.breadcrumb ? route.snapshot.data.breadcrumb : newBreadcrumb;
      const breadcrumb = JSON.parse(JSON.stringify(data));
      breadcrumb.map(crumb => {
        const urlChunks = crumb.path.split('/');
        for (const chunk of urlChunks) {
          if (chunk.includes(':')) {
            const paramID = chunk.replace(':', '');
            // const routerParamID = route.snapshot.params[paramID];
            const routerParamID = this.params[paramID];
            crumb.path = crumb.path.replace(`:${paramID}`, routerParamID);
          }
        }
        const labelParams = crumb.name.match(/[^{{]+(?=\}})/g);
        if (labelParams) {
          for (const labelParam of labelParams) {
            // const routerParamID = route.snapshot.params[labelParam.trim()];
            const routerParamID = this.params[labelParam.trim()];
            if (routerParamID) {
              crumb.label = crumb.label.replace('{{' + labelParam + '}}', routerParamID);
            } else {
              // crumb.label = crumb.label.replace('{{' + labelParam + '}}', '');
            }
          }
        }
      });
      this.breadcrumb = breadcrumb;
    } else {
      this.breadcrumb = [];
    }
  }
}
Ng7DynamicBreadcrumbComponent.ɵfac = function Ng7DynamicBreadcrumbComponent_Factory(t) {
  return new (t || Ng7DynamicBreadcrumbComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_master_breadcrumb_service__WEBPACK_IMPORTED_MODULE_4__.Ng7DynamicBreadcrumbService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_5__.FormlyJsonFormViewsStore));
};
Ng7DynamicBreadcrumbComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: Ng7DynamicBreadcrumbComponent,
  selectors: [["app-ng7-dynamic-breadcrumb"]],
  inputs: {
    bgColor: "bgColor",
    fontSize: "fontSize",
    fontColor: "fontColor",
    lastLinkColor: "lastLinkColor",
    symbol: "symbol",
    viewMode: "viewMode"
  },
  decls: 4,
  vars: 4,
  consts: [[3, "ngSwitch"], [4, "ngSwitchCase"], ["aria-label", "Breadcrumb", 1, "flex"], [1, "rounded-md", "shadow", "px-6", "flex", "space-x-4"], [1, "flex"], [1, "flex", "items-center"], ["href", "#", 1, "text-gray-400", "hover:text-gray-500"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 20 20", "fill", "currentColor", "aria-hidden", "true", 1, "flex-shrink-0", "h-5", "w-5"], ["d", "M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"], [1, "sr-only"], [4, "ngFor", "ngForOf"], ["viewBox", "0 0 24 44", "preserveAspectRatio", "none", "fill", "currentColor", "xmlns", "http://www.w3.org/2000/svg", "aria-hidden", "true", 1, "flex-shrink-0", "w-6", "h-full", "text-gray-200"], ["d", "M.293 0l22 22-22 22h1.414l22-22-22-22H.293z"], ["href", "#", 1, "ml-4", "text-sm", "font-medium", "text-gray-500", "hover:text-gray-700"], [1, "bg-white", "border-b", "border-gray-200", "dark:bg-gray-800", "dark:border-gray-700"], ["aria-label", "Breadcrumb", 1, "py-4", "flex", "max-w-7xl", "mx-auto", "px-4", "sm:px-6", "lg:px-8"], [1, "flex", "items-center", "space-x-4"], ["routerLink", "/", 1, "text-gray-400", "hover:text-gray-500", "dark:text-gray-500", "dark:hover:text-gray-400"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "currentColor", "viewBox", "0 0 20 20", "aria-hidden", "true", 1, "flex-shrink-0", "h-5", "w-5", "text-gray-300", "dark:text-gray-500"], ["d", "M5.555 17.776l8-16 .894.448-8 16-.894-.448z"], ["href", "#", 1, "ml-4", "text-sm", "font-medium", "text-gray-500", "hover:text-gray-700", "dark:text-gray-500", "dark:hover:text-gray-400"], [1, "px-2", "md:px-6", "flex", "space-x-2"], [1, "text-gray-400", "hover:text-gray-500", 3, "routerLink"], [1, "ml-4", "text-sm", "font-medium", "text-gray-500", "hover:text-gray-700", 3, "routerLink"], ["class", "flex", 4, "ngIf"], [1, "active", "relative", "drop-container", "ml-4", "text-sm", "font-medium", "text-gray-500"], ["href", "#"], ["aria-hidden", "true", 1, "glyphicon", "glyphicon-triangle-bottom", "small"], [1, "drop", "bg-red"], ["class", "list pl0", 4, "ngIf"], [1, "list", "pl0"], [1, "dropdown-item"]],
  template: function Ng7DynamicBreadcrumbComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0, 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, Ng7DynamicBreadcrumbComponent_ng_container_1_Template, 11, 1, "ng-container", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, Ng7DynamicBreadcrumbComponent_ng_container_2_Template, 12, 1, "ng-container", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, Ng7DynamicBreadcrumbComponent_ng_container_3_Template, 11, 2, "ng-container", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitch", ctx.viewMode);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.VIEW_MODE.SimpleChevron);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.VIEW_MODE.FullWidthBar);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", ctx.VIEW_MODE.StandardTop);
    }
  },
  dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterLink, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgSwitch, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgSwitchCase, _angular_common__WEBPACK_IMPORTED_MODULE_6__.AsyncPipe],
  styles: [".drop-container[_ngcontent-%COMP%]:hover   .drop[_ngcontent-%COMP%] {\n  display: block;\n}\n.drop-container[_ngcontent-%COMP%]   .drop[_ngcontent-%COMP%] {\n  width: 100%;\n  border-radius: 5px;\n  z-index: 300;\n  background-color: white;\n  display: none;\n  position: absolute;\n  top: 20px;\n  left: 8px;\n  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);\n}\n.drop-container[_ngcontent-%COMP%]   .drop[_ngcontent-%COMP%]   .dropdown-item[_ngcontent-%COMP%] {\n  display: block;\n  padding: 8px 16px;\n}\n.drop-container[_ngcontent-%COMP%]   .drop[_ngcontent-%COMP%]   .dropdown-item[_ngcontent-%COMP%]:hover, .drop-container[_ngcontent-%COMP%]   .drop[_ngcontent-%COMP%]   .dropdown-item[_ngcontent-%COMP%]:active {\n  background-color: #EEEEEE;\n}"]
});

/***/ }),

/***/ 862065:
/*!*********************************************************************!*\
  !*** ./libs/web/ui/breadcrumbs/src/lib/master-breadcrumb.module.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ng7DynamicBreadcrumbModule": () => (/* binding */ Ng7DynamicBreadcrumbModule)
/* harmony export */ });
/* harmony import */ var _master_breadcrumb_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./master-breadcrumb.component */ 482367);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);




class Ng7DynamicBreadcrumbModule {}
Ng7DynamicBreadcrumbModule.ɵfac = function Ng7DynamicBreadcrumbModule_Factory(t) {
  return new (t || Ng7DynamicBreadcrumbModule)();
};
Ng7DynamicBreadcrumbModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: Ng7DynamicBreadcrumbModule
});
Ng7DynamicBreadcrumbModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule, _angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](Ng7DynamicBreadcrumbModule, {
    declarations: [_master_breadcrumb_component__WEBPACK_IMPORTED_MODULE_3__.Ng7DynamicBreadcrumbComponent],
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule, _angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule],
    exports: [_master_breadcrumb_component__WEBPACK_IMPORTED_MODULE_3__.Ng7DynamicBreadcrumbComponent]
  });
})();

/***/ })

}]);