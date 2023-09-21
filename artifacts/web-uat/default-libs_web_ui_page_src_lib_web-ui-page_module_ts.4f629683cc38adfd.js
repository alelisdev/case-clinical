"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_ui_page_src_lib_web-ui-page_module_ts"],{

/***/ 130585:
/*!***************************************************************************!*\
  !*** ./libs/web/ui/carousel-pro/src/lib/web-ui-carousel-pro.component.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebUiCarouselProComponent": () => (/* binding */ WebUiCarouselProComponent)
/* harmony export */ });
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! swiper */ 342041);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 861135);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var swiper_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! swiper/angular */ 999485);



// import Swiper core and required components






const _c0 = ["swiperRef"];
function WebUiCarouselProComponent_div_3_4_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "img", 9);
  }
  if (rf & 2) {
    const carousel_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("src", carousel_r4.path, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
  }
}
function WebUiCarouselProComponent_div_3_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, WebUiCarouselProComponent_div_3_4_ng_template_0_Template, 1, 1, "ng-template", 8);
  }
}
function WebUiCarouselProComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "swiper", 5, 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, WebUiCarouselProComponent_div_3_4_Template, 1, 0, null, 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("loop", ctx_r0.loop)("slidesPerView", ctx_r0.slidePerView)("spaceBetween", ctx_r0.spaceBetween)("virtual", ctx_r0.virtual)("centeredSlides", ctx_r0.centeredSlides)("navigation", ctx_r0.navigation)("autoplay", ctx_r0.delay)("pagination", ctx_r0.pagination)("grabCursor", ctx_r0.grabCursor)("slidesPerGroup", ctx_r0.slidesPerGroup);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r0.images);
  }
}
function WebUiCarouselProComponent_ng_container_4_4_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 12)(1, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "img", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div")(4, "div", 15)(5, "h3", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "dl", 17)(8, "dt", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "Title");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "dd", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "dt", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "Role");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "dd", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "svg", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](16, "path", 22)(17, "path", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "dd", 24)(20, "a", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function WebUiCarouselProComponent_ng_container_4_4_ng_template_0_Template_a_click_20_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r15);
      const carousel_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r13.viewProfile(carousel_r10.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](21, "View Profile");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](22, "div", 26);
  }
  if (rf & 2) {
    const carousel_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("src", carousel_r10.path, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](carousel_r10.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](carousel_r10.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", carousel_r10.location, " ");
  }
}
function WebUiCarouselProComponent_ng_container_4_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, WebUiCarouselProComponent_ng_container_4_4_ng_template_0_Template, 23, 4, "ng-template", 8);
  }
}
function WebUiCarouselProComponent_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 10)(2, "swiper", 11, 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, WebUiCarouselProComponent_ng_container_4_4_Template, 1, 0, null, 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("loop", ctx_r1.loop)("slidesPerView", ctx_r1.slidePerView)("spaceBetween", ctx_r1.spaceBetween)("virtual", ctx_r1.virtual)("centeredSlides", ctx_r1.centeredSlides)("navigation", ctx_r1.navigation)("autoplay", ctx_r1.delay)("pagination", ctx_r1.pagination)("grabCursor", ctx_r1.grabCursor)("slidesPerGroup", ctx_r1.slidesPerGroup)("breakpoints", ctx_r1.breakpoints);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r1.images);
  }
}
// install Swiper components
swiper__WEBPACK_IMPORTED_MODULE_0__["default"].use([swiper__WEBPACK_IMPORTED_MODULE_0__.Navigation, swiper__WEBPACK_IMPORTED_MODULE_0__.Pagination, swiper__WEBPACK_IMPORTED_MODULE_0__.Scrollbar, swiper__WEBPACK_IMPORTED_MODULE_0__.A11y, swiper__WEBPACK_IMPORTED_MODULE_0__.Virtual, swiper__WEBPACK_IMPORTED_MODULE_0__.Zoom, swiper__WEBPACK_IMPORTED_MODULE_0__.Autoplay, swiper__WEBPACK_IMPORTED_MODULE_0__.Thumbs, swiper__WEBPACK_IMPORTED_MODULE_0__.Controller]);
class WebUiCarouselProComponent {
  constructor(cd, ngZone, route, router) {
    this.cd = cd;
    this.ngZone = ngZone;
    this.route = route;
    this.router = router;
    this.bulletNumbers = true;
    this.loop = true;
    this.slidePerView = 1;
    this.spaceBetween = 50;
    this.virtual = true;
    this.centeredSlides = true;
    this.grabCursor = true;
    this.slidesPerGroup = 1;
    this.carouselType = 'minSwipeDistance';
    this.delay = 2000;
    this.slides$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject(['']);
    this.isAuto = true;
    this.indexNumber = 0;
    this.exampleConfig = {
      slidesPerView: 3
    };
    this.slidesPerView = 4;
    this.pagination = false;
    this.slides2 = ['slide 1', 'slide 2', 'slide 3'];
    this.navigation = false;
    this.scrollbar = {
      draggable: true
    };
    this.slides = Array.from({
      length: 5
    }).map((el, index) => `Slide ${index + 1}`);
    this.virtualSlides = Array.from({
      length: 600
    }).map((el, index) => `Slide ${index + 1}`);
    this.slidesEx = ['first', 'second'];
    this.paginationBtn = {
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
      }
    };
  }
  // getSlides() {
  //   this.slides$.next(Array.from({ length: 600 }).map((el, index) => `Slide ${index + 1}`))
  // }
  ngOnInit() {
    console.log("Images : ", this.images);
  }
  toggleAuto(val) {
    val == 'start' ? this.isAuto = {
      delay: this.delay
    } : this.isAuto = false;
    console.log(this.isAuto);
  }
  extenalBulltes() {
    let arr = [];
    // return arr.fill(this.images.length / this.slidePerView)
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  }
  setThumbsSwiper(swiper) {
    this.thumbsSwiper = swiper;
  }
  setControlledSwiper(swiper) {
    this.controlledSwiper = swiper;
  }
  changeIndex(i) {
    this.indexNumber = i;
  }
  replaceSlides() {
    this.slides2 = ['foo', 'bar'];
  }
  togglePagination() {
    if (!this.pagination) {
      this.pagination = {
        type: 'fraction'
      };
    } else {
      this.pagination = false;
    }
  }
  toggleNavigation() {
    this.navigation = !this.navigation;
  }
  toggleScrollbar() {
    if (!this.scrollbar) {
      this.scrollbar = {
        draggable: true
      };
    } else {
      this.scrollbar = {
        draggable: true
      };
    }
  }
  log(log) {
    // console.log(string);
  }
  onSlideChange(swiper) {
    if (swiper.isEnd) {
      // all swiper events are run outside of ngzone, so use ngzone.run or detectChanges to update the view.
      this.ngZone.run(() => {
        this.slidesEx = [...this.slidesEx, `added ${this.slidesEx.length - 1}`];
      });
      console.log(this.slidesEx);
    }
  }
  viewProfile(id) {
    this.router.navigate(['/queues/providers/' + id]);
  }
}
WebUiCarouselProComponent.ɵfac = function WebUiCarouselProComponent_Factory(t) {
  return new (t || WebUiCarouselProComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router));
};
WebUiCarouselProComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: WebUiCarouselProComponent,
  selectors: [["ui-carousel-pro"]],
  viewQuery: function WebUiCarouselProComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.swiperRef = _t.first);
    }
  },
  inputs: {
    images: "images",
    imagesForSlider: "imagesForSlider",
    bulletNumbers: "bulletNumbers",
    loop: "loop",
    slidePerView: "slidePerView",
    spaceBetween: "spaceBetween",
    virtual: "virtual",
    centeredSlides: "centeredSlides",
    grabCursor: "grabCursor",
    slidesPerGroup: "slidesPerGroup",
    carouselType: "carouselType",
    breakpoints: "breakpoints"
  },
  decls: 5,
  vars: 2,
  consts: [[1, "carousel-pro"], [1, "flex", "justify-center"], ["style", "width: 405px !important; height : 140px", 4, "ngIf"], [4, "ngIf"], [2, "width", "405px !important", "height", "140px"], [3, "loop", "slidesPerView", "spaceBetween", "virtual", "centeredSlides", "navigation", "autoplay", "pagination", "grabCursor", "slidesPerGroup"], ["swiperVirtualRefs", ""], [4, "ngFor", "ngForOf"], ["swiperSlide", ""], [1, "w-full", "object-cover", "rounded-lg", "block", "border", "border-black-500", "shadow", 3, "src"], [1, "h-72", "button-right"], [3, "loop", "slidesPerView", "spaceBetween", "virtual", "centeredSlides", "navigation", "autoplay", "pagination", "grabCursor", "slidesPerGroup", "breakpoints"], [1, "zoom", "img-wrap", "flex", "flex-col", "text-center", "rounded-3xl", "bg-white", "text-white"], [1, "flex-1", "flex", "flex-col", "mt-6"], ["alt", "", 1, "flex-shrink-0", "mx-auto", "mr-auto", "ml-auto", "block", "mt-3", 3, "src"], [1, "px-5"], [1, "mt-3", "text-sm", "font-medium", "text-black"], [1, "flex-grow", "flex", "flex-col", "justify-between", "text-gray-500"], [1, "sr-only"], [1, "swiper-text", "text-sm", "py-1"], [1, "swiper-text", "items-center", "text-sm", "flex", "justify-center", "gap-2"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-3", "w-3"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M15 11a3 3 0 11-6 0 3 3 0 016 0z"], [1, "swiper-button", "text-xs", "mb-5", "mt-5", "font-bold"], [1, "rounded-xl", "px-8", "py-2", "cursor-pointer", 3, "click"], [1, "swiper-pagination"]],
  template: function WebUiCarouselProComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div")(2, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, WebUiCarouselProComponent_div_3_Template, 5, 11, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, WebUiCarouselProComponent_ng_container_4_Template, 5, 12, "ng-container", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.carouselType === "minSwipeDistance");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.carouselType === "avatar");
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, swiper_angular__WEBPACK_IMPORTED_MODULE_5__.SwiperComponent, swiper_angular__WEBPACK_IMPORTED_MODULE_5__.SwiperSlideDirective],
  styles: [".dashboard-content .box {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n\n.dashboard-content .box:first-child {\n  background: linear-gradient(180deg, #9AC849, transparent);\n}\n\n.dashboard-content .box:nth-child(2) {\n  background: linear-gradient(180deg, #3DC6EF, transparent);\n}\n\n.dashboard-content .box:nth-child(3) {\n  background: linear-gradient(180deg, #407BFF, transparent);\n}\n\n.transition {\n  transition: background 0.25s ease, color 0.25s ease;\n}\n\n.swiper-container {\n  width: 100%;\n  height: 100%;\n}\n\n.swiper-slide {\n  background: #ffffff;\n  color: #000;\n  text-align: center;\n}\n\n.swiper-container > .swiper-button-next:after {\n  content: \"next\" !important;\n  width: 30px !important;\n  font-size: 18px !important;\n  background-color: white !important;\n  padding: 20px !important;\n  border-radius: 50% !important;\n  opacity: 1 !important;\n  line-height: 0.1 !important;\n  margin-right: 25px !important;\n  color: black !important;\n  font-weight: 800 !important;\n}\n\n.swiper-container > .swiper-button-prev:after {\n  display: flex;\n  justify-content: center;\n  content: \"prev\" !important;\n  width: 30px !important;\n  font-size: 18px !important;\n  background-color: white !important;\n  padding: 20px !important;\n  border-radius: 50% !important;\n  opacity: 1 !important;\n  line-height: 0.1 !important;\n  margin-left: 25px !important;\n  color: black !important;\n  font-weight: 800 !important;\n}\n\n.swiper-slide img {\n  display: block;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n\n.swiper-pagination-bullet {\n  width: 14px;\n  height: 14px;\n  text-align: center;\n  line-height: 20px;\n  font-size: 12px;\n  color: #fff;\n  opacity: 1;\n  background: transparent;\n  border: 2px solid white;\n}\n\n.swiper-pagination-bullet-active {\n  color: transparent;\n  background: white;\n}\n\n.swiper-pagination-bullet {\n  width: 14px;\n  height: 14px;\n  text-align: center;\n  line-height: 20px;\n  font-size: 12px;\n  color: #fff;\n  opacity: 1;\n  background: transparent;\n  border: 2px solid white;\n}\n\n.swiper-pagination-bullet-active {\n  color: transparent;\n  background: white;\n}\n\n.swiper-pagination-fraction {\n  top: 10px !important;\n  right: 10px !important;\n  bottom: unset !important;\n  left: unset !important;\n  width: 60px;\n  position: absolute !important;\n  background: rgb(0, 0, 0) !important;\n  color: white !important;\n  border-radius: 20px !important;\n  opacity: 0.6 !important;\n  text-align: center !important;\n}\n\n.button-right .swiper-pagination.swiper-pagination-bullets {\n  text-align: end;\n}\n\n.rounded-lg.bg-white .bg-white .carousel-pro {\n  background-repeat: repeat;\n  background-position: center;\n  background-size: contain;\n  padding: 16px 16px 12px;\n  border-radius: 18px;\n}\n\n.button-right .swiper-pagination-bullet {\n  width: 20px;\n  height: 3px;\n  border-radius: 0;\n  border: 1px solid transparent !important;\n  background: #989ecb;\n}\n\n.button-right .swiper-pagination-bullet-active {\n  width: 25px !important;\n  height: 6px !important;\n  background-color: #2563eb !important;\n}\n\n.img-wrap img {\n  width: 180px;\n  height: 160px;\n}\n\n.zoom.img-wrap {\n  transition: transform 0.2s;\n}\n\n.zoom.img-wrap:hover {\n  transform: scale(0.9);\n  transition: transform 0.2s;\n}\n\n.dashboard-page .img-wrap img {\n  width: 85px;\n  height: 85px;\n  border-radius: 100%;\n}\n\n.dashboard-page .swiper-button a {\n  background-color: #effafe;\n  padding: 6px;\n  color: #3c6ceb;\n}\n\n.dashboard-page .swiper-text {\n  font-size: 11px;\n}\n\n.dashboard-content .box .percent {\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.dashboard-content .box .number {\n  position: absolute;\n  top: 50px;\n}\n\n.dashboard-content .box .percent svg {\n  width: 100px;\n  height: 130px;\n  transform: translate(0px, 20px);\n}\n\n.dashboard-content .box .percent svg circle {\n  width: 150px;\n  height: 150px;\n  fill: none;\n  stroke-width: 10;\n  stroke: #000;\n  transform: translate(5px, 5px);\n  stroke-dasharray: 440;\n  stroke-dashoffset: 440;\n  stroke-linecap: round;\n}\n\n.dashboard-content .box .percent svg circle:nth-child(1) {\n  stroke-dashoffset: 0;\n  stroke: #fff;\n  stroke-width: 3px;\n}\n\n.dashboard-content .box .percent.job svg circle:nth-child(2) {\n  stroke-dashoffset: 0;\n  stroke: #fff;\n  transition: 0.2s linear;\n}\n\n.dashboard-content .box .percent.finance svg circle:nth-child(2) {\n  stroke-dashoffset: 431.2;\n  stroke: #fff;\n  transition: 0.2s linear;\n}\n\n.dashboard-content .box .percent.skill svg circle:nth-child(2) {\n  stroke-dashoffset: 374;\n  stroke: #fff;\n  transition: 0.2s linear;\n}\n\n.dashboard-content .box .percent.job svg circle:nth-child(3) {\n  stroke-dashoffset: 387.2;\n  stroke: #fff;\n  transition: 0.2s linear;\n}\n\n.dashboard-content .box .percent.finance svg circle:nth-child(3) {\n  stroke-dashoffset: 0;\n  stroke: #fff;\n  transition: 0.2s linear;\n}\n\n.dashboard-content .box .percent.skill svg circle:nth-child(3) {\n  stroke-dashoffset: 0;\n  stroke: #fff;\n  transition: 0.2s linear;\n}\n\n.dashboard-content .box .percent .number h2 {\n  font-size: 25px;\n  font-weight: 700;\n}\n\n.dashboard-content .box .percent .number h2 span {\n  font-size: 0.5em;\n}\n\n.dashboard-content .box .text {\n  color: #fff;\n  font-weight: 600;\n  letter-spacing: 1px;\n  font-size: 18px;\n}\n\n@media only screen and (max-width: 800px) {\n  .dashboard-content .content {\n    flex-direction: column;\n  }\n}\n@media only screen and (max-width: 767px) {\n  .dashboard-content .box .number {\n    left: 60px;\n  }\n  .dashboard-content .box {\n    position: relative;\n    width: 100% !important;\n    height: auto;\n    flex-direction: column;\n    transition: 0.2s linear;\n    margin-left: auto;\n    margin-right: auto;\n    text-align: center;\n    justify-content: center;\n    align-items: center;\n    display: flex !important;\n  }\n  .dashboard-content .box .percent {\n    position: relative;\n    width: 150px;\n    text-align: center;\n    height: 150px;\n    display: block;\n    margin-left: auto;\n    align-items: center;\n    margin-right: auto;\n  }\n  .dashboard-content .box .percent svg {\n    margin-left: 25px;\n  }\n  .p-5.pt-0.rounded-md.bg-white.border-b.border-gray-200.overflow-hidden.shadow .w-1\\/5.mt-5 {\n    display: block;\n    margin-left: auto;\n    margin-right: auto;\n    width: 100%;\n  }\n  .p-5.pt-0.rounded-md.bg-white.border-b.border-gray-200.overflow-hidden.shadow .w-1\\/5.mt-5 img {\n    display: block;\n    margin-left: auto;\n    margin-right: auto;\n  }\n  .p-5.pt-0.rounded-md.bg-white.border-b.border-gray-200.overflow-hidden.shadow .mt-2.text-center.w-4\\/5.pr-12 {\n    padding-right: 0;\n    width: 100%;\n  }\n  .p-5.pt-0.rounded-md.bg-white.border-b.border-gray-200.overflow-hidden.shadow .mb-0.lg\\:flex {\n    justify-content: center;\n    align-items: center;\n    text-align: center;\n  }\n  .p-5.pt-0.rounded-md.bg-white.border-b.border-gray-200.overflow-hidden.shadow .w-4\\/5 {\n    width: 100%;\n  }\n  .p-5.pt-0.rounded-md.bg-white.border-b.border-gray-200.overflow-hidden.shadow p.ml-2.text-base.text-black.font-semibold {\n    margin-left: 0;\n    text-align: center;\n    width: 100%;\n  }\n  .flex.mt-2.items-end.justify-end.max-w-7xl.mx-auto.w-full.-m-16 {\n    margin-top: 0 !important;\n    width: 100% !important;\n    margin-left: auto;\n    margin-right: auto;\n    display: block;\n  }\n  .lg\\:flex.mt-8.items-end.lg\\:justify-between.max-w-7xl.mx-auto.lg\\:max-w-7xl {\n    width: 100%;\n    text-align: center;\n  }\n}"],
  encapsulation: 2,
  changeDetection: 0
});

