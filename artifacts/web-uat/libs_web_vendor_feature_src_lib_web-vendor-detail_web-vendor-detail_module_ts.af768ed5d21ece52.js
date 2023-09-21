"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["libs_web_vendor_feature_src_lib_web-vendor-detail_web-vendor-detail_module_ts"],{

/***/ 257979:
/*!******************************************************************************************!*\
  !*** ./libs/web/vendor/feature/src/lib/web-vendor-detail/overview/overview.component.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebVendorOverviewComponent": () => (/* binding */ WebVendorOverviewComponent)
/* harmony export */ });
/* harmony import */ var _case_clinical_web_vendor_shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @case-clinical/web/vendor/shared */ 92079);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 194813);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);








function WebVendorOverviewComponent_ng_container_0_Template(rf, ctx) {
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
class WebVendorOverviewComponent {
  constructor(store, router, route) {
    this.store = store;
    this.router = router;
    this.route = route;
    this.vm$ = this.store.vm$;
  }
  ngOnInit() {
    this.store.loadVendorEffect(this.route.params.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.pluck)('vendorId')));
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
      this.store.deleteVendorEffect();
    }
  }
  assignedDocumentAdded($event) {
    console.log('from the overview in Vendor, added: ', $event);
  }
  caseAccountAdded($event) {
    console.log('from the overview in Vendor, added: ', $event);
  }
  clinicalProviderAdded($event) {
    console.log('from the overview in Vendor, added: ', $event);
  }
  contractAdded($event) {
    console.log('from the overview in Vendor, added: ', $event);
  }
  durableMedicalEquipmentAdded($event) {
    console.log('from the overview in Vendor, added: ', $event);
  }
  procedureVendorAdded($event) {
    console.log('from the overview in Vendor, added: ', $event);
  }
  vendorLocationAdded($event) {
    console.log('from the overview in Vendor, added: ', $event);
  }
}
WebVendorOverviewComponent.ɵfac = function WebVendorOverviewComponent_Factory(t) {
  return new (t || WebVendorOverviewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_vendor_shared__WEBPACK_IMPORTED_MODULE_2__.WebVendorFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.ActivatedRoute));
};
WebVendorOverviewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebVendorOverviewComponent,
  selectors: [["ng-component"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_case_clinical_web_vendor_shared__WEBPACK_IMPORTED_MODULE_2__.WebVendorFeatureStore])],
  decls: 2,
  vars: 3,
  consts: [[4, "ngIf"], ["formName", "vendor_overview", 3, "showSubmitButton", "componentStore", "model"]],
  template: function WebVendorOverviewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, WebVendorOverviewComponent_ng_container_0_Template, 2, 3, "ng-container", 0);
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

/***/ 966000:
/*!******************************************************************************************!*\
  !*** ./libs/web/vendor/feature/src/lib/web-vendor-detail/web-vendor-detail.component.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebVendorDetailComponent": () => (/* binding */ WebVendorDetailComponent)
