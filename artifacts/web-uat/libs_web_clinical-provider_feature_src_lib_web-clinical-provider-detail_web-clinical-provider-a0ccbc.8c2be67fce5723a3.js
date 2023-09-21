"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["libs_web_clinical-provider_feature_src_lib_web-clinical-provider-detail_web-clinical-provider-a0ccbc"],{

/***/ 907604:
/*!****************************************************************************************************************!*\
  !*** ./libs/web/clinical-provider/feature/src/lib/web-clinical-provider-detail/overview/overview.component.ts ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebClinicalProviderOverviewComponent": () => (/* binding */ WebClinicalProviderOverviewComponent)
/* harmony export */ });
/* harmony import */ var _case_clinical_web_clinical_provider_shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @case-clinical/web/clinical-provider/shared */ 19494);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 194813);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);








function WebClinicalProviderOverviewComponent_ng_container_0_Template(rf, ctx) {
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
class WebClinicalProviderOverviewComponent {
  constructor(store, router, route) {
    this.store = store;
    this.router = router;
    this.route = route;
    this.vm$ = this.store.vm$;
  }
  ngOnInit() {
    this.store.loadClinicalProviderEffect(this.route.params.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.pluck)('clinicalProviderId')));
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
      this.store.deleteClinicalProviderEffect();
    }
  }
  appointmentAdded($event) {
    console.log('from the overview in Clinical Provider, added: ', $event);
  }
  clinicalProviderLocationAdded($event) {
    console.log('from the overview in Clinical Provider, added: ', $event);
  }
  clinicalProviderSpecialtyAdded($event) {
    console.log('from the overview in Clinical Provider, added: ', $event);
  }
  clinicalProviderTagAdded($event) {
    console.log('from the overview in Clinical Provider, added: ', $event);
  }
  favoriteProviderAdded($event) {
    console.log('from the overview in Clinical Provider, added: ', $event);
  }
  medicalConditionProviderAdded($event) {
    console.log('from the overview in Clinical Provider, added: ', $event);
  }
  medicalRecordAdded($event) {
    console.log('from the overview in Clinical Provider, added: ', $event);
  }
  pchProviderAdded($event) {
    console.log('from the overview in Clinical Provider, added: ', $event);
  }
  userAdded($event) {
    console.log('from the overview in Clinical Provider, added: ', $event);
  }
}
WebClinicalProviderOverviewComponent.ɵfac = function WebClinicalProviderOverviewComponent_Factory(t) {
  return new (t || WebClinicalProviderOverviewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_clinical_provider_shared__WEBPACK_IMPORTED_MODULE_2__.WebClinicalProviderFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.ActivatedRoute));
};
WebClinicalProviderOverviewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebClinicalProviderOverviewComponent,
  selectors: [["ng-component"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_case_clinical_web_clinical_provider_shared__WEBPACK_IMPORTED_MODULE_2__.WebClinicalProviderFeatureStore])],
  decls: 2,
  vars: 3,
  consts: [[4, "ngIf"], ["formName", "clinicalProvider_overview", 3, "showSubmitButton", "componentStore", "model"]],
  template: function WebClinicalProviderOverviewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, WebClinicalProviderOverviewComponent_ng_container_0_Template, 2, 3, "ng-container", 0);
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

/***/ 527741:
/*!***************************************************************************************************************************!*\
  !*** ./libs/web/clinical-provider/feature/src/lib/web-clinical-provider-detail/web-clinical-provider-detail.component.ts ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebClinicalProviderDetailComponent": () => (/* binding */ WebClinicalProviderDetailComponent)
