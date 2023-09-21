"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["libs_web_case-pre-problem_feature_src_lib_web-case-pre-problem-detail_web-case-pre-problem-de-7b1f7f"],{

/***/ 48682:
/*!**************************************************************************************************************!*\
  !*** ./libs/web/case-pre-problem/feature/src/lib/web-case-pre-problem-detail/overview/overview.component.ts ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebCasePreProblemOverviewComponent": () => (/* binding */ WebCasePreProblemOverviewComponent)
/* harmony export */ });
/* harmony import */ var _case_clinical_web_case_pre_problem_shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @case-clinical/web/case-pre-problem/shared */ 909210);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 194813);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);








function WebCasePreProblemOverviewComponent_ng_container_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "ui-formly-json-form", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const vm_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().ngIf;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", false)("componentStore", ctx_r2.store)("model", vm_r1.item);
  }
}
function WebCasePreProblemOverviewComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WebCasePreProblemOverviewComponent_ng_container_0_ng_container_1_Template, 2, 3, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const vm_r1 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", vm_r1.item);
  }
}
class WebCasePreProblemOverviewComponent {
  constructor(store, router, route) {
    this.store = store;
    this.router = router;
    this.route = route;
    this.vm$ = this.store.vm$;
  }
  ngOnInit() {
    this.store.loadCasePreProblemEffect(this.route.params.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.pluck)('casePreProblemId')));
    this.subscriber = this.store.actionResult$.subscribe(({
      done,
      item
    }) => {
      if (done) {
        this.router.navigate(['../../../'], {
          relativeTo: this.route
        });
      }
    });
  }
  ngOnDestroy() {
    var _a;
    (_a = this.subscriber) === null || _a === void 0 ? void 0 : _a.unsubscribe();
  }
  deleteItem(item) {
    if (confirm('Are you sure?')) {
      this.store.deleteCasePreProblemEffect();
    }
  }
}
WebCasePreProblemOverviewComponent.ɵfac = function WebCasePreProblemOverviewComponent_Factory(t) {
  return new (t || WebCasePreProblemOverviewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_case_pre_problem_shared__WEBPACK_IMPORTED_MODULE_2__.WebCasePreProblemFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.ActivatedRoute));
};
WebCasePreProblemOverviewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebCasePreProblemOverviewComponent,
  selectors: [["ng-component"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_case_clinical_web_case_pre_problem_shared__WEBPACK_IMPORTED_MODULE_2__.WebCasePreProblemFeatureStore])],
  decls: 2,
  vars: 3,
  consts: [[4, "ngIf"], ["formName", "casePreProblem_overview", 3, "showSubmitButton", "componentStore", "model"]],
  template: function WebCasePreProblemOverviewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, WebCasePreProblemOverviewComponent_ng_container_0_Template, 2, 1, "ng-container", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](1, "async");
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](1, 1, ctx.vm$));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_5__.WebUiFormlyJsonFormComponent, _angular_common__WEBPACK_IMPORTED_MODULE_4__.AsyncPipe],
  encapsulation: 2
});

/***/ }),

/***/ 461877:
/*!************************************************************************************************************************!*\
  !*** ./libs/web/case-pre-problem/feature/src/lib/web-case-pre-problem-detail/web-case-pre-problem-detail.component.ts ***!
  \************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebCasePreProblemDetailComponent": () => (/* binding */ WebCasePreProblemDetailComponent)
/* harmony export */ });
/* harmony import */ var _web_case_pre_problem_detail_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./web-case-pre-problem-detail.store */ 984218);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 318505);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 782722);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _fuse_services_media_watcher__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fuse/services/media-watcher */ 772327);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/sidenav */ 523267);
/* harmony import */ var _fuse_components_navigation_vertical_vertical_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @fuse/components/navigation/vertical/vertical.component */ 156739);
/* harmony import */ var _fuse_directives_scroll_reset_scroll_reset_directive__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @fuse/directives/scroll-reset/scroll-reset.directive */ 932871);















