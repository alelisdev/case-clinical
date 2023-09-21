"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["libs_web_patient_feature_src_lib_web-patient-detail_web-patient-detail_module_ts"],{

/***/ 451846:
/*!********************************************************************************************!*\
  !*** ./libs/web/patient/feature/src/lib/web-patient-detail/overview/overview.component.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebPatientOverviewComponent": () => (/* binding */ WebPatientOverviewComponent)
/* harmony export */ });
/* harmony import */ var _case_clinical_web_patient_shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @case-clinical/web/patient/shared */ 949657);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 194813);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _ui_formly_designer_src_lib_web_ui_formly_json_form_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../ui/formly-designer/src/lib/web-ui-formly-json-form.component */ 392518);








function WebPatientOverviewComponent_ng_container_0_Template(rf, ctx) {
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
class WebPatientOverviewComponent {
  constructor(store, router, route) {
    this.store = store;
    this.router = router;
    this.route = route;
    this.vm$ = this.store.vm$;
  }
  ngOnInit() {
    this.store.loadPatientEffect(this.route.params.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.pluck)('patientId')));
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
      this.store.deletePatientEffect();
    }
  }
  appointmentAdded($event) {
    console.log('from the overview in Patient, added: ', $event);
  }
  claimAdded($event) {
    console.log('from the overview in Patient, added: ', $event);
  }
  documentAdded($event) {
    console.log('from the overview in Patient, added: ', $event);
  }
  legalCaseAdded($event) {
    console.log('from the overview in Patient, added: ', $event);
  }
  patientStudyAdded($event) {
    console.log('from the overview in Patient, added: ', $event);
  }
  prescriptionAdded($event) {
    console.log('from the overview in Patient, added: ', $event);
  }
  priorAuthorizationRequestAdded($event) {
    console.log('from the overview in Patient, added: ', $event);
  }
  userAdded($event) {
    console.log('from the overview in Patient, added: ', $event);
  }
}
WebPatientOverviewComponent.ɵfac = function WebPatientOverviewComponent_Factory(t) {
  return new (t || WebPatientOverviewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_patient_shared__WEBPACK_IMPORTED_MODULE_2__.WebPatientFeatureStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.ActivatedRoute));
};
WebPatientOverviewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WebPatientOverviewComponent,
  selectors: [["ng-component"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_case_clinical_web_patient_shared__WEBPACK_IMPORTED_MODULE_2__.WebPatientFeatureStore])],
  decls: 2,
  vars: 3,
  consts: [[4, "ngIf"], ["formName", "patient_overview", 3, "showSubmitButton", "componentStore", "model"]],
  template: function WebPatientOverviewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, WebPatientOverviewComponent_ng_container_0_Template, 2, 3, "ng-container", 0);
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

/***/ 765662:
/*!*********************************************************************************************!*\
  !*** ./libs/web/patient/feature/src/lib/web-patient-detail/web-patient-detail.component.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebPatientDetailComponent": () => (/* binding */ WebPatientDetailComponent)