/* harmony export */ });
/* harmony import */ var _web_clinical_provider_detail_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./web-clinical-provider-detail.store */ 729797);
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
class WebClinicalProviderDetailComponent {
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
      var _a, _b, _c;
      if (((_a = s === null || s === void 0 ? void 0 : s.item) === null || _a === void 0 ? void 0 : _a.id) != undefined) {
        this.menuData = [{
          id: 'Details',
          title: 'Clinical Provider Details',
          type: 'group',
          children: [{
            id: 'details.overview',
            title: 'Overview',
            type: 'basic',
            link: `${routeString}/overview`
          }, {
            id: 'details.user',
            title: 'User',
            type: 'basic',
            link: `${routeString}/users/${((_b = s.item.user) === null || _b === void 0 ? void 0 : _b.id) ? (_c = s.item.user) === null || _c === void 0 ? void 0 : _c.id : 'create'}`
          }, {
            id: 'details.appointment',
            title: 'Appointments',
            type: 'basic',
            link: `${routeString}/appointments`
          }, {
            id: 'details.clinicalProviderLocation',
            title: 'Clinical Provider Locations',
            type: 'basic',
            link: `${routeString}/clinical-provider-locations`
          }, {
            id: 'details.clinicalProviderSpecialty',
            title: 'Clinical Provider Specialties',
            type: 'basic',
            link: `${routeString}/clinical-provider-specialties`
          }, {
            id: 'details.clinicalProviderTag',
            title: 'Clinical Provider Tags',
            type: 'basic',
            link: `${routeString}/clinical-provider-tags`
          }, {
            id: 'details.favoriteProvider',
            title: 'Favorite Providers',
            type: 'basic',
            link: `${routeString}/favorite-providers`
          }, {
            id: 'details.medicalConditionProvider',
            title: 'Medical Condition Providers',
            type: 'basic',
            link: `${routeString}/medical-condition-providers`
          }, {
            id: 'details.medicalRecord',
            title: 'Medical Records',
            type: 'basic',
            link: `${routeString}/medical-records`
          }, {
            id: 'details.education',
            title: 'Educations',
            type: 'basic',
            link: `${routeString}/educations`
          }, {
            id: 'details.experience',
            title: 'Experiences',
            type: 'basic',
            link: `${routeString}/experiences`
          }, {
            id: 'details.award',
            title: 'Awards',
            type: 'basic',
            link: `${routeString}/awards`
          }, {
            id: 'details.pchProvider',
            title: 'Pch Providers',
            type: 'basic',
            link: `${routeString}/pch-providers`
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
      this.store.deleteClinicalProviderEffect(item);
    }
  }
}
WebClinicalProviderDetailComponent.ɵfac = function WebClinicalProviderDetailComponent_Factory(t) {
  return new (t || WebClinicalProviderDetailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_web_clinical_provider_detail_store__WEBPACK_IMPORTED_MODULE_4__.WebClinicalProviderDetailStore), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_fuse_services_media_watcher__WEBPACK_IMPORTED_MODULE_6__.FuseMediaWatcherService));
};
WebClinicalProviderDetailComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: WebClinicalProviderDetailComponent,
  selectors: [["ng-component"]],
  viewQuery: function WebClinicalProviderDetailComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c0, 7);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.matDrawer = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵProvidersFeature"]([_web_clinical_provider_detail_store__WEBPACK_IMPORTED_MODULE_4__.WebClinicalProviderDetailStore])],
  decls: 8,
  vars: 8,
  consts: [[1, "flex", "flex-col", "w-full", "overflow-hidden"], [1, "flex-auto", "h-full"], [1, "w-60", "dark:bg-gray-900", 3, "autoFocus", "mode", "opened"], ["matDrawer", ""], [3, "navigation", "inner", "mode", "name", "opened"], ["fuseScrollReset", "", 1, "flex", "flex-col"], [1, "flex-auto", "flex", "flex-col"]],
  template: function WebClinicalProviderDetailComponent_Template(rf, ctx) {
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

/***/ 861371:
/*!************************************************************************************************************************!*\
  !*** ./libs/web/clinical-provider/feature/src/lib/web-clinical-provider-detail/web-clinical-provider-detail.module.ts ***!
  \************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebClinicalProviderDetailModule": () => (/* binding */ WebClinicalProviderDetailModule)
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
/* harmony import */ var _web_clinical_provider_detail_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./web-clinical-provider-detail.component */ 527741);
/* harmony import */ var _overview_overview_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./overview/overview.component */ 907604);
/* harmony import */ var _case_clinical_web_ui_description_list__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @case-clinical/web/ui/description-list */ 3841);
/* harmony import */ var _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @case-clinical/web/shared/ui */ 362610);
/* harmony import */ var _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @case-clinical/web/shared/ui */ 271992);
/* harmony import */ var _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @case-clinical/web/core/feature */ 811091);
/* harmony import */ var _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @case-clinical/web/ui/formly-designer */ 408916);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
























