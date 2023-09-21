"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["libs_web_case-account_feature_src_lib_web-case-account-detail_web-case-account-detail_module_ts"],{

/***/ 88039:
/*!******************************************************************************************************!*\
  !*** ./libs/web/case-account/feature/src/lib/web-case-account-detail/overview/overview.component.ts ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebCaseAccountOverviewComponent": () => (/* binding */ WebCaseAccountOverviewComponent)
/* harmony export */ });
/* harmony import */ var _case_clinical_web_case_account_shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @case-clinical/web/case-account/shared */ 42897);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 194813);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);








function WebCaseAccountOverviewComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "ui-formly-json-form", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const vm_r1 = ctx.ngIf;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSubmitButton", false)("componentStore", ctx_r0.store)("model", vm_r1.item);
  }
}
class WebCaseAccountOverviewComponent {
  constructor(store, router, route) {
    this.store = store;
    this.router = router;
    this.route = route;
    this.vm$ = this.store.vm$;
  }
  ngOnInit() {
    this.store.loadCaseAccountEffect(this.route.params.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.pluck)('caseAccountId')));
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
      this.store.deleteCaseAccountEffect();
    }
  }
  caseAccountPaymentAdded($event) {
    console.log('from the overview in Case Account, added: ', $event);
  }
  journalEntryAdded($event) {
    console.log('from the overview in Case Account, added: ', $event);
  }
  writeOffAdded($event) {
    console.log('from the overview in Case Account, added: ', $event);
  }
}
WebCaseAccountOverviewComponent.ɵfac = function WebCaseAccountOverviewComponent_Factory(t) {
  return new (t || WebCaseAccountOverviewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_case_account_shared__WEBPACK_IMPORTED_MODULE_2__.WebCaseAccountFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.ActivatedRoute));
};
WebCaseAccountOverviewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebCaseAccountOverviewComponent,
  selectors: [["ng-component"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_case_clinical_web_case_account_shared__WEBPACK_IMPORTED_MODULE_2__.WebCaseAccountFeatureStore])],
  decls: 2,
  vars: 3,
  consts: [[4, "ngIf"], ["formName", "caseAccount_overview", 3, "showSubmitButton", "componentStore", "model"]],
  template: function WebCaseAccountOverviewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, WebCaseAccountOverviewComponent_ng_container_0_Template, 2, 3, "ng-container", 0);
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

/***/ 746893:
/*!************************************************************************************************************!*\
  !*** ./libs/web/case-account/feature/src/lib/web-case-account-detail/web-case-account-detail.component.ts ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebCaseAccountDetailComponent": () => (/* binding */ WebCaseAccountDetailComponent)
/* harmony export */ });
/* harmony import */ var _web_case_account_detail_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./web-case-account-detail.store */ 66028);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 318505);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 782722);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _fuse_services_media_watcher__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fuse/services/media-watcher */ 772327);
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/sidenav */ 523267);
/* harmony import */ var _fuse_components_navigation_vertical_vertical_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @fuse/components/navigation/vertical/vertical.component */ 156739);
/* harmony import */ var _fuse_directives_scroll_reset_scroll_reset_directive__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @fuse/directives/scroll-reset/scroll-reset.directive */ 932871);