const _c0 = ["matDrawer"];
class WebCasePreProblemDetailComponent {
  constructor(store, route, _changeDetectorRef, _fuseMediaWatcherService) {
    this.store = store;
    this.route = route;
    this._changeDetectorRef = _changeDetectorRef;
    this._fuseMediaWatcherService = _fuseMediaWatcherService;
    this.menuData = [];
    this._unsubscribeAll = new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subject();
    this.vm$ = this.store.vm$;
  }
  ngAfterViewInit() {
    var routeString = this.route.snapshot.pathFromRoot.map(r => r.url).join('/').replace('//', '/');
    this.vm$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(s => {
      var _a;
      if (((_a = s === null || s === void 0 ? void 0 : s.item) === null || _a === void 0 ? void 0 : _a.id) != undefined) {
        this.menuData = [{
          id: 'Details',
          title: 'Case Pre Problem Details',
          type: 'group',
          children: [{
            id: 'details.overview',
            title: 'Overview',
            type: 'basic',
            link: `${routeString}/overview`
          }]
        }];
      }
    })).subscribe();
  }
  ngOnInit() {
    // Subscribe to media query change
    this._fuseMediaWatcherService.onMediaChange$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(this._unsubscribeAll)).subscribe(({
      matchingAliases
    }) => {
      // Set the drawerMode and drawerOpened
      if (matchingAliases.includes('md')) {
        this.drawerMode = 'side';
        this.drawerOpened = true;
      } else {
        this.drawerMode = 'over';
        this.drawerOpened = false;
      }
      // Mark for check
      this._changeDetectorRef.markForCheck();
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
  deleteItem(item) {
    if (confirm('Are you sure?')) {
      this.store.deleteCasePreProblemEffect(item);
    }
  }
}
WebCasePreProblemDetailComponent.ɵfac = function WebCasePreProblemDetailComponent_Factory(t) {
  return new (t || WebCasePreProblemDetailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_web_case_pre_problem_detail_store__WEBPACK_IMPORTED_MODULE_4__.WebCasePreProblemDetailStore), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_fuse_services_media_watcher__WEBPACK_IMPORTED_MODULE_6__.FuseMediaWatcherService));
};
WebCasePreProblemDetailComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: WebCasePreProblemDetailComponent,
  selectors: [["ng-component"]],
  viewQuery: function WebCasePreProblemDetailComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c0, 7);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.matDrawer = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵProvidersFeature"]([_web_case_pre_problem_detail_store__WEBPACK_IMPORTED_MODULE_4__.WebCasePreProblemDetailStore])],
  decls: 10,
  vars: 9,
  consts: [[1, "flex", "flex-col", "w-full", "overflow-hidden"], [1, "flex-auto", "h-full"], [1, "w-60", "dark:bg-gray-900", 3, "autoFocus", "mode", "opened"], ["matDrawer", ""], [3, "navigation", "inner", "mode", "name", "opened"], ["fuseScrollReset", "", 1, "flex", "flex-col"], [1, "flex-auto", "flex", "flex-col"], ["mat-icon-button", "", 1, "ml-4", "md:hidden", "absolute", "left-4", "top-2", "sm:left-1", "sm:top-8", 3, "click"], [3, "svgIcon"]],
  template: function WebCasePreProblemDetailComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "mat-drawer-container", 1)(2, "mat-drawer", 2, 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](4, "fuse-vertical-navigation", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "mat-drawer-content", 5)(6, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](7, "router-outlet");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "button", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function WebCasePreProblemDetailComponent_Template_button_click_8_listener() {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](3);
        return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](_r0.toggle());
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](9, "mat-icon", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("autoFocus", false)("mode", ctx.drawerMode)("opened", ctx.drawerOpened);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("navigation", ctx.menuData)("inner", true)("mode", "side")("name", "docs-guides-navigation")("opened", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("svgIcon", "heroicons_outline:menu");
    }
  },
  dependencies: [_angular_material_button__WEBPACK_IMPORTED_MODULE_7__.MatIconButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__.MatIcon, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_9__.MatDrawer, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_9__.MatDrawerContainer, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_9__.MatDrawerContent, _fuse_components_navigation_vertical_vertical_component__WEBPACK_IMPORTED_MODULE_10__.FuseVerticalNavigationComponent, _fuse_directives_scroll_reset_scroll_reset_directive__WEBPACK_IMPORTED_MODULE_11__.FuseScrollResetDirective, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterOutlet],
  encapsulation: 2,
  changeDetection: 0
});

/***/ }),

/***/ 991647:
/*!*********************************************************************************************************************!*\
  !*** ./libs/web/case-pre-problem/feature/src/lib/web-case-pre-problem-detail/web-case-pre-problem-detail.module.ts ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebCasePreProblemDetailModule": () => (/* binding */ WebCasePreProblemDetailModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @case-clinical/web/ui/button */ 510948);