class WebClinicalProviderDetailModule {}
WebClinicalProviderDetailModule.ɵfac = function WebClinicalProviderDetailModule_Factory(t) {
  return new (t || WebClinicalProviderDetailModule)();
};
WebClinicalProviderDetailModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebClinicalProviderDetailModule
});
WebClinicalProviderDetailModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_material_button__WEBPACK_IMPORTED_MODULE_1__.MatButtonModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__.MatIconModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_3__.MatSidenavModule, _angular_material_tree__WEBPACK_IMPORTED_MODULE_4__.MatTreeModule, _fuse_components_highlight__WEBPACK_IMPORTED_MODULE_5__.FuseHighlightModule, _fuse_components_alert__WEBPACK_IMPORTED_MODULE_6__.FuseAlertModule, _fuse_components_navigation__WEBPACK_IMPORTED_MODULE_7__.FuseNavigationModule, _fuse_directives_scroll_reset__WEBPACK_IMPORTED_MODULE_8__.FuseScrollResetModule, libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_9__.SharedModule, _angular_common__WEBPACK_IMPORTED_MODULE_10__.CommonModule, _case_clinical_web_ui_panel__WEBPACK_IMPORTED_MODULE_11__.WebUiPanelModule, _case_clinical_web_ui_description_list__WEBPACK_IMPORTED_MODULE_12__.WebUiDescriptionListModule, _case_clinical_web_ui_card_header__WEBPACK_IMPORTED_MODULE_13__.WebUiCardHeaderModule, _case_clinical_web_ui_page__WEBPACK_IMPORTED_MODULE_14__.WebUiPageModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_15__.UtilitySharedModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_16__.UiFormsSharedModule, _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_17__.WebCoreFeatureModule, _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_18__.WebUiFormlyDesignerModule, _angular_router__WEBPACK_IMPORTED_MODULE_19__.RouterModule.forChild([{
    path: '',
    component: _web_clinical_provider_detail_component__WEBPACK_IMPORTED_MODULE_20__.WebClinicalProviderDetailComponent,
    children: [{
      path: 'overview',
      pathMatch: 'full',
      component: _overview_overview_component__WEBPACK_IMPORTED_MODULE_21__.WebClinicalProviderOverviewComponent
    }, {
      path: 'edit',
      loadChildren: () => __webpack_require__.e(/*! import() */ "libs_web_clinical-provider_feature_src_lib_web-clinical-provider-edit_web-clinical-provider-e-7a44a6").then(__webpack_require__.bind(__webpack_require__, /*! ../web-clinical-provider-edit/web-clinical-provider-edit.module */ 856027)).then(m => m.WebClinicalProviderEditModule)
    }, {
      path: 'appointments',
      loadChildren: () => __webpack_require__.e(/*! import() */ "common").then(__webpack_require__.bind(__webpack_require__, /*! @case-clinical/web/appointment/feature */ 715425)).then(m => m.WebAppointmentFeatureModule)
    }, {
      path: 'clinical-provider-locations',
      loadChildren: () => __webpack_require__.e(/*! import() */ "common").then(__webpack_require__.bind(__webpack_require__, /*! @case-clinical/web/clinical-provider-location/feature */ 232085)).then(m => m.WebClinicalProviderLocationFeatureModule)
    }, {
      path: 'clinical-provider-specialties',
      loadChildren: () => __webpack_require__.e(/*! import() */ "common").then(__webpack_require__.bind(__webpack_require__, /*! @case-clinical/web/clinical-provider-specialty/feature */ 848949)).then(m => m.WebClinicalProviderSpecialtyFeatureModule)
    }, {
      path: 'clinical-provider-tags',
      loadChildren: () => __webpack_require__.e(/*! import() */ "common").then(__webpack_require__.bind(__webpack_require__, /*! @case-clinical/web/clinical-provider-tag/feature */ 797678)).then(m => m.WebClinicalProviderTagFeatureModule)
    }, {
      path: 'favorite-providers',
      loadChildren: () => __webpack_require__.e(/*! import() */ "common").then(__webpack_require__.bind(__webpack_require__, /*! @case-clinical/web/favorite-provider/feature */ 538013)).then(m => m.WebFavoriteProviderFeatureModule)
    }, {
      path: 'medical-condition-providers',
      loadChildren: () => __webpack_require__.e(/*! import() */ "common").then(__webpack_require__.bind(__webpack_require__, /*! @case-clinical/web/medical-condition-provider/feature */ 540744)).then(m => m.WebMedicalConditionProviderFeatureModule)
    }, {
      path: 'medical-records',
      loadChildren: () => __webpack_require__.e(/*! import() */ "common").then(__webpack_require__.bind(__webpack_require__, /*! @case-clinical/web/medical-record/feature */ 133933)).then(m => m.WebMedicalRecordFeatureModule)
    }, {
      path: 'pch-providers',
      loadChildren: () => __webpack_require__.e(/*! import() */ "common").then(__webpack_require__.bind(__webpack_require__, /*! @case-clinical/web/pch-provider/feature */ 10159)).then(m => m.WebPchProviderFeatureModule)
    }, {
      path: 'educations',
      loadChildren: () => __webpack_require__.e(/*! import() */ "common").then(__webpack_require__.bind(__webpack_require__, /*! @case-clinical/web/education/feature */ 671639)).then(m => m.WebEducationFeatureModule)
    }, {
      path: 'experiences',
      loadChildren: () => __webpack_require__.e(/*! import() */ "common").then(__webpack_require__.bind(__webpack_require__, /*! @case-clinical/web/experience/feature */ 268325)).then(m => m.WebExperienceFeatureModule)
    }, {
      path: 'awards',
      loadChildren: () => __webpack_require__.e(/*! import() */ "common").then(__webpack_require__.bind(__webpack_require__, /*! @case-clinical/web/award/feature */ 158982)).then(m => m.WebAwardFeatureModule)
    }, {
      path: 'users',
      loadChildren: () => __webpack_require__.e(/*! import() */ "common").then(__webpack_require__.bind(__webpack_require__, /*! @case-clinical/web/user/feature */ 468188)).then(m => m.WebUserFeatureModule)
    }, {
      path: '',
      pathMatch: 'full',
      redirectTo: 'overview'
    }]
  }]), _case_clinical_web_ui_page_header__WEBPACK_IMPORTED_MODULE_22__.WebUiPageHeaderModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_23__.WebUiButtonModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebClinicalProviderDetailModule, {
    declarations: [_web_clinical_provider_detail_component__WEBPACK_IMPORTED_MODULE_20__.WebClinicalProviderDetailComponent, _overview_overview_component__WEBPACK_IMPORTED_MODULE_21__.WebClinicalProviderOverviewComponent],
    imports: [_angular_material_button__WEBPACK_IMPORTED_MODULE_1__.MatButtonModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__.MatIconModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_3__.MatSidenavModule, _angular_material_tree__WEBPACK_IMPORTED_MODULE_4__.MatTreeModule, _fuse_components_highlight__WEBPACK_IMPORTED_MODULE_5__.FuseHighlightModule, _fuse_components_alert__WEBPACK_IMPORTED_MODULE_6__.FuseAlertModule, _fuse_components_navigation__WEBPACK_IMPORTED_MODULE_7__.FuseNavigationModule, _fuse_directives_scroll_reset__WEBPACK_IMPORTED_MODULE_8__.FuseScrollResetModule, libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_9__.SharedModule, _angular_common__WEBPACK_IMPORTED_MODULE_10__.CommonModule, _case_clinical_web_ui_panel__WEBPACK_IMPORTED_MODULE_11__.WebUiPanelModule, _case_clinical_web_ui_description_list__WEBPACK_IMPORTED_MODULE_12__.WebUiDescriptionListModule, _case_clinical_web_ui_card_header__WEBPACK_IMPORTED_MODULE_13__.WebUiCardHeaderModule, _case_clinical_web_ui_page__WEBPACK_IMPORTED_MODULE_14__.WebUiPageModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_15__.UtilitySharedModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_16__.UiFormsSharedModule, _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_17__.WebCoreFeatureModule, _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_18__.WebUiFormlyDesignerModule, _angular_router__WEBPACK_IMPORTED_MODULE_19__.RouterModule, _case_clinical_web_ui_page_header__WEBPACK_IMPORTED_MODULE_22__.WebUiPageHeaderModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_23__.WebUiButtonModule]
  });
})();