const _c0 = ["matDrawer"];
class WebCaseAccountDetailComponent {
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
          title: 'Case Account Details',
          type: 'group',
          children: [{
            id: 'details.overview',
            title: 'Overview',
            type: 'basic',
            link: `${routeString}/overview`
          }, {
            id: 'details.caseAccountPayment',
            title: 'Case Account Payments',
            type: 'basic',
            link: `${routeString}/case-account-payments`
          }, {
            id: 'details.journalEntry',
            title: 'Journal Entries',
            type: 'basic',
            link: `${routeString}/journal-entries`
          }, {
            id: 'details.writeOff',
            title: 'Write Offs',
            type: 'basic',
            link: `${routeString}/write-offs`
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
      this.store.deleteCaseAccountEffect(item);
    }
  }
}
WebCaseAccountDetailComponent.ɵfac = function WebCaseAccountDetailComponent_Factory(t) {
  return new (t || WebCaseAccountDetailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_web_case_account_detail_store__WEBPACK_IMPORTED_MODULE_4__.WebCaseAccountDetailStore), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_fuse_services_media_watcher__WEBPACK_IMPORTED_MODULE_6__.FuseMediaWatcherService));
};
WebCaseAccountDetailComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: WebCaseAccountDetailComponent,
  selectors: [["ng-component"]],
  viewQuery: function WebCaseAccountDetailComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c0, 7);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.matDrawer = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵProvidersFeature"]([_web_case_account_detail_store__WEBPACK_IMPORTED_MODULE_4__.WebCaseAccountDetailStore])],
  decls: 8,
  vars: 8,
  consts: [[1, "flex", "flex-col", "w-full", "overflow-hidden"], [1, "flex-auto", "h-full"], [1, "w-60", "dark:bg-gray-900", 3, "autoFocus", "mode", "opened"], ["matDrawer", ""], [3, "navigation", "inner", "mode", "name", "opened"], ["fuseScrollReset", "", 1, "flex", "flex-col"], [1, "flex-auto", "flex", "flex-col"]],
  template: function WebCaseAccountDetailComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "mat-drawer-container", 1)(2, "mat-drawer", 2, 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](4, "fuse-vertical-navigation", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "mat-drawer-content", 5)(6, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](7, "router-outlet");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("autoFocus", false)("mode", ctx.drawerMode)("opened", ctx.drawerOpened);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("navigation", ctx.menuData)("inner", true)("mode", "side")("name", "docs-guides-navigation")("opened", true);
    }
  },
  dependencies: [_angular_material_sidenav__WEBPACK_IMPORTED_MODULE_7__.MatDrawer, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_7__.MatDrawerContainer, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_7__.MatDrawerContent, _fuse_components_navigation_vertical_vertical_component__WEBPACK_IMPORTED_MODULE_8__.FuseVerticalNavigationComponent, _fuse_directives_scroll_reset_scroll_reset_directive__WEBPACK_IMPORTED_MODULE_9__.FuseScrollResetDirective, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterOutlet],
  encapsulation: 2,
  changeDetection: 0
});

/***/ }),

/***/ 597790:
/*!*********************************************************************************************************!*\
  !*** ./libs/web/case-account/feature/src/lib/web-case-account-detail/web-case-account-detail.module.ts ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebCaseAccountDetailModule": () => (/* binding */ WebCaseAccountDetailModule)
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
/* harmony import */ var _web_case_account_detail_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./web-case-account-detail.component */ 746893);
/* harmony import */ var _overview_overview_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./overview/overview.component */ 88039);
/* harmony import */ var _case_clinical_web_ui_description_list__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @case-clinical/web/ui/description-list */ 3841);
/* harmony import */ var _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @case-clinical/web/shared/ui */ 362610);
/* harmony import */ var _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @case-clinical/web/shared/ui */ 271992);
/* harmony import */ var _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @case-clinical/web/core/feature */ 811091);
/* harmony import */ var _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @case-clinical/web/ui/formly-designer */ 408916);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
























