"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["libs_web_dashboard_feature_src_index_ts"],{

/***/ 366844:
/*!*************************************************!*\
  !*** ./libs/web/dashboard/feature/src/index.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebDashboardFeatureModule": () => (/* reexport safe */ _lib_web_dashboard_feature_module__WEBPACK_IMPORTED_MODULE_0__.WebDashboardFeatureModule)
/* harmony export */ });
/* harmony import */ var _lib_web_dashboard_feature_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/web-dashboard-feature.module */ 601496);


/***/ }),

/***/ 26934:
/*!*******************************************************************************!*\
  !*** ./libs/web/dashboard/feature/src/lib/web-dashboard-feature.component.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebDashboardFeatureComponent": () => (/* binding */ WebDashboardFeatureComponent)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 654004);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _ui_music_widget_src_lib_web_ui_music_widget_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../ui/music-widget/src/lib/web-ui-music-widget.component */ 930373);
/* harmony import */ var _ui_weather_widget_src_lib_web_ui_weather_widget_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../ui/weather-widget/src/lib/web-ui-weather-widget.component */ 180644);
/* harmony import */ var _ui_carousel_pro_src_lib_web_ui_carousel_pro_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../ui/carousel-pro/src/lib/web-ui-carousel-pro.component */ 130585);
/* harmony import */ var _ui_page_src_lib_web_ui_page_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../ui/page/src/lib/web-ui-page.component */ 119052);