/***/ }),

/***/ 445642:
/*!************************************************************************!*\
  !*** ./libs/web/ui/carousel-pro/src/lib/web-ui-carousel-pro.module.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebUiCarouselProModule": () => (/* binding */ WebUiCarouselProModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 224006);
/* harmony import */ var _web_ui_carousel_pro_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./web-ui-carousel-pro.component */ 130585);
/* harmony import */ var swiper_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! swiper/angular */ 999485);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);






class WebUiCarouselProModule {}
WebUiCarouselProModule.ɵfac = function WebUiCarouselProModule_Factory(t) {
  return new (t || WebUiCarouselProModule)();
};
WebUiCarouselProModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebUiCarouselProModule
});
WebUiCarouselProModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormsModule, swiper_angular__WEBPACK_IMPORTED_MODULE_4__.SwiperModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebUiCarouselProModule, {
    declarations: [_web_ui_carousel_pro_component__WEBPACK_IMPORTED_MODULE_5__.WebUiCarouselProComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormsModule, swiper_angular__WEBPACK_IMPORTED_MODULE_4__.SwiperModule],
    exports: [_web_ui_carousel_pro_component__WEBPACK_IMPORTED_MODULE_5__.WebUiCarouselProComponent]
  });
})();