class WebCaseAccountDetailModule {}
WebCaseAccountDetailModule.ɵfac = function WebCaseAccountDetailModule_Factory(t) {
  return new (t || WebCaseAccountDetailModule)();
};
WebCaseAccountDetailModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebCaseAccountDetailModule
});
WebCaseAccountDetailModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_material_button__WEBPACK_IMPORTED_MODULE_1__.MatButtonModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__.MatIconModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_3__.MatSidenavModule, _angular_material_tree__WEBPACK_IMPORTED_MODULE_4__.MatTreeModule, _fuse_components_highlight__WEBPACK_IMPORTED_MODULE_5__.FuseHighlightModule, _fuse_components_alert__WEBPACK_IMPORTED_MODULE_6__.FuseAlertModule, _fuse_components_navigation__WEBPACK_IMPORTED_MODULE_7__.FuseNavigationModule, _fuse_directives_scroll_reset__WEBPACK_IMPORTED_MODULE_8__.FuseScrollResetModule, libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_9__.SharedModule, _angular_common__WEBPACK_IMPORTED_MODULE_10__.CommonModule, _case_clinical_web_ui_panel__WEBPACK_IMPORTED_MODULE_11__.WebUiPanelModule, _case_clinical_web_ui_description_list__WEBPACK_IMPORTED_MODULE_12__.WebUiDescriptionListModule, _case_clinical_web_ui_card_header__WEBPACK_IMPORTED_MODULE_13__.WebUiCardHeaderModule, _case_clinical_web_ui_page__WEBPACK_IMPORTED_MODULE_14__.WebUiPageModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_15__.UtilitySharedModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_16__.UiFormsSharedModule, _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_17__.WebCoreFeatureModule, _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_18__.WebUiFormlyDesignerModule, _angular_router__WEBPACK_IMPORTED_MODULE_19__.RouterModule.forChild([{
    path: '',
    component: _web_case_account_detail_component__WEBPACK_IMPORTED_MODULE_20__.WebCaseAccountDetailComponent,
    children: [{
      path: 'overview',
      pathMatch: 'full',
      component: _overview_overview_component__WEBPACK_IMPORTED_MODULE_21__.WebCaseAccountOverviewComponent
    }, {
      path: 'edit',
      loadChildren: () => __webpack_require__.e(/*! import() */ "libs_web_case-account_feature_src_lib_web-case-account-edit_web-case-account-edit_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ../web-case-account-edit/web-case-account-edit.module */ 273558)).then(m => m.WebCaseAccountEditModule)
    }, {
      path: 'case-account-payments',
      loadChildren: () => __webpack_require__.e(/*! import() */ "common").then(__webpack_require__.bind(__webpack_require__, /*! @case-clinical/web/case-account-payment/feature */ 696808)).then(m => m.WebCaseAccountPaymentFeatureModule)
    }, {
      path: 'journal-entries',
      loadChildren: () => __webpack_require__.e(/*! import() */ "common").then(__webpack_require__.bind(__webpack_require__, /*! @case-clinical/web/journal-entry/feature */ 367369)).then(m => m.WebJournalEntryFeatureModule)
    }, {
      path: 'write-offs',
      loadChildren: () => __webpack_require__.e(/*! import() */ "common").then(__webpack_require__.bind(__webpack_require__, /*! @case-clinical/web/write-off/feature */ 583938)).then(m => m.WebWriteOffFeatureModule)
    }, {
      path: '',
      pathMatch: 'full',
      redirectTo: 'overview'
    }]
  }]), _case_clinical_web_ui_page_header__WEBPACK_IMPORTED_MODULE_22__.WebUiPageHeaderModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_23__.WebUiButtonModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebCaseAccountDetailModule, {
    declarations: [_web_case_account_detail_component__WEBPACK_IMPORTED_MODULE_20__.WebCaseAccountDetailComponent, _overview_overview_component__WEBPACK_IMPORTED_MODULE_21__.WebCaseAccountOverviewComponent],
    imports: [_angular_material_button__WEBPACK_IMPORTED_MODULE_1__.MatButtonModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__.MatIconModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_3__.MatSidenavModule, _angular_material_tree__WEBPACK_IMPORTED_MODULE_4__.MatTreeModule, _fuse_components_highlight__WEBPACK_IMPORTED_MODULE_5__.FuseHighlightModule, _fuse_components_alert__WEBPACK_IMPORTED_MODULE_6__.FuseAlertModule, _fuse_components_navigation__WEBPACK_IMPORTED_MODULE_7__.FuseNavigationModule, _fuse_directives_scroll_reset__WEBPACK_IMPORTED_MODULE_8__.FuseScrollResetModule, libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_9__.SharedModule, _angular_common__WEBPACK_IMPORTED_MODULE_10__.CommonModule, _case_clinical_web_ui_panel__WEBPACK_IMPORTED_MODULE_11__.WebUiPanelModule, _case_clinical_web_ui_description_list__WEBPACK_IMPORTED_MODULE_12__.WebUiDescriptionListModule, _case_clinical_web_ui_card_header__WEBPACK_IMPORTED_MODULE_13__.WebUiCardHeaderModule, _case_clinical_web_ui_page__WEBPACK_IMPORTED_MODULE_14__.WebUiPageModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_15__.UtilitySharedModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_16__.UiFormsSharedModule, _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_17__.WebCoreFeatureModule, _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_18__.WebUiFormlyDesignerModule, _angular_router__WEBPACK_IMPORTED_MODULE_19__.RouterModule, _case_clinical_web_ui_page_header__WEBPACK_IMPORTED_MODULE_22__.WebUiPageHeaderModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_23__.WebUiButtonModule]
  });
})();

/***/ }),

/***/ 66028:
/*!********************************************************************************************************!*\
  !*** ./libs/web/case-account/feature/src/lib/web-case-account-detail/web-case-account-detail.store.ts ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebCaseAccountDetailStore": () => (/* binding */ WebCaseAccountDetailStore)
/* harmony export */ });
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 318505);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 763900);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 194813);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @case-clinical/web/ui/toast */ 971873);









class WebCaseAccountDetailStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
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
      label: 'Third Party Funder Name',
      value: item === null || item === void 0 ? void 0 : item.thirdPartyFunderName
    }, {
      label: 'Original Due Date',
      value: item === null || item === void 0 ? void 0 : item.originalDueDate
    }, {
      label: 'Account Term',
      value: item === null || item === void 0 ? void 0 : item.accountTerm
    }, {
      label: 'Service Date',
      value: item === null || item === void 0 ? void 0 : item.serviceDate
    }, {
      label: 'Quantity',
      value: item === null || item === void 0 ? void 0 : item.quantity
    }, {
      label: 'Original Debt',
      value: item === null || item === void 0 ? void 0 : item.originalDebt
    }, {
      label: 'Cost',
      value: item === null || item === void 0 ? void 0 : item.cost
    }, {
      label: 'Balance',
      value: item === null || item === void 0 ? void 0 : item.balance
    }, {
      label: 'Last Balance',
      value: item === null || item === void 0 ? void 0 : item.lastBalance
    }, {
      label: 'Reduction',
      value: item === null || item === void 0 ? void 0 : item.reduction
    }, {
      label: 'Treatment State',
      value: item === null || item === void 0 ? void 0 : item.treatmentState
    }, {
      label: 'Account Number',
      value: item === null || item === void 0 ? void 0 : item.accountNumber
    }, {
      label: 'Services Performed',
      value: item === null || item === void 0 ? void 0 : item.servicesPerformed
    }, {
      label: 'Cpt Codes',
      value: item === null || item === void 0 ? void 0 : item.cptCodes
    }, {
      label: 'Treating Physician',
      value: item === null || item === void 0 ? void 0 : item.treatingPhysician
    }, {
      label: 'Referring Physician',
      value: item === null || item === void 0 ? void 0 : item.referringPhysician
    }, {
      label: 'Collections Date',
      value: item === null || item === void 0 ? void 0 : item.collectionsDate
    }, {
      label: 'Deemed Write off Date',
      value: item === null || item === void 0 ? void 0 : item.deemedWriteOffDate
    }, {
      label: 'Expensed Bad Debt Date',
      value: item === null || item === void 0 ? void 0 : item.expensedBadDebtDate
    }, {
      label: 'Paid Date',
      value: item === null || item === void 0 ? void 0 : item.paidDate
    }, {
      label: 'Ghost Account',
      value: item === null || item === void 0 ? void 0 : item.ghostAccount
    }, {
      label: 'Ghosted Date',
      value: item === null || item === void 0 ? void 0 : item.ghostedDate
    }, {
      label: 'Ghosted by',
      value: item === null || item === void 0 ? void 0 : item.ghostedBy
    }, {
      label: 'Un Ghosted Date',
      value: item === null || item === void 0 ? void 0 : item.unGhostedDate
    }, {
      label: 'Un Ghosted by',
      value: item === null || item === void 0 ? void 0 : item.unGhostedBy
    }, {
      label: 'Additional Payment',
      value: item === null || item === void 0 ? void 0 : item.additionalPayment
    }, {
      label: 'Missing Bill',
      value: item === null || item === void 0 ? void 0 : item.missingBill
    }, {
      label: 'Missing Lien',
      value: item === null || item === void 0 ? void 0 : item.missingLien
    }, {
      label: 'Missing Medical Records',
      value: item === null || item === void 0 ? void 0 : item.missingMedicalRecords
    }, {
      label: 'Assigned to',
      value: item === null || item === void 0 ? void 0 : item.assignedTo
    }, {
      label: 'Resubmitted',
      value: item === null || item === void 0 ? void 0 : item.resubmitted
    }, {
      label: 'Treatment City',
      value: item === null || item === void 0 ? void 0 : item.treatmentCity
    }, {
      label: 'Origination',
      value: item === null || item === void 0 ? void 0 : item.origination
    }, {
      label: 'Threshold Provider Rate',
      value: item === null || item === void 0 ? void 0 : item.thresholdProviderRate
    }, {
      label: 'Threshold Location Rate',
      value: item === null || item === void 0 ? void 0 : item.thresholdLocationRate
    }, {
      label: 'Team Leader Rate Source',
      value: item === null || item === void 0 ? void 0 : item.teamLeaderRateSource
    }, {
      label: 'Check Number',
      value: item === null || item === void 0 ? void 0 : item.checkNumber
    }, {
      label: 'Account Date Received',
      value: item === null || item === void 0 ? void 0 : item.accountDateReceived
    }, {
      label: 'Date Applied',
      value: item === null || item === void 0 ? void 0 : item.dateApplied
    }, {
      label: 'Amount Applied',
      value: item === null || item === void 0 ? void 0 : item.amountApplied
    }, {
      label: 'Description',
      value: item === null || item === void 0 ? void 0 : item.description
    }, {
      label: 'Note',
      value: item === null || item === void 0 ? void 0 : item.note
    }, {
      label: 'Medicare Rate',
      value: item === null || item === void 0 ? void 0 : item.medicareRate
    }, {
      label: 'Provider Percent of Medicare',
      value: item === null || item === void 0 ? void 0 : item.providerPercentOfMedicare
    }, {
      label: 'Contracted Amount',
      value: item === null || item === void 0 ? void 0 : item.contractedAmount
    }, {
      label: 'Markup Percent',
      value: item === null || item === void 0 ? void 0 : item.markupPercent
    }, {
      label: 'Reimbursed Total',
      value: item === null || item === void 0 ? void 0 : item.reimbursedTotal
    }, {
      label: 'Initial Revenue',
      value: item === null || item === void 0 ? void 0 : item.initialRevenue
    }, {
      label: 'Factor',
      value: item === null || item === void 0 ? void 0 : item.factor
    }, {
      label: 'Retail Bill',
      value: item === null || item === void 0 ? void 0 : item.retailBill
    }, {
      label: 'Est Margin',
      value: item === null || item === void 0 ? void 0 : item.estMargin
    }, {
      label: 'Roi',
      value: item === null || item === void 0 ? void 0 : item.roi
    }, {
      label: 'Attorney Paid',
      value: item === null || item === void 0 ? void 0 : item.attorneyPaid
    }, {
      label: 'Percent of Retail',
      value: item === null || item === void 0 ? void 0 : item.percentOfRetail
    }, {
      label: 'Reimbursed From PCR',
      value: item === null || item === void 0 ? void 0 : item.reimbursedFromPCR
    }, {
      label: 'Ingredient Cost',
      value: item === null || item === void 0 ? void 0 : item.ingredientCost
    }, {
      label: 'Dispensing Cost',
      value: item === null || item === void 0 ? void 0 : item.dispensingCost
    }, {
      label: 'Administrative Cost',
      value: item === null || item === void 0 ? void 0 : item.administrativeCost
    }, {
      label: 'Co Pay',
      value: item === null || item === void 0 ? void 0 : item.coPay
    }, {
      label: 'Total Cost',
      value: item === null || item === void 0 ? void 0 : item.totalCost
    }, {
      label: 'Average Wholesale Price',
      value: item === null || item === void 0 ? void 0 : item.averageWholesalePrice
    }, {
      label: 'Weighted Average Cost',
      value: item === null || item === void 0 ? void 0 : item.weightedAverageCost
    }, {
      label: 'Average Sale Price',
      value: item === null || item === void 0 ? void 0 : item.averageSalePrice
    }, {
      label: 'Invoice Cost',
      value: item === null || item === void 0 ? void 0 : item.invoiceCost
    }, {
      label: 'Usual and Customary',
      value: item === null || item === void 0 ? void 0 : item.usualAndCustomary
    }, {
      label: 'National Drug Code',
      value: item === null || item === void 0 ? void 0 : item.nationalDrugCode
    }, {
      label: 'Write Offs',
      value: item === null || item === void 0 ? void 0 : item.writeOffs
    }, {
      label: 'Case Account Payments',
      value: item === null || item === void 0 ? void 0 : item.caseAccountPayments
    }, {
      label: 'Journal Entries',
      value: item === null || item === void 0 ? void 0 : item.journalEntries
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
    this.loadCaseAccountEffect = this.effect(caseAccountId$ => caseAccountId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.setState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(caseAccountId => this.data.userCaseAccount({
      caseAccountId
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      item: res.data.item,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.deleteCaseAccountEffect = this.effect(caseAccount$ => caseAccount$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(caseAccount => this.data.userDeleteCaseAccount({
      caseAccountId: caseAccount.id
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      this.toast.success("Deleted successfully!", {
        duration: 3000
      });
      return this.router.navigate(['/queues/case-accounts']);
    }, errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.loadCaseAccountEffect(route.params.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.pluck)('caseAccountId')));
  }
}
WebCaseAccountDetailStore.ɵfac = function WebCaseAccountDetailStore_Factory(t) {
  return new (t || WebCaseAccountDetailStore)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_5__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_7__.WebUiToastService));
};
WebCaseAccountDetailStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
  token: WebCaseAccountDetailStore,
  factory: WebCaseAccountDetailStore.ɵfac
});

/***/ })

}]);