/* harmony export */ });
/* harmony import */ var _web_vendor_detail_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./web-vendor-detail.store */ 459626);
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
class WebVendorDetailComponent {
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
          title: 'Vendor Details',
          type: 'group',
          children: [{
            id: 'details.overview',
            title: 'Overview',
            type: 'basic',
            link: `${routeString}/overview`
          }, {
            id: 'details.assignedDocument',
            title: 'Assigned Documents',
            type: 'basic',
            link: `${routeString}/assigned-documents`
          }, {
            id: 'details.caseAccount',
            title: 'Case Accounts',
            type: 'basic',
            link: `${routeString}/case-accounts`
          }, {
            id: 'details.clinicalProvider',
            title: 'Clinical Providers',
            type: 'basic',
            link: `${routeString}/clinical-providers`
          }, {
            id: 'details.contract',
            title: 'Contracts',
            type: 'basic',
            link: `${routeString}/contracts`
          }, {
            id: 'details.durableMedicalEquipment',
            title: 'Durable Medical Equipments',
            type: 'basic',
            link: `${routeString}/durable-medical-equipments`
          }, {
            id: 'details.procedureVendor',
            title: 'Procedure Vendors',
            type: 'basic',
            link: `${routeString}/procedure-vendors`
          }, {
            id: 'details.vendorLocation',
            title: 'Vendor Locations',
            type: 'basic',
            link: `${routeString}/vendor-locations`
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
      this.store.deleteVendorEffect(item);
    }
  }
}
WebVendorDetailComponent.ɵfac = function WebVendorDetailComponent_Factory(t) {
  return new (t || WebVendorDetailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_web_vendor_detail_store__WEBPACK_IMPORTED_MODULE_4__.WebVendorDetailStore), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_fuse_services_media_watcher__WEBPACK_IMPORTED_MODULE_6__.FuseMediaWatcherService));
};
WebVendorDetailComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: WebVendorDetailComponent,
  selectors: [["ng-component"]],
  viewQuery: function WebVendorDetailComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c0, 7);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.matDrawer = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵProvidersFeature"]([_web_vendor_detail_store__WEBPACK_IMPORTED_MODULE_4__.WebVendorDetailStore])],
  decls: 8,
  vars: 8,
  consts: [[1, "flex", "flex-col", "w-full", "overflow-hidden"], [1, "flex-auto", "h-full"], [1, "w-60", "dark:bg-gray-900", 3, "autoFocus", "mode", "opened"], ["matDrawer", ""], [3, "navigation", "inner", "mode", "name", "opened"], ["fuseScrollReset", "", 1, "flex", "flex-col"], [1, "flex-auto", "flex", "flex-col"]],
  template: function WebVendorDetailComponent_Template(rf, ctx) {
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

/***/ 743208:
/*!***************************************************************************************!*\
  !*** ./libs/web/vendor/feature/src/lib/web-vendor-detail/web-vendor-detail.module.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebVendorDetailModule": () => (/* binding */ WebVendorDetailModule)
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
/* harmony import */ var _web_vendor_detail_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./web-vendor-detail.component */ 966000);
/* harmony import */ var _overview_overview_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./overview/overview.component */ 257979);
/* harmony import */ var _case_clinical_web_ui_description_list__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @case-clinical/web/ui/description-list */ 3841);
/* harmony import */ var _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @case-clinical/web/shared/ui */ 362610);
/* harmony import */ var _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @case-clinical/web/shared/ui */ 271992);
/* harmony import */ var _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @case-clinical/web/core/feature */ 811091);
/* harmony import */ var _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @case-clinical/web/ui/formly-designer */ 408916);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
