/* harmony import */ var _case_clinical_web_ui_page_header__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @case-clinical/web/ui/page-header */ 752707);
/* harmony import */ var _case_clinical_web_ui_panel__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @case-clinical/web/ui/panel */ 776301);
/* harmony import */ var _case_clinical_web_ui_card_header__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @case-clinical/web/ui/card-header */ 726693);
/* harmony import */ var _case_clinical_web_ui_page__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @case-clinical/web/ui/page */ 583747);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/sidenav */ 523267);
/* harmony import */ var _angular_material_tree__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/tree */ 135423);
/* harmony import */ var _fuse_components_highlight__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fuse/components/highlight */ 205029);
/* harmony import */ var _fuse_components_alert__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fuse/components/alert */ 718413);
/* harmony import */ var _fuse_components_navigation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @fuse/components/navigation */ 352221);
/* harmony import */ var _fuse_directives_scroll_reset__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @fuse/directives/scroll-reset */ 634697);
/* harmony import */ var libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! libs/shared/shared.module */ 423387);
/* harmony import */ var _web_case_pre_problem_detail_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./web-case-pre-problem-detail.component */ 461877);
/* harmony import */ var _overview_overview_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./overview/overview.component */ 48682);
/* harmony import */ var _case_clinical_web_ui_description_list__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @case-clinical/web/ui/description-list */ 3841);
/* harmony import */ var _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @case-clinical/web/shared/ui */ 362610);
/* harmony import */ var _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @case-clinical/web/shared/ui */ 271992);
/* harmony import */ var _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @case-clinical/web/core/feature */ 811091);
/* harmony import */ var _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @case-clinical/web/ui/formly-designer */ 408916);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
























class WebCasePreProblemDetailModule {}
WebCasePreProblemDetailModule.ɵfac = function WebCasePreProblemDetailModule_Factory(t) {
  return new (t || WebCasePreProblemDetailModule)();
};
WebCasePreProblemDetailModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebCasePreProblemDetailModule
});
WebCasePreProblemDetailModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_material_button__WEBPACK_IMPORTED_MODULE_1__.MatButtonModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__.MatIconModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_3__.MatSidenavModule, _angular_material_tree__WEBPACK_IMPORTED_MODULE_4__.MatTreeModule, _fuse_components_highlight__WEBPACK_IMPORTED_MODULE_5__.FuseHighlightModule, _fuse_components_alert__WEBPACK_IMPORTED_MODULE_6__.FuseAlertModule, _fuse_components_navigation__WEBPACK_IMPORTED_MODULE_7__.FuseNavigationModule, _fuse_directives_scroll_reset__WEBPACK_IMPORTED_MODULE_8__.FuseScrollResetModule, libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_9__.SharedModule, _angular_common__WEBPACK_IMPORTED_MODULE_10__.CommonModule, _case_clinical_web_ui_panel__WEBPACK_IMPORTED_MODULE_11__.WebUiPanelModule, _case_clinical_web_ui_description_list__WEBPACK_IMPORTED_MODULE_12__.WebUiDescriptionListModule, _case_clinical_web_ui_card_header__WEBPACK_IMPORTED_MODULE_13__.WebUiCardHeaderModule, _case_clinical_web_ui_page__WEBPACK_IMPORTED_MODULE_14__.WebUiPageModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_15__.UtilitySharedModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_16__.UiFormsSharedModule, _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_17__.WebCoreFeatureModule, _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_18__.WebUiFormlyDesignerModule, _angular_router__WEBPACK_IMPORTED_MODULE_19__.RouterModule.forChild([{
    path: '',
    component: _web_case_pre_problem_detail_component__WEBPACK_IMPORTED_MODULE_20__.WebCasePreProblemDetailComponent,
    children: [{
      path: 'overview',
      pathMatch: 'full',
      component: _overview_overview_component__WEBPACK_IMPORTED_MODULE_21__.WebCasePreProblemOverviewComponent
    }, {
      path: 'edit',
      loadChildren: () => __webpack_require__.e(/*! import() */ "libs_web_case-pre-problem_feature_src_lib_web-case-pre-problem-edit_web-case-pre-problem-edit-1bc428").then(__webpack_require__.bind(__webpack_require__, /*! ../web-case-pre-problem-edit/web-case-pre-problem-edit.module */ 523695)).then(m => m.WebCasePreProblemEditModule)
    }, {
      path: '',
      pathMatch: 'full',
      redirectTo: 'overview'
    }]
  }]), _case_clinical_web_ui_page_header__WEBPACK_IMPORTED_MODULE_22__.WebUiPageHeaderModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_23__.WebUiButtonModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebCasePreProblemDetailModule, {
    declarations: [_web_case_pre_problem_detail_component__WEBPACK_IMPORTED_MODULE_20__.WebCasePreProblemDetailComponent, _overview_overview_component__WEBPACK_IMPORTED_MODULE_21__.WebCasePreProblemOverviewComponent],
    imports: [_angular_material_button__WEBPACK_IMPORTED_MODULE_1__.MatButtonModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__.MatIconModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_3__.MatSidenavModule, _angular_material_tree__WEBPACK_IMPORTED_MODULE_4__.MatTreeModule, _fuse_components_highlight__WEBPACK_IMPORTED_MODULE_5__.FuseHighlightModule, _fuse_components_alert__WEBPACK_IMPORTED_MODULE_6__.FuseAlertModule, _fuse_components_navigation__WEBPACK_IMPORTED_MODULE_7__.FuseNavigationModule, _fuse_directives_scroll_reset__WEBPACK_IMPORTED_MODULE_8__.FuseScrollResetModule, libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_9__.SharedModule, _angular_common__WEBPACK_IMPORTED_MODULE_10__.CommonModule, _case_clinical_web_ui_panel__WEBPACK_IMPORTED_MODULE_11__.WebUiPanelModule, _case_clinical_web_ui_description_list__WEBPACK_IMPORTED_MODULE_12__.WebUiDescriptionListModule, _case_clinical_web_ui_card_header__WEBPACK_IMPORTED_MODULE_13__.WebUiCardHeaderModule, _case_clinical_web_ui_page__WEBPACK_IMPORTED_MODULE_14__.WebUiPageModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_15__.UtilitySharedModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_16__.UiFormsSharedModule, _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_17__.WebCoreFeatureModule, _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_18__.WebUiFormlyDesignerModule, _angular_router__WEBPACK_IMPORTED_MODULE_19__.RouterModule, _case_clinical_web_ui_page_header__WEBPACK_IMPORTED_MODULE_22__.WebUiPageHeaderModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_23__.WebUiButtonModule]
  });
})();