function WebDashboardFeatureComponent_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "section", 126)(2, "div", 127)(3, "h2", 128);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Profile Overview");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 129)(6, "div", 130)(7, "div", 131)(8, "div", 132)(9, "p", 133);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Featured Providers");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "ui-carousel-pro", 134);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("carouselType", "avatar")("images", ctx_r0.images)("imagesForSlider", ctx_r0.imagesForSlider);
  }
}
function WebDashboardFeatureComponent_section_447_ng_container_26_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 113)(2, "div", 142)(3, "h3", 104)(4, "a", 105);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "span", 106);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "p", 107);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "span", 108);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const tab_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", tab_r4.title, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", tab_r4.content, " ");
  }
}
function WebDashboardFeatureComponent_section_447_ng_container_26_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebDashboardFeatureComponent_section_447_ng_container_26_ng_container_1_Template, 10, 2, "ng-container", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const tab_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", tab_r4.active);
  }
}
function WebDashboardFeatureComponent_section_447_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "section", 96)(1, "div", 135)(2, "h2", 98);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Quick links");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 136)(5, "div", 137)(6, "div", 138);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WebDashboardFeatureComponent_section_447_Template_div_click_6_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8);
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r7.openTab("music"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "svg", 115);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "path", 116);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "span", 139);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WebDashboardFeatureComponent_section_447_Template_span_click_9_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8);
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r9.openTab("par"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "svg", 115);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "path", 119);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "span", 139);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WebDashboardFeatureComponent_section_447_Template_span_click_12_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8);
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r10.openTab("task"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "svg", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "path", 112);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "span", 139);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WebDashboardFeatureComponent_section_447_Template_span_click_15_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r11.openTab("funding"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "svg", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "path", 125);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "span", 140);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WebDashboardFeatureComponent_section_447_Template_span_click_18_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8);
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r12.openTab("expense"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "svg", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "path", 102);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "span", 139);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WebDashboardFeatureComponent_section_447_Template_span_click_21_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8);
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r13.openTab("training"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "svg", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](23, "path", 121)(24, "path", 122)(25, "path", 123);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](26, WebDashboardFeatureComponent_section_447_ng_container_26_Template, 2, 1, "ng-container", 141);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx_r1.activeTabClass("music"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx_r1.activeTabClass("par"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx_r1.activeTabClass("task"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx_r1.activeTabClass("funding"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx_r1.activeTabClass("expense"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx_r1.activeTabClass("training"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r1.tabs);
  }
}
class WebDashboardFeatureComponent {
  constructor(data) {
    this.data = data;
    this.breadcrumbs = [{
      name: 'Dashboard',
      path: '/dashboard'
    }];
    this.me$ = this.data.me().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(res => res.data.me));
    this.delay = 2000;
    this.brands = [{
      path: '/assets/images/advertisement.png',
      name: 'advertisement'
    }, {
      path: '/assets/images/advertisement.png',
      name: 'advertisement'
    }, {
      path: '/assets/images/advertisement.png',
      name: 'advertisement'
    }];
    this.images = [{
      path: '/assets/doctors/ortho/dr.atoian,orthopedic-surgeon,pasadena.png',
      name: 'Dr. Atoian',
      location: 'Pasadena',
      title: 'Orthopedic Surgeon'
    }, {
      path: '/assets/doctors/ortho/dr.kim,ortho-extremity,san-diego.png',
      name: 'Dr. Kim',
      location: 'San Diego',
      title: 'Ortho Extremity'
    }, {
      path: '/assets/doctors/ortho/dr.eldringhoff,ortho-extremity,west-covina,los-anglese.png',
      name: 'Dr. Eldringhoff',
      location: 'Los Anglese',
      title: 'Ortho Extremity'
    }, {
      path: '/assets/doctors/ortho/dr.bergen,ortho-extremity,la-jolla.png',
      name: 'Dr. Bergen',
      location: 'La Jolla',
      title: 'Ortho Extremity'
    }, {
      path: '/assets/doctors/ortho/dr.samimi,ortho-extremity,west-covina.png',
      name: 'Dr. Samimi',
      location: 'West Covina',
      title: 'Ortho Extremity'
    }, {
      path: '/assets/doctors/pain/dr.alves,pain-management,palmdale.png',
      name: 'Dr. Alves',
      location: 'Palmdale',
      title: ' Pain Management'
    }];
    this.imagesForSlider = [{
      path: '/assets/carousels/photo-1444065707204-12decac917e8.jfif'
    }, {
      path: '/assets/carousels/photo-1445452916036-9022dfd33aa8.jfif'
    }, {
      path: '/assets/carousels/photo-1443996104801-80c82e789b18.jfif'
    }, {
      path: '/assets/carousels/photo-1505839673365-e3971f8d9184.jfif'
    }, {
      path: '/assets/carousels/photo-1545420333-23a22b18b8fa.jfif'
    }];
    this.audioList = [{
      url: 'https://dl.dropboxusercontent.com/s/w99exjxnwoqwz0e/Cartoon-on-on-feat-daniel-levi-ncs-release.mp3?dl=0',
      title: 'Sample 1'
    }, {
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
      title: 'Sample 2',
      cover: 'https://i1.sndcdn.com/artworks-000249294066-uow7s0-t500x500.jpg'
    }, {
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
      title: 'Sample 3',
      cover: 'https://i1.sndcdn.com/artworks-000249294066-uow7s0-t500x500.jpg'
    }];
    this.tabs = [{
      id: 'music',
      active: true,
      color: 'text-white',
      background: 'bg-blue-700',
      title: 'Listen to Your Favorite Music',
      content: 'Sign in to Apple music or Spotify on your profile to access your favorite music.'
    }, {
      id: 'par',
      active: false,
      color: 'text-white',
      background: 'bg-green-700',
      title: 'Prior Authorization Request',
      content: 'Have a Rx or orders for your client in hand? Submit them here to PCH to quickly retrieve an Authorization number.'
    }, {
      id: 'task',
      active: false,
      color: 'text-white',
      background: 'bg-blue-700',
      title: 'Task List',
      content: 'Click here for quick access to the tasks currently assigned to you or your team.'
    }, {
      id: 'funding',
      active: false,
      color: 'text-white',
      background: 'bg-yellow-700',
      title: 'Apply for Funding',
      content: "Have a STAT surgery? If you don't have time to submit your case for PCH Underwriting and need funding, click here for quick access."
    }, {
      id: 'expense',
      active: false,
      color: 'text-white',
      background: 'bg-blue-700',
      title: 'Submit an expense',
      content: 'Track your case expenditures. Any out of pocket expenses that you require reimbursement for must be tracked to a case.'
    }, {
      id: 'training',
      active: false,
      color: 'text-white',
      background: 'bg-indigo-700',
      title: 'Training',
      content: 'Case Clinical Underwriting E-Learning, click here to access content on how to use the system. You will also find a great course library on specific procedures and what they entail.'
    }];
  }
  openTab(id) {
    const tabIndex = this.tabs.findIndex(t => t.id == id);
    if (tabIndex !== -1) {
      this.tabs = this.tabs.map(tab => {
        tab.active = false;
        return tab;
      });
      this.tabs[tabIndex].active = true;
    }
  }
  activeTabClass(id) {
    const tabIndex = this.tabs.findIndex(t => t.id == id);
    if (tabIndex !== -1) {
      if (this.tabs[tabIndex].active) {
        return this.tabs[tabIndex].color + ' ' + this.tabs[tabIndex].background;
      }
    }
    return '';
  }
}
WebDashboardFeatureComponent.ɵfac = function WebDashboardFeatureComponent_Factory(t) {
  return new (t || WebDashboardFeatureComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_2__.WebCoreDataAccessService));
};
WebDashboardFeatureComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebDashboardFeatureComponent,
  selectors: [["ng-component"]],
  decls: 544,
  vars: 6,
  consts: [["headerTitle", "Hey, Micheal Buller", "title", "Case Manager", "firmName", "The Bennett Law Firm, P.A., New Hampshire", 3, "advertisementBanners"], [1, "pb-8", "dashboard-page"], [1, "max-w-3xl", "mx-auto", "lg:max-w-7xl"], [1, "sr-only"], [1, "grid", "grid-cols-1", "gap-4", "items-start", "lg:grid-cols-3", "lg:gap-8"], [1, "grid", "grid-cols-1", "gap-4", "lg:col-span-2"], [4, "ngIf"], [1, "text-2xl", "font-bold", "py-2"], [1, "flex", "flex-col"], [1, "-my-2", "overflow-x-auto", "sm:-mx-6", "lg:-mx-8"], [1, "py-2", "align-middle", "inline-block", "min-w-full", "sm:px-6", "lg:px-8"], [1, "shadow", "border-b", "border-gray-200", "sm:rounded-lg"], [1, "min-w-full", "divide-y", "divide-gray-200"], [1, "bg-gray-50"], ["scope", "col", 1, "px-6", "py-3", "text-left", "text-xs", "font-medium", "text-gray-500", "uppercase", "tracking-wider"], ["scope", "col", 1, "relative", "px-6", "py-3"], [1, "bg-white"], [1, "px-6", "py-4", "whitespace-nowrap", "text-sm", "font-medium", "text-gray-900"], [1, "px-6", "py-4", "whitespace-nowrap", "text-sm", "text-gray-500"], [1, "px-6", "py-4", "whitespace-nowrap", "text-right", "text-sm", "font-medium"], ["href", "#", 1, "text-indigo-600", "hover:text-indigo-900"], [1, "bg-white", "px-4", "py-3", "flex", "items-center", "justify-between", "border-t", "border-gray-200", "sm:px-6"], [1, "flex-1", "flex", "justify-between", "sm:hidden"], ["href", "#", 1, "relative", "inline-flex", "items-center", "px-4", "py-2", "border", "border-gray-300", "text-sm", "font-medium", "rounded-md", "text-gray-700", "bg-white", "hover:bg-gray-50"], ["href", "#", 1, "ml-3", "relative", "inline-flex", "items-center", "px-4", "py-2", "border", "border-gray-300", "text-sm", "font-medium", "rounded-md", "text-gray-700", "bg-white", "hover:bg-gray-50"], [1, "hidden", "sm:flex-1", "sm:flex", "sm:items-center", "sm:justify-between"], [1, "text-sm", "text-gray-700"], [1, "font-medium"], ["aria-label", "Pagination", 1, "relative", "z-0", "inline-flex", "rounded-md", "shadow-sm", "-space-x-px"], ["href", "#", 1, "relative", "inline-flex", "items-center", "px-2", "py-2", "rounded-l-md", "border", "border-gray-300", "bg-white", "text-sm", "font-medium", "text-gray-500", "hover:bg-gray-50"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 20 20", "fill", "currentColor", "aria-hidden", "true", 1, "h-5", "w-5"], ["fill-rule", "evenodd", "d", "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z", "clip-rule", "evenodd"], ["href", "#", "aria-current", "page", 1, "z-10", "bg-indigo-50", "border-indigo-500", "text-indigo-600", "relative", "inline-flex", "items-center", "px-4", "py-2", "border", "text-sm", "font-medium"], ["href", "#", 1, "bg-white", "border-gray-300", "text-gray-500", "hover:bg-gray-50", "relative", "inline-flex", "items-center", "px-4", "py-2", "border", "text-sm", "font-medium"], ["href", "#", 1, "bg-white", "border-gray-300", "text-gray-500", "hover:bg-gray-50", "hidden", "md:inline-flex", "relative", "items-center", "px-4", "py-2", "border", "text-sm", "font-medium"], [1, "relative", "inline-flex", "items-center", "px-4", "py-2", "border", "border-gray-300", "bg-white", "text-sm", "font-medium", "text-gray-700"], ["href", "#", 1, "relative", "inline-flex", "items-center", "px-2", "py-2", "rounded-r-md", "border", "border-gray-300", "bg-white", "text-sm", "font-medium", "text-gray-500", "hover:bg-gray-50"], ["fill-rule", "evenodd", "d", "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z", "clip-rule", "evenodd"], [1, "shadow", "overflow-hidden", "border-b", "border-gray-200", "sm:rounded-lg"], [1, "grid", "grid-cols-1", "gap-4"], ["aria-labelledby", "weather-widget"], ["aria-labelledby", "mini-calender"], [1, "mashed-background", "rounded-lg", "text-white", "overflow-hidden", "shadow"], [1, "px-3", "py-1"], [1, "shadow-lg", "rounded-2xl", "p-4", "bg-white", "dark:bg-gray-700"], [1, "flex", "flex-wrap", "overflow-hidden"], [1, "w-full", "rounded", "shadow-sm"], [1, "flex", "items-center", "justify-between", "mb-4"], [1, "text-left", "font-bold", "text-xl", "text-black", "dark:text-white"], [1, "flex", "space-x-4"], [1, "p-2", "rounded-full", "bg-blue-500", "text-white"], ["width", "15", "height", "15", "fill", "currentColor", "viewBox", "0 0 24 24"], ["fill", "currentColor", "d", "M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z"], ["fill", "currentColor", "d", "M10 19a1 1 0 0 1-.64-.23a1 1 0 0 1-.13-1.41L13.71 12L9.39 6.63a1 1 0 0 1 .15-1.41a1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 10 19z"], [1, "-mx-2"], [1, "w-full", "text-black", "dark:text-white"], [1, "py-2", "px-2"], [1, "text-gray-400", "dark:text-gray-500"], [1, "py-2", "px-2", "text-center", "text-gray-500", "dark:text-gray-500"], [1, "py-2", "px-2", "hover:text-blue-500", "text-center", "text-gray-800", "cursor-pointer"], [1, "text-gray-500"], [1, "py-2", "px-2", "hover:text-blue-500", "text-center", "cursor-pointer"], [1, "py-2", "relative", "px-1", "hover:text-blue-500", "text-center", "cursor-pointer"], [1, "absolute", "rounded-full", "h-2", "w-2", "bg-blue-500", "bottom-0", "left-1/2", "transform", "-translate-x-1/2"], [1, "py-2", "px-2", "relative", "lg:px-3", "hover:text-blue-500", "text-center", "cursor-pointer"], [1, "absolute", "rounded-full", "h-2", "w-2", "bg-yellow-500", "bottom-0", "left-1/2", "transform", "-translate-x-1/2"], [1, "py-2", "px-2", "text-center", "text-white", "cursor-pointer"], [1, "p-2", "rounded-full", "bg-blue-500"], [1, "py-2", "px-2", "hover:text-blue-500", "relative", "text-center", "cursor-pointer"], [1, "absolute", "rounded-full", "h-2", "w-2", "bg-red-500", "bottom-0", "left-1/2", "transform", "-translate-x-1/2"], [1, "w-full", "float-left", "overflow-hidden"], [1, "dashboard-content"], [1, "content"], [1, "box"], [1, "percent", "job"], ["cx", "45", "cy", "45", "r", "45"], [1, "number"], [1, "text"], [1, "percent", "finance"], [1, "percent", "skill"], ["aria-labelledby", "music-widget"], [3, "audioList"], ["aria-labelledby", "content-widget"], [1, "p-5", "pt-0", "rounded-md", "bg-white", "border-b", "border-gray-200", "overflow-hidden", "shadow"], [1, "mb-5", "lg:flex"], [1, "w-1/5", "mt-5"], ["src", "assets/images/LOim.png", 1, "w-15", "h-15"], [1, "ml-2", "text-base", "text-black", "font-semibold"], [1, "mt-2", "text-center", "w-4/5", "pr-0"], [1, "text-xl", "font-bold", "text-black"], [1, "text-xs", "text-gray-500", "leading-5", "mt-3"], [1, "mb-0", "lg:flex"], [1, "w-4/5"], ["href", "#", 1, "mr-2", "px-6", "py-2", "font-semibold", "text-white", "border-2", "rounded-md", "text-sm", 2, "color", "#7b91f7", "border-color", "#f2f2f2"], ["href", "#", 1, "px-6", "py-2", "font-semibold", "text-white", "border-2", "rounded-md", "text-sm", 2, "color", "#ffb394", "border-color", "#f2f2f2"], ["aria-labelledby", "quick-links-title", 4, "ngIf"], ["aria-labelledby", "quick-links-title"], [1, "rounded-lg", "mt-8", "bg-gray-200", "overflow-hidden", "shadow", "divide-y", "divide-gray-200", "sm:divide-y-0", "sm:grid", "md:grid-cols-3", "sm:grid-cols-2", "sm:gap-px"], ["id", "quick-links-title", 1, "sr-only"], [1, "rounded-tr-lg", "sm:rounded-tr-none", "relative", "group", "bg-white", "p-6", "focus-within:ring-2", "focus-within:ring-inset", "focus-within:ring-cyan-500"], [1, "rounded-lg", "inline-flex", "p-3", "bg-rose-50", "text-rose-700", "ring-4", "ring-white"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "aria-hidden", "true", 1, "h-6", "w-6"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"], [1, "mt-6"], [1, "text-lg", "font-medium"], ["href", "#", 1, "focus:outline-none"], ["aria-hidden", "true", 1, "absolute", "inset-0"], [1, "mt-2", "text-sm", "text-gray-500"], ["aria-hidden", "true", 1, "pointer-events-none", "absolute", "top-6", "right-6", "text-gray-300", "group-hover:text-gray-400"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "currentColor", "viewBox", "0 0 24 24", 1, "h-6", "w-6"], ["d", "M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"], [1, "rounded-lg", "inline-flex", "p-3", "bg-indigo-50", "text-indigo-700", "ring-4", "ring-white"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"], [1, "relative", "group", "bg-white", "p-6", "focus-within:ring-2", "focus-within:ring-inset", "focus-within:ring-cyan-500"], [1, "rounded-lg", "inline-flex", "p-3", "bg-teal-50", "text-teal-700", "ring-4", "ring-white"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-6", "w-6"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"], [1, "mt-8"], [1, "rounded-lg", "inline-flex", "p-3", "bg-green-50", "text-green-700", "ring-4", "ring-white"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"], [1, "rounded-lg", "inline-flex", "p-3", "bg-blue-50", "text-blue-700", "ring-4", "ring-white"], ["d", "M12 14l9-5-9-5-9 5 9 5z"], ["d", "M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"], [1, "rounded-lg", "inline-flex", "p-3", "bg-yellow-50", "text-yellow-700", "ring-4", "ring-white"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"], ["aria-labelledby", "profile-overview-title"], [1, "rounded-lg", "bg-white", "overflow-hidden", "shadow"], ["id", "profile-overview-title", 1, "sr-only"], [1, "bg-white", "p-5"], [1, "sm:flex", "sm:items-center", "sm:justify-between", "mb-4"], [1, "sm:flex", "sm:space-x-5"], [1, "text-center", "sm:text-left"], [1, "text-2xl", "font-bold"], [3, "carouselType", "images", "imagesForSlider"], [1, "rounded-lg", "bg-gray-200", "border-b", "border-gray-200", "overflow-hidden", "shadow", "divide-y", "divide-gray-200", "sm:divide-y-0", "sm:grid", "sm:grid-cols-1", "sm:gap-px"], [1, "rounded-tl-lg", "rounded-tr-lg", "sm:rounded-tr-none", "relative", "group", "bg-white", "p-6", "focus-within:ring-2", "focus-within:ring-inset", "focus-within:ring-cyan-500"], [1, "flex", "justify-between"], [1, "cursor-pointer", "rounded-lg", "inline-flex", "p-3", "bg-teal-50", "text-teal-700", "ring-4", "ring-white", 3, "ngClass", "click"], [1, "cursor-pointer", "rounded-lg", "inline-flex", "p-3", "ring-4", "ring-white", 3, "ngClass", "click"], [1, "cursor-pointer", "rounded-lg", "inline-flex", "p-3", "text-rose-700", "ring-4", "ring-white", 3, "ngClass", "click"], [4, "ngFor", "ngForOf"], [1, ""]],
  template: function WebDashboardFeatureComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ui-page", 0)(1, "main", 1)(2, "div", 2)(3, "h1", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Profile");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4)(6, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, WebDashboardFeatureComponent_ng_container_7_Template, 12, 3, "ng-container", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](8, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "h2", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Task List");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 8)(12, "div", 9)(13, "div", 10)(14, "div", 11)(15, "table", 12)(16, "thead", 13)(17, "tr")(18, "th", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, " Name ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "th", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, " Title ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "th", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, " Email ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "th", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, " Role ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "th", 15)(27, "span", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, "Edit");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "tbody")(30, "tr", 16)(31, "td", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32, "Jane Cooper");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "td", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](34, " Regional Paradigm Technician ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "td", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](36, "jane.cooper@example.com");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "td", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, "Admin");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "td", 19)(40, "a", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](41, "Edit");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "tr", 13)(43, "td", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](44, "Cody Fisher");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "td", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](46, " Product Directives Officer ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "td", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](48, "cody.fisher@example.com");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "td", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](50, "Owner");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "td", 19)(52, "a", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](53, "Edit");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "tr", 16)(55, "td", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](56, "Jane Cooper");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "td", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](58, " Regional Paradigm Technician ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "td", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](60, "jane.cooper@example.com");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](61, "td", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](62, "Admin");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](63, "td", 19)(64, "a", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](65, "Edit");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "tr", 13)(67, "td", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](68, "Cody Fisher");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](69, "td", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](70, " Product Directives Officer ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](71, "td", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](72, "cody.fisher@example.com");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](73, "td", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](74, "Owner");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](75, "td", 19)(76, "a", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](77, "Edit");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](78, "tr", 16)(79, "td", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](80, "Jane Cooper");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](81, "td", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](82, " Regional Paradigm Technician ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](83, "td", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](84, "jane.cooper@example.com");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](85, "td", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](86, "Admin");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](87, "td", 19)(88, "a", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](89, "Edit");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](90, "div", 21)(91, "div", 22)(92, "a", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](93, " Previous ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](94, "a", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](95, " Next ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](96, "div", 25)(97, "div")(98, "p", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](99, " Showing ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](100, "span", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](101, "1");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](102, " to ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](103, "span", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](104, "10");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](105, " of ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](106, "span", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](107, "97");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](108, " results ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](109, "div")(110, "nav", 28)(111, "a", 29)(112, "span", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](113, "Previous");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](114, "svg", 30);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](115, "path", 31);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](116, "a", 32);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](117, " 1 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](118, "a", 33);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](119, " 2 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](120, "a", 34);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](121, " 3 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](122, "span", 35);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](123, " ... ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](124, "a", 34);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](125, " 8 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](126, "a", 33);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](127, " 9 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](128, "a", 33);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](129, " 10 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](130, "a", 36)(131, "span", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](132, "Next");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](133, "svg", 30);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](134, "path", 37);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](135, "h2", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](136, "Recent Cases");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](137, "div", 8)(138, "div", 9)(139, "div", 10)(140, "div", 38)(141, "table", 12)(142, "thead", 13)(143, "tr")(144, "th", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](145, " Client Name ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](146, "th", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](147, " Date of Loss ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](148, "th", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](149, " Accident Type ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](150, "th", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](151, " Case Phase ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](152, "th", 15)(153, "span", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](154, "Edit");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](155, "tbody")(156, "tr", 16)(157, "td", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](158, "Jane Cooper");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](159, "td", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](160, " Regional Paradigm Technician ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](161, "td", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](162, "jane.cooper@example.com");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](163, "td", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](164, "Admin");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](165, "td", 19)(166, "a", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](167, "Edit");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](168, "tr", 13)(169, "td", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](170, "Cody Fisher");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](171, "td", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](172, " Product Directives Officer ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](173, "td", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](174, "cody.fisher@example.com");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](175, "td", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](176, "Owner");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](177, "td", 19)(178, "a", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](179, "Edit");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](180, "tr", 16)(181, "td", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](182, "Jane Cooper");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](183, "td", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](184, " Regional Paradigm Technician ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](185, "td", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](186, "jane.cooper@example.com");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](187, "td", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](188, "Admin");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](189, "td", 19)(190, "a", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](191, "Edit");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](192, "tr", 13)(193, "td", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](194, "Cody Fisher");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](195, "td", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](196, " Product Directives Officer ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](197, "td", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](198, "cody.fisher@example.com");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](199, "td", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](200, "Owner");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](201, "td", 19)(202, "a", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](203, "Edit");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](204, "tr", 16)(205, "td", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](206, "Jane Cooper");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](207, "td", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](208, " Regional Paradigm Technician ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](209, "td", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](210, "jane.cooper@example.com");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](211, "td", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](212, "Admin");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](213, "td", 19)(214, "a", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](215, "Edit");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](216, "div", 21)(217, "div", 22)(218, "a", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](219, " Previous ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](220, "a", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](221, " Next ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](222, "div", 25)(223, "div")(224, "p", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](225, " Showing ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](226, "span", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](227, "1");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](228, " to ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](229, "span", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](230, "10");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](231, " of ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](232, "span", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](233, "97");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](234, " results ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](235, "div")(236, "nav", 28)(237, "a", 29)(238, "span", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](239, "Previous");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](240, "svg", 30);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](241, "path", 31);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](242, "a", 32);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](243, " 1 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](244, "a", 33);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](245, " 2 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](246, "a", 34);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](247, " 3 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](248, "span", 35);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](249, " ... ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](250, "a", 34);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](251, " 8 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](252, "a", 33);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](253, " 9 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](254, "a", 33);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](255, " 10 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](256, "a", 36)(257, "span", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](258, "Next");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](259, "svg", 30);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](260, "path", 37);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()()()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](261, "div", 39)(262, "section", 40);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](263, "ui-weather-widget");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](264, "section", 41)(265, "div", 42)(266, "div", 43)(267, "div", 44)(268, "div", 45)(269, "div", 46)(270, "div", 47)(271, "div", 48);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](272, "Dec 2021");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](273, "div", 49)(274, "button", 50);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](275, "svg", 51);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](276, "path", 52);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](277, "button", 50);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](278, "svg", 51);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](279, "path", 53);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](280, "div", 54)(281, "table", 55)(282, "tr")(283, "th", 56);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](284, "S");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](285, "th", 56);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](286, "M");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](287, "th", 56);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](288, "T");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](289, "th", 56);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](290, "W");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](291, "th", 56);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](292, "T");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](293, "th", 56);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](294, "F");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](295, "th", 56);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](296, "S");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](297, "tr", 57)(298, "td", 58);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](299, "25");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](300, "td", 58);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](301, "26");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](302, "td", 58);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](303, "27");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](304, "td", 58);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](305, "28");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](306, "td", 58);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](307, "29");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](308, "td", 58);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](309, "30");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](310, "td", 59);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](311, " 1 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](312, "tr", 60)(313, "td", 61);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](314, "2");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](315, "td", 62);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](316, " 3 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](317, "span", 63);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](318, "td", 61);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](319, "4");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](320, "td", 61);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](321, "5");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](322, "td", 61);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](323, "6");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](324, "td", 61);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](325, "7");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](326, "td", 64);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](327, " 8 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](328, "span", 65);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](329, "tr", 60)(330, "td", 61);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](331, "9");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](332, "td", 61);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](333, "10");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](334, "td", 61);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](335, "11");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](336, "td", 61);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](337, "12");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](338, "td", 66)(339, "span", 67);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](340, " 13 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](341, "td", 61);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](342, "14");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](343, "td", 61);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](344, "15");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](345, "tr", 60)(346, "td", 61);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](347, "16");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](348, "td", 61);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](349, "17");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](350, "td", 61);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](351, "18");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](352, "td", 61);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](353, "19");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](354, "td", 61);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](355, "20");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](356, "td", 61);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](357, "21");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](358, "td", 61);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](359, "22");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](360, "tr", 60)(361, "td", 61);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](362, "23");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](363, "td", 61);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](364, "24");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](365, "td", 68);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](366, " 25 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](367, "span", 69);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](368, "td", 61);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](369, "26");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](370, "td", 61);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](371, "27");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](372, "td", 61);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](373, "28");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](374, "td", 61);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](375, "29");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](376, "tr", 60)(377, "td", 61);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](378, "30");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](379, "td", 61);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](380, "31");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](381, "td")(382, "td")(383, "td")(384, "td")(385, "td");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](386, "div", 70)(387, "div", 71)(388, "div", 72)(389, "div", 73)(390, "div", 74);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](391, "svg");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](392, "circle", 75)(393, "circle", 75)(394, "circle", 75);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](395, "div", 76)(396, "h2");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](397, "12");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](398, "h2", 77);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](399, " Client ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](400, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](401, " Events ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](402, "div", 73)(403, "div", 78);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](404, "svg");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](405, "circle", 75)(406, "circle", 75)(407, "circle", 75);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](408, "div", 76)(409, "h2");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](410, "2");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](411, "h2", 77);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](412, "Key Dates Approaching");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](413, "div", 73)(414, "div", 79);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](415, "svg");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](416, "circle", 75)(417, "circle", 75)(418, "circle", 75);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](419, "div", 76)(420, "h2");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](421, "15");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](422, "h2", 77);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](423, " Pending ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](424, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](425, " Tasks ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](426, "section", 80);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](427, "ui-music-widget", 81);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](428, "section", 82)(429, "div", 83)(430, "div", 84)(431, "div", 85);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](432, "img", 86);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](433, "p", 87);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](434, "Aries");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](435, "div", 88)(436, "h3", 89);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](437, "General Horoscope");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](438, "p", 90);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](439, " someone eles's beliefs and advice may seem dubious to you, but you should help in mind that those doodle wish you well ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](440, "div", 91);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](441, "div", 85);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](442, "div", 92)(443, "a", 93);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](444, "92% Love");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](445, "a", 94);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](446, "56% health");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](447, WebDashboardFeatureComponent_section_447_Template, 27, 7, "section", 95);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](448, "section", 96)(449, "div", 97)(450, "h2", 98);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](451, "Quick links");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](452, "div", 99)(453, "div")(454, "span", 100);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](455, "svg", 101);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](456, "path", 102);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](457, "div", 103)(458, "h3", 104)(459, "a", 105);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](460, "span", 106);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](461, " Submit an expense ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](462, "p", 107);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](463, " Track your case expenditures. Any out of pocket expenses that you require reimbursement for must be tracked to a case. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](464, "span", 108);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](465, "svg", 109);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](466, "path", 110);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](467, "div", 99)(468, "div")(469, "span", 111);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](470, "svg", 101);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](471, "path", 112);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](472, "div", 103)(473, "h3", 104)(474, "a", 105);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](475, "span", 106);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](476, " Task List ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](477, "p", 107);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](478, " Click here for quick access to the tasks currently assigned to you or your team. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](479, "span", 108);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](480, "svg", 109);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](481, "path", 110);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](482, "div", 113)(483, "div")(484, "span", 114);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](485, "svg", 115);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](486, "path", 116);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](487, "div", 117)(488, "h3", 104)(489, "a", 105);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](490, "span", 106);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](491, " Listen to Your Favorite Music ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](492, "p", 107);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](493, " Sign in to Apple music or Spotify on your profile to access your favorite music. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](494, "span", 108);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](495, "svg", 109);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](496, "path", 110);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](497, "div", 113)(498, "div")(499, "span", 118);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](500, "svg", 115);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](501, "path", 119);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](502, "div", 117)(503, "h3", 104)(504, "a", 105);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](505, "span", 106);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](506, " Prior Authorization Request ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](507, "p", 107);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](508, " Have a Rx or orders for your client in hand? Submit them here to PCH to quickly retrieve an Authorization number. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](509, "span", 108);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](510, "svg", 109);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](511, "path", 110);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](512, "div", 113)(513, "div")(514, "span", 120);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](515, "svg", 101);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](516, "path", 121)(517, "path", 122)(518, "path", 123);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](519, "div", 117)(520, "h3", 104)(521, "a", 105);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](522, "span", 106);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](523, " Training ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](524, "p", 107);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](525, " Case Clinical Underwriting E-Learning, click here to access content on how to use the system. You will also find a great course library on specific procedures and what they entail. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](526, "span", 108);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](527, "svg", 109);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](528, "path", 110);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](529, "div", 113)(530, "div")(531, "span", 124);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](532, "svg", 101);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](533, "path", 125);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](534, "div", 117)(535, "h3", 104)(536, "a", 105);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](537, "span", 106);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](538, " Apply for Funding ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](539, "p", 107);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](540, " Have a STAT surgery? If you don't have time to submit your case for PCH Underwriting and need funding, click here for quick access. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](541, "span", 108);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](542, "svg", 109);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](543, "path", 110);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("advertisementBanners", ctx.brands);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](8, 4, ctx.me$));
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](420);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("audioList", ctx.audioList);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](20);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", false);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _ui_music_widget_src_lib_web_ui_music_widget_component__WEBPACK_IMPORTED_MODULE_4__.WebUiMusicWidgetComponent, _ui_weather_widget_src_lib_web_ui_weather_widget_component__WEBPACK_IMPORTED_MODULE_5__.WebUiWeatherWidgetComponent, _ui_carousel_pro_src_lib_web_ui_carousel_pro_component__WEBPACK_IMPORTED_MODULE_6__.WebUiCarouselProComponent, _ui_page_src_lib_web_ui_page_component__WEBPACK_IMPORTED_MODULE_7__.WebUiPageComponent, _angular_common__WEBPACK_IMPORTED_MODULE_3__.AsyncPipe],
  styles: [".mashed-background {\n  background-repeat: repeat;\n  background-position: center;\n  background-size: contain;\n  padding: 10px 16px 12px;\n  border-radius: 18px;\n}\n\n.button-right .swiper-container {\n  padding-bottom: 50px !important;\n  padding-top: 10px;\n  padding-left: 10px;\n  padding-right: 10px;\n}\n\n.swiper-pagination-bullet {\n  border: 2px solid gray !important;\n}\n\n.swiper-pagination-bullet-active {\n  color: gray !important;\n  background: gray !important;\n}\n\n.swiper-container-horizontal > .swiper-pagination-bullets {\n  bottom: -21px !important;\n  margin: 15px 0 !important;\n}\n\n.wrapper {\n  display: block !important;\n  border-radius: 10px !important;\n  width: auto !important;\n  height: auto !important;\n  padding: 20px 0 !important;\n  background-color: #f6f7ff !important;\n}\n\n.slider {\n  background: #000 !important;\n}\n\n.controls {\n  flex-wrap: nowrap !important;\n}\n\n.cover {\n  padding: 20px !important;\n}\n\n.cover > img {\n  border-radius: 0 !important;\n  margin-left: 0 !important;\n  max-height: 100% !important;\n  max-width: 100% !important;\n}"],
  encapsulation: 2
});