class WebVendorDetailModule {}
WebVendorDetailModule.ɵfac = function WebVendorDetailModule_Factory(t) {
  return new (t || WebVendorDetailModule)();
};
WebVendorDetailModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebVendorDetailModule
});
WebVendorDetailModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_material_button__WEBPACK_IMPORTED_MODULE_1__.MatButtonModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__.MatIconModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_3__.MatSidenavModule, _angular_material_tree__WEBPACK_IMPORTED_MODULE_4__.MatTreeModule, _fuse_components_highlight__WEBPACK_IMPORTED_MODULE_5__.FuseHighlightModule, _fuse_components_alert__WEBPACK_IMPORTED_MODULE_6__.FuseAlertModule, _fuse_components_navigation__WEBPACK_IMPORTED_MODULE_7__.FuseNavigationModule, _fuse_directives_scroll_reset__WEBPACK_IMPORTED_MODULE_8__.FuseScrollResetModule, libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_9__.SharedModule, _angular_common__WEBPACK_IMPORTED_MODULE_10__.CommonModule, _case_clinical_web_ui_panel__WEBPACK_IMPORTED_MODULE_11__.WebUiPanelModule, _case_clinical_web_ui_description_list__WEBPACK_IMPORTED_MODULE_12__.WebUiDescriptionListModule, _case_clinical_web_ui_card_header__WEBPACK_IMPORTED_MODULE_13__.WebUiCardHeaderModule, _case_clinical_web_ui_page__WEBPACK_IMPORTED_MODULE_14__.WebUiPageModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_15__.UtilitySharedModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_16__.UiFormsSharedModule, _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_17__.WebCoreFeatureModule, _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_18__.WebUiFormlyDesignerModule, _angular_router__WEBPACK_IMPORTED_MODULE_19__.RouterModule.forChild([{
    path: '',
    component: _web_vendor_detail_component__WEBPACK_IMPORTED_MODULE_20__.WebVendorDetailComponent,
    children: [{
      path: 'overview',
      pathMatch: 'full',
      component: _overview_overview_component__WEBPACK_IMPORTED_MODULE_21__.WebVendorOverviewComponent
    }, {
      path: 'edit',
      loadChildren: () => __webpack_require__.e(/*! import() */ "libs_web_vendor_feature_src_lib_web-vendor-edit_web-vendor-edit_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ../web-vendor-edit/web-vendor-edit.module */ 287216)).then(m => m.WebVendorEditModule)
    }, {
      path: 'assigned-documents',
      loadChildren: () => __webpack_require__.e(/*! import() */ "common").then(__webpack_require__.bind(__webpack_require__, /*! @case-clinical/web/assigned-document/feature */ 445376)).then(m => m.WebAssignedDocumentFeatureModule)
    }, {
      path: 'case-accounts',
      loadChildren: () => __webpack_require__.e(/*! import() */ "common").then(__webpack_require__.bind(__webpack_require__, /*! @case-clinical/web/case-account/feature */ 692358)).then(m => m.WebCaseAccountFeatureModule)
    }, {
      path: 'clinical-providers',
      loadChildren: () => __webpack_require__.e(/*! import() */ "common").then(__webpack_require__.bind(__webpack_require__, /*! @case-clinical/web/clinical-provider/feature */ 610192)).then(m => m.WebClinicalProviderFeatureModule)
    }, {
      path: 'contracts',
      loadChildren: () => __webpack_require__.e(/*! import() */ "common").then(__webpack_require__.bind(__webpack_require__, /*! @case-clinical/web/contract/feature */ 402883)).then(m => m.WebContractFeatureModule)
    }, {
      path: 'durable-medical-equipments',
      loadChildren: () => __webpack_require__.e(/*! import() */ "common").then(__webpack_require__.bind(__webpack_require__, /*! @case-clinical/web/durable-medical-equipment/feature */ 169418)).then(m => m.WebDurableMedicalEquipmentFeatureModule)
    }, {
      path: 'procedure-vendors',
      loadChildren: () => __webpack_require__.e(/*! import() */ "common").then(__webpack_require__.bind(__webpack_require__, /*! @case-clinical/web/procedure-vendor/feature */ 269860)).then(m => m.WebProcedureVendorFeatureModule)
    }, {
      path: 'vendor-locations',
      loadChildren: () => __webpack_require__.e(/*! import() */ "common").then(__webpack_require__.bind(__webpack_require__, /*! @case-clinical/web/vendor-location/feature */ 371978)).then(m => m.WebVendorLocationFeatureModule)
    }, {
      path: '',
      pathMatch: 'full',
      redirectTo: 'overview'
    }]
  }]), _case_clinical_web_ui_page_header__WEBPACK_IMPORTED_MODULE_22__.WebUiPageHeaderModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_23__.WebUiButtonModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebVendorDetailModule, {
    declarations: [_web_vendor_detail_component__WEBPACK_IMPORTED_MODULE_20__.WebVendorDetailComponent, _overview_overview_component__WEBPACK_IMPORTED_MODULE_21__.WebVendorOverviewComponent],
    imports: [_angular_material_button__WEBPACK_IMPORTED_MODULE_1__.MatButtonModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__.MatIconModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_3__.MatSidenavModule, _angular_material_tree__WEBPACK_IMPORTED_MODULE_4__.MatTreeModule, _fuse_components_highlight__WEBPACK_IMPORTED_MODULE_5__.FuseHighlightModule, _fuse_components_alert__WEBPACK_IMPORTED_MODULE_6__.FuseAlertModule, _fuse_components_navigation__WEBPACK_IMPORTED_MODULE_7__.FuseNavigationModule, _fuse_directives_scroll_reset__WEBPACK_IMPORTED_MODULE_8__.FuseScrollResetModule, libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_9__.SharedModule, _angular_common__WEBPACK_IMPORTED_MODULE_10__.CommonModule, _case_clinical_web_ui_panel__WEBPACK_IMPORTED_MODULE_11__.WebUiPanelModule, _case_clinical_web_ui_description_list__WEBPACK_IMPORTED_MODULE_12__.WebUiDescriptionListModule, _case_clinical_web_ui_card_header__WEBPACK_IMPORTED_MODULE_13__.WebUiCardHeaderModule, _case_clinical_web_ui_page__WEBPACK_IMPORTED_MODULE_14__.WebUiPageModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_15__.UtilitySharedModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_16__.UiFormsSharedModule, _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_17__.WebCoreFeatureModule, _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_18__.WebUiFormlyDesignerModule, _angular_router__WEBPACK_IMPORTED_MODULE_19__.RouterModule, _case_clinical_web_ui_page_header__WEBPACK_IMPORTED_MODULE_22__.WebUiPageHeaderModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_23__.WebUiButtonModule]
  });
})();

/***/ }),

/***/ 459626:
/*!**************************************************************************************!*\
  !*** ./libs/web/vendor/feature/src/lib/web-vendor-detail/web-vendor-detail.store.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebVendorDetailStore": () => (/* binding */ WebVendorDetailStore)
/* harmony export */ });
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 318505);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 763900);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 194813);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @case-clinical/web/ui/toast */ 971873);









class WebVendorDetailStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
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
      label: 'Line 1',
      value: item === null || item === void 0 ? void 0 : item.line1
    }, {
      label: 'City',
      value: item === null || item === void 0 ? void 0 : item.city
    }, {
      label: 'State',
      value: item === null || item === void 0 ? void 0 : item.state
    }, {
      label: 'Postal Code',
      value: item === null || item === void 0 ? void 0 : item.postalCode
    }, {
      label: 'Email Address',
      value: item === null || item === void 0 ? void 0 : item.emailAddress
    }, {
      label: 'Phone Number',
      value: item === null || item === void 0 ? void 0 : item.phoneNumber
    }, {
      label: 'Fax',
      value: item === null || item === void 0 ? void 0 : item.fax
    }, {
      label: 'Mailing Address',
      value: item === null || item === void 0 ? void 0 : item.mailingAddress
    }, {
      label: 'Contracts',
      value: item === null || item === void 0 ? void 0 : item.contracts
    }, {
      label: 'Line 2',
      value: item === null || item === void 0 ? void 0 : item.line2
    }, {
      label: 'Country',
      value: item === null || item === void 0 ? void 0 : item.country
    }, {
      label: 'Office',
      value: item === null || item === void 0 ? void 0 : item.office
    }, {
      label: 'Email',
      value: item === null || item === void 0 ? void 0 : item.email
    }, {
      label: 'Website',
      value: item === null || item === void 0 ? void 0 : item.website
    }, {
      label: 'Contact Person',
      value: item === null || item === void 0 ? void 0 : item.contactPerson
    }, {
      label: 'Owner',
      value: item === null || item === void 0 ? void 0 : item.owner
    }, {
      label: 'Bank Routing Number',
      value: item === null || item === void 0 ? void 0 : item.bankRoutingNumber
    }, {
      label: 'Bank Account Number',
      value: item === null || item === void 0 ? void 0 : item.bankAccountNumber
    }, {
      label: 'Bank Name',
      value: item === null || item === void 0 ? void 0 : item.bankName
    }, {
      label: 'Bank City',
      value: item === null || item === void 0 ? void 0 : item.bankCity
    }, {
      label: 'Bank State',
      value: item === null || item === void 0 ? void 0 : item.bankState
    }, {
      label: 'Bank Zip',
      value: item === null || item === void 0 ? void 0 : item.bankZip
    }, {
      label: 'Notes',
      value: item === null || item === void 0 ? void 0 : item.notes
    }, {
      label: 'Agreement Details',
      value: item === null || item === void 0 ? void 0 : item.agreementDetails
    }, {
      label: 'Provider Search Name Display Type',
      value: item === null || item === void 0 ? void 0 : item.providerSearchNameDisplayType
    }, {
      label: 'Assigned Documents',
      value: item === null || item === void 0 ? void 0 : item.assignedDocuments
    }, {
      label: 'Cellphone',
      value: item === null || item === void 0 ? void 0 : item.cellphone
    }, {
      label: 'Ach Check or Wire',
      value: item === null || item === void 0 ? void 0 : item.achCheckOrWire
    }, {
      label: 'Reduction Notes',
      value: item === null || item === void 0 ? void 0 : item.reductionNotes
    }, {
      label: 'Latitude',
      value: item === null || item === void 0 ? void 0 : item.latitude
    }, {
      label: 'Longitude',
      value: item === null || item === void 0 ? void 0 : item.longitude
    }, {
      label: 'Business Central Name',
      value: item === null || item === void 0 ? void 0 : item.businessCentralName
    }, {
      label: 'Case Accounts',
      value: item === null || item === void 0 ? void 0 : item.caseAccounts
    }, {
      label: 'Procedure Vendors',
      value: item === null || item === void 0 ? void 0 : item.procedureVendors
    }, {
      label: 'Durable Medical Equipments',
      value: item === null || item === void 0 ? void 0 : item.durableMedicalEquipments
    }, {
      label: 'Vendor Locations',
      value: item === null || item === void 0 ? void 0 : item.vendorLocations
    }, {
      label: 'Clinical Providers',
      value: item === null || item === void 0 ? void 0 : item.clinicalProviders
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
    this.loadVendorEffect = this.effect(vendorId$ => vendorId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.setState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(vendorId => this.data.userVendor({
      vendorId
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      item: res.data.item,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.deleteVendorEffect = this.effect(vendor$ => vendor$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(vendor => this.data.userDeleteVendor({
      vendorId: vendor.id
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      this.toast.success("Deleted successfully!", {
        duration: 3000
      });
      return this.router.navigate(['/queues/vendors']);
    }, errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.loadVendorEffect(route.params.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.pluck)('vendorId')));
  }
}
WebVendorDetailStore.ɵfac = function WebVendorDetailStore_Factory(t) {
  return new (t || WebVendorDetailStore)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_5__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_7__.WebUiToastService));
};
WebVendorDetailStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
  token: WebVendorDetailStore,
  factory: WebVendorDetailStore.ɵfac
});

/***/ })

}]);