/***/ }),

/***/ 119052:
/*!***********************************************************!*\
  !*** ./libs/web/ui/page/src/lib/web-ui-page.component.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebUiPageComponent": () => (/* binding */ WebUiPageComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _carousel_pro_src_lib_web_ui_carousel_pro_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../carousel-pro/src/lib/web-ui-carousel-pro.component */ 130585);




const _c0 = ["pageBody"];
const _c1 = ["dataBody"];
function WebUiPageComponent_div_5_ng_container_8_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0);
  }
}
function WebUiPageComponent_div_5_ng_container_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, WebUiPageComponent_div_5_ng_container_8_ng_container_2_Template, 1, 0, "ng-container", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r4.metaTitleTemplate);
  }
}
function WebUiPageComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 9)(1, "div", 10)(2, "h2", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "h2", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "h2", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, WebUiPageComponent_div_5_ng_container_8_Template, 3, 1, "ng-container", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](11, 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r1.headerTitle, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r1.title, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r1.firmName, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1.metaTitleTemplate);
  }
}
function WebUiPageComponent_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "ui-carousel-pro", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("carouselType", "minSwipeDistance")("images", ctx_r2.advertisementBanners);
  }
}
const _c2 = ["*", [["ui-page-header"]]];
const _c3 = ["*", "ui-page-header"];
class WebUiPageComponent {
  // ngAfterViewInit() {
  // console.log("adsf")
  // this.pageBody.nativeElement.parentElement.classList.add('w-full');
  // this.dataBody.nativeElement.parentElement.classList.add('w-full');
  // this.autoHeightFixer(this.dataBody.nativeElement, this.dataBody.nativeElement, 200)
  // }
  // autoHeightFixer(layerInElement, targetElement, delay = 0) {
  //   if (targetElement) {
  //     setTimeout(() => {
  //       const layerOutElement = this.findTectonicPlate(layerInElement);
  //       if (layerOutElement) {
  //         Array(...layerOutElement.children).forEach((child) => {
  //           if (child.name == 'ng-component') {
  //             child.style.height = '100%';
  //           }
  //         });
  //         const emptyFooterSpacePx = layerOutElement.clientHeight - layerInElement.clientHeight;
  //         const currentActiveGridHeightPx = targetElement.clientHeight;
  //         const formulatedHeight = (currentActiveGridHeightPx + emptyFooterSpacePx) - (((currentActiveGridHeightPx + emptyFooterSpacePx) / 100) * 10)
  //         targetElement.style.height = formulatedHeight.toString() + 'px';
  //       }
  //     }, delay);
  //   }
  // }
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
WebUiPageComponent.ɵfac = function WebUiPageComponent_Factory(t) {
  return new (t || WebUiPageComponent)();
};
WebUiPageComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebUiPageComponent,
  selectors: [["ui-page"]],
  viewQuery: function WebUiPageComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c1, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.pageBody = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.dataBody = _t.first);
    }
  },
  inputs: {
    headerTitle: "headerTitle",
    title: "title",
    firmName: "firmName",
    metaTitleTemplate: "metaTitleTemplate",
    controlsTemplate: "controlsTemplate",
    advertisementBanners: "advertisementBanners"
  },
  ngContentSelectors: _c3,
  decls: 11,
  vars: 4,
  consts: [[1, "absolute", "inset-0", "flex", "flex-col", "min-h-0"], ["pageBody", ""], [1, "flex", "flex-col", "flex-0", "bg-white", "dark:bg-gray-800"], [1, "mx-auto", "px-4", "sm:px-6", "lg:px-8", "w-full", "border-t", "border-gray-200", "dark:border-gray-700"], ["class", "lg:flex mt-0 items-center lg:justify-between mx-auto lg:w-full px-3 md:px-6 lg:px-8 bg-white dark:shadow-none dark:border-b shadow", 4, "ngIf"], [4, "ngIf"], [1, "flex-grow", "p-2", "md:p-4", "overflow-auto"], ["dataBody", ""], [1, "mx-auto", "h-full"], [1, "lg:flex", "mt-0", "items-center", "lg:justify-between", "mx-auto", "lg:w-full", "px-3", "md:px-6", "lg:px-8", "bg-white", "dark:shadow-none", "dark:border-b", "shadow"], [1, "flex-1", "min-w-0"], [1, "text-xl", "font-bold", "leading-7", "text-gray-900", "dark:text-gray-100", "sm:text-2xl", "sm:truncate"], [1, "text-md", "font-semibold", "pb-0", "pt-0", "text-gray-600", "dark:text-gray-100", "sm:text-1xl", "sm:truncate"], [1, "text-md", "font-normal", "text-gray-600", "dark:text-gray-100", "sm:text-1xl", "sm:truncate"], [1, "mt-5", "flex", "lg:mt-0", "lg:ml-4"], [1, "mt-1", "flex", "flex-col", "sm:flex-row", "sm:flex-wrap", "sm:mt-0", "sm:space-x-6"], [4, "ngTemplateOutlet"], [1, "flex", "mt-2", "items-end", "justify-end", "max-w-7xl", "mx-auto", "w-full", "-m-16", 2, "margin-top", "-100px", "margin-bottom", "-16px"], [3, "carouselType", "images"]],
  template: function WebUiPageComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"](_c2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0, 1)(2, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, WebUiPageComponent_div_5_Template, 12, 4, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, WebUiPageComponent_ng_container_6_Template, 3, 2, "ng-container", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 6, 7)(9, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("max-height", "calc(100vh - 60px)");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.headerTitle || ctx.metaTitleTemplate);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.advertisementBanners);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgTemplateOutlet, _carousel_pro_src_lib_web_ui_carousel_pro_component__WEBPACK_IMPORTED_MODULE_2__.WebUiCarouselProComponent],
  encapsulation: 2
});

/***/ }),

/***/ 583747:
/*!********************************************************!*\
  !*** ./libs/web/ui/page/src/lib/web-ui-page.module.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebUiPageModule": () => (/* binding */ WebUiPageModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _web_ui_page_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./web-ui-page.component */ 119052);
/* harmony import */ var _carousel_pro_src__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../carousel-pro/src */ 445642);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);





class WebUiPageModule {}
WebUiPageModule.ɵfac = function WebUiPageModule_Factory(t) {
  return new (t || WebUiPageModule)();
};
WebUiPageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebUiPageModule
});
WebUiPageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule, _carousel_pro_src__WEBPACK_IMPORTED_MODULE_3__.WebUiCarouselProModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebUiPageModule, {
    declarations: [_web_ui_page_component__WEBPACK_IMPORTED_MODULE_4__.WebUiPageComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule, _carousel_pro_src__WEBPACK_IMPORTED_MODULE_3__.WebUiCarouselProModule],
    exports: [_web_ui_page_component__WEBPACK_IMPORTED_MODULE_4__.WebUiPageComponent]
  });
})();

/***/ })

}]);