/* harmony export */ });
/* harmony import */ var _web_patient_detail_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./web-patient-detail.store */ 600640);
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
class WebPatientDetailComponent {
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
      var _a, _b, _c, _d, _e;
      if (((_a = s === null || s === void 0 ? void 0 : s.item) === null || _a === void 0 ? void 0 : _a.id) != undefined) {
        this.menuData = [{
          id: 'Details',
          title: 'Patient Details',
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
            link: `${routeString}/users/${((_c = (_b = s.item.users) === null || _b === void 0 ? void 0 : _b.at(0)) === null || _c === void 0 ? void 0 : _c.id) ? (_e = (_d = s.item.users) === null || _d === void 0 ? void 0 : _d.at(0)) === null || _e === void 0 ? void 0 : _e.id : 'create'}`
          }, {
            id: 'details.appointment',
            title: 'Appointments',
            type: 'basic',
            link: `${routeString}/appointments`
          }, {
            id: 'details.claim',
            title: 'Claims',
            type: 'basic',
            link: `${routeString}/claims`
          }, {
            id: 'details.document',
            title: 'Documents',
            type: 'basic',
            link: `${routeString}/documents`
          }, {
            id: 'details.legalCase',
            title: 'Legal Cases',
            type: 'basic',
            link: `${routeString}/legal-cases`
          }, {
            id: 'details.patientStudy',
            title: 'Patient Studies',
            type: 'basic',
            link: `${routeString}/patient-studies`
          }, {
            id: 'details.prescription',
            title: 'Prescriptions',
            type: 'basic',
            link: `${routeString}/prescriptions`
          }, {
            id: 'details.priorAuthorizationRequest',
            title: 'Prior Authorization Requests',
            type: 'basic',
            link: `${routeString}/prior-authorization-requests`
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
      this.store.deletePatientEffect(item);
    }
  }
}
WebPatientDetailComponent.ɵfac = function WebPatientDetailComponent_Factory(t) {
  return new (t || WebPatientDetailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_web_patient_detail_store__WEBPACK_IMPORTED_MODULE_4__.WebPatientDetailStore), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_fuse_services_media_watcher__WEBPACK_IMPORTED_MODULE_6__.FuseMediaWatcherService));
};
WebPatientDetailComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: WebPatientDetailComponent,
  selectors: [["ng-component"]],
  viewQuery: function WebPatientDetailComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c0, 7);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.matDrawer = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵProvidersFeature"]([_web_patient_detail_store__WEBPACK_IMPORTED_MODULE_4__.WebPatientDetailStore])],
  decls: 10,
  vars: 9,
  consts: [[1, "flex", "flex-col", "w-full", "overflow-hidden"], [1, "flex-auto", "h-full"], [1, "w-60", "dark:bg-gray-900", 3, "autoFocus", "mode", "opened"], ["matDrawer", ""], [3, "navigation", "inner", "mode", "name", "opened"], ["fuseScrollReset", "", 1, "flex", "flex-col"], [1, "flex-auto", "flex", "flex-col"], ["mat-icon-button", "", 1, "ml-4", "md:hidden", "absolute", "left-4", "top-2", "sm:left-1", "sm:top-8", 3, "click"], [3, "svgIcon"]],
  template: function WebPatientDetailComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "mat-drawer-container", 1)(2, "mat-drawer", 2, 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](4, "fuse-vertical-navigation", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "mat-drawer-content", 5)(6, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](7, "router-outlet");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "button", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function WebPatientDetailComponent_Template_button_click_8_listener() {
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

/***/ 157956:
/*!******************************************************************************************!*\
  !*** ./libs/web/patient/feature/src/lib/web-patient-detail/web-patient-detail.module.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebPatientDetailModule": () => (/* binding */ WebPatientDetailModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @case-clinical/web/ui/button */ 510948);
/* harmony import */ var _case_clinical_web_ui_page_header__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @case-clinical/web/ui/page-header */ 752707);
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
/* harmony import */ var _web_patient_detail_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./web-patient-detail.component */ 765662);
/* harmony import */ var _overview_overview_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./overview/overview.component */ 451846);
/* harmony import */ var _case_clinical_web_ui_description_list__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @case-clinical/web/ui/description-list */ 3841);
/* harmony import */ var _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @case-clinical/web/shared/ui */ 362610);
/* harmony import */ var _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @case-clinical/web/shared/ui */ 271992);
/* harmony import */ var _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @case-clinical/web/core/feature */ 811091);
/* harmony import */ var _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @case-clinical/web/ui/formly-designer */ 408916);
/* harmony import */ var _txtextcontrol_tx_ng_document_viewer__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @txtextcontrol/tx-ng-document-viewer */ 770383);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);

