/***/ }),

/***/ 984218:
/*!********************************************************************************************************************!*\
  !*** ./libs/web/case-pre-problem/feature/src/lib/web-case-pre-problem-detail/web-case-pre-problem-detail.store.ts ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebCasePreProblemDetailStore": () => (/* binding */ WebCasePreProblemDetailStore)
/* harmony export */ });
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 318505);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 763900);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 194813);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @case-clinical/web/ui/toast */ 971873);









class WebCasePreProblemDetailStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
  constructor(data, router, route, toast) {
    super({
      loading: false
    });
    this.data = data;
    this.router = router;
    this.route = route;
    this.toast = toast;
    this.errors$ = this.select(s => s.errors);
    this.loading$ = this.select(s => s.loading);
    this.item$ = this.select(s => s.item);
    this.displayItems$ = this.select(this.item$, item => [{
      label: 'Id',
      value: item === null || item === void 0 ? void 0 : item.id
    }, {
      label: 'Name',
      value: item === null || item === void 0 ? void 0 : item.name
    }, {
      label: 'Same Region',
      value: item === null || item === void 0 ? void 0 : item.sameRegion
    }, {
      label: 'Problem Date',
      value: item === null || item === void 0 ? void 0 : item.problemDate
    }, {
      label: 'Duration',
      value: item === null || item === void 0 ? void 0 : item.duration
    }, {
      label: 'Symptoms',
      value: item === null || item === void 0 ? void 0 : item.symptoms
    }, {
      label: 'Regions',
      value: item === null || item === void 0 ? void 0 : item.regions
    }, {
      label: 'Removed',
      value: item === null || item === void 0 ? void 0 : item.removed
    }]);
    this.tabs$ = this.select(this.item$, item => [{
      label: 'Details',
      path: 'details',
      data: item
    }]);
    this.vm$ = this.select(this.errors$, this.loading$, this.item$, this.tabs$, (errors, loading, item, tabs) => ({
      errors,
      loading,
      item: Object.assign({}, item),
      tabs
    }), {
      debounce: true
    });
    this.loadCasePreProblemEffect = this.effect(casePreProblemId$ => casePreProblemId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.setState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(casePreProblemId => this.data.userCasePreProblem({
      casePreProblemId
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      item: res.data.item,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.deleteCasePreProblemEffect = this.effect(casePreProblem$ => casePreProblem$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(casePreProblem => this.data.userDeleteCasePreProblem({
      casePreProblemId: casePreProblem.id
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      this.toast.success("Deleted successfully!", {
        duration: 3000
      });
      return this.router.navigate(['/queues/case-pre-problems']);
    }, errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.loadCasePreProblemEffect(route.params.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.pluck)('casePreProblemId')));
  }
}
WebCasePreProblemDetailStore.ɵfac = function WebCasePreProblemDetailStore_Factory(t) {
  return new (t || WebCasePreProblemDetailStore)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_5__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_7__.WebUiToastService));
};
WebCasePreProblemDetailStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
  token: WebCasePreProblemDetailStore,
  factory: WebCasePreProblemDetailStore.ɵfac
});

/***/ })

}]);