/***/ }),

/***/ 601496:
/*!****************************************************************************!*\
  !*** ./libs/web/dashboard/feature/src/lib/web-dashboard-feature.module.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebDashboardFeatureModule": () => (/* binding */ WebDashboardFeatureModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @case-clinical/web/ui/button */ 510948);
/* harmony import */ var _case_clinical_web_ui_page__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @case-clinical/web/ui/page */ 583747);
/* harmony import */ var _case_clinical_web_ui_music_widget__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/ui/music-widget */ 780486);
/* harmony import */ var _case_clinical_web_ui_weather_widget__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/ui/weather-widget */ 384110);
/* harmony import */ var _ui_carousel_pro_src__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../ui/carousel-pro/src */ 445642);
/* harmony import */ var _web_dashboard_feature_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./web-dashboard-feature.component */ 26934);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 224006);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);











class WebDashboardFeatureModule {}
WebDashboardFeatureModule.ɵfac = function WebDashboardFeatureModule_Factory(t) {
  return new (t || WebDashboardFeatureModule)();
};
WebDashboardFeatureModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebDashboardFeatureModule
});
WebDashboardFeatureModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild([{
    path: '',
    pathMatch: 'full',
    component: _web_dashboard_feature_component__WEBPACK_IMPORTED_MODULE_3__.WebDashboardFeatureComponent
  }]), _case_clinical_web_ui_music_widget__WEBPACK_IMPORTED_MODULE_4__.WebUiMusicWidgetModule, _case_clinical_web_ui_weather_widget__WEBPACK_IMPORTED_MODULE_5__.WebUiWeatherWidgetModule, _ui_carousel_pro_src__WEBPACK_IMPORTED_MODULE_6__.WebUiCarouselProModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_7__.WebUiButtonModule, _case_clinical_web_ui_page__WEBPACK_IMPORTED_MODULE_8__.WebUiPageModule, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormsModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebDashboardFeatureModule, {
    declarations: [_web_dashboard_feature_component__WEBPACK_IMPORTED_MODULE_3__.WebDashboardFeatureComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule, _case_clinical_web_ui_music_widget__WEBPACK_IMPORTED_MODULE_4__.WebUiMusicWidgetModule, _case_clinical_web_ui_weather_widget__WEBPACK_IMPORTED_MODULE_5__.WebUiWeatherWidgetModule, _ui_carousel_pro_src__WEBPACK_IMPORTED_MODULE_6__.WebUiCarouselProModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_7__.WebUiButtonModule, _case_clinical_web_ui_page__WEBPACK_IMPORTED_MODULE_8__.WebUiPageModule, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormsModule]
  });
})();