class WebPatientDetailModule {}
WebPatientDetailModule.ɵfac = function WebPatientDetailModule_Factory(t) {
  return new (t || WebPatientDetailModule)();
};
WebPatientDetailModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: WebPatientDetailModule
});
WebPatientDetailModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_material_button__WEBPACK_IMPORTED_MODULE_1__.MatButtonModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__.MatIconModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_3__.MatSidenavModule, _angular_material_tree__WEBPACK_IMPORTED_MODULE_4__.MatTreeModule, _fuse_components_highlight__WEBPACK_IMPORTED_MODULE_5__.FuseHighlightModule, _fuse_components_alert__WEBPACK_IMPORTED_MODULE_6__.FuseAlertModule, _fuse_components_navigation__WEBPACK_IMPORTED_MODULE_7__.FuseNavigationModule, _fuse_directives_scroll_reset__WEBPACK_IMPORTED_MODULE_8__.FuseScrollResetModule, libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_9__.SharedModule, _angular_common__WEBPACK_IMPORTED_MODULE_10__.CommonModule, _case_clinical_web_ui_panel__WEBPACK_IMPORTED_MODULE_11__.WebUiPanelModule, _case_clinical_web_ui_description_list__WEBPACK_IMPORTED_MODULE_12__.WebUiDescriptionListModule, _case_clinical_web_ui_card_header__WEBPACK_IMPORTED_MODULE_13__.WebUiCardHeaderModule, _case_clinical_web_ui_page__WEBPACK_IMPORTED_MODULE_14__.WebUiPageModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_15__.UtilitySharedModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_16__.UiFormsSharedModule, _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_17__.WebCoreFeatureModule, _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_18__.WebUiFormlyDesignerModule, _angular_router__WEBPACK_IMPORTED_MODULE_19__.RouterModule.forChild([{
    path: '',
    component: _web_patient_detail_component__WEBPACK_IMPORTED_MODULE_20__.WebPatientDetailComponent,
    children: [{
      path: 'overview',
      pathMatch: 'full',
      component: _overview_overview_component__WEBPACK_IMPORTED_MODULE_21__.WebPatientOverviewComponent
    }, {
      path: 'edit',
      loadChildren: () => __webpack_require__.e(/*! import() */ "libs_web_patient_feature_src_lib_web-patient-edit_web-patient-edit_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ../web-patient-edit/web-patient-edit.module */ 878818)).then(m => m.WebPatientEditModule)
    }, {
      path: 'appointments',
      loadChildren: () => __webpack_require__.e(/*! import() */ "common").then(__webpack_require__.bind(__webpack_require__, /*! @case-clinical/web/appointment/feature */ 715425)).then(m => m.WebAppointmentFeatureModule)
    }, {
      path: 'claims',
      loadChildren: () => __webpack_require__.e(/*! import() */ "common").then(__webpack_require__.bind(__webpack_require__, /*! @case-clinical/web/claim/feature */ 537474)).then(m => m.WebClaimFeatureModule)
    }, {
      path: 'documents',
      loadChildren: () => __webpack_require__.e(/*! import() */ "common").then(__webpack_require__.bind(__webpack_require__, /*! @case-clinical/web/document/feature */ 34463)).then(m => m.WebDocumentFeatureModule)
    }, {
      path: 'legal-cases',
      loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-libs_web_ui_breadcrumbs_src_lib_master-breadcrumb_module_ts"), __webpack_require__.e("common")]).then(__webpack_require__.bind(__webpack_require__, /*! @case-clinical/web/legal-case/feature */ 786045)).then(m => m.WebLegalCaseFeatureModule)
    }, {
      path: 'patient-studies',
      loadChildren: () => __webpack_require__.e(/*! import() */ "common").then(__webpack_require__.bind(__webpack_require__, /*! @case-clinical/web/patient-study/feature */ 587546)).then(m => m.WebPatientStudyFeatureModule)
    }, {
      path: 'prescriptions',
      loadChildren: () => __webpack_require__.e(/*! import() */ "common").then(__webpack_require__.bind(__webpack_require__, /*! @case-clinical/web/prescription/feature */ 728969)).then(m => m.WebPrescriptionFeatureModule)
    }, {
      path: 'prior-authorization-requests',
      loadChildren: () => __webpack_require__.e(/*! import() */ "common").then(__webpack_require__.bind(__webpack_require__, /*! @case-clinical/web/prior-authorization-request/feature */ 170682)).then(m => m.WebPriorAuthorizationRequestFeatureModule)
    }, {
      path: 'users',
      loadChildren: () => __webpack_require__.e(/*! import() */ "common").then(__webpack_require__.bind(__webpack_require__, /*! @case-clinical/web/user/feature */ 468188)).then(m => m.WebUserFeatureModule)
    }, {
      path: '',
      pathMatch: 'full',
      redirectTo: 'overview'
    }]
  }]), _txtextcontrol_tx_ng_document_viewer__WEBPACK_IMPORTED_MODULE_22__.DocumentViewerModule, _case_clinical_web_ui_page_header__WEBPACK_IMPORTED_MODULE_23__.WebUiPageHeaderModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_24__.WebUiButtonModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WebPatientDetailModule, {
    declarations: [_web_patient_detail_component__WEBPACK_IMPORTED_MODULE_20__.WebPatientDetailComponent, _overview_overview_component__WEBPACK_IMPORTED_MODULE_21__.WebPatientOverviewComponent],
    imports: [_angular_material_button__WEBPACK_IMPORTED_MODULE_1__.MatButtonModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__.MatIconModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_3__.MatSidenavModule, _angular_material_tree__WEBPACK_IMPORTED_MODULE_4__.MatTreeModule, _fuse_components_highlight__WEBPACK_IMPORTED_MODULE_5__.FuseHighlightModule, _fuse_components_alert__WEBPACK_IMPORTED_MODULE_6__.FuseAlertModule, _fuse_components_navigation__WEBPACK_IMPORTED_MODULE_7__.FuseNavigationModule, _fuse_directives_scroll_reset__WEBPACK_IMPORTED_MODULE_8__.FuseScrollResetModule, libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_9__.SharedModule, _angular_common__WEBPACK_IMPORTED_MODULE_10__.CommonModule, _case_clinical_web_ui_panel__WEBPACK_IMPORTED_MODULE_11__.WebUiPanelModule, _case_clinical_web_ui_description_list__WEBPACK_IMPORTED_MODULE_12__.WebUiDescriptionListModule, _case_clinical_web_ui_card_header__WEBPACK_IMPORTED_MODULE_13__.WebUiCardHeaderModule, _case_clinical_web_ui_page__WEBPACK_IMPORTED_MODULE_14__.WebUiPageModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_15__.UtilitySharedModule, _case_clinical_web_shared_ui__WEBPACK_IMPORTED_MODULE_16__.UiFormsSharedModule, _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_17__.WebCoreFeatureModule, _case_clinical_web_ui_formly_designer__WEBPACK_IMPORTED_MODULE_18__.WebUiFormlyDesignerModule, _angular_router__WEBPACK_IMPORTED_MODULE_19__.RouterModule, _txtextcontrol_tx_ng_document_viewer__WEBPACK_IMPORTED_MODULE_22__.DocumentViewerModule, _case_clinical_web_ui_page_header__WEBPACK_IMPORTED_MODULE_23__.WebUiPageHeaderModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_24__.WebUiButtonModule]
  });
})();