/***/ }),

/***/ 729797:
/*!***********************************************************************************************************************!*\
  !*** ./libs/web/clinical-provider/feature/src/lib/web-clinical-provider-detail/web-clinical-provider-detail.store.ts ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebClinicalProviderDetailStore": () => (/* binding */ WebClinicalProviderDetailStore)
/* harmony export */ });
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 318505);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 763900);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 194813);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @case-clinical/web/ui/toast */ 971873);









class WebClinicalProviderDetailStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
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
      label: 'Npi',
      value: item === null || item === void 0 ? void 0 : item.npi
    }, {
      label: 'Honorific',
      value: item === null || item === void 0 ? void 0 : item.honorific
    }, {
      label: 'First Name',
      value: item === null || item === void 0 ? void 0 : item.firstName
    }, {
      label: 'Last Name',
      value: item === null || item === void 0 ? void 0 : item.lastName
    }, {
      label: 'Suffix',
      value: item === null || item === void 0 ? void 0 : item.suffix
    }, {
      label: 'Phone Number',
      value: item === null || item === void 0 ? void 0 : item.phoneNumber
    }, {
      label: 'Email Address',
      value: item === null || item === void 0 ? void 0 : item.emailAddress
    }, {
      label: 'Clinical Provider Tags',
      value: item === null || item === void 0 ? void 0 : item.clinicalProviderTags
    }, {
      label: 'Clinical Provider Locations',
      value: item === null || item === void 0 ? void 0 : item.clinicalProviderLocations
    }, {
      label: 'Clinical Provider Specialties',
      value: item === null || item === void 0 ? void 0 : item.clinicalProviderSpecialties
    }, {
      label: 'Pch Providers',
      value: item === null || item === void 0 ? void 0 : item.pchProviders
    }, {
      label: 'Favorite Providers',
      value: item === null || item === void 0 ? void 0 : item.favoriteProviders
    }, {
      label: 'Medical Records',
      value: item === null || item === void 0 ? void 0 : item.medicalRecords
    }, {
      label: 'Appointments',
      value: item === null || item === void 0 ? void 0 : item.appointments
    }, {
      label: 'Medical Condition Providers',
      value: item === null || item === void 0 ? void 0 : item.medicalConditionProviders
    }, {
      label: 'User',
      value: item === null || item === void 0 ? void 0 : item.user
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
    this.loadClinicalProviderEffect = this.effect(clinicalProviderId$ => clinicalProviderId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.setState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(clinicalProviderId => this.data.userClinicalProvider({
      clinicalProviderId
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      item: res.data.item,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.deleteClinicalProviderEffect = this.effect(clinicalProvider$ => clinicalProvider$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(clinicalProvider => this.data.userDeleteClinicalProvider({
      clinicalProviderId: clinicalProvider.id
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      this.toast.success("Deleted successfully!", {
        duration: 3000
      });
      return this.router.navigate(['/queues/clinical-providers']);
    }, errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.loadClinicalProviderEffect(route.params.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.pluck)('clinicalProviderId')));
  }
}
WebClinicalProviderDetailStore.ɵfac = function WebClinicalProviderDetailStore_Factory(t) {
  return new (t || WebClinicalProviderDetailStore)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_5__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_7__.WebUiToastService));
};
WebClinicalProviderDetailStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
  token: WebClinicalProviderDetailStore,
  factory: WebClinicalProviderDetailStore.ɵfac
});

/***/ })

}]);