/***/ }),

/***/ 930373:
/*!***************************************************************************!*\
  !*** ./libs/web/ui/music-widget/src/lib/web-ui-music-widget.component.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebUiMusicWidgetComponent": () => (/* binding */ WebUiMusicWidgetComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var ang_music_player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ang-music-player */ 553255);


class WebUiMusicWidgetComponent {
  play() {
    console.log('play');
  }
}
WebUiMusicWidgetComponent.ɵfac = function WebUiMusicWidgetComponent_Factory(t) {
  return new (t || WebUiMusicWidgetComponent)();
};
WebUiMusicWidgetComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebUiMusicWidgetComponent,
  selectors: [["ui-music-widget"]],
  inputs: {
    audioList: "audioList"
  },
  decls: 2,
  vars: 1,
  consts: [[1, "dark:bg-gray-800", "mb-3", "md:mb-6", "rounded-lg"], [3, "audioList"]],
  template: function WebUiMusicWidgetComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "ang-music-player", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("audioList", ctx.audioList);
    }
  },
  dependencies: [ang_music_player__WEBPACK_IMPORTED_MODULE_1__.AngMusicPlayerComponent],
  encapsulation: 2
});

/***/ }),

/***/ 780486:
/*!************************************************************************!*\
  !*** ./libs/web/ui/music-widget/src/lib/web-ui-music-widget.module.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebUiMusicWidgetModule": () => (/* binding */ WebUiMusicWidgetModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var ang_music_player__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ang-music-player */ 553255);
/* harmony import */ var _web_ui_music_widget_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./web-ui-music-widget.component */ 930373);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);





class WebUiMusicWidgetModule {}
WebUiMusicWidgetModule.ɵfac = function WebUiMusicWidgetModule_Factory(t) {
  return new (t || WebUiMusicWidgetModule)();
};
WebUiMusicWidgetModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebUiMusicWidgetModule
});
WebUiMusicWidgetModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule, ang_music_player__WEBPACK_IMPORTED_MODULE_3__.AngMusicPlayerModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebUiMusicWidgetModule, {
    declarations: [_web_ui_music_widget_component__WEBPACK_IMPORTED_MODULE_4__.WebUiMusicWidgetComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule, ang_music_player__WEBPACK_IMPORTED_MODULE_3__.AngMusicPlayerModule],
    exports: [_web_ui_music_widget_component__WEBPACK_IMPORTED_MODULE_4__.WebUiMusicWidgetComponent]
  });
})();

/***/ })

}]);