/***/ }),

/***/ 600640:
/*!*****************************************************************************************!*\
  !*** ./libs/web/patient/feature/src/lib/web-patient-detail/web-patient-detail.store.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebPatientDetailStore": () => (/* binding */ WebPatientDetailStore)
/* harmony export */ });
/* harmony import */ var _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/component-store */ 724280);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 318505);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 763900);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 194813);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @case-clinical/web/ui/toast */ 971873);









class WebPatientDetailStore extends _ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.ComponentStore {
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
    this.displayItems$ = this.select(this.item$, item => {
      var _a;
      return [{
        label: 'Id',
        value: item === null || item === void 0 ? void 0 : item.id
      }, {
        label: 'Name',
        value: item === null || item === void 0 ? void 0 : item.name
      }, {
        label: 'First Name',
        value: item === null || item === void 0 ? void 0 : item.firstName
      }, {
        label: 'Middle Name',
        value: item === null || item === void 0 ? void 0 : item.middleName
      }, {
        label: 'Last Name',
        value: item === null || item === void 0 ? void 0 : item.lastName
      }, {
        label: 'Suffix',
        value: item === null || item === void 0 ? void 0 : item.suffix
      }, {
        label: 'Nickname',
        value: item === null || item === void 0 ? void 0 : item.nickname
      }, {
        label: 'Height',
        value: item === null || item === void 0 ? void 0 : item.height
      }, {
        label: 'Weight',
        value: item === null || item === void 0 ? void 0 : item.weight
      }, {
        label: 'Date of Birth',
        value: item === null || item === void 0 ? void 0 : item.dateOfBirth
      }, {
        label: 'Primary Phone Number',
        value: item === null || item === void 0 ? void 0 : item.primaryPhoneNumber
      }, {
        label: 'Is Primary Phone Mobile',
        value: item === null || item === void 0 ? void 0 : item.isPrimaryPhoneMobile
      }, {
        label: 'Secondary Phone Number',
        value: item === null || item === void 0 ? void 0 : item.secondaryPhoneNumber
      }, {
        label: 'Is Secondary Phone Mobile',
        value: item === null || item === void 0 ? void 0 : item.isSecondaryPhoneMobile
      }, {
        label: 'Member Registration Number',
        value: item === null || item === void 0 ? void 0 : item.memberRegistrationNumber
      }, {
        label: 'Requires Translator',
        value: item === null || item === void 0 ? void 0 : item.requiresTranslator
      }, {
        label: 'Social Security Number',
        value: item === null || item === void 0 ? void 0 : item.socialSecurityNumber
      }, {
        label: 'Honorific',
        value: item === null || item === void 0 ? void 0 : item.honorific
      }, {
        label: 'Primary Email Address',
        value: item === null || item === void 0 ? void 0 : item.primaryEmailAddress
      }, {
        label: 'Primary Address Line 1',
        value: item === null || item === void 0 ? void 0 : item.primaryAddressLine1
      }, {
        label: 'Primary Address Line 2',
        value: item === null || item === void 0 ? void 0 : item.primaryAddressLine2
      }, {
        label: 'Primary Address City',
        value: item === null || item === void 0 ? void 0 : item.primaryAddressCity
      }, {
        label: 'Primary Address State or Province',
        value: item === null || item === void 0 ? void 0 : item.primaryAddressStateOrProvince
      }, {
        label: 'Primary Address Postal Code',
        value: item === null || item === void 0 ? void 0 : item.primaryAddressPostalCode
      }, {
        label: 'Notes',
        value: item === null || item === void 0 ? void 0 : item.notes
      }, {
        label: 'Latitude',
        value: item === null || item === void 0 ? void 0 : item.latitude
      }, {
        label: 'Longitude',
        value: item === null || item === void 0 ? void 0 : item.longitude
      }, {
        label: 'Home Phone Number',
        value: item === null || item === void 0 ? void 0 : item.homePhoneNumber
      }, {
        label: 'Mobile Number',
        value: item === null || item === void 0 ? void 0 : item.mobileNumber
      }, {
        label: 'Bmi',
        value: item === null || item === void 0 ? void 0 : item.bmi
      }, {
        label: 'Occupation',
        value: item === null || item === void 0 ? void 0 : item.occupation
      }, {
        label: 'Debtor Remarks',
        value: item === null || item === void 0 ? void 0 : item.debtorRemarks
      }, {
        label: 'Work Address Line 1',
        value: item === null || item === void 0 ? void 0 : item.workAddressLine1
      }, {
        label: 'Work Address Line 2',
        value: item === null || item === void 0 ? void 0 : item.workAddressLine2
      }, {
        label: 'Work Address City',
        value: item === null || item === void 0 ? void 0 : item.workAddressCity
      }, {
        label: 'Work Address State or Province',
        value: item === null || item === void 0 ? void 0 : item.workAddressStateOrProvince
      }, {
        label: 'Work Address Postal Code',
        value: item === null || item === void 0 ? void 0 : item.workAddressPostalCode
      }, {
        label: 'Work Latitude',
        value: item === null || item === void 0 ? void 0 : item.workLatitude
      }, {
        label: 'Work Longitude',
        value: item === null || item === void 0 ? void 0 : item.workLongitude
      }, {
        label: 'Prescriptions',
        value: item === null || item === void 0 ? void 0 : item.prescriptions
      }, {
        label: 'Documents',
        value: item === null || item === void 0 ? void 0 : item.documents
      }, {
        label: 'Patient Studies',
        value: item === null || item === void 0 ? void 0 : item.patientStudies
      }, {
        label: 'Claims',
        value: item === null || item === void 0 ? void 0 : item.claims
      }, {
        label: 'Legal Cases',
        value: item === null || item === void 0 ? void 0 : item.legalCases
      }, {
        label: 'Prior Authorization Requests',
        value: item === null || item === void 0 ? void 0 : item.priorAuthorizationRequests
      }, {
        label: 'Appointments',
        value: item === null || item === void 0 ? void 0 : item.appointments
      }, {
        label: 'User',
        value: (_a = item === null || item === void 0 ? void 0 : item.users) === null || _a === void 0 ? void 0 : _a.at(0)
      }];
    });
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
    this.loadPatientEffect = this.effect(patientId$ => patientId$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)(() => this.setState({
      loading: true
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(patientId => this.data.userPatient({
      patientId
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => this.patchState({
      item: res.data.item,
      errors: res.errors,
      loading: false
    }), errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.deletePatientEffect = this.effect(patient$ => patient$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(patient => this.data.userDeletePatient({
      patientId: patient.id
    }).pipe((0,_ngrx_component_store__WEBPACK_IMPORTED_MODULE_0__.tapResponse)(res => {
      this.toast.success("Deleted successfully!", {
        duration: 3000
      });
      return this.router.navigate(['/queues/patients']);
    }, errors => this.patchState({
      loading: false,
      errors: errors.graphQLErrors ? errors.graphQLErrors : errors
    }))))));
    this.loadPatientEffect(route.params.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.pluck)('patientId')));
  }
}
WebPatientDetailStore.ɵfac = function WebPatientDetailStore_Factory(t) {
  return new (t || WebPatientDetailStore)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_5__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_7__.WebUiToastService));
};
WebPatientDetailStore.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
  token: WebPatientDetailStore,
  factory: WebPatientDetailStore.ɵfac
});

/***/ })

}]);